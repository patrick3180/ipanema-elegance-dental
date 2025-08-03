import { 
  runCoreContentfulDiagnostics, 
  testSitemapGeneration, 
  generateRecommendations,
  logDiagnosticSummary,
  type DiagnosticReport 
} from '@/utils/sitemapDiagnosticsCore';

export type { DiagnosticReport };

export const runSitemapDiagnostics = async (): Promise<DiagnosticReport> => {
  console.log('🔍 Running comprehensive sitemap diagnostics...');
  
  try {
    // Run core diagnostics
    const coreReport = await runCoreContentfulDiagnostics();
    
    // Test sitemap generation separately
    const sitemapTest = await testSitemapGeneration();
    
    // Combine results
    const fullReport: DiagnosticReport = {
      ...coreReport,
      sitemapGeneration: sitemapTest,
      recommendations: []
    } as DiagnosticReport;
    
    // Generate recommendations
    fullReport.recommendations = generateRecommendations(fullReport);
    
    console.log('📋 Diagnostic report complete:', fullReport);
    return fullReport;
    
  } catch (error) {
    console.error('❌ Critical error in diagnostics:', error);
    
    // Return minimal error report
    const errorReport: DiagnosticReport = {
      timestamp: new Date().toISOString(),
      contentfulConnection: false,
      contentfulErrors: [error instanceof Error ? error.message : 'Unknown critical error'],
      blogPostCount: { contentful: 0, local: 0, cached: 0 },
      cacheStatus: { isHealthy: false, entries: 0, cacheKeys: [] },
      sitemapGeneration: { success: false, urlCount: 0, errors: ['Critical diagnostic failure'] },
      recommendations: ['🚨 Critical system error - check console logs for details']
    };
    
    return errorReport;
  }
};

export { logDiagnosticSummary };