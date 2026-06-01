import React, { useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { especialistaProteseConfig } from '@/config/especialistaProteseConfig';
import { useScrollTracking } from '@/hooks/useScrollTracking';

// Performance components
const ErrorBoundary = lazy(() => import('@/components/performance/ErrorBoundary'));
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

// Fallback components
const SectionFallback = () => (
  <div className="min-h-[200px] bg-gray-50 animate-pulse rounded-lg mx-4" />
);

const EspecialistaProteseLandingPage = () => {
  // Performance hooks
  useScrollTracking({ pagePath: '/lp/especialista-protese-ipanema' });

  useEffect(() => {
    // Push page view to dataLayer
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: 'Especialista Prótese - Ipanema',
        page_location: window.location.href,
        campaign: especialistaProteseConfig.campaign
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{especialistaProteseConfig.seo.title}</title>
        <meta name="title" content={especialistaProteseConfig.seo.title} />
        <meta name="description" content={especialistaProteseConfig.seo.description} />
        <meta name="keywords" content={especialistaProteseConfig.seo.keywords?.join(', ')} />
        <link rel="canonical" href="https://dracarlachristoph.com/lp/especialista-protese-ipanema" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/lp/especialista-protese-ipanema" />
        <meta property="og:title" content={especialistaProteseConfig.seo.title} />
        <meta property="og:description" content={especialistaProteseConfig.seo.description} />
        <meta property="og:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="Dra. Carla Christoph" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dracarlachristoph.com/lp/especialista-protese-ipanema" />
        <meta property="twitter:title" content={especialistaProteseConfig.seo.title} />
        <meta property="twitter:description" content={especialistaProteseConfig.seo.description} />
        <meta property="twitter:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />

        {/* Performance and Resource Hints */}
        <link rel="preload" href="/fonts/montserrat-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/montserrat-500.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/playfair-display-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* DNS Prefetch and Preconnect */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://api.whatsapp.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Additional Meta Tags */}
        <meta name="robots" content="noindex, nofollow" />
        <meta name="language" content="Portuguese" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Dra. Carla Christoph" />
        <meta name="geo.region" content="BR-RJ" />
        <meta name="geo.placename" content="Ipanema, Rio de Janeiro" />
        <meta name="geo.position" content="-22.9868;-43.2005" />
        <meta name="ICBM" content="-22.9868, -43.2005" />

        {/* Structured Data - Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Dra. Carla Christoph",
            "image": "https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp",
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
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -22.9868,
              "longitude": -43.2005
            },
            "areaServed": {
              "@type": "City",
              "name": "Rio de Janeiro"
            },
            "priceRange": "$$$",
            "openingHours": "Mo-Fr 09:00-19:00"
          })}
        </script>

        {/* Structured Data - Medical Procedure */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Reabilitação Oral e Prótese Dentária",
            "description": "Tratamento especializado para reabilitação oral completa com próteses dentárias de alta estética",
            "procedureType": "Reconstructive",
            "performer": {
              "@type": "Dentist",
              "name": "Dra. Carla Christoph"
            },
            "medicationWarning": "Consulte sempre um profissional qualificado antes de qualquer procedimento odontológico"
          })}
        </script>
      </Helmet>



      {/* GTM NoScript Fallback */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${especialistaProteseConfig.tracking.gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>

      <ErrorBoundary>
        <div className="min-h-screen bg-background">
          {/* Critical Above the Fold Content */}
          <ConsultaInicialHeader
            whatsappNumber={especialistaProteseConfig.whatsapp.number}
            whatsappMessage={especialistaProteseConfig.whatsapp.message}
            campaign={especialistaProteseConfig.campaign}
            messageMatch={especialistaProteseConfig.messageMatch}
          />

          <ConsultaInicialHero
            headline={especialistaProteseConfig.hero.headline}
            subheadline={especialistaProteseConfig.hero.subheadline}
            ctaText={especialistaProteseConfig.hero.ctaText}
            backgroundImage={especialistaProteseConfig.hero.backgroundImage}
            whatsappNumber={especialistaProteseConfig.whatsapp.number}
            whatsappMessage={especialistaProteseConfig.whatsapp.message}
            benefits={especialistaProteseConfig.benefits}
          />

          {/* Lazy Loaded Below the Fold Content */}
          <LazySection fallback={<SectionFallback />} threshold={0.1} rootMargin="100px">
            <Suspense fallback={<SectionFallback />}>
              <ConsultaInicialProblem
                title={especialistaProteseConfig.problem.title}
                description={especialistaProteseConfig.problem.description}
                problems={especialistaProteseConfig.problem.problems}
              />
            </Suspense>
          </LazySection>

          <LazySection fallback={<SectionFallback />} threshold={0.1} rootMargin="100px">
            <Suspense fallback={<SectionFallback />}>
              <ConsultaInicialGuide
                title={especialistaProteseConfig.guide.title}
                subtitle={especialistaProteseConfig.guide.subtitle}
                steps={especialistaProteseConfig.guide.steps}
              />
            </Suspense>
          </LazySection>

          <LazySection fallback={<SectionFallback />} threshold={0.1} rootMargin="50px">
            <Suspense fallback={<SectionFallback />}>
              <ConsultaInicialSocialProof
                title={especialistaProteseConfig.socialProof.title}
                testimonials={especialistaProteseConfig.socialProof.testimonials}
                stats={especialistaProteseConfig.socialProof.stats}
              />
            </Suspense>
          </LazySection>

          <LazySection fallback={<SectionFallback />} threshold={0.1} rootMargin="50px">
            <Suspense fallback={<SectionFallback />}>
              <ConsultaInicialFAQ
                title={especialistaProteseConfig.faq.title}
                questions={especialistaProteseConfig.faq.questions}
              />
            </Suspense>
          </LazySection>

          <LazySection fallback={<div className="h-32 bg-[#381F47] animate-pulse" />} threshold={0.1}>
            <Suspense fallback={<SectionFallback />}>
              <ConsultaInicialCTA
                title={especialistaProteseConfig.cta.title}
                subtitle={especialistaProteseConfig.cta.subtitle}
                buttonText={especialistaProteseConfig.cta.buttonText}
                urgency={especialistaProteseConfig.cta.urgency}
                whatsappNumber={especialistaProteseConfig.whatsapp.number}
                whatsappMessage={especialistaProteseConfig.whatsapp.message}
                messageMatch={especialistaProteseConfig.messageMatch}
                campaign={especialistaProteseConfig.campaign}
              />
            </Suspense>
          </LazySection>

          <LazySection fallback={<div className="h-64 bg-[#381F47] animate-pulse" />} threshold={0.1}>
            <Suspense fallback={<SectionFallback />}>
              <LandingFooter doctorName="Dra. Carla Christoph" clinicName="Ipanema Elegance Dental" phoneNumber="(21) 99330-4045" />
            </Suspense>
          </LazySection>

          <LazySection fallback={null} threshold={0} rootMargin="0px">
            <Suspense fallback={null}>
              <FloatingWhatsApp
                phoneNumber={especialistaProteseConfig.whatsapp.number}
                message={especialistaProteseConfig.whatsapp.message}
                messageMatch={especialistaProteseConfig.messageMatch}
                campaign={especialistaProteseConfig.campaign}
              />
            </Suspense>
          </LazySection>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default EspecialistaProteseLandingPage;