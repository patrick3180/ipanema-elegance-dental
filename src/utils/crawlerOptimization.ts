/**
 * Crawler optimization utilities for better SEO compatibility
 */

export interface CrawlerHeaders {
  'Content-Type': string;
  'Cache-Control': string;
  'X-Robots-Tag'?: string;
  'Last-Modified'?: string;
  'ETag'?: string;
}

/**
 * Generate optimal headers for crawler-friendly responses
 */
export const getCrawlerHeaders = (contentType: 'xml' | 'text'): CrawlerHeaders => {
  const baseHeaders: CrawlerHeaders = {
    'Content-Type': contentType === 'xml' 
      ? 'application/xml; charset=utf-8' 
      : 'text/plain; charset=utf-8',
    'Cache-Control': contentType === 'xml' 
      ? 'public, max-age=3600, s-maxage=3600' 
      : 'public, max-age=86400',
    'Last-Modified': new Date().toUTCString(),
    'ETag': `"${Date.now()}"`,
  };

  if (contentType === 'xml') {
    baseHeaders['X-Robots-Tag'] = 'noindex';
  }

  return baseHeaders;
};

/**
 * Create crawler-friendly HTML wrapper for content
 */
export const createCrawlerHTML = (
  content: string, 
  contentType: 'xml' | 'text',
  title: string = 'Document'
): string => {
  const isXML = contentType === 'xml';
  const displayContent = isXML 
    ? content.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    : content;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="${isXML ? 'application/xml' : 'text/plain'}; charset=utf-8">
  <meta name="robots" content="${isXML ? 'noindex' : 'index, follow'}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <style>
    body { 
      font-family: 'Courier New', monospace; 
      white-space: pre-wrap; 
      margin: 0; 
      padding: 20px;
      background: #f8f9fa;
      color: #333;
    }
    .content-wrapper {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow-x: auto;
      line-height: 1.6;
    }
    .header {
      color: #666;
      font-size: 14px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    .content {
      font-size: 13px;
    }
    @media (max-width: 768px) {
      body { padding: 10px; }
      .content-wrapper { padding: 20px; }
    }
  </style>
</head>
<body>
  <div class="content-wrapper">
    <div class="header">
      Generated on: ${new Date().toLocaleString('pt-BR')}
    </div>
    <div class="content">${displayContent}</div>
  </div>
</body>
</html>`;
};

/**
 * Set headers for crawler responses using history API
 */
export const setCrawlerHeaders = (
  headers: CrawlerHeaders, 
  path: string, 
  title: string
): void => {
  try {
    window.history.replaceState({ headers }, title, path);
    
    // Add meta tags for better crawler detection
    const existingMeta = document.querySelector('meta[http-equiv="Content-Type"]');
    if (existingMeta) {
      existingMeta.setAttribute('content', headers['Content-Type']);
    } else {
      const metaTag = document.createElement('meta');
      metaTag.setAttribute('http-equiv', 'Content-Type');
      metaTag.setAttribute('content', headers['Content-Type']);
      document.head.appendChild(metaTag);
    }

    // Add cache control meta tag
    let cacheMetaTag = document.querySelector('meta[http-equiv="Cache-Control"]') as HTMLMetaElement;
    if (!cacheMetaTag) {
      cacheMetaTag = document.createElement('meta');
      cacheMetaTag.setAttribute('http-equiv', 'Cache-Control');
      document.head.appendChild(cacheMetaTag);
    }
    cacheMetaTag.setAttribute('content', headers['Cache-Control']);

    // Set last modified
    if (headers['Last-Modified']) {
      let lastModifiedTag = document.querySelector('meta[http-equiv="Last-Modified"]') as HTMLMetaElement;
      if (!lastModifiedTag) {
        lastModifiedTag = document.createElement('meta');
        lastModifiedTag.setAttribute('http-equiv', 'Last-Modified');
        document.head.appendChild(lastModifiedTag);
      }
      lastModifiedTag.setAttribute('content', headers['Last-Modified']);
    }

  } catch (error) {
    console.error('Error setting crawler headers:', error);
  }
};

/**
 * Validate content for crawler compatibility
 */
export const validateCrawlerContent = (content: string, type: 'xml' | 'text'): boolean => {
  if (!content || content.trim().length === 0) {
    return false;
  }

  if (type === 'xml') {
    // Basic XML validation
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'application/xml');
      const parseErrors = doc.getElementsByTagName('parsererror');
      return parseErrors.length === 0;
    } catch (error) {
      return false;
    }
  }

  return true;
};

/**
 * Generate fallback content for errors
 */
export const getFallbackContent = (type: 'xml' | 'text', origin: string): string => {
  if (type === 'xml') {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
  }

  return `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml`;
};