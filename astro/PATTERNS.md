# PATTERNS.md — Guia de Porte React → Astro

Guia para os agentes que criarão as páginas da migração (dracarlachristoph.com).
Leia INTEIRO antes de portar qualquer página. Em caso de conflito, o `CLAUDE.md`
da raiz do repo manda (regras invioláveis de CRO, copy, tracking).

---

## 1. Layouts disponíveis (APIs)

### 1.1 `src/layouts/SiteLayout.astro` — páginas do site (home, sobre, contato, service pages, /servicos, EN pages)

Injeta o header/footer REAL do site (portados de `Header.tsx`/`Footer.tsx`) nos slots do Base.
`lang: 'en'` troca para `EnSiteHeader`/`EnSiteFooter` automaticamente.

| Prop | Tipo | Obrigatória | Default | Notas |
|---|---|---|---|---|
| `title` | string | ✅ | — | `<title>` + og:title |
| `description` | string | ✅ | — | meta description + og:description |
| `canonical` | string | ✅ | — | URL absoluta `https://dracarlachristoph.com/...` |
| `ogType` | string | — | `'website'` | |
| `ogImage` | string | — | foto da doutora | URL absoluta |
| `preloadImage` | string | — | — | `<link rel="preload" as="image">` da hero (LCP) |
| `schemas` | string[] | — | `[]` | JSON-LD **já serializado** (`JSON.stringify(...)`) |
| `noindex` | boolean | — | `false` | páginas do site são indexáveis — NÃO ligar |
| `lang` | `'pt-BR'` \| `'en'` | — | `'pt-BR'` | decide header/footer PT ou EN |

**Exemplo mínimo de página:**

```astro
---
// src/pages/sobre.astro
import SiteLayout from '../layouts/SiteLayout.astro';

const schemas = [
  JSON.stringify({ '@context': 'https://schema.org', '@type': 'Dentist', /* copiar de scripts/generate-static-meta.cjs */ }),
];
---
<SiteLayout
  title="Sobre a Dra. Carla Christoph | Dentista em Ipanema"
  description="..."
  canonical="https://dracarlachristoph.com/sobre"
  preloadImage="/lovable-uploads/xxxx.webp"
  schemas={schemas}
>
  <main id="main-content">
    <!-- Conteúdo portado VERBATIM da página React -->
  </main>
</SiteLayout>
```

⚠️ **O header do site é FIXO** (`position:fixed`, ~72-90px de altura). A primeira
seção da página DEVE compensar (hero com `padding-top` ≥ 90-100px), exatamente
como no SPA. Sem isso o conteúdo fica escondido atrás do header.

⚠️ Use `<main id="main-content">` — o skip-link de acessibilidade do header aponta para essa âncora.

### 1.2 `src/layouts/LPLayout.astro` — landing pages (Google Ads)

LP é **isolada**: header próprio (branco, fixo, logo+CRO à esquerda, botão WhatsApp verde
à direita — portado de `ConsultaInicialHeader.tsx`) e footer minimalista. **Sem navegação do site.**

Props: todas as do SiteLayout **mais**:

| Prop | Tipo | Obrigatória | Default | Notas |
|---|---|---|---|---|
| `noindex` | boolean | — | **`true`** | LP nasce noindex,nofollow — NÃO desligar |
| `whatsappHref` | string | ✅ | — | URL `wa.me` completa com a mensagem própria da LP (copiar do config `src/config/*Config.ts`) |
| `waLabelPrefix` | string | — | `'lp'` | gera `data-label` `<prefix>_header_whatsapp` / `<prefix>_footer_whatsapp` no header/footer. Use o slug da campanha (ex.: `'lp-limpeza'`) |
| `lang` | idem | — | `'pt-BR'` | `'en'` para as 4 LPs EN (traduz textos do header/footer) |

```astro
---
// src/pages/lp/consulta-inicial.astro
import LPLayout from '../../layouts/LPLayout.astro';
import { consultaInicialConfig } from '@/config/consultaInicialConfig'; // alias '@' → ../src (app React)

const waHref = `https://wa.me/${consultaInicialConfig.whatsapp.number}?text=${encodeURIComponent(consultaInicialConfig.whatsapp.message)}`;
---
<LPLayout
  title={consultaInicialConfig.seo.title}
  description={consultaInicialConfig.seo.description}
  canonical="https://dracarlachristoph.com/lp/consulta-inicial"
  whatsappHref={waHref}
  waLabelPrefix="lp-consulta-inicial"
