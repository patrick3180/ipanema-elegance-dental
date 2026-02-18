# PILAR 2 -- SEO (Busca Organica) -- Auditoria Completa

**Data:** 14 de Fevereiro de 2026
**Responsavel:** Patrick + IA (Claude Opus 4.6)
**Site:** https://dracarlachristoph.com
**Score Geral: 68/100 → 84/100 (18/02/2026)**

---

## STATUS UPDATE — 18/02/2026

**Itens resolvidos desde a criacao deste relatorio:**
- [x] [Sprint 4] FAQPage schema adicionado em RestaureacoesEsteticas.tsx (8 FAQs) + MedicalProcedure
- [x] [Sprint 4] FAQPage schema adicionado em ClinicaGeralPrevencao.tsx (10 FAQs) + MedicalProcedure
- [x] [Sprint 4] FAQPage schema adicionado em ProteseDentaria.tsx (12 FAQs) — corrige gap critico
- [x] [Sprint 4] og:image absolutas corrigidas nas 3 LPs: ConsultaInicial, Ortodontia LP, Profilaxia
- [x] [Sprint 4] /sobre e /contato adicionados ao sitemap.xml
- [x] [Sprint 4] SEODashboard com noindex,nofollow — pagina interna nao mais indexavel
- [x] [Sprint 4] "Dra. Carla Christoph" adicionado no title de ProteseDentaria
- [x] [Sprint 3] console.log removido de api/robots.js
- [x] [Sprint 7] InternalLinkingOptimizer.tsx integrado em TODAS as 9 service pages (links contextuais ativos)
- [x] [Sprint 7] Links inline contextuais adicionados: SaudaDaGengiva (3 links), RestaureacoesEsteticas (1), LentesEFacetas (1)
- [x] [Pilar 10] 10 posts de blog com links internos para service pages injetados via API Contentful

