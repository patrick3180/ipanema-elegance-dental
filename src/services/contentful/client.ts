
import { createClient } from 'contentful';

// Contentful credentials
const SPACE_ID = 'g8ip8odd5vbl';
const ACCESS_TOKEN = 'cr6Ra2NQPO9jz2qTWmAK2ykLy0I_4bIqVCyepF8ix-k';

// Create and export Contentful client
export const contentfulClient = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

// Helper function to format image URLs
export const formatImageUrl = (url?: string): string => {
  if (!url) return '';
  return url.startsWith('//') ? `https:${url}` : url;
};
