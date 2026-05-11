import React, { Suspense, useEffect, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { lentesPorcelanaProfissionalConfig } from '@/config/lentesPorcelanaProfissionalConfig';

// Performance Components
import CriticalCSSInline from '@/components/performance/CriticalCSSInline';
import ResourceHintsOptimizer from '@/components/performance/ResourceHintsOptimizer';
import NonCriticalCSSLoader from '@/components/performance/NonCriticalCSSLoader';
import SmartContentfulCache from '@/components/performance/SmartContentfulCache';
import CoreWebVitalsMonitor from '@/components/performance/CoreWebVitalsMonitor';
import HeroImagePreloader from '@/components/performance/HeroImagePreloader';
import ErrorBoundary from '@/components/performance/ErrorBoundary';
import LazySection from '@/components/performance/LazySection';

// Critical Above-The-Fold Components (not lazy-loaded)
import ConsultaInicialHeader from '@/components/landing/consulta/ConsultaInicialHeader';
import ConsultaInicialHero from '@/components/landing/consulta/ConsultaInicialHero';

// Lazy-loaded components for below-the-fold content
const ConsultaInicialProblem = lazy(() => import('@/components/landing/consulta/ConsultaInicialProblem'));
const ConsultaInicialGuide = lazy(() => import('@/components/landing/consulta/ConsultaInicialGuide'));
const ConsultaInicialSocialProof = lazy(() => import('@/components/landing/consulta/ConsultaInicialSocialProof'));
const ConsultaInicialFAQ = lazy(() => import('@/components/landing/consulta/ConsultaInicialFAQ'));
const ConsultaInicialCTA = lazy(() => import('@/components/landing/consulta/ConsultaInicialCTA'));
const LandingFooter = lazy(() => import('@/components/landing/LandingFooter'));
const FloatingWhatsApp = lazy(() => import('@/components/landing/FloatingWhatsApp'));

const LentesDeContatoEmPorcelanaProfissionalLandingPage = () => {
  // Critical image preloading for hero
  useCriticalImagePreload({
    images: [
      { src: lentesPorcelanaProfissionalConfig.hero.backgroundImage || '', width: 1920 },
      { src: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp', width: 800 }
    ],
    enabled: true
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const gclid = urlParams.get('gclid');

    if (gclid) {
      localStorage.setItem('gclid', gclid);
      localStorage.setItem('gclid_timestamp', Date.now().toString());
      localStorage.setItem('gclid_page', window.location.pathname);
    }

    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: lentesPorcelanaProfissionalConfig.seo.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
        content_group1: 'Landing Page',
        content_group2: 'Lentes Porcelana',
        custom_parameter_campaign: lentesPorcelanaProfissionalConfig.campaign
      });
    }
  }, []);

  useScrollTracking({
    pagePath: '/lp/lentes-porcelana-profissional-ipanema',
    enabled: process.env.NODE_ENV === 'production'
  });

  return (
    <>
      {/* Performance Optimization Components */}
      <CriticalCSSInline />
      <ResourceHintsOptimizer />
      <NonCriticalCSSLoader />
      <SmartContentfulCache enableBlocking={true} />
      <CoreWebVitalsMonitor />
      <HeroImagePreloader
        images={[
          {
            src: lentesPorcelanaProfissionalConfig.hero.backgroundImage || '',
            type: 'webp',
            priority: true
          }
        ]}
      />

      <Helmet>
        <title>{lentesPorcelanaProfissionalConfig.seo.title}</title>
        <meta name="description" content={lentesPorcelanaProfissionalConfig.seo.description} />
        <meta name="keywords" content={lentesPorcelanaProfissionalConfig.seo.keywords?.join(', ')} />
        <link rel="canonical" href="https://dracarlachristoph.com/lp/lentes-porcelana-profissional-ipanema" />

        <meta property="og:title" content={lentesPorcelanaProfissionalConfig.seo.title} />
        <meta property="og:description" content={lentesPorcelanaProfissionalConfig.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/lp/lentes-porcelana-profissional-ipanema" />
        <meta property="og:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:alt" content="Dra. Carla Christoph - Especialista em Lentes de Contato de Porcelana" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="Dra. Carla Christoph" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={lentesPorcelanaProfissionalConfig.seo.title} />
        <meta name="twitter:description" content={lentesPorcelanaProfissionalConfig.seo.description} />
        <meta name="twitter:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />
        <meta name="twitter:image:alt" content="Dra. Carla Christoph - Especialista em Lentes de Contato de Porcelana" />

        <link rel="dns-prefetch" href="//www.google.com" />
        <link rel="dns-prefetch" href="//api.whatsapp.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link rel="preload" href="/fonts/montserrat-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/montserrat-500.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/playfair-display-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        <link
          rel="preload"
          href={lentesPorcelanaProfissionalConfig.hero.backgroundImage}
          as="image"
          type="image/webp"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Dra. Carla Christoph",
            "description": "Especialista em Lentes de Contato de Porcelana em Ipanema",
            "url": "https://dracarlachristoph.com",
            "telephone": "+5521993304045",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107",
              "addressLocality": "Ipanema",
              "addressRegion": "RJ",
              "postalCode": "22410-901",
              "addressCountry": "BR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-22.9849",
              "longitude": "-43.2003"
            },
            "openingHours": ["Mo-Fr 09:00-19:00"],
            "priceRange": "$$$",
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "-22.9849",
                "longitude": "-43.2003"
              },
              "geoRadius": "30000"
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Lentes de Contato de Porcelana",
            "description": "Estética dental com lentes de contato de porcelana ultrafinas",
            "procedureType": "Estética Dental",
            "bodyLocation": "Dentes",
            "preparation": "Consulta inicial e planejamento digital do sorriso",
            "followup": "Acompanhamento pós-procedimento para garantir adaptação",
            "howPerformed": "Aplicação de lentes de porcelana ultrafinas cimentadas aos dentes",
            "status": "Accepted",
            "category": "Estética"
          })}
        </script>
      </Helmet>

      <ErrorBoundary>
        <ConsultaInicialHeader
          whatsappNumber={lentesPorcelanaProfissionalConfig.whatsapp.number}
          whatsappMessage={lentesPorcelanaProfissionalConfig.whatsapp.message}
          campaign={lentesPorcelanaProfissionalConfig.campaign}
          messageMatch={lentesPorcelanaProfissionalConfig.messageMatch}
        />
        <ConsultaInicialHero
          headline={lentesPorcelanaProfissionalConfig.hero.headline}
          subheadline={lentesPorcelanaProfissionalConfig.hero.subheadline}
          ctaText={lentesPorcelanaProfissionalConfig.hero.ctaText}
          benefits={lentesPorcelanaProfissionalConfig.benefits}
          backgroundImage={lentesPorcelanaProfissionalConfig.hero.backgroundImage || ''}
          whatsappNumber={lentesPorcelanaProfissionalConfig.whatsapp.number}
          whatsappMessage={lentesPorcelanaProfissionalConfig.whatsapp.message}
        />

        <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.1} rootMargin="100px">
          <Suspense fallback={<div className="h-96 bg-gray-50" />}>
            <ConsultaInicialProblem
              title={lentesPorcelanaProfissionalConfig.problem.title}
              description={lentesPorcelanaProfissionalConfig.problem.description}
              problems={lentesPorcelanaProfissionalConfig.problem.problems}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="100px">
          <Suspense fallback={<div className="h-96 bg-white" />}>
            <ConsultaInicialGuide
              title={lentesPorcelanaProfissionalConfig.guide.title}
              subtitle={lentesPorcelanaProfissionalConfig.guide.subtitle}
              steps={lentesPorcelanaProfissionalConfig.guide.steps}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.1} rootMargin="50px">
          <Suspense fallback={<div className="h-96 bg-gray-50" />}>
            <ConsultaInicialSocialProof
              title={lentesPorcelanaProfissionalConfig.socialProof.title}
              testimonials={lentesPorcelanaProfissionalConfig.socialProof.testimonials}
              stats={lentesPorcelanaProfissionalConfig.socialProof.stats}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="50px">
          <Suspense fallback={<div className="h-96 bg-white" />}>
            <ConsultaInicialFAQ
              title={lentesPorcelanaProfissionalConfig.faq.title}
              questions={lentesPorcelanaProfissionalConfig.faq.questions}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-32 bg-[#381F47] animate-pulse" />} threshold={0.1}>
          <Suspense fallback={<div className="h-32 bg-[#381F47]" />}>
            <ConsultaInicialCTA
              title={lentesPorcelanaProfissionalConfig.cta.title}
              subtitle={lentesPorcelanaProfissionalConfig.cta.subtitle}
              buttonText={lentesPorcelanaProfissionalConfig.cta.buttonText}
              urgency={lentesPorcelanaProfissionalConfig.cta.urgency}
              whatsappNumber={lentesPorcelanaProfissionalConfig.whatsapp.number}
              whatsappMessage={lentesPorcelanaProfissionalConfig.whatsapp.message}
              campaign={lentesPorcelanaProfissionalConfig.campaign}
              messageMatch={lentesPorcelanaProfissionalConfig.messageMatch}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-64 bg-[#381F47] animate-pulse" />} threshold={0.1}>
          <Suspense fallback={<div className="h-64 bg-[#381F47]" />}>
            <LandingFooter doctorName="Dra. Carla Christoph" clinicName="Ipanema Elegance Dental" phoneNumber="(21) 99330-4045" />
          </Suspense>
        </LazySection>

        <LazySection fallback={null} threshold={0} rootMargin="0px">
          <Suspense fallback={null}>
            <FloatingWhatsApp
              phoneNumber={lentesPorcelanaProfissionalConfig.whatsapp.number}
              message={lentesPorcelanaProfissionalConfig.whatsapp.message}
              campaign={lentesPorcelanaProfissionalConfig.campaign}
              messageMatch={lentesPorcelanaProfissionalConfig.messageMatch}
            />
          </Suspense>
        </LazySection>
      </ErrorBoundary>
    </>
  );
};

export default LentesDeContatoEmPorcelanaProfissionalLandingPage;
