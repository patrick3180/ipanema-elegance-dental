import React, { useEffect, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useCriticalImagePreload } from "@/hooks/useCriticalImagePreload";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import ErrorBoundary from "@/components/performance/ErrorBoundary";
import ResourceHintsOptimizer from "@/components/performance/ResourceHintsOptimizer";
import CriticalCSSInliner from "@/components/performance/CriticalCSSInliner";
import SimpleLCPOptimizer from "@/components/performance/SimpleLCPOptimizer";
import ConsultaInicialHeader from "@/components/landing/consulta/ConsultaInicialHeader";
import ConsultaInicialHero from "@/components/landing/consulta/ConsultaInicialHero";
import { lentesPorcelanaAcolhedorConfig } from "@/config/lentesPorcelanaAcolhedorConfig";

// Lazy loaded components for better performance
const ConsultaInicialProblem = React.lazy(() => import("@/components/landing/consulta/ConsultaInicialProblem"));
const ConsultaInicialGuide = React.lazy(() => import("@/components/landing/consulta/ConsultaInicialGuide"));
const ConsultaInicialSocialProof = React.lazy(() => import("@/components/landing/consulta/ConsultaInicialSocialProof"));
const ConsultaInicialFAQ = React.lazy(() => import("@/components/landing/consulta/ConsultaInicialFAQ"));
const ConsultaInicialCTA = React.lazy(() => import("@/components/landing/consulta/ConsultaInicialCTA"));
const ClareamentoFooter = React.lazy(() => import("@/components/landing/clareamento/ClareamentoFooter"));
const FloatingWhatsApp = React.lazy(() => import("@/components/landing/FloatingWhatsApp"));

