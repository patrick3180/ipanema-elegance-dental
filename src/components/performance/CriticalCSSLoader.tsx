import { useEffect } from 'react';

const CriticalCSSLoader = () => {
  useEffect(() => {
    // Load non-critical CSS asynchronously
    const loadNonCriticalCSS = () => {
      const nonCriticalStyles = [
        // Add any non-critical stylesheets here
      ];

      nonCriticalStyles.forEach((href) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = 'print';
        link.onload = () => {
          link.media = 'all';
        };
        document.head.appendChild(link);
      });
    };

    // Defer loading non-critical CSS
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadNonCriticalCSS);
    } else {
      setTimeout(loadNonCriticalCSS, 0);
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', loadNonCriticalCSS);
    };
  }, []);

  return null;
};

export default CriticalCSSLoader;