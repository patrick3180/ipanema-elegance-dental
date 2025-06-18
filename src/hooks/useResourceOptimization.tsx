
import { useEffect, useCallback } from 'react';

interface ResourceOptimizationOptions {
  enableImageOptimization?: boolean;
  enableFontOptimization?: boolean;
  enableScriptOptimization?: boolean;
  enablePrefetching?: boolean;
}

export const useResourceOptimization = (options: ResourceOptimizationOptions = {}) => {
  const {
    enableImageOptimization = true,
    enableFontOptimization = true,
    enableScriptOptimization = true,
    enablePrefetching = true
  } = options;

  // Optimize images on scroll
  const optimizeImages = useCallback(() => {
    if (!enableImageOptimization) return;

    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.getAttribute('data-src');
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px'
    });

    images.forEach((img) => imageObserver.observe(img));

    return () => imageObserver.disconnect();
  }, [enableImageOptimization]);

  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    if (!enablePrefetching) return;

    // Preload critical CSS
    const criticalStyles = [
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap'
    ];

    criticalStyles.forEach((href) => {
      const existingLink = document.querySelector(`link[href="${href}"]`);
      if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        link.onload = () => {
          link.rel = 'stylesheet';
        };
        document.head.appendChild(link);
      }
    });

    // Preload hero image
    const heroImage = '/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.png';
    const img = new Image();
    img.src = heroImage;

  }, [enablePrefetching]);

  // Optimize font loading
  const optimizeFonts = useCallback(() => {
    if (!enableFontOptimization) return;

    // Use font-display: swap for better performance
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Playfair Display';
        font-display: swap;
      }
      @font-face {
        font-family: 'Montserrat';
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }, [enableFontOptimization]);

  // Remove unused CSS and optimize scripts
  const optimizeScripts = useCallback(() => {
    if (!enableScriptOptimization) return;

    // Defer non-critical scripts
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach((script) => {
      const src = script.getAttribute('src');
      if (src && !src.includes('gtm') && !src.includes('gptengineer')) {
        script.setAttribute('defer', '');
      }
    });
  }, [enableScriptOptimization]);

  // Monitor resource loading performance
  const monitorResourcePerformance = useCallback(() => {
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          const resource = entry as PerformanceResourceTiming;
          
          // Log slow resources in development
          if (import.meta.env.DEV && resource.duration > 1000) {
            console.warn(`Slow resource detected: ${resource.name} (${Math.round(resource.duration)}ms)`);
          }
          
          // Track in analytics
          if (window.gtag && resource.duration > 2000) {
            window.gtag('event', 'page_timing', {
              name: 'slow_resource',
              value: Math.round(resource.duration),
              custom_parameter: resource.name
            });
          }
        });
      });

      resourceObserver.observe({ entryTypes: ['resource'] });

      return () => resourceObserver.disconnect();
    }
  }, []);

  useEffect(() => {
    // Run optimizations after DOM is ready
    const timer = setTimeout(() => {
      optimizeImages();
      preloadCriticalResources();
      optimizeFonts();
      optimizeScripts();
      monitorResourcePerformance();
    }, 100);

    return () => clearTimeout(timer);
  }, [optimizeImages, preloadCriticalResources, optimizeFonts, optimizeScripts, monitorResourcePerformance]);

  return {
    optimizeImages,
    preloadCriticalResources,
    optimizeFonts,
    optimizeScripts
  };
};
