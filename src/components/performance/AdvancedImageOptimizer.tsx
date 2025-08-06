import { useEffect, useState, useCallback } from 'react';
import { imageCache } from '@/utils/advancedCache';

interface AdvancedImageOptimizerProps {
  enableWebP?: boolean;
  enableAVIF?: boolean;
  lazyLoadThreshold?: number;
  qualitySettings?: {
    mobile: number;
    desktop: number;
    retina: number;
  };
}

const AdvancedImageOptimizer = ({
  enableWebP = true,
  enableAVIF = false,
  lazyLoadThreshold = 0.1,
  qualitySettings = {
    mobile: 75,
    desktop: 85,
    retina: 90
  }
}: AdvancedImageOptimizerProps) => {
  const [isIntersectionObserverSupported] = useState(
    'IntersectionObserver' in window
  );

  const optimizeImageUrl = useCallback((src: string, options: any = {}) => {
    // Check cache first
    const cacheKey = `${src}_${JSON.stringify(options)}`;
    const cachedUrl = imageCache.get(cacheKey);
    if (cachedUrl) return cachedUrl;

    let optimizedUrl = src;

    // For Contentful images
    if (src.includes('images.ctfassets.net')) {
      const url = new URL(src);
      
      // Add quality based on device
      const isMobile = window.innerWidth < 768;
      const isRetina = window.devicePixelRatio > 1.5;
      
      let quality = qualitySettings.desktop;
      if (isMobile) quality = qualitySettings.mobile;
      if (isRetina) quality = qualitySettings.retina;
      
      url.searchParams.set('q', quality.toString());
      
      // Add format based on browser support
      if (enableAVIF && supportsFormat('avif')) {
        url.searchParams.set('fm', 'avif');
      } else if (enableWebP && supportsFormat('webp')) {
        url.searchParams.set('fm', 'webp');
      }
      
      // Add responsive width
      if (options.width) {
        url.searchParams.set('w', options.width.toString());
      }
      
      // Add DPR for high-density displays
      if (window.devicePixelRatio > 1) {
        url.searchParams.set('dpr', Math.min(window.devicePixelRatio, 3).toString());
      }
      
      optimizedUrl = url.toString();
    }

    // Cache the optimized URL
    imageCache.set(cacheKey, optimizedUrl);
    return optimizedUrl;
  }, [enableWebP, enableAVIF, qualitySettings]);

  const supportsFormat = useCallback((format: string): boolean => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL(`image/${format}`).indexOf(`data:image/${format}`) === 0;
  }, []);

  const setupIntersectionObserver = useCallback(() => {
    if (!isIntersectionObserverSupported) return;

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            
            // Load the image
            if (img.dataset.src) {
              const optimizedSrc = optimizeImageUrl(img.dataset.src, {
                width: img.offsetWidth || 800
              });
              
              img.src = optimizedSrc;
              img.removeAttribute('data-src');
              
              // Add loading states
              img.classList.add('loading');
              
              img.onload = () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
              };
              
              img.onerror = () => {
                img.classList.remove('loading');
                img.classList.add('error');
                // Fallback to original src
                if (img.dataset.originalSrc) {
                  img.src = img.dataset.originalSrc;
                }
              };
            }
            
            imageObserver.unobserve(img);
          }
        });
      },
      {
        threshold: lazyLoadThreshold,
        rootMargin: '50px'
      }
    );

    // Observe all lazy images
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach((img) => imageObserver.observe(img));

    return imageObserver;
  }, [isIntersectionObserverSupported, lazyLoadThreshold, optimizeImageUrl]);

  const setupImagePreloading = useCallback(() => {
    // Preload critical images
    const criticalImages = document.querySelectorAll('[data-critical="true"]');
    
    criticalImages.forEach((img) => {
      if (img instanceof HTMLImageElement && img.dataset.src) {
        const optimizedSrc = optimizeImageUrl(img.dataset.src, {
          width: img.offsetWidth || 800
        });
        
        // Create preload link
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = optimizedSrc;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
        
        // Load immediately
        img.src = optimizedSrc;
        img.removeAttribute('data-src');
      }
    });
  }, [optimizeImageUrl]);

  const setupResponsiveImages = useCallback(() => {
    // Create responsive image sources
    const responsiveImages = document.querySelectorAll('[data-responsive="true"]');
    
    responsiveImages.forEach((img) => {
      if (img instanceof HTMLImageElement && img.dataset.src) {
        const picture = document.createElement('picture');
        const originalSrc = img.dataset.src;
        
        // Create source elements for different screen sizes
        const breakpoints = [
          { media: '(max-width: 480px)', width: 480 },
          { media: '(max-width: 768px)', width: 768 },
          { media: '(max-width: 1024px)', width: 1024 },
          { media: '(min-width: 1025px)', width: 1200 }
        ];
        
        breakpoints.forEach(({ media, width }) => {
          const source = document.createElement('source');
          source.media = media;
          
          const optimizedUrl = optimizeImageUrl(originalSrc, { width });
          source.srcset = optimizedUrl;
          
          picture.appendChild(source);
        });
        
        // Clone the original img and add as fallback
        const fallbackImg = img.cloneNode() as HTMLImageElement;
        fallbackImg.src = optimizeImageUrl(originalSrc);
        picture.appendChild(fallbackImg);
        
        // Replace original img with picture
        img.parentNode?.replaceChild(picture, img);
      }
    });
  }, [optimizeImageUrl]);

  useEffect(() => {
    // Setup all optimizations
    const observer = setupIntersectionObserver();
    setupImagePreloading();
    setupResponsiveImages();

    // Add CSS for loading states
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      img.loading {
        opacity: 0.5;
        filter: blur(2px);
        transition: all 0.3s ease;
      }
      
      img.loaded {
        opacity: 1;
        filter: none;
      }
      
      img.error {
        opacity: 0.7;
        filter: grayscale(100%);
      }
      
      /* Prevent layout shifts */
      img[data-src] {
        background-color: hsl(var(--muted));
        background-image: linear-gradient(
          45deg,
          transparent 25%,
          hsl(var(--muted-foreground) / 0.1) 25%,
          hsl(var(--muted-foreground) / 0.1) 50%,
          transparent 50%,
          transparent 75%,
          hsl(var(--muted-foreground) / 0.1) 75%
        );
        background-size: 20px 20px;
        animation: loading-shimmer 2s infinite linear;
      }
      
      @keyframes loading-shimmer {
        0% { background-position: 0 0; }
        100% { background-position: 40px 40px; }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      if (observer) observer.disconnect();
      if (styleSheet.parentNode) {
        styleSheet.parentNode.removeChild(styleSheet);
      }
    };
  }, [setupIntersectionObserver, setupImagePreloading, setupResponsiveImages]);

  return null;
};

export default AdvancedImageOptimizer;