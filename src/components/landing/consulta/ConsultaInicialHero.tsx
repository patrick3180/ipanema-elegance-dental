import React from 'react';
import { MessageCircle } from 'lucide-react';
import { sendGCLIDToWebhook } from "@/utils/gclid";
import UltraOptimizedPicture from "@/components/performance/UltraOptimizedPicture";

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
  // Auto-derive AVIF paths from webp for LCP optimization
  const deriveAvifPaths = (webpSrc: string) => {
    const base = webpSrc.replace(/\.webp$/, '');
    return {
      mobile: `${base}-480.avif`,
      desktop: `${base}-1024.avif`,
    };
  };
  const avifPaths = backgroundImage ? deriveAvifPaths(backgroundImage) : null;

  const handleWhatsAppClick = async () => {
    // Track event with Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'Hero CTA Button - Consulta Inicial'
      });
    }

    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function () {
          if (process.env.NODE_ENV === 'development') {
            console.log('Google Ads conversion tracked - Hero CTA Consulta');
          }
        }
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook('hero_cta_button_consulta');

    // Open WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section
      className="pt-[90px] py-16 lg:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(170deg, #FAF7F2 0%, #F5F0E8 40%, #EDE8DC 100%)',
      }}
    >
      {/* Decorative radial gradient */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(179,149,95,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content - 60% on desktop */}
          <div className="w-full lg:w-3/5 space-y-7">
            {/* Credential badges */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center bg-[#381F47]/10 text-[#381F47] text-xs font-semibold px-3 py-1.5 rounded-full">
                CRO-RJ 27.509
              </span>
              <span className="inline-flex items-center bg-[#B3955F]/15 text-[#8B7340] text-xs font-semibold px-3 py-1.5 rounded-full">
                Atendimento Particular · Ipanema
              </span>
            </div>

            {/* Headlines */}
            <div className="space-y-4">
              <h1 className="text-[34px] md:text-4xl lg:text-5xl font-bold text-[#381F47] leading-tight font-serif">
                {headline}
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {subheadline}
              </p>
            </div>

            {/* Benefits as pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 bg-white border border-[#B3955F]/40 rounded-full px-3.5 py-1.5 text-sm text-[#381F47] font-medium"
                >
                  <span className="text-[#B3955F] text-[8px]">●</span>
                  {benefit}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <div className="space-y-2">
              <button
                onClick={handleWhatsAppClick}
                className="w-full md:w-auto text-white rounded-[10px] px-8 py-4 flex items-center justify-center md:justify-start gap-3 text-[15px] font-bold transition-all duration-300 shadow-[0_4px_14px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #20BD5A 100%)',
                }}
              >
                <MessageCircle size={20} />
                {ctaText}
              </button>
              <div className="flex items-center gap-1.5 md:pl-1">
                <span className="text-green-500 text-[8px]">●</span>
                <span className="text-[11px] text-gray-500">WhatsApp 24h</span>
              </div>
            </div>
          </div>

          {/* Hero Image - 40% on desktop */}
          <div className="w-full lg:w-2/5">
            <div className="relative" style={{ aspectRatio: '760/996' }}>
              <div className="rounded-[20px] overflow-hidden" style={{ boxShadow: '0 8px 30px rgba(74,45,94,0.08)' }}>
                <UltraOptimizedPicture
                  src={backgroundImage || "/lovable-uploads/RIT08058-vertical-doutora-site.webp"}
                  alt="Dra. Carla Christoph - Consulta Odontológica Personalizada em Ipanema"
                  priority={true}
                  width={760}
                  height={996}
                  mobileSrc={avifPaths?.mobile}
                  desktopSrc={avifPaths?.desktop}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge - hidden on mobile */}
              <div className="hidden md:flex absolute bottom-6 left-4 bg-white rounded-xl px-4 py-2.5 items-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                <span className="text-[#B3955F] text-[8px]">●</span>
                <span className="text-[11px] font-semibold text-[#381F47]">20+ Anos de Experiência</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultaInicialHero;
