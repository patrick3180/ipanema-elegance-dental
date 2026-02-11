

## Prompts 18, 19, 20 — LPs Top 3: Implantes, Lentes e Clareamento

### Resumo

Atualizar o conteudo das 4 configs de landing pages (implantes, 2x lentes, clareamento) com textos mais especificos, depoimentos no formato correto e FAQs em linguagem natural. Tambem limpar palavras banidas residuais.

**Nota tecnica:** O tipo `LandingPageConfig` usa `title`, `description` e `problems: string[]` na secao problem — NAO `sectionTitle`/`painPoints`. O conteudo do prompt sera adaptado para a estrutura real dos campos.

---

### Prompt 18: `src/config/implantesDentariosConfig.ts`

**18a) Secao problem (linhas 31-41) — substituir conteudo:**
- `title`: "Voce se identifica com alguma dessas situacoes?"
- `description`: "Perder um dente afeta a mastigacao, a confianca e ate a saude ossea. Quanto mais tempo sem reposicao, mais complexo pode se tornar o tratamento."
- `problems`: 4 itens especificos (dificuldade mastigar, inseguranca com espaco, protese removivel incomoda, perda ossea avancando) — adaptados como strings simples pois o tipo nao suporta icon/title/description

**18b) Secao guide subtitle (linha 46):**
- De: texto atual generico
- Para: "Especialista em Implantodontia — CRO-RJ 27.509. Do diagnostico a protese final, todo o tratamento com a mesma profissional."

**18c) Depoimentos (linhas 58-61) — substituir os 3:**
- Roberto S. — Copacabana (protese removivel -> implante)
- Marcia L. — Ipanema (medo da cirurgia -> acompanhamento)
- Paulo H. — Leblon (reabilitacao completa arcada superior)

**18d) FAQ (linhas 73-79) — substituir as 6 perguntas:**
- "Implante dentario doi muito?" / "Pode ser rejeitado?" / "Quanto tempo leva?" / "Existe idade maxima?" / "Implante ou protese removivel?" / "Preciso fazer enxerto osseo?"
- Remover pergunta sobre convenios (ja contemplada nas outras)

**18e) Urgency (linha 5) — ajustar tom:**
- De: "Cada mes sem o dente aumenta a perda ossea — o momento de agir e agora"
- Para: "A perda ossea e progressiva — quanto antes o implante, mais simples tende a ser o procedimento"

**18f) SEO description (linha 99) — remover "solucao definitiva":**
- De: "Solucao definitiva para a perda de dentes com seguranca e tecnologia."
- Para: "Reabilitacao com implantes para devolver funcao mastigatoria e estetica. Planejamento digital e acompanhamento completo."

---

### Prompt 19: `src/config/lentesPorcelanaAcolhedorConfig.ts`

**19a) Secao problem (linhas 30-41) — substituir conteudo:**
- `title`: "Voce se identifica com alguma dessas situacoes?"
- `description`: "Nao e sobre ter dentes 'perfeitos'. E sobre se sentir confortavel para sorrir sem pensar duas vezes."
- `problems`: 4 itens (sorriso que incomoda nas fotos, manchas que clareamento nao resolve, desnivel/espacamento, medo de resultado artificial)

**19b) Depoimentos (linhas 56-59) — substituir os 3:**
- Fernanda R. — Ipanema (medo de artificial, ajuste dente por dente)
- Cristina M. — Leblon (Test Drive deu seguranca)
- Andre L. — Barra da Tijuca (manchas de antibiotico na infancia)

**19c) FAQ (linhas 71-78) — substituir as 6 perguntas:**
- "Dura quanto tempo?" / "Diferenca lente vs faceta?" / "Estraga o dente?" / "Test Drive do Sorriso?" / "So nos dentes da frente?" / "Restauracao antiga pode receber?"

---

### Prompt 19 (continuacao): `src/config/lentesPorcelanaProfissionalConfig.ts`

**19d) Secao problem (linhas 30-40) — substituir conteudo:**
- Mesmo conteudo do acolhedor (4 itens)
- Remover "Quer Transformar Seu Sorriso" do title (palavra banida)
- Remover "solucao definitiva" dos problems

**19e) Depoimentos (linhas 56-59) — substituir os 3:**
- Mesmos 3 depoimentos do acolhedor

**19f) FAQ (linhas 71-78) — substituir as 6 perguntas:**
- Mesmas 6 perguntas do acolhedor

**19g) Limpeza de palavras banidas:**
- Linha 13 whatsapp message: "transformar meu sorriso" -> "renovar meu sorriso"
- Linha 38: "solucao definitiva" -> removida (substituida pelos novos problems)
- Linha 97 SEO description: "Transforme sua imagem profissional" -> "Lentes de porcelana em Ipanema com resultado natural e duradouro. Planejamento digital com scanner iTero."
- Linha 97: "avaliacao estrategica" -> "Agende sua avaliacao."
- Linha 102 keyword: "transformacao do sorriso" -> "estetica do sorriso ipanema"
- Linha 104 keyword: "sorriso perfeito" -> "sorriso natural porcelana"

---

### Prompt 20: `src/config/clareamentoConfig.ts`

**20a) Secao problem (linhas 30-41) — substituir conteudo:**
- `title`: "Voce se identifica com alguma dessas situacoes?"
- `description`: "O amarelamento e gradual — voce nem percebe ate ver uma foto ou comparar. Se isso incomoda, saiba que clareamento profissional e seguro e os resultados sao reais."
- `problems`: 4 itens (cafe/vinho/cha, caseiro que nao funciona, medo de sensibilidade, medo de artificial)

**20b) Depoimentos (linhas 56-59) — substituir os 3:**
- Juliana M. — Leblon (casamento, medo de artificial)
- Ricardo T. — Ipanema (cafe a vida inteira, filha elogiou)
- Beatriz A. — Copacabana (farmacia nao funcionou, resultado uniforme)

**20c) FAQ (linhas 71-78) — substituir as 6 perguntas:**
- "Estraga o esmalte?" / "Caseiro de farmacia funciona?" / "Quanto tempo dura?" / "Da muita sensibilidade?" / "Se tenho restauracoes?" / "Funciona em todas as manchas?"

---

### Arquivos modificados (total: 4)
1. `src/config/implantesDentariosConfig.ts` — problem, guide subtitle, depoimentos, FAQ, urgency, SEO
2. `src/config/lentesPorcelanaAcolhedorConfig.ts` — problem, depoimentos, FAQ
3. `src/config/lentesPorcelanaProfissionalConfig.ts` — problem, depoimentos, FAQ, limpeza de banidas (whatsapp, SEO)
4. `src/config/clareamentoConfig.ts` — problem, depoimentos, FAQ

### O que NAO muda
- Hero sections (headline, subheadline, CTA, imagem)
- Steps/guide structure (apenas subtitle do guide em implantes)
- Componentes React (nenhum)
- Rotas, App.tsx
- Benefits, stats, tracking, contact
- CTA sections
- Nenhum outro config fora dos 4 listados
