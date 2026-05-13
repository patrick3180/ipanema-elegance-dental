
import { BlogPost, ComparisonTableItem, FAQItem, PeopleAlsoAskSection } from '@/types/BlogPost';
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
    author: getLocalizedValue(fields.author) || getLocalizedValue(fields.autor) || 'Admin',
    date: fields.publishDate ? new Date(getLocalizedValue(fields.publishDate) || '').toLocaleDateString('pt-BR') : '',
    imageUrl: '', // Will be populated with image URL later
    category: '', // Will be populated with category name later
    metaDescription: getLocalizedValue(fields.metaDescription) || '',
    tags: Array.isArray(getLocalizedValue(fields.tags)) ? getLocalizedValue(fields.tags) : [],
    
    // NOVOS CAMPOS
    // Lê primeiro o campo correto `quickAnswerBox`; fallback ao campo histórico com typo durante migração.
    quickAnswer:
      getLocalizedValue((fields as any).quickAnswerBox) ||
      getLocalizedValue(fields.quickAnswerBoquickAnswerBoxx) ||
      '',
    keyTakeaways: Array.isArray(getLocalizedValue(fields.keyTakeaways)) ? getLocalizedValue(fields.keyTakeaways) : undefined,
    comparisonTable: transformComparisonTable(getLocalizedValue(fields.comparisonTable)),
    faqStructured: transformFAQStructured(getLocalizedValue(fields.faqStructured)),
    peopleAlsoAsk: transformPeopleAlsoAsk(getLocalizedValue(fields.peopleAlsoAsk)),
    schemaType: getLocalizedValue(fields.schemaType) || 'Article',
    authorBio: getLocalizedValue(fields.authorBio) || '',
    publishDate: getLocalizedValue(fields.publishDate) || getLocalizedValue(fields.dataDePublicacao) || '',
  };
};

