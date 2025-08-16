import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const Hero = () => {
  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'WhatsApp Hero Button'
      });
    }

    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
      });
    }

    await sendGCLIDToWebhook('hero_button');

    const phoneNumber = "5521993304045";
    const message = "Olá! Gostaria de agendar uma consulta.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section className="hero-section min-h-screen flex items-center pt-[112px]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 lg:justify-end">
            <div className="relative w-[320px] h-[500px] md:w-[420px] md:h-[600px] mx-auto lg:ml-auto">
              <div className="absolute inset-0 bg-dental-purple/10 rounded-[200px_200px_0_0] transform rotate-6"></div>
              <div className="absolute inset-0 bg-dental-gold/20 rounded-[200px_200px_0_0] transform -rotate-3"></div>
              <div className="relative w-full h-full rounded-[200px_200px_0_0] overflow-hidden">
                <picture>
                  {/* Mobile - 320x480 */}
                  <source 
                    media="(max-width: 767px)"
                    type="image/avif"
                    srcSet="/lovable-uploads/hero-320.avif 320w, /lovable-uploads/hero-640.avif 640w"
                    sizes="320px"
                  />
                  <source 
                    media="(max-width: 767px)"
                    type="image/webp"
                    srcSet="/lovable-uploads/hero-320.webp 320w, /lovable-uploads/hero-640.webp 640w"
                    sizes="320px"
                  />
                  
                  {/* Tablet - 420x600 */}
                  <source 
                    media="(min-width: 768px) and (max-width: 1023px)"
                    type="image/avif"
                    srcSet="/lovable-uploads/hero-420.avif 420w, /lovable-uploads/hero-840.avif 840w"
                    sizes="420px"
                  />
                  <source 
                    media="(min-width: 768px) and (max-width: 1023px)"
                    type="image/webp"
                    srcSet="/lovable-uploads/hero-420.webp 420w, /lovable-uploads/hero-840.webp 840w"
                    sizes="420px"
                  />
                  
                  {/* Desktop - 600x900 */}
                  <source 
                    media="(min-width: 1024px)"
                    type="image/avif"
                    srcSet="/lovable-uploads/hero-600.avif 600w, /lovable-uploads/hero-1200.avif 1200w"
                    sizes="600px"
                  />
                  <source 
                    media="(min-width: 1024px)"
                    type="image/webp"
                    srcSet="/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.webp 600w"
                    sizes="600px"
                  />
                  
                  {/* Fallback */}
                  <img
                    src="/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.webp"
                    alt="Dra. Carla Christoph - Dentista especialista em Ipanema"
                    className="w-full h-full object-cover"
                    width="600"
                    height="900"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h1 className="heading-xl mb-6">
              Transforme Seu Sorriso com
              <span className="block text-dental-gold mt-2">Odontologia de Excelência</span>
            </h1>
            <p className="body-lg mb-8">
              Mais de 20 anos de experiência em reabilitação oral e estética dental em Ipanema
            </p>
            <Button
              onClick={handleWhatsAppClick}
              className="bg-dental-gold hover:bg-dental-gold/90 text-white rounded-md px-8 py-6"
              size="lg"
            >
              <MessageCircle size={20} className="mr-2" />
              <div className="flex flex-col text-left leading-tight">
                <span className="font-medium">Agendar Consulta</span>
                <span className="text-xs text-white/80">WhatsApp 24h</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
