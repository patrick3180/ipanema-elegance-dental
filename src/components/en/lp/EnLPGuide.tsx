import React from "react";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface EnLPGuideProps {
  title: string;
  subtitle: string;
  steps: Step[];
}

const EnLPGuide: React.FC<EnLPGuideProps> = ({ title, subtitle, steps }) => {
  return (
    <section className="py-16 md:py-20 bg-dental-beige/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-dental-gold font-medium mb-3">
            Your Treatment Journey
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-dental-purple mb-4">
            {title}
          </h2>
          <p className="text-dental-gray max-w-2xl mx-auto text-sm">
            {subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative flex gap-5"
            >
              {/* Step number + connector line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-dental-purple text-white flex items-center justify-center font-display font-bold text-sm shadow-md">
                  {step.number}
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-px h-full bg-dental-purple/15 mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="bg-white rounded-xl border border-dental-purple/5 p-5 flex-1 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-display font-semibold text-dental-purple text-lg mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-dental-gray leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnLPGuide;
