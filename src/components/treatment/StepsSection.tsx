
import React from "react";
import { SectionContent, Step } from "./types";
import OptimizedImage from "@/components/OptimizedImage";
import { processMarkdown } from "@/utils/markdownProcessor";

interface StepsSectionProps {
  title: string;
  content: SectionContent;
  imageUrl?: string;
}

const StepsSection = ({ title, content, imageUrl }: StepsSectionProps) => {
  // Helper function to check if an item is a Step
  const isStep = (item: any): item is Step => {
    return item && typeof item === 'object' && 'title' in item && 'description' in item;
  };

  return (
    <div className="my-12">
      <h2 className="heading-md mb-4">{title}</h2>
      
      {imageUrl && (
        <div className="mb-8">
          <OptimizedImage
            src={imageUrl}
            alt={title}
            width={800}
            className="w-full h-auto rounded-lg shadow-lg mx-auto block"
            priority={false}
            objectFit="contain"
          />
        </div>
      )}
      
      {typeof content === "string" && (
        <div 
          className="body-md mb-4" 
          dangerouslySetInnerHTML={{ __html: processMarkdown(content) }}
        />
      )}
      
      {!Array.isArray(content) && typeof content !== "string" && content}
      
      {Array.isArray(content) && (
        <ol className="space-y-4">
          {content.map((step, index) => {
            // If step is a string
            if (typeof step === "string") {
              return (
                <li 
                  className="body-md" 
                  key={index}
                  dangerouslySetInnerHTML={{ __html: processMarkdown(step) }}
                />
              );
            }

            // If step is a Step object
            if (isStep(step)) {
              return (
                <li className="body-md" key={index}>
                  <strong>{index + 1}. {step.title}</strong> 
                  <span dangerouslySetInnerHTML={{ __html: processMarkdown(step.description) }} />
                </li>
              );
            }

            return null;
          })}
        </ol>
      )}
    </div>
  );
};

export default StepsSection;
