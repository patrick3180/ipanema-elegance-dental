
import React from "react";
import { SectionContent, Step } from "./types";

interface StepsSectionProps {
  title: string;
  content: SectionContent;
}

const StepsSection = ({ title, content }: StepsSectionProps) => {
  // Helper function to check if an item is a Step
  const isStep = (item: any): item is Step => {
    return item && typeof item === 'object' && 'title' in item && 'description' in item;
  };

  return (
    <div className="my-12">
      <h2 className="heading-md mb-4">{title}</h2>
      
      {typeof content === "string" && <p className="body-md mb-4">{content}</p>}
      
      {!Array.isArray(content) && typeof content !== "string" && content}
      
      {Array.isArray(content) && (
        <ol className="space-y-4">
          {content.map((step, index) => {
            // If step is a string
            if (typeof step === "string") {
              return <li className="body-md" key={index}>{step}</li>;
            }

            // If step is a Step object
            if (isStep(step)) {
              return (
                <li className="body-md" key={index}>
                  <strong>{index + 1}. {step.title}</strong> {step.description}
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
