
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Odontologia Estética",
    description: "Transforme seu sorriso com procedimentos estéticos personalizados que valorizam sua beleza natural.",
    icon: "✨"
  },
  {
    title: "Implantes Dentários",
    description: "Recupere função e estética com implantes de titanio de alta qualidade e acabamento perfeito.",
    icon: "🦷"
  },
  {
    title: "Facetas de Porcelana",
    description: "Corrija imperfeições e conquiste o sorriso dos sonhos com facetas personalizadas e naturais.",
    icon: "💎"
  },
  {
    title: "Clareamento Dental",
    description: "Técnicas avançadas para clareamento seguro e eficaz, com resultados duradouros.",
    icon: "✨"
  },
  {
    title: "Ortodontia Invisível",
    description: "Alinhamento dentário discreto e confortável com tecnologia de ponta.",
    icon: "👑"
  },
  {
    title: "Harmonização Orofacial",
    description: "Tratamentos que equilibram estética facial e saúde bucal para resultados harmoniosos.",
    icon: "👄"
  }
];

const ServicesSection = () => {
  return (
    <section id="tratamentos" className="py-24 bg-dental-cream">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
            Nossos Tratamentos
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-charcoal/80 mb-6">
            Conheça as soluções odontológicas exclusivas que oferecemos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="text-3xl mb-3">{service.icon}</div>
                <CardTitle className="text-xl font-display">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-dental-charcoal/80 text-base mb-4">
                  {service.description}
                </CardDescription>
                <a 
                  href="#contato" 
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
