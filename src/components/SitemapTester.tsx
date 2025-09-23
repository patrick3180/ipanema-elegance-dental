import React, { useEffect, useState } from 'react';
import { collectSitemapData, getTotalUrlCount } from '@/utils/sitemapDataCollector';
import { generateSitemap } from '@/utils/sitemapGenerator';

export const SitemapTester: React.FC = () => {
  const [urlCount, setUrlCount] = useState<number>(0);
  const [sitemapData, setSitemapData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const testSitemap = async () => {
      try {
        console.log('🗺️ Testing sitemap generation...');
        
        // Collect sitemap data
        const data = await collectSitemapData();
        setSitemapData(data);
        
        // Count total URLs
        const count = getTotalUrlCount(data);
        setUrlCount(count);
        
        console.log('✅ Sitemap data collected:');
        console.log(`📊 Total URLs: ${count}`);
        console.log(`📄 Static pages: ${data.staticPages.length}`);
        console.log(`🎯 Landing pages: ${data.landingPages.length}`);
        console.log(`🛠️ Service pages: ${data.servicePages.length}`);
        console.log(`📖 Blog posts: ${data.blogPosts.length}`);
        console.log(`📁 Blog categories: ${data.blogCategories.length}`);
        console.log(`🏷️ Blog tags: ${data.blogTags.length}`);
        console.log(`📑 Blog pagination: ${data.blogPagination.length}`);
        console.log(`⚖️ Legal pages: ${data.legalPages.length}`);
        
        // Generate full sitemap XML
        const sitemap = await generateSitemap();
        console.log(`📋 Generated sitemap XML (${sitemap.length} characters)`);
        
        setIsLoading(false);
        
      } catch (error) {
        console.error('❌ Error testing sitemap:', error);
        setIsLoading(false);
      }
    };

    testSitemap();
  }, []);

  if (isLoading) {
    return <div>Testing sitemap generation...</div>;
  }

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50">
      <h3 className="font-bold mb-2">Sitemap Status</h3>
      <p className="text-sm">Total URLs: <strong>{urlCount}</strong></p>
      {sitemapData && (
        <div className="text-xs mt-2 space-y-1">
          <div>Static: {sitemapData.staticPages.length}</div>
          <div>Landing: {sitemapData.landingPages.length}</div>
          <div>Services: {sitemapData.servicePages.length}</div>
          <div>Blog Posts: {sitemapData.blogPosts.length}</div>
          <div>Categories: {sitemapData.blogCategories.length}</div>
          <div>Tags: {sitemapData.blogTags.length}</div>
          <div>Pagination: {sitemapData.blogPagination.length}</div>
          <div>Legal: {sitemapData.legalPages.length}</div>
        </div>
      )}
    </div>
  );
};

export default SitemapTester;