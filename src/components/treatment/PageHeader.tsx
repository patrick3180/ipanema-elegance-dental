
import React from "react";
import { Separator } from "@/components/ui/separator";
import OptimizedImage from "@/components/OptimizedImage";

interface PageHeaderProps {
  title: string;
  introduction: string;
  imageUrl?: string;
}

const PageHeader = ({ title, introduction, imageUrl }: PageHeaderProps) => {
  return (
    <div className="mb-12">
      {imageUrl && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <OptimizedImage 
            src={imageUrl} 
            alt={title}
            className="w-full h-auto" 
            width={1200}
            priority={true}
          />
        </div>
      )}
      
      <h1 className="heading-lg mb-4">{title}</h1>
      <Separator className="w-24 h-1 bg-dental-gold mb-6" />
      
      <div className="prose prose-lg max-w-3xl mx-auto">
        <div className="lead" dangerouslySetInnerHTML={{ __html: introduction }} />
      </div>
    </div>
  );
};

export default PageHeader;
