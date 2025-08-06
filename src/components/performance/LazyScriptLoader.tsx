import { useEffect } from 'react';

interface LazyScriptLoaderProps {
  children?: React.ReactNode;
}

const LazyScriptLoader = ({ children }: LazyScriptLoaderProps) => {
  useEffect(() => {
    // Defer Google Tag Manager loading
    const loadGTM = () => {
      if (typeof window !== 'undefined' && !window.gtag) {
        // Only load GTM after critical resources are loaded
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_GTM_ID';
        script.defer = true;
        document.head.appendChild(script);

        // Initialize gtag after script loads
        script.onload = () => {
          window.dataLayer = window.dataLayer || [];
          function gtag(...args: any[]) {
            window.dataLayer.push(args);
          }
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', 'YOUR_GTM_ID', {
            send_page_view: false // Prevent automatic page view tracking
          });
        };
      }
    };

    // Load GTM after page is interactive
    if (document.readyState === 'loading') {
      window.addEventListener('load', () => {
        setTimeout(loadGTM, 2000); // Delay GTM by 2 seconds
      });
    } else {
      setTimeout(loadGTM, 2000);
    }
  }, []);

  return <>{children}</>;
};

export default LazyScriptLoader;