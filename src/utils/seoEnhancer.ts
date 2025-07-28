// Enhanced SEO monitoring and optimization utilities
import { seoMonitor } from './seoMonitoring';

interface SEOAnalytics {
  redirectCount: number;
  notFoundCount: number;
  goneCount: number;
  topRedirects: Array<{ path: string; destination: string; count: number }>;
  topNotFound: Array<{ path: string; count: number }>;
  lastAnalysis: string;
}

class SEOEnhancer {
  private cache: Map<string, any> = new Map();
  private lastSitemapPing: Date | null = null;
  
  // Auto-ping search engines when new content is added
  async onContentChange(): Promise<void> {
    const now = new Date();
    const timeSinceLastPing = this.lastSitemapPing 
      ? now.getTime() - this.lastSitemapPing.getTime() 
      : Infinity;
    
    // Only ping if more than 1 hour has passed
    if (timeSinceLastPing > 3600000) {
      // Dynamic import to avoid circular dependency
      const { pingSearchEngines } = await import('./sitemapGenerator');
      await pingSearchEngines();
      this.lastSitemapPing = now;
      console.log('🔔 Search engines automatically pinged about content update');
    }
  }
  
  // Generate comprehensive SEO analytics
  getAnalytics(): SEOAnalytics {
    const events = seoMonitor.getEvents();
    
    const redirectEvents = events.filter(e => e.type === 'redirect');
    const notFoundEvents = events.filter(e => e.type === 'not_found');
    const goneEvents = events.filter(e => e.type === 'gone');
    
    // Count occurrences
    const redirectCounts = new Map<string, { destination: string; count: number }>();
    const notFoundCounts = new Map<string, number>();
    
    redirectEvents.forEach(event => {
      const key = `${event.path} → ${event.destination}`;
      const existing = redirectCounts.get(event.path);
      if (existing) {
        existing.count++;
      } else {
        redirectCounts.set(event.path, { 
          destination: event.destination || '', 
          count: 1 
        });
      }
    });
    
    notFoundEvents.forEach(event => {
      const count = notFoundCounts.get(event.path) || 0;
      notFoundCounts.set(event.path, count + 1);
    });
    
    // Convert to sorted arrays
    const topRedirects = Array.from(redirectCounts.entries())
      .map(([path, data]) => ({ path, destination: data.destination, count: data.count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    const topNotFound = Array.from(notFoundCounts.entries())
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    return {
      redirectCount: redirectEvents.length,
      notFoundCount: notFoundEvents.length,
      goneCount: goneEvents.length,
      topRedirects,
      topNotFound,
      lastAnalysis: new Date().toISOString()
    };
  }
  
  // Monitor for problematic URLs and suggest fixes
  analyzeProblematicUrls(): string[] {
    const analytics = this.getAnalytics();
    const suggestions: string[] = [];
    
    if (analytics.notFoundCount > 10) {
      suggestions.push(`🚨 High 404 rate detected: ${analytics.notFoundCount} 404 errors`);
    }
    
    analytics.topNotFound.forEach(item => {
      if (item.count > 3) {
        suggestions.push(`⚠️ Frequent 404: ${item.path} (${item.count} times) - consider adding redirect`);
      }
    });
    
    analytics.topRedirects.forEach(item => {
      if (item.count > 10) {
        suggestions.push(`📈 High redirect usage: ${item.path} → ${item.destination} (${item.count} times)`);
      }
    });
    
    return suggestions;
  }
  
  // Cache management for performance
  setCacheItem(key: string, value: any, ttl: number = 3600000): void {
    this.cache.set(key, {
      value,
      expires: Date.now() + ttl
    });
  }
  
  getCacheItem(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }
  
  // Generate SEO health report
  getHealthReport(): {
    score: number;
    status: string;
    analytics: SEOAnalytics;
    suggestions: string[];
    timestamp: string;
  } {
    const analytics = this.getAnalytics();
    const suggestions = this.analyzeProblematicUrls();
    
    const healthScore = Math.max(0, 100 - 
      (analytics.notFoundCount * 2) - 
      (analytics.goneCount * 0.5) - 
      (suggestions.length * 5)
    );
    
    return {
      score: Math.round(healthScore),
      status: healthScore > 80 ? 'excellent' : healthScore > 60 ? 'good' : 'needs-attention',
      analytics,
      suggestions,
      timestamp: new Date().toISOString()
    };
  }
}

// Export singleton instance
export const seoEnhancer = new SEOEnhancer();

// Auto-initialize monitoring in development
if (import.meta.env.DEV) {
  setInterval(() => {
    const report = seoEnhancer.getHealthReport();
    if (report.score < 80) {
      console.group('🔍 SEO Health Report');
      console.log('Score:', report.score);
      console.log('Status:', report.status);
      console.log('Suggestions:', report.suggestions);
      console.groupEnd();
    }
  }, 300000); // Every 5 minutes
}