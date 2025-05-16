
import { BlogPost } from '@/types/BlogPost';
import { contentfulClient, formatImageUrl } from './client';
import { transformBlogPostEntry, richTextToHtml } from './transformers';
import { getLocalizedValue, BlogPostSkeleton, CategorySkeleton } from './types';
import { blogPosts, getBlogPostBySlug as getLocalBlogPostBySlug } from '@/data/blogPosts';
import { Entry, Asset, ContentfulClientApi } from 'contentful';

// Get all blog posts from Contentful
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      order: '-sys.createdAt',
    });

    if (!response.items || response.items.length === 0) {
      console.log('No blog posts found in Contentful, using local data');
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
            if (imageEntry && imageEntry.fields && imageEntry.fields.file) {
              const imageUrl = getLocalizedValue(imageEntry.fields.file.url);
              if (imageUrl && typeof imageUrl === 'string') {
                post.imageUrl = formatImageUrl(imageUrl);
              }
            }
          } catch (error) {
            console.error('Error fetching featured image:', error);
          }
        }
        
        // Convert rich text to HTML for content
        if (item.fields.content) {
          try {
            const contentRichText = getLocalizedValue(item.fields.content);
            if (contentRichText) {
              post.content = await richTextToHtml(contentRichText);
            }
          } catch (error) {
            console.error('Error converting rich text to HTML:', error);
          }
        }
        
        // Get categories
        const categoryRefs = item.fields.categories;
        if (categoryRefs && categoryRefs.length > 0) {
          const categoryIds = categoryRefs.map(cat => cat.sys.id);
          try {
            const categoriesResponse = await contentfulClient.getEntries<CategorySkeleton>({
              content_type: 'category',
              'sys.id[in]': categoryIds.join(','),
            });
            
            if (categoriesResponse.items && categoriesResponse.items.length > 0) {
              post.categories = categoriesResponse.items.map(cat => ({
                id: cat.sys.id,
                name: getLocalizedValue(cat.fields.name) || '',
                slug: getLocalizedValue(cat.fields.slug) || '',
              }));
            }
          } catch (error) {
            console.error('Error fetching categories:', error);
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
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });

    if (!response.items || response.items.length === 0) {
      console.log(`Blog post with slug ${slug} not found in Contentful, using local data`);
      return getLocalBlogPostBySlug(slug);
    }

    const item = response.items[0];
    const post = transformBlogPostEntry(item);
    
    // Get the featured image
    const featuredImageId = item.fields.featuredImage?.sys?.id;
    if (featuredImageId) {
      try {
        const imageEntry = await contentfulClient.getAsset(featuredImageId);
        if (imageEntry && imageEntry.fields && imageEntry.fields.file) {
          const imageUrl = getLocalizedValue(imageEntry.fields.file.url);
          if (imageUrl && typeof imageUrl === 'string') {
            post.imageUrl = formatImageUrl(imageUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching featured image:', error);
      }
    }
    
    // Convert rich text to HTML for content
    if (item.fields.content) {
      try {
        const contentRichText = getLocalizedValue(item.fields.content);
        if (contentRichText) {
          post.content = await richTextToHtml(contentRichText);
        }
      } catch (error) {
        console.error('Error converting rich text to HTML:', error);
      }
    }
    
    // Get categories
    const categoryRefs = item.fields.categories;
    if (categoryRefs && categoryRefs.length > 0) {
      const categoryIds = categoryRefs.map(cat => cat.sys.id);
      try {
        const categoriesResponse = await contentfulClient.getEntries<CategorySkeleton>({
          content_type: 'category',
          'sys.id[in]': categoryIds.join(','),
        });
        
        if (categoriesResponse.items && categoriesResponse.items.length > 0) {
          post.categories = categoriesResponse.items.map(cat => ({
            id: cat.sys.id,
            name: getLocalizedValue(cat.fields.name) || '',
            slug: getLocalizedValue(cat.fields.slug) || '',
          }));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    
    return post;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return getLocalBlogPostBySlug(slug);
  }
};
