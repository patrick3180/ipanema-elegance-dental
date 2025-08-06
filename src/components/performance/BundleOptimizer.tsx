import { useEffect, useState } from 'react';

interface BundleOptimizerProps {
  enableCodeSplitting?: boolean;
  enableTreeShaking?: boolean;
  chunkStrategy?: 'vendor' | 'page' | 'feature';
}

const BundleOptimizer = ({
  enableCodeSplitting = true,
  enableTreeShaking = true,
  chunkStrategy = 'vendor'
}: BundleOptimizerProps) => {
  const [loadedChunks, setLoadedChunks] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!enableCodeSplitting) return;

    // Implement dynamic import optimization
    const optimizeDynamicImports = () => {
      // Preload route chunks based on user interaction
      const links = document.querySelectorAll('a[href^="/"]');
      
      links.forEach((link) => {
        link.addEventListener('mouseenter', () => {
          const href = link.getAttribute('href');
          if (href && !loadedChunks.has(href)) {
            preloadRouteChunk(href);
            setLoadedChunks(prev => new Set(prev).add(href));
          }
        });
      });
    };

    const preloadRouteChunk = (route: string) => {
      // Enhanced route prediction with intelligent preloading
      const routeChunkMap: Record<string, string> = {
        '/about': 'AboutPage',
        '/services': 'ServicesPage', 
        '/blog': 'BlogPage',
        '/contact': 'ContactPage',
        '/clareamento-dental': 'ClareamentoDental',
        '/implantes-dentarios': 'ImplantesDentarios',
        '/lentes-e-facetas': 'LentesEFacetas',
        '/protese-dentaria': 'ProteseDentaria',
        '/restauracoes-esteticas': 'RestaureacoesEsteticas',
        '/saude-da-gengiva': 'SaudeDaGengiva',
        '/tratamento-de-canal': 'TratamentoDeCanal',
        '/clinica-geral-prevencao': 'ClinicaGeralPrevencao'
      };

      const chunkName = routeChunkMap[route];
      if (chunkName && !document.querySelector(`link[href*="${chunkName}"]`)) {
        // Preload JavaScript chunk
        const jsLink = document.createElement('link');
        jsLink.rel = 'prefetch';
        jsLink.as = 'script';
        jsLink.href = `/assets/${chunkName}.js`;
        document.head.appendChild(jsLink);

        // Preload associated CSS chunk
        const cssLink = document.createElement('link');
        cssLink.rel = 'prefetch';
        cssLink.as = 'style';
        cssLink.href = `/assets/${chunkName}.css`;
        document.head.appendChild(cssLink);
      }
    };

    optimizeDynamicImports();

    // Cleanup event listeners
    return () => {
      const links = document.querySelectorAll('a[href^="/"]');
      links.forEach((link) => {
        link.removeEventListener('mouseenter', preloadRouteChunk as any);
      });
    };
  }, [enableCodeSplitting, loadedChunks]);

  useEffect(() => {
    // Monitor bundle performance
    const monitorBundlePerformance = () => {
      if ('performance' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          
          entries.forEach((entry) => {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming;
              
              // Log bundle loading metrics
              console.log('Bundle Performance Metrics:', {
                domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
                loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
                transferSize: navEntry.transferSize,
                encodedBodySize: navEntry.encodedBodySize,
                decodedBodySize: navEntry.decodedBodySize
              });
            }
            
            if (entry.entryType === 'resource' && entry.name.includes('.js')) {
              const resourceEntry = entry as PerformanceResourceTiming;
              
              // Monitor JavaScript chunk loading
              if (resourceEntry.transferSize > 100000) { // > 100KB
                console.warn('Large JS chunk detected:', {
                  name: entry.name,
                  size: resourceEntry.transferSize,
                  duration: resourceEntry.duration
                });
              }
            }
          });
        });

        observer.observe({ entryTypes: ['navigation', 'resource'] });

        return observer;
      }
    };

    const observer = monitorBundlePerformance();

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Implement progressive loading for large dependencies
    const progressivelyLoadDependencies = () => {
      const heavyDependencies = [
        // Load these only when needed
        { name: 'chart.js', condition: () => document.querySelector('[data-chart]') },
        { name: 'contentful', condition: () => document.querySelector('[data-contentful]') },
        { name: 'react-query', condition: () => true } // Always load for data fetching
      ];

      heavyDependencies.forEach(({ name, condition }) => {
        if (condition()) {
          // Use dynamic import to load when needed
          import(/* webpackChunkName: "[request]" */ name)
            .then(() => {
              console.log(`Successfully loaded ${name} chunk`);
            })
            .catch((error) => {
              console.warn(`Failed to load ${name} chunk:`, error);
            });
        }
      });
    };

    // Delay loading of non-critical dependencies
    setTimeout(progressivelyLoadDependencies, 2000);
  }, []);

  useEffect(() => {
    // Optimize asset loading order
    const optimizeAssetLoading = () => {
      // Critical CSS should be inline, load additional CSS asynchronously
      const nonCriticalCSS = [
        '/assets/non-critical.css',
        '/assets/animations.css'
      ];

      nonCriticalCSS.forEach((href) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = 'print'; // Load without blocking
        link.onload = () => {
          link.media = 'all'; // Apply once loaded
        };
        document.head.appendChild(link);
      });

      // Preload next page assets based on current route
      const currentPath = window.location.pathname;
      const nextPageAssets = getPredictedNextPageAssets(currentPath);
      
      nextPageAssets.forEach((asset) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = asset;
        document.head.appendChild(link);
      });
    };

    const getPredictedNextPageAssets = (currentPath: string): string[] => {
      // Predict likely next pages based on current path
      const predictions: Record<string, string[]> = {
        '/': ['/assets/ServicesPage-[hash].js', '/assets/AboutPage-[hash].js'],
        '/services': ['/assets/ClareamentoDental-[hash].js', '/assets/ImplantesDentarios-[hash].js'],
        '/blog': ['/assets/BlogPost-[hash].js'],
        '/about': ['/assets/ContactPage-[hash].js', '/assets/ServicesPage-[hash].js']
      };

      return predictions[currentPath] || [];
    };

    optimizeAssetLoading();
  }, []);

  return null;
};

export default BundleOptimizer;