import React, { useState, useEffect, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Beatriz M.",
    location: "Ipanema",
    rating: 5,
    text: "I had porcelain veneers done with Dr. Carla. What impressed me most was the planning before starting — I could see how everything would look before making my decision. Today I smile without thinking twice.",
    note: "Translated from Portuguese",
  },
  {
    name: "Fernando A.",
    location: "Gávea",
    rating: 5,
    text: "I needed implants and was very nervous. Dr. Carla explained everything patiently, and the result turned out better than I imagined. I recommend her without hesitation.",
    note: "Translated from Portuguese",
  },
  {
    name: "Juliana P.",
    location: "Copacabana",
    rating: 5,
    text: "I've been a patient here for over 5 years. What made me stay was the time they dedicate to each appointment. I've never left feeling like it was rushed.",
    note: "Translated from Portuguese",
  },
];

const EnTestimonialsCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < 3; i++) {
      indices.push((current + i) % testimonials.length);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section id="testimonials" className="section-spacing bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-dental-gold font-medium mb-4">
            Testimonials
          </p>
          <h2 className="heading-lg mb-4">What Our Patients Say</h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray">
            Every patient's experience is what drives us. See what those who
            trust our care in Ipanema have to say.
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
                      : "opacity-100 scale-100 hidden md:block"
                  }`}
                >
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-dental-gold/20 mb-4" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-dental-gold fill-dental-gold"
                      />
                    ))}
                  </div>

                  <p className="text-dental-purple/90 leading-relaxed mb-2 text-sm">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <p className="text-xs text-dental-gray/60 italic mb-6">
                    ({t.note})
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-dental-purple/10">
                    <div className="w-10 h-10 rounded-full bg-dental-purple/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-dental-purple">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-dental-purple text-sm">
                        {t.name}
                      </p>
                      <p className="text-xs text-dental-gray">
                        {t.location}
                      </p>
                    </div>
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
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

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
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-dental-purple/20 flex items-center justify-center text-dental-purple hover:bg-dental-purple hover:text-white transition-all duration-300"
              aria-label="Next testimonial"
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
              See all reviews on Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnTestimonialsCarousel;
