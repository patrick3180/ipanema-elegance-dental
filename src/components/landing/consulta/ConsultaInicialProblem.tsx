import React from 'react';
import { Calendar, Clock, Heart, Shield, Search, AlertTriangle } from 'lucide-react';

interface ConsultaInicialProblemProps {
  title: string;
  description: string;
  problems: string[];
}

// Maps problem index to an empathetic icon — falls back to Heart for any extra items
const iconMap = [Calendar, Clock, Heart, Shield, Search, AlertTriangle];

const getIcon = (index: number) => {
  const Icon = iconMap[index] || Heart;
  return <Icon size={22} className="text-[#B3955F]" />;
};

const ConsultaInicialProblem: React.FC<ConsultaInicialProblemProps> = ({
  title,
  description,
  problems
}) => {
  return (
    <section className="bg-white py-16 lg:py-24" aria-label="Identificação com situações comuns">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#381F47] font-serif">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-[#333333] leading-relaxed max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>

          {/* Empathetic Cards Grid */}
          <div className={`grid grid-cols-1 gap-4 ${
            problems.length === 4 ? 'md:grid-cols-2' :
            problems.length <= 3 ? 'md:grid-cols-1 max-w-2xl mx-auto' :
            'md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-[#FAF7F2] border-l-4 border-[#B3955F]/60 rounded-lg p-5 flex items-start gap-4 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#B3955F]/10 flex items-center justify-center mt-0.5">
                  {getIcon(index)}
                </div>
                <p className="text-[#333333] leading-relaxed text-[15px]">
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