import { useEffect } from 'react';

interface ImagePreloaderProps {
  images: string[];
  priority?: boolean;
}

const ImagePreloader = ({ images, priority = false }: ImagePreloaderProps) => {
  useEffect(() => {
    if (!images || images.length === 0) return;

    const preloadImages = async () => {
      // Preload critical images immediately
      const criticalImages = priority ? images : images.slice(0, 2);
      
      criticalImages.forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.fetchPriority = priority ? 'high' : 'low';
        document.head.appendChild(link);
      });

      // Lazy preload remaining images
      if (!priority && images.length > 2) {
        setTimeout(() => {
          images.slice(2).forEach((src) => {
            const img = new Image();
            img.src = src;
          });
        }, 1000);
      }
    };

    preloadImages();
  }, [images, priority]);

  return null;
};

export default ImagePreloader;