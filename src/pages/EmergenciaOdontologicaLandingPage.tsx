import React, { useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { emergenciaOdontologicaConfig } from '@/config/emergenciaOdontologicaConfig';
import { captureGCLID } from '@/utils/gclid';
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import CriticalCSSInline from '@/components/performance/CriticalCSSInline';
import ResourceHintsOptimizer from '@/components/performance/ResourceHintsOptimizer';
import NonCriticalCSSLoader from '@/components/performance/NonCriticalCSSLoader';
import SmartContentfulCache from '@/components/performance/SmartContentfulCache';
import CoreWebVitalsMonitor from '@/components/performance/CoreWebVitalsMonitor';
import HeroImagePreloader from '@/components/performance/HeroImagePreloader';
import ErrorBoundary from '@/components/performance/ErrorBoundary';
import { GTMManager } from '@/components/performance/GTMManager';

// Critical components (loaded immediately)
import ConsultaInicialHeader from '@/components/landing/consulta/ConsultaInicialHeader';
import ConsultaInicialHero from '@/components/landing/consulta/ConsultaInicialHero';

// Lazy loaded components
const ConsultaInicialProblem = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialProblem'));
const ConsultaInicialGuide = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialGuide'));
const ConsultaInicialSocialProof = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialSocialProof'));
const ConsultaInicialFAQ = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialFAQ'));
const ConsultaInicialCTA = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialCTA'));
const ClareamentoFooter = React.lazy(() => import('@/components/landing/clareamento/ClareamentoFooter'));
const FloatingWhatsApp = React.lazy(() => import('@/components/landing/FloatingWhatsApp'));

const EmergenciaOdontologicaLandingPage: React.FC = () => {
  // Critical images for LCP optimization with fetchpriority="high"
  const criticalImages = [
    {
      src: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp',
      type: 'webp' as const,
      priority: true
    }
  ];

  // Fallback preload for LCP
  useCriticalImagePreload({ images: [{ src: emergenciaOdontologicaConfig.hero.backgroundImage }] });

  useEffect(() => {
    // Debug mount
    console.debug('[LP Emergência Odontológica] Mounted at', new Date().toISOString());
    // Capture GCLID immediately
    captureGCLID();

    // Push page view event
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',
        page_title: 'Emergência Odontológica - Ipanema',
        page_location: window.location.href,
        campaign: emergenciaOdontologicaConfig.campaign
      });
    }

    // GTM is now loaded via index.html - no duplicate loading needed
  }, []);

  // Scroll tracking for production analytics
  useScrollTracking({ 
    pagePath: '/lp/emergencia-odontologica-ipanema', 
    enabled: process.env.NODE_ENV === 'production' 
  });

  return (
    <>
      {/* Critical performance optimizations */}
      <CriticalCSSInline />
      <ResourceHintsOptimizer />
      <SmartContentfulCache enableBlocking={true} />
      <CoreWebVitalsMonitor enabled={true} />
      <HeroImagePreloader images={criticalImages} />
      
      <Helmet>
        <title>{emergenciaOdontologicaConfig.seo.title}</title>
        <meta name="description" content={emergenciaOdontologicaConfig.seo.description} />
        <meta name="keywords" content={emergenciaOdontologicaConfig.seo.keywords.join(', ')} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://dracarlachristoph.com/lp/emergencia-odontologica-ipanema" />

        {/* Open Graph tags */}
        <meta property="og:title" content={emergenciaOdontologicaConfig.seo.title} />
        <meta property="og:description" content={emergenciaOdontologicaConfig.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/lp/emergencia-odontologica-ipanema" />
        <meta property="og:image" content={`https://dracarlachristoph.com${emergenciaOdontologicaConfig.hero.backgroundImage}`} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={emergenciaOdontologicaConfig.seo.title} />
        <meta name="twitter:description" content={emergenciaOdontologicaConfig.seo.description} />
        <meta name="twitter:image" content={`https://dracarlachristoph.com${emergenciaOdontologicaConfig.hero.backgroundImage}`} />

        {/* Preload critical fonts com display=swap */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" 
          as="style" 
          onLoad={(e: any) => { 
            e.target.rel = 'stylesheet'; 
            e.target.onload = null; 
          }}
        />

        {/* Preload critical hero images com fetchpriority="high" */}
        <link 
          rel="preload" 
          href="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
          as="image" 
          type="image/webp"
          fetchPriority="high"
        />

        {/* Preload self-hosted critical fonts */}
        <link 
          rel="preload" 
          href="/fonts/montserrat-400.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/fonts/montserrat-500.woff2" 
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

        {/* DNS Prefetch and Preconnect optimizations */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//wa.me" />
        <link rel="dns-prefetch" href="//www.bing.com" />
        <link rel="dns-prefetch" href="//cdn.contentful.com" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.bing.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.contentful.com" crossOrigin="anonymous" />

        {/* Structured Data - Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Dra. Carla Christoph",
            "description": emergenciaOdontologicaConfig.seo.description,
            "url": "https://dracarlachristoph.com/lp/emergencia-odontologica-ipanema",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107",
              "addressLocality": "Ipanema",
              "addressRegion": "RJ",
              "postalCode": "22410-002",
              "addressCountry": "BR"
            },
            "telephone": "+5521993304045",
            "priceRange": "$$",
            "areaServed": "Rio de Janeiro"
          })}
        </script>

        {/* Structured Data - Medical Procedure */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Atendimento de Emergência Odontológica",
            "description": "Atendimento prioritário para emergências odontológicas diversas com resolução imediata",
            "procedureType": "Emergency",
            "bodyLocation": "Teeth"
          })}
        </script>
      </Helmet>

      {/* Critical above-the-fold content */}
      <ErrorBoundary>
      <ConsultaInicialHeader
        whatsappNumber={emergenciaOdontologicaConfig.whatsapp.number}
        whatsappMessage={emergenciaOdontologicaConfig.whatsapp.message}
        campaign={emergenciaOdontologicaConfig.campaign}
        messageMatch={emergenciaOdontologicaConfig.messageMatch}
      />

      <ConsultaInicialHero
        headline={emergenciaOdontologicaConfig.hero.headline}
        subheadline={emergenciaOdontologicaConfig.hero.subheadline}
        ctaText={emergenciaOdontologicaConfig.hero.ctaText}
        benefits={emergenciaOdontologicaConfig.benefits}
        backgroundImage={emergenciaOdontologicaConfig.hero.backgroundImage}
        whatsappNumber={emergenciaOdontologicaConfig.whatsapp.number}
        whatsappMessage={emergenciaOdontologicaConfig.whatsapp.message}
      />

      {/* Problem section */}
      <div className="min-h-screen">
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialProblem
            title={emergenciaOdontologicaConfig.problem.title}
            description={emergenciaOdontologicaConfig.problem.description}
            problems={emergenciaOdontologicaConfig.problem.problems}
          />
        </Suspense>
      </div>

      {/* Guide section */}
      <div className="min-h-screen">
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialGuide
            title={emergenciaOdontologicaConfig.guide.title}
            subtitle={emergenciaOdontologicaConfig.guide.subtitle}
            steps={emergenciaOdontologicaConfig.guide.steps}
          />
        </Suspense>
      </div>

      {/* Social Proof section */}
      <div className="min-h-screen">
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialSocialProof
            title={emergenciaOdontologicaConfig.socialProof.title}
            testimonials={emergenciaOdontologicaConfig.socialProof.testimonials}
            stats={emergenciaOdontologicaConfig.socialProof.stats}
          />
        </Suspense>
      </div>

      {/* FAQ section */}
      <div className="min-h-screen">
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialFAQ
            title={emergenciaOdontologicaConfig.faq.title}
            questions={emergenciaOdontologicaConfig.faq.questions}
          />
        </Suspense>
      </div>

      {/* CTA section */}
      <div className="min-h-screen">
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialCTA
            title={emergenciaOdontologicaConfig.cta.title}
            subtitle={emergenciaOdontologicaConfig.cta.subtitle}
            buttonText={emergenciaOdontologicaConfig.cta.buttonText}
            whatsappNumber={emergenciaOdontologicaConfig.whatsapp.number}
            whatsappMessage={emergenciaOdontologicaConfig.whatsapp.message}
            campaign={emergenciaOdontologicaConfig.campaign}
            messageMatch={emergenciaOdontologicaConfig.messageMatch}
          />
        </Suspense>
      </div>

      <div>
        <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse" />}>
          <ClareamentoFooter />
        </Suspense>
      </div>

      <div>
        <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse" />}>
          <FloatingWhatsApp
            phoneNumber={emergenciaOdontologicaConfig.whatsapp.number}
            message={emergenciaOdontologicaConfig.whatsapp.message}
            campaign={emergenciaOdontologicaConfig.campaign}
            messageMatch={emergenciaOdontologicaConfig.messageMatch}
          />
        </Suspense>
      </div>
      </ErrorBoundary>
    </>
  );
};

export default EmergenciaOdontologicaLandingPage;