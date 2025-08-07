import { useEffect } from 'react';

interface LocalFont {
  family: string;
  weight: string;
  style: string;
  display: 'swap' | 'fallback' | 'optional';
  localSrc?: string;
  fallbackUrl?: string;
}

interface LocalFontLoaderProps {
  fonts: LocalFont[];
  preload?: boolean;
}

export const LocalFontLoader = ({ fonts, preload = true }: LocalFontLoaderProps) => {
  useEffect(() => {
    // Create optimized font CSS with font-display: swap
    const fontCSS = fonts.map(font => {
      const localSources = font.localSrc ? `local('${font.localSrc}'), ` : '';
      return `
        @font-face {
          font-family: '${font.family}';
          font-weight: ${font.weight};
          font-style: ${font.style};
          font-display: ${font.display};
          src: ${localSources}${font.fallbackUrl ? `url('${font.fallbackUrl}') format('woff2')` : ''};
        }
      `;
    }).join('\n');

    // Inject CSS
    const style = document.createElement('style');
    style.id = 'local-fonts';
    style.textContent = fontCSS;
    
    // Remove existing local font styles to prevent duplicates
    const existing = document.getElementById('local-fonts');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(style);

    // Preload critical fonts
    if (preload) {
      fonts.forEach(font => {
        if (font.fallbackUrl) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'font';
          link.type = 'font/woff2';
          link.href = font.fallbackUrl;
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        }
      });
    }

    return () => {
      const styleElement = document.getElementById('local-fonts');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [fonts, preload]);

  return null;
};

// Optimized font configuration
export const OPTIMIZED_FONTS: LocalFont[] = [
  {
    family: 'Playfair Display',
    weight: '400',
    style: 'normal',
    display: 'swap',
    localSrc: 'Playfair Display',
    fallbackUrl: 'https://fonts.gstatic.com/s/playfairdisplay/v36/nuFiD-vYSZviVYUb_rj3ij__anPXBYf9lWYe3bp_b-4.woff2'
  },
  {
    family: 'Playfair Display',
    weight: '600',
    style: 'normal', 
    display: 'swap',
    localSrc: 'Playfair Display SemiBold',
    fallbackUrl: 'https://fonts.gstatic.com/s/playfairdisplay/v36/nuFiD-vYSZviVYUb_rj3ij__anPXBYf9pWge3bp_b-4.woff2'
  },
  {
    family: 'Montserrat',
    weight: '400',
    style: 'normal',
    display: 'swap', 
    localSrc: 'Montserrat',
    fallbackUrl: 'https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.woff2'
  },
  {
    family: 'Montserrat',
    weight: '500',
    style: 'normal',
    display: 'swap',
    localSrc: 'Montserrat Medium', 
    fallbackUrl: 'https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM70w-.woff2'
  }
];