import React, { lazy, Suspense } from "react";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Hero from "@/components/Hero";
import HomepageStatsBar from "@/components/HomepageStatsBar";

// Lazy-loaded sections below the fold
const AboutSection = lazy(() => import("@/components/AboutSection"));
const DifferentialsSection = lazy(() => import("@/components/DifferentialsSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const TechnologyShowcase = lazy(() => import("@/components/TechnologyShowcase"));
const TestimonialsCarousel = lazy(() => import("@/components/TestimonialsCarousel"));
const BlogPreview = lazy(() => import("@/components/BlogPreview"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "Dra. Carla Christoph",
    "url": "https://dracarlachristoph.com",
    "logo": "https://dracarlachristoph.com/og-image.jpg",
    "image": "https://dracarlachristoph.com/og-image.jpg",
    "description": "Dentista especialista em Ipanema com mais de 20 anos de experiência. Odontologia estética, implantes dentários, lentes de contato dental, clareamento dental e reabilitação oral.",
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
      "latitude": "-22.9868",
      "longitude": "-43.2005"
    },
    "telephone": "+5521993304045",
    "email": "contato@dracarlachristoph.com",
    "priceRange": "$$$",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "currenciesAccepted": "BRL",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "areaServed": {
      "@type": "City",
      "name": "Rio de Janeiro",
      "sameAs": "https://en.wikipedia.org/wiki/Rio_de_Janeiro"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "-22.9868",
        "longitude": "-43.2005"
      },
      "geoRadius": "50000"
    },
    "sameAs": [
      "https://instagram.com/dracarlachristoph",
      "https://wa.me/5521993304045"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços Odontológicos Especializados",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Implantes Dentários",
            "description": "Implantodontia especializada com mais de 20 anos de experiência"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Lentes de Contato Dental e Facetas",
            "description": "Planejamento digital do sorriso com lentes ultrafinas e facetas de porcelana"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Clareamento Dental Profissional",
            "description": "Clareamento dental seguro e eficaz em consultório ou supervisionado"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Prótese Dentária",
            "description": "Próteses fixas e removíveis para reabilitação oral completa"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Restaurações Estéticas",
            "description": "Restaurações em resina e porcelana para um sorriso natural"
          }
        }
      ]
    },
    "founder": {
      "@type": "Person",
      "name": "Carla Christoph",
      "jobTitle": "Cirurgiã-Dentista",
      "worksFor": {
        "@type": "Organization",
        "name": "Clínica Dra. Carla Christoph"
      },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Especialista em Prótese Dental"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Especialista em Implantodontia"
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Dentista em Ipanema | Clínica Odontológica Dra. Carla Christoph"
        description="Procurando dentista em Ipanema? A Dra. Carla Christoph oferece odontologia estética e reabilitação oral com mínimo de 1 hora por consulta. Agende sua consulta!"
        keywords="dentista Ipanema, clínica odontológica Ipanema, odontologia estética Ipanema, implantes dentários Ipanema, lentes de contato dental, facetas de porcelana, clareamento dental, prótese dentária, Dra. Carla Christoph, dentista especialista Rio de Janeiro"
        canonicalUrl="https://dracarlachristoph.com/"
        hreflangAlternates={[
          { lang: "pt-BR", href: "https://dracarlachristoph.com/" },
          { lang: "en", href: "https://dracarlachristoph.com/en" },
          { lang: "x-default", href: "https://dracarlachristoph.com/" },
        ]}
        structuredData={structuredData}
      />
      <PageLayout className="pt-0">
        {/* 1. Hero — Eyebrow + H1 + Trust Badges + 2 CTAs + Photo */}
        <Hero />

        {/* 2. Stats Bar — Prova social imediata */}
        <HomepageStatsBar />

        {/* 3. Sobre — Bio + foto + CTA */}
        <ScrollReveal animation="fade-up">
          <Suspense fallback={<div className="h-96 w-full bg-dental-beige/20 animate-pulse rounded-[20px]" />}>
            <AboutSection />
          </Suspense>
        </ScrollReveal>

        {/* 4. Diferenciais — Por que a Dra. Carla? */}
        <ScrollReveal animation="fade-up" delay={100}>
          <Suspense fallback={<div className="h-96 w-full bg-dental-beige/20 animate-pulse rounded-[20px]" />}>
            <DifferentialsSection />
          </Suspense>
        </ScrollReveal>

        {/* 5. Tratamentos — Grid 3x3 */}
        <ScrollReveal animation="fade-up">
          <Suspense fallback={<div className="h-[600px] w-full bg-dental-beige/20 animate-pulse rounded-[20px]" />}>
            <ServicesSection />
          </Suspense>
        </ScrollReveal>

        {/* Separador visual entre Tratamentos e Tecnologia */}
        <div className="w-full px-4">
          <div className="max-w-4xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-dental-purple/30 to-transparent" />
          </div>
        </div>

        {/* 6. Tecnologia — iTero Element 5D showcase */}
        <ScrollReveal animation="fade-in" duration={800}>
          <Suspense fallback={<div className="h-96 w-full bg-dental-beige/20 animate-pulse rounded-[20px]" />}>
            <TechnologyShowcase />
          </Suspense>
        </ScrollReveal>

        {/* 7. Depoimentos — Carousel */}
        <ScrollReveal animation="fade-up">
          <Suspense fallback={<div className="h-80 w-full bg-dental-beige/20 animate-pulse rounded-[20px]" />}>
            <TestimonialsCarousel />
          </Suspense>
        </ScrollReveal>

        {/* 8. Blog — 3 artigos recentes */}
        <ScrollReveal animation="fade-up" delay={50}>
          <Suspense fallback={<div className="h-96 w-full bg-dental-beige/20 animate-pulse rounded-[20px]" />}>
            <BlogPreview />
          </Suspense>
        </ScrollReveal>

        {/* 9. CTA Final — WhatsApp */}
        <ScrollReveal animation="scale-in" duration={500}>
          <Suspense fallback={<div className="h-64 w-full bg-dental-beige/20 animate-pulse rounded-[20px]" />}>
            <FinalCTA />
          </Suspense>
        </ScrollReveal>

        {/* 10. Contato — Form + info + mapa */}
        <ScrollReveal animation="fade-up">
          <Suspense fallback={<div className="h-96 w-full bg-dental-beige/20 animate-pulse rounded-[20px]" />}>
            <ContactSection />
          </Suspense>
        </ScrollReveal>
      </PageLayout>
    </>
  );
};

export default Index;
