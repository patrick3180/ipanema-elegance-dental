interface URLOptimizationResult {
  original: string;
  optimized: string;
  changes: string[];
  seoScore: number;
  issues: string[];
  recommendations: string[];
}

interface SitemapOptimizationReport {
  totalUrls: number;
  optimizedUrls: number;
  averageSeoScore: number;
  criticalIssues: string[];
  recommendations: string[];
  urlAnalysis: URLOptimizationResult[];
}

class URLOptimizer {
  private readonly maxUrlLength = 100;
  private readonly idealUrlLength = 60;
  private readonly baseUrl = 'https://dracarlachristoph.com';

  public optimizeUrl(url: string): URLOptimizationResult {
    const result: URLOptimizationResult = {
      original: url,
      optimized: url,
      changes: [],
      seoScore: 100,
      issues: [],
      recommendations: []
    };

    // Clean the URL
    let optimized = this.cleanUrl(url);
    
    // Check URL length
    if (optimized.length > this.maxUrlLength) {
      result.issues.push(`URL too long: ${optimized.length} characters`);
      result.seoScore -= 20;
      result.recommendations.push('Consider shortening URL structure');
    } else if (optimized.length > this.idealUrlLength) {
      result.seoScore -= 5;
      result.recommendations.push('URL could be shorter for better SEO');
    }

    // Check for SEO-friendly structure
    if (this.hasGoodStructure(optimized)) {
      result.seoScore += 10;
    } else {
      result.issues.push('URL structure could be more SEO-friendly');
      result.seoScore -= 10;
    }

    // Check for keywords
    if (this.hasRelevantKeywords(optimized)) {
      result.seoScore += 5;
    }

    // Check for common issues
    this.checkCommonIssues(optimized, result);

    result.optimized = optimized;
    return result;
  }

  private cleanUrl(url: string): string {
    // Remove base URL if present
    let cleaned = url.replace(this.baseUrl, '');
    
    // Ensure starts with /
    if (!cleaned.startsWith('/')) {
      cleaned = '/' + cleaned;
    }

    // Remove trailing slash (except for root)
    if (cleaned.length > 1 && cleaned.endsWith('/')) {
      cleaned = cleaned.slice(0, -1);
    }

    // Convert to lowercase
    cleaned = cleaned.toLowerCase();

    // Replace spaces with hyphens
    cleaned = cleaned.replace(/\s+/g, '-');

    // Remove multiple consecutive hyphens
    cleaned = cleaned.replace(/-+/g, '-');

    return cleaned;
  }

  private hasGoodStructure(url: string): boolean {
    // Check for hierarchical structure
    const segments = url.split('/').filter(s => s.length > 0);
    
    // Good URLs have 1-3 segments
    if (segments.length >= 1 && segments.length <= 3) {
      return true;
    }

    // Check for meaningful segments
    return segments.every(segment => 
      segment.length >= 3 && 
      !segment.includes('_') && 
      !segment.includes('%')
    );
  }

  private hasRelevantKeywords(url: string): boolean {
    const dentalKeywords = [
      'dent', 'implant', 'clareament', 'faceta', 'lente',
      'protese', 'canal', 'gengiva', 'clinic', 'estetica',
      'restauracao', 'sobre', 'servico', 'contato', 'blog'
    ];

    return dentalKeywords.some(keyword => 
      url.toLowerCase().includes(keyword)
    );
  }

