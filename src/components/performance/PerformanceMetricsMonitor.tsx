import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  tti?: number;
  tbt?: number;
}

interface PerformanceMetricsMonitorProps {
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
  enableLogging?: boolean;
}

const PerformanceMetricsMonitor = ({
  onMetricsUpdate,
  enableLogging = true
}: PerformanceMetricsMonitorProps) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});

  useEffect(() => {
    const updateMetrics = (newMetrics: Partial<PerformanceMetrics>) => {
      setMetrics(prev => {
        const updated = { ...prev, ...newMetrics };
        onMetricsUpdate?.(updated);
        return updated;
      });
    };

    // Monitor First Contentful Paint (FCP)
    const observeFCP = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            updateMetrics({ fcp: entry.startTime });
            if (enableLogging) {
              console.log('FCP:', entry.startTime.toFixed(2), 'ms');
            }
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });
      return observer;
    };

    // Monitor Largest Contentful Paint (LCP)
    const observeLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        updateMetrics({ lcp: lastEntry.startTime });
        if (enableLogging) {
          console.log('LCP:', lastEntry.startTime.toFixed(2), 'ms');
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      return observer;
    };

    // Monitor First Input Delay (FID)
    const observeFID = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as any; // FID entries have specific properties
          updateMetrics({ fid: fidEntry.processingStart - fidEntry.startTime });
          if (enableLogging) {
            console.log('FID:', (fidEntry.processingStart - fidEntry.startTime).toFixed(2), 'ms');
          }
        }
      });
      observer.observe({ entryTypes: ['first-input'] });
      return observer;
    };

    // Monitor Cumulative Layout Shift (CLS)
    const observeCLS = () => {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const clsEntry = entry as any; // CLS entries have specific properties
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
          }
        }
        updateMetrics({ cls: clsValue });
        if (enableLogging) {
          console.log('CLS:', clsValue.toFixed(4));
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
      return observer;
    };

    // Calculate Time to Interactive (TTI) approximation
    const calculateTTI = () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        // TTI approximation: when main thread becomes idle after DOMContentLoaded
        const tti = navigationEntry.domContentLoadedEventEnd;
        updateMetrics({ tti });
        if (enableLogging) {
          console.log('TTI (approx):', tti.toFixed(2), 'ms');
        }
      }
    };

    // Calculate Total Blocking Time (TBT)
    const calculateTBT = () => {
      const entries = performance.getEntriesByType('measure');
      let tbt = 0;
      entries.forEach(entry => {
        if (entry.duration > 50) {
          tbt += entry.duration - 50;
        }
      });
      updateMetrics({ tbt });
      if (enableLogging) {
        console.log('TBT:', tbt.toFixed(2), 'ms');
      }
    };

    // Initialize observers
    const observers: PerformanceObserver[] = [];
    
    if ('PerformanceObserver' in window) {
      observers.push(observeFCP());
      observers.push(observeLCP());
      observers.push(observeFID());
      observers.push(observeCLS());
    }

    // Calculate TTI and TBT after page load
    if (document.readyState === 'complete') {
      calculateTTI();
      calculateTBT();
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          calculateTTI();
          calculateTBT();
        }, 0);
      });
    }

    // Performance budget alerts
    const checkPerformanceBudgets = () => {
      setTimeout(() => {
        const currentMetrics = metrics;
        const alerts: string[] = [];

        if (currentMetrics.fcp && currentMetrics.fcp > 1800) {
          alerts.push(`FCP (${currentMetrics.fcp.toFixed(0)}ms) exceeds budget (1800ms)`);
        }
        if (currentMetrics.lcp && currentMetrics.lcp > 2500) {
          alerts.push(`LCP (${currentMetrics.lcp.toFixed(0)}ms) exceeds budget (2500ms)`);
        }
        if (currentMetrics.fid && currentMetrics.fid > 100) {
          alerts.push(`FID (${currentMetrics.fid.toFixed(0)}ms) exceeds budget (100ms)`);
        }
        if (currentMetrics.cls && currentMetrics.cls > 0.1) {
          alerts.push(`CLS (${currentMetrics.cls.toFixed(3)}) exceeds budget (0.1)`);
        }

        if (alerts.length > 0 && enableLogging) {
          console.warn('Performance Budget Exceeded:', alerts);
        }
      }, 5000);
    };

    checkPerformanceBudgets();

    // Cleanup
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [onMetricsUpdate, enableLogging]);

  // Export metrics for debugging
  useEffect(() => {
    if (enableLogging && Object.keys(metrics).length > 0) {
      (window as any).__PERFORMANCE_METRICS__ = metrics;
    }
  }, [metrics, enableLogging]);

  return null;
};

export default PerformanceMetricsMonitor;