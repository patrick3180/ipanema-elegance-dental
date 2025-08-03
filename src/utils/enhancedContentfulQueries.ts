import { BlogPost } from '@/types/BlogPost';
import { contentfulClient, formatImageUrl, DEFAULT_LOCALE } from '@/services/contentful/client';
import { transformBlogPostEntry, richTextToHtml } from '@/services/contentful/transformers';
import { getLocalizedValue, BlogPostSkeleton, CategorySkeleton } from '@/services/contentful/types';
import { blogPosts } from '@/data/blogPosts';
import { contentfulCache, CACHE_KEYS } from '@/utils/contentfulCache';

// Enhanced blog post fetching with better error handling and retry logic
export const getEnhancedBlogPosts = async (retries = 3): Promise<BlogPost[]> => {
  // Check cache first
  const cachedPosts = contentfulCache.get<BlogPost[]>(CACHE_KEYS.ALL_BLOG_POSTS);
  if (cachedPosts) {
    console.log(`getEnhancedBlogPosts: Returning ${cachedPosts.length} cached posts`);
    return cachedPosts;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`getEnhancedBlogPosts: Attempt ${attempt}/${retries} - Fetching from Contentful...`);
      
      const response = await contentfulClient.getEntries<BlogPostSkeleton>({
        content_type: 'blogCarla',
        order: ['-sys.createdAt'],
        include: 5,
        locale: DEFAULT_LOCALE,
        limit: 1000,
      });

      console.log(`getEnhancedBlogPosts: Contentful response - ${response.items.length} items, ${response.includes?.Asset?.length || 0} assets`);

      if (!response.items || response.items.length === 0) {
        console.log('getEnhancedBlogPosts: No items from Contentful');
        if (attempt === retries) {
          console.log('getEnhancedBlogPosts: Using local fallback after all attempts');
          return blogPosts;
        }
        continue;
      }

      // Process posts with enhanced error handling
      const processedPosts: BlogPost[] = [];
      
      for (const item of response.items) {
        try {
          const title = getLocalizedValue(item.fields.title) || 'Unknown';
          console.log(`getEnhancedBlogPosts: Processing "${title}"`);
          
          const post = transformBlogPostEntry(item);
          
          // Enhanced featured image loading
          await loadFeaturedImage(post, item, response);
          
          // Enhanced category loading  
          await loadCategory(post, item);
          
          processedPosts.push(post);
          console.log(`getEnhancedBlogPosts: Successfully processed "${title}"`);
          
        } catch (error) {
          console.error(`getEnhancedBlogPosts: Error processing individual post:`, error);
          // Continue processing other posts instead of failing completely
        }
      }

      if (processedPosts.length > 0) {
        // Cache successful results for 30 minutes
        contentfulCache.set(CACHE_KEYS.ALL_BLOG_POSTS, processedPosts, 30 * 60 * 1000);
        console.log(`getEnhancedBlogPosts: Successfully cached ${processedPosts.length} posts`);
        return processedPosts;
      }

    } catch (error) {
      console.error(`getEnhancedBlogPosts: Attempt ${attempt} failed:`, error);
      
      if (attempt === retries) {
        console.log('getEnhancedBlogPosts: All attempts failed, using local fallback');
        return blogPosts;
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  return blogPosts;
};

// Helper function to load featured image with error handling
const loadFeaturedImage = async (post: BlogPost, item: any, response: any): Promise<void> => {
  const featuredImageRef = item.fields.featuredImage;
  if (!featuredImageRef?.sys?.id) return;

  try {
    console.log(`loadFeaturedImage: Loading for "${post.title}"`);
    
    // Try included assets first
    let imageEntry = null;
    if (response.includes?.Asset) {
      imageEntry = response.includes.Asset.find((asset: any) => asset.sys.id === featuredImageRef.sys.id);
    }
    
    // Fetch separately if not in includes
    if (!imageEntry) {
      imageEntry = await contentfulClient.getAsset(featuredImageRef.sys.id);
    }
    
    if (imageEntry?.fields?.file) {
      const fileData = getLocalizedValue(imageEntry.fields.file);
      if (fileData?.url) {
        post.imageUrl = formatImageUrl(fileData.url, { quality: 80, width: 600 });
        console.log(`loadFeaturedImage: Success for "${post.title}"`);
      }
    }
  } catch (error) {
    console.error(`loadFeaturedImage: Error for "${post.title}":`, error);
    // Don't throw - continue without image
  }
};

// Helper function to load category with error handling
const loadCategory = async (post: BlogPost, item: any): Promise<void> => {
  const categoryRef = item.fields.category;
  if (!categoryRef?.sys?.id) return;

  try {
    console.log(`loadCategory: Loading for "${post.title}"`);
    
    const categoryResponse = await contentfulClient.getEntry<CategorySkeleton>(
      categoryRef.sys.id,
      { locale: DEFAULT_LOCALE }
    );
    
    if (categoryResponse?.fields) {
      post.category = getLocalizedValue(categoryResponse.fields.name) || '';
      console.log(`loadCategory: Success for "${post.title}": ${post.category}`);
    }
  } catch (error) {
    console.error(`loadCategory: Error for "${post.title}":`, error);
    // Don't throw - continue without category
  }
};

// Enhanced connectivity test
export const testContentfulConnectivity = async (): Promise<boolean> => {
  try {
    console.log('testContentfulConnectivity: Testing connection...');
    
    const response = await contentfulClient.getEntries({
      content_type: 'blogCarla',
      limit: 1,
      locale: DEFAULT_LOCALE,
    });
    
    console.log('testContentfulConnectivity: Connection successful');
    return true;
  } catch (error) {
    console.error('testContentfulConnectivity: Connection failed:', error);
    return false;
  }
};

// Function to clear and refresh cache
export const refreshContentfulCache = (): void => {
  console.log('refreshContentfulCache: Clearing Contentful cache...');
  contentfulCache.clear();
  console.log('refreshContentfulCache: Cache cleared');
};