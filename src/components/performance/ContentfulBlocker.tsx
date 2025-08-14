import { useEffect } from 'react';

/**
 * EMERGENCY OPTIMIZATION: Block Contentful on landing pages
 * This component prevents Contentful queries from running on landing pages,
 * eliminating the 150+ KiB of unnecessary API calls and 2+ second latency
 */
const ContentfulBlocker = () => {
  useEffect(() => {
    // Store original fetch
    const originalFetch = window.fetch;
    
    // Block Contentful API calls on landing pages
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      
      // Block all Contentful requests on landing pages
      if (url.includes('contentful.com') || url.includes('cdn.contentful.com')) {
        console.warn('🚫 EMERGENCY OPTIMIZATION: Contentful blocked on landing page for performance');
        
        // Return empty response to prevent errors
        return new Response(JSON.stringify({
          items: [],
          total: 0,
          skip: 0,
          limit: 0
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Allow all other requests
      return originalFetch(input, init);
    };
    
    // Restore original fetch on cleanup
    return () => {
      window.fetch = originalFetch;
    };
  }, []);
  
  return null;
};

export default ContentfulBlocker;