import React from "react";
import EnPageLayout from "@/components/en/EnPageLayout";
import SEOHead from "@/components/SEOHead";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, AlertTriangle, Clock, MapPin, Phone } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const EnDentalEmergencyPage = () => {
    const handleWhatsAppClick = async () => {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'whatsapp_click',
                event_category: 'Contact',
                event_action: 'Click',
                event_label: 'WhatsApp EN Dental Emergency'
            });
        }

        if (window.gtag) {
            window.gtag('event', 'conversion', {
                'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
                'event_callback': function () {
                    console.log('Google Ads conversion tracked - EN Dental Emergency');
                }
            });
        }

        await sendGCLIDToWebhook('en_dental_emergency');
        window.open(
            "https://wa.me/5521993304045?text=Hello!%20I%20have%20a%20dental%20emergency%20and%20need%20to%20be%20seen%20as%20soon%20as%20possible.",
            "_blank"
        );
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": "Dental Emergency Care",
        "description": "Urgent dental care for toothache, broken teeth, lost fillings, and dental emergencies in Ipanema, Rio de Janeiro.",
        "procedureType": "Dental",
        "url": "https://dracarlachristoph.com/en/dental-emergency",
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

    const emergencyTypes = [
        {
            title: "Severe Toothache",
            desc: "Persistent or throbbing tooth pain that doesn't go away. May indicate infection, deep cavity, or nerve involvement.",
            action: "Contact us immediately. We'll prioritize your appointment to diagnose the cause and relieve your pain."
        },
        {
            title: "Broken or Chipped Tooth",
            desc: "A fall, accident, or biting on something hard can fracture a tooth, exposing the inner layers.",
            action: "Save any broken pieces if possible. Rinse your mouth with warm water and contact us for same-day evaluation."
        },
        {
            title: "Lost Crown or Filling",
            desc: "A crown or filling can come loose, leaving the tooth exposed and sensitive.",
            action: "Avoid chewing on the affected side. Keep the crown if you have it — it may be re-cemented. Contact us promptly."
        },
        {
            title: "Dental Abscess",
            desc: "Swelling, pus, or a bump on the gums near a tooth, often accompanied by fever and pain.",
            action: "This requires prompt treatment to prevent the infection from spreading. Contact us immediately."
        },
        {
            title: "Knocked-Out Tooth",
            desc: "A tooth completely dislodged from its socket due to trauma.",
            action: "Handle the tooth by the crown (not the root). If possible, place it back in the socket or keep it in milk. Seek care within 30 minutes."
        }
    ];

    const faqs = [
        {
            q: "What should I do if I have a dental emergency in Ipanema?",
            a: "Contact us via WhatsApp immediately. We accommodate emergency patients during business hours (Monday–Friday, 9 AM–7 PM). Describe your situation and we'll prioritize your appointment."
        },
        {
            q: "Can I be seen the same day?",
            a: "We do our best to accommodate dental emergencies on the same day. Contact us as early as possible to improve your chances of same-day care."
        },
        {
            q: "What if my emergency happens after hours or on a weekend?",
            a: "Send us a WhatsApp message describing your situation. Our team monitors messages around the clock and will respond with guidance and schedule your appointment for the earliest available time."
        },
        {
            q: "How much does emergency treatment cost?",
            a: "The cost depends on the type of treatment needed. We provide transparent pricing before any procedure begins. As a private practice, we do not accept insurance, but we ensure you receive dedicated, unhurried care."
        },
        {
            q: "I'm visiting Rio as a tourist. Can you help?",
            a: "Absolutely. We regularly see patients visiting Rio de Janeiro who need urgent dental care. Contact us via WhatsApp and we'll do our best to fit you in quickly."
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
                title="Dental Emergency in Ipanema | Dr. Carla Christoph, Rio de Janeiro"
                description="Dental emergency in Ipanema? Toothache, broken tooth, lost filling — contact us via WhatsApp for same-day urgent dental care. Dr. Carla Christoph, CRO-RJ 27.509."
                keywords="dental emergency ipanema, emergency dentist rio de janeiro, toothache ipanema, broken tooth Rio, urgent dental care brazil"
                canonicalUrl="https://dracarlachristoph.com/en/dental-emergency"
                structuredData={structuredData}
                locale="en_US"
                language="en"
                hreflangAlternates={[
                    { lang: "pt-BR", href: "https://dracarlachristoph.com/emergencia-dental" },
                    { lang: "en", href: "https://dracarlachristoph.com/en/dental-emergency" },
                    { lang: "x-default", href: "https://dracarlachristoph.com/emergencia-dental" },
                ]}
            />
            <EnPageLayout>
                {/* Urgency Hero */}
                <section className="section-spacing bg-gradient-to-br from-red-50/50 to-dental-beige pt-28">
                    <div className="container-custom max-w-4xl">
                        <div className="flex items-start gap-3 mb-4">
                            <AlertTriangle size={32} className="text-red-500 flex-shrink-0 mt-1" />
                            <h1 className="heading-lg text-dental-purple">Dental Emergency in Ipanema</h1>
                        </div>
                        <Separator className="w-24 h-1 bg-red-400 mb-6" />
                        <p className="text-lg text-dental-gray leading-relaxed max-w-3xl mb-8">
                            Toothache, broken tooth, or lost crown? Don't wait — contact us now for same-day urgent care during business hours.
                        </p>
                        <p className="text-sm text-dental-gray/70">Dr. Carla Christoph · CRO-RJ 27.509 · Ipanema, Rio de Janeiro</p>

                        {/* Urgent CTA */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-elegant border border-red-100 mb-8">
                            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                                <div className="space-y-2 text-center md:text-left">
                                    <h2 className="text-2xl font-display text-dental-purple">Need Immediate Help?</h2>
                                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-dental-gray">
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-dental-gold" />
                                            <span>Mon–Fri, 9 AM – 7 PM (GMT-3)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-dental-gold" />
                                            <span>Ipanema, Rio de Janeiro</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleWhatsAppClick}
                                    className="inline-flex items-center gap-2 bg-[#128C4A] hover:bg-[#0F7540] text-white px-8 py-4 rounded-lg shadow-lg transition-all duration-300 font-medium text-lg whitespace-nowrap"
                                >
                                    <MessageCircle size={22} />
                                    WhatsApp Now
                                </button>
                            </div>
                            <p className="text-xs text-dental-gray/60 mt-4 text-center md:text-left">
                                Messages are monitored 24/7. We respond as quickly as possible, even outside office hours.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Emergency Types */}
                <section className="section-spacing bg-white/50">
                    <div className="container-custom max-w-4xl">
                        <h2 className="heading-md mb-8">Common Dental Emergencies</h2>
                        <div className="space-y-4">
                            {emergencyTypes.map((item) => (
                                <div key={item.title} className="bg-white rounded-xl p-6 shadow-soft border-l-4 border-dental-gold">
                                    <h3 className="font-display text-dental-purple text-lg mb-2">{item.title}</h3>
                                    <p className="text-dental-gray text-sm mb-2">{item.desc}</p>
                                    <p className="text-dental-gold text-sm font-medium">{item.action}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick Info */}
                <section className="section-spacing">
                    <div className="container-custom max-w-4xl">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-xl p-6 shadow-soft text-center">
                                <MapPin size={28} className="text-dental-gold mx-auto mb-3" />
                                <h3 className="font-display text-dental-purple mb-2">Location</h3>
                                <p className="text-dental-gray text-sm">
                                    Rua Visconde de Pirajá, 550<br />
                                    Suite 1107 — Ipanema<br />
                                    2 blocks from the beach
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-soft text-center">
                                <Clock size={28} className="text-dental-gold mx-auto mb-3" />
                                <h3 className="font-display text-dental-purple mb-2">Office Hours</h3>
                                <p className="text-dental-gray text-sm">
                                    Monday – Friday<br />
                                    9 AM – 7 PM (GMT-3)<br />
                                    WhatsApp monitored 24/7
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-soft text-center">
                                <Phone size={28} className="text-dental-gold mx-auto mb-3" />
                                <h3 className="font-display text-dental-purple mb-2">Phone</h3>
                                <p className="text-dental-gray text-sm">
                                    +55 (21) 99330-4045<br />
                                    WhatsApp & calls<br />
                                    <a href="tel:+5521993304045" className="text-dental-gold hover:underline">Call now</a>
                                </p>
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

                {/* Bottom CTA */}
                <section className="section-spacing bg-dental-purple text-white">
                    <div className="container-custom text-center">
                        <h2 className="text-3xl font-display mb-4">Don't Wait — Get Help Now</h2>
                        <p className="text-white/80 max-w-xl mx-auto mb-8">
                            Dental emergencies can worsen quickly. Contact us on WhatsApp and we'll do our best to see you as soon as possible.
                        </p>
                        <button
                            onClick={handleWhatsAppClick}
                            className="inline-flex items-center gap-2 bg-[#128C4A] hover:bg-[#0F7540] text-white px-8 py-4 rounded-lg shadow-lg transition-all duration-300 font-medium text-lg"
                        >
                            <MessageCircle size={22} />
                            WhatsApp Now
                        </button>
                    </div>
                </section>
            </EnPageLayout>
        </>
    );
};

export default EnDentalEmergencyPage;
