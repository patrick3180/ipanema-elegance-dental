import React, { useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import ConsultaInicialHeader from '@/components/landing/consulta/ConsultaInicialHeader';
import ConsultaInicialHero from '@/components/landing/consulta/ConsultaInicialHero';
import ConsultaInicialProblem from '@/components/landing/consulta/ConsultaInicialProblem';
import ConsultaInicialGuide from '@/components/landing/consulta/ConsultaInicialGuide';
import ConsultaInicialCTA from '@/components/landing/consulta/ConsultaInicialCTA';
import CriticalCSSInliner from '@/components/performance/CriticalCSSInliner';
import NonCriticalCSSLoader from '@/components/performance/NonCriticalCSSLoader';
import { GTMManager } from '@/components/performance/GTMManager';
import { implantesDentariosConfig } from '@/config/implantesDentariosConfig';
import { captureGCLID } from '@/utils/gclid';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import CriticalCSSOptimizer from '@/components/performance/CriticalCSSOptimizer';
import AsyncScriptManager from '@/components/performance/AsyncScriptManager';
import FastServerResponseOptimizer from '@/components/performance/FastServerResponseOptimizer';
import ErrorBoundary from '@/components/performance/ErrorBoundary';
import LazySection from '@/components/performance/LazySection';

// Aggressive lazy loading for better LCP performance
const ConsultaInicialSocialProof = React.lazy(() =>
  import('@/components/landing/consulta/ConsultaInicialSocialProof').then(module => ({
    default: module.default
  }))
);
const ConsultaInicialFAQ = React.lazy(() =>
  import('@/components/landing/consulta/ConsultaInicialFAQ').then(module => ({
    default: module.default
  }))
);
const LandingFooter = React.lazy(() => import('@/components/landing/LandingFooter'));
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

const ImplantesDentariosLandingPage: React.FC = () => {
  // Preload critical images with AVIF priority
  useCriticalImagePreload({
    images: [
      { src: '/lovable-uploads/vertical-de-jaleco-1024.avif', width: 1024 },
      { src: '/lovable-uploads/vertical-de-jaleco-768.avif', width: 768 },
      { src: '/lovable-uploads/vertical-de-jaleco-480.avif', width: 480 }
    ],
    enabled: true
  });

  // Track page view and capture GCLID
  useEffect(() => {
    console.debug('[LP Implantes Dentários] Mounted at', new Date().toISOString());
    // Capture GCLID if present
    captureGCLID();

    // Track page view
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: implantesDentariosConfig.seo.title,
        page_location: window.location.href,
        page_path: '/lp/implantes-dentarios-ipanema',
        campaign: implantesDentariosConfig.campaign
      });
    }
  }, []);

  // Use optimized scroll tracking
  useScrollTracking({
    pagePath: '/lp/implantes-dentarios-ipanema',
    enabled: process.env.NODE_ENV === 'production'
  });

  return (
    <>
      <GTMManager gtmId={implantesDentariosConfig.tracking.gtmId} />
      <Helmet>
        <title>{implantesDentariosConfig.seo.title}</title>
        <meta name="description" content={implantesDentariosConfig.seo.description} />
        <meta name="keywords" content={implantesDentariosConfig.seo.keywords?.join(', ')} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://dracarlachristoph.com/lp/implantes-dentarios-ipanema" />

        {/* Single critical font preload */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Minimal critical CSS for LCP optimization */}
        <style>{`
          /* Essential above-the-fold styles only */
          .bg-\\[\\#CFCBB4\\]{background-color:#CFCBB4}
          .text-\\[\\#381F47\\]{color:#381F47}
          .bg-\\[\\#381F47\\]{background-color:#381F47}
          .hover\\:bg-\\[\\#2d1738\\]:hover{background-color:#2d1738}
          .pt-\\[90px\\]{padding-top:90px}
          .font-serif{font-family:'Playfair Display',Georgia,serif}
          .font-sans{font-family:'Montserrat',system-ui,sans-serif}
          .critical-hero{min-height:100vh;display:flex;align-items:center}
          .critical-image{aspect-ratio:400/600;object-fit:cover}
          .flex{display:flex}.items-center{align-items:center}
          .text-white{color:#fff}.w-full{width:100%}
          .transition-all{transition:all 0.3s cubic-bezier(0.4,0,0.2,1)}
        `}</style>

        {/* Preload critical AVIF hero image with highest priority */}
        <link rel="preload" as="image" href="/lovable-uploads/vertical-de-jaleco-1024.avif" type="image/avif" fetchPriority="high" />

        {/* DNS prefetch and preconnect for external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//api.whatsapp.com" />
        <link rel="dns-prefetch" href="//web.whatsapp.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Font CSS with font-display: swap */}
        <style dangerouslySetInnerHTML={{
          __html: `
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

        {/* Open Graph */}
        <meta property="og:title" content={implantesDentariosConfig.seo.title} />
        <meta property="og:description" content={implantesDentariosConfig.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/lp/implantes-dentarios-ipanema" />
        <meta property="og:image" content={implantesDentariosConfig.hero.backgroundImage} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "Dra. Carla Christoph - Implantes Dentários",
            "description": implantesDentariosConfig.seo.description,
            "url": "https://dracarlachristoph.com/lp/implantes-dentarios-ipanema",
            "telephone": "+5521993304045",
            "medicalSpecialty": "Implantologia",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107",
              "addressLocality": "Ipanema",
              "addressRegion": "RJ",
              "postalCode": "22410-002",
              "addressCountry": "BR"
            },
            "offers": {
              "@type": "MedicalService",
              "name": "Implantes Dentários",
              "category": "Implantologia"
            }
          })
        }} />

      </Helmet>

      {/* Performance optimization components */}
      <FastServerResponseOptimizer />
      <CriticalCSSOptimizer
        inlineStyles=""
      />
      <AsyncScriptManager
        gtmId={implantesDentariosConfig.tracking.gtmId}
        enableTracking={true}
        loadDelay={2000}
      />

      <ErrorBoundary><div className="min-h-screen">
        {/* Header */}
        <ConsultaInicialHeader
          whatsappNumber={implantesDentariosConfig.whatsapp.number}
          whatsappMessage={implantesDentariosConfig.whatsapp.message}
          campaign={implantesDentariosConfig.campaign}
          messageMatch={implantesDentariosConfig.messageMatch}
        />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <ConsultaInicialHero
            headline={implantesDentariosConfig.hero.headline}
            subheadline={implantesDentariosConfig.hero.subheadline}
            ctaText={implantesDentariosConfig.hero.ctaText}
            benefits={implantesDentariosConfig.benefits}
            backgroundImage={implantesDentariosConfig.hero.backgroundImage!}
            whatsappNumber={implantesDentariosConfig.whatsapp.number}
            whatsappMessage={implantesDentariosConfig.whatsapp.message}
          />

          {/* Problem Section */}
          <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.1} rootMargin="100px">
            <ConsultaInicialProblem
              title={implantesDentariosConfig.problem.title}
              description={implantesDentariosConfig.problem.description}
              problems={implantesDentariosConfig.problem.problems}
            />
          </LazySection>

          {/* Guide Section */}
          <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="100px">
            <ConsultaInicialGuide
              title={implantesDentariosConfig.guide.title}
              subtitle={implantesDentariosConfig.guide.subtitle}
              steps={implantesDentariosConfig.guide.steps}
            />
          </LazySection>

          {/* Social Proof Section - Lazy Loaded */}
          <LazySection fallback={<SocialProofSkeleton />} threshold={0.1} rootMargin="50px">
            <Suspense fallback={<SocialProofSkeleton />}>
              <ConsultaInicialSocialProof
                title={implantesDentariosConfig.socialProof.title}
                testimonials={implantesDentariosConfig.socialProof.testimonials}
                stats={implantesDentariosConfig.socialProof.stats!}
              />
            </Suspense>
          </LazySection>

          {/* FAQ Section - Lazy Loaded */}
          <LazySection fallback={<FAQSkeleton />} threshold={0.1} rootMargin="50px">
            <Suspense fallback={<FAQSkeleton />}>
              <ConsultaInicialFAQ
                title={implantesDentariosConfig.faq.title}
                questions={implantesDentariosConfig.faq.questions}
              />
            </Suspense>
          </LazySection>

          {/* CTA Section */}
          <LazySection fallback={<div className="h-32 bg-[#381F47] animate-pulse" />} threshold={0.1}>
            <ConsultaInicialCTA
              title={implantesDentariosConfig.cta.title}
              subtitle={implantesDentariosConfig.cta.subtitle}
              buttonText={implantesDentariosConfig.cta.buttonText}
              whatsappNumber={implantesDentariosConfig.whatsapp.number}
              whatsappMessage={implantesDentariosConfig.whatsapp.message}
              campaign={implantesDentariosConfig.campaign}
              messageMatch={implantesDentariosConfig.messageMatch}
            />
          </LazySection>
        </main>

        {/* Footer - Lazy Loaded */}
        <LazySection fallback={<FooterSkeleton />} threshold={0.1}>
          <Suspense fallback={<FooterSkeleton />}>
            <LandingFooter doctorName="Dra. Carla Christoph" clinicName="Ipanema Elegance Dental" phoneNumber="(21) 99330-4045" />
          </Suspense>
        </LazySection>

        {/* Floating WhatsApp - Lazy Loaded */}
        <LazySection fallback={null} threshold={0} rootMargin="0px">
          <Suspense fallback={null}>
            <FloatingWhatsApp
              phoneNumber={implantesDentariosConfig.whatsapp.number}
              message={implantesDentariosConfig.whatsapp.message}
              campaign={implantesDentariosConfig.campaign}
              messageMatch={implantesDentariosConfig.messageMatch}
            />
          </Suspense>
        </LazySection>

        {/* Load non-critical CSS after initial render */}
        <NonCriticalCSSLoader
          delay={500}
          enabled={false}
        />
      </div></ErrorBoundary>
    </>
  );
};

export default ImplantesDentariosLandingPage;