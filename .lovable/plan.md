

## Reescrever Conteudo das 3 LPs Prioritarias

### Resumo
Atualizar o conteudo de 3 configs de landing pages para eliminar cliches, tornar depoimentos mais naturais (removendo `rating`), e ter textos genuinamente especificos por tratamento. Campos de infraestrutura (campaign, messageMatch, whatsapp, seo, tracking, contact, backgroundImage) permanecem inalterados.

### Arquivos alterados

**1. `src/config/implantesDentariosConfig.ts`**
- Adicionar campo `urgency` no root (nao existia): `"Cada mes sem o dente aumenta a perda ossea -- o momento de agir e agora"`
- Linhas 16-21: Atualizar hero (headline, subheadline, ctaText) -- manter backgroundImage
- Linhas 23-28: Substituir benefits por versao especifica (Especialista em Implantodontia, Planejamento com tomografia digital, WhatsApp 24h, 20+ anos)
- Linhas 30-41: Substituir problem inteiro (novo titulo, descricao e 6 itens)
- Linhas 43-52: Substituir guide inteiro (novo titulo, subtitulo, 5 steps em vez de 4)
- Linhas 54-67: Substituir socialProof (novo titulo, 3 depoimentos sem rating com nome+bairro, 4 stats atualizados)
- Linhas 69-77: Substituir faq (novo titulo, 6 perguntas em vez de 4)
- Linhas 79-83: Substituir cta (novo titulo, subtitulo, buttonText, adicionar urgency)

**2. `src/config/lentesPorcelanaAcolhedorConfig.ts`**
- Linhas 16-21: Atualizar hero (headline, subheadline, ctaText) -- manter backgroundImage
- Linhas 23-28: Substituir benefits
- Linhas 30-41: Substituir problem inteiro
- Linhas 43-52: Substituir guide inteiro
- Linhas 54-67: Substituir socialProof (remover rating, nomes com bairro, stats atualizados)
- Linhas 69-77: Substituir faq (6 perguntas em vez de 4)
- Linhas 79-83: Substituir cta (sem urgency)

**3. `src/config/clareamentoConfig.ts`**
- Linha 5: Remover/limpar campo `urgency` do root
- Linhas 17-22: Atualizar hero (headline, subheadline, ctaText) -- manter backgroundImage
- Linhas 24-29: Substituir benefits
- Linhas 31-42: Substituir problem inteiro
- Linhas 44-69: Substituir guide inteiro
- Linhas 71-104: Substituir socialProof (remover rating, nomes com bairro, 4 stats)
- Linhas 106-142: Substituir faq (6 perguntas em vez de 8)
- Linhas 144-149: Substituir cta (remover urgency)

### Conteudo novo
Todo o conteudo novo esta especificado no prompt do usuario. Cada config recebe textos unicos e especificos ao tratamento:
- **Implantes**: Tom focado em funcionalidade, seguranca, perda ossea progressiva. 5 steps no guide (inclui etapa de planejamento digital). Urgencia genuina sobre perda ossea.
- **Lentes**: Tom acolhedor, foco em naturalidade e Test Drive. Sem urgencia artificial. Stats com "iTero" em vez de percentual generico.
- **Clareamento**: Tom direto, focado em seguranca e resultado natural. 3 modalidades como stat diferencial. Sem urgencia.

### Mudancas no tipo de dados
- Campo `rating` removido de todos os testimonials (ja e opcional no tipo `LandingPageConfig`)
- Campo `urgency` do root: adicionado em implantes, mantido undefined/removido em lentes e clareamento
- Campo `urgency` do cta: adicionado em implantes, removido em lentes e clareamento

### O que NAO muda
- Campos campaign, messageMatch, whatsapp, seo, tracking, contact
- backgroundImage em cada hero
- Imports e exports
- Nenhum outro arquivo
- Estrutura dos componentes que consomem essas configs

