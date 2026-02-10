

## Bio Canonica, Depoimentos e Limpeza de Cliches

### Resumo
Aplicar tres melhorias simultaneas: (A) padronizar a bio da Dra. Carla com paragrafos contextuais em 6 paginas, (B) refinar depoimentos removendo estrelas e cliches, (C) eliminar cliches globalmente.

---

### Parte A -- Bio Canonica (6 arquivos)

Cada arquivo tera o paragrafo 1 identico + paragrafo 2 contextual. Layout, foto, badge e grid de credenciais permanecem inalterados.

**1. `src/components/AboutSection.tsx`** (linhas 68-76)
- Substituir os 3 paragrafos atuais por:
  - P1 (core): "Com mais de duas decadas em Ipanema, a Dra. Carla construiu sua reputacao..."
  - P2 (homepage): "Especialista em Protese Dentaria e Implantodontia, a Dra. Carla utiliza escaneamento digital intraoral..."

**2. `src/pages/ClareamentoDental.tsx`** (linhas ~604-614)
- Substituir os 2 paragrafos da secao da especialista por bio core + paragrafo contextual clareamento

**3. `src/pages/LentesEFacetas.tsx`** (linhas ~704-709)
- Substituir os 2 paragrafos por bio core + paragrafo contextual lentes/facetas (iTero, Test Drive)

**4. `src/pages/ProteseDentaria.tsx`** (linhas ~544-555)
- Substituir os 2 paragrafos por bio core + paragrafo contextual protese (reabilitacao oral, casos complexos)

**5. `src/pages/RestaureacoesEsteticas.tsx`** (linhas ~90-96)
- Substituir os 2 paragrafos por bio core + paragrafo contextual restauracoes (resinas, translucidez natural)

**6. `src/pages/Ortodontia.tsx`** (linhas ~559-571)
- Substituir os 2 paragrafos da Dra. Carla por bio core + paragrafo contextual ortodontia (parceria com Dr. Bruno)
- NAO alterar a bio do Dr. Bruno

---

### Parte B -- Refinar Depoimentos

**`src/components/TestimonialsSection.tsx`**
- Remover import de `StarIcon`
- Remover campos `rating` e `location` dos dados
- Integrar bairro no campo `name` (ex: "Beatriz M. -- Ipanema")
- Substituir textos dos 3 depoimentos pelos novos (tom conversacional, especificos, sem cliches)
- Remover bloco de renderizacao das estrelas (linhas 46-54)
- Remover `<span>` do location (linha 58)

Novos depoimentos conforme especificado no prompt (Beatriz/lentes, Roberto/reabilitacao, Juliana/acompanhamento).

---

### Parte C -- Limpeza de Cliches

**`src/components/Hero.tsx`**
- H1 (linha 47): "Dra. Carla Christoph: Dentista em Ipanema para um Sorriso Perfeito" → "Dra. Carla Christoph — Dentista Especialista em Ipanema"
- Subtitulo (linhas 49-50): remover "une a excelencia da odontologia estetica a um atendimento personalizado. Cuidamos do seu sorriso com a dedicacao que ele merece." → "Odontologia estetica e reabilitacao oral com tempo e atencao ao seu caso."

**`src/pages/ServicesPage.tsx`**
- Adicionar paragrafo introdutorio antes do `<ServicesSection />`: "Cada tratamento e planejado individualmente, com tempo e atencao ao que o seu caso especifico precisa. Conheca as opcoes e agende sua avaliacao."

**`src/pages/Ortodontia.tsx`**
- Linha 209: "tratamento ortodontico de excelencia" → "tratamento ortodontico especializado"
- Linhas 246-249: "cuidado personalizado... excelencia nos resultados" → "cuidado individual... precisao nos resultados"
- Linhas 567-570: "tratamento tecnico de excelencia, mas tambem o cuidado e atencao que merecem durante toda a transformacao do sorriso" → "o tratamento mais indicado, com o tempo e atencao que cada caso exige"
- Linhas 653-656: "transformar seu sorriso. Tecnologia avancada, expertise comprovada e atendimento personalizado te aguardam" → "alinhar seu sorriso. Scanner iTero 3D, Invisalign e consultas sem pressa te aguardam"

**`src/pages/ProteseDentaria.tsx`**
- Linha 123 (hero description): "materiais de excelencia" → "materiais de alta qualidade"

**`src/pages/LentesEFacetas.tsx`**
- Linha 206 (hero description): "Transforme seu sorriso" → "Recupere a confianca no seu sorriso"

**`src/pages/AboutPage.tsx`**
- Linha 130: "materiais de excelencia para garantir resultados naturais, funcionais e duradouros" → "materiais de alta qualidade para garantir resultados naturais e funcionais"
- Linha 136: "Cuidado Personalizado e Excelencia em Materiais" → "Atencao Individual e Qualidade em Materiais"
- Linha 139: substituir "atendimento e totalmente individualizado" e "materiais de excelencia" por versoes sem cliche

**`src/pages/ServiceDetail.tsx`**
- Linha 14: "Transforme seu sorriso" → "Corrija cor, forma e imperfeicoes"
- Linha 15: "resultados naturais e duradouros" → "resultado que respeita a aparencia natural dos dentes"

**`src/components/landing/limpeza/LimpezaDentalCTA.tsx`**
- Linha 141: "Atendimento particular de excelencia" → "Atendimento particular com tempo dedicado"

**`src/components/seo/InternalLinkingOptimizer.tsx`**
- Linha 53: "Tecnologia de ponta" → "Scanner iTero 3D"

---

### O que NAO muda
- Funcionalidades, tracking, componentes de performance, estrutura de rotas
- Meta tags, structured data, SEO tecnico (exceto onde cliches aparecem em meta descriptions visadas)
- CTAs WhatsApp, botao flutuante
- Design system (cores, tipografia, espacamento)
- Bio do Dr. Bruno na pagina de Ortodontia
- Paginas ja reescritas nos Prompts 1-3 (Implantes, Canal, Gengiva)

### Total de arquivos editados: ~12

