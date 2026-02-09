// api/robots.js
// Gera o robots.txt dinamicamente

export default function handler(req, res) {
  console.log('Robots.txt API called!');
  
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /assets/*.map

Sitemap: https://dracarlachristoph.com/sitemap.xml

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /`;
  
  // Configurar headers
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache por 24 horas
  
  // Enviar resposta
  res.status(200).send(robotsTxt);
}
