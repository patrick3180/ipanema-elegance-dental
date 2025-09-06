import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface MobileGTMOptimizerProps {
  gtmId?: string;
  isMobile?: boolean;
  delay?: number;
}

export const MobileGTMOptimizer: React.FC<MobileGTMOptimizerProps> = ({ 
  gtmId = "GTM-WZRDNBKQ", 
  isMobile = false,
  delay = 2000 
}) => {
  useEffect(() => {
    if (!isMobile) return;

    // For mobile, defer GTM loading to improve initial performance
    const loadGTMMobile = () => {
      // Initialize dataLayer first (lightweight)
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        
        // Defer the actual GTM script loading
        setTimeout(() => {
          const gtmScript = `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.defer=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `;
          
          const script = document.createElement('script');
          script.innerHTML = gtmScript;
          document.head.appendChild(script);
        }, delay);
      }
    };

    // Load after user interaction or after delay
    const userInteractionEvents = ['touchstart', 'click', 'scroll'];
    let loaded = false;

    const loadOnInteraction = () => {
      if (loaded) return;
      loaded = true;
      loadGTMMobile();
      
      // Remove event listeners after loading
      userInteractionEvents.forEach(event => {
        document.removeEventListener(event, loadOnInteraction);
      });
    };

    // Add interaction listeners
    userInteractionEvents.forEach(event => {
      document.addEventListener(event, loadOnInteraction, { passive: true, once: true });
    });

    // Fallback: load after delay even without interaction
    const fallbackTimer = setTimeout(loadOnInteraction, delay);

    return () => {
      clearTimeout(fallbackTimer);
      userInteractionEvents.forEach(event => {
        document.removeEventListener(event, loadOnInteraction);
      });
    };
  }, [gtmId, isMobile, delay]);

  // For desktop, use regular GTM loading
  if (!isMobile) {
    const gtmScript = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `;

    const noscriptContent = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;

    return (
      <>
        <Helmet>
          <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
        </Helmet>
        <noscript dangerouslySetInnerHTML={{ __html: noscriptContent }} />
      </>
    );
  }

  // For mobile, we load GTM asynchronously via useEffect
  const noscriptContent = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  
  return <noscript dangerouslySetInnerHTML={{ __html: noscriptContent }} />;
};