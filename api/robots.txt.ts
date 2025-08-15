// api/robots.txt.ts
// Crie este arquivo na pasta 'api' na raiz do projeto

import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400');
  
  const robotsTxt = `# Robots.txt for dracarlachristoph.com
User-agent: *
Allow: /
Disallow: /api/
Disallow: /gone
Disallow: /seo-dashboard

# Sitemap
Sitemap: https://dracarlachristoph.com/sitemap.xml

# Crawl-delay for bots
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

User-agent: DotBot
Crawl-delay: 10

User-agent: MJ12bot
Crawl-delay: 10

# Block bad bots
User-agent: ia_archiver
Disallow: /

User-agent: Yandex
Disallow: /

User-agent: Baiduspider
Disallow: /`;
  
  return res.status(200).send(robotsTxt);
}
