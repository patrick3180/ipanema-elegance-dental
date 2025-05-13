
import React from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    // Track event with Google Tag Manager (if available)
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'WhatsApp Button'
      });
    }
    
    // Log for development purposes
    console.log("WhatsApp button clicked - tracking event");
    
    // Open WhatsApp with pre-defined message
    const phoneNumber = "5521993304045"; // Correct phone number format with country code
    const message = "Olá! Gostaria de agendar uma consulta.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] hover:bg-[#1ea952] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 elegant-shadow"
      aria-label="Converse pelo WhatsApp"
    >
      <MessageCircle size={20} className="animate-pulse" />
      <span className="hidden md:inline font-medium">Agende sua consulta</span>
    </button>
  );
};

export default WhatsAppButton;
