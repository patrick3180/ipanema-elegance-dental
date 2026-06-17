import React, { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// Sprint 4: Removed captureGCLID import — already runs in boot (main.tsx)
import { limpezaDentalConfig } from '@/config/limpezaDentalConfig';
import { GTMManager } from '@/components/performance/GTMManager';
import useScrollTracking from '@/hooks/useScrollTracking';

// Performance Components (critical path only)
import LazySection from '@/components/performance/LazySection';
import ContentfulBlocker from '@/components/performance/ContentfulBlocker';
import ErrorBoundary from '@/components/performance/ErrorBoundary';

// Critical above-the-fold components (eager loading)
import ConsultaInicialHeader from '@/components/landing/consulta/ConsultaInicialHeader';
import { MessageCircle } from 'lucide-react';
import { sendGCLIDToWebhook } from "@/utils/gclid";

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

const LimpezaDentalLandingPage: React.FC = () => {
  const pageConfig = limpezaDentalConfig;

  useEffect(() => {
    // Sprint 4: Removed captureGCLID() — already runs synchronously in boot (main.tsx)

    // Push page_view event (GTM is loaded via index.html)
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',
        page_title: pageConfig.seo.title,
        page_location: window.location.href,
        page_path: '/lp/limpeza-dental-ipanema',
        campaign: pageConfig.campaign,
        ad_group: pageConfig.messageMatch.adGroup,
        keyword: pageConfig.messageMatch.keyword
      });
    }
  }, []);

  // Production scroll tracking
  useScrollTracking({
    pagePath: '/lp/limpeza-dental-ipanema',
    enabled: process.env.NODE_ENV === 'production'
  });

  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'Hero CTA Button - Consulta Inicial'
      });
    }

    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9'
      });
    }

    await sendGCLIDToWebhook('hero_cta_button_consulta');

    const encodedMessage = encodeURIComponent(pageConfig.whatsapp.message);
    window.open(`https://wa.me/${pageConfig.whatsapp.number}?text=${encodedMessage}`, "_blank");
  };

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

        {/* Sprint 4: Removed Google Fonts preconnect + stylesheet — fonts are self-hosted via @fontsource */}
        <link rel="dns-prefetch" href="//api.whatsapp.com" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/lp/limpeza-dental-ipanema" />
        <meta property="og:title" content={pageConfig.seo.title} />
        <meta property="og:description" content={pageConfig.seo.description} />
        <meta property="og:image" content={`https://dracarlachristoph.com${pageConfig.hero.backgroundImage}`} />
        <meta property="og:site_name" content="Dra. Carla Christoph" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dracarlachristoph.com/lp/limpeza-dental-ipanema" />
        <meta property="twitter:title" content={pageConfig.seo.title} />
        <meta property="twitter:description" content={pageConfig.seo.description} />
        <meta property="twitter:image" content={`https://dracarlachristoph.com${pageConfig.hero.backgroundImage}`} />

        {/* Canonical URL */}
        <link rel="canonical" href="https://dracarlachristoph.com/lp/limpeza-dental-ipanema" />

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
                "url": "https://dracarlachristoph.com/lp/limpeza-dental-ipanema",
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
                "image": `https://dracarlachristoph.com${pageConfig.hero.backgroundImage}`
              },
              {
                "@type": "Service",
                "name": "Limpeza Dental Profissional",
                "description": "Profilaxia profissional com tecnologia ultrassônica. Remoção de tártaro, placa bacteriana e manchas em consulta sem pressa.",
                "provider": {
                  "@id": "https://dracarlachristoph.com/#dentist"
                },
                "areaServed": {
                  "@type": "City",
                  "name": "Rio de Janeiro"
                },
                "serviceType": "Preventive Dentistry"
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

          {/* SEÇÃO 1: HERO LANDING (Sprint 9 / V5 local implementation matched exactly with preload) */}
          <section
            className="pt-[90px] py-16 lg:py-24 relative overflow-hidden"
            style={{
              background: 'linear-gradient(170deg, #FAF7F2 0%, #F5F0E8 40%, #EDE8DC 100%)',
            }}
          >
            {/* Decorative radial gradient */}
            <div
              className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 80% 20%, rgba(179,149,95,0.05) 0%, transparent 70%)',
              }}
            />

            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Content - 60% on desktop */}
                <div className="w-full lg:w-3/5 space-y-7">
                  {/* Credential badges */}
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center bg-[#381F47]/10 text-[#381F47] text-xs font-semibold px-3 py-1.5 rounded-full">
                      CRO-RJ 27.509
                    </span>
                    <span className="inline-flex items-center bg-[#B3955F]/15 text-[#8B7340] text-xs font-semibold px-3 py-1.5 rounded-full">
                      Atendimento Particular · Ipanema
                    </span>
                  </div>

                  {/* Headlines */}
                  <div className="space-y-4">
                    <h1 className="text-[34px] md:text-4xl lg:text-5xl font-bold text-[#381F47] leading-tight font-serif">
                      {pageConfig.hero.headline}
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                      {pageConfig.hero.subheadline}
                    </p>
                  </div>

                  {/* Benefits as pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pageConfig.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 bg-white border border-[#B3955F]/40 rounded-full px-3.5 py-1.5 text-sm text-[#381F47] font-medium"
                      >
                        <span className="text-[#B3955F] text-[8px]">●</span>
                        {benefit}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="space-y-2">
                    <button
                      onClick={handleWhatsAppClick}
                      className="w-full md:w-auto text-white rounded-[10px] px-8 py-4 flex items-center justify-center md:justify-start gap-3 text-[15px] font-bold transition-all duration-300 shadow-[0_4px_14px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] transform hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #25D366 0%, #20BD5A 100%)',
                      }}
                    >
                      <MessageCircle size={20} />
                      {pageConfig.hero.ctaText}
                    </button>
                    <div className="flex items-center gap-1.5 md:pl-1">
                      <span className="text-green-500 text-[8px]">●</span>
                      <span className="text-[11px] text-gray-500">WhatsApp 24h</span>
                    </div>
                  </div>
                </div>

                {/* Hero Image - 40% on desktop */}
                <div className="w-full lg:w-2/5">
                  <div className="relative" style={{ aspectRatio: '760/996' }}>
                    <div className="rounded-[20px] overflow-hidden" style={{ boxShadow: '0 8px 30px rgba(74,45,94,0.08)' }}>
                      <picture>
                        <source
                          srcSet="/lovable-uploads/vertical-de-jaleco-480.avif 480w, /lovable-uploads/vertical-de-jaleco-1024.avif 1024w"
                          sizes="(max-width:767px) 100vw, (min-width:768px) 50vw, 40vw"
                          type="image/avif"
                        />
                        <img
                          src={pageConfig.hero.backgroundImage}
                          alt="Dra. Carla Christoph - Consulta Odontológica Personalizada em Ipanema"
                          className="w-full h-full object-cover"
                          width="760"
                          height="996"
                          loading="eager"
                          fetchPriority="high"
                          style={{ aspectRatio: '760/996' }}
                        />
                      </picture>
                    </div>
                    {/* Floating badge - hidden on mobile */}
                    <div className="hidden md:flex absolute bottom-6 left-4 bg-white rounded-xl px-4 py-2.5 items-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                      <span className="text-[#B3955F] text-[8px]">●</span>
                      <span className="text-[11px] font-semibold text-[#381F47]">20+ Anos de Experiência</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

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
                ctaLabel="Agendar Minha Limpeza"
                eventLabel="Mid CTA Button - Limpeza Dental"
                webhookSource="mid_cta_button_limpeza"
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

export default LimpezaDentalLandingPage;
