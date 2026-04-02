import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight, ScanLine, Eye, Zap } from "lucide-react";

const features = [
  {
    icon: <ScanLine className="w-5 h-5" />,
    title: "Escaneamento 3D em Segundos",
    description: "Moldagem digital sem a massa incômoda — mais conforto e precisão.",
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: "Visualização em Tempo Real",
    description: "Veja o resultado projetado antes de iniciar o tratamento.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Diagnóstico Avançado",
    description: "Tecnologia NIRI para detecção precoce de cáries e trincas nos dentes, sem raio-X.",
  },
];

const TechnologyShowcase = () => {
  return (
    <section className="section-spacing bg-dental-purple relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(179,149,95,0.3) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-dental-gold font-medium mb-4">
              Tecnologia
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-4">
              iTero Element 5D:{" "}
              <span className="text-dental-gold">
                Precisão Digital
              </span>
            </h2>
            <Separator className="w-24 h-1 bg-dental-gold mb-6" />
            <p className="text-white/80 text-lg mb-10 leading-relaxed">
              A Dra. Carla utiliza o scanner intraoral mais avançado do mundo
              para planejar cada tratamento com precisão milimétrica. Sem
              moldagens tradicionais desconfortáveis — apenas tecnologia a
              favor do seu sorriso.
            </p>

            <div className="space-y-6 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-dental-gold/20 flex items-center justify-center text-dental-gold group-hover:bg-dental-gold/30 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => {
                const phoneNumber = "5521993304045";
                const message = "Olá! Gostaria de saber mais sobre a tecnologia iTero Element 5D utilizada na clínica.";
                window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
              }}
              className="bg-dental-gold hover:bg-dental-gold-dark text-white rounded-md px-8 py-6 text-base shadow-gold transition-all duration-300 hover:-translate-y-0.5"
            >
              Agendar com tecnologia digital
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>

          {/* Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute -inset-4 bg-dental-gold/10 rounded-3xl blur-2xl" />

              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/lovable-uploads/itero_screen.webp"
                  alt="Scanner iTero Element 5D utilizado pela Dra. Carla Christoph para escaneamento digital em Ipanema"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="480"
                  height="360"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 md:-left-8 bg-white rounded-xl px-5 py-3 shadow-elegant">
                <p className="text-xs text-dental-gray">Scanner #1 do Mundo</p>
                <p className="text-sm font-semibold text-dental-purple font-display">
                  iTero Element 5D
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;
