import React from "react";
import EnPageLayout from "@/components/en/EnPageLayout";
import SEOHead from "@/components/SEOHead";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, CheckCircle, ArrowRight, Sparkles, Shield, Clock, Eye, Smile, Star, Scan, Palette, Layers } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const EnVeneersAndLensesPage = () => {
    const handleWhatsAppClick = async (message?: string) => {
        if (window.dataLayer) {
            window.dataLayer.push({ event: 'whatsapp_click', event_category: 'Contact', event_action: 'Click', event_label: 'WhatsApp EN Veneers' });
        }
        if (window.gtag) {
            window.gtag('event', 'conversion', { 'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9' });
        }
        await sendGCLIDToWebhook('en_veneers_and_lenses');
        const defaultMessage = "Hello! I'd like to learn more about porcelain veneers and contact lenses.";
        window.open(`https://wa.me/5521993304045?text=${encodeURIComponent(message || defaultMessage)}`, "_blank");
    };

    const structuredData = {
        "@context": "https://schema.org", "@type": "MedicalProcedure",
        "name": "Porcelain Veneers and Contact Lenses", "procedureType": "Dental", "inLanguage": "en",
        "description": "Porcelain veneers and dental contact lenses in Ipanema, Rio de Janeiro. Smile makeover with ultra-thin E-max ceramics, digital smile design, and minimally invasive techniques.",
        "url": "https://dracarlachristoph.com/en/veneers-and-lenses",
        "provider": { "@type": "Dentist", "name": "Dr. Carla Christoph", "telephone": "+5521993304045",
            "address": { "@type": "PostalAddress", "streetAddress": "Rua Visconde de Pirajá, 550 - Suite 1107", "addressLocality": "Ipanema", "addressRegion": "RJ", "addressCountry": "BR" }
        }
    };

    const faqs = [
        { q: "What's the difference between veneers and contact lenses?", a: "The main difference is thickness and tooth preparation. Dental contact lenses are ultra-thin (0.2-0.5mm) and often require minimal or no tooth reduction. Traditional veneers (0.5-0.7mm) require a thin layer of enamel removal for placement. Both use premium porcelain for natural aesthetics." },
        { q: "How long do porcelain veneers last?", a: "High-quality porcelain veneers crafted in a specialized laboratory typically last 15 to 20 years with proper care. Longevity depends on material quality, clinical technique, oral hygiene, and avoiding habits like nail-biting or chewing ice." },
        { q: "Does the treatment hurt?", a: "No. All preparation is done under local anesthesia for complete comfort. Many contact lens cases require no anesthesia at all since there's no tooth reduction. Post-procedure sensitivity is minimal and typically resolves within 24-48 hours." },
        { q: "Can veneers fix crooked teeth?", a: "Veneers can correct the appearance of mild alignment issues, closing gaps and creating a more uniform smile. However, for significant misalignment, orthodontic treatment may be recommended first for optimal long-term results." },
        { q: "What is the Smile Test Drive?", a: "Using the iTero Element 5D scanner, we create a precise 3D model of your teeth and show you a realistic simulation of your expected result before any treatment begins. You can visualize your future smile and provide feedback, ensuring the final result matches your expectations." },
        { q: "Will my teeth look fake or too white?", a: "Absolutely not. We specialize in creating natural-looking results. Each veneer is custom-characterized with layered ceramics that mimic the translucency, texture, and shade variations of natural teeth. The shade is chosen together with you to complement your skin tone and facial features." },
        { q: "How many teeth need veneers?", a: "This depends on your specific case and goals. Some patients need only 2-4 veneers for the most visible teeth, while a full smile makeover may involve 8-10 upper veneers. We design the treatment plan based on your smile analysis and desired outcome." },
        { q: "Can I eat normally with veneers?", a: "Yes! You can eat normally with veneers. The only recommendation is to avoid biting very hard objects (like ice, bones, or hard candy) and to cut hard foods rather than biting directly. Porcelain is very strong but not indestructible." },
        { q: "What about composite bonding vs. porcelain?", a: "Composite bonding (direct resin) is more affordable and can be done in a single visit, but is less durable (5-7 years) and more prone to staining. Porcelain veneers are more natural-looking, stain-resistant, and last 15-20 years. We'll recommend the best option for your case." },
        { q: "How do I care for veneers?", a: "Care is simple: brush and floss normally, use a soft-bristle toothbrush, attend regular dental checkups, and wear a night guard if you grind your teeth. Avoid using teeth as tools (opening packages, etc.). With basic care, your veneers will maintain their beauty for years." },
        { q: "Am I a good candidate for veneers?", a: "Good candidates have healthy teeth and gums, sufficient enamel for bonding, and realistic expectations. A thorough evaluation determines the best approach — veneers, contact lenses, or an alternative treatment — tailored to your specific dental health and aesthetic goals." },
        { q: "What's the investment for porcelain veneers?", a: "The investment varies based on the number of veneers, material choice (E-max, zirconia), and case complexity. During your consultation, we provide a detailed treatment plan with transparent pricing. We offer flexible payment options to make your dream smile accessible." }
    ];

    const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "inLanguage": "en",
        "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
    };

    return (
        <>
            <SEOHead title="Porcelain Veneers & Dental Contact Lenses in Ipanema | Dr. Carla Christoph" description="Porcelain veneers and dental contact lenses specialist in Ipanema, Rio de Janeiro. Smile makeover with ultra-thin E-max ceramics, digital smile design, and Smile Test Drive. 20+ years experience." keywords="porcelain veneers ipanema, dental veneers rio de janeiro, dental contact lenses brazil, smile makeover rio, e-max veneers ipanema" canonicalUrl="https://dracarlachristoph.com/en/veneers-and-lenses" structuredData={structuredData} locale="en_US" language="en" hreflangAlternates={[{ lang: "pt-BR", href: "https://dracarlachristoph.com/lentes-e-facetas" }, { lang: "en", href: "https://dracarlachristoph.com/en/veneers-and-lenses" }, { lang: "x-default", href: "https://dracarlachristoph.com/lentes-e-facetas" }]} />
            <EnPageLayout>
                {/* Hero */}
                <section className="section-spacing bg-gradient-to-br from-dental-gold/5 to-dental-beige pt-28">
                    <div className="container-custom max-w-4xl">
                        <h1 className="heading-lg mb-4">Porcelain Veneers & Dental Contact Lenses</h1>
                        <Separator className="w-24 h-1 bg-dental-gold mb-6" />
                        <p className="text-lg text-dental-gray leading-relaxed max-w-3xl">Transform your smile with ultra-thin porcelain veneers that correct color, shape, spacing, and alignment — all while preserving maximum natural tooth structure. Dr. Carla Christoph combines 20+ years of experience with digital smile design and the iTero Element 5D scanner to deliver stunning, natural-looking results you can preview before treatment begins.</p>
                    </div>
                </section>

                {/* Modalities Comparison */}
                <section className="section-spacing bg-white/50">
                    <div className="container-custom max-w-5xl">
                        <h2 className="heading-md mb-4 text-center">Veneers vs. Contact Lenses vs. Composite Bonding</h2>
                        <p className="text-center text-dental-gray mb-10 max-w-2xl mx-auto">Understanding the differences helps you choose the right treatment</p>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow-soft border-t-4 border-dental-gold">
                                <div className="flex items-center gap-3 mb-4">
                                    <Layers className="w-7 h-7 text-dental-gold" />
                                    <h3 className="text-xl font-display font-semibold text-dental-purple">Contact Lenses</h3>
                                </div>
                                <img src="/Lentes.webp" alt="Ultra-thin dental contact lenses on teeth" className="w-full rounded-lg mb-4 aspect-video object-cover" />
                                <ul className="space-y-2 text-sm text-dental-gray">
                                    {["Ultra-thin (0.2-0.5mm)", "Minimal or no tooth reduction", "Best for: color, small gaps, minor shape changes", "Durability: 15-20 years", "Material: E-max porcelain"].map(t => <li key={t} className="flex items-start gap-2"><CheckCircle className="text-dental-gold mt-0.5 flex-shrink-0" size={14} /><span>{t}</span></li>)}
                                </ul>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-soft border-t-4 border-dental-purple">
                                <div className="flex items-center gap-3 mb-4">
                                    <Sparkles className="w-7 h-7 text-dental-purple" />
                                    <h3 className="text-xl font-display font-semibold text-dental-purple">Porcelain Veneers</h3>
                                </div>
                                <img src="/Lentes.webp" alt="Porcelain veneer being placed" className="w-full rounded-lg mb-4 aspect-video object-cover" />
                                <ul className="space-y-2 text-sm text-dental-gray">
                                    {["Standard thickness (0.5-0.7mm)", "Thin enamel reduction required", "Best for: major shade/shape/alignment changes", "Durability: 15-20 years", "Material: E-max or zirconia"].map(t => <li key={t} className="flex items-start gap-2"><CheckCircle className="text-dental-purple mt-0.5 flex-shrink-0" size={14} /><span>{t}</span></li>)}
                                </ul>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-soft border-t-4 border-gray-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <Palette className="w-7 h-7 text-gray-500" />
                                    <h3 className="text-xl font-display font-semibold text-dental-purple">Composite Bonding</h3>
                                </div>
                                <img src="/Restarações.webp" alt="Composite bonding restoration on teeth" className="w-full rounded-lg mb-4 aspect-video object-cover" />
                                <ul className="space-y-2 text-sm text-dental-gray">
                                    {["Direct application (no lab)", "No tooth reduction needed", "Best for: chips, small gaps, minor repairs", "Durability: 5-7 years", "Material: Composite resin"].map(t => <li key={t} className="flex items-start gap-2"><CheckCircle className="text-gray-400 mt-0.5 flex-shrink-0" size={14} /><span>{t}</span></li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Smile Test Drive */}
                <section className="section-spacing bg-dental-beige/20">
                    <div className="container-custom max-w-5xl">
                        <h2 className="heading-md mb-4 text-center">Smile Test Drive</h2>
                        <p className="text-center text-dental-gray mb-10 max-w-2xl mx-auto">See your new smile before treatment begins</p>
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <p className="text-dental-gray mb-6">Using the iTero Element 5D scanner, we capture a precise 3D model of your teeth and create a realistic before-and-after simulation. You can see, evaluate, and refine your future smile — ensuring the final result meets your expectations.</p>
                                <ul className="space-y-3">
                                    {[{ icon: Scan, text: "Digital 3D scan — no messy impressions" }, { icon: Eye, text: "Realistic visualization of your future smile" }, { icon: Star, text: "Collaborate with Dr. Carla on the design" }, { icon: Shield, text: "Commitment-free preview before treatment" }].map(item => (
                                        <li key={item.text} className="flex items-start gap-3 text-dental-gray">
                                            <item.icon className="text-dental-gold mt-0.5 flex-shrink-0" size={18} />
                                            <span>{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-elegant">
                                <img src="/lovable-uploads/Itero_tela.webp" alt="iTero Element 5D digital smile design screen showing before and after simulation" className="w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mid CTA */}
                <section className="py-8 bg-white">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <p className="text-xl text-dental-gray mb-6">Ready to see your smile transformation?</p>
                        <button onClick={() => handleWhatsAppClick("Hello! I'd like to book a Smile Test Drive consultation for veneers.")} className="inline-flex items-center justify-center px-8 py-4 bg-dental-gold hover:bg-dental-gold/90 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
                            Book Your Smile Test Drive <ArrowRight size={20} className="ml-2" />
                        </button>
                    </div>
                </section>

                {/* Treatment Process */}
                <section className="section-spacing bg-dental-beige/20">
                    <div className="container-custom max-w-4xl">
                        <h2 className="heading-md mb-4 text-center">Your Smile Makeover Journey</h2>
                        <p className="text-center text-dental-gray mb-10">A precise, personalized process from consultation to your perfect smile</p>
                        <div className="space-y-6">
                            {[{ step: "1", title: "Smile Analysis & Consultation", desc: "Comprehensive facial and dental analysis, digital photos, and discussion of your goals and expectations. Together, we define the ideal treatment approach." },
                              { step: "2", title: "Smile Test Drive (Digital Design)", desc: "iTero Element 5D scanning creates a 3D simulation of your future smile. You see the result before any preparation begins." },
                              { step: "3", title: "Minimally Invasive Preparation", desc: "For veneers: ultra-conservative tooth preparation preserving maximum enamel. For contact lenses: often no preparation at all." },
                              { step: "4", title: "Precision Digital Impression", desc: "The iTero scanner captures a millimetrically accurate digital impression — no uncomfortable traditional molds." },
                              { step: "5", title: "Laboratory Fabrication", desc: "Our specialist partner laboratory handcrafts each veneer or lens with E-max or zirconia ceramics — layered for natural translucency and color." },
                              { step: "6", title: "Try-In & Final Bonding", desc: "Your veneers are tried in, evaluated for fit, shade, and aesthetics, then permanently bonded. You leave with your new smile." },
                              { step: "7", title: "Follow-Up & Maintenance", desc: "Regular checkups to ensure the longevity and health of your new smile. Night guard fitting if needed for bruxism protection." }
                            ].map(item => (
                                <div key={item.step} className="flex gap-4 items-start bg-white rounded-xl p-6 shadow-soft">
                                    <div className="w-10 h-10 bg-dental-gold text-white rounded-full flex items-center justify-center font-display text-lg flex-shrink-0">{item.step}</div>
                                    <div><h3 className="font-display text-dental-purple mb-1">{item.title}</h3><p className="text-dental-gray text-sm">{item.desc}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* What Veneers Can Correct */}
                <section className="section-spacing bg-white/50">
                    <div className="container-custom max-w-4xl">
                        <h2 className="heading-md mb-8 text-center">What Veneers Can Transform</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[{ title: "Discolored Teeth", desc: "Stubborn stains, tetracycline discoloration, or uneven color that whitening can't resolve" },
                              { title: "Chipped or Worn Teeth", desc: "Restore the original shape and length of teeth damaged by wear, chips, or fractures" },
                              { title: "Gaps Between Teeth", desc: "Close diastemas and spaces between teeth for a harmonious, aligned smile" },
                              { title: "Minor Misalignment", desc: "Correct the appearance of slightly crooked or rotated teeth without orthodontics" },
                              { title: "Uneven Tooth Size", desc: "Create symmetry and proportion for teeth that are too small, too narrow, or irregularly shaped" },
                              { title: "Smile Rejuvenation", desc: "Turn back the clock on aged or worn smiles — veneers provide a youthful, refreshed appearance" }
                            ].map(item => (
                                <div key={item.title} className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-soft">
                                    <Smile className="text-dental-gold mt-1 flex-shrink-0" size={22} />
                                    <div><h3 className="font-display text-dental-purple mb-1">{item.title}</h3><p className="text-dental-gray text-sm">{item.desc}</p></div>
                                </div>
                            ))}
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
                        <h2 className="text-3xl font-display mb-4">Transform Your Smile with Porcelain Veneers</h2>
                        <p className="text-white/80 max-w-xl mx-auto mb-8">Book your Smile Test Drive consultation to see your future smile and discuss the best veneer option for your goals.</p>
                        <button onClick={() => handleWhatsAppClick("Hello! I'd like to book a consultation for porcelain veneers with Dr. Carla Christoph.")} className="inline-flex items-center gap-2 bg-dental-gold hover:bg-dental-gold/90 text-white px-8 py-4 rounded-lg shadow-lg transition-all duration-300 font-medium text-lg">
                            <MessageCircle size={22} /> Book on WhatsApp
                        </button>
                    </div>
                </section>
            </EnPageLayout>
        </>
    );
};

export default EnVeneersAndLensesPage;
