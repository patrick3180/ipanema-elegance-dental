import React from "react";
import { MessageCircle } from "lucide-react";
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(170deg, #FAF7F2 0%, #F5F0E8 40%, #EDE8DC 100%)',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Decorative radial gradient */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(179,149,95,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Credential badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="inline-flex items-center bg-[#381F47]/10 text-[#381F47] text-xs font-semibold px-3 py-1.5 rounded-full">
              CRO-RJ 27.509
            </span>
            <span className="inline-flex items-center bg-[#B3955F]/15 text-[#8B7340] text-xs font-semibold px-3 py-1.5 rounded-full">
              Atendimento Particular · Ipanema
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[34px] md:text-4xl lg:text-5xl font-display font-bold text-dental-purple mb-6 leading-tight">
            {headline}
          </h1>
          
          {/* Subheadline */}
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {subheadline}
          </p>
          
          {/* Benefits as pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 max-w-lg mx-auto">
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
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={handleCTAClick}
              className="w-full md:w-auto text-white px-8 py-4 rounded-[10px] font-bold text-[15px] transition-all duration-300 hover:scale-105 shadow-[0_4px_14px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] flex items-center justify-center gap-3"
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #20BD5A 100%)',
              }}
              aria-label={ctaText}
              data-gtm-category="Contact"
              data-gtm-action="Click"
              data-gtm-label={`hero-cta-${campaign}`}
              data-gtm-ad-group={messageMatch.adGroup}
              data-gtm-keyword={messageMatch.keyword}
              data-gtm-message-match="hero_cta"
            >
              <MessageCircle className="w-5 h-5" />
              {ctaText}
            </button>
            <div className="flex items-center gap-1.5">
              <span className="text-green-500 text-[8px]">●</span>
              <span className="text-[11px] text-gray-500">WhatsApp 24h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
