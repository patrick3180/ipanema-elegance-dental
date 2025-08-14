import { useEffect } from 'react';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

interface MobileOptimizerProps {
  heroImage: string;
}

export const MobileOptimizer = ({ heroImage }: MobileOptimizerProps) => {
  const { isMobile, isLowEnd, connectionSpeed } = useMobileOptimization();

  useEffect(() => {
    // Critical mobile optimizations
    const optimizeForMobile = () => {
      if (isMobile) {
        // Preload mobile-optimized hero image
        const mobileHeroLink = document.createElement('link');
        mobileHeroLink.rel = 'preload';
        mobileHeroLink.as = 'image';
        mobileHeroLink.href = heroImage;
        mobileHeroLink.setAttribute('fetchpriority', 'high');
        mobileHeroLink.media = '(max-width: 768px)';
        document.head.appendChild(mobileHeroLink);

        // Reduce initial bundle for mobile
        if (isLowEnd || connectionSpeed === 'slow') {
          // Defer non-critical resources
          setTimeout(() => {
            const deferredScripts = document.querySelectorAll('script[data-defer]');
            deferredScripts.forEach(script => {
              const newScript = document.createElement('script');
              newScript.src = script.getAttribute('src') || '';
              newScript.async = true;
              document.head.appendChild(newScript);
            });
          }, 2000);
        }

        // Mobile-specific viewport optimizations
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no');
        }
      }
    };

    optimizeForMobile();
  }, [isMobile, isLowEnd, connectionSpeed, heroImage]);

  return null;
};