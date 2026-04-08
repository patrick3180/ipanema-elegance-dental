import React from "react";
import EnPageLayout from "@/components/en/EnPageLayout";
import SEOHead from "@/components/SEOHead";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, CheckCircle, Clock, Shield, ArrowRight, Sparkles, Sun, Droplets, AlertTriangle, Eye } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const EnTeethWhiteningPage = () => {
    const handleWhatsAppClick = async (message?: string) => {
        if (window.dataLayer) {
            window.dataLayer.push({ event: 'whatsapp_click', event_category: 'Contact', event_action: 'Click', event_label: 'WhatsApp EN Teeth Whitening' });
        }
        if (window.gtag) {
            window.gtag('event', 'conversion', { 'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9' });
        }
        await sendGCLIDToWebhook('en_teeth_whitening');
        const defaultMessage = "Hello! I'd like to learn more about professional teeth whitening.";
        window.open(`https://wa.me/5521993304045?text=${encodeURIComponent(message || defaultMessage)}`, "_blank");
    };

    const structuredData = {
        "@context": "https://schema.org", "@type": "MedicalProcedure",
        "name": "Professional Teeth Whitening", "procedureType": "Dental", "inLanguage": "en",
        "description": "Professional teeth whitening in Ipanema, Rio de Janeiro. Safe, effective, and personalized whitening protocols with in-office and at-home options.",
        "url": "https://dracarlachristoph.com/en/teeth-whitening",
        "provider": { "@type": "Dentist", "name": "Dr. Carla Christoph", "telephone": "+5521993304045",
            "address": { "@type": "PostalAddress", "streetAddress": "Rua Visconde de Pirajá, 550 - Suite 1107", "addressLocality": "Ipanema", "addressRegion": "RJ", "addressCountry": "BR" }
        }
    };

    const faqs = [
        { q: "Does teeth whitening damage the enamel?", a: "No. Professional whitening performed by a qualified dentist uses scientifically validated products and concentrations that do not damage tooth enamel. The whitening gel acts on the pigments inside the tooth without altering its structure." },
        { q: "How many shades lighter can I expect?", a: "Results vary from person to person, but professional whitening typically lightens teeth by 3 to 8 shades. The exact result depends on the original tooth color, the type and cause of staining, and each patient's individual response." },
        { q: "How long do results last?", a: "Professional whitening results typically last 1 to 3 years. Longevity depends on dietary habits (coffee, wine, dark foods), smoking, oral hygiene, and periodic maintenance touch-ups." },
        { q: "Is teeth whitening painful or cause sensitivity?", a: "Temporary sensitivity may occur during and after treatment, most commonly to cold. We use desensitizing protocols before, during, and after whitening to minimize discomfort. Sensitivity typically resolves within 48 hours." },
        { q: "Can anyone undergo whitening?", a: "Most adults can safely undergo professional whitening. However, a dental evaluation is essential beforehand to rule out cavities, gum disease, or other conditions that should be addressed first. Whitening is not recommended during pregnancy or breastfeeding." },
        { q: "In-office or at-home: which is better?", a: "Both modalities produce excellent results. In-office whitening (clinic-based) offers faster results in a single session. At-home whitening (custom trays) allows a more gradual process. We often combine both for optimal outcomes." },
        { q: "What about store-bought whitening products?", a: "Over-the-counter products have significantly lower concentrations and cannot achieve the same level of results. Additionally, without professional supervision, there's a risk of gum irritation or uneven whitening. Professional treatment is safer and more effective." },
        { q: "Can I whiten my teeth if I have restorations?", a: "Whitening works on natural teeth only — crowns, veneers, and fillings do not change color. After whitening, existing restorations may need to be replaced to match the new shade. We evaluate this during your consultation." },
        { q: "What care should I take after whitening?", a: "Avoid strongly pigmented foods and beverages (coffee, red wine, dark sauces) for 48-72 hours after treatment. Smoking should be avoided. We provide a comprehensive post-treatment care guide with everything you need to know." },
        { q: "What's the difference between professional and LED whitening?", a: "LED is just the light source used during in-office whitening to accelerate the gel activation. The true key to effective and safe results is the whitening gel quality, the concentration used, and the dentist's expertise in protocol selection." }
    ];

    const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "inLanguage": "en",
        "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
    };

    return (
        <>
            <SEOHead title="Professional Teeth Whitening in Ipanema | Dr. Carla Christoph" description="Safe and effective professional teeth whitening in Ipanema, Rio de Janeiro. In-office and at-home protocols. Up to 8 shades lighter. Personalized treatment by specialist. CRO-RJ 27.509." keywords="teeth whitening ipanema, professional whitening rio de janeiro, dental bleaching brazil, tooth whitening rio, cosmetic dentistry ipanema" canonicalUrl="https://dracarlachristoph.com/en/teeth-whitening" structuredData={structuredData} locale="en_US" language="en" hreflangAlternates={[{ lang: "pt-BR", href: "https://dracarlachristoph.com/clareamento-dental" }, { lang: "en", href: "https://dracarlachristoph.com/en/teeth-whitening" }, { lang: "x-default", href: "https://dracarlachristoph.com/clareamento-dental" }]} />
            <EnPageLayout>
                {/* Hero */}
                <section className="section-spacing bg-gradient-to-br from-dental-gold/5 to-dental-beige pt-28">
                    <div className="container-custom max-w-4xl">
                        <h1 className="heading-lg mb-4">Professional Teeth Whitening</h1>
                        <Separator className="w-24 h-1 bg-dental-gold mb-6" />
                        <p className="text-lg text-dental-gray leading-relaxed max-w-3xl">A brighter, more radiant smile is one of the most impactful cosmetic improvements you can make. Professional teeth whitening at our Ipanema clinic uses safe, clinically proven protocols — personalized to your teeth — to deliver predictable, beautiful results in a comfortable and supervised environment.</p>
                    </div>
                </section>

                {/* Why Professional Whitening */}
                <section className="section-spacing bg-white/50">
                    <div className="container-custom max-w-5xl">
                        <h2 className="heading-md mb-4 text-center">Why Choose Professional Whitening?</h2>
                        <p className="text-center text-dental-gray mb-10 max-w-2xl mx-auto">Safe, effective, and significantly superior to over-the-counter alternatives</p>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[{ icon: Shield, title: "Clinically Safe", desc: "Validated products at controlled concentrations applied by a qualified specialist — no risk to your enamel or gums" },
                              { icon: Sun, title: "Predictable Results", desc: "Up to 8 shades lighter with consistent, even whitening across all teeth — no uneven spots or streaks" },
                              { icon: Eye, title: "Personalized Protocol", desc: "Treatment tailored to your tooth type, sensitivity level, and desired outcome for optimal, comfortable results" }
                            ].map(c => (
                                <div key={c.title} className="text-center">
                                    <div className="w-16 h-16 bg-dental-gold/10 rounded-full flex items-center justify-center mx-auto mb-4"><c.icon className="w-8 h-8 text-dental-gold" /></div>
                                    <h3 className="text-xl font-semibold text-dental-purple mb-3">{c.title}</h3>
                                    <p className="text-dental-gray">{c.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Whitening Modalities */}
                <section className="section-spacing bg-dental-beige/20">
                    <div className="container-custom max-w-5xl">
                        <h2 className="heading-md mb-4 text-center">Available Whitening Options</h2>
                        <p className="text-center text-dental-gray mb-10">We select the best protocol — or a combination — based on your specific needs</p>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-soft border-t-4 border-dental-gold">
                                <div className="flex items-center gap-3 mb-4">
                                    <Sparkles className="w-8 h-8 text-dental-gold" />
                                    <h3 className="text-2xl font-display font-semibold text-dental-purple">In-Office Whitening</h3>
                                </div>
                                <p className="text-dental-gray mb-6">Performed entirely at the clinic in a single session. Uses high-concentration professional gel with LED light activation for immediate, dramatic results.</p>
                                <ul className="space-y-3">
                                    {[{ label: "Duration", value: "1 to 2 hours" }, { label: "Sessions", value: "Single session" }, { label: "Results", value: "Immediate — up to 8 shades lighter" }, { label: "Best for", value: "Patients wanting fast, visible results" }].map(item => (
                                        <li key={item.label} className="flex items-start gap-2 text-sm">
                                            <CheckCircle className="text-dental-gold mt-0.5 flex-shrink-0" size={16} />
                                            <span className="text-dental-gray"><strong>{item.label}:</strong> {item.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white rounded-2xl p-8 shadow-soft border-t-4 border-dental-purple">
                                <div className="flex items-center gap-3 mb-4">
                                    <Droplets className="w-8 h-8 text-dental-purple" />
                                    <h3 className="text-2xl font-display font-semibold text-dental-purple">At-Home Whitening</h3>
                                </div>
                                <p className="text-dental-gray mb-6">Custom-made trays filled with professional-grade whitening gel, worn daily at home for 2-3 weeks. Gradual, controlled whitening under dental supervision.</p>
                                <ul className="space-y-3">
                                    {[{ label: "Duration", value: "2 to 3 weeks" }, { label: "Wear time", value: "2-4 hours/day or overnight" }, { label: "Results", value: "Gradual — 3 to 6 shades lighter" }, { label: "Best for", value: "Patients preferring comfort at home" }].map(item => (
                                        <li key={item.label} className="flex items-start gap-2 text-sm">
                                            <CheckCircle className="text-dental-purple mt-0.5 flex-shrink-0" size={16} />
                                            <span className="text-dental-gray"><strong>{item.label}:</strong> {item.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 bg-white rounded-2xl p-6 shadow-soft border border-dental-gold/20">
                            <div className="flex items-start gap-3">
                                <Sparkles className="w-6 h-6 text-dental-gold mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-display text-dental-purple mb-2">Combined Protocol (Recommended)</h4>
                                    <p className="text-dental-gray text-sm">For the best results, we often recommend starting with an in-office session for immediate impact, followed by at-home maintenance with custom trays. This combination maximizes whitening effect, improves longevity, and allows ongoing touch-ups.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mid CTA */}
                <section className="py-8 bg-white">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <p className="text-xl text-dental-gray mb-6">Ready to brighten your smile safely and effectively?</p>
                        <button onClick={() => handleWhatsAppClick("Hello! I'd like to learn about professional teeth whitening options.")} className="inline-flex items-center justify-center px-8 py-4 bg-dental-gold hover:bg-dental-gold/90 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
                            Book Your Whitening Consultation <ArrowRight size={20} className="ml-2" />
                        </button>
                    </div>
                </section>

                {/* Treatment Process */}
                <section className="section-spacing bg-dental-beige/20">
                    <div className="container-custom max-w-4xl">
                        <h2 className="heading-md mb-4 text-center">How Professional Whitening Works</h2>
                        <p className="text-center text-dental-gray mb-10 max-w-2xl mx-auto">A safe, supervised process for predictable, comfortable results</p>
                        <div className="space-y-6">
                            {[{ step: "1", title: "Comprehensive Evaluation", desc: "Clinical exam and shade assessment. We check for cavities, gum health, and existing restorations to ensure you're a safe candidate." },
                              { step: "2", title: "Professional Cleaning", desc: "Thorough cleaning to remove plaque and tartar — ensuring the whitening gel contacts the entire tooth surface for even results." },
                              { step: "3", title: "Gum Protection", desc: "A protective barrier is applied over your gums to shield soft tissues from the whitening agent — ensuring complete safety." },
                              { step: "4", title: "Whitening Gel Application", desc: "Professional-grade hydrogen peroxide or carbamide peroxide gel is carefully applied to the teeth in controlled cycles." },
                              { step: "5", title: "LED Light Activation", desc: "For in-office treatment, LED light activates the gel to accelerate the whitening process — typically 3 cycles of 15 minutes each." },
                              { step: "6", title: "Final Assessment & Care", desc: "Shade comparison to document results. You receive a post-treatment care guide and touch-up protocol recommendations." }
                            ].map(item => (
                                <div key={item.step} className="flex gap-4 items-start bg-white rounded-xl p-6 shadow-soft">
                                    <div className="w-10 h-10 bg-dental-gold text-white rounded-full flex items-center justify-center font-display text-lg flex-shrink-0">{item.step}</div>
                                    <div><h3 className="font-display text-dental-purple mb-1">{item.title}</h3><p className="text-dental-gray text-sm">{item.desc}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Important Considerations */}
                <section className="section-spacing bg-white/50">
                    <div className="container-custom max-w-4xl">
                        <h2 className="heading-md mb-8 text-center">Important Considerations</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl p-6 shadow-soft border-l-4 border-dental-gold">
                                <h3 className="font-display text-dental-purple mb-3 flex items-center gap-2"><CheckCircle size={20} className="text-dental-gold" /> Who Is a Good Candidate</h3>
                                <ul className="space-y-2 text-sm text-dental-gray">
                                    {["Adults with healthy teeth and gums", "Teeth with extrinsic staining (coffee, wine, aging)", "Patients seeking a non-invasive cosmetic improvement", "Those with realistic expectations about shade improvement"].map(t => <li key={t} className="flex items-start gap-2"><ArrowRight className="text-dental-gold mt-0.5 flex-shrink-0" size={14} /><span>{t}</span></li>)}
                                </ul>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-soft border-l-4 border-dental-purple">
                                <h3 className="font-display text-dental-purple mb-3 flex items-center gap-2"><AlertTriangle size={20} className="text-dental-purple" /> Cases Requiring Evaluation</h3>
                                <ul className="space-y-2 text-sm text-dental-gray">
                                    {["Tetracycline staining or fluorosis (may need alternative treatments)", "Extensive restorations (crowns/veneers won't change color)", "High sensitivity patients (custom desensitizing protocol needed)", "Pregnancy or breastfeeding (postpone until after)"].map(t => <li key={t} className="flex items-start gap-2"><ArrowRight className="text-dental-purple mt-0.5 flex-shrink-0" size={14} /><span>{t}</span></li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="section-spacing bg-dental-beige/20">
                    <div className="container-custom max-w-3xl">
                        <h2 className="heading-md mb-8 text-center">Frequently Asked Questions</h2>
                        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
                        <Accordion type="single" collapsible className="space-y-3">
                            {faqs.map((faq, i) => (
                                <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-lg px-6 border border-dental-beige/50">
                                    <AccordionTrigger className="text-left font-medium text-dental-purple hover:text-dental-gold">{faq.q}</AccordionTrigger>
                                    <AccordionContent className="text-dental-gray">{faq.a}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>

                {/* CTA */}
                <section className="section-spacing bg-dental-purple text-white">
                    <div className="container-custom text-center">
                        <h2 className="text-3xl font-display mb-4">Brighten Your Smile with Professional Whitening</h2>
                        <p className="text-white/80 max-w-xl mx-auto mb-8">Schedule your whitening consultation to learn which protocol is best for your teeth — safe, effective, and tailored to your needs.</p>
                        <button onClick={() => handleWhatsAppClick("Hello! I'd like to book a teeth whitening consultation with Dr. Carla Christoph.")} className="inline-flex items-center gap-2 bg-dental-gold hover:bg-dental-gold/90 text-white px-8 py-4 rounded-lg shadow-lg transition-all duration-300 font-medium text-lg">
                            <MessageCircle size={22} /> Book on WhatsApp
                        </button>
                    </div>
                </section>
            </EnPageLayout>
        </>
    );
};

export default EnTeethWhiteningPage;
