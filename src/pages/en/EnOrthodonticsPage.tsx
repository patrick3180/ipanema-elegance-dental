import React from "react";
import SEOHead from "@/components/SEOHead";
import EnPageLayout from "@/components/en/EnPageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import StatsBar from "@/components/treatment/StatsBar";
import SectionDivider from "@/components/treatment/SectionDivider";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import ComparisonTable from "@/components/blog/ComparisonTable";
import DoctorBioSection from "@/components/treatment/DoctorBioSection";
import EmpatheticPainPoints from "@/components/treatment/EmpatheticPainPoints";
import ServiceFAQ from "@/components/treatment/ServiceFAQ";
import FinalServiceCTA from "@/components/treatment/FinalServiceCTA";
import ScrollReveal from "@/components/ScrollReveal";
import { ComparisonTableItem } from "@/types/BlogPost";
import { CheckCircle, Star, ArrowRight, Clock, Sparkles, Shield, Heart, Award, Zap, Calendar, AlertCircle } from "lucide-react";
import { InternalLinkingOptimizer } from '@/components/seo/InternalLinkingOptimizer';
import { sendGCLIDToWebhook } from "@/utils/gclid";

const EnOrthodonticsPage = () => {
  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'EN Orthodontics CTA',
        page_type: 'service_page'
      });
    }
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function () { console.log('Google Ads conversion tracked - EN Orthodontics Page'); }
      });
    }
    await sendGCLIDToWebhook('en_orthodontics_service_page_cta');
    const phone = "5521993304045";
    const message = "Hello! I'd like to schedule an orthodontic evaluation with Dr. Bruno.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const comparisonData: ComparisonTableItem[] = [
    {
      "Criterio": "Criteria",
      "Critério": "Criteria",
      "Rótulo coluna A": "Invisalign®",
      "Rótulo coluna B": "Aesthetic Braces",
      "Rótulo coluna C": "Traditional Braces"
    },
    {
      "Criterio": "Visibility",
      "Rótulo coluna A": "Nearly invisible",
      "Rótulo coluna B": "Discreet (clear brackets)",
      "Rótulo coluna C": "Visible (metal brackets)"
    },
    {
      "Criterio": "Removable",
      "Rótulo coluna A": "Yes - for eating & hygiene",
      "Rótulo coluna B": "No - fixed to teeth",
      "Rótulo coluna C": "No - fixed to teeth"
    },
    {
      "Criterio": "Comfort",
      "Rótulo coluna A": "Maximum - no wires or brackets",
      "Rótulo coluna B": "Moderate - smooth brackets",
      "Rótulo coluna C": "Basic - may cause sores"
    },
    {
      "Criterio": "Oral Hygiene",
      "Rótulo coluna A": "Easy - remove to brush",
      "Rótulo coluna B": "Requires extra care",
      "Rótulo coluna C": "Requires extra care"
    },
    {
      "Criterio": "Treatment Duration",
      "Rótulo coluna A": "6-18 months (simple cases)",
      "Rótulo coluna B": "12-24 months",
      "Rótulo coluna C": "12-24 months"
    },
    {
      "Criterio": "Appointments",
      "Rótulo coluna A": "Every 6-8 weeks",
      "Rótulo coluna B": "Monthly",
      "Rótulo coluna C": "Monthly"
    },
    {
      "Criterio": "Main Indication",
      "Rótulo coluna A": "Adults, aesthetic cases",
      "Rótulo coluna B": "Teens and adults",
      "Rótulo coluna C": "All cases"
    }
  ];

  const faqs = [
    {
      question: "How does orthodontic treatment work at Dr. Carla's office?",
      answer: "Dr. Carla Christoph's office offers specialized orthodontic treatment through Dr. Bruno Moreira das Neves, an orthodontist with a PhD from UERJ. Dr. Carla oversees the entire patient journey, ensuring integrated and personalized care."
    },
    {
      question: "How long does Invisalign® treatment take?",
      answer: "Invisalign® treatment typically lasts 6 to 18 months for simple to moderate cases, and may extend up to 24 months for complex cases. With the iTero Element 5D, we can digitally simulate the result and accurately estimate the time needed."
    },
    {
      question: "What is the ideal age to start orthodontic treatment?",
      answer: "The first orthodontic evaluation is recommended at age 7 to identify problems early. For fixed braces, the ideal age is between 11-14 years. Adults of any age can undergo orthodontics — we have patients over 60."
    },
    {
      question: "Does orthodontic treatment hurt?",
      answer: "It's normal to feel mild pressure for the first 2-3 days after placing a new Invisalign® aligner or after braces adjustments. The discomfort is temporary and easily managed with over-the-counter pain medication if needed."
    },
    {
      question: "Can I eat everything with braces?",
      answer: "With Invisalign®, you remove the aligners to eat, so you can enjoy any food without restrictions. With fixed braces (aesthetic or traditional), hard and sticky foods should be avoided."
    },
    {
      question: "How does the iTero Element 5D work?",
      answer: "The iTero Element 5D eliminates the need for traditional impressions with putty. In just a few minutes, we create an ultra-precise 3D model of your teeth, and you immediately see a simulation of the expected result."
    },
    {
      question: "What's the difference between aesthetic and traditional braces?",
      answer: "Aesthetic braces use clear brackets, making them much more discreet. Both have the same effectiveness, but aesthetic braces offer a better appearance. Traditional braces are more durable and have a lower cost."
    },
    {
      question: "What is retention and why is it important?",
      answer: "Retention is essential to maintain results after treatment. We offer fixed and/or removable retainers, ensuring your teeth stay aligned permanently."
    },
    {
      question: "Does Invisalign® work for complex cases?",
      answer: "Yes! Invisalign® has evolved greatly and now treats everything from simple to complex cases, including crossbites and severe crowding. With Dr. Bruno's experience, we can resolve most cases."
    },
    {
      question: "How is follow-up during treatment?",
      answer: "We schedule regular appointments to monitor progress and make necessary adjustments. Dr. Carla and Dr. Bruno work together, ensuring unhurried care with attention to detail."
    },
    {
      question: "What is the investment for orthodontic treatment?",
      answer: "The investment varies depending on the type of braces and case complexity. We offer flexible payment plans and special conditions. A personalized quote is provided during the evaluation."
    },
    {
      question: "Can I switch from fixed braces to Invisalign® during treatment?",
      answer: "Yes, it's possible to make the transition if you're not satisfied with fixed braces. Dr. Bruno will evaluate your case and determine the best time for the switch, aiming for more comfort and aesthetics."
    }
  ];

  return (
    <EnPageLayout>
      <SEOHead
        title="Orthodontics & Invisalign® in Ipanema | Dr. Carla Christoph"
        description="Modern orthodontics in Ipanema with Dr. Bruno Moreira (PhD UERJ) at Dr. Carla Christoph's office. Invisalign®, aesthetic braces, and iTero Element 5D technology."
        canonicalUrl="https://dracarlachristoph.com/en/orthodontics"
        keywords="orthodontics Ipanema, Invisalign Rio de Janeiro, braces dentist, teeth alignment"
        locale="en_US"
        language="en"
        hreflangAlternates={[
          { lang: "pt-BR", href: "https://dracarlachristoph.com/ortodontia" },
          { lang: "en", href: "https://dracarlachristoph.com/en/orthodontics" },
          { lang: "x-default", href: "https://dracarlachristoph.com/ortodontia" }
        ]}
        structuredData={{
          "@context": "https://schema.org", "@type": "MedicalProcedure",
          "name": "Orthodontic Treatment", "description": "Correction of tooth and jaw positioning using orthodontic appliances or invisible aligners",
          "procedureType": "Orthodontic", "bodyLocation": "Teeth and Jaw", "inLanguage": "en",
          "followup": "Monthly appointments and post-treatment retention",
          "howPerformed": "Fixed braces, aesthetic braces, or Invisalign removable aligners with digital planning",
          "preparation": "Clinical evaluation, X-rays, and iTero Element 5D scanning",
          "provider": [
            { "@type": "Dentist", "name": "Dr. Carla Christoph", "identifier": "CRO-RJ 27.509" },
            { "@type": "Dentist", "name": "Dr. Bruno Moreira das Neves", "identifier": "CRO-RJ 41.684", "description": "Specialist orthodontist, PhD from UERJ" }
          ],
          "typicalAgeRange": "7-99"
        }}
        additionalStructuredData={[
          {
            "@context": "https://schema.org", "@type": "FAQPage", "inLanguage": "en",
            "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } }))
          },
          {
            "@context": "https://schema.org", "@type": "WebPage",
            "name": "Modern Orthodontics in Ipanema",
            "url": "https://dracarlachristoph.com/en/orthodontics",
            "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".treatment-hero-title", ".treatment-hero-description", ".quick-answer-box"] },
            "inLanguage": "en"
          }
        ]}
      />

      {/* Treatment Hero */}
      <TreatmentHero
        locale="en"
        title="Modern Orthodontics in Ipanema"
        subtitle="Align Your Smile with Technology and Expertise"
        description="Specialized orthodontic treatment using advanced technology like iTero Element 5D and Invisalign® for comfort and precision in your treatment."
        badges={["Invisalign®", "PhD from UERJ", "iTero Element 5D"]}
        doctorImage="/lovable-uploads/DrBruno_site.webp"
        breadcrumbs={[
          { label: "Home", href: "/en" },
          { label: "Treatments", href: "/en" },
          { label: "Orthodontics" }
        ]}
      />

      {/* Quick Answer */}
      <ScrollReveal animation="fade-up">
        <section className="py-8 bg-white">
          <div className="container-custom">
            <QuickAnswerBox
locale="en"               answer="Orthodontics is the specialty that corrects tooth positioning. At Dr. Carla's office, treatment is performed by Dr. Bruno Moreira, an orthodontist with a PhD from UERJ. Dr. Carla oversees the patient journey, ensuring integration. We use the iTero Element 5D for planning and offer Invisalign® or aesthetic braces with treatment lasting between 6 to 24 months."
            />
          </div>
        </section>
      </ScrollReveal>

      <SectionDivider variant="with-icon" icon={<AlertCircle size={20} />} />

      {/* Empathetic Pain Points */}
      <ScrollReveal animation="fade-up">
        <EmpatheticPainPoints
          title={`Do you think you're "too old" to straighten your teeth?`}
          painPoints={[
            {
              icon: <Star className="w-6 h-6 text-dental-purple" />,
              strong: "Professionals who need discretion",
              description: "Invisalign® doesn't interfere with meetings, presentations, or social situations — it's nearly invisible.",
              borderColor: "border-dental-purple"
            },
            {
              icon: <Heart className="w-6 h-6 text-dental-gold" />,
              strong: "Adults who avoid metal braces",
              description: "But feel uncomfortable with crooked teeth in professional and social settings.",
              borderColor: "border-dental-gold"
            },
            {
              icon: <CheckCircle className="w-6 h-6 text-dental-purple-soft" />,
              strong: "There's no age limit for orthodontics",
              description: "We treat patients over 60 years old with consistent functional and aesthetic results.",
              borderColor: "border-dental-purple-soft"
            }
          ]}
          conclusion={<>Adult orthodontics is one of the fastest-growing specialties.<br className="hidden md:block" /> Straightening your teeth improves aesthetics, chewing, and your oral health.</>}
        />
      </ScrollReveal>

      <SectionDivider variant="with-icon" icon={<Sparkles size={20} />} />

      {/* Treatment Options — 3 Cards */}
      <ScrollReveal animation="fade-up">
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center text-dental-purple">
              Orthodontic Treatment Options
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Invisalign */}
              <div className="bg-gradient-to-br from-dental-purple/5 to-transparent p-6 rounded-lg border-2 border-dental-gold">
                <div className="w-12 h-12 bg-dental-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-dental-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-dental-purple">Invisalign®</h3>
                <p className="text-dental-gray mb-4">Clear removable aligners, nearly invisible. Maximum comfort.</p>
                <ul className="space-y-2 text-sm text-dental-gray">
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Nearly invisible</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Remove to eat</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Easy hygiene</li>
                </ul>
              </div>

              {/* Aesthetic Braces */}
              <div className="bg-gradient-to-br from-dental-gold/10 to-transparent p-6 rounded-lg">
                <div className="w-12 h-12 bg-dental-gold/20 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-dental-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-dental-purple">Aesthetic Braces</h3>
                <p className="text-dental-gray mb-4">Sapphire or clear porcelain brackets. Discreet and effective.</p>
                <ul className="space-y-2 text-sm text-dental-gray">
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Discreet and elegant</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Stain-resistant</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Great cost-benefit</li>
                </ul>
              </div>

              {/* Traditional Braces */}
              <div className="bg-gradient-to-br from-gray-100 to-transparent p-6 rounded-lg">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-dental-purple">Traditional Braces</h3>
                <p className="text-dental-gray mb-4">Conventional metal brackets. Effective solution for all types of correction.</p>
                <ul className="space-y-2 text-sm text-dental-gray">
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Most affordable</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Very durable</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Proven effectiveness</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Comparison Table */}
      <ScrollReveal animation="fade-up">
        <section className="py-8 bg-gray-50">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Detailed Comparison of Options
            </h2>
            <div className="max-w-6xl mx-auto">
              <ComparisonTable data={comparisonData} />
              <p className="text-center mt-6 text-dental-gray">
                The ideal appliance depends on your case, lifestyle, and priorities.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <SectionDivider variant="with-icon" icon={<Award size={20} />} />

      {/* Doctor Bio — Dr. Bruno & Dra. Carla */}
      <ScrollReveal animation="fade-up">
        <DoctorBioSection
          locale="en"
          sectionTitle="Exclusive Integration and Expertise"
          doctorName="Dr. Bruno Moreira das Neves"
          doctorSubtitle="Specialist Orthodontist | CRO-RJ 41.684"
          doctorImage="/lovable-uploads/DrBruno_site.webp"
          doctorAlt="Dr. Bruno Moreira"
          badgeText="PhD from UERJ"
          paragraphs={[
            "With a solid academic background and extensive clinical experience, Dr. Bruno is responsible for the planning and execution of all advanced orthodontic treatments at our Ipanema office.",
            "Dr. Carla Christoph (CRO-RJ 27.509), a prosthodontic specialist, supervises and integrates the entire orthodontic journey into the comprehensive health and aesthetic plan for each patient. With this technical partnership, the final visual result is even more stunning with a strong functional foundation."
          ]}
          credentials={[
            { title: "PhD", description: "Doctor of Orthodontics from UERJ" },
            { title: "Invisalign Doctor", description: "Proficiency in the Invisalign system" },
            { title: "Teaching", description: "Professor of Orthodontics (IOPUC-Rio)" },
            { title: "Master's", description: "Master's in Clinical Dentistry (UFF)" }
          ]}
        />
      </ScrollReveal>

      <SectionDivider variant="with-icon" icon={<Zap size={20} />} />

      {/* iTero Technology */}
      <ScrollReveal animation="fade-up">
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center text-dental-purple">
              iTero Element 5D Technology: Digital Precision
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-dental-purple">
                  Say Goodbye to Putty Impressions!
                </h3>
                <p className="text-dental-gray mb-6">
                  With the iTero Element 5D, we create an ultra-precise 3D model
                  of your teeth in minutes, without discomfort. The technology enables:
                </p>
                <ul className="space-y-3 text-dental-gray">
                  <li className="flex items-start"><Zap className="w-5 h-5 text-dental-gold mr-2 mt-1" /> <span>Immediate result visualization</span></li>
                  <li className="flex items-start"><Zap className="w-5 h-5 text-dental-gold mr-2 mt-1" /> <span>Precise digital planning and Invisalign aligners</span></li>
                  <li className="flex items-start"><Zap className="w-5 h-5 text-dental-gold mr-2 mt-1" /> <span>Millimetric monitoring and focus on precision</span></li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-dental-purple/10 to-dental-gold/10 p-8 rounded-lg">
                <div className="text-center">
                  <div className="w-32 h-32 flex items-center justify-center mx-auto mb-4 overflow-hidden mask-image-gradient shadow-elegant">
                    <img src="/lovable-uploads/itero_screen.webp" alt="iTero Element 5D intraoral scanner for digital orthodontic planning" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-dental-purple">
                    Real-Time Simulation
                  </h4>
                  <p className="text-sm text-dental-gray">
                    See how your smile will look before you start. iTero technology allows exact adjustments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* FAQs */}
      <ScrollReveal animation="fade-up">
        <ServiceFAQ title="Frequently Asked Questions About Orthodontics" faqs={faqs} />
      </ScrollReveal>

      {/* Final CTA */}
      <FinalServiceCTA
        locale="en"
        title="Ready to Achieve the Smile of Your Dreams?"
        description="Schedule your evaluation with Dr. Bruno and discover how modern orthodontics can straighten your teeth. iTero Element 5D, Invisalign, and exclusive attention await you."
        ctaText="Schedule Evaluation on WhatsApp"
        whatsappMessage="Hello! I'd like to schedule an orthodontic evaluation with Dr. Bruno."
        onClickOverride={handleWhatsAppClick}
        icon={<Calendar className="w-8 h-8" />}
        variant="urgency"
      />

      <InternalLinkingOptimizer currentPage="en-orthodontics" />
      <StatsBar locale="en" />
    </EnPageLayout>
  );
};

export default EnOrthodonticsPage;
