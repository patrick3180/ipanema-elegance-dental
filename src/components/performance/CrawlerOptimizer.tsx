import { useEffect } from 'react';

export const CrawlerOptimizer = () => {
  useEffect(() => {
    // Optimize for search engine crawlers
    const optimizeForCrawlers = () => {
      // 1. Preload critical resources
      const preloadCriticalResources = () => {
        const criticalResources = [
          '/assets/css/index.css',
          'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        ];
        
        criticalResources.forEach(href => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = href;
          link.as = href.includes('.css') ? 'style' : 'font';
          if (href.includes('font')) {
            link.crossOrigin = 'anonymous';
          }
          document.head.appendChild(link);
        });
      };

      // 2. Optimize images for faster loading
      const optimizeImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        }, {
          rootMargin: '50px'
        });

        images.forEach(img => imageObserver.observe(img));
      };

      // 3. Add crawler-friendly meta tags
      const addCrawlerMeta = () => {
        const existingMeta = document.querySelector('meta[name="robots"]');
        if (!existingMeta) {
          const robotsMeta = document.createElement('meta');
          robotsMeta.name = 'robots';
          robotsMeta.content = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
          document.head.appendChild(robotsMeta);
        }

        // Add structured data for better understanding
        const structuredData = {
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          "name": "Dra. Carla Christoph - Dentista",
          "description": "Clínica odontológica especializada em estética dental, implantes e tratamentos modernos em Ipanema, Rio de Janeiro.",
          "url": "https://dracarlachristoph.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rua Visconde de Pirajá",
            "addressLocality": "Ipanema",
            "addressRegion": "RJ",
            "addressCountry": "BR"
          },
          "telephone": "+5521993304045",
          "medicalSpecialty": "Dentistry",
          "priceRange": "$$$"
        };

        const existingLD = document.querySelector('script[type="application/ld+json"]');
        if (!existingLD) {
          const script = document.createElement('script');
          script.type = 'application/ld+json';
          script.textContent = JSON.stringify(structuredData);
          document.head.appendChild(script);
        }
      };

      // 4. Reduce layout shifts
      const reduceLayoutShifts = () => {
        // Ensure images have dimensions
        const images = document.querySelectorAll('img:not([width]):not([height])');
        images.forEach(img => {
          const htmlImg = img as HTMLImageElement;
          if (!htmlImg.style.aspectRatio && !htmlImg.width && !htmlImg.height) {
            htmlImg.style.aspectRatio = '16/9';
            htmlImg.style.width = '100%';
            htmlImg.style.height = 'auto';
          }
        });
      };

      // 5. Optimize font loading
      const optimizeFonts = () => {
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]') as NodeListOf<HTMLLinkElement>;
        fontLinks.forEach(link => {
          if (!link.rel.includes('preload')) {
            link.rel = 'preload';
            link.as = 'style';
            link.onload = function(this: HTMLLinkElement) {
              this.onload = null;
              this.rel = 'stylesheet';
            };
          }
        });
      };

      // Execute optimizations
      preloadCriticalResources();
      optimizeImages();
      addCrawlerMeta();
      reduceLayoutShifts();
      optimizeFonts();
      
      console.log('🚀 Crawler optimizations applied');
    };

    // Apply optimizations after a short delay to ensure DOM is ready
    const timer = setTimeout(optimizeForCrawlers, 100);

    return () => clearTimeout(timer);
  }, []);

  // Component doesn't render anything visible
  return null;
};

// Hook for using crawler optimizations in components
export const useCrawlerOptimization = () => {
  useEffect(() => {
    // Monitor core web vitals for crawler performance
    const monitorPerformance = () => {
      if ('PerformanceObserver' in window) {
        // Monitor Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcpEntry = entries[entries.length - 1];
          console.log('📊 LCP:', lcpEntry.startTime);
          
          // Log slow LCP for optimization
          if (lcpEntry.startTime > 2500) {
            console.warn('⚠️ Slow LCP detected:', lcpEntry.startTime);
          }
        });
        
        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          // Browser doesn't support LCP
        }

        // Monitor First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            const fidEntry = entry as any; // PerformanceEventTiming
            if (fidEntry.processingStart) {
              console.log('📊 FID:', fidEntry.processingStart - entry.startTime);
            }
          });
        });
        
        try {
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          // Browser doesn't support FID
        }

        // Monitor Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            const clsEntry = entry as any; // LayoutShift
            if (!clsEntry.hadRecentInput) {
              clsValue += clsEntry.value;
            }
          });
          console.log('📊 CLS:', clsValue);
        });
        
        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          // Browser doesn't support CLS
        }

        // Cleanup observers after 30 seconds
        setTimeout(() => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        }, 30000);
      }
    };

    monitorPerformance();
  }, []);
};