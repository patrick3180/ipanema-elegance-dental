import React, { useEffect, Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { saudeGengivalConfig } from "@/config/saudeGengivalConfig";
import { useCriticalImagePreload } from "@/hooks/useCriticalImagePreload";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import LazySection from '@/components/performance/LazySection';

// Lazy load components for better performance
const ConsultaInicialHeader = lazy(() => import("@/components/landing/consulta/ConsultaInicialHeader"));
const ConsultaInicialHero = lazy(() => import("@/components/landing/consulta/ConsultaInicialHero"));
const ProblemSection = lazy(() => import("@/components/landing/ProblemSection"));
const GuideSection = lazy(() => import("@/components/landing/GuideSection"));
const SocialProofSection = lazy(() => import("@/components/landing/SocialProofSection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const CTASection = lazy(() => import("@/components/landing/CTASection"));
const LandingFooter = lazy(() => import('@/components/landing/LandingFooter'));
const FloatingWhatsApp = lazy(() => import("@/components/landing/FloatingWhatsApp"));

// Performance optimizers
const SimpleLCPOptimizer = lazy(() => import("@/components/performance/SimpleLCPOptimizer"));
const CoreWebVitalsOptimizer = lazy(() => import("@/components/performance/CoreWebVitalsOptimizer"));
const ErrorBoundary = lazy(() => import("@/components/performance/ErrorBoundary"));

// Skeleton components
const SocialProofSkeleton = lazy(() => import("@/components/skeleton/SocialProofSkeleton"));
const FAQSkeleton = lazy(() => import("@/components/skeleton/FAQSkeleton"));
const FooterSkeleton = lazy(() => import("@/components/skeleton/FooterSkeleton"));
const WhatsAppSkeleton = lazy(() => import("@/components/skeleton/WhatsAppSkeleton"));

const SaudeGengivalLandingPage = () => {
  const config = saudeGengivalConfig;

  // Preload critical hero image
  useCriticalImagePreload({
    images: [
      { src: config.hero.backgroundImage || "", width: 1200 }
    ]
  });

  // Track scroll depth
  useScrollTracking({
    pagePath: '/lp/saude-gengival-ipanema',
    enabled: true
  });

  useEffect(() => {
    // Track page view
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: config.seo.title,
        page_location: window.location.href,
        page_path: '/lp/saude-gengival-ipanema',
        landing_page_type: 'saude_gengival',
        campaign: config.campaign,
        ad_group: config.messageMatch.adGroup,
        keyword: config.messageMatch.keyword
      });
    }

    // GTM is now loaded via index.html - no duplicate loading needed
  }, [config]);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://dracarlachristoph.com/#business",
        "name": "Consultório Odontológico - Dra. Carla Christoph",
        "description": "Especialista em saúde gengival em Ipanema. Tratamento para sangramento, sensibilidade e prevenção.",
        "url": "https://dracarlachristoph.com/lp/saude-gengival-ipanema",
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
          "latitude": "-22.9868",
          "longitude": "-43.2050"
        },
        "openingHours": "Mo-Fr 09:00-19:00",
        "priceRange": "$$$",
        "image": "https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
      },
      {
        "@type": "MedicalProcedure",
        "name": "Tratamento de Saúde Gengival",
        "description": "Profilaxia profissional e cuidados para saúde da gengiva",
        "procedureType": "Preventive Care"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{config.seo.title}</title>
        <meta name="description" content={config.seo.description} />
        <meta name="keywords" content={config.seo.keywords?.join(", ")} />
        <meta name="robots" content="noindex, nofollow" />

        {/* Open Graph tags */}
        <meta property="og:title" content={config.seo.title} />
        <meta property="og:description" content={config.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/lp/saude-gengival-ipanema" />
        <meta property="og:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.seo.title} />
        <meta name="twitter:description" content={config.seo.description} />
        <meta name="twitter:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://dracarlachristoph.com/lp/saude-gengival-ipanema" />

        {/* Preload critical image */}
        <link
          rel="preload"
          as="image"
          href="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
          type="image/webp"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

        {/* Enhanced GTM Script */}
        {config.tracking.gtmId && (
          <script type="text/javascript">
            {`
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                'gtm.start': new Date().getTime(),
                'event': 'gtm.js',
                'page_type': 'landing_page',
                'landing_category': 'saude_gengival',
                'campaign': '${config.campaign}',
                'ad_group': '${config.messageMatch.adGroup}',
                'keyword': '${config.messageMatch.keyword}'
              });
            `}
          </script>
        )}
      </Helmet>

      <Suspense fallback={<div className="min-h-screen bg-dental-beige" />}>
        <ErrorBoundary>
          {/* Performance Optimizers */}
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
            whatsappNumber={config.whatsapp.number}
            whatsappMessage={config.whatsapp.message}
            backgroundImage={config.hero.backgroundImage}
            benefits={config.benefits}
          />

          {/* Problem Section */}
          <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.1} rootMargin="100px">
            <Suspense fallback={<div className="h-96 bg-gray-50" />}>
              <ProblemSection
                title={config.problem.title}
                description={config.problem.description}
                problems={config.problem.problems}
              />
            </Suspense>
          </LazySection>

          {/* Guide Section */}
          <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="100px">
            <Suspense fallback={<div className="h-96 bg-white" />}>
              <GuideSection
                title={config.guide.title}
                subtitle={config.guide.subtitle}
                steps={config.guide.steps}
              />
            </Suspense>
          </LazySection>

          {/* Social Proof Section */}
          <LazySection fallback={<SocialProofSkeleton />} threshold={0.1} rootMargin="50px">
            <Suspense fallback={<SocialProofSkeleton />}>
              <SocialProofSection
                title={config.socialProof.title}
                testimonials={config.socialProof.testimonials}
                stats={config.socialProof.stats}
              />
            </Suspense>
          </LazySection>

          {/* FAQ Section */}
          <LazySection fallback={<FAQSkeleton />} threshold={0.1} rootMargin="50px">
            <Suspense fallback={<FAQSkeleton />}>
              <FAQSection
                title={config.faq.title}
                questions={config.faq.questions}
              />
            </Suspense>
          </LazySection>

          {/* CTA Section */}
          <LazySection fallback={<div className="h-32 bg-[#381F47] animate-pulse" />} threshold={0.1}>
            <Suspense fallback={<div className="h-32 bg-[#381F47]" />}>
              <CTASection
                title={config.cta.title}
                subtitle={config.cta.subtitle}
                buttonText={config.cta.buttonText}
                campaign={config.campaign}
                phoneNumber={config.whatsapp.number}
                whatsappMessage={config.whatsapp.message}
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

export default SaudeGengivalLandingPage;