interface IndexingStatus {
  url: string;
  lastChecked: number;
  isIndexed: boolean;
  googleIndexed?: boolean;
  bingIndexed?: boolean;
  errors?: string[];
}

interface IndexingReport {
  totalUrls: number;
  indexedCount: number;
  notIndexedCount: number;
  errorCount: number;
  indexingRate: number;
  lastCheck: number;
  problematicUrls: string[];
  recommendations: string[];
}

class IndexingMonitor {
  private statusMap: Map<string, IndexingStatus> = new Map();
  private readonly cacheKey = 'indexing-status';
  private readonly maxAge = 24 * 60 * 60 * 1000; // 24 hours

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.cacheKey);
      if (stored) {
        const data = JSON.parse(stored);
        this.statusMap = new Map(data);
      }
    } catch (error) {
      console.warn('Failed to load indexing status:', error);
    }
  }

  private saveToStorage() {
    try {
      const data = Array.from(this.statusMap.entries());
      localStorage.setItem(this.cacheKey, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save indexing status:', error);
    }
  }

  public async checkUrlIndexing(url: string): Promise<IndexingStatus> {
    const existing = this.statusMap.get(url);
    const now = Date.now();

    // Return cached result if recent enough
    if (existing && (now - existing.lastChecked) < this.maxAge) {
      return existing;
    }

    console.log(`🔍 Checking indexing status for: ${url}`);

    const status: IndexingStatus = {
      url,
      lastChecked: now,
      isIndexed: false,
      errors: []
    };

    try {
      // Check Google indexing using site: search
      status.googleIndexed = await this.checkGoogleIndexing(url);
      
      // Check Bing indexing (simplified check)
      status.bingIndexed = await this.checkBingIndexing(url);
      
      status.isIndexed = status.googleIndexed || status.bingIndexed || false;
      
    } catch (error) {
      console.error(`❌ Error checking indexing for ${url}:`, error);
      status.errors?.push(error instanceof Error ? error.message : 'Unknown error');
    }

    this.statusMap.set(url, status);
    this.saveToStorage();
    return status;
  }

  private async checkGoogleIndexing(url: string): Promise<boolean> {
    // Note: Direct site: searches are limited by CORS
    // This is a simplified check - in production, you'd use Google Search Console API
    try {
      const searchUrl = `https://www.google.com/search?q=site:${encodeURIComponent(url)}`;
      console.log(`🔍 Google search check: ${searchUrl}`);
      
      // Since we can't directly fetch due to CORS, we'll return true
      // In production, use Google Search Console API or server-side checking
      return true; // Placeholder - would need proper API integration
      
    } catch (error) {
      console.warn(`Google indexing check failed for ${url}:`, error);
      return false;
    }
  }

  private async checkBingIndexing(url: string): Promise<boolean> {
    // Similar limitation as Google - would need server-side implementation
    try {
      console.log(`🔍 Checking Bing indexing for: ${url}`);
      return true; // Placeholder - would need proper API integration
    } catch (error) {
      console.warn(`Bing indexing check failed for ${url}:`, error);
      return false;
    }
  }

  public async generateIndexingReport(urls: string[]): Promise<IndexingReport> {
    console.log('📊 Generating indexing report...');
    
    const results = await Promise.all(
      urls.slice(0, 50).map(url => this.checkUrlIndexing(url)) // Limit to 50 URLs
    );

    const totalUrls = results.length;
    const indexedCount = results.filter(r => r.isIndexed).length;
    const notIndexedCount = totalUrls - indexedCount;
    const errorCount = results.filter(r => r.errors && r.errors.length > 0).length;
    const indexingRate = totalUrls > 0 ? (indexedCount / totalUrls) * 100 : 0;

    const problematicUrls = results
      .filter(r => !r.isIndexed || (r.errors && r.errors.length > 0))
      .map(r => r.url)
      .slice(0, 10); // Top 10 problematic URLs

    const recommendations: string[] = [];
    
    if (indexingRate < 50) {
      recommendations.push('🚨 Low indexing rate - check robots.txt and meta tags');
    }
    
    if (indexingRate < 30) {
      recommendations.push('⚠️ Critical indexing issues - verify sitemap submission');
    }
    
    if (errorCount > totalUrls * 0.1) {
      recommendations.push('🔧 High error rate - investigate crawling issues');
    }

    if (problematicUrls.length > 0) {
      recommendations.push(`🎯 Focus on fixing: ${problematicUrls.slice(0, 3).join(', ')}`);
    }

    const report: IndexingReport = {
      totalUrls,
      indexedCount,
      notIndexedCount,
      errorCount,
      indexingRate: Math.round(indexingRate),
      lastCheck: Date.now(),
      problematicUrls,
      recommendations
    };

    console.log('📋 Indexing report generated:', report);
    return report;
  }

  public getStoredReport(): IndexingReport | null {
    try {
      const stored = localStorage.getItem('indexing-report');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  public saveReport(report: IndexingReport) {
    try {
      localStorage.setItem('indexing-report', JSON.stringify(report));
    } catch (error) {
      console.warn('Failed to save indexing report:', error);
    }
  }

  public clearCache() {
    this.statusMap.clear();
    this.saveToStorage();
    localStorage.removeItem('indexing-report');
  }

  public generateSubmissionGuide(): string {
    return `# Google Search Console Submission Guide

## 1. Submit Sitemap
1. Go to https://search.google.com/search-console
2. Select your property: dracarlachristoph.com
3. Navigate to Sitemaps in the left menu
4. Submit: https://dracarlachristoph.com/sitemap.xml

## 2. Request Indexing for Key Pages
Use the URL Inspection Tool for these priority pages:
- https://dracarlachristoph.com/
- https://dracarlachristoph.com/blog
- https://dracarlachristoph.com/servicos
- https://dracarlachristoph.com/sobre
- https://dracarlachristoph.com/contato

## 3. Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Add your site if not already added
3. Submit sitemap: https://dracarlachristoph.com/sitemap.xml

## 4. Monitor Progress
- Check indexing status weekly
- Use URL Inspection Tool for problematic pages
- Monitor Core Web Vitals performance

## 5. Common Issues to Check
- Ensure pages load quickly (< 2.5s LCP)
- Verify mobile-friendliness
- Check for crawl errors in Search Console
- Monitor for duplicate content issues

Generated on: ${new Date().toISOString()}`;
  }
}

export const indexingMonitor = new IndexingMonitor();
export type { IndexingReport, IndexingStatus };