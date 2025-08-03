export interface SitemapValidationResult {
  isValid: boolean;
  urlCount: number;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export const validateSitemap = (sitemapXml: string): SitemapValidationResult => {
  const result: SitemapValidationResult = {
    isValid: true,
    urlCount: 0,
    errors: [],
    warnings: [],
    suggestions: []
  };

  try {
    // Check basic XML structure
    if (!sitemapXml.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
      result.errors.push('Missing XML declaration');
      result.isValid = false;
    }

    if (!sitemapXml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
      result.errors.push('Missing or incorrect urlset declaration');
      result.isValid = false;
    }

    // Count URLs
    const urlMatches = sitemapXml.match(/<url>/g);
    result.urlCount = urlMatches ? urlMatches.length : 0;

    // Check for minimum URL count
    if (result.urlCount === 0) {
      result.errors.push('No URLs found in sitemap');
      result.isValid = false;
    } else if (result.urlCount < 20) {
      result.warnings.push(`Low URL count: ${result.urlCount} URLs (expected 50+ for a complete site)`);
    }

    // Check for required fields in URLs
    const urlBlocks = sitemapXml.split('<url>').slice(1);
    urlBlocks.forEach((block, index) => {
      const urlIndex = index + 1;
      
      if (!block.includes('<loc>')) {
        result.errors.push(`URL ${urlIndex}: Missing <loc> element`);
        result.isValid = false;
      }
      
      if (!block.includes('<lastmod>')) {
        result.warnings.push(`URL ${urlIndex}: Missing <lastmod> element`);
      }
      
      if (!block.includes('<changefreq>')) {
        result.warnings.push(`URL ${urlIndex}: Missing <changefreq> element`);
      }
      
      if (!block.includes('<priority>')) {
        result.warnings.push(`URL ${urlIndex}: Missing <priority> element`);
      }

      // Validate URL format
      const locMatch = block.match(/<loc>(.*?)<\/loc>/);
      if (locMatch) {
        const url = locMatch[1];
        if (!url.startsWith('https://')) {
          result.warnings.push(`URL ${urlIndex}: Should use HTTPS`);
        }
        
        // Check for proper URL encoding
        if (url.includes(' ') || url.includes('<') || url.includes('>')) {
          result.errors.push(`URL ${urlIndex}: Contains unencoded special characters`);
          result.isValid = false;
        }
      }

      // Validate date format
      const lastmodMatch = block.match(/<lastmod>(.*?)<\/lastmod>/);
      if (lastmodMatch) {
        const date = lastmodMatch[1];
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          result.warnings.push(`URL ${urlIndex}: Invalid lastmod date format (should be YYYY-MM-DD)`);
        }
      }

      // Validate changefreq values
      const changefreqMatch = block.match(/<changefreq>(.*?)<\/changefreq>/);
      if (changefreqMatch) {
        const changefreq = changefreqMatch[1];
        const validFreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
        if (!validFreqs.includes(changefreq)) {
          result.errors.push(`URL ${urlIndex}: Invalid changefreq value "${changefreq}"`);
          result.isValid = false;
        }
      }

      // Validate priority values
      const priorityMatch = block.match(/<priority>(.*?)<\/priority>/);
      if (priorityMatch) {
        const priority = parseFloat(priorityMatch[1]);
        if (isNaN(priority) || priority < 0 || priority > 1) {
          result.errors.push(`URL ${urlIndex}: Invalid priority value "${priorityMatch[1]}" (should be 0.0-1.0)`);
          result.isValid = false;
        }
      }
    });

    // Generate suggestions
    if (result.urlCount > 0 && result.urlCount < 50) {
      result.suggestions.push('Consider adding more content pages to improve SEO coverage');
    }

    if (result.warnings.length > result.urlCount * 0.1) {
      result.suggestions.push('Multiple URLs missing optional but recommended elements (lastmod, changefreq, priority)');
    }

    if (result.urlCount > 0) {
      const blogUrls = sitemapXml.match(/\/blog\//g);
      const blogCount = blogUrls ? blogUrls.length : 0;
      if (blogCount === 0) {
        result.suggestions.push('No blog URLs found - consider adding blog content for better SEO');
      } else if (blogCount < 10) {
        result.suggestions.push('Low blog content count - consider adding more blog posts');
      }
    }

  } catch (error) {
    result.errors.push(`XML parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    result.isValid = false;
  }

  return result;
};

export const getSitemapValidationScore = (result: SitemapValidationResult): number => {
  let score = 100;

  // Deduct points for errors (major issues)
  score -= result.errors.length * 20;

  // Deduct points for warnings (minor issues)
  score -= result.warnings.length * 5;

  // Bonus points for good URL count
  if (result.urlCount >= 50) {
    score += 10;
  } else if (result.urlCount >= 20) {
    score += 5;
  }

  // Ensure score doesn't go below 0
  return Math.max(0, score);
};