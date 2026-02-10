

## Prompt 13 — Issues Pendentes da Fase 2

### Resumo
4 alteracoes: remover min-h-screen de 4 LPs, limpar config de facetas, corrigir defaultStats do SocialProofSection, e migrar FacetasResinaDiretaLandingPage para componentes ConsultaInicial*.

---

### Alteracao 1: Remover min-h-screen wrappers (4 arquivos)

Seguindo o padrao de `EspecialistaProteseLandingPage.tsx` (referencia sem min-h-screen):

**1a: `src/pages/DenteQuebradoLandingPage.tsx`**
- Linhas 206, 214: remover `<div className="min-h-screen">` e `</div>` wrapper do Problem
- Linhas 217, 225: remover wrapper do Guide
- Linhas 228, 236: remover wrapper do SocialProof
- Linhas 239, 246: remover wrapper do FAQ
- Linhas 249, 261: remover wrapper do CTA

**1b: `src/pages/DorDeDenteLandingPage.tsx`**
- Mesma estrutura — remover min-h-screen wrappers das linhas 206, 217, 228, 239, 249

**1c: `src/pages/LimpezaDentalLandingPage.tsx`**
- Remover min-h-screen wrappers das linhas 232, 243, 254, 265, 275

**1d: `src/pages/LentesDeContatoEmPorcelanaProfissionalLandingPage.tsx`**
- Remover min-h-screen wrappers E os min-h-screen nos fallbacks das linhas 227-234, 237-244, 247-254, 257-263, 266-277
- Estrutura final: `<Suspense fallback={...}>` diretamente com o componente, sem div wrapper

---

### Alteracao 2: Limpeza do `src/config/facetasResinaDiretaConfig.ts`

5 correcoes pontuais:

**2a** Linhas 57-59: Remover `rating: 5` dos 3 depoimentos

**2b** Linha 63: Trocar `'Pacientes Satisfeitos'` por `'Pacientes Atendidos'`

**2c** Linha 64: Trocar `{ number: '100%', label: 'Foco na Naturalidade' }` por `{ number: '1 Dia', label: 'Resultado no Mesmo Dia' }`

**2d** Linha 48 (step 2): Trocar `"esta perfeito!"` por `"esta do seu agrado"`

**2e** Linha 50 (step 4): Trocar `"sorriso radiante no mesmo dia"` por `"resultado natural e duradouro no mesmo dia"`

---

### Alteracao 3: `src/components/landing/SocialProofSection.tsx`

Linhas 25-30: Substituir defaultStats:
```
const defaultStats = [
  { number: "20+", label: "Anos de Experiencia" },
  { number: "WhatsApp", label: "Atendimento 24h" },
  { number: "Particular", label: "Atendimento Personalizado" },
  { number: "Ipanema", label: "Zona Sul — Rio de Janeiro" }
];
```

---

### Alteracao 4: `src/pages/FacetasResinaDiretaLandingPage.tsx`

Reescrever para seguir o padrao de `EspecialistaProteseLandingPage.tsx`:

**Remover imports:**
- `HeroSection`, `ProblemSection`, `GuideSection`, `SocialProofSection`, `FAQSection`, `CTASection` (genericos)
- `CoreWebVitalsOptimizer`, `ResourceHintsOptimizer`, `CriticalCSSInliner`, `SimpleLCPOptimizer`
- `FAQSkeleton`, `SocialProofSkeleton`, `FooterSkeleton`, `WhatsAppSkeleton`
- `useParams`

**Manter imports:**
- `facetasResinaDiretaConfig`
- `ConsultaInicialHeader`, `ConsultaInicialHero` (diretos)
- `useCriticalImagePreload`, `useScrollTracking`

**Adicionar imports:**
- `captureGCLID` de `@/utils/gclid`
- Performance: `CriticalCSSInline`, `ResourceHintsOptimizer`, `SmartContentfulCache`, `CoreWebVitalsMonitor`, `HeroImagePreloader`, `ErrorBoundary`
- Lazy: `ConsultaInicialProblem`, `ConsultaInicialGuide`, `ConsultaInicialSocialProof`, `ConsultaInicialFAQ`, `ConsultaInicialCTA`, `ClareamentoFooter`, `FloatingWhatsApp`

**Corpo JSX:** Seguir estrutura identica a EspecialistaProteseLandingPage — secoes diretamente em `<Suspense>` sem min-h-screen, usando props individuais da config.

**useEffect:** Simplificar para usar `captureGCLID()` + dataLayer push (padrao).

---

### Arquivos modificados (total: 6)
1. `src/pages/DenteQuebradoLandingPage.tsx` — remover min-h-screen
2. `src/pages/DorDeDenteLandingPage.tsx` — remover min-h-screen
3. `src/pages/LimpezaDentalLandingPage.tsx` — remover min-h-screen
4. `src/pages/LentesDeContatoEmPorcelanaProfissionalLandingPage.tsx` — remover min-h-screen
5. `src/config/facetasResinaDiretaConfig.ts` — remover rating, stats, palavras banidas
6. `src/components/landing/SocialProofSection.tsx` — corrigir defaultStats
7. `src/pages/FacetasResinaDiretaLandingPage.tsx` — migrar para componentes ConsultaInicial*

### O que NAO muda
- Campos campaign, messageMatch, whatsapp, seo, tracking
- App.tsx e rotas
- backgroundImage de qualquer config
- Helmet/SEO de cada pagina (mantidos intactos)
- Tracking (GTM, GCLID, Google Ads)

