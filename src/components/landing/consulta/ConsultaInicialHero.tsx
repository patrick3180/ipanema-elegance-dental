import React from 'react';
import { MessageCircle, Check } from 'lucide-react';
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
        'event_callback': function() {
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
    <section className="bg-[#CFCBB4] pt-[90px] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content - 60% on desktop */}
          <div className="w-full lg:w-3/5 space-y-8">
            {/* Headlines */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#381F47] leading-tight font-serif">
                {headline}
              </h1>
              <p className="text-lg md:text-xl text-[#333333] leading-relaxed">
                {subheadline}
              </p>
            </div>

            {/* Benefits Grid - 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/50 rounded-lg p-4">
                  <Check size={20} className="text-[#B3955F] flex-shrink-0" />
                  <span className="text-[#381F47] font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={handleWhatsAppClick}
              className="bg-[#381F47] hover:bg-[#2d1738] text-white rounded-lg px-8 py-4 flex items-center gap-3 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <MessageCircle size={20} />
              {ctaText}
            </button>
          </div>

          {/* Hero Image - 40% on desktop - ULTRA OPTIMIZED */}
          <div className="w-full lg:w-2/5">
            <div className="relative" style={{ aspectRatio: '760/996' }}>
              <UltraOptimizedPicture
                src={backgroundImage || "/lovable-uploads/RIT08058-vertical-doutora-site.webp"}
                alt="Dra. Carla Christoph - Consulta Odontológica Personalizada em Ipanema"
                priority={true}
                width={760}
                height={996}
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#381F47]/20 to-transparent rounded-lg pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultaInicialHero;