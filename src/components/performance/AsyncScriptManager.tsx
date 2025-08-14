import { useEffect } from 'react';

interface AsyncScriptManagerProps {
  gtmId?: string;
  enableTracking?: boolean;
  loadDelay?: number;
}

const AsyncScriptManager = ({ 
  gtmId, 
  enableTracking = false,
  loadDelay = 2000 
}: AsyncScriptManagerProps) => {
  useEffect(() => {
    if (!enableTracking || !gtmId) return;

    let timeoutId: NodeJS.Timeout;
    let hasInteracted = false;

    // Load scripts after interaction or delay
    const loadTrackingScripts = () => {
      if (hasInteracted) return;
      hasInteracted = true;

      // Load Google Tag Manager
      const gtmScript = document.createElement('script');
      gtmScript.async = true;
      gtmScript.defer = true;
      gtmScript.src = `https://www.googletagmanager.com/gtag/js?id=${gtmId}`;
      
      gtmScript.onload = () => {
        // Initialize gtag after script loads
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(args);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', gtmId, {
          send_page_view: false
        });
        
        console.log('GTM loaded asynchronously');
      };

      document.head.appendChild(gtmScript);
    };

    // Listen for user interaction
    const interactionEvents = ['click', 'scroll', 'touchstart', 'keydown'];
    const handleInteraction = () => {
      loadTrackingScripts();
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
      clearTimeout(timeoutId);
    };

    // Add interaction listeners
    interactionEvents.forEach(event => {
      document.addEventListener(event, handleInteraction, { passive: true });
    });

    // Fallback: load after delay if no interaction
    timeoutId = setTimeout(loadTrackingScripts, loadDelay);

    // Cleanup
    return () => {
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
      clearTimeout(timeoutId);
    };
  }, [gtmId, enableTracking, loadDelay]);

  return null;
};

export default AsyncScriptManager;