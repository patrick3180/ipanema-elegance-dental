import { useEffect, useState } from 'react';
import { performanceAnalyzer } from '@/utils/performanceAnalyzer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Phase1DashboardProps {
  showInProduction?: boolean;
}

export const Phase1Dashboard = ({ showInProduction = false }: Phase1DashboardProps) => {
  const [report, setReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Only show in development unless explicitly enabled for production
  if (import.meta.env.PROD && !showInProduction) {
    return null;
  }

  useEffect(() => {
    const analyzePerformance = async () => {
      try {
        const performanceReport = await performanceAnalyzer.analyzePerformance();
        setReport(performanceReport);
      } catch (error) {
        console.error('Performance analysis failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Delay analysis to allow page to settle
    const timer = setTimeout(analyzePerformance, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-80">
          <CardContent className="p-4">
            <div className="text-center">Analyzing performance...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!report) return null;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { variant: 'default' as const, text: 'Excellent' };
    if (score >= 70) return { variant: 'secondary' as const, text: 'Good' };
    return { variant: 'destructive' as const, text: 'Needs Work' };
  };

  const phase1Progress = performanceAnalyzer.getPhase1Progress();

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="shadow-lg border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            Performance Score
            <Badge {...getScoreBadge(report.score)}>
              {report.score}/100
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Overall Score */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Overall Performance</span>
              <span>{report.score}%</span>
            </div>
            <Progress 
              value={report.score} 
              className="h-2"
            />
          </div>

          {/* Phase 1 Progress */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Phase 1 Optimizations</span>
              <span>{phase1Progress.progress}%</span>
            </div>
            <Progress 
              value={phase1Progress.progress} 
              className="h-2"
            />
          </div>

          {/* Core Metrics */}
          <div className="space-y-1 text-xs">
            {report.metrics.lcp && (
              <div className="flex justify-between">
                <span>LCP:</span>
                <span className={report.metrics.lcp <= 2500 ? 'text-green-600' : 'text-red-600'}>
                  {Math.round(report.metrics.lcp)}ms
                </span>
              </div>
            )}
            {report.metrics.fid && (
              <div className="flex justify-between">
                <span>FID:</span>
                <span className={report.metrics.fid <= 100 ? 'text-green-600' : 'text-red-600'}>
                  {Math.round(report.metrics.fid)}ms
                </span>
              </div>
            )}
            {report.metrics.cls !== null && (
              <div className="flex justify-between">
                <span>CLS:</span>
                <span className={report.metrics.cls <= 0.1 ? 'text-green-600' : 'text-red-600'}>
                  {report.metrics.cls.toFixed(3)}
                </span>
              </div>
            )}
          </div>

          {/* Optimizations Status */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>CSS Optimized:</span>
              <Badge variant={report.optimizations.cssOptimized ? 'default' : 'secondary'} className="text-xs">
                {report.optimizations.cssOptimized ? '✓' : '✗'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>JS Optimized:</span>
              <Badge variant={report.optimizations.jsOptimized ? 'default' : 'secondary'} className="text-xs">
                {report.optimizations.jsOptimized ? '✓' : '✗'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Compression:</span>
              <Badge variant={report.optimizations.compressionEnabled ? 'default' : 'secondary'} className="text-xs">
                {report.optimizations.compressionEnabled ? '✓' : '✗'}
              </Badge>
            </div>
          </div>

          {/* Top Recommendations */}
          {report.recommendations.length > 0 && (
            <div className="text-xs">
              <div className="font-medium mb-1">Top Recommendations:</div>
              <ul className="space-y-1">
                {report.recommendations.slice(0, 2).map((rec: string, index: number) => (
                  <li key={index} className="text-gray-600">
                    • {rec.substring(0, 50)}...
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};