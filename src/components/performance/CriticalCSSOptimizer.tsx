import { useEffect } from 'react';

interface CriticalCSSOptimizerProps {
  inlineStyles: string;
  nonCriticalStylesheets?: string[];
}

const CriticalCSSOptimizer = ({ 
  inlineStyles, 
  nonCriticalStylesheets = [] 
}: CriticalCSSOptimizerProps) => {
  useEffect(() => {
    // 1. Inline critical CSS immediately
    const criticalStyleElement = document.createElement('style');
    criticalStyleElement.textContent = inlineStyles;
    criticalStyleElement.setAttribute('data-critical', 'true');
    document.head.appendChild(criticalStyleElement);

    // 2. Load non-critical CSS asynchronously after page load
    const loadNonCriticalCSS = () => {
      nonCriticalStylesheets.forEach((href) => {
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

    // Load non-critical CSS after main thread is free
    if (document.readyState === 'loading') {
      window.addEventListener('load', () => {
        requestIdleCallback(loadNonCriticalCSS, { timeout: 2000 });
      });
    } else {
      requestIdleCallback(loadNonCriticalCSS, { timeout: 1000 });
    }

    // 3. Remove unused CSS classes (basic purge)
    const purgeUnusedCSS = () => {
      const unusedSelectors = [
        '.unused-radix-classes',
        '.unused-tailwind-components',
        // Add more unused selectors as needed
      ];

      unusedSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => el.remove());
      });
    };

    requestIdleCallback(purgeUnusedCSS, { timeout: 3000 });

  }, [inlineStyles, nonCriticalStylesheets]);

  return null;
};

export default CriticalCSSOptimizer;