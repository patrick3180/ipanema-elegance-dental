import { handlePageRedirects, isGoneUrl, getRedirectDestination } from '@/utils/urlRedirects';
import { getRedirectInfo } from '@/utils/urlPatternMatcher';
import { handleSitemapRequest } from '@/api/sitemap';
import { handleRobotsRequest } from '@/api/robots';
import { seoMonitor } from '@/utils/seoMonitoring';

// Enhanced middleware to handle redirects, 410 responses, and static files
export const handleRequestMiddleware = () => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return;

  const currentPath = window.location.pathname;
  
  // Handle sitemap.xml requests
  if (currentPath === '/sitemap.xml') {
    handleSitemapRequest().then(response => {
      response.text().then(sitemapContent => {
        if (import.meta.env.DEV) {
          console.log('📋 Sitemap content generated:', sitemapContent);
        }
      });
    });
    return;
  }

  // Handle robots.txt requests
  if (currentPath === '/robots.txt') {
    const response = handleRobotsRequest();
    response.text().then(robotsContent => {
      if (import.meta.env.DEV) {
        console.log('🤖 Robots.txt content generated:', robotsContent);
      }
    });
    return;
  }

  // Get comprehensive redirect information
  const redirectInfo = getRedirectInfo(currentPath);
  
  if (redirectInfo.action === 'ignore') {
    // Don't process common bot/crawler URLs
    return;
  }
  
  // Handle URL redirects and 410 responses
  const redirectResult = handlePageRedirects();
  
  if (redirectResult.type === 'gone' || redirectInfo.action === 'gone') {
    // Navigate to the 410 Gone page
    console.log(`🚫 Navigating to 410 Gone page for: ${currentPath} (${redirectInfo.reason})`);
    seoMonitor.logGone(currentPath);
    window.history.replaceState(null, '', '/gone');
    // Trigger a route change
    window.dispatchEvent(new PopStateEvent('popstate'));
  } else if (redirectResult.redirected || redirectInfo.action === 'redirect') {
    // Redirect was handled
    const destination = redirectInfo.destination || window.location.pathname;
    console.log(`✅ Redirect handled for: ${currentPath} → ${destination} (${redirectInfo.reason})`);
    seoMonitor.logRedirect(currentPath, destination);
    
    if (redirectInfo.action === 'redirect' && redirectInfo.destination) {
      window.history.replaceState(null, '', redirectInfo.destination);
    }
    
    // Trigger a route change
    window.dispatchEvent(new PopStateEvent('popstate'));
  } else if (redirectInfo.action === 'not_found') {
    // Log 404 for monitoring
    seoMonitor.logNotFound(currentPath);
  }
};

// Function to set appropriate HTTP status headers (for server-side rendering)
export const getResponseStatus = (path: string): number => {
  if (isGoneUrl(path)) {
    return 410; // Gone
  } else if (getRedirectDestination(path)) {
    return 301; // Moved Permanently
  } else {
    return 200; // OK
  }
};

// Function to get redirect headers
export const getRedirectHeaders = (path: string): Record<string, string> | null => {
  const destination = getRedirectDestination(path);
  
  if (destination) {
    return {
      'Location': destination,
      'Cache-Control': 'public, max-age=31536000', // Cache redirects for 1 year
    };
  }
  
  if (isGoneUrl(path)) {
    return {
      'Cache-Control': 'public, max-age=86400', // Cache 410 responses for 1 day
    };
  }
  
  return null;
};

// Initialize middleware on module load
handleRequestMiddleware();