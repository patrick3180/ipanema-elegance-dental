import { collectSitemapData, getTotalUrlCount, type SitemapData } from '@/utils/sitemapDataCollector';
import { contentfulCache, CACHE_KEYS } from '@/utils/contentfulCache';

// Sitemap generation without diagnostics to avoid circular dependencies
export const generateRobotsTxt = (): string => {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://dracarlachristoph.com/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;
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
  try {
    console.log('🗺️ Generating optimized sitemap...');
    
    // Check cache first
    const cachedSitemap = contentfulCache.get<string>(CACHE_KEYS.SITEMAP_GENERATED);
    if (cachedSitemap) {
      console.log('✅ Using cached sitemap');
      return cachedSitemap;
    }

    // Collect sitemap data
    const sitemapData = await collectSitemapData();
    const urlCount = getTotalUrlCount(sitemapData);
    
    console.log(`📊 Collected ${urlCount} URLs for sitemap`);
    
    // Format sitemap XML with proper formatting
    const sitemap = formatSitemapXML(sitemapData);
    
    // Cache the generated sitemap for 1 hour
    contentfulCache.set(CACHE_KEYS.SITEMAP_GENERATED, sitemap, 60 * 60 * 1000);
    contentfulCache.set(CACHE_KEYS.SITEMAP_URL_COUNT, urlCount, 60 * 60 * 1000);
    
    console.log('✅ Sitemap generated and cached successfully');
    return sitemap;
    
  } catch (error) {
    console.error('❌ Error generating optimized sitemap:', error);
    throw error;
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
    <loc>https://dracarlachristoph.com/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://dracarlachristoph.com/services</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dracarlachristoph.com/contact</loc>
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