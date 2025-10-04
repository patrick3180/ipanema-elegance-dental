import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface SectionDividerProps {
  variant?: 'simple' | 'with-icon' | 'with-text';
  icon?: React.ReactNode;
  text?: string;
  className?: string;
}

const SectionDivider = ({ 
  variant = 'simple', 
  icon, 
  text, 
  className 
}: SectionDividerProps) => {
  
  if (variant === 'simple') {
    return (
      <div className={cn("flex justify-center my-8 md:my-12 transition-all duration-300", className)}>
        <Separator className="w-24 h-1 bg-dental-gold" />
      </div>
    );
  }
  
  if (variant === 'with-icon') {
    return (
      <div className={cn(
        "flex items-center justify-center gap-4 my-8 md:my-12 transition-all duration-300",
        className
      )}>
        <div className="flex-1 h-px bg-dental-gold/30 max-w-32" />
        <div className="w-12 h-12 rounded-full bg-dental-gold/10 flex items-center justify-center transition-transform hover:scale-110">
          <div className="text-dental-gold">
            {icon}
          </div>
        </div>
        <div className="flex-1 h-px bg-dental-gold/30 max-w-32" />
      </div>
    );
  }
  
  if (variant === 'with-text') {
    return (
      <div className={cn(
        "flex items-center justify-center gap-4 my-8 md:my-12 transition-all duration-300",
        className
      )}>
        <div className="flex-1 h-px bg-dental-gold/30 max-w-xs" />
        <span className="text-sm font-medium text-dental-gold uppercase tracking-wider px-4 bg-white transition-colors hover:text-dental-gold-light">
          {text}
        </span>
        <div className="flex-1 h-px bg-dental-gold/30 max-w-xs" />
      </div>
    );
  }
  
  return null;
};

export default SectionDivider;
