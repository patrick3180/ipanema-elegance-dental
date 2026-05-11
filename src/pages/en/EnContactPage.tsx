import React from "react";
import EnPageLayout from "@/components/en/EnPageLayout";
import SEOHead from "@/components/SEOHead";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Mail, MessageCircle } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const EnContactPage = () => {
    const handleWhatsAppClick = async () => {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'whatsapp_click',
                event_category: 'Contact',
                event_action: 'Click',
                event_label: 'WhatsApp EN Contact Page'
            });
        }

        if (window.gtag) {
            window.gtag('event', 'conversion', {
                'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
                'event_callback': function () {
                    console.log('Google Ads conversion tracked - EN Contact page');
                }
            });
        }

        await sendGCLIDToWebhook('en_contact_page_button');

        window.open(
            "https://wa.me/5521993304045?text=Hello!%20I'd%20like%20to%20book%20an%20appointment.",
            "_blank"
        );
    };

    return (
        <>
            <SEOHead
                title="Contact | Dr. Carla Christoph - Dentist in Ipanema"
                description="Book your dental appointment in Ipanema, Rio de Janeiro. Located at Rua Visconde de Pirajá, 550, Suite 1107. Contact via WhatsApp for a quick response."
                canonicalUrl="https://dracarlachristoph.com/en/contact"
                locale="en_US"
                language="en"
                hreflangAlternates={[
                    { lang: "pt-BR", href: "https://dracarlachristoph.com/contato" },
                    { lang: "en", href: "https://dracarlachristoph.com/en/contact" },
                    { lang: "x-default", href: "https://dracarlachristoph.com/contato" },
                ]}
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "Dentist",
                    "name": "Dr. Carla Christoph — Dental Clinic",
                    "alternateName": "Dra. Carla Christoph",
                    "url": "https://dracarlachristoph.com/en",
                    "telephone": "+5521993304045",
                    "email": "contato@dracarlachristoph.com",
                    "image": "https://dracarlachristoph.com/og-image.jpg",
                    "priceRange": "$$$",
                    "currenciesAccepted": "BRL",
                    "paymentAccepted": "Cash, Credit Card, Debit Card, PIX",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Rua Visconde de Pirajá, 550 - Suite 1107",
                        "addressLocality": "Ipanema, Rio de Janeiro",
                        "addressRegion": "RJ",
                        "postalCode": "22410-901",
                        "addressCountry": "BR"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": -22.9838,
                        "longitude": -43.2006
                    },
                    "openingHoursSpecification": [
                        {
                            "@type": "OpeningHoursSpecification",
                            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                            "opens": "09:00",
                            "closes": "19:00"
                        }
                    ],
                    "areaServed": [
                        { "@type": "City", "name": "Rio de Janeiro" },
                        { "@type": "Neighborhood", "name": "Ipanema" },
                        { "@type": "Neighborhood", "name": "Leblon" },
                        { "@type": "Neighborhood", "name": "Copacabana" }
                    ],
                    "hasMap": "https://maps.google.com/?cid=YOUR_GOOGLE_MAPS_CID",
                    "sameAs": [
                        "https://instagram.com/dracarlachristoph",
                        "https://wa.me/5521993304045"
                    ],
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "5.0",
                        "reviewCount": "16",
                        "bestRating": "5",
                        "worstRating": "1"
                    },
                    "medicalSpecialty": ["Prosthodontics", "Dental Implants", "Cosmetic Dentistry"]
                }}
            />
            <EnPageLayout>
                <section className="section-spacing">
                    <div className="container-custom">
                        {/* Header */}
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h1 className="heading-lg mb-4">Contact & Location</h1>
                            <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
                            <p className="text-dental-gray mb-4">
                                Book your appointment or get in touch
                            </p>
                            <p className="text-dental-gray text-sm mb-2">
                                Private practice only — no insurance plans accepted.
                            </p>
                            <p className="text-sm text-dental-gray/70">Dr. Carla Christoph · CRO-RJ 27.509 · English-speaking staff available</p>
                        </div>

                        {/* WhatsApp CTA */}
                        <div className="bg-dental-beige/50 p-8 rounded-lg text-center mb-12 max-w-2xl mx-auto">
                            <h2 className="text-2xl font-display mb-4">Book via WhatsApp</h2>
                            <p className="text-dental-gray mb-6">The fastest way to schedule your appointment. Available 24/7.</p>
                            <Button onClick={handleWhatsAppClick} className="bg-dental-gold hover:bg-dental-gold/90 text-white px-8 py-6" size="lg">
                                <MessageCircle size={20} className="mr-2" />
                                Send a WhatsApp Message
                            </Button>
                        </div>

                        {/* Info + Map grid */}
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="bg-white rounded-lg p-8 shadow-sm">
                                <h2 className="text-2xl font-display mb-6">Contact Information</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="text-dental-gold mt-1" />
                                        <div>
                                            <p className="font-medium">Address</p>
                                            <p className="text-dental-gray">
                                                Rua Visconde de Pirajá, 550 - Suite 1107<br />
                                                Ipanema, Rio de Janeiro - RJ<br />
                                                ZIP: 22410-901, Brazil
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone className="text-dental-gold mt-1" />
                                        <div>
                                            <p className="font-medium">Phone</p>
                                            <p className="text-dental-gray">
                                                +55 (21) 3738-7909<br />
                                                +55 (21) 99330-4045
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Mail className="text-dental-gold mt-1" />
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <p className="text-dental-gray">contato@dracarlachristoph.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock className="text-dental-gold mt-1" />
                                        <div>
                                            <p className="font-medium">Office Hours</p>
                                            <p className="text-dental-gray">
                                                Monday – Friday: 9 AM – 7 PM (GMT-3)<br />
                                                Saturday & Sunday: Closed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-8 shadow-sm">
                                <h2 className="text-2xl font-display mb-6">Location</h2>
                                <p className="text-dental-gray text-sm mb-4">
                                    We're in the heart of Ipanema, 2 blocks from Ipanema Beach. The building is between Rua Barão da Torre and Rua Prudente de Morais.
                                </p>
                                <div className="aspect-video bg-dental-beige/50 rounded-lg overflow-hidden">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4586.581678884269!2d-43.2116873!3d-22.9836633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd5070f90d87f%3A0x446370e6f29c86c4!2sDra.%20Carla%20Christoph%20-%20Reabilita%C3%A7%C3%A3o%20oral%20e%20est%C3%A9tica!5e1!3m2!1sen!2sbr!4v1747142945090!5m2!1sen!2sbr"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Office location map - Ipanema, Rio de Janeiro"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </EnPageLayout>
        </>
    );
};

export default EnContactPage;
