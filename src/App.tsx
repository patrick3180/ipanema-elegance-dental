import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ImageOptimizationProvider } from "@/components/performance/ImageOptimizationProvider";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/performance/ErrorBoundary";

// COMPONENTES DE PERFORMANCE - CRÍTICOS
import ContentfulBlockerForLandingPages from '@/components/performance/ContentfulBlockerForLandingPages';
import SimpleLCPOptimizer from '@/components/performance/SimpleLCPOptimizer';

// Lazy load ALL route components
const Index = lazy(() => import("./pages/Index"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Services = lazy(() => import("./pages/Services"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Blog = lazy(() => import("./pages/Blog"));
const Contato = lazy(() => import("./pages/Contato"));
const Diferenciais = lazy(() => import("./pages/Diferenciais"));
const ServicesRoute = lazy(() => import("./pages/ServicesRoute"));
const Gone = lazy(() => import("./pages/Gone"));
const SeoDashboard = lazy(() => import("./pages/SeoDashboard"));

// Landing pages - lazy load
const ClareamentoDental = lazy(() => import("./pages/ClareamentoDental"));
const ConsultaInicial = lazy(() => import("./pages/ConsultaInicial"));
const LimpezaDentalLandingPage = lazy(() => import("./pages/LimpezaDentalLandingPage"));
const ProfilaxiaLandingPage = lazy(() => import("./pages/ProfilaxiaLandingPage"));
const DorDeDenteUrgencia = lazy(() => import("./pages/DorDeDenteUrgencia"));
const DenteQuebradoUrgencia = lazy(() => import("./pages/DenteQuebradoUrgencia"));
const EmergenciaOdontologica = lazy(() => import("./pages/EmergenciaOdontologica"));
const EspecialistaProtese = lazy(() => import("./pages/EspecialistaProtese"));
const SaudeGengivalLandingPage = lazy(() => import("./pages/SaudeGengivalLandingPage"));

// Service pages - lazy load
const ClareamentoDentalService = lazy(() => import("./pages/ClareamentoDentalService"));
const ImplantesDentarios = lazy(() => import("./pages/ImplantesDentarios"));
const LentesEFacetas = lazy(() => import("./pages/LentesEFacetas"));
const ProteseDentaria = lazy(() => import("./pages/ProteseDentaria"));
const RestaureacoesEsteticas = lazy(() => import("./pages/RestaureacoesEsteticas"));
const SaudeDaGengiva = lazy(() => import("./pages/SaudeDaGengiva"));
const TratamentoDeCanal = lazy(() => import("./pages/TratamentoDeCanal"));
const ClinicaGeralPrevencao = lazy(() => import("./pages/ClinicaGeralPrevencao"));

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

// Critical images for preloading
const criticalImages = [
  { src: '/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.webp', width: 600 },
  { src: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp', width: 400 }
];

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
          <ImageOptimizationProvider criticalImages={criticalImages}>
            <ErrorBoundary>
              <BrowserRouter>
                {/* BLOQUEADORES DE PERFORMANCE - ORDEM IMPORTA! */}
                <ContentfulBlockerForLandingPages />
                <SimpleLCPOptimizer />
                
                <Toaster />
                <Sonner />
                
                <Suspense fallback={<PageLoadingFallback />}>
                  <Routes>
                    {/* Main routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/sobre" element={<Sobre />} />
                    <Route path="/servicos" element={<Services />} />
                    <Route path="/diferenciais" element={<Diferenciais />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/contato" element={<Contato />} />
                    <Route path="/gone" element={<Gone />} />
                    <Route path="/seo-dashboard" element={<SeoDashboard />} />
                    
                    {/* Landing pages - CRITICAL FOR PERFORMANCE */}
                    <Route path="/lp/clareamento-dental" element={<ClareamentoDental />} />
                    <Route path="/lp/consulta-inicial" element={<ConsultaInicial />} />
                    <Route path="/lp/limpeza-dental-ipanema" element={<LimpezaDentalLandingPage />} />
                    <Route path="/lp/profilaxia-dental-ipanema" element={<ProfilaxiaLandingPage />} />
                    <Route path="/lp/dor-de-dente-urgencia-ipanema" element={<DorDeDenteUrgencia />} />
                    <Route path="/lp/dente-quebrado-urgencia-ipanema" element={<DenteQuebradoUrgencia />} />
                    <Route path="/lp/emergencia-odontologica-ipanema" element={<EmergenciaOdontologica />} />
                    <Route path="/lp/especialista-protese-ipanema" element={<EspecialistaProtese />} />
                    <Route path="/lp/saude-gengival-ipanema" element={<SaudeGengivalLandingPage />} />
                    
                    {/* Service pages */}
                    <Route path="/clareamento-dental" element={<ClareamentoDentalService />} />
                    <Route path="/implantes-dentarios" element={<ImplantesDentarios />} />
                    <Route path="/lentes-de-contato-dental-e-facetas-de-porcelana" element={<LentesEFacetas />} />
                    <Route path="/protese-dentaria" element={<ProteseDentaria />} />
                    <Route path="/restauracoes-esteticas" element={<RestaureacoesEsteticas />} />
                    <Route path="/saude-da-gengiva" element={<SaudeDaGengiva />} />
                    <Route path="/tratamento-de-canal" element={<TratamentoDeCanal />} />
                    <Route path="/clinica-geral-e-prevencao" element={<ClinicaGeralPrevencao />} />
                    
                    {/* Legacy routes - redirects */}
                    <Route path="/services/:slug" element={<ServicesRoute />} />
                    
                    {/* Catch all - redirect to home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </ErrorBoundary>
          </ImageOptimizationProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
