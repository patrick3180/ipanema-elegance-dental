
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
import SEOHealthMonitor from "@/components/SEOHealthMonitor";
import SitemapResponse from "@/components/SitemapResponse";
import RobotsResponse from "@/components/RobotsResponse";
import { CrawlerOptimizer } from "@/components/performance/CrawlerOptimizer";
import CoreWebVitalsOptimizer from "@/components/performance/CoreWebVitalsOptimizer";
import PerformanceOptimizationSummary from "@/components/performance/PerformanceOptimizationSummary";
import { SEOSitemapManager } from "@/components/SEOSitemapManager";
import CriticalResourceLoader from "@/components/performance/CriticalResourceLoader";
import AdvancedImageOptimizer from "@/components/performance/AdvancedImageOptimizer";
import BundleOptimizer from "@/components/performance/BundleOptimizer";
import ContentfulOptimizer from "@/components/performance/ContentfulOptimizer";
import CriticalCSSExtractor from "@/components/performance/CriticalCSSExtractor";
import PerformanceManager from "@/components/performance/PerformanceManager";
import ContentfulCacheOptimizer from "@/components/performance/ContentfulCacheOptimizer";
import LCPOptimizer from "@/components/performance/LCPOptimizer";
import ServerResponseOptimizer from "@/components/performance/ServerResponseOptimizer";
import SEOMonitoringDashboard from "@/components/SEOMonitoringDashboard";
import { handlePageRedirects } from "@/utils/urlRedirects";
import { seoMonitor } from "@/utils/seoMonitoring";
import "@/utils/404ErrorHandler"; // Initialize 404 error tracking
import { ImageOptimizationProvider } from "@/components/performance/ImageOptimizationProvider";

// Performance components
import ImagePreloader from "@/components/performance/ImagePreloader";
import CriticalCSSLoader from "@/components/performance/CriticalCSSLoader";
import PerformanceMetricsMonitor from "@/components/performance/PerformanceMetricsMonitor";
import IntelligentPreloader from "@/components/performance/IntelligentPreloader";
import LazyScriptLoader from "@/components/performance/LazyScriptLoader";

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
    type: 'preconnect' as const,
    href: 'https://fonts.googleapis.com',
  },
  {
    type: 'preconnect' as const,
    href: 'https://fonts.gstatic.com',
    crossorigin: 'anonymous' as const,
  },
  {
    type: 'preload' as const,
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    as: 'style' as const,
    crossorigin: 'anonymous' as const,
  },
  {
    type: 'preconnect' as const,
    href: 'https://images.ctfassets.net',
  },
  {
    type: 'dns-prefetch' as const,
    href: 'https://cdn.contentful.com',
  },
];

// Critical images to preload with optimized dimensions
const criticalImages = [
  { src: '/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.png', width: 420 }, // Hero image
  { src: '/lovable-uploads/164bae76-428b-4fae-a600-ba61172b5dac.png', width: 600 }, // About section
  { src: '/lovable-uploads/fef24f70-4659-453e-8fee-79dee34b6220.png', width: 600 }, // About page
  { src: '/lovable-uploads/b1c1cbdb-bde0-4d9e-912e-74cf74cf716d.png', width: 600 }  // About page main
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
    // Initialize middleware on route change
    const initializeMiddleware = async () => {
      try {
        const { handleRequestMiddleware } = await import('@/middleware/redirectMiddleware');
        handleRequestMiddleware();
      } catch (error) {
        console.error('Error initializing middleware:', error);
      }
    };

    // Handle page redirects
    const redirectResult = handlePageRedirects();
    
    if (redirectResult.type === 'redirect') {
      seoMonitor.logRedirect(location.pathname, window.location.pathname);
    } else if (redirectResult.type === 'gone') {
      seoMonitor.logGone(location.pathname);
    }

    // Initialize middleware after redirect handling
    initializeMiddleware();
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <div className="App">
        {/* Conservative performance optimization components - Phase 1: Disabled aggressive optimizers */}
        <CriticalResourceLoader resources={criticalResources} enableServiceWorker={false} />
        <AdvancedImageOptimizer 
          enableWebP={true} 
          enableAVIF={false}
          lazyLoadThreshold={0.1}
          qualitySettings={{
            mobile: 75,
            desktop: 85,
            retina: 90
          }}
        />
        <ContentfulOptimizer 
          enablePrefetching={false}
          enableCaching={true}
          batchRequests={false}
        />
        <ContentfulCacheOptimizer 
          enableAggressiveCaching={false} 
          enableRequestBatching={false} 
          cacheStrategy="network-first" 
        />
        {/* Temporarily disabled: <LCPOptimizer targetLCP={2500} enableEmergencyMode={true} /> */}
        {/* Temporarily disabled: <ServerResponseOptimizer 
          targetTTFB={200} 
          enableRequestOptimization={true} 
          enableConnectionOptimization={true} 
        /> */}
        <BundleOptimizer 
          enableCodeSplitting={true}
          enableTreeShaking={true}
          chunkStrategy="feature"
        />
        <CriticalCSSExtractor 
          enableInlineCSS={true}
          enableAsyncCSS={true}
          criticalViewportHeight={1080}
        />
        <LCPOptimizer targetLCP={2500} />
        <CriticalCSSLoader />
        <PerformanceMetricsMonitor enableLogging={true} />
        <IntelligentPreloader 
          enableHoverPreload={true}
          enableViewportPreload={true}
        />
        {/* Temporarily disabled: <PerformanceManager enableCompleteOptimization={true} /> */}
        {/* Critical images now handled by ImageOptimizationProvider */}
        {/* <CriticalCSSLoader /> */}
        {/* <LazyScriptLoader /> */}
        
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

          {/* SEO Dashboard - Development/Admin Route */}
          <Route 
            path="/seo-dashboard" 
            element={
              <LazyRouteWrapper>
                <SEODashboardPage />
              </LazyRouteWrapper>
            } 
          />

          {/* Dynamic SEO Routes */}
          <Route path="/sitemap.xml" element={<SitemapResponse />} />
          <Route path="/robots.txt" element={<RobotsResponse />} />

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
        {/* <SEOHealthMonitor /> */}
        <SitemapUpdater />
        <SEOSitemapManager />
        <CrawlerOptimizer />
        <CoreWebVitalsOptimizer />
        <PerformanceOptimizationSummary />
        {/* <SEOMonitoringDashboard /> */}
      </div>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ImageOptimizationProvider
        criticalImages={criticalImages}
        config={{
          enablePreloading: true,
          quality: 85,
          defaultWidth: 800,
          defaultHeight: 600,
        }}
      >
        <Router>
          <AppContent />
        </Router>
      </ImageOptimizationProvider>
    </QueryClientProvider>
  );
}

export default App;