>
  <main id="main-content">
    <!-- Hero DEVE ter padding-top ≈ 90px (header fixo) -->
  </main>
</LPLayout>
```

💡 O alias Vite `@` → `../src` está configurado no `astro.config.mjs`: importe os
configs TS das LPs direto do app React (`@/config/...`) em vez de copiar dados.

### 1.3 `src/layouts/Base.astro` — não usar diretamente
Só o blog (já migrado) usa o Base com o header/footer simples de fallback.
Páginas novas usam SiteLayout ou LPLayout.

---

## 2. Tracking (REGRA INVIOLÁVEL)

O `Base.astro` já contém TODO o tracking global: GTM (delay 2s ou 1ª interação),
captura de GCLID → localStorage, e um **handler global de clique** que, para
qualquer elemento com class `js-wa-cta`, dispara:
`dataLayer.push({event:'whatsapp_click',...})` + `gtag conversion AW-16894364517/OQZvCMXV0foZEOqP7vY9` + beacon GCLID para `/api/send-gclid`.

**Para CADA CTA de WhatsApp que você criar numa página:**

```html
<a
  class="js-wa-cta"
  data-label="<pagina>_<posicao>_whatsapp"
  href="https://wa.me/5521993304045?text=<mensagem URL-encoded>"
  target="_blank"
  rel="noopener"
