import { contentfulClient, DEFAULT_LOCALE } from '@/services/contentful/client';
import { getAllBlogPosts } from '@/services/contentful/queries';
import { blogPosts } from '@/data/blogPosts';
import { contentfulCache, CACHE_KEYS } from '@/utils/contentfulCache';

export interface DiagnosticReport {
  timestamp: string;
  contentfulConnection: boolean;
  contentfulErrors: string[];
  blogPostCount: {
    contentful: number;
    local: number;
    cached: number;
  };
  cacheStatus: {
    isHealthy: boolean;
    entries: number;
    cacheKeys: string[];
  };
  sitemapGeneration: {
    success: boolean;
    urlCount: number;
    errors: string[];
  };
  recommendations: string[];
}

export const runCoreContentfulDiagnostics = async (): Promise<Partial<DiagnosticReport>> => {
  const report: Partial<DiagnosticReport> = {
    timestamp: new Date().toISOString(),
    contentfulConnection: false,
    contentfulErrors: [],
    blogPostCount: {
      contentful: 0,
      local: blogPosts.length,
      cached: 0
    },
    cacheStatus: {
      isHealthy: false,
      entries: 0,
      cacheKeys: []
    },
    recommendations: []
  };

  console.log('🔍 Running core diagnostics...');

  // Test Contentful connection with timeout
  try {
    console.log('📡 Testing Contentful connection...');
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Contentful connection timeout')), 10000)
    );
    
    const testResponse = await Promise.race([
      contentfulClient.getEntries({
        content_type: 'blogCarla',
        limit: 1,
        locale: DEFAULT_LOCALE,
      }),
      timeoutPromise
    ]);
    
    report.contentfulConnection = true;
    console.log('✅ Contentful connection successful');
    
    // Get full blog post count from Contentful
    const fullResponse = await Promise.race([
      contentfulClient.getEntries({
        content_type: 'blogCarla',
        limit: 1000,
        locale: DEFAULT_LOCALE,
      }),
      timeoutPromise
    ]);
    
    report.blogPostCount!.contentful = Array.isArray((fullResponse as any)?.items) ? (fullResponse as any).items.length : 0;
    console.log(`📊 Contentful has ${report.blogPostCount!.contentful} blog posts`);
    
  } catch (error) {
    report.contentfulConnection = false;
    report.contentfulErrors!.push(error instanceof Error ? error.message : 'Unknown connection error');
    console.error('❌ Contentful connection failed:', error);
  }

  // Check cache status
  try {
    const cacheStats = contentfulCache.getStats();
    report.cacheStatus = {
      isHealthy: true,
      entries: cacheStats.size,
      cacheKeys: cacheStats.entries.map(entry => entry.key)
    };
    
    // Check for cached blog posts
    const cachedPosts = contentfulCache.get<any[]>(CACHE_KEYS.ALL_BLOG_POSTS);
    report.blogPostCount!.cached = cachedPosts ? cachedPosts.length : 0;
    
    console.log(`💾 Cache status: ${cacheStats.size} entries, ${report.blogPostCount!.cached} cached posts`);
  } catch (error) {
    report.cacheStatus!.isHealthy = false;
    console.error('❌ Cache check failed:', error);
  }

  return report;
};

export const testSitemapGeneration = async (): Promise<{ success: boolean; urlCount: number; errors: string[] }> => {
  try {
    console.log('🗺️ Testing sitemap generation...');
    
    // Import sitemap generator dynamically to avoid circular dependencies
    const { collectSitemapData, getTotalUrlCount } = await import('@/utils/sitemapDataCollector');
    
    const sitemapData = await collectSitemapData();
    const urlCount = getTotalUrlCount(sitemapData);
    
    console.log(`✅ Sitemap data collected with ${urlCount} URLs`);
    
    return {
      success: true,
      urlCount,
      errors: []
    };
  } catch (error) {
    console.error('❌ Sitemap generation test failed:', error);
    return {
      success: false,
      urlCount: 0,
      errors: [error instanceof Error ? error.message : 'Unknown sitemap error']
    };
  }
};

export const generateRecommendations = (report: DiagnosticReport): string[] => {
  const recommendations: string[] = [];
  
  if (!report.contentfulConnection) {
    recommendations.push('🔌 Fix Contentful connection - check credentials and network');
  }
  
  if (report.blogPostCount.contentful === 0 && report.contentfulConnection) {
    recommendations.push('📝 No blog posts found in Contentful - verify content type and data');
  }
  
  if (report.blogPostCount.contentful > 0 && report.sitemapGeneration.urlCount < 30) {
    recommendations.push('🗺️ Sitemap missing blog posts - check sitemap generation logic');
  }
  
  if (!report.cacheStatus.isHealthy) {
    recommendations.push('💾 Cache system issues - check cache implementation');
  }
  
  if (report.sitemapGeneration.urlCount < 50) {
    recommendations.push('📈 Low URL count in sitemap - verify all pages are included');
  }

  return recommendations;
};

export const logDiagnosticSummary = (report: DiagnosticReport): void => {
  console.log('🔍 === SITEMAP DIAGNOSTIC SUMMARY ===');
  console.log(`📅 Timestamp: ${report.timestamp}`);
  console.log(`🔌 Contentful Connection: ${report.contentfulConnection ? '✅' : '❌'}`);
  console.log(`📚 Blog Posts - Contentful: ${report.blogPostCount.contentful}, Local: ${report.blogPostCount.local}, Cached: ${report.blogPostCount.cached}`);
  console.log(`💾 Cache: ${report.cacheStatus.isHealthy ? '✅' : '❌'} (${report.cacheStatus.entries} entries)`);
  console.log(`🗺️ Sitemap: ${report.sitemapGeneration.success ? '✅' : '❌'} (${report.sitemapGeneration.urlCount} URLs)`);
  
  if (report.contentfulErrors.length > 0) {
    console.log('❌ Contentful Errors:', report.contentfulErrors);
  }
  
  if (report.sitemapGeneration.errors.length > 0) {
    console.log('❌ Sitemap Errors:', report.sitemapGeneration.errors);
  }
  
  if (report.recommendations.length > 0) {
    console.log('💡 Recommendations:');
    report.recommendations.forEach(rec => console.log(`  ${rec}`));
  }
  
  console.log('🔍 === END DIAGNOSTIC SUMMARY ===');
};