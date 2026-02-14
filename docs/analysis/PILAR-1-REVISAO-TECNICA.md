# Pilar 1 - Auditoria Tecnica Completa

**Projeto:** Site da Dra. Carla Christoph (dracarla.com.br / dracarlachristoph.com)
**Data:** 13 de fevereiro de 2026
**Auditor:** Analise automatizada via codigo-fonte + configuracao de infraestrutura
**Stack:** React 18 + Vite + Tailwind CSS + Vercel + Contentful (blog)

---

## Resumo Executivo

O site apresenta uma base tecnica solida com diversas otimizacoes ja implementadas (Critical CSS inline, code splitting avancado, lazy loading, self-hosted fonts, schema markup extenso, sitemap dinamico com blog). No entanto, foram identificados problemas criticos de **inconsistencia de dominio** entre o dominio de acesso (www.dracarla.com.br) e os dominios referenciados nos schemas/canonicals/sitemap (dracarlachristoph.com), um **conflito entre robots.txt** (arquivo estatico permite AI bots, API dinamica bloqueia), **ausencia de FAQPage schema** nas paginas de tratamento que possuem FAQ nativa (Implantes e Clareamento), **og:image com URL relativa** na pagina de Implantes, e **ausencia de security headers** no vercel.json. O score geral estimado e **72/100**, com potencial para chegar a 90+ com as correcoes recomendadas.

---

## 1. Performance (Core Web Vitals)

### 1.1 Otimizacoes Implementadas

| Item | Status | Detalhes |
|------|--------|----------|
| Critical CSS inline | OK | index.html contem CSS critico inline (~85 linhas) cobrindo hero, tipografia, layout e botoes |
| Self-hosted fonts | OK | @fontsource/playfair-display e @fontsource/montserrat eliminam dependencia do Google Fonts CDN (economia de 200-400ms) |
| Code splitting (lazy) | OK | Todas as paginas usam React.lazy() com Suspense e PageLoadingFallback |
| Bundle splitting manual | OK | vite.config.ts define manualChunks separando critical, hero, vendor, UI, tracking |
| Minificacao Terser | OK | 3 passes de compressao, drop_console em producao, pure_funcs |
| Service Worker | OK | Registro em producao via sw.js para cache de assets |
| GTM deferred | OK | GTM carrega apos 2s ou primeira interacao do usuario |
| SimpleLCPOptimizer | OK | Componente que otimiza imagens hero (eager loading, fetchPriority=high, preloads) |
| CoreWebVitalsMonitor | OK | Monitoramento de LCP, FID, CLS com envio para GA |
| Preloads criticos | OK | Hook useCriticalImagePreload usado em paginas de tratamento |
| Image optimization | OK | Imagens WebP, lazy loading para non-critical, dimensoes para CLS |

### 1.2 Preocupacoes de Performance

| Item | Status | Detalhes |
|------|--------|----------|
| Numero de componentes de performance | Atencao | Existem ~30 componentes em src/components/performance/. Muitos podem ser redundantes (CriticalCSSExtractor, CriticalCSSInline, CriticalCSSInliner, CriticalCSSLoader, CriticalCSSOptimizer). Excesso de componentes pode ironicamente prejudicar performance por aumentar bundle size. |
| Preload de 3 imagens hero | Atencao | SimpleLCPOptimizer precarrega 3 imagens criticas globalmente (729cc6a8...webp, dra-carla-jaleco...webp, vertical-de-jaleco...webp). Em paginas que nao usam essas imagens, isso gasta largura de banda sem necessidade. |
| MutationObserver global | Atencao | SimpleLCPOptimizer usa MutationObserver em document.body, re-executando funcoes a cada mudanca no DOM. Pode causar reflows desnecessarios. |
| CSS inline extenso | Atencao | ~85 linhas de CSS critico no index.html. Embora seja boa pratica para FCP, parte desse CSS (classes Tailwind como .bg-dental-purple/10) pode nao ser necessaria na primeira pintura. |

