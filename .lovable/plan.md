

## Reescrever LPs de Urgencia: Emergencia, Dor de Dente e Dente Quebrado

### Resumo
Atualizar o conteudo de 3 configs de landing pages de urgencia seguindo o padrao estabelecido: eliminar cliches, refinar depoimentos (remover `rating` e profissoes, formato "Nome I. -- Bairro"), textos diretos e urgentes sem sensacionalismo. Campos de infraestrutura permanecem inalterados.

---

### Arquivos alterados

**1. `src/config/emergenciaOdontologicaConfig.ts`**
- Linhas 17-19: Atualizar hero (headline, subheadline, ctaText) -- manter backgroundImage
- Linhas 23-28: Substituir benefits (WhatsApp 24h, Encaixe prioritario, Diagnostico mesmo dia, 20+ anos)
- Linhas 30-41: Substituir problem (titulo "Imprevistos Dentais Nao Esperam", nova descricao direta, 6 itens especificos)
- Linhas 43-53: Substituir guide (4 steps em vez de 5: WhatsApp Imediato, Encaixe Prioritario, Diagnostico e Tratamento, Orientacao de Continuidade)
- Linhas 55-68: Substituir socialProof (remover rating e profissoes, 3 depoimentos com nome+bairro, stats com "Mesmo dia" em vez de "1 hora")
- Linhas 70-78: Substituir faq (4 perguntas em vez de 4, novo titulo "Duvidas sobre Emergencias")
- Linhas 80-84: Substituir cta (titulo "Precisa de Atendimento Agora?", adicionar urgency)

**2. `src/config/dorDeDenteConfig.ts`**
- Linhas 17-19: Atualizar hero (headline mais direto, subheadline com causas possiveis)
- Linhas 23-28: Substituir benefits (WhatsApp 24h, Encaixe prioritario, Diagnostico preciso, 20+ anos)
- Linhas 30-41: Substituir problem (titulo "Dor de Dente Nao E para Aguentar", descricao com consequencia de ignorar, 6 itens sobre tipos de dor)
- Linhas 43-53: Substituir guide (4 steps em vez de 5: Contato WhatsApp, Diagnostico da Causa, Alivio Imediato, Tratamento Definitivo)
- Linhas 55-68: Substituir socialProof (remover rating e profissoes, 3 novos depoimentos com nome+bairro, stats com "Mesmo dia")
- Linhas 70-80: Substituir faq (4 perguntas em vez de 6, novo titulo, incluindo orientacao sobre analgesico e "dor que passa sozinha")
- Linhas 82-86: Substituir cta (titulo "Nao Aguente a Dor", adicionar urgency factual)

**3. `src/config/denteQuebradoConfig.ts`**
- Linhas 17-19: Atualizar hero (headline focado em restauracao natural, subheadline com materiais)
- Linhas 23-28: Substituir benefits (WhatsApp 24h, Encaixe prioritario, Restauracao natural, 20+ anos em estetica)
- Linhas 30-41: Substituir problem (titulo "Dente Quebrado e Urgente -- E Constrangedor", descricao com cenarios reais, 6 itens mais especificos)
- Linhas 43-72: Substituir guide (4 steps em vez de 5: WhatsApp com foto, Encaixe, Avaliacao+Radiografia, Restauracao)
- Linhas 75-100: Substituir socialProof (remover rating e profissoes, 3 novos depoimentos conversacionais, stats com "Mesmo dia" e "Anos em Estetica Dental")
- Linhas 102-134: Substituir faq (5 perguntas em vez de 7, incluindo "o que fazer agora", colagem de fragmento, visibilidade)
- Linhas 136-140: Substituir cta (titulo "Nao Espere -- Quanto Antes, Mais Simples", adicionar urgency)

---

### Conteudo novo
Todo o conteudo esta especificado no prompt do usuario (arquivo uploaded). Cada config recebe textos unicos:
- **Emergencia**: Tom direto e organizado. "Do contato a resolucao". Stats com "Mesmo dia" como encaixe prioritario. Depoimentos: lente que soltou no sabado, dor forte com encaixe no dia, dente quebrado em acidente.
- **Dor de Dente**: Tom empatico mas factual. Guia "Do Alivio ao Tratamento Definitivo". FAQ inclui orientacao sobre analgesico e alerta sobre dor que passa sozinha (nervo morto). Depoimentos: infeccao diagnosticada, arrependimento de adiar, restauracao infiltrada simples.
- **Dente Quebrado**: Tom urgente com foco estetico. Guia inclui "mande foto pelo WhatsApp". FAQ orienta guardar fragmento em leite. Depoimentos: azeitona, treino do filho, evento em 2 dias.

### Mudancas nos dados
- Campo `rating` removido de todos os testimonials (3 configs)
- Profissoes removidas dos nomes, substituidas por bairro
- Campo `urgency` adicionado ao cta nas 3 configs (urgencia factual, nao artificial)
- Steps reduzidos de 5 para 4 nas 3 configs
- Stats "1 hora / Minimo por Agendamento" substituido por "Mesmo dia / Encaixe Prioritario"

### O que NAO muda
- Campos campaign, messageMatch, whatsapp, seo, tracking, contact
- backgroundImage em cada hero
- Imports e exports
- Nenhum outro arquivo
- Estrutura dos componentes que consomem essas configs

