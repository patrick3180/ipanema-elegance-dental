

## Prompt 17 — Bio Canonica em Implantes + Varredura de Cliches

### Resumo
4 alteracoes: substituir bio generica em ImplantesDentarios.tsx, corrigir cliches em ImplantesDentarios.tsx e ProteseDentaria.tsx, e limpar palavras banidas em Ortodontia.tsx, ClinicaGeralPrevencao.tsx e AboutSection.tsx.

---

### Alteracao 1: Bio canonica em `src/pages/ImplantesDentarios.tsx`

**Secao Especialista (linhas 506-553)**

**1a) Subtitulo da bio (linha 510):**
- De: `Especialista em Reabilitação Oral e Implantodontia`
- Para: `CRO-RJ 27.509 | Especialista em Prótese Dentária e Implantodontia`

**1b) Paragrafo 1 (linha 514):**
- De: `Com mais de 20 anos de experiência, a Dra. Carla é especialista em implantodontia e próteses no Rio de Janeiro. Atualização constante em congressos nacionais e internacionais, domínio de técnicas modernas de cirurgia e planejamento digital 3D.`
- Para: `Com mais de duas décadas em Ipanema, a Dra. Carla construiu sua reputação tratando cada paciente de forma individual, com tempo e atenção. Sua formação inclui 8 anos como dentista militar na Odontoclínica Central da Marinha, experiência que trouxe disciplina e precisão para sua prática clínica.`

**1c) Paragrafo 2 (linha 518):**
- De: `Cada tratamento é meticulosamente planejado considerando anatomia individual, expectativas estéticas e qualidade de vida. O objetivo é sempre devolver não apenas dentes, mas confiança e bem-estar.`
- Para: `Sua formação em Implantodontia permite planejar desde casos unitários até reabilitações completas com segurança e previsibilidade. Cada implante é posicionado com base em planejamento digital, considerando estética e função a longo prazo.`

**1d) Credenciais grid 2x2 (linhas 521-553):**
- Card 1: "CRO-RJ 27.509" / "Mais de 20 anos de atuação" -> "Formacao" / "Especialista em Protese Dentaria e Implantodontia"
- Card 2: "Especializacao" / "Protese, Implantodontia e Estetica" -> "Experiencia" / "20+ anos, incluindo 8 na Marinha"
- Card 3: "Tecnologia" / "Scanner digital 3D, planejamento avancado" -> "Tecnologia" / "Scanner iTero, planejamento digital do sorriso"
- Card 4: "Experiencia" / "Centenas de casos complexos resolvidos" -> "Abordagem" / "Consultas individualizadas, minimo de 1 hora"

---

### Alteracao 2: Cliches em `src/pages/ImplantesDentarios.tsx`

**2a) Subtitulo "Diferenciais" (linha 380):**
- De: `Tecnologia de ponta e cuidado personalizado para resultados excepcionais`
- Para: `Como trabalhamos para oferecer segurança e previsibilidade`

**2b) Card "Implantes Premium" (linha 405):**
- De: `Implantes Premium`
- Para: `Implantes de Referência`

**2c) Texto do card (linhas 407-408):**
- De: `Utilizamos apenas implantes de marcas líderes mundiais com superfície tratada que favorece a osseointegração e garante longevidade.`
- Para: `Trabalhamos com marcas de referência mundial, com superfície tratada que favorece a osseointegração e comprovação científica de longo prazo.`

**2d) Comentario "Secao Diferencial Premium" (linha 372):**
- De: `{/* Seção Diferencial Premium */}`
- Para: `{/* Seção Diferenciais */}`

**2e) FAQ convenios (linha 673):**
- De: `Nosso atendimento é exclusivamente particular, o que nos permite dedicar tempo adequado a cada paciente e utilizar materiais premium. Oferecemos orçamento detalhado e transparente na primeira consulta.`
- Para: `Nosso atendimento é particular, o que nos permite dedicar o tempo necessário a cada paciente e utilizar somente materiais de primeira linha. Na primeira consulta, apresentamos um orçamento detalhado e transparente.`

**2f) Timeline etapa 4 (linha 470):**
- De: `...Instalação e ajustes finais para conforto e estética impecáveis.`
- Para: `...Instalação e ajustes finais para conforto e estética natural.`

**2g) Accordion "Implante Unitario" (linha 190):**
- De: `Solução definitiva para substituir um único dente...`
- Para: `Reposição permanente de um único dente...`

**2h) Accordion "Implante Unitario" vantagens (linha 206):**
- De: `...estética impecável com aspecto de dente natural...`
- Para: `...estética natural com aspecto de dente real...`

---

### Alteracao 3: Cliches em `src/pages/ProteseDentaria.tsx`

**3a) Titulo secao cards (linha 140):**
- De: `Reabilitação Oral que Transforma Vidas`
- Para: `Reabilitação Oral Completa`

**3b) Card "Ceramicas premium importadas" (linha 489):**
- De: `Cerâmicas premium importadas`
- Para: `Cerâmicas de alta qualidade`

**3c) FAQ porcelana vs resina (linha 54):**
- De: `...É nossa escolha para casos definitivos. A resina pode ser usada em provisórios ou situações específicas. Utilizamos apenas materiais premium importados para garantir o melhor resultado.`
- Para: `...É nossa escolha para casos de longa duração. A resina pode ser usada em provisórios ou situações específicas. Utilizamos materiais de primeira linha para garantir durabilidade e resultado natural.`

**3d) Comentario "PREMIUM" (linha 314):**
- De: `{/* Protocolo All-on-4/6 - PREMIUM */}`
- Para: `{/* Protocolo All-on-4/6 */}`

**3e) Card All-on-4 texto (linha 329):**
- De: `...com prótese fixa para transformação completa do sorriso.`
- Para: `...com prótese fixa para reabilitação completa da arcada.`

**3f) Badge "Transformacao Total" (linha 333):**
- De: `Transformação Total`
- Para: `Reabilitação Completa`

**3g) Timeline etapa 5 (linha 418):**
- De: `...cria sua prótese com cerâmicas premium, estratificando cores...`
- Para: `...cria sua prótese com cerâmicas de alta qualidade, estratificando cores...`

**3h) Timeline subtitulo (linha 382):**
- De: `...precisão e resultados excepcionais`
- Para: `...precisão e resultados naturais e previsíveis`

---

### Alteracao 4: Varredura geral — outros arquivos

**4a) `src/pages/Ortodontia.tsx` (linha 137):**
- OG description: De `Transforme seu sorriso com ortodontia moderna...`
- Para: `Ortodontia moderna em Ipanema com Dr. Bruno Moreira, especialista com doutorado UERJ. Invisalign® e tecnologia iTero no consultório da Dra. Carla.`

**4b) `src/pages/Ortodontia.tsx` (linha 212):**
- De: `...transformar seu sorriso com conforto e precisão.`
- Para: `...alinhar seu sorriso com conforto e precisão.`

**4c) `src/pages/Ortodontia.tsx` (linha 270):**
- De: `<span className="text-xs ml-2 text-dental-gold">PREMIUM</span>`
- Para: remover esta span inteira

**4d) `src/pages/Ortodontia.tsx` (linha 441):**
- De: `Sua Jornada para um Sorriso Perfeito`
- Para: `Sua Jornada para um Sorriso Alinhado`

**4e) `src/pages/Ortodontia.tsx` (linha 469):**
- De: `Ajustes finais para perfeição do resultado.`
- Para: `Ajustes finais para precisão do resultado.`

**4f) `src/components/AboutSection.tsx` (linha 55):**
- De: `Uma trajetória de paixão pela odontologia e dedicação em transformar sorrisos em Ipanema`
- Para: `Mais de 20 anos dedicados à reabilitação oral e odontologia estética em Ipanema`

**4g) `src/pages/ClinicaGeralPrevencao.tsx` (linha 431):**
- De: `Tecnologia de ponta, atendimento humanizado e protocolos personalizados aguardam você em Ipanema.`
- Para: `Scanner digital, protocolos personalizados e tempo para cuidar da sua saúde bucal aguardam você em Ipanema.`

**4h) `src/pages/SaudeDaGengiva.tsx`:**
- Verificado: nenhuma palavra banida encontrada. Nenhuma alteracao necessaria.

---

### Arquivos modificados (total: 5)
1. `src/pages/ImplantesDentarios.tsx` — bio canonica + cliches removidos
2. `src/pages/ProteseDentaria.tsx` — "premium", "transforma", "excepcionais" removidos
3. `src/pages/Ortodontia.tsx` — "transforme", "premium", "perfeito" removidos
4. `src/components/AboutSection.tsx` — "transformar" removido do subtitulo
5. `src/pages/ClinicaGeralPrevencao.tsx` — "humanizado" removido

### O que NAO muda
- Landing pages, configs, componentes ConsultaInicial*
- AboutPage, ContactPage, ContactSection, Hero, ServicesSection, TestimonialsSection
- Clareamento, Lentes/Facetas, Restauracoes, Canal (bio ja correta)
- SaudeDaGengiva (limpo, sem cliches)
- Structured data / schema markup
- Tracking (GTM, Google Ads, GCLID)
