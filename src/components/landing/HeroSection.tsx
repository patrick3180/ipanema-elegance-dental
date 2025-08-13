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
  messageMatch: {
    adGroup: string;
    keyword: string;
  };
  urgency?: string;
}

const HeroSection = ({ 
  headline, 
  subheadline, 
  ctaText, 
  benefits, 
  backgroundImage, 
  campaign, 
  phoneNumber, 
  whatsappMessage,
  messageMatch,
  urgency
}: HeroSectionProps) => {
  const handleCTAClick = async () => {
    // Track event with Google Tag Manager (if available)
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'hero_cta_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: `Hero CTA - ${campaign}`,
        campaign: campaign,
        ad_group: messageMatch.adGroup,
        keyword: messageMatch.keyword,
        message_match: 'hero_cta'
      });
    }
    
    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function() {
          console.log(`Google Ads conversion tracked - Hero CTA ${campaign}`);
        }
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook(`landing_page_hero_cta_${campaign}`);
    
    // Open WhatsApp with pre-defined message
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dental-beige"
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
            className="bg-[#381F47] hover:bg-[#4a2759] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            aria-label={ctaText}
            data-gtm-category="Contact"
            data-gtm-action="Click"
            data-gtm-label={`hero-cta-${campaign}`}
            data-gtm-ad-group={messageMatch.adGroup}
            data-gtm-keyword={messageMatch.keyword}
            data-gtm-message-match="hero_cta"
          >
            {ctaText}
            <ArrowRight className="w-5 h-5" />
          </button>
          
          {urgency && (
            <p className="text-[#CFCBB4] text-sm font-medium animate-pulse mt-4">
              {urgency}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;