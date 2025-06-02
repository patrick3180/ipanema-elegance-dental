
import { BlogPost } from '@/types/BlogPost';
import { contentfulClient, formatImageUrl, DEFAULT_LOCALE } from './client';
import { transformBlogPostEntry, richTextToHtml } from './transformers';
import { getLocalizedValue, BlogPostSkeleton, CategorySkeleton } from './types';
import { blogPosts, getBlogPostBySlug as getLocalBlogPostBySlug } from '@/data/blogPosts';
import { Entry } from 'contentful';

// Get all blog posts from Contentful
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    console.log('Fetching all blog posts from Contentful...');
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogCarla',
      order: ['-sys.createdAt'],
      include: 3, // Increased include depth to get embedded assets
      locale: DEFAULT_LOCALE
    });

    console.log(`Contentful response: ${response.items.length} items found`);

    if (!response.items || response.items.length === 0) {
      console.log('No items from Contentful, falling back to local blog posts');
      return Promise.resolve(blogPosts);
    }

    return Promise.all(
      response.items.map(async (item) => {
        console.log(`Processing blog post: ${item.fields.title?.[DEFAULT_LOCALE] || 'Unknown'}`);
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
                console.log(`Featured image loaded for ${post.title}: ${post.imageUrl}`);
              }
            }
          } catch (error) {
            console.error(`Error loading featured image for ${post.title}:`, error);
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
            console.error(`Error loading category for ${post.title}:`, error);
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
    console.log(`Fetching blog post by slug: ${slug}`);
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogCarla',
      'fields.slug': slug,
      limit: 1,
      include: 4, // Increased include depth to ensure all embedded assets are loaded
      locale: DEFAULT_LOCALE
    });

    console.log(`Contentful response for slug ${slug}:`, response.items.length > 0 ? 'Found' : 'Not found');

    if (!response.items || response.items.length === 0) {
      console.log(`No Contentful item found for slug ${slug}, falling back to local data`);
      return getLocalBlogPostBySlug(slug);
    }

    const item = response.items[0];
    console.log(`Processing blog post: ${item.fields.title?.[DEFAULT_LOCALE] || 'Unknown'}`);
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
            console.log(`Featured image loaded: ${post.imageUrl}`);
          }
        }
      } catch (error) {
        console.error('Error fetching featured image:', error);
      }
    }
    
    // Process rich text content with improved asset handling
    if (item.fields.content) {
      try {
        console.log('Processing rich text content...');
        const contentRichText = item.fields.content;
        
        // Pass the full response object to get access to included assets
        post.content = richTextToHtml(contentRichText, response);
        console.log(`Rich text content processed, length: ${post.content.length}`);
      } catch (error) {
        console.error('Error converting rich text to HTML:', error);
        post.content = '<p>Erro ao carregar o conteúdo. Por favor, tente novamente mais tarde.</p>';
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
    
    console.log(`Blog post processing complete for: ${post.title}`);
    return post;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return getLocalBlogPostBySlug(slug);
  }
};
