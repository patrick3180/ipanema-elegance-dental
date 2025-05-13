
import React from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    // In a real implementation, this would track via Google Tag Manager
    console.log("WhatsApp button clicked - tracking event");
    
    // Replace with actual WhatsApp number
    window.open("https://wa.me/5521999999999", "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ea952] text-white rounded-full p-4 shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
      aria-label="Converse pelo WhatsApp"
    >
      <MessageCircle size={20} />
      <span className="hidden md:inline font-medium">Agende sua consulta</span>
    </button>
  );
};

export default WhatsAppButton;
