
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const handleWhatsAppClick = () => {
    // Track event with Google Tag Manager (if available)
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'WhatsApp Hero Button'
      });
    }
    
    // Log for development purposes
    console.log("WhatsApp button clicked from Hero section - tracking event");
    
    // Open WhatsApp with pre-defined message
    const phoneNumber = "5521993304045"; // Correct phone number format with country code
    const message = "Olá! Gostaria de agendar uma consulta.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section id="início" className="min-h-screen relative overflow-hidden pt-28 section-spacing">
      <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 animate-slide-up">
          <h1 className="heading-xl mb-8">
            Dra. Carla Christoph: Dentista em Ipanema para um Sorriso Perfeito
          </h1>
          <p className="body-lg mb-10 max-w-lg">
            Em nossa clínica odontológica em Ipanema, a Dra. Carla Christoph une a excelência da odontologia estética a um atendimento personalizado. Cuidamos do seu sorriso com a dedicação que ele merece.
          </p>
          <div className="flex flex-wrap gap-6">
            <Button
              onClick={handleWhatsAppClick}
              className="bg-dental-gold hover:bg-dental-gold/90 text-white rounded-md px-8 py-6 text-base"
            >
              Agende sua consulta <ArrowRight size={16} className="ml-2" />
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
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in">
          <div className="relative">
            <div className="w-[320px] md:w-[420px] h-[500px] md:h-[600px] bg-dental-purple/10 rounded-2xl flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/3c795ff5-b1ea-4d7b-ab2a-f6267e0a935f.png"
                alt="Dra. Carla Christoph sorrindo vestindo jaleco branco"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-dental-gold/20 rounded-full"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-dental-gold/20 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-dental-beige to-transparent"></div>
    </section>
  );
};

export default Hero;
