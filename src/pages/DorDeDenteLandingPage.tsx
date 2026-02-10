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
  const criticalImages = [
    {
      src: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp',
      type: 'webp' as const,
      priority: true
    }
  ];

  useCriticalImagePreload({ images: [{ src: dorDeDenteConfig.hero.backgroundImage }] });

  useEffect(() => {
    console.debug('[LP Dor de Dente] Mounted at', new Date().toISOString());
    captureGCLID();

    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',
        page_title: 'Dor de Dente Urgência - Ipanema',
        page_location: window.location.href,
        campaign: dorDeDenteConfig.campaign
      });
    }
  }, []);

  useScrollTracking({ 
    pagePath: '/lp/dor-de-dente-urgencia-ipanema', 
    enabled: process.env.NODE_ENV === 'production' 
  });

  return (
    <>
      <CriticalCSSInline />
      <ResourceHintsOptimizer />
      <NonCriticalCSSLoader />
      <SmartContentfulCache />
      <CoreWebVitalsMonitor />
      <HeroImagePreloader images={criticalImages} />
      
      <Helmet>
        <title>{dorDeDenteConfig.seo.title}</title>
        <meta name="description" content={dorDeDenteConfig.seo.description} />
        <meta name="keywords" content={dorDeDenteConfig.seo.keywords.join(', ')} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://dracarlachristoph.com/lp/dor-de-dente-urgencia-ipanema" />

        <meta property="og:title" content={dorDeDenteConfig.seo.title} />
        <meta property="og:description" content={dorDeDenteConfig.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/lp/dor-de-dente-urgencia-ipanema" />
        <meta property="og:image" content={`https://dracarlachristoph.com${dorDeDenteConfig.hero.backgroundImage}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dorDeDenteConfig.seo.title} />
        <meta name="twitter:description" content={dorDeDenteConfig.seo.description} />
        <meta name="twitter:image" content={`https://dracarlachristoph.com${dorDeDenteConfig.hero.backgroundImage}`} />

        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" 
          as="style" 
          onLoad={(e: any) => { 
            e.target.rel = 'stylesheet'; 
            e.target.onload = null; 
          }}
        />

        <link 
          rel="preload" 
          href="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
          as="image" 
          type="image/webp"
          fetchPriority="high"
        />

        <link rel="preload" href="/fonts/montserrat-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/montserrat-500.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/playfair-display-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//wa.me" />
        <link rel="dns-prefetch" href="//www.bing.com" />
        <link rel="dns-prefetch" href="//cdn.contentful.com" />

        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.bing.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.contentful.com" crossOrigin="anonymous" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Dra. Carla Christoph",
            "description": dorDeDenteConfig.seo.description,
            "url": "https://dracarlachristoph.com/lp/dor-de-dente-urgencia-ipanema",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107",
              "addressLocality": "Ipanema",
              "addressRegion": "RJ",
              "postalCode": "22410-002",
              "addressCountry": "BR"
            },
            "telephone": "+5521993304045",
            "priceRange": "$$",
            "areaServed": "Rio de Janeiro"
          })}
        </script>

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

        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialProblem
            title={dorDeDenteConfig.problem.title}
            description={dorDeDenteConfig.problem.description}
            problems={dorDeDenteConfig.problem.problems}
          />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialGuide
            title={dorDeDenteConfig.guide.title}
            subtitle={dorDeDenteConfig.guide.subtitle}
            steps={dorDeDenteConfig.guide.steps}
          />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialSocialProof
            title={dorDeDenteConfig.socialProof.title}
            testimonials={dorDeDenteConfig.socialProof.testimonials}
            stats={dorDeDenteConfig.socialProof.stats}
          />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ConsultaInicialFAQ
            title={dorDeDenteConfig.faq.title}
            questions={dorDeDenteConfig.faq.questions}
          />
        </Suspense>

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

        <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse" />}>
          <ClareamentoFooter />
        </Suspense>

        <Suspense fallback={null}>
          <FloatingWhatsApp
            phoneNumber={dorDeDenteConfig.whatsapp.number}
            message={dorDeDenteConfig.whatsapp.message}
            campaign={dorDeDenteConfig.campaign}
            messageMatch={dorDeDenteConfig.messageMatch}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default DorDeDenteLandingPage;
