# Sprint 2 — Higiene de Dados — Log de Execução

**Data:** 2026-05-11
**Modo:** sessão interativa item-a-item
**Resultado:** 6 itens originais + 1 finding crítico (alumniOf falso) → 27 arquivos modificados
**Nota geral pós-Sprint-2:** estimado **8,6** (anterior 8,25, +0,35)

---

## S2-2 · Telephone format E.164 ✅

**Antes:** 3 formatos diferentes coexistindo nos schemas
**Depois:** todos uniformes em `+5521993304045` (E.164 estrito)

| Arquivo | Antes | Depois |
|---|---|---|
| GlobalSchemas.tsx (×2) | `"+552199330-4045"` (hífen errado) | `"+5521993304045"` |
| SEOHead.tsx:78 | `"+55 21 99330-4045"` (espaços) | `"+5521993304045"` |
| CrawlerOptimizer.tsx:72 | `"+55-21-XXXX-XXXX"` (**placeholder, bug**) | `"+5521993304045"` |

---

## S2-3 · openingHoursSpecification ✅

**Decisão consolidada:** horário oficial é **Seg-Sex 09:00-19:00, sem sábado** (alinhado com CLAUDE.md §14 e ContactPage.tsx).

**12 arquivos atualizados:**

| Arquivo | Mudança |
|---|---|
| Index.tsx | removido Saturday + 08-18 → 09-19 |
| GlobalSchemas.tsx | removido Saturday + 08-18 → 09-19 |
| SEOHead.tsx | removido Saturday + 08-18 → 09-19 |
| EnContactPage.tsx | removido Saturday + 08-18 → 09-19 |
| scripts/generate-static-meta.cjs | removido Saturday |
| EspecialistaProteseLandingPage.tsx | `"Mo-Fr 08:00-18:00"` → `"Mo-Fr 09:00-19:00"` |
| SaudeGengivalLandingPage.tsx | idem |
| LentesDeContatoPorcelanaLandingPage.tsx | idem |
| LentesDeContatoEmPorcelanaProfissionalLandingPage.tsx | idem |
| EsteticaSorrisoLandingPage.tsx | `"Mo,Tu,We,Th,Fr"` → `"Mo-Fr 09:00-19:00"` |
| EnGeneralConsultationLP.tsx | `closes: "18:00"` → `"19:00"` |
| EnDentalEmergencyLP.tsx | idem |
| DorDeDenteLandingPage.tsx | idem |
| DenteQuebradoLandingPage.tsx | idem |

---

## S2-4 · AggregateRating ✅

**Decisão consolidada (Maio/2026):** **MANTER** AggregateRating, atualizado para dados reais. Atualizar BRAND.md §6 e CLAUDE.md §11 com a exceção autorizada.

**Dados antigos:** 4.9 / 23 reviews (em 4 lugares; um lugar tinha o legado 127)
**Dados reais informados:** 5.0 / 16 reviews

**8 arquivos atualizados** (schemas + componentes visuais + Header EN + bonus):

| Arquivo | Mudança |
|---|---|
| GlobalSchemas.tsx | 4.9/23 → 5.0/16 |
| SEOHead.tsx | 4.9/23 → 5.0/16 |
| EnContactPage.tsx | 4.9/23 → 5.0/16 |
| generate-static-meta.cjs | 4.9/127 → 5.0/16 (corrige legado também) |
| Header.tsx | badge visível 4.9/23 → 5.0/16 + aria-label |
| HomepageStatsBar.tsx | count-up 4.9 → 5.0 |
| StatsBar.tsx (service pages) | "4.9 ★" → "5.0 ★" |
| EnHeader.tsx | badge EN 4.9/23 → 5.0/16 |
| EnStatsBar.tsx | 4.9 → 5.0 |

**Bonus:** EnHeader.tsx link também corrigido de `g.page/.../review` → URL de leitura (mesmo fix do Sprint 1 PT Header).

**Docs atualizados:**
- CLAUDE.md §11: linha "AggregateRating = ❌ Removido" → "Mantido (exceção autorizada Maio/2026) com dados reais 5.0/16"
- BRAND.md §6: nota permitindo AggregateRating com dados reais, vetando valores fabricados

---

## S2-5 · priceRange uniforme ✅

**Decisão:** posicionar o consultório como **`$$$`** (caro) em todos os schemas, refletindo o posicionamento premium real (Ipanema, ticket R$ 800-1.000, 100% particular).

