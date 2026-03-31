import React from 'react';
import { MessageCircle } from 'lucide-react';
import { sendGCLIDToWebhook } from "@/utils/gclid";

interface ClareamentoHeaderProps {
  whatsappNumber: string;
  whatsappMessage: string;
}

const ClareamentoHeader: React.FC<ClareamentoHeaderProps> = ({
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
        event_label: 'Header WhatsApp Button'
      });
    }
    
    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function() {
          if (process.env.NODE_ENV === 'development') {
            console.log('Google Ads conversion tracked - Header WhatsApp');
          }
        }
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook('header_whatsapp_button');
    
    // Open WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-[70px]">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo/Nome */}
        <div className="flex flex-col">
          <span className="text-lg font-bold text-[#381F47]">Dra. Carla Christoph</span>
          <span className="text-sm text-gray-600">CRO-RJ 27509</span>
        </div>

        {/* Informações centrais - Hidden on mobile */}
        <div className="hidden md:flex flex-col text-center">
          <span className="text-sm font-medium text-[#381F47]">Atendimento Particular</span>
          <span className="text-sm text-gray-600">Ipanema</span>
        </div>

        {/* Botão WhatsApp */}
        <button
          onClick={handleWhatsAppClick}
          className="bg-[#25D366] hover:bg-[#1ea952] text-white rounded-md px-4 py-2 flex items-center gap-2 transition-colors duration-300"
          aria-label="Contato via WhatsApp"
        >
          <MessageCircle size={18} />
          <span className="hidden sm:inline font-medium">WhatsApp 24h</span>
        </button>
      </div>
    </header>
  );
};

export default ClareamentoHeader;