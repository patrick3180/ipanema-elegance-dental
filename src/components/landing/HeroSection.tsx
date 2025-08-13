import React from "react";
import { ArrowRight } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  benefits: string[];
  backgroundImage?: string;
  campaign: string;
  phoneNumber: string;
  whatsappMessage: string;
}

const HeroSection = ({ 
  headline, 
  subheadline, 
  ctaText, 
  benefits, 
  backgroundImage,
  campaign,
  phoneNumber,
  whatsappMessage 
}: HeroSectionProps) => {
  const handleCTAClick = async () => {
    // Track event
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'cta_click',
        event_category: 'CTA',
        event_action: 'Click',
        event_label: `Hero CTA - ${campaign}`,
        campaign: campaign
      });
    }

    await sendGCLIDToWebhook(`landing_page_hero_cta_${campaign}`);
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-dental-beige to-white"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay if background image */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-dental-purple/30"></div>
      )}
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-dental-purple mb-6 leading-tight">
            {headline}
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-dental-purple/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            {subheadline}
          </p>
          
          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {benefits.map((benefit, index) => (
              <span 
                key={index}
                className="bg-dental-purple/10 text-dental-purple px-4 py-2 rounded-full text-sm md:text-base font-medium border border-dental-purple/20"
              >
                ✓ {benefit}
              </span>
            ))}
          </div>
          
          {/* CTA Button */}
          <button
            onClick={handleCTAClick}
            className="bg-dental-gold hover:bg-dental-gold/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            data-gtm-category="CTA"
            data-gtm-action="Click"
            data-gtm-label={`hero-cta-${campaign}`}
          >
            {ctaText}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;