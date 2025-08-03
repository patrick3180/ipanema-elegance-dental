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

export const runSitemapDiagnostics = async (): Promise<DiagnosticReport> => {
  const report: DiagnosticReport = {
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
    sitemapGeneration: {
      success: false,
      urlCount: 0,
      errors: []
    },
    recommendations: []
  };

  console.log('🔍 Running comprehensive sitemap diagnostics...');

  // Test Contentful connection
  try {
    console.log('📡 Testing Contentful connection...');
    const testResponse = await contentfulClient.getEntries({
      content_type: 'blogCarla',
      limit: 1,
      locale: DEFAULT_LOCALE,
    });
    
    report.contentfulConnection = true;
    console.log('✅ Contentful connection successful');
    
    // Get full blog post count from Contentful
    const fullResponse = await contentfulClient.getEntries({
      content_type: 'blogCarla',
      limit: 1000,
      locale: DEFAULT_LOCALE,
    });
    
    report.blogPostCount.contentful = fullResponse.items.length;
    console.log(`📊 Contentful has ${fullResponse.items.length} blog posts`);
    
  } catch (error) {
    report.contentfulConnection = false;
    report.contentfulErrors.push(error instanceof Error ? error.message : 'Unknown error');
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
    report.blogPostCount.cached = cachedPosts ? cachedPosts.length : 0;
    
    console.log(`💾 Cache status: ${cacheStats.size} entries, ${report.blogPostCount.cached} cached posts`);
  } catch (error) {
    report.cacheStatus.isHealthy = false;
    console.error('❌ Cache check failed:', error);
  }

  // Test blog post fetching
  try {
    console.log('📚 Testing blog post fetching...');
    const fetchedPosts = await getAllBlogPosts();
    
    if (fetchedPosts.length > 0) {
      console.log(`✅ Successfully fetched ${fetchedPosts.length} blog posts`);
      
      // Test sitemap generation
      const { generateSitemap } = await import('@/utils/sitemapGenerator');
      const sitemap = await generateSitemap();
      
      // Count URLs in sitemap
      const urlMatches = sitemap.match(/<url>/g);
      report.sitemapGeneration.urlCount = urlMatches ? urlMatches.length : 0;
      report.sitemapGeneration.success = true;
      
      console.log(`🗺️ Sitemap generated with ${report.sitemapGeneration.urlCount} URLs`);
    } else {
      report.sitemapGeneration.errors.push('No blog posts fetched');
    }
  } catch (error) {
    report.sitemapGeneration.success = false;
    report.sitemapGeneration.errors.push(error instanceof Error ? error.message : 'Unknown error');
    console.error('❌ Sitemap generation failed:', error);
  }

  // Generate recommendations
  if (!report.contentfulConnection) {
    report.recommendations.push('🔌 Fix Contentful connection - check credentials and network');
  }
  
  if (report.blogPostCount.contentful === 0 && report.contentfulConnection) {
    report.recommendations.push('📝 No blog posts found in Contentful - verify content type and data');
  }
  
  if (report.blogPostCount.contentful > 0 && report.sitemapGeneration.urlCount < 30) {
    report.recommendations.push('🗺️ Sitemap missing blog posts - check sitemap generation logic');
  }
  
  if (!report.cacheStatus.isHealthy) {
    report.recommendations.push('💾 Cache system issues - check cache implementation');
  }
  
  if (report.sitemapGeneration.urlCount < 50) {
    report.recommendations.push('📈 Low URL count in sitemap - verify all pages are included');
  }

  console.log('📋 Diagnostic report complete:', report);
  return report;
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