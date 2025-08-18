import { useEffect } from 'react';

interface AggressiveLCPOptimizerProps {
  heroImageSrc?: string;
  heroImageAlt?: string;
}

const AggressiveLCPOptimizer = ({ 
  heroImageSrc = '/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.webp',
  heroImageAlt = 'Dra. Carla'
}: AggressiveLCPOptimizerProps) => {
  useEffect(() => {
    // 1. CRITICAL: Preload hero image with highest priority
    const preloadHeroImage = () => {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = heroImageSrc;
      preloadLink.fetchPriority = 'high';
      preloadLink.type = 'image/webp';
      document.head.appendChild(preloadLink);

      // Also preload mobile version
      const mobilePreloadLink = document.createElement('link');
      mobilePreloadLink.rel = 'preload';
      mobilePreloadLink.as = 'image';
      mobilePreloadLink.href = heroImageSrc.replace('.webp', '-480.avif');
      mobilePreloadLink.fetchPriority = 'high';
      mobilePreloadLink.type = 'image/avif';
      mobilePreloadLink.media = '(max-width: 767px)';
      document.head.appendChild(mobilePreloadLink);
    };

    // 2. CRITICAL: Preload fonts with swap
    const preloadCriticalFonts = () => {
      const fonts = [
        '/fonts/montserrat-400.woff2',
        '/fonts/montserrat-500.woff2',
        '/fonts/playfair-display-400.woff2'
      ];

      fonts.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = fontUrl;
        document.head.appendChild(link);
      });

      // Add font-display: swap globally
      const fontSwapStyle = document.createElement('style');
      fontSwapStyle.textContent = `
        @font-face {
          font-display: swap !important;
        }
        * {
          font-display: swap !important;
        }
      `;
      document.head.appendChild(fontSwapStyle);
    };

    // 3. CRITICAL: Inline above-the-fold CSS
    const inlineCriticalCSS = () => {
      const criticalCSS = `
        /* CRITICAL ABOVE-THE-FOLD STYLES */
        .hero-section {
          display: flex !important;
          align-items: center !important;
          min-height: 80vh !important;
          background: hsl(var(--background)) !important;
          contain: layout style paint !important;
          will-change: auto !important;
        }
        .hero-content {
          max-width: 1200px !important;
          margin: 0 auto !important;
          padding: 0 1rem !important;
        }
        .hero-title {
          font-size: clamp(2rem, 5vw, 3.5rem) !important;
          font-weight: 600 !important;
          line-height: 1.1 !important;
          color: hsl(var(--foreground)) !important;
          margin-bottom: 1.5rem !important;
          font-display: swap !important;
        }
        .hero-image, [data-hero-image] {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 1rem !important;
          aspect-ratio: 400/500 !important;
          object-fit: cover !important;
          loading: eager !important;
          decoding: sync !important;
          fetchpriority: high !important;
        }
        /* Prevent layout shift */
        img {
          max-width: 100% !important;
          height: auto !important;
        }
        .hero-cta {
          display: inline-flex !important;
          align-items: center !important;
          padding: 0.75rem 1.5rem !important;
          background: hsl(var(--primary)) !important;
          color: hsl(var(--primary-foreground)) !important;
          border-radius: 0.5rem !important;
          font-weight: 500 !important;
          text-decoration: none !important;
          transition: all 0.2s !important;
        }
      `;

      const styleElement = document.createElement('style');
      styleElement.textContent = criticalCSS;
      styleElement.setAttribute('data-critical', 'aggressive-lcp');
      document.head.insertBefore(styleElement, document.head.firstChild);
    };

    // 4. CRITICAL: Optimize hero image immediately
    const optimizeHeroImage = () => {
      const heroImages = document.querySelectorAll('img[alt*="Dra"], [data-hero-image], .hero-section img');
      heroImages.forEach((img) => {
        if (img instanceof HTMLImageElement) {
          img.loading = 'eager';
          img.fetchPriority = 'high';
          img.decoding = 'sync';
          
          // Ensure proper dimensions
          if (!img.width || !img.height) {
            img.width = 400;
            img.height = 500;
          }
          
          // Add data attribute for identification
          img.setAttribute('data-hero-image', 'true');
        }
      });
    };

    // 5. CRITICAL: Defer non-critical resources
    const deferNonCriticalResources = () => {
      // Defer analytics scripts
      const analyticsScripts = document.querySelectorAll('script[src*="gtag"], script[src*="gtm"], script[src*="analytics"]');
      analyticsScripts.forEach(script => {
        const scriptEl = script as HTMLScriptElement;
        scriptEl.defer = true;
        scriptEl.async = false;
      });

      // Defer non-critical CSS
      const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
      nonCriticalCSS.forEach((link, index) => {
        const linkEl = link as HTMLLinkElement;
        if (index > 0) { // Keep first stylesheet
          linkEl.media = 'print';
          linkEl.onload = () => { linkEl.media = 'all'; };
        }
      });
    };

    // Execute optimizations immediately
    preloadHeroImage();
    preloadCriticalFonts();
    inlineCriticalCSS();
    
    // Execute DOM-dependent optimizations
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        optimizeHeroImage();
        deferNonCriticalResources();
      });
    } else {
      optimizeHeroImage();
      deferNonCriticalResources();
    }

    // Monitor LCP and apply emergency optimizations if needed
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        
        if (lastEntry && lastEntry.startTime > 2500) {
          console.warn(`🚨 LCP EMERGENCY: ${lastEntry.startTime}ms - applying emergency optimizations`);
          
          // Emergency: Hide non-critical content temporarily
          const nonCritical = document.querySelectorAll('[data-non-critical], .testimonials, .faq, .footer');
          nonCritical.forEach(el => {
            const element = el as HTMLElement;
            element.style.display = 'none';
            setTimeout(() => { element.style.display = ''; }, 1000);
          });
        }
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    }

  }, [heroImageSrc, heroImageAlt]);

  return null;
};

export default AggressiveLCPOptimizer;