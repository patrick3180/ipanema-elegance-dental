import React from "react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const Hero = () => {
  const handleWhatsAppClick = async () => {
    // Track event with Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'Hero CTA Button'
      });
    }

    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function () {
          console.log('Google Ads conversion tracked - Hero CTA button');
        }
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook('hero_button');

    const phoneNumber = "5521993304045";
    const message = "Olá! Vi o site e gostaria de agendar uma consulta.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  const handleExploreClick = () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'hero_explore_click',
        event_category: 'Navigation',
        event_action: 'Click',
        event_label: 'Hero Secondary CTA'
      });
    }
    const el = document.getElementById('tratamentos');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="início" className="hero-fb">
      {/* Foto — full-bleed no desktop / topo no mobile */}
      <picture className="hero-fb-photo">
        <source media="(max-width: 767px)" type="image/avif" srcSet="/lovable-uploads/hero-fb-m-480.avif 480w, /lovable-uploads/hero-fb-m-768.avif 768w" sizes="100vw" />
        <source media="(max-width: 767px)" type="image/webp" srcSet="/lovable-uploads/hero-fb-m-480.webp 480w, /lovable-uploads/hero-fb-m-768.webp 768w" sizes="100vw" />
        <source media="(min-width: 768px)" type="image/avif" srcSet="/lovable-uploads/hero-fb-1280.avif 1280w, /lovable-uploads/hero-fb-1920.avif 1920w" sizes="100vw" />
        <source media="(min-width: 768px)" type="image/webp" srcSet="/lovable-uploads/hero-fb-1280.webp 1280w, /lovable-uploads/hero-fb-1920.webp 1920w" sizes="100vw" />
        <img
          src="/lovable-uploads/hero-fb-1280.webp"
          alt="Dra. Carla Christoph, dentista em Ipanema, no consultório"
          width={1280}
          height={650}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <div className="hero-fb-scrim" aria-hidden="true" />

      <div className="hero-fb-text">
        <div className="hero-fb-textwrap">
          <div className="hero-fb-copy">
            <p className="hero-fb-eyebrow hero-animate-1">Especialista em Prótese e Implantodontia</p>

            <h1 className="hero-fb-h1 font-display hero-animate-2">
              Dentista em Ipanema especializada em reabilitação oral e <span>estética natural</span>
            </h1>

            <p className="hero-fb-sub hero-animate-3">
              No mínimo uma hora por consulta. Tempo para ouvir, examinar e planejar cada caso.
            </p>

            <div className="hero-fb-badges hero-animate-4">
              <span>20+ anos em Ipanema</span>
              <span>CRO-RJ 27.509</span>
              <span>Do plano à finalização</span>
            </div>

            <div className="hero-fb-actions hero-animate-5">
              <button type="button" className="hero-fb-cta" onClick={handleWhatsAppClick}>
                <b>Agendar minha consulta</b>
                <small>WhatsApp 24h</small>
              </button>
              <button type="button" className="hero-fb-explore" onClick={handleExploreClick}>
                Conheça os tratamentos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
