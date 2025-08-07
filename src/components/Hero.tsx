import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const handleWhatsAppClick = () => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9'
      });
    }
    
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
        
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-[320px] md:w-[420px] h-[500px] md:h-[600px] bg-dental-purple/10 rounded-2xl flex items-center justify-center overflow-hidden">
              {/* Picture element com WebP e PNG fallback */}
              <picture className="w-full h-full">
                {/* WebP para navegadores modernos (95% dos usuários) */}
                <source 
                  srcSet="/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.webp"
                  type="image/webp"
                />
                
                {/* PNG como fallback para navegadores antigos */}
                <img 
                  src="/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.png"
                  alt="Dra. Carla Christoph, dentista especialista em Ipanema"
                  className="w-full h-full object-cover"
                  width="420"
                  height="600"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
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
