import React from "react";
import EnPageLayout from "@/components/en/EnPageLayout";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Award, ScanLine, Clock } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { Link } from "react-router-dom";
import { sendGCLIDToWebhook } from "@/utils/gclid";

// EN Home components
import EnStatsBar from "@/components/en/EnStatsBar";
import EnAboutSection from "@/components/en/EnAboutSection";
import EnDifferentialsSection from "@/components/en/EnDifferentialsSection";
import EnServicesSection from "@/components/en/EnServicesSection";
import EnTechnologyShowcase from "@/components/en/EnTechnologyShowcase";
import EnTestimonialsCarousel from "@/components/en/EnTestimonialsCarousel";
import EnInternationalPatients from "@/components/en/EnInternationalPatients";
import EnFinalCTA from "@/components/en/EnFinalCTA";

const EnHomePage = () => {
    const handleWhatsAppClick = async (source: string) => {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'whatsapp_click',
                event_category: 'Contact',
                event_action: 'Click',
                event_label: `WhatsApp EN Home ${source}`
            });
        }

        if (window.gtag) {
            window.gtag('event', 'conversion', {
                'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
                'event_callback': function () {
                    console.log(`Google Ads conversion tracked - EN Home ${source}`);
                }
            });
        }

        await sendGCLIDToWebhook(`en_home_${source.toLowerCase().replace(/\s+/g, '_')}`);

        window.open(
            "https://wa.me/5521993304045?text=Hello!%20I'd%20like%20to%20book%20an%20appointment.",
            "_blank"
        );
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Dentist",
        "name": "Dr. Carla Christoph",
        "url": "https://dracarlachristoph.com/en",
        "logo": "https://dracarlachristoph.com/og-image.jpg",
        "image": "https://dracarlachristoph.com/og-image.jpg",
        "description": "Cosmetic and restorative dentistry in Ipanema, Rio de Janeiro. Dental implants, porcelain veneers, teeth whitening. 20+ years of experience. 1-hour personalized appointments.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rua Visconde de Pirajá, 550 - Suite 1107",
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
        "paymentAccepted": "Cash, Credit Card, Bank Transfer, PIX",
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
        "sameAs": [
            "https://instagram.com/dracarlachristoph",
            "https://wa.me/5521993304045"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dental Treatments",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "MedicalProcedure",
                        "name": "Dental Implants",
                        "description": "Specialized implant dentistry with 20+ years of experience and digital planning"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "MedicalProcedure",
                        "name": "Porcelain Veneers",
                        "description": "Digital smile design with ultra-thin porcelain laminates"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "MedicalProcedure",
                        "name": "Professional Teeth Whitening",
                        "description": "Safe and effective in-office or supervised at-home teeth whitening"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "MedicalProcedure",
                        "name": "Dental Prosthetics",
                        "description": "Fixed and removable dental prosthetics for full oral rehabilitation"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "MedicalProcedure",
                        "name": "Cosmetic Dentistry",
                        "description": "Aesthetic restorations in composite resin and porcelain for natural-looking results"
                    }
                }
            ]
        },
        "founder": {
            "@type": "Person",
            "name": "Carla Christoph",
            "jobTitle": "Dental Surgeon",
            "hasCredential": [
                {
                    "@type": "EducationalOccupationalCredential",
                    "name": "Specialist in Prosthodontics"
                },
                {
                    "@type": "EducationalOccupationalCredential",
                    "name": "Specialist in Implant Dentistry"
                }
            ]
        },
        "inLanguage": "en"
    };

    return (
        <>
            <SEOHead
                title="Dentist in Ipanema, Rio de Janeiro | Dr. Carla Christoph"
                description="Cosmetic and restorative dentistry in Ipanema. Dental implants, porcelain veneers, teeth whitening. 20+ years of experience. 1-hour personalized appointments. Book via WhatsApp — we reply in your language."
                keywords="dentist ipanema, dental clinic ipanema rio, cosmetic dentistry rio de janeiro, dental implants ipanema, porcelain veneers brazil, teeth whitening rio, dentist rio de janeiro english"
                canonicalUrl="https://dracarlachristoph.com/en"
                structuredData={structuredData}
                locale="en_US"
                language="en"
                hreflangAlternates={[
                    { lang: "pt-BR", href: "https://dracarlachristoph.com/" },
                    { lang: "en", href: "https://dracarlachristoph.com/en" },
                    { lang: "x-default", href: "https://dracarlachristoph.com/" },
                ]}
            />
            <EnPageLayout className="pt-0">
                {/* 1. Hero Section */}
                <section
                    className="hero-section min-h-screen relative overflow-hidden section-spacing"
                    style={{ paddingTop: "var(--header-height, 112px)" }}
                >
                    <div className="container-custom grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
                        <div className="order-1 lg:order-1">
                            {/* Eyebrow */}
                            <p className="hero-animate-1 text-xs uppercase tracking-[0.2em] text-dental-gold font-medium mb-4">
                                Specialist in Prosthodontics & Implant Dentistry
                            </p>

                            <h1 className="hero-animate-2 heading-xl mb-6 text-balance">
                                Cosmetic Dentistry in{' '}
                                <span className="text-dental-gold">Ipanema</span>, Rio de Janeiro
                            </h1>

                            <p className="hero-animate-3 body-lg mb-8 max-w-lg font-medium">
                                Personalized dental care with a minimum 1-hour appointment — so your dentist can listen, explain, and plan without rushing. Over 20 years of experience.
                            </p>

                            {/* Trust badges */}
                            <div className="hero-animate-4 flex flex-wrap items-center gap-x-6 gap-y-3 mb-10">
                                <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-dental-gold font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-dental-gold" />
                                    20+ Years in Ipanema
                                </span>
                                <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-dental-gold font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-dental-gold" />
                                    CRO-RJ 27.509
                                </span>
                                <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-dental-gold font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-dental-gold" />
                                    1h+ Per Appointment
                                </span>
                            </div>

                            {/* CTAs */}
                            <div className="hero-animate-5 flex flex-wrap gap-4">
                                <Button
                                    onClick={() => handleWhatsAppClick('hero_cta')}
                                    className="bg-dental-gold hover:bg-dental-gold-dark text-white rounded-md px-8 py-6 text-base shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-hover"
                                >
                                    <div className="flex flex-col text-left leading-tight">
                                        <span className="font-medium">Book Your Appointment</span>
                                        <span className="text-xs text-white/80">We reply in your language</span>
                                    </div>
                                    <ArrowRight size={16} className="ml-3" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-dental-purple/30 text-dental-purple hover:bg-dental-purple/5 rounded-md px-8 py-6 text-base transition-all duration-300"
                                    onClick={() => {
                                        if (window.dataLayer) {
                                            window.dataLayer.push({
                                                event: 'hero_explore_click',
                                                event_category: 'Navigation',
                                                event_action: 'Click',
                                                event_label: 'EN Hero Secondary CTA'
                                            });
                                        }
                                        const el = document.getElementById('treatments');
                                        if (el) {
                                            const top = el.getBoundingClientRect().top + window.scrollY - 100;
                                            window.scrollTo({ top, behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    Explore Our Treatments
                                </Button>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="hero-animate-image order-2 lg:order-2 flex justify-center lg:justify-end">
                            <div
                                className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[460px] h-[420px] sm:h-[480px] md:h-[560px] lg:h-[640px]"
                                style={{
                                    WebkitMaskImage: `
                                        linear-gradient(to left, black 60%, transparent 100%),
                                        linear-gradient(to bottom, black 65%, transparent 100%)
                                    `,
                                    maskImage: `
                                        linear-gradient(to left, black 60%, transparent 100%),
                                        linear-gradient(to bottom, black 65%, transparent 100%)
                                    `,
                                    WebkitMaskComposite: 'source-in',
                                    maskComposite: 'intersect',
                                }}
                            >
                                <picture>
                                    <source
                                        srcSet="/lovable-uploads/hero-560w.avif 560w, /lovable-uploads/hero-800w.avif 800w, /lovable-uploads/hero-840w.avif 840w"
                                        sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 400px, 460px"
                                        type="image/avif"
                                    />
                                    <source
                                        srcSet="/lovable-uploads/hero-560w.webp 560w, /lovable-uploads/hero-800w.webp 800w, /lovable-uploads/hero-840w.webp 840w"
                                        sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 400px, 460px"
                                        type="image/webp"
                                    />
                                    <img
                                        src="/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.png"
                                        alt="Dr. Carla Christoph, dental specialist in Ipanema, Rio de Janeiro"
                                        className="w-full h-full object-cover object-top"
                                        width="460"
                                        height="640"
                                        loading="eager"
                                        fetchPriority="high"
                                        decoding="async"
                                    />
                                </picture>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Stats Bar */}
                <EnStatsBar />

                {/* 3. About Dr. Carla */}
                <ScrollReveal animation="fade-up">
                    <EnAboutSection />
                </ScrollReveal>

                {/* 4. Differentials — Why Patients Choose Us */}
                <ScrollReveal animation="fade-up" delay={100}>
                    <EnDifferentialsSection />
                </ScrollReveal>

                {/* 5. Treatments Grid — 6 Services */}
                <ScrollReveal animation="fade-up">
                    <EnServicesSection />
                </ScrollReveal>

                {/* Separator */}
                <div className="w-full px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="h-px bg-gradient-to-r from-transparent via-dental-purple/30 to-transparent" />
                    </div>
                </div>

                {/* 6. Technology — iTero Element 5D */}
                <ScrollReveal animation="fade-in" duration={800}>
                    <EnTechnologyShowcase />
                </ScrollReveal>

                {/* 7. Testimonials */}
                <ScrollReveal animation="fade-up">
                    <EnTestimonialsCarousel />
                </ScrollReveal>

                {/* 8. International Patients */}
                <ScrollReveal animation="fade-up">
                    <EnInternationalPatients />
                </ScrollReveal>

                {/* 9. Final CTA */}
                <ScrollReveal animation="scale-in" duration={500}>
                    <EnFinalCTA />
                </ScrollReveal>
            </EnPageLayout>
        </>
    );
};

export default EnHomePage;