### 1.3 Estimativa de Core Web Vitals (baseada na analise de codigo)

| Metrica | Estimativa | Threshold Ideal | Avaliacao |
|---------|-----------|-----------------|-----------|
| FCP | ~1.5-2.5s | <2.5s | Provavelmente OK - Critical CSS inline + self-hosted fonts ajudam |
| LCP | ~2.0-3.5s | <2.5s | Risco - Imagem hero e grande, depende de preload efetivo |
| CLS | ~0.05-0.15 | <0.1 | Risco - Componentes lazy podem causar shift, mas dimensoes sao definidas |
| TBT/FID | ~100-300ms | <200ms | Risco moderado - Muitos componentes de performance podem paradoxalmente bloquear |
| TTFB | ~200-500ms | <800ms | Provavelmente OK - Vercel Edge + regiao gru1 (Sao Paulo) |

**NOTA:** Nao foi possivel obter dados reais do PageSpeed Insights durante esta auditoria. Recomenda-se rodar manualmente em https://pagespeed.web.dev/ para as 3 URLs.

---

## 2. Schema Markup (Dados Estruturados)

### 2.1 Schemas Presentes

| Schema | Pagina | Status | Detalhes |
|--------|--------|--------|----------|
| Organization | Global (GlobalSchemas.tsx) | OK | Nome, logo, contato, sameAs (Instagram, WhatsApp, Facebook), credenciais CRO-RJ |
| LocalBusiness/Dentist/MedicalBusiness | Global (GlobalSchemas.tsx) | OK | Endereco, geo, horarios, aggregateRating (4.9/23), OfferCatalog com MedicalProcedure |
| Dentist (default) | SEOHead.tsx (fallback) | OK | Dados basicos + aggregateRating (4.9/127) - NOTA: reviewCount difere do GlobalSchemas (23 vs 127) |
| Dentist (homepage) | Index.tsx | OK | Schema detalhado com endereco completo (Rua Visconde de Piraja, 550 - Sala 1107), OfferCatalog |
| MedicalProcedure | ImplantesDentarios.tsx | OK | Procedimento dental com performer (Dra. Carla) |
| MedicalProcedure | ClareamentoDental.tsx | OK | Procedimento dental com provider (Dra. Carla) |
| BreadcrumbList | TreatmentHero.tsx | OK | Schema automatico baseado em props breadcrumbs |
| FAQPage | Landing pages (FAQSection.tsx, ClareamentoFAQ.tsx, etc.) | OK | Schema FAQPage nas landing pages |

### 2.2 Problemas de Schema

| Item | Status | Detalhes |
|------|--------|----------|
| reviewCount inconsistente | Problema | GlobalSchemas.tsx usa reviewCount: "23", SEOHead.tsx usa reviewCount: "127". Google pode penalizar por dados inconsistentes. |
| FAQPage ausente em paginas de tratamento | Problema | ImplantesDentarios.tsx e ClareamentoDental.tsx possuem FAQs extensas (12 e 10 perguntas respectivamente) mas NAO geram schema FAQPage. Apenas as landing pages possuem FAQPage schema via componente FAQSection. Perda significativa de potencial de Featured Snippets. |
| Dominio inconsistente nos schemas | Problema | Todos os schemas referenciam "https://dracarlachristoph.com" mas o site e acessado via "https://www.dracarla.com.br". Se nao ha redirect 301 configurado, os schemas apontam para um dominio diferente do acessado. |
| openingHours inconsistente | Atencao | GlobalSchemas.tsx: "Mo-Fr 08:00-18:00, Sa 08:00-14:00". Index.tsx: "Mo-Fr 09:00-19:00". Horarios diferentes no mesmo site. |
| Telefone formatado diferente | Atencao | GlobalSchemas.tsx: "+552199330-4045". Index.tsx: "+5521993304045". SEOHead.tsx: "+55 21 99330-4045". Formatos diferentes. |
| Endereco parcialmente diferente | Atencao | GlobalSchemas.tsx: "Rua Visconde de Piraja" (sem numero). Index.tsx: "Rua Visconde de Piraja, 550 - Sala 1107". |

