import { useEffect } from 'react';

interface CriticalResourcePreloaderProps {
  heroImage: string;
  isMobile?: boolean;
}

export const CriticalResourcePreloader = ({ 
  heroImage, 
  isMobile = false 
}: CriticalResourcePreloaderProps) => {
  useEffect(() => {
    // Preload hero image with highest priority
    const heroLink = document.createElement('link');
    heroLink.rel = 'preload';
    heroLink.as = 'image';
    heroLink.href = heroImage;
    heroLink.setAttribute('fetchpriority', 'high');
    heroLink.type = 'image/avif';
    document.head.appendChild(heroLink);

    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.href = '/fonts/inter.woff2';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);

    // DNS prefetch for external domains
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = '//api.whatsapp.com';
    document.head.appendChild(dnsPrefetch);

    return () => {
      // Cleanup
      [heroLink, fontLink, dnsPrefetch].forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [heroImage]);

  return null;
};