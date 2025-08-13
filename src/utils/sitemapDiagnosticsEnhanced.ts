import { testContentfulConnectivity } from '@/utils/enhancedContentfulQueries';
import { getAllBlogPosts } from '@/services/contentful/queries';
import { blogPosts } from '@/data/blogPosts';
import { contentfulCache, CACHE_KEYS } from '@/utils/contentfulCache';

export interface SitemapDiagnosticReport {
  timestamp: string;
  contentfulConnection: boolean;
  contentfulErrors: string[];
  blogPostCounts: {
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
    breakdown: {
      static: number;
      services: number;
      legal: number;
      blogPosts: number;
      blogCategories: number;
      blogTags: number;
      blogPagination: number;
    };
  };
  networkConnectivity: {
    googleSearchConsole: boolean;
    bingWebmaster: boolean;
  };
  recommendations: string[];
}

export const runComprehensiveSitemapDiagnostics = async (): Promise<SitemapDiagnosticReport> => {
  console.log('🔍 Running comprehensive sitemap diagnostics...');
  
  const report: SitemapDiagnosticReport = {
    timestamp: new Date().toISOString(),
    contentfulConnection: false,
    contentfulErrors: [],
    blogPostCounts: { contentful: 0, local: 0, cached: 0 },
    cacheStatus: { isHealthy: false, entries: 0, cacheKeys: [] },
    sitemapGeneration: { 
      success: false, 
      urlCount: 0, 
      errors: [],
      breakdown: {
        static: 0,
        services: 0,
        legal: 0,
        blogPosts: 0,
        blogCategories: 0,
        blogTags: 0,
        blogPagination: 0
      }
    },
    networkConnectivity: { googleSearchConsole: false, bingWebmaster: false },
    recommendations: []
  };

  // 1. Test Contentful connectivity
  try {
    console.log('🔗 Testing Contentful connectivity...');
    report.contentfulConnection = await testContentfulConnectivity();
    
    if (report.contentfulConnection) {
      console.log('✅ Contentful connectivity: OK');
      
      // Get Contentful blog posts count
      try {
        const contentfulPosts = await getAllBlogPosts();
        report.blogPostCounts.contentful = contentfulPosts.length;
        console.log(`📊 Contentful posts: ${contentfulPosts.length}`);
      } catch (error) {
        report.contentfulErrors.push(`Failed to fetch posts: ${error}`);
      }
    } else {
      console.log('❌ Contentful connectivity: FAILED');
      report.contentfulErrors.push('Connection test failed');
    }
  } catch (error) {
    report.contentfulConnection = false;
    report.contentfulErrors.push(`Connectivity error: ${error}`);
  }

  // 2. Local blog posts count
  report.blogPostCounts.local = blogPosts.length;

  // 3. Cache status
  try {
    const cachedPosts = contentfulCache.get<any[]>(CACHE_KEYS.ALL_BLOG_POSTS);
    report.blogPostCounts.cached = cachedPosts?.length || 0;
    
    // Filter out function values from CACHE_KEYS and convert to string array
    const cacheKeyEntries = Object.entries(CACHE_KEYS);
    const stringCacheKeys = cacheKeyEntries
      .filter(([, value]) => typeof value === 'string')
      .map(([, value]) => value as string);
    
    let cacheEntries = 0;
    const activeCacheKeys: string[] = [];
    
    stringCacheKeys.forEach(key => {
      if (contentfulCache.get(key)) {
        cacheEntries++;
        activeCacheKeys.push(key);
      }
    });
    
    report.cacheStatus = {
      isHealthy: cacheEntries > 0,
      entries: cacheEntries,
      cacheKeys: activeCacheKeys
    };
  } catch (error) {
    report.cacheStatus = { isHealthy: false, entries: 0, cacheKeys: [] };
  }

  // 4. Test sitemap generation
  try {
    console.log('🗺️ Testing sitemap generation...');
    const { collectSitemapData, getTotalUrlCount } = await import('@/utils/sitemapDataCollector');
    const sitemapData = await collectSitemapData();
    
    report.sitemapGeneration.success = true;
    report.sitemapGeneration.urlCount = getTotalUrlCount(sitemapData);
    report.sitemapGeneration.breakdown = {
      static: sitemapData.staticPages.length,
      services: sitemapData.servicePages.length,
      legal: sitemapData.legalPages.length,
      blogPosts: sitemapData.blogPosts.length,
      blogCategories: sitemapData.blogCategories.length,
      blogTags: sitemapData.blogTags.length,
      blogPagination: sitemapData.blogPagination.length
    };
    
    console.log(`✅ Sitemap generation successful: ${report.sitemapGeneration.urlCount} URLs`);
  } catch (error) {
    report.sitemapGeneration.success = false;
    report.sitemapGeneration.errors.push(`Generation failed: ${error}`);
    console.error('❌ Sitemap generation failed:', error);
  }

  // 5. Test network connectivity (basic check)
  try {
    // Test Google connectivity
    const googleTest = await fetch('https://www.google.com/ping?sitemap=https://example.com/test', { 
      method: 'HEAD',
      mode: 'no-cors'
    }).then(() => true).catch(() => false);
    report.networkConnectivity.googleSearchConsole = googleTest;

    // Test Bing connectivity
    const bingTest = await fetch('https://www.bing.com/ping?sitemap=https://example.com/test', { 
      method: 'HEAD',
      mode: 'no-cors'
    }).then(() => true).catch(() => false);
    report.networkConnectivity.bingWebmaster = bingTest;
  } catch (error) {
    console.warn('Network connectivity test failed:', error);
  }

  // 6. Generate recommendations
  report.recommendations = generateDiagnosticRecommendations(report);

  console.log('📋 Comprehensive diagnostic report complete');
  return report;
};

