import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface EnLPFAQProps {
  title: string;
  questions: FAQItem[];
}

const EnLPFAQ: React.FC<EnLPFAQProps> = ({ title, questions }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-20 bg-dental-beige/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-dental-gold font-medium mb-3">
            FAQ
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-dental-purple">
            {title}
          </h2>
        </div>

        <div className="space-y-3">
          {questions.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-dental-purple/5 rounded-xl overflow-hidden transition-shadow hover:shadow-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-display font-medium text-dental-purple text-sm sm:text-base pr-2">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-dental-gold flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-sm text-dental-gray leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EnLPFAQ;
