import { generateSitemap } from '@/utils/sitemapGenerator';

export const handleSitemapRequest = async (): Promise<Response> => {
  try {
    console.log('🗺️ Serving dynamic sitemap request...');
    const sitemap = await generateSitemap();
    
    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
        'X-Robots-Tag': 'noindex', // Don't index the sitemap itself
        'Access-Control-Allow-Origin': '*', // Allow cross-origin requests
        'Vary': 'Accept-Encoding'
      }
    });
  } catch (error) {
    console.error('❌ Error serving sitemap:', error);
    
    // Return a basic sitemap as fallback
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dracarlachristoph.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dracarlachristoph.com/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
    
    return new Response(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=300', // Shorter cache for fallback
        'X-Robots-Tag': 'noindex'
      }
    });
  }
};