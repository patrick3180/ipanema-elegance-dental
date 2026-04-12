
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import PageHeader from "@/components/treatment/PageHeader";
import PageNavigation from "@/components/treatment/PageNavigation";
import DefaultSection from "@/components/treatment/DefaultSection";
import BenefitsSection from "@/components/treatment/BenefitsSection";
import StepsSection from "@/components/treatment/StepsSection";
import FAQSection from "@/components/treatment/FAQSection";
import CTASection from "@/components/treatment/CTASection";
import LazySection from "@/components/LazySection";
import { TreatmentPageProps, TreatmentSection } from "@/components/treatment/types";

const TreatmentPageTemplate = ({
  slug,
  title,
  metaDescription,
  introduction,
  sections,
  faqs = [],
  whatsappMessage = "Olá, gostaria de agendar uma consulta",
  ctaHeading,
  preImageUrl
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
        return <DefaultSection key={section.id} title={section.title} content={section.content} imageUrl={section.imageUrl} />;
      case "benefits":
        return <BenefitsSection key={section.id} title={section.title} content={section.content} />;
      case "steps":
        return <StepsSection key={section.id} title={section.title} content={section.content} imageUrl={section.imageUrl} />;
      default:
        return null;
    }
  };

  return (
    <PageLayout className="pt-16">
      <Helmet>
        <title>{title} | Dra. Carla Christoph</title>
        <meta name="description" content={metaDescription} />
        
        {/* Mobile optimization meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Preload critical resources */}
        <link rel="preload" as="image" href="https://images.ctfassets.net" crossOrigin="anonymous" />
      </Helmet>

      <section className="section-spacing pt-8">
        <div className="container-custom">
          {/* Breadcrumb navigation */}
          <ServiceBreadcrumb serviceName={title} serviceSlug={slug} />
          
          <PageHeader title={title} introduction={introduction} />
          
          <PageNavigation navigationItems={navigationItems} />

          <div className="prose prose-lg max-w-3xl mx-auto">
            {/* Render sections with lazy loading for mobile performance */}
            {sections.map((section, index) => (
              <div id={section.id} key={section.id}>
                {index < 2 ? (
                  // Load first 2 sections immediately
                  renderSection(section)
                ) : (
                  // Lazy load remaining sections
                  <LazySection>
                    {renderSection(section)}
                  </LazySection>
                )}
              </div>
            ))}

            {/* Pre-FAQ Image */}
            {preImageUrl && (
              <LazySection>
                <div className="my-12 text-center">
                  <img 
                    src={preImageUrl} 
                    alt="Antes e depois do clareamento dental - comparação de resultados" 
                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
              </LazySection>
            )}

            {/* FAQ Section with lazy loading */}
            {faqs.length > 0 && (
              <div id="faq">
                <LazySection>
                  <FAQSection faqs={faqs} />
                </LazySection>
              </div>
            )}

            {/* CTA Final - always visible */}
            <CTASection title={title} whatsappMessage={whatsappMessage} heading={ctaHeading} />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TreatmentPageTemplate;
