import { useEffect } from 'react';

interface MobileImageOptimizerProps {
  isMobile?: boolean;
  enableLazyLoading?: boolean;
  enableWebPConversion?: boolean;
  enableResponsiveSizes?: boolean;
}

const MobileImageOptimizer = ({
  isMobile = true,
  enableLazyLoading = true,
  enableWebPConversion = true,
  enableResponsiveSizes = true
}: MobileImageOptimizerProps) => {
  useEffect(() => {
    if (!isMobile) return;

    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      
      images.forEach((img, index) => {
        if (img instanceof HTMLImageElement) {
          // 1. Set loading strategy based on position
          if (enableLazyLoading) {
            const isHeroImage = img.closest('.hero-section') || index < 2;
            img.loading = isHeroImage ? 'eager' : 'lazy';
            img.decoding = isHeroImage ? 'sync' : 'async';
            
            // Set fetchpriority for hero images
            if (isHeroImage) {
              img.setAttribute('fetchpriority', 'high');
            }
          }

          // 2. Add responsive sizes for mobile
          if (enableResponsiveSizes && !img.sizes) {
            // Mobile-optimized sizes
            img.sizes = '(max-width: 480px) 100vw, (max-width: 768px) 100vw, 50vw';
          }

          // 3. Optimize Contentful URLs for mobile
          if (img.src.includes('contentful.com') || img.src.includes('ctfassets.net')) {
            try {
              const url = new URL(img.src);
              
              // Mobile-specific optimizations
              if (window.innerWidth <= 768) {
                url.searchParams.set('w', '768'); // Max width for tablet
                url.searchParams.set('q', '85'); // Slightly lower quality for faster load
                url.searchParams.set('fm', 'webp'); // Force WebP format
                url.searchParams.set('fit', 'fill'); // Better for mobile layouts
                
                if (window.innerWidth <= 480) {
                  url.searchParams.set('w', '480'); // Mobile max width
                  url.searchParams.set('q', '80'); // Lower quality for mobile
                }
                
                img.src = url.toString();
              }
            } catch (error) {
              console.warn('Failed to optimize Contentful image URL:', error);
            }
          }

          // 4. Convert to WebP for better compression (if supported)
          if (enableWebPConversion && 'createImageBitmap' in window) {
            // Check if browser supports WebP
            const webp = new Image();
            webp.onload = webp.onerror = () => {
              if (webp.height === 2) {
                // WebP is supported, try to convert PNG/JPG to WebP
                if (img.src.match(/\.(png|jpg|jpeg)$/i) && !img.src.includes('webp')) {
                  const webpSrc = img.src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
                  
                  // Test if WebP version exists
                  const testImg = new Image();
                  testImg.onload = () => {
                    img.src = webpSrc;
                  };
                  testImg.onerror = () => {
                    // WebP version doesn't exist, keep original
                  };
                  testImg.src = webpSrc;
                }
              }
            };
            webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
          }

          // 5. Add intersection observer for fade-in effect
          if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  const img = entry.target as HTMLImageElement;
                  img.style.opacity = '0';
                  img.style.transition = 'opacity 0.3s ease';
                  
                  img.onload = () => {
                    img.style.opacity = '1';
                  };
                  
                  if (img.complete) {
                    img.style.opacity = '1';
                  }
                  
                  observer.unobserve(img);
                }
              });
            }, {
              rootMargin: '50px'
            });

            observer.observe(img);
          }

          // 6. Set explicit dimensions to prevent layout shift
          if (!img.width || !img.height) {
            // Try to get dimensions from aspect ratio or set default
            const aspectRatio = img.getAttribute('data-aspect-ratio');
            if (aspectRatio) {
              const [width, height] = aspectRatio.split('/').map(Number);
              const containerWidth = img.parentElement?.clientWidth || 320;
              img.width = containerWidth;
              img.height = (containerWidth * height) / width;
            } else {
              // Set min dimensions to prevent layout shift
              img.style.minHeight = '200px';
              img.style.backgroundColor = '#f0f0f0';
            }
          }
        }
      });
    };

    // Run optimization immediately
    optimizeImages();

    // Re-run when new images are added to DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node instanceof HTMLElement) {
            const newImages = node.querySelectorAll('img');
            if (newImages.length > 0) {
              setTimeout(optimizeImages, 100);
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [isMobile, enableLazyLoading, enableWebPConversion, enableResponsiveSizes]);

  return null;
};

export default MobileImageOptimizer;
