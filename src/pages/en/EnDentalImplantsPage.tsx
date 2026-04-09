import React from "react";
import { Helmet } from "react-helmet-async";
import EnPageLayout from "@/components/en/EnPageLayout";
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
  Cpu, Scan, Shield, Heart, Activity, Clock, CheckCircle,
  Award, HelpCircle, Smile, Sparkles, ArrowRight, AlertCircle
} from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const EnDentalImplantsPage = () => {
  const handleWhatsAppClick = async (message?: string) => {
    const gclid = new URLSearchParams(window.location.search).get('gclid');
    if (gclid) localStorage.setItem('gclid', gclid);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', { 'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9', 'value': 1.0, 'currency': 'BRL' });
    }
    await sendGCLIDToWebhook('en_dental_implants');
    const defaultMessage = "Hello! I saw the dental implants page and would like to schedule an evaluation with Dr. Carla Christoph.";
    window.open(`https://wa.me/5521993304045?text=${encodeURIComponent(message || defaultMessage)}`, "_blank");
  };

  const faqs = [
    { question: "What are dental implants?", answer: "They are biocompatible titanium pins surgically placed in the jawbone, replacing the root of the lost tooth. On these pins, we fix crowns, bridges, or complete prostheses, restoring chewing function, aesthetics, and speech." },
    { question: "Is the procedure painful?", answer: "The surgery is performed under local anesthesia, with no pain during the procedure. Post-op recovery is generally smooth, with mild discomfort controlled by medication. Most patients return to normal activities within 2 to 3 days." },
    { question: "How long does the complete treatment take?", answer: "Timeframe varies by case. On average, 4 to 6 months from implant placement to the definitive prosthesis, including the osseointegration period (3 to 6 months). In selected immediate-loading cases, the provisional prosthesis is placed as planned." },
    { question: "Can anyone get implants?", answer: "Most healthy adults are candidates. We evaluate overall health, bone quantity and quality, habits (smoking), and systemic conditions (controlled diabetes). In cases of insufficient bone, bone grafts can make treatment viable." },
    { question: "How long do implants last?", answer: "With proper hygiene and regular maintenance, implants can last decades or a lifetime. Studies show a success rate above 95% at 10 years. The prosthetic crown may need replacement after 10 to 15 years depending on wear." },
    { question: "How do I maintain my implants?", answer: "Thorough hygiene with brushing, flossing, and specific interdental brushes. Semi-annual visits for professional check-ups, periodic X-rays, and peri-implant health assessment. Avoid excessive overloading and trauma." },
    { question: "Is there implant rejection?", answer: "Titanium is biocompatible and does not cause immune rejection. Failures occur due to infection, early overloading, smoking, or inadequate hygiene — not rejection. Success rate exceeds 95% when protocols are followed." },
    { question: "Can I get implants with limited bone?", answer: "Yes. Bone grafting techniques (autogenous, biomaterial) or sinus lift procedures can increase bone volume. Short or angled implants are also alternatives. Imaging exams allow us to plan the best solution for each case." },
    { question: "What's the difference between an implant and a prosthesis?", answer: "The implant is the titanium pin fixed in the bone (replaces the root). The prosthesis is the visible part (crown, bridge, or denture) that connects to the implant. The complete set restores function and aesthetics." },
    { question: "Can smokers get implants?", answer: "Yes, but smoking reduces the success rate (from 95% to approximately 85%) by impairing healing and osseointegration. We recommend quitting smoking at least 2 weeks before surgery and during healing. Individual evaluation is essential." },
    { question: "Can diabetics get implants?", answer: "Yes, as long as diabetes is controlled (glycated hemoglobin below 7%). Prior medical evaluation is important. Adequate glycemic control ensures normal healing and a success rate equivalent to non-diabetics." },
    { question: "Do you accept dental insurance?", answer: "Our practice is private, which allows us to dedicate the necessary time to each patient and use only top-tier materials. At the first consultation, we present a detailed and transparent estimate." }
  ];

  return (
    <>
      <Helmet>
        <title>Dental Implants in Ipanema | Dr. Carla Christoph</title>
        <meta name="description" content="Dental implants in Ipanema with 3D digital planning and minimally invasive techniques. Over 20 years of experience in oral rehabilitation. CRO-RJ 27.509." />
        <link rel="canonical" href="https://dracarlachristoph.com/en/dental-implants" />
        <link rel="alternate" hrefLang="pt-BR" href="https://dracarlachristoph.com/implantes-dentarios" />
        <link rel="alternate" hrefLang="en" href="https://dracarlachristoph.com/en/dental-implants" />
        <link rel="alternate" hrefLang="x-default" href="https://dracarlachristoph.com/implantes-dentarios" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org", "@type": "MedicalProcedure",
            "name": "Dental Implants", "description": "Oral rehabilitation with biocompatible titanium implants and implant-supported prostheses",
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
        {/* Hero */}
        <TreatmentHero
          locale="en"
          title="Dental Implants & Oral Rehabilitation"
          subtitle="Specialty of Dr. Carla Christoph"
          description="Restore chewing function, natural aesthetics, and confidence with biocompatible titanium implants. 3D digital planning and minimally invasive techniques for predictable, lasting results."
          badges={["20+ years of experience", "CRO-RJ 27.509", "iTero Element 5D"]}
          doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
          breadcrumbs={[
            { label: "Home", href: "/en" },
            { label: "Treatments", href: "/en" },
            { label: "Dental Implants" }
          ]}
        />

        {/* Quick Answer Box */}
        <section className="py-8 bg-white">
          <div className="container-custom">
            <QuickAnswerBox
              answer="Dental implants are artificial titanium roots placed in the bone to replace missing teeth. At Dr. Carla Christoph's practice in Ipanema, we perform 3D digital planning with iTero Element 5D, minimally invasive techniques, and personalized prostheses. With over 20 years of experience (CRO-RJ 27.509), we offer everything from single implants to complete rehabilitations like All-on-4 and fixed protocols, with treatments lasting 3 to 6 months depending on the case."
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
                strong: "You avoid certain hard foods",
                description: "for fear of hurting your gums or your removable denture coming loose?",
                borderColor: "border-dental-purple"
              },
              {
                icon: <AlertCircle className="w-6 h-6 text-dental-gold" />,
                strong: "You feel insecure with a denture that loosens when speaking",
                description: "or that requires adhesive daily?",
                borderColor: "border-dental-gold"
              },
              {
                icon: <Activity className="w-6 h-6 text-dental-purple-soft" />,
                strong: "You notice progressive bone loss",
                description: "and fear the situation will worsen over time, making treatment more difficult in the future?",
                borderColor: "border-dental-purple-soft"
              }
            ]}
            conclusion={<>Dental implants restore the confidence to eat, speak, and smile without worry.<br className="hidden md:block" /> Let's evaluate the best solution for your case.</>}
            callout={{
              icon: <Clock className="w-5 h-5 text-dental-gold" />,
              title: "Important",
              text: "Bone loss accelerates after extraction — the longer you go without a tooth, the more bone is lost, potentially requiring grafting. Early treatment preserves your natural bone structure."
            }}
          />
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<Cpu className="w-5 h-5" />} />

        {/* 4 Implant Modality Cards */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Available Dental Implant Options
              </h2>
              <p className="text-lg text-dental-gray">
                Each technique is recommended based on individual characteristics. Learn about the options.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Single Implant */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
                <div className="aspect-[5/4] lg:aspect-square relative">
                  <img src="/lovable-uploads/implante-unitario.webp" alt="Single dental implant replacing one missing tooth" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/95 via-dental-purple/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white min-h-28 sm:min-h-32 md:min-h-36">
                    <h3 className="text-xl font-display font-bold mb-2">Single Implant</h3>
                    <p className="text-sm text-white/90 leading-relaxed line-clamp-4 md:line-clamp-5 lg:line-clamp-6">
                      Replaces a single missing tooth without compromising adjacent teeth. Titanium pin + pure ceramic crown for a natural, lasting result.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-4 relative z-10">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="details" className="border-none">
                      <AccordionTrigger className="text-dental-purple font-semibold hover:no-underline">See Full Details</AccordionTrigger>
                      <AccordionContent className="text-dental-gray space-y-3 pt-2">
                        <div><p className="font-semibold text-dental-purple mb-1">What it is:</p><p className="text-sm">Permanent replacement of a single missing tooth without needing to wear down adjacent teeth. The biocompatible titanium pin is placed in the bone, replacing the root of the absent tooth.</p></div>
                        <div><p className="font-semibold text-dental-purple mb-1">When indicated:</p><p className="text-sm">Tooth loss from trauma, non-restorable fracture, tooth with indicated extraction, or congenital tooth absence.</p></div>
                        <div><p className="font-semibold text-dental-purple mb-1">Material:</p><p className="text-sm">Medical-grade titanium pin + E-max or zirconia ceramic crown, providing strength and natural aesthetics.</p></div>
                        <div><p className="font-semibold text-dental-purple mb-1">Timeframe:</p><p className="text-sm">4 to 6 months, including the osseointegration period.</p></div>
                        <div><p className="font-semibold text-dental-purple mb-1">Advantages:</p><p className="text-sm">Preserves healthy adjacent teeth, natural aesthetics with a real-tooth appearance, superior durability to conventional bridges, and total comfort.</p></div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* Card 2: Implant-Supported Bridge */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
                <div className="aspect-[5/4] lg:aspect-square relative">
                  <img src="/lovable-uploads/ponte-implante.webp" alt="Fixed bridge supported by dental implants replacing multiple teeth" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/95 via-dental-purple/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white min-h-28 sm:min-h-32 md:min-h-36">
                    <h3 className="text-xl font-display font-bold mb-2">Implant-Supported Bridge</h3>
                    <p className="text-sm text-white/90 leading-relaxed line-clamp-4 md:line-clamp-5 lg:line-clamp-6">
                      Rehabilitates multiple adjacent missing teeth with two or more implants. Superior stability to conventional bridges without wearing down healthy teeth.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-4 relative z-10">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="details" className="border-none">
                      <AccordionTrigger className="text-dental-purple font-semibold hover:no-underline">See Full Details</AccordionTrigger>
                      <AccordionContent className="text-dental-gray space-y-3 pt-2">
                        <div><p className="font-semibold text-dental-purple mb-1">What it is:</p><p className="text-sm">Two or more implants support a fixed bridge of multiple consecutive teeth. Ideal solution when 3 or more adjacent teeth are missing.</p></div>
                        <div><p className="font-semibold text-dental-purple mb-1">When indicated:</p><p className="text-sm">Loss of 3 to 4 consecutive teeth where a separate implant for each tooth isn't necessary.</p></div>
                        <div><p className="font-semibold text-dental-purple mb-1">Material:</p><p className="text-sm">Titanium implants + monolithic zirconia or porcelain-fused-to-metal bridge.</p></div>
                        <div><p className="font-semibold text-dental-purple mb-1">Timeframe:</p><p className="text-sm">5 to 7 months.</p></div>
                        <div><p className="font-semibold text-dental-purple mb-1">Advantages:</p><p className="text-sm">Doesn't damage natural teeth, maximum chewing stability, total comfort without removable prosthetics, and an extremely natural look.</p></div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* Card 3: All-on-4/6 Protocol */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
                <div className="aspect-[5/4] lg:aspect-square relative">
                  <img src="/lovable-uploads/all-in-4.webp" alt="All-on-4 protocol for complete arch rehabilitation on implants" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/95 via-dental-purple/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white min-h-28 sm:min-h-32 md:min-h-36">
                    <h3 className="text-xl font-display font-bold mb-2">All-on-4/6 Protocol</h3>
                    <p className="text-sm text-white/90 leading-relaxed line-clamp-4 md:line-clamp-5 lg:line-clamp-6">
                      Full arch rehabilitation with just 4 to 6 strategically positioned implants. Complete fixed prosthesis with excellent value.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-4 relative z-10">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="details" className="border-none">
                      <AccordionTrigger className="text-dental-purple font-semibold hover:no-underline">See Full Details</AccordionTrigger>
                      <AccordionContent className="text-dental-gray space-y-3 pt-2">
                        <div><p className="font-semibold text-dental-purple mb-1">What it is:</p><p className="text-sm">A complete fixed prosthesis for an entire arch (upper or lower) supported by 4 to 6 strategically positioned implants. Posterior implants are angled to maximize available bone.</p></div>
                        <div><p className="font-semibold text-dental-purple mb-1">When indicated:</p><p className="text-sm">Total or near-total tooth loss in an arch, dissatisfaction with removable dentures, or cases where individual implants for each tooth aren't feasible.</p></div>
                        <div><p className="font-semibold text-dental-purple mb-1">Material:</p><p className="text-sm">Special implants (some angled) + high-resistance acrylic or zirconia prosthesis with internal metal framework.</p></div>
                        <div><p className="font-semibold text-dental-purple mb-1">Timeframe:</p><p className="text-sm">Provisional prosthesis placed as planned; definitive prosthesis after 4 to 6 months.</p></div>
                        <div><p className="font-semibold text-dental-purple mb-1">Advantages:</p><p className="text-sm">Excellent value requiring fewer implants. Fully fixed prosthesis, superior comfort to dentures, secure chewing, and restored self-confidence.</p></div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* Card 4: Overdenture */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
                <div className="aspect-[5/4] lg:aspect-square relative">
                  <img src="/lovable-uploads/overdenture-clips-retencao.webp" alt="Overdenture removable prosthesis stabilized by dental implants" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/95 via-dental-purple/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white min-h-28 sm:min-h-32 md:min-h-36">
                    <h3 className="text-xl font-display font-bold mb-2">Overdenture</h3>
                    <p className="text-sm text-white/90 leading-relaxed line-clamp-4 md:line-clamp-5 lg:line-clamp-6">
                      Removable prosthesis with precision attachment over 2 to 4 implants. Superior stability and retention compared to conventional dentures with accessible investment.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-4 relative z-10">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="details" className="border-none">
                      <AccordionTrigger className="text-dental-purple font-semibold hover:no-underline">See Full Details</AccordionTrigger>
                      <AccordionContent className="text-dental-gray space-y-3 pt-2">
                        <div><p className="font-semibold text-dental-purple mb-1">What it is:</p><p className="text-sm">A removable complete prosthesis that snaps with precision onto 2 to 4 implants through clip systems (bar or o-ring). Combines implant stability with easy removal for cleaning.</p></div>
                        <div><p className="font-semibold text-dental-purple mb-1">When indicated:</p><p className="text-sm">When the patient wants more stability than a conventional denture but prefers a removable prosthesis for easier cleaning, or when a fixed protocol isn't feasible.</p></div>
                        <div><p className="font-semibold text-dental-purple mb-1">Material:</p><p className="text-sm">2 to 4 titanium implants + acrylic prosthesis with bar-type or o-ring (locator) attachment system.</p></div>
                        <div><p className="font-semibold text-dental-purple mb-1">Timeframe:</p><p className="text-sm">4 to 6 months.</p></div>
                        <div><p className="font-semibold text-dental-purple mb-1">Advantages:</p><p className="text-sm">Much more stable than a conventional denture, doesn't come loose when speaking or chewing. Removable for easy hygiene. Lower investment compared to fixed protocol. Restores confidence and comfort.</p></div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-8 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-xl text-dental-gray mb-6">
              Want to know which modality fits your case?
            </p>
            <button
              onClick={() => handleWhatsAppClick("Hello! I'd like to know which implant modality is recommended for my case.")}
              className="inline-flex items-center justify-center px-8 py-4 bg-dental-gold hover:bg-dental-gold/90 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Book Your Evaluation
              <ArrowRight size={20} className="ml-2" />
            </button>
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<Sparkles className="w-5 h-5" />} />

        {/* Treatment Differentiators */}
        <section className="py-12 bg-dental-beige/20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                What Sets Our Treatment Apart
              </h2>
              <p className="text-lg text-dental-gray">
                How we work to deliver safety and predictability
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4"><Scan className="w-12 h-12 text-dental-purple" /></div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-3">3D Digital Planning</h3>
                  <p className="text-dental-gray">Use of technologies like 3D oral scanner to assist in implant positioning and prosthesis fabrication.</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4"><Shield className="w-12 h-12 text-dental-purple" /></div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-3">Internationally Recognized Implants</h3>
                  <p className="text-dental-gray">We work with globally recognized brands, featuring treated surfaces that promote osseointegration and long-term scientific validation.</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4"><Heart className="w-12 h-12 text-dental-purple" /></div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-3">Ongoing Follow-Up</h3>
                  <p className="text-dental-gray">Personalized maintenance protocol with periodic check-ups to ensure peri-implant health and maximum longevity.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<Activity className="w-5 h-5" />} />

        {/* Process Timeline */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Treatment Journey: From Planning to Your Complete Smile
              </h2>
              <p className="text-lg text-dental-gray">
                Each step is carefully executed for predictable results
              </p>
            </div>

            <ProcessTimeline
              steps={[
                { number: 1, title: "Evaluation & Exam Requisition", description: "Complete clinical exam, arch digitization with 3D oral scanner, detailed case study, and imaging exam requisition for precise treatment planning.", icon: <Scan className="w-6 h-6" />, duration: "1 visit" },
                { number: 2, title: "Implant Placement with Millimetric Precision", description: "Minimally invasive technique when indicated, reducing discomfort and accelerating recovery. Provisional prosthesis in selected cases, according to the defined plan.", icon: <Activity className="w-6 h-6" />, duration: "1-2 hours" },
                { number: 3, title: "Osseointegration Period", description: "We await the biological union between titanium and bone (3 to 6 months). During this period, you wear a provisional prosthesis when needed. Periodic follow-up to monitor healing and integration.", icon: <Clock className="w-6 h-6" />, duration: "3-6 months" },
                { number: 4, title: "Digital Impression & Definitive Prosthesis", description: "Impression with iTero Element 5D or conventional method. Fabrication of the definitive prosthesis in pure ceramic with natural color, shape, and translucency. Placement and final adjustments for comfort and natural aesthetics.", icon: <CheckCircle className="w-6 h-6" />, duration: "2-3 visits" },
                { number: 5, title: "Maintenance & Monitoring", description: "Personalized hygiene protocol and periodic check-ups (initially every 6 months). Peri-implant health monitoring, necessary adjustments, and guidance for treatment longevity.", icon: <Heart className="w-6 h-6" />, duration: "Every 6 months" }
              ]}
            />
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<Award className="w-5 h-5" />} />

        {/* Doctor Bio */}
        <ScrollReveal animation="fade-up">
          <DoctorBioSection
            locale="en"
            sectionTitle="Dr. Carla Christoph"
            paragraphs={[
              "With over two decades in Ipanema, Dr. Carla has built her reputation by treating each patient individually, with time and attention. Her background includes 8 years as a military dentist at the Navy's Central Dental Clinic, experience that brought discipline and precision to her clinical practice.",
              "Her training in Implantology allows her to plan everything from single cases to complete rehabilitations with safety and predictability. Each implant is positioned based on digital planning, considering aesthetics and long-term function."
            ]}
            credentials={[
              { title: "Education", description: "Specialist in Prosthodontics and Implantology" },
              { title: "Experience", description: "20+ years, including 8 in the Navy" },
              { title: "Technology", description: "iTero Element 5D, digital smile planning" },
              { title: "Approach", description: "Individualized consultations, minimum 1 hour" }
            ]}
          />
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<HelpCircle className="w-5 h-5" />} />

        {/* FAQs */}
        <ScrollReveal animation="fade-up">
          <ServiceFAQ
            title="Frequently Asked Questions About Dental Implants"
            faqs={faqs}
          />
        </ScrollReveal>

        {/* Final CTA */}
        <FinalServiceCTA
          locale="en"
          title="Ready to Restore Your Smile?"
          description="Schedule your evaluation and digital planning consultation. We'll assess your case individually and present the best solutions for your needs."
          ctaText="Book Your Evaluation"
          whatsappMessage="Hello! I saw the dental implants page and would like to schedule an evaluation with Dr. Carla Christoph."
          onClickOverride={() => handleWhatsAppClick()}
          icon={<Smile className="w-8 h-8" />}
          variant="primary"
          phoneNumber="(21) 99330-4045"
          businessHours="Monday to Friday, 9AM to 7PM"
        />
        <StatsBar locale="en" />
      </EnPageLayout>
    </>
  );
};

export default EnDentalImplantsPage;
