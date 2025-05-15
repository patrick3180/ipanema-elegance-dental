
import { BlogPost } from '@/types/BlogPost';
import { getLocalizedValue } from './types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';

// Transform Contentful data to our BlogPost format
export const transformBlogPostEntry = (entry: any): BlogPost => {
  // Extract fields
  const fields = entry.fields;
  
  return {
    id: entry.sys.id,
    slug: getLocalizedValue(fields.slug) || '',
    title: getLocalizedValue(fields.title) || '',
    excerpt: getLocalizedValue(fields.excerpt) || '',
    content: '', // Will be populated with HTML content later
    author: getLocalizedValue(fields.author) || 'Admin',
    date: fields.publishDate ? new Date(getLocalizedValue(fields.publishDate) || '').toLocaleDateString('pt-BR') : '',
    imageUrl: '', // Will be populated with image URL later
    category: '', // Will be populated with category name later
    metaDescription: getLocalizedValue(fields.metaDescription) || '',
    tags: Array.isArray(getLocalizedValue(fields.tags)) ? getLocalizedValue(fields.tags) : [],
  };
};

// Convert rich text content to HTML
export const richTextToHtml = (content: Document | any | undefined): string => {
  if (!content) {
    return '';
  }
  
  try {
    // Handle localized content
    const document = getLocalizedValue(content) || content;
    
    if (!document) return '';
    
    // Use contentful's rich-text-html-renderer
    return documentToHtmlString(document);
  } catch (error) {
    console.error('Error parsing rich text:', error);
    return '<p>Error rendering content</p>';
  }
};
