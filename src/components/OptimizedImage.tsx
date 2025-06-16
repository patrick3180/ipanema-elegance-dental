
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  lazy?: boolean;
  mobileSrc?: string;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  objectFit = "cover",
  lazy = true,
  mobileSrc,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "50px"
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isInView]);

  // Check if this is a mobile device
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Use mobile-specific source if provided and on mobile
  const currentSrc = isMobile && mobileSrc ? mobileSrc : src;

  // Helper function to check if URL is already optimized
  const isAlreadyOptimized = (url: string): boolean => {
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
  const optimizedSrc = React.useMemo(() => {
    if (!currentSrc || !isInView) {
      console.log('OptimizedImage: No src or not in view', { currentSrc, isInView });
      return "";
    }
    
    console.log('OptimizedImage: Processing image:', {
      currentSrc,
      width,
      isMobile,
      priority
    });
    
    // Handle Contentful images
    if (currentSrc.includes("ctfassets.net")) {
      try {
        // Check if already optimized to prevent double-optimization
        if (isAlreadyOptimized(currentSrc)) {
          console.log('OptimizedImage: URL already optimized, using as-is:', currentSrc);
          return currentSrc;
        }
        
        const baseUrl = currentSrc.startsWith("//") ? `https:${currentSrc}` : currentSrc;
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
          original: currentSrc,
          optimized: optimizedUrl
        });
        
        return optimizedUrl;
      } catch (error) {
        console.error('OptimizedImage: Error optimizing Contentful URL:', error);
        // Return original URL if optimization fails
        return currentSrc;
      }
    }
    
    // Handle local images
    if (currentSrc.startsWith('/')) {
      const fullUrl = window.location.origin + currentSrc;
      console.log('OptimizedImage: Converting relative path:', {
        original: currentSrc,
        fullUrl
      });
      return fullUrl;
    }
    
    // Return as-is for other URLs
    console.log('OptimizedImage: Using URL as-is:', currentSrc);
    return currentSrc;
  }, [currentSrc, width, isInView, isMobile]);

  const handleLoad = () => {
    console.log('OptimizedImage: Image loaded successfully:', {
      src: optimizedSrc,
      alt
    });
    setIsLoaded(true);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgElement = event.currentTarget;
    console.error('OptimizedImage: Image load failed:', {
      src: imgElement.src,
      alt: imgElement.alt,
      naturalWidth: imgElement.naturalWidth,
      naturalHeight: imgElement.naturalHeight,
      complete: imgElement.complete
    });
    
    setHasError(true);
    setIsLoaded(true);
  };

  if (hasError) {
    return (
      <div 
        className={cn(
          "bg-dental-beige/30 rounded-lg flex items-center justify-center border border-dental-gray/20", 
          className
        )}
        style={{ width, height }}
      >
        <div className="text-center p-4">
          <svg className="w-8 h-8 mx-auto mb-2 text-dental-gray/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span className="text-dental-gray/70 text-sm">Imagem não disponível</span>
          {alt && <p className="text-xs text-dental-gray/50 mt-1">{alt}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={imgRef}>
      {!isLoaded && isInView && (
        <Skeleton 
          className={cn("absolute inset-0", className)} 
          style={{ width, height }}
        />
      )}
      
      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          style={{ objectFit }}
          onLoad={handleLoad}
          onError={handleError}
          decoding="async"
        />
      )}
    </div>
  );
};

export default OptimizedImage;
