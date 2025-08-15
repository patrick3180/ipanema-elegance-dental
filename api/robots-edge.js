// api/robots-edge.js
// Gera o robots.txt usando Edge Runtime

export const config = {
  runtime: 'edge',
};

export default function handler(request) {
  console.log('Edge Robots.txt API called!');
  
  const robotsTxt = `# Robots.txt para dracarlachristoph.com
# Gerado dinamicamente pela Vercel

User-agent: *
Allow: /
Disallow: /api/
Disallow: /gone
Disallow: /seo-dashboard
Disallow: /_next/
Disallow: /assets/*.map

# Sitemap principal
Sitemap: https://www.dracarlachristoph.com/sitemap.xml

# Googlebot
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Bingbot
User-agent: Bingbot
Allow: /
Crawl-delay: 1

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
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ia_archiver
Disallow: /

User-agent: Yandex
Disallow: /

User-agent: Baiduspider
Disallow: /

# Última atualização: ${new Date().toISOString().split('T')[0]}`;
  
  // Retornar resposta com Edge Runtime
  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400', // Cache por 24 horas
    },
  });
}