// Enhanced rich text to HTML conversion with improved asset handling
export const richTextToHtml = (content: any, entryResponse?: EntryCollection<any>): string => {
  if (!content) {
    console.log('richTextToHtml: No content provided');
    return '';
  }
  
  try {
    console.log('richTextToHtml: Starting conversion...', {
      hasContent: !!content,
      hasEntryResponse: !!entryResponse,
      includesAssets: !!entryResponse?.includes?.Asset,
      assetsCount: entryResponse?.includes?.Asset?.length || 0
    });
    
    // Create enhanced asset mapping with multiple fallback strategies
    const assetsMap = new Map();
    const allAssets = [];
    
    // Collect assets from multiple sources
    if (entryResponse?.includes?.Asset) {
      entryResponse.includes.Asset.forEach((asset: any) => {
        if (asset && asset.sys && asset.sys.id) {
          assetsMap.set(asset.sys.id, asset);
          allAssets.push(asset);
          console.log(`richTextToHtml: Asset mapped - ID: ${asset.sys.id}, Title: ${getLocalizedValue(asset.fields?.title) || 'No title'}`);
        }
      });
    }
    
    // Also check for assets in the main entry
    if (entryResponse?.items) {
      entryResponse.items.forEach((item: any) => {
        if (item.fields?.featuredImage && item.fields.featuredImage.sys?.id) {
          const assetId = item.fields.featuredImage.sys.id;
          if (!assetsMap.has(assetId)) {
            console.log(`richTextToHtml: Found featured image reference: ${assetId}`);
          }
        }
      });
    }
    
    console.log(`richTextToHtml: Total assets mapped: ${assetsMap.size}`);
    
    // Define custom options for rich text rendering with enhanced styling
    const options = {
      renderMark: {
        [MARKS.BOLD]: (text: string) => `<strong class="font-semibold text-dental-purple">${text}</strong>`,
        [MARKS.ITALIC]: (text: string) => `<em class="italic">${text}</em>`,
        [MARKS.UNDERLINE]: (text: string) => `<u class="underline">${text}</u>`,
        [MARKS.CODE]: (text: string) => `<code class="bg-dental-beige/30 rounded px-2 py-1 text-sm font-mono text-dental-purple">${text}</code>`,
      },
      renderNode: {
        // Paragraph with proper spacing
        [BLOCKS.PARAGRAPH]: (node: any, next: any) => `<p class="mb-6 leading-relaxed text-dental-purple/90">${next(node.content)}</p>`,
        
        // Enhanced headings with better styling
        [BLOCKS.HEADING_1]: (node: any, next: any) => 
          `<h1 class="font-display font-semibold text-3xl md:text-4xl mt-10 mb-6 text-dental-purple border-b-2 border-dental-gold/30 pb-3">${next(node.content)}</h1>`,
        [BLOCKS.HEADING_2]: (node: any, next: any) => 
          `<h2 class="font-display font-semibold text-2xl md:text-3xl mt-8 mb-5 text-dental-purple">${next(node.content)}</h2>`,
        [BLOCKS.HEADING_3]: (node: any, next: any) => 
          `<h3 class="font-display font-semibold text-xl md:text-2xl mt-8 mb-4 text-dental-purple border-b border-dental-purple/10 pb-2">${next(node.content)}</h3>`,
        [BLOCKS.HEADING_4]: (node: any, next: any) => 
          `<h4 class="font-display font-medium text-lg md:text-xl mt-6 mb-3 text-dental-purple">${next(node.content)}</h4>`,
        [BLOCKS.HEADING_5]: (node: any, next: any) => 
          `<h5 class="font-display font-medium text-base md:text-lg mt-5 mb-2 text-dental-purple">${next(node.content)}</h5>`,
        [BLOCKS.HEADING_6]: (node: any, next: any) => 
          `<h6 class="font-display font-medium text-base mt-4 mb-2 text-dental-purple">${next(node.content)}</h6>`,
        
        // Enhanced lists with better styling
        [BLOCKS.UL_LIST]: (node: any, next: any) => 
          `<ul class="list-disc pl-8 mb-6 space-y-3 marker:text-dental-purple">${next(node.content)}</ul>`,
        [BLOCKS.OL_LIST]: (node: any, next: any) => 
          `<ol class="list-decimal pl-8 mb-6 space-y-3 marker:text-dental-purple">${next(node.content)}</ol>`,
        [BLOCKS.LIST_ITEM]: (node: any, next: any) => 
          `<li class="text-dental-purple/90 leading-relaxed">${next(node.content)}</li>`,
        
        // Enhanced block quotes
        [BLOCKS.QUOTE]: (node: any, next: any) => 
          `<blockquote class="border-l-4 border-dental-gold bg-dental-beige/20 pl-6 pr-4 py-4 italic my-8 rounded-r-lg text-dental-purple/80">${next(node.content)}</blockquote>`,
        
        // Horizontal rule
        [BLOCKS.HR]: () => '<hr class="my-8 border-dental-gray/30 border-t-2"/>',
        
        // CRITICAL: Enhanced embedded asset/image handling with multiple fallback strategies
        [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
          const assetId = node.data?.target?.sys?.id;
          console.log(`richTextToHtml: Processing embedded asset with ID: ${assetId}`);
          
          if (!assetId) {
            console.warn('richTextToHtml: No asset ID found in embedded asset node');
            return `<div class="my-8 p-6 bg-dental-beige/30 rounded-lg text-center border border-dental-gray/20">
              <p class="text-dental-gray/70 text-sm">📷 Asset ID não encontrado</p>
            </div>`;
          }
          
          // Try multiple strategies to get the asset
          let asset = null;
          
          // Strategy 1: Direct asset from node data
          if (node.data?.target?.fields) {
            asset = node.data.target;
            console.log('richTextToHtml: Asset found in node data');
          }
          // Strategy 2: Asset from assets map
          else if (assetsMap.has(assetId)) {
            asset = assetsMap.get(assetId);
            console.log('richTextToHtml: Asset found in assets map');
          }
          // Strategy 3: Search through all available assets
          else {
            asset = allAssets.find(a => a.sys?.id === assetId);
            if (asset) {
              console.log('richTextToHtml: Asset found by searching all assets');
            }
          }
          
          if (!asset || !asset.fields) {
            console.warn(`richTextToHtml: Asset not found for ID: ${assetId}. Available assets:`, allAssets.map(a => a.sys?.id));
            return `<div class="my-8 p-6 bg-dental-beige/30 rounded-lg text-center border border-dental-gray/20">
              <p class="text-dental-gray/70 text-sm">📷 Imagem não encontrada (ID: ${assetId})</p>
            </div>`;
          }
          
          const fields = asset.fields;
          const title = getLocalizedValue(fields.title) || 'Imagem do blog';
          const description = getLocalizedValue(fields.description) || '';
          const file = getLocalizedValue(fields.file);
          
          console.log(`richTextToHtml: Processing asset "${title}":`, {
            title,
            description,
            hasFile: !!file,
            fileUrl: file?.url
          });
          
          if (!file || !file.url) {
            console.warn(`richTextToHtml: No file URL found for asset: ${title}`);
            return `<div class="my-8 p-6 bg-dental-beige/30 rounded-lg text-center border border-dental-gray/20">
              <p class="text-dental-gray/70 text-sm">📷 URL da imagem não disponível</p>
              <p class="text-dental-gray/60 text-xs mt-1">${title}</p>
            </div>`;
          }
          
          // Build optimized image URL
          let imageUrl = file.url;
          
          // Ensure HTTPS
          if (imageUrl.startsWith('//')) {
            imageUrl = `https:${imageUrl}`;
          }
          
          // Apply Contentful optimizations for supported image types
          if (imageUrl.includes('images.ctfassets.net') || imageUrl.includes('downloads.ctfassets.net')) {
            const url = new URL(imageUrl);
            
            // Clear existing params to avoid conflicts
            url.searchParams.delete('fm');
            url.searchParams.delete('q');
            url.searchParams.delete('w');
            url.searchParams.delete('h');
            url.searchParams.delete('fit');
            
            // Apply optimizations with reduced quality for performance
            url.searchParams.set('fm', 'webp');
            url.searchParams.set('q', '75');
            url.searchParams.set('w', '800');
            url.searchParams.set('fit', 'fill');
            
            imageUrl = url.toString();
          }
          
          console.log(`richTextToHtml: Final image URL: ${imageUrl}`);
          
          // Generate enhanced HTML with better error handling and styling
          return `<figure class="blog-image-container my-10 text-center">
            <div class="relative inline-block max-w-full">
              <img 
                src="${imageUrl}" 
                alt="${title}" 
                class="blog-embedded-image rounded-xl mx-auto shadow-lg max-w-full h-auto transition-all duration-300 hover:shadow-xl" 
                loading="lazy"
                decoding="async"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                onload="console.log('Image loaded successfully: ${title}');"
              />
              <div class="hidden p-6 bg-dental-beige/30 rounded-xl text-center border border-dental-gray/20">
                <p class="text-dental-gray/70 text-sm">📷 Erro ao carregar imagem</p>
                <p class="text-dental-gray/60 text-xs mt-1">${title}</p>
              </div>
            </div>
            ${description ? `<figcaption class="blog-image-caption text-center text-sm text-dental-gray mt-4 italic max-w-2xl mx-auto">${description}</figcaption>` : ''}
          </figure>`;
        },
        
        // Enhanced hyperlinks
        [INLINES.HYPERLINK]: (node: any, next: any) => {
          const url = node.data.uri || '#';
          return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="font-semibold text-dental-purple underline underline-offset-2 decoration-2 hover:decoration-dental-gold transition-all duration-200">${next(node.content)}</a>`;
        },
        
        // Entry hyperlinks (internal links)
        [INLINES.ENTRY_HYPERLINK]: (node: any, next: any) => {
          return `<span class="font-semibold text-dental-purple underline underline-offset-2 decoration-1">${next(node.content)}</span>`;
        },
      },
    };
    
    // Process different content formats with enhanced error handling
    let html = '';
    
    if (content.nodeType && content.content) {
      html = documentToHtmlString(content, options);
      console.log(`richTextToHtml: Direct conversion completed, length: ${html.length}`);
    }
    // Try with localized content
    else if (typeof content === 'object' && !Array.isArray(content)) {
      if (content[DEFAULT_LOCALE] && content[DEFAULT_LOCALE].nodeType) {
        html = documentToHtmlString(content[DEFAULT_LOCALE], options);
        console.log(`richTextToHtml: Localized conversion completed, length: ${html.length}`);
      } else {
        // Try any available locale
        for (const locale in content) {
          if (content[locale] && content[locale].nodeType) {
            html = documentToHtmlString(content[locale], options);
            console.log(`richTextToHtml: Fallback locale (${locale}) conversion completed, length: ${html.length}`);
            break;
          }
        }
      }
    }
    
    // Final fallback
    if (!html) {
      console.log('richTextToHtml: Using final fallback conversion');
      html = documentToHtmlString(content, options);
    }
    
    // Validate and enhance HTML output
    if (!html || html.trim().length === 0) {
      console.warn('richTextToHtml: Generated HTML is empty');
      return '<p class="text-dental-gray/70 my-8 text-center p-6 bg-dental-beige/20 rounded-lg">Conteúdo não disponível</p>';
    }
    
    console.log(`richTextToHtml: Conversion successful, final HTML length: ${html.length}`);
    return html;
    
  } catch (error) {
    console.error('richTextToHtml: Error during conversion:', error);
    return `<div class="my-8 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
      <p class="text-red-600 font-medium">Erro ao processar conteúdo</p>
      <p class="text-red-500 text-sm mt-2">Por favor, tente novamente mais tarde.</p>
    </div>`;
  }
};

// Transform comparison table data
const transformComparisonTable = (data: any): ComparisonTableItem[] | undefined => {
  console.log('🔍 transformComparisonTable - received data:', data);
  
  if (!data) {
    console.log('❌ transformComparisonTable - no data provided');
    return undefined;
  }
  
  // Handle localized data
  const localizedData = getLocalizedValue(data);
  console.log('🌐 transformComparisonTable - localized data:', localizedData);
  
  if (!Array.isArray(localizedData)) {
    console.log('❌ transformComparisonTable - data is not an array:', typeof localizedData);
    return undefined;
  }
  
  const result = localizedData.map((item, index) => ({
    ...item, // Preserve all original keys from Contentful JSON
    Criterio: item.Criterio || item.criterio || '' // Only normalize the Criterio field
  }));
  
  console.log('✅ transformComparisonTable - transformed result:', result);
  return result;
};

// Transform FAQ structured data
const transformFAQStructured = (data: any): FAQItem[] | undefined => {
  if (!data || !Array.isArray(data)) return undefined;
  
  return data.map(item => ({
    "@type": "Question",
    name: item.name || '',
    acceptedAnswer: {
      "@type": "Answer",
      text: item.acceptedAnswer?.text || ''
    }
  }));
};

// Transform People Also Ask data
const transformPeopleAlsoAsk = (data: any): PeopleAlsoAskSection | undefined => {
  if (!data) return undefined;
  
  if (data.questions && Array.isArray(data.questions)) {
    return { questions: data.questions };
  }
  
  if (Array.isArray(data)) {
    return { questions: data };
  }
  
  return undefined;
};
