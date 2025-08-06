import { useEffect } from 'react';

interface JavaScriptOptimizerProps {
  enableCodeSplitting?: boolean;
  enableDeferLoading?: boolean;
  enablePreloading?: boolean;
}

export const JavaScriptOptimizer = ({
  enableCodeSplitting = true,
  enableDeferLoading = true,
  enablePreloading = true
}: JavaScriptOptimizerProps) => {

  // Optimize script loading
  useEffect(() => {
    if (!enableDeferLoading) return;

    const optimizeScripts = () => {
      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[src]');
      
      scripts.forEach((script: Element) => {
        const scriptEl = script as HTMLScriptElement;
        const src = scriptEl.src;
        
        // Skip critical scripts
        if (src.includes('gtm') || 
            src.includes('gptengineer') ||
            src.includes('lovable') ||
            scriptEl.hasAttribute('data-critical')) {
          return;
        }

        // Add defer attribute to non-critical scripts
        if (!scriptEl.defer && !scriptEl.async) {
          scriptEl.defer = true;
        }
      });
    };

    optimizeScripts();
  }, [enableDeferLoading]);

  // Preload critical JavaScript modules
  useEffect(() => {
    if (!enablePreloading) return;

    const preloadCriticalModules = () => {
      const criticalModules = [
        // Add paths to critical modules that should be preloaded
        '/src/components/Hero.tsx',
        '/src/components/Header.tsx',
        '/src/components/Footer.tsx'
      ];

      criticalModules.forEach(modulePath => {
        const link = document.createElement('link');
        link.rel = 'modulepreload';
        link.href = modulePath;
        document.head.appendChild(link);
      });
    };

    preloadCriticalModules();
  }, [enablePreloading]);

  // Implement dynamic imports for route-based code splitting
  useEffect(() => {
    if (!enableCodeSplitting) return;

    const setupRoutePrefetching = () => {
      const routeMap: Record<string, string[]> = {
        '/': ['/servicos', '/sobre'],
        '/servicos': ['/contato', '/'],
        '/sobre': ['/contato', '/servicos'],
        '/contato': ['/servicos', '/']
      };

      // Preload likely next routes on link hover
      const handleLinkHover = (event: Event) => {
        const target = event.target as HTMLAnchorElement;
        if (target.tagName === 'A' && target.href) {
          const pathname = new URL(target.href).pathname;
          const chunks = routeMap[pathname];
          
          if (chunks) {
            chunks.forEach(chunk => {
              const link = document.createElement('link');
              link.rel = 'prefetch';
              link.href = chunk;
              document.head.appendChild(link);
            });
          }
        }
      };

      // Add hover listeners to navigation links
      document.addEventListener('mouseover', handleLinkHover);

      return () => {
        document.removeEventListener('mouseover', handleLinkHover);
      };
    };

    const cleanup = setupRoutePrefetching();
    
    return cleanup;
  }, [enableCodeSplitting]);

  // Monitor JavaScript performance
  useEffect(() => {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      
      entries.forEach((entry) => {
        if (entry.entryType === 'measure' && entry.duration > 50) {
          if (import.meta.env.DEV && Math.random() < 0.1) {
            console.warn(`🐌 Slow JS operation: ${entry.name} (${Math.round(entry.duration)}ms)`);
          }
        }
        
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          const scriptTime = navEntry.loadEventEnd - navEntry.domContentLoadedEventEnd;
          
          if (scriptTime > 1000) {
            if (import.meta.env.DEV && Math.random() < 0.1) {
              console.warn(`🐌 Slow script execution: ${Math.round(scriptTime)}ms`);
            }
          }
        }
      });
    });

    observer.observe({ entryTypes: ['measure', 'navigation'] });

    return () => observer.disconnect();
  }, []);

  return null;
};