import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  try {
    // Dynamic import to avoid bundling issues
    const { generateOptimizedSitemap } = await import('../../src/utils/sitemapGeneratorOptimized');
    
    console.log('🗺️ Generating sitemap via Netlify function...');
    const sitemap = await generateOptimizedSitemap();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Robots-Tag': 'noindex',
        'Access-Control-Allow-Origin': '*',
        'Vary': 'Accept-Encoding'
      },
      body: sitemap
    };
  } catch (error) {
    console.error('❌ Error in sitemap function:', error);
    
    // Return basic fallback sitemap
    const today = new Date().toISOString().split('T')[0];
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
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
</urlset>`;
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=300'
      },
      body: fallbackSitemap
    };
  }
};

export { handler };