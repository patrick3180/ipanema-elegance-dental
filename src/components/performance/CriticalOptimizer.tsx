import { useEffect } from 'react';

interface CriticalOptimizerProps {
  enableCriticalCSS?: boolean;
  enableImageOptimization?: boolean;
  enableJSOptimization?: boolean;
  enableCaching?: boolean;
}

const CriticalOptimizer = ({
  enableCriticalCSS = true,
  enableImageOptimization = true,
  enableJSOptimization = true,
  enableCaching = true
}: CriticalOptimizerProps) => {
  
  useEffect(() => {
    if (!enableCriticalCSS) return;

    // Extract and inline critical CSS for above-the-fold content
    const inlineCriticalCSS = () => {
      const criticalCSS = `
        /* Critical above-the-fold styles */
        body, html { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
        .hero, .header { display: block; max-width: 100%; }
        h1, h2 { font-weight: 600; line-height: 1.2; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
        .btn { display: inline-block; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; }
        .btn-primary { background: hsl(43 33% 54%); color: white; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        img { max-width: 100%; height: auto; }
        /* Loading states */
        .skeleton { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: loading 1.5s infinite; }
        @keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `;

      const style = document.createElement('style');
      style.setAttribute('data-critical', 'true');
      style.textContent = criticalCSS;
      document.head.insertBefore(style, document.head.firstChild);
    };

    // Defer non-critical CSS
    const deferNonCriticalCSS = () => {
      const links = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
      links.forEach((link) => {
        if (link instanceof HTMLLinkElement) {
          link.media = 'print';
          link.onload = () => {
            link.media = 'all';
          };
        }
      });
    };

    inlineCriticalCSS();
    deferNonCriticalCSS();
  }, [enableCriticalCSS]);

  useEffect(() => {
    if (!enableImageOptimization) return;

    // Radical image optimization with progressive loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      
      images.forEach((img) => {
        // Add loading skeleton
        if (!img.complete) {
          img.style.backgroundColor = '#f0f0f0';
          img.style.background = 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
          img.style.backgroundSize = '200% 100%';
          img.style.animation = 'loading 1.5s infinite';
        }

        // Optimize image URLs for Contentful
        if (img.src.includes('images.ctfassets.net')) {
          const url = new URL(img.src);
          
          // Get optimal width based on container
          const rect = img.getBoundingClientRect();
          const containerWidth = rect.width || img.parentElement?.offsetWidth || 400;
          const optimalWidth = Math.min(containerWidth * window.devicePixelRatio, 1920);
          
          url.searchParams.set('w', Math.round(optimalWidth).toString());
          url.searchParams.set('q', '85');
          url.searchParams.set('fm', 'webp');
          url.searchParams.set('fit', 'fill');
          
          // Create progressive loading
          const placeholder = new Image();
          placeholder.src = url.toString().replace('q=85', 'q=20').replace(`w=${Math.round(optimalWidth)}`, 'w=50');
          
          placeholder.onload = () => {
            img.style.filter = 'blur(5px)';
            img.style.transition = 'filter 0.3s ease';
            img.src = placeholder.src;
            
            // Load high quality version
            const highQuality = new Image();
            highQuality.src = url.toString();
            highQuality.onload = () => {
              img.src = highQuality.src;
              img.style.filter = 'none';
              img.style.background = 'none';
              img.style.animation = 'none';
            };
          };
        }

        // Add error handling
        img.onerror = () => {
          img.style.display = 'none';
        };
      });
    };

    optimizeImages();
    
    // Re-optimize when new images are added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            const newImages = node.querySelectorAll('img');
            if (newImages.length > 0) {
              setTimeout(optimizeImages, 100);
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [enableImageOptimization]);

  useEffect(() => {
    if (!enableJSOptimization) return;

    // Remove unused JavaScript and optimize imports
    const optimizeJS = () => {
      // Remove unused event listeners
      const unusedSelectors = [
        '[data-unused]',
        '.deprecated',
        '[data-legacy]'
      ];

      unusedSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.remove());
      });

      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[src]:not([data-critical])');
      scripts.forEach((script) => {
        if (script instanceof HTMLScriptElement && !script.defer && !script.async) {
          script.defer = true;
        }
      });
    };

    optimizeJS();
  }, [enableJSOptimization]);

  useEffect(() => {
    if (!enableCaching) return;

    // Implement aggressive caching strategies
    const setupCaching = () => {
      // Cache static assets aggressively
      const cacheableExtensions = ['.css', '.js', '.woff2', '.woff', '.png', '.jpg', '.jpeg', '.webp', '.svg'];
      
      const originalFetch = window.fetch;
      window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = typeof input === 'string' ? input : input.toString();
        
        // Check if this is a cacheable static asset
        const isCacheable = cacheableExtensions.some(ext => url.includes(ext));
        
        if (isCacheable) {
          const cacheKey = `static_${url}`;
          const cached = localStorage.getItem(cacheKey);
          
          if (cached) {
            try {
              const cachedData = JSON.parse(cached);
              const isExpired = Date.now() - cachedData.timestamp > 24 * 60 * 60 * 1000; // 24 hours
              
              if (!isExpired) {
                return new Response(cachedData.data, {
                  status: 200,
                  headers: cachedData.headers
                });
              }
            } catch (e) {
              localStorage.removeItem(cacheKey);
            }
          }
          
          try {
            const response = await originalFetch(input, init);
            
            if (response.ok && response.body) {
              const clonedResponse = response.clone();
              const data = await clonedResponse.text();
              
              const cacheData = {
                data,
                headers: Object.fromEntries(response.headers.entries()),
                timestamp: Date.now()
              };
              
              try {
                localStorage.setItem(cacheKey, JSON.stringify(cacheData));
              } catch (e) {
                // Handle quota exceeded
                console.warn('Cache quota exceeded, clearing old entries');
                const keys = Object.keys(localStorage);
                keys.filter(key => key.startsWith('static_')).slice(0, 10).forEach(key => {
                  localStorage.removeItem(key);
                });
              }
            }
            
            return response;
          } catch (error) {
            throw error;
          }
        }
        
        return originalFetch(input, init);
      };

      return () => {
        window.fetch = originalFetch;
      };
    };

    const cleanup = setupCaching();
    return cleanup;
  }, [enableCaching]);

  // Monitor performance and apply emergency optimizations
  useEffect(() => {
    const monitorPerformance = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              const lcp = entry.startTime;
              
              // If LCP > 4 seconds, apply emergency optimizations
              if (lcp > 4000) {
                console.warn('Poor LCP detected, applying emergency optimizations');
                
                // Remove all non-essential elements
                const nonEssential = document.querySelectorAll('[data-non-essential], .animation, .carousel:not(.hero)');
                nonEssential.forEach(el => el.remove());
                
                // Disable all animations
                const style = document.createElement('style');
                style.textContent = `
                  *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                  }
                `;
                document.head.appendChild(style);
              }
            }
          }
        });

        try {
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.warn('Performance Observer not supported');
        }

        return () => observer.disconnect();
      }
    };

    const cleanup = monitorPerformance();
    return cleanup;
  }, []);

  return null;
};

export default CriticalOptimizer;