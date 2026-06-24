import React, { useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { especialistaProteseV2Config as cfg } from '@/config/especialistaProteseV2Config';
import { useScrollTracking } from '@/hooks/useScrollTracking';

// Performance
import LazySection from '@/components/performance/LazySection';
import ContentfulBlocker from '@/components/performance/ContentfulBlocker';

// Critical (above the fold) — eager
import ConsultaInicialHeader from '@/components/landing/consulta/ConsultaInicialHeader';
import ProteseHero from '@/components/landing/protese/ProteseHero';

// Lazy (below the fold)
const ErrorBoundary = lazy(() => import('@/components/performance/ErrorBoundary'));
const ProteseSeletor = lazy(() => import('@/components/landing/protese/ProteseSeletor'));
const ProteseValor = lazy(() => import('@/components/landing/protese/ProteseValor'));
const ProteseSolucao = lazy(() => import('@/components/landing/protese/ProteseSolucao'));
const ProteseStickyCTA = lazy(() => import('@/components/landing/protese/ProteseStickyCTA'));
const ConsultaInicialGuide = lazy(() => import('@/components/landing/consulta/ConsultaInicialGuide'));
const ConsultaInicialDoctorBio = lazy(() => import('@/components/landing/consulta/ConsultaInicialDoctorBio'));
const ConsultaInicialSocialProof = lazy(() => import('@/components/landing/consulta/ConsultaInicialSocialProof'));
const ConsultaInicialMidCTA = lazy(() => import('@/components/landing/consulta/ConsultaInicialMidCTA'));
const ConsultaInicialFAQ = lazy(() => import('@/components/landing/consulta/ConsultaInicialFAQ'));
const ConsultaInicialCTA = lazy(() => import('@/components/landing/consulta/ConsultaInicialCTA'));
const LandingFooter = lazy(() => import('@/components/landing/LandingFooter'));
const FloatingWhatsApp = lazy(() => import('@/components/landing/FloatingWhatsApp'));

const SectionFallback = () => (
  <div className="min-h-[200px] bg-gray-50 animate-pulse rounded-lg mx-4" />
);

// Critical CSS do hero/sticky vive em src/index.css (.ph-*) — confiável e idêntico ao padrão
// do hero full-bleed da home. O gerador estático injeta a mesma regra inline no <head>
// (PROTESE_HERO_CRITICAL_CSS em scripts/generate-static-meta.cjs) para first-paint sem CLS.

const EspecialistaProteseLandingPageV2 = () => {
  useScrollTracking({ pagePath: '/lp/especialista-protese-ipanema' });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: 'Especialista Prótese V2 - Ipanema',
        page_location: window.location.href,
        campaign: cfg.campaign,
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{cfg.seo.title}</title>
        <meta name="title" content={cfg.seo.title} />
        <meta name="description" content={cfg.seo.description} />
        <meta name="keywords" content={cfg.seo.keywords?.join(', ')} />
        <link rel="canonical" href="https://dracarlachristoph.com/lp/especialista-protese-ipanema" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/lp/especialista-protese-ipanema" />
        <meta property="og:title" content={cfg.seo.title} />
        <meta property="og:description" content={cfg.seo.description} />
        <meta property="og:image" content="https://dracarlachristoph.com/lovable-uploads/hero-fb-1280.webp" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="650" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="Dra. Carla Christoph" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={cfg.seo.title} />
        <meta property="twitter:description" content={cfg.seo.description} />
        <meta property="twitter:image" content="https://dracarlachristoph.com/lovable-uploads/hero-fb-1280.webp" />

        {/* Preload hero (LCP) */}
        <link rel="preload" as="image" href="/lovable-uploads/hero-fb-m-768.avif" type="image/avif" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/lovable-uploads/hero-fb-1280.avif" type="image/avif" media="(min-width: 768px)" />

        {/* Fonts */}
        <link rel="preload" href="/fonts/montserrat-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/playfair-display-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://api.whatsapp.com" />

        <meta name="robots" content="noindex, nofollow" />
        <meta name="geo.region" content="BR-RJ" />
        <meta name="geo.placename" content="Ipanema, Rio de Janeiro" />
        <meta name="geo.position" content="-22.9868;-43.2005" />

        {/* Schema - Dentist */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Dra. Carla Christoph",
            "image": "https://dracarlachristoph.com/lovable-uploads/hero-fb-1280.webp",
            "description": "Reabilitação oral para casos complexos em Ipanema. Especialista em prótese dentária com planejamento detalhado.",
            "url": "https://dracarlachristoph.com/lp/especialista-protese-ipanema",
            "telephone": "+5521993304045",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107",
              "addressLocality": "Ipanema",
              "addressRegion": "RJ",
              "postalCode": "22410-901",
              "addressCountry": "BR"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": -22.9868, "longitude": -43.2005 },
            "areaServed": { "@type": "City", "name": "Rio de Janeiro" },
            "priceRange": "$$$",
            "openingHours": "Mo-Fr 09:00-19:00"
          })}
        </script>

        {/* Schema - MedicalProcedure */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Reabilitação Oral e Prótese Dentária",
            "description": "Prótese fixa, sobre implante e removível com planejamento digital e materiais de alta translucidez.",
            "procedureType": "Reconstructive",
            "performer": { "@type": "Dentist", "name": "Dra. Carla Christoph" }
          })}
        </script>

        {/* Schema - FAQPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": cfg.faq.questions.map((q) => ({
              "@type": "Question",
              "name": q.question,
              "acceptedAnswer": { "@type": "Answer", "text": q.answer }
            }))
          })}
        </script>
      </Helmet>

      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${cfg.tracking.gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>

      <ContentfulBlocker />

      <Suspense fallback={null}>
        <ErrorBoundary>
          <div className="ph-root min-h-screen">
            {/* Above the fold — eager */}
            <ConsultaInicialHeader
              whatsappNumber={cfg.whatsapp.number}
              whatsappMessage={cfg.whatsapp.message}
              campaign={cfg.campaign}
              messageMatch={cfg.messageMatch}
            />

            <ProteseHero
              headline={cfg.hero.headline}
              subheadline={cfg.hero.subheadline}
              ctaText={cfg.hero.ctaText}
              benefits={cfg.benefits}
              whatsappNumber={cfg.whatsapp.number}
              whatsappMessage={cfg.whatsapp.message}
              proof={cfg.proof}
            />

            {/* 1. Seletor de prótese — resolve a indecisão (inovação principal) */}
            <LazySection fallback={<SectionFallback />} threshold={0.1} rootMargin="150px">
              <Suspense fallback={<SectionFallback />}>
                <ProteseSeletor
                  title={cfg.seletor.title}
                  subtitle={cfg.seletor.subtitle}
                  options={cfg.seletor.options}
                  footnote={cfg.seletor.footnote}
                  whatsappNumber={cfg.whatsapp.number}
                />
              </Suspense>
            </LazySection>

            {/* 2. Mid-CTA */}
            <LazySection fallback={<SectionFallback />} threshold={0.1} rootMargin="100px">
              <Suspense fallback={<SectionFallback />}>
                <ConsultaInicialMidCTA
                  whatsappNumber={cfg.whatsapp.number}
                  whatsappMessage={cfg.whatsapp.message}
                  heading="Quer entender qual prótese resolve o seu caso?"
                  ctaLabel="Agendar pelo WhatsApp"
                  eventLabel="Mid CTA 1 - Protese V2"
                  webhookSource="mid_cta_1_protese_v2"
                />
              </Suspense>
            </LazySection>

            {/* 3. Reassurance — "o seu caso tem solução" */}
            <LazySection fallback={<SectionFallback />} threshold={0.1} rootMargin="100px">
              <Suspense fallback={<SectionFallback />}>
                <ProteseSolucao
                  title={cfg.problem.title}
                  description={cfg.problem.description}
                  problems={cfg.problem.problems}
                />
              </Suspense>
            </LazySection>

            {/* 4. Reenquadre de valor */}
            <LazySection fallback={<SectionFallback />} threshold={0.1} rootMargin="100px">
              <Suspense fallback={<SectionFallback />}>
                <ProteseValor
                  title={cfg.valueProps.title}
                  subtitle={cfg.valueProps.subtitle}
                  items={cfg.valueProps.items}
                />
              </Suspense>
            </LazySection>

            {/* 5. Autoridade — bio da Dra. Carla */}
            <LazySection fallback={<SectionFallback />} threshold={0.1} rootMargin="100px">
              <Suspense fallback={<SectionFallback />}>
                <ConsultaInicialDoctorBio />
              </Suspense>
            </LazySection>

            {/* 6. Processo */}
            <LazySection fallback={<SectionFallback />} threshold={0.1} rootMargin="100px">
              <Suspense fallback={<SectionFallback />}>
                <ConsultaInicialGuide
                  title={cfg.guide.title}
                  subtitle={cfg.guide.subtitle}
                  steps={cfg.guide.steps}
                />
              </Suspense>
            </LazySection>

            {/* 7. Prova social */}
            <LazySection fallback={<SectionFallback />} threshold={0.1} rootMargin="50px">
              <Suspense fallback={<SectionFallback />}>
                <ConsultaInicialSocialProof
                  title={cfg.socialProof.title}
                  testimonials={cfg.socialProof.testimonials}
                  stats={cfg.socialProof.stats}
                />
              </Suspense>
            </LazySection>

            {/* 8. FAQ */}
            <LazySection fallback={<SectionFallback />} threshold={0.1} rootMargin="50px">
              <Suspense fallback={<SectionFallback />}>
                <ConsultaInicialFAQ title={cfg.faq.title} questions={cfg.faq.questions} />
              </Suspense>
            </LazySection>

            {/* 9. CTA final */}
            <LazySection fallback={<div className="h-32 bg-[#381F47] animate-pulse" />} threshold={0.1}>
              <Suspense fallback={<SectionFallback />}>
                <ConsultaInicialCTA
                  title={cfg.cta.title}
                  subtitle={cfg.cta.subtitle}
                  buttonText={cfg.cta.buttonText}
                  urgency={cfg.cta.urgency}
                  whatsappNumber={cfg.whatsapp.number}
                  whatsappMessage={cfg.whatsapp.message}
                  messageMatch={cfg.messageMatch}
                  campaign={cfg.campaign}
                />
              </Suspense>
            </LazySection>

            <LazySection fallback={<div className="h-64 bg-[#381F47] animate-pulse" />} threshold={0.1}>
              <Suspense fallback={<SectionFallback />}>
                <LandingFooter
                  doctorName="Dra. Carla Christoph"
                  clinicName="Ipanema Elegance Dental"
                  phoneNumber="(21) 99330-4045"
                />
              </Suspense>
            </LazySection>

            {/* CTAs flutuantes: barra sticky no mobile, bolha no desktop */}
            <Suspense fallback={null}>
              <ProteseStickyCTA
                whatsappNumber={cfg.whatsapp.number}
                whatsappMessage={cfg.whatsapp.message}
              />
            </Suspense>

            <div className="hidden md:block">
              <Suspense fallback={null}>
                <FloatingWhatsApp
                  phoneNumber={cfg.whatsapp.number}
                  message={cfg.whatsapp.message}
                  messageMatch={cfg.messageMatch}
                  campaign={cfg.campaign}
                />
              </Suspense>
            </div>
          </div>
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default EspecialistaProteseLandingPageV2;
