import React from 'react';
import { MessageCircle } from 'lucide-react';
import { sendGCLIDToWebhook } from "@/utils/gclid";

interface ConsultaInicialCTAProps {
  title: string;
  subtitle: string;
  buttonText: string;
  urgency?: string;
  whatsappNumber: string;
  whatsappMessage: string;
  campaign: string;
  messageMatch: {
    adGroup: string;
    keyword: string;
  };
}

const ConsultaInicialCTA: React.FC<ConsultaInicialCTAProps> = ({
  title,
  subtitle,
  buttonText,
  urgency,
  whatsappNumber,
  whatsappMessage,
  campaign,
  messageMatch
}) => {
  const handleWhatsAppClick = async () => {
    // Track event with Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: `Final CTA - ${campaign}`,
        campaign: campaign,
        ad_group: messageMatch.adGroup,
        keyword: messageMatch.keyword,
        message_match: 'final_cta'
      });
    }
    
    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function() {
          console.log(`Google Ads conversion tracked - Final CTA ${campaign}`);
        }
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook(`final_cta_${campaign}`);
    
    // Open WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section className="bg-[#381F47] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Header */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              {subtitle}
            </p>
            {urgency && (
              <p className="text-sm md:text-base text-[#B3955F] italic">
                {urgency}
              </p>
            )}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] hover:bg-[#1ea952] text-white rounded-lg px-8 md:px-12 py-4 md:py-5 flex items-center gap-3 text-lg md:text-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              aria-label="Conversar pelo WhatsApp"
              data-gtm-category="Contact"
              data-gtm-action="Click"
              data-gtm-label={`final-cta-${campaign}`}
              data-gtm-ad-group={messageMatch.adGroup}
              data-gtm-keyword={messageMatch.keyword}
              data-gtm-message-match="final_cta"
            >
              <MessageCircle size={24} />
              {buttonText}
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#B3955F] mb-2">
                24h
              </div>
              <div className="text-white/80 text-sm">
                Atendimento WhatsApp
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#B3955F] mb-2">
                +1 hora
              </div>
              <div className="text-white/80 text-sm">
                Consulta sem pressa
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#B3955F] mb-2">
                20+ anos
              </div>
              <div className="text-white/80 text-sm">
                Experiência comprovada
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultaInicialCTA;