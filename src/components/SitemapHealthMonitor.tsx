import React, { useEffect, useState } from 'react';
import { runComprehensiveSitemapDiagnostics, logComprehensiveDiagnosticSummary, type SitemapDiagnosticReport } from '@/utils/sitemapDiagnosticsEnhanced';

export const SitemapHealthMonitor: React.FC = () => {
  const [lastCheck, setLastCheck] = useState<string | null>(null);
  const [urlCount, setUrlCount] = useState<number>(0);
  const [isHealthy, setIsHealthy] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const runHealthCheck = async () => {
      try {
        console.log('🔍 Running sitemap health check...');
        
        const diagnosticReport = await runComprehensiveSitemapDiagnostics();
        logComprehensiveDiagnosticSummary(diagnosticReport);
        
        setLastCheck(new Date().toISOString());
        setUrlCount(diagnosticReport.sitemapGeneration.urlCount);
        setIsHealthy(diagnosticReport.sitemapGeneration.success && diagnosticReport.sitemapGeneration.urlCount > 20);
        
        const allErrors = [
          ...diagnosticReport.contentfulErrors,
          ...diagnosticReport.sitemapGeneration.errors
        ];
        setErrors(allErrors);
        
        // Alert if critical issues found
        if (!diagnosticReport.sitemapGeneration.success) {
          console.error('🚨 CRITICAL: Sitemap generation is failing!');
        }
        
        if (diagnosticReport.sitemapGeneration.urlCount < 20) {
          console.warn(`⚠️ WARNING: Low URL count in sitemap: ${diagnosticReport.sitemapGeneration.urlCount}`);
        }
        
        if (!diagnosticReport.contentfulConnection) {
          console.error('🚨 CRITICAL: Contentful connection failed!');
        }
        
      } catch (error) {
        console.error('❌ Sitemap health check failed:', error);
        setErrors([`Health check failed: ${error}`]);
        setIsHealthy(false);
      }
    };

    // Run initial health check
    runHealthCheck();

    // Set up periodic health checks (every 10 minutes)
    const interval = setInterval(runHealthCheck, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // This component manages sitemap health but doesn't render anything
  return null;
};

export default SitemapHealthMonitor;