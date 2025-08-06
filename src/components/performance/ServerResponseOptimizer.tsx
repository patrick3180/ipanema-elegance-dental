import { useEffect } from 'react';

interface ServerResponseOptimizerProps {
  targetTTFB?: number; // Target Time to First Byte in milliseconds
  enableRequestOptimization?: boolean;
  enableConnectionOptimization?: boolean;
}

const ServerResponseOptimizer = ({
  targetTTFB = 200,
  enableRequestOptimization = true,
  enableConnectionOptimization = true
}: ServerResponseOptimizerProps) => {
  useEffect(() => {
    if (!enableConnectionOptimization) return;

    // Preconnect to critical domains to reduce connection time
    const criticalDomains = [
      'https://cdn.contentful.com',
      'https://images.ctfassets.net',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com'
    ];

    const dnsPreconnectFragment = document.createDocumentFragment();
    
    criticalDomains.forEach(domain => {
      // DNS prefetch for faster domain resolution
      const dnsPrefetch = document.createElement('link');
      dnsPrefetch.rel = 'dns-prefetch';
      dnsPrefetch.href = domain;
      dnsPreconnectFragment.appendChild(dnsPrefetch);

      // Preconnect for critical domains
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = domain;
      preconnect.crossOrigin = domain.includes('fonts') ? 'anonymous' : '';
      dnsPreconnectFragment.appendChild(preconnect);
    });

    document.head.appendChild(dnsPreconnectFragment);

    // Monitor TTFB and implement optimizations
    let navigationObserver: PerformanceObserver | null = null;

    if ('PerformanceObserver' in window) {
      navigationObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            const ttfb = navEntry.responseStart - navEntry.requestStart;
            
            if (ttfb > targetTTFB) {
              console.warn(`TTFB exceeded target: ${ttfb}ms > ${targetTTFB}ms`);
              // Implement adaptive strategies for slow responses
              implementSlowResponseStrategy();
            }
          }
        });
      });

      navigationObserver.observe({ type: 'navigation', buffered: true });
    }

    const implementSlowResponseStrategy = () => {
      // Enable more aggressive caching
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
          registration.active?.postMessage({
            type: 'ENABLE_AGGRESSIVE_CACHE'
          });
        });
      }

      // Prioritize critical resource loading
      const criticalResources = document.querySelectorAll('[data-critical]');
      criticalResources.forEach(resource => {
        if (resource instanceof HTMLLinkElement || resource instanceof HTMLScriptElement) {
          resource.fetchPriority = 'high';
        }
      });
    };

    return () => {
      if (navigationObserver) {
        navigationObserver.disconnect();
      }
    };
  }, [targetTTFB, enableConnectionOptimization]);

  useEffect(() => {
    if (!enableRequestOptimization) return;

    const originalFetch = window.fetch;
    const requestCache = new Map<string, Promise<Response>>();

    // Optimize fetch requests with caching and deduplication
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const url = typeof input === 'string' ? input : input.toString();
      const cacheKey = `${url}_${JSON.stringify(init)}`;

      // Deduplicate identical requests
      if (requestCache.has(cacheKey)) {
        return requestCache.get(cacheKey)!.then(response => response.clone());
      }

      const requestPromise = originalFetch(input, {
        ...init,
        // Add performance optimizations
        headers: {
          ...init?.headers,
          'Accept-Encoding': 'gzip, deflate, br',
          'Cache-Control': 'max-age=300, stale-while-revalidate=86400'
        }
      }).finally(() => {
        // Clean up cache after request completes
        setTimeout(() => requestCache.delete(cacheKey), 5000);
      });

      requestCache.set(cacheKey, requestPromise);
      return requestPromise;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [enableRequestOptimization]);

  return null;
};

export default ServerResponseOptimizer;