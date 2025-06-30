
import { getAllBlogPosts } from '@/services/contentful/queries';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateSitemap = async (): Promise<string> => {
  const baseUrl = 'https://dracarlachristoph.com';
  const today = new Date().toISOString().split('T')[0];
  
  // Static pages with their priorities and update frequencies
  const staticPages: SitemapUrl[] = [
    {
      loc: `${baseUrl}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/sobre`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/servicos`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/diferenciais`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/contato`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8
    }
  ];

  // Service pages
  const servicePages: SitemapUrl[] = [
    {
      loc: `${baseUrl}/lentes-de-contato-dental-e-facetas-de-porcelana`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/clareamento-dental`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/protese-dentaria`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/implantes-dentarios`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/clinica-geral-e-prevencao`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/restauracoes-esteticas`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/tratamento-de-canal`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/saude-da-gengiva`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.7
    }
  ];

  // Legal pages
  const legalPages: SitemapUrl[] = [
    {
      loc: `${baseUrl}/politica-de-privacidade`,
      lastmod: today,
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: `${baseUrl}/termos-de-uso`,
      lastmod: today,
      changefreq: 'yearly',
      priority: 0.3
    }
  ];

  let blogPages: SitemapUrl[] = [];
  
  try {
    // Fetch blog posts from Contentful
    const blogPosts = await getAllBlogPosts();
    blogPages = blogPosts.map(post => ({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: post.updatedAt || post.publishedAt || post.date,
      changefreq: 'monthly' as const,
      priority: 0.7
    }));
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    
    // Fallback to static blog post URLs if Contentful fails
    const fallbackBlogPosts = [
      'cuidados-pos-implante-dentario',
      'lentes-de-contato-dental-tudo-que-voce-precisa-saber',
      'clareamento-dental-mitos-e-verdades',
      'higiene-bucal-rotina-diaria-perfeita',
      'protese-dentaria-fixa-ou-removivel',
      'implantes-dentarios-quando-indicados',
      'facetas-de-porcelana-transformacao-sorriso',
      'gengivite-e-periodontite-diferencas',
      'canal-quando-e-necessario',
      'restauracoes-esteticas-tipos-materiais'
    ];
    
    blogPages = fallbackBlogPosts.map(slug => ({
      loc: `${baseUrl}/blog/${slug}`,
      lastmod: today,
      changefreq: 'monthly' as const,
      priority: 0.7
    }));
  }

  // Combine all URLs
  const allUrls = [...staticPages, ...servicePages, ...blogPages, ...legalPages];

  // Generate XML sitemap
  const xmlUrls = allUrls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${xmlUrls}
</urlset>`;
};
