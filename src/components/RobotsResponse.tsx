import { useEffect } from 'react';
import { generateRobotsTxt } from '@/utils/sitemapGenerator';

const RobotsResponse = () => {
  useEffect(() => {
    const handleRobotsRequest = () => {
      try {
        const robotsContent = generateRobotsTxt();
        
        // Replace the current page content with robots.txt
        document.open();
        document.write(`<pre>${robotsContent}</pre>`);
        document.close();
        
        // Set proper content type using meta tag
        const metaTag = document.createElement('meta');
        metaTag.httpEquiv = 'Content-Type';
        metaTag.content = 'text/plain; charset=utf-8';
        document.head.appendChild(metaTag);
        
      } catch (error) {
        console.error('Error serving robots.txt:', error);
        document.open();
        document.write('Internal Server Error');
        document.close();
      }
    };
    
    handleRobotsRequest();
  }, []);

  return null;
};

export default RobotsResponse;