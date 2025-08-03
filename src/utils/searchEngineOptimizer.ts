import { searchEngineNotifier } from '@/utils/searchEngineNotifier';

export interface SEOOptimizationReport {
  timestamp: string;
  actions: string[];
  results: {
    sitemapPinged: boolean;
    indexingRequested: boolean;
    guideGenerated: boolean;
  };
  errors: string[];
}

export const optimizeForSearchEngines = async (urls?: string[]): Promise<SEOOptimizationReport> => {
  const report: SEOOptimizationReport = {
    timestamp: new Date().toISOString(),
    actions: [],
    results: {
      sitemapPinged: false,
      indexingRequested: false,
      guideGenerated: false
    },
    errors: []
  };

  console.log('🚀 Starting search engine optimization...');

  // Ping sitemap to search engines
  try {
    console.log('📡 Pinging search engines about sitemap...');
    await searchEngineNotifier.pingSitemap();
    report.results.sitemapPinged = true;
    report.actions.push('Pinged search engines with updated sitemap');
    console.log('✅ Sitemap ping successful');
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    report.errors.push(`Sitemap ping failed: ${errorMsg}`);
    console.error('❌ Sitemap ping failed:', error);
  }

  // Request indexing for specific URLs if provided
  if (urls && urls.length > 0) {
    try {
      console.log(`📝 Requesting indexing for ${urls.length} URLs...`);
      await searchEngineNotifier.requestIndexing(urls);
      report.results.indexingRequested = true;
      report.actions.push(`Requested indexing for ${urls.length} URLs`);
      console.log('✅ Indexing request submitted');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      report.errors.push(`Indexing request failed: ${errorMsg}`);
      console.error('❌ Indexing request failed:', error);
    }
  }

  // Generate manual submission guide
  try {
    console.log('📋 Generating search console submission guide...');
    const guide = searchEngineNotifier.generateSearchConsoleGuide(urls || []);
    
    // Store guide in localStorage for user access
    localStorage.setItem('seo-submission-guide', guide);
    localStorage.setItem('seo-submission-guide-timestamp', new Date().toISOString());
    
    report.results.guideGenerated = true;
    report.actions.push('Generated search console submission guide');
    console.log('✅ Submission guide generated and stored');
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    report.errors.push(`Guide generation failed: ${errorMsg}`);
    console.error('❌ Guide generation failed:', error);
  }

  console.log('🎯 Search engine optimization complete:', report);
  return report;
};

export const getStoredSubmissionGuide = (): { guide: string; timestamp: string } | null => {
  try {
    const guide = localStorage.getItem('seo-submission-guide');
    const timestamp = localStorage.getItem('seo-submission-guide-timestamp');
    
    if (guide && timestamp) {
      return { guide, timestamp };
    }
  } catch (error) {
    console.error('Error retrieving submission guide:', error);
  }
  
  return null;
};

export const clearStoredSubmissionGuide = (): void => {
  try {
    localStorage.removeItem('seo-submission-guide');
    localStorage.removeItem('seo-submission-guide-timestamp');
    console.log('✅ Submission guide cleared from storage');
  } catch (error) {
    console.error('Error clearing submission guide:', error);
  }
};