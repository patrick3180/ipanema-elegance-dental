import React from "react";
import EnPageLayout from "@/components/en/EnPageLayout";
import SEOHead from "@/components/SEOHead";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, CheckCircle, Clock, Shield, Utensils, Smile, Heart, ArrowRight, Sparkles, Award, Search, Scan, Star, Package } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const EnDentalProstheticsPage = () => {
    const handleWhatsAppClick = async (message?: string) => {
        if (window.dataLayer) {
            window.dataLayer.push({ event: 'whatsapp_click', event_category: 'Contact', event_action: 'Click', event_label: 'WhatsApp EN Dental Prosthetics' });
        }
        if (window.gtag) {
            window.gtag('event', 'conversion', { 'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9' });
        }
        await sendGCLIDToWebhook('en_dental_prosthetics');
        const defaultMessage = "Hello! I'd like to learn more about dental prosthetics and oral rehabilitation.";
        window.open(`https://wa.me/5521993304045?text=${encodeURIComponent(message || defaultMessage)}`, "_blank");
    };

    const structuredData = {
        "@context": "https://schema.org", "@type": "MedicalProcedure",
        "name": "Dental Prosthetics", "procedureType": "Dental", "inLanguage": "en",
        "description": "Complete oral rehabilitation with dental crowns, bridges, implant-supported prostheses, and All-on-4/6 protocols in Ipanema, Rio de Janeiro.",
        "url": "https://dracarlachristoph.com/en/dental-prosthetics",
        "provider": { "@type": "Dentist", "name": "Dr. Carla Christoph", "telephone": "+5521993304045",
            "address": { "@type": "PostalAddress", "streetAddress": "Rua Visconde de Pirajá, 550 - Suite 1107", "addressLocality": "Ipanema", "addressRegion": "RJ", "addressCountry": "BR" }
        }
    };

    const faqs = [
        { q: "Which type of prosthesis is best for my case?", a: "Every case is unique. The choice depends on the number of missing teeth, bone condition, gum health, aesthetic expectations, and lifestyle. During your planning consultation, we analyze all aspects to recommend the ideal solution." },
        { q: "How long does a well-made prosthesis last?", a: "With quality materials and proper care, a crown or bridge can last 15-20 years. Implant-supported prostheses often exceed 20 years. Longevity depends on oral hygiene, regular dental visits, and daily care." },
        { q: "Is an implant-supported prosthesis worth the investment?", a: "For many patients, yes. They offer complete bone preservation, no grinding of adjacent teeth, greater durability, and a natural feel — excellent long-term value." },
        { q: "How do I care for dental prostheses?", a: "Fixed prostheses are cleaned like natural teeth with brushing and flossing. Removable prostheses should be cleaned with specialized products. Biannual dental visits are essential for professional maintenance." },
        { q: "Will I be left without teeth during treatment?", a: "Never! We always provide a temporary prosthesis so you maintain aesthetics and function throughout treatment. You won't go a single day without teeth." },
        { q: "Can a prosthesis look natural?", a: "Absolutely! We use layered ceramic stratification, individualized characterization, and custom shade matching. The result is indistinguishable from natural teeth." },
        { q: "What's the difference between porcelain and resin?", a: "Porcelain offers superior aesthetics, durability, and stain resistance — our choice for long-term restorations. Resin may be used for temporaries. We use only premium-grade materials." },
        { q: "Is it possible to get prosthetics with limited bone?", a: "Yes! For conventional prostheses, bone volume isn't limiting. For implant-supported ones, bone grafting or zygomatic implants can make treatment possible even with reduced bone." },
        { q: "When should an old prosthesis be replaced?", a: "Signs include: visible wear, color changes, poor fit, chewing discomfort, or gum issues around the prosthesis. A professional evaluation determines the optimal time." },
        { q: "Is the procedure painful?", a: "All procedures use effective local anesthesia and comfort-focused techniques. Most patients report significantly less discomfort than expected." },
        { q: "What's the advantage of seeing a specialist?", a: "A prosthodontic specialist has 2-3 years of additional training, masters advanced techniques, works with top laboratories, and has extensive complex-case experience." },
        { q: "Fixed or removable: how do I choose?", a: "Fixed prostheses offer greater comfort and natural feel but require specific conditions. Removable prosthetics are an option when fixed solutions aren't feasible. We evaluate all factors to recommend the best solution." }
    ];

    const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "inLanguage": "en",
        "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
    };

    const processSteps = [
        { step: "1", title: "Comprehensive Diagnostic Consultation", desc: "Facial analysis, clinical exam, digital X-rays, and iTero Element 5D scanning for precise diagnosis and personalized planning." },
        { step: "2", title: "Minimally Invasive Preparation", desc: "When needed, teeth are prepared with maximum preservation of healthy structure, prioritizing conservative techniques." },
        { step: "3", title: "Precision Digital Impression", desc: "iTero Element 5D eliminates traditional impression discomfort, ensuring millimetric precision. The 3D file goes directly to the lab." },
        { step: "4", title: "Temporary Prosthesis", desc: "A temporary replacement is crafted and placed to maintain aesthetics and function until the definitive prosthesis is ready." },
        { step: "5", title: "Artisanal Fabrication", desc: "Our partner laboratory crafts your prosthesis with E-max and zirconia ceramics, layering colors and textures for a natural result." },
        { step: "6", title: "Final Placement & Adjustment", desc: "Your prosthesis is cemented or fixed with meticulous occlusal adjustments. You leave with your new smile and care instructions." },
        { step: "7", title: "Ongoing Follow-Up", desc: "Maintenance appointments to protect your investment and ensure the health of your smile for years to come." }
    ];

    const modalities = [
        { title: "Dental Crowns", img: "/lovable-uploads/Coroa e-max.webp", alt: "E-max ceramic dental crown", desc: "Protective ceramic or zirconia caps that restore damaged teeth — form, function, and flawless aesthetics.", tags: ["Ceramic", "Natural Result"] },
        { title: "Fixed Bridges", img: "/lovable-uploads/Ponte fixa.webp", alt: "Porcelain fixed dental bridge", desc: "Fixed prosthesis replacing one or more missing teeth, anchored to adjacent teeth or implants.", tags: ["Fixed Solution", "Multiple Teeth"] },
        { title: "Implant-Supported", img: "/Implante.webp", alt: "Implant-supported dental prosthesis", desc: "The ideal combination of stability and natural appearance, anchored to dental implants for maximum comfort.", tags: ["Natural Look", "Maximum Stability"] },
        { title: "Removable Prostheses", img: "/lovable-uploads/Prótese parcial removível moderna.webp", alt: "Modern removable partial denture", desc: "Partial or full dentures with modern materials, improved fit, and superior aesthetics.", tags: ["Accessible", "Easy Maintenance"] },
        { title: "All-on-4/6 Protocol", img: "/lovable-uploads/all in 4.webp", alt: "All-on-4 full-arch prosthesis on implants", desc: "Full-arch rehabilitation on 4 or 6 implants with a fixed prosthesis for complete restoration.", tags: ["Full Rehabilitation", "Fixed Prosthesis"], highlight: true },
        { title: "Overdenture", img: "/lovable-uploads/Overdenture com clips de retenção.webp", alt: "Overdenture stabilized by implants", desc: "Removable prosthesis stabilized by implants — combining convenience of removal with implant-supported firmness.", tags: ["Stability", "Removable"] }
    ];

    return (
        <>
            <SEOHead title="Dental Prosthetics & Oral Rehabilitation in Ipanema | Dr. Carla Christoph" description="Dental prosthetics specialist in Ipanema, Rio de Janeiro. Crowns, bridges, implant-supported prostheses, All-on-4 protocols. E-max and zirconia ceramics. 20+ years experience." keywords="dental prosthetics ipanema, dental crowns rio, dental bridge brazil, implant prosthesis, all-on-4 rio, oral rehabilitation" canonicalUrl="https://dracarlachristoph.com/en/dental-prosthetics" structuredData={structuredData} locale="en_US" language="en" hreflangAlternates={[{ lang: "pt-BR", href: "https://dracarlachristoph.com/protese-dentaria" }, { lang: "en", href: "https://dracarlachristoph.com/en/dental-prosthetics" }, { lang: "x-default", href: "https://dracarlachristoph.com/protese-dentaria" }]} />
            <EnPageLayout>
                <section className="section-spacing bg-gradient-to-br from-dental-purple/5 to-dental-beige pt-28">
                    <div className="container-custom max-w-4xl">
                        <h1 className="heading-lg mb-4">Dental Prosthetics & Oral Rehabilitation</h1>
                        <Separator className="w-24 h-1 bg-dental-gold mb-6" />
                        <p className="text-lg text-dental-gray leading-relaxed max-w-3xl">Missing or damaged teeth affect far more than your smile — they impact chewing, speech, bone health, and confidence. As a prosthodontics specialist with 20+ years of experience, Dr. Carla Christoph provides individualized oral rehabilitation using E-max and zirconia ceramics, iTero Element 5D digital scanning, and meticulous planning for naturally beautiful, long-lasting results.</p>
                    </div>
                </section>

                <section className="section-spacing bg-white/50">
                    <div className="container-custom max-w-5xl">
                        <h2 className="heading-md mb-4 text-center">Complete Oral Rehabilitation</h2>
                        <p className="text-center text-dental-gray mb-10 max-w-2xl mx-auto">Over 20 years restoring function, aesthetics, and quality of life</p>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[{ icon: Utensils, title: "Chewing Function", desc: "Enjoy your favorite foods again with comfort and confidence" },
                              { icon: Smile, title: "Natural Aesthetics", desc: "Prostheses that perfectly replicate color, shape, and translucency of natural teeth" },
                              { icon: Heart, title: "Quality of Life", desc: "Rediscover your confidence and self-esteem — smile without hesitation" }
                            ].map(c => (
                                <div key={c.title} className="text-center">
                                    <div className="w-16 h-16 bg-dental-purple/10 rounded-full flex items-center justify-center mx-auto mb-4"><c.icon className="w-8 h-8 text-dental-purple" /></div>
                                    <h3 className="text-xl font-semibold text-dental-purple mb-3">{c.title}</h3>
                                    <p className="text-dental-gray">{c.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-8 bg-white">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <p className="text-xl text-dental-gray mb-6">Want to know which prosthesis is right for your case?</p>
                        <button onClick={() => handleWhatsAppClick("Hello! I saw your dental prosthetics page and would like to know which type is right for me.")} className="inline-flex items-center justify-center px-8 py-4 bg-dental-gold hover:bg-dental-gold/90 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
                            Book an Evaluation <ArrowRight size={20} className="ml-2" />
                        </button>
                    </div>
                </section>

                <section className="section-spacing">
                    <div className="container-custom max-w-6xl">
                        <h2 className="heading-md mb-4 text-center">Types of Dental Prosthetics</h2>
                        <p className="text-center text-dental-gray mb-10">State-of-the-art technologies and materials for every need</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {modalities.map(m => (
                                <div key={m.title} className={`group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer ${m.highlight ? 'border-2 border-dental-gold/30' : ''}`}>
                                    <div className="aspect-[4/3] relative">
                                        <img src={m.img} alt={m.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent" />
                                    </div>
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                        <h3 className="text-2xl font-display font-semibold text-white mb-2">{m.title}</h3>
                                        <p className="text-white/90 text-sm mb-4 line-clamp-3">{m.desc}</p>
                                        <div className="flex flex-wrap gap-2">{m.tags.map(t => <span key={t} className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">{t}</span>)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-spacing bg-dental-beige/20">
                    <div className="container-custom max-w-4xl">
                        <h2 className="heading-md mb-4 text-center">Your Journey to a New Smile</h2>
                        <p className="text-center text-dental-gray mb-10 max-w-2xl mx-auto">Every step is carefully planned for comfort, precision, and natural results</p>
                        <div className="space-y-6">
                            {processSteps.map(item => (
                                <div key={item.step} className="flex gap-4 items-start bg-white rounded-xl p-6 shadow-soft">
                                    <div className="w-10 h-10 bg-dental-gold text-white rounded-full flex items-center justify-center font-display text-lg flex-shrink-0">{item.step}</div>
                                    <div><h3 className="font-display text-dental-purple mb-1">{item.title}</h3><p className="text-dental-gray text-sm">{item.desc}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-spacing bg-white/50">
                    <div className="container-custom max-w-4xl">
                        <h2 className="heading-md mb-8 text-center">Solutions for Complex Cases</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-xl p-6 shadow-soft">
                                <h3 className="text-xl font-semibold mb-3 text-dental-purple">Full Oral Rehabilitation</h3>
                                <p className="text-dental-gray mb-4">For cases with multiple losses, severe wear, or bite problems — a comprehensive protocol restoring function, aesthetics, and vertical dimension with natural facial rejuvenation.</p>
                                <ul className="space-y-2 text-sm text-dental-gray">
                                    {["Complete occlusal analysis", "Bite restoration", "Natural facial rejuvenation"].map(t => <li key={t} className="flex items-start gap-2"><ArrowRight className="text-dental-gold mt-0.5" size={16} /><span>{t}</span></li>)}
                                </ul>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-soft">
                                <h3 className="text-xl font-semibold mb-3 text-dental-purple">High-Performance Aesthetic Prosthetics</h3>
                                <p className="text-dental-gray mb-4">Next-generation ceramics (E-max, Zirconia) with artisanal stratification, reproducing translucency, texture, and characterization of natural teeth.</p>
                                <ul className="space-y-2 text-sm text-dental-gray">
                                    {["E-max and zirconia ceramics", "Artisanal layering technique", "Indistinguishable from natural teeth"].map(t => <li key={t} className="flex items-start gap-2"><ArrowRight className="text-dental-gold mt-0.5" size={16} /><span>{t}</span></li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

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

                <section className="section-spacing bg-dental-purple text-white">
                    <div className="container-custom text-center">
                        <h2 className="text-3xl font-display mb-4">Restore Function & Aesthetics with Dental Prosthetics</h2>
                        <p className="text-white/80 max-w-xl mx-auto mb-8">During your planning consultation, we'll analyze your case and determine the most suitable prosthesis — fixed, removable, or implant-supported.</p>
                        <button onClick={() => handleWhatsAppClick("Hello! I'd like to book an evaluation for dental prosthetics with Dr. Carla Christoph.")} className="inline-flex items-center gap-2 bg-dental-gold hover:bg-dental-gold/90 text-white px-8 py-4 rounded-lg shadow-lg transition-all duration-300 font-medium text-lg">
                            <MessageCircle size={22} /> Book on WhatsApp
                        </button>
                    </div>
                </section>
            </EnPageLayout>
        </>
    );
};

export default EnDentalProstheticsPage;
