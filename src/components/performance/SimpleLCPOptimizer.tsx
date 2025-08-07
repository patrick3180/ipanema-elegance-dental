import { useEffect } from 'react';

const SimpleLCPOptimizer = () => {
  useEffect(() => {
    // 1. Otimizar Hero Image imediatamente
    const heroImage = document.querySelector('.hero-section img, img[alt*="Dra. Carla"]');
    if (heroImage instanceof HTMLImageElement) {
      // Converter para WebP se for Contentful
      if (heroImage.src.includes('ctfassets.net') && !heroImage.src.includes('fm=webp')) {
        const url = new URL(heroImage.src);
        url.searchParams.set('fm', 'webp');
        url.searchParams.set('q', '85');
        url.searchParams.set('w', window.innerWidth < 768 ? '400' : '600');
        heroImage.src = url.toString();
      }
      
      // Forçar carregamento prioritário
      heroImage.loading = 'eager';
      heroImage.fetchPriority = 'high';
      heroImage.decoding = 'async';
    }

    // 2. Adicionar preload para imagem hero
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = '/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.webp';
    preloadLink.fetchPriority = 'high';
    document.head.appendChild(preloadLink);

    // 3. Otimizar outras imagens com lazy loading
    const nonCriticalImages = document.querySelectorAll('img:not(.hero-section img)');
    nonCriticalImages.forEach((img) => {
      if (img instanceof HTMLImageElement) {
        img.loading = 'lazy';
        img.decoding = 'async';
        
        // Adicionar dimensões para evitar layout shift
        if (!img.width && img.complete) {
          img.width = img.naturalWidth;
          img.height = img.naturalHeight;
        }
      }
    });

    // 4. Adicionar font-display swap via CSS
    const fontStyle = document.createElement('style');
    fontStyle.textContent = `
      @font-face {
        font-display: swap !important;
      }
      
      /* Prevenir layout shift das imagens */
      img {
        max-width: 100%;
        height: auto;
        aspect-ratio: attr(width) / attr(height);
      }
      
      /* Otimizar renderização da hero section */
      .hero-section {
        contain: layout style paint;
        will-change: auto;
      }
    `;
    document.head.appendChild(fontStyle);

    // 5. Remover scripts de analytics do caminho crítico
    const analyticsScripts = document.querySelectorAll('script[src*="googletagmanager"], script[src*="gtag"]');
    analyticsScripts.forEach(script => {
      script.setAttribute('defer', 'true');
    });

  }, []);

  return null;
};

export default SimpleLCPOptimizer;
