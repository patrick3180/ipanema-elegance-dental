import { useEffect } from 'react';

interface MobileCriticalCSSProps {
  isMobile?: boolean;
}

const MobileCriticalCSS = ({ isMobile = true }: MobileCriticalCSSProps) => {
  useEffect(() => {
    if (!isMobile) return;

    // Inject critical CSS for mobile above-the-fold content
    const criticalCSS = `
      /* Critical mobile-first styles - inline for fastest LCP */
      .mobile-hero-container{min-height:100vh;display:flex;align-items:center;background:#CFCBB4}
      .mobile-hero-image{aspect-ratio:480/629;object-fit:cover;width:100%;height:auto}
      .mobile-header{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(255,255,255,0.95);backdrop-filter:blur(10px)}
      .mobile-cta{background:#381F47;color:#fff;padding:16px 24px;border-radius:8px;font-weight:600;text-align:center;display:block;width:100%}
      .mobile-text-primary{color:#381F47}
      .mobile-bg-primary{background:#381F47}
      .mobile-bg-secondary{background:#CFCBB4}
      .mobile-container{padding:0 16px;max-width:100%}
      .mobile-font-heading{font-family:'Playfair Display',Georgia,serif;line-height:1.1}
      .mobile-font-body{font-family:'Montserrat',system-ui,sans-serif}
      .mobile-transition{transition:transform 0.2s ease,opacity 0.2s ease}
      
      /* Prevent layout shifts */
      .mobile-skeleton{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;animation:loading 1.5s infinite}
      @keyframes loading{0%{background-position:200% 0}100%{background-position:-200% 0}}
      
      /* Above-the-fold critical elements */
      @media (max-width: 768px) {
        .hero-section{padding-top:80px;min-height:calc(100vh - 80px)}
        .hero-image-container{order:1;margin-bottom:24px}
        .hero-content{order:2;text-align:center;padding:0 20px}
        .hero-title{font-size:2rem;line-height:1.1;margin-bottom:16px}
        .hero-subtitle{font-size:1.1rem;line-height:1.4;margin-bottom:24px;opacity:0.9}
        .hero-cta{margin-top:32px;font-size:1.1rem;padding:18px 32px}
      }
    `;

    const styleEl = document.createElement('style');
    styleEl.id = 'mobile-critical-css';
    styleEl.innerHTML = criticalCSS;
    
    // Insert before other stylesheets for highest priority
    const firstLink = document.head.querySelector('link[rel="stylesheet"]');
    if (firstLink) {
      document.head.insertBefore(styleEl, firstLink);
    } else {
      document.head.appendChild(styleEl);
    }

    return () => {
      const existingStyle = document.getElementById('mobile-critical-css');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [isMobile]);

  return null;
};

export default MobileCriticalCSS;