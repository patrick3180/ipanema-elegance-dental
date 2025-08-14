import { lazy, Suspense, ComponentType } from 'react';

interface LazyComponentLoaderProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  intersectionThreshold?: number;
  children?: React.ReactNode;
}

export const LazyComponentLoader = ({ 
  component, 
  fallback = <div className="h-32 bg-muted animate-pulse rounded" />,
  intersectionThreshold = 0.1,
  children
}: LazyComponentLoaderProps) => {
  const LazyComponent = lazy(component);

  return (
    <Suspense fallback={fallback}>
      <LazyComponent>
        {children}
      </LazyComponent>
    </Suspense>
  );
};