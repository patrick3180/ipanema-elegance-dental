

## Plano: Pre-rendering de Meta Tags + SEO + Performance

### Resumo

Este plano cobre 4 frentes de trabalho para resolver problemas de SEO e performance identificados no PageSpeed Insights:

1. Vercel Edge Middleware para meta tags por rota
2. Corrigir URLs antigas (dracarla.lovable.app)
3. noindex/nofollow em todas as landing pages
4. Otimizacao de FCP/LCP

---

### 1. Criar `middleware.ts` na raiz do projeto

Criar arquivo `middleware.ts` na raiz do projeto que funciona como Vercel Edge Middleware. Este middleware:

- Intercepta todas as requests de navegacao (exclui assets estaticos como .js, .css, imagens, etc.)
- Busca o HTML do `index.html` via `next` response
- Faz string replace das meta tags genericas do `<head>` pelas meta tags especificas de cada rota usando o mapa fornecido (14 rotas mapeadas)
- Para URLs nao mapeadas, mantem as meta tags padrao da homepage
- Exporta um `config.matcher` que exclui arquivos estaticos

Detalhes tecnicos:
- Usa `NextResponse` do `@vercel/edge` (nao precisa instalar, disponivel no runtime Vercel)
- O middleware le o response HTML, faz replace do `<title>`, `<meta name="description">`, `<meta property="og:*">`, `<link rel="canonical">` e retorna o HTML modificado
- Para landing pages `/lp/*`, tambem injeta `<meta name="robots" content="noindex, nofollow">`

### 2. Atualizar `vercel.json`

Nenhuma mudanca necessaria - o Vercel detecta automaticamente o `middleware.ts` na raiz.

### 3. Corrigir URLs do dominio antigo

**Arquivo:** `src/pages/ConsultaInicialLandingPage.tsx`

Substituir 3 ocorrencias de `https://dracarla.lovable.app` por `https://dracarlachristoph.com`:
- Linha 115: og:url
- Linha 124: twitter:url  
- Linha 136: Schema.org url

### 4. Adicionar `noindex, nofollow` em TODAS as landing pages

As seguintes landing pages atualmente tem `"index, follow"` ou nao tem robots meta e precisam ser alteradas para `"noindex, nofollow"`:

| Arquivo | Status Atual |
|---------|-------------|
| ClareamentoLandingPage.tsx | `index, follow` -> mudar |
| ConsultaInicialLandingPage.tsx | `index, follow` -> mudar |
| OrtodontiaLandingPage.tsx | `index, follow` -> mudar |
| ImplantesDentariosLandingPage.tsx | `index, follow` -> mudar |
| ProfilaxiaLandingPage.tsx | `index, follow, max-image-preview...` -> mudar |
| EspecialistaProteseLandingPage.tsx | `index, follow, max-snippet...` -> mudar |
| LentesDeContatoPorcelanaLandingPage.tsx | `index, follow, max-snippet...` -> mudar |
| LimpezaDentalLandingPage.tsx | sem robots -> adicionar |
| DorDeDenteLandingPage.tsx | sem robots -> adicionar |
| DenteQuebradoLandingPage.tsx | sem robots -> adicionar |
| EmergenciaOdontologicaLandingPage.tsx | sem robots -> adicionar |
| EsteticaSorrisoLandingPage.tsx | sem robots -> adicionar |
| SaudeGengivalLandingPage.tsx | sem robots -> adicionar |
| LPLentesPorcelana.tsx | sem robots -> adicionar |

Total: 14 arquivos a modificar.

### 5. Otimizar Performance (FCP/LCP)

**a) index.html - Preload da imagem hero correta:**

A imagem hero da homepage e `/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.webp` (conforme o componente Hero.tsx). O preload atual aponta para `dra-carla-jaleco-bracos-cruzados.webp` que e a imagem ERRADA. Corrigir para a imagem correta.

**b) index.html - Reduzir CSS inline:**

O CSS inline atual tem ~80 linhas. Reduzir para apenas o essencial para o primeiro render:
- Layout base (body, container)
- Tipografia base (font-family)
- Hero section sizing
- Remover regras duplicadas que o Tailwind ja gera

**c) Componente Hero.tsx:**

O Hero ja tem `loading="eager"` e `fetchPriority="high"` - esta correto. Nenhuma mudanca necessaria.

---

### Arquivos a Criar
- `middleware.ts` (raiz do projeto)

### Arquivos a Modificar
- `src/pages/ConsultaInicialLandingPage.tsx` (3 URLs)
- `src/pages/ClareamentoLandingPage.tsx` (robots)
- `src/pages/OrtodontiaLandingPage.tsx` (robots)
- `src/pages/ImplantesDentariosLandingPage.tsx` (robots)
- `src/pages/ProfilaxiaLandingPage.tsx` (robots)
- `src/pages/EspecialistaProteseLandingPage.tsx` (robots)
- `src/pages/LentesDeContatoPorcelanaLandingPage.tsx` (robots)
- `src/pages/LimpezaDentalLandingPage.tsx` (robots)
- `src/pages/DorDeDenteLandingPage.tsx` (robots)
- `src/pages/DenteQuebradoLandingPage.tsx` (robots)
- `src/pages/EmergenciaOdontologicaLandingPage.tsx` (robots)
- `src/pages/EsteticaSorrisoLandingPage.tsx` (robots)
- `src/pages/SaudeGengivalLandingPage.tsx` (robots)
- `src/pages/LPLentesPorcelana.tsx` (robots)
- `index.html` (preload correto + CSS inline reduzido)

### O que NAO sera alterado
- Estrutura de rotas do App.tsx
- Componentes de landing page (Hero, Problem, Guide, etc.)
- Configuracao do Contentful
- Estilos do Tailwind / design system
- Tracking (GTM, Google Ads, GCLID)

