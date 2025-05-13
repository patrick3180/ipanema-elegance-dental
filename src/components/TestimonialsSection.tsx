
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

const testimonials = [
  {
    name: "Mariana Costa",
    testimonial: "A Dra. Carla transformou meu sorriso e minha autoconfiança. Seu trabalho é impecável e o atendimento é sempre acolhedor e profissional.",
    rating: 5,
    location: "Rio de Janeiro"
  },
  {
    name: "Ricardo Mendes",
    testimonial: "Excelente profissional! Resolveu um problema complexo que outros dentistas não conseguiram diagnosticar. Recomendo sem hesitação.",
    rating: 5,
    location: "Ipanema"
  },
  {
    name: "Juliana Pereira",
    testimonial: "Ambiente sofisticado e acolhedor. A Dra. Carla e sua equipe são extremamente atenciosos e os resultados superam todas as expectativas.",
    rating: 5,
    location: "Leblon"
  }
];

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="section-spacing bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-lg mb-4">
            O Que Nossos Pacientes Dizem
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray mb-6">
            Experiências reais de quem confiou seu sorriso aos nossos cuidados
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
