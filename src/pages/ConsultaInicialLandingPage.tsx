import React, { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { captureGCLID } from '@/utils/gclid';
import { consultaInicialConfig } from '@/config/consultaInicialConfig';
import { GTMManager } from '@/components/performance/GTMManager';
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import useScrollTracking from '@/hooks/useScrollTracking';

// Performance Components (critical path)
import CriticalCSSInline from '@/components/performance/CriticalCSSInline';
import LazySection from '@/components/performance/LazySection';
import ContentfulBlocker from '@/components/performance/ContentfulBlocker';

// Critical above-the-fold components (eager loading)
import ConsultaInicialHeader from '@/components/landing/consulta/ConsultaInicialHeader';
import ConsultaInicialHero from '@/components/landing/consulta/ConsultaInicialHero';

// Lazy-loaded components for below-the-fold content
const ConsultaInicialProblem = lazy(() => import('@/components/landing/consulta/ConsultaInicialProblem'));
const ConsultaInicialGuide = lazy(() => import('@/components/landing/consulta/ConsultaInicialGuide'));
const ConsultaInicialSocialProof = lazy(() => import('@/components/landing/consulta/ConsultaInicialSocialProof'));
const ConsultaInicialFAQ = lazy(() => import('@/components/landing/consulta/ConsultaInicialFAQ'));
const ConsultaInicialCTA = lazy(() => import('@/components/landing/consulta/ConsultaInicialCTA'));
const ClareamentoFooter = lazy(() => import('@/components/landing/clareamento/ClareamentoFooter'));
const FloatingWhatsApp = lazy(() => import('@/components/landing/FloatingWhatsApp'));

const ConsultaInicialLandingPage = () => {
  // Critical image preloading for LCP optimization
  useCriticalImagePreload({
    images: [
      { src: '/lovable-uploads/RIT08058-vertical-doutora-site.webp', width: 1024 }
    ],
    enabled: true
  });

  useEffect(() => {
    // Capture GCLID for conversion tracking
    captureGCLID();
    
    // Push page_view event (GTM is loaded via index.html)
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',
        page_title: consultaInicialConfig.seo.title,
        page_location: window.location.href,
        page_path: '/lp/consulta-inicial',
        campaign: consultaInicialConfig.campaign,
        ad_group: consultaInicialConfig.messageMatch.adGroup,
        keyword: consultaInicialConfig.messageMatch.keyword
      });
    }
  }, []);

  // Production scroll tracking
  useScrollTracking({ 
    pagePath: '/lp/consulta-inicial',
    enabled: process.env.NODE_ENV === 'production'
  });

  return (
    <>
      <GTMManager gtmId={consultaInicialConfig.tracking.gtmId} />
      {/* Optimized SEO Head Tags */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{consultaInicialConfig.seo.title}</title>
        <meta name="description" content={consultaInicialConfig.seo.description} />
        <meta name="keywords" content={consultaInicialConfig.seo.keywords?.join(', ')} />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* Critical Resource Preloads - Only essentials */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//api.whatsapp.com" />

        {/* Optimized font loading - load asynchronously */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          media="print"
          onLoad={(e: any) => { e.target.media = 'all'; }}
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/lp/consulta-inicial" />
        <meta property="og:title" content={consultaInicialConfig.seo.title} />
        <meta property="og:description" content={consultaInicialConfig.seo.description} />
        <meta property="og:image" content="/lovable-uploads/RIT08058-vertical-doutora-site.webp" />
        <meta property="og:site_name" content="Dra. Carla Christoph" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dracarlachristoph.com/lp/consulta-inicial" />
        <meta property="twitter:title" content={consultaInicialConfig.seo.title} />
        <meta property="twitter:description" content={consultaInicialConfig.seo.description} />
        <meta property="twitter:image" content="/lovable-uploads/RIT08058-vertical-doutora-site.webp" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Dra. Carla Christoph",
            "description": consultaInicialConfig.seo.description,
            "url": "https://dracarlachristoph.com/lp/consulta-inicial",
            "telephone": "+5521993304045",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107",
              "addressLocality": "Ipanema",
              "addressRegion": "RJ",
              "postalCode": "22410-002",
              "addressCountry": "BR"
            },
            "speciality": ["Prótese Dental", "Implantodontia", "Consulta Odontológica"],
            "image": "/lovable-uploads/RIT08058-vertical-doutora-site.webp"
          })}
        </script>
      </Helmet>

      {/* EMERGENCY PERFORMANCE OPTIMIZATIONS */}
      <CriticalCSSInline />
      <ContentfulBlocker />

      {/* Page Content */}
      <main className="min-h-screen bg-white">
        {/* Critical Above-the-fold Content */}
        <ConsultaInicialHeader 
          whatsappNumber={consultaInicialConfig.whatsapp.number}
          whatsappMessage={consultaInicialConfig.whatsapp.message}
          campaign={consultaInicialConfig.campaign}
          messageMatch={consultaInicialConfig.messageMatch}
        />
        
        <ConsultaInicialHero
          headline={consultaInicialConfig.hero.headline}
          subheadline={consultaInicialConfig.hero.subheadline}
          ctaText={consultaInicialConfig.hero.ctaText}
          benefits={consultaInicialConfig.benefits}
          backgroundImage={consultaInicialConfig.hero.backgroundImage || ''}
          whatsappNumber={consultaInicialConfig.whatsapp.number}
          whatsappMessage={consultaInicialConfig.whatsapp.message}
        />

        {/* Lazy-loaded Below-the-fold Content with Intersection Observer */}
        <LazySection 
          fallback={<div className="h-96 bg-gray-50 animate-pulse" />}
          threshold={0.1}
          rootMargin="100px"
        >
          <Suspense fallback={<div className="h-96 bg-gray-50" />}>
            <ConsultaInicialProblem
              title={consultaInicialConfig.problem.title}
              description={consultaInicialConfig.problem.description}
              problems={consultaInicialConfig.problem.problems}
            />
          </Suspense>
        </LazySection>

        <LazySection 
          fallback={<div className="h-96 bg-white animate-pulse" />}
          threshold={0.1}
          rootMargin="100px"
        >
          <Suspense fallback={<div className="h-96 bg-white" />}>
            <ConsultaInicialGuide
              title={consultaInicialConfig.guide.title}
              subtitle={consultaInicialConfig.guide.subtitle}
              steps={consultaInicialConfig.guide.steps}
            />
          </Suspense>
        </LazySection>

        <LazySection 
          fallback={<div className="h-96 bg-gray-50 animate-pulse" />}
          threshold={0.1}
          rootMargin="50px"
        >
          <Suspense fallback={<div className="h-96 bg-gray-50" />}>
            <ConsultaInicialSocialProof
              title={consultaInicialConfig.socialProof.title}
              testimonials={consultaInicialConfig.socialProof.testimonials}
              stats={consultaInicialConfig.socialProof.stats}
            />
          </Suspense>
        </LazySection>

        <LazySection 
          fallback={<div className="h-96 bg-white animate-pulse" />}
          threshold={0.1}
          rootMargin="50px"
        >
          <Suspense fallback={<div className="h-96 bg-white" />}>
            <ConsultaInicialFAQ
              title={consultaInicialConfig.faq.title}
              questions={consultaInicialConfig.faq.questions}
            />
          </Suspense>
        </LazySection>

        <LazySection 
          fallback={<div className="h-32 bg-[#381F47] animate-pulse" />}
          threshold={0.1}
        >
          <Suspense fallback={<div className="h-32 bg-[#381F47]" />}>
            <ConsultaInicialCTA
              title={consultaInicialConfig.cta.title}
              subtitle={consultaInicialConfig.cta.subtitle}
              buttonText={consultaInicialConfig.cta.buttonText}
              urgency={consultaInicialConfig.cta.urgency}
              whatsappNumber={consultaInicialConfig.whatsapp.number}
              whatsappMessage={consultaInicialConfig.whatsapp.message}
              campaign={consultaInicialConfig.campaign}
              messageMatch={consultaInicialConfig.messageMatch}
            />
          </Suspense>
        </LazySection>

        <LazySection 
          fallback={<div className="h-64 bg-[#381F47] animate-pulse" />}
          threshold={0.1}
        >
          <Suspense fallback={<div className="h-64 bg-[#381F47]" />}>
            <ClareamentoFooter />
          </Suspense>
        </LazySection>

        {/* Mobile Floating WhatsApp - Load after user interaction */}
        <LazySection 
          fallback={null}
          threshold={0}
          rootMargin="0px"
        >
          <Suspense fallback={null}>
            <FloatingWhatsApp
              phoneNumber={consultaInicialConfig.whatsapp.number}
              message={consultaInicialConfig.whatsapp.message}
              campaign={consultaInicialConfig.campaign}
              messageMatch={consultaInicialConfig.messageMatch}
            />
          </Suspense>
        </LazySection>
      </main>

    </>
  );
};

export default ConsultaInicialLandingPage;