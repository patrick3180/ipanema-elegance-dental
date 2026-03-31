import React, { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { captureGCLID } from '@/utils/gclid';
import { consultaInicialConfig } from '@/config/consultaInicialConfig';
import { GTMManager } from '@/components/performance/GTMManager';
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import useScrollTracking from '@/hooks/useScrollTracking';

// Performance Components (critical path)
import CriticalCSSInline from '@/components/performance/CriticalCSSInline';
import LazySection from '@/components/performance/LazySection';
import ContentfulBlocker from '@/components/performance/ContentfulBlocker';

// Critical above-the-fold components (eager loading)
import ConsultaInicialHeader from '@/components/landing/consulta/ConsultaInicialHeader';
import ConsultaInicialHero from '@/components/landing/consulta/ConsultaInicialHero';
import StatsBar from '@/components/treatment/StatsBar';

// Lazy-loaded components for below-the-fold content
const ConsultaInicialProblem = lazy(() => import('@/components/landing/consulta/ConsultaInicialProblem'));
const ConsultaInicialDoctorBio = lazy(() => import('@/components/landing/consulta/ConsultaInicialDoctorBio'));
const ConsultaInicialGuide = lazy(() => import('@/components/landing/consulta/ConsultaInicialGuide'));
const ConsultaInicialMidCTA = lazy(() => import('@/components/landing/consulta/ConsultaInicialMidCTA'));
const ConsultaInicialSocialProof = lazy(() => import('@/components/landing/consulta/ConsultaInicialSocialProof'));
const ConsultaInicialFAQ = lazy(() => import('@/components/landing/consulta/ConsultaInicialFAQ'));
const ConsultaInicialCTA = lazy(() => import('@/components/landing/consulta/ConsultaInicialCTA'));
const LandingFooter = lazy(() => import('@/components/landing/LandingFooter'));
const FloatingWhatsApp = lazy(() => import('@/components/landing/FloatingWhatsApp'));

// Fade-in animation styles
const fadeInStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }
`;

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

    // Push page_view event (GTM is loaded via index.html)
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
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
      <GTMManager gtmId={consultaInicialConfig.tracking.gtmId} />
      {/* Optimized SEO Head Tags */}
      <Helmet>
        {/* Fade-in animation CSS */}
        <style>{fadeInStyles}</style>

        {/* Primary Meta Tags */}
        <title>{consultaInicialConfig.seo.title}</title>
        <meta name="description" content={consultaInicialConfig.seo.description} />
        <meta name="keywords" content={consultaInicialConfig.seo.keywords?.join(', ')} />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* Critical Resource Preloads - Only essentials */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//api.whatsapp.com" />

        {/* Optimized font loading - load asynchronously */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          media="print"
          onLoad={(e: any) => { e.target.media = 'all'; }}
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/lp/consulta-inicial" />
        <meta property="og:title" content={consultaInicialConfig.seo.title} />
        <meta property="og:description" content={consultaInicialConfig.seo.description} />
        <meta property="og:image" content="https://dracarlachristoph.com/lovable-uploads/RIT08058-vertical-doutora-site.webp" />
        <meta property="og:site_name" content="Dra. Carla Christoph" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dracarlachristoph.com/lp/consulta-inicial" />
        <meta property="twitter:title" content={consultaInicialConfig.seo.title} />
        <meta property="twitter:description" content={consultaInicialConfig.seo.description} />
        <meta property="twitter:image" content="/lovable-uploads/RIT08058-vertical-doutora-site.webp" />

        {/* Schema.org structured data - Dentist + Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Dentist",
                "name": "Dra. Carla Christoph",
                "description": consultaInicialConfig.seo.description,
                "url": "https://dracarlachristoph.com/lp/consulta-inicial",
                "telephone": "+5521993304045",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107",
                  "addressLocality": "Ipanema",
                  "addressRegion": "RJ",
                  "postalCode": "22410-002",
                  "addressCountry": "BR"
                },
                "speciality": ["Prótese Dental", "Implantodontia", "Consulta Odontológica"],
                "image": "/lovable-uploads/RIT08058-vertical-doutora-site.webp"
              },
              {
                "@type": "Service",
                "name": "Consulta Odontológica Personalizada",
                "description": "Consulta com mínimo de 1 hora dedicada ao caso do paciente. Inclui anamnese, exame clínico completo, radiografias quando necessário e profilaxia.",
                "provider": {
                  "@type": "Dentist",
                  "name": "Dra. Carla Christoph"
                },
                "areaServed": {
                  "@type": "City",
                  "name": "Rio de Janeiro"
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": consultaInicialConfig.faq.questions.map(q => ({
                  "@type": "Question",
                  "name": q.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": q.answer
                  }
                }))
              }
            ]
          })}
        </script>
      </Helmet>

      {/* EMERGENCY PERFORMANCE OPTIMIZATIONS */}
      <CriticalCSSInline />
      <ContentfulBlocker />

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

        {/* StatsBar - Authority signal immediately after hero */}
        <StatsBar />

        {/* Empathetic Problem Section */}
        <LazySection
          fallback={<div className="h-96 bg-white animate-pulse" />}
          threshold={0.1}
          rootMargin="100px"
        >
          <Suspense fallback={<div className="h-96 bg-white" />}>
            <div className="animate-fade-in-up">
              <ConsultaInicialProblem
                title={consultaInicialConfig.problem.title}
                description={consultaInicialConfig.problem.description}
                problems={consultaInicialConfig.problem.problems}
              />
            </div>
          </Suspense>
        </LazySection>

        {/* Doctor Bio - Authority & Trust */}
        <LazySection
          fallback={<div className="h-64 bg-white animate-pulse" />}
          threshold={0.1}
          rootMargin="100px"
        >
          <Suspense fallback={<div className="h-64 bg-white" />}>
            <div className="animate-fade-in-up">
              <ConsultaInicialDoctorBio />
            </div>
          </Suspense>
        </LazySection>

        {/* Guide Section */}
        <LazySection
          fallback={<div className="h-96 bg-white animate-pulse" />}
          threshold={0.1}
          rootMargin="100px"
        >
          <Suspense fallback={<div className="h-96 bg-white" />}>
            <div className="animate-fade-in-up">
              <ConsultaInicialGuide
                title={consultaInicialConfig.guide.title}
                subtitle={consultaInicialConfig.guide.subtitle}
                steps={consultaInicialConfig.guide.steps}
              />
            </div>
          </Suspense>
        </LazySection>

        {/* Mid-page CTA - Between guide and social proof */}
        <LazySection
          fallback={<div className="h-32 animate-pulse" />}
          threshold={0.1}
          rootMargin="50px"
        >
          <Suspense fallback={<div className="h-32" />}>
            <ConsultaInicialMidCTA
              whatsappNumber={consultaInicialConfig.whatsapp.number}
              whatsappMessage={consultaInicialConfig.whatsapp.message}
            />
          </Suspense>
        </LazySection>

        {/* Social Proof Section */}
        <LazySection
          fallback={<div className="h-96 bg-gray-50 animate-pulse" />}
          threshold={0.1}
          rootMargin="50px"
        >
          <Suspense fallback={<div className="h-96 bg-gray-50" />}>
            <div className="animate-fade-in-up">
              <ConsultaInicialSocialProof
                title={consultaInicialConfig.socialProof.title}
                testimonials={consultaInicialConfig.socialProof.testimonials}
                stats={consultaInicialConfig.socialProof.stats}
              />
            </div>
          </Suspense>
        </LazySection>

        {/* FAQ Section */}
        <LazySection
          fallback={<div className="h-96 bg-white animate-pulse" />}
          threshold={0.1}
          rootMargin="50px"
        >
          <Suspense fallback={<div className="h-96 bg-white" />}>
            <div className="animate-fade-in-up">
              <ConsultaInicialFAQ
                title={consultaInicialConfig.faq.title}
                questions={consultaInicialConfig.faq.questions}
              />
            </div>
          </Suspense>
        </LazySection>

        {/* Final CTA Section */}
        <LazySection
          fallback={<div className="h-32 bg-[#381F47] animate-pulse" />}
          threshold={0.1}
        >
          <Suspense fallback={<div className="h-32 bg-[#381F47]" />}>
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
        </LazySection>

        <LazySection
          fallback={<div className="h-64 bg-[#381F47] animate-pulse" />}
          threshold={0.1}
        >
          <Suspense fallback={<div className="h-64 bg-[#381F47]" />}>
            <LandingFooter doctorName="Dra. Carla Christoph" clinicName="Ipanema Elegance Dental" phoneNumber="(21) 99330-4045" />
          </Suspense>
        </LazySection>

        {/* Mobile Floating WhatsApp - Load after user interaction */}
        <LazySection
          fallback={null}
          threshold={0}
          rootMargin="0px"
        >
          <Suspense fallback={null}>
            <FloatingWhatsApp
              phoneNumber={consultaInicialConfig.whatsapp.number}
              message={consultaInicialConfig.whatsapp.message}
              campaign={consultaInicialConfig.campaign}
              messageMatch={consultaInicialConfig.messageMatch}
            />
          </Suspense>
        </LazySection>
      </main>

    </>
  );
};

export default ConsultaInicialLandingPage;