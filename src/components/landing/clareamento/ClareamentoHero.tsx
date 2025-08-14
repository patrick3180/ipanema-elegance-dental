import React, { useEffect } from 'react';
import { MessageCircle, Check } from 'lucide-react';
import { sendGCLIDToWebhook } from "@/utils/gclid";

interface ClareamentoHeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  benefits: string[];
  backgroundImage: string;
  whatsappNumber: string;
  whatsappMessage: string;
}

const ClareamentoHero: React.FC<ClareamentoHeroProps> = ({
  headline,
  subheadline,
  ctaText,
  benefits,
  backgroundImage,
  whatsappNumber,
  whatsappMessage
}) => {
  // Preload hero image in multiple formats for maximum performance
  useEffect(() => {
    // Preload AVIF version (best compression)
    const avifLink = document.createElement('link');
    avifLink.rel = 'preload';
    avifLink.as = 'image';
    avifLink.href = backgroundImage.replace('.png', '.avif');
    avifLink.type = 'image/avif';
    avifLink.fetchPriority = 'high';
    document.head.appendChild(avifLink);

    // Preload WebP fallback
    const webpLink = document.createElement('link');
    webpLink.rel = 'preload';
    webpLink.as = 'image';
    webpLink.href = backgroundImage.replace('.png', '.webp');
    webpLink.type = 'image/webp';
    webpLink.fetchPriority = 'high';
    document.head.appendChild(webpLink);

    // Preload PNG fallback
    const pngLink = document.createElement('link');
    pngLink.rel = 'preload';
    pngLink.as = 'image';
    pngLink.href = backgroundImage;
    pngLink.type = 'image/png';
    pngLink.fetchPriority = 'high';
    document.head.appendChild(pngLink);

    return () => {
      // Cleanup on unmount
      document.head.removeChild(avifLink);
      document.head.removeChild(webpLink);
      document.head.removeChild(pngLink);
    };
  }, [backgroundImage]);

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
        'event_callback': function() {
          if (process.env.NODE_ENV === 'development') {
            console.log('Google Ads conversion tracked - Hero CTA');
          }
        }
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook('hero_cta_button');
    
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

          {/* Image - 40% on desktop */}
          <div className="w-full lg:w-2/5">
            <div className="relative">
              <picture>
                <source 
                  srcSet={backgroundImage.replace('.png', '.avif')} 
                  type="image/avif"
                />
                <source 
                  srcSet={backgroundImage.replace('.png', '.webp')} 
                  type="image/webp"
                />
                <img
                  src={backgroundImage}
                  alt="Dra. Carla Christoph - Especialista em Clareamento Dental"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-auto rounded-lg shadow-xl"
                  width="800"
                  height="600"
                  style={{ objectFit: 'cover' }}
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[#381F47]/20 to-transparent rounded-lg pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClareamentoHero;