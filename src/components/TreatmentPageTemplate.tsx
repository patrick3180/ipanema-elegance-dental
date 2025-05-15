
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/treatment/PageHeader";
import PageNavigation from "@/components/treatment/PageNavigation";
import DefaultSection from "@/components/treatment/DefaultSection";
import BenefitsSection from "@/components/treatment/BenefitsSection";
import StepsSection from "@/components/treatment/StepsSection";
import FAQSection from "@/components/treatment/FAQSection";
import CTASection from "@/components/treatment/CTASection";
import { TreatmentPageProps, TreatmentSection } from "@/components/treatment/types";

const TreatmentPageTemplate = ({
  slug,
  title,
  metaDescription,
  introduction,
  sections,
  faqs = [],
  whatsappMessage = "Olá, gostaria de agendar uma avaliação",
  ctaHeading
}: TreatmentPageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Generate navigation items from sections
  const navigationItems = sections.map(section => ({
    id: section.id,
    title: section.title
  }));

  // Add FAQ if available
  if (faqs.length > 0) {
    navigationItems.push({
      id: "faq",
      title: "FAQ"
    });
  }

  // Helper function to render section based on its type
  const renderSection = (section: TreatmentSection) => {
    switch (section.type) {
      case "default":
        return <DefaultSection key={section.id} title={section.title} content={section.content} />;
      case "benefits":
        return <BenefitsSection key={section.id} title={section.title} content={section.content} />;
      case "steps":
        return <StepsSection key={section.id} title={section.title} content={section.content} />;
      default:
        return null;
    }
  };

  return (
    <PageLayout className="pt-16">
      <Helmet>
        <title>{title} | Dra. Carla Christoph</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <section className="section-spacing pt-8">
        <div className="container-custom">
          <PageHeader title={title} introduction={introduction} />
          
          <PageNavigation navigationItems={navigationItems} />

          <div className="prose prose-lg max-w-3xl mx-auto">
            {/* Render sections based on their type */}
            {sections.map(section => (
              <div id={section.id} key={section.id}>
                {renderSection(section)}
              </div>
            ))}

            {/* FAQ Section */}
            {faqs.length > 0 && (
              <div id="faq">
                <FAQSection faqs={faqs} />
              </div>
            )}

            {/* CTA Final */}
            <CTASection title={title} whatsappMessage={whatsappMessage} heading={ctaHeading} />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TreatmentPageTemplate;
