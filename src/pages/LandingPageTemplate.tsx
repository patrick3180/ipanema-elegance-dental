import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { LandingPageConfig } from "@/types/LandingPageConfig";
import { lentesConfig } from "@/config/landingPageConfigs";

// Landing Page Components
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import GuideSection from "@/components/landing/GuideSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import ProcessSection from "@/components/landing/ProcessSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import LandingFooter from "@/components/landing/LandingFooter";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";

// SEO
import { Helmet } from "react-helmet-async";

interface LandingPageTemplateProps {
  config?: LandingPageConfig;
}

const LandingPageTemplate = ({ config }: LandingPageTemplateProps) => {
  const { template } = useParams<{ template: string }>();
  
  // Get config - use passed config or default to lentes
  const pageConfig = config || lentesConfig;
  
  // Scroll depth tracking
  useEffect(() => {
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      // Track at 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !window.sessionStorage.getItem(`scroll_${milestone}`)) {
          window.sessionStorage.setItem(`scroll_${milestone}`, 'true');
          
          if (window.dataLayer) {
            window.dataLayer.push({
              event: 'scroll_depth',
              event_category: 'Engagement',
              event_action: 'Scroll',
              event_label: `${milestone}% - ${pageConfig.campaign}`,
              scroll_depth: milestone,
              campaign: pageConfig.campaign
            });
          }
        }
      });
    };

    window.addEventListener('scroll', trackScrollDepth);
    return () => window.removeEventListener('scroll', trackScrollDepth);
  }, [pageConfig.campaign]);

  // Page view tracking
  useEffect(() => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        event_category: 'Landing Page',
        event_action: 'View',
        event_label: pageConfig.campaign,
        campaign: pageConfig.campaign,
        page_title: pageConfig.seo.title,
        page_location: window.location.href
      });
    }
  }, [pageConfig]);

  return (
    <>
      {/* SEO Head */}
      <Helmet>
        <title>{pageConfig.seo.title}</title>
        <meta name="description" content={pageConfig.seo.description} />
        <meta name="keywords" content={pageConfig.seo.keywords?.join(', ')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageConfig.seo.title} />
        <meta property="og:description" content={pageConfig.seo.description} />
        <meta property="og:type" content="website" />
        
        {/* No index for landing pages (optional) */}
        <meta name="robots" content="noindex, nofollow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={window.location.href} />
        
        {/* Additional tracking scripts */}
        {pageConfig.tracking.gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${pageConfig.tracking.gtmId}');
              `
            }}
          />
        )}
      </Helmet>

      {/* Landing Page Content */}
      <div className="min-h-screen bg-dental-beige">
        {/* Hero Section */}
        <HeroSection
          headline={pageConfig.hero.headline}
          subheadline={pageConfig.hero.subheadline}
          ctaText={pageConfig.hero.ctaText}
          benefits={pageConfig.benefits}
          backgroundImage={pageConfig.hero.backgroundImage}
          campaign={pageConfig.campaign}
          phoneNumber={pageConfig.contact.whatsappNumber}
          whatsappMessage={pageConfig.contact.whatsappMessage}
        />

        {/* Problem Section */}
        <ProblemSection
          title={pageConfig.problem.title}
          description={pageConfig.problem.description}
          problems={pageConfig.problem.problems}
        />

        {/* Guide Section */}
        <GuideSection
          title={pageConfig.guide.title}
          subtitle={pageConfig.guide.subtitle}
          steps={pageConfig.guide.steps}
        />

        {/* Social Proof Section */}
        <SocialProofSection
          title={pageConfig.socialProof.title}
          testimonials={pageConfig.socialProof.testimonials}
          stats={pageConfig.socialProof.stats}
        />

        {/* Process Section */}
        <ProcessSection
          title={pageConfig.process.title}
          subtitle={pageConfig.process.subtitle}
          steps={pageConfig.process.steps}
        />

        {/* FAQ Section */}
        <FAQSection
          title={pageConfig.faq.title}
          questions={pageConfig.faq.questions}
        />

        {/* Final CTA Section */}
        <CTASection
          title={pageConfig.cta.title}
          subtitle={pageConfig.cta.subtitle}
          buttonText={pageConfig.cta.buttonText}
          urgency={pageConfig.cta.urgency}
          campaign={pageConfig.campaign}
          phoneNumber={pageConfig.contact.whatsappNumber}
          whatsappMessage={pageConfig.contact.whatsappMessage}
        />

        {/* Footer */}
        <LandingFooter
          doctorName={pageConfig.contact.doctorName}
          clinicName={pageConfig.contact.clinicName}
          phoneNumber={pageConfig.contact.whatsappNumber}
        />

        {/* Floating WhatsApp (Mobile only) */}
        <FloatingWhatsApp
          phoneNumber={pageConfig.contact.whatsappNumber}
          message={pageConfig.contact.whatsappMessage}
          campaign={pageConfig.campaign}
        />
      </div>
    </>
  );
};

export default LandingPageTemplate;