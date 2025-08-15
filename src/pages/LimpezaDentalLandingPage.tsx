// src/pages/LimpezaDentalLandingPage.tsx - VERSÃO OTIMIZADA

import React, { useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { limpezaDentalConfig } from '@/config/limpezaDentalConfig';
import { captureGCLID } from '@/utils/gclid';

// CRITICAL: Importe apenas o componente Hero inicialmente
import ConsultaInicialHero from '@/components/landing/consulta/ConsultaInicialHero';

// OTIMIZAÇÃO 1: Lazy load TODOS os componentes não-críticos
const ConsultaInicialHeader = React.lazy(() => 
  import('@/components/landing/consulta/ConsultaInicialHeader')
);
const ConsultaInicialProblem = React.lazy(() => 
  import('@/components/landing/consulta/ConsultaInicialProblem')
);
const ConsultaInicialGuide = React.lazy(() => 
  import('@/components/landing/consulta/ConsultaInicialGuide')
);
const ConsultaInicialSocialProof = React.lazy(() => 
  import('@/components/landing/consulta/ConsultaInicialSocialProof')
);
const ConsultaInicialFAQ = React.lazy(() => 
  import('@/components/landing/consulta/ConsultaInicialFAQ')
);
const ConsultaInicialCTA = React.lazy(() => 
  import('@/components/landing/consulta/ConsultaInicialCTA')
);
const ClareamentoFooter = React.lazy(() => 
  import('@/components/landing/clareamento/ClareamentoFooter')
);
const FloatingWhatsApp = React.lazy(() => 
  import('@/components/landing/FloatingWhatsApp')
);

const LimpezaDentalLandingPage: React.FC = () => {
  useEffect(() => {
    // OTIMIZAÇÃO 2: Preload crítico da imagem hero AVIF otimizada
    const preloadHeroImage = () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.type = 'image/avif';
      link.fetchPriority = 'high';
      
      // Use imagem menor para mobile
      if (window.innerWidth < 768) {
        link.href = '/assets/consulta-inicial-hero-512x672-optimized.avif';
      } else {
        link.href = '/assets/consulta-inicial-hero-760x996-optimized.avif';
      }
      
      document.head.appendChild(link);
    };
    
    preloadHeroImage();
    
    // Capture GCLID
    captureGCLID();
    
    // OTIMIZAÇÃO 3: Defer GTM para depois de 3s ou interação
    const loadGTM = () => {
      if (typeof window !== 'undefined' && !window.gtmLoaded) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'page_view',
          page_title: 'Limpeza Dental Premium - Ipanema',
          page_location: window.location.href,
          campaign: limpezaDentalConfig.campaign
        });
        
        // Carregar GTM script apenas após interação
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtm.js?id=${limpezaDentalConfig.tracking.gtmId}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        window.gtmLoaded = true;
      }
    };
    
    // Eventos de interação para carregar GTM
    const interactionEvents = ['scroll', 'click', 'touchstart'];
    const handleInteraction = () => {
      loadGTM();
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
    
    interactionEvents.forEach(event => {
      document.addEventListener(event, handleInteraction, { passive: true, once: true });
    });
    
    // Timer de fallback
    const timer = setTimeout(loadGTM, 3000);
    
    return () => {
      clearTimeout(timer);
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{limpezaDentalConfig.seo.title}</title>
        <meta name="description" content={limpezaDentalConfig.seo.description} />
        
        {/* OTIMIZAÇÃO 4: Critical CSS inline direto no head */}
        <style>{`
          /* Critical CSS para LCP */
          *{margin:0;padding:0;box-sizing:border-box}
          body{font-family:system-ui,-apple-system,sans-serif;background:#CFCBB4}
          .hero-section{min-height:100vh;padding-top:90px;background:#CFCBB4}
          .container{max-width:1200px;margin:0 auto;padding:0 1rem}
          .hero-image{width:100%;height:auto;border-radius:1rem}
          @media(min-width:1024px){
            .hero-grid{display:grid;grid-template-columns:3fr 2fr;gap:3rem;align-items:center}
          }
        `}</style>
        
        {/* OTIMIZAÇÃO 5: Preload apenas recursos críticos */}
        <link 
          rel="preload" 
          href="/assets/consulta-inicial-hero-760x996-optimized.avif"
          as="image" 
          type="image/avif"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
        <link 
          rel="preload" 
          href="/assets/consulta-inicial-hero-512x672-optimized.avif"
          as="image" 
          type="image/avif"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
        
        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//wa.me" />
        
        {/* OTIMIZAÇÃO 6: Defer fontes não-críticas */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" 
          as="style"
          onLoad={(e: any) => { e.target.rel = 'stylesheet'; }}
        />
        
        {/* Schema.org para SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Dra. Carla Christoph",
            "description": limpezaDentalConfig.seo.description,
            "url": "https://dracarlachristoph.com/lp/limpeza-dental-ipanema",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ipanema",
              "addressRegion": "Rio de Janeiro",
              "addressCountry": "BR"
            }
          })}
        </script>
      </Helmet>

      {/* OTIMIZAÇÃO 7: Hero renderizado imediatamente (não lazy) */}
      <div className="hero-section">
        <ConsultaInicialHero
          headline={limpezaDentalConfig.hero.headline}
          subheadline={limpezaDentalConfig.hero.subheadline}
          ctaText={limpezaDentalConfig.hero.ctaText}
          benefits={limpezaDentalConfig.benefits}
          backgroundImage="/assets/consulta-inicial-hero-760x996-optimized.avif"
          whatsappNumber={limpezaDentalConfig.whatsapp.number}
          whatsappMessage={limpezaDentalConfig.whatsapp.message}
        />
      </div>

      {/* OTIMIZAÇÃO 8: Header com lazy loading */}
      <Suspense fallback={null}>
        <ConsultaInicialHeader
          whatsappNumber={limpezaDentalConfig.whatsapp.number}
          whatsappMessage={limpezaDentalConfig.whatsapp.message}
          campaign={limpezaDentalConfig.campaign}
          messageMatch={limpezaDentalConfig.messageMatch}
        />
      </Suspense>

      {/* OTIMIZAÇÃO 9: Intersection Observer para carregar seções */}
      {/* Cada seção só carrega quando está próxima do viewport */}
      <div className="lazy-sections">
        <IntersectionObserverWrapper threshold={0.1} rootMargin="200px">
          <Suspense fallback={<SectionSkeleton />}>
            <ConsultaInicialProblem
              title={limpezaDentalConfig.problem.title}
              description={limpezaDentalConfig.problem.description}
              problems={limpezaDentalConfig.problem.problems}
            />
          </Suspense>
        </IntersectionObserverWrapper>

        <IntersectionObserverWrapper threshold={0.1} rootMargin="200px">
          <Suspense fallback={<SectionSkeleton />}>
            <ConsultaInicialGuide
              title={limpezaDentalConfig.guide.title}
              subtitle={limpezaDentalConfig.guide.subtitle}
              steps={limpezaDentalConfig.guide.steps}
            />
          </Suspense>
        </IntersectionObserverWrapper>

        <IntersectionObserverWrapper threshold={0.1} rootMargin="200px">
          <Suspense fallback={<SectionSkeleton />}>
            <ConsultaInicialSocialProof
              title={limpezaDentalConfig.socialProof.title}
              testimonials={limpezaDentalConfig.socialProof.testimonials}
              stats={limpezaDentalConfig.socialProof.stats}
            />
          </Suspense>
        </IntersectionObserverWrapper>

        <IntersectionObserverWrapper threshold={0.1} rootMargin="200px">
          <Suspense fallback={<SectionSkeleton />}>
            <ConsultaInicialFAQ
              title={limpezaDentalConfig.faq.title}
              questions={limpezaDentalConfig.faq.questions}
            />
          </Suspense>
        </IntersectionObserverWrapper>

        <IntersectionObserverWrapper threshold={0.1} rootMargin="100px">
          <Suspense fallback={<SectionSkeleton />}>
            <ConsultaInicialCTA
              title={limpezaDentalConfig.cta.title}
              subtitle={limpezaDentalConfig.cta.subtitle}
              buttonText={limpezaDentalConfig.cta.buttonText}
              whatsappNumber={limpezaDentalConfig.whatsapp.number}
              whatsappMessage={limpezaDentalConfig.whatsapp.message}
              campaign={limpezaDentalConfig.campaign}
              messageMatch={limpezaDentalConfig.messageMatch}
            />
          </Suspense>
        </IntersectionObserverWrapper>

        <IntersectionObserverWrapper threshold={0.1} rootMargin="100px">
          <Suspense fallback={null}>
            <ClareamentoFooter />
          </Suspense>
        </IntersectionObserverWrapper>
      </div>

      {/* Floating WhatsApp - carrega após 2s */}
      <DelayedComponent delay={2000}>
        <Suspense fallback={null}>
          <FloatingWhatsApp
            phoneNumber={limpezaDentalConfig.whatsapp.number}
            message={limpezaDentalConfig.whatsapp.message}
            campaign={limpezaDentalConfig.campaign}
            messageMatch={limpezaDentalConfig.messageMatch}
          />
        </Suspense>
      </DelayedComponent>
    </>
  );
};

// COMPONENTE AUXILIAR: Intersection Observer Wrapper
const IntersectionObserverWrapper: React.FC<{
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}> = ({ children, threshold = 0.1, rootMargin = '100px' }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={ref}>
      {isVisible ? children : <SectionSkeleton />}
    </div>
  );
};

// COMPONENTE AUXILIAR: Delayed Component
const DelayedComponent: React.FC<{
  children: React.ReactNode;
  delay: number;
}> = ({ children, delay }) => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return show ? <>{children}</> : null;
};

// COMPONENTE AUXILIAR: Section Skeleton
const SectionSkeleton = () => (
  <div className="h-96 bg-gray-100 animate-pulse" />
);

export default LimpezaDentalLandingPage;
