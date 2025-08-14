import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Question {
  question: string;
  answer: string;
}

interface ClareamentoFAQProps {
  title: string;
  questions: Question[];
}

const ClareamentoFAQ: React.FC<ClareamentoFAQProps> = ({
  title,
  questions
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#CFCBB4] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#381F47] font-serif">
              {title}
            </h2>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {questions.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-[#381F47] pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp size={24} className="text-[#381F47] flex-shrink-0" />
                  ) : (
                    <ChevronDown size={24} className="text-[#381F47] flex-shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <p className="text-[#333333] leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-lg p-8 text-center shadow-md">
            <h3 className="text-xl font-semibold text-[#381F47] mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-[#333333] leading-relaxed">
              Nossa equipe está pronta para esclarecer todas as suas questões sobre clareamento dental. 
              Entre em contato e receba orientação personalizada para seu caso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClareamentoFAQ;