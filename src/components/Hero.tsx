
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section id="início" className="min-h-screen relative overflow-hidden pt-24">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center py-12 lg:py-24">
        <div className="order-2 lg:order-1 animate-fade-in">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-display font-medium leading-tight mb-6">
            Sorrisos impecáveis com cuidado personalizado
          </h1>
          <p className="text-lg md:text-xl text-dental-charcoal/80 mb-8 max-w-lg">
            Odontologia de excelência em Ipanema com a Dra. Carla Christoph, especialista em transformar sorrisos com elegância e precisão.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="bg-dental-gold hover:bg-dental-gold/90 text-white rounded-md px-8 py-6 text-base"
            >
              <a href="#contato">
                Agende sua consulta <ArrowRight size={16} className="ml-2" />
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-dental-taupe text-dental-charcoal hover:bg-dental-taupe/10 rounded-md px-8 py-6 text-base"
            >
              <a href="#tratamentos">Conheça nossos tratamentos</a>
            </Button>
          </div>
        </div>
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in">
          <div className="relative">
            {/* Placeholder for doctor's image */}
            <div className="w-[320px] md:w-[420px] h-[500px] md:h-[600px] bg-dental-sand/50 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="text-dental-taupe text-center p-8">
                <p className="text-lg font-medium mb-2">Imagem da Dra. Carla Christoph</p>
                <p className="text-sm">Esta é uma imagem placeholder</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-dental-gold/20 rounded-full"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-dental-gold/20 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-dental-cream to-transparent"></div>
    </section>
  );
};

export default Hero;
