import React, { useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import ClareamentoHeader from '@/components/landing/clareamento/ClareamentoHeader';
import ClareamentoHero from '@/components/landing/clareamento/ClareamentoHero';
import ClareamentoProblem from '@/components/landing/clareamento/ClareamentoProblem';
import ClareamentoGuide from '@/components/landing/clareamento/ClareamentoGuide';
import ClareamentoCTA from '@/components/landing/clareamento/ClareamentoCTA';
import { clareamentoConfig } from '@/config/clareamentoConfig';
import { captureGCLID } from '@/utils/gclid';
import useScrollTracking from '@/hooks/useScrollTracking';
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';

// Lazy load non-critical components
const ClareamentoSocialProof = React.lazy(() => import('@/components/landing/clareamento/ClareamentoSocialProof'));
const ClareamentoFAQ = React.lazy(() => import('@/components/landing/clareamento/ClareamentoFAQ'));
const ClareamentoFooter = React.lazy(() => import('@/components/landing/clareamento/ClareamentoFooter'));
const FloatingWhatsApp = React.lazy(() => import('@/components/landing/FloatingWhatsApp'));

// Import skeletons
import SocialProofSkeleton from '@/components/skeleton/SocialProofSkeleton';
import FAQSkeleton from '@/components/skeleton/FAQSkeleton';
import FooterSkeleton from '@/components/skeleton/FooterSkeleton';
import WhatsAppSkeleton from '@/components/skeleton/WhatsAppSkeleton';

const ClareamentoLandingPage: React.FC = () => {
  // Preload critical images
  useCriticalImagePreload({
    images: [
      { src: clareamentoConfig.hero.backgroundImage!, width: 400 }
    ],
    enabled: true
  });

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

  // Use optimized scroll tracking
  useScrollTracking({ 
    pagePath: '/lp/clareamento-dental',
    enabled: process.env.NODE_ENV === 'production'
  });

  return (
    <>
      <Helmet>
        <title>{clareamentoConfig.seo.title}</title>
        <meta name="description" content={clareamentoConfig.seo.description} />
        <meta name="keywords" content={clareamentoConfig.seo.keywords?.join(', ')} />
        <meta name="robots" content="index, follow" />
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          as="image"
          href={clareamentoConfig.hero.backgroundImage}
          imageSrcSet={`${clareamentoConfig.hero.backgroundImage}?w=400&f=webp 400w, ${clareamentoConfig.hero.backgroundImage}?w=800&f=webp 800w`}
          imageSizes="(max-width: 768px) 100vw, 400px"
        />
        
        {/* Open Graph */}
        <meta property="og:title" content={clareamentoConfig.seo.title} />
        <meta property="og:description" content={clareamentoConfig.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={clareamentoConfig.hero.backgroundImage} />
        
        {/* Google Tag Manager */}
        {clareamentoConfig.tracking.gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${clareamentoConfig.tracking.gtmId}');
              `
            }}
          />
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

          {/* Social Proof Section - Lazy Loaded */}
          <Suspense fallback={<SocialProofSkeleton />}>
            <ClareamentoSocialProof
              title={clareamentoConfig.socialProof.title}
              testimonials={clareamentoConfig.socialProof.testimonials}
              stats={clareamentoConfig.socialProof.stats!}
            />
          </Suspense>

          {/* FAQ Section - Lazy Loaded */}
          <Suspense fallback={<FAQSkeleton />}>
            <ClareamentoFAQ
              title={clareamentoConfig.faq.title}
              questions={clareamentoConfig.faq.questions}
            />
          </Suspense>

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

        {/* Footer - Lazy Loaded */}
        <Suspense fallback={<FooterSkeleton />}>
          <ClareamentoFooter />
        </Suspense>

        {/* Floating WhatsApp - Lazy Loaded */}
        <Suspense fallback={<WhatsAppSkeleton />}>
          <FloatingWhatsApp
            phoneNumber={clareamentoConfig.whatsapp.number}
            message={clareamentoConfig.whatsapp.message}
            campaign={clareamentoConfig.campaign}
            messageMatch={clareamentoConfig.messageMatch}
          />
        </Suspense>
      </div>
    </>
  );
};

export default ClareamentoLandingPage;