import React from "react";
import { Separator } from "@/components/ui/separator";
import { Clock, Heart, Fingerprint, Shield } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const differentials = [
  {
    icon: <Clock className="w-7 h-7" />,
    title: "Mínimo de 1h por Consulta",
    description:
      "Nada de atendimentos apressados. Cada consulta é agendada com tempo suficiente para ouvir, examinar e cuidar com calma.",
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: "Atendimento Individualizado",
    description:
      "Cada caso é único. O plano de tratamento é desenhado exclusivamente para as necessidades e expectativas de cada paciente.",
  },
  {
    icon: <Fingerprint className="w-7 h-7" />,
    title: "Tecnologia Digital Avançada",
    description:
      "iTero Element 5D, planejamento digital do sorriso e protocolos clínicos atualizados para maior previsibilidade e conforto.",
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "20+ Anos de Experiência",
    description:
      "Dupla especialização em Prótese e Implantodontia, com 8 anos na Odontoclínica Central da Marinha. Disciplina e precisão.",
  },
];

const DifferentialsSection = () => {
  return (
    <section className="section-spacing bg-dental-beige">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-dental-gold font-medium mb-4">
            Diferenciais
          </p>
          <h2 className="heading-lg mb-4">
            Por que a Dra. Carla Christoph?
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray">
            Em um mercado com muitas opções, escolher o profissional certo faz
            toda a diferença. Conheça o que torna nossa clínica em Ipanema
            diferente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentials.map((item, index) => (
            <ScrollReveal
              key={index}
              animation="fade-up"
              delay={index * 100}
              threshold={0.1}
            >
              <div className="group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-hover transition-all duration-500 hover:-translate-y-1 h-full">
                {/* Accent line top */}
                <div className="absolute top-0 left-8 right-8 h-0.5 bg-dental-gold/0 group-hover:bg-dental-gold/60 transition-all duration-500 rounded-full" />

                <div className="w-14 h-14 rounded-xl bg-dental-gold/10 flex items-center justify-center text-dental-gold mb-6 group-hover:bg-dental-gold/20 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-display font-semibold text-dental-purple mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-dental-gray leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;

