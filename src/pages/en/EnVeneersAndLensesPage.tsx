import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import EnPageLayout from "@/components/en/EnPageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import StatsBar from "@/components/treatment/StatsBar";
import SectionDivider from "@/components/treatment/SectionDivider";
import ProcessTimeline from "@/components/treatment/ProcessTimeline";
import ComparisonTable from "@/components/blog/ComparisonTable";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import { ComparisonTableItem } from "@/types/BlogPost";
import DoctorBioSection from "@/components/treatment/DoctorBioSection";
import ServiceFAQ from "@/components/treatment/ServiceFAQ";
import FinalServiceCTA from "@/components/treatment/FinalServiceCTA";
import EmpatheticPainPoints from "@/components/treatment/EmpatheticPainPoints";
import ScrollReveal from '@/components/ScrollReveal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Star, ArrowRight, Sparkles, Shield, Heart, Award, Search, HelpCircle, Droplet, Maximize2, Ruler, Palette, AlertCircle } from "lucide-react";
import { InternalLinkingOptimizer } from "@/components/seo/InternalLinkingOptimizer";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const EnVeneersAndLensesPage = () => {
  const caseImages = null;

  // Comparison table data (mirror of PT)
  const comparisonData: ComparisonTableItem[] = [
    { "Criterio": "Criteria", "Critério": "Criteria", "Rótulo coluna A": "Ceramic Lenses", "Rótulo coluna B": "Composite Veneers" },
    { "Criterio": "Thickness", "Rótulo coluna A": "0.2–0.5mm", "Rótulo coluna B": "0.7–1.5mm" },
    { "Criterio": "Tooth preparation", "Rótulo coluna A": "Minimal", "Rótulo coluna B": "Minimal to moderate" },
    { "Criterio": "Durability", "Rótulo coluna A": "15–20 years", "Rótulo coluna B": "5–8 years" },
    { "Criterio": "Staining", "Rótulo coluna A": "Stain-resistant", "Rótulo coluna B": "May stain over time" },
    { "Criterio": "Appointments required", "Rótulo coluna A": "2–3 (15–20 days)", "Rótulo coluna B": "1–2 (immediate)" },
    { "Criterio": "Repairability", "Rótulo coluna A": "No", "Rótulo coluna B": "Yes" },
    { "Criterio": "Aesthetics", "Rótulo coluna A": "Superior translucency", "Rótulo coluna B": "Very good" },
    { "Criterio": "Investment", "Rótulo coluna A": "Higher investment", "Rótulo coluna B": "More affordable" },
    { "Criterio": "Strength", "Rótulo coluna A": "High", "Rótulo coluna B": "Moderate" }
  ];

  // FAQs — 12 questions (mirror of PT)
  const faqs = [
    {
      question: "What's the difference between dental contact lenses and composite veneers?",
      answer: "Dental contact lenses are ultra-thin porcelain shells (0.2–0.5mm) that require minimal tooth preparation, ideal for lasting aesthetic changes with maximum naturalness. Composite veneers are thicker restorations (0.7–1.5mm) sculpted directly in the office at a more accessible cost. Lenses last 15–20 years and don't stain, while composite veneers last 5–8 years and may need periodic polishing."
    },
    {
      question: "Do my teeth need to be filed down significantly?",
      answer: "No. Our philosophy prioritizes maximum preservation of tooth structure. For lenses, the preparation is minimal (0.1–0.3mm when necessary), limited to the superficial enamel. For composite veneers, the preparation is also conservative. The goal is to ensure a perfect fit and long-lasting aesthetic result while preserving as much of your natural teeth as possible."
    },
    {
      question: "How long does the complete treatment take?",
      answer: "Dental contact lenses: 2–3 appointments over 15–20 days. The first appointment is for planning and digital impression, the second for Smile Test Drive approval, and the third for bonding. Composite veneers: 1–2 appointments, as they are sculpted directly in the office. We schedule ample time for each session to ensure quality."
    },
    {
      question: "Does the smile enhancement treatment hurt?",
      answer: "No. All aesthetic procedures are performed with maximum comfort, using local anesthesia whenever necessary. The lens bonding process is a delicate procedure that causes no pain. There may be mild sensitivity for the first few days, easily managed with simple pain relievers if needed. Your comfort is our priority."
    },
    {
      question: "What is the Smile Test Drive (mock-up)?",
      answer: "It's a technique where we create your new smile using non-adhesive provisional resin directly on your teeth, without any filing. You can look in the mirror, take photos, record videos, talk, and smile. It's a unique experience! We adjust together until it's exactly right. Only after your 100% approval do we proceed with the definitive treatment. This is one of our greatest advantages."
    },
    {
      question: "Can the lenses look artificial?",
      answer: "This is one of the most common concerns, and our greatest priority is to avoid that. When expertly crafted by a specialist, absolutely not. We use state-of-the-art ceramics that perfectly mimic the beauty of natural teeth. The secret lies in complete facial analysis, personalized shade layering, and individualized proportions. The result is a smile praised for its naturalness."
    },
    {
      question: "Can I get lenses even if my teeth are crooked?",
      answer: "Yes, as long as the misalignment is mild. Lenses can correct minor misalignments, rotations, and gaps. However, for severe crowding or significant bite issues, prior orthodontic treatment may be necessary for a lasting, healthy result. During your consultation, we'll evaluate your specific case and recommend the best approach."
    },
    {
      question: "Do I need veneers on all my teeth?",
      answer: "Not necessarily. Many cases involve only the upper front teeth (4 to 10 teeth). During the evaluation, we analyze your smile to determine how many teeth need to be included for a harmonious result. The treatment plan is individualized for each person."
    },
    {
      question: "What is the investment for dental lenses and veneers in Ipanema?",
      answer: "The investment varies depending on the number of teeth treated, case complexity, and material chosen. Dental contact lenses require a higher investment due to imported ceramic materials and superior durability (15–20 years). Composite veneers offer excellent value for those seeking immediate results at a more accessible price point. We offer flexible payment plans. The value reflects the complete experience, advanced technology, and personalized follow-up care. Detailed pricing is provided during your evaluation."
    },
    {
      question: "Can lenses stain from coffee, wine, or smoking?",
      answer: "The ceramic used in lenses does not stain. Unlike composite veneers, the ceramic material is impermeable and permanently maintains its original shine and color. You can continue enjoying coffee, red wine, tea, and other foods without worry. Only the adjacent natural teeth require attention with prior whitening to avoid contrast."
    },
    {
      question: "How do I maintain lenses and veneers?",
      answer: "Ceramic lenses: Normal oral hygiene (brushing, flossing, mouthwash), avoid biting hard objects (pens, nails, ice), use a night guard if you grind your teeth. Semi-annual checkups for evaluation and professional polishing. Composite veneers: Same care, but require professional polishing every 6 months to maintain shine. Both can last many years with proper care."
    },
    {
      question: "How does the planning consultation work?",
      answer: "It's an in-depth conversation to understand your desires and expectations. We perform digital scanning with the iTero Element 5D and a complete analysis of your smile and face. Together, we define the best treatment plan, explaining the pros and cons of each option (lenses vs. veneers). You'll leave the consultation with all the information needed to make an informed decision."
    }
  ];

  const handleWhatsAppClick = async (message?: string) => {
    const gclid = new URLSearchParams(window.location.search).get('gclid');
    if (gclid) localStorage.setItem('gclid', gclid);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', { 'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9', 'value': 1.0, 'currency': 'BRL' });
    }
    await sendGCLIDToWebhook('en_veneers_and_lenses');
    const defaultMessage = "Hello! I'd like to learn about the dental contact lenses and porcelain veneers process.";
    window.open(`https://wa.me/5521993304045?text=${encodeURIComponent(message || defaultMessage)}`, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Dental Contact Lenses and Composite Veneers in Ipanema | Dr. Carla</title>
        <meta name="description" content="Ultra-thin dental contact lenses (0.2mm) and composite veneers in Ipanema with Dr. Carla Christoph. 20+ years of experience. Exclusive Smile Test Drive." />
        <meta name="keywords" content="dental contact lenses, composite veneers, ipanema, dr carla christoph, smile test drive, porcelain, prosthetics specialist" />
        <link rel="canonical" href="https://dracarlachristoph.com/en/veneers-and-lenses" />
        <link rel="alternate" hrefLang="pt-BR" href="https://dracarlachristoph.com/lentes-de-contato-dental-e-facetas-de-resina" />
        <link rel="alternate" hrefLang="en" href="https://dracarlachristoph.com/en/veneers-and-lenses" />
        <link rel="alternate" hrefLang="x-default" href="https://dracarlachristoph.com/lentes-de-contato-dental-e-facetas-de-resina" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dental Contact Lenses and Composite Veneers in Ipanema | Dr. Carla" />
        <meta property="og:description" content="Ultra-thin dental contact lenses (0.2mm) and composite veneers in Ipanema with Dr. Carla Christoph. 20+ years of experience. Exclusive Smile Test Drive." />
        <meta property="og:url" content="https://dracarlachristoph.com/en/veneers-and-lenses" />
        <meta property="og:image" content="https://dracarlachristoph.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Dr. Carla Christoph - Dentist in Ipanema" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dental Contact Lenses & Composite Veneers | Dr. Carla Christoph" />
        <meta name="twitter:description" content="Ultra-thin dental lenses and composite veneers in Ipanema. Smile Test Drive included. CRO-RJ 27.509." />
        <meta name="twitter:image" content="https://dracarlachristoph.com/og-image.jpg" />
        <meta name="language" content="en" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "MedicalWebPage",
            "name": "Dental Contact Lenses and Composite Veneers in Ipanema",
            "description": "Ultra-thin dental contact lenses and composite veneers with Dr. Carla Christoph, Prosthodontic specialist. 20+ years of experience in Ipanema.",
            "url": "https://dracarlachristoph.com/en/veneers-and-lenses",
            "inLanguage": "en",
            "medicalSpecialty": "Cosmetic Dentistry",
            "author": { "@type": "Dentist", "name": "Dr. Carla Christoph", "qualification": "Prosthodontic Specialist", "experienceYears": 20, "areaServed": { "@type": "City", "name": "Ipanema, Rio de Janeiro" } },
            "offers": { "@type": "Offer", "priceCurrency": "BRL", "availability": "https://schema.org/InStock", "description": "Contact us for personalized pricing" }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "FAQPage", "inLanguage": "en",
            "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } }))
          })}
        </script>
      </Helmet>

      {/* Speakable schema for voice search */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Dental Veneers & Contact Lenses in Ipanema",
        "url": "https://dracarlachristoph.com/en/veneers-and-lenses",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".treatment-hero-title", ".treatment-hero-description", ".quick-answer-box"]
        },
        "inLanguage": "en"
      }) }} />

      <EnPageLayout>
        {/* Hero Section */}
        <TreatmentHero
          locale="en"
          title="Dental Aesthetics That Don't Look Artificial — Smile Test Drive"
          subtitle="Dental Aesthetics with Dr. Carla Christoph"
          description="A provisional simulation right on your teeth before you commit. You see it, feel it, and approve it. Porcelain lenses or composite veneers — each case has its indication. Digital scanning with iTero Element 5D and high-translucency ceramics."
          badges={["20+ years of experience", "Smile Test Drive", "CRO-RJ 27.509"]}
          doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
          breadcrumbs={[
            { label: "Home", href: "/en" },
            { label: "Treatments", href: "/en" },
            { label: "Lenses & Veneers" }
          ]}
        />

        {/* Quick Answer Box */}
        <section className="py-8 bg-white">
          <div className="container-custom">
            <QuickAnswerBox