---

## 3. SEO Tecnico

### 3.1 Meta Tags

| Item | Status | Detalhes |
|------|--------|----------|
| Title tag (homepage) | OK | "Dentista em Ipanema \| Clinica Odontologica Dra. Carla Christoph" (62 chars - bom) |
| Meta description (homepage) | OK | 155 chars, inclui CTA "Agende sua consulta!" e keywords relevantes |
| Title tag (implantes) | OK | "Implantes Dentarios em Ipanema \| Dra. Carla Christoph" (55 chars) |
| Meta description (implantes) | OK | Inclui CRO-RJ, localizacao, diferenciais |
| Title tag (clareamento) | OK | "Clareamento Dental em Ipanema \| Dra. Carla Christoph" (54 chars) |
| Keywords meta tag | OK | Presentes em todas as paginas (SEOHead.tsx define defaults) |
| Robots meta tag | OK | "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" |
| Viewport meta tag | OK | "width=device-width, initial-scale=1.0" |
| Language | OK | html lang="pt-BR" + meta language pt-BR |
| Geo meta tags | OK | geo.region, geo.placename, geo.position, ICBM |
| Google Site Verification | OK | Duas verificacoes configuradas |

### 3.2 Open Graph / Social

| Item | Status | Detalhes |
|------|--------|----------|
| og:title (homepage) | OK | Presente no index.html E no SEOHead |
| og:description (homepage) | OK | Presente |
| og:type | OK | "website" para paginas, "article" para blog |
| og:image (homepage) | OK | URL absoluta: https://dracarlachristoph.com/og-image.jpg |
| og:image (implantes) | Problema | URL RELATIVA: "/lovable-uploads/Implante unitario.webp". Redes sociais nao conseguem resolver URLs relativas. Alem disso, URL contem espaco. |
| og:image (clareamento) | Atencao | Ausente na pagina de clareamento. Nao ha og:image definido no Helmet. |
| og:image:width/height | OK | 1200x630 definidos no SEOHead.tsx |
| og:locale | OK | "pt_BR" |
| og:site_name | OK | "Dra. Carla Christoph - Dentista em Ipanema" |
| Twitter Card | OK | summary_large_image com creator/site configurados |
| Twitter image (implantes) | Atencao | Sem twitter:image especifico definido |

### 3.3 Canonical URLs

| Item | Status | Detalhes |
|------|--------|----------|
| Homepage canonical | OK | https://dracarlachristoph.com/ |
| Implantes canonical | OK | https://dracarlachristoph.com/implantes-dentarios |
| Clareamento canonical | OK | https://dracarlachristoph.com/clareamento-dental |
| Normalizacao | OK | SEOHead.tsx normaliza URLs para dominio .com |
| Dominio canonical vs acesso | Atencao | Canonical aponta para dracarlachristoph.com, site e acessado via www.dracarla.com.br. Se ha redirect 301 configurado no Vercel (dracarla.com.br -> dracarlachristoph.com), esta OK. Caso contrario, ha discrepancia. |
| hreflang | OK | pt-br e x-default configurados |

### 3.4 Robots.txt

