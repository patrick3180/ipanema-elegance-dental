
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Map, Clock, Phone, Mail } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !email.trim() || !message.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Track event with Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'contact_form_submit',
        event_category: 'Contact',
        event_action: 'Submit',
        event_label: 'Contact Section Form'
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook('contact_form_submit');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (response.ok) {
        // Google Ads conversion tracking
        if (window.gtag) {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
            'event_callback': function() {
              console.log('Google Ads conversion tracked - Contact Form Submit');
            }
          });
        }

        toast({
          title: "Mensagem enviada!",
          description: "Entraremos em contato em breve.",
        });
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else {
        const data = await response.json().catch(() => ({}));
        toast({
          title: "Erro ao enviar",
          description: data.error || "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Erro ao enviar",
        description: "Verifique sua conexão e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="section-spacing bg-dental-beige">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="heading-lg mb-4">
            Entre em Contato
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray mb-4">
            Agende sua Consulta em Ipanema
          </p>
          {/* Warning about insurance plans */}
          <p className="text-red-600 font-bold text-lg mb-6">
            NÃO TRABALHAMOS COM PLANOS E CONVÊNIOS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-name" className="mb-1.5 block text-dental-purple">
                        Nome
                      </Label>
                      <Input
                        id="contact-name"
                        placeholder="Seu nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border-dental-gray/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone" className="mb-1.5 block text-dental-purple">
                        Telefone
                      </Label>
                      <Input
                        id="contact-phone"
                        placeholder="(21) 99999-9999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="border-dental-gray/30"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contact-email" className="mb-1.5 block text-dental-purple">
                      E-mail
                    </Label>
                    <Input
                      id="contact-email"
                      placeholder="seu@email.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-dental-gray/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-message" className="mb-1.5 block text-dental-purple">
                      Mensagem
                    </Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Como podemos ajudar?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="min-h-[120px] border-dental-gray/30"
                    />
                  </div>
                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-dental-purple hover:bg-dental-purple/90"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-xl font-medium mb-4 text-dental-purple">
                Informações de Contato
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Map className="w-5 h-5 text-dental-gold mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-dental-purple">Endereço</h4>
                    <p className="text-dental-gray">
                      Rua Visconde de Pirajá, 550 - Sala 1107<br />
                      Ipanema, Rio de Janeiro - RJ<br />
                      CEP: 22410-901
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-dental-gold mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-dental-purple">Horário de Atendimento</h4>
                    <p className="text-dental-gray">
                      Segunda a Sexta: 9h às 19h
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-dental-gold mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-dental-purple">Telefone</h4>
                    <p className="text-dental-gray">
                      (21) 3738-7909<br />
                      (21) 99330-4045
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-dental-gold mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-dental-purple">E-mail</h4>
                    <p className="text-dental-gray">
                      contato@dracarlachristoph.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <AspectRatio ratio={16 / 9}>
                <iframe
                  title="Localização da clínica Dra. Carla Christoph no Google Maps - Ipanema, Rio de Janeiro"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.8038117882485!2d-43.20445902529023!3d-22.9554811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd5982d11a59b%3A0xf72b52f26c87f5c0!2sR.%20Visc.%20de%20Piraj%C3%A1%2C%20550%20-%20Ipanema%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2022410-002!5e0!3m2!1spt-BR!2sbr!4v1714480152894!5m2!1spt-BR!2sbr"
                  className="w-full h-full rounded-lg"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
