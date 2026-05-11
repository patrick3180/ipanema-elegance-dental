# Auditoria Marketing / Copy / Conversão

**Nota geral: 6,8 / 10**

| Subdimensão | Nota | Comentário curto |
|---|:-:|---|
| Tom de voz (CLAUDE.md / BRAND.md) | 8 | Alinhado em ~80% do site |
| Bio canônica respeitada | 9 | About + DoctorBio das LPs seguem padrão |
| CTAs ("consulta" vs. "avaliação") | 9 | Apenas CTASection.tsx desvia do padrão |
| Headlines / posicionamento | 8 | Diferenciação clara em service pages |
| Message-match LPs ↔ Google Ads | 6 | Inconsistente entre LPs |
| LP CTASection (componente reusado) | 0 | Viola tudo: gratuita, parcelamento, anti-premium |
| LP Profilaxia | 4 | Pede "valores" no WhatsApp; usa "Investimento" |
| LP Estética Genérica | 5 | "sem compromisso de iniciar" |
| Prova social / depoimentos | 5 | Estrelas + "Recomendo" violam BRAND |
| Prova de autoridade | 8 | CRO-RJ visível, 20+ anos, iTero nomeado |

---

## Findings

### COPY-1 · "Primeira consulta gratuita" + "Parcelamento sem juros" em CTASection · Nota 0/10
- **Severidade:** CRÍTICA · **Esforço:** S · **Quick win:** ✅
- **Evidência:** [src/components/landing/CTASection.tsx:122-127](src/components/landing/CTASection.tsx)
  ```
  <span className="text-sm">Primeira consulta gratuita</span>
  ...
  <span className="text-sm">Parcelamento sem juros</span>
  ```
- **Por que é crítico:**
  - **Quebra CLAUDE.md §11** (decisão consolidada): "Sem 'consulta sem compromisso' — Posicionamento premium/particular"
  - **Quebra CLAUDE.md §1.1**: "NUNCA mencionar preços — proibido pelo CRO"
  - **Quebra a regra §1.3** sobre confusão "avaliação" vs. "consulta gratuita"
  - **Anti-posicionamento premium**: ofertas de "gratuita" e "parcelamento" são linguagem de massa, não de luxo silencioso
  - **Risco financeiro real**: paciente chega esperando consulta gratuita, descobre R$ 600, sai indignado — exatamente o que motivou a regra §1.3
- **Recomendação:** substituir por trust signals reais (ex: "Atendimento 24h pelo WhatsApp", "Consultas com mínimo de 1 hora", "Parceria com convênios? Não — somos 100% particular").

### COPY-2 · "Materiais de Alta Qualidade" no ClareamentoFooter · Nota 2/10
- **Severidade:** Alta · **Esforço:** S · **Quick win:** ✅
- **Evidência:** [src/components/landing/clareamento/ClareamentoFooter.tsx:73](src/components/landing/clareamento/ClareamentoFooter.tsx)
- **Regra:** BRAND.md / CLAUDE.md §1.2 — "materiais de alta qualidade" → "nomear o material real"
- **Recomendação:** trocar por "Géis com peróxido de hidrogênio em concentração profissional" ou "Whiteness HP Maxx" (ou outro nome real do produto que ela usa).

### COPY-3 · "sem compromisso de iniciar" na LP Estética Genérica · Nota 2/10
- **Severidade:** Alta · **Esforço:** S · **Quick win:** ✅
- **Evidência:** [src/config/esteticaSorrisoGenericaConfig.ts:82](src/config/esteticaSorrisoGenericaConfig.ts) — `subtitle: 'Na consulta, analisamos seu caso e mostramos as opções — sem compromisso de iniciar.'`
- **Regra:** CLAUDE.md §1.3 — "NUNCA usar 'avaliação sem compromisso'"; §11 — "Sem 'consulta sem compromisso'"
- **Recomendação:** trocar por "Na consulta, analisamos seu caso, mostramos as opções e o tempo previsto — você decide o ritmo."

