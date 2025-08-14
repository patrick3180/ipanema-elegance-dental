import { useEffect } from 'react';
import ServerResponseOptimizer from './ServerResponseOptimizer';

const FastServerResponseOptimizer = () => {
  useEffect(() => {
    // Critical domain preconnections immediately
    const criticalDomains = [
      'https://fonts.gstatic.com',
      'https://fonts.googleapis.com'
    ];

    const fragment = document.createDocumentFragment();
    
    criticalDomains.forEach(domain => {
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = domain;
      preconnect.crossOrigin = 'anonymous';
      fragment.appendChild(preconnect);
    });

    document.head.appendChild(fragment);

    // Enable aggressive resource caching
    const originalFetch = window.fetch;
    const requestCache = new Map();

    window.fetch = async (input, init) => {
      const url = typeof input === 'string' ? input : input.toString();
      
      if (requestCache.has(url)) {
        return requestCache.get(url).then(response => response.clone());
      }

      const requestPromise = originalFetch(input, {
        ...init,
        headers: {
          ...init?.headers,
          'Accept-Encoding': 'br, gzip, deflate',
          'Cache-Control': 'max-age=300, stale-while-revalidate=86400'
        }
      });

      requestCache.set(url, requestPromise);
      
      // Clean cache after 5 seconds
      setTimeout(() => requestCache.delete(url), 5000);
      
      return requestPromise;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return <ServerResponseOptimizer 
    targetTTFB={200}
    enableRequestOptimization={true}
    enableConnectionOptimization={true}
  />;
};

export default FastServerResponseOptimizer;