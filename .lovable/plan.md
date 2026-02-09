

## Corrigir robots.txt e sitemap

### 1. Simplificar robots.txt (2 arquivos)

**`api/robots.js`** e **`api/robots-edge.js`**: Substituir toda a string `robotsTxt` pelo conteudo simplificado:

```text
User-agent: *
Allow: /
Disallow: /api/
Disallow: /assets/*.map

Sitemap: https://dracarlachristoph.com/sitemap.xml

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /
```

Removidos: Crawl-delay (Google ignora), /_next/ (nao existe em Vite), /gone, /seo-dashboard, Yandex, Baiduspider, ia_archiver, data dinamica, comentarios desnecessarios.

Nota: o `api/robots-edge.js` tambem tinha o Sitemap com `www` -- sera corrigido para sem `www`.

### 2. Corrigir sitemap (2 arquivos)

**`api/sitemap.js`** e **`api/sitemap-edge.js`**: No array `staticPages`:

- Remover `/sobre`, `/contato`, `/diferenciais` (redirecionam para home)
- Remover TODAS as 12 entries de `/lp/*` (tem noindex)
- Confirmar `baseUrl` sem www (ja esta correto em ambos)

O array resultante tera apenas:
- `/` (home)
- `/servicos`
- `/blog`
- 9 paginas de servicos
- `/politica-de-privacidade`
- `/termos-de-uso`

Total: 14 paginas estaticas + posts do blog.

### O que NAO muda
- Logica de busca de blog posts no Contentful
- Headers de resposta
- vercel.json
- Nenhum componente React

### Secao tecnica
- 4 arquivos editados: `api/robots.js`, `api/robots-edge.js`, `api/sitemap.js`, `api/sitemap-edge.js`
- Apenas conteudo de strings e arrays sao alterados
- Risco: baixo
