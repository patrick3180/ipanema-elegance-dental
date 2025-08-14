import { useEffect } from 'react';

interface CriticalImagePreloaderProps {
  images: Array<{
    src: string;
    type: 'avif' | 'webp' | 'jpeg';
    media?: string;
    priority?: boolean;
  }>;
}

const CriticalImagePreloader = ({ images }: CriticalImagePreloaderProps) => {
  useEffect(() => {
    if (!images || images.length === 0) return;

    const preloadedLinks: HTMLLinkElement[] = [];

    images.forEach((image) => {
      // Check if already preloaded
      const existingLink = document.querySelector(`link[href="${image.src}"]`);
      if (existingLink) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = image.src;
      link.as = 'image';
      
      // Set appropriate MIME type
      switch (image.type) {
        case 'avif':
          link.type = 'image/avif';
          break;
        case 'webp':
          link.type = 'image/webp';
          break;
        case 'jpeg':
          link.type = 'image/jpeg';
          break;
      }

      // Set media query if specified
      if (image.media) {
        link.media = image.media;
      }

      // Set fetch priority
      link.fetchPriority = image.priority ? 'high' : 'low';

      // Add error handling
      link.onerror = () => {
        console.warn(`Failed to preload image: ${image.src}`);
      };

      document.head.appendChild(link);
      preloadedLinks.push(link);
    });

    // Cleanup function
    return () => {
      preloadedLinks.forEach((link) => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [images]);

  return null;
};

export default CriticalImagePreloader;