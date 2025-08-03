import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { runSitemapDiagnostics, DiagnosticReport } from '@/utils/sitemapDiagnostics';
import { optimizeForSearchEngines, getStoredSubmissionGuide, clearStoredSubmissionGuide } from '@/utils/searchEngineOptimizer';
import { generateSitemap } from '@/utils/sitemapGenerator';
import { refreshContentfulCache } from '@/utils/enhancedContentfulQueries';
import { RefreshCw, AlertCircle, CheckCircle, ExternalLink, Download, Trash2 } from 'lucide-react';

const SEODashboardEnhanced: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<DiagnosticReport | null>(null);
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [sitemapContent, setSitemapContent] = useState<string>('');
  const [urlCount, setUrlCount] = useState<number>(0);
  const [submissionGuide, setSubmissionGuide] = useState<{ guide: string; timestamp: string } | null>(null);

  // Load stored submission guide on component mount
  useEffect(() => {
    const guide = getStoredSubmissionGuide();
    setSubmissionGuide(guide);
  }, []);

  const runDiagnostics = async () => {
    setIsRunningDiagnostics(true);
    try {
      console.log('🔍 Running comprehensive SEO diagnostics...');
      const report = await runSitemapDiagnostics();
      setDiagnostics(report);
      console.log('✅ Diagnostics complete');
    } catch (error) {
      console.error('❌ Diagnostics failed:', error);
    } finally {
      setIsRunningDiagnostics(false);
    }
  };

  const regenerateSitemap = async () => {
    try {
      console.log('🔄 Regenerating sitemap...');
      refreshContentfulCache(); // Clear cache first
      const sitemap = await generateSitemap();
      setSitemapContent(sitemap);
      
      // Count URLs
      const urlMatches = sitemap.match(/<url>/g);
      setUrlCount(urlMatches ? urlMatches.length : 0);
      
      console.log('✅ Sitemap regenerated');
    } catch (error) {
      console.error('❌ Sitemap regeneration failed:', error);
    }
  };

  const optimizeSearchEngines = async () => {
    setIsOptimizing(true);
    try {
      console.log('🚀 Optimizing for search engines...');
      const report = await optimizeForSearchEngines();
      console.log('✅ Search engine optimization complete:', report);
      
      // Refresh submission guide
      const guide = getStoredSubmissionGuide();
      setSubmissionGuide(guide);
    } catch (error) {
      console.error('❌ Search engine optimization failed:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const downloadSubmissionGuide = () => {
    if (!submissionGuide) return;
    
    const blob = new Blob([submissionGuide.guide], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seo-submission-guide.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearSubmissionGuide = () => {
    clearStoredSubmissionGuide();
    setSubmissionGuide(null);
  };

  const getStatusColor = (value: boolean | number) => {
    if (typeof value === 'boolean') {
      return value ? 'bg-green-500' : 'bg-red-500';
    }
    if (value > 50) return 'bg-green-500';
    if (value > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Enhanced SEO Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive SEO monitoring and optimization tools
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={runDiagnostics} 
            disabled={isRunningDiagnostics}
            variant="outline"
          >
            {isRunningDiagnostics ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <AlertCircle className="mr-2 h-4 w-4" />
                Run Diagnostics
              </>
            )}
          </Button>
          <Button 
            onClick={optimizeSearchEngines} 
            disabled={isOptimizing}
          >
            {isOptimizing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              '🚀 Optimize SEO'
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sitemap URLs</CardTitle>
                <Badge className={getStatusColor(urlCount)}>
                  {urlCount > 50 ? '✅' : urlCount > 20 ? '⚠️' : '❌'}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{urlCount}</div>
                <p className="text-xs text-muted-foreground">
                  {urlCount > 50 ? 'Comprehensive' : urlCount > 20 ? 'Partial' : 'Limited'} coverage
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contentful Status</CardTitle>
                <Badge className={getStatusColor(diagnostics?.contentfulConnection ?? false)}>
                  {diagnostics?.contentfulConnection ? '✅' : '❌'}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {diagnostics?.contentfulConnection ? 'Connected' : 'Disconnected'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Blog posts: {diagnostics?.blogPostCount.contentful ?? 0}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cache Health</CardTitle>
                <Badge className={getStatusColor(diagnostics?.cacheStatus.isHealthy ?? false)}>
                  {diagnostics?.cacheStatus.isHealthy ? '✅' : '❌'}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {diagnostics?.cacheStatus.entries ?? 0}
                </div>
                <p className="text-xs text-muted-foreground">Cached entries</p>
              </CardContent>
            </Card>
          </div>

          {diagnostics?.recommendations && diagnostics.recommendations.length > 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
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
        </TabsContent>

        <TabsContent value="diagnostics" className="space-y-4">
          {diagnostics ? (
            <Card>
              <CardHeader>
                <CardTitle>Diagnostic Report</CardTitle>
                <CardDescription>
                  Generated on {new Date(diagnostics.timestamp).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Contentful Connection</h4>
                    <div className="flex items-center gap-2">
                      {diagnostics.contentfulConnection ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span>{diagnostics.contentfulConnection ? 'Connected' : 'Failed'}</span>
                    </div>
                    {diagnostics.contentfulErrors.length > 0 && (
                      <div className="mt-2 text-sm text-red-600">
                        {diagnostics.contentfulErrors.map((error, index) => (
                          <div key={index}>• {error}</div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Blog Post Counts</h4>
                    <div className="space-y-1 text-sm">
                      <div>Contentful: {diagnostics.blogPostCount.contentful}</div>
                      <div>Local: {diagnostics.blogPostCount.local}</div>
                      <div>Cached: {diagnostics.blogPostCount.cached}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Sitemap Generation</h4>
                    <div className="flex items-center gap-2">
                      {diagnostics.sitemapGeneration.success ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span>{diagnostics.sitemapGeneration.urlCount} URLs</span>
                    </div>
                    {diagnostics.sitemapGeneration.errors.length > 0 && (
                      <div className="mt-2 text-sm text-red-600">
                        {diagnostics.sitemapGeneration.errors.map((error, index) => (
                          <div key={index}>• {error}</div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Cache Status</h4>
                    <div className="flex items-center gap-2">
                      {diagnostics.cacheStatus.isHealthy ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span>{diagnostics.cacheStatus.entries} entries</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No diagnostics data available</p>
                  <Button onClick={runDiagnostics} className="mt-4">
                    Run Diagnostics
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sitemap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sitemap Management</CardTitle>
              <CardDescription>
                Current sitemap contains {urlCount} URLs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={regenerateSitemap} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate Sitemap
                </Button>
                <Button 
                  onClick={() => window.open('/sitemap.xml', '_blank')} 
                  variant="outline"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Sitemap
                </Button>
              </div>
              
              {sitemapContent && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Sitemap Preview</h4>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-96">
                    {sitemapContent.substring(0, 2000)}
                    {sitemapContent.length > 2000 && '...'}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Search Console Submission Guide</CardTitle>
              <CardDescription>
                Manual submission instructions for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {submissionGuide ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Generated: {new Date(submissionGuide.timestamp).toLocaleString()}
                    </span>
                    <div className="flex gap-2">
                      <Button onClick={downloadSubmissionGuide} variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button onClick={clearSubmissionGuide} variant="outline" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear
                      </Button>
                    </div>
                  </div>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-96 whitespace-pre-wrap">
                    {submissionGuide.guide}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No submission guide available</p>
                  <Button onClick={optimizeSearchEngines}>
                    Generate Submission Guide
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEODashboardEnhanced;