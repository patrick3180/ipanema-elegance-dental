
import { 
  generateOptimizedSitemap, 
  generateRobotsTxt as generateRobotsContent,
  getBasicSitemapFallback,
  pingSearchEngines as pingEngines 
} from '@/utils/sitemapGeneratorOptimized';

// Re-export with original function names for backward compatibility
export const generateRobotsTxt = generateRobotsContent;
export const generateSitemap = generateOptimizedSitemap;
export const generateBasicSitemap = getBasicSitemapFallback;
export const pingSearchEngines = pingEngines;