**Itens ainda pendentes:**
- [ ] Footer links quebrados (anchors #inicio, #sobre etc nao funcionam fora da homepage) — Sprint 8 P2
- [ ] ServicesPage title sem localizacao "Ipanema" — backlog baixa prioridade
- [ ] ServicesPage meta description fraca (~100 chars) — backlog baixa prioridade
- [ ] Keyword gaps: "urgencia dentista ipanema" sem service page indexavel
- [ ] Long-tail organico do blog ainda com 0% conversao (exceto Probioticos)
- [ ] BreadcrumbList schema em JSON-LD (apenas visual atualmente)

**Schema Coverage pos-Sprint 4:**
| Pagina | MedicalProcedure | FAQPage | Status |
|--------|:---:|:---:|--------|
| RestaureacoesEsteticas | RESOLVIDO | RESOLVIDO | Completo |
| ClinicaGeralPrevencao | RESOLVIDO | RESOLVIDO | Completo |
| ProteseDentaria | OK (ja tinha) | RESOLVIDO | Completo |

**Score atualizado: 68/100 → 84/100**
- Schema Markup: 60/100 → 90/100 (3 paginas corrigidas)
- Internal Linking: 35/100 → 72/100 (Sprint 7: componente ativo em 9 SPs + links contextuais)
- Sitemap: 70/100 → 90/100 (/sobre e /contato adicionados)
- Tecnicos (og, robots): 65/100 → 88/100 (3 og:image corrigidas, console.log removido, SEODashboard noindex)
- Demais categorias: sem alteracao desde o relatorio

---

## Sumario Executivo

O site da Dra. Carla Christoph apresenta uma base tecnica de SEO solida -- com paginas de servico bem estruturadas, schema markup presente nas principais paginas, canonicals consistentes e um sitemap dinamico funcional. Os pontos fortes sao: conteudo profundo nas service pages (FAQs extensos, QuickAnswerBox, ProcessTimeline), schema MedicalProcedure + FAQPage nas paginas de maior valor, e canonical URLs normalizados para o dominio .com.

Os principais gaps que impedem um score mais alto sao: (1) falta de FAQPage schema em 3 service pages, (2) ausencia total de schema em RestaureacoesEsteticas e ClinicaGeralPrevencao, (3) internal linking extremamente fraco entre service pages (quase zero links contextuais no corpo do conteudo), (4) Footer com links quebrados (apontam para anchors em vez de rotas), (5) sitemap nao inclui /sobre, /contato nem landing pages, (6) 3 og:image com URLs relativas (nao absolutas), e (7) blog sem links internos para service pages no conteudo dos posts.

---

## 1. Keyword Mapping -- Service Pages

### 1.1 Mapeamento por Pagina

| Pagina | URL | Primary Keyword | Secondary Keywords | Keyword na meta description? | Keyword no title? |
|--------|-----|----------------|-------------------|----------------------------|------------------|
| **Homepage** | `/` | dentista ipanema | clinica odontologica ipanema, odontologia estetica | Sim | Sim |
| **Implantes** | `/implantes-dentarios` | implantes dentarios ipanema | implante dental rio de janeiro, all on 4, protocolo dentario | Sim | Sim |
| **Clareamento** | `/clareamento-dental` | clareamento dental ipanema | clareamento profissional, caseiro supervisionado | Sim | Sim |
| **Lentes/Facetas** | `/lentes-de-contato-dental-e-facetas-de-resina` | lentes de contato dental | facetas de resina, test drive sorriso, porcelana | Sim | Sim |
| **Protese** | `/protese-dentaria` | protese dentaria ipanema | coroas, pontes, proteses sobre implante, reabilitacao oral | Sim | Sim |
| **Ortodontia** | `/ortodontia` | ortodontia ipanema | invisalign, aparelho estetico, alinhadores | Sim | Sim |
| **Tratamento de Canal** | `/tratamento-de-canal` | tratamento de canal ipanema | endodontia, canal dentario zona sul | Sim | Sim |
| **Saude da Gengiva** | `/saude-da-gengiva` | saude da gengiva ipanema | periodontia, gengivite, periodontite | Sim | Sim |
| **Restauracoes** | `/restauracoes-esteticas` | restauracoes esteticas ipanema | restauracao dental, caries, dentes quebrados | Sim | Sim |
| **Clinica Geral** | `/clinica-geral-e-prevencao` | dentista ipanema | check-up dental, prevencao, limpeza, profilaxia | Sim | Sim |

### 1.2 Overlap Organico vs Pago (Service Pages vs Landing Pages)

| Topico | Service Page | Landing Page(s) | Overlap? | Risco de canibalizacao? |
|--------|-------------|-----------------|----------|------------------------|
| Implantes | `/implantes-dentarios` | `/lp/implantes-dentarios-ipanema` | SIM | BAIXO (LP noindex) |
| Lentes | `/lentes-de-contato-dental-e-facetas-de-resina` | `/lp/lentes-porcelana-ipanema`, `/lp/lentes-porcelana-profissional-ipanema`, `/lp/facetas-resina-ipanema` | SIM | BAIXO (LPs noindex) |
| Clareamento | `/clareamento-dental` | `/lp/clareamento-dental` | SIM | BAIXO (LP noindex) |
| Protese | `/protese-dentaria` | `/lp/especialista-protese-ipanema` | SIM | BAIXO (LP noindex) |
| Ortodontia | `/ortodontia` | `/lp/ortodontia-ipanema` | SIM | BAIXO (LP noindex) |
| Estetica | `/lentes-de-contato-dental-e-facetas-de-resina` | `/lp/estetica-dental-ipanema` | SIM | BAIXO (LP noindex) |
| Urgencias | Nenhuma SP dedicada | 3 LPs (dor-de-dente, dente-quebrado, emergencia) | N/A | N/A |
| Saude Gengival | `/saude-da-gengiva` | `/lp/saude-gengival-ipanema` | SIM | BAIXO (LP noindex) |
| Limpeza | `/clinica-geral-e-prevencao` | `/lp/limpeza-dental-ipanema`, `/lp/profilaxia-dental-ipanema` | SIM | BAIXO (LP noindex) |

**Veredicto:** Todas as LPs estao com `noindex, nofollow` -- excelente. Sem risco de canibalizacao com o organico. A estrategia de ter service pages para SEO e LPs para ads esta correta.

### 1.3 Keyword Gaps Identificados

1. **"dentista zona sul" / "dentista rio de janeiro"** -- nao ha pagina dedicada para termos mais amplos
2. **"urgencia dentista ipanema"** -- tem LPs mas nenhuma service page indexavel para capturar organico
3. **"protese fixa" / "protese removivel"** -- subtopicos que poderiam ter heading tags dedicadas
4. **"facetas de porcelana"** -- o slug usa "facetas-de-resina" mas o conteudo cobre ambas; a URL pode confundir
5. **Long-tail organico** -- blog tem 460 usuarios/trimestre com 0% conversao (exceto Probioticos); oportunidade grande

---

## 2. Schema Markup -- Completude

### 2.1 Schemas Globais

| Schema | Arquivo | Status | Observacoes |
|--------|---------|--------|-------------|
| Organization | `GlobalSchemas.tsx` | OK | @id, logo, sameAs, credentials |
| LocalBusiness/Dentist | `GlobalSchemas.tsx` | OK | OpeningHours, GeoCoordinates, AggregateRating |
| Dentist (default) | `SEOHead.tsx` | OK | OfferCatalog, OpeningHours |

**Nota:** Ha 3 schemas JSON-LD globais carregados simultaneamente (Organization, LocalBusiness, e Dentist default do SEOHead). Pages que passam `structuredData` customizado substituem o do SEOHead, mas GlobalSchemas sempre carrega. Isso e intencional e correto.

### 2.2 Schema por Service Page

| Pagina | MedicalProcedure | FAQPage | Outro Schema | QuickAnswerBox | Status |
|--------|:---:|:---:|:---:|:---:|--------|
| **Homepage** (Index.tsx) | Via OfferCatalog | -- | Dentist, Person | -- | OK |
| **Implantes** | SIM | SIM (12 FAQs) | -- | SIM | COMPLETO |
| **Clareamento** | SIM | SIM (10 FAQs) | -- | SIM | COMPLETO |
| **Lentes/Facetas** | Via MedicalWebPage | SIM (12 FAQs) | MedicalWebPage | SIM | COMPLETO |
| **Protese** | SIM | **NAO** | -- | SIM | INCOMPLETO |
| **Ortodontia** | SIM | SIM (12+ FAQs) | -- | SIM | COMPLETO |
| **Tratamento de Canal** | SIM | SIM (6 FAQs) | -- | SIM | COMPLETO |
| **Saude da Gengiva** | SIM | SIM (6 FAQs) | -- | SIM | COMPLETO |
| **Restauracoes** | **NAO** | **NAO** | **NENHUM** | SIM | CRITICO |
| **Clinica Geral** | **NAO** | **NAO** | **NENHUM** | SIM | CRITICO |
| **Servicos** | -- | -- | -- | -- | Sem schema |
| **Sobre** | -- | -- | Person | -- | OK |

### 2.3 Problemas Encontrados

1. **RestaureacoesEsteticas.tsx** -- ZERO schemas JSON-LD. Nenhum MedicalProcedure, nenhum FAQPage, nada. A pagina tem FAQs no conteudo visual mas sem schema.
2. **ClinicaGeralPrevencao.tsx** -- ZERO schemas JSON-LD. Mesma situacao.
3. **ProteseDentaria.tsx** -- Tem MedicalProcedure mas **falta FAQPage** schema. A pagina tem 12 FAQs visuais sem o schema correspondente.
4. **LentesEFacetas.tsx** -- Usa `MedicalWebPage` em vez de `MedicalProcedure`. Funciona, mas e inconsistente com as demais.
5. **Lentes/Facetas** -- O schema `MedicalWebPage` inclui um `offers` com `"availability": "https://schema.org/InStock"` que pode ser questionavel para servicos medicos.

### 2.4 Landing Pages -- Schema

Todas as LPs tem MedicalProcedure schema via config objects. Como sao noindex, o impacto SEO organico e zero, mas e bom para consistencia.

---

## 3. Internal Linking -- Auditoria

### 3.1 Estrutura Atual

**Header (navegacao principal):**
- Inicio `/`
- Sobre `/sobre`
- Tratamentos `/servicos`
- Blog `/blog`
- Depoimentos (ancora `#depoimentos` na homepage)
- Contato `/contato`

**Footer:**
- Politica de Privacidade `/politica-de-privacidade`
- Termos de Uso `/termos-de-uso`
- **PROBLEMA:** A secao "Navegacao" do Footer usa links `#inicio`, `#sobre`, etc. (anchors) em vez de rotas reais. Esses links so funcionam na homepage e estao quebrados em qualquer outra pagina.

**ServicesSection (Hub):**
- Lista 9 servicos com links para cada service page -- funciona como hub principal.
- Usado na homepage e na pagina `/servicos`.

**Breadcrumbs:**
- Todas as service pages tem breadcrumbs: Inicio > Tratamentos > [Nome do Tratamento]
- Formato correto com links para `/` e `/servicos`.

### 3.2 Links Contextuais no Corpo do Conteudo

| Pagina | Links internos no corpo? | Para quais paginas? |
|--------|:---:|-----|
| Homepage | Via ServicesSection | 9 service pages |
| Implantes | **NAO** | Nenhum link contextual |
| Clareamento | **NAO** | Nenhum link contextual |
| Lentes/Facetas | **NAO** | Nenhum link contextual |
| Protese | **NAO** | Nenhum link contextual |
| Ortodontia | **NAO** | Nenhum link contextual |
| Tratamento de Canal | **NAO** | Nenhum link contextual |
| Saude da Gengiva | **NAO** | Nenhum link contextual |
| Restauracoes | **NAO** | Nenhum link contextual |
| Clinica Geral | **NAO** | Nenhum link contextual |
| Blog posts | Via BlogCTA | Apenas CTA WhatsApp, sem link para service pages |
| Sobre | **NAO** | Nenhum |

**CONCLUSAO CRITICA:** As service pages sao completamente isoladas entre si. A unica forma de navegar de uma para outra e voltar ao hub /servicos. Nao ha nenhum link contextual no corpo do conteudo tipo "Apos o clareamento, muitos pacientes optam por [lentes de contato dental](/lentes-de-contato-dental-e-facetas-de-resina)".

### 3.3 InternalLinkingOptimizer.tsx

Existe um componente `InternalLinkingOptimizer.tsx` com mapeamento de links relacionados, MAS ele nao esta sendo usado em NENHUMA service page. O componente existe no codigo mas nao e renderizado.

### 3.4 Orphan Pages

| Pagina | Indexavel? | Linkada de algum lugar? | Status |
|--------|:---:|:---:|--------|
| `/sobre` | SIM | Header nav | OK |
| `/contato` | SIM | Header nav | OK |
| `/servicos` | SIM | Header nav, breadcrumbs | OK |
| `/blog` | SIM | Header nav | OK |
| `/blog/:slug` | SIM | Blog listing page | OK |
| `/seo-dashboard` | SIM | Nao visivel na nav | Potencial orphan (ok se interno) |
| `/diferenciais` | Redirect para `/` | -- | OK |
| Service pages | SIM | Via ServicesSection | OK |
| Landing pages | NAO (noindex) | Apenas via ads | OK |

### 3.5 Topical Clusters

A estrutura de topical clusters esta **implicitamente** presente pela organizacao do conteudo, mas **nao esta linkada**:

```
Homepage (pillar)
  |-- Estetica
  |   |-- Lentes/Facetas (cluster)
  |   |-- Clareamento (cluster)
  |   |-- Restauracoes (cluster)
  |   |   [Nenhum link entre elas]
  |
  |-- Reabilitacao
  |   |-- Implantes (cluster)
  |   |-- Protese (cluster)
  |   |   [Nenhum link entre elas]
  |
  |-- Preventivo
  |   |-- Clinica Geral (cluster)
  |   |-- Saude da Gengiva (cluster)
  |   |   [Nenhum link entre elas]
  |
  |-- Especialidades
  |   |-- Ortodontia (cluster)
  |   |-- Tratamento de Canal (cluster)
  |
  |-- Blog
      [BlogCTA existe mas nao linka para service pages]
```

---

## 4. Content Depth -- Analise por Pagina

### 4.1 Inventario de Conteudo

| Pagina | H2s | H3s | FAQ Count | QuickAnswerBox | ComparisonTable | ProcessTimeline | Profundidade |
|--------|:---:|:---:|:---------:|:--------------:|:--------------:|:---------------:|:--------:|
| Homepage | ~5 (via componentes) | ~10 | 0 | NAO | NAO | NAO | Media |
| Implantes | 5 | 12+ | 12 | SIM | NAO | SIM (5 etapas) | **Alta** |
| Clareamento | 5 | 10+ | 10 | SIM | SIM | SIM (7 etapas) | **Alta** |
| Lentes/Facetas | 6+ | 15+ | 12 | SIM | SIM | SIM | **Muito Alta** |
| Protese | 5+ | 12+ | 12 | SIM | NAO | SIM | **Alta** |
| Ortodontia | 5+ | 12+ | 12+ | SIM | SIM | NAO | **Alta** |
| Trat. Canal | 4+ | 8+ | 6 | SIM | NAO | SIM | **Media-Alta** |
| Saude Gengiva | 4+ | 8+ | 6 | SIM | NAO | SIM | **Media-Alta** |
| Restauracoes | 4+ | 8+ | ? | SIM | NAO | SIM | **Media-Alta** |
| Clinica Geral | 4+ | 8+ | 10 | SIM | NAO | SIM | **Alta** |
| Servicos | 0 | 0 | 0 | NAO | NAO | NAO | **Thin** |
| Sobre | 3+ | 5+ | 0 | NAO | NAO | NAO | Media |

### 4.2 Destaques Positivos

- **Todas as service pages tem QuickAnswerBox** -- otimo para AI Search e featured snippets
- **ComparisonTables** presentes em Clareamento, Lentes/Facetas e Ortodontia
- **ProcessTimeline** em 7 das 9 service pages -- excelente para user engagement
- FAQs extensas (6-12 perguntas) na maioria das paginas
- Conteudo especifico e tecnico sem ser generico -- alinhado com BRAND.md

### 4.3 Pontos de Atencao

- **ServicesPage** (`/servicos`) e essencialmente uma pagina hub com zero conteudo proprio -- apenas lista os servicos. Oportunidade de adicionar texto introdutorio mais robusto.
- **Tratamento de Canal e Saude da Gengiva** tem menos FAQs (6 cada) vs as demais (10-12). Podem ser expandidas.

---

## 5. Canonical & Duplicate Issues

### 5.1 Canonical URLs

| Pagina | Canonical | Correto? |
|--------|-----------|:---:|
| Homepage | `https://dracarlachristoph.com/` | SIM |
| Implantes | `https://dracarlachristoph.com/implantes-dentarios` | SIM |
| Clareamento | `https://dracarlachristoph.com/clareamento-dental` | SIM |
| Lentes/Facetas | `https://dracarlachristoph.com/lentes-de-contato-dental-e-facetas-de-resina` | SIM |
| Protese | `https://dracarlachristoph.com/protese-dentaria` | SIM |
| Ortodontia | `https://dracarlachristoph.com/ortodontia` | SIM |
| Trat. Canal | `https://dracarlachristoph.com/tratamento-de-canal` | SIM |
| Saude Gengiva | `https://dracarlachristoph.com/saude-da-gengiva` | SIM |
| Restauracoes | `https://dracarlachristoph.com/restauracoes-esteticas` | SIM |
| Clinica Geral | `https://dracarlachristoph.com/clinica-geral-e-prevencao` | SIM |
| Blog | `https://dracarlachristoph.com/blog` | SIM |
| Blog posts | `https://dracarlachristoph.com/blog/{slug}` | SIM |
| Sobre | `https://dracarlachristoph.com/sobre` | SIM |
| Contato | `https://dracarlachristoph.com/contato` | SIM |

### 5.2 Redirects

- `/lentes-de-contato-dental-e-facetas-de-porcelana` redireciona (React `<Navigate replace>`) para `/lentes-de-contato-dental-e-facetas-de-resina` -- correto.
- `/diferenciais` redireciona para `/` -- correto.
- `urlRedirects.ts` mantem mapeamento de URLs antigas para novas.

### 5.3 Problemas de Duplicacao

1. **LentesDeContatoPorcelanaLandingPage.tsx** e **LPLentesPorcelana.tsx** -- Ambos apontam o canonical para `https://dracarlachristoph.com/lp/lentes-porcelana-ipanema`. Porem o LentesDeContatoPorcelanaLandingPage **nao tem rota no App.tsx** (nao e acessivel). O LPLentesPorcelana.tsx e mapeado na rota `/lp/lentes-porcelana-ipanema`. Risco: baixo, pois LentesDeContatoPorcelanaLandingPage parece ser um componente legado nao roteado.

2. **ServicesSection.tsx slug mismatch:** O slug no array e `"lentes-de-contato-dental-e-facetas-de-porcelana"` mas a rota real e `/lentes-de-contato-dental-e-facetas-de-resina`. O `getServiceUrl()` trata isso, mas ha inconsistencia entre o slug definido e a rota real. Funciona por causa da logica de redirect, mas nao e ideal.

### 5.4 WWW vs Non-WWW

- `SEOHead.tsx` normaliza todas as URLs para `https://dracarlachristoph.com` (sem www).
- Canonicals todos apontam para o dominio sem www.
- **Pendente:** Confirmar que o servidor Vercel faz redirect 301 de www para non-www (tarefa para Patrick, ja listada em PROJECT-STATUS.md).

### 5.5 Trailing Slashes

- `vercel.json` tem `"cleanUrls": true` -- remove .html e normaliza.
- Canonicals nao usam trailing slash (exceto homepage `/`).
- Consistente.

---

## 6. Title & Meta Description -- Auditoria

### 6.1 Titles

| Pagina | Title | Chars | Keyword presente? | Brand presente? | Qualidade |
|--------|-------|:-----:|:-----------------:|:---------------:|:---------:|
| Homepage | Dentista em Ipanema \| Clinica Odontologica Dra. Carla Christoph | 63 | SIM | SIM | BOM |
| Implantes | Implantes Dentarios em Ipanema \| Dra. Carla Christoph | 54 | SIM | SIM | BOM |
| Clareamento | Clareamento Dental em Ipanema \| Dra. Carla Christoph | 53 | SIM | SIM | BOM |
| Lentes/Facetas | Lentes de Contato Dental e Facetas de Resina em Ipanema \| Dra. Carla | 68 | SIM | SIM | BOM |
| Protese | Protese Dentaria em Ipanema: Recupere Funcao e Estetica do Sorriso | 66 | SIM | **NAO** | MEDIO |
| Ortodontia | Ortodontia em Ipanema \| Dra. Carla Christoph e Dr. Bruno | ~55 | SIM | SIM | BOM |
| Trat. Canal | Tratamento de Canal em Ipanema \| Dra. Carla Christoph | 53 | SIM | SIM | BOM |
| Saude Gengiva | Saude da Gengiva em Ipanema \| Dra. Carla Christoph | 51 | SIM | SIM | BOM |
| Restauracoes | Restauracoes Esteticas em Ipanema \| Dra. Carla Christoph | 57 | SIM | SIM | BOM |
| Clinica Geral | Clinica Geral e Prevencao Odontologica em Ipanema \| Dra. Carla Christoph | 71 | SIM | SIM | BOM (um pouco longo) |
| Servicos | Tratamentos Odontologicos \| Dra. Carla Christoph | 49 | SIM | SIM | MEDIO |
| Sobre | (via SEOHead) | ? | ? | ? | Verificar |
| Blog | (via SEOHead) | ? | ? | ? | Verificar |

### 6.2 Problemas de Title

1. **ProteseDentaria** -- Nao inclui "Dra. Carla Christoph" no title. Inconsistente com as demais.
2. **ClinicaGeralPrevencao** -- Title com 71 chars, pode ser truncado no Google (limite ~60).
3. **ServicesPage** -- Title generico "Tratamentos Odontologicos" sem localizacao "Ipanema".

### 6.3 Meta Descriptions

| Pagina | Chars | Keyword? | CTA? | CRO? | Qualidade |
|--------|:-----:|:--------:|:----:|:----:|:---------:|
| Homepage | ~140 | SIM | SIM ("Agende") | NAO | BOM |
| Implantes | ~155 | SIM | NAO | SIM | BOM |
| Clareamento | ~140 | SIM | NAO | SIM | BOM |
| Lentes/Facetas | ~145 | SIM | NAO | NAO | MEDIO |
| Protese | ~115 | SIM | NAO | NAO | MEDIO |
| Ortodontia | ~150 | SIM | NAO | SIM | BOM |
| Trat. Canal | ~130 | SIM | NAO | SIM | BOM |
| Saude Gengiva | ~125 | SIM | NAO | SIM | BOM |
| Restauracoes | ~155 | SIM | NAO | SIM | BOM |
| Clinica Geral | ~145 | SIM | NAO | SIM | BOM |
| Servicos | ~100 | SIM | NAO | NAO | FRACO |

### 6.4 Problemas de Meta Description

1. **ServicesPage** -- Meta description muito curta (~100 chars) e generica. Nao menciona CRO, nao tem CTA.
2. **Protese** -- Nao menciona CRO-RJ.
3. **Lentes/Facetas** -- Nao menciona CRO-RJ.
4. Nenhuma meta description tem um CTA claro (tipo "Agende sua avaliacao" ou "WhatsApp 24h"). Apenas a homepage tem.

---

## 7. Sitemap -- Verificacao

### 7.1 Sitemap Atual (`api/sitemap.js`)

**Paginas estaticas incluidas:**
- `/` (1.0)
- `/servicos` (0.9)
- `/blog` (0.8)
- `/lentes-de-contato-dental-e-facetas-de-resina` (0.9)
- `/clareamento-dental` (0.9)
- `/protese-dentaria` (0.9)
- `/implantes-dentarios` (0.9)
- `/ortodontia` (0.9)
- `/clinica-geral-e-prevencao` (0.8)
- `/restauracoes-esteticas` (0.8)
- `/tratamento-de-canal` (0.8)
- `/saude-da-gengiva` (0.8)
- `/politica-de-privacidade` (0.3)
- `/termos-de-uso` (0.3)

**Paginas dinamicas incluidas:**
- Blog posts via Contentful API (0.7)

### 7.2 Paginas Ausentes do Sitemap

| Pagina | URL | Indexavel? | Deveria estar no sitemap? |
|--------|-----|:---:|:---:|
| Sobre | `/sobre` | SIM | **SIM** -- FALTANDO |
| Contato | `/contato` | SIM | **SIM** -- FALTANDO |
| Landing Pages | `/lp/*` | NAO (noindex) | NAO -- correto |
| SEO Dashboard | `/seo-dashboard` | SIM (sem noindex!) | Deveria ser noindex |

### 7.3 Outros Problemas

1. **`/seo-dashboard`** -- Pagina interna que nao deveria ser indexavel. Falta `noIndex={true}` ou `noindex` meta tag.
2. `/sobre` e `/contato` sao paginas indexaveis linkadas na navegacao mas ausentes do sitemap.
3. O sitemap dinamico busca posts do Contentful corretamente, com `lastmod` do campo `updatedAt`.

---

## 8. Mobile-First Readiness

### 8.1 Viewport Meta Tag

O `SEOHead.tsx` inclui:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```
Correto.

### 8.2 Responsive Patterns

- Todas as service pages usam Tailwind com `md:` e `lg:` breakpoints.
- Grid layouts: `grid md:grid-cols-2 lg:grid-cols-4`, `grid md:grid-cols-3`, etc.
- `useIsMobile()` hook customizado para ajustes de comportamento.
- Accordion FAQs funcionam bem em mobile (collapsible).
- Hero sections com images responsivas.

### 8.3 Mobile Issues Conhecidos

- **Android UX:** Documentado em PROJECT-STATUS.md que iOS converte 2.4x mais que Android. Patrick precisa testar WhatsApp button em dispositivos Android.
- Font preloading de Google Fonts (`fonts.gstatic.com`) pode impactar performance mobile.

---

## 9. Problemas Tecnicos Adicionais

### 9.1 Open Graph -- og:image

| Pagina | og:image | URL absoluta? | Problema |
|--------|----------|:---:|---------|
| ConsultaInicialLP | `/lovable-uploads/RIT08058...` | **NAO** | URL relativa |
| OrtodontiaLP | `/lovable-uploads/DrBruno_site.webp` | **NAO** | URL relativa |
| ProfilaxiaLP | `/lovable-uploads/vertical-de-jaleco.webp` | **NAO** | URL relativa |
| ImplantesDentarios | `https://dracarlachristoph.com/lovable-uploads/Implante unitario.webp` | SIM | **Espaco no nome do arquivo** |
| ProteseDentaria | `https://dracarlachristoph.com/dra-carla-protese.jpg` | SIM | **Arquivo pode nao existir** |
| Ortodontia | `https://dracarlachristoph.com/og-ortodontia.jpg` | SIM | **Arquivo pode nao existir** |
| Demais | Absolutos | SIM | OK |

### 9.2 Robots

- `robots.js` funciona corretamente -- Allow para AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended).
- CCBot bloqueado (scraper).
- Sitemap declarado no robots.txt.
- **Nota:** `console.log('Robots.txt API called!')` no robots.js -- deveria ser removido em producao.

