
import { useState, useRef, useEffect } from "react";

interface UseImageIntersectionProps {
  lazy: boolean;
  priority: boolean;
}

export const useImageIntersection = ({ lazy, priority }: UseImageIntersectionProps) => {
  const [isInView, setIsInView] = useState(!lazy || priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy || priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "50px"
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isInView]);

  return { isInView, imgRef };
};
