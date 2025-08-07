import { useEffect } from 'react';

interface ResourceHint {
  href: string;
  rel: 'dns-prefetch' | 'preconnect' | 'preload' | 'prefetch' | 'modulepreload';
  as?: 'script' | 'style' | 'image' | 'font' | 'document';
  type?: string;
  crossorigin?: 'anonymous' | 'use-credentials';
  media?: string;
  priority?: 'high' | 'low';
}

interface AggressiveResourceHintsProps {
  critical?: ResourceHint[];
  prefetch?: ResourceHint[];
}

export const AggressiveResourceHints = ({
  critical = [],
  prefetch = []
}: AggressiveResourceHintsProps) => {
  useEffect(() => {
    const addedLinks: HTMLLinkElement[] = [];

    // Add critical resource hints immediately
    critical.forEach(resource => {
      const existingLink = document.querySelector(
        `link[href="${resource.href}"][rel="${resource.rel}"]`
      );
      
      if (existingLink) return;

      const link = document.createElement('link');
      link.rel = resource.rel;
      link.href = resource.href;
      
      if (resource.as) link.as = resource.as;
      if (resource.type) link.type = resource.type;
      if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
      if (resource.media) link.media = resource.media;
      if (resource.priority) link.fetchPriority = resource.priority;

      document.head.appendChild(link);
      addedLinks.push(link);
    });

    // Add prefetch resources after a delay to avoid blocking critical resources
    const prefetchTimeout = setTimeout(() => {
      prefetch.forEach(resource => {
        const existingLink = document.querySelector(
          `link[href="${resource.href}"][rel="${resource.rel}"]`
        );
        
        if (existingLink) return;

        const link = document.createElement('link');
        link.rel = resource.rel;
        link.href = resource.href;
        
        if (resource.as) link.as = resource.as;
        if (resource.type) link.type = resource.type;
        if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
        if (resource.media) link.media = resource.media;

        document.head.appendChild(link);
        addedLinks.push(link);
      });
    }, 2000);

    return () => {
      clearTimeout(prefetchTimeout);
      addedLinks.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [critical, prefetch]);

  return null;
};

// Predefined critical resources for better performance
export const CRITICAL_RESOURCES: ResourceHint[] = [
  // DNS prefetch for external domains
  { href: '//fonts.googleapis.com', rel: 'dns-prefetch' },
  { href: '//fonts.gstatic.com', rel: 'dns-prefetch' },
  { href: '//images.ctfassets.net', rel: 'dns-prefetch' },
  { href: '//cdn.contentful.com', rel: 'dns-prefetch' },
  { href: '//www.googletagmanager.com', rel: 'dns-prefetch' },
  
  // Preconnect to critical origins
  { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
  { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossorigin: 'anonymous' },
  { href: 'https://images.ctfassets.net', rel: 'preconnect', crossorigin: 'anonymous' },
  { href: 'https://cdn.contentful.com', rel: 'preconnect', crossorigin: 'anonymous' },
  
  // Preload critical fonts
  {
    href: 'https://fonts.gstatic.com/s/playfairdisplay/v36/nuFiD-vYSZviVYUb_rj3ij__anPXBYf9lWYe3bp_b-4.woff2',
    rel: 'preload',
    as: 'font',
    type: 'font/woff2',
    crossorigin: 'anonymous',
    priority: 'high'
  },
  {
    href: 'https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.woff2',
    rel: 'preload',
    as: 'font', 
    type: 'font/woff2',
    crossorigin: 'anonymous',
    priority: 'high'
  }
];

export const PREFETCH_RESOURCES: ResourceHint[] = [
  // Prefetch likely next pages
  { href: '/sobre', rel: 'prefetch', as: 'document' },
  { href: '/servicos', rel: 'prefetch', as: 'document' },
  { href: '/contato', rel: 'prefetch', as: 'document' },
  { href: '/blog', rel: 'prefetch', as: 'document' },
  
  // Prefetch secondary fonts
  {
    href: 'https://fonts.gstatic.com/s/playfairdisplay/v36/nuFiD-vYSZviVYUb_rj3ij__anPXBYf9pWge3bp_b-4.woff2',
    rel: 'prefetch',
    as: 'font',
    type: 'font/woff2',
    crossorigin: 'anonymous'
  },
  {
    href: 'https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM70w-.woff2',
    rel: 'prefetch',
    as: 'font',
    type: 'font/woff2', 
    crossorigin: 'anonymous'
  }
];