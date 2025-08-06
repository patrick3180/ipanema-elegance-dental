import { useEffect } from 'react';
import { preloadCriticalImages } from '@/utils/imageOptimization';

interface CriticalImage {
  src: string;
  width?: number;
}

interface UseCriticalImagePreloadOptions {
  images: CriticalImage[];
  enabled?: boolean;
}

export const useCriticalImagePreload = ({ 
  images, 
  enabled = true 
}: UseCriticalImagePreloadOptions) => {
  useEffect(() => {
    if (!enabled || images.length === 0) return;

    // Only preload on initial page load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        preloadCriticalImages(images);
      });
    } else {
      preloadCriticalImages(images);
    }
  }, [images, enabled]);
};