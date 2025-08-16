import React from 'react';

interface OptimizedPictureElementProps {
  src: string;
  alt: string;
  avifSources: {
    src: string;
    media?: string;
    sizes?: string;
  }[];
  webpSources: {
    src: string;
    media?: string;
    sizes?: string;
  }[];
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

const OptimizedPictureElement = ({
  src,
  alt,
  avifSources,
  webpSources,
  className = '',
  priority = false,
  width,
  height
}: OptimizedPictureElementProps) => {
  return (
    <picture className={className}>
      {/* AVIF sources (best compression) */}
      {avifSources.map((source, index) => (
        <source
          key={`avif-${index}`}
          srcSet={source.src}
          type="image/avif"
          media={source.media}
          sizes={source.sizes}
        />
      ))}
      
      {/* WebP sources (good compression) */}
      {webpSources.map((source, index) => (
        <source
          key={`webp-${index}`}
          srcSet={source.src}
          type="image/webp"
          media={source.media}
          sizes={source.sizes}
        />
      ))}
      
      {/* Fallback JPEG/PNG */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'low'}
        decoding={priority ? 'sync' : 'async'}
        width={width}
        height={height}
        className="w-4/5 h-4/5 object-contain mx-auto"
      />
    </picture>
  );
};

export default OptimizedPictureElement;