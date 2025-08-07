import { useEffect } from 'react';
import { contentCache, apiCache } from '@/utils/advancedCache';

interface ContentfulOptimizerProps {
  enablePrefetching?: boolean;
  enableCaching?: boolean;
  batchRequests?: boolean;
}

const ContentfulOptimizer = ({
  enablePrefetching = true,
  enableCaching = true,
  batchRequests = true
}: ContentfulOptimizerProps) => {
  useEffect(() => {
    if (!enableCaching) return;

    // Override fetch for Contentful API calls
    const originalFetch = window.fetch;
    
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      
      // Only cache Contentful API calls
      if (url.includes('cdn.contentful.com')) {
        const cacheKey = `contentful_${url}`;
        
        // Check cache first
        const cachedResponse = apiCache.get(cacheKey);
        if (cachedResponse && enableCaching) {
          return new Response(JSON.stringify(cachedResponse), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        try {
          const response = await originalFetch(input, init);
          
          if (response.ok) {
            const clonedResponse = response.clone();
            const data = await clonedResponse.json();
            
            // Cache the response
            apiCache.set(cacheKey, data, 60 * 60 * 1000); // 1 hour cache
          }
          
          return response;
        } catch (error) {
          // Try to return cached data on error
          const cachedFallback = apiCache.get(cacheKey);
          if (cachedFallback) {
            return new Response(JSON.stringify(cachedFallback), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          }
          throw error;
        }
      }
      
      return originalFetch(input, init);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [enableCaching]);

  useEffect(() => {
    if (!enablePrefetching) return;

    // Prefetch critical Contentful data
    const prefetchCriticalContent = async () => {
      const criticalContentQueries = [
        // Blog posts for homepage
        'https://cdn.contentful.com/spaces/YOUR_SPACE_ID/entries?content_type=blogPost&limit=3&order=-sys.createdAt',
        // Services data
        'https://cdn.contentful.com/spaces/YOUR_SPACE_ID/entries?content_type=service&limit=10',
        // Testimonials
        'https://cdn.contentful.com/spaces/YOUR_SPACE_ID/entries?content_type=testimonial&limit=6'
      ];

      // Prefetch in parallel but with delays to avoid overwhelming the API
      for (let i = 0; i < criticalContentQueries.length; i++) {
        setTimeout(() => {
          fetch(criticalContentQueries[i]).catch(console.error);
        }, i * 500); // 500ms delay between requests
      }
    };

    // Prefetch after initial page load
    setTimeout(prefetchCriticalContent, 2000);
  }, [enablePrefetching]);

  useEffect(() => {
    if (!batchRequests) return;

    // Implement request batching for Contentful
    let pendingRequests: Array<{
      url: string;
      resolve: (value: any) => void;
      reject: (error: any) => void;
    }> = [];

    let batchTimeout: NodeJS.Timeout;

    const batchContentfulRequests = () => {
      if (pendingRequests.length === 0) return;

      const requests = [...pendingRequests];
      pendingRequests = [];

      // Group requests by content type
      const groupedRequests = requests.reduce((groups, request) => {
        const contentType = extractContentType(request.url);
        if (!groups[contentType]) groups[contentType] = [];
        groups[contentType].push(request);
        return groups;
      }, {} as Record<string, typeof requests>);

      // Execute batched requests
      Object.entries(groupedRequests).forEach(([contentType, batch]) => {
        if (batch.length === 1) {
          // Single request, execute normally
          fetch(batch[0].url)
            .then(response => response.json())
            .then(batch[0].resolve)
            .catch(batch[0].reject);
        } else {
          // Multiple requests, batch them
          const batchedUrl = createBatchedUrl(contentType, batch);
          fetch(batchedUrl)
            .then(response => response.json())
            .then(data => {
              // Distribute results to individual promises
              batch.forEach((request, index) => {
                request.resolve(data.items?.[index] || data);
              });
            })
            .catch(error => {
              batch.forEach(request => request.reject(error));
            });
        }
      });
    };

    const extractContentType = (url: string): string => {
      const match = url.match(/content_type=([^&]+)/);
      return match ? match[1] : 'unknown';
    };

    const createBatchedUrl = (contentType: string, requests: any[]): string => {
      // Create a single request that includes multiple IDs or parameters
      const baseUrl = requests[0].url.split('?')[0];
      const ids = requests.map(req => extractEntryId(req.url)).filter(Boolean);
      
      if (ids.length > 0) {
        return `${baseUrl}?content_type=${contentType}&sys.id[in]=${ids.join(',')}`;
      }
      
      return requests[0].url; // Fallback to first request
    };

    const extractEntryId = (url: string): string | null => {
      const match = url.match(/entries\/([^?]+)/);
      return match ? match[1] : null;
    };

    // Override fetch for batching
    const originalFetch = window.fetch;
    window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      
      if (url.includes('cdn.contentful.com') && batchRequests) {
        return new Promise((resolve, reject) => {
          pendingRequests.push({ url, resolve, reject });
          
          clearTimeout(batchTimeout);
          batchTimeout = setTimeout(batchContentfulRequests, 50); // 50ms batch window
        });
      }
      
      return originalFetch(input, init);
    };

    return () => {
      window.fetch = originalFetch;
      clearTimeout(batchTimeout);
    };
  }, [batchRequests]);

  useEffect(() => {
    // Implement smart preloading based on user behavior
    const implementSmartPreloading = () => {
      let mouseIdleTimer: NodeJS.Timeout;
      let isUserIdle = false;

      const preloadOnIdle = () => {
        if (isUserIdle) return;
        
        isUserIdle = true;
        
        // Preload likely next content
        const currentPath = window.location.pathname;
        const nextContent = predictNextContent(currentPath);
        
        nextContent.forEach((contentUrl) => {
          fetch(contentUrl).catch(console.error);
        });
      };

      const resetIdleTimer = () => {
        isUserIdle = false;
        clearTimeout(mouseIdleTimer);
        mouseIdleTimer = setTimeout(preloadOnIdle, 3000); // 3 seconds of idle
      };

      const predictNextContent = (path: string): string[] => {
        const predictions: Record<string, string[]> = {
          '/': [
            'https://cdn.contentful.com/spaces/YOUR_SPACE_ID/entries?content_type=service&limit=10',
            'https://cdn.contentful.com/spaces/YOUR_SPACE_ID/entries?content_type=blogPost&limit=6'
          ],
          '/blog': [
            'https://cdn.contentful.com/spaces/YOUR_SPACE_ID/entries?content_type=blogPost&skip=6&limit=6'
          ],
          '/services': [
            'https://cdn.contentful.com/spaces/YOUR_SPACE_ID/entries?content_type=testimonial&limit=6'
          ]
        };

        return predictions[path] || [];
      };

      // Listen for user interactions
      ['mousemove', 'scroll', 'click', 'keypress'].forEach(event => {
        document.addEventListener(event, resetIdleTimer);
      });

      // Start idle timer
      resetIdleTimer();

      return () => {
        clearTimeout(mouseIdleTimer);
        ['mousemove', 'scroll', 'click', 'keypress'].forEach(event => {
          document.removeEventListener(event, resetIdleTimer);
        });
      };
    };

    const cleanup = implementSmartPreloading();
    return cleanup;
  }, []);

  return null;
};

export default ContentfulOptimizer;