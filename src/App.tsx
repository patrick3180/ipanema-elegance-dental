import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlogLayout from "@/layouts/BlogLayout";

// COMPONENTES DE PERFORMANCE - CRÍTICOS
import ContentfulBlockerForNonBlogPages from '@/components/performance/ContentfulBlockerForNonBlogPages';


// SEO - Schema.org markup global
import GlobalSchemas from '@/components/seo/GlobalSchemas';

// Páginas principais
const Index = lazy(() => import("./pages/Index"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

// Landing pages - TODAS ATIVAS
const LimpezaDentalLandingPage = lazy(() => import("./pages/LimpezaDentalLandingPage"));
const ProfilaxiaLandingPage = lazy(() => import("./pages/ProfilaxiaLandingPage"));
const EsteticaSorrisoLandingPage = lazy(() => import("./pages/EsteticaSorrisoLandingPage"));
const SaudeGengivalLandingPage = lazy(() => import("./pages/SaudeGengivalLandingPage"));
const ClareamentoLandingPage = lazy(() => import("./pages/ClareamentoLandingPage"));
const ConsultaInicialLandingPage = lazy(() => import("./pages/ConsultaInicialLandingPage"));
const OrtodontiaLandingPage = lazy(() => import("./pages/OrtodontiaLandingPage"));
const DorDeDenteLandingPage = lazy(() => import("./pages/DorDeDenteLandingPage"));
const DenteQuebradoLandingPage = lazy(() => import("./pages/DenteQuebradoLandingPage"));
const EmergenciaOdontologicaLandingPage = lazy(() => import("./pages/EmergenciaOdontologicaLandingPage"));
const EspecialistaProteseLandingPage = lazy(() => import("./pages/EspecialistaProteseLandingPage"));
const ImplantesDentariosLandingPage = lazy(() => import("./pages/ImplantesDentariosLandingPage"));
const LPLentesPorcelana = lazy(() => import("./pages/LPLentesPorcelana"));
const LentesDeContatoEmPorcelanaProfissionalLandingPage = lazy(() => import("./pages/LentesDeContatoEmPorcelanaProfissionalLandingPage"));
const FacetasResinaDiretaLandingPage = lazy(() => import("./pages/FacetasResinaDiretaLandingPage"));

// Service pages - TODAS AS PÁGINAS DE TRATAMENTO
const SaudeDaGengiva = lazy(() => import("./pages/SaudeDaGengiva"));
const ClareamentoDental = lazy(() => import("./pages/ClareamentoDental"));
const ImplantesDentarios = lazy(() => import("./pages/ImplantesDentarios"));
const LentesEFacetas = lazy(() => import("./pages/LentesEFacetas"));
const ProteseDentaria = lazy(() => import("./pages/ProteseDentaria"));
const RestaureacoesEsteticas = lazy(() => import("./pages/RestaureacoesEsteticas"));
const TratamentoDeCanal = lazy(() => import("./pages/TratamentoDeCanal"));
const ClinicaGeralPrevencao = lazy(() => import("./pages/ClinicaGeralPrevencao"));
const Ortodontia = lazy(() => import("./pages/Ortodontia"));
const GonePage = lazy(() => import("./pages/GonePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// English micro-site pages
const EnHomePage = lazy(() => import("./pages/en/EnHomePage"));
const EnAboutPage = lazy(() => import("./pages/en/EnAboutPage"));
const EnContactPage = lazy(() => import("./pages/en/EnContactPage"));
const EnDentalImplantsPage = lazy(() => import("./pages/en/EnDentalImplantsPage"));
const EnPorcelainVeneersPage = lazy(() => import("./pages/en/EnPorcelainVeneersPage"));
const EnGeneralDentistryPage = lazy(() => import("./pages/en/EnGeneralDentistryPage"));
const EnDentalEmergencyPage = lazy(() => import("./pages/en/EnDentalEmergencyPage"));

// English landing pages (Google Ads)
const EnCosmeticDentistryLP = lazy(() => import("./pages/en/EnCosmeticDentistryLP"));

// Loading fallback component
const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-dental-beige">
    <div className="text-center space-y-4">
      <Skeleton className="h-8 w-48 mx-auto" />
      <Skeleton className="h-4 w-32 mx-auto" />
    </div>
  </div>
);

// QueryClient global - necessário para BlogPreview na homepage e blog pages
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      {/* SEO - Global Schema.org markup for Organization + LocalBusiness */}
      <GlobalSchemas />

      <TooltipProvider>
        <BrowserRouter>
          {/* BLOQUEADORES DE PERFORMANCE - ORDEM IMPORTA! */}
          <ContentfulBlockerForNonBlogPages />


          <Toaster />
          <Sonner />

          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              {/* Rotas principais */}
              <Route path="/" element={<Index />} />
              <Route path="/servicos" element={<ServicesPage />} />

              {/* Blog routes with React Query scoped */}
              <Route element={<BlogLayout />}>
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
              </Route>

              {/* Landing pages - TODAS ATIVAS */}
              <Route path="/lp/limpeza-dental-ipanema" element={<LimpezaDentalLandingPage />} />
              <Route path="/lp/profilaxia-dental-ipanema" element={<Navigate to="/lp/limpeza-dental-ipanema" replace />} />
              <Route path="/lp/estetica-dental-ipanema" element={<EsteticaSorrisoLandingPage />} />
              <Route path="/lp/saude-gengival-ipanema" element={<SaudeGengivalLandingPage />} />
              <Route path="/lp/clareamento-dental" element={<ClareamentoLandingPage />} />
              <Route path="/lp/consulta-inicial" element={<ConsultaInicialLandingPage />} />
              <Route path="/lp/ortodontia-ipanema" element={<OrtodontiaLandingPage />} />
              <Route path="/lp/dor-de-dente-urgencia-ipanema" element={<DorDeDenteLandingPage />} />
              <Route path="/lp/dente-quebrado-urgencia-ipanema" element={<DenteQuebradoLandingPage />} />
              <Route path="/lp/emergencia-odontologica-ipanema" element={<EmergenciaOdontologicaLandingPage />} />
              <Route path="/lp/especialista-protese-ipanema" element={<EspecialistaProteseLandingPage />} />
              <Route path="/lp/implantes-dentarios-ipanema" element={<ImplantesDentariosLandingPage />} />
              <Route path="/lp/lentes-porcelana-ipanema" element={<LPLentesPorcelana />} />
              <Route path="/lp/lentes-profissional-ipanema" element={<LentesDeContatoEmPorcelanaProfissionalLandingPage />} />
              <Route path="/lp/facetas-resina-ipanema" element={<FacetasResinaDiretaLandingPage />} />

              {/* Service pages - TODAS AS PÁGINAS DE TRATAMENTO */}
              <Route path="/saude-da-gengiva" element={<SaudeDaGengiva />} />
              <Route path="/clareamento-dental" element={<ClareamentoDental />} />
              <Route path="/implantes-dentarios" element={<ImplantesDentarios />} />
              <Route path="/lentes-de-contato-dental-e-facetas-de-resina" element={<LentesEFacetas />} />
              {/* Redirect from old URL to new one */}
              <Route path="/lentes-de-contato-dental-e-facetas-de-porcelana" element={<Navigate to="/lentes-de-contato-dental-e-facetas-de-resina" replace />} />
              <Route path="/protese-dentaria" element={<ProteseDentaria />} />
              <Route path="/restauracoes-esteticas" element={<RestaureacoesEsteticas />} />
              <Route path="/tratamento-de-canal" element={<TratamentoDeCanal />} />
              <Route path="/clinica-geral-e-prevencao" element={<ClinicaGeralPrevencao />} />
              <Route path="/ortodontia" element={<Ortodontia />} />

              {/* Rotas temporárias - redirecionam para home */}
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/contato" element={<ContactPage />} />

              {/* English micro-site */}
              <Route path="/en" element={<EnHomePage />} />
              <Route path="/en/about" element={<EnAboutPage />} />
              <Route path="/en/contact" element={<EnContactPage />} />
              <Route path="/en/dental-implants" element={<EnDentalImplantsPage />} />
              <Route path="/en/porcelain-veneers" element={<EnPorcelainVeneersPage />} />
              <Route path="/en/general-dentistry" element={<EnGeneralDentistryPage />} />
              <Route path="/en/dental-emergency" element={<EnDentalEmergencyPage />} />

              {/* English landing pages (Google Ads — noindex) */}
              <Route path="/en/lp/cosmetic-dentistry" element={<EnCosmeticDentistryLP />} />

              <Route path="/diferenciais" element={<Navigate to="/" replace />} />

              {/* Gone page for 410 redirects */}
              <Route path="/gone" element={<GonePage />} />

              {/* Catch all - 404 page */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;