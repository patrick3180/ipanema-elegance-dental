import React, { useEffect } from 'react';
import { generateSitemap } from '@/utils/sitemapGenerator';

/**
 * Component that helps update the sitemap dynamically and provides
 * better SEO support for search engines
 */
const SitemapUpdater = () => {
  useEffect(() => {
    // Add structured data to help search engines understand the site structure
    const addSiteNavigationStructuredData = () => {
      const existingScript = document.getElementById('site-navigation-structured-data');
      if (existingScript) {
        existingScript.remove();
      }

      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Clínica Dra. Carla Christoph",
        "alternateName": "Dentista em Ipanema",
        "url": "https://dracarlachristoph.com",
        "description": "Clínica odontológica especializada em tratamentos estéticos e funcionais em Ipanema, Rio de Janeiro",
        "publisher": {
          "@type": "Organization",
          "@id": "https://dracarlachristoph.com#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://dracarlachristoph.com/blog?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        },
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": [
            {
              "@type": "SiteNavigationElement",
              "position": 1,
              "name": "Início",
              "url": "https://dracarlachristoph.com/"
            },
            {
              "@type": "SiteNavigationElement", 
              "position": 2,
              "name": "Sobre",
              "url": "https://dracarlachristoph.com/sobre"
            },
            {
              "@type": "SiteNavigationElement",
              "position": 3, 
              "name": "Serviços",
              "url": "https://dracarlachristoph.com/servicos"
            },
            {
              "@type": "SiteNavigationElement",
              "position": 4,
              "name": "Blog",
              "url": "https://dracarlachristoph.com/blog"
            },
            {
              "@type": "SiteNavigationElement",
              "position": 5,
              "name": "Contato", 
              "url": "https://dracarlachristoph.com/contato"
            }
          ]
        }
      };

      const script = document.createElement('script');
      script.id = 'site-navigation-structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    };

    // Add breadcrumb structured data for better navigation understanding
    const addBreadcrumbData = () => {
      const currentPath = window.location.pathname;
      if (currentPath === '/') return; // Don't add breadcrumbs to homepage

      const pathSegments = currentPath.split('/').filter(Boolean);
      const breadcrumbItems = [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Início",
          "item": "https://dracarlachristoph.com/"
        }
      ];

      let currentUrl = 'https://dracarlachristoph.com';
      pathSegments.forEach((segment, index) => {
        currentUrl += `/${segment}`;
        
        let name = segment;
        // Convert URL segments to readable names
        switch (segment) {
          case 'sobre': name = 'Sobre'; break;
          case 'servicos': name = 'Serviços'; break;
          case 'blog': name = 'Blog'; break;
          case 'contato': name = 'Contato'; break;
          case 'diferenciais': name = 'Diferenciais'; break;
          case 'lentes-de-contato-dental-e-facetas-de-porcelana': name = 'Lentes de Contato Dental e Facetas'; break;
          case 'clareamento-dental': name = 'Clareamento Dental'; break;
          case 'protese-dentaria': name = 'Prótese Dentária'; break;
          case 'implantes-dentarios': name = 'Implantes Dentários'; break;
          case 'clinica-geral-e-prevencao': name = 'Clínica Geral e Prevenção'; break;
          case 'restauracoes-esteticas': name = 'Restaurações Estéticas'; break;
          case 'tratamento-de-canal': name = 'Tratamento de Canal'; break;
          case 'saude-da-gengiva': name = 'Saúde da Gengiva'; break;
          default: 
            name = segment.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
        }

        breadcrumbItems.push({
          "@type": "ListItem",
          "position": index + 2,
          "name": name,
          "item": currentUrl
        });
      });

      const existingBreadcrumb = document.getElementById('breadcrumb-structured-data');
      if (existingBreadcrumb) {
        existingBreadcrumb.remove();
      }

      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
      };

      const script = document.createElement('script');
      script.id = 'breadcrumb-structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(breadcrumbData);
      document.head.appendChild(script);
    };

    // Initialize structured data
    addSiteNavigationStructuredData();
    addBreadcrumbData();

    // Update structured data when route changes
    const handleRouteChange = () => {
      setTimeout(() => {
        addBreadcrumbData();
      }, 100); // Small delay to ensure route has changed
    };

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);
    
    // Also listen for pushState/replaceState (for SPA navigation)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      handleRouteChange();
    };
    
    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      handleRouteChange();
    };

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  // Log sitemap information for debugging
  useEffect(() => {
    const logSitemapInfo = async () => {
      try {
        const sitemap = await generateSitemap();
        console.log('🗺️ Dynamic sitemap generated successfully');
        console.log('📊 Sitemap contains', (sitemap.match(/<url>/g) || []).length, 'URLs');
        console.log('📍 Current page indexed:', window.location.href);
      } catch (error) {
        console.error('❌ Error generating sitemap:', error);
      }
    };

    // Only log in development
    if (import.meta.env.DEV) {
      logSitemapInfo();
    }
  }, []);

  return null; // This component doesn't render anything
};

export default SitemapUpdater;