>Agende sua consulta pelo WhatsApp</a>
```

- ✅ `js-wa-cta` + `data-label` únicos por posição (ex.: `sobre_hero_whatsapp`, `implantes_faq_whatsapp`).
- ✅ Mensagem pré-preenchida específica da página (copiar a do componente React de origem).
- ❌ **NUNCA** criar handler próprio de clique, `onclick`, script de conversão ou GTM duplicado.
- ❌ **NUNCA** mudar o Conversion ID.
- Nota: links `tel:` e `mailto:` NÃO levam `js-wa-cta` (não são conversão de WhatsApp).

---

## 3. Imagens

- Todo `<img>` com **`alt` não-vazio** (descritivo, portado do React quando existir).
- **`width` e `height` REAIS** do arquivo (evita CLS). Descubra com:
  `node -e "const s=require('sharp');s('astro/public/lovable-uploads/X.webp').metadata().then(m=>console.log(m.width,m.height))"`
  ou PowerShell + `System.Drawing`. Não chute.
- Imagens servidas de `/lovable-uploads/...` — **verifique que o arquivo existe** em
  `astro/public/lovable-uploads/` antes de referenciar (a cópia é feita por `copy-assets.mjs`).
- Hero/LCP: `fetchpriority="high"` + prop `preloadImage` no layout. Abaixo da dobra: `loading="lazy"` `decoding="async"`.
- Se o React usa `<picture>` com AVIF (`LPLentesPorcelana`), preserve o `<picture>` — o preload AVIF + `<img src=.webp>` causava double-download (Sprint 5).

---

## 4. SEO

- `title` / `description` / `canonical` **por página** — copiar EXATAMENTE de
  `scripts/generate-static-meta.cjs` (é a fonte da verdade das meta tags + schemas de
  28 páginas e 88 FAQs). Blog posts: `scripts/generate-blog-html.js`.
- **Schemas JSON-LD**: o agente da página COPIA o objeto pronto do
  `generate-static-meta.cjs` (MedicalProcedure, FAQPage, Dentist/LocalBusiness etc.),
  serializa com `JSON.stringify` e passa em `schemas={[...]}`. NUNCA inventar schema
  novo; NUNCA `AggregateRating` fabricado (a exceção autorizada usa os dados reais 5.0/17).
- **LPs → noindex** (o LPLayout já faz por default; não desligue).
- Páginas do site → indexáveis, com canonical absoluto sem trailing slash.
- URLs: saída `directory` (`/rota/index.html`) = mesmo comportamento do `cleanUrls` da Vercel. As rotas têm que ser IDÊNTICAS às do SPA (lista na Seção 6).

---

## 5. Compliance (copy)

- A copy é **PORTADA VERBATIM** do componente React de origem. Você NÃO reescreve,
  NÃO "melhora", NÃO resume. Mudança de copy = decisão de marketing, não sua.
- Mesmo portando: se detectar violação óbvia (preço, promessa de resultado), NÃO corrija
  por conta própria — reporte ao orquestrador.
- ❌ NUNCA "avaliação" em CTA/botão/convite de agendamento → sempre "consulta"
  ("avaliação periodontal" em contexto clínico é OK).
- ❌ Sem preços, sem antes/depois, sem garantia de resultado, sem palavras banidas
  (premium, excelência, humanizado, tecnologia de ponta, sorriso perfeito... — lista completa no CLAUDE.md §1.2).
- Dr. Bruno = "Dr. Bruno" (sem sobrenome). Canal e gengiva = parceiros (Dra. Carla não executa).
- CRO-RJ 27.509 visível (header/footer já cuidam disso).

---

## 6. Mapa completo de rotas (fonte: `src/App.tsx`)

Arquivos React de origem em `src/pages/`. Coluna "Layout" = layout Astro a usar.

### Páginas principais (PT) — `SiteLayout`, indexáveis

| Rota | Arquivo React de origem | Layout |
|---|---|---|
| `/` | `src/pages/Index.tsx` | SiteLayout |
| `/servicos` | `src/pages/ServicesPage.tsx` | SiteLayout |
| `/sobre` | `src/pages/AboutPage.tsx` | SiteLayout |
| `/contato` | `src/pages/ContactPage.tsx` | SiteLayout |
| `/blog` e `/blog/[slug]` | ✅ JÁ MIGRADOS (`astro/src/pages/blog/`) | Base |

### Service pages (PT) — `SiteLayout`, indexáveis

| Rota | Arquivo React de origem |
|---|---|
| `/saude-da-gengiva` | `src/pages/SaudeDaGengiva.tsx` |
| `/clareamento-dental` | `src/pages/ClareamentoDental.tsx` |
| `/implantes-dentarios` | `src/pages/ImplantesDentarios.tsx` |
| `/lentes-de-contato-dental-e-facetas-de-resina` | `src/pages/LentesEFacetas.tsx` |
| `/protese-dentaria` | `src/pages/ProteseDentaria.tsx` |
| `/restauracoes-esteticas` | `src/pages/RestaureacoesEsteticas.tsx` |
| `/tratamento-de-canal` | `src/pages/TratamentoDeCanal.tsx` |
| `/clinica-geral-e-prevencao` | `src/pages/ClinicaGeralPrevencao.tsx` |
| `/ortodontia` | `src/pages/Ortodontia.tsx` |

### Landing pages (PT) — `LPLayout`, noindex

| Rota | Arquivo React de origem |
|---|---|
| `/lp/limpeza-dental-ipanema` | `src/pages/LimpezaDentalLandingPage.tsx` |
| `/lp/estetica-dental-ipanema` | `src/pages/EsteticaSorrisoLandingPage.tsx` |
| `/lp/saude-gengival-ipanema` | `src/pages/SaudeGengivalLandingPage.tsx` |
| `/lp/clareamento-dental` | `src/pages/ClareamentoLandingPage.tsx` |
| `/lp/consulta-inicial` | `src/pages/ConsultaInicialLandingPage.tsx` |
| `/lp/ortodontia-ipanema` | `src/pages/OrtodontiaLandingPage.tsx` |
| `/lp/dor-de-dente-urgencia-ipanema` | `src/pages/DorDeDenteLandingPage.tsx` |
| `/lp/dente-quebrado-urgencia-ipanema` | `src/pages/DenteQuebradoLandingPage.tsx` |
| `/lp/emergencia-odontologica-ipanema` | `src/pages/EmergenciaOdontologicaLandingPage.tsx` |
| `/lp/especialista-protese-ipanema` | `src/pages/EspecialistaProteseLandingPageV2.tsx` ⚠️ **V2** na URL principal |
| `/lp/especialista-protese-ipanema-v1` | `src/pages/EspecialistaProteseLandingPage.tsx` (V1 congelada) |
| `/lp/implantes-dentarios-ipanema` | `src/pages/ImplantesDentariosLandingPage.tsx` |
| `/lp/lentes-porcelana-ipanema` | `src/pages/LPLentesPorcelana.tsx` |
| `/lp/lentes-profissional-ipanema` | `src/pages/LentesDeContatoEmPorcelanaProfissionalLandingPage.tsx` |
| `/lp/facetas-resina-ipanema` | `src/pages/FacetasResinaDiretaLandingPage.tsx` |
| `/lp/lentes-resina-ou-porcelana-ipanema` | `src/pages/LentesResinaOuPorcelanaLandingPage.tsx` |

### English micro-site — `SiteLayout` com `lang="en"`, indexáveis

| Rota | Arquivo React de origem |
|---|---|
| `/en` | `src/pages/en/EnHomePage.tsx` |
| `/en/about` | `src/pages/en/EnAboutPage.tsx` |
| `/en/contact` | `src/pages/en/EnContactPage.tsx` |
| `/en/dental-implants` | `src/pages/en/EnDentalImplantsPage.tsx` |
| `/en/general-dentistry` | `src/pages/en/EnGeneralDentistryPage.tsx` |
| `/en/dental-emergency` | `src/pages/en/EnDentalEmergencyPage.tsx` |
| `/en/dental-prosthetics` | `src/pages/en/EnDentalProstheticsPage.tsx` |
| `/en/teeth-whitening` | `src/pages/en/EnTeethWhiteningPage.tsx` |
| `/en/veneers-and-lenses` | `src/pages/en/EnVeneersAndLensesPage.tsx` |
| `/en/aesthetic-restorations` | `src/pages/en/EnAestheticRestorationsPage.tsx` |
| `/en/orthodontics` | `src/pages/en/EnOrthodonticsPage.tsx` |
| `/en/root-canal` | `src/pages/en/EnRootCanalPage.tsx` |
| `/en/gum-health` | `src/pages/en/EnGumHealthPage.tsx` |

### English LPs — `LPLayout` com `lang="en"`, noindex

| Rota | Arquivo React de origem |
|---|---|
| `/en/lp/cosmetic-dentistry` | `src/pages/en/EnCosmeticDentistryLP.tsx` |
| `/en/lp/dental-implants` | `src/pages/en/EnDentalImplantsLP.tsx` |
| `/en/lp/dental-emergency` | `src/pages/en/EnDentalEmergencyLP.tsx` |
| `/en/lp/general-consultation` | `src/pages/en/EnGeneralConsultationLP.tsx` |

### Redirects / especiais (NÃO viram páginas Astro — resolver no `vercel.json`)

| Rota | Destino / nota |
|---|---|
| `/lp/profilaxia-dental-ipanema` | 301 → `/lp/limpeza-dental-ipanema` |
| `/lentes-de-contato-dental-e-facetas-de-porcelana` | 301 → `/lentes-de-contato-dental-e-facetas-de-resina` |
| `/en/porcelain-veneers` | 301 → `/en/veneers-and-lenses` |
| `/diferenciais` | 301 → `/` |
| `/gone` | página 410 (`src/pages/GonePage.tsx`) |
| `*` (404) | `src/pages/NotFoundPage.tsx` |
| `/go/whatsapp` | Vercel Function (`api/go-whatsapp.js`) — NÃO tocar |
| `/links` | hub estático em `public/links/` — NÃO tocar |
| `/sitemap.xml`, `/api/*` | Vercel Functions — NÃO tocar |

Nos links internos das páginas, use SEMPRE a rota canônica (coluna da esquerda das
tabelas de páginas), nunca a rota antiga que redireciona.

---

## 7. Duplo-check — 8 itens que TODA página deve passar antes de ser entregue

1. **Visual idêntico** ao React (mesmas cores/tokens, espaçamentos, tipografia, ordem
   das seções; hero compensa o header fixo; testar mobile e desktop).
2. **SEO completo**: title, description e canonical corretos (copiados do
   `generate-static-meta.cjs`); og/twitter herdados do layout.
3. **Imagens**: todo `<img>` com `alt` não-vazio + `width`/`height` reais; arquivo
   existe em `astro/public/lovable-uploads/`; hero com preload/fetchpriority.
4. **Links íntegros**: todos os links internos apontam para rotas canônicas da
   Seção 6 (sem 404, sem rota antiga de redirect).
5. **Tags funcionais**: schemas JSON-LD presentes e válidos (JSON parseável, copiado
   da fonte da verdade); nenhum GTM/gtag duplicado na página.
6. **GCLID webhook**: todos os CTAs WhatsApp têm `js-wa-cta` (o handler global cobre
   dataLayer + conversion + beacon /api/send-gclid) — NENHUM handler próprio.
7. **CTAs WhatsApp corretos**: `data-label="<pagina>_<posicao>_whatsapp"` único,
   `href` wa.me com mensagem da página, `target="_blank" rel="noopener"`, texto usa
   "consulta" (nunca "avaliação"), copy verbatim.
8. **noindex correto**: LPs = noindex (default do LPLayout); páginas do site =
   indexáveis (sem `noindex`).
