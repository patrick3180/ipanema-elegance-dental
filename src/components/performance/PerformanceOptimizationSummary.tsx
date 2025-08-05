import React, { useEffect, useState } from 'react';
import { useCoreWebVitals } from '@/hooks/useCoreWebVitals';

interface OptimizationReport {
  implemented: string[];
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  overallScore: number;
}

const PerformanceOptimizationSummary = () => {
  const { metrics, getOverallScore } = useCoreWebVitals();
  const [report, setReport] = useState<OptimizationReport>({
    implemented: [],
    lcp: null,
    fid: null,
    cls: null,
    overallScore: 0
  });

  useEffect(() => {
    const optimizationsImplemented = [
      '✅ Removed blocking @import for fonts',
      '✅ Added font preload links',
      '✅ Implemented font-display: swap',
      '✅ Added fallback fonts',
      '✅ Lazy loaded analytics scripts',
      '✅ Optimized GCLID tracking',
      '✅ Preloaded critical hero images',
      '✅ Added critical CSS inline',
      '✅ Disabled lazy loading for above-the-fold images',
      '✅ Added Service Worker caching',
      '✅ Enhanced resource hints (dns-prefetch)',
      '✅ Core Web Vitals monitoring',
      '✅ Performance optimization components'
    ];

    setReport({
      implemented: optimizationsImplemented,
      lcp: metrics.lcp,
      fid: metrics.fid,
      cls: metrics.cls,
      overallScore: getOverallScore()
    });
  }, [metrics]);

  // Only show in development
  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
      <h3 className="text-sm font-semibold mb-2">🚀 Performance Optimizations</h3>
      <div className="text-xs space-y-1 mb-3">
        {report.implemented.slice(0, 5).map((item, index) => (
          <div key={index} className="text-green-600">{item}</div>
        ))}
        <div className="text-gray-500">+ {report.implemented.length - 5} more optimizations</div>
      </div>
      
      <div className="text-xs border-t pt-2">
        <div className="font-medium mb-1">Current Metrics:</div>
        <div>LCP: {report.lcp ? `${Math.round(report.lcp)}ms` : 'Measuring...'}</div>
        <div>FID: {report.fid ? `${Math.round(report.fid)}ms` : 'Measuring...'}</div>
        <div>CLS: {report.cls ? report.cls.toFixed(3) : 'Measuring...'}</div>
        <div className="font-medium mt-1">
          Score: {Math.round(report.overallScore)}%
        </div>
      </div>
    </div>
  );
};

export default PerformanceOptimizationSummary;