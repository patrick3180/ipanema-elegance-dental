
import React, { useState } from 'react';
import { usePerformanceMetrics } from '@/hooks/usePerformanceMetrics';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Eye, EyeOff } from 'lucide-react';

const PerformanceMonitor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { metrics, isSupported, getVitalRating, getOverallScore } = usePerformanceMetrics();

  // Only show in development or when specifically enabled
  const isDevelopment = import.meta.env.DEV;
  if (!isDevelopment && !isVisible) return null;

  if (!isSupported) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-80">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-600">
              Performance monitoring not supported in this browser
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatMetric = (value: number | null, unit = 'ms') => {
    if (value === null) return 'Measuring...';
    return `${Math.round(value)}${unit}`;
  };

  const getMetricIcon = (rating: string) => {
    switch (rating) {
      case 'good': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'needs-improvement': return <Minus className="w-4 h-4 text-yellow-500" />;
      case 'poor': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return null;
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

  const overallScore = getOverallScore();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isVisible ? (
        <Button
          onClick={() => setIsVisible(true)}
          size="sm"
          variant="outline"
          className="bg-white shadow-lg"
        >
          <Eye className="w-4 h-4 mr-2" />
          Performance
        </Button>
      ) : (
        <Card className="w-80 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Core Web Vitals</CardTitle>
              <Button
                onClick={() => setIsVisible(false)}
                size="sm"
                variant="ghost"
              >
                <EyeOff className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{overallScore}/100</span>
              <Progress value={overallScore} className="flex-1" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* LCP */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {metrics.lcp && getMetricIcon(getVitalRating('lcp', metrics.lcp))}
                <span className="text-sm font-medium">LCP</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{formatMetric(metrics.lcp)}</span>
                {metrics.lcp && (
                  <Badge variant={getBadgeVariant(getVitalRating('lcp', metrics.lcp))}>
                    {getVitalRating('lcp', metrics.lcp)}
                  </Badge>
                )}
              </div>
            </div>

            {/* FID */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {metrics.fid && getMetricIcon(getVitalRating('fid', metrics.fid))}
                <span className="text-sm font-medium">FID</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{formatMetric(metrics.fid)}</span>
                {metrics.fid && (
                  <Badge variant={getBadgeVariant(getVitalRating('fid', metrics.fid))}>
                    {getVitalRating('fid', metrics.fid)}
                  </Badge>
                )}
              </div>
            </div>

            {/* CLS */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {metrics.cls !== null && getMetricIcon(getVitalRating('cls', metrics.cls))}
                <span className="text-sm font-medium">CLS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{formatMetric(metrics.cls, '')}</span>
                {metrics.cls !== null && (
                  <Badge variant={getBadgeVariant(getVitalRating('cls', metrics.cls))}>
                    {getVitalRating('cls', metrics.cls)}
                  </Badge>
                )}
              </div>
            </div>

            {/* Additional metrics */}
            <div className="text-xs text-gray-500 pt-2 border-t">
              <div className="flex justify-between">
                <span>FCP:</span>
                <span>{formatMetric(metrics.fcp)}</span>
              </div>
              <div className="flex justify-between">
                <span>TTFB:</span>
                <span>{formatMetric(metrics.ttfb)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PerformanceMonitor;
