import React from "react";
import EnPageLayout from "@/components/en/EnPageLayout";
import SEOHead from "@/components/SEOHead";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MessageCircle, Award, ScanLine, Stethoscope, Shield, Clock } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { Link } from "react-router-dom";

const EnHomePage = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Dentist",
        "name": "Dra. Carla Christoph",
        "url": "https://dracarlachristoph.com/en",
        "image": "https://dracarlachristoph.com/og-image.jpg",
        "description": "Cosmetic and restorative dentistry in Ipanema, Rio de Janeiro. Dental implants, porcelain veneers, teeth whitening in a personalized 1-hour appointment setting.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rua Visconde de Pirajá, 550 - Suite 1107",
            "addressLocality": "Ipanema",
            "addressRegion": "RJ",
            "postalCode": "22410-002",
            "addressCountry": "BR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-22.9868",
            "longitude": "-43.2005"
        },
        "telephone": "+5521993304045",
        "email": "contato@dracarlachristoph.com",
        "priceRange": "$$",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "19:00"
            }
        ],
        "inLanguage": "en"
    };

    const services = [
        {
            title: "Dental Implants",
            description: "Titanium implant placement with 3D digital planning for single teeth or full-mouth rehabilitation.",
            link: "/en/dental-implants"
        },
        {
            title: "Porcelain Veneers",
            description: "Ultra-thin porcelain laminates for a natural smile transformation, with our exclusive Smile Test Drive.",
            link: "/en/porcelain-veneers"
        },
        {
            title: "General Dentistry",
            description: "Comprehensive dental checkups, professional cleanings, teeth whitening, and preventive care.",
            link: "/en/general-dentistry"
        },
        {
            title: "Dental Emergency",
            description: "Toothache, broken tooth, or lost filling? Same-day appointments available for urgent care.",
            link: "/en/dental-emergency"
        }
    ];

    return (
        <>
            <SEOHead
                title="Dentist in Ipanema, Rio de Janeiro | Dra. Carla Christoph"
                description="Cosmetic and restorative dentistry in Ipanema. Dental implants, porcelain veneers, teeth whitening. 20+ years of experience. 1-hour personalized appointments. Book via WhatsApp."
                keywords="dentist ipanema, dental clinic ipanema rio, cosmetic dentistry rio de janeiro, dental implants ipanema, porcelain veneers brazil, teeth whitening rio"
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
                {/* Hero Section */}
                <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-dental-purple/5 to-dental-beige pt-24">
                    <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h1 className="heading-xl text-dental-purple">
                                Cosmetic Dentistry in <span className="text-dental-gold">Ipanema</span>, Rio de Janeiro
                            </h1>
                            <p className="text-lg text-dental-gray leading-relaxed">
                                Personalized dental care with a minimum 1-hour appointment — so your dentist can listen, explain, and plan without rushing. Over 20 years of experience in cosmetic and restorative dentistry.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://wa.me/5521993304045?text=Hello!%20I'd%20like%20to%20book%20an%20appointment."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-dental-gold hover:bg-dental-gold/90 text-white px-8 py-4 rounded-lg shadow-lg transition-all duration-300 font-medium text-lg"
                                    onClick={() => {
                                        if (window.dataLayer) {
                                            window.dataLayer.push({
                                                event: 'whatsapp_click',
                                                event_category: 'Contact',
                                                event_action: 'Click',
                                                event_label: 'WhatsApp EN Hero CTA'
                                            });
                                        }
                                    }}
                                >
                                    <MessageCircle size={22} />
                                    Book on WhatsApp
                                </a>
                            </div>

                            {/* Trust Signals */}
                            <div className="flex flex-wrap gap-6 pt-4 text-sm text-dental-gray">
                                <div className="flex items-center gap-2">
                                    <Award size={18} className="text-dental-gold" />
                                    <span>20+ Years Experience</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ScanLine size={18} className="text-dental-gold" />
                                    <span>3D Digital Scanner</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={18} className="text-dental-gold" />
                                    <span>1-Hour Appointments</span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <OptimizedImage
                                src="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
                                alt="Dra. Carla Christoph - Dentist in Ipanema, Rio de Janeiro"
                                className="rounded-2xl shadow-elegant w-full max-w-lg mx-auto"
                                width={500}
                                height={625}
                            />
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="section-spacing bg-white/50">
                    <div className="container-custom">
                        <div className="text-center mb-12">
                            <h2 className="heading-lg mb-4">Our Treatments</h2>
                            <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
                            <p className="text-dental-gray max-w-2xl mx-auto">
                                From routine checkups to full smile transformations — every treatment with the same dedication and attention to detail.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {services.map((service) => (
                                <Link
                                    key={service.title}
                                    to={service.link}
                                    className="group bg-white rounded-xl p-6 shadow-soft hover:shadow-elegant transition-all duration-300 border border-transparent hover:border-dental-gold/20"
                                >
                                    <h3 className="text-xl font-display text-dental-purple group-hover:text-dental-gold transition-colors mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-dental-gray text-sm">{service.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="section-spacing">
                    <div className="container-custom">
                        <div className="text-center mb-12">
                            <h2 className="heading-lg mb-4">Why Patients Choose Us</h2>
                            <Separator className="w-24 h-1 bg-dental-gold mx-auto" />
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="text-center space-y-3">
                                <div className="w-14 h-14 mx-auto bg-dental-purple/10 rounded-full flex items-center justify-center">
                                    <Clock size={24} className="text-dental-gold" />
                                </div>
                                <h3 className="font-display text-lg">Unhurried Care</h3>
                                <p className="text-dental-gray text-sm">
                                    Minimum 1-hour appointments. Your dentist takes the time to listen, explain, and plan — no assembly line.
                                </p>
                            </div>
                            <div className="text-center space-y-3">
                                <div className="w-14 h-14 mx-auto bg-dental-purple/10 rounded-full flex items-center justify-center">
                                    <Shield size={24} className="text-dental-gold" />
                                </div>
                                <h3 className="font-display text-lg">20+ Years Experience</h3>
                                <p className="text-dental-gray text-sm">
                                    Board-certified specialist in prosthodontics and implant dentistry (CRO-RJ 27.509), with 8 years in the Brazilian Navy.
                                </p>
                            </div>
                            <div className="text-center space-y-3">
                                <div className="w-14 h-14 mx-auto bg-dental-purple/10 rounded-full flex items-center justify-center">
                                    <ScanLine size={24} className="text-dental-gold" />
                                </div>
                                <h3 className="font-display text-lg">Digital Planning</h3>
                                <p className="text-dental-gray text-sm">
                                    iTero Element 5D intraoral scanner for precise 3D imaging — no messy impressions, just digital comfort.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section-spacing bg-dental-purple text-white">
                    <div className="container-custom text-center">
                        <h2 className="text-3xl md:text-4xl font-display mb-4">Ready to Book Your Appointment?</h2>
                        <p className="text-white/80 max-w-xl mx-auto mb-8">
                            Reach out on WhatsApp for a quick response. We're available Monday–Friday, 9 AM–7 PM (GMT-3).
                        </p>
                        <a
                            href="https://wa.me/5521993304045?text=Hello!%20I'd%20like%20to%20book%20an%20appointment."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-dental-gold hover:bg-dental-gold/90 text-white px-8 py-4 rounded-lg shadow-lg transition-all duration-300 font-medium text-lg"
                        >
                            <MessageCircle size={22} />
                            Book on WhatsApp
                        </a>
                    </div>
                </section>
            </EnPageLayout>
        </>
    );
};

export default EnHomePage;
