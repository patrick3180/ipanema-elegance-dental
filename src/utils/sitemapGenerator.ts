
import { BlogPost } from '@/types/BlogPost';
import { getAllBlogPosts } from '@/services/contentful/queries';

const BASE_URL = 'https://dracarlachristoph.com';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Static pages with their SEO properties
const staticPages: SitemapUrl[] = [
  {
    loc: `${BASE_URL}/`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 1.0
  },
  {
    loc: `${BASE_URL}/sobre`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: `${BASE_URL}/servicos`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: `${BASE_URL}/diferenciais`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    loc: `${BASE_URL}/blog`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.7
  },
  {
    loc: `${BASE_URL}/contato`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8
  },
  // Service pages
  {
    loc: `${BASE_URL}/lentes-de-contato-dental-e-facetas-de-porcelana`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    loc: `${BASE_URL}/clareamento-dental`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    loc: `${BASE_URL}/protese-dentaria`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    loc: `${BASE_URL}/implantes-dentarios`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    loc: `${BASE_URL}/clinica-geral-e-prevencao`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    loc: `${BASE_URL}/restauracoes-esteticas`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    loc: `${BASE_URL}/tratamento-de-canal`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    loc: `${BASE_URL}/saude-da-gengiva`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  // Legal pages
  {
    loc: `${BASE_URL}/politica-de-privacidade`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'yearly',
    priority: 0.3
  },
  {
    loc: `${BASE_URL}/termos-de-uso`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'yearly',
    priority: 0.3
  }
];

export const generateSitemap = async (): Promise<string> => {
  try {
    console.log('Generating dynamic sitemap...');
    
    // Get all blog posts
    const blogPosts = await getAllBlogPosts();
    console.log(`Found ${blogPosts.length} blog posts for sitemap`);
    
    // Create blog post URLs
    const blogUrls: SitemapUrl[] = blogPosts.map((post: BlogPost) => ({
      loc: `${BASE_URL}/blog/${post.slug}`,
      lastmod: post.updatedAt || post.publishedAt || post.date || new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.6
    }));
    
    // Combine all URLs
    const allUrls = [...staticPages, ...blogUrls];
    
    // Generate XML
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const xmlUrls = allUrls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');
    
    const sitemap = `${xmlHeader}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlUrls}
</urlset>`;

    console.log(`Generated sitemap with ${allUrls.length} URLs`);
    return sitemap;
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return basic sitemap on error
    return generateFallbackSitemap();
  }
};

const generateFallbackSitemap = (): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const xmlUrls = staticPages.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');
  
  return `${xmlHeader}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlUrls}
</urlset>`;
};

export const generateRobotsTxt = (): string => {
  return `# Robots.txt for Dra. Carla Christoph - Dentista em Ipanema
# This file helps search engines understand how to crawl our site

# Allow all search engines to crawl the entire site
User-agent: *
Allow: /

# Special rules for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Social media crawlers
User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: LinkedInBot
Allow: /

# Block specific paths if needed (uncomment if required)
# Disallow: /admin/
# Disallow: /private/
# Disallow: /*.pdf$

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml

# Host preference (helps with duplicate content)
Host: ${BASE_URL}`;
};
