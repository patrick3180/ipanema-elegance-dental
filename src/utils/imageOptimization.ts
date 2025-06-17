
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

// Optimize image URL with better error handling
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
  
  // Handle Contentful images
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
      
      // Apply new optimization settings
      url.searchParams.set('fm', 'webp');
      url.searchParams.set('q', '80');
      
      // Add responsive width based on device
      if (width) {
        const responsiveWidth = isMobile ? Math.min(width, 800) : width;
        url.searchParams.set('w', responsiveWidth.toString());
      }
      
      // Add density for retina displays
      if (typeof window !== 'undefined' && window.devicePixelRatio > 1) {
        url.searchParams.set('dpr', Math.min(window.devicePixelRatio, 2).toString());
      }
      
      const optimizedUrl = url.toString();
      console.log('OptimizedImage: Contentful URL optimized:', {
        original: src,
        optimized: optimizedUrl
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
