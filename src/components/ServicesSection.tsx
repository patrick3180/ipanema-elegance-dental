
import React from "react";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    title: "Lentes de Contato Dental e Facetas de Porcelana",
    description: "Lâminas ultrafinas de porcelana que corrigem cor, forma e pequenas imperfeições. Resultado natural e duradouro, planejado digitalmente com iTero Element 5D.",
    image: "/Lentes.webp",
    slug: "lentes-de-contato-dental-e-facetas-de-porcelana"
  },
  {
    title: "Clareamento Dental Profissional",
    description: "Dentes mais brancos com segurança. Protocolo em consultório ou supervisionado em casa, com controle de sensibilidade e resultado natural.",
    image: "/Clareamento.webp",
    slug: "clareamento-dental"
  },
  {
    title: "Próteses Dentárias",
    description: "Recupere a função mastigatória e a estética do seu sorriso com próteses dentárias personalizadas, desenvolvidas pela especialista Dra. Carla Christoph.",
    image: "/Protese.webp",
    slug: "protese-dentaria"
  },
  {
    title: "Implantes Dentários",
    description: "Reabilitação de dentes perdidos com implantes que devolvem função mastigatória e estética. Planejamento digital para casos unitários ou reabilitações completas.",
    image: "/Implante.webp",
    slug: "implantes-dentarios"
  },
  {
    title: "Ortodontia",
    description: "Alinhamento dental e correção de mordida com aparelhos fixos, estéticos ou alinhadores Invisalign\u00ae. Parceria com o Dr. Bruno, Doutor em Ortodontia pela UERJ.",
    image: "/Ortodontia.webp",
    slug: "ortodontia"
  },
  {
    title: "Clínica Geral e Prevenção",
    description: "Cuide da sua saúde bucal com nossos check-ups digitais, profilaxia (limpeza) profissional e planos de prevenção personalizados.",
    image: "/Profilaxia.webp",
    slug: "clinica-geral-e-prevencao"
  },
  {
    title: "Restaurações Estéticas",
    description: "Tratamento de cáries e reconstrução de dentes fraturados com resinas e cerâmicas que reproduzem a cor e translucidez natural do dente.",
    image: "/Restarações.webp",
    slug: "restauracoes-esteticas"
  },
  {
    title: "Tratamento de Canal (Endodontia)",
    description: "Tratamento de canal para eliminar dor e preservar o dente natural. Procedimento realizado por endodontista especializado, com acompanhamento da Dra. Carla do início ao fim.",
    image: "/Endodontia.webp",
    slug: "tratamento-de-canal"
  },
  {
    title: "Saúde da Gengiva (Periodontia)",
    description: "Tratamento especializado para gengivite e periodontite, cuidando da base do seu sorriso e prevenindo problemas futuros.",
    image: "/Periodontia.webp",
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
      "ortodontia",
      "clinica-geral-e-prevencao",
      "restauracoes-esteticas",
      "tratamento-de-canal",
      "saude-da-gengiva"
    ];

    return directRoutes.includes(slug) ? `/${slug}` : `/servicos/${slug}`;
  };

  return (
    <section id="tratamentos" className="bg-dental-beige">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="heading-lg mb-4">
            Nossos Tratamentos Odontológicos para seu Sorriso em Ipanema
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray mb-6">
            Em nossa clínica odontológica em Ipanema, a Dra. Carla Christoph oferece uma gama completa de tratamentos odontológicos, desde a prevenção e cuidados essenciais até a mais avançada odontologia estética e reabilitação oral. Explore nossas soluções e descubra como podemos cuidar do seu sorriso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <ScrollReveal
              key={index}
              animation="fade-up"
              delay={(index % 3) * 120}
              threshold={0.08}
            >
              <div
                className="relative rounded-xl overflow-hidden shadow-lg group h-80 transition-all duration-500 ease-in-out transform hover:scale-105"
                aria-label={service.title}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/60 transition-all duration-300"></div>
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold font-display mb-2 tracking-wide">{service.title}</h3>
                  <p className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 ease-in-out text-sm mb-4 overflow-hidden">
                    {service.description}
                  </p>
                  <a 
                    href={getServiceUrl(service.slug)}
                    className="inline-flex items-center text-dental-gold hover:text-white font-medium text-sm transition-colors duration-300"
                  >
                    Saiba mais <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
