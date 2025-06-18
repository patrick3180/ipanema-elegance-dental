
import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
}

interface VitalThresholds {
  lcp: { good: number; needsImprovement: number };
  fid: { good: number; needsImprovement: number };
  cls: { good: number; needsImprovement: number };
}

const VITAL_THRESHOLDS: VitalThresholds = {
  lcp: { good: 2500, needsImprovement: 4000 },
  fid: { good: 100, needsImprovement: 300 },
  cls: { good: 0.1, needsImprovement: 0.25 }
};

export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null
  });

  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if browser supports performance APIs
    const supported = 'PerformanceObserver' in window && 'performance' in window;
    setIsSupported(supported);

    if (!supported) {
      console.warn('Performance APIs not supported in this browser');
      return;
    }

    // Measure LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
      const lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
      
      setMetrics(prev => ({ ...prev, lcp }));
      console.log('LCP:', lcp, getVitalRating('lcp', lcp));
    });

    // Measure FID (First Input Delay)
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        const fid = (entry as any).processingStart - entry.startTime;
        setMetrics(prev => ({ ...prev, fid }));
        console.log('FID:', fid, getVitalRating('fid', fid));
      });
    });

    // Measure CLS (Cumulative Layout Shift)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          setMetrics(prev => ({ ...prev, cls: clsValue }));
          console.log('CLS:', clsValue, getVitalRating('cls', clsValue));
        }
      });
    });

    // Measure FCP (First Contentful Paint)
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          const fcp = entry.startTime;
          setMetrics(prev => ({ ...prev, fcp }));
          console.log('FCP:', fcp);
        }
      });
    });

    // Start observing
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      fidObserver.observe({ entryTypes: ['first-input'] });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      fcpObserver.observe({ entryTypes: ['paint'] });
    } catch (error) {
      console.error('Error setting up performance observers:', error);
    }

    // Measure TTFB (Time to First Byte)
    if (performance.timing) {
      const ttfb = performance.timing.responseStart - performance.timing.navigationStart;
      setMetrics(prev => ({ ...prev, ttfb }));
      console.log('TTFB:', ttfb);
    }

    // Cleanup observers
    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      fcpObserver.disconnect();
    };
  }, []);

  const getVitalRating = (vital: keyof VitalThresholds, value: number): 'good' | 'needs-improvement' | 'poor' => {
    const thresholds = VITAL_THRESHOLDS[vital];
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  const getOverallScore = (): number => {
    const { lcp, fid, cls } = metrics;
    if (!lcp || !fid || cls === null) return 0;

    const lcpScore = getVitalRating('lcp', lcp) === 'good' ? 100 : getVitalRating('lcp', lcp) === 'needs-improvement' ? 70 : 40;
    const fidScore = getVitalRating('fid', fid) === 'good' ? 100 : getVitalRating('fid', fid) === 'needs-improvement' ? 70 : 40;
    const clsScore = getVitalRating('cls', cls) === 'good' ? 100 : getVitalRating('cls', cls) === 'needs-improvement' ? 70 : 40;

    return Math.round((lcpScore + fidScore + clsScore) / 3);
  };

  return {
    metrics,
    isSupported,
    getVitalRating,
    getOverallScore
  };
};
