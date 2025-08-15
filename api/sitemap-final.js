// api/sitemap-final.js
// Sitemap definitivo - usando método alternativo de autenticação

export default async function handler(req, res) {
  console.log('Sitemap Final API called!');
  
  // Função para buscar posts do blog
  async function getBlogPosts() {
    try {
      const spaceId = 'g8ip8odd5vbl';
      const accessToken = 'cr6Ra2NQPO9jz2qTWmAK2ykLy0I_4bIqVCyepF8ix-k';
      
      // MÉTODO ALTERNATIVO: Token como query parameter (como funcionou no navegador!)
      const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?content_type=blogCarla&limit=200&access_token=${accessToken}`;
      
      console.log('Fetching blog posts using query parameter method...');
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      console.log('Contentful Response Status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Contentful API error:', response.status, errorText);
        return [];
      }
      
      const data = await response.json();
      console.log(`Successfully fetched ${data.items?.length || 0} blog posts from Contentful`);
      console.log(`Total posts available: ${data.total}`);
      
      return data.items || [];
    } catch (error) {
      console.error('Error fetching blog posts:', error.message);
      return [];
    }
  }

  try {
    const baseUrl = 'https://www.dracarlachristoph.com';
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
    
    // Buscar posts do blog
    console.log('Fetching blog posts from Contentful...');
    const blogPosts = await getBlogPosts();
    
    // Gerar URLs dos posts do blog
    const blogUrls = blogPosts.map((post, index) => {
      // Debug: log estrutura do primeiro post
      if (index === 0) {
        console.log('First post fields:', Object.keys(post.fields || {}));
        console.log('Sample title:', post.fields?.titulo);
      }
      
      let slug = '';
      
      // Prioridade: slug > titulo
      if (post.fields?.slug) {
        slug = post.fields.slug;
      } else if (post.fields?.titulo) {
        // Gerar slug do título
        slug = post.fields.titulo
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Remove acentos
          .replace(/[^a-z0-9]+/g, '-') // Substitui caracteres especiais por hífen
          .replace(/^-+|-+$/g, '') // Remove hífens do início e fim
          .replace(/--+/g, '-'); // Remove hífens duplos
      }
      
      // Skip se não conseguir gerar slug
      if (!slug || slug.length < 3) {
        console.log(`Skipping post without valid slug: ${post.sys?.id}`);
        return null;
      }
      
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
    
    console.log(`Generated ${blogUrls.length} blog URLs from ${blogPosts.length} posts`);
    
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

    console.log(`✅ Sitemap generated successfully with ${allUrls.length} URLs`);
    console.log(`   - Static pages: ${staticPages.length}`);
    console.log(`   - Blog posts: ${blogUrls.length}`);
    
    // Configurar headers e enviar resposta
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.setHeader('X-Robots-Tag', 'noarchive');
    
    res.status(200).send(sitemap);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    console.error(error.stack);
    
    // Fallback sitemap em caso de erro
    const today = new Date().toISOString().split('T')[0];
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.dracarlachristoph.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.dracarlachristoph.com/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.dracarlachristoph.com/servicos</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
    
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(fallbackSitemap);
  }
}
