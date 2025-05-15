
import { BlogPost } from '@/types/BlogPost';
import { transformBlogPostEntry, richTextToHtml } from './transformers';
import { formatImageUrl } from './client';
import { getLocalizedValue } from './types';
import { blogPosts, getBlogPostBySlug as getLocalBlogPostBySlug } from '@/data/blogPosts';

// Get all blog posts
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    // For now, just return our local blog posts
    return blogPosts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Fallback to local data if Contentful fails
    return blogPosts;
  }
};

// Get a single blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    // For now, just return a local blog post
    const post = getLocalBlogPostBySlug(slug);
    return post || null;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    // Fallback to local data if Contentful fails
    return getLocalBlogPostBySlug(slug) || null;
  }
};

// Get all categories
export const getAllCategories = async (): Promise<string[]> => {
  try {
    // Extract unique categories from local blog posts
    const categories = blogPosts.map(post => post.category);
    return [...new Set(categories)];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Filter blog posts by category
export const getBlogPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  try {
    // Filter local blog posts by category
    return blogPosts.filter(post => post.category === category);
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }
};
