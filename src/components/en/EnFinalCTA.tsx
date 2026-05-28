import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const EnFinalCTA = () => {
  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "whatsapp_click",
        event_category: "Contact",
        event_action: "Click",
        event_label: "WhatsApp EN Final CTA",
      });
    }

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16894364517/OQZvCMXV0foZEOqP7vY9",
        event_callback: function () {
          console.log("Google Ads conversion tracked - EN Final CTA");
        },
      });
    }

    await sendGCLIDToWebhook("en_home_final_cta");

    window.open(
      "https://wa.me/5521993304045?text=Hello!%20I'd%20like%20to%20book%20an%20appointment.",
      "_blank"
    );
  };

  return (
    <section className="relative overflow-hidden bg-dental-purple py-20 md:py-28">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-dental-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-dental-gold/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="container-custom relative z-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-dental-gold font-medium mb-4">
          Book Your Appointment
        </p>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-white mb-6 max-w-3xl mx-auto leading-tight">
          Your smile deserves{" "}
          <span className="text-dental-gold">time and attention</span>
        </h2>

        <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
          Over 20 years in Ipanema caring for smiles with patience, planning,
          and digital precision. Reach out on WhatsApp — we reply in your
          language.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleWhatsAppClick}
            className="bg-dental-gold hover:bg-dental-gold-dark text-white rounded-md px-10 py-7 text-lg shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-hover"
          >
            <MessageCircle size={20} className="mr-3" />
            <div className="flex flex-col text-left leading-tight">
              <span className="font-medium">Book Your Appointment</span>
              <span className="text-xs text-white/80">WhatsApp — We reply in your language</span>
            </div>
            <ArrowRight size={16} className="ml-3" />
          </Button>
        </div>

        <p className="text-white/40 text-sm mt-6">
          Rua Visconde de Pirajá, 550 — Suite 1107, Ipanema
        </p>
      </div>
    </section>
  );
};

export default EnFinalCTA;
