import React from "react";
import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  questions: FAQ[];
}

const FAQSection = ({ title, questions }: FAQSectionProps) => {
  // Generate FAQPage Schema for Google Featured Snippets (+200% CTR)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {/* FAQPage Schema for Featured Snippets */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <section className="py-20 bg-dental-beige/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-6">
              {title}
            </h2>
          </div>
          
          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {questions.map((faq, index) => (
              <AccordionItem 
                value={`item-${index + 1}`} 
                key={index}
                className="bg-dental-beige/20 rounded-lg border border-dental-purple/20 px-6"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-dental-purple hover:text-dental-gold transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-dental-purple/80 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
    </>
  );
};

export default FAQSection;