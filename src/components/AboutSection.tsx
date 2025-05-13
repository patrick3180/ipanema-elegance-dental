
import React from "react";
import { Separator } from "@/components/ui/separator";

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 bg-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
            Sobre Dra. Carla Christoph
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-charcoal/80 mb-6">
            Excelência e dedicação em cada atendimento
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square bg-dental-sand/50 rounded-2xl overflow-hidden">
            <div className="h-full flex items-center justify-center">
              <div className="text-dental-taupe text-center p-8">
                <p className="text-lg font-medium mb-2">Imagem da Dra. Carla no consultório</p>
                <p className="text-sm">Esta é uma imagem placeholder</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              Com mais de 15 anos de experiência, a Dra. Carla Christoph é especialista em odontologia estética e reabilitação oral pela renomada Universidade de São Paulo.
            </p>
            <p className="text-lg leading-relaxed">
              Seu consultório em Ipanema combina tecnologia de ponta e um ambiente acolhedor, proporcionando tratamentos personalizados que respeitam a individualidade de cada paciente.
            </p>
            <p className="text-lg leading-relaxed">
              Comprometida com a excelência, a Dra. Carla realiza constantes atualizações profissionais nos principais centros odontológicos do Brasil e exterior, trazendo as técnicas mais modernas e seguras para seus pacientes.
            </p>

            <ul className="grid grid-cols-2 gap-4 mt-8">
              {[
                "Odontologia Estética",
                "Reabilitação Oral",
                "Implantes Dentários",
                "Facetas de Porcelana",
                "Clareamento Dental",
                "Tratamento de Gengivas"
              ].map((specialty, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-dental-gold mr-2"></div>
                  <span>{specialty}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
