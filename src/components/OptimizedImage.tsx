
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useImageIntersection } from "@/hooks/useImageIntersection";
import { useImageLoading } from "@/hooks/useImageLoading";
import { optimizeImageUrl } from "@/utils/imageOptimization";
import ImageFallback from "@/components/image/ImageFallback";

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
  const { isInView, imgRef } = useImageIntersection({ lazy, priority });
  const { isLoaded, hasError, handleLoad, handleError } = useImageLoading();

  // Check if this is a mobile device
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Use mobile-specific source if provided and on mobile
  const currentSrc = isMobile && mobileSrc ? mobileSrc : src;

  // Optimize image URL with better error handling
  const optimizedSrc = useMemo(() => {
    if (!currentSrc || !isInView) {
      console.log('OptimizedImage: No src or not in view', { currentSrc, isInView });
      return "";
    }
    
    return optimizeImageUrl(currentSrc, width, isMobile);
  }, [currentSrc, width, isInView, isMobile]);

  if (hasError) {
    return <ImageFallback className={className} width={width} height={height} alt={alt} />;
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
          fetchPriority={priority ? "high" : "low"}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          style={{ objectFit, aspectRatio: width && height ? `${width} / ${height}` : undefined }}
          onLoad={() => handleLoad(optimizedSrc, alt)}
          onError={handleError}
          decoding="async"
          sizes={isMobile ? "(max-width: 768px) 100vw" : width ? `${width}px` : "100vw"}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
