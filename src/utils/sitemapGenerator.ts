
import { getAllBlogPosts } from '@/services/contentful/queries';
import { blogPosts } from '@/data/blogPosts';
import { contentfulCache, CACHE_KEYS } from '@/utils/contentfulCache';

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
  // Check cache first (cached for 1 hour)
  const cachedSitemap = contentfulCache.get<string>(CACHE_KEYS.SITEMAP);
  if (cachedSitemap) {
    console.log('📋 Returning cached sitemap');
    return cachedSitemap;
  }

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
    console.log('🔍 Attempting to fetch blog posts from Contentful...');
    
    // Enhanced Contentful connection with better error handling
    const contentfulPosts = await getAllBlogPosts();
    
    if (contentfulPosts && contentfulPosts.length > 0) {
      console.log(`✅ Successfully fetched ${contentfulPosts.length} blog posts from Contentful`);
      
      blogPages = contentfulPosts.map(post => {
        // Ensure proper date format for lastmod
        let lastmod = today;
        if (post.updatedAt) {
          lastmod = new Date(post.updatedAt).toISOString().split('T')[0];
        } else if (post.publishedAt) {
          lastmod = new Date(post.publishedAt).toISOString().split('T')[0];
        } else if (post.date) {
          // Handle different date formats
          const dateStr = post.date.toString();
          if (dateStr.includes('de')) {
            // Portuguese date format - convert to ISO
            lastmod = today; // Fallback to today for Portuguese dates
          } else {
            lastmod = new Date(post.date).toISOString().split('T')[0];
          }
        }
        
        return {
          loc: `${baseUrl}/blog/${post.slug}`,
          lastmod,
          changefreq: 'monthly' as const,
          priority: 0.7
        };
      });
      
      // Ping Google and Bing about sitemap update
      await pingSearchEngines();
    } else {
      throw new Error('No posts from Contentful');
    }
  } catch (error) {
    console.error('❌ Error fetching blog posts, using local fallback:', error);
    
    // Fallback to local blog post data with proper date handling
    console.log(`📝 Using ${blogPosts.length} local blog posts as fallback`);
    blogPages = blogPosts.map(post => {
      // Convert Portuguese date to ISO format
      let lastmod = today;
      if (post.date) {
        const dateStr = post.date.toString();
        if (dateStr.includes('de')) {
          // Portuguese date - use today as fallback
          lastmod = today;
        } else {
          lastmod = new Date(post.date).toISOString().split('T')[0];
        }
      }
      
      return {
        loc: `${baseUrl}/blog/${post.slug}`,
        lastmod,
        changefreq: 'monthly' as const,
        priority: 0.7
      };
    });
  }

  // Combine all URLs
  const allUrls = [...staticPages, ...servicePages, ...blogPages, ...legalPages];
  
  console.log(`📊 Sitemap generated with ${allUrls.length} total pages:`);
  console.log(`  - ${staticPages.length} static pages`);
  console.log(`  - ${servicePages.length} service pages`);
  console.log(`  - ${legalPages.length} legal pages`);
  console.log(`  - ${blogPages.length} blog posts`);

  // Cache the sitemap for 1 hour
  const generatedSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

  contentfulCache.set(CACHE_KEYS.SITEMAP, generatedSitemap, 60 * 60 * 1000); // 1 hour cache

  return generatedSitemap;
};

// Function to ping search engines about sitemap updates
export const pingSearchEngines = async (): Promise<void> => {
  const sitemapUrl = encodeURIComponent('https://dracarlachristoph.com/sitemap.xml');
  
  const pingUrls = [
    `https://www.google.com/ping?sitemap=${sitemapUrl}`,
    `https://www.bing.com/ping?sitemap=${sitemapUrl}`
  ];
  
  try {
    const promises = pingUrls.map(url => 
      fetch(url, { method: 'GET', mode: 'no-cors' })
        .catch(error => console.log(`Ping failed for ${url}:`, error))
    );
    
    await Promise.all(promises);
    console.log('🔔 Search engines pinged about sitemap update');
  } catch (error) {
    console.log('⚠️ Could not ping search engines:', error);
  }
};
