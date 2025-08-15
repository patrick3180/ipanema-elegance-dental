// api/robots.js
// IMPORTANTE: Use .js ao invés de .ts para evitar problemas

export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400');
  
  const robotsTxt = `# Robots.txt para dracarlachristoph.com
User-agent: *
Allow: /
Disallow: /api/
Disallow: /gone
Disallow: /seo-dashboard

# Sitemap
Sitemap: https://dracarlachristoph.com/sitemap.xml

# Crawl-delay para bots específicos
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

User-agent: DotBot
Crawl-delay: 10

User-agent: MJ12bot
Crawl-delay: 10

# Bloquear bots indesejados
User-agent: ia_archiver
Disallow: /

User-agent: Yandex
Disallow: /

User-agent: Baiduspider
Disallow: /

# Google
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 1`;
  
  res.status(200).send(robotsTxt);
}
