import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: 'default' | 'highlighted' | 'premium';
  onClick?: () => void;
  className?: string;
}

const InfoCard = ({
  icon,
  title,
  description,
  variant = 'default',
  onClick,
  className
}: InfoCardProps) => {
  const isClickable = !!onClick;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

  // Variant-specific styles
  const variantStyles = {
    default: "bg-white border-dental-gray/20 shadow-sm hover:shadow-md",
    highlighted: "bg-gradient-to-br from-dental-gold/5 to-dental-gold/10 border-dental-gold/30 shadow-md hover:shadow-lg",
    premium: "bg-gradient-to-br from-dental-purple/5 to-dental-purple/10 border-dental-purple/20 shadow-md hover:shadow-xl"
  };

  const iconStyles = {
    default: "bg-dental-purple/10 text-dental-purple",
    highlighted: "bg-dental-gold/15 text-dental-gold",
    premium: "bg-dental-gold/20 text-dental-gold"
  };

  return (
    <div
      className={cn(
        // Base styles
        "relative p-6 md:p-8 rounded-xl border transition-all duration-300",
        // Variant styles
        variantStyles[variant],
        // Interactive styles
        isClickable && "cursor-pointer hover:-translate-y-0.5 active:scale-[0.98]",
        variant !== 'default' && "hover:-translate-y-1",
        className
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `Saber mais sobre ${title}` : undefined}
    >
      {/* Badge "Recomendado" - only for highlighted variant */}
      {variant === 'highlighted' && (
        <Badge
          className="absolute top-4 right-4 bg-dental-gold text-white text-xs font-medium px-3 py-1 rounded-full animate-fade-in shadow-sm hover:bg-dental-gold/90"
        >
          Recomendado
        </Badge>
      )}

      {/* Icon */}
      <div
        className={cn(
          "mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full transition-transform",
          iconStyles[variant],
          isClickable && "group-hover:scale-110"
        )}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-dental-purple mb-3 leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-dental-gray leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default InfoCard;
