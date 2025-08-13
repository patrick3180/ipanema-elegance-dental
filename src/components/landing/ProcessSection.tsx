import React from "react";
import { ArrowRight } from "lucide-react";

interface ProcessStep {
  title: string;
  description: string;
  image?: string;
}

interface ProcessSectionProps {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

const ProcessSection = ({ title, subtitle, steps }: ProcessSectionProps) => {
  return (
    <section className="py-20 bg-dental-beige/30">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-6">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-dental-purple/80 max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>
          
          {/* Process Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-12`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-dental-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-semibold text-dental-purple">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-lg text-dental-purple/80 leading-relaxed pl-16">
                    {step.description}
                  </p>
                  
                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex justify-center mt-8">
                      <ArrowRight className="w-8 h-8 text-dental-gold" />
                    </div>
                  )}
                </div>
                
                {/* Image Placeholder */}
                <div className="flex-1 max-w-md">
                  <div className="aspect-square bg-dental-purple/10 rounded-2xl flex items-center justify-center border border-dental-purple/20">
                    {step.image ? (
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <div className="w-16 h-16 bg-dental-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-dental-gold font-bold text-xl">{index + 1}</span>
                        </div>
                        <p className="text-dental-purple/60">
                          Imagem do processo
                        </p>
                      </div>
                    )}
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

export default ProcessSection;