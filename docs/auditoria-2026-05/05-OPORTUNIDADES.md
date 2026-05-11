# Backlog Priorizado de Oportunidades

**Critério de priorização:** Severidade × Impacto ÷ Esforço.
**Cada item tem nota inicial (0–10).** Após a correção, a nota deve subir para 9–10.

---

## 🔴 Sprint 1 — Stop the Line (1 dia, 4–6h)
**Tudo são quick wins (esforço S). Resolve 100% das violações críticas.**

| # | Item | Arquivo | Nota atual | Nota alvo | Tempo |
|---|---|---|:-:|:-:|:-:|
| S1-1 | Remover "Primeira consulta gratuita" e "Parcelamento sem juros" — substituir por trust signals reais (ex: "WhatsApp 24h", "Mín. 1h por consulta", "100% particular") | [src/components/landing/CTASection.tsx:114-128](src/components/landing/CTASection.tsx) | 0 | 9 | 15min |
| S1-2 | Remover ícones Star + campo `rating` do TestimonialsCarousel | [src/components/TestimonialsCarousel.tsx:113-121](src/components/TestimonialsCarousel.tsx) | 2 | 9 | 20min |
| S1-3 | Reescrever depoimento Fernando A. para remover "Recomendo de olhos fechados" | [src/components/TestimonialsCarousel.tsx:28](src/components/TestimonialsCarousel.tsx) | 3 | 9 | 10min |
| S1-4 | Unificar formato dos depoimentos com "Nome I. — Bairro" (juntar `name` + `location`) | [src/components/TestimonialsCarousel.tsx:5-36](src/components/TestimonialsCarousel.tsx) | 5 | 9 | 15min |
| S1-5 | Corrigir CEP do Footer: `22410-901` → `22410-901` | [src/components/Footer.tsx:70](src/components/Footer.tsx) | 1 | 10 | 5min |
| S1-6 | Validar telefone fixo `(21) 3738-7909` no Footer (remover se inativo) | [src/components/Footer.tsx:73](src/components/Footer.tsx) | 6 | 9 | 5min + decisão |
| S1-7 | Trocar "Materiais de Alta Qualidade" por nome do material real (ex: "Whiteness HP Maxx" ou descrição técnica) | [src/components/landing/clareamento/ClareamentoFooter.tsx:73](src/components/landing/clareamento/ClareamentoFooter.tsx) | 2 | 9 | 10min |
| S1-8 | Remover "sem compromisso de iniciar" da LP Estética Genérica | [src/config/esteticaSorrisoGenericaConfig.ts:82](src/config/esteticaSorrisoGenericaConfig.ts) | 2 | 9 | 5min |
| S1-9 | Reescrever WhatsApp message de Profilaxia para não pedir "valores" | [src/config/profilaxiaConfig.ts:13](src/config/profilaxiaConfig.ts) | 3 | 9 | 5min |
| S1-10 | Trocar "Investimento Mais Inteligente" por "Tratamento Mais Inteligente" | [src/config/profilaxiaConfig.ts:31](src/config/profilaxiaConfig.ts) | 4 | 9 | 5min |
| S1-11 | Trocar "atendimento personalizado" no meta description da LP Consulta Inicial | [src/config/consultaInicialConfig.ts:95](src/config/consultaInicialConfig.ts) | 7 | 9 | 5min |
| S1-12 | Trocar "garantia de resultados seguros" por "ajustes e segurança contínua" no ClareamentoGuide | [src/components/landing/clareamento/ClareamentoGuide.tsx:66](src/components/landing/clareamento/ClareamentoGuide.tsx) | 6 | 9 | 5min |

**Total Sprint 1: ~2h de execução** + decisões pontuais (telefone fixo).

---

## 🟠 Sprint 2 — Higiene de Dados (1 dia, 4h)
**Inconsistências de schema e dados estruturados.**

