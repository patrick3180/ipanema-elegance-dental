import React, { useEffect, useState } from 'react';
import { seoEnhancer } from '@/utils/seoEnhancer';

interface HealthReport {
  score: number;
  status: string;
  analytics: {
    redirectCount: number;
    notFoundCount: number;
    goneCount: number;
  };
  suggestions: string[];
  timestamp: string;
}

const SEOHealthMonitor = () => {
  const [healthData, setHealthData] = useState<HealthReport | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Only run in development or when explicitly enabled
    if (!import.meta.env.DEV && !localStorage.getItem('enableSEOMonitoring')) {
      return;
    }

    const updateHealth = () => {
      const report = seoEnhancer.getHealthReport() as HealthReport;
      setHealthData(report);
      
      // Log critical issues immediately
      if (report.score < 60) {
        console.warn('🚨 SEO Health Critical:', report);
      }
    };

    // Initial check
    updateHealth();
    
    // Update every 2 minutes
    const interval = setInterval(updateHealth, 120000);
    
    return () => clearInterval(interval);
  }, []);

  // Only show in development or when monitoring is enabled
  if (!import.meta.env.DEV && !localStorage.getItem('enableSEOMonitoring')) {
    return null;
  }

  if (!healthData) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-yellow-600';
      default: return 'text-red-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return '✅';
      case 'good': return '⚠️';
      default: return '🚨';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div 
        className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 cursor-pointer"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-900">
              SEO Health {getStatusIcon(healthData.status)}
            </div>
            <div className={`text-lg font-bold ${getStatusColor(healthData.status)}`}>
              {healthData.score}/100
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {showDetails ? '▼' : '▶'}
          </div>
        </div>
        
        {showDetails && (
          <div className="mt-3 border-t pt-3">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Redirects:</span>
                <span>{healthData.analytics.redirectCount}</span>
              </div>
              <div className="flex justify-between">
                <span>404 Errors:</span>
                <span className={healthData.analytics.notFoundCount > 10 ? 'text-red-600' : ''}>
                  {healthData.analytics.notFoundCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span>410 Gone:</span>
                <span>{healthData.analytics.goneCount}</span>
              </div>
            </div>
            
            {healthData.suggestions.length > 0 && (
              <div className="mt-3 border-t pt-2">
                <div className="text-xs font-medium mb-1">Issues:</div>
                <div className="space-y-1">
                  {healthData.suggestions.slice(0, 3).map((suggestion, index) => (
                    <div key={index} className="text-xs text-red-600">
                      {suggestion.substring(0, 80)}...
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-2 text-xs text-gray-400">
              Last update: {new Date(healthData.timestamp).toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SEOHealthMonitor;