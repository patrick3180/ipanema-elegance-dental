import { useEffect, useState } from 'react';
import { optimizeImageUrl } from '@/utils/imageOptimization';
import { useBlogOptimization } from '@/hooks/useBlogOptimization';

interface AVIFImageOptimizerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  blurDataUrl?: string;
}

export const AVIFImageOptimizer = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  blurDataUrl
}: AVIFImageOptimizerProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [supportsAVIF, setSupportsAVIF] = useState<boolean | null>(null);
  const { imageQuality, maxImageWidth } = useBlogOptimization();

  // Check AVIF support
  useEffect(() => {
    const checkAVIFSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setSupportsAVIF(false);
        return;
      }
      
      // Try to create AVIF data URL
      try {
        const dataUrl = canvas.toDataURL('image/avif');
        setSupportsAVIF(dataUrl.startsWith('data:image/avif'));
      } catch {
        setSupportsAVIF(false);
      }
    };

    checkAVIFSupport();
  }, []);

  // Generate optimized sources
  const generateSources = () => {
    const baseWidth = Math.min(width || maxImageWidth, maxImageWidth);
    
    const sources = [];
    
    // AVIF source (if supported)
    if (supportsAVIF) {
      const avifUrl = generateOptimizedUrl(src, {
        format: 'avif',
        quality: imageQuality - 10, // AVIF can use lower quality for same visual result
        width: baseWidth
      });
      sources.push({
        srcSet: `${avifUrl} 1x, ${generateOptimizedUrl(src, {
          format: 'avif',
          quality: imageQuality - 10,
          width: baseWidth * 2
        })} 2x`,
        type: 'image/avif'
      });
    }

    // WebP source (fallback)
    const webpUrl = generateOptimizedUrl(src, {
      format: 'webp',
      quality: imageQuality,
      width: baseWidth
    });
    sources.push({
      srcSet: `${webpUrl} 1x, ${generateOptimizedUrl(src, {
        format: 'webp', 
        quality: imageQuality,
        width: baseWidth * 2
      })} 2x`,
      type: 'image/webp'
    });

    // JPEG fallback
    const jpegUrl = generateOptimizedUrl(src, {
      format: 'jpg',
      quality: imageQuality + 5, // Slightly higher quality for JPEG
      width: baseWidth
    });
    sources.push({
      srcSet: `${jpegUrl} 1x, ${generateOptimizedUrl(src, {
        format: 'jpg',
        quality: imageQuality + 5,
        width: baseWidth * 2
      })} 2x`,
      type: 'image/jpeg'
    });

    return sources;
  };

  const generateOptimizedUrl = (url: string, options: {
    format: string;
    quality: number;
    width: number;
  }) => {
    if (url.includes('images.ctfassets.net') || url.includes('downloads.ctfassets.net')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}fm=${options.format}&q=${options.quality}&w=${options.width}`;
    }
    return optimizeImageUrl(url, options.width);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Don't render until we know AVIF support
  if (supportsAVIF === null) {
    return (
      <div 
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ width, height }}
      />
    );
  }

  const sources = generateSources();
  const fallbackSrc = sources[sources.length - 1].srcSet.split(' ')[0];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {blurDataUrl && !isLoaded && (
        <img
          src={blurDataUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          style={{ filter: 'blur(20px)' }}
        />
      )}
      
      {/* Main image */}
      <picture>
        {sources.map((source, index) => (
          <source
            key={index}
            srcSet={source.srcSet}
            type={source.type}
          />
        ))}
        <img
          src={fallbackSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          className={`
            w-full h-full object-cover transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${hasError ? 'hidden' : ''}
          `}
        />
      </picture>

      {/* Loading state */}
      {!isLoaded && !blurDataUrl && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Image failed to load</span>
        </div>
      )}
    </div>
  );
};