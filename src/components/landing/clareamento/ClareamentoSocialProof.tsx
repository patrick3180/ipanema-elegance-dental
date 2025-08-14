import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  text: string;
  rating?: number;
}

interface Stat {
  number: string;
  label: string;
}

interface ClareamentoSocialProofProps {
  title: string;
  testimonials: Testimonial[];
  stats: Stat[];
}

const ClareamentoSocialProof: React.FC<ClareamentoSocialProofProps> = ({
  title,
  testimonials,
  stats
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#381F47] font-serif">
              {title}
            </h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-[#B3955F]">
                  {stat.number}
                </div>
                <div className="text-[#333333] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow duration-300">
                {/* Stars */}
                <div className="flex gap-1">
                  {renderStars(testimonial.rating || 5)}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-[#333333] leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                {/* Name */}
                <div className="font-semibold text-[#381F47]">
                  {testimonial.name}
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="bg-[#CFCBB4] rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-[#381F47] mb-4">
              Resultados que Falam por Si
            </h3>
            <p className="text-[#333333] max-w-2xl mx-auto leading-relaxed">
              Cada sorriso transformado é uma história de confiança renovada. Nossa abordagem personalizada 
              garante que você tenha exatamente o resultado natural que sempre sonhou.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClareamentoSocialProof;