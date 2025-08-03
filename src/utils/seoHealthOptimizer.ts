import { urlOptimizer, type SitemapOptimizationReport } from '@/utils/urlOptimizer';
import { indexingMonitor, type IndexingReport } from '@/utils/indexingMonitor';
import { coreWebVitalsOptimizer, type WebVitalsReport } from '@/utils/coreWebVitalsOptimizer';

interface SEOHealthScore {
  overall: number;
  indexing: number;
  performance: number;
  structure: number;
  recommendations: string[];
  criticalIssues: string[];
  lastUpdated: number;
}

interface ComprehensiveReport {
  healthScore: SEOHealthScore;
  indexingReport?: IndexingReport;
  webVitalsReport?: WebVitalsReport;
  urlOptimizationReport?: SitemapOptimizationReport;
  actionPlan: string[];
  nextSteps: string[];
}

class SEOHealthOptimizer {
  public async generateComprehensiveReport(): Promise<ComprehensiveReport> {
    console.log('🔍 Generating comprehensive SEO health report...');

    try {
      // Run all optimizations in parallel
      const [webVitalsReport, indexingReport] = await Promise.allSettled([
        coreWebVitalsOptimizer.runOptimizationCheck(),
        this.getIndexingReport()
      ]);

      // Get URL optimization report
      const sampleUrls = this.getSampleUrls();
      const urlOptimizationReport = urlOptimizer.analyzeSitemapUrls(sampleUrls);

      // Calculate health scores
      const healthScore = this.calculateHealthScore(
        webVitalsReport.status === 'fulfilled' ? webVitalsReport.value : null,
        indexingReport.status === 'fulfilled' ? indexingReport.value : null,
        urlOptimizationReport
      );

      // Generate action plan
      const actionPlan = this.generateActionPlan(healthScore);
      const nextSteps = this.generateNextSteps(healthScore);

      const report: ComprehensiveReport = {
        healthScore,
        webVitalsReport: webVitalsReport.status === 'fulfilled' ? webVitalsReport.value : undefined,
        indexingReport: indexingReport.status === 'fulfilled' ? indexingReport.value : undefined,
        urlOptimizationReport,
        actionPlan,
        nextSteps
      };

      // Store the report
      localStorage.setItem('seo-comprehensive-report', JSON.stringify(report));
      
      console.log('✅ Comprehensive SEO report generated:', report);
      return report;

    } catch (error) {
      console.error('❌ Error generating comprehensive report:', error);
      throw error;
    }
  }

  private async getIndexingReport(): Promise<IndexingReport | null> {
    try {
      // Try to get stored report first
      const stored = indexingMonitor.getStoredReport();
      if (stored && (Date.now() - stored.lastCheck) < 24 * 60 * 60 * 1000) {
        return stored;
      }

      // Generate new report if needed
      const sampleUrls = this.getSampleUrls();
      return await indexingMonitor.generateIndexingReport(sampleUrls);
    } catch (error) {
      console.warn('Could not generate indexing report:', error);
      return null;
    }
  }

  private getSampleUrls(): string[] {
    return [
      'https://dracarlachristoph.com/',
      'https://dracarlachristoph.com/blog',
      'https://dracarlachristoph.com/servicos',
      'https://dracarlachristoph.com/sobre',
      'https://dracarlachristoph.com/contato',
      'https://dracarlachristoph.com/implantes-dentarios',
      'https://dracarlachristoph.com/clareamento-dental',
      'https://dracarlachristoph.com/lentes-de-contato-dental-e-facetas-de-porcelana'
    ];
  }

  private calculateHealthScore(
    webVitals: WebVitalsReport | null,
    indexing: IndexingReport | null,
    urlOptimization: SitemapOptimizationReport
  ): SEOHealthScore {
    let performance = 50; // Default
    let indexingScore = 50; // Default
    let structure = urlOptimization.averageSeoScore;
    
    const recommendations: string[] = [];
    const criticalIssues: string[] = [];

    // Performance scoring
    if (webVitals) {
      const goodCount = Object.values(webVitals.scores).filter(score => score === 'good').length;
      const poorCount = Object.values(webVitals.scores).filter(score => score === 'poor').length;
      
      performance = Math.max(0, 100 - (poorCount * 30) - ((3 - goodCount) * 10));
      
      if (performance < 70) {
        criticalIssues.push('Poor Core Web Vitals performance');
        recommendations.push(...webVitals.recommendations);
      }
    }

    // Indexing scoring
    if (indexing) {
      indexingScore = Math.min(100, indexing.indexingRate + 20);
      
      if (indexingScore < 60) {
        criticalIssues.push('Low indexing rate detected');
        recommendations.push(...indexing.recommendations);
      }
    }

    // URL structure scoring
    if (structure < 80) {
      criticalIssues.push('URL structure needs optimization');
      recommendations.push(...urlOptimization.recommendations);
    }

    // Overall score calculation
    const overall = Math.round((performance * 0.4 + indexingScore * 0.4 + structure * 0.2));

    return {
      overall,
      indexing: Math.round(indexingScore),
      performance: Math.round(performance),
      structure: Math.round(structure),
      recommendations: [...new Set(recommendations)],
      criticalIssues: [...new Set(criticalIssues)],
      lastUpdated: Date.now()
    };
  }

