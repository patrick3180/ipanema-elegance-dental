
import { useState, useEffect } from 'react';

interface WebVitalsMetrics {
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay  
  cls: number | null; // Cumulative Layout Shift
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
  inp: number | null; // Interaction to Next Paint
}

interface VitalScore {
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  percentile: number;
}

export const useCoreWebVitals = () => {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    inp: null
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
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { 
        renderTime?: number; 
        loadTime?: number; 
      };
      const lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
      
      setMetrics(prev => ({ ...prev, lcp }));
      
      // Track in Google Analytics
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'LCP',
          value: Math.round(lcp),
          custom_metric_1: lcp
        });
      }
    });

    // Measure FID (First Input Delay)
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        const fid = (entry as any).processingStart - entry.startTime;
        setMetrics(prev => ({ ...prev, fid }));
        
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'FID',
            value: Math.round(fid),
            custom_metric_2: fid
          });
        }
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
          
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'CLS',
              value: Math.round(clsValue * 1000), // Convert to milliseconds for GA
              custom_metric_3: clsValue
            });
          }
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
          
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'FCP',
              value: Math.round(fcp),
              custom_metric_4: fcp
            });
          }
        }
      });
    });

    // Measure INP (Interaction to Next Paint) - new Core Web Vital
    const inpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        const inp = (entry as any).processingStart - entry.startTime;
        setMetrics(prev => ({ ...prev, inp }));
        
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'INP',
            value: Math.round(inp),
            custom_metric_5: inp
          });
        }
      });
    });

    // Start observing
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      fidObserver.observe({ entryTypes: ['first-input'] });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      fcpObserver.observe({ entryTypes: ['paint'] });
      
      // INP is newer, so check if supported
      try {
        inpObserver.observe({ entryTypes: ['event'] });
      } catch (e) {
        console.log('INP measurement not supported in this browser');
      }
      
    } catch (error) {
      console.error('Error setting up performance observers:', error);
    }

    // Measure TTFB (Time to First Byte)
    if (performance.timing) {
      const ttfb = performance.timing.responseStart - performance.timing.navigationStart;
      setMetrics(prev => ({ ...prev, ttfb }));
      
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'TTFB',
          value: Math.round(ttfb),
          custom_metric_6: ttfb
        });
      }
    }

    // Cleanup observers
    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      fcpObserver.disconnect();
      inpObserver.disconnect();
    };
  }, []);

  const getVitalScore = (vital: keyof WebVitalsMetrics, value: number): VitalScore => {
    const thresholds = {
      lcp: { good: 2500, needsImprovement: 4000 },
      fid: { good: 100, needsImprovement: 300 },
      cls: { good: 0.1, needsImprovement: 0.25 },
      fcp: { good: 1800, needsImprovement: 3000 },
      ttfb: { good: 800, needsImprovement: 1800 },
      inp: { good: 200, needsImprovement: 500 }
    };

    const threshold = thresholds[vital];
    if (!threshold) {
      return { value, rating: 'good', percentile: 100 };
    }

    let rating: 'good' | 'needs-improvement' | 'poor';
    let percentile: number;

    if (value <= threshold.good) {
      rating = 'good';
      percentile = 75 + (25 * (threshold.good - value) / threshold.good);
    } else if (value <= threshold.needsImprovement) {
      rating = 'needs-improvement';
      percentile = 50 + (25 * (threshold.needsImprovement - value) / (threshold.needsImprovement - threshold.good));
    } else {
      rating = 'poor';
      percentile = Math.max(0, 50 - (50 * (value - threshold.needsImprovement) / threshold.needsImprovement));
    }

    return { value, rating, percentile: Math.round(percentile) };
  };

  const getOverallScore = (): number => {
    const { lcp, fid, cls } = metrics;
    if (!lcp || !fid || cls === null) return 0;

    const lcpScore = getVitalScore('lcp', lcp);
    const fidScore = getVitalScore('fid', fid);
    const clsScore = getVitalScore('cls', cls);

    const weightedScore = (
      lcpScore.percentile * 0.4 + // LCP is most important
      fidScore.percentile * 0.3 + // FID is second most important
      clsScore.percentile * 0.3   // CLS is third most important
    );

    return Math.round(weightedScore);
  };

  const getRecommendations = (): string[] => {
    const recommendations: string[] = [];
    
    if (metrics.lcp && metrics.lcp > 2500) {
      recommendations.push('Otimize o Largest Contentful Paint (LCP) - comprima imagens e melhore o servidor');
    }
    
    if (metrics.fid && metrics.fid > 100) {
      recommendations.push('Reduza o First Input Delay (FID) - minimize JavaScript e otimize threads');
    }
    
    if (metrics.cls && metrics.cls > 0.1) {
      recommendations.push('Melhore o Cumulative Layout Shift (CLS) - defina dimensões para imagens e evite mudanças de layout');
    }
    
    if (metrics.fcp && metrics.fcp > 1800) {
      recommendations.push('Acelere o First Contentful Paint (FCP) - otimize CSS crítico e recursos');
    }
    
    if (metrics.ttfb && metrics.ttfb > 800) {
      recommendations.push('Melhore o Time to First Byte (TTFB) - otimize servidor e CDN');
    }

    return recommendations;
  };

  return {
    metrics,
    isSupported,
    getVitalScore,
    getOverallScore,
    getRecommendations
  };
};
