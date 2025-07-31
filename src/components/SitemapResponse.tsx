import { useEffect, useRef } from 'react';
import { generateSitemap } from '@/utils/sitemapGenerator';
import { 
  getCrawlerHeaders, 
  createCrawlerHTML, 
  setCrawlerHeaders, 
  validateCrawlerContent,
  getFallbackContent 
} from '@/utils/crawlerOptimization';

const SitemapResponse = () => {
  const hasRendered = useRef(false);

  useEffect(() => {
    if (hasRendered.current) return;
    hasRendered.current = true;

    const handleSitemapRequest = async () => {
      try {
        const sitemap = await generateSitemap();
        
        // Validate sitemap content
        const isValid = validateCrawlerContent(sitemap, 'xml');
        const finalContent = isValid ? sitemap : getFallbackContent('xml', window.location.origin);
        
        // Get crawler-optimized headers
        const headers = getCrawlerHeaders('xml');
        
        // Clear existing content
        document.documentElement.innerHTML = '';
        
        // Create crawler-friendly HTML
        const html = createCrawlerHTML(finalContent, 'xml', 'Sitemap XML');
        
        // Set content
        document.open();
        document.write(html);
        document.close();
        
        // Set crawler headers
        setCrawlerHeaders(headers, '/sitemap.xml', 'Sitemap');
        
        if (!isValid) {
          console.warn('Sitemap validation failed, using fallback content');
        }
        
      } catch (error) {
        console.error('Error serving sitemap:', error);
        
        // Use fallback content on error
        const fallbackSitemap = getFallbackContent('xml', window.location.origin);
        const headers = getCrawlerHeaders('xml');
        
        document.documentElement.innerHTML = '';
        const errorHtml = createCrawlerHTML(fallbackSitemap, 'xml', 'Sitemap XML (Fallback)');
        
        document.open();
        document.write(errorHtml);
        document.close();
        
        setCrawlerHeaders(headers, '/sitemap.xml', 'Sitemap (Error)');
      }
    };
    
    handleSitemapRequest();
  }, []);

  return null;
};

export default SitemapResponse;