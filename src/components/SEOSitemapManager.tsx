import React, { useEffect, useState } from 'react';
import { generateSitemap } from '@/utils/sitemapGenerator';
import { searchEngineNotifier } from '@/utils/searchEngineNotifier';

export const SEOSitemapManager: React.FC = () => {
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [urlCount, setUrlCount] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const initializeSitemapManager = async () => {
      try {
        console.log('🚀 Initializing SEO Sitemap Manager...');
        
        // Generate sitemap to ensure it's up to date
        setIsUpdating(true);
        const sitemap = await generateSitemap();
        
        // Count URLs in the sitemap
        const urlMatches = sitemap.match(/<url>/g);
        const count = urlMatches ? urlMatches.length : 0;
        setUrlCount(count);
        setLastUpdate(new Date().toISOString());
        
        console.log(`✅ Sitemap initialized with ${count} URLs`);
        
        // Initialize search engine notifier
        searchEngineNotifier.init();
        
        // Check if we should ping search engines
        if (searchEngineNotifier.shouldPing()) {
          console.log('📡 Pinging search engines about sitemap updates...');
          await searchEngineNotifier.pingSitemap();
        }
        
      } catch (error) {
        console.error('❌ Error initializing sitemap manager:', error);
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