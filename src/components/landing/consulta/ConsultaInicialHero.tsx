// src/components/landing/consulta/ConsultaInicialHero.tsx - VERSÃO ULTRA OTIMIZADA

import React from 'react';
import { MessageCircle, Check } from 'lucide-react';
import { sendGCLIDToWebhook } from "@/utils/gclid";

interface ConsultaInicialHeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  benefits: string[];
  backgroundImage: string;
  whatsappNumber: string;
  whatsappMessage: string;
}

const ConsultaInicialHero: React.FC<ConsultaInicialHeroProps> = ({
  headline,
  subheadline,
  ctaText,
  benefits,
  backgroundImage,
  whatsappNumber,
  whatsappMessage
}) => {
  const handleWhatsAppClick = async () => {
    // Track conversion
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'Hero CTA Button - Limpeza Dental'
      });
    }
    
    // Send GCLID
    await sendGCLIDToWebhook('hero_cta_limpeza_dental');
    
    // Open WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section className="bg-[#CFCBB4] pt-[90px] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content - 60% on desktop */}
          <div className="w-full lg:w-3/5 space-y-8">
            {/* Headlines - Renderização imediata */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#381F47] leading-tight font-serif">
                {headline}
              </h1>
              <p className="text-lg md:text-xl text-[#333333] leading-relaxed">
                {subheadline}
              </p>
            </div>

            {/* Benefits Grid - Simplificado para performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.slice(0, 4).map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/50 rounded-lg p-4">
                  <Check className="text-[#B3955F] flex-shrink-0" size={20} />
                  <span className="text-[#381F47] font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Button - Prioridade máxima */}
            <button
              onClick={handleWhatsAppClick}
              className="bg-[#381F47] hover:bg-[#2d1738] text-white rounded-lg px-8 py-4 flex items-center gap-3 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              aria-label={ctaText}
            >
              <MessageCircle size={20} />
              {ctaText}
            </button>
          </div>

          {/* OTIMIZAÇÃO CRÍTICA: Picture element com AVIF responsivo */}
          <div className="w-full lg:w-2/5">
            <picture className="block relative">
              {/* AVIF para navegadores modernos - 60% menor que WebP */}
              <source
                srcSet="/assets/consulta-inicial-hero-512x672-optimized.avif 512w,
                        /assets/consulta-inicial-hero-760x996-optimized.avif 760w,
                        /assets/consulta-inicial-hero-1024x1344-optimized.avif 1024w"
                sizes="(max-width: 767px) 100vw,
                       (max-width: 1023px) 50vw,
                       40vw"
                type="image/avif"
              />
              
              {/* WebP como fallback */}
              <source
                srcSet="/lovable-uploads/RIT08058-vertical-doutora-site-512.webp 512w,
                        /lovable-uploads/RIT08058-vertical-doutora-site-760.webp 760w,
                        /lovable-uploads/RIT08058-vertical-doutora-site.webp 1024w"
                sizes="(max-width: 767px) 100vw,
                       (max-width: 1023px) 50vw,
                       40vw"
                type="image/webp"
              />
              
              {/* JPEG como último fallback */}
              <img
                src="/lovable-uploads/RIT08058-vertical-doutora-site.jpg"
                alt="Dra. Carla Christoph - Limpeza Dental em Ipanema"
                className="w-full h-auto rounded-lg shadow-xl"
                loading="eager"
                fetchpriority="high"
                width="760"
                height="996"
                style={{
                  aspectRatio: '760/996',
                  objectFit: 'cover'
                }}
              />
            </picture>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#381F47]/20 to-transparent rounded-lg pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultaInicialHero;
