import React, { useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { limpezaDentalConfig } from '@/config/limpezaDentalConfig';
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { captureGCLID, sendGCLIDToWebhook } from '@/utils/gclid';

// Performance Components
import CriticalCSSInline from '@/components/performance/CriticalCSSInline';
import LazySection from '@/components/performance/LazySection';
import ContentfulBlocker from '@/components/performance/ContentfulBlocker';
import FastServerResponseOptimizer from '@/components/performance/FastServerResponseOptimizer';
import CriticalCSSOptimizer from '@/components/performance/CriticalCSSOptimizer';
import AsyncScriptManager from '@/components/performance/AsyncScriptManager';
import NonCriticalCSSLoader from '@/components/performance/NonCriticalCSSLoader';

// Critical (above-the-fold) components - load immediately
import LimpezaDentalHero from '@/components/landing/limpeza/LimpezaDentalHero';

// Lazy-loaded components for better performance
const LimpezaDentalBeneficios = lazy(() => import('@/components/landing/limpeza/LimpezaDentalBeneficios'));
const LimpezaDentalProcesso = lazy(() => import('@/components/landing/limpeza/LimpezaDentalProcesso'));
const ConsultaInicialSocialProof = lazy(() => import('@/components/landing/consulta/ConsultaInicialSocialProof'));
const LimpezaDentalFAQ = lazy(() => import('@/components/landing/limpeza/LimpezaDentalFAQ'));
const LimpezaDentalCTA = lazy(() => import('@/components/landing/limpeza/LimpezaDentalCTA'));
const ClareamentoFooter = lazy(() => import('@/components/landing/clareamento/ClareamentoFooter'));
const FloatingWhatsApp = lazy(() => import('@/components/landing/FloatingWhatsApp'));

// Skeleton Components
const SocialProofSkeleton = lazy(() => import('@/components/skeleton/SocialProofSkeleton'));
const FAQSkeleton = lazy(() => import('@/components/skeleton/FAQSkeleton'));
const FooterSkeleton = lazy(() => import('@/components/skeleton/FooterSkeleton'));
const WhatsAppSkeleton = lazy(() => import('@/components/skeleton/WhatsAppSkeleton'));

const LimpezaDentalLandingPage: React.FC = () => {
  // Preload critical images for LCP optimization
  useCriticalImagePreload({ images: ['/lovable-uploads/vertical-de-jaleco.webp'] });

  useEffect(() => {
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
      if (typeof window !== 'undefined' && !window.gtmLoaded && limpezaDentalConfig.tracking.gtmId) {
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtm.js?id=${limpezaDentalConfig.tracking.gtmId}`;
        script.async = true;
        document.head.appendChild(script);
        window.gtmLoaded = true;
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
  useScrollTracking({ enabled: process.env.NODE_ENV === 'production' });

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{limpezaDentalConfig.seo.title}</title>
        <meta name="title" content={limpezaDentalConfig.seo.title} />
        <meta name="description" content={limpezaDentalConfig.seo.description} />
        <meta name="keywords" content={limpezaDentalConfig.seo.keywords?.join(', ')} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Dra. Carla Christoph" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://dracarladentalcare.com.br/lp/limpeza-dental-ipanema" />

        {/* Critical CSS for above-the-fold content */}
        <style type="text/css">{`
          .hero-critical { min-height: 100vh; background: linear-gradient(135deg, #381F47 0%, #4A2B5A 50%, #381F47 100%); }
          .hero-content { display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: center; padding: 5rem 1rem; }
          @media (min-width: 1024px) { .hero-content { grid-template-columns: 1fr 1fr; } }
          .hero-text { color: white; }
          .hero-title { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: bold; line-height: 1.2; margin-bottom: 1.5rem; }
          .hero-subtitle { font-size: 1.125rem; opacity: 0.9; margin-bottom: 2rem; }
          .hero-cta { background: #16a34a; color: white; padding: 1rem 2rem; border-radius: 0.5rem; font-weight: 600; text-decoration: none; display: inline-block; }
        `}</style>

        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" 
          as="style" 
          onload="this.onload=null;this.rel='stylesheet'"
        />

        {/* Preload critical images */}
        <link rel="preload" href="/lovable-uploads/vertical-de-jaleco.webp" as="image" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//wa.me" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />

        {/* Defer non-critical CSS */}
        <link 
          rel="preload" 
          href="/css/non-critical.css" 
          as="style" 
          onload="this.onload=null;this.rel='stylesheet'"
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

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarladentalcare.com.br/lp/limpeza-dental-ipanema" />
        <meta property="og:title" content={limpezaDentalConfig.seo.title} />
        <meta property="og:description" content={limpezaDentalConfig.seo.description} />
        <meta property="og:image" content="https://dracarladentalcare.com.br/lovable-uploads/vertical-de-jaleco.webp" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:site_name" content="Dra. Carla Christoph" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dracarladentalcare.com.br/lp/limpeza-dental-ipanema" />
        <meta property="twitter:title" content={limpezaDentalConfig.seo.title} />
        <meta property="twitter:description" content={limpezaDentalConfig.seo.description} />
        <meta property="twitter:image" content="https://dracarladentalcare.com.br/lovable-uploads/vertical-de-jaleco.webp" />

        {/* Structured Data - Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Dra. Carla Christoph",
            "description": "Limpeza dental com tecnologia ultrassônica em Ipanema. Especialista em odontologia preventiva com mais de 20 anos de experiência.",
            "url": "https://dracarladentalcare.com.br/lp/limpeza-dental-ipanema",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ipanema",
              "addressRegion": "Rio de Janeiro",
              "addressCountry": "BR"
            },
            "telephone": "+5521993304045",
            "priceRange": "$$",
            "areaServed": "Rio de Janeiro",
            "speciality": ["Limpeza Dental", "Profilaxia", "Odontologia Preventiva"],
            "image": "https://dracarladentalcare.com.br/lovable-uploads/vertical-de-jaleco.webp"
          })}
        </script>

        {/* Structured Data - Medical Procedure */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Limpeza Dental com Tecnologia Ultrassônica",
            "description": "Profilaxia profissional que remove 95% do biofilme causador de cáries e mau hálito, utilizando tecnologia ultrassônica confortável.",
            "procedureType": "Preventive",
            "bodyLocation": "Teeth",
            "duration": "PT30M",
            "preparation": "Nenhuma preparação especial necessária",
            "followup": "Retorno em 6 meses para manutenção"
          })}
        </script>
      </Helmet>

      {/* Performance optimization components */}
      <FastServerResponseOptimizer />
      <CriticalCSSOptimizer />
      <AsyncScriptManager />

      {/* Critical above-the-fold content */}
      <CriticalCSSInline />
      <ContentfulBlocker />
      
      {/* Hero Section - Critical, loads immediately */}
      <LimpezaDentalHero
        headline={limpezaDentalConfig.hero.headline}
        subheadline={limpezaDentalConfig.hero.subheadline}
        ctaText={limpezaDentalConfig.hero.ctaText}
        benefits={limpezaDentalConfig.benefits}
        whatsappNumber={limpezaDentalConfig.whatsapp.number}
        whatsappMessage={limpezaDentalConfig.whatsapp.message}
        campaign={limpezaDentalConfig.campaign}
        messageMatch={limpezaDentalConfig.messageMatch}
      />

      {/* Lazy-loaded sections for better performance */}
      <LazySection>
        <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse"></div>}>
          <LimpezaDentalBeneficios
            title={limpezaDentalConfig.problem.title}
            description={limpezaDentalConfig.problem.description}
            problems={limpezaDentalConfig.problem.problems}
          />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<div className="h-96 bg-white animate-pulse"></div>}>
          <LimpezaDentalProcesso
            title={limpezaDentalConfig.guide.title}
            subtitle={limpezaDentalConfig.guide.subtitle}
            steps={limpezaDentalConfig.guide.steps}
          />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<SocialProofSkeleton />}>
          <ConsultaInicialSocialProof
            title={limpezaDentalConfig.socialProof.title}
            testimonials={limpezaDentalConfig.socialProof.testimonials}
            stats={limpezaDentalConfig.socialProof.stats}
          />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<FAQSkeleton />}>
          <LimpezaDentalFAQ
            title={limpezaDentalConfig.faq.title}
            questions={limpezaDentalConfig.faq.questions}
          />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<div className="h-64 bg-gradient-to-br from-purple-800 to-purple-900 animate-pulse"></div>}>
          <LimpezaDentalCTA
            title={limpezaDentalConfig.cta.title}
            subtitle={limpezaDentalConfig.cta.subtitle}
            buttonText={limpezaDentalConfig.cta.buttonText}
            urgency={limpezaDentalConfig.cta.urgency}
            whatsappNumber={limpezaDentalConfig.whatsapp.number}
            whatsappMessage={limpezaDentalConfig.whatsapp.message}
            campaign={limpezaDentalConfig.campaign}
            messageMatch={limpezaDentalConfig.messageMatch}
          />
        </Suspense>
      </LazySection>

      <LazySection>
        <Suspense fallback={<FooterSkeleton />}>
          <ClareamentoFooter
            doctorName={limpezaDentalConfig.contact.doctorName}
            clinicName={limpezaDentalConfig.contact.clinicName}
            phoneNumber={limpezaDentalConfig.whatsapp.number}
          />
        </Suspense>
      </LazySection>

      {/* Floating WhatsApp - Lazy loaded */}
      <LazySection>
        <Suspense fallback={<WhatsAppSkeleton />}>
          <FloatingWhatsApp
            phoneNumber={limpezaDentalConfig.whatsapp.number}
            message={limpezaDentalConfig.whatsapp.message}
            campaign={limpezaDentalConfig.campaign}
            messageMatch={limpezaDentalConfig.messageMatch}
          />
        </Suspense>
      </LazySection>

      {/* Load non-critical CSS after 2 seconds */}
      <NonCriticalCSSLoader delay={2000} />
    </>
  );
};

export default LimpezaDentalLandingPage;