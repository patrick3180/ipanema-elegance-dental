
import { BlogPost } from '@/types/BlogPost';
import { contentfulClient, formatImageUrl, DEFAULT_LOCALE } from './client';
import { transformBlogPostEntry, richTextToHtml } from './transformers';
import { getLocalizedValue, BlogPostSkeleton, CategorySkeleton } from './types';
import { blogPosts, getBlogPostBySlug as getLocalBlogPostBySlug } from '@/data/blogPosts';
import { Entry } from 'contentful';

// Get all blog posts from Contentful
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    console.log('getAllBlogPosts: Fetching from Contentful...');
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogCarla',
      order: ['-sys.createdAt'],
      include: 5, // Increased include depth to get all nested assets
      locale: DEFAULT_LOCALE,
      limit: 1000, // Increased limit to get all posts
    });

    console.log(`getAllBlogPosts: Contentful response - ${response.items.length} items, ${response.includes?.Asset?.length || 0} assets`);

    if (!response.items || response.items.length === 0) {
      console.log('getAllBlogPosts: No items from Contentful, using local fallback');
      return Promise.resolve(blogPosts);
    }

    return Promise.all(
      response.items.map(async (item) => {
        const title = getLocalizedValue(item.fields.title) || 'Unknown';
        console.log(`getAllBlogPosts: Processing "${title}"`);
        
        const post = transformBlogPostEntry(item);
        
        // Get the featured image with enhanced error handling
        const featuredImageRef = item.fields.featuredImage;
        if (featuredImageRef?.sys?.id) {
          try {
            console.log(`getAllBlogPosts: Loading featured image for "${title}"`);
            const imageEntry = await contentfulClient.getAsset(featuredImageRef.sys.id);
            
            if (imageEntry?.fields?.file) {
              const fileData = getLocalizedValue(imageEntry.fields.file);
              if (fileData?.url) {
                post.imageUrl = formatImageUrl(fileData.url, { quality: 80, width: 600 });
                console.log(`getAllBlogPosts: Featured image loaded for "${title}": ${post.imageUrl}`);
              }
            }
          } catch (error) {
            console.error(`getAllBlogPosts: Error loading featured image for "${title}":`, error);
          }
        }
        
        // Get category
        const categoryRef = item.fields.category;
        if (categoryRef?.sys?.id) {
          try {
            const categoryResponse = await contentfulClient.getEntry<CategorySkeleton>(
              categoryRef.sys.id,
              { locale: DEFAULT_LOCALE }
            );
            
            if (categoryResponse?.fields) {
              post.category = getLocalizedValue(categoryResponse.fields.name) || '';
              console.log(`getAllBlogPosts: Category loaded for "${title}": ${post.category}`);
            }
          } catch (error) {
            console.error(`getAllBlogPosts: Error loading category for "${title}":`, error);
          }
        }
        
        return post;
      })
    );
  } catch (error) {
    console.error('getAllBlogPosts: Error fetching from Contentful:', error);
    return Promise.resolve(blogPosts);
  }
};

