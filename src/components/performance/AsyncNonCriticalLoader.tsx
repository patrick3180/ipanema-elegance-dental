import { useEffect } from 'react';

const AsyncNonCriticalLoader = () => {
  useEffect(() => {
    // Defer non-critical CSS loading
    const loadNonCriticalCSS = () => {
      const cssFiles = document.querySelectorAll('link[rel="stylesheet"]');
      cssFiles.forEach((link) => {
        if (link instanceof HTMLLinkElement && !link.dataset.critical) {
          link.media = 'print';
          link.onload = () => {
            link.media = 'all';
          };
        }
      });
    };

    // Defer non-critical scripts
    const deferNonCriticalScripts = () => {
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach((script) => {
        if (script instanceof HTMLScriptElement && 
            !script.src.includes('critical') && 
            !script.src.includes('gtm') &&
            !script.defer && 
            !script.async) {
          script.defer = true;
        }
      });
    };

    // Run optimizations after a short delay
    setTimeout(() => {
      loadNonCriticalCSS();
      deferNonCriticalScripts();
    }, 100);
  }, []);

  return null;
};

export default AsyncNonCriticalLoader;