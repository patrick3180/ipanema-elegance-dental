
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
        rootMargin: "50px" // Start loading 50px before entering viewport
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

  // Optimize image URL
  const optimizedSrc = React.useMemo(() => {
    if (!currentSrc || !isInView) return "";
    
    // Contentful image optimization
    if (currentSrc.includes("images.ctfassets.net") || currentSrc.includes("downloads.ctfassets.net")) {
      const baseUrl = currentSrc.startsWith("//") ? `https:${currentSrc}` : currentSrc;
      const separator = baseUrl.includes("?") ? "&" : "?";
      
      let optimizedUrl = `${baseUrl}${separator}fm=webp&q=80`;
      
      // Add responsive width based on device
      if (width) {
        const responsiveWidth = isMobile ? Math.min(width, 800) : width;
        optimizedUrl += `&w=${responsiveWidth}`;
      }
      
      // Add density for retina displays
      if (typeof window !== 'undefined' && window.devicePixelRatio > 1) {
        optimizedUrl += `&dpr=${Math.min(window.devicePixelRatio, 2)}`;
      }
      
      return optimizedUrl;
    }
    
    return currentSrc;
  }, [currentSrc, width, isInView, isMobile]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  if (hasError) {
    return (
      <div 
        className={cn("bg-gray-200 flex items-center justify-center", className)}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Imagem não disponível</span>
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
