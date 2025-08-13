import React from "react";
import { AlertCircle } from "lucide-react";

interface ProblemSectionProps {
  title: string;
  description: string;
  problems: string[];
}

const ProblemSection = ({ title, description, problems }: ProblemSectionProps) => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-6">
            {title}
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-dental-purple/80 mb-12 max-w-3xl mx-auto">
            {description}
          </p>
          
          {/* Problems List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <div 
                key={index}
                className="bg-red-50 border border-red-200 rounded-lg p-6 text-left"
              >
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-red-600 font-bold">✗</span>
                </div>
                <p className="text-dental-purple font-medium">
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

export default ProblemSection;