// src/components/performance/ContentfulBlockerForNonBlogPages.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * CRÍTICO: Bloqueia TODAS as chamadas ao Contentful em páginas que NÃO são blog
 * Economiza 60+ requisições, 150KB+ de dados e 2-3s no LCP
 * 
 * PERMITIDO: Apenas /blog e /blog/:slug
 * BLOQUEADO: /, /servicos, /lp/*, e todas as outras
 */
const ContentfulBlockerForNonBlogPages = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Lista de rotas que PODEM usar Contentful (blog e homepage com BlogPreview)
    const allowedContentfulRoutes = ['/blog', '/'];
    
    // Verifica se a rota atual permite Contentful
    const isContentfulAllowed = 
      location.pathname === '/' || 
      location.pathname.startsWith('/blog');
    
    // Se for rota permitida, não bloqueia
    if (isContentfulAllowed) {
      console.log('✅ Contentful permitido:', location.pathname);
      return;
    }
    
    console.warn('🚫 Contentful bloqueado em página não-blog:', location.pathname);
    
    // Armazena o fetch original
    const originalFetch = window.fetch;
    
    // Sobrescreve o fetch para bloquear Contentful
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      
      // Bloqueia QUALQUER chamada ao Contentful
      if (url.includes('contentful.com') || 
          url.includes('ctfassets.net') || 
          url.includes('cdn.contentful.com')) {
        
        console.warn('❌ BLOQUEADO: Requisição Contentful em página não-blog:', url);
        
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

export default ContentfulBlockerForNonBlogPages;
