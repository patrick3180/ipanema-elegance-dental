import React, { useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { facetasResinaDiretaConfig } from '@/config/facetasResinaDiretaConfig';
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { captureGCLID } from '@/utils/gclid';

// Performance components
import CriticalCSSInline from '@/components/performance/CriticalCSSInline';
import ResourceHintsOptimizer from '@/components/performance/ResourceHintsOptimizer';
import SmartContentfulCache from '@/components/performance/SmartContentfulCache';
import CoreWebVitalsMonitor from '@/components/performance/CoreWebVitalsMonitor';
import HeroImagePreloader from '@/components/performance/HeroImagePreloader';
import ErrorBoundary from '@/components/performance/ErrorBoundary';
import LazySection from '@/components/performance/LazySection';

// Critical components (above the fold)
import ConsultaInicialHeader from '@/components/landing/consulta/ConsultaInicialHeader';
import ConsultaInicialHero from '@/components/landing/consulta/ConsultaInicialHero';

// Lazy loaded components (below the fold)
const ConsultaInicialProblem = lazy(() => import('@/components/landing/consulta/ConsultaInicialProblem'));
const ConsultaInicialGuide = lazy(() => import('@/components/landing/consulta/ConsultaInicialGuide'));
const ConsultaInicialSocialProof = lazy(() => import('@/components/landing/consulta/ConsultaInicialSocialProof'));
const ConsultaInicialFAQ = lazy(() => import('@/components/landing/consulta/ConsultaInicialFAQ'));
const ConsultaInicialCTA = lazy(() => import('@/components/landing/consulta/ConsultaInicialCTA'));
const LandingFooter = lazy(() => import('@/components/landing/LandingFooter'));
const FloatingWhatsApp = lazy(() => import('@/components/landing/FloatingWhatsApp'));

const FacetasResinaDiretaLandingPage = () => {
  const pageConfig = facetasResinaDiretaConfig;

  // Performance hooks
  useCriticalImagePreload({ images: [{ src: pageConfig.hero.backgroundImage }] });
  useScrollTracking({ pagePath: '/lp/facetas-resina-ipanema' });

  useEffect(() => {
    captureGCLID();

    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: pageConfig.seo.title,
        page_location: window.location.href,
        campaign: pageConfig.campaign
      });
    }
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Consultório Odontológico Dra. Carla Christoph",
    "description": pageConfig.seo.description,
    "url": "https://dracarlachristoph.com/lp/facetas-resina-ipanema",
    "telephone": "+5521993304045",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107",
      "addressLocality": "Ipanema",
      "addressRegion": "RJ",
      "postalCode": "22410-002",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-22.9866",
      "longitude": "-43.2024"
    },
    "medicalSpecialty": ["Dentistry", "Cosmetic Dentistry"],
    "serviceType": "Facetas de Resina Direta",
    "priceRange": "$$$"
  };

  return (
    <>
      <Helmet>
        <title>{pageConfig.seo.title}</title>
        <meta name="description" content={pageConfig.seo.description} />
        <meta name="keywords" content={pageConfig.seo.keywords?.join(", ")} />
        <meta name="robots" content="noindex, nofollow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content={pageConfig.seo.title} />
        <meta property="og:description" content={pageConfig.seo.description} />
        <meta property="og:url" content="https://dracarlachristoph.com/lp/facetas-resina-ipanema" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageConfig.seo.title} />
        <meta name="twitter:description" content={pageConfig.seo.description} />
        <meta name="twitter:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://dracarlachristoph.com/lp/facetas-resina-ipanema" />

        {/* Preload fonts */}
        <link rel="preload" href="/fonts/montserrat-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/montserrat-500.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/playfair-display-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Critical Image Preload */}
        <link rel="preload" href="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" as="image" type="image/webp" fetchPriority="high" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://api.whatsapp.com" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Performance Optimization Components */}
      <CriticalCSSInline />
      <ResourceHintsOptimizer />
      <SmartContentfulCache />
      <CoreWebVitalsMonitor />
      <HeroImagePreloader
        images={[{
          src: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp',
          type: 'webp',
          priority: true
        }]}
      />

      <ErrorBoundary>
        <ConsultaInicialHeader
          whatsappNumber={pageConfig.whatsapp.number}
          whatsappMessage={pageConfig.whatsapp.message}
          campaign={pageConfig.campaign}
          messageMatch={pageConfig.messageMatch}
        />

        <ConsultaInicialHero
          headline={pageConfig.hero.headline}
          subheadline={pageConfig.hero.subheadline}
          ctaText={pageConfig.hero.ctaText}
          backgroundImage={pageConfig.hero.backgroundImage}
          whatsappNumber={pageConfig.whatsapp.number}
          whatsappMessage={pageConfig.whatsapp.message}
          benefits={pageConfig.benefits}
        />

        <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.1} rootMargin="100px">
          <Suspense fallback={<div className="h-96 bg-gray-50" />}>
            <ConsultaInicialProblem
              title={pageConfig.problem.title}
              description={pageConfig.problem.description}
              problems={pageConfig.problem.problems}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="100px">
          <Suspense fallback={<div className="h-96 bg-white" />}>
            <ConsultaInicialGuide
              title={pageConfig.guide.title}
              subtitle={pageConfig.guide.subtitle}
              steps={pageConfig.guide.steps}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.1} rootMargin="50px">
          <Suspense fallback={<div className="h-96 bg-gray-50" />}>
            <ConsultaInicialSocialProof
              title={pageConfig.socialProof.title}
              testimonials={pageConfig.socialProof.testimonials}
              stats={pageConfig.socialProof.stats}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="50px">
          <Suspense fallback={<div className="h-96 bg-white" />}>
            <ConsultaInicialFAQ
              title={pageConfig.faq.title}
              questions={pageConfig.faq.questions}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-32 bg-[#381F47] animate-pulse" />} threshold={0.1}>
          <Suspense fallback={<div className="h-32 bg-[#381F47]" />}>
            <ConsultaInicialCTA
              title={pageConfig.cta.title}
              subtitle={pageConfig.cta.subtitle}
              buttonText={pageConfig.cta.buttonText}
              whatsappNumber={pageConfig.whatsapp.number}
              whatsappMessage={pageConfig.whatsapp.message}
              campaign={pageConfig.campaign}
              messageMatch={pageConfig.messageMatch}
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
              phoneNumber={pageConfig.whatsapp.number}
              message={pageConfig.whatsapp.message}
              campaign={pageConfig.campaign}
              messageMatch={pageConfig.messageMatch}
            />
          </Suspense>
        </LazySection>
      </ErrorBoundary>
    </>
  );
};

export default FacetasResinaDiretaLandingPage;
