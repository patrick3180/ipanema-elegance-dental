// src/components/performance/SimpleLCPOptimizer.tsx
// SUBSTITUA TODO O ARQUIVO POR ESTE

import { useEffect } from 'react';

const SimpleLCPOptimizer = () => {
  useEffect(() => {
    // 1. Otimizar TODAS as imagens Hero imediatamente
    const optimizeHeroImages = () => {
      // Busca por qualquer imagem que possa ser hero/LCP
      const heroSelectors = [
        '.hero-section img',
        'img[alt*="Dra"]',
        'img[alt*="Carla"]',
        'img[src*="jaleco"]',
        'img[src*="vertical"]',
        '[data-hero-image]',
        'section:first-of-type img'
      ];
      
      heroSelectors.forEach(selector => {
        const images = document.querySelectorAll(selector);
        images.forEach((img) => {
          if (img instanceof HTMLImageElement) {
            // Remove loading lazy de imagens hero
            img.loading = 'eager';
            img.fetchPriority = 'high';
            img.decoding = 'async';
            
            // Se a imagem for PNG, tenta substituir por WebP
            if (img.src.includes('.png')) {
              const webpSrc = img.src.replace('.png', '.webp');
              const avifSrc = img.src.replace('.png', '.avif');
              
              // Testa AVIF primeiro (melhor compressão)
              const testAvif = new Image();
              testAvif.onerror = () => {
                // Se AVIF falhar, tenta WebP
                const testWebp = new Image();
                testWebp.onerror = () => {
                  console.log('Mantendo PNG:', img.src);
                };
                testWebp.onload = () => {
                  img.src = webpSrc;
                  console.log('✅ Substituído por WebP:', webpSrc);
                };
                testWebp.src = webpSrc;
              };
              testAvif.onload = () => {
                img.src = avifSrc;
                console.log('✅ Substituído por AVIF:', avifSrc);
              };
              testAvif.src = avifSrc;
            }
            
            // Otimiza URLs do Contentful
            if (img.src.includes('ctfassets.net')) {
              const url = new URL(img.src);
              url.searchParams.set('fm', 'webp');
              url.searchParams.set('q', '85');
              url.searchParams.set('w', window.innerWidth < 768 ? '400' : '800');
              img.src = url.toString();
            }
          }
        });
      });
    };
    
    // 2. Adicionar preload para imagens críticas
    const addCriticalPreloads = () => {
      const criticalImages = [
        '/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.webp',
        '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp',
        '/lovable-uploads/vertical-de-jaleco.webp'
      ];
      
      criticalImages.forEach(src => {
        if (!document.querySelector(`link[href="${src}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          link.type = 'image/webp';
          link.fetchPriority = 'high';
          document.head.appendChild(link);
        }
      });
    };
    
    // 3. Lazy load imagens NÃO críticas
    const lazyLoadNonCriticalImages = () => {
      const nonCriticalImages = document.querySelectorAll(
        'img:not(.hero-section img):not([fetchpriority="high"])'
      );
      
      nonCriticalImages.forEach((img) => {
        if (img instanceof HTMLImageElement) {
          img.loading = 'lazy';
          img.decoding = 'async';
          
          // Adiciona dimensões para evitar layout shift
          if (!img.width && img.complete && img.naturalWidth) {
            img.width = img.naturalWidth;
            img.height = img.naturalHeight;
          }
        }
      });
    };
    
    // 4. CSS crítico para evitar layout shift
    const addCriticalCSS = () => {
      if (!document.getElementById('lcp-critical-css')) {
        const style = document.createElement('style');
        style.id = 'lcp-critical-css';
        style.textContent = `
          /* Prevenir layout shift das imagens */
          img {
            max-width: 100%;
            height: auto;
          }
          
          img[width][height] {
            aspect-ratio: attr(width) / attr(height);
          }
          
          /* Otimizar renderização da hero section */
          .hero-section {
            contain: layout style paint;
            will-change: auto;
            transform: translateZ(0);
          }
          
          /* Font display swap para todas as fontes */
          @font-face {
            font-display: swap !important;
          }
          
          /* Skeleton para imagens carregando */
          img:not([src]), img[src=""] {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
          }
          
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `;
        document.head.appendChild(style);
      }
    };
    
    // 5. Remover/defer scripts não críticos
    const deferNonCriticalScripts = () => {
      const scriptsToDefer = [
        'googletagmanager',
        'gtag',
        'analytics',
        'gtm',
        'facebook',
        'hotjar'
      ];
      
      document.querySelectorAll('script[src]').forEach(script => {
        const src = script.getAttribute('src') || '';
        if (scriptsToDefer.some(keyword => src.includes(keyword))) {
          script.setAttribute('defer', 'true');
          script.setAttribute('async', 'false');
        }
      });
    };
    
    // Executar otimizações
    optimizeHeroImages();
    addCriticalPreloads();
    lazyLoadNonCriticalImages();
    addCriticalCSS();
    deferNonCriticalScripts();
    
    // Re-executar ao detectar mudanças no DOM
    const observer = new MutationObserver(() => {
      optimizeHeroImages();
      lazyLoadNonCriticalImages();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return null;
};

export default SimpleLCPOptimizer;
