import { BlogPost } from '@/types/BlogPost';
import { contentfulClient, formatImageUrl } from './client';
import { transformBlogPostEntry, richTextToHtml } from './transformers';
import { getLocalizedValue, BlogPostSkeleton, CategorySkeleton } from './types';
import { blogPosts, getBlogPostBySlug as getLocalBlogPostBySlug } from '@/data/blogPosts';
import { Entry, Asset } from 'contentful';

// Get all blog posts from Contentful
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    // Fetch blog posts from Contentful
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogCarla',
      order: ['-fields.publishDate'],
      include: 2 // Include 2 levels of linked entries (for categories, etc)
    });

    // Transform entries to BlogPost objects
    const posts = response.items.map((entry) => {
      // First get the base post with text fields
      const post = transformBlogPostEntry(entry);
      
      // Add HTML content from rich text
      if (entry.fields.content) {
        post.content = richTextToHtml(entry.fields.content);
      }
      
      // Add category if available
      if (entry.fields.category) {
        const categoryEntry = entry.fields.category as unknown as Entry<CategorySkeleton>;
        if (categoryEntry && categoryEntry.fields) {
          const category = getLocalizedValue(categoryEntry.fields.name);
          if (category) {
            post.category = category;
            post.categorySlug = getLocalizedValue(categoryEntry.fields.slug) || '';
          }
        }
      }
      
      // Add image URL if available
      if (entry.fields.featuredImage) {
        const imageEntry = entry.fields.featuredImage as unknown as Asset;
        if (imageEntry && imageEntry.fields && imageEntry.fields.file) {
          const imageUrl = getLocalizedValue(imageEntry.fields.file.url);
          if (imageUrl) {
            post.imageUrl = formatImageUrl(imageUrl);
          }
        }
      }
      
      return post;
    });

    return posts;
  } catch (error) {
    console.error('Error fetching blog posts from Contentful:', error);
    // Fallback to local data if Contentful fails
    return blogPosts;
  }
};

// Get a single blog post by slug from Contentful
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    // Fetch blog post from Contentful
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogCarla',
      'fields.slug': slug,
      include: 2 // Include 2 levels of linked entries
    });

    // If no post found, return null
    if (!response.items.length) {
      return getLocalBlogPostBySlug(slug);
    }

    // Get the first (and should be only) entry
    const entry = response.items[0];
    
    // Transform entry to BlogPost object
    const post = transformBlogPostEntry(entry);
    
    // Add HTML content from rich text
    if (entry.fields.content) {
      post.content = richTextToHtml(entry.fields.content);
    }
    
    // Add category if available
    if (entry.fields.category) {
      const categoryEntry = entry.fields.category as unknown as Entry<CategorySkeleton>;
      if (categoryEntry && categoryEntry.fields) {
        const category = getLocalizedValue(categoryEntry.fields.name);
        if (category) {
          post.category = category;
          post.categorySlug = getLocalizedValue(categoryEntry.fields.slug) || '';
        }
      }
    }
    
    // Add image URL if available
    if (entry.fields.featuredImage) {
      const imageEntry = entry.fields.featuredImage as unknown as Asset;
      if (imageEntry && imageEntry.fields && imageEntry.fields.file) {
        const imageUrl = getLocalizedValue(imageEntry.fields.file.url);
        if (imageUrl) {
          post.imageUrl = formatImageUrl(imageUrl);
        }
      }
    }
    
    return post;
  } catch (error) {
    console.error('Error fetching blog post from Contentful:', error);
    // Fallback to local data if Contentful fails
    return getLocalBlogPostBySlug(slug);
  }
};

// Get all categories from blog posts
export const getAllCategories = async (): Promise<string[]> => {
  try {
    // Fetch categories from Contentful
    const response = await contentfulClient.getEntries<CategorySkeleton>({
      content_type: 'categoria'
    });

    // Extract category names
    const categories = response.items.map((entry) => 
      getLocalizedValue(entry.fields.name) || ''
    ).filter(Boolean);
    
    // If no categories found, extract from blog posts
    if (!categories.length) {
      const posts = await getAllBlogPosts();
      const categoriesFromPosts = posts.map(post => post.category).filter(Boolean);
      return [...new Set(categoriesFromPosts)];
    }

    return [...new Set(categories)];
  } catch (error) {
    console.error('Error fetching categories from Contentful:', error);
    // Extract unique categories from local blog posts as fallback
    const categories = blogPosts.map(post => post.category).filter(Boolean);
    return [...new Set(categories)];
  }
};

// Filter blog posts by category
export const getBlogPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  try {
    // Get all posts first
    const allPosts = await getAllBlogPosts();
    
    // Filter by category
    return allPosts.filter(post => post.category === category);
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    // Filter local blog posts by category as fallback
    return blogPosts.filter(post => post.category === category);
  }
};

// Corrigir os erros TypeScript convertendo explicitamente para string
export const getAssetUrl = (assetId: any, contentfulClient: ContentfulClientApi<undefined>): Promise<string> => {
  if (!assetId) {
    return Promise.resolve('');
  }
  
  return contentfulClient.getAsset(assetId)
    .then(asset => {
      const url = asset.fields.file?.url;
      return typeof url === 'string' ? url : '';
    })
    .catch(error => {
      console.error('Error fetching asset:', error);
      return '';
    });
};

export const getAuthorImageUrl = async (authorId: any, contentfulClient: ContentfulClientApi<undefined>): Promise<string> => {
  if (!authorId) {
    return '';
  }
  
  try {
    const author = await contentfulClient.getEntry(authorId);
    const imageId = author.fields.image?.sys?.id;
    
    if (imageId) {
      return getAssetUrl(imageId, contentfulClient);
    }
    
    return '';
  } catch (error) {
    console.error('Error fetching author image:', error);
    return '';
  }
};
