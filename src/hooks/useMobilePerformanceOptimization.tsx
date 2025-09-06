import { useEffect, useRef } from 'react';
import { useMobileOptimization } from './useMobileOptimization';

interface MobilePerformanceOptions {
  enableAggressiveOptimization?: boolean;
  deferGTM?: boolean;
  optimizeImages?: boolean;
  reduceAnimations?: boolean;
}

export const useMobilePerformanceOptimization = (options: MobilePerformanceOptions = {}) => {
  const {
    enableAggressiveOptimization = true,
    deferGTM = true,
    optimizeImages = true,
    reduceAnimations = true
  } = options;

  const { isMobile, isLowEnd, connectionSpeed, shouldReduceAnimations } = useMobileOptimization();
  const optimizationsApplied = useRef(false);

  useEffect(() => {
    if (!isMobile || optimizationsApplied.current) return;

    const applyMobileOptimizations = () => {
      // 1. Defer GTM loading for mobile
      if (deferGTM) {
        const gtmScripts = document.querySelectorAll('script[src*="googletagmanager"]');
        gtmScripts.forEach(script => {
          if (script instanceof HTMLScriptElement) {
            script.defer = true;
            // Delay GTM load by 3 seconds on mobile
            const originalSrc = script.src;
            script.src = '';
            setTimeout(() => {
              script.src = originalSrc;
            }, 3000);
          }
        });
      }

      // 2. Optimize images for mobile viewport
      if (optimizeImages) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (img instanceof HTMLImageElement) {
            // Add mobile-specific optimization
            img.loading = img.classList.contains('hero-image') ? 'eager' : 'lazy';
            img.decoding = 'async';
            
            // Set responsive sizes for better mobile performance
            if (!img.sizes && img.srcset) {
              img.sizes = '(max-width: 768px) 100vw, 50vw';
            }

            // Convert to WebP if not already optimized
            if (img.src.includes('.png') || img.src.includes('.jpg')) {
              const webpSrc = img.src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
              
              // Create a test image to check if WebP version exists
              const testImg = new Image();
              testImg.onload = () => {
                img.src = webpSrc;
              };
              testImg.src = webpSrc;
            }
          }
        });
      }

      // 3. Reduce animations on low-end devices
      if (reduceAnimations && (shouldReduceAnimations || isLowEnd)) {
        const style = document.createElement('style');
        style.innerHTML = `
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        `;
        document.head.appendChild(style);
      }

      // 4. Aggressive optimization for slow connections
      if (enableAggressiveOptimization && connectionSpeed === 'slow') {
        // Remove non-critical elements temporarily
        const nonCriticalElements = document.querySelectorAll('[data-non-critical="true"]');
        nonCriticalElements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.display = 'none';
            // Re-show after 5 seconds
            setTimeout(() => {
              el.style.display = '';
            }, 5000);
          }
        });

        // Reduce image quality for slow connections
        const images = document.querySelectorAll('img[src*="contentful"]');
        images.forEach(img => {
          if (img instanceof HTMLImageElement) {
            const url = new URL(img.src);
            url.searchParams.set('q', '50'); // Reduce quality to 50%
            url.searchParams.set('w', '480'); // Max width 480px for mobile
            img.src = url.toString();
          }
        });
      }

      // 5. Preload critical fonts immediately
      const criticalFonts = [
        '/fonts/montserrat-400.woff2',
        '/fonts/playfair-display-400.woff2'
      ];

      criticalFonts.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = fontUrl;
        document.head.appendChild(link);
      });

      optimizationsApplied.current = true;
    };

    // Apply optimizations immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyMobileOptimizations);
    } else {
      applyMobileOptimizations();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', applyMobileOptimizations);
    };
  }, [isMobile, isLowEnd, connectionSpeed, shouldReduceAnimations, enableAggressiveOptimization, deferGTM, optimizeImages, reduceAnimations]);

  return {
    isMobile,
    isLowEnd,
    connectionSpeed,
    shouldReduceAnimations,
    optimizationsApplied: optimizationsApplied.current
  };
};