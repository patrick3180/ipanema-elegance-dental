import React from "react";
import { Link as RouterLink } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import EnPageLayout from "@/components/en/EnPageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import StatsBar from "@/components/treatment/StatsBar";
import SectionDivider from "@/components/treatment/SectionDivider";
import ProcessTimeline from "@/components/treatment/ProcessTimeline";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import { Sparkles, Shield, Heart, Award, Search, Scan, CheckCircle, HelpCircle, ArrowRight, Clock, Link, Ban, Target, Wrench, Stethoscope, Syringe, Scissors, HeartPulse, Layers, Focus, Gem } from "lucide-react";
import { InternalLinkingOptimizer } from '@/components/seo/InternalLinkingOptimizer';
import ScrollReveal from '@/components/ScrollReveal';
import DoctorBioSection from '@/components/treatment/DoctorBioSection';
import ServiceFAQ from '@/components/treatment/ServiceFAQ';
import FinalServiceCTA from '@/components/treatment/FinalServiceCTA';
import EmpatheticPainPoints from '@/components/treatment/EmpatheticPainPoints';

const EnAestheticRestorationsPage = () => {
  const handleWhatsAppClick = async (message: string) => {
    await sendGCLIDToWebhook('en_aesthetic_restorations_cta');
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'whatsapp_click', event_category: 'Contact', event_action: 'Click', event_label: 'EN Aesthetic Restorations CTA' });
    }
    if (window.gtag) {
      window.gtag('event', 'conversion', { 'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9' });
    }
    const phoneNumber = "5521993304045";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  const faqs = [
    { question: "What is an aesthetic dental restoration?", answer: "It is a procedure that rebuilds teeth compromised by cavities, fractures, or cracks using state-of-the-art materials (composite resin or porcelain) that perfectly mimic the color, shine, and texture of natural teeth. Unlike the old dark amalgam \"fillings,\" aesthetic restorations are virtually invisible." },
    { question: "When is a restoration necessary?", answer: <><p className="mb-3">Restorations are recommended in several situations:</p><ul className="list-disc pl-5 space-y-2"><li>Cavities (small, medium, or extensive)</li><li>Dental fractures from trauma or wear</li><li>Cracks causing sensitivity</li><li>Replacement of old, darkened restorations</li><li>Shape correction or closing small gaps</li><li>Reconstruction after <RouterLink to="/en/root-canal" className="text-dental-gold hover:text-dental-purple transition-colors font-medium">root canal treatment</RouterLink></li></ul></> },
    { question: "What materials are used in aesthetic restorations?", answer: "We use state-of-the-art nano-filled composite resins that offer high strength, natural aesthetics, and durability. For cases requiring maximum longevity (large posterior restorations), we recommend porcelain or lab-processed resin restorations (inlays/onlays), which are fabricated in specialized labs for even greater strength." },
    { question: "Does the restoration procedure hurt?", answer: "No. We use local anesthesia with a comfortable technique. Most patients report no discomfort during the procedure. After the anesthesia wears off, there may be mild sensitivity for 24-48 hours, easily managed with over-the-counter pain medication if needed." },
    { question: "How long do aesthetic restorations last?", answer: <><p>Durability varies depending on the type of restoration and patient care:</p><ul className="list-disc pl-5 space-y-2 mt-3"><li><strong>Direct restorations (composite resin):</strong> 5 to 8 years on average</li><li><strong>Indirect restorations (porcelain inlay/onlay):</strong> 12 to 15 years or more</li></ul><p className="mt-3">Factors that extend lifespan: good oral hygiene, regular checkups, avoiding nail-biting, not opening packages with your teeth, and wearing a night guard for bruxism when recommended.</p></> },
    { question: "Can I replace my old dark fillings?", answer: "Yes! Replacing old amalgam (metal) fillings with aesthetic composite restorations is one of the most sought-after procedures. Beyond the aesthetic benefit, we eliminate the risk of micro-leakage common in old restorations and remove the metal from your mouth. The replacement is done conservatively, preserving as much healthy tooth structure as possible." },
    { question: "Do composite restorations stain over time?", answer: "Modern composite resins have excellent color stability. With proper care (good hygiene, periodic professional polishing, and moderation with highly pigmented foods like coffee, red wine, and açaí), restorations maintain their original color for many years. When needed, professional polishing can restore the luster." },
  ];

  return (
    <EnPageLayout>
      <SEOHead
        title="Aesthetic Dental Restorations in Ipanema | Dr. Carla Christoph"
        description="Aesthetic dental restorations in Ipanema with nano-filled composite resin. Treatment for cavities, broken and cracked teeth. Natural, long-lasting results. Dr. Carla Christoph CRO-RJ 27.509."
        canonicalUrl="https://dracarlachristoph.com/en/aesthetic-restorations"
        keywords="aesthetic restorations Ipanema, dental fillings Rio, composite resin dentist, cavity treatment"
        ogImage="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
        locale="en_US"
        language="en"
        hreflangAlternates={[
          { lang: "pt-BR", href: "https://dracarlachristoph.com/restauracoes-esteticas" },
          { lang: "en", href: "https://dracarlachristoph.com/en/aesthetic-restorations" },
          { lang: "x-default", href: "https://dracarlachristoph.com/restauracoes-esteticas" }
        ]}
        structuredData={{ "@context": "https://schema.org", "@type": "MedicalProcedure", "name": "Aesthetic Dental Restoration", "description": "Aesthetic dental restoration with nano-filled composite resin for treatment of cavities, fractures, and cracks with natural results", "procedureType": "Dental", "inLanguage": "en", "provider": { "@type": "Dentist", "name": "Dr. Carla Christoph", "telephone": "+5521993304045", "address": { "@type": "PostalAddress", "streetAddress": "Rua Visconde de Pirajá, 550 - Suite 1107", "addressLocality": "Ipanema", "addressRegion": "RJ", "postalCode": "22410-002", "addressCountry": "BR" } } }}
        additionalStructuredData={[
          { "@context": "https://schema.org", "@type": "FAQPage", "inLanguage": "en", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": typeof faq.answer === 'string' ? faq.answer : faq.question } })) },
          { "@context": "https://schema.org", "@type": "WebPage", "name": "Aesthetic Dental Restorations in Ipanema", "url": "https://dracarlachristoph.com/en/aesthetic-restorations", "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".treatment-hero-title", ".treatment-hero-description", ".quick-answer-box"] }, "inLanguage": "en" }
        ]}
      />

      <TreatmentHero
        locale="en"
        title="Aesthetic Dental Restorations in Ipanema"
        subtitle="Beauty and Function for Your Smile"
        description="Restore teeth compromised by cavities, fractures, or cracks with state-of-the-art composite resins that perfectly mimic the natural color and texture of your teeth."
        badges={["High-Performance Resins", "Natural Results", "Conservative Technique"]}
        doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
        breadcrumbs={[{ label: "Home", href: "/en" }, { label: "Treatments", href: "/en" }, { label: "Aesthetic Restorations" }]}
      />

      {/* Quick Answer Box */}
      <section className="py-8 bg-white">
        <div className="container-custom">
          <QuickAnswerBox
locale="en"             answer="Aesthetic restorations are treatments that rebuild teeth compromised by cavities, fractures, or cracks using nano-filled composite resins or state-of-the-art ceramics. At Dr. Carla Christoph's practice in Ipanema (CRO-RJ 27.509), we use high-quality materials with color layering techniques that perfectly reproduce the natural translucency of teeth. The treatment is conservative, preserving as much tooth structure as possible, and the result is indistinguishable from natural teeth. With 20+ years of experience, we perform everything from small restorations to complex reconstructions in one or just a few sessions."
          />
        </div>
      </section>

      {/* Empathetic Pain Points */}
      <ScrollReveal animation="fade-up">
        <EmpatheticPainPoints
          title="Have you ever hidden your smile because of a compromised tooth?"
          painPoints={[
            {
              icon: <Gem className="w-6 h-6 text-dental-purple" />,
              strong: "Restorations that go completely unnoticed",
              description: "We use layered resins and ceramics that reproduce the natural translucency and texture of your tooth — these aren't fillings, they're reconstructions.",
              borderColor: "border-dental-purple"
            },
            {
              icon: <Shield className="w-6 h-6 text-dental-gold" />,
              strong: "Conservative technique — we preserve as much as possible",
              description: "Every restoration is planned to remove only what's necessary. The more natural structure preserved, the better the long-term outcome.",
              borderColor: "border-dental-gold"
            },
            {
              icon: <Heart className="w-6 h-6 text-dental-purple-soft" />,
              strong: "Every case is individually planned",
              description: "Dr. Carla takes the time to understand your history before any procedure — no rush, no one-size-fits-all approach.",
              borderColor: "border-dental-purple-soft"
            }
          ]}
          conclusion={<>Cavities, fractures, and cracks are more common than you think — and the impact goes beyond aesthetics.<br className="hidden md:block" /> Let's evaluate the best solution for your case.</>}
        />
      </ScrollReveal>

      {/* Divider */}
      <SectionDivider variant="with-icon" icon={<Award size={20} />} />

      {/* Doctor Bio Section */}
      <ScrollReveal animation="fade-up">
        <DoctorBioSection
          locale="en"
          sectionTitle="Restorations with Technical Precision and Artistry"
          badgeText="20+ Years of Experience"
          paragraphs={[
            "With over two decades in Ipanema, Dr. Carla has built her reputation by treating each patient individually, with time and attention. Her background includes 8 years as a military dentist at the Brazilian Navy Dental Center, an experience that brought discipline and precision to her clinical practice.",
            "For restorations, she uses resins and ceramics that reproduce the natural translucency of each tooth. The goal is for the restoration to go completely unnoticed — making the treated tooth indistinguishable from the rest."
          ]}
          credentials={[
            { title: "Training", description: "Specialist in Dental Prosthetics and Implantology" },
            { title: "Experience", description: "20+ years treating cases of all complexities" },
            { title: "Continuing Education", description: "Ongoing training in advanced techniques" },
            { title: "Technology", description: "iTero Element 5D intraoral scanner" }
          ]}
        />
      </ScrollReveal>

      {/* Divider */}
      <SectionDivider variant="with-icon" icon={<Shield size={20} />} />

      {/* Modality Cards — Direct vs Indirect */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
              Direct or Indirect Restoration: Which Is Right for You?
            </h2>
            <p className="text-lg text-dental-gray max-w-3xl mx-auto">
              Each technique has specific indications. The choice depends on the extent of damage, tooth location, and treatment goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* CARD 1 - DIRECT RESTORATION */}
            <div className="group bg-white rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 overflow-hidden">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src="/lovable-uploads/Restauracao direta.webp"
                  alt="Direct Composite Resin Restoration"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-display font-bold mb-2">Direct Composite Restoration</h3>
                  <p className="text-white/90">Completed in a single office visit</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-dental-gray leading-relaxed mb-6">
                  Completed in a single session, where nano-filled composite resin is applied and sculpted directly on the compromised tooth.
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-dental-purple mb-3">Indications:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Small to medium cavities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Minor fractures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Surface cracks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Closing small gaps (diastemas)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Shape correction</span>
                    </li>
                  </ul>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-dental-purple/20">
                    <AccordionTrigger className="text-dental-purple font-semibold hover:text-dental-gold transition-colors">
                      See Detailed Characteristics
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Fabrication:</span>
                          <span className="text-dental-purple">In-office (1 session)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Duration:</span>
                          <span className="text-dental-purple">40-90 minutes per tooth</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Longevity:</span>
                          <span className="text-dental-purple">5-8 years</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Investment:</span>
                          <span className="text-dental-purple">More accessible</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Preparation:</span>
                          <span className="text-dental-purple">Minimally conservative</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* CARD 2 - INDIRECT RESTORATION */}
            <div className="group bg-white rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 overflow-hidden">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src="/lovable-uploads/inlay de porcelana.webp"
                  alt="Indirect Restoration - Porcelain Inlay and Onlay"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-display font-bold mb-2">Indirect Restoration (Inlay/Onlay)</h3>
                  <p className="text-white/90">Fabricated in a specialized dental lab</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-dental-gray leading-relaxed mb-6">
                  Fabricated in a specialized lab and cemented in a second session, offering greater strength and longevity.
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-dental-purple mb-3">Indications:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Extensive cavities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Significant structural loss</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Large fractures in back teeth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Replacement of large old restorations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Maximum durability required</span>
                    </li>
                  </ul>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-dental-purple/20">
                    <AccordionTrigger className="text-dental-purple font-semibold hover:text-dental-gold transition-colors">
                      See Detailed Characteristics
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Fabrication:</span>
                          <span className="text-dental-purple">Lab-crafted (2 sessions)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Material:</span>
                          <span className="text-dental-purple">Porcelain or lab-processed resin</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Longevity:</span>
                          <span className="text-dental-purple">12-15 years</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Investment:</span>
                          <span className="text-dental-purple">Higher value</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Precision:</span>
                          <span className="text-dental-purple">Millimetric fit</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          {/* How to Choose info box */}
          <div className="mt-12 bg-dental-beige/20 border-2 border-dental-gold/30 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-dental-gold/20 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-6 h-6 text-dental-gold" />
              </div>
              <div>
                <h4 className="text-xl font-display font-bold text-dental-purple mb-3">How to Choose?</h4>
                <p className="text-dental-gray leading-relaxed mb-4">
                  The choice isn't "better or worse" — it's about <span className="font-semibold text-dental-purple">clinical indication</span>. We analyze:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0" />
                    <span className="text-dental-gray">Extent of damage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0" />
                    <span className="text-dental-gray">Location (front/back teeth)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0" />
                    <span className="text-dental-gray">Chewing forces</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0" />
                    <span className="text-dental-gray">Remaining tooth structure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0" />
                    <span className="text-dental-gray">Aesthetic goals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0" />
                    <span className="text-dental-gray">Available investment</span>
                  </div>
                </div>
                <p className="text-dental-purple font-semibold mt-4">
                  Our priority: preserve as much healthy tooth structure as possible and provide the most durable solution for your case.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <SectionDivider variant="with-icon" icon={<Heart size={20} />} />

      {/* Benefits Section */}
      <section className="py-16 bg-dental-beige/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
              Advantages of Aesthetic Restorations
            </h2>
            <p className="text-lg text-dental-gray max-w-3xl mx-auto">
              State-of-the-art technology and materials for natural, long-lasting results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7 text-dental-purple" />
              </div>
              <h3 className="text-xl font-display font-bold text-dental-purple mb-3">Superior Aesthetics</h3>
              <p className="text-dental-gray leading-relaxed">
                Color and shine identical to natural teeth. Virtually invisible result.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-dental-purple mb-3">Tooth Preservation</h3>
              <p className="text-dental-gray leading-relaxed">
                Conservative technique that maintains the maximum amount of healthy tooth structure.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <Link className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-dental-purple mb-3">Chemical Adhesion</h3>
              <p className="text-dental-gray leading-relaxed">
                Chemical bond to the tooth providing effective sealing against infiltration.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <Ban className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-dental-purple mb-3">Metal-Free</h3>
              <p className="text-dental-gray leading-relaxed">
                Zero mercury or metals. Biocompatible material that's safe for your health.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-yellow-50 flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-dental-gold" />
              </div>
              <h3 className="text-xl font-display font-bold text-dental-purple mb-3">Versatility</h3>
              <p className="text-dental-gray leading-relaxed">
                Applicable to both front and back teeth, adapting to each situation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                <Wrench className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-dental-purple mb-3">Easy Repair</h3>
              <p className="text-dental-gray leading-relaxed">
                Adjustments and repairs are possible without replacing the entire restoration.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300 md:col-start-2">
              <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-dental-purple mb-3">Proven Durability</h3>
              <p className="text-dental-gray leading-relaxed">
                High-resistance materials that provide long-lasting treatment results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <SectionDivider variant="with-icon" icon={<Search size={20} />} />

      {/* Process Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
              Your Treatment: Step by Step
            </h2>
            <p className="text-lg text-dental-gray max-w-3xl mx-auto">
              A structured process to ensure the best result with maximum comfort
            </p>
          </div>

          <ProcessTimeline
            steps={[
              {
                number: 1,
                title: "Precise Diagnosis",
                description: "Complete clinical exam • Digital X-rays • Detailed occlusal analysis • iTero Element 5D for complex cases • Bruxism and parafunctional habit assessment",
                icon: <Stethoscope size={24} />,
                duration: "1st Appointment"
              },
              {
                number: 2,
                title: "Anesthesia & Comfort",
                description: "Comfortable anesthesia technique • Absolute isolation of the operative field • Calm, welcoming environment • Continuous monitoring throughout the procedure",
                icon: <Syringe size={24} />,
                duration: "Start of procedure"
              },
              {
                number: 3,
                title: "Conservative Preparation",
                description: "Removal of only compromised tissue • Maximum preservation of healthy structure • Preparation with precision instruments • Acid etching and state-of-the-art adhesive system",
                icon: <Scissors size={24} />,
                duration: "20-30 minutes"
              },
              {
                number: 4,
                title: "Application & Sculpting",
                description: "Meticulous shade selection • Incremental layering technique • Controlled light-curing • Anatomical sculpting respecting natural form and function",
                icon: <Sparkles size={24} />,
                duration: "30-60 minutes"
              },
              {
                number: 5,
                title: "Adjustment & Polishing",
                description: "Thorough bite check • Occlusal adjustment with articulating paper • Sequential polishing with diamond discs and pastes • Glass-like finish",
                icon: <CheckCircle size={24} />,
                duration: "15-20 minutes"
              }
            ]}
          />
        </div>
      </section>

      {/* Divider */}
      <SectionDivider variant="with-icon" icon={<Award size={20} />} />

      {/* Treatment Differentiators */}
      <section className="py-16 bg-dental-beige/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
              What Sets Our Treatment Apart
            </h2>
            <p className="text-lg text-dental-gray max-w-3xl mx-auto">
              Advanced protocols that make the difference in the final result
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <HeartPulse className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-2">Health-First Protocol</h3>
                  <p className="text-dental-gray leading-relaxed">
                    Treatment of gum inflammation and active cavity control before any aesthetic restoration.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-dental-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-2">Certified Materials</h3>
                  <p className="text-dental-gray leading-relaxed">
                    Internationally certified composite resins with nanotechnology and a broad color palette for perfect matching.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <Layers className="w-6 h-6 text-dental-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-2">Layering Technique</h3>
                  <p className="text-dental-gray leading-relaxed">
                    Application in multiple layers with varying degrees of opacity and translucency, mimicking natural tooth structure.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Focus className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-2">Detailed Occlusal Analysis</h3>
                  <p className="text-dental-gray leading-relaxed">
                    Verification of proper chewing force distribution to prevent overload and ensure longevity.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                  <Gem className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-2">High-Gloss Finishing</h3>
                  <p className="text-dental-gray leading-relaxed">
                    Professional-grade polishing that delivers a glass-like shine and texture that perfectly mimics natural tooth enamel.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-2">Bruxism Protocol</h3>
                  <p className="text-dental-gray leading-relaxed">
                    Custom night guard fabrication when needed to protect restorations and prevent premature wear.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <SectionDivider variant="with-icon" icon={<Scan size={20} />} />

      {/* iTero Technology Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src="/lovable-uploads/scanner 3d.webp"
                  alt="iTero Element 5D - Digital diagnostic technology"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-dental-purple/20 rounded-full blur-3xl"></div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-dental-purple/10 flex items-center justify-center">
                  <Scan className="w-7 h-7 text-dental-purple" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple">
                  High-Precision Digital Diagnostics
                </h2>
              </div>

              <p className="text-lg text-dental-gray leading-relaxed mb-8">
                The <span className="font-semibold text-dental-purple">iTero Element 5D</span> is the most advanced intraoral scanner on the market, offering real-time diagnostics and millimetric precision.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <Search className="w-5 h-5 text-dental-purple" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dental-purple mb-1">Early Cavity Detection</h3>
                    <p className="text-dental-gray">Identifying lesions invisible to the naked eye, enabling preventive treatment.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dental-purple mb-1">Wear Analysis</h3>
                    <p className="text-dental-gray">Mapping areas of excessive friction from bruxism or misaligned bite.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dental-purple mb-1">Digital Impressions</h3>
                    <p className="text-dental-gray">3D capture without discomfort, nausea, or traditional impression materials.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-dental-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dental-purple mb-1">Visual Communication</h3>
                    <p className="text-dental-gray">Real-time on-screen visualization for easier understanding of diagnosis and treatment plan.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <SectionDivider variant="with-icon" icon={<HelpCircle size={20} />} />

      {/* FAQs */}
      <ScrollReveal animation="fade-up">
        <ServiceFAQ 
          title="Frequently Asked Questions"
          subtitle="Answers to the most common questions about aesthetic restorations"
          faqs={faqs}
        />
      </ScrollReveal>

      {/* Divider */}
      <SectionDivider variant="with-icon" icon={<ArrowRight size={20} />} />

      {/* Final CTA */}
      <FinalServiceCTA 
        locale="en"
        title="Restore the Health and Beauty of Your Smile"
        description="Aesthetic restorations that combine technical precision, nano-filled composite resins, and natural-looking results."
        ctaText="Book Your Evaluation on WhatsApp"
        whatsappMessage="Hello! I saw the page about aesthetic restorations and would like to schedule an evaluation with Dr. Carla Christoph."
        onClickOverride={() => handleWhatsAppClick("Hello! I saw the page about aesthetic restorations and would like to schedule an evaluation with Dr. Carla Christoph.")}
      />

      <StatsBar locale="en" />
      <InternalLinkingOptimizer currentPage="en-aesthetic-restorations" />
    </EnPageLayout>
  );
};

export default EnAestheticRestorationsPage;
