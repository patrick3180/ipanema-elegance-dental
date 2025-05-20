
import { createClient } from 'contentful';

// Contentful credentials
const SPACE_ID = 'g8ip8odd5vbl';
const ACCESS_TOKEN = 'cr6Ra2NQPO9jz2qTWmAK2ykLy0I_4bIqVCyepF8ix-k';

// Create and export Contentful client with increased timeout
export const contentfulClient = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
  timeout: 30000, // Increase timeout to 30 seconds
  // Enable console logging of requests in development
  retryOnError: true,
});

// Helper function to format image URLs
export const formatImageUrl = (url?: string): string => {
  if (!url) {
    console.log('Image URL is empty');
    return '';
  }
  const formattedUrl = url.startsWith('//') ? `https:${url}` : url;
  return formattedUrl;
};