const LentesDeContatoPorcelanaLandingPage = () => {
  // Critical image preloading
  useCriticalImagePreload({
    images: [{
      src: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp'
    }]
  });

  // Scroll behavior tracking
  useScrollTracking({
    pagePath: '/lp/lentes-porcelana-ipanema'
  });

  useEffect(() => {
    // GCLID capture for ads tracking
    const urlParams = new URLSearchParams(window.location.search);
    const gclid = urlParams.get('gclid');
    if (gclid) {
      localStorage.setItem('gclid', gclid);
      console.log('GCLID captured:', gclid);
    }

    // Enhanced tracking for landing page
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'page_view',
        page_title: lentesPorcelanaAcolhedorConfig.seo.title,
        page_location: window.location.href,
        campaign: lentesPorcelanaAcolhedorConfig.campaign,
        ad_group: lentesPorcelanaAcolhedorConfig.messageMatch.adGroup,
        keyword: lentesPorcelanaAcolhedorConfig.messageMatch.keyword,
        landing_page_type: 'lentes_porcelana_acolhedor'
      });
    }

    // Enhanced deferred GTM loading with performance optimization
    const loadGTM = () => {
      if (lentesPorcelanaAcolhedorConfig.tracking?.gtmId && !(window as any).gtmLoaded) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${lentesPorcelanaAcolhedorConfig.tracking.gtmId}`;
        script.onload = () => {
          (window as any).gtmLoaded = true;
          console.log('GTM loaded for lentes porcelana acolhedor');
        };
        document.head.appendChild(script);
      }
    };

    // Load GTM after user interaction or 3 seconds
    const interactionEvents = ['mousedown', 'touchstart', 'keydown', 'scroll'];
    const loadOnInteraction = () => {
      loadGTM();
      interactionEvents.forEach(event => 
        document.removeEventListener(event, loadOnInteraction)
      );
    };

    interactionEvents.forEach(event => 
      document.addEventListener(event, loadOnInteraction, { passive: true })
    );

    const fallbackTimer = setTimeout(loadGTM, 3000);

    return () => {
      clearTimeout(fallbackTimer);
      interactionEvents.forEach(event => 
        document.removeEventListener(event, loadOnInteraction)
      );
    };
  }, []);

  const canonicalUrl = "https://dracarlachristoph.com/lp/lentes-porcelana-ipanema";
  const ogImage = "https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp";

  return (
    <>
      {/* Performance optimization components */}
      <ResourceHintsOptimizer />
      <CriticalCSSInliner />
      <SimpleLCPOptimizer />

      <Helmet>
        {/* Primary Meta Tags */}
        <title>{lentesPorcelanaAcolhedorConfig.seo.title}</title>
        <meta name="title" content={lentesPorcelanaAcolhedorConfig.seo.title} />
        <meta name="description" content={lentesPorcelanaAcolhedorConfig.seo.description} />
        <meta name="keywords" content={lentesPorcelanaAcolhedorConfig.seo.keywords?.join(', ')} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={lentesPorcelanaAcolhedorConfig.seo.title} />
        <meta property="og:description" content={lentesPorcelanaAcolhedorConfig.seo.description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="Dra. Carla Christoph - Odontologia Estética" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={lentesPorcelanaAcolhedorConfig.seo.title} />
        <meta name="twitter:description" content={lentesPorcelanaAcolhedorConfig.seo.description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Resource Hints for Performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical resource preloads */}
        <link 
          rel="preload" 
          href="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" 
          as="image"
          type="image/webp"
        />
        <link rel="preload" href="/fonts/playfair-display-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/montserrat-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Structured Data - Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Dra. Carla Christoph",
            "description": "Especialista em lentes de contato de porcelana e estética dental em Ipanema",
            "url": canonicalUrl,
            "logo": ogImage,
            "image": ogImage,
            "telephone": "+55 21 99330-4045",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Rio de Janeiro",
              "addressRegion": "RJ",
              "addressCountry": "BR",
              "streetAddress": "Ipanema"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-22.9838",
              "longitude": "-43.2096"
            },
            "openingHours": "Mo-Fr 08:00-18:00",
            "priceRange": "$$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "150"
            }
          })}
        </script>

        {/* Structured Data - Medical Procedure */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Lentes de Contato de Porcelana",
            "description": "Tratamento estético dental com lentes ultrafinas de porcelana para transformação do sorriso",
            "procedureType": "Cosmetic Dentistry",
            "bodyLocation": "Mouth",
            "preparation": "Consulta de avaliação e planejamento digital do sorriso",
            "followup": "Acompanhamento pós-tratamento e orientações de cuidados"
          })}
        </script>

        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="Dra. Carla Christoph" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="content-language" content="pt-BR" />
        
        {/* Additional Open Graph tags */}
        <meta property="article:author" content="Dra. Carla Christoph" />
        <meta property="article:section" content="Odontologia Estética" />
        <meta property="article:tag" content="lentes de porcelana, estética dental, sorriso perfeito" />
      </Helmet>

      <ErrorBoundary>
        <div className="min-h-screen bg-white">
          {/* Critical above-the-fold content */}
          <ConsultaInicialHeader 
            whatsappNumber={lentesPorcelanaAcolhedorConfig.whatsapp.number}
            whatsappMessage={lentesPorcelanaAcolhedorConfig.whatsapp.message}
            campaign={lentesPorcelanaAcolhedorConfig.campaign}
            messageMatch={lentesPorcelanaAcolhedorConfig.messageMatch}
          />
          
          <ConsultaInicialHero 
            headline={lentesPorcelanaAcolhedorConfig.hero.headline}
            subheadline={lentesPorcelanaAcolhedorConfig.hero.subheadline}
            ctaText={lentesPorcelanaAcolhedorConfig.hero.ctaText}
            benefits={lentesPorcelanaAcolhedorConfig.benefits}
            backgroundImage={lentesPorcelanaAcolhedorConfig.hero.backgroundImage || '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp'}
            whatsappNumber={lentesPorcelanaAcolhedorConfig.whatsapp.number}
            whatsappMessage={lentesPorcelanaAcolhedorConfig.whatsapp.message}
          />

          {/* Below-the-fold content with Suspense for better performance */}
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-dental-beige/30">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-dental-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-dental-purple font-medium">Carregando informações sobre lentes de porcelana...</p>
              </div>
            </div>
          }>
            <ConsultaInicialProblem 
              title={lentesPorcelanaAcolhedorConfig.problem.title}
              description={lentesPorcelanaAcolhedorConfig.problem.description}
              problems={lentesPorcelanaAcolhedorConfig.problem.problems}
            />
            
            <ConsultaInicialGuide 
              title={lentesPorcelanaAcolhedorConfig.guide.title}
              subtitle={lentesPorcelanaAcolhedorConfig.guide.subtitle}
              steps={lentesPorcelanaAcolhedorConfig.guide.steps}
            />
            
            <ConsultaInicialSocialProof 
              title={lentesPorcelanaAcolhedorConfig.socialProof.title}
              testimonials={lentesPorcelanaAcolhedorConfig.socialProof.testimonials}
              stats={lentesPorcelanaAcolhedorConfig.socialProof.stats}
            />
            
            <ConsultaInicialFAQ 
              title={lentesPorcelanaAcolhedorConfig.faq.title}
              questions={lentesPorcelanaAcolhedorConfig.faq.questions}
            />
            
            <ConsultaInicialCTA 
              title={lentesPorcelanaAcolhedorConfig.cta.title}
              subtitle={lentesPorcelanaAcolhedorConfig.cta.subtitle}
              buttonText={lentesPorcelanaAcolhedorConfig.cta.buttonText}
              whatsappNumber={lentesPorcelanaAcolhedorConfig.whatsapp.number}
              whatsappMessage={lentesPorcelanaAcolhedorConfig.whatsapp.message}
              campaign={lentesPorcelanaAcolhedorConfig.campaign}
              messageMatch={lentesPorcelanaAcolhedorConfig.messageMatch}
            />
            
            <ClareamentoFooter />
            
            <FloatingWhatsApp 
              phoneNumber={lentesPorcelanaAcolhedorConfig.whatsapp.number}
              message={lentesPorcelanaAcolhedorConfig.whatsapp.message}
              campaign={lentesPorcelanaAcolhedorConfig.campaign}
              messageMatch={lentesPorcelanaAcolhedorConfig.messageMatch}
            />
          </Suspense>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default LentesDeContatoPorcelanaLandingPage;