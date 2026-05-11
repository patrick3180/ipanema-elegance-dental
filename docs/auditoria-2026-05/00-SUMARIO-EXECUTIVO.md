# Auditoria 360° — Sumário Executivo

**Data da auditoria:** 2026-05-11
**Sprint 1 executado em:** 2026-05-11 (mesma sessão)
**Site auditado:** https://dracarlachristoph.com (produção, branch `main` @ `6607711`)
**Worktree:** `silly-davinci-46087d`
**Escopo:** 56 páginas (Core PT, 9 service pages, 16 LPs, blog, micro-site EN), schema, sitemap, tracking, design system.

---

## Notas — Antes vs. Depois do Sprint 1

| Dimensão | Antes | Depois | Δ |
|---|:-:|:-:|:-:|
| **SEO** | 7,4 | **8,3** | +0,9 |
| **Qualidade Visual / UX** | 7,6 | **8,1** | +0,5 |
| **Marketing / Copy** | 6,8 | **8,4** | +1,6 |
| **Qualidade da Informação / Compliance** | 5,9 | **8,2** | +2,3 |
| **MÉDIA GERAL** | 6,9 | **8,25** | +1,35 |

---

## Heatmap por Tipo de Página (atual)

| Tipo | Compliance | SEO | Visual | Copy |
|---|:-:|:-:|:-:|:-:|
| Homepage (`/`) | 9 | 9 | 9 | 9 |
| About (`/sobre`) | 9 | 9 | 8 | 9 |
| Contato (`/contato`) | 9 | 9 | 7 | 8 |
| Service Pages PT (9) | 7 | 9 | 8 | 8 |
| Landing Pages PT (16) | 8 | 9 | 6 | 7 |
| Blog | 7 | 7 | 7 | 7 |
| Micro-site EN | 7 | 9 | 7 | 7 |

> Maior salto: **LPs** (Compliance 3 → 8), pelo CTASection corrigido + LP Estética + LP Profilaxia.

---

## Sprint 1 — Resultado das 12 Ações

| # | Item | Antes | Depois | Status |
|---|---|:-:|:-:|:-:|
| S1-1 | CTASection trust signals ("gratuita", "parcelamento") | 0 | 9 | ✅ |
| S1-2/3/4 | TestimonialsCarousel (estrelas, "Recomendo", formato) | 2 | 9 | ✅ |
| S1-5 | CEP global (47 arquivos código + 5 docs) | 1 | 10 | ✅ |
| S1-6 | Telefone fixo (validado ativo, doc atualizado) | 6 | 9 | ✅ |
| S1-7 | ClareamentoFooter "alta qualidade" | 2 | 9 | ✅ Exceção autorizada e documentada |
| S1-8 | esteticaSorrisoGenericaConfig "sem compromisso" | 2 | 9 | ✅ |
| S1-9 | profilaxiaConfig WhatsApp "valores" | 3 | 9 | ✅ |
| S1-10 | profilaxia "Investimento Mais Inteligente" | 4 | 9 | ✅ Exceção autorizada e documentada |
| S1-11 | consultaInicialConfig "atendimento personalizado" | 7 | 9 | ✅ (só na description; title/keyword mantidos) |
| S1-12 | ClareamentoGuide "garantia de resultados" | 6 | 9 | ✅ |
| Bonus | Atendimento 24h → WhatsApp 24h (SocialProofSection, ContactPage) | 6 | 9 | ✅ |
| Bonus | Index.tsx comentário "Carousel com estrelas" | — | — | ✅ |

**Tempo real de execução:** ~1h (em sessão interativa item a item)

---

## Conformidade com CLAUDE.md / BRAND.md (estado atual)

