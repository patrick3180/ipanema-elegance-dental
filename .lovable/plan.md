

## Reescrever LPs: Estetica Dental, Limpeza, Profilaxia e Saude Gengival

### Resumo
Ultimas 4 configs de landing pages para reescrever. Mesmo padrao dos prompts anteriores: eliminar cliches (especialmente dados inventados na LP de Limpeza), remover `rating` dos depoimentos, formato "Nome I. -- Bairro", sem urgencia artificial. Campos de infraestrutura permanecem inalterados.

---

### Arquivos alterados

**1. `src/config/esteticaSorrisoGenericaConfig.ts`**
- Hero: headline "Estetica Dental em Ipanema -- Sorriso que Combina com Voce", subheadline listando tratamentos, ctaText "Agendar Avaliacao Estetica"
- Benefits: Visao integrada, Test Drive, WhatsApp 24h, 20+ anos
- Problem: titulo "Quer Melhorar Seu Sorriso mas Nao Sabe por Onde Comecar?", 6 itens especificos
- Guide: 4 steps (Conversa e Analise, Diagnostico das Opcoes, Simulacao quando indicado, Voce Decide o Caminho)
- SocialProof: remover rating, 3 depoimentos com nome+bairro (Marina P., Fernanda G., Thiago R.), stats com iTero
- FAQ: 5 perguntas (qual tratamento, lentes artificiais, combinar tratamentos, resultado permanente, convenios)
- CTA: "Quer Saber o que Faz Sentido para Seu Sorriso?", sem urgency

**2. `src/config/limpezaDentalConfig.ts`**
- Remover urgency do root (era "Cada dia de adiamento...")
- Hero: headline "Limpeza Dental Profissional em Ipanema", subheadline sem dados inventados, ctaText "Agendar Minha Limpeza"
- Benefits: remover dados falsos ("30% mais biofilme", "8-50x mais caro"), substituir por factuais
- Problem: titulo "Ha Quanto Tempo Voce Nao Faz uma Limpeza Profissional?", 6 itens simples e honestos (remover "90% dos problemas", "R$50 por real investido")
- Guide: 4 steps em vez de 5 (Avaliacao, Remocao com Ultrassom, Polimento, Orientacao)
- SocialProof: remover rating e profissoes, 3 novos depoimentos com nome+bairro, stats com "1h+" e "20+" em vez de percentuais inventados
- FAQ: 5 perguntas em vez de 7, titulo simplificado
- CTA: "Sua Boca Merece esse Cuidado", sem urgency

**3. `src/config/profilaxiaConfig.ts`**
- Remover urgency do root
- Hero: headline "Profilaxia Dental em Ipanema -- Prevencao que Funciona", subheadline honesta
- Benefits: remover checkmarks e dados falsos, 4 itens factuais
- Problem: titulo "Prevencao e o Investimento Mais Inteligente", 6 itens sem percentuais inventados
- Guide: 4 steps em vez de 5 (Exame Clinico, Remocao de Tartaro e Placa, Polimento e Fluor, Plano Preventivo)
- SocialProof: remover rating, 3 novos depoimentos com nome+bairro (Fernanda L., Lucas T., Ana Maria B.), stats com "1h+" e "20+"
- FAQ: 4 perguntas em vez de 7, incluindo "profilaxia e limpeza sao a mesma coisa?"
- CTA: "Prevencao e o Melhor Tratamento", sem urgency

**4. `src/config/saudeGengivalConfig.ts`**
- Hero: headline "Saude da Gengiva em Ipanema -- Sangramento e Retracao Merecem Atencao", subheadline direta
- Benefits: Tratamento integrado com periodontista, Acompanhamento continuo, WhatsApp 24h, 20+ anos
- Problem: titulo "Sinais na Gengiva que Voce Nao Deveria Ignorar", 6 itens incluindo "tratar gengiva antes de implantar"
- Guide: 4 steps (Avaliacao Detalhada, Tratamento Periodontal, Reavaliacao, Manutencao Periodica)
- SocialProof: remover rating, 3 novos depoimentos com nome+bairro, stats com "Integrado / Cuidado com Periodontista"
- FAQ: 5 perguntas (sangramento normal?, periodontite tem cura?, lentes/implantes com problema gengival?, mau halito?, convenios?)
- CTA: "Gengiva Saudavel e a Base de Tudo", sem urgency

---

### Destaques desta rodada
- **Limpeza e Profilaxia**: Remoção de todos os dados percentuais inventados ("30% mais biofilme", "95% biofilme removido", "60% reducao", "8-50x mais caro", "R$50 por real investido"). Substituicao por stats factuais da clinica (20+ anos, 4.000+ pacientes, 1h+ por consulta, 24h WhatsApp).
- **Estetica**: LP generica ganha tom de "triagem" — ajuda o paciente a descobrir qual tratamento e indicado, sem empurrar uma opcao.
- **Gengiva**: Destaque para integracao com periodontista e o conceito de "tratar a gengiva antes de investir em estetica ou implantes".

### Mudancas nos dados
- Campo `rating` removido de todos os testimonials (4 configs)
- Campo `urgency` do root: removido em limpeza e profilaxia (era "Cada dia de adiamento...")
- Campo `urgency` do cta: removido em todas as 4 configs
- Checkmarks (caractere especial) removidos dos benefits da profilaxia
- Stats com percentuais inventados substituidos por dados factuais da clinica

### O que NAO muda
- Campos campaign, messageMatch, whatsapp, seo, tracking, contact
- backgroundImage em cada hero
- Imports e exports
- Nenhum outro arquivo
- Estrutura dos componentes que consomem essas configs

