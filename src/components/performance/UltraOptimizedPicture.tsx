import React from 'react';

interface UltraOptimizedPictureProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  mobileSrc?: string;
  desktopSrc?: string;
}

const UltraOptimizedPicture = ({
  src,
  alt,
  className = '',
  priority = false,
  width,
  height,
  mobileSrc,
  desktopSrc
}: UltraOptimizedPictureProps) => {
  return (
    <picture className={className}>
      {/* Desktop AVIF - optimized for large screens */}
      {desktopSrc && (
        <source
          srcSet={desktopSrc}
          type="image/avif"
          media="(min-width: 768px)"
          sizes="(min-width: 1024px) 40vw, 50vw"
        />
      )}
      
      {/* Mobile AVIF - optimized for mobile screens */}
      {mobileSrc && (
        <source
          srcSet={mobileSrc}
          type="image/avif"
          media="(max-width: 767px)"
          sizes="100vw"
        />
      )}
      
      {/* Fallback WebP for all screens */}
      <source
        srcSet={src}
        type="image/webp"
        sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
      />
      
      {/* Final fallback */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'low'}
        decoding={priority ? 'sync' : 'async'}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
      />
    </picture>
  );
};

export default UltraOptimizedPicture;