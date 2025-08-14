import { useEffect } from 'react';

interface UltraFastServerOptimizerProps {
  targetTTFB?: number;
  enableEdgeOptimization?: boolean;
}

const UltraFastServerOptimizer = ({
  targetTTFB = 200,
  enableEdgeOptimization = true
}: UltraFastServerOptimizerProps) => {
  useEffect(() => {
    if (!enableEdgeOptimization) return;

    // Ultra-aggressive domain preconnections
    const criticalDomains = [
      'https://fonts.gstatic.com',
      'https://fonts.googleapis.com',
      'https://api.whatsapp.com',
      'https://web.whatsapp.com',
      'https://www.googletagmanager.com'
    ];

    // Use document fragment for batch DOM operations
    const fragment = document.createDocumentFragment();
    
    criticalDomains.forEach(domain => {
      // DNS prefetch
      const dnsPrefetch = document.createElement('link');
      dnsPrefetch.rel = 'dns-prefetch';
      dnsPrefetch.href = domain;
      fragment.appendChild(dnsPrefetch);

      // Preconnect with high priority
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = domain;
      preconnect.crossOrigin = 'anonymous';
      fragment.appendChild(preconnect);
    });

    document.head.appendChild(fragment);

    // Ultra-optimized fetch with edge caching
    const originalFetch = window.fetch;
    const requestCache = new Map();
    const requestQueue = new Map();

    window.fetch = async (input, init) => {
      const url = typeof input === 'string' ? input : input.toString();
      const cacheKey = `${url}_${JSON.stringify(init)}`;
      
      // Deduplicate identical requests
      if (requestQueue.has(cacheKey)) {
        return requestQueue.get(cacheKey);
      }

      // Return cached response if available
      if (requestCache.has(cacheKey)) {
        const cachedResponse = requestCache.get(cacheKey);
        if (cachedResponse) {
          return cachedResponse.clone();
        }
      }

      const requestPromise = originalFetch(input, {
        ...init,
        headers: {
          ...init?.headers,
          'Accept-Encoding': 'br, gzip, deflate',
          'Cache-Control': 'max-age=300, stale-while-revalidate=86400',
          'CDN-Cache-Control': 'max-age=31536000',
          'Edge-Control': 'cache-maxage=1h'
        }
      }).then(response => {
        // Cache successful responses
        if (response.ok) {
          requestCache.set(cacheKey, response.clone());
          // Clean cache after 10 seconds
          setTimeout(() => {
            requestCache.delete(cacheKey);
            requestQueue.delete(cacheKey);
          }, 10000);
        }
        return response;
      }).catch(error => {
        requestQueue.delete(cacheKey);
        throw error;
      });

      requestQueue.set(cacheKey, requestPromise);
      return requestPromise;
    };

    // Performance monitoring and adaptive optimization
    let performanceObserver: PerformanceObserver | null = null;

    if ('PerformanceObserver' in window) {
      performanceObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            const ttfb = navEntry.responseStart - navEntry.requestStart;
            
            // If TTFB is slow, enable ultra-aggressive optimizations
            if (ttfb > targetTTFB) {
              // Force enable service worker caching
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then(registration => {
                  registration.active?.postMessage({
                    type: 'ENABLE_ULTRA_CACHE',
                    ttfb: ttfb
                  });
                });
              }
              
              // Prioritize all critical resources
              const criticalElements = document.querySelectorAll('img[fetchpriority="high"], link[rel="preload"]');
              criticalElements.forEach(element => {
                if (element instanceof HTMLImageElement) {
                  element.loading = 'eager';
                  element.decoding = 'sync';
                }
              });
            }
          }
        });
      });

      performanceObserver.observe({ type: 'navigation', buffered: true });
    }

    return () => {
      window.fetch = originalFetch;
      if (performanceObserver) {
        performanceObserver.disconnect();
      }
    };
  }, [targetTTFB, enableEdgeOptimization]);

  return null;
};

export default UltraFastServerOptimizer;