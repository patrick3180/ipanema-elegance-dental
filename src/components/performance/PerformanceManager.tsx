import { useEffect } from 'react';

interface PerformanceManagerProps {
  enableCompleteOptimization?: boolean;
  enablePassiveMode?: boolean; // New prop for passive monitoring only
}

const PerformanceManager = ({ 
  enableCompleteOptimization = false, 
  enablePassiveMode = true 
}: PerformanceManagerProps) => {
  useEffect(() => {
    // In passive mode, only monitor without making changes
    if (enablePassiveMode && !enableCompleteOptimization) {
      console.log('PerformanceManager: Running in passive monitoring mode');
      return;
    }
    
    if (!enableCompleteOptimization) return;

    // Comprehensive performance monitoring and optimization
    const initializePerformanceOptimizations = () => {
      // 1. Monitor Core Web Vitals continuously
      if ('web-vital' in window || typeof window !== 'undefined') {
        const vitalsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // Track all performance metrics
            if (entry.entryType === 'largest-contentful-paint') {
              console.log('LCP:', entry.startTime);
              
              // If LCP is too high, implement emergency optimizations
              if (entry.startTime > 2500) {
                emergencyLCPOptimization();
              }
            }
            
            if (entry.entryType === 'first-input') {
              const fidEntry = entry as any;
              console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
            }
            
            if (entry.entryType === 'layout-shift') {
              console.log('CLS:', (entry as any).value);
            }
          }
        });

        try {
          vitalsObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        } catch (e) {
          console.warn('Performance Observer not fully supported:', e);
        }
      }

      // 2. Implement adaptive loading based on device capabilities
      const implementAdaptiveLoading = () => {
        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
        
        if (connection) {
          const networkSpeed = connection.effectiveType;
          const isSlowNetwork = networkSpeed === 'slow-2g' || networkSpeed === '2g';
          
          if (isSlowNetwork) {
            // Implement aggressive optimizations for slow networks
            document.body.classList.add('slow-network');
            
            // Disable non-essential features
            const nonEssentialElements = document.querySelectorAll('[data-non-essential]');
            nonEssentialElements.forEach(el => el.remove());
            
            // Reduce image quality
            const images = document.querySelectorAll('img[data-src]');
            images.forEach((img) => {
              if (img instanceof HTMLImageElement && img.dataset.src) {
                const url = new URL(img.dataset.src);
                url.searchParams.set('q', '50'); // Lower quality for slow networks
                img.dataset.src = url.toString();
              }
            });
          }
        }
      };

      // 3. Battery-aware optimizations
      const implementBatteryOptimizations = async () => {
        if ('getBattery' in navigator) {
          try {
            const battery = await (navigator as any).getBattery();
            
            if (battery.level < 0.2 || !battery.charging) {
              // Reduce CPU-intensive operations when battery is low
              document.body.classList.add('low-battery');
              
              // Disable animations
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
          } catch (e) {
            console.warn('Battery API not supported:', e);
          }
        }
      };

      // 4. Memory pressure handling
      const handleMemoryPressure = () => {
        if ('memory' in performance) {
          const memInfo = (performance as any).memory;
          const memoryUsageRatio = memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit;
          
          if (memoryUsageRatio > 0.8) {
            // Clear caches and reduce memory usage
            console.warn('High memory usage detected, clearing caches...');
            
            // Clear image cache
            const imgCache = new Map();
            imgCache.clear();
            
            // Force garbage collection if available
            if ('gc' in window) {
              (window as any).gc();
            }
          }
        }
      };

      // Run all optimizations
      implementAdaptiveLoading();
      implementBatteryOptimizations();
      
      // Monitor memory usage periodically
      setInterval(handleMemoryPressure, 30000); // Every 30 seconds
    };

    const emergencyLCPOptimization = () => {
      console.warn('Emergency LCP optimization triggered');
      
      // 1. Preload LCP element immediately
      const lcpCandidates = document.querySelectorAll('img[data-hero], h1, .hero, [data-lcp]');
      lcpCandidates.forEach((element) => {
        if (element instanceof HTMLImageElement && element.dataset.src) {
          element.src = element.dataset.src;
          element.loading = 'eager';
        }
      });
      
      // 2. Inline critical CSS if not already done
      const criticalCSS = `
        body, html { margin: 0; padding: 0; }
        .hero { display: block; max-width: 100%; height: auto; }
        h1, h2 { font-family: system-ui, -apple-system, sans-serif; }
      `;
      
      const style = document.createElement('style');
      style.textContent = criticalCSS;
      document.head.insertBefore(style, document.head.firstChild);
      
      // 3. Remove render-blocking resources
      const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
      nonCriticalCSS.forEach((link) => {
        if (link instanceof HTMLLinkElement) {
          link.media = 'print';
          link.onload = () => {
            link.media = 'all';
          };
        }
      });
    };

    // Initialize all optimizations
    initializePerformanceOptimizations();
  }, [enableCompleteOptimization]);

  useEffect(() => {
    // Enhanced image loading optimization
    const optimizeImageLoading = () => {
      // Implement intersection observer with improved thresholds
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              
              if (img.dataset.src) {
                // Create optimized image URL
                let src = img.dataset.src;
                
                // For Contentful images, add optimization parameters
                if (src.includes('images.ctfassets.net')) {
                  const url = new URL(src);
                  
                  // Add responsive width based on container
                  const containerWidth = img.parentElement?.offsetWidth || window.innerWidth;
                  const optimizedWidth = Math.min(containerWidth * window.devicePixelRatio, 2400);
                  
                  url.searchParams.set('w', optimizedWidth.toString());
                  url.searchParams.set('q', '85');
                  url.searchParams.set('fm', 'webp');
                  url.searchParams.set('fit', 'fill');
                  
                  src = url.toString();
                }
                
                // Load the image
                img.src = src;
                img.removeAttribute('data-src');
                
                // Add loading animation
                img.style.transition = 'opacity 0.3s ease';
                img.style.opacity = '0';
                
                img.onload = () => {
                  img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
              }
            }
          });
        },
        {
          rootMargin: '50px',
          threshold: 0.1
        }
      );

      // Observe all lazy images
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => imageObserver.observe(img));

      return imageObserver;
    };

    const observer = optimizeImageLoading();

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return null;
};

export default PerformanceManager;