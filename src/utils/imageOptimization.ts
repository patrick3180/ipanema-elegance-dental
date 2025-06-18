
// Helper function to check if URL is already optimized
export const isAlreadyOptimized = (url: string): boolean => {
  if (!url.includes('ctfassets.net')) return false;
  
  const urlObj = new URL(url.startsWith('//') ? `https:${url}` : url);
  const hasOptimizationParams = urlObj.searchParams.has('q') || 
                               urlObj.searchParams.has('w') || 
                               urlObj.searchParams.has('fm');
  
  console.log('OptimizedImage: Checking if already optimized:', {
    url,
    hasOptimizationParams,
    searchParams: Object.fromEntries(urlObj.searchParams)
  });
  
  return hasOptimizationParams;
};

// Enhanced image optimization with performance considerations
export const optimizeImageUrl = (src: string, width?: number, isMobile = false): string => {
  if (!src) {
    console.log('OptimizedImage: No src provided');
    return "";
  }
  
  console.log('OptimizedImage: Processing image:', {
    src,
    width,
    isMobile
  });
  
  // Handle Contentful images with enhanced optimization
  if (src.includes("ctfassets.net")) {
    try {
      // Check if already optimized to prevent double-optimization
      if (isAlreadyOptimized(src)) {
        console.log('OptimizedImage: URL already optimized, using as-is:', src);
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
      
      // Apply WebP format for better compression
      url.searchParams.set('fm', 'webp');
      
      // Adaptive quality based on connection and device
      const connectionSpeed = getConnectionSpeed();
      const quality = getOptimalQuality(connectionSpeed, isMobile);
      url.searchParams.set('q', quality.toString());
      
      // Add responsive width based on device and connection
      if (width) {
        const responsiveWidth = getOptimalWidth(width, isMobile, connectionSpeed);
        url.searchParams.set('w', responsiveWidth.toString());
      }
      
      // Add density for retina displays (but cap it for performance)
      if (typeof window !== 'undefined' && window.devicePixelRatio > 1) {
        const dpr = Math.min(window.devicePixelRatio, connectionSpeed === 'slow' ? 1.5 : 2);
        url.searchParams.set('dpr', dpr.toString());
      }
      
      // Add smart cropping for better composition
      url.searchParams.set('fit', 'fill');
      url.searchParams.set('f', 'face'); // Focus on faces when cropping
      
      const optimizedUrl = url.toString();
      console.log('OptimizedImage: Contentful URL optimized:', {
        original: src,
        optimized: optimizedUrl,
        quality,
        connectionSpeed
      });
      
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
    console.log('OptimizedImage: Converting relative path:', {
      original: src,
      fullUrl
    });
    return fullUrl;
  }
  
  // Return as-is for other URLs
  console.log('OptimizedImage: Using URL as-is:', src);
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

// Get optimal image quality based on conditions
const getOptimalQuality = (connectionSpeed: string, isMobile: boolean): number => {
  if (connectionSpeed === 'slow') return 65;
  if (isMobile) return 75;
  return 85;
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

// Generate responsive image sources
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
