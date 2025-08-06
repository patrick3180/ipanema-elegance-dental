
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { lazy, useEffect, Suspense } from "react";
import SitemapResponse from "@/components/SitemapResponse";
import RobotsResponse from "@/components/RobotsResponse";

// Phase 1 Emergency Recovery: Minimal imports only

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
const SEODashboardPage = lazy(() => import("./pages/SEODashboardPage"));

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

// Phase 1 Emergency Recovery: Minimal QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const location = useLocation();
  
  // Phase 1 Emergency Recovery: Minimal setup only
  useEffect(() => {
    // Basic document title only
    const titles: Record<string, string> = {
      '/': 'Clinice Odontológica - Cuidado Dental de Excelência',
      '/sobre': 'Sobre Nós - Clinice Odontológica',
      '/servicos': 'Nossos Serviços - Clinice Odontológica',
      '/contato': 'Contato - Clinice Odontológica',
      '/blog': 'Blog - Clinice Odontológica'
    };
    
    document.title = titles[location.pathname] || 'Clinice Odontológica';
  }, [location.pathname]);

  return (
    <div className="App">
      {/* Phase 1 Emergency Recovery: No performance components */}
        
        <Suspense fallback={<div>Loading...</div>}>
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

            {/* Special Routes */}
            <Route path="/gone" element={<GonePage />} />
            <Route path="/seo-dashboard" element={<SEODashboardPage />} />

            {/* Static file routes */}
            <Route path="/sitemap.xml" element={<SitemapResponse />} />
            <Route path="/robots.txt" element={<RobotsResponse />} />

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
