

## Reescrever Conteudo das LPs: Consulta Inicial, Protese e Ortodontia

### Resumo
Atualizar o conteudo de 3 configs de landing pages seguindo o mesmo padrao do Prompt 5: eliminar cliches, refinar depoimentos (remover `rating`, formato "Nome I. -- Bairro"), textos especificos por tratamento. Campos de infraestrutura permanecem inalterados.

### Arquivos alterados

**1. `src/config/consultaInicialConfig.ts`**
- Linha 5: Remover urgency (`undefined`)
- Linhas 18-20: Atualizar hero (headline, subheadline, ctaText) -- manter backgroundImage
- Linhas 24-29: Substituir benefits (Minimo 1h, Diagnostico detalhado, WhatsApp 24h, 20+ anos)
- Linhas 31-42: Substituir problem inteiro (novo titulo empatico, nova descricao, 6 itens sobre experiencias ruins)
- Linhas 44-79: Substituir guide inteiro (4 steps sequenciais em vez de 6 checkmarks: Conversa Inicial, Exame Clinico, Explicacao Diagnostico, Planejamento Individualizado)
- Linhas 81-118: Substituir socialProof (remover rating, 3 depoimentos com nome+bairro, stats com "1h+" em vez de "1 hora")
- Linhas 120-152: Substituir faq (5 perguntas em vez de 7, novo titulo)
- Linhas 154-159: Substituir cta (novo titulo "Pronto para uma Consulta Diferente?", remover urgency)

**2. `src/config/especialistaProteseConfig.ts`**
- Linhas 17-20: Atualizar hero (headline sem "Excelencia", subheadline especifica)
- Linhas 24-28: Substituir benefits (Especialista em Protese, Planejamento digital, WhatsApp 24h, 20+ anos incluindo 8 na Marinha)
- Linhas 30-41: Substituir problem (titulo "Quando o Caso Precisa de um Olhar Especializado", nova descricao e 6 itens)
- Linhas 43-52: Substituir guide (titulo "A Abordagem da Especialista", 4 steps com Consulta de Planejamento, Projeto, Execucao por Etapas, Acompanhamento)
- Linhas 54-67: Substituir socialProof (remover rating, nomes com bairro, stats com "Protese" como especialidade)
- Linhas 69-77: Substituir faq (5 perguntas, novo titulo "Duvidas sobre Protese e Reabilitacao")
- Linhas 79-83: Substituir cta (titulo "Seu Caso Merece Atencao Especializada", sem urgency)

**3. `src/config/ortodontiaConfig.ts`**
- Linhas 17-20: Atualizar hero (headline "Ortodontia com Doutor em Ortodontia pela UERJ", "Dr. Bruno" sem sobrenome) -- manter backgroundImage
- Linhas 24-28: Substituir benefits (Doutor em Ortodontia UERJ, Scanner 3D, Invisalign/estetico/convencional, WhatsApp 24h)
- Linhas 30-41: Substituir problem (titulo "Dentes Desalinhados Afetam Mais do que a Estetica", 6 itens incluindo adultos)
- Linhas 43-52: Substituir guide (titulo "Como Funciona o Tratamento Ortodontico", subtitulo com credenciais academicas, 4 steps com "Dr. Bruno" sem sobrenome)
- Linhas 54-67: Substituir socialProof (remover rating, nomes com bairro, stats com Doutorado e Professor)
- Linhas 69-77: Substituir faq (6 perguntas, incluindo contencao e adultos, sem "Bruno Neves")
- Linhas 79-83: Substituir cta ("Quer Saber Qual Tratamento e Indicado para Voce?", sem urgency)

### Correcoes de nome na Ortodontia
- Todas as referencias a "Dr. Bruno Neves" ou "Dr. Bruno Moreira das Neves" serao substituidas por "Dr. Bruno"
- Credenciais corretas: Doutor em Ortodontia (UERJ), Mestrado em Clinica Odontologica (UFF), Professor de Ortodontia (IOPUC-Rio)

### Mudancas nos dados
- Campo `rating` removido de todos os testimonials (3 configs)
- Campo `urgency` do root: removido em consultaInicial (era "Quanto mais voce adia...")
- Campo `urgency` do cta: removido em todas as 3 configs

### O que NAO muda
- Campos campaign, messageMatch, whatsapp, seo, tracking, contact
- backgroundImage em cada hero
- Imports e exports
- Nenhum outro arquivo
- Estrutura dos componentes que consomem essas configs

