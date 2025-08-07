import { useEffect } from 'react';

const NonCriticalCSS = () => {
  useEffect(() => {
    // Load non-critical CSS after initial render
    const loadNonCriticalStyles = () => {
      const nonCriticalCSS = `
        /* Utility classes */
        @layer utilities {
          .text-balance { text-wrap: balance; }
          .section-spacing { padding-top: 4rem; padding-bottom: 4rem; }
          .container-custom { max-width: 1280px; margin: 0 auto; padding-left: 1.5rem; padding-right: 1.5rem; }
          .heading-xl { font-size: 2.25rem; font-weight: 500; line-height: 1.2; }
          .heading-lg { font-size: 1.875rem; font-weight: 500; }
          .heading-md { font-size: 1.5rem; font-weight: 500; }
          .body-lg { font-size: 1.125rem; line-height: 1.7; opacity: 0.8; }
          .body-md { font-size: 1rem; line-height: 1.6; opacity: 0.8; }
          .elegant-shadow { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
          .excerpt-text { 
            display: -webkit-box; 
            -webkit-line-clamp: 2; 
            -webkit-box-orient: vertical; 
            overflow: hidden; 
            max-height: 3rem; 
          }
        }

        @media (min-width: 768px) {
          .section-spacing { padding-top: 6rem; padding-bottom: 6rem; }
          .container-custom { padding-left: 2rem; padding-right: 2rem; }
          .heading-xl { font-size: 3rem; }
          .heading-lg { font-size: 2.25rem; }
          .heading-md { font-size: 1.875rem; }
          .body-lg { font-size: 1.25rem; }
          .body-md { font-size: 1.125rem; }
        }

        @media (min-width: 1024px) {
          .section-spacing { padding-top: 8rem; padding-bottom: 8rem; }
          .heading-xl { font-size: 3.75rem; }
        }

        /* Animations */
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }

        /* FAQ content styles */
        .faq-content a {
          font-weight: 600;
          color: hsl(var(--foreground));
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-thickness: 1px;
          transition: all 0.2s ease;
        }

        .faq-content a:hover {
          text-decoration-thickness: 2px;
          color: hsl(var(--primary));
        }

        /* Blog content styling */
        .blog-content h1 {
          font-size: 1.875rem;
          font-weight: 600;
          color: hsl(var(--foreground));
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .blog-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: hsl(var(--foreground));
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
        }

        .blog-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: hsl(var(--foreground));
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid hsl(var(--border));
          padding-bottom: 0.5rem;
        }

        .blog-content p {
          margin-top: 1.25rem;
          margin-bottom: 1.25rem;
          line-height: 1.75;
        }

        .blog-content a {
          font-weight: 600;
          color: hsl(var(--foreground));
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-thickness: 1px;
          transition: colors 0.2s ease;
        }

        .blog-content strong, .blog-content b {
          font-weight: 600;
          color: hsl(var(--foreground));
        }

        .blog-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .blog-content ul li {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .blog-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .blog-content ol li {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .blog-content blockquote {
          border-left: 4px solid hsl(var(--primary));
          padding-left: 1rem;
          font-style: italic;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          opacity: 0.8;
        }

        .blog-content img {
          border-radius: 0.5rem;
          margin-left: auto;
          margin-right: auto;
          margin-top: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          max-width: 100%;
          height: auto !important;
          object-fit: contain !important;
          width: auto !important;
          max-height: 400px !important;
          display: block;
        }

        .blog-content figure {
          margin-top: 2rem;
          margin-bottom: 2rem;
        }

        .blog-content figcaption {
          text-align: center;
          font-size: 0.875rem;
          opacity: 0.6;
          margin-top: 0.5rem;
        }

        .blog-content hr {
          margin-top: 2rem;
          margin-bottom: 2rem;
          border-color: hsl(var(--border));
          opacity: 0.3;
        }

        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .blog-content th {
          background-color: hsl(var(--foreground) / 0.1);
          color: hsl(var(--foreground));
          font-weight: 500;
          padding: 0.5rem;
          text-align: left;
          border: 1px solid hsl(var(--border) / 0.2);
        }

        .blog-content td {
          padding: 0.5rem;
          border: 1px solid hsl(var(--border) / 0.2);
        }
      `;

      const style = document.createElement('style');
      style.setAttribute('data-non-critical', 'true');
      style.textContent = nonCriticalCSS;
      document.head.appendChild(style);
    };

    // Load after initial render
    setTimeout(loadNonCriticalStyles, 100);
  }, []);

  return null;
};

export default NonCriticalCSS;