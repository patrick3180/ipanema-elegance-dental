import { useEffect, useCallback } from 'react';

interface UseScrollTrackingProps {
  pagePath: string;
  enabled?: boolean;
}

export const useScrollTracking = ({ pagePath, enabled = true }: UseScrollTrackingProps) => {
  const trackScrollDepth = useCallback(() => {
    if (!enabled) return;
    
    const scrollPercentage = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    const milestones = [25, 50, 75, 100];
    const milestone = milestones.find(m => 
      scrollPercentage >= m && !sessionStorage.getItem(`scroll_${m}_${pagePath}`)
    );
    
    if (milestone) {
      sessionStorage.setItem(`scroll_${milestone}_${pagePath}`, 'true');
      
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'scroll_depth',
          scroll_percentage: milestone,
          page_path: pagePath
        });
      }
    }
  }, [pagePath, enabled]);

  useEffect(() => {
    if (!enabled) return;

    // Debounce scroll tracking
    let timeoutId: NodeJS.Timeout;
    const debouncedTrackScrollDepth = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(trackScrollDepth, 100);
    };

    window.addEventListener('scroll', debouncedTrackScrollDepth, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedTrackScrollDepth);
      clearTimeout(timeoutId);
    };
  }, [trackScrollDepth, enabled]);
};

export default useScrollTracking;