import { useEffect } from 'react';

interface CompressionOptimizerProps {
  enableGzipCheck?: boolean;
  enableBrotliCheck?: boolean;
  enableCaching?: boolean;
}

export const CompressionOptimizer = ({
  enableGzipCheck = true,
  enableBrotliCheck = true,
  enableCaching = true
}: CompressionOptimizerProps) => {

  // Check compression support and add headers
  useEffect(() => {
    if (!enableGzipCheck && !enableBrotliCheck) return;

    const checkCompression = async () => {
      try {
        // Test compression support
        const response = await fetch(window.location.href, {
          method: 'HEAD'
        });

        const contentEncoding = response.headers.get('content-encoding');
        const acceptEncoding = response.headers.get('accept-encoding');

        if (import.meta.env.DEV) {
          console.log('🗜️ Compression Check:', {
            contentEncoding,
            acceptEncoding,
            brotliSupported: acceptEncoding?.includes('br'),
            gzipSupported: acceptEncoding?.includes('gzip')
          });
        }

        // Add compression headers hints for server
        if (enableBrotliCheck && !contentEncoding?.includes('br')) {
          const meta = document.createElement('meta');
          meta.httpEquiv = 'Accept-Encoding';
          meta.content = 'br, gzip, deflate';
          document.head.appendChild(meta);
        }

      } catch (error) {
        console.warn('Compression check failed:', error);
      }
    };

    checkCompression();
  }, [enableGzipCheck, enableBrotliCheck]);

  // Optimize caching strategies
  useEffect(() => {
    if (!enableCaching) return;

    const optimizeCaching = () => {
      // Add cache control meta tags
      const cacheDirectives = [
        { name: 'Cache-Control', content: 'public, max-age=31536000' },
        { name: 'Expires', content: new Date(Date.now() + 31536000000).toUTCString() }
      ];

      cacheDirectives.forEach(directive => {
        const existingMeta = document.querySelector(`meta[http-equiv="${directive.name}"]`);
        if (!existingMeta) {
          const meta = document.createElement('meta');
          meta.httpEquiv = directive.name;
          meta.content = directive.content;
          document.head.appendChild(meta);
        }
      });

      // Set up service worker for advanced caching
      if ('serviceWorker' in navigator && import.meta.env.PROD) {
        navigator.serviceWorker.ready.then(registration => {
          console.log('✅ Service Worker ready for caching optimization');
        });
      }
    };

    optimizeCaching();
  }, [enableCaching]);

  // Monitor resource sizes and compression ratios
  useEffect(() => {
    if (!('PerformanceObserver' in window)) return;

    const resourceObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries() as PerformanceResourceTiming[];
      
      entries.forEach(entry => {
        const { transferSize, decodedBodySize, name } = entry;
        
        if (transferSize && decodedBodySize) {
          const compressionRatio = (1 - transferSize / decodedBodySize) * 100;
          
          if (compressionRatio < 30 && decodedBodySize > 10000) {
            console.warn(`📦 Poor compression ratio for ${name}: ${compressionRatio.toFixed(1)}%`);
          }

          if (import.meta.env.DEV && transferSize > 100000) {
            console.log(`📦 Large resource: ${name} (${Math.round(transferSize / 1024)}KB)`);
          }
        }
      });
    });

    resourceObserver.observe({ entryTypes: ['resource'] });

    return () => resourceObserver.disconnect();
  }, []);

  return null;
};