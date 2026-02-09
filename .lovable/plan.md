

## Corrigir Pre-rendering de Meta Tags

### Problema
O `middleware.ts` atual usa APIs do Next.js (`NextRequest`) que nao funcionam em projetos Vite no Vercel. Bots (WhatsApp, Facebook, Googlebot) veem apenas meta tags genericas da homepage em todas as URLs.

### Solucao
Substituir o middleware por uma Vercel Serverless Function (`api/index.js`) que le o `dist/index.html`, injeta meta tags corretas por rota, e retorna o HTML modificado.

### Alteracoes

**1. Criar `api/index.js`** (novo arquivo)
- Serverless function que recebe todas as requests HTML
- Le `dist/index.html` com `fs.readFileSync`
- Usa mapa de 14 rotas com title, description, ogImage e canonical
- Faz string replace das meta tags genericas pelas especificas
- Remove OG/Twitter/canonical duplicados e injeta os corretos antes de `</head>`
- Adiciona `noindex, nofollow` para rotas `/lp/*`
- Cache: `s-maxage=3600, stale-while-revalidate=86400`
- Fallback: em caso de erro, serve o index.html original

**2. Atualizar `vercel.json`**
- Manter rewrites existentes de `/sitemap.xml` e `/robots.txt`
- Adicionar regras para servir assets estaticos diretamente: `/assets/*`, `/lovable-uploads/*`, e arquivos por extensao (js, css, png, webp, etc.)
- Alterar o catch-all final de `"destination": "/index.html"` para `"destination": "/api/index"`
- Headers existentes permanecem inalterados

**3. Deletar `middleware.ts`**
- Remover o arquivo da raiz pois usa APIs Next.js incompativeis com Vite

### Arquivos
| Acao | Arquivo |
|------|---------|
| Criar | `api/index.js` |
| Editar | `vercel.json` (rewrites) |
| Deletar | `middleware.ts` |

### O que NAO muda
- Nenhum componente React
- Nenhuma rota do App.tsx
- api/sitemap.js e api/robots.js permanecem intocados
- Tracking (GTM, Google Ads, GCLID)
- Estilos e design system

