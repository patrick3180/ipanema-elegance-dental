
import { Entry, Asset } from 'contentful';
import { contentfulClient } from './client';
import { BlogPostSkeleton, CategorySkeleton, getLocalizedValue } from './types';
import { transformBlogPostEntry, richTextToHtml } from './transformers';
import { formatImageUrl } from './client';
import { BlogPost } from '@/types/BlogPost';
import { Document } from '@contentful/rich-text-types';

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

    // Transform entries into blog posts
    const posts = await Promise.all(entries.items.map(async (entry) => {
      // Create the base transformed post
      const transformedPost = transformBlogPostEntry(entry);
      
      // Process category reference if it exists
      if (entry.fields.category) {
        try {
          // Get the category ID safely
          const categoryLink = entry.fields.category;
          const categoryId = categoryLink.sys?.id;
          
          if (categoryId) {
            // Get the category entry
            const categoryEntry = await contentfulClient.getEntry<CategorySkeleton>(categoryId);
            transformedPost.category = getLocalizedValue(categoryEntry.fields.name) || '';
            transformedPost.categorySlug = getLocalizedValue(categoryEntry.fields.slug) || '';
          }
        } catch (err) {
          console.error('Error fetching category:', err);
        }
      }
      
      // Process featured image if it exists
      if (entry.fields.featuredImage) {
        try {
          // Get the asset ID safely
          const assetLink = entry.fields.featuredImage;
          const assetId = assetLink.sys?.id;
          
          if (assetId) {
            // Get the asset
            const asset = await contentfulClient.getAsset(assetId);
            const fileUrl = getLocalizedValue(asset.fields.file)?.url;
            if (fileUrl) {
              transformedPost.imageUrl = formatImageUrl(fileUrl);
            }
          }
        } catch (err) {
          console.error('Error fetching image:', err);
        }
      }
      
      // Convert rich text to HTML
      if (entry.fields.content) {
        const contentDocument = getLocalizedValue(entry.fields.content) as Document;
        transformedPost.content = richTextToHtml(contentDocument);
      }
      
      return transformedPost;
    }));
    
    return posts;
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

    const entry = entries.items[0];
    
    // Transform entry into blog post
    const transformedPost = transformBlogPostEntry(entry);
    
    // Process category reference if it exists
    if (entry.fields.category) {
      try {
        // Get the category ID safely
        const categoryLink = entry.fields.category;
        const categoryId = categoryLink.sys?.id;
        
        if (categoryId) {
          // Get the category entry
          const categoryEntry = await contentfulClient.getEntry<CategorySkeleton>(categoryId);
          transformedPost.category = getLocalizedValue(categoryEntry.fields.name) || '';
          transformedPost.categorySlug = getLocalizedValue(categoryEntry.fields.slug) || '';
        }
      } catch (err) {
        console.error('Error fetching category:', err);
      }
    }
    
    // Process featured image if it exists
    if (entry.fields.featuredImage) {
      try {
        // Get the asset ID safely
        const assetLink = entry.fields.featuredImage;
        const assetId = assetLink.sys?.id;
        
        if (assetId) {
          // Get the asset
          const asset = await contentfulClient.getAsset(assetId);
          const fileUrl = getLocalizedValue(asset.fields.file)?.url;
          if (fileUrl) {
            transformedPost.imageUrl = formatImageUrl(fileUrl);
          }
        }
      } catch (err) {
        console.error('Error fetching image:', err);
      }
    }
    
    // Convert rich text to HTML
    if (entry.fields.content) {
      const contentDocument = getLocalizedValue(entry.fields.content) as Document;
      transformedPost.content = richTextToHtml(contentDocument);
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
    const entries = await contentfulClient.getEntries<CategorySkeleton>({
      content_type: 'categoria',
    });

    return entries.items.map((entry) => {
      return getLocalizedValue(entry.fields.name) || '';
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Filter blog posts by category
export const getBlogPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  try {
    // First get category entry by name
    const categoryEntries = await contentfulClient.getEntries<CategorySkeleton>({
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

    // Transform entries into blog posts
    const posts = await Promise.all(entries.items.map(async (entry) => {
      // Create the base transformed post
      const transformedPost = transformBlogPostEntry(entry);
      
      // Category is already known
      transformedPost.category = category;
      
      // Process featured image if it exists
      if (entry.fields.featuredImage) {
        try {
          // Get the asset ID safely
          const assetLink = entry.fields.featuredImage;
          const assetId = assetLink.sys?.id;
          
          if (assetId) {
            // Get the asset
            const asset = await contentfulClient.getAsset(assetId);
            const fileUrl = getLocalizedValue(asset.fields.file)?.url;
            if (fileUrl) {
              transformedPost.imageUrl = formatImageUrl(fileUrl);
            }
          }
        } catch (err) {
          console.error('Error fetching image:', err);
        }
      }
      
      // Convert rich text to HTML
      if (entry.fields.content) {
        const contentDocument = getLocalizedValue(entry.fields.content) as Document;
        transformedPost.content = richTextToHtml(contentDocument);
      }
      
      return transformedPost;
    }));
    
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }
};
