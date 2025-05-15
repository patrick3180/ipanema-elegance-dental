
import { Entry } from 'contentful';
import { BlogPost } from '@/types/BlogPost';
import { BlogPostSkeleton, CategorySkeleton } from './types';
import { formatImageUrl } from './client';

// Transform Contentful data to our BlogPost format
export const transformBlogPostEntry = (entry: Entry<BlogPostSkeleton>): BlogPost => {
  // Extract fields
  const fields = entry.fields;
  
  return {
    id: entry.sys.id,
    slug: fields.slug,
    title: fields.title,
    excerpt: fields.excerpt || '',
    content: fields.content ? '' : '', // Will be populated with HTML content later
    author: fields.author || 'Admin',
    date: fields.publishDate ? new Date(fields.publishDate).toLocaleDateString('pt-BR') : '',
    imageUrl: '', // Will be populated with image URL later
    category: '', // Will be populated with category name later
    metaDescription: fields.metaDescription || '',
    tags: fields.tags || [],
  };
};

// Convert rich text content to HTML
export const richTextToHtml = (content: any): string => {
  if (!content || !content.content) {
    return '';
  }
  
  // Basic implementation for rich text conversion
  try {
    let html = '';
    
    const processNode = (node: any): string => {
      if (node.nodeType === 'text') {
        let text = node.value;
        if (node.marks && node.marks.length > 0) {
          node.marks.forEach((mark: any) => {
            if (mark.type === 'bold') {
              text = `<strong>${text}</strong>`;
            } else if (mark.type === 'italic') {
              text = `<em>${text}</em>`;
            } else if (mark.type === 'underline') {
              text = `<u>${text}</u>`;
            }
          });
        }
        return text;
      } else if (node.nodeType === 'paragraph') {
        return `<p>${node.content.map(processNode).join('')}</p>`;
      } else if (node.nodeType === 'heading-1') {
        return `<h1>${node.content.map(processNode).join('')}</h1>`;
      } else if (node.nodeType === 'heading-2') {
        return `<h2>${node.content.map(processNode).join('')}</h2>`;
      } else if (node.nodeType === 'heading-3') {
        return `<h3>${node.content.map(processNode).join('')}</h3>`;
      } else if (node.nodeType === 'heading-4') {
        return `<h4>${node.content.map(processNode).join('')}</h4>`;
      } else if (node.nodeType === 'heading-5') {
        return `<h5>${node.content.map(processNode).join('')}</h5>`;
      } else if (node.nodeType === 'heading-6') {
        return `<h6>${node.content.map(processNode).join('')}</h6>`;
      } else if (node.nodeType === 'unordered-list') {
        return `<ul>${node.content.map(processNode).join('')}</ul>`;
      } else if (node.nodeType === 'ordered-list') {
        return `<ol>${node.content.map(processNode).join('')}</ol>`;
      } else if (node.nodeType === 'list-item') {
        return `<li>${node.content.map(processNode).join('')}</li>`;
      } else if (node.nodeType === 'hyperlink') {
        return `<a href="${node.data.uri}" target="_blank">${node.content.map(processNode).join('')}</a>`;
      } else if (node.nodeType === 'embedded-asset-block') {
        return `<div class="embedded-asset">[Embedded Asset]</div>`;
      } else if (node.content && Array.isArray(node.content)) {
        return node.content.map(processNode).join('');
      }
      
      return '';
    };
    
    content.content.forEach((node: any) => {
      html += processNode(node);
    });
    
    return html;
  } catch (error) {
    console.error('Error parsing rich text:', error);
    return '<p>Error rendering content</p>';
  }
};
