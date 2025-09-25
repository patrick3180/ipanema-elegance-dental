// api/sitemap-edge.js
// Sitemap usando Edge Runtime para melhor performance

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  console.log('Edge Sitemap API called!');
  
  // Função para buscar posts do blog
  async function getBlogPosts() {
    try {
      const spaceId = 'g8ip8odd5vbl';
      const accessToken = 'cr6Ra2NQPO9jz2qTWmAK2ykLy0I_4bIqVCyepF8ix-k';
      
      const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?content_type=blogCarla&limit=100`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        console.error('Contentful API error:', response.status);
        return [];
      }
      
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  try {
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
      { url: '/lentes-de-contato-dental-e-facetas-de-resina', priority: '0.9', changefreq: 'monthly' },
      { url: '/clareamento-dental', priority: '0.9', changefreq: 'monthly' },
      { url: '/protese-dentaria', priority: '0.9', changefreq: 'monthly' },
      { url: '/implantes-dentarios', priority: '0.9', changefreq: 'monthly' },
      { url: '/ortodontia', priority: '0.9', changefreq: 'monthly' },
      { url: '/clinica-geral-e-prevencao', priority: '0.8', changefreq: 'monthly' },
      { url: '/restauracoes-esteticas', priority: '0.8', changefreq: 'monthly' },
      { url: '/tratamento-de-canal', priority: '0.8', changefreq: 'monthly' },
      { url: '/saude-da-gengiva', priority: '0.8', changefreq: 'monthly' },
      
      // Landing pages
      { url: '/lp/clareamento-dental', priority: '0.9', changefreq: 'weekly' },
      { url: '/lp/consulta-inicial', priority: '0.9', changefreq: 'weekly' },
      { url: '/lp/limpeza-dental-ipanema', priority: '0.9', changefreq: 'weekly' },
      { url: '/lp/profilaxia-dental-ipanema', priority: '0.9', changefreq: 'weekly' },
      { url: '/lp/estetica-dental-ipanema', priority: '0.9', changefreq: 'weekly' },
      { url: '/lp/saude-gengival-ipanema', priority: '0.9', changefreq: 'weekly' },
      { url: '/lp/ortodontia-ipanema', priority: '0.9', changefreq: 'weekly' },
      { url: '/lp/dor-de-dente-urgencia-ipanema', priority: '0.9', changefreq: 'weekly' },
      { url: '/lp/dente-quebrado-urgencia-ipanema', priority: '0.9', changefreq: 'weekly' },
      { url: '/lp/emergencia-odontologica-ipanema', priority: '0.9', changefreq: 'weekly' },
      { url: '/lp/especialista-protese-ipanema', priority: '0.9', changefreq: 'weekly' },
      { url: '/lp/implantes-dentarios-ipanema', priority: '0.9', changefreq: 'weekly' },
      
      // Páginas legais
      { url: '/politica-de-privacidade', priority: '0.3', changefreq: 'yearly' },
      { url: '/termos-de-uso', priority: '0.3', changefreq: 'yearly' },
    ];
    
    // Buscar posts do blog
    console.log('Fetching blog posts from Contentful...');
    const blogPosts = await getBlogPosts();
    console.log(`Found ${blogPosts.length} blog posts`);
    
    // Gerar URLs dos posts do blog
    const blogUrls = blogPosts.map(post => {
      let slug = '';
      
      // Tentar pegar o slug do campo correto
      if (post.fields?.slug) {
        slug = post.fields.slug;
      } else if (post.fields?.titulo) {
        // Gerar slug do título se não houver campo slug
        slug = post.fields.titulo
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Remove acentos
          .replace(/[^a-z0-9]+/g, '-') // Substitui caracteres especiais
          .replace(/^-+|-+$/g, ''); // Remove hífens extras
      }
      
      if (!slug) return null;
      
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

    console.log(`Sitemap generated with ${allUrls.length} URLs`);
    
    // Retornar resposta com Edge Runtime
    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Fallback sitemap em caso de erro
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dracarlachristoph.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dracarlachristoph.com/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
    
    return new Response(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  }
}
