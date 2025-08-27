import { getAllBlogPosts } from '@/services/contentful/queries';
import { getEnhancedBlogPosts, testContentfulConnectivity } from '@/utils/enhancedContentfulQueries';
import { blogPosts, getBlogCategories } from '@/data/blogPosts';
import { BlogPost } from '@/types/BlogPost';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface SitemapData {
  staticPages: SitemapUrl[];
  landingPages: SitemapUrl[];
  servicePages: SitemapUrl[];
  legalPages: SitemapUrl[];
  blogPosts: SitemapUrl[];
  blogCategories: SitemapUrl[];
  blogTags: SitemapUrl[];
  blogPagination: SitemapUrl[];
}

const baseUrl = 'https://dracarlachristoph.com';

export const collectSitemapData = async (): Promise<SitemapData> => {
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
      loc: `${baseUrl}/servicos`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.8
    }
  ];

  // Landing pages - Alta prioridade para conversão
  const landingPages: SitemapUrl[] = [
    // Landing pages já ativas
    {
      loc: `${baseUrl}/lp/limpeza-dental-ipanema`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/lp/profilaxia-dental-ipanema`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/lp/estetica-dental-ipanema`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/lp/saude-gengival-ipanema`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/lp/clareamento-dental`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    // Landing pages com campanhas ativas
    {
      loc: `${baseUrl}/lp/consulta-inicial`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/lp/dor-de-dente-urgencia-ipanema`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/lp/dente-quebrado-urgencia-ipanema`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/lp/emergencia-odontologica-ipanema`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/lp/especialista-protese-ipanema`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/lp/implantes-dentarios-ipanema`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.9
    }
  ];

  // Service pages - Páginas de tratamento
  const servicePages: SitemapUrl[] = [
    {
      loc: `${baseUrl}/clareamento-dental`,
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
      loc: `${baseUrl}/lentes-de-contato-dental-e-facetas-de-porcelana`,
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
      loc: `${baseUrl}/restauracoes-esteticas`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/tratamento-de-canal`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/clinica-geral-e-prevencao`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/saude-da-gengiva`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8
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

  // Enhanced blog posts collection with connectivity check
  let allBlogPosts: BlogPost[] = [];
  
  try {
    console.log('🔍 Testing Contentful connectivity first...');
    const isConnected = await testContentfulConnectivity();
    
    if (isConnected) {
      console.log('✅ Contentful connected - fetching enhanced blog posts...');
      const contentfulPosts = await getEnhancedBlogPosts();
      
      if (contentfulPosts && contentfulPosts.length > 0) {
        console.log(`✅ Got ${contentfulPosts.length} posts from enhanced Contentful fetch`);
        allBlogPosts = contentfulPosts;
      } else {
        throw new Error('No posts from enhanced Contentful fetch');
      }
    } else {
      throw new Error('Contentful connectivity test failed');
    }
  } catch (error) {
    console.warn('⚠️ Enhanced fetch failed, trying standard method:', error);
    
    try {
      const fallbackPosts = await getAllBlogPosts();
      if (fallbackPosts && fallbackPosts.length > 0) {
        console.log(`✅ Got ${fallbackPosts.length} posts from standard Contentful fetch`);
        allBlogPosts = fallbackPosts;
      } else {
        throw new Error('Standard Contentful fetch also failed');
      }
    } catch (fallbackError) {
      console.warn('⚠️ All Contentful methods failed, using local blog posts:', fallbackError);
      allBlogPosts = blogPosts;
    }
  }

  // Generate blog post URLs with robust date handling
  const blogPostUrls: SitemapUrl[] = allBlogPosts.map(post => {
    let lastmod = today;
    
    // Try to parse various date formats safely
    try {
      if (post.updatedAt) {
        const updatedDate = new Date(post.updatedAt);
        if (!isNaN(updatedDate.getTime())) {
          lastmod = updatedDate.toISOString().split('T')[0];
        }
      } else if (post.publishedAt) {
        const publishedDate = new Date(post.publishedAt);
        if (!isNaN(publishedDate.getTime())) {
          lastmod = publishedDate.toISOString().split('T')[0];
        }
      } else if (post.date) {
        // Handle both string and Date objects
        const dateStr = post.date.toString();
        
        // Skip Brazilian Portuguese date format like "5 de janeiro de 2024"
        if (!dateStr.includes('de')) {
          const parsedDate = new Date(post.date);
          if (!isNaN(parsedDate.getTime())) {
            lastmod = parsedDate.toISOString().split('T')[0];
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️ Failed to parse date for post ${post.slug}:`, error);
      // lastmod remains as today's date
    }
    
    return {
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod,
      changefreq: 'monthly' as const,
      priority: 0.7
    };
  });

  // Generate blog category URLs
  const categories = [...new Set(allBlogPosts.map(post => post.category).filter(Boolean))];
  const blogCategoryUrls: SitemapUrl[] = categories.map(category => ({
    loc: `${baseUrl}/blog/categoria/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}`,
    lastmod: today,
    changefreq: 'weekly' as const,
    priority: 0.6
  }));

  // Generate blog tag URLs
  const allTags = new Set<string>();
  allBlogPosts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => allTags.add(tag));
    }
  });
  
  const blogTagUrls: SitemapUrl[] = Array.from(allTags).map(tag => ({
    loc: `${baseUrl}/blog/tag/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`,
    lastmod: today,
    changefreq: 'weekly' as const,
    priority: 0.5
  }));

  // Generate blog pagination URLs (assuming 6 posts per page)
  const postsPerPage = 6;
  const totalPages = Math.ceil(allBlogPosts.length / postsPerPage);
  const blogPaginationUrls: SitemapUrl[] = [];
  
  for (let page = 2; page <= totalPages; page++) {
    blogPaginationUrls.push({
      loc: `${baseUrl}/blog/page/${page}`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: 0.4
    });
  }

  // Generate category pagination URLs
  categories.forEach(category => {
    const categoryPosts = allBlogPosts.filter(post => post.category === category);
    const categoryPages = Math.ceil(categoryPosts.length / postsPerPage);
    
    for (let page = 2; page <= categoryPages; page++) {
      blogPaginationUrls.push({
        loc: `${baseUrl}/blog/categoria/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}/page/${page}`,
        lastmod: today,
        changefreq: 'weekly' as const,
        priority: 0.4
      });
    }
  });

  // Generate tag pagination URLs
  Array.from(allTags).forEach(tag => {
    const tagPosts = allBlogPosts.filter(post => post.tags?.includes(tag));
    const tagPages = Math.ceil(tagPosts.length / postsPerPage);
    
    for (let page = 2; page <= tagPages; page++) {
      blogPaginationUrls.push({
        loc: `${baseUrl}/blog/tag/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}/page/${page}`,
        lastmod: today,
        changefreq: 'weekly' as const,
        priority: 0.4
      });
    }
  });

  return {
    staticPages,
    landingPages,
    servicePages,
    legalPages,
    blogPosts: blogPostUrls,
    blogCategories: blogCategoryUrls,
    blogTags: blogTagUrls,
    blogPagination: blogPaginationUrls
  };
};

export const getTotalUrlCount = (data: SitemapData): number => {
  return data.staticPages.length +
         data.landingPages.length +
         data.servicePages.length +
         data.legalPages.length +
         data.blogPosts.length +
         data.blogCategories.length +
         data.blogTags.length +
         data.blogPagination.length;
};