import { useEffect } from 'react';

interface CriticalCSSExtractorProps {
  enableInlineCSS?: boolean;
  enableAsyncCSS?: boolean;
  criticalViewportHeight?: number;
}

const CriticalCSSExtractor = ({
  enableInlineCSS = true,  // Enabled for Phase 1 optimization
  enableAsyncCSS = true,   // Enabled for Phase 1 optimization
  criticalViewportHeight = 1080
}: CriticalCSSExtractorProps) => {
  useEffect(() => {
    if (!enableInlineCSS) return;

    // Extract and inline critical CSS
    const extractCriticalCSS = () => {
      const criticalSelectors = [
        // Layout elements
        'html', 'body', 'main', 'header', 'nav', 'footer',
        // Typography
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a',
        // Critical UI components
        '.hero', '.navbar', '.btn', '.card', '.container',
        // Above-the-fold specific styles
        '[data-hero]', '[data-critical]', '[data-above-fold]'
      ];

      const criticalCSS = extractSelectorsCSS(criticalSelectors);
      
      if (criticalCSS) {
        inlineCriticalCSS(criticalCSS);
      }
    };

    const extractSelectorsCSS = (selectors: string[]): string => {
      let criticalCSS = '';
      
      // Get all stylesheets
      const stylesheets = Array.from(document.styleSheets);
      
      stylesheets.forEach((stylesheet) => {
        try {
          const rules = Array.from(stylesheet.cssRules || stylesheet.rules || []);
          
          rules.forEach((rule) => {
            if (rule instanceof CSSStyleRule) {
              // Check if rule selector matches any critical selector
              const isCritical = selectors.some(selector => 
                rule.selectorText?.includes(selector) ||
                isAboveFoldSelector(rule.selectorText)
              );
              
              if (isCritical) {
                criticalCSS += rule.cssText + '\n';
              }
            }
          });
        } catch (e) {
          // Handle cross-origin stylesheet access errors
          console.warn('Could not access stylesheet:', e);
        }
      });
      
      return criticalCSS;
    };

    const isAboveFoldSelector = (selector: string): boolean => {
      if (!selector) return false;
      
      // Check if selector targets elements likely to be above the fold
      const aboveFoldPatterns = [
        /\.hero/,
        /\.banner/,
        /\.header/,
        /\.nav/,
        /\.intro/,
        /\.landing/,
        /h1/,
        /h2/,
        /\.btn.*primary/,
        /\.logo/
      ];
      
      return aboveFoldPatterns.some(pattern => pattern.test(selector));
    };

    const inlineCriticalCSS = (css: string) => {
      // Remove existing critical CSS if any
      const existingCriticalCSS = document.getElementById('critical-css');
      if (existingCriticalCSS) {
        existingCriticalCSS.remove();
      }

      // Create and insert critical CSS
      const style = document.createElement('style');
      style.id = 'critical-css';
      style.textContent = css;
      document.head.insertBefore(style, document.head.firstChild);
    };

    // Extract critical CSS after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', extractCriticalCSS);
    } else {
      extractCriticalCSS();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', extractCriticalCSS);
    };
  }, [enableInlineCSS]);

  useEffect(() => {
    if (!enableAsyncCSS) return;

    // Load non-critical CSS asynchronously
    const loadNonCriticalCSS = () => {
      // Find all stylesheets and make them load asynchronously
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      
      stylesheets.forEach((link) => {
        if (link instanceof HTMLLinkElement && !link.dataset.critical) {
          // Convert to async loading
          link.media = 'print';
          link.onload = () => {
            link.media = 'all';
          };
        }
      });

      // Load additional non-critical stylesheets
      const nonCriticalStyles = [
        // Add paths to non-critical CSS files
        '/assets/animations.css',
        '/assets/utilities.css'
      ];

      nonCriticalStyles.forEach((href) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = 'print';
        link.onload = () => {
          link.media = 'all';
        };
        
        // Add with low priority
        link.fetchPriority = 'low';
        document.head.appendChild(link);
      });
    };

    // Load non-critical CSS after critical resources
    setTimeout(loadNonCriticalCSS, 100);
  }, [enableAsyncCSS]);

  useEffect(() => {
    // Optimize CSS delivery with resource hints
    const optimizeCSSDelivery = () => {
      // Preload critical CSS files
      const criticalCSSFiles = [
        '/assets/critical.css',
        '/assets/layout.css'
      ];

      criticalCSSFiles.forEach((href) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        link.onload = () => {
          // Convert to stylesheet after preload
          link.rel = 'stylesheet';
        };
        document.head.appendChild(link);
      });

      // Prefetch non-critical CSS for future pages
      const futureCSSFiles = [
        '/assets/blog.css',
        '/assets/contact.css',
        '/assets/services.css'
      ];

      futureCSSFiles.forEach((href) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
      });
    };

    optimizeCSSDelivery();
  }, []);

  useEffect(() => {
    // Remove unused CSS at runtime
    const removeUnusedCSS = () => {
      // Get all used selectors
      const usedSelectors = new Set<string>();
      
      // Walk through DOM and collect used classes and IDs
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT,
        null
      );

      let node: Element | null = walker.nextNode() as Element;
      while (node) {
        if (node.className) {
          node.className.split(' ').forEach(cls => {
            if (cls.trim()) usedSelectors.add(`.${cls.trim()}`);
          });
        }
        
        if (node.id) {
          usedSelectors.add(`#${node.id}`);
        }
        
        node = walker.nextNode() as Element;
      }

      // Remove unused CSS rules (in development only)
      if (process.env.NODE_ENV === 'development') {
        console.log('Used selectors:', usedSelectors.size);
        console.log('This information can be used to optimize CSS in production');
      }
    };

    // Run unused CSS detection after page load
    setTimeout(removeUnusedCSS, 5000);
  }, []);

  return null;
};

export default CriticalCSSExtractor;