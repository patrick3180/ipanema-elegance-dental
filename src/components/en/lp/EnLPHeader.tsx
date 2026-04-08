import React from "react";
import { MessageCircle } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

interface EnLPHeaderProps {
  whatsappNumber: string;
  whatsappMessage: string;
  campaign: string;
  messageMatch: { adGroup: string; keyword: string };
}

const EnLPHeader: React.FC<EnLPHeaderProps> = ({
  whatsappNumber,
  whatsappMessage,
  campaign,
  messageMatch,
}) => {
  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "whatsapp_click",
        event_category: "Contact",
        event_action: "Click",
        event_label: "WhatsApp EN LP Header",
        campaign,
        ad_group: messageMatch.adGroup,
      });
    }

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16894364517/OQZvCMXV0foZEOqP7vY9",
        event_callback: function () {
          console.log("Google Ads conversion tracked - EN LP Header");
        },
      });
    }

    await sendGCLIDToWebhook("en_lp_header_cta");

    const encodedMsg = encodeURIComponent(whatsappMessage);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMsg}`,
      "_blank"
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo — no navigation links */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-dental-purple rounded-full flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">CC</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-display font-semibold text-dental-purple text-sm leading-tight">
                Dr. Carla Christoph
              </p>
              <p className="text-[10px] text-dental-gray tracking-wide uppercase">
                Cosmetic Dentist • Ipanema
              </p>
            </div>
          </div>

          {/* Single CTA — no menu items */}
          <button
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            <MessageCircle size={18} />
            <span className="hidden sm:inline">Book via WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default EnLPHeader;
