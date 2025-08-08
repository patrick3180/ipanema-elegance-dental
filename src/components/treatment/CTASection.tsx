
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { sendGCLIDToWebhook } from "@/utils/gclid";

interface CTASectionProps {
  title: string;
  whatsappMessage: string;
  heading?: string;
}

const CTASection = ({ title, whatsappMessage, heading }: CTASectionProps) => {
  const handleWhatsAppClick = async () => {
    // Track event with Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_button_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'Treatment CTA Button'
      });
    }
    
    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function() {
          console.log('Google Ads conversion tracked - Treatment CTA button');
        }
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook('treatment_cta_button');
    
    // Open WhatsApp with pre-defined message
    window.open(`https://wa.me/5521993304045?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
  };

  return (
    <div className="my-12 bg-dental-beige/50 p-8 rounded-lg border border-dental-gold/20">
      <h2 className="heading-md mb-4 text-center">{heading || "Pronto para Conquistar o Sorriso dos Seus Sonhos?"}</h2>
      <p className="body-md text-center mb-8">
        Se você deseja saber mais sobre {title.toLowerCase()}, agende uma avaliação com a Dra. Carla Christoph. Em nossa clínica em Ipanema, estamos prontos para atendê-lo.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          id="btn-whatsapp-treatment-cta"
          className="bg-dental-purple hover:bg-dental-purple/90 text-white rounded-md px-6 py-5" 
          onClick={handleWhatsAppClick}
        >
          <div className="flex flex-col text-left leading-tight"><span className="font-medium">Agendar Avaliação</span><span className="text-xs text-white/80">WhatsApp 24h</span></div>
        </Button>
        <Button variant="outline" className="border-dental-gold text-dental-gold hover:bg-dental-gold/10" asChild>
          <Link to="/servicos">
            Ver Outros Tratamentos
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CTASection;
