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
| 2 | Auditoria do Design System atual | ✅ Concluída | 01/04/2026 | 01/04/2026 |
| 3 | Homepage Redesign | ✅ Concluída | 01/04/2026 | 01/04/2026 |
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

## FASE 2: Auditoria do Design System ✅

> Revisar tokens, componentes e padrões visuais antes de começar o redesign.

- [x] Auditar `tailwind.config.ts` — cores, fonts, spacing
- [x] Auditar componentes base em `src/components/` (34 files + 10 subdirs)
- [x] Mapear componentes reutilizáveis vs. código duplicado
- [x] Documentar design tokens atuais (cores, tipografia, sombras, gradientes, animações)
- [x] Identificar gaps vs. o Brief (5 novos componentes + 1 upgrade necessários)
- [x] Definir novos componentes necessários (HomepageStatsBar, DifferentialsSection, TechnologyShowcase, BlogPreview, FinalCTA, TestimonialCarousel)

### Problemas Encontrados
- 🔴 CSS duplicado: `shadow-elegant`, `shadow-soft`, `shadow-gold`, `bg-gradient-purple-soft` definidas 2x no index.css com valores diferentes
- 🟡 Playfair Display carrega apenas peso 400, mas usa font-medium (500)
- 🟡 Utility `elegant-shadow` redundante com `shadow-soft`

### Gaps vs Brief (Homepage)
- ❌ Stats Bar no hero (existe em treatment mas não na homepage)
- ❌ "Por que a Dra. Carla?" — seção de diferenciais dedicada
- ❌ Tecnologia Destaque (iTero Element 5D)
- ❌ Blog Preview (3 últimos artigos)
- ❌ CTA Final antes do footer
- ❌ Navbar dropdown de Tratamentos
- ❌ Depoimentos como carousel (atualmente grid estático)

### Relatório Completo
- [Auditoria do Design System](../../../.gemini/antigravity/brain/6e1c5f75-f121-43ab-a08c-26dc18d4aceb/design_system_audit.md)

### Commit
- [x] `audit(design): complete design system audit` — documentado em artifact

---

## FASE 3: Homepage Redesign ✅

> Reconstruir a homepage seguindo o blueprint do Brief v2.0.

### CSS Cleanup
- [x] Consolidar CSS duplicado (shadow/gradient definitions)
- [x] Adicionar Playfair Display 600 (semibold)
- [x] Atualizar heading utilities para font-semibold

### Novos Componentes Criados
- [x] `HomepageStatsBar.tsx` — Count-up animado (20+ anos, 4000+ pacientes, CRO-RJ)
- [x] `DifferentialsSection.tsx` — 4 cards "Por que a Dra. Carla?"
- [x] `TechnologyShowcase.tsx` — iTero Element 5D dark section
- [x] `TestimonialsCarousel.tsx` — Carousel com auto-play, dots, arrows, 5 depoimentos
- [x] `BlogPreview.tsx` — 3 artigos com cards hover, categories, read time
- [x] `FinalCTA.tsx` — CTA WhatsApp full-width com tracking

### Index.tsx Recomposto (10 seções)
- [x] 1. Hero — Badge + H1 + Trust Badges + 2 CTAs + Photo
- [x] 2. HomepageStatsBar — Prova social imediata
- [x] 3. AboutSection — Bio + foto + CTA
- [x] 4. DifferentialsSection — Por que a Dra. Carla?
- [x] 5. ServicesSection — Grid 3x3
- [x] 6. TechnologyShowcase — iTero Element 5D
- [x] 7. TestimonialsCarousel — Carousel com estrelas
- [x] 8. BlogPreview — 3 artigos recentes
- [x] 9. FinalCTA — WhatsApp
- [x] 10. ContactSection — Form + info + mapa

### Implementações Adicionais
- [x] 3.1 Navbar dropdown de Tratamentos (hover desktop + accordion mobile)
- [x] Micro-animações de entrada de seção (ScrollReveal: fade-up, fade-in, scale-in)
- [x] Hook `useScrollReveal` com `IntersectionObserver` + `prefers-reduced-motion`

### Requisitos Técnicos
- [x] Schema.org LocalBusiness (existente, mantido)
- [x] Open Graph meta tags (existente, mantido)
- [ ] Critical CSS inline — movido para Fase 9 (QA)
- [ ] AVIF responsive images — movido para Fase 9 (QA)

### Commits
- [x] `feat(homepage): complete Phase 3 redesign` — commit `664ba1c`

### Checkpoint
- [x] **Visualizado localmente** — servidor em porta 8080, todas as seções verificadas

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
