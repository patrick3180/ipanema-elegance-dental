
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

const testimonials = [
  {
    name: "Beatriz M.",
    testimonial: "Eu sempre tive receio de dentista, mas a Dra. Carla Christoph e sua equipe em Ipanema mudaram completamente minha percepção. O planejamento do meu novo sorriso com as lentes de contato dental foi incrível, e o resultado superou todas as minhas expectativas. Hoje sorrio com muito mais confiança! Recomendo de olhos fechados o atendimento e o profissionalismo desta excelente dentista em Ipanema.",
    rating: 5,
    location: "Rio de Janeiro"
  },
  {
    name: "Roberto S.",
    testimonial: "Após anos com dificuldades para mastigar, encontrei na Dra. Carla Christoph a solução que tanto buscava. O tratamento de reabilitação oral com prótese dentária foi realizado com um cuidado e uma atenção que nunca vi igual. A clínica em Ipanema é impecável e toda a equipe é muito atenciosa. Sou muito grata por ter meu conforto e minha autoestima de volta.",
    rating: 5,
    location: "Ipanema, RJ"
  },
  {
    name: "Juliana P.",
    testimonial: "Fazer meu clareamento dental e minhas consultas de rotina na clínica odontológica em Ipanema da Dra. Carla é sempre uma experiência positiva. O atendimento é pontual, o ambiente é acolhedor e sinto que minha saúde bucal está realmente em boas mãos. Uma profissional que transmite muita segurança e carinho.",
    rating: 5,
    location: "Leblon, RJ / BR"
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
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? "text-dental-gold" : "text-dental-gray/30"}`} 
                      fill={i < testimonial.rating ? "currentColor" : "none"} 
                    />
                  ))}
                </div>
                <p className="text-dental-purple italic">&ldquo;{testimonial.testimonial}&rdquo;</p>
                <div className="pt-4 flex flex-col">
                  <span className="font-medium text-dental-purple">{testimonial.name}</span>
                  <span className="text-sm text-dental-gray">{testimonial.location}</span>
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
