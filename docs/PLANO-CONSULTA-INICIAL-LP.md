# Fase 1 — Otimização da LP `/lp/consulta-inicial`

## Contexto

A LP de Consulta Inicial é a **#1 em investimento** (R$4.591 / 398 cliques) e a mais enxuta do site (6.3KB vs 36.4KB da SP correspondente — ratio de 1:5.8). Esta é a LP piloto para o padrão de melhoria que será replicado nas demais.

> [!IMPORTANT]
> **Regras invioláveis (BRAND.md):**
> - ❌ Sem imagens de bocas reais ou antes/depois
> - ❌ Sem preços ou investimento
> - ❌ Sem auto-proclamação ("premium", "excelência", "melhor")
> - ✅ Fotos da Dra. com consultório ao fundo (sutil)
> - ✅ Modelos 3D quando necessário
> - ✅ Tom: luxo silencioso, confiança demonstrada

---

## Screenshots do Estado Atual (Mobile 390px)

````carousel
![Hero mobile — badges + headline + benefits + CTA](C:/Users/patri/.gemini/antigravity/brain/21dbbd53-38f3-4098-aaed-5a33356bed83/mobile_hero_section_v2_1774957371950.png)
<!-- slide -->
![Problem section — ícones ❌ e pain points](C:/Users/patri/.gemini/antigravity/brain/21dbbd53-38f3-4098-aaed-5a33356bed83/mobile_problem_section_1774957388038.png)
<!-- slide -->
![Guide section — 4 steps com checkmarks](C:/Users/patri/.gemini/antigravity/brain/21dbbd53-38f3-4098-aaed-5a33356bed83/mobile_guide_section_1774957389445.png)
<!-- slide -->
![FAQ section — accordion padrão](C:/Users/patri/.gemini/antigravity/brain/21dbbd53-38f3-4098-aaed-5a33356bed83/mobile_faq_section_1774957397165.png)
<!-- slide -->
![Desktop hero — layout 60/40 com foto da doutora](C:/Users/patri/.gemini/antigravity/brain/21dbbd53-38f3-4098-aaed-5a33356bed83/desktop_hero_section_v2_1774957412833.png)
````

---

## Estrutura Proposta (Nova vs Atual)

| # | Seção Atual | Seção Proposta | Mudança |
|---|---|---|---|
| 1 | Header | Header | Sem alteração |
| 2 | Hero | Hero (copy refinado) | Headline + subheadline + benefits melhorados |
| 3 | — | **StatsBar** ✨ | NOVA — reutiliza componente das SPs |
| 4 | Problem (❌ icons) | **Identificação Empática** ✨ | REDESIGN — trocar framing negativo por empático |
| 5 | — | **Conheça a Dra. Carla** ✨ | NOVA — mini-bio + credenciais + foto |
| 6 | Guide (4 steps) | Guide (copy refinado) | Mesmo layout, copy melhorado |
| 7 | — | **CTA Intermediário** ✨ | NOVO — CTA entre guide e social proof |
| 8 | Social Proof | Social Proof | Sem alteração estrutural |
| 9 | FAQ (5 perguntas) | FAQ (7 perguntas) | +2 FAQs estratégicas |
| 10 | CTA Final | CTA Final | Sem alteração |
| 11 | Footer | Footer | Sem alteração |

---

## Detalhamento por Item

### Item 1: Hero Copy Refinado

#### [MODIFY] [consultaInicialConfig.ts](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/src/config/consultaInicialConfig.ts)

**Racional:** O headline atual é bom mas genérico. A versão refinada foca na **dor principal** do público premium (consultas apressadas) e reforça o diferencial (tempo dedicado).

```diff
hero: {
-  headline: "Uma Consulta Odontológica com Tempo para Ouvir, Examinar e Explicar",
-  subheadline: "Mínimo de 1 hora dedicada ao seu caso. Diagnóstico detalhado, explicação clara e plano de tratamento individualizado — sem pressa e sem surpresas.",
+  headline: "Sua Saúde Bucal Merece Mais do que 20 Minutos",
+  subheadline: "Na sua consulta, cada detalhe importa. Mínimo de 1 hora dedicada ao seu caso — histórico completo, exame minucioso, explicação clara e plano individualizado.",
   ctaText: "Agendar Minha Consulta",
}
```

**Benefits refinados:**
```diff
benefits: [
-  "Mínimo de 1h por consulta",
-  "Somente materiais de primeira linha",
-  "WhatsApp 24h",
-  "20+ anos de experiência"
+  "Mínimo de 1h dedicada ao seu caso",
+  "Exame + limpeza inclusos na consulta",
+  "Plano de tratamento sem surpresas",
+  "WhatsApp 24h para dúvidas"
],
```

