import { collectSitemapData, getTotalUrlCount, type SitemapData } from '@/utils/sitemapDataCollector';
import { contentfulCache, CACHE_KEYS } from '@/utils/contentfulCache';

// Sitemap generation without diagnostics to avoid circular dependencies
export const generateRobotsTxt = (): string => {
  return `User-agent: *
Allow: /

# Disallow admin and development pages
Disallow: /seo-dashboard
Disallow: /admin/
Disallow: /dev/
Disallow: /_netlify/

# Allow important paths explicitly
Allow: /blog/
Allow: /servicos/
Allow: /sobre
Allow: /contato

# Sitemaps
Sitemap: https://dracarlachristoph.com/sitemap.xml

# Crawl rate optimization
Crawl-delay: 1

# Specific directives for different bots
User-agent: Googlebot
Crawl-delay: 1

User-agent: Bingbot
Crawl-delay: 2`;
};

export const formatSitemapXML = (data: SitemapData): string => {
  const allUrls = [
    ...data.staticPages,
    ...data.servicePages,
    ...data.legalPages,
    ...data.blogPosts,
    ...data.blogCategories,
    ...data.blogTags,
    ...data.blogPagination
  ];

  const urlsXml = allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
};

export const generateOptimizedSitemap = async (): Promise<string> => {
  const startTime = Date.now();
  
  try {
    console.log('🗺️ Generating optimized sitemap...');
    
    // Check cache first (reduced cache time to 15 minutes)
    const cachedSitemap = contentfulCache.get<string>(CACHE_KEYS.SITEMAP_GENERATED);
    if (cachedSitemap) {
      const cacheAge = Date.now() - (contentfulCache.get<number>('sitemap_cache_timestamp') || 0);
      console.log(`✅ Using cached sitemap (${Math.round(cacheAge / 1000 / 60)} minutes old)`);
      return cachedSitemap;
    }

    // Collect sitemap data with timeout
    console.log('📊 Collecting sitemap data...');
    const sitemapDataPromise = collectSitemapData();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Sitemap generation timeout after 30s')), 30000)
    );
    
    const sitemapData = await Promise.race([sitemapDataPromise, timeoutPromise]) as any;
    const urlCount = getTotalUrlCount(sitemapData);
    
    console.log(`📊 Collected ${urlCount} URLs for sitemap:`, {
      static: sitemapData.staticPages.length,
      services: sitemapData.servicePages.length,
      legal: sitemapData.legalPages.length,
      blogPosts: sitemapData.blogPosts.length,
      categories: sitemapData.blogCategories.length,
      tags: sitemapData.blogTags.length,
      pagination: sitemapData.blogPagination.length
    });
    
    // Validate minimum URL count
    if (urlCount < 10) {
      console.warn(`⚠️ Warning: Low URL count (${urlCount}), using fallback`);
      return getBasicSitemapFallback();
    }
    
    // Format sitemap XML with proper formatting
    const sitemap = formatSitemapXML(sitemapData);
    
    // Cache the generated sitemap for 15 minutes (reduced from 1 hour)
    const cacheTime = 15 * 60 * 1000; // 15 minutes
    contentfulCache.set(CACHE_KEYS.SITEMAP_GENERATED, sitemap, cacheTime);
    contentfulCache.set(CACHE_KEYS.SITEMAP_URL_COUNT, urlCount, cacheTime);
    contentfulCache.set('sitemap_cache_timestamp', Date.now(), cacheTime);
    
    const processingTime = Date.now() - startTime;
    console.log(`✅ Sitemap generated and cached successfully (${processingTime}ms)`);
    
    return sitemap;
    
  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error(`❌ Error generating optimized sitemap (${processingTime}ms):`, error);
    
    // Return fallback instead of throwing
    console.log('🔄 Using fallback sitemap due to generation error');
    return getBasicSitemapFallback();
  }
};

export const getBasicSitemapFallback = (): string => {
  const today = new Date().toISOString().split('T')[0];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dracarlachristoph.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dracarlachristoph.com/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dracarlachristoph.com/sobre</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://dracarlachristoph.com/servicos</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dracarlachristoph.com/contato</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;
};

export const getSitemapUrlCount = (): number => {
  const cachedCount = contentfulCache.get<number>(CACHE_KEYS.SITEMAP_URL_COUNT);
  return cachedCount || 0;
};

export const pingSearchEngines = async (): Promise<void> => {
  try {
    console.log('📡 Pinging search engines...');
    
    const sitemapUrl = 'https://dracarlachristoph.com/sitemap.xml';
    
    // Ping Google
    const googleUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    
    // Ping Bing
    const bingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    
    // Use fetch with timeout for pinging
    const pingPromises = [
      fetch(googleUrl, { method: 'GET' }).catch(e => console.log('Google ping failed:', e)),
      fetch(bingUrl, { method: 'GET' }).catch(e => console.log('Bing ping failed:', e))
    ];
    
    await Promise.allSettled(pingPromises);
    console.log('✅ Search engines pinged');
    
  } catch (error) {
    console.error('❌ Error pinging search engines:', error);
  }
};