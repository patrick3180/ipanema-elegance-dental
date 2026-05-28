import React from "react";
import { MessageCircle, ArrowRight, MapPin, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendGCLIDToWebhook } from "@/utils/gclid";

interface EnLPFinalCTAProps {
  title: string;
  subtitle: string;
  buttonText: string;
  urgency?: string;
  whatsappNumber: string;
  whatsappMessage: string;
  campaign: string;
  messageMatch: { adGroup: string; keyword: string };
}

const EnLPFinalCTA: React.FC<EnLPFinalCTAProps> = ({
  title,
  subtitle,
  buttonText,
  urgency,
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
        event_label: "WhatsApp EN LP Final CTA",
        campaign,
        ad_group: messageMatch.adGroup,
      });
    }

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16894364517/OQZvCMXV0foZEOqP7vY9",
        event_callback: function () {
          console.log("Google Ads conversion tracked - EN LP Final CTA");
        },
      });
    }

    await sendGCLIDToWebhook("en_lp_final_cta");

    const encodedMsg = encodeURIComponent(whatsappMessage);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMsg}`,
      "_blank"
    );
  };

  return (
    <section className="relative overflow-hidden bg-dental-purple py-20 md:py-28">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-dental-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-dental-gold/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-white mb-5 leading-tight">
          {title}
        </h2>

        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>

        <Button
          onClick={handleWhatsAppClick}
          className="bg-dental-gold hover:bg-dental-gold-dark text-white rounded-lg px-10 py-7 text-lg shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-hover"
        >
          <MessageCircle size={20} className="mr-3" />
          <div className="flex flex-col text-left leading-tight">
            <span className="font-semibold">{buttonText}</span>
            <span className="text-xs text-white/80">WhatsApp — We reply in your language</span>
          </div>
          <ArrowRight size={16} className="ml-3" />
        </Button>

        {/* Urgency text */}
        {urgency && (
          <p className="text-white/50 text-sm mt-6 max-w-lg mx-auto italic">
            {urgency}
          </p>
        )}

        {/* Footer info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10 text-white/40 text-xs">
          <div className="flex items-center gap-1.5">
            <MapPin size={12} />
            Rua Visconde de Pirajá, 550 — Suite 1107, Ipanema
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} />
            Mon–Fri 9am–6pm (GMT-3)
          </div>
          <div className="flex items-center gap-1.5">
            <Globe size={12} />
            We reply in your language
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnLPFinalCTA;
