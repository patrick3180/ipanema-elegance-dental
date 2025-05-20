
import { BlogPost } from '@/types/BlogPost';
import { contentfulClient, formatImageUrl } from './client';
import { transformBlogPostEntry, richTextToHtml } from './transformers';
import { getLocalizedValue, BlogPostSkeleton, CategorySkeleton } from './types';
import { blogPosts, getBlogPostBySlug as getLocalBlogPostBySlug } from '@/data/blogPosts';
import { Entry, Asset, ContentfulClientApi } from 'contentful';

// Get all blog posts from Contentful
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    console.log('Getting all blog posts from Contentful');
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogCarla',
      order: ['-sys.createdAt'],
      include: 10 // Increase include depth to ensure we get all related content
    });

    console.log(`Found ${response.items.length} blog posts in Contentful`);

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
            console.log(`Processing content for post: ${post.title}`);
            const contentRichText = getLocalizedValue(item.fields.content);
            
            if (contentRichText) {
              post.content = await richTextToHtml(contentRichText);
              console.log(`Content HTML length: ${post.content.length}`);
            } else {
              console.log('No localized content found');
            }
          } catch (error) {
            console.error('Error converting rich text to HTML:', error);
          }
        } else {
          console.log(`Post ${post.title} has no content field`);
        }
        
        // Get category
        const categoryRef = item.fields.category;
        if (categoryRef) {
          try {
            const categoryResponse = await contentfulClient.getEntries<CategorySkeleton>({
              content_type: 'categoria',
              'sys.id': categoryRef.sys.id,
            });
            
            if (categoryResponse.items && categoryResponse.items.length > 0) {
              post.category = getLocalizedValue(categoryResponse.items[0].fields.name) || '';
            }
          } catch (error) {
            console.error('Error fetching category:', error);
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

// Get a single blog post by slug from Contentful with improved debugging
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    console.log(`Getting blog post with slug: ${slug} from Contentful`);
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogCarla',
      'fields.slug': slug,
      limit: 1,
      include: 10 // Increase include depth to ensure we get all related content
    });

    console.log(`Found ${response.items.length} blog posts with slug ${slug}`);

    if (!response.items || response.items.length === 0) {
      console.log(`Blog post with slug ${slug} not found in Contentful, using local data`);
      return getLocalBlogPostBySlug(slug);
    }

    const item = response.items[0];
    console.log(`Found blog post: ${item.sys.id}`);
    
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
            console.log(`Set image URL: ${post.imageUrl}`);
          }
        }
      } catch (error) {
        console.error('Error fetching featured image:', error);
      }
    }
    
    // Convert rich text to HTML for content with extra debugging
    if (item.fields.content) {
      try {
        console.log(`Processing content for post: ${post.title}`);
        const contentRichText = getLocalizedValue(item.fields.content);
        
        if (contentRichText) {
          console.log('Content structure type:', typeof contentRichText);
          console.log('Content node type:', contentRichText.nodeType);
          
          post.content = await richTextToHtml(contentRichText);
          console.log(`Content HTML length: ${post.content.length}`);
          
          // If content is empty or very short but we know there should be content,
          // try using the raw content field as a fallback
          if (post.content.length < 10 && item.fields.content) {
            console.log('Content seems too short, trying direct approach');
            try {
              // Try direct access to content
              const directContent = item.fields.content;
              post.content = await richTextToHtml(directContent);
              console.log(`Direct content HTML length: ${post.content.length}`);
            } catch (err) {
              console.error('Error with direct content approach:', err);
            }
          }
        } else {
          console.log('No localized content found');
        }
      } catch (error) {
        console.error('Error converting rich text to HTML:', error);
      }
    } else {
      console.log(`Post ${post.title} has no content field`);
    }
    
    // Get category
    const categoryRef = item.fields.category;
    if (categoryRef) {
      try {
        const categoryResponse = await contentfulClient.getEntries<CategorySkeleton>({
          content_type: 'categoria',
          'sys.id': categoryRef.sys.id,
        });
        
        if (categoryResponse.items && categoryResponse.items.length > 0) {
          post.category = getLocalizedValue(categoryResponse.items[0].fields.name) || '';
          console.log(`Set category: ${post.category}`);
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
