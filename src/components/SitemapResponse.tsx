import { useEffect } from 'react';
import { generateSitemap } from '@/utils/sitemapGenerator';

const SitemapResponse = () => {
  useEffect(() => {
    const handleSitemapRequest = async () => {
      try {
        const sitemap = await generateSitemap();
        
        // Set appropriate headers for XML content
        const response = new Response(sitemap, {
          status: 200,
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            'X-Robots-Tag': 'noindex'
          }
        });
        
        // Create a blob and download it as XML
        const blob = new Blob([sitemap], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        // Replace the current page content with the sitemap XML
        document.open();
        document.write(sitemap);
        document.close();
        
        // Set proper content type using meta tag
        const metaTag = document.createElement('meta');
        metaTag.httpEquiv = 'Content-Type';
        metaTag.content = 'application/xml; charset=utf-8';
        document.head.appendChild(metaTag);
        
      } catch (error) {
        console.error('Error serving sitemap:', error);
        document.open();
        document.write('Internal Server Error');
        document.close();
      }
    };
    
    handleSitemapRequest();
  }, []);

  return null;
};

export default SitemapResponse;