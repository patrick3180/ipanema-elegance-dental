export default async function handler(req, res) {
  // Função para buscar posts - SEM console.log que possa vazar para o output
  async function getBlogPosts() {
    try {
      const spaceId = process.env.VITE_CONTENTFUL_SPACE_ID;
      const accessToken = process.env.VITE_CONTENTFUL_ACCESS_TOKEN;

      // Usar token como query parameter (método comprovado)
      const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?content_type=blogCarla&limit=200&access_token=${accessToken}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        return [];
      }
      
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      return [];
    }
  }

  try {
    const baseUrl = 'https://dracarlachristoph.com';
    const today = new Date().toISOString().split('T')[0];
    
    // Páginas estáticas
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/servicos', priority: '0.9', changefreq: 'monthly' },
      { url: '/blog', priority: '0.8', changefreq: 'daily' },
      { url: '/lentes-de-contato-dental-e-facetas-de-resina', priority: '0.9', changefreq: 'monthly' },
      { url: '/clareamento-dental', priority: '0.9', changefreq: 'monthly' },
      { url: '/protese-dentaria', priority: '0.9', changefreq: 'monthly' },
      { url: '/implantes-dentarios', priority: '0.9', changefreq: 'monthly' },
      { url: '/ortodontia', priority: '0.9', changefreq: 'monthly' },
      { url: '/clinica-geral-e-prevencao', priority: '0.8', changefreq: 'monthly' },
      { url: '/restauracoes-esteticas', priority: '0.8', changefreq: 'monthly' },
      { url: '/tratamento-de-canal', priority: '0.8', changefreq: 'monthly' },
      { url: '/saude-da-gengiva', priority: '0.8', changefreq: 'monthly' },
      { url: '/sobre', priority: '0.6', changefreq: 'monthly' },
      { url: '/contato', priority: '0.7', changefreq: 'monthly' },
      { url: '/politica-de-privacidade', priority: '0.3', changefreq: 'yearly' },
      { url: '/termos-de-uso', priority: '0.3', changefreq: 'yearly' },
    ];
    
    // Buscar posts do blog
    const blogPosts = await getBlogPosts();
    
    // Gerar URLs dos posts
    const blogUrls = blogPosts.map(post => {
      let slug = '';
      
      if (post.fields?.slug) {
        slug = post.fields.slug;
      } else if (post.fields?.titulo) {
        slug = post.fields.titulo
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .replace(/--+/g, '-');
      }
      
      if (!slug || slug.length < 3) return null;
      
      const updatedAt = post.sys?.updatedAt 
        ? new Date(post.sys.updatedAt).toISOString().split('T')[0] 
        : today;
      
      return {
        url: `/blog/${slug}`,
        lastmod: updatedAt,
        priority: '0.7',
        changefreq: 'weekly'
      };
    }).filter(item => item !== null);
    
    // Combinar URLs
    const allUrls = [...staticPages, ...blogUrls];
    
    // Gerar XML - IMPORTANTE: Sem espaços ou quebras antes
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
    
    // Headers ANTES de enviar qualquer conteúdo
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    
    // Enviar APENAS o XML, sem nada antes
    res.status(200).send(sitemap);
    
  } catch (error) {
    // Em caso de erro, retornar sitemap mínimo
    const today = new Date().toISOString().split('T')[0];
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dracarlachristoph.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dracarlachristoph.com/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
    
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(fallback);
  }
}
