import React, { useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { esteticaSorrisoGenericaConfig } from '@/config/esteticaSorrisoGenericaConfig';
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import LazySection from '@/components/performance/LazySection';

// Performance optimization components
const SimpleLCPOptimizer = lazy(() => import('@/components/performance/SimpleLCPOptimizer'));
const CoreWebVitalsOptimizer = lazy(() => import('@/components/performance/CoreWebVitalsOptimizer'));
const ErrorBoundary = lazy(() => import('@/components/performance/ErrorBoundary'));

// Landing page sections
const ConsultaInicialHeader = lazy(() => import('@/components/landing/consulta/ConsultaInicialHeader'));
const ConsultaInicialHero = lazy(() => import('@/components/landing/consulta/ConsultaInicialHero'));
const ConsultaInicialProblem = lazy(() => import('@/components/landing/consulta/ConsultaInicialProblem'));
const ConsultaInicialGuide = lazy(() => import('@/components/landing/consulta/ConsultaInicialGuide'));
const ConsultaInicialSocialProof = lazy(() => import('@/components/landing/consulta/ConsultaInicialSocialProof'));
const ConsultaInicialFAQ = lazy(() => import('@/components/landing/consulta/ConsultaInicialFAQ'));
const ConsultaInicialCTA = lazy(() => import('@/components/landing/consulta/ConsultaInicialCTA'));
const LandingFooter = lazy(() => import('@/components/landing/LandingFooter'));
const FloatingWhatsApp = lazy(() => import('@/components/landing/FloatingWhatsApp'));

// Skeleton components for loading states
const FooterSkeleton = lazy(() => import('@/components/skeleton/FooterSkeleton'));
const WhatsAppSkeleton = lazy(() => import('@/components/skeleton/WhatsAppSkeleton'));
const SocialProofSkeleton = lazy(() => import('@/components/skeleton/SocialProofSkeleton'));
const FAQSkeleton = lazy(() => import('@/components/skeleton/FAQSkeleton'));

const EsteticaSorrisoLandingPage = () => {
  const config = esteticaSorrisoGenericaConfig;

  // Critical image preloading
  useCriticalImagePreload({
    images: [{ src: config.hero.backgroundImage || '' }]
  });

  // Scroll depth tracking
  useScrollTracking({ pagePath: '/lp/estetica-dental-ipanema' });

  useEffect(() => {
    // Page view tracking
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view_estetica_sorriso',
        landing_page_type: 'estetica_sorriso_generica',
        campaign: config.campaign,
        ad_group: config.messageMatch.adGroup,
        keyword: config.messageMatch.keyword
      });
    }

    // GTM is now loaded via index.html - no duplicate loading needed
  }, [config.campaign, config.messageMatch.adGroup, config.messageMatch.keyword]);

  // Structured data for SEO
  const structuredData = {
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
  };

  return (
    <>
      <Helmet>
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
          {JSON.stringify(structuredData)}
        </script>

        {/* Preload critical resources */}
        <link rel="preload" href="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" as="image" type="image/webp" />

        {/* Google Tag Manager - Enhanced */}
        {config.tracking.gtmId && (
          <>
            <script>
              {`
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  'gtm.start': new Date().getTime(),
                  'event': 'gtm.js',
                  'landing_page_type': 'estetica_sorriso_generica',
                  'campaign': '${config.campaign}',
                  'ad_group': '${config.messageMatch.adGroup}',
                  'keyword': '${config.messageMatch.keyword}'
                });
              `}
            </script>
          </>
        )}
      </Helmet>

      <Suspense fallback={<div className="min-h-screen bg-dental-beige" />}>
        <ErrorBoundary>
          <SimpleLCPOptimizer />
          <CoreWebVitalsOptimizer />

          {/* Header */}
          <ConsultaInicialHeader
            whatsappNumber={config.whatsapp.number}
            whatsappMessage={config.whatsapp.message}
            campaign={config.campaign}
            messageMatch={config.messageMatch}
          />

          {/* Hero Section */}
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
          <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.1} rootMargin="100px">
            <Suspense fallback={<div className="h-96 bg-gray-50" />}>
              <ConsultaInicialProblem
                title={config.problem.title}
                description={config.problem.description}
                problems={config.problem.problems}
              />
            </Suspense>
          </LazySection>

          {/* Guide Section */}
          <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="100px">
            <Suspense fallback={<div className="h-96 bg-white" />}>
              <ConsultaInicialGuide
                title={config.guide.title}
                subtitle={config.guide.subtitle}
                steps={config.guide.steps}
              />
            </Suspense>
          </LazySection>

          {/* Social Proof Section */}
          <LazySection fallback={<SocialProofSkeleton />} threshold={0.1} rootMargin="50px">
            <Suspense fallback={<SocialProofSkeleton />}>
              <ConsultaInicialSocialProof
                title={config.socialProof.title}
                testimonials={config.socialProof.testimonials}
                stats={config.socialProof.stats}
              />
            </Suspense>
          </LazySection>

          {/* FAQ Section */}
          <LazySection fallback={<FAQSkeleton />} threshold={0.1} rootMargin="50px">
            <Suspense fallback={<FAQSkeleton />}>
              <ConsultaInicialFAQ
                title={config.faq.title}
                questions={config.faq.questions}
              />
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
          <LazySection fallback={<FooterSkeleton />} threshold={0.1}>
            <Suspense fallback={<FooterSkeleton />}>
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
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default EsteticaSorrisoLandingPage;