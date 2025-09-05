import React, { useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import ConsultaInicialHeader from '@/components/landing/consulta/ConsultaInicialHeader';
import ConsultaInicialHero from '@/components/landing/consulta/ConsultaInicialHero';
import ClareamentoProblem from '@/components/landing/clareamento/ClareamentoProblem';
import ClareamentoGuide from '@/components/landing/clareamento/ClareamentoGuide';
import ClareamentoCTA from '@/components/landing/clareamento/ClareamentoCTA';
import CriticalCSSInliner from '@/components/performance/CriticalCSSInliner';
import NonCriticalCSSLoader from '@/components/performance/NonCriticalCSSLoader';
import { GTMManager } from '@/components/performance/GTMManager';
import { clareamentoConfig } from '@/config/clareamentoConfig';
import { captureGCLID } from '@/utils/gclid';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import CriticalCSSOptimizer from '@/components/performance/CriticalCSSOptimizer';
import AsyncScriptManager from '@/components/performance/AsyncScriptManager';
import FastServerResponseOptimizer from '@/components/performance/FastServerResponseOptimizer';
import ErrorBoundary from '@/components/performance/ErrorBoundary';

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
  // Preload critical images optimized for the new image
  useCriticalImagePreload({
    images: [
      { src: '/lovable-uploads/doutora-em-pe-jaleco.webp', width: 760 }
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
      <GTMManager gtmId={clareamentoConfig.tracking.gtmId} />
      <Helmet>
        <title>{clareamentoConfig.seo.title}</title>
        <meta name="description" content={clareamentoConfig.seo.description} />
        <meta name="keywords" content={clareamentoConfig.seo.keywords?.join(', ')} />
        <meta name="robots" content="index, follow" />
        
        {/* Single critical font preload */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        
        {/* Preload critical WebP hero image with highest priority */}
        <link rel="preload" as="image" href="/lovable-uploads/doutora-em-pe-jaleco.webp" type="image/webp" fetchPriority="high" />
        
        {/* DNS prefetch and preconnect for external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//api.whatsapp.com" />
        <link rel="dns-prefetch" href="//web.whatsapp.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        
        {/* Font CSS with font-display: swap */}
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
            font-family: 'Playfair Display';
            font-display: swap;
            font-weight: 400 700;
            src: url('https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          @font-face {
            font-family: 'Montserrat';
            font-display: swap;
            font-weight: 300 700;
            src: url('https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Uw-.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
        ` }} />
        
        {/* Non-critical resources loading is handled globally */}
        
        {/* Open Graph */}
        <meta property="og:title" content={clareamentoConfig.seo.title} />
        <meta property="og:description" content={clareamentoConfig.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={clareamentoConfig.hero.backgroundImage} />
        
      </Helmet>

      {/* Performance optimization components */}
      <FastServerResponseOptimizer />
      <CriticalCSSOptimizer 
        inlineStyles=""
      />
      <AsyncScriptManager 
        gtmId={clareamentoConfig.tracking.gtmId}
        enableTracking={true}
        loadDelay={2000}
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

        {/* Load non-critical CSS after initial render */}
        <NonCriticalCSSLoader 
          delay={500} 
          enabled={false} 
        />
      </div></ErrorBoundary>
    </>
  );
};

export default ClareamentoLandingPage;