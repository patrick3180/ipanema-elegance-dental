
import React from "react";
import { cn } from "@/lib/utils";

interface ImageFallbackProps {
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}

const ImageFallback = ({ className, width, height, alt }: ImageFallbackProps) => {
  return (
    <div 
      className={cn(
        "bg-dental-beige/30 rounded-lg flex items-center justify-center border border-dental-gray/20", 
        className
      )}
      style={{ width, height }}
    >
      <div className="text-center p-4">
        <svg className="w-8 h-8 mx-auto mb-2 text-dental-gray/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"></path>
        </svg>
        <span className="text-dental-gray/70 text-sm">Imagem não disponível</span>
        {alt && <p className="text-xs text-dental-gray/50 mt-1">{alt}</p>}
      </div>
    </div>
  );
};

export default ImageFallback;
