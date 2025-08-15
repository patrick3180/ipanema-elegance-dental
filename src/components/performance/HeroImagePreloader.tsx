import { useEffect } from 'react';

interface HeroImagePreloaderProps {
  images: Array<{
    src: string;
    type: 'avif' | 'webp' | 'jpeg';
    media?: string;
    priority?: boolean;
  }>;
}

const HeroImagePreloader = ({ images }: HeroImagePreloaderProps) => {
  useEffect(() => {
    if (!images || images.length === 0) return;

    const preloadedLinks: HTMLLinkElement[] = [];

    images.forEach((image) => {
      // Skip if already preloaded
      const existingLink = document.querySelector(`link[href="${image.src}"]`);
      if (existingLink) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = image.src;
      link.as = 'image';
      
      // Set MIME type for better optimization
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

      // Critical images get high priority
      if (image.priority) {
        link.fetchPriority = 'high';
      }

      // Add media query if specified
      if (image.media) {
        link.media = image.media;
      }

      // Error handling
      link.onerror = () => {
        console.warn(`Failed to preload critical image: ${image.src}`);
      };

      document.head.appendChild(link);
      preloadedLinks.push(link);
    });

    // Cleanup
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

export default HeroImagePreloader;