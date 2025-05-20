
import { BlogPost } from '@/types/BlogPost';
import { getLocalizedValue } from './types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document, BLOCKS } from '@contentful/rich-text-types';
import { Entry } from 'contentful';
import { BlogPostSkeleton } from './types';
import { DEFAULT_LOCALE } from './client';

// Transform Contentful data to our BlogPost format
export const transformBlogPostEntry = (entry: Entry<BlogPostSkeleton>): BlogPost => {
  // Extract fields
  const fields = entry.fields;
  
  // Create the BlogPost object
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

// Convert rich text content to HTML with improved error handling
export const richTextToHtml = (content: any): string => {
  if (!content) {
    return '';
  }
  
  try {
    // Direct approach - if it's already a Document object
    if (content.nodeType && content.content) {
      return documentToHtmlString(content, {
        renderNode: {
          // Add custom renderers for common block types
          [BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content)}</p>`,
          [BLOCKS.HEADING_1]: (node, next) => `<h1>${next(node.content)}</h1>`,
          [BLOCKS.HEADING_2]: (node, next) => `<h2>${next(node.content)}</h2>`,
          [BLOCKS.HEADING_3]: (node, next) => `<h3>${next(node.content)}</h3>`,
          [BLOCKS.HEADING_4]: (node, next) => `<h4>${next(node.content)}</h4>`,
          [BLOCKS.HEADING_5]: (node, next) => `<h5>${next(node.content)}</h5>`,
          [BLOCKS.HEADING_6]: (node, next) => `<h6>${next(node.content)}</h6>`,
          [BLOCKS.UL_LIST]: (node, next) => `<ul>${next(node.content)}</ul>`,
          [BLOCKS.OL_LIST]: (node, next) => `<ol>${next(node.content)}</ol>`,
          [BLOCKS.LIST_ITEM]: (node, next) => `<li>${next(node.content)}</li>`,
          [BLOCKS.QUOTE]: (node, next) => `<blockquote>${next(node.content)}</blockquote>`,
          [BLOCKS.HR]: () => '<hr/>',
        }
      });
    }
    
    // Contentful sometimes nests the document under the locale
    if (typeof content === 'object' && !Array.isArray(content)) {
      // Try with the default locale
      if (content[DEFAULT_LOCALE] && content[DEFAULT_LOCALE].nodeType) {
        return documentToHtmlString(content[DEFAULT_LOCALE]);
      }
      
      // Try with any locale if default doesn't work
      for (const locale in content) {
        if (content[locale] && content[locale].nodeType) {
          return documentToHtmlString(content[locale]);
        }
      }
    }
    
    // Fallback: Just try to use the content as is
    return documentToHtmlString(content);
    
  } catch (error) {
    console.error('Error parsing rich text:', error);
    return '<p>Erro ao renderizar o conteúdo. Por favor, tente novamente mais tarde.</p>';
  }
};
