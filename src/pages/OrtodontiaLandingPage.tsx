import React, { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { captureGCLID } from '@/utils/gclid';
import { ortodontiaConfig } from '@/config/ortodontiaConfig';
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

const OrtodontiaLandingPage = () => {
  // Critical image preloading for LCP optimization
  useCriticalImagePreload({
    images: [
      { src: '/lovable-uploads/DrBruno_site.webp', width: 1024 }
    ],
    enabled: true
  });

  useEffect(() => {
    // Capture GCLID for conversion tracking
    captureGCLID();
    
    // Minimal GTM loading - defer to avoid blocking
    const loadGTM = () => {
      if (typeof window !== 'undefined' && !window.dataLayer) {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(arguments);
        }
        window.gtag = gtag;
        
        gtag('js', new Date());
        gtag('config', ortodontiaConfig.tracking.gtagId, {
          send_page_view: false
        });

        // Push page_view event
        window.dataLayer.push({
          event: 'page_view',
          page_title: ortodontiaConfig.seo.title,
          page_location: window.location.href,
          page_path: '/lp/ortodontia-ipanema',
          campaign: ortodontiaConfig.campaign,
          ad_group: ortodontiaConfig.messageMatch.adGroup,
          keyword: ortodontiaConfig.messageMatch.keyword
        });
      }
    };

    // Load GTM after interaction or 3 seconds
    const events = ['scroll', 'click', 'touchstart'];
    const loadOnEvent = () => {
      loadGTM();
      events.forEach(event => document.removeEventListener(event, loadOnEvent));
    };
    
    events.forEach(event => document.addEventListener(event, loadOnEvent, { once: true }));
    const timer = setTimeout(loadGTM, 3000);
    
    return () => {
      clearTimeout(timer);
      events.forEach(event => document.removeEventListener(event, loadOnEvent));
    };
  }, []);

  // Production scroll tracking
  useScrollTracking({ 
    pagePath: '/lp/ortodontia-ipanema',
    enabled: process.env.NODE_ENV === 'production'
  });

  return (
    <>
      <GTMManager gtmId={ortodontiaConfig.tracking.gtmId} />
      {/* Optimized SEO Head Tags */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{ortodontiaConfig.seo.title}</title>
        <meta name="description" content={ortodontiaConfig.seo.description} />
        <meta name="keywords" content={ortodontiaConfig.seo.keywords?.join(', ')} />
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
        <meta property="og:url" content="https://dracarlachristoph.com/lp/ortodontia-ipanema" />
        <meta property="og:title" content={ortodontiaConfig.seo.title} />
        <meta property="og:description" content={ortodontiaConfig.seo.description} />
        <meta property="og:image" content="/lovable-uploads/DrBruno_site.webp" />
        <meta property="og:site_name" content="Dra. Carla Christoph" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dracarlachristoph.com/lp/ortodontia-ipanema" />
        <meta property="twitter:title" content={ortodontiaConfig.seo.title} />
        <meta property="twitter:description" content={ortodontiaConfig.seo.description} />
        <meta property="twitter:image" content="/lovable-uploads/DrBruno_site.webp" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Dr. Bruno Neves & Dra. Carla Christoph",
            "description": ortodontiaConfig.seo.description,
            "url": "https://dracarlachristoph.com/lp/ortodontia-ipanema",
            "telephone": "+5521993304045",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107",
              "addressLocality": "Ipanema",
              "addressRegion": "RJ",
              "postalCode": "22410-002",
              "addressCountry": "BR"
            },
            "speciality": ["Ortodontia", "Invisalign", "Aparelho Ortodôntico"],
            "image": "/lovable-uploads/DrBruno_site.webp"
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
          whatsappNumber={ortodontiaConfig.whatsapp.number}
          whatsappMessage={ortodontiaConfig.whatsapp.message}
          campaign={ortodontiaConfig.campaign}
          messageMatch={ortodontiaConfig.messageMatch}
        />
        
        <ConsultaInicialHero
          headline={ortodontiaConfig.hero.headline}
          subheadline={ortodontiaConfig.hero.subheadline}
          ctaText={ortodontiaConfig.hero.ctaText}
          benefits={ortodontiaConfig.benefits}
          backgroundImage={ortodontiaConfig.hero.backgroundImage || ''}
          whatsappNumber={ortodontiaConfig.whatsapp.number}
          whatsappMessage={ortodontiaConfig.whatsapp.message}
        />

        {/* Lazy-loaded Below-the-fold Content with Intersection Observer */}
        <LazySection 
          fallback={<div className="h-96 bg-gray-50 animate-pulse" />}
          threshold={0.1}
          rootMargin="100px"
        >
          <Suspense fallback={<div className="h-96 bg-gray-50" />}>
            <ConsultaInicialProblem
              title={ortodontiaConfig.problem.title}
              description={ortodontiaConfig.problem.description}
              problems={ortodontiaConfig.problem.problems}
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
              title={ortodontiaConfig.guide.title}
              subtitle={ortodontiaConfig.guide.subtitle}
              steps={ortodontiaConfig.guide.steps}
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
              title={ortodontiaConfig.socialProof.title}
              testimonials={ortodontiaConfig.socialProof.testimonials}
              stats={ortodontiaConfig.socialProof.stats}
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
              title={ortodontiaConfig.faq.title}
              questions={ortodontiaConfig.faq.questions}
            />
          </Suspense>
        </LazySection>

        <LazySection 
          fallback={<div className="h-32 bg-[#381F47] animate-pulse" />}
          threshold={0.1}
        >
          <Suspense fallback={<div className="h-32 bg-[#381F47]" />}>
            <ConsultaInicialCTA
              title={ortodontiaConfig.cta.title}
              subtitle={ortodontiaConfig.cta.subtitle}
              buttonText={ortodontiaConfig.cta.buttonText}
              urgency={ortodontiaConfig.cta.urgency}
              whatsappNumber={ortodontiaConfig.whatsapp.number}
              whatsappMessage={ortodontiaConfig.whatsapp.message}
              campaign={ortodontiaConfig.campaign}
              messageMatch={ortodontiaConfig.messageMatch}
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
              phoneNumber={ortodontiaConfig.whatsapp.number}
              message={ortodontiaConfig.whatsapp.message}
              campaign={ortodontiaConfig.campaign}
              messageMatch={ortodontiaConfig.messageMatch}
            />
          </Suspense>
        </LazySection>
      </main>

    </>
  );
};

export default OrtodontiaLandingPage;