| Regra | Status |
|---|:-:|
| Sem fotos antes/depois | ✅ Apenas modelos 3D |
| Sem mencionar preços | ✅ "gratuita", "parcelamento", "valores" removidos |
| Sem garantir resultados | ✅ "garantia de resultados" reescrito |
| Sem criticar outros dentistas | ✅ |
| CRO-RJ visível | ✅ Hero + Footer + About + Schema |
| Palavras banidas | ⚠️ Exceções autorizadas documentadas (clareamento, profilaxia) |
| "Consulta" em vez de "avaliação" em CTAs | ✅ |
| Atribuição Dra. Carla vs. parceiros | ⚠️ SaudeDaGengiva ainda ambígua (Sprint 3) |
| Dr. Bruno sem "Christoph" | ✅ |
| Depoimentos sem estrelas/profissão | ✅ Estrelas removidas, formato "Nome — Bairro" |
| `AggregateRating` removido | ⚠️ Decisão consolidada pendente (Sprint 2 / SEO-3) |
| GTM apenas via index.html | ✅ |
| GCLID em localStorage | ✅ |

---

## O Que Resta — Próximos Sprints

### Sprint 2 (Higiene de Dados, ~4h)
- Telephone format em GlobalSchemas (`+552199330-4045` → `+5521993304045`)
- Horário de funcionamento (CLAUDE.md diz Seg-Sex 9-19h; schemas dizem Mon-Sat com sábado)
- AggregateRating: decisão formal (manter c/ exceção documentada ou remover)
- priceRange e alumniOf inconsistentes entre schemas

### Sprint 3 (Atribuição, ~1-2 dias)
- SaudeDaGengiva/SaudeGengivalLandingPage: deixar claro que periodontia é executada por especialista parceiro
- TratamentoDeCanal: mesmo critério para endodontista parceiro
- CRO-RJ 41.684 do Dr. Bruno visível onde ele é citado
- Schema MedicalProcedure: separar provider para parceiros

### Sprint 4 (Coerência LPs, ~1-2 dias)
- Migrar LPs de Inter (Google Fonts) para Playfair+Montserrat self-hosted
- Validar CRO-RJ no LandingFooter
- `prefers-reduced-motion` nas animações
- `<html lang>` switch automático para EN
- Redesign do Footer principal
- Formatação CRO no HomepageStatsBar

### Sprint 5 (Performance/SEO, ~2-3 dias)
- LCP mobile 3.6s
- Sitemap estático no build
- Meta description homepage mais distintiva
- Carousel a11y

### Sprint 6 (Deep-dive LPs)
- Auditoria individual das 16 LPs (algumas só vistas via grep neste Sprint)

---

## Conclusão

Em uma sessão interativa de aproximadamente 1 hora, o site saiu de **6,9 → 8,25** na nota geral. **Nenhuma violação CRO ou de regra inviolável ativa permanece** no código. Restam decisões estratégicas (Sprints 2-3) e melhorias de coerência (Sprints 4-5).

O site agora está em condição de **enviar tráfego pago do Google Ads sem produzir atrito**: a mensagem do anúncio, a LP de destino e o tom premium estão alinhados.

---

## Como Ler os Relatórios Detalhados

- **[01-AUDIT-SEO.md](01-AUDIT-SEO.md)** — meta, schema, sitemap, robots, performance
- **[02-AUDIT-VISUAL-UX.md](02-AUDIT-VISUAL-UX.md)** — design system, hierarquia, mobile, a11y
- **[03-AUDIT-MARKETING-COPY.md](03-AUDIT-MARKETING-COPY.md)** — tom de voz, CTAs, message-match
- **[04-AUDIT-COMPLIANCE-INFO.md](04-AUDIT-COMPLIANCE-INFO.md)** — CRO, palavras banidas, atribuição
- **[05-OPORTUNIDADES.md](05-OPORTUNIDADES.md)** — backlog priorizado (impacto × esforço)
- **[06-SPRINT-1-EXECUTADO.md](06-SPRINT-1-EXECUTADO.md)** — log das 12 ações com diffs e decisões
