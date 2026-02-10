

## Prompt 12 — Correcoes Pos-Execucao do Prompt 11

### Resumo
3 alteracoes: corrigir grid adaptativo do Guide, reescrever tom da LP Dente Quebrado, e reestruturar LPLentesPorcelana com secoes padrao.

---

### Alteracao 1: `src/components/landing/consulta/ConsultaInicialGuide.tsx`

Substituir o grid fixo `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (linha 37) por logica condicional baseada no numero de steps:

```tsx
const getGridClass = (count: number) => {
  if (count === 3 || count === 6) return 'grid grid-cols-1 md:grid-cols-3 gap-8';
  return 'grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto';
};
```

- 3 steps: `md:grid-cols-3` (1 linha)
- 4 steps: `sm:grid-cols-2` (2x2 simetrico)
- 5 steps: `sm:grid-cols-2` (2+2+1, ultimo centralizado via col-span hack ou simplesmente centralizado pelo max-w + mx-auto)
- 6 steps: `md:grid-cols-3` (2x3)

Para centralizar o ultimo card quando impar (5 steps), adicionar logica no map:

```tsx
{steps.map((step, index) => {
  const isOddLast = steps.length % 2 !== 0 && index === steps.length - 1 
    && steps.length !== 3 && steps.length !== 6;
  return (
    <div key={index} className={`bg-white rounded-lg p-6 ... ${isOddLast ? 'sm:col-span-2 sm:max-w-sm sm:mx-auto' : ''}`}>
      ...
    </div>
  );
})}
```

---

### Alteracao 2: `src/config/denteQuebradoConfig.ts`

Substituir 3 campos apenas:

**hero.subheadline** (linha 18): Remover "ninguem vai perceber" (promessa exagerada). Novo texto:
```
'Encaixe prioritario para resolver rapido. A Dra. Carla Christoph restaura dentes fraturados com materiais que reproduzem a aparencia natural do dente original.'
```

**problem** (linhas 30-41): Reescrever inteiro — remover "Constrangedor", "Constrangimento em reunioes", "afeta a confianca em qualquer situacao social". Novo:
- title: "Dente Quebrou — E Agora?"
- description factual sem manipulacao emocional
- 6 problems focados no problema clinico, nao no constrangimento

**socialProof.title** (linha 55): De "Quem Precisou, Conta" para "Quem Ja Passou por Isso"

Campos intactos: campaign, messageMatch, whatsapp, hero.headline, hero.ctaText, hero.backgroundImage, benefits, guide, faq, cta, contact, seo, tracking.

---

### Alteracao 3: `src/pages/LPLentesPorcelana.tsx`

Reestruturacao major — manter hero (linhas 87-140) e cards de indicacoes (linhas 142-217), remover accordions (linhas 219-397), adicionar secoes padrao.

**Adicionar imports:**
- `lentesPorcelanaAcolhedorConfig` de `@/config/lentesPorcelanaAcolhedorConfig`
- `ConsultaInicialHeader` (import direto)
- Lazy imports: `ConsultaInicialProblem`, `ConsultaInicialGuide`, `ConsultaInicialSocialProof`, `ConsultaInicialFAQ`, `ConsultaInicialCTA`, `ClareamentoFooter`, `FloatingWhatsApp`
- `React, { Suspense }` e `useEffect`

**Remover imports nao mais usados:**
- `Accordion`, `AccordionContent`, `AccordionItem`, `AccordionTrigger`

**Atualizar handleWhatsAppClick:**
- Usar `lentesPorcelanaAcolhedorConfig.whatsapp.number` e `.message` em vez de strings hardcoded

**Adicionar antes do hero:**
- `ConsultaInicialHeader` com props da config

**Manter intacto:**
- Hero section (linhas 87-140)
- Cards de indicacoes (linhas 142-217)

**Substituir accordions (linhas 219-397) por:**
```
<Suspense fallback={...}>
  <ConsultaInicialProblem ... />
  <ConsultaInicialGuide ... />
  <ConsultaInicialSocialProof ... />
  <ConsultaInicialFAQ ... />
  <ConsultaInicialCTA ... />
  <ClareamentoFooter />
  <FloatingWhatsApp ... />
</Suspense>
```

Todas as props vem de `lentesPorcelanaAcolhedorConfig`.

**Adicionar useEffect** para GCLID capture e dataLayer push (mesmo padrao de LentesDeContatoPorcelanaLandingPage.tsx).

---

### Arquivos modificados (total: 3)
1. `src/components/landing/consulta/ConsultaInicialGuide.tsx` — grid adaptativo
2. `src/config/denteQuebradoConfig.ts` — subheadline, problem, socialProof.title
3. `src/pages/LPLentesPorcelana.tsx` — reestruturacao com secoes padrao

### O que NAO muda
- Campos campaign, messageMatch, whatsapp, seo, tracking
- App.tsx e rotas
- Hero customizado e cards de indicacoes do LPLentesPorcelana
- Tracking (GTM, GCLID, Google Ads conversion)
- backgroundImage de qualquer config
- Nenhuma palavra proibida adicionada

