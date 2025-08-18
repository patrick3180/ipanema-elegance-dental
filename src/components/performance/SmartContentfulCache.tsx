import { useEffect } from 'react';

interface SmartContentfulCacheProps {
  enableBlocking?: boolean;
}

const SmartContentfulCache = ({ enableBlocking = true }: SmartContentfulCacheProps) => {
  useEffect(() => {
    if (!enableBlocking) return;

    const originalFetch = window.fetch;
    const contentfulCache = new Map();
    const pendingRequests = new Map();

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      
      // Block non-critical Contentful requests for first 3 seconds
      if (url.includes('contentful.com') && !url.includes('blogCarla')) {
        const now = Date.now();
        const pageLoadTime = performance.timeOrigin;
        
        if (now - pageLoadTime < 3000) {
          console.log('🚀 PERFORMANCE: Deferring Contentful request for LCP optimization');
          
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(originalFetch(input, init));
            }, 3000 - (now - pageLoadTime));
          });
        }
      }

      // Cache Contentful responses
      if (url.includes('contentful.com')) {
        const cacheKey = url + JSON.stringify(init?.headers || {});
        
        // Return cached response if available
        if (contentfulCache.has(cacheKey)) {
          const cached = contentfulCache.get(cacheKey);
          return cached.clone();
        }

        // Deduplicate identical requests
        if (pendingRequests.has(cacheKey)) {
          return pendingRequests.get(cacheKey);
        }

        const requestPromise = originalFetch(input, init).then(response => {
          if (response.ok) {
            contentfulCache.set(cacheKey, response.clone());
            setTimeout(() => contentfulCache.delete(cacheKey), 5 * 60 * 1000); // 5min cache
          }
          pendingRequests.delete(cacheKey);
          return response;
        });

        pendingRequests.set(cacheKey, requestPromise);
        return requestPromise;
      }

      return originalFetch(input, init);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [enableBlocking]);

  return null;
};

export default SmartContentfulCache;