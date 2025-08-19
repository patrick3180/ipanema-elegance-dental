import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { sendGCLIDToWebhook } from "@/utils/gclid";

interface ConsultaInicialHeaderProps {
  whatsappNumber: string;
  whatsappMessage: string;
  campaign: string;
  messageMatch: {
    adGroup: string;
    keyword: string;
  };
}

const ConsultaInicialHeader: React.FC<ConsultaInicialHeaderProps> = ({
  whatsappNumber,
  whatsappMessage,
  campaign,
  messageMatch
}) => {
  const handleWhatsAppClick = async () => {
    // Track event with Google Tag Manager (if available)
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: `WhatsApp Header - ${campaign}`,
        campaign: campaign,
        ad_group: messageMatch.adGroup,
        keyword: messageMatch.keyword,
        message_match: 'header_whatsapp'
      });
    }
    
    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function() {
          console.log(`Google Ads conversion tracked - Header WhatsApp ${campaign}`);
        }
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook(`header_whatsapp_${campaign}`);
    
    // Open WhatsApp with pre-defined message
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-[#381F47]">
              Dra. Carla Christoph
            </h1>
            <span className="text-xs text-gray-600">CRO-RJ 27509</span>
          </div>
          
          {/* Info Central */}
          <div className="hidden md:flex items-center gap-6">
            <span className="text-sm text-gray-700 font-medium">
              Atendimento Particular
            </span>
            <span className="text-xs text-gray-500">
              Ipanema
            </span>
          </div>

          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsAppClick}
            className="bg-[#25D366] hover:bg-[#1ea952] text-white rounded-lg px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 text-sm md:text-base font-medium transition-all duration-300 hover:scale-105"
            aria-label="Conversar pelo WhatsApp"
            data-gtm-category="Contact"
            data-gtm-action="Click"
            data-gtm-label={`header-whatsapp-${campaign}`}
            data-gtm-ad-group={messageMatch.adGroup}
            data-gtm-keyword={messageMatch.keyword}
            data-gtm-message-match="header_whatsapp"
          >
            <MessageCircle size={18} />
            <span className="hidden sm:inline">WhatsApp 24h</span>
            <span className="sm:hidden">
              <Phone size={16} />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default ConsultaInicialHeader;