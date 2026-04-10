import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import EnPageLayout from "@/components/en/EnPageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import StatsBar from "@/components/treatment/StatsBar";
import SectionDivider from "@/components/treatment/SectionDivider";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Scan, Star, ArrowRight, Sparkles, Shield, Heart, Award, AlertCircle, Calendar, CheckCircle, Package, Zap, PlayCircle, Clock, HelpCircle, Utensils, Smile } from "lucide-react";
import ProcessTimeline from '@/components/treatment/ProcessTimeline';
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from '@/components/ScrollReveal';
import DoctorBioSection from '@/components/treatment/DoctorBioSection';
import ServiceFAQ from '@/components/treatment/ServiceFAQ';
import FinalServiceCTA from '@/components/treatment/FinalServiceCTA';
import EmpatheticPainPoints from '@/components/treatment/EmpatheticPainPoints';
import { sendGCLIDToWebhook } from "@/utils/gclid";

const EnDentalProstheticsPage = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const hasVideo = false;
  const videoUrl = "";

  const handleWhatsAppClick = async (message?: string) => {
    const gclid = new URLSearchParams(window.location.search).get('gclid');
    if (gclid) localStorage.setItem('gclid', gclid);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', { 'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9', 'value': 1.0, 'currency': 'BRL' });
    }
    await sendGCLIDToWebhook('en_dental_prosthetics');
    const defaultMessage = "Hello! I'd like to schedule a dental prosthetics evaluation with Dr. Carla Christoph.";
    window.open(`https://wa.me/5521993304045?text=${encodeURIComponent(message || defaultMessage)}`, "_blank");
  };

  const faqs = [
    {
      question: "Which type of prosthesis is best for my case?",
      answer: "Every case is unique and requires an individualized evaluation. The choice depends on factors such as the number of missing teeth, bone condition, gum health, aesthetic expectations, and lifestyle. During the planning consultation, we analyze all these aspects to recommend the ideal solution for you."
    },
    {
      question: "How long does a well-made prosthesis last?",
      answer: "With quality materials and proper care, a crown or bridge can last 15 to 20 years. Implant-supported prostheses tend to last even longer, potentially exceeding 20 years. Longevity depends on oral hygiene, regular dental visits, and daily care."
    },
    {
      question: "Is an implant-supported prosthesis worth the investment?",
      answer: "For many patients, yes. Implant-supported prostheses offer unique advantages: total bone preservation, no wear on adjacent teeth, greater durability, and a natural feel. Considering the longevity and quality of life they provide, they represent excellent long-term value."
    },
    {
      question: "How do I maintain my prosthesis?",
      answer: "Fixed prostheses (crowns, bridges, implant-supported) are cleaned like natural teeth, with brushing and flossing. Removable prostheses should be taken out for cleaning with specific products. Semi-annual dental visits are essential for professional maintenance and adjustments when needed."
    },
    {
      question: "Will I be without teeth during treatment?",
      answer: "Never! We always provide a temporary prosthesis so you maintain aesthetics and function throughout the entire treatment. Our commitment is to your comfort and social life. You will not spend a single moment without teeth."
    },
    {
      question: "Can a prosthesis look natural?",
      answer: "Absolutely! We use techniques such as ceramic layering, individualized characterization, and personalized shade matching. The result is teeth that perfectly mimic nature, with translucency, texture, and appearance indistinguishable from natural teeth."
    },
    {
      question: "What's the difference between porcelain and composite?",
      answer: "Porcelain (ceramic) offers superior aesthetics, durability, and stain resistance. It's our choice for long-lasting cases. Composite can be used for temporaries or specific situations. We use top-tier materials to ensure durability and a natural result."
    },
    {
      question: "Is it possible to get a prosthesis with little bone?",
      answer: "Yes! For conventional prostheses (not implant-supported), bone quantity is not a limiting factor. For implant-supported prostheses, techniques like bone grafting or zygomatic implants can make treatment possible even with limited bone. A CT scan evaluation determines the possibilities."
    },
    {
      question: "When should I replace an old prosthesis?",
      answer: "Signs it's time to replace: visible wear, color change, infiltrations, poor fit, discomfort while chewing, or gum problems around the prosthesis. A professional evaluation can determine the ideal time for replacement."
    },
    {
      question: "Is the procedure painful?",
      answer: "Procedures are performed with effective local anesthesia and techniques that prioritize comfort. Most patients report less discomfort than expected. We provide appropriate medication and close follow-up when needed."
    },
    {
      question: "What's the advantage of seeing a specialist?",
      answer: "A specialist has 2–3 years of specific training in prosthetics, masters advanced techniques, works with the best laboratories, and has experience with complex cases. This translates to prostheses with better fit, superior aesthetics, and greater durability."
    },
    {
      question: "Fixed or removable prosthesis: how to choose?",
      answer: "Fixed prostheses offer greater comfort, security, and a natural feel, but require specific conditions (healthy supporting teeth or the possibility of implants). Removable prostheses are an option when there's no support for a fixed one. We evaluate all factors to recommend the best solution."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dental Prosthetics & Oral Rehabilitation in Ipanema | Dr. Carla Christoph</title>
        <meta name="description" content="Dental prosthetics in Ipanema with a prosthodontic specialist. Crowns, bridges, and implant-supported prostheses. Complete oral rehabilitation with 20+ years of experience." />
        <link rel="canonical" href="https://dracarlachristoph.com/en/dental-prosthetics" />
        <link rel="alternate" hrefLang="pt-BR" href="https://dracarlachristoph.com/protese-dentaria" />
        <link rel="alternate" hrefLang="en" href="https://dracarlachristoph.com/en/dental-prosthetics" />
        <link rel="alternate" hrefLang="x-default" href="https://dracarlachristoph.com/protese-dentaria" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dental Prosthetics & Oral Rehabilitation in Ipanema | Dr. Carla Christoph" />
        <meta property="og:description" content="Dental prosthetics in Ipanema with a prosthodontic specialist. Crowns, bridges, and implant-supported prostheses. Complete oral rehabilitation with 20+ years of experience." />
        <meta property="og:url" content="https://dracarlachristoph.com/en/dental-prosthetics" />
        <meta property="og:image" content="https://dracarlachristoph.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Dr. Carla Christoph - Dentist in Ipanema" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dental Prosthetics & Oral Rehabilitation | Dr. Carla Christoph" />
        <meta name="twitter:description" content="Dental prosthetics in Ipanema. Crowns, bridges, and implant-supported prostheses. CRO-RJ 27.509." />
        <meta name="twitter:image" content="https://dracarlachristoph.com/og-image.jpg" />
        <meta name="language" content="en" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "MedicalProcedure",
            "name": "Dental Prosthetics", "description": "Oral rehabilitation with fixed and removable dental prostheses",
            "procedureType": "Dental", "inLanguage": "en",
            "provider": { "@type": "Dentist", "name": "Dr. Carla Christoph", "telephone": "+5521993304045",
              "address": { "@type": "PostalAddress", "streetAddress": "Rua Visconde de Pirajá, 550 - Suite 1107", "addressLocality": "Ipanema", "addressRegion": "RJ", "postalCode": "22410-002", "addressCountry": "BR" }
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "FAQPage", "inLanguage": "en",
            "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } }))
          })}
        </script>
      </Helmet>

      <EnPageLayout>
        {/* Hero Section */}
        <TreatmentHero
          locale="en"
          title="Dental Prosthetics & Oral Rehabilitation"
          subtitle="Specialty of Dr. Carla Christoph"
          description="Complete smile reconstruction with individualized planning and E-max and zirconia ceramics. Specialist with over 20 years of experience in complex cases."
          badges={["20+ years of experience", "CRO-RJ 27.509", "Complex Cases"]}
          doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
          breadcrumbs={[
            { label: "Home", href: "/en" },
            { label: "Treatments", href: "/en" },
            { label: "Dental Prosthetics" }
          ]}
        />

        {/* Quick Answer Box */}
        <section className="py-8 bg-white">
          <div className="container-custom">
            <QuickAnswerBox
              answer="A dental prosthesis is an artificial structure that replaces missing teeth, restoring chewing function and aesthetics. At Dr. Carla Christoph's practice in Ipanema, we offer crowns, bridges, and implant-supported prostheses in high-translucency porcelain. With over 20 years of experience (CRO-RJ 27.509) in oral rehabilitation, we work with E-max and zirconia ceramics that last 15 to 20 years. Treatment varies by complexity, including planning, digital impressions, and temporary prostheses so you never go without teeth."
            />
          </div>
        </section>

        {/* Empathetic Pain Points */}
        <ScrollReveal animation="fade-up">
          <EmpatheticPainPoints
            title="Do you relate to any of these situations?"
            painPoints={[
              {
                icon: <Shield className="w-6 h-6 text-dental-purple" />,
                strong: "A prosthesis that comes loose when speaking or eating",
                description: "causing insecurity in social and professional moments?",
                borderColor: "border-dental-purple"
              },
              {
                icon: <AlertCircle className="w-6 h-6 text-dental-gold" />,
                strong: "Difficulty chewing foods you enjoy",
                description: "because of missing teeth or an uncomfortable prosthesis?",
                borderColor: "border-dental-gold"
              },
              {
                icon: <Heart className="w-6 h-6 text-dental-purple-soft" />,
                strong: "Embarrassment about smiling due to missing teeth",
                description: "or a prosthesis that doesn't look natural?",
                borderColor: "border-dental-purple-soft"
              }
            ]}
            conclusion={<>A well-planned prosthesis restores function, aesthetics, and quality of life.<br className="hidden md:block" /> Let's evaluate the best solution for your case.</>}
            callout={{
              icon: <Clock className="w-5 h-5 text-dental-gold" />,
              title: "Important",
              text: "Missing teeth cause neighboring teeth to shift and progressive bone loss. The sooner you begin rehabilitation, the simpler and more predictable the treatment will be."
            }}
          />
        </ScrollReveal>

        {/* Mid CTA */}
        <section className="py-8 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-xl text-dental-gray mb-6">
              Want to know which prosthesis fits your case?
            </p>
            <button
              onClick={() => handleWhatsAppClick('Hello! I saw the dental prosthetics page and would like to know which type of prosthesis is recommended for my case.')}
              className="inline-flex items-center justify-center px-8 py-4 bg-dental-gold hover:bg-dental-gold/90 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Book Your Evaluation
              <ArrowRight size={20} className="ml-2" />
            </button>
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<Award size={20} />} />

        {/* 3 Visual Cards */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-4 text-center text-dental-purple">
              Complete Oral Rehabilitation
            </h2>
            <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">
              Over 20 years restoring function, aesthetics, and quality of life
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-dental-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="w-8 h-8 text-dental-purple" />
                </div>
                <h3 className="text-xl font-semibold text-dental-purple mb-3">Chewing Function</h3>
                <p className="text-dental-gray">Rediscover the pleasure of enjoying your favorite foods with comfort and confidence</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-dental-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smile className="w-8 h-8 text-dental-gold" />
                </div>
                <h3 className="text-xl font-semibold text-dental-purple mb-3">Natural Aesthetics</h3>
                <p className="text-dental-gray">Prostheses that perfectly mimic the color, shape, and translucency of natural teeth</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-dental-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-dental-purple" />
                </div>
                <h3 className="text-xl font-semibold text-dental-purple mb-3">Quality of Life</h3>
                <p className="text-dental-gray">Regain your confidence and self-esteem to smile without hesitation</p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<Sparkles size={20} />} />

        {/* Prosthesis Modalities - 6 cards */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-navy mb-4">Available Dental Prosthesis Options</h2>
              <p className="text-lg text-dental-text-secondary">State-of-the-art technologies and materials for every need</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Dental Crowns */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer">
                <div className="aspect-[4/3] relative">
                  <img src="/lovable-uploads/Coroa e-max.webp" alt="E-max ceramic dental crown on tooth" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-display font-semibold text-white mb-2">Dental Crowns</h3>
                  <p className="text-white/90 text-sm mb-4 line-clamp-3">Protective caps in pure ceramic or zirconia that cover and protect damaged teeth, restoring impeccable form, function, and aesthetics.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">Ceramic</span>
                    <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">Natural Result</span>
                  </div>
                </div>
              </div>

              {/* Fixed Bridges */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer">
                <div className="aspect-[4/3] relative">
                  <img src="/lovable-uploads/Ponte fixa.webp" alt="Fixed porcelain bridge replacing teeth" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-display font-semibold text-white mb-2">Fixed Bridges</h3>
                  <p className="text-white/90 text-sm mb-4 line-clamp-3">Fixed prosthesis that replaces one or more missing teeth, anchored to neighboring teeth or implants, restoring function and aesthetics.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">Fixed Solution</span>
                    <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">Multiple Teeth</span>
                  </div>
                </div>
              </div>

              {/* Implant-Supported Prosthesis */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer">
                <div className="absolute top-4 right-4 bg-dental-gold text-white text-xs font-semibold px-3 py-1 rounded-full z-10"></div>
                <div className="aspect-[4/3] relative">
                  <img src="/Implante.webp" alt="Implant-supported dental prosthesis" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-display font-semibold text-white mb-2">Implant-Supported Prosthesis</h3>
                  <p className="text-white/90 text-sm mb-4 line-clamp-3">The ideal combination of stability and naturalness. Prosthesis fixed to dental implants for maximum comfort and durability.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">Natural Look</span>
                    <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">Maximum Stability</span>
                  </div>
                </div>
              </div>

              {/* Removable Prostheses */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer">
                <div className="aspect-[4/3] relative">
                  <img src="/lovable-uploads/Prótese parcial removível moderna.webp" alt="Modern removable partial prosthesis" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-display font-semibold text-white mb-2">Removable Prostheses</h3>
                  <p className="text-white/90 text-sm mb-4 line-clamp-3">Modern partial (RPD) or complete (dentures) prostheses, with improved fit and superior aesthetics.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">Affordable Solution</span>
                    <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">Easy Hygiene</span>
                  </div>
                </div>
              </div>

              {/* All-on-4/6 Protocol */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer border-2 border-dental-gold/30">
                <div className="aspect-[4/3] relative">
                  <img src="/lovable-uploads/all in 4.webp" alt="All-on-4 protocol full arch on implants" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-display font-semibold text-white mb-2">All-on-4/6 Protocol</h3>
                  <p className="text-white/90 text-sm mb-4 line-clamp-3">Full arch rehabilitation on 4 or 6 implants, with a fixed prosthesis for complete arch restoration.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">Complete Rehabilitation</span>
                    <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">Fixed Prosthesis</span>
                  </div>
                </div>
              </div>

              {/* Overdenture */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer">
                <div className="aspect-[4/3] relative">
                  <img src="/lovable-uploads/Overdenture com clips de retenção.webp" alt="Overdenture stabilized by implants with clips" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-display font-semibold text-white mb-2">Overdenture Prosthesis</h3>
                  <p className="text-white/90 text-sm mb-4 line-clamp-3">Removable prosthesis stabilized by implants, combining the convenience of removal with firmness and comfort while chewing.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">Stability</span>
                    <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">Removable</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-12 bg-dental-beige/20">
          <div className="container-custom">
            <h2 className="heading-lg mb-4 text-center text-dental-purple">
              Your Journey to a New Smile
            </h2>
            <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">
              Each step is carefully planned to ensure comfort, precision, and natural, predictable results
            </p>

            <ProcessTimeline
              steps={[
                { number: 1, title: "Complete Diagnostic Consultation", description: "Facial analysis, clinical exam, digital X-rays, and iTero Element 5D scanning for precise diagnosis and personalized planning.", icon: <Search size={24} />, duration: "1st Visit" },
                { number: 2, title: "Minimally Invasive Preparation", description: "When necessary, we prepare teeth with maximum preservation of healthy structure, always prioritizing conservative techniques.", icon: <Shield size={24} />, duration: "1st Visit" },
                { number: 3, title: "Precision Digital Impression", description: "iTero Element 5D eliminates the discomfort of traditional molds, ensuring millimetric precision. The 3D file is sent directly to our partner laboratory.", icon: <Scan size={24} />, duration: "1st Visit" },
                { number: 4, title: "Temporary Prosthesis Fabrication & Placement", description: "Fabrication and placement of a temporary tooth to ensure aesthetics and function until the definitive prosthesis is placed.", icon: <Package size={24} />, duration: "1st Visit" },
                { number: 5, title: "Artisan Fabrication", description: "Our partner laboratory creates your prosthesis with E-max and zirconia ceramics, layering colors and textures for a result indistinguishable from natural teeth.", icon: <Sparkles size={24} />, duration: "1–2 weeks" },
                { number: 6, title: "Installation & Final Adjustment", description: "Cementation or fixation of the prosthesis with meticulous occlusion adjustments. You leave with your new smile and all care instructions.", icon: <Star size={24} />, duration: "1 Visit" },
                { number: 7, title: "Ongoing Follow-Up", description: "Maintenance appointments to protect your investment and ensure the health of your smile for many years.", icon: <Heart size={24} />, duration: "Periodic" }
              ]}
            />
          </div>
        </section>

        {/* Complex Cases */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Solutions for Complex Cases
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-dental-purple">Complete Oral Rehabilitation</h3>
                  <p className="text-dental-gray mb-4">For cases of multiple tooth loss, severe wear, or bite problems, we develop a comprehensive protocol that restores function, aesthetics, and vertical dimension, with natural facial rejuvenation.</p>
                  <ul className="space-y-2 text-sm text-dental-gray">
                    {["Complete occlusal analysis", "Bite restoration", "Facial rejuvenation"].map(t => (
                      <li key={t} className="flex items-start gap-2"><ArrowRight className="text-dental-gold mt-0.5" size={16} /><span>{t}</span></li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-dental-purple">High-Performance Aesthetic Prostheses</h3>
                  <p className="text-dental-gray mb-4">We use state-of-the-art ceramics (E-max, Zirconia) with artisan layering, reproducing the translucency, texture, and individual characterization of natural teeth.</p>
                  <ul className="space-y-2 text-sm text-dental-gray">
                    {["E-max and zirconia ceramics", "Artisan layering", "Indistinguishable result"].map(t => (
                      <li key={t} className="flex items-start gap-2"><ArrowRight className="text-dental-gold mt-0.5" size={16} /><span>{t}</span></li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Doctor Bio */}
        <ScrollReveal animation="fade-up">
          <DoctorBioSection
            locale="en"
            sectionTitle="Expertise & Experience in Oral Rehabilitation"
            badgeText="20+ Years of Experience"
            paragraphs={[
              "With over two decades in Ipanema, Dr. Carla has built her reputation by treating each patient individually, with time and attention. Her background includes 8 years as a military dentist at the Navy's Central Dental Clinic, experience that brought discipline and precision to her clinical practice.",
              "As a Prosthodontic specialist, oral rehabilitation is where her training runs deepest. Complex cases are her routine — from a single crown to complete rehabilitation, every solution is planned based on detailed diagnosis and digital planning."
            ]}
            credentials={[
              { title: "Education", description: "Specialist in Prosthodontics and Implantology" },
              { title: "Experience", description: "8 years as a military dentist in the Navy" },
              { title: "Continuing Education", description: "Ongoing courses in DSD and iTero Element 5D" },
              { title: "Technology", description: "iTero Element 5D and digital planning" }
            ]}
          />
        </ScrollReveal>

        {/* Video Section - Conditional */}
        {hasVideo && (
          <section className="py-16 bg-white">
            <div className="container-custom">
              <SectionDivider variant="with-icon" icon={<PlayCircle size={20} />} />
              <h2 className="heading-lg mb-4 text-center text-dental-purple">Meet Dr. Carla Christoph</h2>
              <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">Watch and understand how we approach complex oral rehabilitation cases</p>
              <div className="max-w-4xl mx-auto">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-elegant">
                  {videoUrl ? (
                    <iframe src={videoUrl} title="Dr. Carla Christoph video about Dental Prosthetics" className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  ) : (
                    <div className="w-full h-full bg-gradient-purple-soft flex items-center justify-center">
                      <div className="text-center"><PlayCircle className="w-20 h-20 text-dental-gold mx-auto mb-4" /><p className="text-dental-purple font-semibold">Video coming soon</p></div>
                    </div>
                  )}
                </div>
                <div className="mt-6 bg-dental-beige/20 p-6 rounded-xl">
                  <p className="text-dental-gray"><strong className="text-dental-purple">In this video:</strong> Dr. Carla explains her approach to oral rehabilitation cases, shows the office and equipment used, and shares her work philosophy.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        <SectionDivider variant="with-icon" icon={<HelpCircle size={20} />} />

        {/* FAQs */}
        <ScrollReveal animation="fade-up">
          <ServiceFAQ
            title="Frequently Asked Questions About Dental Prosthetics"
            faqs={faqs}
          />
        </ScrollReveal>

        {/* Final CTA */}
        <FinalServiceCTA
          locale="en"
          title="Restore Function & Aesthetics with Dental Prosthetics"
          description="During your planning consultation, we analyze your case and determine the most suitable prosthesis type — fixed, removable, or implant-supported. Dental prosthetics restore complete chewing function and can significantly improve your quality of life."
          ctaText="Book Your Evaluation via WhatsApp"
          whatsappMessage="Hello! I saw the dental prosthetics page and would like to book an evaluation with Dr. Carla Christoph."
          onClickOverride={() => handleWhatsAppClick('Hello! I saw the dental prosthetics page and would like to book an evaluation with Dr. Carla Christoph.')}
        />
        <StatsBar locale="en" />
      </EnPageLayout>
    </>
  );
};

export default EnDentalProstheticsPage;
