import { useEffect } from 'react';

const CriticalCSSInline = () => {
  useEffect(() => {
    // Inline critical CSS for above-the-fold content
    const criticalCSS = `
      .hero-section { 
        min-height: 100vh; 
        display: flex; 
        align-items: center; 
        background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)));
      }
      .hero-content { 
        max-width: 1200px; 
        margin: 0 auto; 
        padding: 0 1rem;
      }
      .hero-title { 
        font-size: clamp(2rem, 5vw, 3.5rem); 
        font-weight: 700; 
        line-height: 1.2; 
        margin-bottom: 1rem;
      }
      .hero-subtitle { 
        font-size: clamp(1.125rem, 2.5vw, 1.5rem); 
        margin-bottom: 2rem; 
        opacity: 0.9;
      }
      .btn-primary { 
        background: hsl(var(--accent)); 
        color: hsl(var(--accent-foreground)); 
        padding: 1rem 2rem; 
        border-radius: 0.5rem; 
        font-weight: 600; 
        transition: all 0.3s ease;
      }
      .btn-primary:hover { 
        background: hsl(var(--accent) / 0.9); 
        transform: translateY(-2px);
      }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    style.id = 'critical-css-inline';
    document.head.appendChild(style);

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