import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Play, AlertTriangle, CheckCircle } from 'lucide-react';
import { runComprehensiveSitemapDiagnostics, logComprehensiveDiagnosticSummary, type SitemapDiagnosticReport } from '@/utils/sitemapDiagnosticsEnhanced';

/**
 * Componente ON-DEMAND para diagnósticos SEO/Sitemap
 * Evita execução automática que causava 60+ chamadas ao Contentful
 */
export const SEODiagnosticsOnDemand = () => {
  const [report, setReport] = useState<SitemapDiagnosticReport | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostics = async () => {
    setIsRunning(true);
    try {
      console.log('🔍 Iniciando diagnósticos on-demand...');
      const diagnosticReport = await runComprehensiveSitemapDiagnostics();
      logComprehensiveDiagnosticSummary(diagnosticReport);
      setReport(diagnosticReport);
    } catch (error) {
      console.error('Erro nos diagnósticos:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <AlertTriangle className="w-4 h-4 text-red-500" />
    );
  };

  // Só renderiza em desenvolvimento ou se habilitado
  if (!import.meta.env.DEV && localStorage.getItem('enableSEODiagnostics') !== 'true') {
    return null;
  }

  return (
    <Card className="m-4 border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          Diagnósticos SEO/Sitemap
        </CardTitle>
        <CardDescription>
          Execute diagnósticos completos sob demanda (evita chamadas automáticas ao Contentful)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={runDiagnostics} 
          disabled={isRunning}
          className="w-full"
          variant="outline"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Executando diagnósticos...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Executar Diagnósticos
            </>
          )}
        </Button>

        {report && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                {getStatusIcon(report.contentfulConnection)}
                <span className="text-sm">Contentful: {report.contentfulConnection ? 'OK' : 'ERRO'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                {getStatusIcon(report.sitemapGeneration.success)}
                <span className="text-sm">Sitemap: {report.sitemapGeneration.success ? 'OK' : 'ERRO'}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-sm">
              <Badge variant="outline">
                Contentful: {report.blogPostCounts.contentful}
              </Badge>
              <Badge variant="outline">
                Local: {report.blogPostCounts.local}
              </Badge>
              <Badge variant="outline">
                URLs: {report.sitemapGeneration.urlCount}
              </Badge>
            </div>

            {report.recommendations.length > 0 && (
              <div className="text-xs text-muted-foreground">
                <strong>Recomendações:</strong> {report.recommendations.slice(0, 2).join(', ')}
                {report.recommendations.length > 2 && '...'}
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              Executado em: {new Date(report.timestamp).toLocaleString()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SEODiagnosticsOnDemand;