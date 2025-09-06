import React, { useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import ConsultaInicialHeader from '@/components/landing/consulta/ConsultaInicialHeader';
import ConsultaInicialHero from '@/components/landing/consulta/ConsultaInicialHero';
import ClareamentoProblem from '@/components/landing/clareamento/ClareamentoProblem';
import ClareamentoGuide from '@/components/landing/clareamento/ClareamentoGuide';
import ClareamentoCTA from '@/components/landing/clareamento/ClareamentoCTA';
import CriticalCSSInliner from '@/components/performance/CriticalCSSInliner';
import NonCriticalCSSLoader from '@/components/performance/NonCriticalCSSLoader';
import { MobileGTMOptimizer } from '@/components/performance/MobileGTMOptimizer';
import { clareamentoConfig } from '@/config/clareamentoConfig';
import { captureGCLID } from '@/utils/gclid';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import { useMobilePerformanceOptimization } from '@/hooks/useMobilePerformanceOptimization';
import CriticalCSSOptimizer from '@/components/performance/CriticalCSSOptimizer';
import AsyncScriptManager from '@/components/performance/AsyncScriptManager';
import FastServerResponseOptimizer from '@/components/performance/FastServerResponseOptimizer';
import ErrorBoundary from '@/components/performance/ErrorBoundary';
import MobileCriticalCSS from '@/components/performance/MobileCriticalCSS';
import MobileImageOptimizer from '@/components/performance/MobileImageOptimizer';

// Aggressive lazy loading for better LCP performance
const ClareamentoSocialProof = React.lazy(() => 
  import('@/components/landing/clareamento/ClareamentoSocialProof').then(module => ({ 
    default: module.default 
  }))
);
const ClareamentoFAQ = React.lazy(() => 
  import('@/components/landing/clareamento/ClareamentoFAQ').then(module => ({ 
    default: module.default 
  }))
);
const ClareamentoFooter = React.lazy(() => 
  import('@/components/landing/clareamento/ClareamentoFooter').then(module => ({ 
    default: module.default 
  }))
);
const FloatingWhatsApp = React.lazy(() => 
  import('@/components/landing/FloatingWhatsApp').then(module => ({ 
    default: module.default 
  }))
);

// Import skeletons
import SocialProofSkeleton from '@/components/skeleton/SocialProofSkeleton';
import FAQSkeleton from '@/components/skeleton/FAQSkeleton';
import FooterSkeleton from '@/components/skeleton/FooterSkeleton';
import WhatsAppSkeleton from '@/components/skeleton/WhatsAppSkeleton';

const ClareamentoLandingPage: React.FC = () => {
  // Mobile performance optimizations hook
  const { isMobile, optimizationsApplied } = useMobilePerformanceOptimization({
    enableAggressiveOptimization: true,
    deferGTM: true,
    optimizeImages: true,
    reduceAnimations: true
  });

  // Preload critical images optimized for mobile
  useCriticalImagePreload({
    images: [
      { src: '/lovable-uploads/doutora-em-pe-jaleco.webp', width: isMobile ? 480 : 760 }
    ],
    enabled: true
  });

  // Track page view and capture GCLID
  useEffect(() => {
    console.debug('[LP Clareamento] Mounted at', new Date().toISOString());
    // Capture GCLID if present
    captureGCLID();
    
    // Track page view
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: clareamentoConfig.seo.title,
        page_location: window.location.href,
        page_path: '/lp/clareamento-dental',
        campaign: clareamentoConfig.campaign
      });
    }
  }, []);

  // Use optimized scroll tracking
  useScrollTracking({ 
    pagePath: '/lp/clareamento-dental',
    enabled: process.env.NODE_ENV === 'production'
  });

  return (
    <>
      {/* Mobile-optimized GTM loading */}
      <MobileGTMOptimizer 
        gtmId={clareamentoConfig.tracking.gtmId} 
        isMobile={isMobile} 
        delay={isMobile ? 3000 : 1000} 
      />
      
      <Helmet>
        <title>{clareamentoConfig.seo.title}</title>
        <meta name="description" content={clareamentoConfig.seo.description} />
        <meta name="keywords" content={clareamentoConfig.seo.keywords?.join(', ')} />
        <meta name="robots" content="index, follow" />
        
        {/* Mobile-optimized font preloading */}
        <link
          rel="preload"
          href="/fonts/montserrat-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/playfair-display-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Responsive image preloading for mobile */}
        <link 
          rel="preload" 
          as="image" 
          href="/lovable-uploads/doutora-em-pe-jaleco.webp" 
          type="image/webp" 
          fetchPriority="high"
          media={isMobile ? "(max-width: 768px)" : "(min-width: 769px)"}
        />
        
        {/* Optimized resource hints */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//api.whatsapp.com" />
        <link rel="dns-prefetch" href="//web.whatsapp.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content={clareamentoConfig.seo.title} />
        <meta property="og:description" content={clareamentoConfig.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={clareamentoConfig.hero.backgroundImage} />
        
      </Helmet>

      {/* Mobile-first performance optimization components */}
      <MobileCriticalCSS isMobile={isMobile} />
      <MobileImageOptimizer 
        isMobile={isMobile}
        enableLazyLoading={true}
        enableWebPConversion={true}
        enableResponsiveSizes={true}
      />
      <FastServerResponseOptimizer />
      <CriticalCSSOptimizer 
        inlineStyles=""
      />
      <AsyncScriptManager 
        gtmId={clareamentoConfig.tracking.gtmId}
        enableTracking={true}
        loadDelay={isMobile ? 3000 : 2000}
      />
      
      <ErrorBoundary><div className="min-h-screen">
        {/* Header */}
        <ConsultaInicialHeader 
          whatsappNumber={clareamentoConfig.whatsapp.number}
          whatsappMessage={clareamentoConfig.whatsapp.message}
          campaign={clareamentoConfig.campaign}
          messageMatch={clareamentoConfig.messageMatch}
        />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <ConsultaInicialHero
            headline={clareamentoConfig.hero.headline}
            subheadline={clareamentoConfig.hero.subheadline}
            ctaText={clareamentoConfig.hero.ctaText}
            benefits={clareamentoConfig.benefits}
            backgroundImage={clareamentoConfig.hero.backgroundImage!}
            whatsappNumber={clareamentoConfig.whatsapp.number}
            whatsappMessage={clareamentoConfig.whatsapp.message}
          />

          {/* Problem Section */}
          <ClareamentoProblem
            title={clareamentoConfig.problem.title}
            description={clareamentoConfig.problem.description}
            problems={clareamentoConfig.problem.problems}
          />

          {/* Guide Section */}
          <ClareamentoGuide
            title={clareamentoConfig.guide.title}
            subtitle={clareamentoConfig.guide.subtitle}
          />

          {/* Social Proof Section - Lazy Loaded */}
          <Suspense fallback={<SocialProofSkeleton />}>
            <ClareamentoSocialProof
              title={clareamentoConfig.socialProof.title}
              testimonials={clareamentoConfig.socialProof.testimonials}
              stats={clareamentoConfig.socialProof.stats!}
            />
          </Suspense>

          {/* FAQ Section - Lazy Loaded */}
          <Suspense fallback={<FAQSkeleton />}>
            <ClareamentoFAQ
              title={clareamentoConfig.faq.title}
              questions={clareamentoConfig.faq.questions}
            />
          </Suspense>

          {/* CTA Section */}
          <ClareamentoCTA
            title={clareamentoConfig.cta.title}
            subtitle={clareamentoConfig.cta.subtitle}
            buttonText={clareamentoConfig.cta.buttonText}
            urgency={clareamentoConfig.cta.urgency}
            whatsappNumber={clareamentoConfig.whatsapp.number}
            whatsappMessage={clareamentoConfig.whatsapp.message}
          />
        </main>

        {/* Footer - Lazy Loaded */}
        <Suspense fallback={<FooterSkeleton />}>
          <ClareamentoFooter />
        </Suspense>

        {/* Floating WhatsApp - Lazy Loaded */}
        <Suspense fallback={<WhatsAppSkeleton />}>
          <FloatingWhatsApp
            phoneNumber={clareamentoConfig.whatsapp.number}
            message={clareamentoConfig.whatsapp.message}
            campaign={clareamentoConfig.campaign}
            messageMatch={clareamentoConfig.messageMatch}
          />
        </Suspense>

        {/* Load non-critical CSS after initial render - disabled for mobile optimization */}
        <NonCriticalCSSLoader 
          delay={isMobile ? 1000 : 500} 
          enabled={!isMobile} 
        />
      </div></ErrorBoundary>
    </>
  );
};

export default ClareamentoLandingPage;