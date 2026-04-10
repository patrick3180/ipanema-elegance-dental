import React from "react";
import EnPageLayout from "@/components/en/EnPageLayout";
import SEOHead from "@/components/SEOHead";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, CheckCircle, Sparkles } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import { InternalLinkingOptimizer } from "@/components/seo/InternalLinkingOptimizer";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const EnPorcelainVeneersPage = () => {
    const handleWhatsAppClick = async () => {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'whatsapp_click',
                event_category: 'Contact',
                event_action: 'Click',
                event_label: 'WhatsApp EN Porcelain Veneers'
            });
        }

        if (window.gtag) {
            window.gtag('event', 'conversion', {
                'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
                'event_callback': function () {
                    console.log('Google Ads conversion tracked - EN Porcelain Veneers');
                }
            });
        }

        await sendGCLIDToWebhook('en_porcelain_veneers');
        window.open(
            "https://wa.me/5521993304045?text=Hello!%20I'd%20like%20to%20learn%20more%20about%20porcelain%20veneers.",
            "_blank"
        );
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": "Porcelain Veneers",
        "description": "Ultra-thin porcelain veneers (dental laminates) for natural smile enhancement. Includes exclusive Smile Test Drive preview in Ipanema, Rio de Janeiro.",
        "procedureType": "Dental",
        "url": "https://dracarlachristoph.com/en/porcelain-veneers",
        "inLanguage": "en",
        "provider": {
            "@type": "Dentist",
            "name": "Dr. Carla Christoph",
            "telephone": "+5521993304045",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rua Visconde de Pirajá, 550 - Suite 1107",
                "addressLocality": "Ipanema",
                "addressRegion": "RJ",
                "addressCountry": "BR"
            }
        }
    };

    const faqs = [
        {
            q: "What's the difference between veneers and laminates?",
            a: "Porcelain veneers (also called dental laminates or 'lentes de contato dental' in Portuguese) are ultra-thin shells of porcelain (0.2–0.5mm) bonded to the front surface of teeth. They require minimal tooth preparation and last 15–20 years. Composite resin veneers are thicker (0.7–1.5mm), done directly in the office, and last 5–8 years."
        },
        {
            q: "What is the Smile Test Drive?",
            a: "Before committing to any permanent changes, we create a mock-up of your new smile using temporary, non-adhesive resin directly on your teeth. You can look in the mirror, take photos, talk, smile — and we adjust until you're 100% happy. Only then do we proceed with the final treatment."
        },
        {
            q: "Do veneers look natural?",
            a: "Absolutely. We use the latest generation of porcelain ceramics that mimic the translucency, color gradients, and surface texture of natural teeth. The result is indistinguishable from your own teeth — beautiful, but not 'obviously dental work.'"
        },
        {
            q: "How much tooth preparation is needed?",
            a: "Our philosophy is maximum preservation. Porcelain veneers require minimal preparation — 0.1 to 0.3mm of enamel surface only when necessary. Many cases require little to no tooth reduction at all."
        },
        {
            q: "How long does the treatment take?",
            a: "Porcelain veneers typically require 2-3 appointments over 15-20 days. First visit for planning and digital scanning, second for Smile Test Drive approval, third for final bonding. Composite veneers can be completed in 1-2 visits."
        },
        {
            q: "Do porcelain veneers stain?",
            a: "No. The ceramic material is non-porous and doesn't absorb pigments from coffee, wine, or food. This is one of the key advantages over composite resin veneers, which may require periodic polishing."
        }
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "inLanguage": "en",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
    };

    return (
        <>
            <SEOHead
                title="Porcelain Veneers in Ipanema | Dr. Carla Christoph, Rio de Janeiro"
                description="Porcelain veneers and dental laminates in Ipanema, Rio de Janeiro. Smile Test Drive preview, minimal preparation, 15-20 year durability. Specialist with 20+ years experience."
                keywords="porcelain veneers ipanema, dental veneers rio de janeiro, dental laminates brazil, dental aesthetics ipanema"
                canonicalUrl="https://dracarlachristoph.com/en/porcelain-veneers"
                structuredData={structuredData}
                locale="en_US"
                language="en"
                hreflangAlternates={[
                    { lang: "pt-BR", href: "https://dracarlachristoph.com/lentes-de-contato-dental-e-facetas-de-resina" },
                    { lang: "en", href: "https://dracarlachristoph.com/en/porcelain-veneers" },
                    { lang: "x-default", href: "https://dracarlachristoph.com/lentes-de-contato-dental-e-facetas-de-resina" },
                ]}
            />
            <EnPageLayout>
                {/* Hero */}
                <section className="section-spacing bg-gradient-to-br from-dental-purple/5 to-dental-beige pt-28">
                    <div className="container-custom max-w-4xl">
                        <h1 className="heading-lg mb-4">Porcelain Veneers in Ipanema</h1>
                        <Separator className="w-24 h-1 bg-dental-gold mb-6" />
                        <p className="text-lg text-dental-gray leading-relaxed max-w-3xl">
                            Ultra-thin porcelain shells custom-crafted to enhance your natural smile with minimal tooth preparation. Our exclusive <strong>Smile Test Drive</strong> lets you preview your results before any permanent changes — so you know exactly what to expect.
                        </p>
                        <p className="text-sm text-dental-gray/70 mt-3">Dr. Carla Christoph · CRO-RJ 27.509 · 20+ years of experience</p>
                    </div>
                </section>

                {/* Smile Test Drive highlight */}
                <section className="section-spacing bg-white/50">
                    <div className="container-custom max-w-4xl">
                        <div className="bg-dental-purple/5 rounded-2xl p-8 md:p-10 border border-dental-gold/20">
                            <div className="flex items-start gap-4">
                                <Sparkles size={32} className="text-dental-gold flex-shrink-0 mt-1" />
                                <div>
                                    <h2 className="text-2xl font-display text-dental-purple mb-3">Smile Test Drive</h2>
                                    <p className="text-dental-gray leading-relaxed">
                                        Before committing to veneers, we create a temporary preview of your new smile directly on your teeth — using non-adhesive resin that doesn't alter your actual teeth. You can look in the mirror, take photos, talk, and smile. We adjust together until it's exactly right. Only after your full approval do we proceed with the final porcelain.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="section-spacing">
                    <div className="container-custom max-w-4xl">
                        <h2 className="heading-md mb-8">Why Porcelain Veneers?</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { title: "15-20 Year Durability", desc: "High-quality porcelain resists staining and maintains its luster for many years." },
                                { title: "Minimal Preparation", desc: "Only 0.1-0.3mm of enamel removed when necessary — preserving your natural tooth structure." },
                                { title: "Stain-Resistant", desc: "Unlike composite alternatives, porcelain doesn't absorb pigments from coffee, wine, or food." },
                                { title: "Natural Appearance", desc: "Custom color stratification and translucency that matches your natural teeth perfectly." },
                            ].map((item) => (
                                <div key={item.title} className="flex gap-3">
                                    <CheckCircle size={22} className="text-dental-gold flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-display text-dental-purple mb-1">{item.title}</h3>
                                        <p className="text-dental-gray text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="section-spacing bg-white/50">
                    <div className="container-custom max-w-3xl">
                        <h2 className="heading-md mb-8 text-center">Frequently Asked Questions</h2>
                        <script type="application/ld+json">
                            {JSON.stringify(faqSchema)}
                        </script>
                        <Accordion type="single" collapsible className="space-y-3">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`faq-${index}`} className="bg-white rounded-lg px-6 border border-dental-beige/50">
                                    <AccordionTrigger className="text-left font-medium text-dental-purple hover:text-dental-gold">
                                        {faq.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-dental-gray">
                                        {faq.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>

                {/* CTA */}
                <section className="section-spacing bg-dental-purple text-white">
                    <div className="container-custom text-center">
                        <h2 className="text-3xl font-display mb-4">Ready to Explore Your Options?</h2>
                        <p className="text-white/80 max-w-xl mx-auto mb-8">
                            Book a consultation to discuss your goals. We'll explain your options, show you digital previews, and plan your Smile Test Drive.
                        </p>
                        <button
                            onClick={handleWhatsAppClick}
                            className="inline-flex items-center gap-2 bg-dental-gold hover:bg-dental-gold/90 text-white px-8 py-4 rounded-lg shadow-lg transition-all duration-300 font-medium text-lg"
                        >
                            <MessageCircle size={22} />
                            Book on WhatsApp
                        </button>
                    </div>
                </section>
                <InternalLinkingOptimizer currentPage="en-porcelain-veneers" />
            </EnPageLayout>
        </>
    );
};

export default EnPorcelainVeneersPage;