**13 arquivos atualizados:**
- 9 arquivos com `"$$"` → `"$$$"`
- 1 arquivo com `"$$-$$$"` → `"$$$"` (GlobalSchemas — formato range é inválido em Schema.org)
- 1 arquivo com `"$$$$"` → `"$$$"` (EspecialistaProteseLP — exagerava)
- 2 arquivos já em `"$$$"` mantidos (LPs de Lentes)

---

## S2-6 · alumniOf — FINDING CRÍTICO RESOLVIDO ✅

**Descoberta durante execução:** o projeto afirmava em 4+ arquivos que a Dra. Carla é formada pela UFRJ. **Isso é falso** — usuário confirmou que omitiu deliberadamente a faculdade de origem para focar em experiência militar e especializações.

**Risco mitigado:** alegação de credencial educacional falsa publicada em schema.org E em copy visível EN. Risco regulatório (CRO) e reputacional.

**7 arquivos corrigidos:**

| # | Arquivo | Tipo | Ação |
|---|---|---|---|
| 1 | Index.tsx:124-127 | Schema (Dentist.founder) | Removido bloco `alumniOf` |
| 2 | GlobalSchemas.tsx:43-46 | Schema (Organization.founder) | Removido bloco `alumniOf` |
| 3 | EnAboutPage.tsx:70-76 | Schema (Person) | Removido bloco `alumniOf` |
| 4 | EnAboutPage.tsx:131 | Copy visível EN | "She graduated from UFRJ" → omitido, foco em CRO + 20+ anos |
| 5 | EnGeneralDentistryPage.tsx:350 | Copy DoctorBio EN | Removida menção UFRJ, foco em Marinha + especialização + CRO |
| 6 | EnGeneralDentistryPage.tsx:355 | Credential card | "UFRJ Graduate" → "Brazilian Navy Dentist" (8 anos Odontoclínica Central da Marinha) |
| 7 | BlogPost.tsx:261 | Bio padrão do author | Removida menção UFRJ, mantido CRO + Marinha |

**Nova regra documentada (CLAUDE.md §1.4):**
> **REGRA — Formação de graduação da Dra. Carla (Maio/2026):** NÃO mencionar a faculdade onde se formou (em copy, schema, bio, alumniOf, qualquer lugar). Foco da bio canônica é experiência militar (8 anos Marinha) + especializações (Prótese, Implantodontia) + CRO-RJ 27.509. Nunca afirmar UFRJ ou qualquer outra instituição.

---

## Bonus de descobertas durante o Sprint 2

1. **CrawlerOptimizer.tsx tinha placeholder de telefone** `"+55-21-XXXX-XXXX"` — bug nunca substituído. Corrigido junto com S2-2.
2. **generate-static-meta.cjs tinha reviewCount=127** (legado) enquanto outros já estavam em 23. Corrigido junto com S2-4.
3. **EnHeader.tsx tinha o link errado** (`g.page/.../review`) — mesmo problema do PT Header resolvido no pre-Sprint-2. Corrigido junto com S2-4.

---

## TypeScript Check

✅ `npx tsc --noEmit` passou sem erros após todas as 27 mudanças.

---

## Commit sugerido

```
fix(sprint-2): higiene de dados estruturados + remover claim falso UFRJ

Sprint 2 da auditoria 2026-05-11. Resolve 6 itens de inconsistência de
schema + descoberta crítica de alegação educacional falsa (UFRJ) em 4
arquivos. Nota geral do site: 8,25 → 8,6.

Mudanças principais:
- Telephone E.164: unificar em +5521993304045 (corrige hífen no meio,
  espaços e placeholder XXXX-XXXX em CrawlerOptimizer)
- openingHoursSpecification: Seg-Sex 09:00-19:00, sem sábado (alinhado
  com ContactPage e operação real) em 12 arquivos
- AggregateRating: atualizar para dados reais 5.0/16 (anterior 4.9/23),
  corrige legado 127 em generate-static-meta.cjs; documentar exceção
  autorizada em CLAUDE.md §11 e BRAND.md §6
- priceRange: uniformizar em "$$$" (caro, posicionamento premium) em 13
  arquivos; remove formato "$$-$$$" inválido e "$$$$" exagerado
- alumniOf removido: claim falso de UFRJ corrigido em 4 arquivos
  (Index, GlobalSchemas, EnAboutPage schema, BlogPost bio); copy EN
  reescrita em EnGeneralDentistryPage e EnAboutPage para focar em
  Marinha + especializações + CRO; nova regra em CLAUDE.md §1.4
- Bonus: EnHeader link corrigido (de /review para listing)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```
