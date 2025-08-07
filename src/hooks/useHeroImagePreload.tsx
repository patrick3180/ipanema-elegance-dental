import { useEffect } from 'react';

interface UseHeroImagePreloadProps {
  imageSrc: string;
  isInViewport?: boolean;
}

export const useHeroImagePreload = ({ 
  imageSrc, 
  isInViewport = true 
}: UseHeroImagePreloadProps) => {
  useEffect(() => {
    // Only preload if image is likely to be in viewport
    if (!isInViewport || !imageSrc) return;

    // Create preload links for both WebP and fallback
    const preloadWebP = document.createElement('link');
    preloadWebP.rel = 'preload';
    preloadWebP.as = 'image';
    preloadWebP.href = imageSrc;
    preloadWebP.type = 'image/webp';

    // Add to head
    document.head.appendChild(preloadWebP);

    console.log('Hero image preloaded:', imageSrc);

    // Cleanup function
    return () => {
      if (document.head.contains(preloadWebP)) {
        document.head.removeChild(preloadWebP);
      }
    };
  }, [imageSrc, isInViewport]);
};