> [!TIP]
> O benefit "Exame + limpeza inclusos" é um diferencial real que reduz a ansiedade de custo sem mencionar preços.

---

### Item 2: StatsBar — Nova Seção

#### [MODIFY] [ConsultaInicialLandingPage.tsx](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/src/pages/ConsultaInicialLandingPage.tsx)

**Racional:** Todas as SPs têm o `StatsBar` logo após o hero. A LP não tem. Isso é o elemento de credibilidade mais imediato do site.

Reutilizar o componente existente `StatsBar` (import de `@/components/treatment/StatsBar`), inserindo-o entre o Hero e o Problem section. Como é um componente **acima do fold em scroll**, será eager-loaded (não lazy).

```tsx
import StatsBar from '@/components/treatment/StatsBar';

// Inserir após ConsultaInicialHero:
<StatsBar />
```

---

### Item 3: Redesign da Problem Section → Identificação Empática

#### [MODIFY] [ConsultaInicialProblem.tsx](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/src/components/landing/consulta/ConsultaInicialProblem.tsx)

**Problema atual:** A seção usa ícones de ❌ (X vermelho) — visualmente negativo e repulsivo. Na SP correspondente, a seção empática usa um pattern de cards com ícones coloridos e border-left, muito mais acolhedor.

**Mudança:**
- Trocar de **lista de dores com ❌** para **cards empáticos com "Você se identifica?"** (mesmo pattern da SP)
- Usar ícones positivos (Heart, Search, Clock, Shield) ao invés de X vermelho
- Layout: cards com `border-l-4` + ícones em circles

#### [MODIFY] [consultaInicialConfig.ts](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/src/config/consultaInicialConfig.ts)

```diff
problem: {
-  title: "Quando Você Precisa de uma Consulta de Verdade",
-  description: "Nem toda consulta odontológica é igual...",
-  problems: [
-    "Preciso de tempo para explicar meu histórico...",
-    "Quero sair da consulta entendendo exatamente...",
-    ...
-  ]
+  title: "Você se Identifica com Alguma Dessas Situações?",
+  description: "",
+  problems: [
+    {
+      icon: "Calendar",
+      title: "Faz tempo que não vai ao dentista",
+      description: "e sente que pode ter problemas se acumulando sem saber?"
+    },
+    {
+      icon: "Clock",
+      title: "Já saiu de consultas sem entender o diagnóstico",
+      description: "porque tudo foi rápido demais e não houve tempo para perguntas?"
+    },
+    {
+      icon: "Heart",
+      title: "Quer um profissional que ouça primeiro",
+      description: "e explique tudo antes de propor qualquer tratamento?"
+    },
+    {
+      icon: "Shield",
+      title: "Prefere prevenir do que remediar",
+      description: "e busca um acompanhamento regular com quem conhece seu histórico?"
+    }
+  ]
}
```

> [!WARNING]
> Isso requer alterar o tipo `problems` na interface `LandingPageConfig`. As demais LPs que usam `LandingPageTemplate` precisam ser verificadas para manter retrocompatibilidade (o `problems` antigo é `string[]`, o novo é um array de objetos). **Sugiro manter ambos os formatos com uma type union.**

---

### Item 4: Nova Seção — "Conheça a Dra. Carla"

#### [NEW] [ConsultaInicialDoctorBio.tsx](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/src/components/landing/consulta/ConsultaInicialDoctorBio.tsx)

**Racional:** Toda SP tem uma seção robusta sobre a Dra. Carla. A LP não tem nenhuma informação sobre quem vai atender o paciente. Para uma consulta inicial com um público que nunca visitou a clínica, isso é **crítico** para a conversão.

**Layout:**
- Foto da Dra. Carla (reutilizar `/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp`)
- Mini-bio em 3-4 linhas (extraída da SP)
- Credenciais em pills (CRO-RJ 27.509, Especialista Prótese, 20+ anos)
- Sem CTA nesta seção (próxima seção é o Guide, seguido do CTA intermediário)

**Copy proposta:**

> **Dra. Carla Christoph**
> CRO-RJ 27.509 · Especialista em Prótese e Implantodontia
>
> Com mais de 20 anos de experiência clínica em Ipanema, a Dra. Carla conduz cada consulta com atenção ao detalhe e comunicação transparente. Seu atendimento é particular e com número reduzido de pacientes por dia — para que cada pessoa receba o tempo que seu caso requer.

**Posição:** Após a seção empática, antes do Guide.

---

### Item 5: CTA Intermediário

#### [NEW] [ConsultaInicialMidCTA.tsx](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/src/components/landing/consulta/ConsultaInicialMidCTA.tsx)

