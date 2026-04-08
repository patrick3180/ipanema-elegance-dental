import React from "react";
import { AlertCircle } from "lucide-react";

interface EnLPProblemProps {
  title: string;
  description: string;
  problems: string[];
}

const EnLPProblem: React.FC<EnLPProblemProps> = ({ title, description, problems }) => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-dental-purple mb-4">
            {title}
          </h2>
          <p className="text-dental-gray leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {problems.map((problem, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 bg-dental-beige/60 border border-dental-purple/5 rounded-xl p-5 transition-colors hover:border-dental-gold/30"
            >
              <AlertCircle
                size={20}
                className="text-dental-gold mt-0.5 flex-shrink-0"
              />
              <p className="text-sm text-dental-gray leading-relaxed">{problem}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnLPProblem;
