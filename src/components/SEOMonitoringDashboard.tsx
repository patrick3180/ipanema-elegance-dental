import React, { useEffect, useState } from 'react';
import { error404Handler } from '@/utils/404ErrorHandler';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface SEOMetrics {
  sitemapUrlCount: number;
  error404Count: number;
  lastSitemapUpdate: string | null;
  frequentErrors: Array<{
    url: string;
    count: number;
    timestamp: number;
  }>;
}

export const SEOMonitoringDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SEOMetrics>({
    sitemapUrlCount: 0,
    error404Count: 0,
    lastSitemapUpdate: null,
    frequentErrors: []
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMetrics = () => {
      const errorSummary = error404Handler.getErrorSummary();
      const lastUpdate = localStorage.getItem('sitemap:last-update');
      
      setMetrics({
        sitemapUrlCount: parseInt(localStorage.getItem('sitemap:url-count') || '0'),
        error404Count: errorSummary.totalOccurrences,
        lastSitemapUpdate: lastUpdate,
        frequentErrors: errorSummary.frequentErrors
      });
    };

    // Update metrics initially
    updateMetrics();

    // Update metrics every 30 seconds
    const interval = setInterval(updateMetrics, 30000);

    // Show dashboard only in development or when there are issues
    const shouldShow = import.meta.env.DEV || 
                      metrics.error404Count > 5 || 
                      metrics.frequentErrors.length > 0;
    setIsVisible(shouldShow);

    return () => clearInterval(interval);
  }, [metrics.error404Count, metrics.frequentErrors.length]);

  const clearErrors = () => {
    error404Handler.clear();
    setMetrics(prev => ({
      ...prev,
      error404Count: 0,
      frequentErrors: []
    }));
  };

  const generateSubmissionGuide = () => {
    const guide = `
# SEO Submission Guide for Dra. Carla Christoph

## Current Status
- Sitemap URLs: ${metrics.sitemapUrlCount}
- 404 Errors: ${metrics.error404Count}
- Last Sitemap Update: ${metrics.lastSitemapUpdate || 'Never'}

## Google Search Console
1. Visit https://search.google.com/search-console
2. Submit sitemap: https://dracarlachristoph.com/sitemap.xml
3. Request indexing for important pages

## Bing Webmaster Tools
1. Visit https://www.bing.com/webmasters
2. Submit sitemap: https://dracarlachristoph.com/sitemap.xml
3. Use URL inspection tool for important pages

## Frequent 404 Errors to Fix:
${metrics.frequentErrors.map(error => `- ${error.url} (${error.count} times)`).join('\n')}

## Next Steps
1. Fix 404 errors by adding redirects
2. Monitor indexing status in search consoles
3. Check sitemap validation regularly
`;

    const blob = new Blob([guide], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seo-submission-guide.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">SEO Monitor</CardTitle>
          <CardDescription className="text-xs">
            Live SEO performance tracking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Sitemap URLs:</span>
            <Badge variant="secondary" className="text-xs">
              {metrics.sitemapUrlCount}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">404 Errors:</span>
            <Badge 
              variant={metrics.error404Count > 10 ? "destructive" : metrics.error404Count > 5 ? "default" : "secondary"}
              className="text-xs"
            >
              {metrics.error404Count}
            </Badge>
          </div>

          {metrics.frequentErrors.length > 0 && (
            <Alert className="py-2">
              <AlertDescription className="text-xs">
                <strong>Frequent 404s:</strong>
                <ul className="mt-1 space-y-0.5">
                  {metrics.frequentErrors.slice(0, 3).map((error, index) => (
                    <li key={index} className="truncate">
                      {error.url} ({error.count}×)
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={generateSubmissionGuide}
              className="text-xs flex-1"
            >
              Export Guide
            </Button>
            {metrics.error404Count > 0 && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={clearErrors}
                className="text-xs"
              >
                Clear
              </Button>
            )}
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Last update: {metrics.lastSitemapUpdate ? 
              new Date(metrics.lastSitemapUpdate).toLocaleTimeString() : 
              'Never'
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOMonitoringDashboard;