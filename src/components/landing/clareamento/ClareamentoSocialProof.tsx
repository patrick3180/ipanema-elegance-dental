import React from 'react';

interface Testimonial {
  name: string;
  text: string;
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
        </div>
      </div>
    </section>
  );
};

export default ClareamentoSocialProof;
