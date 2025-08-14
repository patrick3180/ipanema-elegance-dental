
// Helper function to check if URL is already optimized
export const isAlreadyOptimized = (url: string): boolean => {
  if (!url.includes('ctfassets.net')) return false;
  
  const urlObj = new URL(url.startsWith('//') ? `https:${url}` : url);
  const hasOptimizationParams = urlObj.searchParams.has('q') || 
                               urlObj.searchParams.has('w') || 
                               urlObj.searchParams.has('fm');
  
  if (process.env.NODE_ENV === 'development') {
    console.log('OptimizedImage: Checking if already optimized:', {
      url,
      hasOptimizationParams,
      searchParams: Object.fromEntries(urlObj.searchParams)
    });
  }
  
  return hasOptimizationParams;
};

// Enhanced image optimization with performance considerations
export const optimizeImageUrl = (src: string, width?: number, isMobile = false): string => {
  if (!src) {
    if (process.env.NODE_ENV === 'development') {
      console.log('OptimizedImage: No src provided');
    }
    return "";
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('OptimizedImage: Processing image:', {
      src,
      width,
      isMobile
    });
  }
  
  // Handle Contentful images with enhanced optimization
  if (src.includes("ctfassets.net")) {
    try {
      // Check if already optimized to prevent double-optimization
      if (isAlreadyOptimized(src)) {
        if (process.env.NODE_ENV === 'development') {
          console.log('OptimizedImage: URL already optimized, using as-is:', src);
        }
        return src;
      }
      
      const baseUrl = src.startsWith("//") ? `https:${src}` : src;
      const url = new URL(baseUrl);
      
      // Clear any existing optimization params to start fresh
      url.searchParams.delete('q');
      url.searchParams.delete('w');
      url.searchParams.delete('fm');
      url.searchParams.delete('dpr');
      url.searchParams.delete('fit');
      url.searchParams.delete('f');
      
      // Apply WebP format for better compression - reduced to 75% quality for faster loading
      url.searchParams.set('fm', 'webp');
      url.searchParams.set('q', '75');
      
      // Add responsive width based on device and connection
      if (width) {
        const responsiveWidth = getOptimalWidth(width, isMobile, getConnectionSpeed());
        url.searchParams.set('w', responsiveWidth.toString());
      }
      
      // Add density for retina displays (but cap it for performance)
      if (typeof window !== 'undefined' && window.devicePixelRatio > 1) {
        const dpr = Math.min(window.devicePixelRatio, 2);
        url.searchParams.set('dpr', dpr.toString());
      }
      
      // Add smart cropping for better composition
      url.searchParams.set('fit', 'fill');
      url.searchParams.set('f', 'face'); // Focus on faces when cropping
      
      const optimizedUrl = url.toString();
      if (process.env.NODE_ENV === 'development') {
        console.log('OptimizedImage: Contentful URL optimized:', {
          original: src,
          optimized: optimizedUrl,
          quality: 75
        });
      }
      
      return optimizedUrl;
    } catch (error) {
      console.error('OptimizedImage: Error optimizing Contentful URL:', error);
      // Return original URL if optimization fails
      return src;
    }
  }
  
  // Handle local images
  if (src.startsWith('/')) {
    const fullUrl = window.location.origin + src;
    if (process.env.NODE_ENV === 'development') {
      console.log('OptimizedImage: Converting relative path:', {
        original: src,
        fullUrl
      });
    }
    return fullUrl;
  }
  
  // Return as-is for other URLs
  if (process.env.NODE_ENV === 'development') {
    console.log('OptimizedImage: Using URL as-is:', src);
  }
  return src;
};

// Get connection speed for optimization decisions
const getConnectionSpeed = (): 'slow' | 'fast' | 'unknown' => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    const effectiveType = connection?.effectiveType;
    return ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast';
  }
  return 'unknown';
};

// Standard image quality - reduced to 75% for faster loading
const getOptimalQuality = (): number => {
  return 75; // Optimized quality for performance
};

// Get optimal image width based on conditions
const getOptimalWidth = (width: number, isMobile: boolean, connectionSpeed: string): number => {
  let maxWidth = width;
  
  if (connectionSpeed === 'slow') {
    maxWidth = Math.min(width, 800);
  } else if (isMobile) {
    maxWidth = Math.min(width, 900);
  }
  
  return maxWidth;
};

// Preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Generate responsive image sources with srcset
export const generateResponsiveSources = (
  baseSrc: string, 
  breakpoints: number[] = [320, 640, 768, 1024, 1280]
): string[] => {
  if (!baseSrc.includes('ctfassets.net')) {
    return [baseSrc];
  }
  
  return breakpoints.map(width => 
    optimizeImageUrl(baseSrc, width, width <= 768)
  );
};

// Generate srcset string for responsive images
export const generateSrcSet = (baseSrc: string): string => {
  const sources = generateResponsiveSources(baseSrc);
  const breakpoints = [320, 640, 768, 1024, 1280];
  
  return sources.map((src, index) => `${src} ${breakpoints[index]}w`).join(', ');
};

// Generate sizes attribute for responsive images
export const generateSizes = (isMobile: boolean): string => {
  if (isMobile) {
    return "(max-width: 640px) 100vw, (max-width: 768px) 90vw, 80vw";
  }
  return "(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw";
};

// Preload critical images with optimized URLs
export const preloadCriticalImages = (images: { src: string; width?: number }[]): void => {
  images.forEach(({ src, width }) => {
    const optimizedSrc = optimizeImageUrl(src, width);
    
    // Create preload link
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = optimizedSrc;
    
    // Add srcset for responsive preloading
    if (src.includes('ctfassets.net')) {
      link.setAttribute('imagesrcset', generateSrcSet(src));
      link.setAttribute('imagesizes', generateSizes(false));
    }
    
    document.head.appendChild(link);
  });
};
