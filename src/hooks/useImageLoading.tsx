
import { useState } from "react";

export const useImageLoading = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (optimizedSrc: string, alt: string) => {
    console.log('OptimizedImage: Image loaded successfully:', {
      src: optimizedSrc,
      alt
    });
    setIsLoaded(true);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgElement = event.currentTarget;
    console.error('OptimizedImage: Image load failed:', {
      src: imgElement.src,
      alt: imgElement.alt,
      naturalWidth: imgElement.naturalWidth,
      naturalHeight: imgElement.naturalHeight,
      complete: imgElement.complete
    });
    
    setHasError(true);
    setIsLoaded(true);
  };

  return {
    isLoaded,
    hasError,
    handleLoad,
    handleError
  };
};
