import { lazy, Suspense, ComponentType, ReactNode } from 'react';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

interface LazyComponentLoaderProps {
  factory: () => Promise<{ default: ComponentType<any> }>;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  children?: ReactNode;
  className?: string;
}

interface LazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

// Enhanced lazy loading with intersection observer
export const LazyComponentLoader = ({
  factory,
  fallback = <div className="w-full h-32 bg-gray-100 animate-pulse rounded" />,
  threshold = 0.1,
  rootMargin = '50px',
  children,
  className = ''
}: LazyComponentLoaderProps) => {
  const { shouldReduceAnimations, isLowEnd } = useMobileOptimization();
  
  // Use immediate loading for low-end devices to avoid complexity
  if (isLowEnd) {
    const LazyComponent = lazy(factory);
    return (
      <Suspense fallback={fallback}>
        <LazyComponent />
        {children}
      </Suspense>
    );
  }

  const LazyComponent = lazy(() => {
    return new Promise<{ default: ComponentType<any> }>((resolve) => {
      // Use intersection observer for better performance
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer.disconnect();
              // Add small delay for smoother experience
              setTimeout(() => {
                factory().then(resolve);
              }, shouldReduceAnimations ? 0 : 100);
            }
          });
        },
        { threshold, rootMargin }
      );

      // Create temporary element to observe
      const sentinel = document.createElement('div');
      sentinel.className = className;
      if (document.body) {
        document.body.appendChild(sentinel);
        observer.observe(sentinel);
      }

      // Cleanup after 10 seconds to prevent memory leaks
      setTimeout(() => {
        observer.disconnect();
        if (sentinel.parentNode) {
          sentinel.parentNode.removeChild(sentinel);
        }
        factory().then(resolve);
      }, 10000);
    });
  });

  return (
    <Suspense fallback={fallback}>
      <LazyComponent />
      {children}
    </Suspense>
  );
};

// Create lazy loader hook for reusable components
export const useLazyLoader = (options: LazyLoadOptions = {}) => {
  const { isLowEnd, shouldReduceAnimations } = useMobileOptimization();
  
  const createLazyComponent = <T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>,
    customFallback?: ReactNode
  ): React.LazyExoticComponent<T> => {
    const fallback = customFallback || (
      <div className={`
        w-full h-20 bg-gray-100 rounded animate-pulse
        ${shouldReduceAnimations ? '' : 'transition-opacity duration-300'}
      `} />
    );

    // Skip lazy loading for low-end devices
    if (isLowEnd) {
      return lazy(factory);
    }

    return lazy(() => {
      return new Promise<{ default: T }>((resolve) => {
        // Defer loading with intersection observer
        const loadComponent = () => {
          const delay = options.delay || (shouldReduceAnimations ? 0 : 150);
          setTimeout(() => {
            factory().then(resolve);
          }, delay);
        };

        // Load immediately if already in viewport, otherwise use intersection observer
        if (typeof window !== 'undefined') {
          (window as any).requestIdleCallback 
            ? (window as any).requestIdleCallback(loadComponent, { timeout: 2000 })
            : setTimeout(loadComponent, 100);
        } else {
          loadComponent();
        }
      });
    });
  };

  return { createLazyComponent };
};

// Pre-configured lazy loaders for common component patterns
export const createBlogLazyLoader = () => {
  const { createLazyComponent } = useLazyLoader({
    threshold: 0.1,
    rootMargin: '100px',
    delay: 200
  });

  return {
    BlogContent: createLazyComponent(
      () => import('@/components/BlogContent'),
      <div className="w-full h-64 bg-gray-50 rounded-lg animate-pulse" />
    ),
    BlogComments: createLazyComponent(
      () => import('@/components/blog/BlogPostShare'),
      <div className="w-full h-40 bg-gray-50 rounded animate-pulse" />
    ),
    RelatedPosts: createLazyComponent(
      () => import('@/components/blog/BlogPostRelated'),
      <div className="w-full h-32 bg-gray-50 rounded animate-pulse" />
    )
  };
};

export const createUILazyLoader = () => {
  const { createLazyComponent } = useLazyLoader({
    threshold: 0.2,
    rootMargin: '50px',
    delay: 100
  });

  return {
    ChatAssistant: createLazyComponent(
      () => import('@/components/ChatAssistant'),
      <div className="fixed bottom-4 right-4 w-12 h-12 bg-blue-500 rounded-full animate-pulse" />
    ),
    WhatsAppButton: createLazyComponent(
      () => import('@/components/WhatsAppButton'),
      <div className="fixed bottom-4 left-4 w-12 h-12 bg-green-500 rounded-full animate-pulse" />
    ),
    TestimonialsSection: createLazyComponent(
      () => import('@/components/TestimonialsSection'),
      <div className="w-full h-80 bg-gray-50 rounded-lg animate-pulse" />
    )
  };
};