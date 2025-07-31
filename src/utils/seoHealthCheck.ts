/**
 * SEO health check utilities for continuous monitoring
 */

export interface SEOHealthMetrics {
  sitemapStatus: 'healthy' | 'warning' | 'error';
  robotsStatus: 'healthy' | 'warning' | 'error';
  crawlerCompatibility: 'excellent' | 'good' | 'needs-improvement';
  lastChecked: string;
  issues: string[];
  recommendations: string[];
}

/**
 * Check sitemap health and accessibility
 */
export const checkSitemapHealth = async (): Promise<{
  status: 'healthy' | 'warning' | 'error';
  issues: string[];
}> => {
  const issues: string[] = [];
  let status: 'healthy' | 'warning' | 'error' = 'healthy';

  try {
    // Test sitemap generation
    const { generateSitemap } = await import('@/utils/sitemapGenerator');
    const sitemap = await generateSitemap();
    
    if (!sitemap || sitemap.trim().length === 0) {
      issues.push('Sitemap generation returned empty content');
      status = 'error';
    } else {
      // Validate XML structure
      const parser = new DOMParser();
      const doc = parser.parseFromString(sitemap, 'application/xml');
      const parseErrors = doc.getElementsByTagName('parsererror');
      
      if (parseErrors.length > 0) {
        issues.push('Sitemap contains XML parsing errors');
        status = 'error';
      } else {
        // Check for required elements
        const urlElements = doc.getElementsByTagName('url');
        if (urlElements.length === 0) {
          issues.push('Sitemap contains no URL entries');
          status = 'warning';
        } else if (urlElements.length < 5) {
          issues.push('Sitemap contains very few URLs - consider adding more content');
          status = 'warning';
        }
      }
    }
  } catch (error) {
    issues.push(`Sitemap generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    status = 'error';
  }

  return { status, issues };
};

/**
 * Check robots.txt health
 */
export const checkRobotsHealth = (): {
  status: 'healthy' | 'warning' | 'error';
  issues: string[];
} => {
  const issues: string[] = [];
  let status: 'healthy' | 'warning' | 'error' = 'healthy';

  try {
    const { generateRobotsTxt } = require('@/utils/sitemapGenerator');
    const robotsContent = generateRobotsTxt();
    
    if (!robotsContent || robotsContent.trim().length === 0) {
      issues.push('Robots.txt generation returned empty content');
      status = 'error';
    } else {
      // Check for required directives
      if (!robotsContent.includes('User-agent:')) {
        issues.push('Robots.txt missing User-agent directive');
        status = 'warning';
      }
      
      if (!robotsContent.includes('Sitemap:')) {
        issues.push('Robots.txt missing Sitemap directive');
        status = 'warning';
      }
      
      // Check for common issues
      if (robotsContent.includes('Disallow: /')) {
        issues.push('Robots.txt may be blocking entire site');
        status = 'warning';
      }
    }
  } catch (error) {
    issues.push(`Robots.txt generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    status = 'error';
  }

  return { status, issues };
};

/**
 * Assess overall crawler compatibility
 */
export const assessCrawlerCompatibility = (
  sitemapStatus: string,
  robotsStatus: string
): {
  compatibility: 'excellent' | 'good' | 'needs-improvement';
  recommendations: string[];
} => {
  const recommendations: string[] = [];
  let compatibility: 'excellent' | 'good' | 'needs-improvement' = 'excellent';

  if (sitemapStatus === 'error' || robotsStatus === 'error') {
    compatibility = 'needs-improvement';
    recommendations.push('Fix critical errors in sitemap or robots.txt generation');
  } else if (sitemapStatus === 'warning' || robotsStatus === 'warning') {
    compatibility = 'good';
    recommendations.push('Address warnings to improve crawler experience');
  }

  // General recommendations
  recommendations.push('Test sitemap accessibility using Google Search Console');
  recommendations.push('Monitor crawler access patterns in server logs');
  recommendations.push('Implement structured data for better content understanding');
  
  if (compatibility === 'excellent') {
    recommendations.push('Consider implementing XML news sitemaps if applicable');
    recommendations.push('Monitor Core Web Vitals for better search performance');
  }

  return { compatibility, recommendations };
};

/**
 * Perform comprehensive SEO health check
 */
export const performSEOHealthCheck = async (): Promise<SEOHealthMetrics> => {
  const sitemapHealth = await checkSitemapHealth();
  const robotsHealth = checkRobotsHealth();
  const crawlerAssessment = assessCrawlerCompatibility(
    sitemapHealth.status,
    robotsHealth.status
  );

  const allIssues = [...sitemapHealth.issues, ...robotsHealth.issues];
  
  return {
    sitemapStatus: sitemapHealth.status,
    robotsStatus: robotsHealth.status,
    crawlerCompatibility: crawlerAssessment.compatibility,
    lastChecked: new Date().toISOString(),
    issues: allIssues,
    recommendations: crawlerAssessment.recommendations
  };
};

/**
 * Monitor SEO health continuously
 */
export class SEOHealthMonitor {
  private checkInterval: number = 30000; // 30 seconds
  private intervalId: NodeJS.Timeout | null = null;
  private lastMetrics: SEOHealthMetrics | null = null;

  constructor(checkInterval: number = 30000) {
    this.checkInterval = checkInterval;
  }

  start(): void {
    if (this.intervalId) return; // Already running

    this.intervalId = setInterval(async () => {
      try {
        const metrics = await performSEOHealthCheck();
        this.lastMetrics = metrics;
        
        // Log significant changes
        if (metrics.issues.length > 0) {
          console.warn('SEO Health Issues:', metrics.issues);
        }
        
        // Store metrics for dashboard
        if (typeof window !== 'undefined') {
          localStorage.setItem('seo-health-metrics', JSON.stringify(metrics));
        }
      } catch (error) {
        console.error('SEO health check failed:', error);
      }
    }, this.checkInterval);

    // Run initial check
    this.performImmediateCheck();
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  async performImmediateCheck(): Promise<SEOHealthMetrics> {
    this.lastMetrics = await performSEOHealthCheck();
    return this.lastMetrics;
  }

  getLastMetrics(): SEOHealthMetrics | null {
    return this.lastMetrics;
  }
}

// Export singleton instance
export const seoHealthMonitor = new SEOHealthMonitor();

// Auto-start in development mode
if (import.meta.env.DEV) {
  seoHealthMonitor.start();
  
  // Make available globally for debugging
  if (typeof window !== 'undefined') {
    (window as any).seoHealthMonitor = seoHealthMonitor;
  }
}