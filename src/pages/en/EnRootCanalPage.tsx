import React from "react";
import { Helmet } from "react-helmet-async";
import EnPageLayout from "@/components/en/EnPageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import StatsBar from "@/components/treatment/StatsBar";
import SectionDivider from "@/components/treatment/SectionDivider";
import ProcessTimeline from "@/components/treatment/ProcessTimeline";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import DoctorBioSection from "@/components/treatment/DoctorBioSection";
import EmpatheticPainPoints from "@/components/treatment/EmpatheticPainPoints";
import ServiceFAQ from "@/components/treatment/ServiceFAQ";
import FinalServiceCTA from "@/components/treatment/FinalServiceCTA";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Shield, AlertCircle, Zap, Sparkles, Heart, Search,
  HelpCircle, CheckCircle, ArrowRight
} from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import { InternalLinkingOptimizer } from '@/components/seo/InternalLinkingOptimizer';

const EnRootCanalPage = () => {
  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'EN Root Canal CTA',
        page_type: 'service_page'
      });
    }
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function () { console.log('Google Ads conversion tracked - EN Root Canal Page'); }
      });
    }
    await sendGCLIDToWebhook('en_root_canal_service_page_cta');
    const phone = "5521993304045";
    const message = "Hello! I saw the page about root canal treatment and would like to schedule an evaluation with Dr. Carla Christoph.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const faqs = [
    {
      question: "Does root canal treatment hurt?",
      answer: "With modern anesthesia, the procedure is comfortable and well-tolerated. What usually causes pain is the infection that led to the need for the root canal. The treatment actually relieves that pain. After the procedure, there may be mild sensitivity for a few days, easily managed with simple medication."
    },
    {
      question: "How many sessions are needed?",
      answer: "In most cases, 1 to 2 sessions. It depends on the case complexity — teeth with more canals or more extensive infections may require additional sessions. The endodontist evaluates and informs you before starting."
    },
    {
      question: "Does the tooth become fragile after a root canal?",
      answer: "The tooth loses its internal nutrition, which can make it more susceptible to fractures over time. That's why proper restoration is essential. Depending on the case, Dr. Carla may recommend a crown to protect the tooth long-term."
    },
    {
      question: "Does the tooth darken after a root canal?",
      answer: "It can happen over time, but it's not a rule. When it occurs, there are options to resolve it — from internal whitening to a veneer or crown. Dr. Carla evaluates the best solution during follow-up."
    },
    {
      question: "What's the alternative to root canal treatment?",
      answer: "The alternative would be tooth extraction. But whenever possible, preserving the natural tooth is the best choice — it avoids the need for an implant or prosthesis and maintains the original structure of the mouth."
    },
    {
      question: "Do you accept dental insurance?",
      answer: "Our care is private (fee-for-service), which allows us to dedicate the necessary time to each case and work with selected partner professionals. During the consultation, we present the complete treatment plan."
    }
  ];

  return (
    <EnPageLayout>
      <Helmet>
        <title>Root Canal Treatment in Ipanema | Dr. Carla Christoph</title>
        <meta name="description" content="Root canal treatment in Ipanema with comprehensive follow-up. Specialized endodontist and finalization by Dr. Carla Christoph. CRO-RJ 27.509." />
        <link rel="canonical" href="https://dracarlachristoph.com/en/root-canal" />
        <link rel="alternate" hrefLang="pt-BR" href="https://dracarlachristoph.com/tratamento-de-canal" />
        <link rel="alternate" hrefLang="en" href="https://dracarlachristoph.com/en/root-canal" />
        <link rel="alternate" hrefLang="x-default" href="https://dracarlachristoph.com/tratamento-de-canal" />

        <meta property="og:title" content="Root Canal Treatment in Ipanema | Comprehensive Care" />
        <meta property="og:description" content="Root canal treatment with individualized follow-up and finalization by Dr. Carla Christoph in Ipanema." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/en/root-canal" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Root Canal Treatment (Endodontics)",
            "description": "Endodontic treatment with comprehensive follow-up and restorative finalization",
            "procedureType": "Dental",
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
                "postalCode": "22410-002",
                "addressCountry": "BR"
              }
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "inLanguage": "en",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>

      {/* Speakable schema for voice search */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Root Canal Treatment in Ipanema",
        "url": "https://dracarlachristoph.com/en/root-canal",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".treatment-hero-title", ".treatment-hero-description", ".quick-answer-box"]
        },
        "inLanguage": "en"
      }) }} />

      {/* 1. Hero Section */}
      <TreatmentHero
        locale="en"
        title="Root Canal Treatment in Ipanema"
        subtitle="Comprehensive Care with Dr. Carla Christoph"
        description="A procedure with an unfair reputation. With experienced professionals and individualized follow-up, root canal treatment is more comfortable than you might think."
        badges={["Comprehensive Follow-Up", "Specialized Endodontist", "CRO-RJ 27.509"]}
        doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
        breadcrumbs={[
          { label: "Home", href: "/en" },
          { label: "Treatments", href: "/en" },
          { label: "Root Canal" }
        ]}
      />

      {/* Quick Answer */}
      <ScrollReveal animation="fade-up">
        <section className="py-8 bg-white">
          <div className="container-custom">
            <QuickAnswerBox
