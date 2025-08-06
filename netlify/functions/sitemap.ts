import { Handler } from '@netlify/functions';

// Static sitemap generation - independent of Contentful
const generateStaticSitemap = (): string => {
  const today = new Date().toISOString().split('T')[0];
  
  // Core pages that always exist
  const staticPages = [
    { loc: 'https://dracarlachristoph.com/', priority: '1.0', changefreq: 'weekly' },
    { loc: 'https://dracarlachristoph.com/blog', priority: '0.8', changefreq: 'daily' },
    { loc: 'https://dracarlachristoph.com/about', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://dracarlachristoph.com/services', priority: '0.8', changefreq: 'weekly' },
    { loc: 'https://dracarlachristoph.com/contact', priority: '0.6', changefreq: 'monthly' },
    
    // Service pages
    { loc: 'https://dracarlachristoph.com/servicos/clareamento-dental', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://dracarlachristoph.com/servicos/implantes-dentarios', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://dracarlachristoph.com/servicos/lentes-e-facetas', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://dracarlachristoph.com/servicos/protese-dentaria', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://dracarlachristoph.com/servicos/restauracoes-esteticas', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://dracarlachristoph.com/servicos/saude-da-gengiva', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://dracarlachristoph.com/servicos/tratamento-de-canal', priority: '0.7', changefreq: 'monthly' },
    { loc: 'https://dracarlachristoph.com/servicos/clinica-geral-prevencao', priority: '0.7', changefreq: 'monthly' },
    
    // Legal pages
    { loc: 'https://dracarlachristoph.com/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { loc: 'https://dracarlachristoph.com/terms-of-use', priority: '0.3', changefreq: 'yearly' }
  ];

  const urlsXml = staticPages.map(page => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
};

const handler: Handler = async (event, context) => {
  try {
    console.log('🗺️ Generating static sitemap via Netlify function...');
    const sitemap = generateStaticSitemap();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Robots-Tag': 'noindex',
        'Access-Control-Allow-Origin': '*',
        'Vary': 'Accept-Encoding'
      },
      body: sitemap
    };
  } catch (error) {
    console.error('❌ Error in sitemap function:', error);
    
    // Ultra-simple fallback
    const today = new Date().toISOString().split('T')[0];
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dracarlachristoph.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=300'
      },
      body: fallbackSitemap
    };
  }
};

export { handler };