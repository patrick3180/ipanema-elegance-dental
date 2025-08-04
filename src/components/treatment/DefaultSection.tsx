
import React from "react";
import { SectionContent } from "./types";
import OptimizedImage from "@/components/OptimizedImage";

interface DefaultSectionProps {
  title: string;
  content: SectionContent;
  imageUrl?: string;
}

const DefaultSection = ({ title, content, imageUrl }: DefaultSectionProps) => {
  // Only render string and ReactNode content types
  const renderContent = () => {
    if (typeof content === "string") {
      return <p className="body-md" dangerouslySetInnerHTML={{ __html: content }} />;
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
      
      {imageUrl && (
        <div className="mb-6">
          <OptimizedImage
            src={imageUrl}
            alt={title}
            width={800}
            height={400}
            className="w-full h-64 md:h-80 rounded-lg shadow-lg object-cover"
            priority={false}
          />
        </div>
      )}
      
      {renderContent()}
    </div>
  );
};

export default DefaultSection;
