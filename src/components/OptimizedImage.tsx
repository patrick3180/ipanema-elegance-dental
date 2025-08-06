
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useImageIntersection } from "@/hooks/useImageIntersection";
import { useImageLoading } from "@/hooks/useImageLoading";
import { optimizeImageUrl, generateSrcSet, generateSizes } from "@/utils/imageOptimization";
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
  responsive?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  width = 800, // Default width to prevent layout shifts
  height = 600, // Default height to prevent layout shifts
  className,
  priority = false,
  objectFit = "cover",
  lazy = true,
  mobileSrc,
  responsive = true,
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

  // Generate responsive srcset for Contentful images
  const srcSet = useMemo(() => {
    if (!responsive || !currentSrc.includes('ctfassets.net')) {
      return undefined;
    }
    return generateSrcSet(currentSrc);
  }, [currentSrc, responsive]);

  const sizes = useMemo(() => {
    if (!responsive || !currentSrc.includes('ctfassets.net')) {
      return undefined;
    }
    return generateSizes(isMobile);
  }, [responsive, isMobile, currentSrc]);

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
          srcSet={srcSet}
          sizes={sizes || (isMobile ? "(max-width: 768px) 100vw" : width ? `${width}px` : "100vw")}
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
          style={{ 
            objectFit, 
            aspectRatio: width && height ? `${width} / ${height}` : undefined 
          }}
          onLoad={() => handleLoad(optimizedSrc, alt)}
          onError={handleError}
          decoding="async"
        />
      )}
    </div>
  );
};

export default OptimizedImage;
