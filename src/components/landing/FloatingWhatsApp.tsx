import React from "react";
import { MessageCircle } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

interface FloatingWhatsAppProps {
  phoneNumber: string;
  message: string;
  campaign: string;
  messageMatch: {
    adGroup: string;
    keyword: string;
  };
}

const FloatingWhatsApp = ({ phoneNumber, message, campaign, messageMatch }: FloatingWhatsAppProps) => {
  const handleWhatsAppClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    // Track event with Google Tag Manager (if available)
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: `WhatsApp Landing Page - ${campaign}`,
        campaign: campaign,
        ad_group: messageMatch.adGroup,
        keyword: messageMatch.keyword,
        message_match: 'floating_whatsapp'
      });
    }
    
    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function() {
          console.log(`Google Ads conversion tracked - Landing page ${campaign}`);
        }
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook(`landing_page_floating_whatsapp_${campaign}`);
    
    // Open WhatsApp with pre-defined message
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 relative bg-[#25D366] hover:bg-[#1ea952] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 md:hidden"
      aria-label="Converse pelo WhatsApp"
      data-gtm-category="Contact"
      data-gtm-action="Click"
      data-gtm-label={`floating-whatsapp-${campaign}`}
      data-gtm-ad-group={messageMatch.adGroup}
      data-gtm-keyword={messageMatch.keyword}
      data-gtm-message-match="floating_whatsapp"
    >
      <MessageCircle size={20} className="animate-pulse" />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
        24h
      </span>
    </button>
  );
};

export default FloatingWhatsApp;