### COPY-4 · WhatsApp message da Profilaxia pede "valores" · Nota 3/10
- **Severidade:** Média · **Esforço:** S · **Quick win:** ✅
- **Evidência:** [src/config/profilaxiaConfig.ts:13](src/config/profilaxiaConfig.ts) — `"Olá! Vi o site e gostaria de agendar uma profilaxia dental. Podem me informar valores e disponibilidade?"`
- **Análise:** mensagem pré-preenchida pede **valores**. Quando o paciente envia, a Sofia (Sofia V2.1) recebe pedido explícito de preço — isso é problemático: ou Sofia responde com preço (viola CRO em canal escrito) ou não responde, gerando atrito.
- **Recomendação:** trocar por "Olá! Gostaria de agendar uma consulta de profilaxia (limpeza). Qual a disponibilidade nas próximas semanas?"

### COPY-5 · "Investimento Mais Inteligente em Saúde Bucal" · Nota 4/10
- **Severidade:** Média · **Esforço:** S · **Quick win:** ✅
- **Evidência:** [src/config/profilaxiaConfig.ts:31](src/config/profilaxiaConfig.ts)
- **Análise:** "Investimento" é eufemismo conhecido para "preço". Em LP de profilaxia (procedimento de baixo ticket), reforça percepção de transação financeira. BRAND.md prefere foco em outcome de saúde, não em ROI.
- **Recomendação:** "Prevenção é o Tratamento Mais Inteligente" — remove "investimento", mantém o argumento.

### COPY-6 · Headline da LP Implantes · Nota 7/10
- **Evidência:** [src/config/implantesDentariosConfig.ts:18](src/config/implantesDentariosConfig.ts) — "Volte a Comer e Sorrir com Dentes Fixos"
- **Análise:** boa headline emocional + funcional, mas o keyword do ad group é `implantes dentarios` — message-match é fraco (paciente buscou "implantes", chegou em "dentes fixos"). Solução de copywriting clássica é incluir o termo na headline OU no subheadline.
- **Recomendação:** subheadline já melhora ("Implantes com planejamento digital..."). Mas headline poderia ser "Implantes Dentários: Volte a Comer e Sorrir com Dentes Fixos".

### COPY-7 · Tom de voz do site é forte e consistente · Nota 8/10
- **Pontos fortes:**
  - Hero: "Para quem busca tratamento odontológico sem pressa, com mínimo desconforto e com resultado que parece natural"
  - About: "tratando cada paciente de forma individual, com tempo e atenção" — bio canônica respeitada
  - LP Implantes: "Quanto mais cedo o diagnóstico, menos complexo tende a ser o procedimento" — tom consultivo
- **Pontos a revisar:**
  - Algumas seções recorrem a "Cuide da Base do Seu Sorriso" (SaudeDaGengiva) — beira o cliché, mas aceitável
  - "Sem surpresas" (About) — eficaz

### COPY-8 · Atribuição correta de Dr. Bruno · Nota 9/10
- **Evidência:** [src/pages/Ortodontia.tsx:109,233](src/pages/Ortodontia.tsx) usa "Dr. Bruno Moreira das Neves" / "Dr. Bruno Moreira" — sem "Christoph"
- **Conformidade:** CLAUDE.md §1.4 ("Dr. Bruno = 'Dr. Bruno' (sem sobrenome 'Christoph')") respeitada.

### COPY-9 · Atribuição ambígua na SaudeDaGengiva · Nota 5/10
- **Severidade:** Alta · **Esforço:** M · **Quick win:** —
- **Evidência:** [src/pages/SaudeDaGengiva.tsx:137](src/pages/SaudeDaGengiva.tsx) — "Após o tratamento, **a Dra. Carla reavalia** a resposta da gengiva e define os próximos passos"
- **Conflito com CLAUDE.md §1.4:** Periodontia/Gengiva = "Periodontista parceiro · Diagnóstico + manutenção" (Dra. Carla NÃO executa)
- **Risco:** SaudeDaGengiva sugere que Dra. Carla executa o tratamento periodontal. Se assim for em produção, viola escopo de especialidade declarado.
- **Recomendação:** revisar copy completa de SaudeDaGengiva e SaudeGengivalLandingPage para deixar claro que tratamento periodontal é executado por especialista parceiro, com Dra. Carla coordenando.

