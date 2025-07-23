
import { getAllBlogPosts } from '@/services/contentful/queries';
import { blogPosts } from '@/data/blogPosts';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateRobotsTxt = (): string => {
  const baseUrl = 'https://dracarlachristoph.com';
  
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

# Block access to sensitive areas (uncomment if needed)
# Disallow: /admin/
# Disallow: /api/
# Disallow: /*.json$

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Host preference (helps with duplicate content)
Host: ${baseUrl}`;
};

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
    // First try to fetch blog posts from Contentful
    const contentfulPosts = await getAllBlogPosts();
    
    if (contentfulPosts && contentfulPosts.length > 0) {
      blogPages = contentfulPosts.map(post => ({
        loc: `${baseUrl}/blog/${post.slug}`,
        lastmod: post.updatedAt || post.publishedAt || post.date,
        changefreq: 'monthly' as const,
        priority: 0.7
      }));
    } else {
      throw new Error('No posts from Contentful');
    }
  } catch (error) {
    console.error('Error fetching blog posts from Contentful for sitemap, using local data:', error);
    
    // Fallback to local blog post data
    blogPages = blogPosts.map(post => ({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: post.date,
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
