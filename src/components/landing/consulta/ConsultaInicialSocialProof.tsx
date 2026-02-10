import React from 'react';
import { Users, Clock, Award, MessageCircle } from 'lucide-react';

interface Testimonial {
  name: string;
  text: string;
  avatar?: string;
}

interface Stat {
  number: string;
  label: string;
}

interface ConsultaInicialSocialProofProps {
  title: string;
  testimonials: Testimonial[];
  stats?: Stat[];
}

const ConsultaInicialSocialProof: React.FC<ConsultaInicialSocialProofProps> = ({
  title,
  testimonials,
  stats
}) => {
  const getStatIcon = (label: string) => {
    if (label.includes('Experiência')) return <Award size={24} className="text-[#B3955F]" />;
    if (label.includes('Pacientes')) return <Users size={24} className="text-[#B3955F]" />;
    if (label.includes('hora') || label.includes('Agendamento')) return <Clock size={24} className="text-[#B3955F]" />;
    if (label.includes('WhatsApp')) return <MessageCircle size={24} className="text-[#B3955F]" />;
    return <Award size={24} className="text-[#B3955F]" />;
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#381F47] font-serif">
              {title}
            </h2>
          </div>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="flex justify-center mb-3">
                    {getStatIcon(stat.label)}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-[#381F47] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-[#333333]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
                {/* Text */}
                <blockquote className="text-[#333333] leading-relaxed italic">
                  "{testimonial.text}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  {testimonial.avatar ? (
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-[#B3955F] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="font-semibold text-[#381F47]">
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

export default ConsultaInicialSocialProof;
