import React, { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { facetasResinaDiretaConfig } from "@/config/facetasResinaDiretaConfig";
import { useCriticalImagePreload } from "@/hooks/useCriticalImagePreload";
import { useScrollTracking } from "@/hooks/useScrollTracking";

// Lazy import landing page components
const HeroSection = React.lazy(() => import("@/components/landing/HeroSection"));
const ProblemSection = React.lazy(() => import("@/components/landing/ProblemSection"));
const GuideSection = React.lazy(() => import("@/components/landing/GuideSection"));
const SocialProofSection = React.lazy(() => import("@/components/landing/SocialProofSection"));
const FAQSection = React.lazy(() => import("@/components/landing/FAQSection"));
const CTASection = React.lazy(() => import("@/components/landing/CTASection"));
const ClareamentoFooter = React.lazy(() => import('@/components/landing/clareamento/ClareamentoFooter'));
const FloatingWhatsApp = React.lazy(() => import("@/components/landing/FloatingWhatsApp"));

// Lazy import performance components
const CoreWebVitalsOptimizer = React.lazy(() => import("@/components/performance/CoreWebVitalsOptimizer"));
const ResourceHintsOptimizer = React.lazy(() => import("@/components/performance/ResourceHintsOptimizer"));
const CriticalCSSInliner = React.lazy(() => import("@/components/performance/CriticalCSSInliner"));
const SimpleLCPOptimizer = React.lazy(() => import("@/components/performance/SimpleLCPOptimizer"));

// Generic header component imports
import ConsultaInicialHeader from "@/components/landing/consulta/ConsultaInicialHeader";
import ConsultaInicialHero from "@/components/landing/consulta/ConsultaInicialHero";
import ConsultaInicialCTA from "@/components/landing/consulta/ConsultaInicialCTA";

// Skeleton components
import FAQSkeleton from "@/components/skeleton/FAQSkeleton";
import SocialProofSkeleton from "@/components/skeleton/SocialProofSkeleton";
import FooterSkeleton from "@/components/skeleton/FooterSkeleton";
import WhatsAppSkeleton from "@/components/skeleton/WhatsAppSkeleton";

const FacetasResinaDiretaLandingPage = () => {
  const pageConfig = facetasResinaDiretaConfig;

  // Critical image preloading
  useCriticalImagePreload({
    images: [
      { src: pageConfig.hero.backgroundImage || '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp', width: 1920 }
    ],
    enabled: true
  });

  // Scroll depth tracking
  useScrollTracking({
    pagePath: '/lp/facetas-resina-ipanema',
    enabled: true
  });

  // Page view tracking
  useEffect(() => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view_landing',
        page_title: pageConfig.seo.title,
        page_location: window.location.href,
        page_path: '/lp/facetas-resina-ipanema',
        campaign: pageConfig.campaign,
        ad_group: pageConfig.messageMatch.adGroup,
        keyword: pageConfig.messageMatch.keyword,
        landing_page_type: 'facetas_resina_direta'
      });
    }
  }, [pageConfig]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Consultório Odontológico Dra. Carla Christoph",
    "description": pageConfig.seo.description,
    "url": `https://dracarlachristoph.com/lp/facetas-resina-ipanema`,
    "telephone": "+5521993304045",
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
      "latitude": "-22.9866",
      "longitude": "-43.2024"
    },
    "medicalSpecialty": ["Dentistry", "Cosmetic Dentistry"],
    "serviceType": "Facetas de Resina Direta",
    "priceRange": "$$$"
  };

  return (
    <>
      <Helmet>
        <title>{pageConfig.seo.title}</title>
        <meta name="description" content={pageConfig.seo.description} />
        <meta name="keywords" content={pageConfig.seo.keywords?.join(", ")} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={pageConfig.seo.title} />
        <meta property="og:description" content={pageConfig.seo.description} />
        <meta property="og:url" content="https://dracarlachristoph.com/lp/facetas-resina-ipanema" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageConfig.seo.title} />
        <meta name="twitter:description" content={pageConfig.seo.description} />
        <meta name="twitter:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dracarlachristoph.com/lp/facetas-resina-ipanema" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

        {/* GTM Script */}
        {pageConfig.tracking.gtmId && (
          <script>
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${pageConfig.tracking.gtmId}');
            `}
          </script>
        )}
      </Helmet>

      {/* Performance optimizers */}
      <Suspense fallback={null}>
        <CoreWebVitalsOptimizer />
        <ResourceHintsOptimizer />
        <CriticalCSSInliner />
        <SimpleLCPOptimizer />
      </Suspense>

      {/* Header */}
      <ConsultaInicialHeader 
        whatsappNumber={pageConfig.whatsapp.number}
        whatsappMessage={pageConfig.whatsapp.message}
        campaign={pageConfig.campaign}
        messageMatch={pageConfig.messageMatch}
      />

      {/* Hero Section */}
      <ConsultaInicialHero 
        headline={pageConfig.hero.headline}
        subheadline={pageConfig.hero.subheadline}
        ctaText={pageConfig.hero.ctaText}
        backgroundImage={pageConfig.hero.backgroundImage}
        benefits={pageConfig.benefits}
        whatsappNumber={pageConfig.whatsapp.number}
        whatsappMessage={pageConfig.whatsapp.message}
      />

      {/* Landing Page Sections */}
      <Suspense fallback={<div className="h-96 bg-dental-beige/30" />}>
        <ProblemSection 
          title={pageConfig.problem.title}
          description={pageConfig.problem.description}
          problems={pageConfig.problem.problems}
        />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-dental-beige/20" />}>
        <GuideSection 
          title={pageConfig.guide.title}
          subtitle={pageConfig.guide.subtitle}
          steps={pageConfig.guide.steps}
        />
      </Suspense>

      <Suspense fallback={<SocialProofSkeleton />}>
        <SocialProofSection 
          title={pageConfig.socialProof.title}
          testimonials={pageConfig.socialProof.testimonials}
          stats={pageConfig.socialProof.stats}
        />
      </Suspense>

      <Suspense fallback={<FAQSkeleton />}>
        <FAQSection 
          title={pageConfig.faq.title}
          questions={pageConfig.faq.questions}
        />
      </Suspense>

      <ConsultaInicialCTA 
        title={pageConfig.cta.title}
        subtitle={pageConfig.cta.subtitle}
        buttonText={pageConfig.cta.buttonText}
        whatsappNumber={pageConfig.whatsapp.number}
        whatsappMessage={pageConfig.whatsapp.message}
        campaign={pageConfig.campaign}
        messageMatch={pageConfig.messageMatch}
      />

      <Suspense fallback={<FooterSkeleton />}>
        <ClareamentoFooter />
      </Suspense>

      <Suspense fallback={<WhatsAppSkeleton />}>
        <FloatingWhatsApp 
          phoneNumber={pageConfig.whatsapp.number}
          message={pageConfig.whatsapp.message}
          campaign={pageConfig.campaign}
          messageMatch={pageConfig.messageMatch}
        />
      </Suspense>
    </>
  );
};

export default FacetasResinaDiretaLandingPage;