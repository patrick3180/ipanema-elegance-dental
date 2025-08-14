import { useEffect } from 'react';

const CriticalCSSInline = () => {
  useEffect(() => {
    // Inject critical CSS directly into <head> for above-the-fold content
    const criticalCSS = `
      /* Critical above-the-fold styles only */
      * { box-sizing: border-box; }
      body { margin: 0; font-family: 'Inter', system-ui, -apple-system, sans-serif; line-height: 1.6; }
      
      /* Layout containers */
      .min-h-screen { min-height: 100vh; }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
      @media (min-width: 1024px) { .container { padding: 0 2rem; } }
      
      /* Critical colors - using semantic tokens */
      .bg-white { background-color: #ffffff; }
      .bg-\\[\\#CFCBB4\\] { background-color: #CFCBB4; }
      .text-\\[\\#381F47\\] { color: #381F47; }
      .bg-\\[\\#381F47\\] { background-color: #381F47; }
      .text-white { color: #ffffff; }
      
      /* Critical layout */
      .flex { display: flex; }
      .grid { display: grid; }
      .items-center { align-items: center; }
      .justify-center { justify-content: center; }
      .justify-between { justify-content: space-between; }
      .gap-3 { gap: 0.75rem; }
      .gap-4 { gap: 1rem; }
      .gap-6 { gap: 1.5rem; }
      
      /* Critical spacing */
      .p-4 { padding: 1rem; }
      .pt-4 { padding-top: 1rem; }
      .pt-\\[90px\\] { padding-top: 90px; }
      .mb-4 { margin-bottom: 1rem; }
      .mb-6 { margin-bottom: 1.5rem; }
      
      /* Critical sizing */
      .w-full { width: 100%; }
      .h-auto { height: auto; }
      .h-full { height: 100%; }
      
      /* Critical typography */
      .font-serif { font-family: 'Playfair Display', Georgia, serif; }
      .font-bold { font-weight: 700; }
      .font-semibold { font-weight: 600; }
      .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
      .text-2xl { font-size: 1.5rem; line-height: 2rem; }
      .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
      .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
      .leading-tight { line-height: 1.25; }
      .text-center { text-align: center; }
      
      /* Critical visual effects */
      .rounded-lg { border-radius: 0.5rem; }
      .shadow-xl { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04); }
      
      /* Critical performance optimizations */
      .hero-section { contain: layout style paint; }
      .hero-image-container { 
        aspect-ratio: 1024/1365; 
        will-change: transform; 
        contain: layout style paint;
      }
      
      /* Critical transitions */
      .transition-all { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      .hover\\:scale-105:hover { transform: scale(1.05); }
      
      /* Mobile-first responsive */
      @media (min-width: 768px) {
        .md\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
        .md\\:text-5xl { font-size: 3rem; line-height: 1; }
      }
      @media (min-width: 1024px) {
        .lg\\:w-3\\/5 { width: 60%; }
        .lg\\:w-2\\/5 { width: 40%; }
        .lg\\:text-5xl { font-size: 3rem; line-height: 1; }
        .lg\\:text-6xl { font-size: 3.75rem; line-height: 1; }
      }
    `;
    
    const style = document.createElement('style');
    style.innerHTML = criticalCSS;
    style.setAttribute('data-critical', 'true');
    document.head.appendChild(style);
    
    // Load non-critical CSS after main content with proper media loading
    const loadNonCriticalCSS = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/src/index.css';
      link.media = 'print';
      link.onload = function() {
        (this as HTMLLinkElement).media = 'all';
      };
      // Only add if not already present
      if (!document.querySelector('link[href="/src/index.css"]')) {
        document.head.appendChild(link);
      }
    };
    
    // Delay non-critical CSS loading
    if (document.readyState === 'loading') {
      window.addEventListener('load', () => {
        setTimeout(loadNonCriticalCSS, 50);
      });
    } else {
      setTimeout(loadNonCriticalCSS, 50);
    }
    
  }, []);
  
  return null;
};

export default CriticalCSSInline;