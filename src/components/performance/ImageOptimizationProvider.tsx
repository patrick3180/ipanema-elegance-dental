import React, { createContext, useContext, ReactNode } from 'react';
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';

interface ImageOptimizationConfig {
  enablePreloading: boolean;
  quality: number;
  defaultWidth: number;
  defaultHeight: number;
}

interface ImageOptimizationContextType {
  config: ImageOptimizationConfig;
}

const ImageOptimizationContext = createContext<ImageOptimizationContextType | undefined>(undefined);

interface ImageOptimizationProviderProps {
  children: ReactNode;
  config?: Partial<ImageOptimizationConfig>;
  criticalImages?: Array<{ src: string; width?: number }>;
}

const defaultConfig: ImageOptimizationConfig = {
  enablePreloading: true,
  quality: 85,
  defaultWidth: 800,
  defaultHeight: 600,
};

export const ImageOptimizationProvider = ({
  children,
  config: userConfig = {},
  criticalImages = [],
}: ImageOptimizationProviderProps) => {
  const config = { ...defaultConfig, ...userConfig };

  // Preload critical images
  useCriticalImagePreload({
    images: criticalImages,
    enabled: config.enablePreloading,
  });

  return (
    <ImageOptimizationContext.Provider value={{ config }}>
      {children}
    </ImageOptimizationContext.Provider>
  );
};

export const useImageOptimization = () => {
  const context = useContext(ImageOptimizationContext);
  if (context === undefined) {
    throw new Error('useImageOptimization must be used within an ImageOptimizationProvider');
  }
  return context;
};