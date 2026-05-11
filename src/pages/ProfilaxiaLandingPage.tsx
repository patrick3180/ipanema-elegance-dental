import React, { useEffect, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { captureGCLID } from "@/utils/gclid";
import { useCriticalImagePreload } from "@/hooks/useCriticalImagePreload";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { profilaxiaConfig } from "@/config/profilaxiaConfig";

// Critical Components - Loaded immediately for LCP
import ConsultaInicialHeader from "@/components/landing/consulta/ConsultaInicialHeader";
import ConsultaInicialHero from "@/components/landing/consulta/ConsultaInicialHero";

// Performance optimization components
import FastServerResponseOptimizer from "@/components/performance/FastServerResponseOptimizer";
import CriticalCSSOptimizer from "@/components/performance/CriticalCSSOptimizer";
import AsyncScriptManager from "@/components/performance/AsyncScriptManager";
import NonCriticalCSSLoader from "@/components/performance/NonCriticalCSSLoader";
import ErrorBoundary from "@/components/performance/ErrorBoundary";
import LazySection from "@/components/performance/LazySection";

// Lazy Components for better performance
const ConsultaInicialProblem = React.lazy(() => import("@/components/landing/consulta/ConsultaInicialProblem"));
const ConsultaInicialGuide = React.lazy(() => import("@/components/landing/consulta/ConsultaInicialGuide"));
const ConsultaInicialSocialProof = React.lazy(() => import("@/components/landing/consulta/ConsultaInicialSocialProof"));
const ConsultaInicialFAQ = React.lazy(() => import("@/components/landing/consulta/ConsultaInicialFAQ"));
const ConsultaInicialCTA = React.lazy(() => import("@/components/landing/consulta/ConsultaInicialCTA"));
const LandingFooter = React.lazy(() => import("@/components/landing/LandingFooter"));
const FloatingWhatsApp = React.lazy(() => import("@/components/landing/FloatingWhatsApp"));

// Skeleton Components for Loading States
import SocialProofSkeleton from "@/components/skeleton/SocialProofSkeleton";
import FAQSkeleton from "@/components/skeleton/FAQSkeleton";
import FooterSkeleton from "@/components/skeleton/FooterSkeleton";
import WhatsAppSkeleton from "@/components/skeleton/WhatsAppSkeleton";

// Critical images for LCP optimization
const criticalImages = [
  { src: '/lovable-uploads/vertical-de-jaleco.webp' },
  { src: '/lovable-uploads/vertical-de-jaleco-768.avif' },
  { src: '/lovable-uploads/vertical-de-jaleco-1024.avif' }
];

const ProfilaxiaLandingPage: React.FC = () => {
  // Preload critical images for LCP
  useCriticalImagePreload({ images: criticalImages });

  // Track scroll events for analytics
  useScrollTracking({ pagePath: '/lp/profilaxia-dental-ipanema' });

  useEffect(() => {
    // Debug mount
    console.debug('[LP Profilaxia] Mounted at', new Date().toISOString());
    // Capture GCLID on page load
    captureGCLID();

    // Push page view event to GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_location: window.location.href,
        page_title: 'Profilaxia Dental Ipanema - Landing Page',
        campaign: 'LP_profilaxia'
      });
    }

    // GTM is now loaded via index.html - no duplicate loading needed
  }, []);

  return (
    <>
      <FastServerResponseOptimizer />
      <CriticalCSSOptimizer inlineStyles="" />
      <AsyncScriptManager />

      <Helmet>
        <title>{profilaxiaConfig.seo.title}</title>
        <meta name="description" content={profilaxiaConfig.seo.description} />
        <meta name="keywords" content={profilaxiaConfig.seo.keywords?.join(', ')} />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* Critical CSS inline for above-the-fold content */}
        <style>
          {`
            body { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
            .hero-section { min-height: 100vh; background: linear-gradient(135deg, hsl(277, 46%, 20%) 0%, hsl(277, 46%, 35%) 100%); }
            .cta-button { background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%); border-radius: 9999px; padding: 16px 32px; }
            .fade-in { opacity: 0; animation: fadeIn 0.6s ease-out forwards; }
            @keyframes fadeIn { to { opacity: 1; } }
          `}
        </style>

        {/* Preload critical fonts */}
        <link rel="preload" href="/fonts/montserrat-500.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/playfair-display-400.woff2" as="font" type="font/woff2" crossOrigin="" />

        {/* Preload critical images */}
        <link rel="preload" href="/lovable-uploads/vertical-de-jaleco.webp" as="image" />
        <link rel="preload" href="/lovable-uploads/vertical-de-jaleco-768.avif" as="image" media="(max-width: 768px)" />

        {/* DNS prefetch and preconnect for external domains */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//api.whatsapp.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />

        {/* Defer non-critical CSS */}
        <link
          rel="preload"
          href="/css/non-critical.css"
          as="style"
          onLoad={() => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/css/non-critical.css';
            document.head.appendChild(link);
          }}
        />
        <noscript>{`<link rel="stylesheet" href="/css/non-critical.css" />`}</noscript>

        {/* Open Graph meta tags */}
        <meta property="og:title" content={profilaxiaConfig.seo.title} />
        <meta property="og:description" content={profilaxiaConfig.seo.description} />
        <meta property="og:image" content="https://dracarlachristoph.com/lovable-uploads/vertical-de-jaleco.webp" />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={profilaxiaConfig.seo.title} />
        <meta name="twitter:description" content={profilaxiaConfig.seo.description} />
        <meta name="twitter:image" content="/lovable-uploads/vertical-de-jaleco.webp" />

        {/* GTM is loaded via index.html */}

        {/* Structured Data for Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Dra. Carla Christoph",
            "description": "Profilaxia dental com tecnologia ultrassônica em Ipanema",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107",
              "addressLocality": "Ipanema",
              "addressRegion": "RJ",
              "postalCode": "22410-901",
              "addressCountry": "BR"
            },
            "telephone": "+5521993304045",
            "priceRange": "$$",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Serviços Odontológicos",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "MedicalProcedure",
                    "name": "Profilaxia Dental",
                    "description": "Profilaxia dental com tecnologia ultrassônica"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>

      {/* GTM noscript handled via index.html */}

      <ErrorBoundary><div className="min-h-screen bg-white">
        {/* Critical Above-the-fold Content */}
        <ConsultaInicialHeader
          whatsappNumber={profilaxiaConfig.whatsapp.number}
          whatsappMessage={profilaxiaConfig.whatsapp.message}
          campaign={profilaxiaConfig.campaign}
          messageMatch={profilaxiaConfig.messageMatch}
        />

        <ConsultaInicialHero
          headline={profilaxiaConfig.hero.headline}
          subheadline={profilaxiaConfig.hero.subheadline}
          ctaText={profilaxiaConfig.hero.ctaText}
          benefits={profilaxiaConfig.benefits}
          backgroundImage={profilaxiaConfig.hero.backgroundImage}
          whatsappNumber={profilaxiaConfig.whatsapp.number}
          whatsappMessage={profilaxiaConfig.whatsapp.message}
        />

        <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.1} rootMargin="100px">
          <Suspense fallback={<div className="h-96 bg-gray-50" />}>
            <ConsultaInicialProblem
              title={profilaxiaConfig.problem.title}
              description={profilaxiaConfig.problem.description}
              problems={profilaxiaConfig.problem.problems}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="100px">
          <Suspense fallback={<div className="h-96 bg-white" />}>
            <ConsultaInicialGuide
              title={profilaxiaConfig.guide.title}
              subtitle={profilaxiaConfig.guide.subtitle}
              steps={profilaxiaConfig.guide.steps}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<SocialProofSkeleton />} threshold={0.1} rootMargin="50px">
          <Suspense fallback={<SocialProofSkeleton />}>
            <ConsultaInicialSocialProof
              title={profilaxiaConfig.socialProof.title}
              testimonials={profilaxiaConfig.socialProof.testimonials}
              stats={profilaxiaConfig.socialProof.stats}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<FAQSkeleton />} threshold={0.1} rootMargin="50px">
          <Suspense fallback={<FAQSkeleton />}>
            <ConsultaInicialFAQ
              title={profilaxiaConfig.faq.title}
              questions={profilaxiaConfig.faq.questions}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-64 bg-[#381F47] animate-pulse" />} threshold={0.1}>
          <Suspense fallback={<div className="h-64 bg-[#381F47]" />}>
            <ConsultaInicialCTA
              title={profilaxiaConfig.cta.title}
              subtitle={profilaxiaConfig.cta.subtitle}
              buttonText={profilaxiaConfig.cta.buttonText}
              whatsappNumber={profilaxiaConfig.whatsapp.number}
              whatsappMessage={profilaxiaConfig.whatsapp.message}
              campaign={profilaxiaConfig.campaign}
              messageMatch={profilaxiaConfig.messageMatch}
              urgency={profilaxiaConfig.cta.urgency}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<FooterSkeleton />} threshold={0.1}>
          <Suspense fallback={<FooterSkeleton />}>
            <LandingFooter doctorName="Dra. Carla Christoph" clinicName="Ipanema Elegance Dental" phoneNumber="(21) 99330-4045" />
          </Suspense>
        </LazySection>

        <LazySection fallback={null} threshold={0} rootMargin="0px">
          <Suspense fallback={null}>
            <FloatingWhatsApp
              phoneNumber={profilaxiaConfig.whatsapp.number}
              message={profilaxiaConfig.whatsapp.message}
              campaign={profilaxiaConfig.campaign}
              messageMatch={profilaxiaConfig.messageMatch}
            />
          </Suspense>
        </LazySection>

        {/* Load non-critical CSS after a delay */}
        <NonCriticalCSSLoader delay={2000} enabled={false} />
      </div></ErrorBoundary>
    </>
  );
};

export default ProfilaxiaLandingPage;