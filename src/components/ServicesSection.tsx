
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Lentes de Contato Dental e Facetas de Porcelana",
    description: "Transforme seu sorriso com finas lâminas de porcelana, corrigindo cor, forma e imperfeições com naturalidade e precisão estética.",
    icon: "💎",
    slug: "lentes-de-contato-dental-e-facetas-de-porcelana"
  },
  {
    title: "Clareamento Dental Profissional",
    description: "Conquiste dentes visivelmente mais brancos e um sorriso radiante com nossas técnicas de clareamento seguras e eficazes, realizadas em consultório ou supervisionadas em casa.",
    icon: "✨",
    slug: "clareamento-dental"
  },
  {
    title: "Próteses Dentárias",
    description: "Recupere a função mastigatória e a estética do seu sorriso com próteses dentárias personalizadas, desenvolvidas pela especialista Dra. Carla Christoph.",
    icon: "👄",
    slug: "protese-dentaria"
  },
  {
    title: "Implantes Dentários",
    description: "A solução definitiva para a perda de dentes. Implantes seguros e duradouros para restaurar seu sorriso e qualidade de vida em Ipanema.",
    icon: "🦷",
    slug: "implantes-dentarios"
  },
  {
    title: "Clínica Geral e Prevenção",
    description: "Cuide da sua saúde bucal com nossos check-ups digitais, profilaxia (limpeza) profissional e planos de prevenção personalizados.",
    icon: "🔍",
    slug: "clinica-geral-e-prevencao"
  },
  {
    title: "Restaurações Estéticas",
    description: "Tratamento de cáries e reconstrução de dentes fraturados ou trincados com materiais modernos que imitam a cor natural dos seus dentes.",
    icon: "🔧",
    slug: "restauracoes-esteticas"
  },
  {
    title: "Tratamento de Canal (Endodontia)",
    description: "Alivie a dor e preserve seu dente natural com nosso tratamento de canal realizado com técnicas avançadas e foco no seu conforto.",
    icon: "🌱",
    slug: "tratamento-de-canal"
  },
  {
    title: "Saúde da Gengiva (Periodontia)",
    description: "Tratamento especializado para gengivite e periodontite, cuidando da base do seu sorriso e prevenindo problemas futuros.",
    icon: "❤️",
    slug: "saude-da-gengiva"
  }
];

const ServicesSection = () => {
  // Helper function to determine the correct URL for each service
  const getServiceUrl = (slug: string) => {
    // Direct routes for specific treatments
    const directRoutes = [
      "lentes-de-contato-dental-e-facetas-de-porcelana",
      "clareamento-dental",
      "protese-dentaria",
      "implantes-dentarios",
      "clinica-geral-e-prevencao",
      "restauracoes-esteticas",
      "tratamento-de-canal",
      "saude-da-gengiva"
    ];

    return directRoutes.includes(slug) ? `/${slug}` : `/servicos/${slug}`;
  };

  return (
    <section id="tratamentos" className="section-spacing bg-dental-beige">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-lg mb-4">
            Nossos Tratamentos Odontológicos para seu Sorriso em Ipanema
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray mb-6">
            Em nossa clínica odontológica em Ipanema, a Dra. Carla Christoph oferece uma gama completa de tratamentos odontológicos, desde a prevenção e cuidados essenciais até a mais avançada odontologia estética e reabilitação oral. Explore nossas soluções e descubra como podemos cuidar do seu sorriso.
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
                  href={getServiceUrl(service.slug)}
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
