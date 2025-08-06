import { useEffect } from 'react';

interface LCPOptimizerProps {
  targetLCP?: number; // Target LCP in milliseconds
  enableEmergencyMode?: boolean;
}

const LCPOptimizer = ({ 
  targetLCP = 2500,
  enableEmergencyMode = true 
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

      // Optimize critical fonts for LCP
      const criticalFontFaces = [
        '/fonts/inter-regular.woff2',
        '/fonts/inter-medium.woff2'
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

      // Inline critical CSS for immediate rendering
      const criticalCSS = `
        .hero-section {
          display: flex;
          align-items: center;
          min-height: 80vh;
          background: hsl(var(--dental-beige));
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
          color: hsl(var(--dental-primary));
          margin-bottom: 1.5rem;
        }
        .hero-image {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
        }
      `;

      const styleElement = document.createElement('style');
      styleElement.textContent = criticalCSS;
      document.head.insertBefore(styleElement, document.head.firstChild);
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
  }, [targetLCP, enableEmergencyMode]);

  return null;
};

export default LCPOptimizer;