import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  try {
    const { generateRobotsTxt } = await import('../../src/utils/sitemapGeneratorOptimized');
    
    console.log('🤖 Generating robots.txt via Netlify function...');
    const robotsTxt = generateRobotsTxt();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'Access-Control-Allow-Origin': '*'
      },
      body: robotsTxt
    };
  } catch (error) {
    console.error('❌ Error in robots function:', error);
    
    const fallbackRobots = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://dracarlachristoph.com/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=300'
      },
      body: fallbackRobots
    };
  }
};

export { handler };