// Get a single blog post by slug from Contentful with enhanced asset loading
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    console.log(`getBlogPostBySlug: Fetching post with slug "${slug}"`);
    
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogCarla',
      'fields.slug': slug,
      limit: 1,
      include: 10, // Maximum include depth to ensure all embedded assets are loaded
      locale: DEFAULT_LOCALE
    });

    console.log(`getBlogPostBySlug: Contentful response for "${slug}":`, {
      found: response.items.length > 0,
      itemsCount: response.items.length,
      assetsCount: response.includes?.Asset?.length || 0,
      entriesCount: response.includes?.Entry?.length || 0
    });

    if (!response.items || response.items.length === 0) {
      console.log(`getBlogPostBySlug: No Contentful item found for "${slug}", trying local fallback`);
      return getLocalBlogPostBySlug(slug);
    }

    const item = response.items[0];
    const title = getLocalizedValue(item.fields.title) || 'Unknown';
    console.log(`getBlogPostBySlug: Processing "${title}"`);
    
    const post = transformBlogPostEntry(item);
    
    // Enhanced featured image loading
    const featuredImageRef = item.fields.featuredImage;
    if (featuredImageRef?.sys?.id) {
      try {
        console.log(`getBlogPostBySlug: Loading featured image for "${title}"`);
        
        // Try to get from included assets first
        let imageEntry = null;
        if (response.includes?.Asset) {
          imageEntry = response.includes.Asset.find(asset => asset.sys.id === featuredImageRef.sys.id);
          if (imageEntry) {
            console.log('getBlogPostBySlug: Featured image found in included assets');
          }
        }
        
        // If not found in includes, fetch separately
        if (!imageEntry) {
          console.log('getBlogPostBySlug: Fetching featured image separately');
          imageEntry = await contentfulClient.getAsset(featuredImageRef.sys.id);
        }
        
        if (imageEntry?.fields?.file) {
          const fileData = getLocalizedValue(imageEntry.fields.file);
          if (fileData?.url) {
            post.imageUrl = formatImageUrl(fileData.url, { quality: 85, width: 800 });
            console.log(`getBlogPostBySlug: Featured image loaded: ${post.imageUrl}`);
          }
        }
      } catch (error) {
        console.error(`getBlogPostBySlug: Error fetching featured image for "${title}":`, error);
      }
    }
    
    // Enhanced rich text content processing
    if (item.fields.content) {
      try {
        console.log(`getBlogPostBySlug: Processing rich text content for "${title}"`);
        const contentRichText = getLocalizedValue(item.fields.content);
        
        if (contentRichText) {
          // Pass the full response to ensure access to all included assets
          post.content = richTextToHtml(contentRichText, response);
          console.log(`getBlogPostBySlug: Rich text processed successfully, length: ${post.content.length}`);
          
          // Debug: Log asset information
          if (response.includes?.Asset) {
            console.log(`getBlogPostBySlug: Available assets for content processing:`, 
              response.includes.Asset.map(asset => ({
                id: asset.sys.id,
                title: getLocalizedValue(asset.fields?.title) || 'No title',
                url: getLocalizedValue(asset.fields?.file)?.url || 'No URL'
              }))
            );
          }
        } else {
          console.warn(`getBlogPostBySlug: No localized content found for "${title}"`);
          post.content = '<p class="text-dental-gray/70">Conteúdo não disponível no idioma selecionado.</p>';
        }
      } catch (error) {
        console.error(`getBlogPostBySlug: Error converting rich text for "${title}":`, error);
        post.content = '<p class="text-red-500">Erro ao carregar o conteúdo. Por favor, tente novamente mais tarde.</p>';
      }
    } else {
      console.warn(`getBlogPostBySlug: No content field found for "${title}"`);
    }
    
    // Get category with enhanced error handling
    const categoryRef = item.fields.category;
    if (categoryRef?.sys?.id) {
      try {
        console.log(`getBlogPostBySlug: Loading category for "${title}"`);
        const categoryResponse = await contentfulClient.getEntry<CategorySkeleton>(
          categoryRef.sys.id,
          { locale: DEFAULT_LOCALE }
        );
        
        if (categoryResponse?.fields) {
          post.category = getLocalizedValue(categoryResponse.fields.name) || '';
          console.log(`getBlogPostBySlug: Category loaded: ${post.category}`);
        }
      } catch (error) {
        console.error(`getBlogPostBySlug: Error fetching category for "${title}":`, error);
      }
    }
    
    console.log(`getBlogPostBySlug: Processing complete for "${title}":`, {
      hasContent: !!post.content && post.content.length > 0,
      hasImage: !!post.imageUrl,
      hasCategory: !!post.category,
      contentLength: post.content.length
    });
    
    return post;
  } catch (error) {
    console.error(`getBlogPostBySlug: Error fetching post with slug "${slug}":`, error);
    return getLocalBlogPostBySlug(slug);
  }
};
