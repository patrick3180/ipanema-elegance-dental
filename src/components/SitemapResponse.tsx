import React, { useEffect } from 'react';
import { generateSitemap } from '@/utils/sitemapGenerator';

interface SitemapResponseProps {
  onSitemapGenerated?: (sitemap: string) => void;
}

const SitemapResponse: React.FC<SitemapResponseProps> = ({ onSitemapGenerated }) => {
  useEffect(() => {
    const serveSitemap = async () => {
      try {
        console.log('🗺️ Generating sitemap for /sitemap.xml route...');
        const sitemap = await generateSitemap();
        
        // Call the callback if provided
        if (onSitemapGenerated) {
          onSitemapGenerated(sitemap);
        }
        
        // Set appropriate headers for the response
        if (typeof window !== 'undefined' && window.history) {
          // Update the response content type in the browser
          const meta = document.createElement('meta');
          meta.httpEquiv = 'Content-Type';
          meta.content = 'application/xml; charset=utf-8';
          document.head.appendChild(meta);
        }
        
        console.log('✅ Sitemap generated successfully for SPA route');
        
      } catch (error) {
        console.error('❌ Error generating sitemap for SPA route:', error);
        
        // Return basic sitemap as fallback
        const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dracarlachristoph.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
        
        if (onSitemapGenerated) {
          onSitemapGenerated(fallbackSitemap);
        }
      }
    };
    
    serveSitemap();
  }, [onSitemapGenerated]);

  // This component doesn't render anything visible
  // It's used for handling the sitemap route in the SPA
  return null;
};

export default SitemapResponse;