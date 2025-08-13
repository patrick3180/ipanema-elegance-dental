import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  const startTime = Date.now();
  
  try {
    console.log('🗺️ [NETLIFY FUNCTION] Starting sitemap generation...');
    
    // Run enhanced diagnostics first
    const { runComprehensiveSitemapDiagnostics, logComprehensiveDiagnosticSummary } = await import('../../src/utils/sitemapDiagnosticsEnhanced');
    
    const diagnosticReport = await runComprehensiveSitemapDiagnostics();
    logComprehensiveDiagnosticSummary(diagnosticReport);
    
    if (!diagnosticReport.sitemapGeneration.success) {
      throw new Error(`Sitemap generation diagnostics failed: ${diagnosticReport.sitemapGeneration.errors.join(', ')}`);
    }
    
    // Dynamic import to avoid bundling issues
    const { generateOptimizedSitemap } = await import('../../src/utils/sitemapGeneratorOptimized');
    
    console.log('🗺️ [NETLIFY FUNCTION] Generating optimized sitemap...');
    const sitemap = await generateOptimizedSitemap();
    
    const urlCount = (sitemap.match(/<url>/g) || []).length;
    const processingTime = Date.now() - startTime;
    
    console.log(`✅ [NETLIFY FUNCTION] Sitemap generated successfully: ${urlCount} URLs in ${processingTime}ms`);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=900, s-maxage=900', // Reduced to 15 minutes
        'X-Robots-Tag': 'noindex',
        'Access-Control-Allow-Origin': '*',
        'Vary': 'Accept-Encoding',
        'X-Sitemap-Urls': urlCount.toString(),
        'X-Generation-Time': processingTime.toString()
      },
      body: sitemap
    };
  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('❌ [NETLIFY FUNCTION] Error in sitemap function:', error);
    
    // Return enhanced fallback sitemap with more URLs
    const today = new Date().toISOString().split('T')[0];
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dracarlachristoph.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dracarlachristoph.com/sobre</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://dracarlachristoph.com/servicos</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://dracarlachristoph.com/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dracarlachristoph.com/contato</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dracarlachristoph.com/lentes-de-contato-dental-e-facetas-de-porcelana</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dracarlachristoph.com/clareamento-dental</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dracarlachristoph.com/implantes-dentarios</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=300', // Shorter cache for fallback
        'X-Sitemap-Error': 'true',
        'X-Generation-Time': processingTime.toString()
      },
      body: fallbackSitemap
    };
  }
};

export { handler };