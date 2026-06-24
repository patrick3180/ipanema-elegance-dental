import React from "react";
import { MessageCircle, Star } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

interface ProteseHeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  benefits: string[];
  whatsappNumber: string;
  whatsappMessage: string;
  proof: {
    rating: string;
    ratingCount: string;
    ratingHref: string;
    badges: string[];
  };
}

/**
 * Hero full-bleed da LP de Prótese V2.
 * Desktop: foto full-bleed (Dra. à direita) + texto sobreposto à esquerda (convenção de LP).
 * Mobile: foto compacta no topo + faixa de texto logo abaixo (CTA e prova perto da dobra).
 * Estilos vivem em criticalStyles inline na página (Helmet) — padrão de performance das LPs.
 */
const ProteseHero: React.FC<ProteseHeroProps> = ({
  headline,
  subheadline,
  ctaText,
  benefits,
  whatsappNumber,
  whatsappMessage,
  proof,
}) => {
  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "whatsapp_click",
        event_category: "Contact",
        event_action: "Click",
        event_label: "Hero CTA Button - Protese V2",
      });
    }

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16894364517/OQZvCMXV0foZEOqP7vY9",
        event_callback: function () {
          if (process.env.NODE_ENV === "development") {
            console.log("Google Ads conversion tracked - Hero CTA Protese V2");
          }
        },
      });
    }

    await sendGCLIDToWebhook("hero_cta_button_protese_v2");

    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section className="ph-hero" id="inicio">
      {/* Foto — full-bleed no desktop / topo no mobile (mesma imagem do hero da home) */}
      <picture className="ph-hero-photo">
        <source
          media="(max-width: 767px)"
          type="image/avif"
          srcSet="/lovable-uploads/hero-fb-m-480.avif 480w, /lovable-uploads/hero-fb-m-768.avif 768w"
          sizes="100vw"
        />
        <source
          media="(max-width: 767px)"
          type="image/webp"
          srcSet="/lovable-uploads/hero-fb-m-480.webp 480w, /lovable-uploads/hero-fb-m-768.webp 768w"
          sizes="100vw"
        />
        <source
          media="(min-width: 768px)"
          type="image/avif"
          srcSet="/lovable-uploads/hero-fb-1280.avif 1280w, /lovable-uploads/hero-fb-1920.avif 1920w"
          sizes="100vw"
        />
        <source
          media="(min-width: 768px)"
          type="image/webp"
          srcSet="/lovable-uploads/hero-fb-1280.webp 1280w, /lovable-uploads/hero-fb-1920.webp 1920w"
          sizes="100vw"
        />
        <img
          src="/lovable-uploads/hero-fb-1280.webp"
          alt="Dra. Carla Christoph, especialista em prótese dentária, no consultório em Ipanema"
          width={1280}
          height={650}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <div className="ph-hero-scrim" aria-hidden="true" />

      <div className="ph-hero-text">
        <div className="ph-hero-inner">
          <div className="ph-hero-copy">
            <p className="ph-hero-eyebrow">
              Especialista em Prótese e Implantodontia · CRO-RJ 27.509
            </p>

            <h1 className="ph-hero-h1 font-serif">{headline}</h1>

            <p className="ph-hero-sub">{subheadline}</p>

            <div className="ph-hero-cta-row">
              <button type="button" onClick={handleWhatsAppClick} className="ph-hero-cta">
                <MessageCircle size={20} />
                <span className="ph-hero-cta-labels">
                  <b>{ctaText}</b>
                  <small>WhatsApp 24h</small>
                </span>
              </button>

              <a
                href={proof.ratingHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Avaliações no Google: ${proof.rating} estrelas com ${proof.ratingCount}`}
                className="ph-hero-proof"
              >
                <Star size={16} className="ph-hero-star" />
                <b>{proof.rating}</b>
                <span>no Google · {proof.ratingCount}</span>
              </a>
            </div>

            <div className="ph-hero-badges">
              {benefits.map((b) => (
                <span key={b} className="ph-hero-badge">
                  <span className="ph-hero-dot">●</span>
                  {b}
                </span>
              ))}
            </div>

            <div className="ph-hero-trust">
              {proof.badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProteseHero;
