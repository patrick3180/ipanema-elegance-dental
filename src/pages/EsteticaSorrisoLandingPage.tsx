import React, { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { esteticaSorrisoGenericaConfig } from '@/config/esteticaSorrisoGenericaConfig';
import { GTMManager } from '@/components/performance/GTMManager';
import useScrollTracking from '@/hooks/useScrollTracking';

// Performance Components (critical path only)
import LazySection from '@/components/performance/LazySection';
import ContentfulBlocker from '@/components/performance/ContentfulBlocker';
import ErrorBoundary from '@/components/performance/ErrorBoundary';

// Critical above-the-fold components (EAGER loading — Sprint 4 fix)
// PREVIOUSLY: These were lazy(), causing LCP 7.6s because the hero wouldn't
// render until the chunk was downloaded and parsed.
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

// Sprint 4: Removed SimpleLCPOptimizer, CoreWebVitalsOptimizer, useCriticalImagePreload,
// and 4 skeleton lazy imports (FooterSkeleton, WhatsAppSkeleton, SocialProofSkeleton, FAQSkeleton).
// These added runtime overhead without real benefit — preloading is now handled
// statically via generate-static-meta.cjs at build time.

// Inline critical CSS + animations — matches the pattern from optimized LPs
// This CSS is injected via Helmet so the hero section renders styled immediately,
// without waiting for the full CSS bundle to load.
const criticalStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  .hero-section{min-height:100vh;display:flex;align-items:center;background:#FAF7F2;padding-top:90px;padding-bottom:4rem}
  .hero-content{max-width:1200px;margin:0 auto;padding:0 1rem;display:flex;flex-direction:column;gap:3rem}
  .hero-title{font-size:clamp(1.875rem,5vw,3rem);font-weight:700;line-height:1.2;margin-bottom:1rem;color:#381F47;font-family:serif}
  .hero-subtitle{font-size:clamp(1.125rem,2.5vw,1.25rem);margin-bottom:2rem;color:#333;line-height:1.6}
  .btn-primary{background:#381F47;color:#fff;padding:1rem 2rem;border-radius:.5rem;font-weight:600;transition:all .3s ease;display:inline-flex;align-items:center;gap:.75rem;font-size:1.125rem;border:none;cursor:pointer;box-shadow:0 4px 6px -1px rgba(0,0,0,.1)}
  .header-fixed{position:fixed;top:0;left:0;right:0;z-index:50;background:#fff;box-shadow:0 1px 3px 0 rgba(0,0,0,.1)}
  .hero-image{width:100%;height:auto;border-radius:.5rem;box-shadow:0 20px 25px -5px rgba(0,0,0,.1)}
  @media(min-width:768px){.hero-content{flex-direction:row;align-items:center}}
`;

const EsteticaSorrisoLandingPage = () => {
  const config = esteticaSorrisoGenericaConfig;

  useEffect(() => {
    // Page view tracking
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',
        page_title: config.seo.title,
        page_location: window.location.href,
        page_path: '/lp/estetica-dental-ipanema',
        campaign: config.campaign,
        ad_group: config.messageMatch.adGroup,
        keyword: config.messageMatch.keyword
      });
    }
  }, []);

  // Production scroll tracking
  useScrollTracking({
    pagePath: '/lp/estetica-dental-ipanema',
    enabled: process.env.NODE_ENV === 'production'
  });

  return (
    <>
      <GTMManager gtmId={config.tracking.gtmId} />
      <Helmet>
        {/* Critical CSS inline — zero-latency render */}
        <style>{criticalStyles}</style>

        {/* Primary Meta Tags */}
        <title>{config.seo.title}</title>
        <meta name="description" content={config.seo.description} />
        <meta name="keywords" content={config.seo.keywords?.join(', ')} />
        <meta name="robots" content="noindex, nofollow" />

        {/* Open Graph */}
        <meta property="og:title" content={config.seo.title} />
        <meta property="og:description" content={config.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/lp/estetica-dental-ipanema" />
        <meta property="og:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.seo.title} />
        <meta name="twitter:description" content={config.seo.description} />
        <meta name="twitter:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://dracarlachristoph.com/lp/estetica-dental-ipanema" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "LocalBusiness",
                "@id": "https://dracarlachristoph.com/#dentist",
                "name": "Dra. Carla Christoph - Estética Dental",
                "url": "https://dracarlachristoph.com/lp/estetica-dental-ipanema",
                "telephone": "+5521993304045",
                "priceRange": "$$$",
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
                  "latitude": -22.9868,
                  "longitude": -43.2018
                },
                "openingHours": "Mo-Fr 09:00-19:00",
                "specialty": "Estética Dental"
              },
              {
                "@type": "MedicalProcedure",
                "name": "Estética Dental",
                "description": config.seo.description,
                "procedureType": "Dental Esthetic Procedure"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* CONTENTFUL BLOCKER — Prevent unnecessary API calls (Sprint 4) */}
      <ContentfulBlocker />

      {/* Page Content */}
      <ErrorBoundary>
        <main className="min-h-screen bg-white">
          {/* Critical Above-the-fold Content (EAGER — Sprint 4 fix) */}
          <ConsultaInicialHeader
            whatsappNumber={config.whatsapp.number}
            whatsappMessage={config.whatsapp.message}
            campaign={config.campaign}
            messageMatch={config.messageMatch}
          />

          <ConsultaInicialHero
            headline={config.hero.headline}
            subheadline={config.hero.subheadline}
            ctaText={config.hero.ctaText}
            backgroundImage={config.hero.backgroundImage}
            whatsappNumber={config.whatsapp.number}
            whatsappMessage={config.whatsapp.message}
            benefits={config.benefits}
          />

          {/* Problem Section */}
          <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.05} rootMargin="200px">
            <Suspense fallback={<div className="h-96 bg-gray-50" />}>
              <div className="animate-fade-in-up">
                <ConsultaInicialProblem
                  title={config.problem.title}
                  description={config.problem.description}
                  problems={config.problem.problems}
                />
              </div>
            </Suspense>
          </LazySection>

          {/* Guide Section */}
          <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.05} rootMargin="200px">
            <Suspense fallback={<div className="h-96 bg-white" />}>
              <div className="animate-fade-in-up">
                <ConsultaInicialGuide
                  title={config.guide.title}
                  subtitle={config.guide.subtitle}
                  steps={config.guide.steps}
                />
              </div>
            </Suspense>
          </LazySection>

          {/* Social Proof Section */}
          <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.1} rootMargin="50px">
            <Suspense fallback={<div className="h-96 bg-gray-50" />}>
              <div className="animate-fade-in-up">
                <ConsultaInicialSocialProof
                  title={config.socialProof.title}
                  testimonials={config.socialProof.testimonials}
                  stats={config.socialProof.stats}
                />
              </div>
            </Suspense>
          </LazySection>

          {/* FAQ Section */}
          <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="50px">
            <Suspense fallback={<div className="h-96 bg-white" />}>
              <div className="animate-fade-in-up">
                <ConsultaInicialFAQ
                  title={config.faq.title}
                  questions={config.faq.questions}
                />
              </div>
            </Suspense>
          </LazySection>

          {/* CTA Section */}
          <LazySection fallback={<div className="h-32 bg-[#381F47] animate-pulse" />} threshold={0.1}>
            <Suspense fallback={<div className="h-32 bg-[#381F47]" />}>
              <ConsultaInicialCTA
                title={config.cta.title}
                subtitle={config.cta.subtitle}
                buttonText={config.cta.buttonText}
                urgency={config.cta.urgency}
                whatsappNumber={config.whatsapp.number}
                whatsappMessage={config.whatsapp.message}
                campaign={config.campaign}
                messageMatch={config.messageMatch}
              />
            </Suspense>
          </LazySection>

          {/* Footer */}
          <LazySection fallback={<div className="h-64 bg-[#381F47] animate-pulse" />} threshold={0.1}>
            <Suspense fallback={<div className="h-64 bg-[#381F47]" />}>
              <LandingFooter doctorName="Dra. Carla Christoph" clinicName="Ipanema Elegance Dental" phoneNumber="(21) 99330-4045" />
            </Suspense>
          </LazySection>

          {/* Floating WhatsApp */}
          <LazySection fallback={null} threshold={0} rootMargin="0px">
            <Suspense fallback={null}>
              <FloatingWhatsApp
                phoneNumber={config.whatsapp.number}
                message={config.whatsapp.message}
                campaign={config.campaign}
                messageMatch={config.messageMatch}
              />
            </Suspense>
          </LazySection>
        </main>
      </ErrorBoundary>
    </>
  );
};

export default EsteticaSorrisoLandingPage;