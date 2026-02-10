

## Prompt 11 — Correcoes da Auditoria Completa de LPs

### Resumo
4 correcoes de conteudo em arquivos de config TypeScript. Nenhum componente, rota ou estrutura visual e alterado.

---

### Alteracao 1: `src/config/consultaInicialConfig.ts`

**Benefits** (linhas 23-28): Trocar "Diagnostico clinico detalhado" por "Somente materiais de primeira linha"
```
benefits: [
  "Minimo de 1h por consulta",
  "Somente materiais de primeira linha",
  "WhatsApp 24h",
  "20+ anos de experiencia"
],
```

**Problem** (linhas 30-41): Reescrever inteiro — remover criticas implicitas a outros profissionais ("15 minutos", "apressado", "superficiais") e focar no que o paciente precisa:
- Titulo: "Quando Voce Precisa de uma Consulta de Verdade"
- Descricao focada no valor, nao na critica
- 6 itens escritos na primeira pessoa do paciente ("Preciso de tempo...", "Quero sair entendendo...", etc.)

---

### Alteracao 2: `src/config/lentesPorcelanaProfissionalConfig.ts`

Substituir campos hero, benefits, problem, guide, socialProof, faq e cta. Manter INTACTOS: campaign, messageMatch, whatsapp, contact, seo, tracking.

Mudancas principais:
- **Hero**: headline "Lentes de Porcelana em Ipanema — Resultado Natural que Dura mais de 15 Anos" (remover "Investimento Estrategico" e "Imagem Profissional")
- **Benefits**: Porcelana de alta translucidez, Test Drive, WhatsApp 24h, 20+ anos
- **Problem**: titulo "Quer Transformar Seu Sorriso mas Tem Receio do Resultado?" (remover tom coaching)
- **Guide**: 4 steps factuais (Consulta, Test Drive, Laboratorio, Cimentacao)
- **SocialProof**: 3 depoimentos nome+bairro sem rating, stats com iTero e "100% Casos com Test Drive"
- **FAQ**: 6 perguntas factuais (remover "excelencia", "perfeito")
- **CTA**: "Quer Ver Como Seu Sorriso Pode Ficar?" sem urgency

---

### Alteracao 3: `src/config/landingPageConfigs.ts`

Substituir arquivo inteiro por export vazio com comentario explicativo. Remove lentesConfig e implantesConfig (codigo morto com WhatsApp errado, ratings, stats inventadas, "consulta gratuita").

Tambem atualizar `src/pages/LandingPageTemplate.tsx` linha 4: remover import de lentesConfig e usar um fallback inline ou importar de outro config. Como LandingPageTemplate nao e usado em nenhuma rota (confirmado: nao aparece no App.tsx), a solucao mais simples e:
- Remover o import de lentesConfig (linha 4)
- Trocar `const pageConfig = config || lentesConfig;` por `const pageConfig = config!;` (o componente so funciona com config passado via props)

---

### Alteracao 4: Mencao a materiais de primeira linha em 4 configs

**4A: `src/config/implantesDentariosConfig.ts`** (linha 52)
- Step 5 description: trocar final de `"planejada para encaixar com precisao e parecer natural."` para `"com materiais de primeira linha selecionados individualmente para cada caso."`

**4B: `src/config/especialistaProteseConfig.ts`** (linha 49)
- Step 3 description: trocar `"usando materiais selecionados"` por `"usando somente materiais de primeira linha"`

**4C: `src/config/clareamentoConfig.ts`** (linha 49)
- Step 3 description: adicionar ao final `" Utilizamos somente geis clareadores de primeira linha."`

**4D: `src/config/lentesPorcelanaAcolhedorConfig.ts`** (linha 49)
- Step 3 description: trocar `"Porcelana que reproduz a cor e translucidez dos dentes naturais."` por `"somente materiais de primeira linha. Reproduz a cor e o brilho dos dentes naturais."`

---

### Arquivos modificados (total: 7)
1. `src/config/consultaInicialConfig.ts` — benefits + problem
2. `src/config/lentesPorcelanaProfissionalConfig.ts` — hero, benefits, problem, guide, socialProof, faq, cta
3. `src/config/landingPageConfigs.ts` — substituir por export vazio
4. `src/pages/LandingPageTemplate.tsx` — remover import de lentesConfig
5. `src/config/implantesDentariosConfig.ts` — step 5 description
6. `src/config/especialistaProteseConfig.ts` — step 3 description
7. `src/config/clareamentoConfig.ts` — step 3 description
8. `src/config/lentesPorcelanaAcolhedorConfig.ts` — step 3 description

### O que NAO muda
- Campos campaign, messageMatch, whatsapp, seo, tracking, contact
- Nenhum componente React visual
- App.tsx e rotas
- backgroundImage de qualquer config
- Tracking (GTM, GCLID, Google Ads)