**Racional:** A SP tem CTAs intermediários entre seções. A LP atual tem **zero CTAs** entre o Hero e o Final CTA — o usuário precisa scrollar toda a página para encontrar o botão novamente. Em mobile, isso é fatal.

**Layout:** Simples — 1 linha de texto + botão centralizado (mesmo pattern da SP):

> *Quer conversar sobre o seu caso?*
> `[ Agendar pelo WhatsApp ]`

**Posição:** Após o Guide (processo), antes do Social Proof.

---

### Item 6: FAQ Expandido (+2 perguntas estratégicas)

#### [MODIFY] [consultaInicialConfig.ts](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/src/config/consultaInicialConfig.ts)

**Adicionar 2 FAQs que abordam objeções de conversão:**

```typescript
// Adicionar ao array faq.questions:
{
  question: "Quanto custa a consulta?",
  answer: "O investimento na consulta é informado no momento do agendamento pelo WhatsApp. O que podemos adiantar: a consulta inclui exame clínico completo, avaliação periodontal, radiografias quando necessário e profilaxia (limpeza profissional). Tudo em uma única sessão de no mínimo 1 hora."
},
{
  question: "Posso ir apenas para uma segunda opinião?",
  answer: "Sim. Muitos pacientes nos procuram exatamente para isso. Com calma e sem compromisso, avaliamos seu caso, explicamos os achados e apresentamos nossa visão — você decide o que fazer com a informação."
}
```

> [!TIP]
> A FAQ sobre preço contorna a proibição do CFO ao dizer "informado no agendamento" — sem revelar valores, mas respondendo à pergunta que 60%+ dos visitantes têm.

---

### Item 7: Micro-Animações CSS (Scroll Fade-In)

#### [MODIFY] [ConsultaInicialLandingPage.tsx](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/src/pages/ConsultaInicialLandingPage.tsx)

**Racional:** As SPs têm animações de fade-in ao scroll. A LP não tem nenhuma. Isso contribui para o feel "genérico" da LP.

**Implementação:** Usar CSS-only `@keyframes` + Intersection Observer via `LazySection` (já presente). Adicionar uma classe `animate-fade-in-up` que é ativada quando o componente entra na viewport.

```css
/* Adicionar ao CSS global ou como estilo inline */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
```

---

### Item 8: Schema Markup Enhancement

#### [MODIFY] [ConsultaInicialLandingPage.tsx](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/src/pages/ConsultaInicialLandingPage.tsx)

Adicionar `MedicalBusiness` schema (em adição ao `Dentist` já existente) e `Service` schema para a consulta:

```json
{
  "@type": "Service",
  "name": "Consulta Odontológica Personalizada",
  "description": "Consulta com mínimo de 1 hora...",
  "provider": { "@type": "Dentist", ... },
  "areaServed": { "@type": "City", "name": "Rio de Janeiro" }
}
```

---

## Arquivos Tocados (Resumo)

| Arquivo | Ação | Impacto |
|---|---|---|
| `consultaInicialConfig.ts` | MODIFY | Hero copy, benefits, problem redesign, +2 FAQs |
| `ConsultaInicialLandingPage.tsx` | MODIFY | Adição de StatsBar, MidCTA, DoctorBio, animações, schema |
| `ConsultaInicialProblem.tsx` | MODIFY | Redesign para cards empáticos |
| `ConsultaInicialDoctorBio.tsx` | NEW | Seção de autoridade da doutora |
| `ConsultaInicialMidCTA.tsx` | NEW | CTA intermediário |
| `LandingPageConfig.ts` (types) | MODIFY | Type union para `problems` (retrocompatível) |

---

## User Review Required

> [!IMPORTANT]
> 1. **Copy do hero:** "Sua Saúde Bucal Merece Mais do que 20 Minutos" é provocativo o suficiente sem ser agressivo? Ou prefere algo mais sóbrio?
> 2. **Problem section redesign:** Concorda em mudar de ❌ negativo para cards empáticos ("Você se identifica?")? É o pattern que funciona bem na SP.
> 3. **FAQ sobre preço:** O texto "informado no agendamento" é apropriado? Ou prefere omitir a pergunta?
> 4. **CTA intermediário:** Concorda com posição após o Guide (meio da página)?
> 5. **Foto da Dra. na DoctorBio:** Usar a `dra-carla-jaleco-bracos-cruzados.webp` (mesma da SP), ou prefere uma foto diferente?

---

## Verificação

1. `npx tsc --noEmit` — zero errors
2. Visual check mobile (390px) + desktop (1440px) via browser agent
3. Lighthouse mobile score (manter ≥80)
4. Validar Schema com Rich Results Test
5. Confirmar que todas as demais LPs que usam `LandingPageTemplate` continuam funcionando (retrocompatibilidade do `problems` type)
