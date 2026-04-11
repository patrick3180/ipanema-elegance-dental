import React from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendGCLIDToWebhook } from "@/utils/gclid";

interface EnLPMidCTAProps {
  whatsappNumber: string;
  whatsappMessage: string;
}

const EnLPMidCTA: React.FC<EnLPMidCTAProps> = ({
  whatsappNumber,
  whatsappMessage,
}) => {
  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "whatsapp_click",
        event_category: "Contact",
        event_action: "Click",
        event_label: "WhatsApp EN LP Mid CTA",
      });
    }

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16894364517/OQZvCMXV0foZEOqP7vY9",
        event_callback: function () {
          console.log("Google Ads conversion tracked - EN LP Mid CTA");
        },
      });
    }

    await sendGCLIDToWebhook("en_lp_mid_cta");

    const encodedMsg = encodeURIComponent(whatsappMessage);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMsg}`,
      "_blank"
    );
  };

  return (
    <section className="py-10 bg-dental-purple">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-white/80 text-sm mb-4">
          Wondering what your treatment plan could look like? Send a smile photo via WhatsApp — Dr. Carla will personally assess your case.
        </p>
        <Button
          onClick={handleWhatsAppClick}
          className="bg-dental-gold hover:bg-dental-gold-dark text-white rounded-lg px-8 py-6 text-base shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-hover"
        >
          <MessageCircle size={18} className="mr-3" />
          Send Your Photos via WhatsApp
          <ArrowRight size={16} className="ml-3" />
        </Button>
        <p className="text-white/40 text-xs mt-3">
          Private practice in Ipanema • We reply in your language
        </p>
      </div>
    </section>
  );
};

export default EnLPMidCTA;
