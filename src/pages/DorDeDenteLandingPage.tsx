import React, { useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { dorDeDenteConfig } from '@/config/dorDeDenteConfig';
import { captureGCLID } from '@/utils/gclid';
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import CriticalCSSInline from '@/components/performance/CriticalCSSInline';
import ResourceHintsOptimizer from '@/components/performance/ResourceHintsOptimizer';
import NonCriticalCSSLoader from '@/components/performance/NonCriticalCSSLoader';
import SmartContentfulCache from '@/components/performance/SmartContentfulCache';
import CoreWebVitalsMonitor from '@/components/performance/CoreWebVitalsMonitor';
import HeroImagePreloader from '@/components/performance/HeroImagePreloader';
import ErrorBoundary from '@/components/performance/ErrorBoundary';
import { GTMManager } from '@/components/performance/GTMManager';
import AggressiveLCPOptimizer from '@/components/performance/AggressiveLCPOptimizer';
import LCPOptimizer from '@/components/performance/LCPOptimizer';
import CriticalResourcePreloader from '@/components/performance/CriticalResourcePreloader';

// Critical components (loaded immediately)
import ConsultaInicialHeader from '@/components/landing/consulta/ConsultaInicialHeader';
import ConsultaInicialHero from '@/components/landing/consulta/ConsultaInicialHero';

// Lazy loaded components
const ConsultaInicialProblem = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialProblem'));
const ConsultaInicialGuide = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialGuide'));
const ConsultaInicialSocialProof = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialSocialProof'));
const ConsultaInicialFAQ = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialFAQ'));
const ConsultaInicialCTA = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialCTA'));
const ClareamentoFooter = React.lazy(() => import('@/components/landing/clareamento/ClareamentoFooter'));
const FloatingWhatsApp = React.lazy(() => import('@/components/landing/FloatingWhatsApp'));

const DorDeDenteLandingPage: React.FC = () => {
  // Critical images for LCP optimization with fetchpriority="high"
  const criticalImages = [
    {
      src: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp',
      type: 'webp' as const,
      priority: true
    }
  ];

  // Fallback preload for LCP
  useCriticalImagePreload({ images: [{ src: dorDeDenteConfig.hero.backgroundImage }] });

  useEffect(() => {
    // Debug mount
    console.debug('[LP Dor de Dente] Mounted at', new Date().toISOString());
    // Capture GCLID immediately
    captureGCLID();

    // Push page view event
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',
        page_title: 'Dor de Dente Urgência - Ipanema',
        page_location: window.location.href,
        campaign: dorDeDenteConfig.campaign
      });
    }

    // Deferred GTM loading - only after user interaction or 3s delay
    const loadGTM = () => {
      if (typeof window !== 'undefined' && !(window as any).gtmLoaded && dorDeDenteConfig.tracking.gtmId) {
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtm.js?id=${dorDeDenteConfig.tracking.gtmId}`;
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
    pagePath: '/lp/dor-de-dente-urgencia-ipanema', 
    enabled: process.env.NODE_ENV === 'production' 
  });

  return (
    <>
      {/* EMERGENCY LCP Performance Optimizations */}
      <CriticalResourcePreloader
        heroImageUrl="/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.webp"
        enableFontPreload={true}
        enableImagePreload={true}
      />
      <AggressiveLCPOptimizer 
        heroImageSrc="/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.webp"
        heroImageAlt="Dra. Carla Hadid - Dentista Emergência Ipanema"
      />
      <LCPOptimizer 
        targetLCP={2500}
        enableEmergencyMode={true}
        enableInlineCSS={true}
      />
      <CriticalCSSInline />
      <ResourceHintsOptimizer />
      <SmartContentfulCache enableBlocking={true} />
      <CoreWebVitalsMonitor enabled={true} />
      <HeroImagePreloader images={criticalImages} />
      
      <Helmet>
        <title>{dorDeDenteConfig.seo.title}</title>
        <meta name="description" content={dorDeDenteConfig.seo.description} />
        <meta name="keywords" content={dorDeDenteConfig.seo.keywords.join(', ')} />
        <link rel="canonical" href="https://dracarlachristoph.com.br/lp/dor-de-dente-urgencia-ipanema" />

        {/* Open Graph tags */}
        <meta property="og:title" content={dorDeDenteConfig.seo.title} />
        <meta property="og:description" content={dorDeDenteConfig.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com.br/lp/dor-de-dente-urgencia-ipanema" />
        <meta property="og:image" content={`https://dracarlachristoph.com.br${dorDeDenteConfig.hero.backgroundImage}`} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dorDeDenteConfig.seo.title} />
        <meta name="twitter:description" content={dorDeDenteConfig.seo.description} />
        <meta name="twitter:image" content={`https://dracarlachristoph.com.br${dorDeDenteConfig.hero.backgroundImage}`} />

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
          href="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
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

        {/* DNS Prefetch and Preconnect optimizations */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//wa.me" />
        <link rel="dns-prefetch" href="//www.bing.com" />
        <link rel="dns-prefetch" href="//cdn.contentful.com" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.bing.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.contentful.com" crossOrigin="anonymous" />

        {/* Structured Data - Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Dra. Carla Christoph",
            "description": dorDeDenteConfig.seo.description,
            "url": "https://dracarlachristoph.com.br/lp/dor-de-dente-urgencia-ipanema",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ipanema",
              "addressRegion": "Rio de Janeiro",
              "addressCountry": "BR"
            },
            "telephone": `+${dorDeDenteConfig.whatsapp.number}`,
            "priceRange": "$$",
            "areaServed": "Rio de Janeiro"
          })}
        </script>

        {/* Structured Data - Medical Procedure */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Tratamento de Dor Dental de Urgência",
            "description": "Atendimento prioritário para alívio da dor de dente com diagnóstico preciso da causa",
            "procedureType": "Emergency",
            "bodyLocation": "Teeth"
          })}
        </script>
      </Helmet>

      {/* Critical above-the-fold content */}
      <ErrorBoundary>
      <ConsultaInicialHeader
        whatsappNumber={dorDeDenteConfig.whatsapp.number}
        whatsappMessage={dorDeDenteConfig.whatsapp.message}
        campaign={dorDeDenteConfig.campaign}
        messageMatch={dorDeDenteConfig.messageMatch}
      />

      <ConsultaInicialHero
        headline={dorDeDenteConfig.hero.headline}
        subheadline={dorDeDenteConfig.hero.subheadline}
        ctaText={dorDeDenteConfig.hero.ctaText}
        benefits={dorDeDenteConfig.benefits}
        backgroundImage={dorDeDenteConfig.hero.backgroundImage}
        whatsappNumber={dorDeDenteConfig.whatsapp.number}
        whatsappMessage={dorDeDenteConfig.whatsapp.message}
      />

      {/* Problem section */}
      <div className="min-h-screen">
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialProblem
            title={dorDeDenteConfig.problem.title}
            description={dorDeDenteConfig.problem.description}
            problems={dorDeDenteConfig.problem.problems}
          />
        </Suspense>
      </div>

      {/* Guide section */}
      <div className="min-h-screen">
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialGuide
            title={dorDeDenteConfig.guide.title}
            subtitle={dorDeDenteConfig.guide.subtitle}
            steps={dorDeDenteConfig.guide.steps}
          />
        </Suspense>
      </div>

      {/* Social Proof section */}
      <div className="min-h-screen">
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialSocialProof
            title={dorDeDenteConfig.socialProof.title}
            testimonials={dorDeDenteConfig.socialProof.testimonials}
            stats={dorDeDenteConfig.socialProof.stats}
          />
        </Suspense>
      </div>

      {/* FAQ section */}
      <div className="min-h-screen">
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialFAQ
            title={dorDeDenteConfig.faq.title}
            questions={dorDeDenteConfig.faq.questions}
          />
        </Suspense>
      </div>

      {/* CTA section */}
      <div className="min-h-screen">
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialCTA
            title={dorDeDenteConfig.cta.title}
            subtitle={dorDeDenteConfig.cta.subtitle}
            buttonText={dorDeDenteConfig.cta.buttonText}
            whatsappNumber={dorDeDenteConfig.whatsapp.number}
            whatsappMessage={dorDeDenteConfig.whatsapp.message}
            campaign={dorDeDenteConfig.campaign}
            messageMatch={dorDeDenteConfig.messageMatch}
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
            phoneNumber={dorDeDenteConfig.whatsapp.number}
            message={dorDeDenteConfig.whatsapp.message}
            campaign={dorDeDenteConfig.campaign}
            messageMatch={dorDeDenteConfig.messageMatch}
          />
        </Suspense>
      </div>
      </ErrorBoundary>
    </>
  );
};

export default DorDeDenteLandingPage;