locale="en"               answer="Root canal treatment (endodontics) removes the infected pulp from the tooth, relieving pain and saving the tooth from extraction. At Dr. Carla Christoph's office in Ipanema (CRO-RJ 27.509), treatment is performed by a specialized endodontist and finalized by Dr. Carla. The procedure is comfortable with modern anesthesia, usually completed in 1-2 sessions. After the root canal, proper restoration or a crown is recommended to protect the tooth, which can last many years with proper care."
            />
          </div>
        </section>
      </ScrollReveal>

      <SectionDivider variant="with-icon" icon={<Shield size={20} />} />

      {/* Empathetic Pain Points */}
      <ScrollReveal animation="fade-up">
        <EmpatheticPainPoints
          title="Root canal treatment doesn't have to be scary"
          painPoints={[
            {
              icon: <Shield className="w-6 h-6 text-dental-purple" />,
              strong: "Fear of pain during the procedure",
              description: "With modern anesthesia and updated techniques, the procedure is comfortable. What hurts is the infection — the root canal actually relieves that pain.",
              borderColor: "border-dental-purple"
            },
            {
              icon: <AlertCircle className="w-6 h-6 text-dental-gold" />,
              strong: "Putting it off for months due to anxiety",
              description: "Delaying can turn simple treatment into something more complex. The sooner it's diagnosed, the better the chance of saving the tooth.",
              borderColor: "border-dental-gold"
            },
            {
              icon: <Heart className="w-6 h-6 text-dental-purple-soft" />,
              strong: "Need comprehensive care",
              description: "From diagnosis to final restoration, Dr. Carla coordinates the entire journey with a specialized endodontist.",
              borderColor: "border-dental-purple-soft"
            }
          ]}
          conclusion={<>Modern root canal treatment is much more comfortable than you might imagine.<br className="hidden md:block" /> Take the first step: schedule your evaluation.</>}
        />
      </ScrollReveal>

      <SectionDivider variant="with-icon" icon={<AlertCircle size={20} />} />

      {/* Warning Signs — 3 Cards */}
      <ScrollReveal animation="fade-up">
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-4 text-center text-dental-purple">
              When Is Root Canal Treatment Necessary?
            </h2>
            <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">
              Warning signs that deserve attention
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <Zap className="w-8 h-8 text-dental-purple" />,
                  iconBg: "bg-dental-purple/10",
                  title: "Persistent Pain",
                  text: "Spontaneous, throbbing toothache or pain that worsens with heat. Prolonged sensitivity that doesn't go away. These are signs that the tooth's pulp may be compromised."
                },
                {
                  icon: <AlertCircle className="w-8 h-8 text-dental-gold" />,
                  iconBg: "bg-dental-gold/10",
                  title: "Swelling or Abscess",
                  text: "Swollen gum near a tooth, presence of pus, or a fistula. Indicates infection that needs treatment to prevent spreading."
                },
                {
                  icon: <Sparkles className="w-8 h-8 text-dental-purple" />,
                  iconBg: "bg-dental-purple/10",
                  title: "Darkened Tooth",
                  text: "A tooth that has darkened after trauma or deep cavity may have a compromised pulp. The root canal treats the cause and allows restoring the tooth's appearance."
                }
              ].map((card, i) => (
                <ScrollReveal key={i} animation="fade-up" delay={i * 150}>
                  <div className="text-center">
                    <div className={`w-16 h-16 ${card.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-dental-purple mb-3">
                      {card.title}
                    </h3>
                    <p className="text-dental-gray">{card.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Urgent CTA */}
      <ScrollReveal animation="scale-in">
        <section className="py-8 bg-dental-beige/30">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-xl text-dental-gray mb-6">
              Experiencing any of these symptoms?
            </p>
            <a
              href="https://wa.me/5521993304045?text=Hello!%20I'm%20experiencing%20symptoms%20that%20may%20indicate%20the%20need%20for%20root%20canal%20treatment.%20I'd%20like%20to%20schedule%20an%20urgent%20evaluation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Schedule Urgent Evaluation
              <ArrowRight size={20} className="ml-2" />
            </a>
          </div>
        </section>
      </ScrollReveal>

      {/* Doctor Bio */}
      <ScrollReveal animation="fade-up">
        <DoctorBioSection
          locale="en"
          sectionTitle="Why Choose Dr. Carla Christoph"
          badgeText="Complete Journey"
          paragraphs={[
            "With over two decades in Ipanema, Dr. Carla has built her reputation by treating each patient individually, with time and attention. Her background includes 8 years as a military dentist at the Brazilian Navy Dental Center, an experience that brought discipline and precision to her clinical practice.",
            "For root canal treatment, Dr. Carla personally oversees each stage and is responsible for the finalization: direct restoration, crown, or prosthesis. You have one professional caring for your entire journey — from diagnosis to the final result."
          ]}
          credentials={[
            { title: "Coordination", description: "Personal oversight of the entire treatment journey" },
            { title: "Finalization", description: "Restoration, crown, or prosthesis done by Dr. Carla" },
            { title: "Experience", description: "20+ years, including 8 in the Navy" },
            { title: "Approach", description: "Individualized appointments, minimum 1 hour" }
          ]}
        />
      </ScrollReveal>

      <SectionDivider variant="with-icon" icon={<Search size={20} />} />

      {/* Process Timeline */}
      <ScrollReveal animation="fade-up">
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-4 text-center text-dental-purple">
              How Root Canal Treatment Works at Our Office
            </h2>

            <div className="max-w-4xl mx-auto">
              <ProcessTimeline
                steps={[
                  {
                    number: 1,
                    title: "Diagnosis with Dr. Carla",
                    description: "Clinical exam, X-ray, and case evaluation. Dr. Carla identifies the problem and explains what needs to be done.",
                    icon: <Search size={24} />,
                    duration: "1st Appointment"
                  },
                  {
                    number: 2,
                    title: "Treatment with Endodontist",
                    description: "The procedure is performed by a specialized endodontist with local anesthesia. Dr. Carla personally oversees the process.",
                    icon: <Shield size={24} />,
                    duration: "1-2 sessions"
                  },
                  {
                    number: 3,
                    title: "Restoration by Dr. Carla",
                    description: "After the root canal, Dr. Carla finalizes the tooth — with a direct composite restoration, crown, or the most appropriate solution for your case.",
                    icon: <Sparkles size={24} />,
                    duration: "Finalization"
                  },
                  {
                    number: 4,
                    title: "Follow-Up",
                    description: "Follow-up appointments to ensure the treated tooth is healthy and the restoration is intact.",
                    icon: <Heart size={24} />,
                    duration: "Periodic"
                  }
                ]}
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Informational Section */}
      <ScrollReveal animation="fade-up">
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              What Happens During the Procedure
            </h2>

            <div className="max-w-3xl mx-auto space-y-6 text-dental-gray leading-relaxed">
              <p>
                Root canal treatment involves removing the tooth's pulp — the internal tissue containing nerves and blood vessels — when it becomes inflamed or infected. With the tooth anesthetized, the endodontist accesses the interior, cleans and disinfects the canals, and fills them with biocompatible material. The procedure typically takes 1 to 2 sessions, and the tooth is then restored by Dr. Carla to recover its form, function, and appearance.
              </p>
              <p>
                In clinical practice, what we see most are patients who arrive tense and leave relieved — both because the pain subsides and because they discover the procedure was much more comfortable than they imagined.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <SectionDivider variant="with-icon" icon={<HelpCircle size={20} />} />

      {/* FAQs */}
      <ScrollReveal animation="fade-up">
        <ServiceFAQ
          title="Questions About Root Canal Treatment"
          faqs={faqs}
        />
      </ScrollReveal>

      {/* Final CTA */}
      <FinalServiceCTA
        locale="en"
        icon={<Shield className="w-8 h-8" />}
        title="Tooth Pain Needs Attention"
        description="Schedule your evaluation. The sooner the diagnosis, the simpler the treatment tends to be."
        ctaText="Schedule Evaluation"
        whatsappMessage="Hello! I saw the page about root canal treatment and would like to schedule an evaluation with Dr. Carla Christoph."
        onClickOverride={handleWhatsAppClick}
      />
      <InternalLinkingOptimizer currentPage="en-root-canal" />
      <StatsBar locale="en" />
    </EnPageLayout>
  );
};

export default EnRootCanalPage;
