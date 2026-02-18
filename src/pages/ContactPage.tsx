import React from "react";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Mail, MessageCircle } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const ContactPage = () => {
  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'WhatsApp Contact Page Button'
      });
    }

    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function () {
          console.log('Google Ads conversion tracked - Contact page button');
        }
      });
    }

    await sendGCLIDToWebhook('contact_page_button');

    const phoneNumber = "5521993304045";
    const message = "Olá! Gostaria de agendar uma consulta.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <>
      <SEOHead
        title="Contato | Dra. Carla Christoph - Dentista em Ipanema"
        description="Entre em contato com a Dra. Carla Christoph em Ipanema. Agende sua consulta pelo WhatsApp ou visite nosso consultório na Rua Visconde de Pirajá, 550."
        canonicalUrl="https://dracarlachristoph.com/contato"
      />
      <PageLayout>
        <section className="section-spacing">
          <div className="container-custom">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="heading-lg mb-4">Contato</h1>
              <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
              <p className="text-dental-gray mb-4">
                Entre em contato conosco para agendar sua consulta
              </p>
              <p className="text-dental-gray text-sm">
                Atendimento particular.
              </p>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-dental-beige/50 p-8 rounded-lg text-center mb-12 max-w-2xl mx-auto">
              <h2 className="text-2xl font-display mb-4">Agende pelo WhatsApp</h2>
              <p className="text-dental-gray mb-6">A forma mais rápida de agendar sua consulta. Atendimento 24h.</p>
              <Button onClick={handleWhatsAppClick} className="bg-dental-gold hover:bg-dental-gold/90 text-white px-8 py-6" size="lg">
                <MessageCircle size={20} className="mr-2" />
                Chamar no WhatsApp
              </Button>
            </div>

            {/* Info + Map grid */}
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-2xl font-display mb-6">Informações de contato</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-dental-gold mt-1" />
                    <div>
                      <p className="font-medium">Endereço</p>
                      <p className="text-dental-gray">
                        Rua Visconde de Pirajá, 550 - Sala 1107<br />
                        Ipanema, Rio de Janeiro - RJ<br />
                        CEP: 22410-002
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-dental-gold mt-1" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-dental-gray">
                        (21) 3738-7909<br />
                        (21) 99330-4045
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-dental-gold mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-dental-gray">contato@dracarlachristoph.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-dental-gold mt-1" />
                    <div>
                      <p className="font-medium">Horário de atendimento</p>
                      <p className="text-dental-gray">
                        Segunda a Sexta: 9h às 19h
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-2xl font-display mb-6">Localização</h2>
                <div className="aspect-video bg-dental-beige/50 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4586.581678884269!2d-43.2116873!3d-22.9836633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd5070f90d87f%3A0x446370e6f29c86c4!2sDra.%20Carla%20Christoph%20-%20Reabilita%C3%A7%C3%A3o%20oral%20e%20est%C3%A9tica!5e1!3m2!1spt-BR!2sbr!4v1747142945090!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de localização do consultório"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default ContactPage;
