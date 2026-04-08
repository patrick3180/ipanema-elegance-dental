import React from "react";
import { MessageCircle } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

interface EnLPFloatingWhatsAppProps {
  whatsappNumber: string;
  whatsappMessage: string;
}

const EnLPFloatingWhatsApp: React.FC<EnLPFloatingWhatsAppProps> = ({
  whatsappNumber,
  whatsappMessage,
}) => {
  const handleClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "whatsapp_click",
        event_category: "Contact",
        event_action: "Click",
        event_label: "WhatsApp EN LP Floating Button",
      });
    }

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16894364517/OQZvCMXV0foZEOqP7vY9",
        event_callback: function () {
          console.log("Google Ads conversion tracked - EN LP Floating");
        },
      });
    }

    await sendGCLIDToWebhook("en_lp_floating_whatsapp");

    const encodedMsg = encodeURIComponent(whatsappMessage);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMsg}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Contact via WhatsApp"
      className="fixed bottom-5 right-5 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl md:hidden"
    >
      <MessageCircle size={26} />
    </button>
  );
};

export default EnLPFloatingWhatsApp;
