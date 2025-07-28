
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { lazy, useEffect } from "react";
import ErrorBoundary from "@/components/performance/ErrorBoundary";
import PerformanceMonitor from "@/components/performance/PerformanceMonitor";
import ResourcePreloader from "@/components/performance/ResourcePreloader";
import LazyRouteWrapper from "@/components/performance/LazyRouteWrapper";
import { useResourceOptimization } from "@/hooks/useResourceOptimization";
import SitemapUpdater from "@/components/SitemapUpdater";
import { handlePageRedirects } from "@/utils/urlRedirects";
import { seoMonitor } from "@/utils/seoMonitoring";

// Lazy load components for better code splitting
const Index = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const DifferentialsPage = lazy(() => import("./pages/DifferentialsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const GonePage = lazy(() => import("./pages/GonePage"));

// Service pages
const LentesEFacetas = lazy(() => import("./pages/LentesEFacetas"));
const ClareamentoDental = lazy(() => import("./pages/ClareamentoDental"));
const ProteseDentaria = lazy(() => import("./pages/ProteseDentaria"));
const ImplantesDentarios = lazy(() => import("./pages/ImplantesDentarios"));
const ClinicaGeralPrevencao = lazy(() => import("./pages/ClinicaGeralPrevencao"));
const RestaureacoesEsteticas = lazy(() => import("./pages/RestaureacoesEsteticas"));
const TratamentoDeCanal = lazy(() => import("./pages/TratamentoDeCanal"));
const SaudeDaGengiva = lazy(() => import("./pages/SaudeDaGengiva"));

// Legal pages
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));

// Create a single QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Critical resources to preload
const criticalResources = [
  {
    href: '/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.png',
    as: 'image' as const
  },
  {
    href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap',
    as: 'style' as const
  }
];

function AppContent() {
  const location = useLocation();
  
  // Initialize resource optimization
  useResourceOptimization({
    enableImageOptimization: true,
    enableFontOptimization: true,
    enableScriptOptimization: true,
    enablePrefetching: true
  });
  
  // Handle URL redirects and SEO monitoring
  useEffect(() => {
    const redirectResult = handlePageRedirects();
    
    if (redirectResult.type === 'redirect') {
      seoMonitor.logRedirect(location.pathname, window.location.pathname);
    } else if (redirectResult.type === 'gone') {
      seoMonitor.logGone(location.pathname);
    }
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <div className="App">
        <ResourcePreloader resources={criticalResources} />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <LazyRouteWrapper minHeight="100vh">
                <Index />
              </LazyRouteWrapper>
            } 
          />
          <Route 
            path="/sobre" 
            element={
              <LazyRouteWrapper>
                <AboutPage />
              </LazyRouteWrapper>
            } 
          />
          <Route 
            path="/servicos" 
            element={
              <LazyRouteWrapper>
                <ServicesPage />
              </LazyRouteWrapper>
            } 
          />
          <Route 
            path="/diferenciais" 
            element={
              <LazyRouteWrapper>
                <DifferentialsPage />
              </LazyRouteWrapper>
            } 
          />
          <Route 
            path="/blog" 
            element={
              <LazyRouteWrapper>
                <BlogPage />
              </LazyRouteWrapper>
            } 
          />
          <Route 
            path="/blog/:slug" 
            element={
              <LazyRouteWrapper>
                <BlogPost />
              </LazyRouteWrapper>
            } 
          />
          <Route 
            path="/contato" 
            element={
              <LazyRouteWrapper>
                <ContactPage />
              </LazyRouteWrapper>
            } 
          />

          {/* Service Routes */}
          <Route 
            path="/lentes-de-contato-dental-e-facetas-de-porcelana" 
            element={
              <LazyRouteWrapper>
                <LentesEFacetas />
              </LazyRouteWrapper>
            } 
          />
          <Route 
            path="/clareamento-dental" 
            element={
              <LazyRouteWrapper>
                <ClareamentoDental />
              </LazyRouteWrapper>
            } 
          />
          <Route 
            path="/protese-dentaria" 
            element={
              <LazyRouteWrapper>
                <ProteseDentaria />
              </LazyRouteWrapper>
            } 
          />
          <Route 
            path="/implantes-dentarios" 
            element={
              <LazyRouteWrapper>
                <ImplantesDentarios />
              </LazyRouteWrapper>
            } 
          />
          <Route 
            path="/clinica-geral-e-prevencao" 
            element={
              <LazyRouteWrapper>
                <ClinicaGeralPrevencao />
              </LazyRouteWrapper>
            } 
          />
          <Route 
            path="/restauracoes-esteticas" 
            element={
              <LazyRouteWrapper>
                <RestaureacoesEsteticas />
              </LazyRouteWrapper>
            } 
          />
          <Route 
            path="/tratamento-de-canal" 
            element={
              <LazyRouteWrapper>
                <TratamentoDeCanal />
              </LazyRouteWrapper>
            } 
          />
          <Route 
            path="/saude-da-gengiva" 
            element={
              <LazyRouteWrapper>
                <SaudeDaGengiva />
              </LazyRouteWrapper>
            } 
          />

          {/* Legal Routes */}
          <Route 
            path="/politica-de-privacidade" 
            element={
              <LazyRouteWrapper>
                <PrivacyPolicy />
              </LazyRouteWrapper>
            } 
          />
          <Route 
            path="/termos-de-uso" 
            element={
              <LazyRouteWrapper>
                <TermsOfUse />
              </LazyRouteWrapper>
            } 
          />

          {/* 410 Gone Route */}
          <Route 
            path="/gone" 
            element={
              <LazyRouteWrapper>
                <GonePage />
              </LazyRouteWrapper>
            } 
          />

          {/* 404 Route */}
          <Route 
            path="*" 
            element={
              <LazyRouteWrapper>
                <NotFound />
              </LazyRouteWrapper>
            } 
          />
        </Routes>
        
        <Toaster />
        <PerformanceMonitor />
        <SitemapUpdater />
      </div>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
