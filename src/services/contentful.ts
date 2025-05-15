
import { createClient } from 'contentful';
import { BlogPost } from '@/types/BlogPost';

const SPACE_ID = 'g8ip8odd5vbl';
const ACCESS_TOKEN = 'cr6Ra2NQPO9jz2qTWmAK2ykLy0I_4bIqVCyepF8ix-k';

// Create Contentful client
const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

// Function to format the image URL
const formatImageUrl = (url?: string): string => {
  if (!url) return '';
  return url.startsWith('//') ? `https:${url}` : url;
};

// Transform Contentful data to our BlogPost format
const transformBlogPostEntry = (entry: any): BlogPost => {
  // Extract fields
  const fields = entry.fields;
  
  // Get category information
  let category = '';
  if (fields.category && fields.category.sys?.type === 'Link') {
    // Will be populated with actual data in getRelatedContent
    category = '';
  }

  // Get featured image
  let imageUrl = '';
  if (fields.featuredImage && fields.featuredImage.sys?.type === 'Link') {
    // Will be populated with actual data in getRelatedContent
    imageUrl = '';
  }

  return {
    id: entry.sys.id,
    slug: fields.slug,
    title: fields.title,
    excerpt: fields.excerpt || '',
    content: fields.content || '',
    author: fields.author || 'Admin',
    date: fields.publishDate ? new Date(fields.publishDate).toLocaleDateString('pt-BR') : '',
    imageUrl,
    category,
    metaDescription: fields.metaDescription || '',
    tags: fields.tags || [],
  };
};

// Get related content (categories, images) for blog posts
const getRelatedContent = async (entries: any[]) => {
  // Build a list of all required asset IDs and category IDs
  const assetIds: string[] = [];
  const categoryIds: string[] = [];

  entries.forEach(entry => {
    const fields = entry.fields;
    
    // Collect featured image references
    if (fields.featuredImage && fields.featuredImage.sys?.id) {
      assetIds.push(fields.featuredImage.sys.id);
    }
    
    // Collect category references
    if (fields.category && fields.category.sys?.id) {
      categoryIds.push(fields.category.sys.id);
    }
  });

  // Create a map to hold assets and categories
  const assets: Record<string, any> = {};
  const categories: Record<string, any> = {};

  // Fetch all required assets if needed
  if (assetIds.length > 0) {
    const assetEntries = await client.getAssets({
      'sys.id[in]': assetIds.join(',')
    });
    
    assetEntries.items.forEach(asset => {
      assets[asset.sys.id] = asset;
    });
  }

  // Fetch all required categories if needed
  if (categoryIds.length > 0) {
    const categoryEntries = await client.getEntries({
      'sys.id[in]': categoryIds.join(','),
      content_type: 'categoria'
    });
    
    categoryEntries.items.forEach(category => {
      categories[category.sys.id] = category;
    });
  }

  // Populate references in the entries
  return entries.map(entry => {
    const fields = entry.fields;
    const result = { ...entry };

    // Populate featured image
    if (fields.featuredImage && fields.featuredImage.sys?.id) {
      const assetId = fields.featuredImage.sys.id;
      if (assets[assetId]) {
        const imageUrl = assets[assetId].fields.file?.url;
        result.fields = {
          ...result.fields,
          imageUrl: formatImageUrl(imageUrl)
        };
      }
    }

    // Populate category
    if (fields.category && fields.category.sys?.id) {
      const categoryId = fields.category.sys.id;
      if (categories[categoryId]) {
        result.fields = {
          ...result.fields,
          categoryName: categories[categoryId].fields.name || '',
          categorySlug: categories[categoryId].fields.slug || ''
        };
      }
    }

    return result;
  });
};

// Convert rich text content to HTML
const richTextToHtml = (content: any): string => {
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
        // Image handling would require additional API calls
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

// Get all blog posts
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const entries = await client.getEntries({
      content_type: 'blogCarla',
      order: '-fields.publishDate',
    });

    if (entries.items.length === 0) {
      return [];
    }

    // Get related content for all entries
    const entriesWithRelatedContent = await getRelatedContent(entries.items);

    // Transform entries into blog posts
    return entriesWithRelatedContent.map((entry: any) => {
      const transformedPost = transformBlogPostEntry(entry);
      
      // Add the related content data
      transformedPost.category = entry.fields.categoryName || 'Sem categoria';
      transformedPost.imageUrl = entry.fields.imageUrl || '';
      
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
    const entries = await client.getEntries({
      content_type: 'blogCarla',
      'fields.slug': slug,
    });

    if (entries.items.length === 0) {
      return null;
    }

    // Get related content for the entry
    const entriesWithRelatedContent = await getRelatedContent(entries.items);
    const entry = entriesWithRelatedContent[0];

    // Transform entry into blog post
    const transformedPost = transformBlogPostEntry(entry);
    
    // Add the related content data
    transformedPost.category = entry.fields.categoryName || 'Sem categoria';
    transformedPost.imageUrl = entry.fields.imageUrl || '';
    
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
    const entries = await client.getEntries({
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
    const categoryEntries = await client.getEntries({
      content_type: 'categoria',
      'fields.name': category,
    });

    if (categoryEntries.items.length === 0) {
      return [];
    }

    // Use the category ID to filter blog posts
    const categoryId = categoryEntries.items[0].sys.id;
    
    const entries = await client.getEntries({
      content_type: 'blogCarla',
      'fields.category.sys.id': categoryId,
      order: '-fields.publishDate',
    });

    // Get related content for all entries
    const entriesWithRelatedContent = await getRelatedContent(entries.items);

    // Transform entries into blog posts
    return entriesWithRelatedContent.map((entry: any) => {
      const transformedPost = transformBlogPostEntry(entry);
      
      // Add the related content data
      transformedPost.category = entry.fields.categoryName || 'Sem categoria';
      transformedPost.imageUrl = entry.fields.imageUrl || '';
      
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

export default {
  getAllBlogPosts,
  getBlogPostBySlug,
  getAllCategories,
  getBlogPostsByCategory,
};
