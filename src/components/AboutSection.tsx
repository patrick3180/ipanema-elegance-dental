
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const AboutSection = () => {
  const handleWhatsAppClick = async () => {
    // Track event with Google Tag Manager (if available)
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'WhatsApp About Section Button'
      });
    }
    
    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function() {
          console.log('Google Ads conversion tracked - About section button');
        }
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook('about_section_button');
    
    // Open WhatsApp with pre-defined message
    const phoneNumber = "5521993304045";
    const message = "Olá! Gostaria de agendar uma consulta.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return <section id="sobre" className="section-spacing bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-lg mb-4">
            Conheça a Dra. Carla Christoph, sua Dentista em Ipanema
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray mb-6">
            Mais de 20 anos dedicados à reabilitação oral e odontologia estética em Ipanema
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-square rounded-2xl overflow-hidden">
            <OptimizedImage 
              src="/lovable-uploads/fef24f70-4659-453e-8fee-79dee34b6220.png" 
              alt="Dra. Carla Christoph, dentista em Ipanema, sorrindo em seu consultório de odontologia estética." 
              className="w-full h-full object-cover"
              width={600}
              height={600}
              priority={false}
              responsive={true}
            />
          </div>

          <div className="flex flex-col justify-between h-full">
            <div className="space-y-6">
              <p className="body-md">
                Com mais de duas décadas em Ipanema, a Dra. Carla construiu sua reputação tratando cada paciente de forma individual, com tempo e atenção. Sua formação inclui 8 anos como dentista militar na Odontoclínica Central da Marinha, experiência que trouxe disciplina e precisão para sua prática clínica.
              </p>
              <p className="body-md">
                Especialista em Prótese Dentária e Implantodontia, a Dra. Carla utiliza escaneamento digital intraoral e ferramentas de planejamento do sorriso para oferecer previsibilidade e segurança em cada tratamento. Cada caso é tratado como único, com o tempo necessário para ouvir, planejar e executar.
              </p>
            </div>
            
            <div className="pt-6 mt-auto">
              <Button
                onClick={handleWhatsAppClick}
                className="bg-dental-purple hover:bg-dental-purple/90 text-white rounded-md px-6 py-5 mt-4"
              >
                <MessageCircle size={18} className="mr-2" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="font-medium">Agendar minha consulta</span>
                  <span className="text-xs text-white/80">WhatsApp 24h</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;
