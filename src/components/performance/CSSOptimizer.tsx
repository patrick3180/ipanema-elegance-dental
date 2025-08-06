import { useEffect } from 'react';

interface CSSOptimizerProps {
  enableCriticalCSS?: boolean;
  enableAsyncCSS?: boolean;
  enableUnusedCSSRemoval?: boolean;
}

export const CSSOptimizer = ({ 
  enableCriticalCSS = true,
  enableAsyncCSS = true,
  enableUnusedCSSRemoval = true 
}: CSSOptimizerProps) => {
  
  // Extract and inline critical CSS
  useEffect(() => {
    if (!enableCriticalCSS) return;

    const inlineCriticalCSS = () => {
      const criticalSelectors = [
        '.bg-dental-beige',
        '.text-dental-purple',
        '.font-display',
        '.font-sans',
        '.heading-xl',
        '.heading-lg',
        '.container-custom',
        '.section-spacing',
        // Add hero section selectors
        '[class*="hero"]',
        '[class*="nav"]',
        '[class*="header"]',
        '.text-4xl',
        '.text-3xl',
        '.text-2xl'
      ];

      let criticalCSS = '';
      
      // Extract critical styles from existing stylesheets
      Array.from(document.styleSheets).forEach(sheet => {
        try {
          if (sheet.cssRules) {
            Array.from(sheet.cssRules).forEach(rule => {
              if (rule instanceof CSSStyleRule) {
                const selector = rule.selectorText;
                if (criticalSelectors.some(critical => 
                  selector.includes(critical) || 
                  selector.match(new RegExp(critical.replace(/\[|\]/g, '\\$&')))
                )) {
                  criticalCSS += rule.cssText + '\n';
                }
              }
            });
          }
        } catch (e) {
          // Skip cross-origin stylesheets
        }
      });

      if (criticalCSS) {
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        style.setAttribute('data-critical-css', 'true');
        document.head.insertBefore(style, document.head.firstChild);
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', inlineCriticalCSS);
    } else {
      inlineCriticalCSS();
    }
  }, [enableCriticalCSS]);

  // Load non-critical CSS asynchronously
  useEffect(() => {
    if (!enableAsyncCSS) return;

    const loadAsyncCSS = () => {
      // Find and convert blocking stylesheets to async
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      
      stylesheets.forEach((link: Element) => {
        const linkEl = link as HTMLLinkElement;
        
        // Skip critical stylesheets (fonts, critical CSS)
        if (linkEl.href.includes('fonts.googleapis.com') || 
            linkEl.hasAttribute('data-critical-css')) {
          return;
        }

        // Convert to async loading
        const asyncLink = document.createElement('link');
        asyncLink.rel = 'preload';
        asyncLink.as = 'style';
        asyncLink.href = linkEl.href;
        asyncLink.onload = () => {
          asyncLink.rel = 'stylesheet';
        };
        
        // Insert before original and remove original
        linkEl.parentNode?.insertBefore(asyncLink, linkEl);
        linkEl.remove();
      });
    };

    // Delay non-critical CSS loading
    setTimeout(loadAsyncCSS, 100);
  }, [enableAsyncCSS]);

  // Remove unused CSS (development helper)
  useEffect(() => {
    if (!enableUnusedCSSRemoval || import.meta.env.PROD) return;

    const analyzeUnusedCSS = () => {
      const usedSelectors = new Set<string>();
      
      // Collect used classes from DOM
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT,
        null
      );

      let node = walker.nextNode();
      while (node) {
        const element = node as Element;
        if (element.classList && element.classList.length > 0) {
          element.classList.forEach(className => {
            if (className) usedSelectors.add(`.${className}`);
          });
        }
        node = walker.nextNode();
      }

      if (import.meta.env.DEV && Math.random() < 0.1) {
        console.log(`🎨 CSS Analysis: ${usedSelectors.size} selectors in use`);
      }
    };

    setTimeout(analyzeUnusedCSS, 2000);
  }, [enableUnusedCSSRemoval]);

  return null;
};