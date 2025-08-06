import { useEffect } from 'react';

interface CriticalResource {
  type: 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch';
  href: string;
  as?: 'image' | 'font' | 'script' | 'style' | 'document';
  crossorigin?: 'anonymous' | 'use-credentials';
  media?: string;
  priority?: 'high' | 'low' | 'auto';
}

interface CriticalResourceLoaderProps {
  resources: CriticalResource[];
  enableServiceWorker?: boolean;
}

const CriticalResourceLoader = ({ 
  resources, 
  enableServiceWorker = true 
}: CriticalResourceLoaderProps) => {
  useEffect(() => {
    // Register service worker for advanced caching
    if (enableServiceWorker && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }

    // Process critical resources with immediate loading for above-fold content
    const criticalLinks: HTMLLinkElement[] = [];
    resources.forEach((resource) => {
      const existingLink = document.querySelector(
        `link[href="${resource.href}"][rel="${resource.type}"]`
      );
      
      if (existingLink) return;

      const link = document.createElement('link');
      link.rel = resource.type;
      link.href = resource.href;

      if (resource.as) link.as = resource.as;
      if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
      if (resource.media) link.media = resource.media;
      if (resource.priority) link.fetchPriority = resource.priority;

      // Prioritize critical resources
      if (resource.priority === 'high') {
        (link as any).importance = 'high';
      }

      document.head.appendChild(link);
      criticalLinks.push(link);
    });

    // Preconnect to critical domains
    const criticalDomains = [
      'https://images.ctfassets.net',
      'https://cdn.contentful.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    criticalDomains.forEach(domain => {
      const preconnectLink = document.createElement('link');
      preconnectLink.rel = 'preconnect';
      preconnectLink.href = domain;
      preconnectLink.crossOrigin = 'anonymous';
      document.head.appendChild(preconnectLink);
    });

    return () => {
      criticalLinks.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [resources, enableServiceWorker]);

  useEffect(() => {
    // Optimize font loading
    const fontOptimizations = [
      { property: 'font-display', value: 'swap' },
      { property: 'font-loading', value: 'swap' }
    ];

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @font-face {
        font-display: swap;
      }
    `;
    document.head.appendChild(styleSheet);

    // Preload critical fonts
    const criticalFonts = [
      '/fonts/inter-regular.woff2',
      '/fonts/inter-medium.woff2',
      '/fonts/inter-semibold.woff2'
    ];

    criticalFonts.forEach((fontUrl) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = fontUrl;
      document.head.appendChild(link);
    });

    return () => {
      if (styleSheet.parentNode) {
        styleSheet.parentNode.removeChild(styleSheet);
      }
    };
  }, []);

  useEffect(() => {
    // Implement advanced image preloading strategies
    const preloadCriticalImages = () => {
      const heroImages = document.querySelectorAll('[data-hero-image]');
      const aboveFoldImages = document.querySelectorAll('[data-priority="high"]');
      
      [...heroImages, ...aboveFoldImages].forEach((img) => {
        if (img instanceof HTMLImageElement) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = img.src || img.dataset.src || '';
          link.fetchPriority = 'high';
          document.head.appendChild(link);
        }
      });
    };

    // Run after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', preloadCriticalImages);
    } else {
      preloadCriticalImages();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', preloadCriticalImages);
    };
  }, []);

  return null;
};

export default CriticalResourceLoader;