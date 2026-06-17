import React, { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { captureGCLID } from "@/utils/gclid";
import { enCosmeticDentistryLPConfig } from "@/config/enCosmeticDentistryLPConfig";

// Performance
import LazySection from "@/components/performance/LazySection";
import ContentfulBlocker from "@/components/performance/ContentfulBlocker";
import ErrorBoundary from "@/components/performance/ErrorBoundary";

// Critical above-the-fold (eager local implementation)
import { MessageCircle, ArrowRight, Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendGCLIDToWebhook } from "@/utils/gclid";

// Below-the-fold (lazy)
const EnLPProblem = lazy(() => import("@/components/en/lp/EnLPProblem"));
const EnLPDoctorBio = lazy(() => import("@/components/en/lp/EnLPDoctorBio"));
const EnLPServices = lazy(() => import("@/components/en/lp/EnLPServices"));
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

const EnCosmeticDentistryLP: React.FC = () => {
  const config = enCosmeticDentistryLPConfig;

  const handleHeaderWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "whatsapp_click",
        event_category: "Contact",
        event_action: "Click",
        event_label: "WhatsApp EN LP Header",
        campaign: config.campaign,
        ad_group: config.messageMatch.adGroup,
      });
    }

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16894364517/OQZvCMXV0foZEOqP7vY9",
        event_callback: function () {
          console.log("Google Ads conversion tracked - EN LP Header");
        },
      });
    }

    await sendGCLIDToWebhook("en_lp_header_cta");

    const encodedMsg = encodeURIComponent(config.whatsapp.message);
    window.open(
      `https://wa.me/${config.whatsapp.number}?text=${encodedMsg}`,
      "_blank"
    );
  };

  const handleHeroWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "whatsapp_click",
        event_category: "Contact",
        event_action: "Click",
        event_label: "WhatsApp EN LP Hero",
      });
    }

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16894364517/OQZvCMXV0foZEOqP7vY9",
        event_callback: function () {
          console.log("Google Ads conversion tracked - EN LP Hero");
        },
      });
    }

    await sendGCLIDToWebhook("en_lp_hero_cta");

    const encodedMsg = encodeURIComponent(config.whatsapp.message);
    window.open(
      `https://wa.me/${config.whatsapp.number}?text=${encodedMsg}`,
      "_blank"
    );
  };

  useEffect(() => {
    captureGCLID();

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "page_view",
        page_title: config.seo.title,
        page_location: window.location.href,
        page_path: "/en/lp/cosmetic-dentistry",
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
        <meta property="og:url" content="https://dracarlachristoph.com/en/lp/cosmetic-dentistry" />
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
        <link rel="canonical" href="https://dracarlachristoph.com/en/lp/cosmetic-dentistry" />

        {/* Schema.org — @graph (Dentist + Service + FAQPage) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Dentist",
                "@id": "https://dracarlachristoph.com/#dentist",
                "name": "Dr. Carla Christoph",
                "description": config.seo.description,
                "url": "https://dracarlachristoph.com/en/lp/cosmetic-dentistry",
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
                "speciality": ["Prosthodontics", "Implant Dentistry", "Cosmetic Dentistry"],
                "availableLanguage": ["Portuguese", "English", "Spanish"],
                "image": "https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
              },
              {
                "@type": "WebPage",
                "url": "https://dracarlachristoph.com/en/lp/cosmetic-dentistry",
                "datePublished": "2026-04-08",
                "dateModified": "2026-04-10",
                "inLanguage": "en"
              },
              {
                "@type": "Service",
                "name": "Cosmetic Dentistry",
                "description": "Comprehensive cosmetic dentistry including porcelain veneers, teeth whitening, composite bonding, and digital smile planning in Ipanema, Rio de Janeiro.",
                "provider": {
                  "@id": "https://dracarlachristoph.com/#dentist"
                },
                "areaServed": {
                  "@type": "City",
                  "name": "Rio de Janeiro"
                },
                "serviceType": "Cosmetic Dentistry",
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
          {/* === ABOVE THE FOLD LOCAL HEADER === */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16 sm:h-20">
                {/* Logo — no navigation links */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-dental-purple rounded-full flex items-center justify-center">
                    <span className="text-white font-display font-bold text-sm">CC</span>
                  </div>
                  <div className="hidden sm:block">
                    <p className="font-display font-semibold text-dental-purple text-sm leading-tight">
                      Dr. Carla Christoph
                    </p>
                    <p className="text-[10px] text-dental-gray tracking-wide uppercase">
                      Cosmetic Dentist • Ipanema
                    </p>
                  </div>
                </div>

                {/* Single CTA — no menu items */}
                <button
                  onClick={handleHeaderWhatsAppClick}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                >
                  <MessageCircle size={18} />
                  <span className="hidden sm:inline">Book via WhatsApp</span>
                  <span className="sm:hidden">WhatsApp</span>
                </button>
              </div>
            </div>
          </header>

          {/* === ABOVE THE FOLD LOCAL HERO === */}
          <section className="relative min-h-[100dvh] flex items-center bg-dental-beige pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden">
            {/* Subtle decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-dental-beige via-white/50 to-dental-beige pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Left: Content */}
                <div className="order-2 lg:order-1 space-y-6 animate-fade-in-up">
                  {/* Trust badge */}
                  <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-dental-gold/20 rounded-full px-4 py-1.5 text-xs text-dental-purple font-medium">
                    <Globe size={14} className="text-dental-gold" />
                    We reply in your language
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-display font-bold text-dental-purple leading-[1.15] tracking-tight">
                    {config.hero.headline}
                  </h1>

                  <p className="text-base sm:text-lg text-dental-gray leading-relaxed max-w-xl">
                    {config.hero.subheadline}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-2.5">
                    {config.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-dental-gray">
                        <Check size={16} className="text-dental-gold mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="pt-2">
                    <Button
                      onClick={handleHeroWhatsAppClick}
                      className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-8 py-7 text-base sm:text-lg shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl w-full sm:w-auto"
                    >
                      <MessageCircle size={20} className="mr-3" />
                      <div className="flex flex-col text-left leading-tight">
                        <span className="font-semibold">{config.hero.ctaText}</span>
                      </div>
                      <ArrowRight size={16} className="ml-3" />
                    </Button>
                  </div>

                  {/* Micro trust line */}
                  <p className="text-xs text-dental-gray/60">
                    CRO-RJ 27.509 • Rua Visconde de Pirajá, 550 — Ipanema
                  </p>
                </div>

                {/* Right: Image (Sprint 9 / V5 matched exactly with preload) */}
                <div className="order-1 lg:order-2 flex justify-center">
                  <div className="relative w-full max-w-md lg:max-w-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-dental-gold/20 to-dental-purple/10 rounded-2xl -rotate-3 scale-[1.03] blur-sm" />
                    <picture className="bg-transparent block relative rounded-2xl shadow-elegant w-full object-cover">
                      <source
                        srcSet="/lovable-uploads/dra-carla-jaleco-bracos-cruzados-480.avif 480w, /lovable-uploads/dra-carla-jaleco-bracos-cruzados-1024.avif 1024w"
                        sizes="(max-width:767px) 100vw, (min-width:768px) 50vw, 40vw"
                        type="image/avif"
                      />
                      <img
                        src={config.hero.backgroundImage || "/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"}
                        alt="Dr. Carla Christoph — Cosmetic Dentist in Ipanema, Rio de Janeiro"
                        className="rounded-2xl shadow-elegant w-full object-cover"
                        width="760"
                        height="996"
                        loading="eager"
                        fetchPriority="high"
                        style={{ aspectRatio: "760/996" }}
                      />
                    </picture>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === BELOW THE FOLD (lazy) === */}

          {/* Problem / Pain Points */}
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

          {/* Services Showcase */}
          <LazySection
            fallback={<div className="h-96 bg-white animate-pulse" />}
            threshold={0.05}
            rootMargin="200px"
          >
            <Suspense fallback={<div className="h-96 bg-white" />}>
              <div className="animate-fade-in-up">
                <EnLPServices />
              </div>
            </Suspense>
          </LazySection>

          {/* Guide / Treatment Steps */}
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

export default EnCosmeticDentistryLP;
