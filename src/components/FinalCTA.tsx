import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const FinalCTA = () => {
  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "whatsapp_click",
        event_category: "Contact",
        event_action: "Click",
        event_label: "Homepage Final CTA",
      });
    }

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16894364517/OQZvCMXV0foZEOqP7vY9",
        event_callback: function () {
          console.log("Google Ads conversion tracked - Final CTA");
        },
      });
    }

    await sendGCLIDToWebhook("homepage_final_cta");

    const phoneNumber = "5521993304045";
    const message =
      "Olá! Vi o site e gostaria de agendar uma consulta com a Dra. Carla.";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section className="relative overflow-hidden bg-dental-purple py-20 md:py-28">
      {/* Decorative elements */}
      <div className="hidden md:block absolute top-0 left-0 w-64 h-64 bg-dental-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="hidden md:block absolute bottom-0 right-0 w-96 h-96 bg-dental-gold/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="container-custom relative z-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-dental-gold font-medium mb-4">
          Agende sua consulta
        </p>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-white mb-6 max-w-3xl mx-auto leading-tight">
          Cuide do seu sorriso com quem dedica{" "}
          <span className="text-dental-gold">tempo e atenção</span> a cada
          paciente
        </h2>

        <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
          Mais de 20 anos em Ipanema cuidando de sorrisos com calma,
          planejamento e tecnologia. Agende pelo WhatsApp — respondemos em
          minutos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleWhatsAppClick}
            className="bg-dental-gold hover:bg-dental-gold-dark text-white rounded-md px-10 py-7 text-lg shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-hover"
          >
            <MessageCircle size={20} className="mr-3" />
            <div className="flex flex-col text-left leading-tight">
              <span className="font-medium">Agendar minha consulta</span>
              <span className="text-xs text-white/80">WhatsApp 24h</span>
            </div>
            <ArrowRight size={16} className="ml-3" />
          </Button>
        </div>

        <p className="text-white/40 text-sm mt-6">
          Rua Visconde de Pirajá, 550 — Sala 1107, Ipanema
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
