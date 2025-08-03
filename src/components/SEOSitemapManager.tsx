import React, { useEffect, useState } from 'react';
import { generateSitemap } from '@/utils/sitemapGenerator';
import { searchEngineNotifier } from '@/utils/searchEngineNotifier';
import { optimizeForSearchEngines } from '@/utils/searchEngineOptimizer';
import { runSitemapDiagnostics, logDiagnosticSummary } from '@/utils/sitemapDiagnostics';

export const SEOSitemapManager: React.FC = () => {
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [urlCount, setUrlCount] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [diagnosticsRun, setDiagnosticsRun] = useState(false);

  useEffect(() => {
    const initializeSitemapManager = async () => {
      try {
        console.log('🚀 Initializing Enhanced SEO Sitemap Manager...');
        
        setIsUpdating(true);
        
        // Run comprehensive diagnostics first
        if (!diagnosticsRun) {
          console.log('🔍 Running initial diagnostics...');
          const diagnostics = await runSitemapDiagnostics();
          logDiagnosticSummary(diagnostics);
          setDiagnosticsRun(true);
        }
        
        // Generate sitemap with enhanced error handling
        const sitemap = await generateSitemap();
        
        // Count URLs in the sitemap
        const urlMatches = sitemap.match(/<url>/g);
        const count = urlMatches ? urlMatches.length : 0;
        setUrlCount(count);
        setLastUpdate(new Date().toISOString());
        
        console.log(`✅ Enhanced sitemap initialized with ${count} URLs`);
        
        // Initialize search engine notifier
        searchEngineNotifier.init();
        
        // Run search engine optimization
        if (searchEngineNotifier.shouldPing()) {
          console.log('🚀 Running search engine optimization...');
          await optimizeForSearchEngines();
        }
        
      } catch (error) {
        console.error('❌ Error initializing enhanced sitemap manager:', error);
        
        // Run diagnostics on error to identify issues
        try {
          const errorDiagnostics = await runSitemapDiagnostics();
          logDiagnosticSummary(errorDiagnostics);
        } catch (diagError) {
          console.error('❌ Diagnostics also failed:', diagError);
        }
      } finally {
        setIsUpdating(false);
      }
    };

    initializeSitemapManager();

    // Set up periodic checks (every 30 minutes)
    const interval = setInterval(async () => {
      if (searchEngineNotifier.shouldPing()) {
        console.log('⏰ Scheduled sitemap update check...');
        setIsUpdating(true);
        try {
          await searchEngineNotifier.pingSitemap();
          setLastUpdate(new Date().toISOString());
        } catch (error) {
          console.error('❌ Scheduled sitemap ping failed:', error);
        } finally {
          setIsUpdating(false);
        }
      }
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(interval);
  }, []);

  // Listen for content changes that might affect the sitemap
  useEffect(() => {
    const handleContentChange = async () => {
      if (!isUpdating) {
        console.log('📝 Content change detected, updating sitemap...');
        setIsUpdating(true);
        try {
          const sitemap = await generateSitemap();
          const urlMatches = sitemap.match(/<url>/g);
          const count = urlMatches ? urlMatches.length : 0;
          setUrlCount(count);
          setLastUpdate(new Date().toISOString());
          
          // Ping search engines about the change
          await searchEngineNotifier.pingSitemap();
        } catch (error) {
          console.error('❌ Error handling content change:', error);
        } finally {
          setIsUpdating(false);
        }
      }
    };

    // Listen for navigation changes that might indicate new content
    window.addEventListener('popstate', handleContentChange);
    
    return () => {
      window.removeEventListener('popstate', handleContentChange);
    };
  }, [isUpdating]);

  // This component manages sitemap updates but doesn't render anything
  return null;
};

export default SEOSitemapManager;