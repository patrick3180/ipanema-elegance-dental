import React from "react";
import EnPageLayout from "@/components/en/EnPageLayout";
import SEOHead from "@/components/SEOHead";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, CheckCircle, Sparkles, ShieldCheck } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const EnGeneralDentistryPage = () => {
    const handleWhatsAppClick = async () => {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'whatsapp_click',
                event_category: 'Contact',
                event_action: 'Click',
                event_label: 'WhatsApp EN General Dentistry'
            });
        }

        if (window.gtag) {
            window.gtag('event', 'conversion', {
                'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
                'event_callback': function () {
                    console.log('Google Ads conversion tracked - EN General Dentistry');
                }
            });
        }

        await sendGCLIDToWebhook('en_general_dentistry');
        window.open(
            "https://wa.me/5521993304045?text=Hello!%20I'd%20like%20to%20book%20a%20dental%20checkup.",
            "_blank"
        );
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": "General Dentistry and Preventive Care",
        "description": "Comprehensive dental checkup, professional cleaning, teeth whitening, and preventive care in Ipanema, Rio de Janeiro.",
        "procedureType": "Dental",
        "url": "https://dracarlachristoph.com/en/general-dentistry",
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

    const services = [
        {
            title: "Comprehensive Dental Exam",
            desc: "Thorough clinical examination, 3D digital scan with iTero Element 5D, and personalized risk assessment."
        },
        {
            title: "Professional Dental Cleaning",
            desc: "Ultrasonic scaling to remove tartar and plaque buildup, followed by polishing for a clean, fresh feel."
        },
        {
            title: "Teeth Whitening",
            desc: "Professional in-office whitening (1-3 sessions) or supervised take-home kits with custom trays for gradual results."
        },
        {
            title: "Dental Fillings & Restorations",
            desc: "Tooth-colored composite restorations for cavities, chips, or cracks — virtually invisible and durable."
        },
        {
            title: "Preventive Treatment Plans",
            desc: "Individual risk assessment and customized prevention schedules — typically every 6 months for low-risk patients."
        },
    ];

    const faqs = [
        {
            q: "What does a dental checkup include?",
            a: "A comprehensive exam including clinical inspection, digital 3D scan, risk assessment for cavities and gum disease, professional cleaning (scaling and polishing), and personalized oral hygiene guidance."
        },
        {
            q: "How often should I schedule a checkup?",
            a: "For most adults, every 6 months is recommended. Patients with a history of gum disease or higher cavity risk may benefit from visits every 3-4 months. We'll recommend the right schedule for your needs."
        },
        {
            q: "Is professional teeth whitening safe?",
            a: "When performed by a dental professional, teeth whitening is completely safe. We use pH-balanced gels with remineralizing agents that protect enamel integrity. In-office treatment can lighten teeth by 4-9 shades."
        },
        {
            q: "Does dental cleaning hurt?",
            a: "Ultrasonic cleaning is very comfortable — most patients describe only a mild vibration. For very sensitive areas, we can apply topical numbing gel."
        },
        {
            q: "Do you accept dental insurance?",
            a: "We are a private practice. This allows us to dedicate proper time to each patient and use only high-quality materials. We provide clear, detailed cost estimates before any treatment begins."
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
                title="General Dentistry & Prevention in Ipanema | Dr. Carla Christoph"
                description="Dental checkup, professional cleaning, teeth whitening, and preventive care in Ipanema, Rio de Janeiro. 1-hour appointments with personalized attention. Book via WhatsApp."
                keywords="dental checkup ipanema, teeth cleaning rio de janeiro, teeth whitening ipanema, dentist checkup brazil, preventive dentistry rio"
                canonicalUrl="https://dracarlachristoph.com/en/general-dentistry"
                structuredData={structuredData}
                locale="en_US"
                language="en"
                hreflangAlternates={[
                    { lang: "pt-BR", href: "https://dracarlachristoph.com/clinica-geral-e-prevencao" },
                    { lang: "en", href: "https://dracarlachristoph.com/en/general-dentistry" },
                    { lang: "x-default", href: "https://dracarlachristoph.com/clinica-geral-e-prevencao" },
                ]}
            />
            <EnPageLayout>
                {/* Hero */}
                <section className="section-spacing bg-gradient-to-br from-dental-purple/5 to-dental-beige pt-28">
                    <div className="container-custom max-w-4xl">
                        <h1 className="heading-lg mb-4">General Dentistry & Prevention</h1>
                        <Separator className="w-24 h-1 bg-dental-gold mb-6" />
                        <p className="text-lg text-dental-gray leading-relaxed max-w-3xl">
                            Whether you're due for a routine checkup, need a professional cleaning, or want to brighten your smile with whitening — every appointment starts with at least 1 full hour of dedicated, personalized attention.
                        </p>
                    </div>
                </section>

                {/* Services */}
                <section className="section-spacing bg-white/50">
                    <div className="container-custom max-w-4xl">
                        <h2 className="heading-md mb-8">What We Offer</h2>
                        <div className="space-y-4">
                            {services.map((service) => (
                                <div key={service.title} className="flex gap-4 items-start bg-white rounded-xl p-6 shadow-soft">
                                    <CheckCircle size={22} className="text-dental-gold flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-display text-dental-purple mb-1">{service.title}</h3>
                                        <p className="text-dental-gray text-sm">{service.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why prevention */}
                <section className="section-spacing">
                    <div className="container-custom max-w-4xl">
                        <div className="bg-dental-purple/5 rounded-2xl p-8 md:p-10 border border-dental-gold/20">
                            <div className="flex items-start gap-4">
                                <ShieldCheck size={32} className="text-dental-gold flex-shrink-0 mt-1" />
                                <div>
                                    <h2 className="text-2xl font-display text-dental-purple mb-3">Prevention Is Always Better</h2>
                                    <p className="text-dental-gray leading-relaxed">
                                        A routine checkup costs a fraction of what advanced treatments like implants or root canals require. More importantly, early detection means less discomfort, fewer procedures, and better long-term outcomes. Our preventive approach identifies issues while they're still reversible.
                                    </p>
                                </div>
                            </div>
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
                        <h2 className="text-3xl font-display mb-4">Due for a Checkup?</h2>
                        <p className="text-white/80 max-w-xl mx-auto mb-8">
                            Book your dental exam and cleaning. We'll take the time to explain everything we find and plan the best care for your needs.
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
            </EnPageLayout>
        </>
    );
};

export default EnGeneralDentistryPage;
