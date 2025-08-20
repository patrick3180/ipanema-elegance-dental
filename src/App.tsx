import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";

// COMPONENTES DE PERFORMANCE - CRÍTICOS
import ContentfulBlockerForNonBlogPages from '@/components/performance/ContentfulBlockerForNonBlogPages';
import SimpleLCPOptimizer from '@/components/performance/SimpleLCPOptimizer';

// Páginas principais - apenas as que EXISTEM
const Index = lazy(() => import("./pages/Index"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

// Landing pages - EXISTEM
const LimpezaDentalLandingPage = lazy(() => import("./pages/LimpezaDentalLandingPage"));
const ProfilaxiaLandingPage = lazy(() => import("./pages/ProfilaxiaLandingPage"));
const EsteticaSorrisoLandingPage = lazy(() => import("./pages/EsteticaSorrisoLandingPage"));
const SaudeGengivalLandingPage = lazy(() => import("./pages/SaudeGengivalLandingPage"));

// Service pages - EXISTEM
const SaudeDaGengiva = lazy(() => import("./pages/SaudeDaGengiva"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Loading fallback component
const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-dental-beige">
    <div className="text-center space-y-4">
      <Skeleton className="h-8 w-48 mx-auto" />
      <Skeleton className="h-4 w-32 mx-auto" />
    </div>
  </div>
);

const App = () => {
  // BLOQUEIO DO CONTENTFUL EM LANDING PAGES
  useEffect(() => {
    const currentPath = window.location.pathname;
    console.log('🚀 App initialized at path:', currentPath);
    
    // Debug para encontrar chamadas do Contentful
    if (process.env.NODE_ENV === 'development') {
      const originalFetch = window.fetch;
      window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = typeof input === 'string' ? input : input.toString();
        
        if (url.includes('contentful')) {
          console.warn('📍 Contentful call detected:', {
            url: url.substring(0, 100),
            path: window.location.pathname,
            stack: new Error().stack?.split('\n').slice(2, 5)
          });
        }
        
        return originalFetch(input, init);
      };
    }
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            {/* BLOQUEADORES DE PERFORMANCE - ORDEM IMPORTA! */}
            <ContentfulBlockerForNonBlogPages />
            <SimpleLCPOptimizer />
            
            <Toaster />
            <Sonner />
            
            <Suspense fallback={<PageLoadingFallback />}>
              <Routes>
                {/* Rotas principais */}
                <Route path="/" element={<Index />} />
                <Route path="/servicos" element={<ServicesPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                
                {/* Landing pages */}
                <Route path="/lp/limpeza-dental-ipanema" element={<LimpezaDentalLandingPage />} />
                <Route path="/lp/profilaxia-dental-ipanema" element={<ProfilaxiaLandingPage />} />
                <Route path="/lp/estetica-dental-ipanema" element={<EsteticaSorrisoLandingPage />} />
                <Route path="/lp/saude-gengival-ipanema" element={<SaudeGengivalLandingPage />} />
                
                {/* Service pages */}
                <Route path="/saude-da-gengiva" element={<SaudeDaGengiva />} />
                
                {/* Rotas temporárias - redirecionam para home */}
                <Route path="/sobre" element={<Navigate to="/" replace />} />
                <Route path="/contato" element={<Navigate to="/" replace />} />
                <Route path="/diferenciais" element={<Navigate to="/" replace />} />
                <Route path="/lp/clareamento-dental" element={<Navigate to="/" replace />} />
                <Route path="/lp/consulta-inicial" element={<Navigate to="/" replace />} />
                <Route path="/lp/dor-de-dente-urgencia-ipanema" element={<Navigate to="/" replace />} />
                <Route path="/lp/dente-quebrado-urgencia-ipanema" element={<Navigate to="/" replace />} />
                <Route path="/lp/emergencia-odontologica-ipanema" element={<Navigate to="/" replace />} />
                <Route path="/lp/especialista-protese-ipanema" element={<Navigate to="/" replace />} />
                <Route path="/clareamento-dental" element={<Navigate to="/" replace />} />
                <Route path="/implantes-dentarios" element={<Navigate to="/" replace />} />
                <Route path="/lentes-de-contato-dental-e-facetas-de-porcelana" element={<Navigate to="/" replace />} />
                <Route path="/protese-dentaria" element={<Navigate to="/" replace />} />
                <Route path="/restauracoes-esteticas" element={<Navigate to="/" replace />} />
                <Route path="/tratamento-de-canal" element={<Navigate to="/" replace />} />
                <Route path="/clinica-geral-e-prevencao" element={<Navigate to="/" replace />} />
                
                {/* Catch all - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;