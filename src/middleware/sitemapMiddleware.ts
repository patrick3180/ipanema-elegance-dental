import { handleSitemapRequest } from '@/api/sitemap';
import { handleRobotsRequest } from '@/api/robots';

// Middleware to handle sitemap and robots.txt requests in a SPA environment
export const handleStaticRequests = () => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return;

  // Get the current path
  const currentPath = window.location.pathname;

  // Handle sitemap.xml requests
  if (currentPath === '/sitemap.xml') {
    handleSitemapRequest().then(response => {
      response.text().then(sitemapContent => {
        // Create a blob and download it (for development testing)
        if (import.meta.env.DEV) {
          console.log('📋 Sitemap content generated:', sitemapContent);
        }
      });
    });
  }

  // Handle robots.txt requests
  if (currentPath === '/robots.txt') {
    const response = handleRobotsRequest();
    response.text().then(robotsContent => {
      if (import.meta.env.DEV) {
        console.log('🤖 Robots.txt content generated:', robotsContent);
      }
    });
  }
};

// Initialize on module load
handleStaticRequests();