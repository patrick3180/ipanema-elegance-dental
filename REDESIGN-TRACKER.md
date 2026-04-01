# 🏗️ REDESIGN TRACKER — Dra. Carla Christoph Website v2.0

> **Branch:** `redesign/v2`
> **Início:** 01/04/2026
> **Brief aprovado:** [research/03-build-brief.md](research/03-build-brief.md)
> **Regra de ouro:** Nenhuma alteração vai para produção sem aprovação explícita do cliente.

---

## 📊 Status Geral

| Fase | Descrição | Status | Data Início | Data Conclusão |
|------|-----------|--------|-------------|----------------|
| 0 | Setup: branch + tracker | ✅ Concluída | 01/04/2026 | 01/04/2026 |
| 1 | Quick Win: iTero Element 5D | ✅ Concluída | 01/04/2026 | 01/04/2026 |
| 2 | Auditoria do Design System atual | ⬜ Pendente | — | — |
| 3 | Homepage Redesign | ⬜ Pendente | — | — |
| 4 | Páginas de Serviço (9 páginas) | ⬜ Pendente | — | — |
| 5 | Página "Nossa Tecnologia" (NOVA) | ⬜ Pendente | — | — |
| 6 | LP Template: melhorias incrementais | ⬜ Pendente | — | — |
| 7 | Blog: SEO + otimizações | ⬜ Pendente | — | — |
| 8 | SEO: Schema.org + Meta tags | ⬜ Pendente | — | — |
| 9 | QA: Testes + Performance | ⬜ Pendente | — | — |
| 10 | Revisão Final + Aprovação do Cliente | ⬜ Pendente | — | — |
| 11 | Merge para `main` + Deploy | ⬜ Pendente | — | — |

**Legenda:** ⬜ Pendente | 🔄 Em andamento | ✅ Concluída | ⏸️ Pausada | ❌ Cancelada

---

## FASE 0: Setup ✅

- [x] Commit das pesquisas no branch `main`
- [x] Criar branch `redesign/v2`
- [x] Criar este tracker
- [x] Push do branch para GitHub (backup remoto)

---

## FASE 1: Quick Win — iTero Element 5D ✅

> Trocar todas as menções genéricas de "scanner digital", "scanner intraoral", "escaneamento digital" por "iTero Element 5D" nas LPs e páginas de serviço.

### Landing Pages (configs)
- [x] `ortodontiaConfig.ts` — atualizado (badges, steps, subheadline, CTA)
- [x] `especialistaProteseConfig.ts` — atualizado (benefits, steps)
- [x] `lentesPorcelanaProfissionalConfig.ts` — atualizado (subheadline, steps, badges)
- [x] `lentesPorcelanaAcolhedorConfig.ts` — atualizado (subheadline, steps, badges)
- [x] `esteticaSorrisoGenericaConfig.ts` — atualizado (badges)
- [x] `LPLentesPorcelana.tsx` (legacy LP) — atualizado (meta, OG, hero, badges)
- [x] Configs sem menção de scanner (clareamento, facetas resina, emergência, dor de dente, dente quebrado, consulta inicial, limpeza, profilaxia, saúde gengival) — verificados, OK

### Páginas de Serviço (site institucional)
- [x] `ClinicaGeralPrevencao.tsx` — 15 referências atualizadas (FAQs, meta, Schema.org, badges, hero, process steps, CTA)
- [x] `ProteseDentaria.tsx` — 4 referências atualizadas (process steps, doctor section)
- [x] `LentesEFacetas.tsx` — 8 referências atualizadas (FAQ, hero, benefits, tech section, process steps, CTA)
- [x] `Ortodontia.tsx` — 11 referências atualizadas (FAQs, meta, keywords, Schema.org, hero, tech section, CTA)
- [x] `ImplantesDentarios.tsx` — 4 referências atualizadas (badges, QuickAnswer, process steps, doctor section)
- [x] `RestaureacoesEsteticas.tsx` — 3 referências atualizadas (process steps, alt text, tech section)
- [x] `AboutPage.tsx` — 3 referências atualizadas (technology, doctor bio, first consultation)

### Componentes Compartilhados
- [x] `AboutSection.tsx` — 1 referência atualizada (doctor bio)
- [x] `ServicesSection.tsx` — 1 referência atualizada (lentes description)

### Blog
- [x] `blogPosts.ts` — 2 referências atualizadas (digital dentistry article)

### Commit
- [x] `fix(copy): standardize all scanner references to iTero Element 5D` — commit `06ead4b`

---

## FASE 2: Auditoria do Design System

> Revisar tokens, componentes e padrões visuais antes de começar o redesign.

- [ ] Auditar `tailwind.config.ts` — cores, fonts, spacing
- [ ] Auditar componentes base em `src/components/`
- [ ] Mapear componentes reutilizáveis vs. código duplicado
- [ ] Documentar design tokens atuais
- [ ] Identificar gaps vs. o Brief (Ex: breadcrumb, stats bar)
- [ ] Definir novos componentes necessários
- [ ] Commit: `audit(design): document current design system`

---

## FASE 3: Homepage Redesign

> Reconstruir a homepage seguindo o blueprint do Brief v2.0.

### Seções (ordem da página)
- [ ] 3.1 Navbar — Logo, menu dropdown, EN toggle, CTA WhatsApp
- [ ] 3.2 Hero Section — Badge, H1, sub, foto AVIF, stats bar, CTAs
- [ ] 3.3 Serviços Grid — Cards com ícone + título + link
- [ ] 3.4 "Por que a Dra. Carla?" — Diferenciais com ícone + parágrafo
- [ ] 3.5 Tecnologia Destaque — iTero Element 5D com foto
- [ ] 3.6 Depoimentos — Carousel com estrelas + nome + bairro
- [ ] 3.7 Blog Preview — 3 últimos artigos do Contentful
- [ ] 3.8 CTA Final — WhatsApp
- [ ] 3.9 Footer — Info, mapa, horários, redes sociais

