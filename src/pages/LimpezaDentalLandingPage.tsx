import React, { useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { limpezaDentalConfig } from '@/config/limpezaDentalConfig';
import { captureGCLID } from '@/utils/gclid';
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import CriticalCSSInliner from '@/components/performance/CriticalCSSInliner';
import HeroImagePreloader from '@/components/performance/HeroImagePreloader';
import ErrorBoundary from '@/components/performance/ErrorBoundary';

// Critical components (loaded immediately) - REUTILIZANDO COMPONENTES DA CONSULTA INICIAL
import ConsultaInicialHeader from '@/components/landing/consulta/ConsultaInicialHeader';
import ConsultaInicialHero from '@/components/landing/consulta/ConsultaInicialHero';

// Lazy loaded components - REUTILIZANDO COMPONENTES DA CONSULTA INICIAL
const ConsultaInicialProblem = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialProblem'));
const ConsultaInicialGuide = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialGuide'));
const ConsultaInicialSocialProof = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialSocialProof'));
const ConsultaInicialFAQ = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialFAQ'));
const ConsultaInicialCTA = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialCTA'));
const ClareamentoFooter = React.lazy(() => import('@/components/landing/clareamento/ClareamentoFooter'));
const FloatingWhatsApp = React.lazy(() => import('@/components/landing/FloatingWhatsApp'));

const LimpezaDentalLandingPage: React.FC = () => {
  // Critical images for LCP optimization with fetchpriority="high"
  const criticalImages = [
    {
      src: '/lovable-uploads/vertical-de-jaleco-480.avif',
      type: 'avif' as const,
      media: '(max-width: 767px)',
      priority: true
    },
    {
      src: '/lovable-uploads/vertical-de-jaleco-768.avif', 
      type: 'avif' as const,
      media: '(min-width: 768px) and (max-width: 1023px)',
      priority: true
    },
    {
      src: '/lovable-uploads/vertical-de-jaleco-1024.avif',
      type: 'avif' as const, 
      media: '(min-width: 1024px)',
      priority: true
    },
    {
      src: '/lovable-uploads/vertical-de-jaleco.webp',
      type: 'webp' as const,
      priority: true
    }
  ];

  // Fallback preload for LCP
  useCriticalImagePreload({ images: [{ src: limpezaDentalConfig.hero.backgroundImage }] });

  useEffect(() => {
    // Debug mount
    console.debug('[LP Limpeza] Mounted at', new Date().toISOString());
    // Capture GCLID immediately
    captureGCLID();

    // Push page view event
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',
        page_title: 'Limpeza Dental Premium - Ipanema',
        page_location: window.location.href,
        campaign: limpezaDentalConfig.campaign
      });
    }

    // Deferred GTM loading - only after user interaction or 3s delay
    const loadGTM = () => {
      if (typeof window !== 'undefined' && !(window as any).gtmLoaded && limpezaDentalConfig.tracking.gtmId) {
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtm.js?id=${limpezaDentalConfig.tracking.gtmId}`;
        script.async = true;
        document.head.appendChild(script);
        (window as any).gtmLoaded = true;
      }
    };

    // Load GTM after user interaction or 3 seconds
    const userEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    const handleUserInteraction = () => {
      loadGTM();
      userEvents.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };

    userEvents.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { passive: true });
    });

    const gtmTimer = setTimeout(loadGTM, 3000);

    return () => {
      clearTimeout(gtmTimer);
      userEvents.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  // Scroll tracking for production analytics
  useScrollTracking({ 
    pagePath: '/lp/limpeza-dental-ipanema', 
    enabled: process.env.NODE_ENV === 'production' 
  });

  return (
    <>
      {/* Critical performance optimizations */}
      <CriticalCSSInliner />
      <HeroImagePreloader images={criticalImages} />
      
      <Helmet>
        <title>{limpezaDentalConfig.seo.title}</title>
        <meta name="description" content={limpezaDentalConfig.seo.description} />
        <meta name="keywords" content={limpezaDentalConfig.seo.keywords.join(', ')} />
        <link rel="canonical" href="https://dracarlachristoph.com.br/lp/limpeza-dental-ipanema" />

        {/* Open Graph tags */}
        <meta property="og:title" content={limpezaDentalConfig.seo.title} />
        <meta property="og:description" content={limpezaDentalConfig.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com.br/lp/limpeza-dental-ipanema" />
        <meta property="og:image" content={`https://dracarlachristoph.com.br${limpezaDentalConfig.hero.backgroundImage}`} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={limpezaDentalConfig.seo.title} />
        <meta name="twitter:description" content={limpezaDentalConfig.seo.description} />
        <meta name="twitter:image" content={`https://dracarlachristoph.com.br${limpezaDentalConfig.hero.backgroundImage}`} />

        {/* Preload critical fonts com display=swap */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" 
          as="style" 
          onLoad={(e: any) => { 
            e.target.rel = 'stylesheet'; 
            e.target.onload = null; 
          }}
        />

        {/* Preload critical hero images com fetchpriority="high" */}
        <link 
          rel="preload" 
          href="/lovable-uploads/vertical-de-jaleco-1024.avif"
          as="image" 
          type="image/avif"
          media="(min-width: 1024px)"
          fetchPriority="high"
        />
        <link 
          rel="preload" 
          href="/lovable-uploads/vertical-de-jaleco.webp"
          as="image" 
          type="image/webp"
          fetchPriority="high"
        />

        {/* Preload self-hosted critical fonts */}
        <link 
          rel="preload" 
          href="/fonts/montserrat-400.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/fonts/montserrat-500.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/fonts/playfair-display-400.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//wa.me" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />

        {/* Defer non-critical CSS */}
        <link 
          rel="preload" 
          href="/css/non-critical.css" 
          as="style" 
          onLoad={() => {}}
        />

        {/* Deferred Google Tag Manager */}
        {limpezaDentalConfig.tracking.gtmId && (
          <script 
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${limpezaDentalConfig.tracking.gtmId}');
              `
            }}
          />
        )}

        {/* Structured Data - Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Dra. Carla Christoph",
            "description": limpezaDentalConfig.seo.description,
            "url": "https://dracarlachristoph.com.br/lp/limpeza-dental-ipanema",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ipanema",
              "addressRegion": "Rio de Janeiro",
              "addressCountry": "BR"
            },
            "telephone": `+${limpezaDentalConfig.whatsapp.number}`,
            "priceRange": "$$",
            "areaServed": "Rio de Janeiro"
          })}
        </script>

        {/* Structured Data - Medical Procedure */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Limpeza Dental Profissional",
            "description": "Profilaxia profissional com tecnologia ultrassônica que remove tártaro e placa bacteriana",
            "procedureType": "Preventive",
            "bodyLocation": "Teeth"
          })}
        </script>
      </Helmet>

      {/* Critical above-the-fold content - HEADER E HERO IGUAIS À CONSULTA INICIAL */}

      <ErrorBoundary>
      <ConsultaInicialHeader
        whatsappNumber={limpezaDentalConfig.whatsapp.number}
        whatsappMessage={limpezaDentalConfig.whatsapp.message}
        campaign={limpezaDentalConfig.campaign}
        messageMatch={limpezaDentalConfig.messageMatch}
      />

      <ConsultaInicialHero
        headline={limpezaDentalConfig.hero.headline}
        subheadline={limpezaDentalConfig.hero.subheadline}
        ctaText={limpezaDentalConfig.hero.ctaText}
        benefits={limpezaDentalConfig.benefits}
        backgroundImage={limpezaDentalConfig.hero.backgroundImage}
        whatsappNumber={limpezaDentalConfig.whatsapp.number}
        whatsappMessage={limpezaDentalConfig.whatsapp.message}
      />

      {/* Problem section - MESMO COMPONENTE E LAYOUT */}
      <div className="min-h-screen">
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialProblem
            title={limpezaDentalConfig.problem.title}
            description={limpezaDentalConfig.problem.description}
            problems={limpezaDentalConfig.problem.problems}
          />
        </Suspense>
      </div>

      {/* Guide section - MESMO COMPONENTE E LAYOUT */}
      <div className="min-h-screen">
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialGuide
            title={limpezaDentalConfig.guide.title}
            subtitle={limpezaDentalConfig.guide.subtitle}
            steps={limpezaDentalConfig.guide.steps}
          />
        </Suspense>
      </div>

      {/* Social Proof section - MESMO COMPONENTE E LAYOUT */}
      <div className="min-h-screen">
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialSocialProof
            title={limpezaDentalConfig.socialProof.title}
            testimonials={limpezaDentalConfig.socialProof.testimonials}
            stats={limpezaDentalConfig.socialProof.stats}
          />
        </Suspense>
      </div>

      {/* FAQ section - MESMO COMPONENTE E LAYOUT */}
      <div className="min-h-screen">
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialFAQ
            title={limpezaDentalConfig.faq.title}
            questions={limpezaDentalConfig.faq.questions}
          />
        </Suspense>
      </div>

      {/* CTA section - MESMO COMPONENTE E LAYOUT */}
      <div className="min-h-screen">
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialCTA
            title={limpezaDentalConfig.cta.title}
            subtitle={limpezaDentalConfig.cta.subtitle}
            buttonText={limpezaDentalConfig.cta.buttonText}
            whatsappNumber={limpezaDentalConfig.whatsapp.number}
            whatsappMessage={limpezaDentalConfig.whatsapp.message}
            campaign={limpezaDentalConfig.campaign}
            messageMatch={limpezaDentalConfig.messageMatch}
          />
        </Suspense>
      </div>

      <div>
        <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse" />}>
          <ClareamentoFooter />
        </Suspense>
      </div>

      <div>
        <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse" />}>
          <FloatingWhatsApp
            phoneNumber={limpezaDentalConfig.whatsapp.number}
            message={limpezaDentalConfig.whatsapp.message}
            campaign={limpezaDentalConfig.campaign}
            messageMatch={limpezaDentalConfig.messageMatch}
          />
        </Suspense>
      </div>
      </ErrorBoundary>
    </>
  );
};

export default LimpezaDentalLandingPage;