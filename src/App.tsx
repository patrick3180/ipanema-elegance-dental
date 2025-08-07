import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { lazy, Suspense, useEffect } from "react";
import SimpleLCPOptimizer from "@/components/performance/SimpleLCPOptimizer";
import PerformanceMonitor from "@/components/performance/PerformanceMonitor";
import { handlePageRedirects } from "@/utils/urlRedirects";
import { seoMonitor } from "@/utils/seoMonitoring";
import "@/utils/404ErrorHandler";

// Lazy load TODAS as páginas exceto Index para melhor performance
const Index = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const DifferentialsPage = lazy(() => import("./pages/DifferentialsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const GonePage = lazy(() => import("./pages/GonePage"));
const SEODashboardPage = lazy(() => import("./pages/SEODashboardPage"));

// Service pages - lazy load todas
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

// QueryClient otimizado
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000, // 10 minutes
      gcTime: 15 * 60 * 1000, // 15 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading component simples
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-dental-purple">Carregando...</div>
  </div>
);

function AppContent() {
  const location = useLocation();
  
  useEffect(() => {
    // Handle redirects de forma simples
    const redirectResult = handlePageRedirects();
    if (redirectResult.type === 'redirect') {
      seoMonitor.logRedirect(location.pathname, window.location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="App">
      {/* Performance optimization components */}
      <SimpleLCPOptimizer />
      <PerformanceMonitor />
      
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/diferenciais" element={<DifferentialsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contato" element={<ContactPage />} />

          {/* Service Routes */}
          <Route path="/lentes-de-contato-dental-e-facetas-de-porcelana" element={<LentesEFacetas />} />
          <Route path="/clareamento-dental" element={<ClareamentoDental />} />
          <Route path="/protese-dentaria" element={<ProteseDentaria />} />
          <Route path="/implantes-dentarios" element={<ImplantesDentarios />} />
          <Route path="/clinica-geral-e-prevencao" element={<ClinicaGeralPrevencao />} />
          <Route path="/restauracoes-esteticas" element={<RestaureacoesEsteticas />} />
          <Route path="/tratamento-de-canal" element={<TratamentoDeCanal />} />
          <Route path="/saude-da-gengiva" element={<SaudeDaGengiva />} />

          {/* Legal Routes */}
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
          <Route path="/termos-de-uso" element={<TermsOfUse />} />
          <Route path="/gone" element={<GonePage />} />
          <Route path="/seo-dashboard" element={<SEODashboardPage />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      
      <Toaster />
    </div>
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
