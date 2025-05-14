
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Lentes de Contato Dental e Facetas de Porcelana",
    description: "Transforme seu sorriso com lentes ultrafinas e facetas de porcelana que proporcionam resultados naturais e duradouros.",
    icon: "💎",
    slug: "lentes-e-facetas"
  },
  {
    title: "Clareamento Dental Profissional",
    description: "Dentes mais brancos e brilhantes com técnicas avançadas de clareamento que respeitam o esmalte dental.",
    icon: "✨",
    slug: "clareamento-dental"
  },
  {
    title: "Próteses Dentárias",
    description: "Recupere função e estética com próteses personalizadas de alta qualidade e acabamento natural.",
    icon: "👄",
    slug: "proteses-dentarias"
  },
  {
    title: "Implantes Dentários",
    description: "Substitua dentes perdidos com implantes de titânio que funcionam como raízes naturais, devolvendo função e estética.",
    icon: "🦷",
    slug: "implantes-dentarios"
  },
  {
    title: "Clínica Geral e Prevenção",
    description: "Check-ups regulares, limpeza profissional e orientações para manter a saúde bucal em dia.",
    icon: "🔍",
    slug: "clinica-geral-e-prevencao"
  },
  {
    title: "Restaurações Estéticas",
    description: "Tratamento de cáries e fraturas com materiais que imitam a aparência natural dos dentes.",
    icon: "🔧",
    slug: "restauracoes-esteticas"
  },
  {
    title: "Tratamento de Canal (Endodontia)",
    description: "Procedimentos precisos para eliminar infecções e preservar dentes comprometidos com conforto e tecnologia.",
    icon: "🌱",
    slug: "tratamento-de-canal"
  },
  {
    title: "Saúde da Gengiva (Periodontia)",
    description: "Prevenção e tratamento de doenças gengivais para garantir a base saudável do seu sorriso.",
    icon: "❤️",
    slug: "saude-da-gengiva"
  }
];

const ServicesSection = () => {
  return (
    <section id="tratamentos" className="section-spacing bg-dental-beige">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-lg mb-4">
            Nossos Tratamentos
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray mb-6">
            Conheça as soluções odontológicas exclusivas que oferecemos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow duration-300 elegant-shadow">
              <CardHeader className="pb-4">
                <div className="text-3xl mb-3">{service.icon}</div>
                <CardTitle className="text-xl font-display">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-dental-purple/80 text-base mb-4">
                  {service.description}
                </CardDescription>
                <a 
                  href={`/servicos/${service.slug}`}
                  className="inline-flex items-center text-dental-gold hover:text-dental-gold/80 font-medium text-sm"
                >
                  Saiba mais <ArrowRight size={16} className="ml-1" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