### 9.3 Vercel Config

- `cleanUrls: true` -- bom.
- Rewrites para sitemap.xml e robots.txt para APIs serverless -- correto.
- SPA fallback `/(.*) -> /index.html` -- correto para React SPA.
- Security headers presentes (X-Content-Type-Options, X-Frame-Options, etc.).

### 9.4 SEOHead Defaults

- `keywords` default inclui termos relevantes -- OK.
- `ogImage` default aponta para `/og-image.jpg` -- verificar se existe.
- `normalizeUrl()` garante que canonical sempre use `.com` -- bom.
- `window.location.href` como fallback para canonical -- pode gerar canonical com query params em trafego pago. O `normalizeUrl` mitiga parcialmente, mas nao strip query params.

---

## 10. Score Detalhado

| Categoria | Peso | Score | Nota |
|-----------|:----:|:-----:|------|
| **Keyword Mapping** | 15% | 80/100 | Bom mapeamento, falta long-tail organico |
| **Schema Markup** | 15% | 60/100 | 2 pages sem schema, 1 sem FAQPage |
| **Internal Linking** | 20% | 35/100 | Critico: zero links contextuais entre service pages |
| **Content Depth** | 15% | 85/100 | Muito bom: FAQs, QuickAnswer, Timeline |
| **Canonical & Duplicates** | 10% | 90/100 | Excelente: canonicals consistentes |
| **Title & Meta Desc** | 10% | 75/100 | Bom mas com inconsistencias menores |
| **Sitemap** | 5% | 70/100 | Faltam /sobre e /contato |
| **Mobile-First** | 5% | 80/100 | Bom, problema Android conhecido |
| **Tecnicos (og, robots)** | 5% | 65/100 | 3 og:image relativas, console.log em robots |

