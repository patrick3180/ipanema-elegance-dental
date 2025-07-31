import { useEffect, useRef } from 'react';
import { generateRobotsTxt } from '@/utils/sitemapGenerator';
import { 
  getCrawlerHeaders, 
  createCrawlerHTML, 
  setCrawlerHeaders,
  getFallbackContent 
} from '@/utils/crawlerOptimization';

const RobotsResponse = () => {
  const hasRendered = useRef(false);

  useEffect(() => {
    if (hasRendered.current) return;
    hasRendered.current = true;

    const handleRobotsRequest = () => {
      try {
        const robotsContent = generateRobotsTxt();
        
        // Get crawler-optimized headers
        const headers = getCrawlerHeaders('text');
        
        // Clear existing content
        document.documentElement.innerHTML = '';
        
        // Create crawler-friendly HTML
        const html = createCrawlerHTML(robotsContent, 'text', 'Robots.txt');
        
        // Set content
        document.open();
        document.write(html);
        document.close();
        
        // Set crawler headers
        setCrawlerHeaders(headers, '/robots.txt', 'Robots.txt');
        
      } catch (error) {
        console.error('Error serving robots.txt:', error);
        
        // Use fallback content on error
        const fallbackContent = getFallbackContent('text', window.location.origin);
        const headers = getCrawlerHeaders('text');
        
        document.documentElement.innerHTML = '';
        const errorHtml = createCrawlerHTML(fallbackContent, 'text', 'Robots.txt (Fallback)');
        
        document.open();
        document.write(errorHtml);
        document.close();
        
        setCrawlerHeaders(headers, '/robots.txt', 'Robots.txt (Error)');
      }
    };
    
    handleRobotsRequest();
  }, []);

  return null;
};

export default RobotsResponse;