import React, { useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import ClareamentoHeader from '@/components/landing/clareamento/ClareamentoHeader';
import ClareamentoHero from '@/components/landing/clareamento/ClareamentoHero';
import ClareamentoProblem from '@/components/landing/clareamento/ClareamentoProblem';
import ClareamentoGuide from '@/components/landing/clareamento/ClareamentoGuide';
import ClareamentoCTA from '@/components/landing/clareamento/ClareamentoCTA';
import CriticalCSSInliner from '@/components/performance/CriticalCSSInliner';
import NonCriticalCSSLoader from '@/components/performance/NonCriticalCSSLoader';
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

        {/* Critical CSS inline */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Critical CSS for Clareamento Landing Page */
          .bg-\\[\\#CFCBB4\\]{background-color:#CFCBB4}
          .text-\\[\\#381F47\\]{color:#381F47}
          .text-\\[\\#333333\\]{color:#333333}
          .text-\\[\\#B3955F\\]{color:#B3955F}
          .bg-\\[\\#381F47\\]{background-color:#381F47}
          .hover\\:bg-\\[\\#2d1738\\]:hover{background-color:#2d1738}
          .bg-white\\/50{background-color:rgba(255,255,255,0.5)}
          .pt-\\[90px\\]{padding-top:90px}
          .font-serif{font-family:'Playfair Display',Georgia,serif}
          .font-sans{font-family:'Montserrat',system-ui,sans-serif}
          .leading-tight{line-height:1.25}
          .leading-relaxed{line-height:1.625}
          .shadow-lg{box-shadow:0 10px 15px -3px rgba(0,0,0,0.1)}
          .shadow-xl{box-shadow:0 20px 25px -5px rgba(0,0,0,0.1)}
          .transform{transform:translate(0,0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1)}
          .hover\\:scale-105:hover{transform:scale(1.05)}
          .transition-all{transition-property:all;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms}
          .duration-300{transition-duration:300ms}
          .container{width:100%;max-width:1200px;margin:0 auto;padding:0 1rem}
          .grid{display:grid}
          .flex{display:flex}
          .items-center{align-items:center}
          .justify-center{justify-content:center}
          .text-center{text-align:center}
          .text-left{text-align:left}
          .text-white{color:#ffffff}
          .bg-white{background-color:#ffffff}
          .rounded-lg{border-radius:0.5rem}
          .rounded-full{border-radius:9999px}
          .px-6{padding-left:1.5rem;padding-right:1.5rem}
          .py-3{padding-top:0.75rem;padding-bottom:0.75rem}
          .py-4{padding-top:1rem;padding-bottom:1rem}
          .py-8{padding-top:2rem;padding-bottom:2rem}
          .py-12{padding-top:3rem;padding-bottom:3rem}
          .px-4{padding-left:1rem;padding-right:1rem}
          .text-sm{font-size:0.875rem}
          .text-base{font-size:1rem}
          .text-lg{font-size:1.125rem}
          .text-xl{font-size:1.25rem}
          .text-2xl{font-size:1.5rem}
          .text-3xl{font-size:1.875rem}
          .text-4xl{font-size:2.25rem}
          .font-bold{font-weight:700}
          .font-semibold{font-weight:600}
          .mb-2{margin-bottom:0.5rem}
          .mb-4{margin-bottom:1rem}
          .mb-6{margin-bottom:1.5rem}
          .mb-8{margin-bottom:2rem}
          .mt-8{margin-top:2rem}
          .w-full{width:100%}
          .h-auto{height:auto}
          .min-h-screen{min-height:100vh}
          .relative{position:relative}
          .absolute{position:absolute}
          .inset-0{top:0;right:0;bottom:0;left:0}
          .z-10{z-index:10}
          .z-20{z-index:20}
          .space-y-4>:not([hidden])~:not([hidden]){margin-top:1rem}
          .space-y-6>:not([hidden])~:not([hidden]){margin-top:1.5rem}
          .gap-4{gap:1rem}
          .gap-6{gap:1.5rem}
          @media(min-width:768px){
            .md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
            .md\\:text-5xl{font-size:3rem}
            .md\\:text-xl{font-size:1.25rem}
            .md\\:py-16{padding-top:4rem;padding-bottom:4rem}
            .md\\:px-8{padding-left:2rem;padding-right:2rem}
          }
          @media(min-width:1024px){
            .lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
            .lg\\:text-6xl{font-size:3.75rem}
            .lg\\:py-20{padding-top:5rem;padding-bottom:5rem}
          }
        ` }} />
        
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
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          as="image"
          href={clareamentoConfig.hero.backgroundImage}
          imageSrcSet={`${clareamentoConfig.hero.backgroundImage}?w=400&f=webp 400w, ${clareamentoConfig.hero.backgroundImage}?w=800&f=webp 800w`}
          imageSizes="(max-width: 768px) 100vw, 400px"
        />
        
        {/* Defer non-critical CSS */}
        <link
          rel="preload"
          href="/src/index.css"
          as="style"
          onLoad={(e) => {
            const target = e.target as HTMLLinkElement;
            target.onload = null;
            target.rel = 'stylesheet';
          }}
        />
        <noscript>
          <link rel="stylesheet" href="/src/index.css" />
        </noscript>
        
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