locale="en"               answer="Dental contact lenses are ultra-thin porcelain shells (0.2–0.5mm) bonded to teeth with minimal preparation, ideal for lasting aesthetic changes. Composite veneers are thicker restorations (0.7–1.5mm) sculpted directly in the office. At Dr. Carla Christoph's practice in Ipanema, we offer the Smile Test Drive (mock-up) so you can preview the result before starting. Lenses last 15–20 years and don't stain; composite veneers last 5–8 years. Treatment takes 2–3 appointments (15–20 days) for lenses and 1–2 appointments for composite veneers."
            />
          </div>
        </section>

        {/* Empathetic Pain Points */}
        <ScrollReveal animation="fade-up">
          <EmpatheticPainPoints
            title="Do you relate to any of these situations?"
            painPoints={[
              {
                icon: <Sparkles className="w-6 h-6 text-dental-purple" />,
                strong: "Unhappy with the color or shape of your teeth",
                description: "making you avoid smiling naturally in photos and conversations?",
                borderColor: "border-dental-purple"
              },
              {
                icon: <AlertCircle className="w-6 h-6 text-dental-gold" />,
                strong: "Misaligned, gapped, or chipped teeth",
                description: "affecting your professional and social confidence?",
                borderColor: "border-dental-gold"
              },
              {
                icon: <Heart className="w-6 h-6 text-dental-purple-soft" />,
                strong: "Fear of an artificial-looking result",
                description: "or excessive filing of your natural teeth?",
                borderColor: "border-dental-purple-soft"
              }
            ]}
            conclusion={<>Well-planned lenses and veneers deliver naturalness and harmony — without exaggeration.<br className="hidden md:block" /> We offer the Smile Test Drive so you can approve everything before starting.</>}
          />
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<Sparkles size={20} />} />

        {/* Why Choose Lenses or Veneers - 3 benefit cards */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Why Choose Lenses or Veneers?
              </h2>
              <p className="text-lg text-dental-gray">Results that go beyond aesthetics</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 - Self-Esteem */}
              <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-lg text-dental-purple">Self-Esteem & Confidence</h3>
                </div>
                <ul className="space-y-2 text-dental-gray text-sm">
                  {["Change how you see yourself and how others see you", "Smile without hesitation in photos and social events", "Regain the confidence to fully express yourself", "Positive impact on personal and professional relationships", "A lasting sense of well-being and satisfaction with your image"].map(t => (
                    <li key={t} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" /><span>{t}</span></li>
                  ))}
                </ul>
              </div>

              {/* Card 2 - Naturalness */}
              <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-dental-purple" />
                  </div>
                  <h3 className="font-semibold text-lg text-dental-purple">Naturalness & Facial Harmony</h3>
                </div>
                <ul className="space-y-2 text-dental-gray text-sm">
                  {["Complete facial analysis for harmony with your unique features", "Individualized proportions respecting your age and personality", "Natural results praised for beauty, not for looking 'done'", "Texture and color that perfectly mimic natural teeth", "Enhancement that highlights your natural beauty"].map(t => (
                    <li key={t} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" /><span>{t}</span></li>
                  ))}
                </ul>
              </div>

              {/* Card 3 - Technology */}
              <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-dental-purple">Technology & Integrated Care</h3>
                </div>
                <ul className="space-y-2 text-dental-gray text-sm">
                  {["iTero Element 5D: comfortable digital impression — no messy molds", "Smile Test Drive: approve BEFORE definitive treatment", "Health always before aesthetics (complete periodontal evaluation)", "Conservative techniques that preserve your natural teeth", "Long-term follow-up for treatment longevity"].map(t => (
                    <li key={t} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" /><span>{t}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Modalities - Lenses vs Composite Veneers (2 cards, mirror of PT) */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Lenses or Veneers: Understand the Differences
              </h2>
              <p className="text-lg text-dental-gray">Every smile is unique. Learn about the options for an informed choice.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Card 1 - Dental Contact Lenses */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="aspect-[4/3] relative">
                  <img src="/Lentes.webp" alt="Ultra-thin ceramic dental contact lenses" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-display font-bold mb-2">Ceramic Dental Contact Lenses</h3>
                    <p className="text-sm text-white/90 mb-4">Ultra-thin ceramic shells (0.2–0.5mm) bonded to the front surface of your teeth. Ideal for those seeking significant aesthetic improvement with maximum preservation of natural tooth structure.</p>
                  </div>
                </div>
                <div className="bg-white p-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="characteristics">
                      <AccordionTrigger className="text-left hover:text-dental-purple"><span className="font-semibold">Key Characteristics</span></AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-dental-gray text-sm">
                          {[["Thickness:", "0.2–0.5mm (ultra-thin)"], ["Material:", "Lithium disilicate or feldspathic ceramic"], ["Preparation:", "Minimal (0.1–0.3mm) when necessary"], ["Durability:", "15–20 years"], ["Aesthetics:", "Superior translucency, natural appearance"], ["Resistance:", "Stain-proof against food and beverages"]].map(([label, val]) => (
                            <li key={label} className="flex items-start gap-2"><span className="text-dental-gold mt-1">▸</span><span><strong>{label}</strong> {val}</span></li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="advantages">
                      <AccordionTrigger className="text-left hover:text-dental-purple"><span className="font-semibold">Advantages & Considerations</span></AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Advantages</h4>
                            <ul className="space-y-2 text-dental-gray text-sm">
                              {["Maximum dental preservation (up to 95%)", "Extremely natural result", "Does not alter sensitivity in most cases", "Permanently stain-resistant", "Biocompatible and allergy-free", "Proven long-term durability"].map(t => (
                                <li key={t} className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span><span>{t}</span></li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-dental-gray mb-2">Considerations</h4>
                            <ul className="space-y-2 text-dental-gray text-sm">
                              {["Higher investment", "Requires 2–3 appointments (15–20 day process)", "Specialized laboratory (fabrication time)", "Does not allow partial repairs"].map(t => (
                                <li key={t} className="flex items-start gap-2"><span className="text-dental-gray mt-1">•</span><span>{t}</span></li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="ideal">
                      <AccordionTrigger className="text-left hover:text-dental-purple"><span className="font-semibold">Ideal For</span></AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-dental-gray text-sm">Those seeking the highest aesthetics and durability, who wish to preserve their natural teeth as much as possible and are willing to invest in a long-lasting ceramic treatment.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* Card 2 - Composite Veneers */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="aspect-[4/3] relative">
                  <img src="/lovable-uploads/Faceta de Resina.webp" alt="Composite veneers being applied directly" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-display font-bold mb-2">Composite Veneers</h3>
                    <p className="text-sm text-white/90 mb-4">Direct restorations handcrafted in the office. An excellent option for those seeking immediate aesthetic improvement at a more accessible investment.</p>
                  </div>
                </div>
                <div className="bg-white p-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="characteristics">
                      <AccordionTrigger className="text-left hover:text-dental-purple"><span className="font-semibold">Key Characteristics</span></AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-dental-gray text-sm">
                          {[["Thickness:", "0.7–1.5mm"], ["Material:", "Nanoparticle composite resin"], ["Preparation:", "Minimal to moderate"], ["Durability:", "5–8 years"], ["Aesthetics:", "Very good, immediate result"], ["Application:", "Directly in-office in 1–2 appointments"]].map(([label, val]) => (
                            <li key={label} className="flex items-start gap-2"><span className="text-dental-gold mt-1">▸</span><span><strong>{label}</strong> {val}</span></li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="advantages">
                      <AccordionTrigger className="text-left hover:text-dental-purple"><span className="font-semibold">Advantages & Considerations</span></AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Advantages</h4>
                            <ul className="space-y-2 text-dental-gray text-sm">
                              {["More accessible investment", "Results in 1–2 appointments (fast process)", "Direct fabrication without a laboratory", "Repairs possible if needed", "Excellent cost-benefit ratio", "Faster results"].map(t => (
                                <li key={t} className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span><span>{t}</span></li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-dental-gray mb-2">Considerations</h4>
                            <ul className="space-y-2 text-dental-gray text-sm">
                              {["Less durable than ceramic", "May stain over time (requires periodic polishing)", "Less resistant to fractures", "Needs more frequent replacement"].map(t => (
                                <li key={t} className="flex items-start gap-2"><span className="text-dental-gray mt-1">•</span><span>{t}</span></li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="ideal">
                      <AccordionTrigger className="text-left hover:text-dental-purple"><span className="font-semibold">Ideal For</span></AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-dental-gray text-sm">Those who want to improve their smile with a smaller investment, less complex cases, immediate results, or as a temporary option while planning a definitive treatment.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<Sparkles className="w-5 h-5" />} />

        {/* Comparison Table */}
        <section className="py-12 pb-8 bg-dental-beige/20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">Detailed Comparison: Lenses vs. Veneers</h2>
              <p className="text-lg text-dental-gray">Side-by-side comparison of each treatment's characteristics</p>
            </div>
            <div className="overflow-x-auto">
              <ComparisonTable data={comparisonData} />
            </div>
            <div className="mt-8 text-center">
              <p className="text-dental-gray italic">The ideal choice depends on your specific case. During your consultation, we'll evaluate in detail and recommend the best option for you.</p>
            </div>
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<Star className="w-5 h-5" />} />

        {/* Doctor Bio */}
        <DoctorBioSection
          locale="en"
          sectionTitle="Your Dentist for Dental Aesthetics"
          doctorName="Dr. Carla Christoph"
          doctorSubtitle="CRO-RJ 27.509 | Prosthodontic Specialist"
          doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
          paragraphs={[
            "With over two decades in Ipanema, Dr. Carla has built her reputation by treating each patient individually, with time and attention. Her background includes 8 years as a military dentist at the Navy's Central Dental Clinic, experience that brought discipline and precision to her clinical practice.",
            "In dental aesthetics, she uses iTero scanning and the Smile Test Drive so patients can visualize the result before beginning. Each lens and each veneer is designed to harmonize with the patient's facial features and personal style."
          ]}
          credentials={[
            { icon: <Award className="w-5 h-5 text-dental-gold" />, title: "Education", description: "Specialist in Prosthodontics and Implantology" },
            { icon: <Star className="w-5 h-5 text-dental-gold" />, title: "Experience", description: "Hundreds of lens and veneer cases completed" },
            { icon: <Sparkles className="w-5 h-5 text-dental-gold" />, title: "Continuing Education", description: "Ongoing training in Smile Design and advanced techniques" },
            { icon: <Shield className="w-5 h-5 text-dental-gold" />, title: "Technology", description: "iTero Element 5D and advanced digital planning" }
          ]}
          quote="My goal isn't to create perfect smiles, but authentic smiles. Each person has a unique beauty that deserves to be enhanced, never standardized."
        />

        {/* Smile Test Drive - Special Highlight */}
        <section className="py-16 bg-gradient-to-br from-dental-purple/5 to-dental-gold/5">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-dental-gold/10 px-4 py-2 rounded-full mb-4">
                <Star className="w-5 h-5 text-dental-gold" />
                <span className="text-dental-gold font-semibold text-sm">KEY DIFFERENTIATOR</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">Smile Test Drive (Mock-up)</h2>
              <p className="text-xl text-dental-gray">See and approve your new smile BEFORE any definitive procedure</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="bg-gradient-to-br from-dental-purple to-dental-purple/90 text-white p-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold mb-2">The Test Drive Experience</h3>
                      <p className="text-white/90">You try on your new smile before any definitive procedure!</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {[
                      { n: "1", t: "Non-Adhesive Provisional Resin", d: "Applied directly over your teeth, with zero filing" },
                      { n: "2", t: "See Yourself in the Mirror", d: "Observe from every angle, in natural and artificial light" },
                      { n: "3", t: "Take Photos & Videos", d: "Record, talk, smile — see how it looks in motion" },
                      { n: "4", t: "Real-Time Adjustments", d: "We refine together until it's perfect for you" }
                    ].map(item => (
                      <div key={item.n} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-dental-gold flex items-center justify-center flex-shrink-0"><span className="font-bold text-white">{item.n}</span></div>
                        <div><h4 className="font-semibold mb-1">{item.t}</h4><p className="text-sm text-white/80">{item.d}</p></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-10 bg-dental-beige/20">
                  <h3 className="font-semibold text-xl text-dental-purple mb-6">Why the Test Drive Is Revolutionary</h3>
                  <div className="space-y-5">
                    {[
                      { t: "Zero Anxiety", d: "You know exactly how it will look before starting" },
                      { t: "Active Participation", d: "You decide together with me — we adjust until you're 100% satisfied" },
                      { t: "Real Result", d: "It's not a digital simulation — it's real, on your teeth, you feel and experience it" },
                      { t: "Total Confidence", d: "We only proceed to the definitive when you're 100% happy" }
                    ].map(item => (
                      <div key={item.t} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-dental-gold mt-1 flex-shrink-0" />
                        <div><strong className="block text-dental-purple">{item.t}</strong><p className="text-dental-gray text-sm">{item.d}</p></div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 bg-gradient-to-br from-dental-gold/10 to-dental-purple/5 p-6 rounded-xl border border-dental-gold/20">
                    <p className="text-dental-gray text-sm italic leading-relaxed">"It's incredible! Seeing exactly what your new smile will look like before doing anything. It's not a computer simulation — it's REAL, on your teeth!"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-8 bg-dental-beige/30">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-xl text-dental-gray mb-6">Want to try your Smile Test Drive?</p>
            <button
              onClick={() => handleWhatsAppClick("Hello! I'd like to schedule a Smile Test Drive consultation.")}
              className="inline-flex items-center justify-center px-8 py-4 bg-dental-gold hover:bg-dental-gold/90 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Book Your First Appointment <ArrowRight size={20} className="ml-2" />
            </button>
          </div>
        </section>

        {/* iTero Digital Technology */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">Digital Technology: iTero Element 5D Scanner</h2>
              <p className="text-lg text-dental-gray">Millimetric precision without discomfort</p>
            </div>
            <div className="bg-gradient-to-br from-dental-beige/30 to-white p-10 rounded-3xl shadow-lg">
              <p className="text-dental-gray leading-relaxed text-center text-lg">We use the iTero Element 5D for precise technical planning: digital scanning without messy impressions, accurate 3D model for the laboratory, digital communication with technicians, and a digital archive of your treatment.</p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {[
                  { t: "Digital Scanning", d: "No messy impressions, no discomfort" },
                  { t: "Precise 3D Model", d: "For the laboratory to work with exactitude" },
                  { t: "Digital Communication", d: "With ceramic-specialized technicians" },
                  { t: "Digital Archive", d: "Of your treatment for future follow-up" }
                ].map(item => (
                  <div key={item.t} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-dental-purple/10 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-dental-purple" /></div>
                    <div><h4 className="font-semibold text-dental-purple mb-1">{item.t}</h4><p className="text-dental-gray text-sm">{item.d}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What Few Explain */}
        <section className="py-20 bg-gradient-to-b from-white via-dental-beige/10 to-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 25px 25px, #381F47 2%, transparent 0%), radial-gradient(circle at 75px 75px, #381F47 2%, transparent 0%)`, backgroundSize: '100px 100px' }}></div>
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-block mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-dental-gold to-transparent"></div>
                  <Sparkles className="w-6 h-6 text-dental-gold" />
                  <div className="w-12 h-px bg-gradient-to-r from-dental-gold via-transparent to-transparent"></div>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-dental-purple mb-6">What Few Explain About Lenses and Veneers</h2>
              <p className="text-lg md:text-xl text-dental-gray max-w-3xl mx-auto leading-relaxed">Dental aesthetics involves more than appearance. Understand the technical aspects that determine the success of your treatment.</p>
            </div>

            {/* Technical Challenges */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-semibold text-dental-purple mb-3">Real Technical Challenges</h3>
                <p className="text-dental-gray">Aspects that require expertise and attention</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { num: "01", title: "Marginal Adaptation", desc: "When the interface between the restoration and the tooth isn't perfect, a microscopic gap forms that can harbor bacteria. Over time, this can lead to gum inflammation and sensitivity.", color: "purple" },
                  { num: "02", title: "Emergence Profile", desc: "The contour at the gum line must respect natural anatomy. An inadequate profile makes hygiene difficult and can cause chronic gum swelling and bleeding.", color: "blue" },
                  { num: "03", title: "Occlusal Balance", desc: "How upper and lower teeth meet is crucial. Poorly planned veneers can generate overload at specific points, causing discomfort and even fractures.", color: "green" },
                  { num: "04", title: "Biocompatibility", desc: "The choice of materials and adhesive techniques directly impacts tissue response. Some protocols can cause prolonged sensitivity or gum irritation.", color: "amber" }
                ].map(item => (
                  <div key={item.num} className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-dental-beige/30 hover:border-dental-gold/30 overflow-hidden">
                    <div className="absolute top-4 right-6 text-8xl font-display font-bold text-dental-purple/5 select-none">{item.num}</div>
                    <div className="relative z-10">
                      <div className="flex items-start gap-5 mb-5">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <Shield className={`w-7 h-7 text-${item.color}-600`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-xl text-dental-purple mb-2 group-hover:text-dental-gold transition-colors">{item.title}</h4>
                          <div className="w-12 h-1 bg-gradient-to-r from-dental-gold to-transparent rounded-full"></div>
                        </div>
                      </div>
                      <p className="text-dental-gray text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Elegant Divider */}
            <div className="flex items-center justify-center my-16">
              <div className="flex items-center gap-4">
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-dental-gold to-dental-gold"></div>
                <div className="relative"><div className="absolute inset-0 bg-dental-gold/20 blur-xl rounded-full animate-pulse"></div><Heart className="w-8 h-8 text-dental-gold relative z-10" /></div>
                <div className="w-32 h-px bg-gradient-to-l from-transparent via-dental-gold to-dental-gold"></div>
              </div>
            </div>

            {/* Our Approach */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-semibold text-dental-purple mb-3">Our Differentiated Approach</h3>
                <p className="text-dental-gray">Four pillars of technical precision</p>
              </div>
              <div className="space-y-5 max-w-4xl mx-auto">
                {[
                  { icon: <Shield className="w-8 h-8 text-dental-purple" />, title: "Prior Periodontal Evaluation", desc: <>Gum health is a prerequisite. We treat any inflammation before starting aesthetic work.</> },
                  { icon: <Award className="w-8 h-8 text-dental-purple" />, title: "Careful Occlusal Planning", desc: "We analyze your bite in detail to ensure balanced distribution of chewing forces." },
                  { icon: <Sparkles className="w-8 h-8 text-dental-purple" />, title: "Conservative Protocol", desc: "Minimal preparations that preserve healthy tooth structure and maintain pulp vitality." },
                  { icon: <Heart className="w-8 h-8 text-dental-purple" />, title: "Longitudinal Follow-Up", desc: "Periodic appointments to monitor gum health, restoration integrity, and occlusal comfort." }
                ].map(item => (
                  <div key={item.title} className="group flex items-start gap-6 bg-white p-7 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-dental-beige/30 hover:border-dental-purple/30 hover:-translate-y-1">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-dental-purple/10 to-dental-purple/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all">{item.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-dental-purple mb-2 group-hover:text-dental-gold transition-colors">{item.title}</h4>
                      <p className="text-dental-gray text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Quote */}
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-br from-dental-beige/40 via-dental-beige/20 to-white p-12 rounded-3xl shadow-lg overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-dental-gold/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-dental-purple/5 rounded-full blur-3xl"></div>
                <div className="absolute top-8 left-8 text-7xl text-dental-gold/20 font-serif leading-none">"</div>
                <div className="absolute bottom-8 right-8 text-7xl text-dental-gold/20 font-serif leading-none">"</div>
                <div className="relative z-10 text-center px-8">
                  <p className="text-2xl md:text-3xl text-dental-purple italic font-display leading-relaxed font-medium">The true beauty of a smile lies in the harmony between aesthetics and function. When we respect biology, the result is lasting and healthy.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<CheckCircle className="w-5 h-5" />} />

        {/* Indications */}
        <section id="indications" className="py-16 md:py-20 bg-dental-beige/10">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-dental-purple mb-4">When Are Lenses and Veneers Indicated?</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-dental-gold to-transparent mx-auto mb-6"></div>
              <p className="text-lg md:text-xl text-dental-gray max-w-3xl mx-auto leading-relaxed">Find out if lenses or veneers are the ideal solution to renew your smile</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Droplet className="w-8 h-8 text-purple-600" />, g: "bg-gradient-to-br from-purple-50 to-purple-100", title: "Stained Teeth", desc: "Stains resistant to whitening, from tetracycline or fluorosis" },
                { icon: <Maximize2 className="w-8 h-8 text-blue-600" />, g: "bg-gradient-to-br from-blue-50 to-blue-100", title: "Gaps Between Teeth", desc: "Diastemas that compromise smile harmony" },
                { icon: <Ruler className="w-8 h-8 text-green-600" />, g: "bg-gradient-to-br from-green-50 to-green-100", title: "Irregular Shape", desc: "Small, worn, or irregularly shaped teeth" },
                { icon: <Palette className="w-8 h-8 text-yellow-600" />, g: "bg-gradient-to-br from-yellow-50 to-yellow-100", title: "Uneven Color", desc: "Darkened teeth or uneven shade" },
                { icon: <AlertCircle className="w-8 h-8 text-red-500" />, g: "bg-gradient-to-br from-red-50 to-red-100", title: "Chips & Fractures", desc: "Small defects that affect aesthetics" },
                { icon: <Sparkles className="w-8 h-8 text-pink-500" />, g: "bg-gradient-to-br from-pink-50 to-pink-100", title: "Smile Renewal", desc: "Desire for a more harmonious and youthful smile" }
              ].map((item, i) => (
                <div key={i} className="group h-full bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-dental-beige/30 hover:border-dental-gold/30 overflow-hidden cursor-pointer">
                  <div className={`w-16 h-16 rounded-2xl ${item.g} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>{item.icon}</div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-dental-purple mb-4 group-hover:text-dental-gold transition-colors">{item.title}</h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-dental-gold to-transparent mb-4"></div>
                  <p className="text-dental-gray text-base leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<Star className="w-5 h-5" />} />

        {/* Process Timeline */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">Your Journey to Your Dream Smile</h2>
              <p className="text-lg text-dental-gray">A transparent, carefully planned process at every step</p>
            </div>
            <ProcessTimeline steps={[
              { number: "1", title: "Complete Evaluation & Digital Planning", description: "Initial consultation with complete facial and photographic analysis. iTero Element 5D: digital impression without messy molds, without discomfort. Oral and periodontal health assessment. Study of ideal proportions for facial harmonization. Personalized treatment plan presentation.", icon: <Search className="w-6 h-6" /> },
              { number: "2", title: "Smile Test Drive (Mock-up)", description: "THE KEY DIFFERENTIATOR! Creation of your new smile with non-adhesive provisional resin. You see, feel, and approve the result BEFORE definitive treatment. Take photos, videos, smile, and speak naturally. We adjust together until we reach the ideal result. An emotional moment of visualizing your new smile live.", icon: <Star className="w-6 h-6" /> },
              { number: "3", title: "Conservative Preparation", description: "With the mock-up 100% approved, we begin preparation. Lenses: minimal preparation preserving maximum tooth structure. Composite veneers: direct sculpting in the office (1–2 appointments). New iTero Element 5D scan for the laboratory (lenses only). Aesthetic provisionals while waiting (if needed).", icon: <Shield className="w-6 h-6" /> },
              { number: "4", title: "Artisan Fabrication", description: "Lenses: specialized laboratory in high-translucency ceramics (7–10 days). Composite veneers: crafted directly by Dr. Carla. Total customization of color, shape, and texture. Rigorous quality control before delivery.", icon: <Sparkles className="w-6 h-6" /> },
              { number: "5", title: "Bonding & Finalization", description: "Final try-in and necessary adjustments. High-precision adhesive bonding (lenses) or finalization (composite veneers). Impeccable polishing and finishing. Care and hygiene instructions. Follow-up appointment scheduling.", icon: <CheckCircle className="w-6 h-6" /> }
            ]} />
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<HelpCircle className="w-5 h-5" />} />

        {/* FAQs */}
        <ServiceFAQ
          faqs={faqs}
          title="Frequently Asked Questions About Lenses and Veneers"
          subtitle="Get all your questions answered"
        />

        <SectionDivider variant="with-icon" icon={<Star className="w-5 h-5" />} />

        {/* Final CTA */}
        <FinalServiceCTA
          locale="en"
          title="Find Out If Lenses Are Right for Your Case"
          description="During your evaluation, we analyze your case with the iTero Element 5D, perform a complete oral health checkup, and present the possibilities — lenses, veneers, or other treatments best suited to your needs."
          whatsappMessage="Hello! I saw the page about Lenses and Veneers and would like to book an evaluation."
        />
        <InternalLinkingOptimizer currentPage="en-veneers-and-lenses" />
        <StatsBar locale="en" />
      </EnPageLayout>
    </>
  );
};

export default EnVeneersAndLensesPage;
