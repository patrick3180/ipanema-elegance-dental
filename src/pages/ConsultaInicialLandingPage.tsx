import React, { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { captureGCLID } from '@/utils/gclid';
import { consultaInicialConfig } from '@/config/consultaInicialConfig';
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import useScrollTracking from '@/hooks/useScrollTracking';

// Performance Components (eager loading for critical path)
import UltraFastServerOptimizer from '@/components/performance/UltraFastServerOptimizer';
import CriticalCSSOptimizer from '@/components/performance/CriticalCSSOptimizer';
import NonCriticalCSSLoader from '@/components/performance/NonCriticalCSSLoader';
import AsyncScriptManager from '@/components/performance/AsyncScriptManager';

// Critical above-the-fold components (eager loading)
import ConsultaInicialHeader from '@/components/landing/consulta/ConsultaInicialHeader';
import ConsultaInicialHero from '@/components/landing/consulta/ConsultaInicialHero';
import ConsultaInicialProblem from '@/components/landing/consulta/ConsultaInicialProblem';
import ConsultaInicialGuide from '@/components/landing/consulta/ConsultaInicialGuide';

// Lazy-loaded components for below-the-fold content
const ConsultaInicialSocialProof = lazy(() => import('@/components/landing/consulta/ConsultaInicialSocialProof'));
const ConsultaInicialFAQ = lazy(() => import('@/components/landing/consulta/ConsultaInicialFAQ'));
const ConsultaInicialCTA = lazy(() => import('@/components/landing/consulta/ConsultaInicialCTA'));
const ClareamentoFooter = lazy(() => import('@/components/landing/clareamento/ClareamentoFooter'));
const FloatingWhatsApp = lazy(() => import('@/components/landing/FloatingWhatsApp'));

// Skeleton Components for lazy loading
import SocialProofSkeleton from '@/components/skeleton/SocialProofSkeleton';
import FAQSkeleton from '@/components/skeleton/FAQSkeleton';
import FooterSkeleton from '@/components/skeleton/FooterSkeleton';
import WhatsAppSkeleton from '@/components/skeleton/WhatsAppSkeleton';

const ConsultaInicialLandingPage = () => {
  // Critical image preloading for LCP optimization
  useCriticalImagePreload({
    images: [
      { src: '/lovable-uploads/RIT08058-vertical-doutora-site.webp', width: 1024 }
    ],
    enabled: true
  });

  useEffect(() => {
    // Capture GCLID for conversion tracking
    captureGCLID();
    
    // Push page_view event to dataLayer for GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: consultaInicialConfig.seo.title,
        page_location: window.location.href,
        page_path: '/lp/consulta-inicial',
        campaign: consultaInicialConfig.campaign,
        ad_group: consultaInicialConfig.messageMatch.adGroup,
        keyword: consultaInicialConfig.messageMatch.keyword
      });
    }
  }, []);

  // Production scroll tracking
  useScrollTracking({ 
    pagePath: '/lp/consulta-inicial',
    enabled: process.env.NODE_ENV === 'production'
  });

  return (
    <>
      {/* Critical SEO and Performance Head Tags */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{consultaInicialConfig.seo.title}</title>
        <meta name="title" content={consultaInicialConfig.seo.title} />
        <meta name="description" content={consultaInicialConfig.seo.description} />
        <meta name="keywords" content={consultaInicialConfig.seo.keywords?.join(', ')} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Portuguese" />
        <meta name="author" content="Dra. Carla Christoph" />

        {/* Critical CSS - Only above-the-fold styles */}
        <style type="text/css">{`
          body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
          .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
          @media (min-width: 1024px) { .container { padding: 0 2rem; } }
        `}</style>

        {/* Critical Resource Preloads */}
        <link rel="preload" href="/lovable-uploads/RIT08058-vertical-doutora-site.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.whatsapp.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Deferred CSS Loading */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Deferred Scripts */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${consultaInicialConfig.tracking.gtagId}`}></script>
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarla.lovable.app/lp/consulta-inicial" />
        <meta property="og:title" content={consultaInicialConfig.seo.title} />
        <meta property="og:description" content={consultaInicialConfig.seo.description} />
        <meta property="og:image" content="/lovable-uploads/RIT08058-vertical-doutora-site.webp" />
        <meta property="og:site_name" content="Dra. Carla Christoph" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dracarla.lovable.app/lp/consulta-inicial" />
        <meta property="twitter:title" content={consultaInicialConfig.seo.title} />
        <meta property="twitter:description" content={consultaInicialConfig.seo.description} />
        <meta property="twitter:image" content="/lovable-uploads/RIT08058-vertical-doutora-site.webp" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Dra. Carla Christoph",
            "description": consultaInicialConfig.seo.description,
            "url": "https://dracarla.lovable.app/lp/consulta-inicial",
            "telephone": "+5521993304045",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ipanema",
              "addressRegion": "Rio de Janeiro",
              "addressCountry": "BR"
            },
            "speciality": ["Prótese Dental", "Implantodontia", "Consulta Odontológica"],
            "image": "/lovable-uploads/RIT08058-vertical-doutora-site.webp"
          })}
        </script>
      </Helmet>

      {/* Performance Optimization Components */}
      <UltraFastServerOptimizer 
        targetTTFB={200}
        enableEdgeOptimization={true}
      />
      <CriticalCSSOptimizer 
        inlineStyles={`
          .hero-section { contain: layout style paint; }
          .hero-image-container { aspect-ratio: 1024/1365; will-change: transform; }
          .benefits-grid { contain: layout; }
        `} 
      />
      <AsyncScriptManager gtmId={consultaInicialConfig.tracking.gtmId} />

      {/* Page Content */}
      <main className="min-h-screen bg-white">
        {/* Critical Above-the-fold Content */}
        <ConsultaInicialHeader 
          whatsappNumber={consultaInicialConfig.whatsapp.number}
          whatsappMessage={consultaInicialConfig.whatsapp.message}
          campaign={consultaInicialConfig.campaign}
          messageMatch={consultaInicialConfig.messageMatch}
        />
        
        <ConsultaInicialHero
          headline={consultaInicialConfig.hero.headline}
          subheadline={consultaInicialConfig.hero.subheadline}
          ctaText={consultaInicialConfig.hero.ctaText}
          benefits={consultaInicialConfig.benefits}
          backgroundImage={consultaInicialConfig.hero.backgroundImage || ''}
          whatsappNumber={consultaInicialConfig.whatsapp.number}
          whatsappMessage={consultaInicialConfig.whatsapp.message}
        />

        <ConsultaInicialProblem
          title={consultaInicialConfig.problem.title}
          description={consultaInicialConfig.problem.description}
          problems={consultaInicialConfig.problem.problems}
        />

        <ConsultaInicialGuide
          title={consultaInicialConfig.guide.title}
          subtitle={consultaInicialConfig.guide.subtitle}
          steps={consultaInicialConfig.guide.steps}
        />

        {/* Lazy-loaded Below-the-fold Content */}
        <Suspense fallback={<SocialProofSkeleton />}>
          <ConsultaInicialSocialProof
            title={consultaInicialConfig.socialProof.title}
            testimonials={consultaInicialConfig.socialProof.testimonials}
            stats={consultaInicialConfig.socialProof.stats}
          />
        </Suspense>

        <Suspense fallback={<FAQSkeleton />}>
          <ConsultaInicialFAQ
            title={consultaInicialConfig.faq.title}
            questions={consultaInicialConfig.faq.questions}
          />
        </Suspense>

        <Suspense fallback={<div className="min-h-[200px] bg-[#381F47]" />}>
          <ConsultaInicialCTA
            title={consultaInicialConfig.cta.title}
            subtitle={consultaInicialConfig.cta.subtitle}
            buttonText={consultaInicialConfig.cta.buttonText}
            urgency={consultaInicialConfig.cta.urgency}
            whatsappNumber={consultaInicialConfig.whatsapp.number}
            whatsappMessage={consultaInicialConfig.whatsapp.message}
            campaign={consultaInicialConfig.campaign}
            messageMatch={consultaInicialConfig.messageMatch}
          />
        </Suspense>

        <Suspense fallback={<FooterSkeleton />}>
          <ClareamentoFooter />
        </Suspense>

        {/* Mobile Floating WhatsApp */}
        <Suspense fallback={<WhatsAppSkeleton />}>
          <FloatingWhatsApp
            phoneNumber={consultaInicialConfig.whatsapp.number}
            message={consultaInicialConfig.whatsapp.message}
            campaign={consultaInicialConfig.campaign}
            messageMatch={consultaInicialConfig.messageMatch}
          />
        </Suspense>
      </main>

      {/* Non-critical CSS loading after main content */}
      <NonCriticalCSSLoader delay={100} />
    </>
  );
};

export default ConsultaInicialLandingPage;