const generateDiagnosticRecommendations = (report: SitemapDiagnosticReport): string[] => {
  const recommendations: string[] = [];

  // Contentful recommendations
  if (!report.contentfulConnection) {
    recommendations.push('🔥 CRITICAL: Fix Contentful connection - check API keys and network');
    recommendations.push('💡 Verify Contentful environment variables and space ID');
  }

  if (report.blogPostCounts.contentful === 0 && report.contentfulConnection) {
    recommendations.push('📝 WARNING: No blog posts found in Contentful - check content type');
  }

  if (report.blogPostCounts.contentful < report.blogPostCounts.local) {
    recommendations.push('📊 INFO: Contentful has fewer posts than local data - sync needed');
  }

  // Cache recommendations
  if (!report.cacheStatus.isHealthy) {
    recommendations.push('💾 WARNING: Cache system not functioning - performance impact');
  }

  // Sitemap recommendations
  if (!report.sitemapGeneration.success) {
    recommendations.push('🗺️ CRITICAL: Sitemap generation failing - immediate fix needed');
  }

  if (report.sitemapGeneration.urlCount < 50) {
    recommendations.push('📉 WARNING: Low URL count in sitemap - missing content or generation issues');
  }

  if (report.sitemapGeneration.breakdown.blogPosts === 0) {
    recommendations.push('📝 CRITICAL: No blog posts in sitemap - check blog post fetching');
  }

  // General recommendations
  if (report.sitemapGeneration.urlCount < 100) {
    recommendations.push('🚀 OPTIMIZE: Consider adding more URL types (categories, tags, pagination)');
  }

  recommendations.push('🔄 MAINTENANCE: Run diagnostics weekly to monitor sitemap health');
  recommendations.push('📊 MONITOR: Check Google Search Console for indexing status');

  return recommendations;
};

export const logComprehensiveDiagnosticSummary = (report: SitemapDiagnosticReport): void => {
  console.log('\n📋 =============== SITEMAP DIAGNOSTIC SUMMARY ===============');
  console.log(`🕐 Timestamp: ${report.timestamp}`);
  console.log(`🔗 Contentful Connected: ${report.contentfulConnection ? '✅ YES' : '❌ NO'}`);
  
  if (report.contentfulErrors.length > 0) {
    console.log(`❌ Contentful Errors: ${report.contentfulErrors.join(', ')}`);
  }
  
  console.log('\n📊 BLOG POST COUNTS:');
  console.log(`   Contentful: ${report.blogPostCounts.contentful}`);
  console.log(`   Local: ${report.blogPostCounts.local}`);
  console.log(`   Cached: ${report.blogPostCounts.cached}`);
  
  console.log('\n💾 CACHE STATUS:');
  console.log(`   Healthy: ${report.cacheStatus.isHealthy ? '✅' : '❌'}`);
  console.log(`   Entries: ${report.cacheStatus.entries}`);
  
  console.log('\n🗺️ SITEMAP GENERATION:');
  console.log(`   Success: ${report.sitemapGeneration.success ? '✅' : '❌'}`);
  console.log(`   Total URLs: ${report.sitemapGeneration.urlCount}`);
  
  if (report.sitemapGeneration.success) {
    console.log('   📊 URL Breakdown:');
    console.log(`      Static: ${report.sitemapGeneration.breakdown.static}`);
    console.log(`      Services: ${report.sitemapGeneration.breakdown.services}`);
    console.log(`      Legal: ${report.sitemapGeneration.breakdown.legal}`);
    console.log(`      Blog Posts: ${report.sitemapGeneration.breakdown.blogPosts}`);
    console.log(`      Categories: ${report.sitemapGeneration.breakdown.blogCategories}`);
    console.log(`      Tags: ${report.sitemapGeneration.breakdown.blogTags}`);
    console.log(`      Pagination: ${report.sitemapGeneration.breakdown.blogPagination}`);
  }
  
  if (report.sitemapGeneration.errors.length > 0) {
    console.log(`❌ Sitemap Errors: ${report.sitemapGeneration.errors.join(', ')}`);
  }
  
  console.log('\n💡 RECOMMENDATIONS:');
  report.recommendations.forEach(rec => console.log(`   ${rec}`));
  console.log('===============================================================\n');
};