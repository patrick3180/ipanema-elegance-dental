import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, MessageCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { seoMonitor } from "@/utils/seoMonitoring";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const NotFoundPage = () => {
  useEffect(() => {
    seoMonitor.logNotFound(window.location.pathname);
  }, []);

  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'WhatsApp 404 Page Button'
      });
    }
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function() {
          console.log('Google Ads conversion tracked - 404 page button');
        }
      });
    }
    await sendGCLIDToWebhook('404_page_button');
    const phoneNumber = "5521993304045";
    const message = "Olá! Não encontrei a página que procurava no site. Podem me ajudar?";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <>
      <SEOHead
        title="Página Não Encontrada | Dra. Carla Christoph"
        description="A página que você procura não foi encontrada. Conheça nossos tratamentos odontológicos em Ipanema."
        noIndex={true}
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-dental-beige px-6 text-center">
        <Search className="w-16 h-16 text-dental-gold mb-6" />
        <h1 className="heading-lg mb-4 text-dental-purple">Página Não Encontrada</h1>
        <p className="body-md mb-4 max-w-md text-dental-gray">
          O endereço que você digitou não existe ou foi movido.
        </p>
        <p className="body-sm mb-8 max-w-md text-dental-gray">
          Mas estamos aqui para ajudar. Veja algumas opções:
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            className="bg-dental-gold hover:bg-dental-gold/90 text-white"
          >
            <a href="/">
              <ArrowLeft size={16} className="mr-2" />
              Página Inicial
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-dental-purple text-dental-purple hover:bg-dental-purple hover:text-white"
          >
            <a href="/servicos">
              Ver Tratamentos
            </a>
          </Button>
          <Button
            onClick={handleWhatsAppClick}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <MessageCircle size={16} className="mr-2" />
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
