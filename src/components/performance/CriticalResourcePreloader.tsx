import { useEffect } from 'react';

interface CriticalResourcePreloaderProps {
  heroImageUrl: string;
  enableFontPreload?: boolean;
  enableImagePreload?: boolean;
}

const CriticalResourcePreloader = ({
  heroImageUrl,
  enableFontPreload = true,
  enableImagePreload = true
}: CriticalResourcePreloaderProps) => {
  useEffect(() => {
    const preloadResources = () => {
      // 1. Preload critical hero image with highest priority
      if (enableImagePreload) {
        const heroPreload = document.createElement('link');
        heroPreload.rel = 'preload';
        heroPreload.as = 'image';
        heroPreload.href = heroImageUrl;
        heroPreload.fetchPriority = 'high';
        heroPreload.type = 'image/webp';
        document.head.appendChild(heroPreload);

        // Preload responsive versions
        const responsiveVersions = [
          heroImageUrl.replace('.webp', '-480.avif'),
          heroImageUrl.replace('.webp', '-768.avif'),
          heroImageUrl.replace('.webp', '-1024.avif')
        ];

        responsiveVersions.forEach((url, index) => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = url;
          link.fetchPriority = index === 0 ? 'high' : 'low';
          link.type = 'image/avif';
          
          if (index === 0) {
            link.media = '(max-width: 767px)';
          } else if (index === 1) {
            link.media = '(min-width: 768px) and (max-width: 1023px)';
          } else {
            link.media = '(min-width: 1024px)';
          }
          
          document.head.appendChild(link);
        });
      }

      // 2. Preload critical fonts
      if (enableFontPreload) {
        const criticalFonts = [
          { url: '/fonts/montserrat-400.woff2', priority: 'high' },
          { url: '/fonts/montserrat-500.woff2', priority: 'high' },
          { url: '/fonts/playfair-display-400.woff2', priority: 'medium' }
        ];

        criticalFonts.forEach(({ url, priority }) => {
          const fontPreload = document.createElement('link');
          fontPreload.rel = 'preload';
          fontPreload.as = 'font';
          fontPreload.type = 'font/woff2';
          fontPreload.crossOrigin = 'anonymous';
          fontPreload.href = url;
          fontPreload.fetchPriority = priority as any;
          document.head.appendChild(fontPreload);
        });
      }

      // 3. Preconnect to external domains
      const externalDomains = [
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
      ];

      externalDomains.forEach(domain => {
        const preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = domain;
        preconnect.crossOrigin = 'anonymous';
        document.head.appendChild(preconnect);
      });

      // 4. DNS prefetch for non-critical domains
      const prefetchDomains = [
        'https://api.whatsapp.com',
        'https://web.whatsapp.com'
      ];

      prefetchDomains.forEach(domain => {
        const dnsPrefetch = document.createElement('link');
        dnsPrefetch.rel = 'dns-prefetch';
        dnsPrefetch.href = domain;
        document.head.appendChild(dnsPrefetch);
      });
    };

    // Run immediately
    preloadResources();
  }, [heroImageUrl, enableFontPreload, enableImagePreload]);

  return null;
};

export default CriticalResourcePreloader;