| # | Item | Arquivos | Nota atual | Nota alvo | Tempo |
|---|---|---|:-:|:-:|:-:|
| S2-1 | Unificar `postalCode` em `22410-901` em 3 arquivos | Index.tsx, GlobalSchemas.tsx, Footer.tsx | 2 | 10 | 10min |
| S2-2 | Corrigir `telephone` em GlobalSchemas para `+5521993304045` | GlobalSchemas.tsx:32, 69 | 3 | 10 | 5min |
| S2-3 | Validar `openingHoursSpecification` com Dra. Carla, alinhar Schema com realidade | Index.tsx:44-56, GlobalSchemas.tsx:105-117 | 5 | 9 | 30min |
| S2-4 | Decidir formalmente sobre `AggregateRating`: registrar exceção no CLAUDE.md §11 + BRAND.md §6 OU remover dos 4 arquivos | CLAUDE.md, BRAND.md, GlobalSchemas, SEOHead, EnContactPage, generate-static-meta.cjs | 5 | 9 | 30min + decisão |
| S2-5 | Unificar `priceRange` no schema (Index `"$$"` vs GlobalSchemas `"$$-$$$"`) | Index.tsx:41, GlobalSchemas.tsx:71 | 7 | 9 | 5min |
| S2-6 | Validar `alumniOf` da Dra. Carla — Index diz "Faculdade de Odontologia", GlobalSchemas diz "UFRJ" | Index.tsx, GlobalSchemas.tsx | 6 | 9 | 10min + verificar |

**Total Sprint 2: ~1.5h** + decisões (AggregateRating + horário + alumniOf).

---

## 🟡 Sprint 3 — Atribuição e Especialidade (1–2 dias)
**Risco compliance médio-alto. Exige decisão de copy.**

| # | Item | Arquivos | Nota atual | Nota alvo | Tempo |
|---|---|---|:-:|:-:|:-:|
| S3-1 | Revisar copy de **SaudeDaGengiva** + **SaudeGengivalLandingPage** para deixar claro que periodontia é executada por especialista parceiro | SaudeDaGengiva.tsx, SaudeGengivalLandingPage.tsx, saudeGengivalConfig.ts | 5 | 9 | 2h |
| S3-2 | Auditar **TratamentoDeCanal.tsx** com mesmo critério (atribuição correta a endodontista parceiro) | TratamentoDeCanal.tsx | (pendente) | 9 | 1h |
| S3-3 | Adicionar CRO-RJ 41.684 do Dr. Bruno na seção que o cita | Ortodontia.tsx | 8 | 9 | 15min |
| S3-4 | Revisar `MedicalProcedure: "Saúde Gengival"` e `"Tratamento de Canal"` nos schemas — adicionar `provider` separado para parceiros, ou remover do OfferCatalog do `Dentist` | GlobalSchemas, Index | 5 | 9 | 30min |

---

## 🟢 Sprint 4 — Coerência de Identidade (1 sprint, 1–2 dias)
**Frontend / design system para LPs.**

| # | Item | Arquivos | Nota atual | Nota alvo | Tempo |
|---|---|---|:-:|:-:|:-:|
| S4-1 | Migrar LPs de "Inter" (Google Fonts) para "Playfair + Montserrat" self-hosted | 16 LPs + componentes em `src/components/landing/` | 5 | 9 | 4h |
| S4-2 | Garantir que `LandingFooter` exibe CRO-RJ visível | LandingFooter.tsx | (verificar) | 9 | 15min |
| S4-3 | Confirmar handling de `prefers-reduced-motion` nas animações (count-up, ScrollReveal, hero-animate) | Hero.tsx, HomepageStatsBar.tsx, ScrollReveal.tsx | 7 | 9 | 1h |
| S4-4 | Melhorar `lang` switch — atualizar `<html lang>` ao trocar para EN | i18n setup | 6 | 9 | 1h |
| S4-5 | Revisar Footer — redesign para coerência premium (gradiente sutil, Playfair em headings) | Footer.tsx | 5 | 8 | 2h |
| S4-6 | Mudar formatação CRO-RJ no HomepageStatsBar para "27.509" como subtitle ou prefixo "CRO-RJ" inline | HomepageStatsBar.tsx | 7 | 9 | 30min |

