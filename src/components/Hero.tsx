
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();
  
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
    
    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9'
      });
    }
    
    // Open WhatsApp with pre-defined message
    const phoneNumber = "5521993304045"; // Correct phone number format with country code
    const message = "Olá! Gostaria de agendar uma consulta.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section 
      id="início" 
      className="hero-section"
      style={{ paddingTop: isMobile ? "150px" : "112px" }}
    >
      <div className="hero-container">
        <div>
          <h1 className="hero-heading">
            Dra. Carla Christoph: Dentista em Ipanema para um Sorriso Perfeito
          </h1>
          <p className="hero-text">
            Em nossa clínica odontológica em Ipanema, a Dra. Carla Christoph une a excelência da odontologia estética a um atendimento personalizado. Cuidamos do seu sorriso com a dedicação que ele merece.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleWhatsAppClick();
              }}
              className="hero-button"
            >
              Agende sua consulta <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
            </a>
            <Button
              variant="outline"
              asChild
              className="border-dental-gray text-dental-purple hover:bg-dental-beige/50 rounded-md px-8 py-6 text-base"
            >
              <a href="#tratamentos">Conheça nossos tratamentos</a>
            </Button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ 
              width: '320px', 
              height: '500px', 
              backgroundColor: 'hsl(var(--background))',
              borderRadius: '1rem',
              overflow: 'hidden'
            }}>
              <img 
                src="/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.png"
                alt="Dra. Carla Christoph, dentista em Ipanema"
                className="hero-image"
                width="420"
                height="600"
                loading="eager"
                fetchPriority="high"
                data-hero-image="true"
                data-priority="high"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
