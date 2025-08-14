import React, { useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import ClareamentoHeader from '@/components/landing/clareamento/ClareamentoHeader';
import ClareamentoHero from '@/components/landing/clareamento/ClareamentoHero';
import ClareamentoProblem from '@/components/landing/clareamento/ClareamentoProblem';
import ClareamentoGuide from '@/components/landing/clareamento/ClareamentoGuide';
import ClareamentoCTA from '@/components/landing/clareamento/ClareamentoCTA';
import { MobileOptimizer } from '@/components/performance/MobileOptimizer';
import NonCriticalCSSLoader from '@/components/performance/NonCriticalCSSLoader';
import { clareamentoConfig } from '@/config/clareamentoConfig';
import { captureGCLID } from '@/utils/gclid';
import useScrollTracking from '@/hooks/useScrollTracking';
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';

// Aggressive lazy loading for better LCP performance
const ClareamentoSocialProof = React.lazy(() => 
  import('@/components/landing/clareamento/ClareamentoSocialProof').then(module => ({ 
    default: module.default 
  }))
);
const ClareamentoFAQ = React.lazy(() => 
  import('@/components/landing/clareamento/ClareamentoFAQ').then(module => ({ 
    default: module.default 
  }))
);
const ClareamentoFooter = React.lazy(() => 
  import('@/components/landing/clareamento/ClareamentoFooter').then(module => ({ 
    default: module.default 
  }))
);
const FloatingWhatsApp = React.lazy(() => 
  import('@/components/landing/FloatingWhatsApp').then(module => ({ 
    default: module.default 
  }))
);

// Import skeletons
import SocialProofSkeleton from '@/components/skeleton/SocialProofSkeleton';
import FAQSkeleton from '@/components/skeleton/FAQSkeleton';
import FooterSkeleton from '@/components/skeleton/FooterSkeleton';
import WhatsAppSkeleton from '@/components/skeleton/WhatsAppSkeleton';

const ClareamentoLandingPage: React.FC = () => {
  // Mobile-first critical image preloading
  useCriticalImagePreload({
    images: [
      { src: clareamentoConfig.hero.backgroundImage!, width: 400 } // Mobile-first sizing
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
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Uw-.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Mobile-first critical CSS */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Mobile-first critical CSS */
            *{box-sizing:border-box}
            body{margin:0;padding:0;font-family:system-ui,sans-serif}
            .hero-section{min-height:100vh;display:flex;align-items:center;background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%)}
            @media(max-width:767px){
              .hero-section{min-height:100vh;padding:1rem}
              .hero-text{font-size:1.5rem;line-height:1.3}
            }
            .hero-loading{background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%)}
            
            /* Critical performance styles */
            .bg-\\[\\#CFCBB4\\]{background-color:#CFCBB4}
            .text-\\[\\#381F47\\]{color:#381F47}
            .bg-\\[\\#381F47\\]{background-color:#381F47}
            .text-white{color:#fff}
            .pt-\\[90px\\]{padding-top:90px}
            .container{width:100%;max-width:1200px;margin:0 auto;padding:0 1rem}
            .flex{display:flex}.items-center{align-items:center}
            .w-full{width:100%}.h-auto{height:auto}
            .rounded-lg{border-radius:0.5rem}
            .text-3xl{font-size:1.875rem}.font-bold{font-weight:700}
            .shadow-xl{box-shadow:0 20px 25px -5px rgba(0,0,0,0.1)}
            .transition-all{transition:all 0.3s cubic-bezier(0.4,0,0.2,1)}
            
            @media(min-width:768px){
              .lg\\:flex-row{flex-direction:row}
              .lg\\:w-3\\/5{width:60%}
              .lg\\:w-2\\/5{width:40%}
            }
          `
        }} />
        
        {/* Preload critical hero image with highest priority */}
        <link rel="preload" as="image" href="/lovable-uploads/Vertical de jaleco.avif" type="image/avif" fetchPriority="high" />
        <link rel="preload" as="image" href="/lovable-uploads/Vertical de jaleco.webp" type="image/webp" />
        
        {/* Critical resource hints for mobile performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//api.whatsapp.com" />
        <link rel="dns-prefetch" href="//web.whatsapp.com" />
        
        {/* Service Worker Registration */}
        <script dangerouslySetInnerHTML={{
          __html: `if('serviceWorker'in navigator){navigator.serviceWorker.register('/sw.js')}`
        }} />
        
        {/* Font CSS with font-display: swap */}
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
            font-family: 'Playfair Display';
            font-display: swap;
            font-weight: 400 700;
            src: url('https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          @font-face {
            font-family: 'Montserrat';
            font-display: swap;
            font-weight: 300 700;
            src: url('https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Uw-.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
        ` }} />
        
        {/* Defer loading of non-critical resources */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Defer non-critical CSS
            setTimeout(() => {
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = '/src/index.css';
              document.head.appendChild(link);
            }, 1000);
            
            // Prefetch next likely pages after critical path is complete
            setTimeout(() => {
              ['/', '/contato', '/servicos'].forEach(href => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = href;
                document.head.appendChild(link);
              });
            }, 2000);
          `
        }} />
        
        {/* Open Graph */}
        <meta property="og:title" content={clareamentoConfig.seo.title} />
        <meta property="og:description" content={clareamentoConfig.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={clareamentoConfig.hero.backgroundImage} />
        
        {/* Google Tag Manager - Async */}
        {clareamentoConfig.tracking.gtmId && (
          <script
            async
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

      <MobileOptimizer heroImage={clareamentoConfig.hero.backgroundImage!} />
      
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

        {/* Load non-critical CSS after initial render */}
        <NonCriticalCSSLoader 
          delay={500} 
          enabled={process.env.NODE_ENV === 'production'} 
        />
      </div>
    </>
  );
};

export default ClareamentoLandingPage;