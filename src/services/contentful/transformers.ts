
import { BlogPost } from '@/types/BlogPost';
import { getLocalizedValue } from './types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document, BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { Entry, EntryCollection } from 'contentful';
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

// Enhanced rich text to HTML conversion with proper styling and asset handling
export const richTextToHtml = (content: any, entryResponse?: EntryCollection<any>): string => {
  if (!content) {
    console.log('No content provided to richTextToHtml');
    return '';
  }
  
  try {
    console.log('Starting rich text to HTML conversion...');
    
    // Create a map of included assets for quick lookup
    const assetsMap = new Map();
    if (entryResponse?.includes?.Asset) {
      entryResponse.includes.Asset.forEach((asset: any) => {
        assetsMap.set(asset.sys.id, asset);
        console.log(`Asset loaded: ${asset.sys.id} - ${getLocalizedValue(asset.fields?.title) || 'Unknown'}`);
      });
    }
    
    // Define custom options for rich text rendering with proper styling
    const options = {
      renderMark: {
        [MARKS.BOLD]: (text: string) => `<strong class="font-semibold">${text}</strong>`,
        [MARKS.ITALIC]: (text: string) => `<em class="italic">${text}</em>`,
        [MARKS.UNDERLINE]: (text: string) => `<u class="underline">${text}</u>`,
        [MARKS.CODE]: (text: string) => `<code class="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono">${text}</code>`,
      },
      renderNode: {
        // Paragraph with proper spacing
        [BLOCKS.PARAGRAPH]: (node: any, next: any) => `<p class="mb-6 leading-relaxed">${next(node.content)}</p>`,
        
        // Headings with proper spacing, font, and weight
        [BLOCKS.HEADING_1]: (node: any, next: any) => 
          `<h1 class="font-display font-semibold text-3xl md:text-4xl mt-8 mb-4 text-dental-purple">${next(node.content)}</h1>`,
        [BLOCKS.HEADING_2]: (node: any, next: any) => 
          `<h2 class="font-display font-semibold text-2xl md:text-3xl mt-8 mb-4 text-dental-purple">${next(node.content)}</h2>`,
        [BLOCKS.HEADING_3]: (node: any, next: any) => 
          `<h3 class="font-display font-semibold text-xl md:text-2xl mt-8 mb-3 text-dental-purple border-b border-dental-purple/10 pb-2">${next(node.content)}</h3>`,
        [BLOCKS.HEADING_4]: (node: any, next: any) => 
          `<h4 class="font-display font-medium text-lg md:text-xl mt-6 mb-2 text-dental-purple">${next(node.content)}</h4>`,
        [BLOCKS.HEADING_5]: (node: any, next: any) => 
          `<h5 class="font-display font-medium text-base md:text-lg mt-4 mb-2 text-dental-purple">${next(node.content)}</h5>`,
        [BLOCKS.HEADING_6]: (node: any, next: any) => 
          `<h6 class="font-display font-medium text-base mt-4 mb-2 text-dental-purple">${next(node.content)}</h6>`,
        
        // Lists with proper indentation, spacing and visible bullets
        [BLOCKS.UL_LIST]: (node: any, next: any) => 
          `<ul class="list-disc pl-6 mb-6 space-y-2 marker:text-dental-purple">${next(node.content)}</ul>`,
        [BLOCKS.OL_LIST]: (node: any, next: any) => 
          `<ol class="list-decimal pl-6 mb-6 space-y-2 marker:text-dental-purple">${next(node.content)}</ol>`,
        [BLOCKS.LIST_ITEM]: (node: any, next: any) => 
          `<li class="text-dental-purple/90">${next(node.content)}</li>`,
        
        // Block quotes with styling
        [BLOCKS.QUOTE]: (node: any, next: any) => 
          `<blockquote class="border-l-4 border-dental-gold pl-4 italic my-6 py-2 text-dental-purple/80">${next(node.content)}</blockquote>`,
        
        // Horizontal rule
        [BLOCKS.HR]: () => '<hr class="my-8 border-dental-gray/30"/>',
        
        // Enhanced embedded asset/image handling
        [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
          console.log('Processing embedded asset:', node.data?.target?.sys?.id);
          
          // Try to get asset from the node data first
          let asset = node.data?.target;
          
          // If not available in node data, try to get from assets map
          if (!asset?.fields && node.data?.target?.sys?.id) {
            asset = assetsMap.get(node.data.target.sys.id);
            console.log(`Asset found in map: ${asset ? 'Yes' : 'No'}`);
          }
          
          if (asset?.fields) {
            const fields = asset.fields;
            const title = getLocalizedValue(fields.title) || 'Imagem do blog';
            const description = getLocalizedValue(fields.description) || '';
            const file = getLocalizedValue(fields.file);
            
            if (file?.url) {
              let imageUrl = file.url.startsWith('//') ? `https:${file.url}` : file.url;
              
              // Apply Contentful image optimizations
              if (imageUrl.includes('images.ctfassets.net') || imageUrl.includes('downloads.ctfassets.net')) {
                const separator = imageUrl.includes('?') ? '&' : '?';
                imageUrl += `${separator}fm=webp&q=85&w=800`;
              }
              
              console.log(`Rendering embedded image: ${title} - ${imageUrl}`);
              
              return `<figure class="blog-image-container my-8">
                <img 
                  src="${imageUrl}" 
                  alt="${title}" 
                  class="blog-embedded-image rounded-lg mx-auto shadow-sm max-w-full h-auto" 
                  loading="lazy"
                  decoding="async"
                />
                ${description ? `<figcaption class="blog-image-caption text-center text-sm text-dental-gray mt-3 italic">${description}</figcaption>` : ''}
              </figure>`;
            }
          }
          
          console.warn('Embedded asset could not be processed:', node.data);
          return `<div class="my-8 p-4 bg-dental-beige/30 rounded-lg text-center">
            <p class="text-dental-gray/70 text-sm">📷 Imagem não disponível</p>
          </div>`;
        },
        
        // Hyperlinks - Updated to use the same color as text and add underline
        [INLINES.HYPERLINK]: (node: any, next: any) => {
          const url = node.data.uri || '#';
          return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="font-semibold text-dental-purple underline underline-offset-2 decoration-1 hover:decoration-2 transition-all">${next(node.content)}</a>`;
        },
        
        // Entry hyperlinks (internal links) - Updated styling
        [INLINES.ENTRY_HYPERLINK]: (node: any, next: any) => {
          return `<span class="font-semibold text-dental-purple underline underline-offset-2 decoration-1">${next(node.content)}</span>`;
        },
      },
    };
    
    // Process different content formats
    if (content.nodeType && content.content) {
      const html = documentToHtmlString(content, options);
      console.log(`Rich text conversion completed, output length: ${html.length}`);
      return html;
    }
    
    // Try with localized content
    if (typeof content === 'object' && !Array.isArray(content)) {
      if (content[DEFAULT_LOCALE] && content[DEFAULT_LOCALE].nodeType) {
        const html = documentToHtmlString(content[DEFAULT_LOCALE], options);
        console.log(`Rich text conversion completed (localized), output length: ${html.length}`);
        return html;
      }
      
      for (const locale in content) {
        if (content[locale] && content[locale].nodeType) {
          const html = documentToHtmlString(content[locale], options);
          console.log(`Rich text conversion completed (fallback locale), output length: ${html.length}`);
          return html;
        }
      }
    }
    
    // Fallback
    console.log('Using fallback rich text conversion');
    return documentToHtmlString(content, options);
    
  } catch (error) {
    console.error('Error parsing rich text:', error);
    return '<p class="text-red-500">Erro ao renderizar o conteúdo. Por favor, tente novamente mais tarde.</p>';
  }
};
