interface PerformanceReport {
  score: number;
  metrics: {
    lcp: number | null;
    fid: number | null;
    cls: number | null;
    ttfb: number | null;
    fcp: number | null;
  };
  optimizations: {
    phase1Complete: boolean;
    cssOptimized: boolean;
    jsOptimized: boolean;
    compressionEnabled: boolean;
  };
  recommendations: string[];
}

export class PerformanceAnalyzer {
  private metrics: PerformanceReport['metrics'] = {
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    fcp: null
  };

  private optimizations: PerformanceReport['optimizations'] = {
    phase1Complete: false,
    cssOptimized: false,
    jsOptimized: false,
    compressionEnabled: false
  };

  async analyzePerformance(): Promise<PerformanceReport> {
    await this.collectMetrics();
    await this.checkOptimizations();
    
    const score = this.calculateScore();
    const recommendations = this.generateRecommendations();

    return {
      score,
      metrics: this.metrics,
      optimizations: this.optimizations,
      recommendations
    };
  }

  private async collectMetrics(): Promise<void> {
    // Collect Core Web Vitals
    if ('PerformanceObserver' in window) {
      // LCP
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // FID
      new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry: any) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
        });
      }).observe({ entryTypes: ['first-input'] });

      // CLS
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.metrics.cls = clsValue;
          }
        });
      }).observe({ entryTypes: ['layout-shift'] });

      // FCP
      new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
          }
        });
      }).observe({ entryTypes: ['paint'] });
    }

    // TTFB from Navigation Timing API (modern approach)
    if ('getEntriesByType' in performance) {
      const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navEntries.length > 0) {
        const navEntry = navEntries[0];
        this.metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
      }
    } else if ('timing' in performance && (performance as any).timing) {
      // Fallback for older browsers
      const timing = (performance as any).timing;
      this.metrics.ttfb = timing.responseStart - timing.navigationStart;
    }
  }

  private async checkOptimizations(): Promise<void> {
    // Check CSS optimization
    const stylesheets = document.querySelectorAll('style[data-critical-css]');
    this.optimizations.cssOptimized = stylesheets.length > 0;

    // Check JS optimization (defer/async scripts)
    const scripts = document.querySelectorAll('script[defer], script[async]');
    const totalScripts = document.querySelectorAll('script[src]').length;
    this.optimizations.jsOptimized = scripts.length > totalScripts * 0.5;

    // Check compression via headers
    try {
      const response = await fetch(window.location.href, { method: 'HEAD' });
      const contentEncoding = response.headers.get('content-encoding');
      this.optimizations.compressionEnabled = !!contentEncoding;
    } catch (error) {
      this.optimizations.compressionEnabled = false;
    }

    // Check Phase 1 completion
    this.optimizations.phase1Complete = 
      this.optimizations.cssOptimized && 
      this.optimizations.jsOptimized;
  }

  private calculateScore(): number {
    let score = 0;

    // Core Web Vitals scoring (60 points)
    if (this.metrics.lcp !== null) {
      score += this.metrics.lcp <= 2500 ? 20 : this.metrics.lcp <= 4000 ? 10 : 0;
    }
    if (this.metrics.fid !== null) {
      score += this.metrics.fid <= 100 ? 20 : this.metrics.fid <= 300 ? 10 : 0;
    }
    if (this.metrics.cls !== null) {
      score += this.metrics.cls <= 0.1 ? 20 : this.metrics.cls <= 0.25 ? 10 : 0;
    }

    // Additional metrics (20 points)
    if (this.metrics.fcp !== null) {
      score += this.metrics.fcp <= 1800 ? 10 : this.metrics.fcp <= 3000 ? 5 : 0;
    }
    if (this.metrics.ttfb !== null) {
      score += this.metrics.ttfb <= 200 ? 10 : this.metrics.ttfb <= 500 ? 5 : 0;
    }

    // Optimizations bonus (20 points)
    if (this.optimizations.cssOptimized) score += 5;
    if (this.optimizations.jsOptimized) score += 5;
    if (this.optimizations.compressionEnabled) score += 5;
    if (this.optimizations.phase1Complete) score += 5;

    return Math.min(score, 100);
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];

    if (this.metrics.lcp && this.metrics.lcp > 2500) {
      recommendations.push('Optimize LCP: Compress images, enable CDN, optimize server response time');
    }

    if (this.metrics.fid && this.metrics.fid > 100) {
      recommendations.push('Reduce FID: Split JavaScript bundles, defer non-critical scripts');
    }

    if (this.metrics.cls && this.metrics.cls > 0.1) {
      recommendations.push('Improve CLS: Set image dimensions, avoid dynamic content insertion');
    }

    if (this.metrics.fcp && this.metrics.fcp > 1800) {
      recommendations.push('Speed up FCP: Inline critical CSS, preload key resources');
    }

    if (this.metrics.ttfb && this.metrics.ttfb > 200) {
      recommendations.push('Optimize TTFB: Improve server performance, use CDN');
    }

    if (!this.optimizations.cssOptimized) {
      recommendations.push('Enable CSS optimization: Inline critical CSS, load non-critical CSS async');
    }

    if (!this.optimizations.jsOptimized) {
      recommendations.push('Optimize JavaScript: Enable defer/async loading, code splitting');
    }

    if (!this.optimizations.compressionEnabled) {
      recommendations.push('Enable compression: Configure gzip/brotli on server');
    }

    return recommendations;
  }

  // Public method to get current score quickly
  getCurrentScore(): number {
    return this.calculateScore();
  }

  // Method to track Phase 1 implementation progress
  getPhase1Progress(): { completed: boolean; progress: number } {
    const checks = [
      this.optimizations.cssOptimized,
      this.optimizations.jsOptimized,
      this.optimizations.compressionEnabled
    ];
    
    const completed = checks.filter(Boolean).length;
    const progress = (completed / checks.length) * 100;
    
    return {
      completed: completed === checks.length,
      progress: Math.round(progress)
    };
  }
}

// Global instance
export const performanceAnalyzer = new PerformanceAnalyzer();