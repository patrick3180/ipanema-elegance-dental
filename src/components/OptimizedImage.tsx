
import React from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  objectFit = "cover",
}: OptimizedImageProps) => {
  // Check if this is a Contentful image URL and optimize it
  const optimizedSrc = React.useMemo(() => {
    if (!src) return "";
    
    // Contentful image optimization
    if (src.includes("images.ctfassets.net") || src.includes("downloads.ctfassets.net")) {
      const baseUrl = src.startsWith("//") ? `https:${src}` : src;
      
      // Add quality and format parameters to Contentful images
      const separator = baseUrl.includes("?") ? "&" : "?";
      
      let optimizedUrl = `${baseUrl}${separator}fm=webp&q=80`;
      
      // Add width parameter if provided
      if (width) {
        optimizedUrl += `&w=${width}`;
      }
      
      return optimizedUrl;
    }
    
    return src;
  }, [src, width]);

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      className={cn(className)}
      style={{ objectFit }}
    />
  );
};

export default OptimizedImage;
