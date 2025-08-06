import React, { useState, useRef, useEffect } from 'react';
import { optimizeImageUrl } from '@/utils/imageOptimization';

interface LQIPImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const LQIPImageComponent = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  objectFit = 'cover'
}: LQIPImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [lqipLoaded, setLqipLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate LQIP (Low Quality Image Placeholder)
  const lqipSrc = optimizeImageUrl(src, 20); // Very small version for placeholder
  const optimizedSrc = optimizeImageUrl(src, width);

  // Generate responsive srcSet
  const generateSrcSet = () => {
    if (!src.includes('ctfassets.net')) return undefined;
    
    const breakpoints = [400, 800, 1200, 1600];
    return breakpoints
      .map(bp => `${optimizeImageUrl(src, bp)} ${bp}w`)
      .join(', ');
  };

  const sizes = `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`;

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || priority) {
            // Load LQIP first
            const lqipImg = new Image();
            lqipImg.onload = () => setLqipLoaded(true);
            lqipImg.src = lqipSrc;

            // Then load full image
            const fullImg = new Image();
            fullImg.onload = () => setImageLoaded(true);
            fullImg.onerror = () => setError(true);
            fullImg.src = optimizedSrc;
            
            if (generateSrcSet()) {
              fullImg.srcset = generateSrcSet()!;
              fullImg.sizes = sizes;
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '50px' }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [lqipSrc, optimizedSrc, priority]);

  if (error) {
    return (
      <div 
        className={`bg-muted flex items-center justify-center text-muted-foreground ${className}`}
        style={{ width, height }}
      >
        <span className="text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* LQIP - Low quality placeholder */}
      {lqipLoaded && !imageLoaded && (
        <img
          src={lqipSrc}
          alt=""
          className="absolute inset-0 w-full h-full blur-sm scale-110 transition-opacity duration-300"
          style={{ objectFit }}
          aria-hidden="true"
        />
      )}

      {/* Loading skeleton */}
      {!lqipLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse"
          style={{ width, height }}
        />
      )}

      {/* Full quality image */}
      {imageLoaded && (
        <img
          src={optimizedSrc}
          srcSet={generateSrcSet()}
          sizes={sizes}
          alt={alt}
          className={`w-full h-full transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectFit }}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
    </div>
  );
};

export default LQIPImageComponent;