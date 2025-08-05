
import React from "react";
import { CheckCircle } from "lucide-react";
import { SectionContent } from "./types";
import { processMarkdown } from "@/utils/markdownProcessor";

interface BenefitsSectionProps {
  title: string;
  content: SectionContent;
}

const BenefitsSection = ({ title, content }: BenefitsSectionProps) => {
  return (
    <div className="my-12">
      <h2 className="heading-md mb-4">{title}</h2>
      
      {typeof content === "string" && (
        <p className="body-md mb-4" dangerouslySetInnerHTML={{ __html: processMarkdown(content) }} />
      )}
      
      {!Array.isArray(content) && typeof content !== "string" && content}
      
      {Array.isArray(content) && (
        <ul className="space-y-3">
          {content.map((benefit, index) => (
            <li className="flex items-start" key={index}>
              <CheckCircle className="text-dental-gold h-6 w-6 mr-2 flex-shrink-0 mt-0.5" />
              <span 
                className="body-md"
                dangerouslySetInnerHTML={{ 
                  __html: typeof benefit === "string" ? processMarkdown(benefit) : "" 
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BenefitsSection;
