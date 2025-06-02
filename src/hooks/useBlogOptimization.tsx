
import { useState, useEffect } from 'react';
import { useMobileOptimization } from './useMobileOptimization';

interface BlogOptimizationState {
  shouldLoadImages: boolean;
  imageQuality: number;
  maxImageWidth: number;
  shouldPreloadImages: boolean;
}

export const useBlogOptimization = (): BlogOptimizationState => {
  const { isMobile, isLowEnd, connectionSpeed } = useMobileOptimization();
  const [state, setState] = useState<BlogOptimizationState>({
    shouldLoadImages: true,
    imageQuality: 85,
    maxImageWidth: 1200,
    shouldPreloadImages: true,
  });

  useEffect(() => {
    const optimizeForDevice = () => {
      let imageQuality = 85;
      let maxImageWidth = 1200;
      let shouldPreloadImages = true;

      // Adjust quality based on connection and device
      if (connectionSpeed === 'slow' || isLowEnd) {
        imageQuality = 65;
        maxImageWidth = 800;
        shouldPreloadImages = false;
      } else if (isMobile) {
        imageQuality = 75;
        maxImageWidth = 900;
      }

      setState({
        shouldLoadImages: true,
        imageQuality,
        maxImageWidth,
        shouldPreloadImages,
      });

      console.log('Blog optimization settings:', {
        isMobile,
        isLowEnd,
        connectionSpeed,
        imageQuality,
        maxImageWidth,
        shouldPreloadImages,
      });
    };

    optimizeForDevice();
  }, [isMobile, isLowEnd, connectionSpeed]);

  return state;
};
