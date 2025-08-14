import { useEffect } from 'react';

interface NonCriticalCSSLoaderProps {
  delay?: number;
  enabled?: boolean;
}

const NonCriticalCSSLoader = ({ delay = 1000, enabled = true }: NonCriticalCSSLoaderProps) => {
  useEffect(() => {
    if (!enabled) return;

    const loadNonCriticalCSS = () => {
      // Load the main CSS file asynchronously after critical content is rendered
      const mainCSS = document.createElement('link');
      mainCSS.rel = 'stylesheet';
      mainCSS.href = '/src/index.css';
      mainCSS.media = 'print';
      mainCSS.onload = () => {
        mainCSS.media = 'all';
      };
      
      // Add to head if not already present
      if (!document.querySelector('link[href="/src/index.css"]')) {
        document.head.appendChild(mainCSS);
      }

      // Load additional non-critical stylesheets
      const additionalCSS = [
        // Add any other non-critical CSS files here
      ];

      additionalCSS.forEach((href) => {
        if (!document.querySelector(`link[href="${href}"]`)) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = href;
          link.media = 'print';
          link.onload = () => {
            link.media = 'all';
          };
          document.head.appendChild(link);
        }
      });
    };

    // Delay loading of non-critical CSS
    const timer = setTimeout(loadNonCriticalCSS, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, enabled]);

  return null;
};

export default NonCriticalCSSLoader;