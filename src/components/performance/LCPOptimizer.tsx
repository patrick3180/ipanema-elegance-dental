import { useEffect } from 'react';

interface LCPOptimizerProps {
  targetLCP?: number; // Target LCP in milliseconds
  enableEmergencyMode?: boolean;
  enableInlineCSS?: boolean; // New prop to control CSS inlining
}

const LCPOptimizer = ({ 
  targetLCP = 2500,
  enableEmergencyMode = true,  // Enable emergency mode by default for aggressive optimization
  enableInlineCSS = true       // Enable CSS inlining for critical path optimization
}: LCPOptimizerProps) => {
  useEffect(() => {
    let lcpObserver: PerformanceObserver | null = null;
    let emergencyModeTriggered = false;

    const optimizeLCP = () => {
      // Critical above-the-fold optimizations
      const heroImage = document.querySelector('[data-hero-image]') as HTMLImageElement;
      if (heroImage) {
        // Ensure hero image has highest priority
        heroImage.loading = 'eager';
        heroImage.fetchPriority = 'high';
        
        // Preload hero image if not already loaded
        if (!heroImage.complete) {
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.as = 'image';
          preloadLink.href = heroImage.src || heroImage.dataset.src || '';
          preloadLink.fetchPriority = 'high';
          document.head.appendChild(preloadLink);
        }
      }

      // Optimize critical fonts for LCP (using actual project fonts)
      const criticalFontFaces = [
        '/fonts/montserrat-400.woff2',
        '/fonts/montserrat-500.woff2',
        '/fonts/playfair-display-400.woff2'
      ];

      criticalFontFaces.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = fontUrl;
        document.head.appendChild(link);
      });

      // Inline critical CSS for above-the-fold content
      if (enableInlineCSS) {
        const criticalCSS = `
          /* Critical above-the-fold styles */
          .hero-section {
            display: flex;
            align-items: center;
            min-height: 80vh;
            background: hsl(var(--background));
            contain: layout style paint;
          }
          .hero-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
          }
          .hero-title {
            font-size: clamp(2rem, 5vw, 3.5rem);
            font-weight: 600;
            line-height: 1.1;
            color: hsl(var(--foreground));
            margin-bottom: 1.5rem;
            font-display: swap;
          }
          .hero-image {
            max-width: 100%;
            height: auto;
            border-radius: 1rem;
            aspect-ratio: 400/500;
          }
          /* Font optimization */
          @font-face {
            font-display: swap;
          }
          /* Prevent layout shift */
          img {
            max-width: 100%;
            height: auto;
          }
          /* Critical button styles */
          .hero-cta {
            display: inline-flex;
            align-items: center;
            padding: 0.75rem 1.5rem;
            background: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
            border-radius: 0.5rem;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.2s;
          }
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = criticalCSS;
        document.head.insertBefore(styleElement, document.head.firstChild);
      }
    };

    const triggerEmergencyMode = () => {
      if (!enableEmergencyMode || emergencyModeTriggered) return;
      
      emergencyModeTriggered = true;
      console.warn('🚨 Emergency LCP mode activated - optimizing critical path');

      // Remove non-critical stylesheets temporarily
      const nonCriticalStyles = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
      nonCriticalStyles.forEach(link => {
        const linkEl = link as HTMLLinkElement;
        linkEl.media = 'print';
        setTimeout(() => { linkEl.media = 'all'; }, 100);
      });

      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[src]:not([data-critical])');
      scripts.forEach(script => {
        const scriptEl = script as HTMLScriptElement;
        if (!scriptEl.defer && !scriptEl.async) {
          scriptEl.defer = true;
        }
      });

      // Hide non-critical content temporarily
      const nonCriticalElements = document.querySelectorAll('[data-non-critical]');
      nonCriticalElements.forEach(el => {
        const element = el as HTMLElement;
        element.style.visibility = 'hidden';
        setTimeout(() => { element.style.visibility = 'visible'; }, 500);
      });
    };

    // Monitor LCP and trigger optimizations
    if ('PerformanceObserver' in window) {
      lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { 
          startTime: number;
          element?: Element;
        };

        if (lastEntry && lastEntry.startTime > targetLCP) {
          console.warn(`LCP exceeded target: ${lastEntry.startTime}ms > ${targetLCP}ms`);
          triggerEmergencyMode();
        }
      });

      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    }

    // Run initial optimizations
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeLCP);
    } else {
      optimizeLCP();
    }

    return () => {
      if (lcpObserver) {
        lcpObserver.disconnect();
      }
      document.removeEventListener('DOMContentLoaded', optimizeLCP);
    };
  }, [targetLCP, enableEmergencyMode, enableInlineCSS]);

  return null;
};

export default LCPOptimizer;