
import { BlogPost } from '@/types/BlogPost';
import { getLocalizedValue } from './types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';
import { Entry } from 'contentful';
import { BlogPostSkeleton } from './types';

// Transform Contentful data to our BlogPost format
export const transformBlogPostEntry = (entry: Entry<BlogPostSkeleton>): BlogPost => {
  // Extract fields
  const fields = entry.fields;
  
  // Debug what we're getting from contentful
  console.log('Transforming entry:', entry.sys.id);
  console.log('Entry fields:', JSON.stringify(fields, null, 2));
  
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

// Convert rich text content to HTML with improved error handling and debugging
export const richTextToHtml = (content: Document | any | undefined): string => {
  if (!content) {
    console.log('Rich text content is empty or undefined');
    return '';
  }
  
  try {
    // Debug content structure
    console.log('Rich text content type:', typeof content);
    
    // Handle localized content
    const document = getLocalizedValue(content) || content;
    
    if (!document) {
      console.log('Failed to extract localized content');
      return '';
    }
    
    console.log('Document structure:', JSON.stringify({
      nodeType: document.nodeType,
      hasContent: !!document.content,
      contentLength: document.content?.length
    }));
    
    // Enhanced rendering options
    const options = {
      renderNode: {
        // Add custom renderers for specific node types if needed
      }
    };
    
    // Use contentful's rich-text-html-renderer with options
    const htmlContent = documentToHtmlString(document, options);
    console.log('Generated HTML length:', htmlContent.length);
    
    return htmlContent;
  } catch (error) {
    console.error('Error parsing rich text:', error);
    return '<p>Error rendering content</p>';
  }
};