**SCORE GERAL: 68/100**

---

## 11. Recomendacoes

### Quick Wins (Podem ser feitos agora, impacto imediato)

| # | Acao | Impacto | Esforco | Pagina(s) |
|---|------|:-------:|:-------:|-----------|
| 1 | Adicionar MedicalProcedure + FAQPage schema em RestaureacoesEsteticas.tsx | ALTO | 30 min | RestaureacoesEsteticas.tsx |
| 2 | Adicionar MedicalProcedure + FAQPage schema em ClinicaGeralPrevencao.tsx | ALTO | 30 min | ClinicaGeralPrevencao.tsx |
| 3 | Adicionar FAQPage schema em ProteseDentaria.tsx (ja tem FAQs visuais) | ALTO | 15 min | ProteseDentaria.tsx |
| 4 | Corrigir og:image relativas em 3 LPs (ConsultaInicial, Ortodontia, Profilaxia) | MEDIO | 10 min | 3 LPs |
| 5 | Adicionar `/sobre` e `/contato` ao sitemap | MEDIO | 5 min | api/sitemap.js |
| 6 | Adicionar noIndex ao SEODashboardPage | BAIXO | 2 min | SEODashboardPage.tsx |
| 7 | Incluir "Dra. Carla Christoph" no title de ProteseDentaria | BAIXO | 2 min | ProteseDentaria.tsx |
| 8 | Remover console.log do robots.js | BAIXO | 1 min | api/robots.js |

