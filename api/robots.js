// api/robots.js
// Gera o robots.txt dinamicamente

export default function handler(req, res) {
  console.log('Robots.txt API called!');
  
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /assets/*.map

Sitemap: https://dracarlachristoph.com/sitemap.xml

# AI Search bots allowed for AI Search Optimization (Pilar 3)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

# Block scraper bots
User-agent: CCBot
Disallow: /`;
  
  // Configurar headers
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache por 24 horas
  
  // Enviar resposta
  res.status(200).send(robotsTxt);
}
