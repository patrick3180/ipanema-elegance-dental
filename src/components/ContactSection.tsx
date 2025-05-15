
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Map, Clock, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contato" className="section-spacing bg-dental-beige">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="heading-lg mb-4">
            Entre em Contato
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray mb-4">
            Transforme seu Sorriso: Agende sua Consulta em Ipanema
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
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        placeholder="Nome"
                        className="border-dental-gray/30"
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Telefone"
                        className="border-dental-gray/30"
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      placeholder="E-mail"
                      type="email"
                      className="border-dental-gray/30"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Mensagem"
                      className="min-h-[120px] border-dental-gray/30"
                    />
                  </div>
                  <div>
                    <Button className="w-full bg-dental-purple hover:bg-dental-purple/90">
                      Enviar Mensagem
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
                      Segunda a Sexta: 9h às 18h<br />
                      Sábados: 9h às 13h
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
