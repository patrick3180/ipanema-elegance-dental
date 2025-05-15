
import React from "react";

interface Step {
  title: string;
  description: string;
}

interface StepsSectionProps {
  title: string;
  content: string | React.ReactNode | string[] | Step[];
}

const StepsSection = ({ title, content }: StepsSectionProps) => {
  return (
    <div className="my-12">
      <h2 className="heading-md mb-4">{title}</h2>
      {typeof content === "string" && <p className="body-md mb-4">{content}</p>}
      {Array.isArray(content) && (
        <ol className="space-y-4">
          {content.map((step, index) => {
            // If step is a string
            if (typeof step === "string") {
              return <li className="body-md" key={index}>{step}</li>;
            }

            // If step is an object with title and description
            if (typeof step === "object" && step !== null && "title" in step && "description" in step) {
              const typedStep = step as { title: string; description: string };
              return (
                <li className="body-md" key={index}>
                  <strong>{index + 1}. {typedStep.title}</strong> {typedStep.description}
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
