
import React from "react";
import { MessageCircle } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const WhatsAppButton = () => {
  const handleWhatsAppClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    // Track event with Google Tag Manager (if available)
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'WhatsApp Floating Button'
      });
    }
    
    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function() {
          console.log('Google Ads conversion tracked - WhatsApp floating button');
        }
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook('floating_whatsapp_button');
    
    // Open WhatsApp with pre-defined message
    const phoneNumber = "5521993304045";
    const message = "Olá! Gostaria de agendar uma consulta.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-8 right-8 z-50 whatsapp-button hover:whatsapp-button text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 elegant-shadow"
      aria-label="Converse pelo WhatsApp"
    >
      <MessageCircle size={20} className="animate-pulse" />
      <div className="flex flex-col text-left leading-tight">
        <span className="font-medium hidden md:inline">Conversar sobre meu caso</span>
        <span className="font-medium md:hidden">Agendar</span>
        <span className="text-xs text-white/80 hidden md:inline">WhatsApp 24h</span>
      </div>
    </button>
  );
};

export default WhatsAppButton;
