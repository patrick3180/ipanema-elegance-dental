import React, { useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { denteQuebradoConfig } from '@/config/denteQuebradoConfig';
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
import LazySection from '@/components/performance/LazySection';
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
const LandingFooter = React.lazy(() => import('@/components/landing/LandingFooter'));
const FloatingWhatsApp = React.lazy(() => import('@/components/landing/FloatingWhatsApp'));

const DenteQuebradoLandingPage: React.FC = () => {
  // Critical images for LCP optimization with fetchpriority="high"
  const criticalImages = [
    {
      src: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp',
      type: 'webp' as const,
      priority: true
    }
  ];

  // Fallback preload for LCP
  useCriticalImagePreload({ images: [{ src: denteQuebradoConfig.hero.backgroundImage }] });

  useEffect(() => {
    // Debug mount
    console.debug('[LP Dente Quebrado] Mounted at', new Date().toISOString());
    // Capture GCLID immediately
    captureGCLID();

    // Push page view event
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',
        page_title: 'Dente Quebrado Urgência - Ipanema',
        page_location: window.location.href,
        campaign: denteQuebradoConfig.campaign
      });
    }

    // GTM is now loaded via index.html - no duplicate loading needed
  }, []);

  // Scroll tracking for production analytics
  useScrollTracking({
    pagePath: '/lp/dente-quebrado-urgencia-ipanema',
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
        <title>{denteQuebradoConfig.seo.title}</title>
        <meta name="description" content={denteQuebradoConfig.seo.description} />
        <meta name="keywords" content={denteQuebradoConfig.seo.keywords.join(', ')} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://dracarlachristoph.com/lp/dente-quebrado-urgencia-ipanema" />

        {/* Open Graph tags */}
        <meta property="og:title" content={denteQuebradoConfig.seo.title} />
        <meta property="og:description" content={denteQuebradoConfig.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/lp/dente-quebrado-urgencia-ipanema" />
        <meta property="og:image" content={`https://dracarlachristoph.com${denteQuebradoConfig.hero.backgroundImage}`} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={denteQuebradoConfig.seo.title} />
        <meta name="twitter:description" content={denteQuebradoConfig.seo.description} />
        <meta name="twitter:image" content={`https://dracarlachristoph.com${denteQuebradoConfig.hero.backgroundImage}`} />

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
            "description": denteQuebradoConfig.seo.description,
            "url": "https://dracarlachristoph.com/lp/dente-quebrado-urgencia-ipanema",
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
            "name": "Restauração Dental de Urgência",
            "description": "Atendimento prioritário para dentes quebrados com restauração estética imediata",
            "procedureType": "Emergency",
            "bodyLocation": "Teeth"
          })}
        </script>
      </Helmet>

      {/* Critical above-the-fold content */}
      <ErrorBoundary>
        <ConsultaInicialHeader
          whatsappNumber={denteQuebradoConfig.whatsapp.number}
          whatsappMessage={denteQuebradoConfig.whatsapp.message}
          campaign={denteQuebradoConfig.campaign}
          messageMatch={denteQuebradoConfig.messageMatch}
        />

        <ConsultaInicialHero
          headline={denteQuebradoConfig.hero.headline}
          subheadline={denteQuebradoConfig.hero.subheadline}
          ctaText={denteQuebradoConfig.hero.ctaText}
          benefits={denteQuebradoConfig.benefits}
          backgroundImage={denteQuebradoConfig.hero.backgroundImage}
          whatsappNumber={denteQuebradoConfig.whatsapp.number}
          whatsappMessage={denteQuebradoConfig.whatsapp.message}
        />

        <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.1} rootMargin="100px">
          <Suspense fallback={<div className="h-96 bg-gray-50" />}>
            <ConsultaInicialProblem
              title={denteQuebradoConfig.problem.title}
              description={denteQuebradoConfig.problem.description}
              problems={denteQuebradoConfig.problem.problems}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="100px">
          <Suspense fallback={<div className="h-96 bg-white" />}>
            <ConsultaInicialGuide
              title={denteQuebradoConfig.guide.title}
              subtitle={denteQuebradoConfig.guide.subtitle}
              steps={denteQuebradoConfig.guide.steps}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.1} rootMargin="50px">
          <Suspense fallback={<div className="h-96 bg-gray-50" />}>
            <ConsultaInicialSocialProof
              title={denteQuebradoConfig.socialProof.title}
              testimonials={denteQuebradoConfig.socialProof.testimonials}
              stats={denteQuebradoConfig.socialProof.stats}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="50px">
          <Suspense fallback={<div className="h-96 bg-white" />}>
            <ConsultaInicialFAQ
              title={denteQuebradoConfig.faq.title}
              questions={denteQuebradoConfig.faq.questions}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-32 bg-[#381F47] animate-pulse" />} threshold={0.1}>
          <Suspense fallback={<div className="h-32 bg-[#381F47]" />}>
            <ConsultaInicialCTA
              title={denteQuebradoConfig.cta.title}
              subtitle={denteQuebradoConfig.cta.subtitle}
              buttonText={denteQuebradoConfig.cta.buttonText}
              whatsappNumber={denteQuebradoConfig.whatsapp.number}
              whatsappMessage={denteQuebradoConfig.whatsapp.message}
              campaign={denteQuebradoConfig.campaign}
              messageMatch={denteQuebradoConfig.messageMatch}
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
              phoneNumber={denteQuebradoConfig.whatsapp.number}
              message={denteQuebradoConfig.whatsapp.message}
              campaign={denteQuebradoConfig.campaign}
              messageMatch={denteQuebradoConfig.messageMatch}
            />
          </Suspense>
        </LazySection>
      </ErrorBoundary>
    </>
  );
};

export default DenteQuebradoLandingPage;
