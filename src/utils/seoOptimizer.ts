// Enhanced SEO monitoring and optimization utilities
import { seoMonitor } from './seoMonitoring';
import { contentfulCache, CACHE_KEYS } from './contentfulCache';
import { pingSearchEngines } from './sitemapGenerator';

class SEOOptimizer {
  private lastSitemapPing = 0;
  private pingCooldown = 60 * 60 * 1000; // 1 hour cooldown

  // Monitor and automatically optimize SEO based on usage patterns
  async onContentChange(): Promise<void> {
    const now = Date.now();
    
    // Only ping search engines if enough time has passed
    if (now - this.lastSitemapPing > this.pingCooldown) {
      try {
        console.log('🔔 Content changed, notifying search engines...');
        await pingSearchEngines();
        this.lastSitemapPing = now;
        
        // Clear sitemap cache to force regeneration
        contentfulCache.set(CACHE_KEYS.SITEMAP, null, 0);
        
      } catch (error) {
        console.error('❌ Failed to notify search engines:', error);
      }
    }
  }

  // Get SEO health insights
  getHealthReport(): {
    score: number;
    status: string;
    issues: string[];
    suggestions: string[];
    lastUpdate: string;
  } {
    const stats = seoMonitor.getStats();
    const events = seoMonitor.getEvents();
    
    // Calculate SEO score based on various factors
    let score = 100;
    const issues: string[] = [];
    const suggestions: string[] = [];
    
    // Check 404 rate
    const total404s = stats.notFound;
    if (total404s > 50) {
      score -= 30;
      issues.push(`High 404 rate: ${total404s} not found pages`);
      suggestions.push('Review and fix broken internal links');
    }
    
    // Check redirect rate
    const totalRedirects = stats.redirects;
    if (totalRedirects > 100) {
      score -= 20;
      issues.push(`High redirect count: ${totalRedirects} redirects`);
      suggestions.push('Consider updating internal links to reduce redirect chains');
    }
    
    // Check Gone pages
    const totalGone = stats.gone;
    if (totalGone > 20) {
      score -= 10;
      issues.push(`Many gone pages: ${totalGone} permanently removed`);
      suggestions.push('Review gone pages and consider if any should be restored');
    }
    
    // Check cache performance
    const cacheStats = contentfulCache.getStats();
    if (cacheStats.size === 0) {
      score -= 10;
      issues.push('No cached content - performance may be impacted');
      suggestions.push('Allow time for caching to improve page load speeds');
    }
    
    // Determine status
    let status = 'Excellent';
    if (score < 90) status = 'Good';
    if (score < 80) status = 'Fair';
    if (score < 70) status = 'Poor';
    if (score < 50) status = 'Critical';
    
    return {
      score: Math.max(0, score),
      status,
      issues,
      suggestions,
      lastUpdate: new Date().toISOString()
    };
  }

  // Analyze problematic URLs and suggest fixes
  analyzeProblematicUrls(): {
    topErrors: Array<{ path: string; count: number; type: string }>;
    recommendations: string[];
  } {
    const events = seoMonitor.getEvents();
    const urlCounts = new Map<string, { count: number; type: string }>();
    
    // Count frequency of different types of errors
    events.forEach(event => {
      const key = event.path;
      const existing = urlCounts.get(key) || { count: 0, type: event.type };
      urlCounts.set(key, { count: existing.count + 1, type: event.type });
    });
    
    // Sort by frequency and get top 10
    const topErrors = Array.from(urlCounts.entries())
      .map(([path, data]) => ({ path, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    const recommendations: string[] = [];
    
    if (topErrors.some(e => e.type === 'not_found' && e.count > 5)) {
      recommendations.push('Add redirects for frequently accessed 404 pages');
    }
    
    if (topErrors.some(e => e.type === 'redirect' && e.count > 10)) {
      recommendations.push('Update internal links to reduce redirect overhead');
    }
    
    if (topErrors.length > 5) {
      recommendations.push('Consider adding a custom 404 page with helpful navigation');
    }
    
    return { topErrors, recommendations };
  }

  // Clear all caches and force refresh
  clearAllCaches(): void {
    contentfulCache.clear();
    console.log('🧹 All SEO caches cleared');
  }

  // Get optimization suggestions based on current state
  getOptimizationSuggestions(): string[] {
    const suggestions: string[] = [];
    const health = this.getHealthReport();
    
    if (health.score < 80) {
      suggestions.push('Run SEO health check to identify and fix issues');
    }
    
    const cacheStats = contentfulCache.getStats();
    if (cacheStats.size > 50) {
      suggestions.push('Consider increasing cache TTL for better performance');
    }
    
    const analysis = this.analyzeProblematicUrls();
    if (analysis.topErrors.length > 0) {
      suggestions.push('Review top error URLs and implement fixes');
    }
    
    return suggestions;
  }
}

// Create singleton instance
export const seoOptimizer = new SEOOptimizer();

// Add global utilities for debugging
if (typeof window !== 'undefined') {
  (window as any).seoOptimizer = {
    health: () => seoOptimizer.getHealthReport(),
    analyze: () => seoOptimizer.analyzeProblematicUrls(),
    suggestions: () => seoOptimizer.getOptimizationSuggestions(),
    clearCaches: () => seoOptimizer.clearAllCaches(),
    pingSearchEngines: () => seoOptimizer.onContentChange()
  };
}

// Automatic optimization monitoring
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  // Check SEO health every 5 minutes in development
  setInterval(() => {
    const health = seoOptimizer.getHealthReport();
    if (health.score < 80) {
      console.group('🔍 SEO Health Alert');
      console.log(`Score: ${health.score}/100 (${health.status})`);
      console.log('Issues:', health.issues);
      console.log('Suggestions:', health.suggestions);
      console.groupEnd();
    }
  }, 5 * 60 * 1000);
}