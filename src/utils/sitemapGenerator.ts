
import { collectSitemapData, getTotalUrlCount, SitemapUrl } from '@/utils/sitemapDataCollector';
import { contentfulCache, CACHE_KEYS } from '@/utils/contentfulCache';

export const generateRobotsTxt = (): string => {
  const baseUrl = 'https://dracarlachristoph.com';
  
  return `# Robots.txt for Dra. Carla Christoph - Dentista em Ipanema
# This file helps search engines understand how to crawl our site

# Allow all search engines to crawl the entire site
User-agent: *
Allow: /

# Special rules for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Social media crawlers
User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: LinkedInBot
Allow: /

# Block access to sensitive areas (uncomment if needed)
# Disallow: /admin/
# Disallow: /api/
# Disallow: /*.json$

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Host preference (helps with duplicate content)
Host: ${baseUrl}`;
};

export const generateSitemap = async (): Promise<string> => {
  // Check cache first (cached for 1 hour)
  const cachedSitemap = contentfulCache.get<string>(CACHE_KEYS.SITEMAP);
  if (cachedSitemap) {
    console.log('📋 Returning cached sitemap');
    return cachedSitemap;
  }

  console.log('🔍 Collecting comprehensive sitemap data...');
  
  try {
    // Collect all sitemap data
    const sitemapData = await collectSitemapData();
    
    // Combine all URLs
    const allUrls = [
      ...sitemapData.staticPages,
      ...sitemapData.servicePages,
      ...sitemapData.legalPages,
      ...sitemapData.blogPosts,
      ...sitemapData.blogCategories,
      ...sitemapData.blogTags,
      ...sitemapData.blogPagination
    ];
    
    const totalCount = getTotalUrlCount(sitemapData);
    
    console.log(`📊 Comprehensive sitemap generated with ${totalCount} total pages:`);
    console.log(`  - ${sitemapData.staticPages.length} static pages`);
    console.log(`  - ${sitemapData.servicePages.length} service pages`);
    console.log(`  - ${sitemapData.legalPages.length} legal pages`);
    console.log(`  - ${sitemapData.blogPosts.length} blog posts`);
    console.log(`  - ${sitemapData.blogCategories.length} blog categories`);
    console.log(`  - ${sitemapData.blogTags.length} blog tags`);
    console.log(`  - ${sitemapData.blogPagination.length} pagination pages`);
    
    // Build XML sitemap with proper escaping
    const generatedSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map(url => `
  <url>
    <loc>${encodeURI(url.loc).replace(/&/g, '&amp;')}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

    // Cache the comprehensive sitemap for 1 hour
    contentfulCache.set(CACHE_KEYS.SITEMAP, generatedSitemap, 60 * 60 * 1000); // 1 hour cache
    
    // Ping search engines about the comprehensive update (don't await to avoid blocking)
    pingSearchEngines().catch(error => {
      console.warn('⚠️ Failed to ping search engines:', error);
    });

    return generatedSitemap;
    
  } catch (error) {
    console.error('❌ Error generating comprehensive sitemap:', error);
    
    // Fallback to basic sitemap if comprehensive generation fails
    const basicSitemap = generateBasicSitemap();
    contentfulCache.set(CACHE_KEYS.SITEMAP, basicSitemap, 5 * 60 * 1000); // 5 minutes cache for fallback
    return basicSitemap;
  }
};

// Fallback basic sitemap generator
const generateBasicSitemap = (): string => {
  const baseUrl = 'https://dracarlachristoph.com';
  const today = new Date().toISOString().split('T')[0];
  
  const basicUrls = [
    { loc: `${baseUrl}/`, lastmod: today, changefreq: 'weekly', priority: 1.0 },
    { loc: `${baseUrl}/sobre`, lastmod: today, changefreq: 'monthly', priority: 0.9 },
    { loc: `${baseUrl}/servicos`, lastmod: today, changefreq: 'monthly', priority: 0.9 },
    { loc: `${baseUrl}/blog`, lastmod: today, changefreq: 'daily', priority: 0.8 },
    { loc: `${baseUrl}/contato`, lastmod: today, changefreq: 'monthly', priority: 0.8 }
  ];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${basicUrls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;
};

// Function to ping search engines about sitemap updates
export const pingSearchEngines = async (): Promise<void> => {
  const sitemapUrl = encodeURIComponent('https://dracarlachristoph.com/sitemap.xml');
  
  const pingUrls = [
    `https://www.google.com/ping?sitemap=${sitemapUrl}`,
    `https://www.bing.com/ping?sitemap=${sitemapUrl}`
  ];
  
  try {
    const promises = pingUrls.map(url => 
      fetch(url, { method: 'GET', mode: 'no-cors' })
        .catch(error => console.log(`Ping failed for ${url}:`, error))
    );
    
    await Promise.all(promises);
    console.log('🔔 Search engines pinged about sitemap update');
  } catch (error) {
    console.log('⚠️ Could not ping search engines:', error);
  }
};
