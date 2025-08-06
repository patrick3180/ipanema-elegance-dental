import { Handler } from '@netlify/functions';

// Static robots.txt content - independent of Contentful
const generateStaticRobotsTxt = (): string => {
  return `User-agent: *
Allow: /

# Disallow admin and development pages
Disallow: /seo-dashboard
Disallow: /admin/
Disallow: /dev/
Disallow: /_netlify/

# Allow important paths explicitly
Allow: /blog/
Allow: /servicos/
Allow: /sobre
Allow: /contato

# Sitemaps
Sitemap: https://dracarlachristoph.com/sitemap.xml

# Crawl rate optimization
Crawl-delay: 1

# Specific directives for different bots
User-agent: Googlebot
Crawl-delay: 1

User-agent: Bingbot
Crawl-delay: 2`;
};

const handler: Handler = async (event, context) => {
  try {
    console.log('🤖 Generating static robots.txt via Netlify function...');
    const robotsTxt = generateStaticRobotsTxt();
    
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
    
    // Ultra-simple fallback
    const fallbackRobots = `User-agent: *
Allow: /
Sitemap: https://dracarlachristoph.com/sitemap.xml`;
    
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