import React from "react";
import SEOHead from "@/components/SEOHead";
import EnPageLayout from "@/components/en/EnPageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import StatsBar from "@/components/treatment/StatsBar";
import SectionDivider from "@/components/treatment/SectionDivider";
import ProcessTimeline from "@/components/treatment/ProcessTimeline";
import ComparisonTable from "@/components/blog/ComparisonTable";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sparkles, Award, HelpCircle, Search, FileText, Scan, Zap, Heart, CheckCircle, ArrowRight, Droplet, AlertCircle, Calendar, Clock } from "lucide-react";

import ScrollReveal from "@/components/ScrollReveal";
import EmpatheticPainPoints from "@/components/treatment/EmpatheticPainPoints";
import DoctorBioSection from "@/components/treatment/DoctorBioSection";
import ServiceFAQ from "@/components/treatment/ServiceFAQ";
import FinalServiceCTA from "@/components/treatment/FinalServiceCTA";
import { InternalLinkingOptimizer } from "@/components/seo/InternalLinkingOptimizer";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const EnTeethWhiteningPage = () => {
  const handleWhatsAppClick = async (message?: string) => {
    const gclid = new URLSearchParams(window.location.search).get('gclid');
    if (gclid) localStorage.setItem('gclid', gclid);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', { 'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9', 'value': 1.0, 'currency': 'BRL' });
    }
    await sendGCLIDToWebhook('en_teeth_whitening');
    const defaultMessage = "Hello! I'd like to learn more about professional teeth whitening.";
    window.open(`https://wa.me/5521993304045?text=${encodeURIComponent(message || defaultMessage)}`, "_blank");
  };

  const faqs = [
    { question: "What's the difference between the whitening modalities?", answer: "In-office whitening uses a high-concentration gel (35-37%), producing results in 1-3 sessions. At-home whitening uses a lower concentration (10-20%), applied gradually over 14-21 days with custom trays. The combined approach starts in the office and maintains results with at-home applications. The recommendation depends on individual assessment." },
    { question: "Does whitening cause sensitivity?", answer: "Temporary sensitivity may occur, but modern protocols minimize this discomfort. We use desensitizing agents, adjust concentrations as needed, and apply therapeutic laser when indicated. Most patients report little to no discomfort." },
    { question: "How long do results last?", answer: "With proper care, results last 2-3 years. Longevity varies depending on dietary habits and hygiene. A maintenance protocol with annual touch-up sessions significantly extends results." },
    { question: "Can I whiten my teeth if I have restorations?", answer: "Yes, but only natural teeth respond to whitening. Restorations and prostheses retain their original color. We analyze your case to determine the best strategy, considering whether visible restorations need replacement afterward." },
    { question: "Is whitening safe for enamel?", answer: "When performed with proper protocols, it does not damage enamel. Modern gels have balanced pH and do not cause demineralization. We use products with remineralizing agents that preserve dental integrity." },
    { question: "What care should I take after whitening?", answer: "In the first 48 hours, avoid pigmented foods and beverages. Maintain proper oral hygiene with brushing after meals. Use straws for dark drinks. Semi-annual visits for professional maintenance." },
    { question: "Does whitening work on all types of stains?", answer: "Effectiveness varies by stain type. Stains from food and aging respond very well. Medication-related stains have variable results. During the evaluation, we analyze your specific case and establish realistic expectations." },
    { question: "Is whitening the same as dental cleaning?", answer: "No. Cleaning removes tartar and surface stains, restoring the natural color. Whitening chemically alters the internal tooth color, lightening beyond the natural shade. We frequently perform cleaning before whitening to optimize results." },
    { question: "Do pharmacy products have the same effect?", answer: "Over-the-counter products contain very low concentrations due to regulations, offering limited results. Professional whitening uses therapeutic concentrations under supervision, ensuring superior effectiveness and safety." },
    { question: "How is the whitening modality chosen?", answer: "During the evaluation consultation, I analyze your individual characteristics, stain type, prior sensitivity, routine, and expectations. The recommendation considers all these factors to define the most suitable protocol for your case." }
  ];

  return (
    <>
      <SEOHead
        title="Professional Teeth Whitening in Ipanema | Dr. Carla Christoph"
        description="Professional teeth whitening in Ipanema. In-office and supervised at-home techniques. Personalized protocols with Dr. Carla Christoph. CRO-RJ 27.509."
        canonicalUrl="https://dracarlachristoph.com/en/teeth-whitening"
        keywords="teeth whitening Ipanema, professional whitening Rio de Janeiro, dental bleaching, cosmetic dentistry"
        locale="en_US"
        language="en"
        hreflangAlternates={[
          { lang: "pt-BR", href: "https://dracarlachristoph.com/clareamento-dental" },
          { lang: "en", href: "https://dracarlachristoph.com/en/teeth-whitening" },
          { lang: "x-default", href: "https://dracarlachristoph.com/clareamento-dental" }
        ]}
        structuredData={{
          "@context": "https://schema.org", "@type": "MedicalProcedure",
          "name": "Professional Teeth Whitening", "description": "Teeth whitening procedure with in-office and supervised at-home techniques",
          "procedureType": "Dental", "inLanguage": "en",
          "provider": { "@type": "Dentist", "name": "Dr. Carla Christoph", "telephone": "+5521993304045",
            "address": { "@type": "PostalAddress", "streetAddress": "Rua Visconde de Pirajá, 550 - Suite 1107", "addressLocality": "Ipanema", "addressRegion": "RJ", "postalCode": "22410-901", "addressCountry": "BR" }
          }
        }}
        additionalStructuredData={[
          {
            "@context": "https://schema.org", "@type": "FAQPage", "inLanguage": "en",
            "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } }))
          },
          {
            "@context": "https://schema.org", "@type": "WebPage",
            "name": "Professional Teeth Whitening in Ipanema",
            "url": "https://dracarlachristoph.com/en/teeth-whitening",
            "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".treatment-hero-title", ".treatment-hero-description", ".quick-answer-box"] },
            "inLanguage": "en"
          }
        ]}
      />

      <EnPageLayout>
        {/* Hero Section */}
        <TreatmentHero
          locale="en"
          title="Professional Teeth Whitening"
          subtitle="Cosmetic Dentistry with Dr. Carla Christoph"
          description="In-office and supervised at-home techniques with personalized protocols that prioritize your safety and comfort. Individualized care at every step of the treatment. Over 20 years of experience in cosmetic dentistry."
          badges={["20+ years of experience", "Personalized protocols", "CRO-RJ 27.509"]}
          doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
          breadcrumbs={[
            { label: "Home", href: "/en" },
            { label: "Treatments", href: "/en" },
            { label: "Teeth Whitening" }
          ]}
        />

        {/* Quick Answer Box */}
        <ScrollReveal animation="fade-up">
          <section className="py-8 bg-white">
            <div className="container-custom">
              <QuickAnswerBox
locale="en"                 answer="Teeth whitening is a cosmetic procedure that lightens teeth using peroxide-based gel. At Dr. Carla Christoph's practice in Ipanema, we offer in-office techniques (1-3 sessions of 60-90 minutes) and supervised at-home whitening. With over 20 years of experience (CRO-RJ 27.509), we work with personalized protocols that lighten 4 to 9 shades safely, preserving the health of teeth and gums. Treatment lasts 7 to 21 days depending on the chosen modality."
              />
            </div>
          </section>
        </ScrollReveal>

        {/* Empathetic Pain Points */}
        <ScrollReveal animation="fade-up">
          <EmpatheticPainPoints
            title="Does your smile need a whitening boost?"
            painPoints={[
              {
                icon: <Sparkles className="w-6 h-6 text-dental-purple" />,
                strong: "Do you avoid smiling in photos",
                description: "because you feel your teeth are yellowed or darker than you'd like?",
                borderColor: "border-dental-purple"
              },
              {
                icon: <Droplet className="w-6 h-6 text-dental-gold" />,
                strong: "Have you tried \"whitening\" toothpastes from the store",
                description: "and saw no results or experienced sensitivity with no real improvement?",
                borderColor: "border-dental-gold"
              },
              {
                icon: <AlertCircle className="w-6 h-6 text-dental-purple-soft" />,
                strong: "Want real, safe results",
                description: "with professional supervision and without risking your enamel health?",
                borderColor: "border-dental-purple-soft"
              }
            ]}
            conclusion={<>Professional whitening uses therapeutic concentrations under supervision.<br className="hidden md:block" /> Let's find the ideal technique for you — with care at every step.</>}
          />
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<Sparkles className="w-5 h-5" />} />

        {/* Three Modality Cards with Accordion */}
        <ScrollReveal animation="fade-up">
          <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Available Whitening Options
              </h2>
              <p className="text-lg text-dental-gray">
                Each technique is recommended based on individual characteristics. Learn about the options.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">

              {/* CARD 1 — IN-OFFICE WHITENING */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="aspect-[4/3] relative">
                  <img
                    src="/lovable-uploads/Clareamento_de_consultorio.webp"
                    alt="3D model showing in-office teeth whitening procedure"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-display font-semibold text-white mb-2">
                      In-Office Whitening
                    </h3>
                    <p className="text-white/90 text-sm mb-4 line-clamp-3">
                      High-concentration whitening gel applied in 60-90 minute sessions. Visible results from the very first application.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="features">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Key Features</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-dental-gray text-sm">
                          <li className="flex items-start gap-2"><span className="text-dental-gold mt-1">▸</span><span><strong>Concentration:</strong> 35-37% hydrogen peroxide</span></li>
                          <li className="flex items-start gap-2"><span className="text-dental-gold mt-1">▸</span><span><strong>Sessions:</strong> 1 to 3 appointments</span></li>
                          <li className="flex items-start gap-2"><span className="text-dental-gold mt-1">▸</span><span><strong>Whitening:</strong> 4-9 shades</span></li>
                          <li className="flex items-start gap-2"><span className="text-dental-gold mt-1">▸</span><span><strong>Longevity:</strong> 2-3 years with proper care</span></li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="advantages">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Advantages & Considerations</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="font-semibold text-green-900 mb-2 text-sm">Advantages:</p>
                            <ul className="space-y-1 text-dental-gray text-sm">
                              <li className="flex items-start gap-2"><span className="text-green-600">✓</span><span>Results in just a few sessions</span></li>
                              <li className="flex items-start gap-2"><span className="text-green-600">✓</span><span>Constant professional supervision</span></li>
                              <li className="flex items-start gap-2"><span className="text-green-600">✓</span><span>Precise control of the process</span></li>
                              <li className="flex items-start gap-2"><span className="text-green-600">✓</span><span>Gum isolation to prevent irritation</span></li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="font-semibold text-blue-900 mb-2 text-sm">Considerations:</p>
                            <ul className="space-y-1 text-dental-gray text-sm">
                              <li className="flex items-start gap-2"><span className="text-dental-gray">•</span><span>Temporary sensitivity possible</span></li>
                              <li className="flex items-start gap-2"><span className="text-dental-gray">•</span><span>Requires availability for appointments</span></li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="ideal">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Ideal For</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-dental-gray text-sm">
                            Cases requiring results in a short timeframe, more resistant stains, or patients who prefer constant in-person supervision.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* CARD 2 — AT-HOME WHITENING */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="aspect-[4/3] relative">
                  <img
                    src="/lovable-uploads/Clareamento_caseiro.webp"
                    alt="3D model showing custom whitening trays for at-home use"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-display font-semibold text-white mb-2">
                      Supervised At-Home Whitening
                    </h3>
                    <p className="text-white/90 text-sm mb-4 line-clamp-3">
                      Custom trays made at the office. Lower-concentration gel for daily at-home application with professional follow-up.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="features">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Key Features</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-dental-gray text-sm">
                          <li className="flex items-start gap-2"><span className="text-dental-gold mt-1">▸</span><span><strong>Concentration:</strong> 10-20% carbamide peroxide</span></li>
                          <li className="flex items-start gap-2"><span className="text-dental-gold mt-1">▸</span><span><strong>Trays:</strong> Custom-made and anatomical</span></li>
                          <li className="flex items-start gap-2"><span className="text-dental-gold mt-1">▸</span><span><strong>Application:</strong> 14 to 21 days</span></li>
                          <li className="flex items-start gap-2"><span className="text-dental-gold mt-1">▸</span><span><strong>Whitening:</strong> 2-6 shades</span></li>
                          <li className="flex items-start gap-2"><span className="text-dental-gold mt-1">▸</span><span><strong>Longevity:</strong> 2-3 years with proper care</span></li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="advantages">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Advantages & Considerations</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="font-semibold text-green-900 mb-2 text-sm">Advantages:</p>
                            <ul className="space-y-1 text-dental-gray text-sm">
                              <li className="flex items-start gap-2"><span className="text-green-600">✓</span><span>Applied from the comfort of home</span></li>
                              <li className="flex items-start gap-2"><span className="text-green-600">✓</span><span>Flexible schedule</span></li>
                              <li className="flex items-start gap-2"><span className="text-green-600">✓</span><span>Less sensitivity</span></li>
                              <li className="flex items-start gap-2"><span className="text-green-600">✓</span><span>Gradual and controlled</span></li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="font-semibold text-blue-900 mb-2 text-sm">Considerations:</p>
                            <ul className="space-y-1 text-dental-gray text-sm">
                              <li className="flex items-start gap-2"><span className="text-dental-gray">•</span><span>Requires discipline in application</span></li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="ideal">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Ideal For</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-dental-gray text-sm">
                            Those who prefer a gradual treatment, have a flexible routine, and value comfort during the process.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* CARD 3 — COMBINED TREATMENT */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="aspect-[4/3] relative">
                  <img
                    src="/lovable-uploads/Clareamento_combinado.webp"
                    alt="3D model showing before and after teeth whitening result"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-display font-semibold text-white mb-2">
                      Combined Treatment
                    </h3>
                    <p className="text-white/90 text-sm mb-4 line-clamp-3">
                      Starts in the office followed by at-home maintenance. Combines a more evident initial result with gradual stabilization.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="features">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Key Features</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-dental-gray text-sm">
                          <li className="flex items-start gap-2"><span className="text-dental-gold mt-1">▸</span><span><strong>Protocol:</strong> In-office + at-home sequential</span></li>
                          <li className="flex items-start gap-2"><span className="text-dental-gold mt-1">▸</span><span><strong>Total time:</strong> Variable by case</span></li>
                          <li className="flex items-start gap-2"><span className="text-dental-gold mt-1">▸</span><span><strong>Whitening:</strong> 6-9 shades</span></li>
                          <li className="flex items-start gap-2"><span className="text-dental-gold mt-1">▸</span><span><strong>Longevity:</strong> 3+ years with maintenance protocol</span></li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="advantages">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Advantages & Considerations</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="font-semibold text-green-900 mb-2 text-sm">Advantages:</p>
                            <ul className="space-y-1 text-dental-gray text-sm">
                              <li className="flex items-start gap-2"><span className="text-green-600">✓</span><span>More evident initial result</span></li>
                              <li className="flex items-start gap-2"><span className="text-green-600">✓</span><span>Gradual stabilization</span></li>
                              <li className="flex items-start gap-2"><span className="text-green-600">✓</span><span>Greater longevity</span></li>
                              <li className="flex items-start gap-2"><span className="text-green-600">✓</span><span>Complete protocol</span></li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="font-semibold text-blue-900 mb-2 text-sm">Considerations:</p>
                            <ul className="space-y-1 text-dental-gray text-sm">
                              <li className="flex items-start gap-2"><span className="text-dental-gray">•</span><span>Higher investment</span></li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="ideal">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Ideal For</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-dental-gray text-sm">
                            Cases of more pronounced darkening, persistent stains, or when longer-lasting results are desired.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* Mid CTA */}
        <ScrollReveal animation="fade-up">
          <section className="py-8 bg-white">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <p className="text-xl text-dental-gray mb-6">
                Not sure which modality to choose?
              </p>
              <button
                onClick={() => handleWhatsAppClick("Hello! I'd like to know which whitening modality is most suitable for my case.")}
                className="inline-flex items-center justify-center px-8 py-4 bg-dental-gold hover:bg-dental-gold/90 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Let's Evaluate Together
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          </section>
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<Sparkles className="w-5 h-5" />} />

        {/* Comparison Table */}
        <ScrollReveal animation="fade-up">
          <section className="py-12 pb-8 bg-dental-beige/20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Comparison Between Modalities
              </h2>
            </div>

            <ComparisonTable data={[
              { "Criterio": "Concentration", "Critério": "Concentration", "Rótulo coluna A": "35-37%", "Rótulo coluna B": "10-20%", "Rótulo coluna C": "Both" },
              { "Criterio": "Treatment Time", "Critério": "Treatment Time", "Rótulo coluna A": "1-3 sessions", "Rótulo coluna B": "14-21 days", "Rótulo coluna C": "Variable" },
              { "Criterio": "Expected Whitening", "Critério": "Expected Whitening", "Rótulo coluna A": "4-9 shades", "Rótulo coluna B": "2-6 shades", "Rótulo coluna C": "6-9 shades" },
              { "Criterio": "Sensitivity", "Critério": "Sensitivity", "Rótulo coluna A": "Moderate", "Rótulo coluna B": "Low", "Rótulo coluna C": "Low to moderate" },
              { "Criterio": "Supervision", "Critério": "Supervision", "Rótulo coluna A": "In-person", "Rótulo coluna B": "Remote", "Rótulo coluna C": "Both" },
              { "Criterio": "Longevity", "Critério": "Longevity", "Rótulo coluna A": "2-3 years", "Rótulo coluna B": "2-3 years", "Rótulo coluna C": "3+ years" }
            ]} />

            <p className="text-center mt-6 text-dental-gray">
              The recommendation depends on the individual analysis of each case. During the evaluation, we consider your needs, routine, and specific dental characteristics.
            </p>
          </div>
        </section>
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<Sparkles className="w-5 h-5" />} />

        {/* Process Timeline */}
        <ScrollReveal animation="fade-up">
          <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-4 text-center text-dental-purple">
              Treatment Steps
            </h2>
            <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">
              From planning to post-treatment care, each step is designed for your comfort
            </p>

            <ProcessTimeline
              steps={[
                { number: 1, title: "Initial Evaluation", description: "Clinical exam, oral health analysis, and photographic documentation of the initial shade. Identification of stain type and treatment viability.", icon: <Search size={24} />, duration: "1st Visit" },
                { number: 2, title: "Planning", description: "Technique selection based on your individual characteristics. Detailed explanation of the process and expectation setting.", icon: <FileText size={24} />, duration: "1st Visit" },
                { number: 3, title: "Preparation", description: "Prophylaxis to remove surface stains. Treatment of cavities or gum issues when identified.", icon: <Sparkles size={24} />, duration: "If needed" },
                { number: 4, title: "Tray Fabrication (At-Home)", description: "Impression-taking and fabrication of custom trays for at-home whitening. The entire process is completed at the first visit, with precise fitting for even gel distribution and gum protection.", icon: <Scan size={24} />, duration: "1st Visit" },
                { number: 5, title: "Application", description: "In-office: Gum protection and supervised application. At-home: Detailed guidance on proper tray use.", icon: <Zap size={24} />, duration: "Per protocol" },
                { number: 6, title: "Follow-Up", description: "Progress evaluation and adjustments when needed. Sensitivity management with specific protocols.", icon: <Heart size={24} />, duration: "During treatment" },
                { number: 7, title: "Completion", description: "Final photographic documentation and personalized maintenance instructions to preserve results.", icon: <CheckCircle size={24} />, duration: "Final visit" }
              ]}
            />
          </div>
        </section>
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<Award className="w-5 h-5" />} />

        {/* Doctor Bio */}
        <ScrollReveal animation="fade-up">
          <DoctorBioSection
            locale="en"
            sectionTitle="Expertise & Experience in Cosmetic Dentistry"
            paragraphs={[
              "With over two decades in Ipanema, Dr. Carla has built her reputation by treating each patient individually, with time and attention. Her background includes 8 years as a military dentist at the Navy's Central Dental Clinic, experience that brought discipline and precision to her clinical practice.",
              "In her whitening protocols, she prioritizes safety and natural results — each case has its specific indication. The choice between in-office, supervised at-home, or combined whitening is defined during the evaluation, considering the tooth condition and the patient's expectations."
            ]}
            credentials={[
              { title: "Education", description: "Specialist in Prosthodontics and Implantology" },
              { title: "Experience", description: "Hundreds of whitening procedures performed" },
              { title: "Continuing Education", description: "Ongoing training in whitening techniques" },
              { title: "Protocols", description: "Personalized for minimal sensitivity" }
            ]}
          />
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<HelpCircle className="w-5 h-5" />} />

        {/* FAQ */}
        <ScrollReveal animation="fade-up">
          <ServiceFAQ
            title="Frequently Asked Questions About Whitening"
            faqs={faqs}
          />
        </ScrollReveal>

        {/* Final CTA */}
        <FinalServiceCTA
          locale="en"
          title="Find Out Which Protocol Is Right for You"
          description="Each case has its specific indication. During the evaluation, we analyze the stain type and determine whether in-office, at-home, or combined whitening is most suitable."
          ctaText="Find Out Which Protocol Is Right for You"
          whatsappMessage="Hello! I'd like to schedule a teeth whitening evaluation with Dr. Carla Christoph."
          onClickOverride={() => handleWhatsAppClick("Hello! I'd like to schedule a teeth whitening evaluation with Dr. Carla Christoph.")}
          icon={<Calendar className="w-8 h-8" />}
          variant="urgency"
        />

        <InternalLinkingOptimizer currentPage="en-teeth-whitening" />
        <StatsBar locale="en" />
      </EnPageLayout>
    </>
  );
};

export default EnTeethWhiteningPage;