### COPY-10 · Depoimentos: formato inconsistente entre Homepage e LPs · Nota 5/10
- **Evidência:**
  - Homepage [TestimonialsCarousel.tsx:5-36](src/components/TestimonialsCarousel.tsx) — campos separados `name`, `location`, `rating: 5`, com estrelas renderizadas
  - LPs [implantesDentariosConfig.ts:56-60](src/config/implantesDentariosConfig.ts) — formato `name: "Roberto S. — Copacabana"` (correto BRAND.md)
- **Análise:** dois padrões coexistem. BRAND.md §3 define o formato `"Nome I. — Bairro"` sem estrelas — só LPs seguem.
- **Recomendação:** unificar Homepage com formato BRAND.md (remover estrelas, juntar name+location, remover field `rating`).

### COPY-11 · Stats reais e verificáveis (sem inflar) · Nota 8/10
- HomepageStatsBar: "20+ anos", "4.000+ pacientes", "CRO-RJ 27.509", "4.9★ Google"
- BUT: "4.000+ pacientes" — precisa ser verdade. Se for estimativa generosa, considerar mudar para "milhares" ou número exato.
- **Recomendação:** validar com Dra. Carla que o número 4.000 é real (BRAND.md proíbe inventar — princípio "luxo silenciosa").

### COPY-12 · Linguagem de "Test Drive do Sorriso" · Nota 9/10
- Em LentesEFacetas e LP Lentes Profissional, o termo "Test Drive do Sorriso" é usado consistentemente.
- **Análise:** termo proprietário, diferenciador, e descreve um benefício concreto (visualização prévia do resultado via iTero). Bom branding.

---

## Análise por LP

| LP | Headline | Message-match | Compliance | Nota |
|---|---|:-:|:-:|:-:|
| Consulta Inicial | "...sem pressa, com tempo e transparência" | OK | OK | 8 |
| Lentes Porcelana Profissional | "Test Drive do Sorriso..." | Bom | OK | 8 |
| Implantes Dentários | "Volte a Comer e Sorrir..." | Médio | OK | 7 |
| Especialista Prótese | "...consulta de planejamento" | OK | OK | 8 |
| Ortodontia | (verificar) | — | — | — |
| Limpeza Dental | (verificar) | — | — | — |
| **Profilaxia** | "Prevenção que Funciona" | OK | **WhatsApp pede valores + "Investimento"** | **4** |
| **Estética Sorriso Genérica** | (verificar) | — | **"sem compromisso"** | **5** |
| Saúde Gengival | "...recupere seu bem-estar" | OK | Verificar atribuição | 6 |
| Clareamento | OK | OK | OK | 7 |
| Facetas Resina Direta | (verificar) | — | — | — |
| Dor de Dente | (verificar) | — | — | — |
| Dente Quebrado | (verificar) | — | — | — |
| Emergência Odonto | (verificar) | — | — | — |
| **Componente CTASection (compartilhado)** | — | — | **"Gratuita" + "Parcelamento"** | **0** |

> **Nota:** algumas LPs marcadas "verificar" não foram lidas em profundidade nesta auditoria. Sprint de follow-up recomendado.

---

## Resumo de violações de palavras banidas

| Palavra banida | Onde | Status |
|---|---|---|
| "premium" (user-facing) | Não detectado em copy visível | ✅ |
| "premium" (interno: campaign names, variants, comments) | consultaInicialConfig, InfoCard.tsx | ✅ OK (não user-facing) |
| "excelência" | Não detectado | ✅ |
| "humanizado" | Não detectado | ✅ |
| "sorriso perfeito" | Não detectado | ✅ |
| "transformar" | Não detectado em copy do site | ✅ |
| "tecnologia de ponta" | Não detectado (usa "iTero Element 5D" — correto) | ✅ |
| "altamente qualificado" | Não detectado | ✅ |
| "100% natural" | Não detectado | ✅ |
| "atendimento personalizado" | 1 ocorrência ([consultaInicialConfig:95](src/config/consultaInicialConfig.ts)) — em meta description | ⚠️ Médio |
| "materiais de alta qualidade" | ClareamentoFooter:73 | ❌ Crítico |
| "sem compromisso" | esteticaSorrisoGenericaConfig:82 + CTASection ("Primeira consulta gratuita" tem mesma ressonância) | ❌ Crítico |
| "Recomendo" / "perfeito" / estrelas em depoimento | TestimonialsCarousel | ❌ Crítico |
