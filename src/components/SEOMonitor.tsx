
import React, { useEffect } from 'react';
import { useSEOMonitoring } from '@/hooks/useSEOMonitoring';
import { useCoreWebVitals } from '@/hooks/useCoreWebVitals';

const SEOMonitor: React.FC = () => {
  const { metrics: seoMetrics, getSEOScore, getSEORecommendations } = useSEOMonitoring();
  const { metrics: vitalMetrics, getOverallScore, getRecommendations } = useCoreWebVitals();

  useEffect(() => {
    // Only run monitoring in development or when explicitly enabled
    if (import.meta.env.DEV || localStorage.getItem('seo-monitoring') === 'enabled') {
      const timer = setTimeout(() => {
        const seoScore = getSEOScore();
        const vitalsScore = getOverallScore();
        const seoRecommendations = getSEORecommendations();
        const vitalsRecommendations = getRecommendations();

        console.group('🔍 SEO Monitoring Report');
        console.log('SEO Score:', seoScore + '%');
        console.log('Core Web Vitals Score:', vitalsScore + '%');
        
        if (seoRecommendations.length > 0) {
          console.group('📝 SEO Recommendations:');
          seoRecommendations.forEach((rec, index) => {
            console.log(`${index + 1}. ${rec}`);
          });
          console.groupEnd();
        }
        
        if (vitalsRecommendations.length > 0) {
          console.group('⚡ Performance Recommendations:');
          vitalsRecommendations.forEach((rec, index) => {
            console.log(`${index + 1}. ${rec}`);
          });
          console.groupEnd();
        }
        
        console.log('SEO Metrics:', seoMetrics);
        console.log('Web Vitals Metrics:', vitalMetrics);
        console.groupEnd();

        // Send critical issues to analytics
        if (window.gtag) {
          if (seoScore < 70) {
            window.gtag('event', 'seo_alert', {
              event_category: 'SEO',
              event_label: 'Low SEO Score',
              value: seoScore
            });
          }
          
          if (vitalsScore < 70) {
            window.gtag('event', 'performance_alert', {
              event_category: 'Performance',
              event_label: 'Low Web Vitals Score',
              value: vitalsScore
            });
          }
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [seoMetrics, vitalMetrics, getSEOScore, getOverallScore, getSEORecommendations, getRecommendations]);

  // This component doesn't render anything visible
  return null;
};

export default SEOMonitor;
