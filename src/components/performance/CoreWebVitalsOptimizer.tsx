import React, { useEffect } from 'react';
import { useCoreWebVitals } from '@/hooks/useCoreWebVitals';

const CoreWebVitalsOptimizer = () => {
  const { metrics, isSupported, getOverallScore, getRecommendations } = useCoreWebVitals();

  useEffect(() => {
    // Only run optimizations if Core Web Vitals are supported
    if (!isSupported) return;

    // Apply critical performance optimizations
    const optimizePageLoad = () => {
      // 1. Optimize above-the-fold images
      const heroImages = document.querySelectorAll('.hero-section img, [data-priority="true"] img');
      heroImages.forEach((img) => {
        if (img instanceof HTMLImageElement) {
          img.loading = 'eager';
          img.decoding = 'sync';
        }
      });

      // 2. Preload critical resources
      const criticalResources = [
        '/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.webp',
        '/lovable-uploads/164bae76-428b-4fae-a600-ba61172b5dac.png'
      ];

      criticalResources.forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });

      // 3. Add font-display: swap to all fonts
      const fontStyle = document.createElement('style');
      fontStyle.textContent = `
        @font-face {
          font-family: 'Playfair Display';
          font-display: swap;
        }
        @font-face {
          font-family: 'Montserrat';
          font-display: swap;
        }
      `;
      document.head.appendChild(fontStyle);

      // 4. Optimize layout shifts by setting image dimensions
      const images = document.querySelectorAll('img:not([width]):not([height])');
      images.forEach((img) => {
        if (img instanceof HTMLImageElement && img.complete) {
          img.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
        }
      });
    };

    // Run optimizations immediately and after DOM updates
    optimizePageLoad();
    
    const observer = new MutationObserver(() => {
      requestIdleCallback(optimizePageLoad);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [isSupported]);

  useEffect(() => {
    // Log performance metrics in development
    if (import.meta.env.DEV && metrics.lcp) {
      const score = getOverallScore();
      const recommendations = getRecommendations();
      
      console.group('🚀 Core Web Vitals Report');
      console.log('LCP:', metrics.lcp, 'ms');
      console.log('FID:', metrics.fid, 'ms');
      console.log('CLS:', metrics.cls);
      console.log('Overall Score:', score, '%');
      console.log('Recommendations:', recommendations);
      console.groupEnd();
    }
  }, [metrics, getOverallScore, getRecommendations]);

  return null; // This component doesn't render anything
};

export default CoreWebVitalsOptimizer;
