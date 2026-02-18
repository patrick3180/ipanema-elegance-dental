# SPRINT 9 — Landing Page Optimization

**Data:** 18 de Fevereiro de 2026
**Status:** EM PROGRESSO
**Commits:** `fb511a4`, `bc923c1`

---

## Phase 1: Quick Wins de Alta Conversão ✅

### 1.1 Urgência Ética em 10 CTAs
Adicionado campo `urgency` em todos os configs de LP, com tom factual alinhado ao BRAND.md.

| LP | Urgência |
|----|----------|
| Consulta Inicial | Pequenos problemas detectados cedo evitam tratamentos complexos. |
| Lentes (Acolhedor) | Quem já pensou em mudar o sorriso ganha ao planejar com calma. |
| Lentes (Profissional) | Quem busca lentes já sabe o que quer mudar — a avaliação mostra como chegar lá. |
| Clareamento | Escurecimento dental tende a avançar com o tempo. |
| Facetas Resina | Pequenas correções ficam mais simples quando planejadas com antecedência. |
| Estética Sorriso | O primeiro passo é entender o que faz sentido para o seu caso. |
| Saúde Gengival | Sangramento gengival ignorado pode evoluir para problemas. |
| Prótese | Espaços sem dentes causam movimentação dos dentes vizinhos. |
| Ortodontia | Ortodontia é viável em qualquer idade. |
| Limpeza | Tártaro acumulado evolui para problemas gengivais. |

### 1.2 Headlines Reescritas (4 LPs)

| LP | Antes | Depois |
|----|-------|--------|
| Limpeza | "Limpeza Dental Profissional em Ipanema" | "Tártaro e Sensibilidade? Limpeza com Ultrassom em Ipanema" |
| Clareamento | "Clareamento Dental que Respeita a Naturalidade…" | "Dentes Amarelados? Clareamento com Resultado Natural em Ipanema" |
| Estética | "Estética Dental em Ipanema…" | "Não Sabe se Precisa de Lentes, Clareamento ou Facetas? Descubra" |
| Lentes | "Sinta-se à Vontade para Sorrir…" | "Escondendo o Sorriso? Lentes de Porcelana com Test Drive" |

### 1.3 Consolidar Limpeza + Profilaxia
- [ ] Pendente — requer redirect 301 no hosting

---

## Phase 2: Brand Compliance ✅

- **3x "Premium" removido** de configs (dorDeDente, denteQuebrado, profilaxia)
- **Facetas testimonials corrigidos:** "incrível" removido, bairros adicionados
- **"Mesmo Dia" → "Primeira Sessão"** em headline + CTA de Facetas
- **"Materiais Premium" → "Materiais de Alta Qualidade"** em ClareamentoFooter

---

## Phase 3: Performance & Estrutura ✅

### 3.1 Card Asymmetry Fix
Grid dinâmico `md:grid-cols-2` para 4 itens (layout 2×2 simétrico). Corrigido em:
- `ClareamentoProblem.tsx`
- `ProblemSection.tsx`
- `ConsultaInicialProblem.tsx`

### 3.2 ClareamentoFooter BRAND Fix
- "Materiais Premium" → "Materiais de Alta Qualidade"

### 3.3 Migrar 16 LPs para LazySection
Todas as 16 landing pages agora usam `LazySection` (IntersectionObserver-based) para below-fold sections. Padrão:
```tsx
<LazySection fallback={...} threshold={0.1} rootMargin="100px">
  <Suspense fallback={...}>
    <Component {...props} />
  </Suspense>
</LazySection>
```

### 3.4 AVIF Hero Images
- [x] Geradas variantes AVIF responsivas (480, 768, 1024px) para 5 hero images
- Imagens: `dra-carla-jaleco-bracos-cruzados`, `RIT08058-vertical-doutora-site`, `doutora-em-pe-jaleco`, `vertical-de-jaleco`, `DrBruno_site`

### 3.5 LandingFooter Migration
- `ClareamentoFooter` substituído por `LandingFooter` em todas as 16 LPs
- Props: `doctorName`, `clinicName`, `phoneNumber`

### 3.6 Adequar LP Lentes Profissional
- Migrada para formato padrão com LazySection + LandingFooter

---

## Validação

- ✅ `npm run build` — zero errors
- ✅ Zero referências a `ClareamentoFooter` nas landing pages
- ✅ Git push: `bc923c1` → `origin/main`

---

## Pendente

- [ ] Consolidar Limpeza + Profilaxia (redirect 301)
- [ ] Secções empáticas em SPs restantes (Sprint 8 scope)
