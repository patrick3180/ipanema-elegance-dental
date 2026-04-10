import React from "react";
import EnPageLayout from "@/components/en/EnPageLayout";
import SEOHead from "@/components/SEOHead";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import StatsBar from "@/components/treatment/StatsBar";
import SectionDivider from "@/components/treatment/SectionDivider";
import ProcessTimeline from "@/components/treatment/ProcessTimeline";
import DoctorBioSection from "@/components/treatment/DoctorBioSection";
import EmpatheticPainPoints from "@/components/treatment/EmpatheticPainPoints";
import ServiceFAQ from "@/components/treatment/ServiceFAQ";
import FinalServiceCTA from "@/components/treatment/FinalServiceCTA";
import ScrollReveal from "@/components/ScrollReveal";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Shield, ShieldCheck, CheckCircle, Sparkles, Heart, Search,
  HelpCircle, ArrowRight, Clock, Calendar, Scan, AlertCircle
} from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import { InternalLinkingOptimizer } from "@/components/seo/InternalLinkingOptimizer";

const EnGeneralDentistryPage = () => {
  const handleWhatsAppClick = async (customMessage?: string) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'WhatsApp EN General Dentistry',
        page_type: 'service_page'
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
    const message = customMessage || "Hello! I'd like to book a dental checkup.";
    window.open(
      `https://wa.me/5521993304045?text=${encodeURIComponent(message)}`,
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

  const faqs = [
    {
      question: "What does a dental checkup include?",
      answer: "A comprehensive exam including clinical inspection, digital 3D scan with the iTero Element 5D, risk assessment for cavities and gum disease, professional cleaning (scaling and polishing), and personalized oral hygiene guidance."
    },
    {
      question: "How often should I schedule a checkup?",
      answer: "For most adults, every 6 months is recommended. Patients with a history of gum disease or higher cavity risk may benefit from visits every 3-4 months. We'll recommend the right schedule for your needs."
    },
    {
      question: "Is professional teeth whitening safe?",
      answer: "When performed by a dental professional, teeth whitening is safe. We use pH-balanced gels with remineralizing agents that protect enamel integrity. In-office treatment can lighten teeth by 4-9 shades."
    },
    {
      question: "Does dental cleaning hurt?",
      answer: "Ultrasonic cleaning is very comfortable — most patients describe only a mild vibration. For very sensitive areas, we can apply topical numbing gel."
    },
    {
      question: "Do you accept dental insurance?",
      answer: "We are a private practice. This allows us to dedicate proper time to each patient and use only high-quality materials. We provide clear, detailed cost estimates before any treatment begins."
    },
    {
      question: "What should I bring to my first appointment?",
      answer: "Bring any recent dental X-rays or records you may have, a list of medications you're currently taking, and your dental insurance card if applicable. If you don't have any of these, no worries — we'll gather everything we need during your visit."
    },
    {
      question: "How long does a checkup appointment take?",
      answer: "We dedicate a minimum of 1 hour for every checkup appointment. This ensures enough time for a thorough examination, unhurried cleaning, and proper discussion of findings and any treatment options."
    }
  ];

  const processSteps = [
    {
      title: "3D Digital Scan",
      description: "We begin with a complete intraoral scan using the iTero Element 5D — capturing detailed 3D images of your teeth, gums, and bite alignment without radiation or discomfort.",
      icon: <Scan className="w-5 h-5" />
    },
    {
      title: "Clinical Examination",
      description: "Dr. Carla performs a thorough clinical inspection of each tooth, checking for cavities, cracks, gum recession, and early signs of oral conditions.",
      icon: <Search className="w-5 h-5" />
    },
    {
      title: "Professional Cleaning",
      description: "Ultrasonic scaling removes tartar and plaque buildup — especially in areas brushing and flossing can't reach — followed by polishing for a smooth, clean finish.",
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      title: "Risk Assessment & Plan",
      description: "Based on the findings, we create a personalized prevention plan with the recommended schedule for your next visit and any specific care instructions.",
      icon: <Shield className="w-5 h-5" />
    }
  ];

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
      {/* Speakable schema for voice search */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "General Dentistry & Prevention in Ipanema",
        "url": "https://dracarlachristoph.com/en/general-dentistry",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".heading-lg", ".heading-md", ".quick-answer-box"]
        },
        "inLanguage": "en"
      }) }} />
      <EnPageLayout>
        <TreatmentHero
          badge="CRO-RJ 27.509"
          title="General Dentistry & Preventive Care"
          subtitle="A routine checkup costs a fraction of what advanced treatments require. Our preventive approach identifies issues while they're still reversible — dedicating a minimum of 1 full hour to every appointment."
          ctaText="Book Your Checkup"
          locale="en"
          onCTAClick={() => handleWhatsAppClick("Hello! I'd like to book a dental checkup with Dr. Carla Christoph.")}
        />

        {/* Quick Answer Box */}
        <ScrollReveal>
          <section className="section-spacing bg-white">
            <div className="container-custom max-w-4xl">
              <QuickAnswerBox
                question="What does a general dental checkup include?"
                answer="A comprehensive exam with the iTero Element 5D digital scanner, clinical inspection, professional cleaning (scaling and polishing), risk assessment, and a personalized prevention plan. Every appointment starts with at least 1 full hour of dedicated attention."
                source="Based on clinical protocols used at Dra. Carla Christoph's office in Ipanema."
                locale="en"
              />
            </div>
          </section>
        </ScrollReveal>

        <SectionDivider />

        {/* Empathetic Pain Points */}
        <EmpatheticPainPoints
          locale="en"
          title="Why Patients Delay Checkups"
          subtitle="We understand — and we've designed our approach to address every concern."
          painPoints={[
            {
              icon: <Clock className="w-6 h-6" />,
              title: "\"I just don't have time\"",
              description: "We respect your schedule. Appointments are punctual, efficient, and typically completed within 1 hour — including cleaning and exam."
            },
            {
              icon: <AlertCircle className="w-6 h-6" />,
              title: "\"Nothing hurts, so I must be fine\"",
              description: "Most dental problems are painless in the early stages. Cavities, gum disease, and even cracks can develop silently. A checkup catches them before they become costly problems."
            },
            {
              icon: <Heart className="w-6 h-6" />,
              title: "\"I had a bad experience before\"",
              description: "We hear this often. That's why we prioritize a calm, unhurried environment. Dr. Carla explains every step before proceeding, and there's never any pressure."
            }
          ]}
        />

        <SectionDivider />

        {/* Services Offered */}
        <ScrollReveal>
          <section className="section-spacing bg-white/50">
            <div className="container-custom max-w-4xl">
              <h2 className="heading-md mb-3 text-center">What We Offer</h2>
              <p className="text-dental-gray text-center mb-10 max-w-2xl mx-auto">
                From routine exams to restorative care — all under one roof, with the same attention to detail.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    icon: <Scan size={22} className="text-dental-gold" />,
                    title: "Comprehensive Dental Exam",
                    desc: "Thorough clinical examination, 3D digital scan with iTero Element 5D, and personalized risk assessment."
                  },
                  {
                    icon: <Sparkles size={22} className="text-dental-gold" />,
                    title: "Professional Dental Cleaning",
                    desc: "Ultrasonic scaling to remove tartar and plaque buildup, followed by polishing for a clean, fresh feel."
                  },
                  {
                    icon: <CheckCircle size={22} className="text-dental-gold" />,
                    title: "Dental Fillings & Restorations",
                    desc: "Tooth-colored composite restorations for cavities, chips, or cracks — virtually invisible and durable."
                  },
                  {
                    icon: <Shield size={22} className="text-dental-gold" />,
                    title: "Preventive Treatment Plans",
                    desc: "Individual risk assessment and customized prevention schedules — typically every 6 months for low-risk patients."
                  },
                  {
                    icon: <Calendar size={22} className="text-dental-gold" />,
                    title: "Pediatric Dental Care",
                    desc: "Gentle, age-appropriate dental care for children — building healthy habits and positive associations from an early age."
                  },
                  {
                    icon: <HelpCircle size={22} className="text-dental-gold" />,
                    title: "Oral Health Assessment",
                    desc: "Comprehensive screening for gum disease, oral lesions, TMJ issues, and bruxism. Early detection is the foundation of effective treatment."
                  }
                ].map((service) => (
                  <div key={service.title} className="flex gap-4 items-start bg-white rounded-xl p-6 shadow-soft border border-dental-beige/30">
                    <div className="flex-shrink-0 mt-1">{service.icon}</div>
                    <div>
                      <h3 className="font-display text-dental-purple mb-1">{service.title}</h3>
                      <p className="text-dental-gray text-sm leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <SectionDivider />

        {/* Why Prevention Matters — Expanded */}
        <ScrollReveal>
          <section className="section-spacing">
            <div className="container-custom max-w-4xl">
              <div className="bg-dental-purple/5 rounded-2xl p-8 md:p-10 border border-dental-gold/20">
                <div className="flex items-start gap-4">
                  <ShieldCheck size={32} className="text-dental-gold flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-display text-dental-purple mb-3">Prevention Is Always Better</h2>
                    <p className="text-dental-gray leading-relaxed mb-4">
                      A routine checkup costs a fraction of what advanced treatments like implants or root canals require. More importantly, early detection means less discomfort, fewer procedures, and better long-term outcomes.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 bg-white rounded-xl">
                        <span className="text-2xl font-bold text-dental-purple block">90%</span>
                        <span className="text-xs text-dental-gray">of oral diseases are preventable with regular care</span>
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl">
                        <span className="text-2xl font-bold text-dental-purple block">1h</span>
                        <span className="text-xs text-dental-gray">minimum dedicated to every checkup</span>
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl">
                        <span className="text-2xl font-bold text-dental-purple block">6 mo</span>
                        <span className="text-xs text-dental-gray">recommended interval for routine visits</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <SectionDivider />

        {/* Process Timeline */}
        <ProcessTimeline
          locale="en"
          title="What to Expect at Your Appointment"
          subtitle="A clear, structured approach — no surprises."
          steps={processSteps}
        />

        <SectionDivider />

        {/* Technology Callout */}
        <ScrollReveal>
          <section className="section-spacing bg-white">
            <div className="container-custom max-w-4xl">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h2 className="heading-md mb-4">Digital Precision with iTero Element 5D</h2>
                  <p className="text-dental-gray leading-relaxed mb-4">
                    Our 3D intraoral scanner replaces traditional impressions with a fast, comfortable digital scan. It captures thousands of data points to create a precise model of your teeth and gums — enabling better diagnoses and more accurate treatment planning.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "No radiation — safe optical technology",
                      "Instant visualization of bite alignment",
                      "Early detection of interproximal cavities",
                      "Time-lapse comparison between visits"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-dental-gray">
                        <CheckCircle size={16} className="text-dental-gold flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-shrink-0 w-full md:w-72 h-48 bg-dental-purple/5 rounded-2xl flex items-center justify-center border border-dental-gold/20">
                  <div className="text-center">
                    <Scan size={48} className="text-dental-purple/40 mx-auto mb-2" />
                    <span className="text-sm text-dental-gray">iTero Element 5D</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <SectionDivider />

        {/* Doctor Bio */}
        <DoctorBioSection
          locale="en"
          sectionTitle="Your Dentist in Ipanema"
          paragraphs={[
            "Dr. Carla Christoph graduated from the Federal University of Rio de Janeiro (UFRJ) and has dedicated over 20 years to dentistry — with specializations in prosthodontics and implant dentistry.",
            "Her approach to general dentistry is rooted in prevention: every appointment is an opportunity to detect early signs of decay, gum disease, or functional issues before they become costly problems.",
            "Patients benefit from unhurried consultations (minimum 1 hour), digital diagnostics with iTero Element 5D, and a care plan that integrates every aspect of oral health."
          ]}
          credentials={[
            { title: "UFRJ Graduate", description: "Federal University of Rio de Janeiro" },
            { title: "Prosthodontics Specialist", description: "Advanced oral rehabilitation" },
            { title: "20+ Years", description: "Clinical experience in Ipanema" },
            { title: "Digital Diagnostics", description: "iTero Element 5D scanning" }
          ]}
          quote="Prevention is the most intelligent investment in oral health. A routine visit today can save years of complex treatment."
        />

        <SectionDivider />

        {/* FAQ */}
        <ServiceFAQ
          locale="en"
          title="Frequently Asked Questions"
          faqs={faqs}
        />

        <SectionDivider />

        {/* Final CTA */}
        <FinalServiceCTA
          locale="en"
          title="Due for a Checkup?"
          description="Book your dental exam and cleaning. We'll take the time to explain everything we find and plan the best care for your needs."
          ctaText="Book on WhatsApp"
          phoneNumber="(21) 99330-4045"
          businessHours="Monday to Friday, 9AM to 7PM"
          whatsappMessage="Hello! I'd like to book a dental checkup with Dr. Carla Christoph."
          onClickOverride={() => handleWhatsAppClick("Hello! I'd like to book a dental checkup with Dr. Carla Christoph.")}
        />

        <InternalLinkingOptimizer currentPage="en-general-dentistry" />
        <StatsBar locale="en" />
      </EnPageLayout>
    </>
  );
};

export default EnGeneralDentistryPage;
