import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  RefreshCw, 
  Activity, 
  Database, 
  Map, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Download,
  Trash2
} from 'lucide-react';
import { runSitemapDiagnostics, type DiagnosticReport } from '@/utils/sitemapDiagnostics';
import { generateOptimizedSitemap, getSitemapUrlCount } from '@/utils/sitemapGeneratorOptimized';
import { optimizeForSearchEngines } from '@/utils/searchEngineOptimizer';
import SEODashboardError from '@/components/SEODashboardError';
import { useToast } from '@/hooks/use-toast';

const SEODashboardOptimized: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<DiagnosticReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sitemapContent, setSitemapContent] = useState<string>('');
  const [urlCount, setUrlCount] = useState<number>(0);
  const [submissionGuide, setSubmissionGuide] = useState<string>('');
  
  const { toast } = useToast();

  // Load stored submission guide on mount
  useEffect(() => {
    const stored = localStorage.getItem('seo-submission-guide');
    if (stored) {
      setSubmissionGuide(stored);
    }
  }, []);

  const runDiagnostics = useCallback(async () => {
    if (isLoading) return; // Prevent multiple concurrent requests
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🚀 Starting diagnostics from dashboard...');
      const report = await runSitemapDiagnostics();
      
      setDiagnostics(report);
      setUrlCount(report.sitemapGeneration.urlCount);
      
      toast({
        title: "Diagnostics Complete",
        description: `Found ${report.sitemapGeneration.urlCount} URLs in sitemap`,
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('❌ Dashboard diagnostics failed:', err);
      
      toast({
        title: "Diagnostics Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, toast]);

  const regenerateSitemap = useCallback(async () => {
    if (isRegenerating) return;
    
    setIsRegenerating(true);
    setError(null);
    
    try {
      console.log('🔄 Regenerating sitemap...');
      const newSitemap = await generateOptimizedSitemap();
      const newCount = getSitemapUrlCount();
      
      setSitemapContent(newSitemap);
      setUrlCount(newCount);
      
      toast({
        title: "Sitemap Regenerated",
        description: `Generated sitemap with ${newCount} URLs`,
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to regenerate sitemap';
      setError(errorMessage);
      
      toast({
        title: "Regeneration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsRegenerating(false);
    }
  }, [isRegenerating, toast]);

  const optimizeSearchEngines = useCallback(async () => {
    if (isOptimizing) return;
    
    setIsOptimizing(true);
    
    try {
      console.log('⚡ Optimizing for search engines...');
      await optimizeForSearchEngines();
      
      toast({
        title: "Optimization Complete",
        description: "Search engine optimization completed successfully",
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Optimization failed';
      
      toast({
        title: "Optimization Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  }, [isOptimizing, toast]);

  const downloadSubmissionGuide = useCallback(() => {
    const guide = `SEO Sitemap Submission Guide - ${new Date().toLocaleDateString()}

This guide contains instructions for submitting your sitemap to search engines.

1. Google Search Console:
   - Visit: https://search.google.com/search-console
   - Add your website property
   - Navigate to Sitemaps section
   - Submit: https://dracarlachristoph.com/sitemap.xml

2. Bing Webmaster Tools:
   - Visit: https://www.bing.com/webmasters
   - Add your website
   - Go to Sitemaps section
   - Submit: https://dracarlachristoph.com/sitemap.xml

Generated on: ${new Date().toISOString()}
Sitemap URL Count: ${urlCount}
`;
    
    const blob = new Blob([guide], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seo-submission-guide.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    setSubmissionGuide(guide);
    localStorage.setItem('seo-submission-guide', guide);
  }, [urlCount]);

  const clearSubmissionGuide = useCallback(() => {
    setSubmissionGuide('');
    localStorage.removeItem('seo-submission-guide');
  }, []);

  const getStatusColor = (status: boolean) => {
    return status ? 'default' : 'destructive';
  };

  if (error && !diagnostics) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <SEODashboardError 
            error={error} 
            onRetry={runDiagnostics}
            title="SEO Dashboard Error"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">SEO Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and optimize your website's SEO performance
            </p>
          </div>
          <Button 
            onClick={runDiagnostics}
            disabled={isLoading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Running...' : 'Run Diagnostics'}
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sitemap URLs</CardTitle>
              <Map className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-7 w-16" />
              ) : (
                <div className="text-2xl font-bold">{urlCount}</div>
              )}
              <p className="text-xs text-muted-foreground">
                Total URLs in sitemap
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contentful Status</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                <Badge variant={getStatusColor(diagnostics?.contentfulConnection || false)}>
                  {diagnostics?.contentfulConnection ? (
                    <><CheckCircle className="h-3 w-3 mr-1" /> Connected</>
                  ) : (
                    <><XCircle className="h-3 w-3 mr-1" /> Disconnected</>
                  )}
                </Badge>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Blog posts: {diagnostics?.blogPostCount.contentful || 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cache Health</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                <Badge variant={getStatusColor(diagnostics?.cacheStatus.isHealthy || false)}>
                  {diagnostics?.cacheStatus.isHealthy ? (
                    <><CheckCircle className="h-3 w-3 mr-1" /> Healthy</>
                  ) : (
                    <><AlertTriangle className="h-3 w-3 mr-1" /> Issues</>
                  )}
                </Badge>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Entries: {diagnostics?.cacheStatus.entries || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        {diagnostics?.recommendations && diagnostics.recommendations.length > 0 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Recommendations:</strong>
              <ul className="mt-2 space-y-1">
                {diagnostics.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm">• {rec}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
            <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={optimizeSearchEngines}
                    disabled={isOptimizing}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    {isOptimizing ? 'Optimizing...' : 'Optimize for Search Engines'}
                  </Button>
                  
                  <Button 
                    onClick={regenerateSitemap}
                    disabled={isRegenerating}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
                    {isRegenerating ? 'Regenerating...' : 'Regenerate Sitemap'}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ) : diagnostics ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Last check:</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(diagnostics.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Sitemap generation:</span>
                        <Badge variant={getStatusColor(diagnostics.sitemapGeneration.success)}>
                          {diagnostics.sitemapGeneration.success ? 'Success' : 'Failed'}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Cache system:</span>
                        <Badge variant={getStatusColor(diagnostics.cacheStatus.isHealthy)}>
                          {diagnostics.cacheStatus.isHealthy ? 'Healthy' : 'Issues'}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Run diagnostics to see system status
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="diagnostics" className="space-y-6">
            {/* ... keep existing diagnostic details ... */}
            {/* Diagnostic details from original component */}
            {diagnostics && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contentful Connection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Status:</span>
                        <Badge variant={getStatusColor(diagnostics.contentfulConnection)}>
                          {diagnostics.contentfulConnection ? 'Connected' : 'Failed'}
                        </Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>Contentful Posts: {diagnostics.blogPostCount.contentful}</div>
                        <div>Local Posts: {diagnostics.blogPostCount.local}</div>
                        <div>Cached Posts: {diagnostics.blogPostCount.cached}</div>
                      </div>
                      {diagnostics.contentfulErrors.length > 0 && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            Errors: {diagnostics.contentfulErrors.join(', ')}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sitemap Generation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Status:</span>
                        <Badge variant={getStatusColor(diagnostics.sitemapGeneration.success)}>
                          {diagnostics.sitemapGeneration.success ? 'Success' : 'Failed'}
                        </Badge>
                      </div>
                      <div className="text-sm">
                        URL Count: {diagnostics.sitemapGeneration.urlCount}
                      </div>
                      {diagnostics.sitemapGeneration.errors.length > 0 && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            Errors: {diagnostics.sitemapGeneration.errors.join(', ')}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sitemap" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Sitemap Management</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    onClick={regenerateSitemap}
                    disabled={isRegenerating}
                    variant="outline"
                    size="sm"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
                    Regenerate
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Current sitemap contains {urlCount} URLs
                  </div>
                  
                  {sitemapContent && (
                    <div className="bg-muted p-4 rounded-md">
                      <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                        {sitemapContent.slice(0, 1000)}
                        {sitemapContent.length > 1000 && '...\n[truncated]'}
                      </pre>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Search Console Submission Guide</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    onClick={downloadSubmissionGuide}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Generate Guide
                  </Button>
                  {submissionGuide && (
                    <Button 
                      onClick={clearSubmissionGuide}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {submissionGuide ? (
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-sm whitespace-pre-wrap">{submissionGuide}</pre>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Click "Generate Guide" to create a submission guide for search engines.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SEODashboardOptimized;
