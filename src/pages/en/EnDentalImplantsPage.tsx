import React from "react";
import EnPageLayout from "@/components/en/EnPageLayout";
import SEOHead from "@/components/SEOHead";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, CheckCircle, Clock, Shield } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const EnDentalImplantsPage = () => {
    const handleWhatsAppClick = async () => {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'whatsapp_click',
                event_category: 'Contact',
                event_action: 'Click',
                event_label: 'WhatsApp EN Dental Implants'
            });
        }
        await sendGCLIDToWebhook('en_dental_implants');
        window.open(
            "https://wa.me/5521993304045?text=Hello!%20I'd%20like%20to%20learn%20more%20about%20dental%20implants.",
            "_blank"
        );
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": "Dental Implant",
        "description": "Titanium dental implant placement with 3D digital planning for single teeth or full-mouth rehabilitation in Ipanema, Rio de Janeiro.",
        "procedureType": "Dental",
        "url": "https://dracarlachristoph.com/en/dental-implants",
        "inLanguage": "en",
        "provider": {
            "@type": "Dentist",
            "name": "Dra. Carla Christoph",
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
            q: "What are dental implants?",
            a: "Dental implants are small titanium posts surgically placed into the jawbone to replace missing tooth roots. Once healed, they support crowns, bridges, or full dentures — restoring both function and aesthetics."
        },
        {
            q: "Is the procedure painful?",
            a: "The surgery is performed under local anesthesia, so you won't feel pain during the procedure. Post-operative discomfort is typically mild and manageable with over-the-counter pain medication. Most patients return to normal activities within 2-3 days."
        },
        {
            q: "How long does the treatment take?",
            a: "The full treatment typically takes 4-6 months, including the osseointegration period (3-6 months) when the implant fuses with the bone. In selected cases, immediate loading allows for a temporary prosthesis on the same day."
        },
        {
            q: "How long do implants last?",
            a: "With proper oral hygiene and regular checkups, dental implants can last decades — often a lifetime. Clinical studies show success rates above 95% at the 10-year mark. The crown on top may need replacement after 10-15 years depending on wear."
        },
        {
            q: "What if I don't have enough bone?",
            a: "Bone grafting procedures or sinus lift surgery can increase bone volume when needed. Short or angled implants are also alternatives. 3D imaging allows us to plan the best approach for your specific anatomy."
        },
        {
            q: "Do you accept dental insurance?",
            a: "We are a private practice, which allows us to dedicate the time and materials your treatment deserves. We provide a detailed, transparent treatment plan and cost estimate during your initial consultation."
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
                title="Dental Implants in Ipanema | Dra. Carla Christoph, Rio de Janeiro"
                description="Dental implant specialist in Ipanema, Rio de Janeiro. 3D digital planning, minimally invasive techniques, 20+ years of experience. CRO-RJ 27.509. Book your consultation."
                keywords="dental implants ipanema, dental implant rio de janeiro, implant dentist brazil, tooth replacement ipanema"
                canonicalUrl="https://dracarlachristoph.com/en/dental-implants"
                structuredData={structuredData}
                locale="en_US"
                language="en"
                hreflangAlternates={[
                    { lang: "pt-BR", href: "https://dracarlachristoph.com/implantes-dentarios" },
                    { lang: "en", href: "https://dracarlachristoph.com/en/dental-implants" },
                    { lang: "x-default", href: "https://dracarlachristoph.com/implantes-dentarios" },
                ]}
            />
            <EnPageLayout>
                {/* Hero */}
                <section className="section-spacing bg-gradient-to-br from-dental-purple/5 to-dental-beige pt-28">
                    <div className="container-custom max-w-4xl">
                        <h1 className="heading-lg mb-4">Dental Implants in Ipanema</h1>
                        <Separator className="w-24 h-1 bg-dental-gold mb-6" />
                        <p className="text-lg text-dental-gray leading-relaxed max-w-3xl">
                            Missing teeth affect more than your smile — they impact chewing, speech, and bone health. Dental implants are the gold standard for tooth replacement, offering a permanent, natural-feeling solution. At our Ipanema office, we use 3D digital planning with the iTero Element 5D scanner for precise, minimally invasive implant placement.
                        </p>
                    </div>
                </section>

                {/* Benefits */}
                <section className="section-spacing bg-white/50">
                    <div className="container-custom max-w-4xl">
                        <h2 className="heading-md mb-8">Why Choose Implants?</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { title: "Natural Look & Feel", desc: "Custom-made crowns that match your natural teeth in color, shape, and translucency." },
                                { title: "Preserve Bone Health", desc: "Implants stimulate the jawbone, preventing the bone loss that occurs with missing teeth." },
                                { title: "Long-Lasting Solution", desc: "With proper care, implants can last a lifetime — no adhesive creams or replacements." },
                                { title: "Protect Adjacent Teeth", desc: "Unlike bridges, implants don't require grinding down healthy neighboring teeth." },
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

                {/* Process */}
                <section className="section-spacing">
                    <div className="container-custom max-w-4xl">
                        <h2 className="heading-md mb-8">Treatment Process</h2>
                        <div className="space-y-6">
                            {[
                                { step: "1", title: "Initial Consultation", desc: "Comprehensive exam, 3D digital scan with iTero Element 5D, and personalized treatment plan — all in a 1-hour appointment.", icon: Clock },
                                { step: "2", title: "Implant Placement", desc: "Minimally invasive surgery under local anesthesia. The titanium implant is placed into the jawbone.", icon: Shield },
                                { step: "3", title: "Healing & Integration", desc: "3-6 months of osseointegration while the implant fuses with the bone. A temporary prosthesis keeps you smiling.", icon: CheckCircle },
                                { step: "4", title: "Final Restoration", desc: "Your custom porcelain crown, bridge, or full prosthesis is placed — designed to look and function perfectly.", icon: CheckCircle },
                            ].map((item) => (
                                <div key={item.step} className="flex gap-4 items-start bg-white rounded-xl p-6 shadow-soft">
                                    <div className="w-10 h-10 bg-dental-gold text-white rounded-full flex items-center justify-center font-display text-lg flex-shrink-0">
                                        {item.step}
                                    </div>
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
                        <h2 className="text-3xl font-display mb-4">Ready to Restore Your Smile?</h2>
                        <p className="text-white/80 max-w-xl mx-auto mb-8">
                            Book your initial consultation — we'll evaluate your case, explain your options, and provide a detailed treatment plan.
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

export default EnDentalImplantsPage;
