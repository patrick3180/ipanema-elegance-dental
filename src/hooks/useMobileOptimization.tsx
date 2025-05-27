
import { useState, useEffect } from 'react';

interface MobileOptimizationState {
  isMobile: boolean;
  isLowEnd: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
  shouldReduceAnimations: boolean;
}

export const useMobileOptimization = (): MobileOptimizationState => {
  const [state, setState] = useState<MobileOptimizationState>({
    isMobile: false,
    isLowEnd: false,
    connectionSpeed: 'unknown',
    shouldReduceAnimations: false,
  });

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.innerWidth < 768;
      const isLowEnd = 'deviceMemory' in navigator && (navigator as any).deviceMemory < 4;
      
      let connectionSpeed: 'slow' | 'fast' | 'unknown' = 'unknown';
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        const effectiveType = connection?.effectiveType;
        connectionSpeed = ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast';
      }

      const shouldReduceAnimations = 
        isLowEnd || 
        connectionSpeed === 'slow' || 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      setState({
        isMobile,
        isLowEnd,
        connectionSpeed,
        shouldReduceAnimations,
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return state;
};
