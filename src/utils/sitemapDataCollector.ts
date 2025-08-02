import { getAllBlogPosts } from '@/services/contentful/queries';
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

  // Collect blog posts
  let allBlogPosts: BlogPost[] = [];
  
  try {
    console.log('🔍 Collecting blog posts from Contentful...');
    const contentfulPosts = await getAllBlogPosts();
    
    if (contentfulPosts && contentfulPosts.length > 0) {
      console.log(`✅ Got ${contentfulPosts.length} posts from Contentful`);
      allBlogPosts = contentfulPosts;
    } else {
      throw new Error('No posts from Contentful');
    }
  } catch (error) {
    console.warn('⚠️ Using local blog posts fallback:', error);
    allBlogPosts = blogPosts;
  }

  // Generate blog post URLs
  const blogPostUrls: SitemapUrl[] = allBlogPosts.map(post => {
    let lastmod = today;
    if (post.updatedAt) {
      lastmod = new Date(post.updatedAt).toISOString().split('T')[0];
    } else if (post.publishedAt) {
      lastmod = new Date(post.publishedAt).toISOString().split('T')[0];
    } else if (post.date) {
      const dateStr = post.date.toString();
      if (!dateStr.includes('de')) {
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
         data.servicePages.length +
         data.legalPages.length +
         data.blogPosts.length +
         data.blogCategories.length +
         data.blogTags.length +
         data.blogPagination.length;
};