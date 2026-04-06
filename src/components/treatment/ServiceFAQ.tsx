import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceFAQProps {
  title: string;
  faqs: FAQItem[];
}

const ServiceFAQ = ({ title, faqs }: ServiceFAQProps) => {
  return (
    <section className="py-16 bg-dental-beige/20">
      <div className="container-custom">
        <h2 className="heading-lg mb-8 text-center text-dental-purple">
          {title}
        </h2>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                value={`item-${index + 1}`}
                key={index}
                className="bg-white rounded-lg border border-dental-purple/20 px-6"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-dental-purple hover:text-dental-gold transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-dental-gray leading-relaxed pb-6">
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

export default ServiceFAQ;
