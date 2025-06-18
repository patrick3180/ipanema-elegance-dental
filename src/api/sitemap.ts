
import { generateSitemap } from '@/utils/sitemapGenerator';

export const handleSitemapRequest = async (): Promise<Response> => {
  try {
    const sitemap = await generateSitemap();
    
    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
        'X-Robots-Tag': 'noindex' // Don't index the sitemap itself
      }
    });
  } catch (error) {
    console.error('Error serving sitemap:', error);
    
    return new Response('Internal Server Error', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
};
