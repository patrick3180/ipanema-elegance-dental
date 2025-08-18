import { useEffect } from 'react';

const CriticalCSSInline = () => {
  useEffect(() => {
    // Comprehensive critical CSS for above-the-fold content
    const criticalCSS = `
      /* Critical Hero Section Styles */
      .hero-section { 
        min-height: 100vh; 
        display: flex; 
        align-items: center; 
        background: #CFCBB4;
        padding-top: 90px;
        padding-bottom: 4rem;
      }
      
      .hero-content { 
        max-width: 1200px; 
        margin: 0 auto; 
        padding: 0 1rem;
        display: flex;
        flex-direction: column;
        gap: 3rem;
      }
      
      /* Typography fixes for H1 in section */
      section h1, article h1, nav h1, aside h1 {
        font-size: clamp(1.875rem, 5vw, 3rem) !important;
        font-weight: 700 !important;
        line-height: 1.2 !important;
        color: #381F47 !important;
        margin-bottom: 1rem !important;
        font-family: serif !important;
      }
      
      .hero-title { 
        font-size: clamp(1.875rem, 5vw, 3rem); 
        font-weight: 700; 
        line-height: 1.2; 
        margin-bottom: 1rem;
        color: #381F47;
        font-family: serif;
      }
      
      .hero-subtitle { 
        font-size: clamp(1.125rem, 2.5vw, 1.25rem); 
        margin-bottom: 2rem; 
        color: #333333;
        line-height: 1.6;
      }
      
      /* Benefits Grid */
      .benefits-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        margin-bottom: 2rem;
      }
      
      @media (min-width: 768px) {
        .benefits-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        .hero-content {
          flex-direction: row;
          align-items: center;
        }
      }
      
      .benefit-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 0.5rem;
        padding: 1rem;
      }
      
      /* CTA Button */
      .btn-primary { 
        background: #381F47; 
        color: white; 
        padding: 1rem 2rem; 
        border-radius: 0.5rem; 
        font-weight: 600; 
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 1.125rem;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
      
      .btn-primary:hover { 
        background: #2d1738; 
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }
      
      /* Header styles */
      .header-fixed {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 50;
        background: white;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      }
      
      /* Image optimization */
      .hero-image {
        width: 100%;
        height: auto;
        border-radius: 0.5rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      }
      
      /* Container responsive */
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }
      
      /* Utilities */
      .text-primary { color: #381F47; }
      .text-secondary { color: #333333; }
      .bg-accent { background: #CFCBB4; }
      .text-accent { color: #B3955F; }
    `;

    // Check if critical CSS is already injected
    if (!document.getElementById('critical-css-inline')) {
      const style = document.createElement('style');
      style.textContent = criticalCSS;
      style.id = 'critical-css-inline';
      style.setAttribute('data-critical', 'true');
      document.head.appendChild(style);
    }

    return () => {
      const existingStyle = document.getElementById('critical-css-inline');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return null;
};

export default CriticalCSSInline;