  private checkCommonIssues(url: string, result: URLOptimizationResult): void {
    // Check for numbers at the end (often indicates dynamic content)
    if (/\/\d+$/.test(url)) {
      result.issues.push('URL ends with number - may indicate non-SEO-friendly structure');
      result.seoScore -= 5;
    }

    // Check for query parameters
    if (url.includes('?')) {
      result.issues.push('URL contains query parameters - not ideal for SEO');
      result.seoScore -= 15;
    }

    // Check for underscores
    if (url.includes('_')) {
      result.issues.push('URL contains underscores - hyphens are preferred');
      result.seoScore -= 5;
      result.recommendations.push('Replace underscores with hyphens');
    }

    // Check for special characters
    if (/[^a-zA-Z0-9\-\/]/.test(url.replace(/[?&=]/g, ''))) {
      result.issues.push('URL contains special characters');
      result.seoScore -= 10;
    }

    // Check for depth
    const depth = (url.match(/\//g) || []).length;
    if (depth > 4) {
      result.issues.push('URL is too deep in hierarchy');
      result.seoScore -= 10;
      result.recommendations.push('Consider flattening URL structure');
    }
  }

  public generateSitemapPriorities(urls: string[]): Record<string, number> {
    const priorities: Record<string, number> = {};

    urls.forEach(url => {
      let priority = 0.5; // Default priority

      // Homepage gets highest priority
      if (url === '/' || url === '') {
        priority = 1.0;
      }
      // Main pages get high priority
      else if (['/sobre', '/servicos', '/contato', '/blog'].includes(url)) {
        priority = 0.9;
      }
      // Service pages get medium-high priority
      else if (url.includes('/servicos/') || this.isServicePage(url)) {
        priority = 0.8;
      }
      // Blog posts get medium priority
      else if (url.includes('/blog/')) {
        priority = 0.7;
      }
      // Legal/policy pages get lower priority
      else if (url.includes('/politica') || url.includes('/termos')) {
        priority = 0.4;
      }
      // Admin/development pages get lowest priority
      else if (url.includes('/admin') || url.includes('/dashboard')) {
        priority = 0.2;
      }

      priorities[url] = priority;
    });

    return priorities;
  }

  private isServicePage(url: string): boolean {
    const servicePatterns = [
      'implant', 'clareament', 'faceta', 'lente', 'protese',
      'canal', 'gengiva', 'clinic', 'estetica', 'restauracao'
    ];

    return servicePatterns.some(pattern => url.includes(pattern));
  }

  public generateChangeFrequencies(urls: string[]): Record<string, string> {
    const frequencies: Record<string, string> = {};

    urls.forEach(url => {
      let frequency = 'monthly'; // Default

      // Homepage changes frequently
      if (url === '/' || url === '') {
        frequency = 'weekly';
      }
      // Blog section changes often
      else if (url === '/blog') {
        frequency = 'daily';
      }
      // Blog posts are static once published
      else if (url.includes('/blog/')) {
        frequency = 'yearly';
      }
      // Service pages change occasionally
      else if (this.isServicePage(url) || url.includes('/servicos')) {
        frequency = 'monthly';
      }
      // Contact and about pages change rarely
      else if (['/contato', '/sobre'].includes(url)) {
        frequency = 'monthly';
      }
      // Legal pages change very rarely
      else if (url.includes('/politica') || url.includes('/termos')) {
        frequency = 'yearly';
      }

      frequencies[url] = frequency;
    });

    return frequencies;
  }

  public analyzeSitemapUrls(urls: string[]): SitemapOptimizationReport {
    console.log('🔍 Analyzing sitemap URLs for optimization...');

    const urlAnalysis = urls.map(url => this.optimizeUrl(url));
    const optimizedUrls = urlAnalysis.filter(analysis => 
      analysis.optimized !== analysis.original
    );

    const averageSeoScore = Math.round(
      urlAnalysis.reduce((sum, analysis) => sum + analysis.seoScore, 0) / urlAnalysis.length
    );

    const criticalIssues = [
      ...new Set(
        urlAnalysis
          .filter(analysis => analysis.seoScore < 70)
          .flatMap(analysis => analysis.issues)
      )
    ];

    const recommendations = [
      ...new Set(
        urlAnalysis.flatMap(analysis => analysis.recommendations)
      )
    ];

    // Add general recommendations based on analysis
    if (averageSeoScore < 80) {
      recommendations.push('Consider implementing URL optimization across the site');
    }

    if (criticalIssues.length > urls.length * 0.2) {
      recommendations.push('High number of URL issues detected - prioritize URL structure improvements');
    }

    return {
      totalUrls: urls.length,
      optimizedUrls: optimizedUrls.length,
      averageSeoScore,
      criticalIssues,
      recommendations,
      urlAnalysis: urlAnalysis.slice(0, 20) // Limit to first 20 for display
    };
  }

  public generateOptimizedSitemapData(urls: string[]): {
    priorities: Record<string, number>;
    changeFrequencies: Record<string, string>;
    optimizationReport: SitemapOptimizationReport;
  } {
    const priorities = this.generateSitemapPriorities(urls);
    const changeFrequencies = this.generateChangeFrequencies(urls);
    const optimizationReport = this.analyzeSitemapUrls(urls);

    return {
      priorities,
      changeFrequencies,
      optimizationReport
    };
  }
}

export const urlOptimizer = new URLOptimizer();
export type { URLOptimizationResult, SitemapOptimizationReport };