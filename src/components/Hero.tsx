import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const Hero = () => {

  const handleWhatsAppClick = async () => {
    // Track event with Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'Hero CTA Button'
      });
    }

    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function() {
          console.log('Google Ads conversion tracked - Hero CTA button');
        }
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook('hero_button');
    
    const phoneNumber = "5521993304045";
    const message = "Olá! Gostaria de agendar uma consulta.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section 
      id="início" 
      className="hero-section min-h-screen relative overflow-hidden section-spacing"
      style={{ paddingTop: "112px" }}
    >
      <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <h1 className="heading-xl mb-8">
            Dra. Carla Christoph — Dentista Especialista em Ipanema
          </h1>
          <p className="body-lg mb-10 max-w-lg">
            Odontologia estética e reabilitação oral com tempo e atenção ao seu caso.
          </p>
          <div className="flex flex-wrap gap-6">
            <Button
              onClick={handleWhatsAppClick}
              className="bg-dental-purple hover:bg-dental-purple/90 text-white rounded-md px-8 py-6 text-base"
            >
              <div className="flex flex-col text-left leading-tight"><span className="font-medium">Agendar minha consulta</span><span className="text-xs text-white/80">WhatsApp 24h</span></div><ArrowRight size={16} className="ml-3" />
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-dental-gray text-dental-purple hover:bg-dental-beige/50 rounded-md px-8 py-6 text-base"
            >
              <a href="#tratamentos">Conheça nossos tratamentos</a>
            </Button>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-[320px] md:w-[420px] h-[500px] md:h-[600px] bg-dental-purple/10 rounded-2xl flex items-center justify-center overflow-hidden">
              <picture>
                <source 
                  srcSet="/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.webp" 
                  type="image/webp"
                />
                <img 
                  src="/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.png"
                  alt="Dra. Carla Christoph, dentista especialista em Ipanema"
                  className="w-full h-full object-cover"
                  width="420"
                  height="600"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                />
              </picture>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-dental-gold/20 rounded-full"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-dental-gold/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
