import { useEffect, useState } from 'react';
import { useCoreWebVitals } from '@/hooks/useCoreWebVitals';

interface PerformanceMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  fcp: number | null;
  score: number;
  recommendations: string[];
}

export const PerformanceMonitorEnhanced = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    fcp: null,
    score: 0,
    recommendations: []
  });

  const coreWebVitals = useCoreWebVitals();

  // Performance monitoring with Web Vitals
  useEffect(() => {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          const ttfb = navEntry.responseStart - navEntry.requestStart;
          
          setMetrics(prev => ({
            ...prev,
            ttfb,
            fcp: navEntry.loadEventEnd - navEntry.fetchStart
          }));
        }
      });
    });

    observer.observe({ entryTypes: ['navigation'] });

    return () => observer.disconnect();
  }, []);

  // Update metrics from Core Web Vitals
  useEffect(() => {
    if (coreWebVitals && coreWebVitals.metrics) {
      const { lcp, fid, cls } = coreWebVitals.metrics;
      
      // Calculate performance score (Google's scoring method approximation)
      let score = 0;
      let recommendations: string[] = [];

      // LCP scoring (0-100)
      if (lcp !== null) {
        if (lcp <= 2500) score += 25;
        else if (lcp <= 4000) score += 15;
        else recommendations.push('Improve Largest Contentful Paint (LCP) - optimize images and server response');
      }

      // FID scoring (0-100)
      if (fid !== null) {
        if (fid <= 100) score += 25;
        else if (fid <= 300) score += 15;
        else recommendations.push('Reduce First Input Delay (FID) - optimize JavaScript execution');
      }

      // CLS scoring (0-100)
      if (cls !== null) {
        if (cls <= 0.1) score += 25;
        else if (cls <= 0.25) score += 15;
        else recommendations.push('Minimize Cumulative Layout Shift (CLS) - add dimensions to images');
      }

      // TTFB scoring (0-25)
      if (metrics.ttfb !== null) {
        if (metrics.ttfb <= 200) score += 25;
        else if (metrics.ttfb <= 500) score += 15;
        else recommendations.push('Optimize Time to First Byte (TTFB) - improve server response time');
      }

      setMetrics(prev => ({
        ...prev,
        lcp,
        fid,
        cls,
        score,
        recommendations
      }));
    }
  }, [coreWebVitals, metrics.ttfb]);

  // Log metrics in development
  useEffect(() => {
    if (import.meta.env.DEV && metrics.score > 0) {
      console.log('📊 Performance Metrics:', {
        score: metrics.score,
        lcp: metrics.lcp,
        fid: metrics.fid,
        cls: metrics.cls,
        ttfb: metrics.ttfb,
        recommendations: metrics.recommendations
      });
    }
  }, [metrics]);

  // Performance alerts
  useEffect(() => {
    if (metrics.score < 50 && metrics.recommendations.length > 0) {
      console.warn('⚠️ Performance Alert: Score below 50. Recommendations:', metrics.recommendations);
    }
  }, [metrics.score, metrics.recommendations]);

  return null;
};