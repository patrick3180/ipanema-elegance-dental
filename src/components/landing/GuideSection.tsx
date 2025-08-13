import React from "react";
import { CheckCircle } from "lucide-react";

interface GuideStep {
  number: string;
  title: string;
  description: string;
  icon?: string;
}

interface GuideSectionProps {
  title: string;
  subtitle: string;
  steps: GuideStep[];
}

const GuideSection = ({ title, subtitle, steps }: GuideSectionProps) => {
  return (
    <section className="py-20 bg-dental-beige/50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-6">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-dental-purple/80 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
          
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex flex-col md:flex-row items-start gap-6 bg-white rounded-xl p-8 shadow-sm border border-dental-purple/10"
              >
                {/* Step Number */}
                <div className="flex-shrink-0 w-16 h-16 bg-dental-gold rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{step.number}</span>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-dental-purple mb-3">
                    {step.title}
                  </h3>
                  <p className="text-dental-purple/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Icon */}
                <div className="flex-shrink-0 hidden md:block">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideSection;