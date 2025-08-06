import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

interface Metric {
  name: string;
  value: number | null;
  rating: 'good' | 'needs-improvement' | 'poor';
  threshold: { good: number; poor: number };
}

interface CoreWebVitalsRealtimeMonitorProps {
  enableRegressionDetection?: boolean;
  onRegressionDetected?: (metric: string, value: number) => void;
}

const CoreWebVitalsRealtimeMonitor = ({
  enableRegressionDetection = true,
  onRegressionDetected
}: CoreWebVitalsRealtimeMonitorProps) => {
  const [metrics, setMetrics] = useState<Record<string, Metric>>({
    lcp: { name: 'LCP', value: null, rating: 'good', threshold: { good: 2500, poor: 4000 } },
    fid: { name: 'FID', value: null, rating: 'good', threshold: { good: 100, poor: 300 } },
    cls: { name: 'CLS', value: null, rating: 'good', threshold: { good: 0.1, poor: 0.25 } },
    fcp: { name: 'FCP', value: null, rating: 'good', threshold: { good: 1800, poor: 3000 } },
    ttfb: { name: 'TTFB', value: null, rating: 'good', threshold: { good: 800, poor: 1800 } }
  });

  const [historicalData, setHistoricalData] = useState<Record<string, number[]>>({});
  const [overallScore, setOverallScore] = useState(0);

  const getRating = (value: number, threshold: { good: number; poor: number }): 'good' | 'needs-improvement' | 'poor' => {
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const detectRegression = (metricName: string, newValue: number) => {
    if (!enableRegressionDetection) return;

    const history = historicalData[metricName] || [];
    if (history.length >= 5) {
      const recentAverage = history.slice(-5).reduce((a, b) => a + b, 0) / 5;
      const regressionThreshold = recentAverage * 1.2; // 20% increase is considered regression

      if (newValue > regressionThreshold) {
        onRegressionDetected?.(metricName, newValue);
        console.warn(`Performance regression detected in ${metricName}: ${newValue}ms (baseline: ${recentAverage.toFixed(0)}ms)`);
      }
    }

    // Store historical data (keep last 10 measurements)
    setHistoricalData(prev => ({
      ...prev,
      [metricName]: [...(prev[metricName] || []), newValue].slice(-10)
    }));
  };

  useEffect(() => {
    let observer: PerformanceObserver;

    if ('PerformanceObserver' in window) {
      // LCP Observer
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEventTiming;
        if (lastEntry) {
          const value = lastEntry.startTime;
          detectRegression('lcp', value);
          setMetrics(prev => ({
            ...prev,
            lcp: { ...prev.lcp, value, rating: getRating(value, prev.lcp.threshold) }
          }));
        }
      });

      // FID Observer  
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEventTiming;
          const value = fidEntry.processingStart - fidEntry.startTime;
          detectRegression('fid', value);
          setMetrics(prev => ({
            ...prev,
            fid: { ...prev.fid, value, rating: getRating(value, prev.fid.threshold) }
          }));
        });
      });

      // CLS Observer
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        if (clsValue > 0) {
          detectRegression('cls', clsValue);
          setMetrics(prev => ({
            ...prev,
            cls: { ...prev.cls, value: clsValue, rating: getRating(clsValue, prev.cls.threshold) }
          }));
        }
      });

      try {
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        fidObserver.observe({ type: 'first-input', buffered: true });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        console.warn('Some performance observers not supported:', e);
      }

      // Navigation timing for FCP and TTFB
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const nav = navigationEntries[0];
        
        // TTFB
        const ttfb = nav.responseStart - nav.requestStart;
        setMetrics(prev => ({
          ...prev,
          ttfb: { ...prev.ttfb, value: ttfb, rating: getRating(ttfb, prev.ttfb.threshold) }
        }));

        // FCP
        const paintEntries = performance.getEntriesByType('paint');
        const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          const fcp = fcpEntry.startTime;
          setMetrics(prev => ({
            ...prev,
            fcp: { ...prev.fcp, value: fcp, rating: getRating(fcp, prev.fcp.threshold) }
          }));
        }
      }
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  // Calculate overall score
  useEffect(() => {
    const validMetrics = Object.values(metrics).filter(m => m.value !== null);
    if (validMetrics.length === 0) return;

    const score = validMetrics.reduce((acc, metric) => {
      const points = metric.rating === 'good' ? 100 : metric.rating === 'needs-improvement' ? 60 : 20;
      return acc + points;
    }, 0) / validMetrics.length;

    setOverallScore(score);
  }, [metrics]);

  const formatValue = (metric: Metric) => {
    if (metric.value === null) return '--';
    if (metric.name === 'CLS') return metric.value.toFixed(3);
    return `${Math.round(metric.value)}ms`;
  };

  const getIcon = (rating: string) => {
    switch (rating) {
      case 'good': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'needs-improvement': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'poor': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Zap className="w-4 h-4 text-gray-400" />;
    }
  };

  const getBadgeVariant = (rating: string) => {
    switch (rating) {
      case 'good': return 'default';
      case 'needs-improvement': return 'secondary';
      case 'poor': return 'destructive';
      default: return 'outline';
    }
  };

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 bg-background/95 backdrop-blur-sm border shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <span>Core Web Vitals</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Score:</span>
            <Progress value={overallScore} className="w-16 h-2" />
            <span className="text-xs font-medium">{Math.round(overallScore)}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.entries(metrics).map(([key, metric]) => (
          <div key={key} className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              {getIcon(metric.rating)}
              <span className="text-xs font-medium">{metric.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono">{formatValue(metric)}</span>
              <Badge variant={getBadgeVariant(metric.rating)} className="text-xs px-1 py-0">
                {metric.rating.charAt(0).toUpperCase()}
              </Badge>
            </div>
          </div>
        ))
        }
        {enableRegressionDetection && (
          <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
            Regression detection: enabled
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CoreWebVitalsRealtimeMonitor;