| Item | Status | Detalhes |
|------|--------|----------|
| Arquivo estatico (public/robots.txt) | OK | Allow: /, Disallow /api/ e /assets/*.map. Permite AI bots (GPTBot, ChatGPT-User, CCBot, PerplexityBot, Claude-Web, anthropic-ai). |
| API dinamica (api/robots.js) | Problema | BLOQUEIA AI bots (GPTBot, ChatGPT-User, CCBot com Disallow: /). CONFLITO direto com arquivo estatico. |
| vercel.json rewrite | Problema | Rewrite de /robots.txt -> /api/robots. Ou seja, o que e SERVIDO e a versao da API (que bloqueia AI bots), NAO o arquivo estatico (que permite). Isso pode nao ser intencional. |
| Sitemap referenciado | OK | Sitemap: https://dracarlachristoph.com/sitemap.xml |

### 3.5 Sitemap.xml

| Item | Status | Detalhes |
|------|--------|----------|
| Arquivo estatico (public/sitemap.xml) | OK | 72 URLs incluindo homepage, servicos, tratamentos, landing pages, blog posts e paginas legais |
| API dinamica (api/sitemap.js) | OK | Gera sitemap dinamico buscando posts do Contentful |
| Cobertura de paginas | OK | Todas as paginas principais, landing pages e blog posts incluidos |
| Landing pages no sitemap | Atencao | 14 landing pages /lp/* estao no sitemap. Se sao paginas de campanha, podem ser indexadas quando nao deveriam (depende da estrategia). |
| Sitemap API - paginas faltando | Atencao | A API (api/sitemap.js) nao inclui /sobre, /contato nem landing pages. Ou seja, se o rewrite funciona (como sugere vercel.json), essas paginas podem ficar fora do sitemap servido. |
| lastmod consistente | OK | Datas atualizadas (2026-02-13 para paginas principais) |
| Formato XML | OK | Valido com xmlns correto |

---

## 4. Mobile e Responsividade

### 4.1 Configuracao Basica

| Item | Status | Detalhes |
|------|--------|----------|
| Viewport meta tag | OK | width=device-width, initial-scale=1.0 |
| -webkit-text-size-adjust | OK | 100% no CSS critico |
| Mobile-first CSS | OK | Tailwind CSS com breakpoints responsivos (md:, lg:) |
| Touch-friendly header | OK | Menu hamburger em mobile (useIsMobile hook) |
| Apple mobile web app | OK | apple-mobile-web-app-capable, apple-mobile-web-app-title configurados |

### 4.2 Responsividade dos Componentes

| Item | Status | Detalhes |
|------|--------|----------|
| Hero section | OK | Grid responsivo (lg:grid-cols-2), ordem de elementos muda em mobile (order-1/order-2) |
| Cards de tratamento | OK | Grid responsivo (md:grid-cols-2 lg:grid-cols-4 em implantes, md:grid-cols-3 em clareamento) |
| Imagens | OK | max-width: 100%, height: auto, object-cover |
| Container | OK | container-custom com max-width: 1200px e padding responsivo |
| Tipografia | OK | clamp() para h1 (2rem a 3.5rem), tamanhos responsivos via Tailwind |
| CTA buttons | OK | Tamanho adequado (px-8 py-4) para touch targets |
| FAQ Accordion | OK | Full width, touch-friendly triggers |
| WhatsApp button | OK | Presente em todas as paginas (exceto landing pages que tem o proprio) |

### 4.3 Potenciais Problemas Mobile

| Item | Status | Detalhes |
|------|--------|----------|
| Hero image size | Atencao | SimpleLCPOptimizer diferencia imagens por viewport (width < 768 usa 400px, desktop usa 800px) apenas para Contentful. Imagens locais nao tem essa otimizacao. |
| Touch targets em accordion | Atencao | AccordionTrigger pode ter area de toque pequena em accordions aninhados (cards de modalidades) |
| Fixed header height | OK | Header fixo com z-60, paginas compensam com padding-top |

---

## 5. Seguranca

### 5.1 HTTPS

| Item | Status | Detalhes |
|------|--------|----------|
| HTTPS | OK | Vercel fornece HTTPS automaticamente com certificado SSL |
| HTTP -> HTTPS redirect | OK | Vercel redireciona automaticamente |

### 5.2 Security Headers

| Item | Status | Detalhes |
|------|--------|----------|
| Content-Security-Policy | Problema | NAO configurado no vercel.json. Sem CSP, o site e vulneravel a XSS. |
| X-Frame-Options | Problema | NAO configurado. Site pode ser incluido em iframes de outros dominios (clickjacking). |
| X-Content-Type-Options | Problema | NAO configurado. Navegadores podem fazer MIME sniffing. |
| Strict-Transport-Security (HSTS) | Problema | NAO configurado. Primeira visita pode ser feita via HTTP. |
| Referrer-Policy | Problema | NAO configurado. |
| Permissions-Policy | Problema | NAO configurado. |
| vercel.json headers | Atencao | Apenas Content-Type e Cache-Control estao definidos (para sitemap e robots). Nenhum security header global. |

### 5.3 Outras Consideracoes de Seguranca

| Item | Status | Detalhes |
|------|--------|----------|
| External scripts | Atencao | cdn.gpteng.co/gptengineer.js carregado no index.html - script externo de terceiro que pode ser vetor de ataque |
| API tokens | Atencao | Contentful access token e space ID usados via env vars (VITE_CONTENTFUL_*). Variaveis VITE_ sao expostas no client-side bundle. |
| WhatsApp links | OK | Abrem em nova aba com noopener/noreferrer em TreatmentHero |
| DNS prefetch | OK | Apenas para google-analytics e googletagmanager |
| rel="noopener" | Atencao | Nem todos os window.open() usam "noopener,noreferrer" (Hero.tsx nao usa, mas TreatmentHero usa) |

---

## 6. Problemas Criticos (Prioridade Alta)

### 6.1 Conflito de robots.txt (public vs API)

**Gravidade:** Alta
**Impacto:** O robots.txt servido (via api/robots.js por causa do rewrite no vercel.json) BLOQUEIA GPTBot, ChatGPT-User e CCBot. Ja o arquivo estatico (public/robots.txt) os PERMITE. A intencao parece ser PERMITIR (dado que o estatico e mais recente e mais detalhado).

**Recomendacao:** Atualizar api/robots.js para corresponder ao public/robots.txt, incluindo permissao para AI bots.

### 6.2 FAQPage Schema ausente nas paginas de tratamento

**Gravidade:** Alta
**Impacto:** ImplantesDentarios.tsx tem 12 FAQs e ClareamentoDental.tsx tem 10 FAQs. Nenhuma gera schema FAQPage. Isso significa perder posicoes de Featured Snippets no Google para queries como "implante dentario doi?", "quanto tempo dura implante?", etc.

**Recomendacao:** Adicionar schema FAQPage nas paginas ImplantesDentarios.tsx e ClareamentoDental.tsx, similar ao que ja e feito nas landing pages (FAQSection.tsx).

### 6.3 og:image com URL relativa na pagina de Implantes

**Gravidade:** Alta
**Impacto:** `<meta property="og:image" content="/lovable-uploads/Implante unitario.webp" />` usa URL relativa com espaco no nome. Redes sociais (Facebook, LinkedIn, WhatsApp) nao resolvem URLs relativas e o espaco pode causar problemas adicionais. Preview de compartilhamento fica sem imagem.

**Recomendacao:** Alterar para URL absoluta: `https://dracarlachristoph.com/lovable-uploads/implante-unitario.webp` (ou renomear o arquivo para remover espaco).

### 6.4 og:image ausente na pagina de Clareamento

**Gravidade:** Media-Alta
**Impacto:** A pagina ClareamentoDental.tsx nao define og:image no Helmet. O SEOHead.tsx nao e usado nesta pagina (usa Helmet direto). Preview de compartilhamento social fica sem imagem.

**Recomendacao:** Adicionar og:image com URL absoluta apontando para imagem relevante de clareamento.

### 6.5 Inconsistencia de reviewCount nos schemas

**Gravidade:** Media
**Impacto:** GlobalSchemas.tsx diz reviewCount: "23" e SEOHead.tsx diz reviewCount: "127". Google pode identificar como dados inconsistentes e ignorar ambos ou penalizar.

**Recomendacao:** Unificar para o valor real e atualizado do Google Business Profile. Usar um unico ponto de verdade.

---

## 7. Problemas de Atencao (Prioridade Media)

### 7.1 Horarios de funcionamento inconsistentes

- GlobalSchemas.tsx: Seg-Sex 08:00-18:00, Sab 08:00-14:00
- Index.tsx: Seg-Sex 09:00-19:00 (sem sabado)
- Pagina de Implantes CTA: "9h as 19h"

**Recomendacao:** Unificar horarios em todos os schemas e textos.

### 7.2 Security headers ausentes

Nenhum security header esta configurado no vercel.json.

**Recomendacao:** Adicionar ao vercel.json:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
      ]
    }
  ]
}
```

### 7.3 Sitemap API incompleto

A API api/sitemap.js nao inclui /sobre, /contato e nenhuma landing page /lp/*. Se o rewrite esta ativo (vercel.json indica que sim), o sitemap servido em producao pode estar incompleto comparado ao estatico.

**Recomendacao:** Adicionar todas as paginas estaticas na API de sitemap, incluindo /sobre, /contato e landing pages relevantes.

### 7.4 Excesso de componentes de performance

Existem ~30 componentes em src/components/performance/. Muitos parecem redundantes ou experimentais (5 variantes de CriticalCSS, multiplos optimizers).

**Recomendacao:** Auditar quais componentes estao realmente sendo importados e remover os nao utilizados para reduzir bundle size.

---

## 8. Quick Wins (Implementacao Rapida)

| # | Acao | Esforco | Impacto | Arquivos |
|---|------|---------|---------|----------|
| 1 | Corrigir og:image em ImplantesDentarios.tsx (URL absoluta sem espaco) | 5 min | Alto | src/pages/ImplantesDentarios.tsx |
| 2 | Adicionar og:image em ClareamentoDental.tsx | 5 min | Alto | src/pages/ClareamentoDental.tsx |
| 3 | Adicionar FAQPage schema em ImplantesDentarios.tsx | 15 min | Alto | src/pages/ImplantesDentarios.tsx |
| 4 | Adicionar FAQPage schema em ClareamentoDental.tsx | 15 min | Alto | src/pages/ClareamentoDental.tsx |
| 5 | Unificar reviewCount (23 vs 127) | 5 min | Medio | src/components/seo/GlobalSchemas.tsx OU src/components/SEOHead.tsx |
| 6 | Corrigir api/robots.js para permitir AI bots | 10 min | Medio | api/robots.js |
| 7 | Adicionar security headers no vercel.json | 10 min | Medio | vercel.json |
| 8 | Unificar horarios de funcionamento | 10 min | Baixo | src/components/seo/GlobalSchemas.tsx, src/pages/Index.tsx |
| 9 | Unificar formato de telefone nos schemas | 5 min | Baixo | Varios arquivos |

---

## 9. Acoes de Medio Prazo

| # | Acao | Esforco | Impacto |
|---|------|---------|---------|
| 1 | Auditar e remover componentes de performance nao utilizados (~30 componentes) | 2-4h | Medio - reduz bundle size |
| 2 | Completar api/sitemap.js com paginas faltantes (/sobre, /contato, landing pages) | 1h | Medio - melhora indexacao |
| 3 | Implementar CSP (Content-Security-Policy) adequado | 2h | Medio - seguranca |
| 4 | Verificar e documentar dominio primario (dracarla.com.br vs dracarlachristoph.com) | 1h | Alto - consistencia SEO |
| 5 | Rodar PageSpeed Insights real e implementar recomendacoes especificas | 2-4h | Alto - performance |
| 6 | Adicionar width/height explicitio em todas as imagens para prevenir CLS | 2h | Medio |
| 7 | Revisar se SimpleLCPOptimizer com MutationObserver global e necessario | 1h | Baixo-Medio |
| 8 | Remover script gptengineer.js ou mover para carregamento condicional | 30min | Baixo |
| 9 | Garantir noopener,noreferrer em todos os window.open() | 30min | Baixo - seguranca |

---

## 10. Score Geral

| Categoria | Score | Peso | Contribuicao |
|-----------|-------|------|-------------|
| Performance (codigo) | 78/100 | 30% | 23.4 |
| Schema Markup | 65/100 | 20% | 13.0 |
| SEO Tecnico | 72/100 | 25% | 18.0 |
| Mobile | 85/100 | 15% | 12.75 |
| Seguranca | 45/100 | 10% | 4.5 |
| **TOTAL** | | | **71.65/100** |

### Breakdown dos Scores:

**Performance (78/100):** Base solida com Critical CSS, code splitting e self-hosted fonts. Penalizado pelo excesso de componentes de performance e MutationObserver global. Score real depende do PageSpeed Insights.

**Schema Markup (65/100):** Boa cobertura com Organization, LocalBusiness, MedicalProcedure e BreadcrumbList. Penalizado por: FAQPage ausente nas paginas de tratamento, reviewCount inconsistente, horarios conflitantes, formatos de telefone diferentes.

**SEO Tecnico (72/100):** Meta tags bem configuradas, canonical URLs presentes, sitemap abrangente. Penalizado por: conflito robots.txt, sitemap API incompleto, og:image problematico em 2 paginas, potencial inconsistencia de dominio.

**Mobile (85/100):** Configuracao responsiva solida com Tailwind, viewport correto, hero adaptativo. Pontos de atencao em touch targets de accordions aninhados e imagens nao otimizadas por viewport.

**Seguranca (45/100):** HTTPS funciona via Vercel, mas ausencia total de security headers (CSP, X-Frame-Options, HSTS, etc.) e preocupante. Script externo de terceiro carregado sem verificacao.

---

## Score Final: 72/100

**Potencial com quick wins implementados: ~85/100**
**Potencial com todas as acoes: ~92/100**

---

## Anexo A: Arquivos Criticos Auditados

```
index.html                                    - HTML base, Critical CSS, GTM
src/main.tsx                                   - Entry point, fontsource, GCLID
src/App.tsx                                    - Rotas, lazy loading, GlobalSchemas
src/components/SEOHead.tsx                     - Meta tags padrao, OG, Twitter, Schema
src/components/seo/GlobalSchemas.tsx           - Organization + LocalBusiness schemas
src/pages/Index.tsx                            - Homepage, schema Dentist
src/pages/ImplantesDentarios.tsx               - Pagina tratamento, meta tags, schema
src/pages/ClareamentoDental.tsx                - Pagina tratamento, meta tags, schema
src/components/PageLayout.tsx                  - Layout com Header + Footer + WA button
src/components/Hero.tsx                        - Hero section homepage
src/components/treatment/TreatmentHero.tsx     - Hero reutilizavel + BreadcrumbList schema
src/components/landing/FAQSection.tsx          - FAQ com FAQPage schema
src/components/landing/clareamento/ClareamentoFAQ.tsx - FAQ clareamento LP com schema
src/components/RobotsResponse.tsx              - Robots SPA (nao usado em producao)
src/components/SitemapResponse.tsx             - Sitemap SPA (nao usado em producao)
src/components/performance/SimpleLCPOptimizer.tsx - Otimizador LCP global
src/components/performance/CoreWebVitalsMonitor.tsx - Monitor CWV
vite.config.ts                                 - Build config, code splitting, Terser
vercel.json                                    - Rewrites, headers, regiao
public/robots.txt                              - Arquivo estatico robots
public/sitemap.xml                             - Arquivo estatico sitemap
api/robots.js                                  - API dinamica robots
api/sitemap.js                                 - API dinamica sitemap
```

---

## Anexo B: Proximos Passos Recomendados

1. **Imediato (hoje):** Implementar Quick Wins #1 a #7 (estimativa: 1h total)
2. **Esta semana:** Rodar PageSpeed Insights real para obter metricas concretas
3. **Proximo sprint:** Acoes de medio prazo #1 a #5
4. **Continuous:** Monitorar Core Web Vitals via Google Search Console e GA4
