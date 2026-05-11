import React, { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { captureGCLID } from '@/utils/gclid';
import { clareamentoConfig } from '@/config/clareamentoConfig';
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

const ClareamentoLandingPage: React.FC = () => {
  const pageConfig = clareamentoConfig;

  useEffect(() => {
    // Capture GCLID for conversion tracking
    captureGCLID();

    // Push page_view event
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',
        page_title: pageConfig.seo.title,
        page_location: window.location.href,
        page_path: '/lp/clareamento-dental',
        campaign: pageConfig.campaign,
        ad_group: pageConfig.messageMatch.adGroup,
        keyword: pageConfig.messageMatch.keyword
      });
    }
  }, []);

  // Production scroll tracking
  useScrollTracking({
    pagePath: '/lp/clareamento-dental',
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
        <meta name="keywords" content={pageConfig.seo.keywords?.join(', ')} />
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
        <meta property="og:url" content="https://dracarlachristoph.com/lp/clareamento-dental" />
        <meta property="og:title" content={pageConfig.seo.title} />
        <meta property="og:description" content={pageConfig.seo.description} />
        <meta property="og:image" content="https://dracarlachristoph.com/lovable-uploads/doutora-em-pe-jaleco.webp" />
        <meta property="og:site_name" content="Dra. Carla Christoph" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dracarlachristoph.com/lp/clareamento-dental" />
        <meta property="twitter:title" content={pageConfig.seo.title} />
        <meta property="twitter:description" content={pageConfig.seo.description} />
        <meta property="twitter:image" content="https://dracarlachristoph.com/lovable-uploads/doutora-em-pe-jaleco.webp" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://dracarlachristoph.com/lp/clareamento-dental" />

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
                "url": "https://dracarlachristoph.com/lp/clareamento-dental",
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
                  "latitude": "-22.9866",
                  "longitude": "-43.2024"
                },
                "speciality": ["Prótese Dental", "Implantodontia", "Estética Dental"],
                "image": "https://dracarlachristoph.com/lovable-uploads/doutora-em-pe-jaleco.webp"
              },
              {
                "@type": "Service",
                "name": "Clareamento Dental",
                "description": "Clareamento dental seguro e eficaz com protocolos individualizados — consultório e caseiro supervisionado. Resultado natural, com aparência preservada.",
                "provider": {
                  "@id": "https://dracarlachristoph.com/#dentist"
                },
                "areaServed": {
                  "@type": "City",
                  "name": "Rio de Janeiro"
                },
                "serviceType": "Cosmetic Dentistry"
              },
              {
                "@type": "FAQPage",
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

      {/* CONTENTFUL BLOCKER — Prevent unnecessary API calls */}
      <ContentfulBlocker />

      {/* Page Content */}
      <ErrorBoundary>
        <main className="min-h-screen bg-white">
          {/* Critical Above-the-fold Content */}
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
            benefits={pageConfig.benefits}
            backgroundImage={pageConfig.hero.backgroundImage}
            whatsappNumber={pageConfig.whatsapp.number}
            whatsappMessage={pageConfig.whatsapp.message}
          />

          {/* StatsBar - Authority signal (lazy loaded, just below fold) */}
          <LazySection
            fallback={<div className="h-20 bg-[#FAF7F2]" />}
            threshold={0}
            rootMargin="200px"
          >
            <Suspense fallback={<div className="h-20 bg-[#FAF7F2]" />}>
              <StatsBar />
            </Suspense>
          </LazySection>

          {/* Empathetic Problem Section */}
          <LazySection
            fallback={<div className="h-96 bg-white animate-pulse" />}
            threshold={0.05}
            rootMargin="200px"
          >
            <Suspense fallback={<div className="h-96 bg-white" />}>
              <div className="animate-fade-in-up">
                <ConsultaInicialProblem
                  title={pageConfig.problem.title}
                  description={pageConfig.problem.description}
                  problems={pageConfig.problem.problems}
                />
              </div>
            </Suspense>
          </LazySection>

          {/* Doctor Bio - Authority & Trust */}
          <LazySection
            fallback={<div className="h-64 bg-white animate-pulse" />}
            threshold={0.05}
            rootMargin="200px"
          >
            <Suspense fallback={<div className="h-64 bg-white" />}>
              <div className="animate-fade-in-up">
                <ConsultaInicialDoctorBio />
              </div>
            </Suspense>
          </LazySection>

          {/* Guide Section */}
          <LazySection
            fallback={<div className="h-96 bg-white animate-pulse" />}
            threshold={0.05}
            rootMargin="200px"
          >
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

          {/* Mid-page CTA - Between guide and social proof */}
          <LazySection
            fallback={<div className="h-32 animate-pulse" />}
            threshold={0.1}
            rootMargin="50px"
          >
            <Suspense fallback={<div className="h-32" />}>
              <ConsultaInicialMidCTA
                whatsappNumber={pageConfig.whatsapp.number}
                whatsappMessage={pageConfig.whatsapp.message}
                ctaLabel="Agendar Minha Consulta de Clareamento"
                eventLabel="Mid CTA Button - Clareamento"
                webhookSource="mid_cta_button_clareamento"
              />
            </Suspense>
          </LazySection>

          {/* Social Proof Section */}
          <LazySection
            fallback={<div className="h-96 bg-gray-50 animate-pulse" />}
            threshold={0.1}
            rootMargin="50px"
          >
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

          {/* FAQ Section */}
          <LazySection
            fallback={<div className="h-96 bg-white animate-pulse" />}
            threshold={0.1}
            rootMargin="50px"
          >
            <Suspense fallback={<div className="h-96 bg-white" />}>
              <div className="animate-fade-in-up">
                <ConsultaInicialFAQ
                  title={pageConfig.faq.title}
                  questions={pageConfig.faq.questions}
                />
              </div>
            </Suspense>
          </LazySection>

          {/* Final CTA Section */}
          <LazySection
            fallback={<div className="h-32 bg-[#381F47] animate-pulse" />}
            threshold={0.1}
          >
            <Suspense fallback={<div className="h-32 bg-[#381F47]" />}>
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
            </Suspense>
          </LazySection>

          <LazySection
            fallback={<div className="h-64 bg-[#381F47] animate-pulse" />}
            threshold={0.1}
          >
            <Suspense fallback={<div className="h-64 bg-[#381F47]" />}>
              <LandingFooter doctorName="Dra. Carla Christoph" clinicName="Ipanema Elegance Dental" phoneNumber="(21) 99330-4045" />
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
                phoneNumber={pageConfig.whatsapp.number}
                message={pageConfig.whatsapp.message}
                campaign={pageConfig.campaign}
                messageMatch={pageConfig.messageMatch}
              />
            </Suspense>
          </LazySection>
        </main>
      </ErrorBoundary>
    </>
  );
};

export default ClareamentoLandingPage;