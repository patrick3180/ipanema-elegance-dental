import { useEffect } from 'react';

const ResourceHintsOptimizer = () => {
  useEffect(() => {
    // Add critical resource hints
    const hints = [
      { rel: 'preconnect', href: 'https://www.bing.com' },
      { rel: 'preconnect', href: 'https://cdn.contentful.com' },
      { rel: 'dns-prefetch', href: 'https://www.google.com' },
      { rel: 'dns-prefetch', href: 'https://cdn.gpteng.co' }
    ];

    const existingHints = new Set(
      Array.from(document.head.querySelectorAll('link[rel*="connect"], link[rel*="prefetch"]'))
        .map(link => `${(link as HTMLLinkElement).rel}-${(link as HTMLLinkElement).href}`)
    );

    hints.forEach(hint => {
      const key = `${hint.rel}-${hint.href}`;
      if (!existingHints.has(key)) {
        const link = document.createElement('link');
        link.rel = hint.rel;
        link.href = hint.href;
        if (hint.rel === 'preconnect') {
          link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
      }
    });
  }, []);

  return null;
};

export default ResourceHintsOptimizer;