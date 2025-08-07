
import { createClient } from 'contentful';

// Contentful credentials - using correct space ID to fix 404 errors
const SPACE_ID = 'g8ip8odd5vbl';
const ACCESS_TOKEN = 'cr6Ra2NQPO9jz2qTWmAK2ykLy0I_4bIqVCyepF8ix-k';

// Default locale for the application set to pt-BR
export const DEFAULT_LOCALE = 'pt-BR';

// Create and export Contentful client with increased timeout
export const contentfulClient = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
  timeout: 30000, // Increased timeout to 30 seconds
  // Enable console logging of requests in development
  retryOnError: true,
});

// Enhanced helper function to format and optimize image URLs
export const formatImageUrl = (url?: string, options?: { width?: number, quality?: number, format?: 'webp' | 'jpg' | 'png' }): string => {
  if (!url) {
    console.log('Image URL is empty');
    return '';
  }
  
  // Ensure URL has https prefix
  const baseUrl = url.startsWith('//') ? `https:${url}` : url;
  
  // Check if this is a Contentful image to apply optimizations
  if (baseUrl.includes('images.ctfassets.net') || baseUrl.includes('downloads.ctfassets.net')) {
    const separator = baseUrl.includes('?') ? '&' : '?';
    let optimizedUrl = baseUrl;
    
    // Apply format (default to WebP for better compression)
    const format = options?.format || 'webp';
    optimizedUrl += `${separator}fm=${format}`;
    
    // Apply quality (default to 80 for good balance)
    const quality = options?.quality || 80;
    optimizedUrl += `&q=${quality}`;
    
    // Apply width if specified
    if (options?.width) {
      optimizedUrl += `&w=${options.width}`;
    }
    
    return optimizedUrl;
  }
  
  // Return original URL for non-Contentful images
  return baseUrl;
};
