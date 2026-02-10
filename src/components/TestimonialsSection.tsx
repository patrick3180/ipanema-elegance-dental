
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Beatriz M. — Ipanema",
    testimonial: "Fiz as lentes de contato dental com a Dra. Carla. O que mais me impressionou foi o planejamento antes de começar — pude ver como ficaria antes de tomar a decisão. Hoje sorrio sem pensar duas vezes."
  },
  {
    name: "Roberto S. — Leblon",
    testimonial: "Passei anos com dificuldade para mastigar por causa de próteses antigas que não serviam mais. A reabilitação que a Dra. Carla fez devolveu meu conforto. Parece que tenho dentes novos."
  },
  {
    name: "Juliana P. — Copacabana",
    testimonial: "Faço acompanhamento no consultório há mais de 5 anos. O que me fez ficar foi o tempo que dedicam a cada consulta. Nunca saí com a sensação de que foi apressado."
  }
];

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="section-spacing bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-lg mb-4">
            Pacientes Felizes: Depoimentos sobre nossa Clínica em Ipanema
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray mb-6">
            A experiência dos nossos pacientes é a nossa maior prioridade. Veja o que alguns deles dizem sobre o atendimento e os resultados alcançados em nossa clínica odontológica em Ipanema.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-dental-beige/30 border-none p-6 elegant-shadow">
              <CardContent className="p-0 space-y-4">
                <p className="text-dental-purple italic">&ldquo;{testimonial.testimonial}&rdquo;</p>
                <div className="pt-4">
                  <span className="font-medium text-dental-purple">{testimonial.name}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