---

## 🔵 Sprint 5 — Performance / SEO técnico (sprint dedicado, 2-3 dias)

| # | Item | Notas atuais | Tempo |
|---|---|:-:|:-:|
| S5-1 | Investigar LCP 3.6s mobile (Hero mask gradient pode ser caro) | 5 | 1d |
| S5-2 | Considerar gerar `sitemap.xml` no build (independente de Contentful runtime) | 7 | 4h |
| S5-3 | Revisar meta description da homepage para diferenciar (incluir iTero ou 20+ anos) | 7 | 15min |
| S5-4 | Avaliar negative keywords no Google Ads para "preço" / "barato" | (externo) | 1h |
| S5-5 | Validar carousel de depoimentos com role="region" + aria-roledescription="carousel" | 7 | 30min |

---

## 🟣 Sprint 6 — Auditoria Profunda das LPs Não Lidas
**Auditoria desta vez não cobriu em profundidade as 16 LPs. Sprint dedicado:**

LPs a auditar individualmente:
- Ortodontia LP
- Limpeza Dental LP
- Lentes Porcelana (3 variações: LPLentesPorcelana, LentesDeContatoPorcelanaLandingPage, LentesDeContatoEmPorcelanaProfissionalLandingPage)
- Facetas Resina Direta LP
- Dor de Dente LP
- Dente Quebrado LP
- Emergência Odontológica LP
- Estética Sorriso LP

Para cada LP, verificar:
- [ ] Headline message-match com keyword do Google Ads
- [ ] WhatsApp pre-message não pede preço
- [ ] CTA usa "consulta", não "avaliação"
- [ ] Sem palavras banidas no copy
- [ ] noindex, nofollow presente
- [ ] Schema FAQPage gerado a partir do config
- [ ] Tom de voz alinhado com BRAND.md
- [ ] CRO-RJ visível
- [ ] Tracking: dataLayer + gtag + sendGCLIDToWebhook em cada CTA
- [ ] Testar em mobile real

---

## Heatmap de Prioridade

```
Severidade × Impacto

CRÍTICO ┐
        │ S1-1 (CTASection gratuita)
        │ S1-2/3/4 (depoimentos)
        │ S1-5 (CEP)
ALTO    ┤
        │ S1-7 (materiais alta qualidade)
        │ S1-8 (sem compromisso)
        │ S2-1/2 (postalCode + telephone)
        │ S3-1 (atribuição periodontia)
MÉDIO   ┤
        │ S1-9/10 (profilaxia)
        │ S2-3/4 (horário + AggregateRating)
        │ S4-1 (fonte das LPs)
BAIXO   ┤
        │ S5 (performance, sitemap)
        │ S6 (deep dive LPs restantes)
        └─────────────────────────►
          Quick win   →   Esforço grande
```

---

## Métricas de Sucesso (após execução)

| Métrica | Antes | Alvo |
|---|:-:|:-:|
| Compliance violações ativas | 12 | 0 |
| Schema postalCode consistente | 33% (1/3) | 100% |
| Depoimentos no formato BRAND.md | 50% (LPs OK, Home não) | 100% |
| Palavras banidas em produção | 6 | 0 |
| Nota geral do site | 6,9 | 8,5+ |

---

## Próximos Passos Sugeridos

1. **Aprovar este backlog** com Patrick
2. **Executar Sprint 1** (Stop the Line — 4–6h) — máximo ROI
3. **Decidir AggregateRating + Horário + Telefone fixo** (decisões pendentes)
4. **Validar atribuição de Periodontia/Canal com Dra. Carla** antes de Sprint 3
5. **Spawnar Sprint 6** (deep dive das LPs restantes) — depois das urgências
