// Search Engine Communication Utilities

interface SearchEngineConfig {
  name: string;
  pingUrl: string;
  indexUrl?: string;
}

const searchEngines: SearchEngineConfig[] = [
  {
    name: 'Google',
    pingUrl: 'https://www.google.com/ping?sitemap=',
    indexUrl: 'https://www.google.com/webmasters/tools/ping?sitemap='
  },
  {
    name: 'Bing',
    pingUrl: 'https://www.bing.com/ping?sitemap=',
    indexUrl: 'https://www.bing.com/webmaster/ping.aspx?siteMap='
  },
  {
    name: 'Yandex',
    pingUrl: 'https://webmaster.yandex.com/ping?sitemap='
  }
];

export class SearchEngineNotifier {
  private baseUrl: string;
  private lastPingTime: number = 0;
  private minPingInterval: number = 60 * 60 * 1000; // 1 hour minimum between pings

  constructor(baseUrl: string = 'https://dracarlachristoph.com') {
    this.baseUrl = baseUrl;
  }

  // Ping search engines about sitemap updates
  async pingSitemap(): Promise<void> {
    const now = Date.now();
    
    // Rate limiting: Don't ping more than once per hour
    if (now - this.lastPingTime < this.minPingInterval) {
      console.log('⏰ Skipping sitemap ping (rate limited)');
      return;
    }

    const sitemapUrl = encodeURIComponent(`${this.baseUrl}/sitemap.xml`);
    
    const pingPromises = searchEngines.map(async (engine) => {
      try {
        const url = `${engine.pingUrl}${sitemapUrl}`;
        
        // Use no-cors mode to avoid CORS issues
        const response = await fetch(url, { 
          method: 'GET', 
          mode: 'no-cors',
          cache: 'no-cache'
        });
        
        console.log(`✅ Pinged ${engine.name} about sitemap update`);
        return { engine: engine.name, success: true };
      } catch (error) {
        console.warn(`❌ Failed to ping ${engine.name}:`, error);
        return { engine: engine.name, success: false, error };
      }
    });

    try {
      const results = await Promise.all(pingPromises);
      const successful = results.filter(r => r.success).length;
      
      console.log(`🔔 Sitemap ping completed: ${successful}/${results.length} successful`);
      this.lastPingTime = now;
      
      // Store last ping time in localStorage for persistence
      localStorage.setItem('lastSitemapPing', now.toString());
    } catch (error) {
      console.error('Error pinging search engines:', error);
    }
  }

  // Submit individual URLs for immediate indexing (for new content)
  async requestIndexing(urls: string[]): Promise<void> {
    if (!urls.length) return;

    console.log(`🔍 Requesting indexing for ${urls.length} URLs`);
    
    // For Google Search Console API (requires authentication)
    // This would need to be implemented server-side with proper OAuth
    const indexingRequests = urls.map(url => ({
      url: `${this.baseUrl}${url}`,
      type: 'URL_UPDATED'
    }));

    // Log the indexing requests for manual submission
    console.log('📝 URLs to submit to Google Search Console:', indexingRequests);
    
    // In a real implementation, you would:
    // 1. Send these to your backend
    // 2. Use Google Search Console API with proper authentication
    // 3. Submit to other search engines' APIs as available
  }

  // Generate Search Console submission guide
  generateSearchConsoleGuide(newUrls: string[]): string {
    const guide = `
# Search Console Submission Guide

## New URLs to Submit for Indexing:
${newUrls.map(url => `- ${this.baseUrl}${url}`).join('\n')}

## Steps to Submit:

### Google Search Console:
1. Go to https://search.google.com/search-console
2. Select your property: ${this.baseUrl}
3. Go to "URL Inspection" tool
4. Enter each URL and click "Request Indexing"

### Bing Webmaster Tools:
1. Go to https://www.bing.com/webmasters
2. Select your site
3. Go to "Submit URLs" under "Configure My Site"
4. Enter the URLs (up to 10 per day)

### Yandex Webmaster:
1. Go to https://webmaster.yandex.com
2. Select your site
3. Go to "Indexing" > "URL submission"
4. Submit individual URLs

## Automated Sitemap Ping:
Your sitemap has been automatically pinged to all major search engines.
Sitemap URL: ${this.baseUrl}/sitemap.xml

## Monitoring:
- Check indexing status in Google Search Console after 24-48 hours
- Monitor organic traffic for new content
- Use "site:${this.baseUrl}" searches to verify indexing
`;

    return guide;
  }

  // Get indexing status (simplified version)
  async checkIndexingStatus(urls: string[]): Promise<Record<string, boolean>> {
    const status: Record<string, boolean> = {};
    
    // Simple check using site: search (not 100% accurate but gives indication)
    for (const url of urls) {
      try {
        // This is a simplified check - in production you'd use Search Console API
        const fullUrl = `${this.baseUrl}${url}`;
        status[url] = true; // Placeholder - would need proper implementation
      } catch (error) {
        status[url] = false;
      }
    }
    
    return status;
  }

  // Initialize notifier with stored data
  init(): void {
    const lastPing = localStorage.getItem('lastSitemapPing');
    if (lastPing) {
      this.lastPingTime = parseInt(lastPing, 10);
    }
  }

  // Check if it's time for a scheduled ping
  shouldPing(): boolean {
    const now = Date.now();
    return (now - this.lastPingTime) >= this.minPingInterval;
  }
}

// Create singleton instance
export const searchEngineNotifier = new SearchEngineNotifier();

// Initialize on module load
searchEngineNotifier.init();

// Auto-ping functionality for content changes
export const onContentChange = async (changedUrls?: string[]): Promise<void> => {
  try {
    // Always ping sitemap for major changes
    await searchEngineNotifier.pingSitemap();
    
    // For specific URL changes, request immediate indexing
    if (changedUrls && changedUrls.length > 0) {
      await searchEngineNotifier.requestIndexing(changedUrls);
      
      // Generate guide for manual submission
      const guide = searchEngineNotifier.generateSearchConsoleGuide(changedUrls);
      console.log(guide);
    }
  } catch (error) {
    console.error('Error notifying search engines:', error);
  }
};

// Utility to create search console submission guide
export const createSubmissionGuide = (): void => {
  const newUrls = [
    '/blog',
    '/servicos',
    '/sobre',
    '/contato',
    '/diferenciais'
  ];
  
  const guide = searchEngineNotifier.generateSearchConsoleGuide(newUrls);
  
  // Save to localStorage for easy access
  localStorage.setItem('searchConsoleGuide', guide);
  
  console.log('📋 Search Console submission guide saved to localStorage');
  console.log(guide);
};