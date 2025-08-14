import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ClareamentoHeader from '@/components/landing/clareamento/ClareamentoHeader';
import ClareamentoHero from '@/components/landing/clareamento/ClareamentoHero';
import ClareamentoProblem from '@/components/landing/clareamento/ClareamentoProblem';
import ClareamentoGuide from '@/components/landing/clareamento/ClareamentoGuide';
import ClareamentoSocialProof from '@/components/landing/clareamento/ClareamentoSocialProof';
import ClareamentoFAQ from '@/components/landing/clareamento/ClareamentoFAQ';
import ClareamentoCTA from '@/components/landing/clareamento/ClareamentoCTA';
import ClareamentoFooter from '@/components/landing/clareamento/ClareamentoFooter';
import FloatingWhatsApp from '@/components/landing/FloatingWhatsApp';
import { clareamentoConfig } from '@/config/clareamentoConfig';
import { captureGCLID } from '@/utils/gclid';

const ClareamentoLandingPage: React.FC = () => {
  // Track page view and capture GCLID
  useEffect(() => {
    // Capture GCLID if present
    captureGCLID();
    
    // Track page view
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: clareamentoConfig.seo.title,
        page_location: window.location.href,
        page_path: '/lp/clareamento-dental',
        campaign: clareamentoConfig.campaign
      });
    }
  }, []);

  // Track scroll depth
  useEffect(() => {
    const trackScrollDepth = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      const milestones = [25, 50, 75, 100];
      const milestone = milestones.find(m => scrollPercentage >= m && !sessionStorage.getItem(`scroll_${m}`));
      
      if (milestone) {
        sessionStorage.setItem(`scroll_${milestone}`, 'true');
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'scroll_depth',
            scroll_percentage: milestone,
            page_path: '/lp/clareamento-dental'
          });
        }
      }
    };

    window.addEventListener('scroll', trackScrollDepth);
    return () => window.removeEventListener('scroll', trackScrollDepth);
  }, []);

  return (
    <>
      <Helmet>
        <title>{clareamentoConfig.seo.title}</title>
        <meta name="description" content={clareamentoConfig.seo.description} />
        <meta name="keywords" content={clareamentoConfig.seo.keywords?.join(', ')} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content={clareamentoConfig.seo.title} />
        <meta property="og:description" content={clareamentoConfig.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={clareamentoConfig.hero.backgroundImage} />
        
        {/* Google Tag Manager */}
        {clareamentoConfig.tracking.gtmId && (
          <script>
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${clareamentoConfig.tracking.gtmId}');
            `}
          </script>
        )}
      </Helmet>

      <div className="min-h-screen">
        {/* Header */}
        <ClareamentoHeader 
          whatsappNumber={clareamentoConfig.whatsapp.number}
          whatsappMessage={clareamentoConfig.whatsapp.message}
        />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <ClareamentoHero
            headline={clareamentoConfig.hero.headline}
            subheadline={clareamentoConfig.hero.subheadline}
            ctaText={clareamentoConfig.hero.ctaText}
            benefits={clareamentoConfig.benefits}
            backgroundImage={clareamentoConfig.hero.backgroundImage!}
            whatsappNumber={clareamentoConfig.whatsapp.number}
            whatsappMessage={clareamentoConfig.whatsapp.message}
          />

          {/* Problem Section */}
          <ClareamentoProblem
            title={clareamentoConfig.problem.title}
            description={clareamentoConfig.problem.description}
            problems={clareamentoConfig.problem.problems}
          />

          {/* Guide Section */}
          <ClareamentoGuide
            title={clareamentoConfig.guide.title}
            subtitle={clareamentoConfig.guide.subtitle}
          />

          {/* Social Proof Section */}
          <ClareamentoSocialProof
            title={clareamentoConfig.socialProof.title}
            testimonials={clareamentoConfig.socialProof.testimonials}
            stats={clareamentoConfig.socialProof.stats!}
          />

          {/* FAQ Section */}
          <ClareamentoFAQ
            title={clareamentoConfig.faq.title}
            questions={clareamentoConfig.faq.questions}
          />

          {/* CTA Section */}
          <ClareamentoCTA
            title={clareamentoConfig.cta.title}
            subtitle={clareamentoConfig.cta.subtitle}
            buttonText={clareamentoConfig.cta.buttonText}
            urgency={clareamentoConfig.cta.urgency}
            whatsappNumber={clareamentoConfig.whatsapp.number}
            whatsappMessage={clareamentoConfig.whatsapp.message}
          />
        </main>

        {/* Footer */}
        <ClareamentoFooter />

        {/* Floating WhatsApp */}
        <FloatingWhatsApp
          phoneNumber={clareamentoConfig.whatsapp.number}
          message={clareamentoConfig.whatsapp.message}
          campaign={clareamentoConfig.campaign}
          messageMatch={clareamentoConfig.messageMatch}
        />
      </div>
    </>
  );
};

export default ClareamentoLandingPage;