### Requisitos Técnicos
- [ ] Critical CSS inline
- [ ] AVIF responsive images
- [ ] Micro-animações (entrada de seções)
- [ ] Mobile-first responsive
- [ ] Schema.org LocalBusiness
- [ ] Open Graph meta tags

### Commits
- [ ] `feat(homepage): new hero section with stats bar`
- [ ] `feat(homepage): services grid + differentials`
- [ ] `feat(homepage): technology showcase + testimonials`
- [ ] `feat(homepage): blog preview + CTA + footer`

### Checkpoint
- [ ] **PAUSA PARA APROVAÇÃO DO CLIENTE** — rodar localmente e avaliar

---

## FASE 4: Páginas de Serviço (9 páginas)

- [ ] 4.1 Implantes Dentários
- [ ] 4.2 Prótese Dentária
- [ ] 4.3 Lentes de Contato e Facetas
- [ ] 4.4 Clareamento Dental
- [ ] 4.5 Clínica Geral e Prevenção
- [ ] 4.6 Ortodontia
- [ ] 4.7 Saúde da Gengiva
- [ ] 4.8 Tratamento de Canal
- [ ] 4.9 Restaurações Estéticas

### Checkpoint
- [ ] **PAUSA PARA APROVAÇÃO DO CLIENTE**

---

## FASE 5: Página "Nossa Tecnologia" (NOVA)

- [ ] Design da página
- [ ] Seção iTero Element 5D com foto e descrição
- [ ] Outros equipamentos relevantes
- [ ] Conexão com serviços (links cruzados)
- [ ] Schema.org
- [ ] Commit: `feat(pages): add Nossa Tecnologia page`

### Checkpoint
- [ ] **PAUSA PARA APROVAÇÃO DO CLIENTE**

---

## FASE 6: LP Template — Melhorias Incrementais

> Apenas ajustes finos, não reestruturação. LPs já estão excelentes.

- [ ] Schema.org FAQPage markup em todas as LPs
- [ ] Diversificar stats por serviço (não repetir os mesmos 4)
- [ ] Commit: `feat(lp): add FAQPage schema + diversify stats`

---

## FASE 7: Blog — SEO + Otimizações

- [ ] Schema.org Article em posts
- [ ] Tabela de conteúdos automática
- [ ] Otimização para featured snippets
- [ ] Breadcrumb navigation
- [ ] Commit: `feat(blog): add schema, ToC, breadcrumbs`

---

## FASE 8: SEO — Schema.org + Meta Tags

- [ ] Schema.org LocalBusiness em todas as páginas
- [ ] Schema.org MedicalOrganization
- [ ] Open Graph completo em cada página
- [ ] Canonical URLs explícitas
- [ ] Sitemap atualizado automaticamente
- [ ] Commit: `feat(seo): comprehensive schema.org + OG tags`

---

## FASE 9: QA — Testes + Performance

- [ ] Lighthouse audit (mobile + desktop)
- [ ] Meta 95+ no mobile
- [ ] Verificar todas as rotas
- [ ] Testar em Chrome, Safari, Firefox
- [ ] Testar responsive (mobile, tablet, desktop)
- [ ] Verificar todos os links WhatsApp
- [ ] Verificar Schema.org com Google Rich Results Test
- [ ] Commit: `test(qa): final QA pass`

---

## FASE 10: Revisão Final + Aprovação

- [ ] Apresentar resultado final ao cliente
- [ ] Coletar feedback
- [ ] Implementar ajustes finais
- [ ] **APROVAÇÃO FINAL DO CLIENTE**

---

## FASE 11: Merge + Deploy

- [ ] `git checkout main`
- [ ] `git merge redesign/v2`
- [ ] `git push origin main`
- [ ] Verificar deploy em produção
- [ ] Validar site online
- [ ] Fechar tracker

---

## 📝 Log de Decisões

| Data | Decisão | Contexto |
|------|---------|----------|
| 01/04/2026 | Brief v2.0 aprovado | Cliente confirmou direcionamento |
| 01/04/2026 | Sem galeria de casos clínicos | Privacidade dos pacientes — decisão deliberada |
| 01/04/2026 | Sem programa preventivo formal | Não é objetivo do consultório |
| 01/04/2026 | Sem "consulta sem compromisso" | Posicionamento 100% premium/particular |
| 01/04/2026 | Scanner = "iTero Element 5D" | Nome correto do equipamento (Align Technology) |
| 01/04/2026 | Mariana Wolf = referência estilística | Concorrente mais próxima em abordagem |
| 01/04/2026 | Rothier = concorrente direto | Mas site considerado visualmente poluído |
| 01/04/2026 | DenTotal ≠ concorrente direto | Posicionamento diferente (avaliação gratuita) |
| 01/04/2026 | LPs = canal principal de conversão | 16 LPs recebem tráfego do Google Ads |
| 01/04/2026 | LPs não precisam de reestruturação | Já em processo de adaptação ao formato completo |
| 01/04/2026 | Reviews via web app de gestão | Fluxo pós-consulta com recibo + link Google |

---

## 🔗 Referências

- **Brief Aprovado:** [research/03-build-brief.md](research/03-build-brief.md)
- **Brand Extraction:** [research/01-client-brand.md](research/01-client-brand.md)
- **Análise Competitiva:** [research/02-competitor-analysis.md](research/02-competitor-analysis.md)
- **Relatório Visual:** [competitive-analysis.html](competitive-analysis.html)
- **Branch de trabalho:** `redesign/v2`
- **Branch de produção:** `main`
