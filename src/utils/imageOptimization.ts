
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

// Enhanced image optimization with performance considerations and AVIF support
export const optimizeImageUrl = (src: string, width?: number, isMobile = false, format?: 'avif' | 'webp' | 'jpg'): string => {
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
      
      // Apply format - prioritize AVIF > WebP > JPEG
      const imageFormat = format || (supportsAVIF() ? 'avif' : 'webp');
      url.searchParams.set('fm', imageFormat);
      
      // Set quality based on format (AVIF can use lower quality)
      const quality = imageFormat === 'avif' ? '75' : '85';
      url.searchParams.set('q', quality);
      
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
      console.log('OptimizedImage: Contentful URL optimized:', {
        original: src,
        optimized: optimizedUrl,
        quality: 85
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

// Helper function to check AVIF support
const supportsAVIF = (): boolean => {
  if (typeof window === 'undefined') return false;
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  try {
    return canvas.toDataURL('image/avif').startsWith('data:image/avif');
  } catch {
    return false;
  }
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

// Standard image quality - consistent 85% for WebP
const getOptimalQuality = (): number => {
  return 85; // Standardized quality for all images
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

// Generate blur placeholder data URL
export const generateBlurDataUrl = (width = 10, height = 10): string => {
  if (typeof window === 'undefined') return '';
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  // Create simple gradient blur effect
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

// Preload critical images with AVIF support
export const preloadCriticalImages = (images: { src: string; width?: number }[]): void => {
  const supportsAvif = supportsAVIF();
  
  images.forEach(({ src, width }) => {
    // Preload AVIF version if supported
    if (supportsAvif) {
      const avifSrc = optimizeImageUrl(src, width, false, 'avif');
      const avifLink = document.createElement('link');
      avifLink.rel = 'preload';
      avifLink.as = 'image';
      avifLink.href = avifSrc;
      avifLink.type = 'image/avif';
      document.head.appendChild(avifLink);
    }
    
    // Preload WebP fallback
    const webpSrc = optimizeImageUrl(src, width, false, 'webp');
    const webpLink = document.createElement('link');
    webpLink.rel = 'preload';
    webpLink.as = 'image';
    webpLink.href = webpSrc;
    webpLink.type = 'image/webp';
    
    // Add srcset for responsive preloading
    if (src.includes('ctfassets.net')) {
      webpLink.setAttribute('imagesrcset', generateSrcSet(src));
      webpLink.setAttribute('imagesizes', generateSizes(false));
    }
    
    document.head.appendChild(webpLink);
  });
};
