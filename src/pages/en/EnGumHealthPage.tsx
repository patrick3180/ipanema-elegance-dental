import React from "react";
import { Link } from "react-router-dom";
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
import { Shield, AlertCircle, Activity, ArrowRight, Heart, Search, HelpCircle, CheckCircle } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import { InternalLinkingOptimizer } from '@/components/seo/InternalLinkingOptimizer';

const faqs = [
  { question: "Is it normal for gums to bleed when brushing?", answer: "No. Gum bleeding is a sign of inflammation, even if there's no pain. It may be gingivitis (reversible) or periodontitis (more advanced). It's worth seeking an evaluation to identify the cause and treat it before it progresses." },
  { question: "Can periodontitis be cured?", answer: "Periodontitis is manageable, but it's not 'curable' in the sense that it disappears on its own. With proper treatment and periodic maintenance, it's possible to stabilize the disease and prevent progression. Discipline in maintenance appointments is essential." },
  { question: "Can I get veneers or implants if I have gum disease?", answer: "First, the gums need to be treated. Veneers, lenses, and implants require a healthy gum foundation to function well and last. Dr. Carla integrates periodontal treatment into the case planning — one step at a time." },
  { question: "Can gum recession be treated?", answer: "It depends on the cause and extent. In some cases, gum graft procedures can cover the exposed root. In others, the goal is to stabilize the situation and prevent further progression. Clinical evaluation determines the best approach." },
  { question: "How often should I get a dental cleaning?", answer: "For most people, every 6 months. Patients with a history of periodontal disease may need shorter intervals — every 3 or 4 months. The ideal frequency is determined individually." },
  { question: "Can bad breath be a gum problem?", answer: "Yes. Persistent bad breath (halitosis) is frequently associated with periodontal disease — bacteria accumulated in gum pockets produce foul-smelling compounds. If bad breath doesn't improve with careful oral hygiene, it's worth investigating." }
];

