import { useEffect } from 'react';

// Extend Window interface for Hotjar
declare global {
  interface Window {
    hj: any;
    _hjSettings: any;
  }
}

const HotjarLoader = () => {
  useEffect(() => {
    // Only load in production
    if (import.meta.env.DEV) {
      console.log('🔥 Hotjar: Skipped loading in development');
      return;
    }

    const loadHotjar = () => {
      // Check if Hotjar is already loaded
      if (window.hj) {
        console.log('🔥 Hotjar: Already loaded');
        return;
      }

      try {
        // Hotjar tracking code optimized for async loading
        (function(h: any, o: any, t: string, j: string, a: HTMLElement, r: HTMLScriptElement) {
          h.hj = h.hj || function() {
            (h.hj.q = h.hj.q || []).push(arguments);
          };
          h._hjSettings = { hjid: 6492296, hjsv: 6 };
          a = o.getElementsByTagName('head')[0];
          r = o.createElement('script');
          r.async = true;
          r.defer = true;
          r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
          
          r.onload = () => {
            console.log('🔥 Hotjar: Successfully loaded');
          };
          
          r.onerror = () => {
            console.warn('🔥 Hotjar: Failed to load script');
          };
          
          a.appendChild(r);
        })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=', document.head, document.createElement('script'));

      } catch (error) {
        console.warn('🔥 Hotjar: Error during initialization', error);
      }
    };

    // Use requestIdleCallback for optimal performance
    const scheduleHotjarLoad = () => {
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => {
          setTimeout(loadHotjar, 2000); // Additional 2s delay for critical resources
        });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(loadHotjar, 3000);
      }
    };

    // Wait for page to be fully loaded
    if (document.readyState === 'loading') {
      window.addEventListener('load', scheduleHotjarLoad);
    } else {
      scheduleHotjarLoad();
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', scheduleHotjarLoad);
    };
  }, []);

  return null;
};

export default HotjarLoader;