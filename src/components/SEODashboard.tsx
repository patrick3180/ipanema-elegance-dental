import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { seoOptimizer } from '@/utils/seoOptimizer';
import { sitemapValidator } from '@/utils/sitemapValidator';

const SEODashboard = () => {
  const [healthReport, setHealthReport] = useState<any>(null);
  const [sitemapHealth, setSitemapHealth] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [health, sitemap, problematicUrls] = await Promise.all([
        Promise.resolve(seoOptimizer.getHealthReport()),
        sitemapValidator.generateHealthReport(),
        Promise.resolve(seoOptimizer.analyzeProblematicUrls())
      ]);
      
      setHealthReport(health);
      setSitemapHealth(sitemap);
      setAnalysis(problematicUrls);
    } catch (error) {
      console.error('Error loading SEO data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-yellow-500';
    if (score >= 70) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'excellent': return 'default';
      case 'good': return 'secondary';
      case 'fair': return 'outline';
      case 'poor': return 'destructive';
      case 'critical': return 'destructive';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">SEO Dashboard</h1>
        <Button onClick={refreshData} disabled={loading}>
          Atualizar Dados
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">SEO Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getScoreColor(healthReport?.score || 0)}`}></div>
              <span className="text-2xl font-bold">{healthReport?.score || 0}/100</span>
              <Badge variant={getStatusVariant(healthReport?.status || '')}>
                {healthReport?.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sitemap Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                sitemapHealth?.overall === 'healthy' ? 'bg-green-500' : 
                sitemapHealth?.overall === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className="text-2xl font-bold">{sitemapHealth?.validation?.stats?.totalUrls || 0}</span>
              <span className="text-sm text-gray-500">URLs</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">{sitemapHealth?.validation?.stats?.blogUrls || 0}</span>
              <span className="text-sm text-gray-500">Indexados</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="issues">Problemas</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Status Geral</CardTitle>
                <CardDescription>Resumo da saúde do SEO</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Score SEO:</span>
                  <span className="font-semibold">{healthReport?.score}/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge variant={getStatusVariant(healthReport?.status || '')}>
                    {healthReport?.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Última atualização:</span>
                  <span className="text-sm text-gray-500">
                    {healthReport?.lastUpdate ? new Date(healthReport.lastUpdate).toLocaleString('pt-BR') : 'N/A'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas do Sitemap</CardTitle>
                <CardDescription>Detalhes do sitemap atual</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Total de URLs:</span>
                  <span className="font-semibold">{sitemapHealth?.validation?.stats?.totalUrls || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Posts do Blog:</span>
                  <span className="font-semibold">{sitemapHealth?.validation?.stats?.blogUrls || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Páginas de Serviço:</span>
                  <span className="font-semibold">{sitemapHealth?.validation?.stats?.serviceUrls || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Páginas Estáticas:</span>
                  <span className="font-semibold">{sitemapHealth?.validation?.stats?.staticUrls || 0}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          {healthReport?.issues?.length > 0 ? (
            <div className="space-y-2">
              {healthReport.issues.map((issue: string, index: number) => (
                <Alert key={index}>
                  <AlertDescription>{issue}</AlertDescription>
                </Alert>
              ))}
            </div>
          ) : (
            <Alert>
              <AlertDescription>Nenhum problema crítico encontrado! 🎉</AlertDescription>
            </Alert>
          )}

          {analysis?.topErrors?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>URLs Problemáticas</CardTitle>
                <CardDescription>URLs com maior frequência de erros</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.topErrors.slice(0, 10).map((error: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-2 border rounded">
                      <span className="font-mono text-sm">{error.path}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{error.type}</Badge>
                        <span className="text-sm font-semibold">{error.count}x</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sitemap" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Validação do Sitemap</CardTitle>
                <CardDescription>
                  Status: {sitemapHealth?.validation?.isValid ? '✅ Válido' : '❌ Inválido'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sitemapHealth?.validation?.errors?.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-red-600">Erros:</h4>
                    {sitemapHealth.validation.errors.map((error: string, index: number) => (
                      <p key={index} className="text-sm text-red-600">• {error}</p>
                    ))}
                  </div>
                )}
                
                {sitemapHealth?.validation?.warnings?.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <h4 className="font-semibold text-yellow-600">Avisos:</h4>
                    {sitemapHealth.validation.warnings.map((warning: string, index: number) => (
                      <p key={index} className="text-sm text-yellow-600">• {warning}</p>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acessibilidade</CardTitle>
                <CardDescription>
                  Status: {sitemapHealth?.accessibility?.accessible ? '✅ Acessível' : '❌ Inacessível'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sitemapHealth?.accessibility && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Status HTTP:</span>
                      <span className="font-semibold">{sitemapHealth.accessibility.statusCode || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tamanho:</span>
                      <span className="font-semibold">
                        {sitemapHealth.accessibility.size ? `${(sitemapHealth.accessibility.size / 1024).toFixed(1)} KB` : 'N/A'}
                      </span>
                    </div>
                    {sitemapHealth.accessibility.error && (
                      <p className="text-sm text-red-600">Erro: {sitemapHealth.accessibility.error}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recomendações SEO</CardTitle>
              <CardDescription>Sugestões para melhorar o SEO do site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {healthReport?.suggestions?.map((suggestion: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">💡</span>
                    <span className="text-sm">{suggestion}</span>
                  </div>
                ))}
                
                {analysis?.recommendations?.map((recommendation: string, index: number) => (
                  <div key={`analysis-${index}`} className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">🔧</span>
                    <span className="text-sm">{recommendation}</span>
                  </div>
                ))}
                
                {sitemapHealth?.recommendations?.map((recommendation: string, index: number) => (
                  <div key={`sitemap-${index}`} className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-1">📋</span>
                    <span className="text-sm">{recommendation}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEODashboard;