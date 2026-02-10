

## Prompt 15 — Ajustes Rapidos: ContactSection, ServicesSection e /servicos

### Resumo
3 alteracoes pontuais: corrigir cliches e horario no ContactSection, limpar descricoes dos cards no ServicesSection, e ajustar intro da pagina /servicos.

---

### Alteracao 1: `src/components/ContactSection.tsx`

**1a) Linha 108** — Remover "Transforme":
- De: `Transforme seu Sorriso: Agende sua Consulta em Ipanema`
- Para: `Agende sua Consulta em Ipanema`

**1b) Linhas 216-217** — Corrigir horario:
- De: `Segunda a Sexta: 9h às 18h` + `Sábados: 9h às 13h`
- Para: `Segunda a Sexta: 9h às 19h` (remover linha de sabados e o `<br />`)

---

### Alteracao 2: `src/components/ServicesSection.tsx`

Substituir apenas o campo `description` dos 6 cards indicados. Titulos, imagens, slugs e estrutura intactos.

**2a) Lentes (linha 9):**
Para: `"Lâminas ultrafinas de porcelana que corrigem cor, forma e pequenas imperfeições. Resultado natural e duradouro, planejado digitalmente com scanner iTero."`

**2b) Clareamento (linha 15):**
Para: `"Dentes mais brancos com segurança. Protocolo em consultório ou supervisionado em casa, com controle de sensibilidade e resultado natural."`

**2c) Implantes (linha 27):**
Para: `"Reabilitação de dentes perdidos com implantes que devolvem função mastigatória e estética. Planejamento digital para casos unitários ou reabilitações completas."`

**2d) Ortodontia (linha 33):**
Para: `"Alinhamento dental e correção de mordida com aparelhos fixos, estéticos ou alinhadores Invisalign\u00ae. Parceria com o Dr. Bruno, Doutor em Ortodontia pela UERJ."`

**2e) Restauracoes (linha 45):**
Para: `"Tratamento de cáries e reconstrução de dentes fraturados com resinas e cerâmicas que reproduzem a cor e translucidez natural do dente."`

**2f) Canal (linha 51):**
Para: `"Tratamento de canal para eliminar dor e preservar o dente natural. Procedimento realizado por endodontista especializado, com acompanhamento da Dra. Carla do início ao fim."`

Cards que NAO mudam: Proteses Dentarias (ok), Clinica Geral (ok), Saude da Gengiva (ok — sem cliches banidos).

---

### Alteracao 3: `src/pages/ServicesPage.tsx`

Linha 26 — Ajustar intro para incluir nome da Dra. Carla (conforme prompt):
- De: `"Cada tratamento é planejado individualmente, com tempo e atenção ao que o seu caso específico precisa. Conheça as opções e agende sua avaliação."`
- Para: `"Cada tratamento é planejado individualmente, com tempo e atenção ao que o seu caso específico precisa. Conheça os serviços oferecidos pela Dra. Carla Christoph em Ipanema."`

---

### Arquivos modificados (total: 3)
1. `src/components/ContactSection.tsx` — subtitulo e horario
2. `src/components/ServicesSection.tsx` — 6 descricoes de cards
3. `src/pages/ServicesPage.tsx` — ajuste menor na intro

### O que NAO muda
- Landing pages, configs, componentes ConsultaInicial*
- App.tsx, rotas
- Service pages individuais
- Hero.tsx
- Formulario do ContactSection (funciona, mantem intacto)
- Tracking (GTM, Google Ads, GCLID)
