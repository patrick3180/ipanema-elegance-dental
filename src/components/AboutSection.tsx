
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";

const AboutSection = () => {
  const handleWhatsAppClick = () => {
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
    
    // Log for development purposes
    console.log("WhatsApp button clicked from About section - tracking event");
    
    // Open WhatsApp with pre-defined message
    const phoneNumber = "5521993304045"; // Correct phone number format with country code
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
            Uma trajetória de paixão pela odontologia e dedicação em transformar sorrisos em Ipanema
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
                Com mais de 20 anos de experiência dedicados à odontologia, a Dra. Carla Christoph é uma referência em reabilitação oral e odontologia estética em Ipanema. Sua jornada inclui 8 anos de atuação como dentista militar na Odontoclínica Central da Marinha.
              </p>
              <p className="body-md">
                A paixão da Dra. Carla Christoph é restaurar a função mastigatória e a beleza do sorriso de cada paciente. Como especialista em Prótese Dental e com profundo conhecimento em Implantodontia, ela somente utiliza materiais de excelência, assegurando resultados estéticos de alta qualidade e durabilidade.
              </p>
              <p className="body-md">
                Em nossa clínica odontológica em Ipanema, o planejamento do seu tratamento é feito com atenção individualizada. Contamos com tecnologias avançadas, como o escaneamento digital intraoral e ferramentas de design digital do sorriso (DSD), que podem ser utilizadas em casos específicos para aprimorar o planejamento, oferecer maior previsibilidade e permitir que você visualize potenciais resultados, sempre que indicado.
              </p>
            </div>
            
            <div className="pt-6 mt-auto">
              <Button
                onClick={handleWhatsAppClick}
                className="bg-dental-gold hover:bg-dental-gold/90 text-white rounded-md px-6 py-5 mt-4"
              >
                <MessageCircle size={18} className="mr-2" /> Agende sua consulta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;
