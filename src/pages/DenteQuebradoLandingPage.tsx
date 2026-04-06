import React, { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { captureGCLID } from '@/utils/gclid';
import { denteQuebradoConfig } from '@/config/denteQuebradoConfig';
import { GTMManager } from '@/components/performance/GTMManager';
import useScrollTracking from '@/hooks/useScrollTracking';

// Performance Components (critical path only)
import LazySection from '@/components/performance/LazySection';
import ContentfulBlocker from '@/components/performance/ContentfulBlocker';
import ErrorBoundary from '@/components/performance/ErrorBoundary';

// Critical above-the-fold components (eager loading)
import ConsultaInicialHeader from '@/components/landing/consulta/ConsultaInicialHeader';
import ConsultaInicialHero from '@/components/landing/consulta/ConsultaInicialHero';

// Lazy-loaded components for below-the-fold content
const StatsBar = lazy(() => import('@/components/treatment/StatsBar'));
const ConsultaInicialProblem = lazy(() => import('@/components/landing/consulta/ConsultaInicialProblem'));
const ConsultaInicialDoctorBio = lazy(() => import('@/components/landing/consulta/ConsultaInicialDoctorBio'));
const ConsultaInicialGuide = lazy(() => import('@/components/landing/consulta/ConsultaInicialGuide'));
const ConsultaInicialMidCTA = lazy(() => import('@/components/landing/consulta/ConsultaInicialMidCTA'));
const ConsultaInicialSocialProof = lazy(() => import('@/components/landing/consulta/ConsultaInicialSocialProof'));
const ConsultaInicialFAQ = lazy(() => import('@/components/landing/consulta/ConsultaInicialFAQ'));
const ConsultaInicialCTA = lazy(() => import('@/components/landing/consulta/ConsultaInicialCTA'));
const LandingFooter = lazy(() => import('@/components/landing/LandingFooter'));
const FloatingWhatsApp = lazy(() => import('@/components/landing/FloatingWhatsApp'));

// Inline critical CSS + animations — rendered server-side via Helmet for FCP
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

const DenteQuebradoLandingPage = () => {
  const pageConfig = denteQuebradoConfig;

  useEffect(() => {
    // Capture GCLID for conversion tracking
    captureGCLID();

    // Push page_view event (GTM is loaded via index.html)
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',
        page_title: pageConfig.seo.title,
        page_location: window.location.href,
        page_path: '/lp/dente-quebrado-urgencia-ipanema',
        campaign: pageConfig.campaign,
        ad_group: pageConfig.messageMatch.adGroup,
        keyword: pageConfig.messageMatch.keyword
      });
    }
  }, []);

  // Production scroll tracking
  useScrollTracking({
    pagePath: '/lp/dente-quebrado-urgencia-ipanema',
    enabled: process.env.NODE_ENV === 'production'
  });

  return (
    <>
      <GTMManager gtmId={pageConfig.tracking.gtmId} />
      {/* Optimized SEO Head Tags */}
      <Helmet>
        {/* Critical CSS inline — zero-latency render */}
        <style>{criticalStyles}</style>

        {/* Primary Meta Tags */}
        <title>{pageConfig.seo.title}</title>
        <meta name="description" content={pageConfig.seo.description} />
        <meta name="keywords" content={pageConfig.seo.keywords.join(', ')} />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* Critical Resource Preloads */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
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
        <meta property="og:url" content="https://dracarlachristoph.com/lp/dente-quebrado-urgencia-ipanema" />
        <meta property="og:title" content={pageConfig.seo.title} />
        <meta property="og:description" content={pageConfig.seo.description} />
        <meta property="og:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />
        <meta property="og:site_name" content="Dra. Carla Christoph" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dracarlachristoph.com/lp/dente-quebrado-urgencia-ipanema" />
        <meta property="twitter:title" content={pageConfig.seo.title} />
        <meta property="twitter:description" content={pageConfig.seo.description} />
        <meta property="twitter:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://dracarlachristoph.com/lp/dente-quebrado-urgencia-ipanema" />

        {/* Schema.org structured data — @graph pattern (Dentist + Service + FAQPage) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Dentist",
                "@id": "https://dracarlachristoph.com/#dentist",
                "name": "Dra. Carla Christoph",
                "description": pageConfig.seo.description,
                "url": "https://dracarlachristoph.com",
                "telephone": "+5521993304045",
                "image": "https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp",
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
                  "latitude": -22.9838,
                  "longitude": -43.2045
                },
                "areaServed": {
                  "@type": "City",
                  "name": "Rio de Janeiro"
                },
                "openingHoursSpecification": [
                  { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" }
                ]
              },
              {
                "@type": "Service",
                "@id": "https://dracarlachristoph.com/lp/dente-quebrado-urgencia-ipanema#service",
                "name": "Restauração de Dente Quebrado",
                "description": "Atendimento prioritário para dentes fraturados com restauração estética imediata — resultado natural e funcional",
                "provider": { "@id": "https://dracarlachristoph.com/#dentist" },
                "serviceType": "Emergency Dental Care",
                "areaServed": {
                  "@type": "City",
                  "name": "Rio de Janeiro"
                }
              },
              {
                "@type": "FAQPage",
                "@id": "https://dracarlachristoph.com/lp/dente-quebrado-urgencia-ipanema#faq",
                "mainEntity": pageConfig.faq.questions.map(q => ({
                  "@type": "Question",
                  "name": q.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": q.answer
                  }
                }))
              }
            ]
          })}
        </script>
      </Helmet>

      <ErrorBoundary>
        <ContentfulBlocker />

        {/* Header — fixed top bar (always eager) */}
        <ConsultaInicialHeader
          whatsappNumber={pageConfig.whatsapp.number}
          whatsappMessage={pageConfig.whatsapp.message}
          campaign={pageConfig.campaign}
          messageMatch={pageConfig.messageMatch}
        />

        <main>
          {/* Hero Section — Above-the-fold (always eager) */}
          <ConsultaInicialHero
            headline={pageConfig.hero.headline}
            subheadline={pageConfig.hero.subheadline}
            ctaText={pageConfig.hero.ctaText}
            benefits={pageConfig.benefits}
            backgroundImage={pageConfig.hero.backgroundImage}
            whatsappNumber={pageConfig.whatsapp.number}
            whatsappMessage={pageConfig.whatsapp.message}
          />

          {/* Stats Bar — Authority metrics (lazy, 200px prefetch) */}
          <LazySection fallback={<div className="h-24 bg-[#381F47] animate-pulse" />} threshold={0.1} rootMargin="200px">
            <Suspense fallback={<div className="h-24 bg-[#381F47]" />}>
              <div className="animate-fade-in-up">
                <StatsBar />
              </div>
            </Suspense>
          </LazySection>

          {/* Problem Section — Pain identification (lazy, 200px prefetch) */}
          <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.1} rootMargin="200px">
            <Suspense fallback={<div className="h-96 bg-gray-50" />}>
              <div className="animate-fade-in-up">
                <ConsultaInicialProblem
                  title={pageConfig.problem.title}
                  description={pageConfig.problem.description}
                  problems={pageConfig.problem.problems}
                />
              </div>
            </Suspense>
          </LazySection>

          {/* Doctor Bio — Expertise & credibility (lazy, 200px prefetch) */}
          <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="200px">
            <Suspense fallback={<div className="h-96 bg-white" />}>
              <div className="animate-fade-in-up">
                <ConsultaInicialDoctorBio />
              </div>
            </Suspense>
          </LazySection>

          {/* Guide Section — Step-by-step process (lazy, 200px prefetch) */}
          <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="200px">
            <Suspense fallback={<div className="h-96 bg-white" />}>
              <div className="animate-fade-in-up">
                <ConsultaInicialGuide
                  title={pageConfig.guide.title}
                  subtitle={pageConfig.guide.subtitle}
                  steps={pageConfig.guide.steps}
                />
              </div>
            </Suspense>
          </LazySection>

          {/* Mid CTA — Reinforcement conversion point (lazy, 200px prefetch) */}
          <LazySection fallback={<div className="h-48 bg-[#381F47] animate-pulse" />} threshold={0.1} rootMargin="200px">
            <Suspense fallback={<div className="h-48 bg-[#381F47]" />}>
              <div className="animate-fade-in-up">
                <ConsultaInicialMidCTA
                  whatsappNumber={pageConfig.whatsapp.number}
                  whatsappMessage={pageConfig.whatsapp.message}
                  campaign={pageConfig.campaign}
                  messageMatch={pageConfig.messageMatch}
                />
              </div>
            </Suspense>
          </LazySection>

          {/* Social Proof — Testimonials + stats (lazy, 200px prefetch) */}
          <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.1} rootMargin="200px">
            <Suspense fallback={<div className="h-96 bg-gray-50" />}>
              <div className="animate-fade-in-up">
                <ConsultaInicialSocialProof
                  title={pageConfig.socialProof.title}
                  testimonials={pageConfig.socialProof.testimonials}
                  stats={pageConfig.socialProof.stats}
                />
              </div>
            </Suspense>
          </LazySection>

          {/* FAQ Section — Common questions (lazy, 200px prefetch) */}
          <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="200px">
            <Suspense fallback={<div className="h-96 bg-white" />}>
              <div className="animate-fade-in-up">
                <ConsultaInicialFAQ
                  title={pageConfig.faq.title}
                  questions={pageConfig.faq.questions}
                />
              </div>
            </Suspense>
          </LazySection>

          {/* Final CTA — Closing conversion (lazy, 200px prefetch) */}
          <LazySection fallback={<div className="h-32 bg-[#381F47] animate-pulse" />} threshold={0.1} rootMargin="200px">
            <Suspense fallback={<div className="h-32 bg-[#381F47]" />}>
              <div className="animate-fade-in-up">
                <ConsultaInicialCTA
                  title={pageConfig.cta.title}
                  subtitle={pageConfig.cta.subtitle}
                  buttonText={pageConfig.cta.buttonText}
                  urgency={pageConfig.cta.urgency}
                  whatsappNumber={pageConfig.whatsapp.number}
                  whatsappMessage={pageConfig.whatsapp.message}
                  campaign={pageConfig.campaign}
                  messageMatch={pageConfig.messageMatch}
                />
              </div>
            </Suspense>
          </LazySection>

          {/* Footer (lazy) */}
          <LazySection fallback={<div className="h-64 bg-[#381F47] animate-pulse" />} threshold={0.1}>
            <Suspense fallback={<div className="h-64 bg-[#381F47]" />}>
              <LandingFooter doctorName="Dra. Carla Christoph" clinicName="Ipanema Elegance Dental" phoneNumber="(21) 99330-4045" />
            </Suspense>
          </LazySection>
        </main>

        {/* Floating WhatsApp Button */}
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

export default DenteQuebradoLandingPage;
