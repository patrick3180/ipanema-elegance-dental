// src/components/performance/ContentfulBlockerForLandingPages.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * EMERGÊNCIA: Bloqueia TODAS as chamadas ao Contentful em landing pages
 * Isso economiza 231KB+ e elimina 60+ requisições desnecessárias
 */
const ContentfulBlockerForLandingPages = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Lista de rotas que são landing pages
    const landingPageRoutes = [
      '/lp/',
      '/landing/',
      '/clareamento-dental',
      '/limpeza-dental',
      '/consulta-inicial',
      '/profilaxia',
      '/saude-gengival',
      '/implantes',
      '/lentes'
    ];
    
    // Verifica se é uma landing page
    const isLandingPage = landingPageRoutes.some(route => 
      location.pathname.includes(route)
    );
    
    if (!isLandingPage) return;
    
    console.warn('🚫 Contentful bloqueado em landing page:', location.pathname);
    
    // Armazena o fetch original
    const originalFetch = window.fetch;
    
    // Sobrescreve o fetch para bloquear Contentful
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      
      // Bloqueia QUALQUER chamada ao Contentful
      if (url.includes('contentful.com') || 
          url.includes('ctfassets.net') || 
          url.includes('cdn.contentful.com')) {
        
        console.warn('❌ BLOQUEADO: Requisição Contentful em landing page:', url);
        
        // Retorna resposta vazia para não quebrar o código
        return new Response(JSON.stringify({
          items: [],
          total: 0,
          includes: { Entry: [], Asset: [] }
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Permite outras requisições
      return originalFetch(input, init);
    };
    
    // Limpa ao desmontar ou mudar de rota
    return () => {
      window.fetch = originalFetch;
    };
  }, [location.pathname]);
  
  return null;
};

export default ContentfulBlockerForLandingPages;
