import React, { useState, useEffect, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Beatriz M. — Ipanema",
    text: "Fiz as lentes de contato dental com a Dra. Carla. O que mais me impressionou foi o planejamento antes de começar — pude ver como ficaria antes de tomar a decisão. Hoje sorrio sem pensar duas vezes.",
  },
  {
    name: "Roberto S. — Leblon",
    text: "Passei anos com dificuldade para mastigar por causa de próteses antigas que não serviam mais. A reabilitação que a Dra. Carla fez devolveu meu conforto. Parece que tenho dentes novos.",
  },
  {
    name: "Juliana P. — Copacabana",
    text: "Faço acompanhamento no consultório há mais de 5 anos. O que me fez ficar foi o tempo que dedicam a cada consulta. Nunca saí com a sensação de que foi apressado.",
  },
  {
    name: "Fernando A. — Gávea",
    text: "Precisava de implantes e tinha muito medo. A Dra. Carla explicou tudo com paciência e o resultado ficou melhor do que eu imaginava. Voltaria pra qualquer tratamento sem pensar duas vezes.",
  },
  {
    name: "Mariana L. — Botafogo",
    text: "O clareamento ficou natural e bonito. Adorei que a Dra. Carla me explicou cada etapa e respeitou o meu tempo. Consultório lindo e equipe muito atenciosa.",
  },
];

const TestimonialsCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  // Pause on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Get visible testimonials (current + 2 more on desktop)
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < 3; i++) {
      indices.push((current + i) % testimonials.length);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section id="depoimentos" className="section-spacing bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-dental-gold font-medium mb-4">
            Depoimentos
          </p>
          <h2 className="heading-lg mb-4">
            O Que Nossos Pacientes Dizem
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray">
            Histórias de pacientes que confiaram à Dra. Carla casos de reabilitação, estética e prevenção.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {visibleIndices.map((testimonialIndex, cardIndex) => {
              const t = testimonials[testimonialIndex];
              return (
                <div
                  key={`${testimonialIndex}-${cardIndex}`}
                  className={`relative bg-dental-beige/40 rounded-2xl p-8 border border-dental-purple/5 transition-all duration-500 ${
                    cardIndex === 0
                      ? "opacity-100 scale-100"
                      : cardIndex === 1
                      ? "opacity-100 scale-100 hidden md:block"
                      : "opacity-100 scale-100 hidden md:block"
                  }`}
                >
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-dental-gold/20 mb-4" />

                  <p className="text-dental-purple/90 leading-relaxed mb-6 text-sm">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-dental-purple/10">
                    {/* Avatar placeholder */}
                    <div className="w-10 h-10 rounded-full bg-dental-purple/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-dental-purple">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <p className="font-semibold text-dental-purple text-sm">
                      {t.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-dental-purple/20 flex items-center justify-center text-dental-purple hover:bg-dental-purple hover:text-white transition-all duration-300"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? "bg-dental-gold w-6"
                      : "bg-dental-purple/20 hover:bg-dental-purple/40"
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-dental-purple/20 flex items-center justify-center text-dental-purple hover:bg-dental-purple hover:text-white transition-all duration-300"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Google Reviews link */}
          <div className="text-center mt-6">
            <a
              href="https://www.google.com/maps/place/Dra.+Carla+Christoph/@-22.9837862,-43.2055289,17z/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-dental-gold hover:text-dental-gold-dark transition-colors duration-300"
            >
              <Star className="w-4 h-4 fill-dental-gold" />
              Ver todas as avaliações no Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
