import React from 'react';
import { X } from 'lucide-react';

interface ConsultaInicialProblemProps {
  title: string;
  description: string;
  problems: string[];
}

const ConsultaInicialProblem: React.FC<ConsultaInicialProblemProps> = ({
  title,
  description,
  problems
}) => {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#381F47] font-serif">
              {title}
            </h2>
            <p className="text-lg text-[#333333] leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* Pain Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <X size={24} className="text-red-500" />
                  </div>
                </div>
                <p className="text-[#333333] text-center leading-relaxed">
                  {problem}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultaInicialProblem;