import { useEffect } from 'react';

interface CoreWebVitalsMonitorProps {
  enabled?: boolean;
  reportEndpoint?: string;
}

const CoreWebVitalsMonitor = ({ enabled = true, reportEndpoint }: CoreWebVitalsMonitorProps) => {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    let lcpObserver: PerformanceObserver | null = null;
    let fidObserver: PerformanceObserver | null = null;
    let clsObserver: PerformanceObserver | null = null;

    const reportMetric = (metric: any) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Core Web Vitals] ${metric.name}:`, metric.value);
      }

      // Send to analytics if endpoint provided
      if (reportEndpoint) {
        fetch(reportEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            metric: metric.name,
            value: metric.value,
            url: window.location.href,
            timestamp: Date.now()
          })
        }).catch(err => console.warn('Failed to report metric:', err));
      }

      // Send to Google Analytics if available
      if (window.gtag) {
        window.gtag('event', metric.name, {
          custom_parameter_1: metric.value,
          custom_parameter_2: window.location.pathname
        });
      }
    };

    // Measure LCP (Largest Contentful Paint)
    if ('PerformanceObserver' in window) {
      try {
        lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          reportMetric({
            name: 'LCP',
            value: Math.round(lastEntry.startTime),
            rating: lastEntry.startTime <= 2500 ? 'good' : lastEntry.startTime <= 4000 ? 'needs-improvement' : 'poor'
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observation failed:', e);
      }

      // Measure FID (First Input Delay)
      try {
        fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            reportMetric({
              name: 'FID',
              value: Math.round(entry.processingStart - entry.startTime),
              rating: entry.processingStart - entry.startTime <= 100 ? 'good' : 
                     entry.processingStart - entry.startTime <= 300 ? 'needs-improvement' : 'poor'
            });
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observation failed:', e);
      }

      // Measure CLS (Cumulative Layout Shift)
      try {
        let clsValue = 0;
        clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          
          reportMetric({
            name: 'CLS',
            value: Math.round(clsValue * 1000) / 1000,
            rating: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor'
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observation failed:', e);
      }
    }

    // Measure FCP (First Contentful Paint) using Navigation Timing
    const measureFCP = () => {
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      
      if (fcpEntry) {
        reportMetric({
          name: 'FCP',
          value: Math.round(fcpEntry.startTime),
          rating: fcpEntry.startTime <= 1800 ? 'good' : fcpEntry.startTime <= 3000 ? 'needs-improvement' : 'poor'
        });
      }
    };

    // Measure TTFB (Time to First Byte)
    const measureTTFB = () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        reportMetric({
          name: 'TTFB',
          value: Math.round(ttfb),
          rating: ttfb <= 800 ? 'good' : ttfb <= 1800 ? 'needs-improvement' : 'poor'
        });
      }
    };

    // Wait for page load to measure FCP and TTFB
    if (document.readyState === 'complete') {
      measureFCP();
      measureTTFB();
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          measureFCP();
          measureTTFB();
        }, 0);
      });
    }

    return () => {
      if (lcpObserver) lcpObserver.disconnect();
      if (fidObserver) fidObserver.disconnect();
      if (clsObserver) clsObserver.disconnect();
    };
  }, [enabled, reportEndpoint]);

  return null;
};

export default CoreWebVitalsMonitor;