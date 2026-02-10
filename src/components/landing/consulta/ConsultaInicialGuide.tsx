import React from 'react';
import { CheckCircle } from 'lucide-react';

interface GuideStep {
  number: string;
  title: string;
  description: string;
  icon?: string;
}

interface ConsultaInicialGuideProps {
  title: string;
  subtitle: string;
  steps: GuideStep[];
}

const getGridClass = (count: number) => {
  if (count === 3 || count === 6) return 'grid grid-cols-1 md:grid-cols-3 gap-8';
  return 'grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto';
};

const ConsultaInicialGuide: React.FC<ConsultaInicialGuideProps> = ({
  title,
  subtitle,
  steps
}) => {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#381F47] font-serif">
              {title}
            </h2>
            <p className="text-lg text-[#333333] leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Credentials Grid */}
          <div className={getGridClass(steps.length)}>
            {steps.map((step, index) => {
              const isOddLast = steps.length % 2 !== 0 && index === steps.length - 1
                && steps.length !== 3 && steps.length !== 6;

              return (
                <div
                  key={index}
                  className={`bg-white rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300 ${isOddLast ? 'sm:col-span-2 sm:max-w-sm sm:mx-auto' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#B3955F]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={24} className="text-[#B3955F]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#381F47] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[#333333] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultaInicialGuide;
