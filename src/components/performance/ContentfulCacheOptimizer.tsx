import { useEffect } from 'react';

interface ContentfulCacheOptimizerProps {
  enableAggressiveCaching?: boolean;
  enableRequestBatching?: boolean;
  cacheStrategy?: 'stale-while-revalidate' | 'cache-first' | 'network-first';
}

const ContentfulCacheOptimizer = ({
  enableAggressiveCaching = true,
  enableRequestBatching = true,
  cacheStrategy = 'stale-while-revalidate'
}: ContentfulCacheOptimizerProps) => {
  useEffect(() => {
    if (!enableAggressiveCaching) return;

    const originalFetch = window.fetch;
    const requestQueue = new Map<string, Promise<Response>>();
    const responseCache = new Map<string, { data: Response; timestamp: number; ttl: number }>();

    // Enhanced caching with stale-while-revalidate pattern
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const url = typeof input === 'string' ? input : input.toString();
      
      // Only cache Contentful requests
      if (!url.includes('contentful.com') && !url.includes('ctfassets.net')) {
        return originalFetch(input, init);
      }

      const cacheKey = `${url}_${JSON.stringify(init?.headers || {})}`;
      const cached = responseCache.get(cacheKey);
      const now = Date.now();

      // Implement different caching strategies
      if (cached) {
        const isStale = now - cached.timestamp > cached.ttl;
        
        switch (cacheStrategy) {
          case 'cache-first':
            if (!isStale) return cached.data.clone();
            break;
          case 'stale-while-revalidate':
            if (isStale) {
              // Return stale data immediately, fetch fresh in background
              originalFetch(input, init).then(response => {
                responseCache.set(cacheKey, {
                  data: response.clone(),
                  timestamp: now,
                  ttl: 300000 // 5 minutes
                });
              }).catch(() => {});
            }
            return cached.data.clone();
          case 'network-first':
            // Try network first, fallback to cache
            break;
        }
      }

      // Batch identical requests
      if (enableRequestBatching && requestQueue.has(cacheKey)) {
        return requestQueue.get(cacheKey)!;
      }

      const requestPromise = originalFetch(input, init).then(response => {
        if (response.ok) {
          const ttl = url.includes('/entries') ? 600000 : 300000; // 10min for entries, 5min for assets
          responseCache.set(cacheKey, {
            data: response.clone(),
            timestamp: now,
            ttl
          });
        }
        requestQueue.delete(cacheKey);
        return response;
      }).catch(error => {
        requestQueue.delete(cacheKey);
        // Return cached data if network fails
        if (cached) return cached.data.clone();
        throw error;
      });

      requestQueue.set(cacheKey, requestPromise);
      return requestPromise;
    };

    // Prefetch critical Contentful data
    const prefetchCriticalData = () => {
      const criticalUrls = [
        '/spaces/your-space-id/entries?content_type=blogPost&limit=5',
        '/spaces/your-space-id/entries?content_type=service&limit=10'
      ];

      criticalUrls.forEach(url => {
        fetch(`https://cdn.contentful.com${url}`, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`
          }
        }).catch(() => {});
      });
    };

    // Prefetch after initial load
    setTimeout(prefetchCriticalData, 1000);

    return () => {
      window.fetch = originalFetch;
    };
  }, [enableAggressiveCaching, enableRequestBatching, cacheStrategy]);

  return null;
};

export default ContentfulCacheOptimizer;