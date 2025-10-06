import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineStep {
  number: string | number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  duration?: string;
}

interface ProcessTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

const ProcessTimeline = ({ steps, className }: ProcessTimelineProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  return (
    <div ref={timelineRef} className={cn("relative py-8", className)} role="list">
      {/* Vertical connecting line */}
      <div
        className={cn(
          "absolute left-[58px] md:left-[88px] top-0 w-0.5 bg-dental-gold/30 transition-all duration-1000 ease-out",
          isVisible ? "h-full opacity-100" : "h-0 opacity-0"
        )}
        aria-hidden="true"
      />

      {/* Steps */}
      <div className="space-y-12 md:space-y-16">
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "relative flex gap-6 md:gap-12 opacity-0 translate-y-4 transition-all duration-500 ease-out",
              isVisible && "opacity-100 translate-y-0"
            )}
            style={{
              animationDelay: `${index * 150}ms`,
              transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
            }}
            role="listitem"
          >
            {/* Left side - Number */}
            <div className="relative flex-shrink-0">
              <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dental-gold/30 leading-none">
                {step.number}
              </div>
              
              {/* Circle on the line */}
              <div
                className="absolute top-4 md:top-6 -right-[34px] md:-right-[52px] w-4 h-4 rounded-full bg-dental-gold border-4 border-white shadow-sm"
                aria-hidden="true"
              />
            </div>

            {/* Right side - Content */}
            <div className="flex-1 pt-1 md:pt-2">
              {/* Icon (optional) */}
              {step.icon && (
                <div className="mb-3 text-dental-gold">
                  {step.icon}
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold text-dental-purple mb-2 leading-tight">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-dental-gray leading-relaxed mb-2">
                {step.description}
              </p>

              {/* Duration (optional) */}
              {step.duration && (
                <p className="text-sm text-dental-gold-dark italic mt-2">
                  Duração: {step.duration}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessTimeline;
