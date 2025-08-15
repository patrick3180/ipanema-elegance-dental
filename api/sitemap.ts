// api/sitemap.xml.ts
// Crie este arquivo na pasta 'api' na raiz do projeto (não em src)

import { VercelRequest, VercelResponse } from '@vercel/node';

// Importar os dados do blog do Contentful
async function getBlogPosts() {
  try {
    const spaceId = '4kfphecf7ofo';
    const accessToken = 'uGsF2P0x_CtPv5vDfpGcnWUqCLxlO8gqHnzo0AaODNs';
    
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?content_type=blogCarla&limit=100`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
    
    if (!response.ok) return [];
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configurar headers para XML
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  
  const baseUrl = 'https://dracarlachristoph.com';
  const today = new Date().toISOString().split('T')[0];
  
  // Páginas estáticas do site
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/sobre', priority: '0.9', changefreq: 'monthly' },
    { url: '/servicos', priority: '0.9', changefreq: 'monthly' },
    { url: '/diferenciais', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'daily' },
    { url: '/contato', priority: '0.8', changefreq: 'monthly' },
    
    // Páginas de serviços
    { url: '/lentes-de-contato-dental-e-facetas-de-porcelana', priority: '0.9', changefreq: 'monthly' },
    { url: '/clareamento-dental', priority: '0.9', changefreq: 'monthly' },
    { url: '/protese-dentaria', priority: '0.9', changefreq: 'monthly' },
    { url: '/implantes-dentarios', priority: '0.9', changefreq: 'monthly' },
    { url: '/clinica-geral-e-prevencao', priority: '0.8', changefreq: 'monthly' },
    { url: '/restauracoes-esteticas', priority: '0.8', changefreq: 'monthly' },
    { url: '/tratamento-de-canal', priority: '0.8', changefreq: 'monthly' },
    { url: '/saude-da-gengiva', priority: '0.8', changefreq: 'monthly' },
    
    // Landing pages
    { url: '/lp/clareamento-dental', priority: '0.9', changefreq: 'weekly' },
    { url: '/lp/consulta-inicial', priority: '0.9', changefreq: 'weekly' },
    { url: '/lp/limpeza-dental-ipanema', priority: '0.9', changefreq: 'weekly' },
    
    // Páginas legais
    { url: '/politica-de-privacidade', priority: '0.3', changefreq: 'yearly' },
    { url: '/termos-de-uso', priority: '0.3', changefreq: 'yearly' },
  ];
  
  // Buscar posts do blog dinamicamente
  const blogPosts = await getBlogPosts();
  
  // Gerar URLs dos posts do blog
  const blogUrls = blogPosts.map((post: any) => {
    const slug = post.fields?.slug || post.fields?.titulo?.toLowerCase().replace(/\s+/g, '-');
    const updatedAt = post.sys?.updatedAt ? new Date(post.sys.updatedAt).toISOString().split('T')[0] : today;
    
    return {
      url: `/blog/${slug}`,
      lastmod: updatedAt,
      priority: '0.7',
      changefreq: 'weekly'
    };
  });
  
  // Combinar todas as URLs
  const allUrls = [...staticPages, ...blogUrls];
  
  // Gerar o XML do sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Log para debug
  console.log(`✅ Sitemap generated with ${allUrls.length} URLs (${blogUrls.length} blog posts)`);
  
  return res.status(200).send(sitemap);
}
