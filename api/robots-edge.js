// api/robots-edge.js
// Gera o robots.txt usando Edge Runtime

export const config = {
  runtime: 'edge',
};

export default function handler(request) {
  console.log('Edge Robots.txt API called!');
  
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
  
  // Retornar resposta com Edge Runtime
  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400', // Cache por 24 horas
    },
  });
}
