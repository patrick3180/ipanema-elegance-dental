import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQItem } from '@/types/BlogPost';

interface FAQSectionBlogProps {
  faqs: FAQItem[];
  className?: string;
}

const FAQSectionBlog: React.FC<FAQSectionBlogProps> = ({ faqs, className = '' }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  if (!faqs || faqs.length === 0) return null;

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs
  };

  return (
    <div className={`mb-8 ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="bg-dental-beige/10 rounded-xl p-6">
        <div className="flex items-center mb-6">
          <HelpCircle className="w-6 h-6 text-dental-purple mr-3" />
          <h2 className="text-2xl font-semibold text-dental-purple">Perguntas Frequentes</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-dental-gray/20 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-dental-purple/20"
                aria-expanded={openItems.includes(index)}
              >
                <h3 className="text-dental-purple font-medium pr-4">
                  {faq.name}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-dental-gold flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-dental-gray flex-shrink-0" />
                )}
              </button>

              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <div className="text-dental-gray/90 leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSectionBlog;