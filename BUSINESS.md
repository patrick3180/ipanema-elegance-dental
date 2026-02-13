# BUSINESS.md — Contexto do Negócio e Operações

**Consultório:** Dra. Carla Christoph — Dentista Especialista em Ipanema  
**Última atualização:** Fevereiro 2026  
**Uso:** Contexto essencial do negócio para qualquer tomada de decisão. Quem trabalhar no projeto precisa entender o negócio, não apenas o código.

---

## 1. Dados do Consultório

| Dado | Valor |
|------|-------|
| **Nome** | Clínica Dra. Carla Christoph |
| **Profissional** | Dra. Carla Christoph |
| **CRO-RJ** | 27.509 |
| **Especialidades** | Prótese Dentária e Implantodontia |
| **Endereço** | Rua Visconde de Pirajá, 550 — Sala 1107 |
| **Bairro** | Ipanema |
| **Cidade** | Rio de Janeiro — RJ |
| **CEP** | 22410-002 |
| **Telefone/WhatsApp** | +55 21 99330-4045 |
| **E-mail** | contato@dracarlachristoph.com |
| **Instagram** | @dracarlachristoph |
| **Site** | https://dracarlachristoph.com |
| **Horário** | Segunda a Sexta, 9h às 19h |
| **Sábados** | Não atende |
| **Convênios** | ❌ Não trabalha. Atendimento 100% particular. |
| **WhatsApp 24h** | ✅ Real — fluxo N8N humanizado responde fora do horário |

---

## 2. Público-Alvo

### Perfil Demográfico

| Aspecto | Descrição |
|---------|-----------|
| **Classe social** | Classe média alta |
| **Região** | Zona Sul do Rio de Janeiro |
| **Bairros prioritários** | Ipanema, Leblon, Jardim Botânico, Lagoa, Copacabana (parte) |
| **Bairros secundários** | Gávea, Humaitá, Botafogo, Barra da Tijuca |
| **Perfil** | Valoriza qualidade, tempo e atenção individualizada |
| **Disposição a pagar** | Aceita investir mais por um atendimento sem pressa e materiais de referência |

### O que o Paciente Valoriza

1. **Tempo dedicado** — mínimo 1h por consulta, sem sensação de "linha de produção"
2. **Clareza** — saber exatamente o que tem, o que precisa, quanto custa e quanto tempo leva
3. **Confiança** — profissional com formação comprovada e experiência real
4. **Resultado natural** — não quer "dentes de famoso", quer melhoria que ninguém perceba que foi feita
5. **Conveniência** — localização em Ipanema, WhatsApp responsivo, sem burocracia

### Como o Paciente Chega

| Canal | Papel |
|-------|-------|
| Google Ads | Principal canal de aquisição paga — landing pages específicas |
| Google Orgânico | Service pages + blog — autoridade a médio/longo prazo |
| Indicação | Pacientes satisfeitos indicam — tracking indireto |
| Instagram | Presença e autoridade — não é canal direto de aquisição |

---

## 3. Serviços e Categorização

### Serviços Diretos (Dra. Carla executa)

| Serviço | Ticket Relativo | Observação |
|---------|----------------|------------|
| Implantes dentários | Alto | Especialidade formal. Caso unitário a reabilitação completa. |
| Prótese dentária | Alto | Especialidade formal. Coroas, pontes, próteses totais. |
| Lentes de contato dental / facetas | Alto | Estética avançada. Test Drive do Sorriso. |
| Clareamento dental | Médio | Consultório, caseiro supervisionado ou combinado. |
| Restaurações estéticas | Médio | Resinas e cerâmicas de alta translucidez. |
| Clínica geral e prevenção | Médio | Check-up, limpeza, planos preventivos. |
| Consulta inicial | Entrada | Mínimo 1h. Inclui exame completo + profilaxia. |

### Serviços Coordenados (parceiros executam)

| Serviço | Profissional | Papel da Dra. Carla |
|---------|-------------|---------------------|
| Ortodontia | Dr. Bruno Moreira das Neves (CRO-RJ 41.684) | Acompanhamento integral, integração com demais tratamentos |
| Endodontia (canal) | Endodontista parceiro | Diagnóstico, acompanhamento, finalização |
| Periodontia (gengiva) | Periodontista parceiro | Diagnóstico, encaminhamento, manutenção |

---

## 4. Números do Negócio

| Métrica | Valor |
|---------|-------|
| **Ticket médio** | ~R$ 1.000 |
| **Meta de faturamento 2026** | R$ 25.000+/mês |
| **Tempo mínimo por consulta** | 1 hora |
| **Experiência** | 20+ anos |
| **Pacientes atendidos** | 4.000+ |

---

## 5. Concorrência

### Concorrentes Diretos (buscas Google, Zona Sul RJ)

| Concorrente | URL |
|-------------|-----|
| Dr. Guilherme Rothier | https://www.guilhermerothier.com.br/ |
| Rowan Vilar | https://rowanvilar.com.br/ |
| Jamil Dentista | https://jamildentista.com.br/ |
| Vilma Rafael | https://vilmarafael.com.br/ |
| Dra. Karina Glatthardt | https://drakarinaglatthardt.com.br/ |
| Walmira | https://www.walmira.com.br/ |

### Posicionamento Competitivo

A Dra. Carla se diferencia por:
- **Tempo:** Nenhum concorrente na região comunica explicitamente "mínimo de 1h por consulta"
- **Jornada completa:** Acompanhamento pessoal mesmo em tratamentos feitos por parceiros
- **Background único:** 8 anos na Marinha — nenhum concorrente tem esse diferencial
- **Atendimento particular exclusivo:** Sem diluição de atenção por pacientes de convênio

---

## 6. Automações Existentes

### WhatsApp 24h (N8N)

- Fluxo N8N humanizado que responde mensagens de WhatsApp fora do horário comercial
- O paciente recebe resposta mesmo à noite e fins de semana
- Isso é **real** e pode ser comunicado no marketing
- Tom do fluxo: pessoal, objetivo, sem parecer robô

### Blog Pipeline (N8N + Contentful)

```
Perplexity (pesquisa/draft) → N8N (processamento) → Revisão Dra. Carla → Contentful (publicação)
```

- Pipeline semi-automatizado para produção de conteúdo
- Posts em formato Q&A são priorizados
- Dra. Carla revisa e adiciona comentários pessoais antes da publicação

### GCLID → Supabase (N8N)

```
Frontend captura GCLID → Webhook N8N → Supabase → Upload manual Google Ads (a cada 15 dias)
```

Detalhado em `TRACKING.md`.

---

## 7. Decisões Consolidadas do Projeto

Decisões já tomadas e aprovadas. **Não revisitar sem motivo forte:**

| Tema | Decisão | Razão |
|------|---------|-------|
| Fotos antes/depois | ❌ Não usar | CRO proíbe em marketing digital |
| Fotos de procedimentos | ❌ Não usar | Regulamentação + contraproducente |
| Depoimentos | Sem estrelas, sem profissões, tom natural | Credibilidade > marketing |
| Contentful/Blog | ✅ Manter | Pipeline N8N funciona bem |
| WhatsApp 24h | ✅ Real, comunicar | Fluxo N8N humanizado |
| Formulário de contato | ❌ Removido | WhatsApp é suficiente |
| Emergência em `/servicos` | ❌ Não incluir | Existe apenas como LP para demanda ociosa |
| Página `/servicos` | ✅ Está boa como está | — |
| Clínica Geral layout | ✅ Manter template simples | Não migrar para rico |
| Dr. Bruno | Chamar de "Dr. Bruno" | Sem sobrenome "Christoph" |
| Endodontia/Periodontia | Dra. Carla NÃO faz | Parceiros fazem, ela coordena |
| Preços | ❌ Nunca mencionar | Proibido pelo CRO |
| Posicionamento | Nunca dizer "premium" | Mostrar, não dizer |
| Planos/Convênios | Não trabalha | Aviso na ContactPage |
| Blog SEO | Formato Q&A priorizado | Melhor para AI Search |
| Google Business Profile | ✅ Mantido atualizado | Patrick cuida |

---

## 8. Google Ads — Visão Geral da Estratégia

### Estrutura

- **Conta:** AW-16894364517
- **Tipo principal:** Search (Pesquisa)
- **Região alvo:** Zona Sul do Rio de Janeiro
- **Landing pages:** 13 LPs dedicadas em `/lp/*`

### Campanhas por Tipo

| Tipo | Exemplos de Keywords | LP de Destino |
|------|---------------------|--------------|
| Consulta geral | "dentista ipanema" | `/lp/consulta-inicial` |
| Estética | "lentes de contato dental", "estetica dental" | `/lp/lentes-porcelana-ipanema`, `/lp/estetica-dental-ipanema` |
| Clareamento | "clareamento dental ipanema" | `/lp/clareamento-dental` |
| Implantes | "implante dentario ipanema" | `/lp/implantes-dentarios-ipanema` |
| Prótese | "protese dentaria ipanema" | `/lp/especialista-protese-ipanema` |
| Ortodontia | "ortodontia ipanema", "invisalign" | `/lp/ortodontia-ipanema` |
| Urgência | "dor de dente urgencia", "dente quebrado" | 3 LPs de urgência |
| Limpeza | "limpeza dental ipanema" | `/lp/limpeza-dental-ipanema` |
| Gengiva | "tratamento gengiva" | `/lp/saude-gengival-ipanema` |

### Atribuição de Valor

O diferencial competitivo da operação de Ads é a **atribuição offline via GCLID**:
- Cada clique de Google Ads carrega um GCLID
- O GCLID é capturado quando o paciente clica no WhatsApp
- Patrick faz upload do faturamento real por GCLID ao Google Ads a cada 15 dias
- Isso permite ao Google otimizar campanhas com base no **valor real** (não apenas cliques/leads)

Detalhado em `TRACKING.md`.

---

## 9. Tecnologia e Equipamentos do Consultório

Informações que podem ser mencionadas em conteúdo (quando específico > genérico):

| Equipamento | Uso | Mencionável |
|-------------|-----|------------|
| Scanner intraoral iTero Element 5D | Escaneamento digital para planejamento | ✅ Sempre nomear |
| Test Drive do Sorriso | Simulação prévia em lentes/facetas | ✅ Diferencial forte |
| Planejamento digital do sorriso | Softwares de design | ✅ Mencionar como "planejamento digital" |
| Ultrassom (profilaxia) | Limpeza dental | ✅ Nomear em conteúdo de limpeza |
| Materiais de referência | Resinas, cerâmicas, implantes | ✅ Nomear quando souber o específico |

**Regra:** Sempre nomear a tecnologia real em vez de dizer "tecnologia de ponta" ou "equipamentos modernos" (ver `BRAND.md`).

---

## 10. Histórico do Projeto de Otimização

### Fases Concluídas

| Fase | Escopo | Status |
|------|--------|--------|
| Fase 1 | Auditoria técnica completa (8 prompts Lovable) | ✅ Concluída |
| Fase 2 | Auditoria de conteúdo e visual | ✅ Concluída |
| Fase 3 | Layout, design system, reativação de páginas | ✅ Concluída |

### Prompts Lovable Aplicados (Fase 1)

| Prompt | Descrição |
|--------|-----------|
| A | Corrigir URLs antigas (lovable.app → dracarlachristoph.com) |
| B | Adicionar noindex em 13 landing pages |
| C | Script de geração de HTMLs estáticos (meta tags) — 3 iterações |
| D | Remover AggregateRating fabricado |
| E | Simplificar robots.txt + limpar sitemap |
| F | Padronizar telefone e endereço nos schemas JSON-LD |
| G | Acessibilidade + formulário de contato funcional |
| H | Tracking: GTM delay, unificar carregamento, conversão no form |

### Trabalho Pendente

Consultar documentos de handoff mais recentes para ações pendentes. Os principais temas em aberto:
- Migração de service pages simples para template rico (canal, gengiva)
- Atualização de configs de LP (consulta inicial, prótese, ortodontia)
- Limpeza geral de clichês remanescentes
- Performance mobile (FCP/LCP)
- Blog posts sem HTML estático