  private generateActionPlan(healthScore: SEOHealthScore): string[] {
    const actions: string[] = [];

    // Critical actions based on overall score
    if (healthScore.overall < 50) {
      actions.push('🚨 URGENT: Comprehensive SEO audit required');
      actions.push('🔧 Fix critical Core Web Vitals issues immediately');
      actions.push('📋 Review and resubmit sitemap to search engines');
    } else if (healthScore.overall < 70) {
      actions.push('⚠️ Address performance bottlenecks');
      actions.push('🗺️ Optimize sitemap and URL structure');
    }

    // Performance-specific actions
    if (healthScore.performance < 70) {
      actions.push('🚀 Implement image optimization strategy');
      actions.push('⚡ Minimize JavaScript execution time');
      actions.push('🎯 Focus on LCP optimization');
    }

    // Indexing-specific actions
    if (healthScore.indexing < 70) {
      actions.push('🔍 Investigate crawling issues');
      actions.push('📤 Resubmit sitemap to Google Search Console');
      actions.push('🤖 Check robots.txt configuration');
    }

    // Structure-specific actions
    if (healthScore.structure < 80) {
      actions.push('🔗 Implement URL optimization');
      actions.push('📚 Review internal linking structure');
      actions.push('🏷️ Optimize meta tags and structured data');
    }

    return actions;
  }

  private generateNextSteps(healthScore: SEOHealthScore): string[] {
    const steps: string[] = [];

    // Immediate next steps (next 24-48 hours)
    steps.push('✅ Remove static sitemap.xml file (if exists)');
    steps.push('📋 Verify dynamic sitemap accessibility');
    steps.push('🔧 Implement server-side sitemap generation');

    // Short-term steps (next week)
    if (healthScore.performance < 80) {
      steps.push('🖼️ Implement WebP image optimization');
      steps.push('⚡ Set up resource preloading');
    }

    if (healthScore.indexing < 80) {
      steps.push('🔍 Monitor indexing progress daily');
      steps.push('📤 Submit top pages for indexing via URL Inspection Tool');
    }

    // Medium-term steps (next month)
    steps.push('📊 Set up weekly Core Web Vitals monitoring');
    steps.push('🔗 Implement comprehensive internal linking strategy');
    steps.push('📈 Monitor ranking improvements');

    // Long-term steps (ongoing)
    steps.push('🎯 Continuous performance optimization');
    steps.push('📝 Regular content updates and optimization');
    steps.push('🔄 Monthly SEO health checks');

    return steps;
  }

  public getStoredReport(): ComprehensiveReport | null {
    try {
      const stored = localStorage.getItem('seo-comprehensive-report');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  public generateOptimizationSummary(report: ComprehensiveReport): string {
    const { healthScore } = report;
    
    return `# SEO Optimization Summary
Generated: ${new Date().toISOString()}

## Overall Health Score: ${healthScore.overall}/100

### Component Scores:
- 🔍 Indexing: ${healthScore.indexing}/100
- 🚀 Performance: ${healthScore.performance}/100  
- 🏗️ Structure: ${healthScore.structure}/100

### Critical Issues (${healthScore.criticalIssues.length}):
${healthScore.criticalIssues.map(issue => `- ${issue}`).join('\n')}

### Immediate Action Plan:
${report.actionPlan.slice(0, 5).map(action => `- ${action}`).join('\n')}

### Next Steps:
${report.nextSteps.slice(0, 8).map(step => `- ${step}`).join('\n')}

---
This is an automated SEO health report. Monitor progress weekly.`;
  }
}

export const seoHealthOptimizer = new SEOHealthOptimizer();
export type { SEOHealthScore, ComprehensiveReport };