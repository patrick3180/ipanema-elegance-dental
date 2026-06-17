import React, { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { enGeneralConsultationLPConfig } from "@/config/enGeneralConsultationLPConfig";

// Performance
import LazySection from "@/components/performance/LazySection";
import ErrorBoundary from "@/components/performance/ErrorBoundary";

// Critical above-the-fold (eager)
import EnLPHeader from "@/components/en/lp/EnLPHeader";
import EnLPHero from "@/components/en/lp/EnLPHero";

// Below-the-fold (lazy)
const EnLPProblem = lazy(() => import("@/components/en/lp/EnLPProblem"));
const EnLPDoctorBio = lazy(() => import("@/components/en/lp/EnLPDoctorBio"));
const EnLPGuide = lazy(() => import("@/components/en/lp/EnLPGuide"));
const EnLPMidCTA = lazy(() => import("@/components/en/lp/EnLPMidCTA"));
const EnLPSocialProof = lazy(() => import("@/components/en/lp/EnLPSocialProof"));
const EnLPFAQ = lazy(() => import("@/components/en/lp/EnLPFAQ"));
const EnLPFinalCTA = lazy(() => import("@/components/en/lp/EnLPFinalCTA"));
const EnLPFooter = lazy(() => import("@/components/en/lp/EnLPFooter"));
const EnLPFloatingWhatsApp = lazy(() => import("@/components/en/lp/EnLPFloatingWhatsApp"));

// Inline critical CSS
const criticalStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }
`;

const EnGeneralConsultationLP: React.FC = () => {
  const config = enGeneralConsultationLPConfig;

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "page_view",
        page_title: config.seo.title,
        page_location: window.location.href,
        page_path: "/en/lp/general-consultation",
        campaign: config.campaign,
        ad_group: config.messageMatch.adGroup,
        keyword: config.messageMatch.keyword,
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <style>{criticalStyles}</style>

        {/* Primary Meta */}
        <title>{config.seo.title}</title>
        <meta name="description" content={config.seo.description} />
        <meta name="keywords" content={config.seo.keywords?.join(", ")} />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <html lang="en" />

        {/* Preconnects */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//api.whatsapp.com" />

        {/* OG */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/en/lp/general-consultation" />
        <meta property="og:title" content={config.seo.title} />
        <meta property="og:description" content={config.seo.description} />
        <meta property="og:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />
        <meta property="og:site_name" content="Dr. Carla Christoph" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={config.seo.title} />
        <meta property="twitter:description" content={config.seo.description} />

        {/* Canonical */}
        <link rel="canonical" href="https://dracarlachristoph.com/en/lp/general-consultation" />

        {/* Schema.org — @graph */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Dentist",
                "@id": "https://dracarlachristoph.com/#dentist",
                "name": "Dr. Carla Christoph",
                "description": config.seo.description,
                "url": "https://dracarlachristoph.com/en/lp/general-consultation",
                "telephone": "+5521993304045",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107",
                  "addressLocality": "Ipanema",
                  "addressRegion": "RJ",
                  "postalCode": "22410-901",
                  "addressCountry": "BR"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "-22.9866",
                  "longitude": "-43.2024"
                },
                "speciality": ["Prosthodontics", "Implant Dentistry"],
                "availableLanguage": ["Portuguese", "English", "Spanish"],
                "image": "https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp",
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "19:00"
                }
              },
              {
                "@type": "WebPage",
                "url": "https://dracarlachristoph.com/en/lp/general-consultation",
                "datePublished": "2026-04-10",
                "dateModified": "2026-04-10",
                "inLanguage": "en"
              },
              {
                "@type": "MedicalProcedure",
                "name": "General Dental Checkup and Preventive Care",
                "description": "Comprehensive dental examination with 3D digital scanning, professional cleaning, and personalized prevention plans in Ipanema, Rio de Janeiro.",
                "procedureType": "Dental",
                "provider": {
                  "@id": "https://dracarlachristoph.com/#dentist"
                },
                "areaServed": {
                  "@type": "City",
                  "name": "Rio de Janeiro"
                },
                "inLanguage": "en"
              },
              {
                "@type": "FAQPage",
                "mainEntity": config.faq.questions.map((q) => ({
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

      <ContentfulBlocker />

      <ErrorBoundary>
        <main className="min-h-screen bg-white">
          {/* === ABOVE THE FOLD === */}
          <EnLPHeader
            whatsappNumber={config.whatsapp.number}
            whatsappMessage={config.whatsapp.message}
            campaign={config.campaign}
            messageMatch={config.messageMatch}
          />

          <EnLPHero
            headline={config.hero.headline}
            subheadline={config.hero.subheadline}
            ctaText={config.hero.ctaText}
            benefits={config.benefits}
            backgroundImage={config.hero.backgroundImage!}
            whatsappNumber={config.whatsapp.number}
            whatsappMessage={config.whatsapp.message}
          />

          {/* === BELOW THE FOLD (lazy) === */}

          {/* Problem / Why Patients Delay */}
          <LazySection
            fallback={<div className="h-96 bg-white animate-pulse" />}
            threshold={0.05}
            rootMargin="200px"
          >
            <Suspense fallback={<div className="h-96 bg-white" />}>
              <div className="animate-fade-in-up">
                <EnLPProblem
                  title={config.problem.title}
                  description={config.problem.description}
                  problems={config.problem.problems}
                />
              </div>
            </Suspense>
          </LazySection>

          {/* Doctor Bio */}
          <LazySection
            fallback={<div className="h-64 bg-dental-beige/40 animate-pulse" />}
            threshold={0.05}
            rootMargin="200px"
          >
            <Suspense fallback={<div className="h-64 bg-dental-beige/40" />}>
              <div className="animate-fade-in-up">
                <EnLPDoctorBio />
              </div>
            </Suspense>
          </LazySection>

          {/* Guide / What to Expect */}
          <LazySection
            fallback={<div className="h-96 bg-dental-beige/40 animate-pulse" />}
            threshold={0.05}
            rootMargin="200px"
          >
            <Suspense fallback={<div className="h-96 bg-dental-beige/40" />}>
              <div className="animate-fade-in-up">
                <EnLPGuide
                  title={config.guide.title}
                  subtitle={config.guide.subtitle}
                  steps={config.guide.steps}
                />
              </div>
            </Suspense>
          </LazySection>

          {/* Mid-page CTA */}
          <LazySection
            fallback={<div className="h-32 bg-dental-purple animate-pulse" />}
            threshold={0.1}
            rootMargin="50px"
          >
            <Suspense fallback={<div className="h-32 bg-dental-purple" />}>
              <EnLPMidCTA
                whatsappNumber={config.whatsapp.number}
                whatsappMessage={config.whatsapp.message}
              />
            </Suspense>
          </LazySection>

          {/* Social Proof */}
          <LazySection
            fallback={<div className="h-96 bg-white animate-pulse" />}
            threshold={0.1}
            rootMargin="50px"
          >
            <Suspense fallback={<div className="h-96 bg-white" />}>
              <div className="animate-fade-in-up">
                <EnLPSocialProof
                  title={config.socialProof.title}
                  testimonials={config.socialProof.testimonials}
                  stats={config.socialProof.stats}
                />
              </div>
            </Suspense>
          </LazySection>

          {/* FAQ */}
          <LazySection
            fallback={<div className="h-96 bg-dental-beige/40 animate-pulse" />}
            threshold={0.1}
            rootMargin="50px"
          >
            <Suspense fallback={<div className="h-96 bg-dental-beige/40" />}>
              <div className="animate-fade-in-up">
                <EnLPFAQ
                  title={config.faq.title}
                  questions={config.faq.questions}
                />
              </div>
            </Suspense>
          </LazySection>

          {/* Final CTA */}
          <LazySection
            fallback={<div className="h-64 bg-dental-purple animate-pulse" />}
            threshold={0.1}
          >
            <Suspense fallback={<div className="h-64 bg-dental-purple" />}>
              <EnLPFinalCTA
                title={config.cta.title}
                subtitle={config.cta.subtitle}
                buttonText={config.cta.buttonText}
                urgency={config.cta.urgency}
                whatsappNumber={config.whatsapp.number}
                whatsappMessage={config.whatsapp.message}
                campaign={config.campaign}
                messageMatch={config.messageMatch}
              />
            </Suspense>
          </LazySection>

          {/* Footer */}
          <LazySection
            fallback={<div className="h-32 bg-dental-purple/95 animate-pulse" />}
            threshold={0.1}
          >
            <Suspense fallback={<div className="h-32 bg-dental-purple/95" />}>
              <EnLPFooter />
            </Suspense>
          </LazySection>

          {/* Mobile floating WhatsApp */}
          <LazySection fallback={null} threshold={0} rootMargin="0px">
            <Suspense fallback={null}>
              <EnLPFloatingWhatsApp
                whatsappNumber={config.whatsapp.number}
                whatsappMessage={config.whatsapp.message}
              />
            </Suspense>
          </LazySection>
        </main>
      </ErrorBoundary>
    </>
  );
};

export default EnGeneralConsultationLP;
