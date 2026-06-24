import React from "react";
import { MessageCircle } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

interface ProteseStickyCTAProps {
  whatsappNumber: string;
  whatsappMessage: string;
}

/**
 * Barra fixa de WhatsApp no rodapé — apenas mobile (95% do tráfego desta LP).
 * Alvo de toque grande e sempre visível, em vez de depender da bolha de canto.
 */
const ProteseStickyCTA: React.FC<ProteseStickyCTAProps> = ({
  whatsappNumber,
  whatsappMessage,
}) => {
  const handleClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "whatsapp_click",
        event_category: "Contact",
        event_action: "Click",
        event_label: "Sticky Bar - Protese V2",
      });
    }

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16894364517/OQZvCMXV0foZEOqP7vY9",
        event_callback: function () {
          if (process.env.NODE_ENV === "development") {
            console.log("Google Ads conversion tracked - Sticky Bar Protese V2");
          }
        },
      });
    }

    await sendGCLIDToWebhook("sticky_bar_protese_v2");

    const encoded = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
  };

  return (
    <div className="ph-sticky md:hidden">
      <button type="button" onClick={handleClick} className="ph-sticky-btn">
        <MessageCircle size={20} />
        <span className="ph-sticky-labels">
          <b>Agendar minha consulta</b>
          <small>WhatsApp · resposta 24h</small>
        </span>
      </button>
    </div>
  );
};

export default ProteseStickyCTA;
