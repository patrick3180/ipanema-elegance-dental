import { BlogPost } from '@/types/BlogPost';
import { contentfulClient, formatImageUrl, DEFAULT_LOCALE } from './client';
import { transformBlogPostEntry, richTextToHtml } from './transformers';
import { getLocalizedValue, BlogPostSkeleton, CategorySkeleton } from './types';
import { blogPosts, getBlogPostBySlug as getLocalBlogPostBySlug } from '@/data/blogPosts';
import { Entry } from 'contentful';

// Get all blog posts from Contentful
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogCarla',
      order: ['-sys.createdAt'],
      include: 2, // Reduce include depth for faster loading of list
      locale: DEFAULT_LOCALE
    });

    if (!response.items || response.items.length === 0) {
      return Promise.resolve(blogPosts);
    }

    return Promise.all(
      response.items.map(async (item) => {
        const post = transformBlogPostEntry(item);
        
        // Get the featured image
        const featuredImageId = item.fields.featuredImage?.sys?.id;
        if (featuredImageId) {
          try {
            const imageEntry = await contentfulClient.getAsset(featuredImageId);
            if (imageEntry?.fields?.file) {
              const imageUrl = getLocalizedValue(imageEntry.fields.file.url);
              if (imageUrl) {
                post.imageUrl = formatImageUrl(imageUrl);
              }
            }
          } catch (error) {
            // Silently fail on image loading to keep the posts list loading fast
          }
        }
        
        // Get category - but don't process content for list view
        const categoryRef = item.fields.category;
        if (categoryRef) {
          try {
            const categoryResponse = await contentfulClient.getEntry<CategorySkeleton>(
              categoryRef.sys.id,
              { locale: DEFAULT_LOCALE }
            );
            
            if (categoryResponse?.fields) {
              post.category = getLocalizedValue(categoryResponse.fields.name) || '';
            }
          } catch (error) {
            // Silently fail on category loading
          }
        }
        
        return post;
      })
    );
  } catch (error) {
    console.error('Error fetching blog posts from Contentful:', error);
    return Promise.resolve(blogPosts);
  }
};

// Get a single blog post by slug from Contentful
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogCarla',
      'fields.slug': slug,
      limit: 1,
      include: 2,
      locale: DEFAULT_LOCALE
    });

    if (!response.items || response.items.length === 0) {
      return getLocalBlogPostBySlug(slug);
    }

    const item = response.items[0];
    const post = transformBlogPostEntry(item);
    
    // Get the featured image
    const featuredImageId = item.fields.featuredImage?.sys?.id;
    if (featuredImageId) {
      try {
        const imageEntry = await contentfulClient.getAsset(featuredImageId);
        if (imageEntry?.fields?.file) {
          const imageUrl = getLocalizedValue(imageEntry.fields.file.url);
          if (imageUrl) {
            post.imageUrl = formatImageUrl(imageUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching featured image:', error);
      }
    }
    
    // Process rich text content efficiently
    if (item.fields.content) {
      try {
        const contentRichText = item.fields.content;
        post.content = richTextToHtml(contentRichText);
      } catch (error) {
        console.error('Error converting rich text to HTML:', error);
      }
    }
    
    // Get category
    const categoryRef = item.fields.category;
    if (categoryRef) {
      try {
        const categoryResponse = await contentfulClient.getEntry<CategorySkeleton>(
          categoryRef.sys.id,
          { locale: DEFAULT_LOCALE }
        );
        
        if (categoryResponse?.fields) {
          post.category = getLocalizedValue(categoryResponse.fields.name) || '';
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    }
    
    return post;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return getLocalBlogPostBySlug(slug);
  }
};
