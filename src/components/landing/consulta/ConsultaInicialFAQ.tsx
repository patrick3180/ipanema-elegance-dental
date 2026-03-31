import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQQuestion {
  question: string;
  answer: string;
}

interface ConsultaInicialFAQProps {
  title: string;
  questions: FAQQuestion[];
}

const ConsultaInicialFAQ: React.FC<ConsultaInicialFAQProps> = ({
  title,
  questions
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
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {questions.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <AccordionTrigger className="text-left text-[#381F47] font-semibold hover:no-underline px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#333333] leading-relaxed px-6 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ConsultaInicialFAQ;