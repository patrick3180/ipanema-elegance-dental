
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contato" className="section-spacing">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="heading-lg mb-4">Contato</h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray">
            Transforme seu Sorriso: Agende sua Consulta em Ipanema
          </p>
          <p className="text-red-600 font-bold mt-4 text-xl">
            NÃO TRABALHAMOS COM PLANOS E CONVÊNIOS
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <form className="space-y-6">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome completo"
                  className="w-full px-4 py-3 rounded border border-dental-gray/20 focus:outline-none focus:ring-2 focus:ring-dental-gold/50"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full px-4 py-3 rounded border border-dental-gray/20 focus:outline-none focus:ring-2 focus:ring-dental-gold/50"
                  required
                />
                <input
                  type="tel"
                  placeholder="Telefone"
                  className="w-full px-4 py-3 rounded border border-dental-gray/20 focus:outline-none focus:ring-2 focus:ring-dental-gold/50"
                  required
                />
              </div>
              <div>
                <select
                  className="w-full px-4 py-3 rounded border border-dental-gray/20 focus:outline-none focus:ring-2 focus:ring-dental-gold/50 bg-white"
                  required
                >
                  <option value="" disabled selected>
                    Selecione o serviço de interesse
                  </option>
                  <option value="Lentes de Contato e Facetas">Lentes de Contato e Facetas</option>
                  <option value="Clareamento Dental">Clareamento Dental</option>
                  <option value="Implantes Dentários">Implantes Dentários</option>
                  <option value="Ortodontia">Ortodontia</option>
                  <option value="Prótese Dentária">Prótese Dentária</option>
                  <option value="Clínica Geral e Prevenção">Clínica Geral e Prevenção</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div>
                <textarea
                  placeholder="Mensagem"
                  rows={4}
                  className="w-full px-4 py-3 rounded border border-dental-gray/20 focus:outline-none focus:ring-2 focus:ring-dental-gold/50 resize-none"
                ></textarea>
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full bg-dental-purple text-white hover:bg-dental-purple/90 py-6 font-medium"
                >
                  Enviar mensagem
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-display text-xl font-medium text-dental-purple mb-4">
                Informações de Contato
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-dental-gold mr-3 mt-0.5" />
                  <div>
                    <p className="text-dental-gray">Telefone</p>
                    <p className="font-medium">(21) 99999-9999</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-dental-gold mr-3 mt-0.5" />
                  <div>
                    <p className="text-dental-gray">E-mail</p>
                    <p className="font-medium">contato@dracarla.com.br</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-dental-gold mr-3 mt-0.5" />
                  <div>
                    <p className="text-dental-gray">Endereço</p>
                    <p className="font-medium">
                      Rua Visconde de Pirajá, 000 - Sala 000
                      <br />
                      Ipanema, Rio de Janeiro - RJ, 22410-001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-medium text-dental-purple mb-4">
                Horário de Funcionamento
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-dental-gray">Segunda a Sexta</p>
                  <p className="font-medium">09:00 – 18:00</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-dental-gray">Sábado</p>
                  <p className="font-medium">09:00 – 13:00</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-dental-gray">Domingo</p>
                  <p className="font-medium">Fechado</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-medium text-dental-purple mb-4">
                Redes Sociais
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-dental-beige/50 hover:bg-dental-gold/20 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-dental-purple"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-dental-beige/50 hover:bg-dental-gold/20 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-dental-purple"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-dental-beige/50 hover:bg-dental-gold/20 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-dental-purple"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
