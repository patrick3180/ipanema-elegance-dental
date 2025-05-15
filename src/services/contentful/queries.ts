
import { Entry } from 'contentful';
import { contentfulClient } from './client';
import { BlogPostSkeleton, CategorySkeleton, ContentfulAsset, ExtendedBlogPostEntry } from './types';
import { transformBlogPostEntry, richTextToHtml } from './transformers';
import { formatImageUrl } from './client';
import { BlogPost } from '@/types/BlogPost';

// Get related content (categories, images) for blog posts
const getRelatedContent = async (entries: Entry<BlogPostSkeleton>[]) => {
  // Build a list of all required asset IDs and category IDs
  const assetIds: string[] = [];
  const categoryIds: string[] = [];

  entries.forEach(entry => {
    const fields = entry.fields;
    
    // Collect featured image references
    if (fields.featuredImage && fields.featuredImage.sys && 'id' in fields.featuredImage.sys) {
      assetIds.push(fields.featuredImage.sys.id);
    }
    
    // Collect category references
    if (fields.category && fields.category.sys && 'id' in fields.category.sys) {
      categoryIds.push(fields.category.sys.id);
    }
  });

  // Create a map to hold assets and categories
  const assets: Record<string, ContentfulAsset> = {};
  const categories: Record<string, Entry<CategorySkeleton>> = {};

  // Fetch all required assets if needed
  if (assetIds.length > 0) {
    const assetEntries = await contentfulClient.getAssets({
      'sys.id[in]': assetIds
    });
    
    assetEntries.items.forEach(asset => {
      assets[asset.sys.id] = asset as unknown as ContentfulAsset;
    });
  }

  // Fetch all required categories if needed
  if (categoryIds.length > 0) {
    const categoryEntries = await contentfulClient.getEntries<CategorySkeleton>({
      'sys.id[in]': categoryIds,
      content_type: 'categoria'
    });
    
    categoryEntries.items.forEach(category => {
      categories[category.sys.id] = category as Entry<CategorySkeleton>;
    });
  }

  // Populate references in the entries
  return entries.map(entry => {
    const fields = entry.fields;
    const result = { ...entry } as ExtendedBlogPostEntry;
    const extendedFields = { ...fields } as any;

    // Populate featured image
    if (fields.featuredImage && fields.featuredImage.sys && 'id' in fields.featuredImage.sys) {
      const assetId = fields.featuredImage.sys.id;
      if (assets[assetId]) {
        const imageUrl = assets[assetId].fields.file?.url;
        extendedFields.imageUrl = formatImageUrl(imageUrl);
      }
    }

    // Populate category
    if (fields.category && fields.category.sys && 'id' in fields.category.sys) {
      const categoryId = fields.category.sys.id;
      if (categories[categoryId]) {
        extendedFields.categoryName = categories[categoryId].fields.name || '';
        extendedFields.categorySlug = categories[categoryId].fields.slug || '';
      }
    }

    (result as any).fields = extendedFields;
    return result;
  });
};

// Get all blog posts
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const entries = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogCarla',
      order: ['-fields.publishDate'],
    });

    if (entries.items.length === 0) {
      return [];
    }

    // Get related content for all entries
    const entriesWithRelatedContent = await getRelatedContent(entries.items);

    // Transform entries into blog posts
    return entriesWithRelatedContent.map((entry: ExtendedBlogPostEntry) => {
      const transformedPost = transformBlogPostEntry(entry as unknown as Entry<BlogPostSkeleton>);
      
      // Add the related content data
      if (entry.fields.categoryName) {
        transformedPost.category = entry.fields.categoryName;
      }

      if (entry.fields.imageUrl) {
        transformedPost.imageUrl = entry.fields.imageUrl;
      }
      
      // Convert rich text to HTML
      if (entry.fields.content) {
        transformedPost.content = richTextToHtml(entry.fields.content);
      }
      
      return transformedPost;
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

// Get a single blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const entries = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogCarla',
      'fields.slug': slug,
    });

    if (entries.items.length === 0) {
      return null;
    }

    // Get related content for the entry
    const entriesWithRelatedContent = await getRelatedContent(entries.items);
    const entry = entriesWithRelatedContent[0] as ExtendedBlogPostEntry;

    // Transform entry into blog post
    const transformedPost = transformBlogPostEntry(entry as unknown as Entry<BlogPostSkeleton>);
    
    // Add the related content data
    if (entry.fields.categoryName) {
      transformedPost.category = entry.fields.categoryName;
    }

    if (entry.fields.imageUrl) {
      transformedPost.imageUrl = entry.fields.imageUrl;
    }
    
    // Convert rich text to HTML
    if (entry.fields.content) {
      transformedPost.content = richTextToHtml(entry.fields.content);
    }
    
    return transformedPost;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
};

// Get all categories
export const getAllCategories = async (): Promise<string[]> => {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'categoria',
    });

    return entries.items.map((entry: any) => entry.fields.name);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Filter blog posts by category
export const getBlogPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  try {
    // First get category entry by name
    const categoryEntries = await contentfulClient.getEntries({
      content_type: 'categoria',
      'fields.name': category,
    });

    if (categoryEntries.items.length === 0) {
      return [];
    }

    // Use the category ID to filter blog posts
    const categoryId = categoryEntries.items[0].sys.id;
    
    const entries = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogCarla',
      'fields.category.sys.id': categoryId,
      order: ['-fields.publishDate'],
    });

    // Get related content for all entries
    const entriesWithRelatedContent = await getRelatedContent(entries.items);

    // Transform entries into blog posts
    return entriesWithRelatedContent.map((entry: ExtendedBlogPostEntry) => {
      const transformedPost = transformBlogPostEntry(entry as unknown as Entry<BlogPostSkeleton>);
      
      // Add the related content data
      if (entry.fields.categoryName) {
        transformedPost.category = entry.fields.categoryName;
      }

      if (entry.fields.imageUrl) {
        transformedPost.imageUrl = entry.fields.imageUrl;
      }
      
      // Convert rich text to HTML
      if (entry.fields.content) {
        transformedPost.content = richTextToHtml(entry.fields.content);
      }
      
      return transformedPost;
    });
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }
};
