
import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  minHeight?: number;
}

const LazySection = ({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = "100px",
  className = "",
  minHeight = 200,
}: LazySectionProps) => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFallback = (
    <div className={className} style={{ minHeight }}>
      <Skeleton className="w-full h-full" />
    </div>
  );

  return (
    <div ref={sectionRef} className={className}>
      {isInView ? children : (fallback || defaultFallback)}
    </div>
  );
};

export default LazySection;
