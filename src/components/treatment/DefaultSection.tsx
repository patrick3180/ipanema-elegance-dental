
import React from "react";
import { SectionContent } from "./types";

interface DefaultSectionProps {
  title: string;
  content: SectionContent;
}

const DefaultSection = ({ title, content }: DefaultSectionProps) => {
  // Only render string and ReactNode content types
  const renderContent = () => {
    if (typeof content === "string") {
      return <p className="body-md">{content}</p>;
    }
    
    // If content is a ReactNode (not an array)
    if (!Array.isArray(content)) {
      return content;
    }
    
    // If we're here, it's an array but not appropriate for DefaultSection
    return <p>Content format not supported for this section type.</p>;
  };

  return (
    <div className="my-12">
      <h2 className="heading-md mb-4">{title}</h2>
      {renderContent()}
    </div>
  );
};

export default DefaultSection;