### Medium-Term (Semanas 2-4)

| # | Acao | Impacto | Esforco |
|---|------|:-------:|:-------:|
| 9 | **Implementar internal linking contextual** entre service pages. Adicionar 2-3 links naturais no corpo de cada service page para paginas relacionadas (ex: Implantes -> Protese, Clareamento -> Lentes, Gengiva -> Clinica Geral). | **MUITO ALTO** | 2-3 horas |
| 10 | Integrar o componente InternalLinkingOptimizer.tsx (ja existe!) nas service pages como secao "Tratamentos Relacionados" | ALTO | 1 hora |
| 11 | Adicionar links internos nos blog posts para service pages relevantes (alem do BlogCTA generico) | ALTO | Depende do volume de posts |
| 12 | Corrigir Footer: substituir anchors `#inicio` por rotas reais (`/`, `/sobre`, `/servicos`, `/blog`, `/contato`) | MEDIO | 30 min |
| 13 | Expandir FAQs de Tratamento de Canal (6 -> 10+) e Saude da Gengiva (6 -> 10+) | MEDIO | 1 hora |
| 14 | Adicionar texto introdutorio mais robusto na ServicesPage com keywords de cluster | MEDIO | 30 min |
| 15 | Verificar existencia dos arquivos og:image referenciados (dra-carla-protese.jpg, og-ortodontia.jpg) | MEDIO | 15 min |

