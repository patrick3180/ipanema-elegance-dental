import React from "react";
import { Users, Award, Clock, Heart } from "lucide-react";

interface Testimonial {
  name: string;
  text: string;
  avatar?: string;
}

interface Stat {
  number: string;
  label: string;
}

interface SocialProofSectionProps {
  title: string;
  testimonials: Testimonial[];
  stats?: Stat[];
}

const SocialProofSection = ({ title, testimonials, stats }: SocialProofSectionProps) => {
  const defaultStats = [
    { number: "20+", label: "Anos de Experiência" },
    { number: "24h", label: "WhatsApp Disponível" },
    { number: "Particular", label: "Mínimo 1h por Consulta" },
    { number: "Ipanema", label: "Zona Sul — Rio de Janeiro" }
  ];

  const displayStats = stats || defaultStats;

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-6">
              {title}
            </h2>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {displayStats.map((stat, index) => {
              const icons = [Users, Award, Heart, Clock];
              const IconComponent = icons[index % icons.length];
              
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-dental-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-dental-gold" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-dental-purple mb-2">
                    {stat.number}
                  </div>
                  <div className="text-dental-purple/70 text-sm">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-dental-beige/30 rounded-xl p-6 border border-dental-purple/10"
              >
                {/* Text */}
                <p className="text-dental-purple/80 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  {testimonial.avatar ? (
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-dental-gold/20 rounded-full flex items-center justify-center">
                      <span className="text-dental-gold font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="font-semibold text-dental-purple">
                    {testimonial.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