const EnGumHealthPage = () => {
  const handleWhatsAppClick = async () => {
    if (window.dataLayer) { window.dataLayer.push({ event: 'whatsapp_click', event_category: 'Contact', event_action: 'Click', event_label: 'EN Gum Health CTA', page_type: 'service_page' }); }
    if (window.gtag) { window.gtag('event', 'conversion', { 'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9', 'event_callback': function () { console.log('Google Ads conversion tracked - EN Gum Health Page'); } }); }
    await sendGCLIDToWebhook('en_gum_health_service_page_cta');
    const phone = "5521993304045";
    const message = "Hello! I saw the page about gum health and would like to schedule a periodontal evaluation with Dr. Carla Christoph.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <EnPageLayout>
      <Helmet>
        <title>Gum Health & Periodontics in Ipanema | Dr. Carla Christoph</title>
        <meta name="description" content="Periodontal treatment in Ipanema with integrated care. Gingivitis, periodontitis, and gum recession. Dr. Carla Christoph, CRO-RJ 27.509." />
        <link rel="canonical" href="https://dracarlachristoph.com/en/gum-health" />
        <link rel="alternate" hrefLang="pt-BR" href="https://dracarlachristoph.com/saude-da-gengiva" />
        <link rel="alternate" hrefLang="en" href="https://dracarlachristoph.com/en/gum-health" />
        <link rel="alternate" hrefLang="x-default" href="https://dracarlachristoph.com/saude-da-gengiva" />
        <meta property="og:title" content="Gum Health & Periodontics in Ipanema | Integrated Care" />
        <meta property="og:description" content="Periodontal treatment with integrated follow-up by Dr. Carla Christoph in Ipanema." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/en/gum-health" />
        <meta property="og:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Dr. Carla Christoph - Dentist in Ipanema" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "MedicalProcedure", "name": "Periodontal Treatment (Gum Health)", "description": "Diagnosis and treatment of gum diseases with follow-up integrated into the comprehensive treatment plan", "procedureType": "Dental", "inLanguage": "en", "provider": { "@type": "Dentist", "name": "Dr. Carla Christoph", "telephone": "+5521993304045", "address": { "@type": "PostalAddress", "streetAddress": "Rua Visconde de Pirajá, 550 - Suite 1107", "addressLocality": "Ipanema", "addressRegion": "RJ", "postalCode": "22410-002", "addressCountry": "BR" } } })}</script>
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "inLanguage": "en", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) })}</script>
      </Helmet>

      {/* Speakable schema for voice search */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Gum Health & Periodontics in Ipanema",
        "url": "https://dracarlachristoph.com/en/gum-health",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".treatment-hero-title", ".treatment-hero-description", ".quick-answer-box"]
        },
        "inLanguage": "en"
      }) }} />

      <TreatmentHero
        locale="en"
        title="Gum Health in Ipanema"
        subtitle="Periodontics with Follow-Up by Dr. Carla Christoph"
        description="Healthy gums are the foundation of any dental treatment. Bleeding, recession, and persistent bad breath deserve attention before they become bigger problems."
        badges={["Periodontal Health", "Integrated Care", "CRO-RJ 27.509"]}
        doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
        breadcrumbs={[{ label: "Home", href: "/en" }, { label: "Treatments", href: "/en" }, { label: "Gum Health" }]}
      />

      <ScrollReveal animation="fade-up">
        <section className="py-8 bg-white"><div className="container-custom"><QuickAnswerBox locale="en" answer="Gum health (periodontics) treats gum diseases such as gingivitis and periodontitis, which cause bleeding, recession, and bad breath. At Dr. Carla Christoph's office in Ipanema (CRO-RJ 27.509), we perform periodontal evaluation, professional cleaning, and treatment of gum pockets. Gingivitis is reversible; periodontitis is manageable with treatment and periodic maintenance. For low-risk patients, cleaning every 6 months is recommended; for periodontal disease cases, every 3-4 months to maintain stability." /></div></section>
      </ScrollReveal>

      <SectionDivider variant="with-icon" icon={<AlertCircle size={20} />} />

      <ScrollReveal animation="fade-up">
        <EmpatheticPainPoints
          locale="en"
          painPoints={[
            { icon: <Activity className="w-6 h-6 text-dental-purple" />, strong: "Gums that bleed when brushing or flossing", description: "and you've been living with it for years thinking it's \"just normal\"?", borderColor: "border-dental-purple" },
            { icon: <AlertCircle className="w-6 h-6 text-dental-gold" />, strong: "Persistent bad breath despite good brushing", description: "that causes discomfort in social and professional interactions?", borderColor: "border-dental-gold" },
            { icon: <Heart className="w-6 h-6 text-dental-purple-soft" />, strong: "Receding gums or teeth that seem \"longer\"", description: "with sensitivity to cold that keeps getting worse over time?", borderColor: "border-dental-purple-soft" }
          ]}
          conclusion={<>Periodontal disease is silent — it usually doesn't hurt in the early stages.<br className="hidden md:block" /> When detected early, it's treatable and manageable.</>}
          callout={{ icon: <AlertCircle className="w-5 h-5 text-dental-gold" />, title: "Important", text: "Periodontitis takes 2 to 5 years to evolve from gingivitis, but once established, bone loss is irreversible. Treatment stops progression — that's why early detection is critical." }}
        />
      </ScrollReveal>

      <SectionDivider variant="with-icon" icon={<Shield size={20} />} />

      {/* Common Gum Problems — 3 Cards */}
      <ScrollReveal animation="fade-up">
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-4 text-center text-dental-purple">Most Common Gum Problems</h2>
            <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">Understand what each sign may mean</p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: <Activity className="w-8 h-8 text-dental-purple" />, bg: "bg-dental-purple/10", title: "Gingivitis", text: "Initial gum inflammation. Bleeding when brushing, redness, and swelling. Reversible with proper treatment and good hygiene. Does not cause bone loss." },
                { icon: <AlertCircle className="w-8 h-8 text-dental-gold" />, bg: "bg-dental-gold/10", title: "Periodontitis", text: "Progression of untreated gingivitis. Affects the supporting bone around teeth. Can cause tooth mobility and, in advanced cases, tooth loss. Manageable but requires follow-up." },
                { icon: <ArrowRight className="w-8 h-8 text-dental-purple" />, bg: "bg-dental-purple/10", title: "Gum Recession", text: "The gum recedes, exposing part of the tooth root. Causes sensitivity and changes smile aesthetics. May be associated with aggressive brushing, bruxism, or periodontal disease." }
              ].map((card, i) => (
                <ScrollReveal key={i} animation="fade-up" delay={i * 150}>
                  <div className="text-center">
                    <div className={`w-16 h-16 ${card.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>{card.icon}</div>
                    <h3 className="text-xl font-semibold text-dental-purple mb-3">{card.title}</h3>
                    <p className="text-dental-gray">{card.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Doctor Bio */}
      <ScrollReveal animation="fade-up">
        <DoctorBioSection
          locale="en"
          sectionTitle="Healthy Gums Are a Prerequisite"
          badgeText="Integrated Care"
          paragraphs={[
            "With over two decades in Ipanema, Dr. Carla has built her reputation by treating each patient individually, with time and attention. Her background includes 8 years as a military dentist at the Brazilian Navy Dental Center, an experience that brought discipline and precision to her clinical practice.",
            <React.Fragment key="bio-links">Dr. Carla treats periodontal health as the foundation for any procedure. It doesn't make sense to invest in{" "}<Link to="/en/veneers-and-lenses" className="text-dental-gold hover:text-dental-purple transition-colors font-medium">veneers</Link>,{" "}<Link to="/en/dental-implants" className="text-dental-gold hover:text-dental-purple transition-colors font-medium">implants</Link>, or{" "}<Link to="/en/dental-prosthetics" className="text-dental-gold hover:text-dental-purple transition-colors font-medium">prosthetics</Link>{" "}on compromised gums. Periodontal treatment is done in partnership with a specialized periodontist, and Dr. Carla oversees all progress to integrate gum care into the patient's complete treatment plan.</React.Fragment>
          ]}
          credentials={[
            { title: "Integrated vision", description: "Gum health as the foundation for any aesthetic treatment" },
            { title: "Specialized partnership", description: "Treatment with periodontist and Dr. Carla's oversight" },
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
            <h2 className="heading-lg mb-4 text-center text-dental-purple">How We Care for Your Gum Health</h2>
            <div className="max-w-4xl mx-auto">
              <ProcessTimeline steps={[
                { number: 1, title: "Evaluation with Dr. Carla", description: "Detailed clinical gum exam, periodontal probing, and X-rays when needed. Identification of the problem stage.", icon: <Search size={24} />, duration: "1st Appointment" },
                { number: 2, title: "Periodontal Treatment", description: "Deep cleaning (scaling), treatment with a specialized periodontist when indicated. Control of infection and inflammation.", icon: <Shield size={24} />, duration: "1-4 sessions" },
                { number: 3, title: "Re-Evaluation", description: "After treatment, Dr. Carla re-evaluates the gum response and defines next steps — maintenance, complementary treatments, or referral for aesthetic procedures.", icon: <CheckCircle size={24} />, duration: "30-45 days" },
                { number: 4, title: "Periodic Maintenance", description: "Periodontal disease is manageable but requires follow-up. Regular maintenance appointments prevent recurrence and maintain gum health.", icon: <Heart size={24} />, duration: "Every 3-6 months" }
              ]} />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Gum & General Health Connection */}
      <ScrollReveal animation="fade-up">
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">The Connection Between Gums and Overall Health</h2>
            <div className="max-w-3xl mx-auto space-y-6 text-dental-gray leading-relaxed">
              <p>Gum health is connected to the health of the body as a whole. Studies show an association between periodontal disease and conditions such as diabetes, cardiovascular disease, and pregnancy complications. Treating gums isn't just an aesthetic concern — it's caring for your systemic health.</p>
              <p>In practice, what we see most at the office are patients who had been living with gum bleeding for years without realizing its severity. After treatment, they report not only improvement in their mouth but an overall feeling of health care they had been postponing.</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <SectionDivider variant="with-icon" icon={<HelpCircle size={20} />} />
      <ScrollReveal animation="fade-up"><ServiceFAQ title="Questions About Gum Health" faqs={faqs} /></ScrollReveal>

      <FinalServiceCTA locale="en" icon={<Heart className="w-8 h-8" />} title="Take Care of Your Smile's Foundation" description="Schedule your periodontal evaluation. Early treatment makes all the difference." ctaText="Schedule Evaluation" whatsappMessage="Hello! I saw the page about gum health and would like to schedule a periodontal evaluation with Dr. Carla Christoph." onClickOverride={handleWhatsAppClick} />
      <InternalLinkingOptimizer currentPage="en-gum-health" />
      <StatsBar locale="en" />
    </EnPageLayout>
  );
};

export default EnGumHealthPage;