### Long-Term (Mes 2+)

| # | Acao | Impacto | Esforco |
|---|------|:-------:|:-------:|
| 16 | Criar pagina dedicada para "Urgencia Dentista Ipanema" indexavel (nao LP) para capturar organico | ALTO | 3-4 horas |
| 17 | Implementar BreadcrumbList schema em todas as service pages (com JSON-LD alem do visual) | MEDIO | 2 horas |
| 18 | Criar estrategia de blog SEO com topical clusters linkando para service pages | ALTO | Ongoing |
| 19 | Implementar hreflang se houver planos de atender turistas (en-us) | BAIXO | 2 horas |
| 20 | Adicionar Review schema (individual reviews) alem do AggregateRating | MEDIO | 1 hora |

---

## 12. Priority Matrix

```
                    ALTO IMPACTO
                        |
    [9] Internal Links  |  [1,2,3] Schema missing
    [18] Blog SEO       |  [11] Blog -> Service links
    [16] Urgencia page  |  [10] InternalLinkingOptimizer
                        |
  ----ALTO ESFORCO------+------BAIXO ESFORCO----
                        |
    [19] Hreflang       |  [4] og:image fix
    [17] Breadcrumb     |  [5] Sitemap +2 pages
        schema          |  [6,7,8] Minor fixes
                        |  [12] Footer fix
                        |
                    BAIXO IMPACTO
```

**Prioridade Maxima:** Items 1, 2, 3 (schema missing -- quick wins de alto impacto) e Item 9 (internal linking -- o maior gap de SEO do site).

---

## 13. Comparacao com Pilar 1 (Revisao Tecnica)

| Aspecto | Pilar 1 Score | Pilar 2 Score | Delta |
|---------|:---:|:---:|:---:|
| Schema | "Completo" | 60/100 | Pilar 1 nao detectou gaps em Restauracoes/ClinicaGeral |
| Internal Linking | N/A | 35/100 | Novo finding critico |
| Content Depth | N/A | 85/100 | Ponto forte confirmado |
| Canonicals | N/A | 90/100 | Ponto forte confirmado |
| Overall | 72/100 | 68/100 | Alineado |

**Quick wins do Pilar 1 ja implementados:** FAQPage em Implantes e Clareamento, og:image fixes, security headers, robots.js AI bots, BlogCTA.tsx. Todos confirmados no codigo.

---

**Proximos Passos:**
1. Implementar Quick Wins 1-8 (proxima sessao tecnica)
2. Planejar internal linking strategy (Item 9) -- maior ROI de SEO
3. Alinhar com Pilar 10 (Blog & Content) para estrategia de blog SEO com topical clusters
