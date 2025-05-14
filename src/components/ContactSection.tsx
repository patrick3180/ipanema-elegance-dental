import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    // In a real implementation, this would send the form data
  };
  return <section id="contato" className="py-24 bg-dental-cream">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
            Entre em Contato
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-charcoal/80 mb-6">Transforme seu Sorriso: Agende sua Consulta em Ipanema</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-display mb-6">Envie uma mensagem</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nome completo
                    </label>
                    <Input id="name" placeholder="Seu nome" className="border-dental-taupe/30 focus:border-dental-gold" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      E-mail
                    </label>
                    <Input id="email" type="email" placeholder="seu@email.com" className="border-dental-taupe/30 focus:border-dental-gold" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Telefone
                  </label>
                  <Input id="phone" placeholder="(21) 99999-9999" className="border-dental-taupe/30 focus:border-dental-gold" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensagem
                  </label>
                  <Textarea id="message" placeholder="Como podemos ajudar?" className="min-h-[120px] border-dental-taupe/30 focus:border-dental-gold" required />
                </div>
                <Button type="submit" className="w-full bg-dental-gold hover:bg-dental-gold/90 text-white">
                  Enviar mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display mb-6">Informações de contato</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="text-dental-gold mt-1" />
                  <div>
                    <p className="font-medium">Endereço</p>
                    <p className="text-dental-charcoal/80">
                      Rua Visconde de Pirajá, 550 - Sala 1107<br />
                      Ipanema, Rio de Janeiro - RJ<br />
                      CEP: 22410-901
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-dental-gold mt-1" />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-dental-charcoal/80">
                      (21) 3738-7909<br />
                      (21) 99330-4045
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-dental-gold mt-1" />
                  <div>
                    <p className="font-medium">Horário de atendimento</p>
                    <p className="text-dental-charcoal/80">
                      Segunda à Sexta: 9h às 19h
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="text-dental-gold mt-1" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-dental-charcoal/80">(21) 99330-4045</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-display mb-6">Localização</h3>
              <div className="aspect-video bg-dental-sand/50 rounded-lg overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4586.581678884269!2d-43.2116873!3d-22.9836633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd5070f90d87f%3A0x446370e6f29c86c4!2sDra.%20Carla%20Christoph%20-%20Reabilita%C3%A7%C3%A3o%20oral%20e%20est%C3%A9tica!5e1!3m2!1spt-BR!2sbr!4v1747142945090!5m2!1spt-BR!2sbr" width="100%" height="100%" style={{
                border: 0
              }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa de localização do consultório" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;