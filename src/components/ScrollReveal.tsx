import React from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Animation variant */
  animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-in";
  /** Stagger delay in ms (useful for grid items) */
  delay?: number;
  /** Duration in ms */
  duration?: number;
  /** IntersectionObserver threshold */
  threshold?: number;
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements;
}

const animationStyles: Record<string, { hidden: React.CSSProperties; visible: React.CSSProperties }> = {
  "fade-up": {
    hidden: { opacity: 0, transform: "translateY(30px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "fade-left": {
    hidden: { opacity: 0, transform: "translateX(-30px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  "fade-right": {
    hidden: { opacity: 0, transform: "translateX(30px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  "scale-in": {
    hidden: { opacity: 0, transform: "scale(0.95)" },
    visible: { opacity: 1, transform: "scale(1)" },
  },
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.15,
  as: Component = "div",
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold });
  const anim = animationStyles[animation];

  const style: React.CSSProperties = {
    ...(isVisible ? anim.visible : anim.hidden),
    transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
    willChange: "opacity, transform",
  };

  return React.createElement(
    Component,
    { ref, className: cn(className), style },
    children
  );
};

export default ScrollReveal;
