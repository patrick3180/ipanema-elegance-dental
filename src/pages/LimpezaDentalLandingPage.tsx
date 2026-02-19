import React, { useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { limpezaDentalConfig } from '@/config/limpezaDentalConfig';
import { captureGCLID } from '@/utils/gclid';
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import CriticalCSSInliner from '@/components/performance/CriticalCSSInliner';
import HeroImagePreloader from '@/components/performance/HeroImagePreloader';
import ErrorBoundary from '@/components/performance/ErrorBoundary';
import LazySection from '@/components/performance/LazySection';
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
const LandingFooter = React.lazy(() => import('@/components/landing/LandingFooter'));
const FloatingWhatsApp = React.lazy(() => import('@/components/landing/FloatingWhatsApp'));

const LimpezaDentalLandingPage: React.FC = () => {
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

  useCriticalImagePreload({ images: [{ src: limpezaDentalConfig.hero.backgroundImage }] });

  useEffect(() => {
    console.debug('[LP Limpeza] Mounted at', new Date().toISOString());
    captureGCLID();

    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',
        page_title: 'Limpeza Dental Profissional - Ipanema',
        page_location: window.location.href,
        campaign: limpezaDentalConfig.campaign
      });
    }
  }, []);

  useScrollTracking({
    pagePath: '/lp/limpeza-dental-ipanema',
    enabled: process.env.NODE_ENV === 'production'
  });

  return (
    <>
      <GTMManager gtmId={limpezaDentalConfig.tracking.gtmId} />
      <CriticalCSSInliner />
      <HeroImagePreloader images={criticalImages} />

      <Helmet>
        <title>{limpezaDentalConfig.seo.title}</title>
        <meta name="description" content={limpezaDentalConfig.seo.description} />
        <meta name="keywords" content={limpezaDentalConfig.seo.keywords.join(', ')} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://dracarlachristoph.com/lp/limpeza-dental-ipanema" />

        <meta property="og:title" content={limpezaDentalConfig.seo.title} />
        <meta property="og:description" content={limpezaDentalConfig.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/lp/limpeza-dental-ipanema" />
        <meta property="og:image" content={`https://dracarlachristoph.com${limpezaDentalConfig.hero.backgroundImage}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={limpezaDentalConfig.seo.title} />
        <meta name="twitter:description" content={limpezaDentalConfig.seo.description} />
        <meta name="twitter:image" content={`https://dracarlachristoph.com${limpezaDentalConfig.hero.backgroundImage}`} />

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

        <link rel="preload" href="/fonts/montserrat-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/montserrat-500.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/playfair-display-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//wa.me" />

        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />

        <link
          rel="preload"
          href="/css/non-critical.css"
          as="style"
          onLoad={() => { }}
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Dra. Carla Christoph",
            "description": limpezaDentalConfig.seo.description,
            "url": "https://dracarlachristoph.com/lp/limpeza-dental-ipanema",
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
            "name": "Limpeza Dental Profissional",
            "description": "Profilaxia profissional com tecnologia ultrassônica que remove tártaro e placa bacteriana",
            "procedureType": "Preventive",
            "bodyLocation": "Teeth"
          })}
        </script>
      </Helmet>

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

        <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.1} rootMargin="100px">
          <Suspense fallback={<div className="h-96 bg-gray-50" />}>
            <ConsultaInicialProblem
              title={limpezaDentalConfig.problem.title}
              description={limpezaDentalConfig.problem.description}
              problems={limpezaDentalConfig.problem.problems}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="100px">
          <Suspense fallback={<div className="h-96 bg-white" />}>
            <ConsultaInicialGuide
              title={limpezaDentalConfig.guide.title}
              subtitle={limpezaDentalConfig.guide.subtitle}
              steps={limpezaDentalConfig.guide.steps}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.1} rootMargin="50px">
          <Suspense fallback={<div className="h-96 bg-gray-50" />}>
            <ConsultaInicialSocialProof
              title={limpezaDentalConfig.socialProof.title}
              testimonials={limpezaDentalConfig.socialProof.testimonials}
              stats={limpezaDentalConfig.socialProof.stats}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="50px">
          <Suspense fallback={<div className="h-96 bg-white" />}>
            <ConsultaInicialFAQ
              title={limpezaDentalConfig.faq.title}
              questions={limpezaDentalConfig.faq.questions}
            />
          </Suspense>
        </LazySection>

        <LazySection fallback={<div className="h-32 bg-[#381F47] animate-pulse" />} threshold={0.1}>
          <Suspense fallback={<div className="h-32 bg-[#381F47]" />}>
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
        </LazySection>

        <LazySection fallback={<div className="h-64 bg-[#381F47] animate-pulse" />} threshold={0.1}>
          <Suspense fallback={<div className="h-64 bg-[#381F47]" />}>
            <LandingFooter doctorName="Dra. Carla Christoph" clinicName="Ipanema Elegance Dental" phoneNumber="(21) 99330-4045" />
          </Suspense>
        </LazySection>

        <LazySection fallback={null} threshold={0} rootMargin="0px">
          <Suspense fallback={null}>
            <FloatingWhatsApp
              phoneNumber={limpezaDentalConfig.whatsapp.number}
              message={limpezaDentalConfig.whatsapp.message}
              campaign={limpezaDentalConfig.campaign}
              messageMatch={limpezaDentalConfig.messageMatch}
            />
          </Suspense>
        </LazySection>
      </ErrorBoundary>
    </>
  );
};

export default LimpezaDentalLandingPage;
