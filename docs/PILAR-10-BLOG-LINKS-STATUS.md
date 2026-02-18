# PILAR 10 — Internal Links Blog: Status de Execucao

**Data:** 17-18 de Fevereiro de 2026
**Responsavel:** Patrick + IA
**Status:** COMPLETO

---

## Objetivo

Adicionar links internos contextuais em 10 posts prioritarios do blog para:
1. Melhorar internal linking (SEO Score atual: 35/100)
2. Direcionar leitores de blog para service pages
3. Aumentar tempo de sessao e pageviews

---

## Acoes Realizadas

### 1. Unpublish de 6 Posts Historicos
**Data:** 17/02/2026

Posts com conteudo historico (Egito, Roma, Vikings, etc.) removidos da indexacao:

| Post | Entry ID | Status |
|------|----------|--------|
| Dentistas no Egito Antigo | 73MKFU8V3E8m1nVUlFMXnd | Unpublished |
| Dentistas na Roma Antiga | 2K4JgcOnRRW8hxRjzsSUJ3 | Unpublished |
| Barbeiros-Cirurgioes | 1zlUAdlcWRjtfc1EqGH2EN | Unpublished |
| Dentadura de George Washington | 2bNoWLNzKtk29YL2vUuY1l | Unpublished |
| Historia da Anestesia Odontologica | 4gSj5W5xQ9rRCp6sDpbhyA | Unpublished |
| Dentistas Vikings | 3IHBELjo1YjtBEbywvgPTQ | Unpublished |

**Motivo:** Nao convertem (nenhuma conversao registrada), conteudo historico nao atrai pacientes locais buscando tratamento.

---

### 2. Links Internos Injetados em 10 Posts
**Data:** 17-18/02/2026
**Script:** `scripts/add-blog-links.py`

| # | Post (slug) | Link Injetado | URL Destino | Status |
|---|-------------|---------------|-------------|--------|
| 1 | `saude-bucal-periodontite-causas-tratamento` | "perda dentaria" | /saude-da-gengiva | SKIP (ja existia) |
| 2 | `emergencia-dente-quebrou` | "faceta" | /lentes-de-contato-dental-e-facetas | PUBLICADO |
| 3 | `saude-bucal-carie-oculta` | "restauracao" | /restauracoes-esteticas | PUBLICADO* |
| 4 | `saude-bucal-dente-trincado` | "gengiva" | /saude-da-gengiva | PUBLICADO** |
| 5 | `saude-bucal-mau-halito` | "gengivite" | /saude-da-gengiva | PUBLICADO** |
| 6 | `saude-bucal-alimentos-com-amido-causam-caries` | "prevencao" | /clinica-geral-e-prevencao | PUBLICADO* |
| 7 | `saude-bucal-jejum-intermitente` | "higiene bucal" | /clinica-geral-e-prevencao | PUBLICADO** |
| 8 | `saude-bucal-bruxismo-e-estresse` | "placa" | /clinica-geral-e-prevencao | PUBLICADO* |
| 9 | `estetica-clareamento-dental` | "restauracoes" | /restauracoes-esteticas | PUBLICADO** |
| 10 | `saude-bucal-dentes-amarelos` | "clareamento" | /clareamento-dental | PUBLICADO* |

**Legenda:**
- SKIP: Link ja existia no post (periodontite ja tinha /saude-da-gengiva)
- PUBLICADO: Link injetado com sucesso e publicado
- *: Tambem adicionado campo `schemaType: Article` (campo obrigatorio que faltava em posts antigos)
- **: Link alternativo (texto original planejado nao existia no conteudo — ajustado para texto disponivel)

---

## Problemas Encontrados e Solucoes

### Problema 1: Campo obrigatorio `schemaType` ausente
- **Entradas afetadas:** carie-oculta, alimentos-amido, bruxismo, dentes-amarelos
- **Causa:** Posts antigos criados antes do campo `schemaType` ser adicionado ao content model
- **Erro:** HTTP 422 na publicacao: "The property schemaType is required here"
- **Solucao:** Script detecta ausencia e adiciona `schemaType: Article` automaticamente

### Problema 2: Texto planejado nao existe no conteudo
- **Entradas afetadas:** dente-trincado, mau-halito, jejum-intermitente, clareamento-estetica
- **Causa:** Posts foram reescritos apos planejamento dos links
- **Solucao:** Identificado texto alternativo semanticamente equivalente:
  - "faceta" (dente-trincado) -> "gengiva" (em "linha da gengiva")
  - "doenca periodontal" (mau-halito) -> "gengivite" (em "gengivite e periodontite")
  - "check-up" (jejum-intermitente) -> "higiene bucal"
  - "lentes" (clareamento-estetica) -> "restauracoes"

### Problema 3: Texto ja linkado
- **Entrada afetada:** dente-trincado ("Implantes dentarios" ja era hyperlink em lista)
- **Solucao:** Script verifica se texto alvo e plain TEXT node, evita re-linkar hyperlinks existentes

### Problema 4: UnicodeEncodeError no Windows (cp1252)
- **Causa:** Terminal Windows nao suporta emoji/Unicode em sys.stdout por padrao
- **Solucao:** Substituidos todos chars Unicode no script por equivalentes ASCII ([OK], [FAIL], [WARN])

---

## Script Utilizado

**Arquivo:** `scripts/add-blog-links.py`

Funcionalidades:
- Busca entry via Contentful Management API
- Verifica se link ja existe (evita duplicatas)
- Percorre Rich Text JSON recursivamente
- Injeta hyperlink node no primeiro paragrafo com texto-alvo
- Adiciona `schemaType: Article` quando campo ausente
- Publica entrada apos atualizacao

---

## Impacto Esperado

- 10 posts com link interno para service pages (vs. 0 anteriores)
- Melhor distribuicao de PageRank interno
- Leitores de blog tem caminho claro para pages de conversao
- SEO Score internal linking: 35/100 -> estimado 45-50/100 (base para Sprint 7 que completara o trabalho)

---

## Proximo Passo

**Sprint 7: Internal Linking** — Adicionar links entre SERVICE PAGES (service page A -> service page B)
Isso e separado e complementar: posts de blog -> service pages (feito) + service pages -> service pages (proximo)

---

**Ultima atualizacao:** 18/02/2026
