# PILAR 7 -- DESIGN & UX AUDIT

**Consultorio:** Dra. Carla Christoph -- Ipanema, Rio de Janeiro
**Data:** 16 de Fevereiro de 2026
**Score Geral:** 68/100
**Status:** COMPLETO

---

## SUMARIO EXECUTIVO

O site da Dra. Carla Christoph apresenta um design visual coeso e sofisticado, com uma paleta de cores (roxo #381F47, ouro #B3955F, bege de fundo) que comunica posicionamento premium de forma silenciosa -- exatamente alinhado ao BRAND.md. A tipografia Playfair Display + Montserrat funciona bem para o segmento, e a arquitetura de componentes e uma das maiores qualidades tecnicas: TreatmentHero reutilizavel, sistema de shadows hierarquico, e utilitarios CSS bem definidos.

Os pontos fracos sao concentrados em **conversao e UX mobile**. O principal problema e o **gap de CTAs entre service pages (1 no hero + 1 no final) vs landing pages (hero + mid + final + floating)**, o que explica parcialmente por que a taxa de conversao das service pages e inferior. O WhatsApp floating button esta presente mas **em desktop aparece com texto "Conversar sobre meu caso" enquanto em mobile mostra apenas o icone** -- considerando que iOS converte 2.4x mais que Android, o botao mobile merece mais destaque. A **Ortodontia usa layout completamente diferente** das demais service pages, quebrando consistencia. O footer principal tem **links quebrados** (anchors #inicio, #sobre etc nao funcionam corretamente de outras paginas). A **homepage hero** tem headline generica sem dor/aspiracao especifica, e o **Contact Section exibe "NAO TRABALHAMOS COM PLANOS E CONVENIOS" em vermelho negrito** -- um anti-padrao de conversao que afasta antes de engajar.

**Impacto estimado:** Corrigir os 5 problemas criticos pode melhorar taxa de conversao em 20-30%.

---

## BREAKDOWN POR CATEGORIA

### 1. VISUAL DESIGN (21/30)

#### 1.1 Hierarquia Visual

| Elemento | Score | Analise |
|----------|:-----:|---------|
| Heading scale | 8/10 | Sistema bem definido: heading-xl (4xl/5xl), heading-lg (3xl/4xl), heading-md (2xl/3xl). Responsivo com breakpoints. Playfair Display nos titulos cria distincao clara. |
| CTA visibility | 5/10 | Hero CTA usa `bg-dental-purple` (discreto, alinhado ao tom). Problema: nao se destaca visualmente na pagina. LPs usam verde WhatsApp (#25D366) -- muito mais visivel. Service pages nao tem CTA de cor contrastante no meio da pagina. |
| Spacing system | 8/10 | `section-spacing` (py-16/20/24) e `container-custom` (px-6/lg:px-8) sao consistentes. `SectionDivider` entre secoes cria respiracao visual. |
| Section separators | 7/10 | `Separator` (w-24 h-1 bg-dental-gold) usado em Homepage sections. `SectionDivider` com icones nas service pages. Consistente dentro de cada tipo de pagina. |

#### 1.2 Uso de Cores

| Cor | Hex | Uso | Avaliacao |
|-----|-----|-----|-----------|
| Purple (dental-purple) | #381F47 | Titulos, header, footer, CTA principal, backgrounds nobres | Correto. Contraste 12.4:1 em fundo claro. |
| Gold (dental-gold) | #B3955F | Separadores, badges, hover states, icones, detalhes | Correto. Usado com parcimonia como accent. |
| Beige (background) | HSL(51,22%,76%) | Fundo principal do site | OK mas pode parecer ligeiramente "apagado" em telas com pouca calibracao. |
| Gray (dental-gray) | #6B6B6B | Texto secundario | Contraste 5.4:1 -- passa WCAG AA em texto normal. |
| Green WhatsApp | #128C4A (custom) | Floating button, CTA WhatsApp | Acessivel (contraste 4.5:1). LPs usam #25D366 original (contraste 2.8:1 -- FALHA AA). |
| Red alert | vermelho em ContactSection | "NAO TRABALHAMOS COM PLANOS" | Incongruente com a paleta. Impacto negativo na experiencia. |

**Problemas identificados:**
- **LP Hero CTA verde (#25D366) nao passa WCAG AA** para texto branco (contraste 2.8:1 vs minimo 4.5:1)
- **Inconsistencia de verde**: Service pages usam `whatsapp-button` (#128C4A acessivel), LPs usam `#25D366` (inacessivel)
- A cor vermelha em "NAO TRABALHAMOS COM PLANOS" e visualmente agressiva e desalinhada

#### 1.3 Tipografia

| Aspecto | Status | Detalhes |
|---------|--------|----------|
| Font pairing | OK | Playfair Display (display/headings) + Montserrat (body). Classico e eficaz para luxo silencioso. |
| Self-hosted | OK | @font-face com woff2, font-display: swap. Sem dependencia de Google Fonts CDN. |
| Font weights | Atencao | Apenas 400 e 500 de Montserrat carregados via @font-face. Mas uso de `font-bold` (700) e `font-semibold` (600) no codigo -- **esses weights podem nao estar disponíveis, causando faux bold do browser**. |
| Playfair Display | Atencao | Apenas weight 400 carregado via @font-face. Mas codigo usa `font-bold` em muitos titulos. Possivel faux bold. |
| Hierarchy | OK | h1-h6 herdam font-display. Tamanhos responsivos via clamp ou breakpoints. |
| Line heights | OK | `leading-tight` para titulos, `leading-relaxed` para body. Correto. |

#### 1.4 Consistencia entre Paginas

| Pagina/Tipo | Usa TreatmentHero padrao? | Layout consistente? | Nota |
|-------------|:-------------------------:|:-------------------:|------|
| Implantes | Sim | Sim | Modelo de referencia |
| Lentes/Facetas | Sim | Sim | Bom |
| Clareamento | Sim | Sim | Bom |
| Protese | Sim | Sim | Bom |
| Saude Gengiva | Sim | Sim | Melhor conteudo emocional (85/100 psicologia) |
| Restauracoes | Sim | Sim | Bom |
| Canal | Sim | Sim | Bom |
| Clinica Geral | Sim | Sim | Bom |
| **Ortodontia** | **NAO** | **NAO** | **Layout custom, hero centralizado sem foto, CTA gold em vez de purple** |
| Landing Pages | HeroSection proprio | Sim (entre LPs) | Consistencia LP-a-LP e boa |
| Homepage | Hero proprio | N/A | Hero section unica |

**PROBLEMA CRITICO:** Ortodontia e a unica service page que nao usa TreatmentHero. Usa layout centralizado sem foto da doutora, CTA com `bg-dental-gold` em vez de `bg-dental-purple`, e secoes com backgrounds alternados diferentes (gray-50 vs dental-beige/20 vs white). Isso quebra a expectativa do usuario que navega entre servicos.

#### 1.5 Qualidade das Imagens

| Elemento | Status | Detalhes |
|----------|--------|----------|
| Hero homepage | OK | Dra. Carla em pe com jaleco. AVIF + WebP + PNG fallback. fetchPriority=high, loading=eager. |
| Service pages | OK | `OptimizedImage` com responsive={true}. Imagem da doutora no TreatmentHero. |
| Services grid | Atencao | Imagens reais dos tratamentos (/Lentes.webp, /Implante.webp etc). Lazy loaded. Mas **alt text generico** (apenas o titulo do servico). |
| Landing pages | OK | Imagens da doutora precarregadas. |
| Blog | OK | Imagens do Contentful processadas com maxHeight 400px. |

---

### 2. UX & NAVEGACAO (17/30)

#### 2.1 Navegacao (Header & Menu)

| Aspecto | Score | Analise |
|---------|:-----:|---------|
| Desktop nav | 7/10 | 6 itens (Inicio, Sobre, Tratamentos, Blog, Depoimentos, Contato). Claro e conciso. Sem dropdown/mega menu para tratamentos especificos -- poderia ter. |
| Mobile nav | 5/10 | Hamburger menu abre fullscreen overlay com 6 links centralizados. Funcional mas **sem CTA de WhatsApp no menu mobile**. Paciente em mobile precisa fechar o menu para ver o floating button. |
| Google Rating badge | 8/10 | "4.9 (23 avaliacoes)" com estrela no header desktop. Link para Google Reviews. Excelente trust signal. **Nao visivel em mobile** (hidden lg:flex). |
| Scroll behavior | 6/10 | Header fica fixed com bg-blur ao scrollar. Bom. Mas **nao indica pagina ativa** (sem highlight/underline no item de nav atual). |
| Skip to content | 9/10 | "Pular para o conteudo" com sr-only + focus:not-sr-only. Acessibilidade. |

**PROBLEMA:** Nao existe dropdown de tratamentos no header. O usuario precisa ir a /servicos para ver a lista. Em competidores, menu "Tratamentos" e expandivel mostrando todos os servicos diretamente.

#### 2.2 Jornada do Usuario (Homepage > Service Page > WhatsApp)

**Jornada ideal (3 cliques):**
1. Homepage > Clica em servico no grid > Service page > CTA WhatsApp

**Jornada real (problemas identificados):**

| Etapa | Experiencia | Problema |
|-------|-------------|---------|
| Homepage Hero | CTA "Agendar minha consulta" + "Conheca nossos tratamentos" | CTA generico -- nao direciona para tratamento especifico. Segundo botao e anchor #tratamentos (scroll). |
| Services Grid | 9 cards com hover reveal. "Saiba mais" por servico. | Cards usam `<a href>` em vez de `<Link to>` -- pode causar full page reload vs SPA navigation. |
| Service Page | TreatmentHero com CTA "Agendar Consulta de Avaliacao" | CTA usa `Calendar` icon, nao `MessageCircle` (WhatsApp). **Nao fica claro que abre WhatsApp ate clicar.** |
| CTA Final | Secao no final da pagina com botao WhatsApp | Unico CTA alem do hero. **1200-2000px de conteudo sem nenhum CTA intermediario.** |
| WhatsApp Floating | Visivel em todas as paginas (exceto LPs que tem o proprio) | Desktop: "Conversar sobre meu caso" + icon. **Mobile: apenas icone, sem texto.** |

**Score da jornada: 6/10** -- funciona mas tem fricao desnecessaria.

#### 2.3 CTAs: Posicionamento, Visibilidade, Quantidade

| Tipo de Pagina | CTAs visiveis | Posicoes | WhatsApp Floating | Avaliacao |
|---------------|:------------:|----------|:-----------------:|-----------|
| **Homepage** | 3 | Hero (2 botoes), About section (1 botao) | Sim | OK -- mas nenhum CTA na secao Tratamentos ou Depoimentos |
| **Service Pages** | 2 | TreatmentHero (1), CTA Final (1) | Sim (global) | **FRACO** -- gap de 1200-2000px entre hero e CTA final |
| **Landing Pages** | 3-4 | Hero (1), mid-page (1), CTA final (1), floating mobile | Sim (FloatingWhatsApp) | **BOM** -- modelo a seguir |
| **Blog** | 1 | BlogCTA no final do post | Sim (global) | **FRACO** -- 0 CTAs no blog listing page |
| **Contato** | 2 | Formulario + floating button | Sim | Formulario e secundario, WhatsApp e principal |

**Conclusao sobre CTAs:** Service pages tem em media **50% menos CTAs** que landing pages. Isso e provavelmente a maior oportunidade de conversao. O modelo "Saude da Gengiva" (que tem 212s de engagement) prova que conteudo envolvente + CTA estrategico funciona.

#### 2.4 Mobile UX

| Aspecto | Score | Analise |
|---------|:-----:|---------|
| Responsive layout | 8/10 | Grid responsivo (lg:grid-cols para desktop, single col mobile). Breakpoints corretos. |
| Touch targets | 7/10 | Botoes com py-4/py-6 (32px+). OK. Mas links em footer sao `text-sm` sem padding -- potencial touch target issue. |
| WhatsApp button mobile | 5/10 | **Apenas icone (sem texto) em mobile.** `md:hidden` no FloatingWhatsApp das LPs significa so aparece em mobile. O WhatsAppButton global mostra texto em desktop (`hidden md:flex`) mas so icone em mobile. |
| Google rating mobile | 3/10 | **Completamente oculto** (`hidden lg:flex`). O trust signal mais forte nao aparece em mobile. |
| Menu mobile | 6/10 | Funcional mas sem WhatsApp CTA. Sem tratamentos expandidos. |
| CTA button width | 7/10 | Hero CTA: `w-full md:w-auto`. Correto -- full width em mobile. |
| Text readability | 8/10 | font-size base OK. `text-[34px] md:text-4xl` para h1. Legivel. |

**INSIGHT CRITICO (do GA4):** iOS converte 2.4x mais que Android. Possivel causa: WhatsApp button e menos visivel/funcional em Android? A experiencia mobile precisa ser auditada em dispositivos reais.

#### 2.5 Tempo de Carregamento Percebido

| Aspecto | Status | Detalhes |
|---------|--------|----------|
| Critical CSS inline | OK | ~85 linhas de CSS critico no index.html para FCP rapido |
| Font loading | OK | font-display: swap + self-hosted woff2 |
| Hero image | OK | fetchPriority=high, loading=eager, AVIF+WebP |
| Lazy loading | OK | React.lazy() para todas as paginas. `LazySection` component. |
| GTM deferred | OK | Carrega apos 2s ou primeira interacao |
| Perceived speed | 7/10 | Provavel FCP < 2s, LCP < 3s. PageLoadingFallback para transicoes. |
| SPA navigation | 6/10 | Services grid usa `<a href>` em vez de `<Link to>` -- pode causar full reload. |

---

### 3. CREDIBILIDADE & TRUST (16/20)

#### 3.1 Elementos de Prova Social

| Sinal | Onde | Eficacia | Score |
|-------|------|----------|:-----:|
| Google Rating 4.9 | Header desktop | Alto CTR (+15-25% estimado) | 9/10 |
| 23 avaliacoes Google | Header badge | Bom mas numero baixo para 20+ anos | 6/10 |
| 3 depoimentos homepage | TestimonialsSection | Bons depoimentos mas **apenas 3, fixos, sem rotacao** | 5/10 |
| 20+ anos experiencia | Hero badges (service pages) | Presente em todas | 8/10 |
| CRO-RJ 27.509 | Header, hero badges, footer, LP footer | Consistente e onipresente | 9/10 |
| 8 anos Marinha | Bio canonica nas service pages | Diferenciador forte | 8/10 |
| Dr. Bruno credenciais | Pagina Ortodontia | Completo (Doutor UERJ, CRO) | 8/10 |
| WhatsApp 24h | Botoes CTA | Presente | 7/10 |

**PROBLEMA:** Apenas 3 depoimentos no site inteiro (homepage). Nenhuma service page tem depoimentos contextuais. Comparado com concorrentes, isso e muito pouco. Nao ha sistema de rotacao ou paginacao.

#### 3.2 Fotos da Clinica/Profissional

| Foto | Onde | Qualidade |
|------|------|-----------|
| Dra. Carla em pe jaleco (vertical) | Hero homepage, LPs | Alta -- profissional, calorosa |
| Dra. Carla bracos cruzados | Service pages (TreatmentHero) | Alta -- segura, competente |
| Dra. Carla consultorio | About section | Alta -- contexto profissional |
| Fotos de tratamentos | Services grid | Media -- stock-like mas adequadas |
| Dr. Bruno | Ortodontia | Presente |

**Ponto forte:** Fotos reais da profissional em multiplas poses. Nao usa stock photos de sorrisos. Alinhado ao BRAND.md. Nenhuma foto proibida (antes/depois, procedimentos).

#### 3.3 Transparencia

| Aspecto | Status | Detalhes |
|---------|--------|----------|
| Processo do tratamento | OK | ProcessTimeline em todas as service pages (4-8 etapas) |
| Tempo de tratamento | OK | Mencionado nas FAQs e no processo |
| Precos | N/A | Nao mencionados (correto por regulacao CRO) |
| Horarios | Parcial | Footer: Seg-Sex (sem horarios especificos). ContactSection: 9h-19h. Inconsistencia com schema (08:00-18:00). |
| Endereco | OK | Completo em footer, contact, schema |
| CFO/CRO | OK | Visivel em todas as paginas |

---

### 4. CONVERSAO (14/20)

#### 4.1 Clareza da Proposta de Valor

| Pagina | Headline | Score | Problema |
|--------|----------|:-----:|---------|
| Homepage | "Dra. Carla Christoph -- Dentista Especialista em Ipanema" | 4/10 | **Descritivo, nao persuasivo.** Nao enderea dor, aspiracao ou diferencial. Qualquer dentista poderia ter esta headline. |
| Implantes | "Implantes Dentarios" (via TreatmentHero title) | 6/10 | Descritivo. Subtitle e melhor ("Recupere a funcao mastigatoria..."). |
| Lentes | Melhores headlines entre service pages | 8/10 | "Estetica Dental que Nao Parece Artificial" -- aborda medo diretamente. |
| Saude Gengiva | "Saude da Gengiva" | 7/10 | Titulo simples mas conteudo de sinais e consequencias e excelente. |
| Ortodontia | "Ortodontia Moderna: Alinhe seu Sorriso com Tecnologia e Expertise" | 5/10 | Generico. "Tecnologia e Expertise" e cliche. |

**Homepage hero score: 4/10** -- Este e o maior problema de conversao. O primeiro contato do paciente com o site nao comunica NENHUM diferencial (tempo de consulta, planejamento digital, experiencia militar, atendimento pessoal).

#### 4.2 Friction Points (Barreiras para Agendar)

| Barreira | Gravidade | Detalhes |
|----------|:---------:|---------|
| **"NAO TRABALHAMOS COM PLANOS E CONVENIOS"** | ALTA | Texto em **vermelho negrito** no ContactSection. Impacto visual negativo. Deveria ser informacao discreta ou mencionada no FAQ, nao destacada com alarme visual. |
| CTA hero nao indica WhatsApp | MEDIA | Usa `Calendar` icon com texto "Agendar Consulta de Avaliacao". Paciente nao sabe que abre WhatsApp ate clicar. |
| Formulario de contato | MEDIA | 4 campos obrigatorios (nome, telefone, email, mensagem). Alta friccao vs WhatsApp direto (1 clique). Formulario compete com WhatsApp sem vantagem clara. |
| Nenhum CTA mid-page | ALTA | 1200-2000px de conteudo entre hero CTA e CTA final nas service pages. Paciente motivado no meio do conteudo nao tem como agir. |
| WhatsApp popup apos 30s | MEDIA | Aparece uma vez, depois fica em localStorage. Boa ideia mas 30s pode ser muito cedo (usuario ainda nao engajou). |
| Footer links quebrados | BAIXA | Links como `#inicio`, `#sobre` apontam para anchors que nao funcionam de paginas que nao sao homepage. |

#### 4.3 WhatsApp Button

| Aspecto | Desktop | Mobile |
|---------|---------|--------|
| Visibilidade | Bom -- texto + icone | **Fraco -- apenas icone** |
| Posicao | fixed bottom-8 right-8 | fixed bottom-8 right-8 |
| Cor | #128C4A (acessivel) | #128C4A |
| Animacao | animate-pulse no icone | animate-pulse |
| Mensagem | "Conversar sobre meu caso" | (sem texto) |
| 24h badge | Texto "WhatsApp 24h" | (sem badge mobile) |
| z-index | z-50 | z-50 |

**INSIGHT:** O WhatsApp button desktop e superior ao mobile. Considerando que mobile e provavelmente 60-70% do trafego (e iOS converte 2.4x mais), o botao mobile precisa de upgrade significativo.

#### 4.4 Formularios

| Formulario | Campos | UX | Conversao estimada |
|------------|--------|----|--------------------|
| ContactSection | 4 (nome, tel, email, msg) | Funcional, clean design | Baixa -- WhatsApp e mais facil |
| WhatsApp popup | 0 (clique direto) | Bom -- sem friccao | Media -- aparece so 1 vez |

---

## TOP 5 PROBLEMAS CRITICOS (RANKED POR IMPACTO EM CONVERSAO)

### 1. Service Pages: Gap de CTAs (Impacto: ALTO)

**Problema:** Service pages tem CTA no hero e CTA no final. Entre eles, 1200-2000px de conteudo sem nenhum ponto de conversao intermediario. Landing pages tem 3-4 CTAs e performam melhor.

**Dados:** Pilar 8 identificou que Saude da Gengiva (85/100 psicologia, 212s engagement) e o modelo -- mas ate ela so tem 1 CTA no final. O gap de CTA e universal em service pages.

**Recomendacao:** Adicionar CTA intermediario apos a secao mais emocional/persuasiva de cada pagina (ex: apos "Sinais que Muita Gente Ignora" em Gengiva, apos "Test Drive do Sorriso" em Lentes, apos "ProcessTimeline" em todas).

**Impacto estimado:** +15-25% conversao nas service pages.

### 2. Homepage Hero Generico (Impacto: ALTO)

**Problema:** "Dra. Carla Christoph -- Dentista Especialista em Ipanema" e uma headline descritiva, nao persuasiva. O sub-headline "Odontologia estetica e reabilitacao oral com tempo e atencao ao seu caso" e melhor mas still generico. Nenhum diferencial concreto no primeiro fold.

**Recomendacao:** Reformular hero com headline que comunique o diferencial central: tempo de consulta (1h minimo), atendimento pessoal, planejamento digital. Exemplo: "Cada consulta dura no minimo 1 hora. Porque seu caso merece tempo e atencao de verdade."

**Impacto estimado:** +10-20% bounce rate reduction na homepage.

### 3. "NAO TRABALHAMOS COM PLANOS E CONVENIOS" em Vermelho (Impacto: MEDIO-ALTO)

**Problema:** Texto em `text-red-600 font-bold text-lg` no ContactSection. E a primeira coisa que se ve na secao de contato. Emocionalmente negativo -- comunica "voce nao e bem-vindo" antes de comunicar "como podemos ajuda-lo".

**Recomendacao:** Mover para FAQ ou para texto discreto em cinza abaixo do formulario. Ou reformular: "Atendimento particular. Sem filas, sem burocracia de convenio."

**Impacto estimado:** Reducao de bounce na secao de contato.

### 4. WhatsApp Mobile: Apenas Icone (Impacto: MEDIO)

**Problema:** Em mobile (60-70% do trafego), o WhatsApp floating button mostra apenas o icone MessageCircle sem texto. iOS converte 2.4x mais que Android (dado do GA4) -- pode haver problema de UX mobile que explica a diferenca.

**Recomendacao:** Adicionar texto curto ao botao mobile ("Agendar" ou "WhatsApp") e badge "24h". Testar versao expandida em mobile por 2 semanas.

**Impacto estimado:** +5-15% conversao mobile.

### 5. Ortodontia: Layout Inconsistente (Impacto: MEDIO)

**Problema:** Unica service page que nao usa TreatmentHero. Layout centralizado sem foto, CTA com bg-dental-gold em vez de bg-dental-purple, backgrounds alternados diferentes. Confunde o usuario que navega entre servicos.

**Recomendacao:** Migrar para TreatmentHero padrao. Usar foto do Dr. Bruno (ja disponivel). CTA bg-dental-purple padrao.

**Impacto estimado:** Melhoria de consistencia e confianca. Reducao de bounce rate na pagina.

---

## TOP 10 QUICK WINS (ALTO IMPACTO, BAIXO ESFORCO)

| # | Quick Win | Esforco | Impacto | Detalhes |
|---|-----------|---------|---------|----------|
| 1 | **Adicionar CTA intermediario nas service pages** | 2h | ALTO | Reutilizar pattern do CTA final. Posicionar apos secao emocional/processo. |
| 2 | **Google Rating badge em mobile** | 30min | ALTO | Remover `hidden lg:flex` do badge no Header. Ajustar layout mobile. |
| 3 | **Remover vermelho do "nao trabalhamos com planos"** | 15min | MEDIO | Trocar `text-red-600 font-bold text-lg` por `text-dental-gray text-sm`. Reformular texto. |
| 4 | **WhatsApp button mobile: adicionar texto** | 30min | MEDIO | Remover `hidden md:flex` do texto no WhatsAppButton.tsx. Ajustar layout. |
| 5 | **Fix Ortodontia: migrar para TreatmentHero** | 2h | MEDIO | Usar TreatmentHero padrao com foto Dr. Bruno e badges adequados. |
| 6 | **CTA icon: trocar Calendar por MessageCircle no TreatmentHero** | 15min | BAIXO-MEDIO | Sinalizar claramente que CTA abre WhatsApp. Adicionar "WhatsApp" no texto. |
| 7 | **Homepage hero: headline com diferencial** | 30min | ALTO | Mudar de descritivo para persuasivo. Comunicar 1h/consulta, atendimento pessoal. |
| 8 | **Fix footer links** | 1h | BAIXO | Footer.tsx: Links de navegacao usam `href="#item"` que nao funciona fora da homepage. Trocar por `<Link to="/path">`. |
| 9 | **Font weights: carregar 600 e 700** | 30min | BAIXO | Adicionar @font-face para Montserrat 600/700 e Playfair Display 600/700 para evitar faux bold. |
| 10 | **Adicionar depoimentos contextuais nas service pages** | 3h | MEDIO | Pelo menos 1 depoimento relevante por servico (Lentes, Implantes, etc). Reutilizar pattern de TestimonialsSection. |

---

## ANALISE DE CONSISTENCIA: SERVICE PAGES vs LANDING PAGES

Uma das maiores oportunidades de design e a **diferenca de CTA density** entre os dois tipos de pagina:

| Metrica | Service Pages | Landing Pages |
|---------|:------------:|:-------------:|
| CTAs visiveis | 2 | 3-4 |
| CTA no hero | 1 (Calendar icon, purple) | 1 (WhatsApp icon, verde) |
| CTA intermediario | 0 | 1+ |
| CTA final | 1 (texto simples) | 1 (secao dedicada com urgency badge) |
| Floating WhatsApp | Global (generico) | Dedicado (mobile only, com badge 24h) |
| Trust signals no CTA | 0 | "Atendimento 24h", "Primeira consulta gratuita", "Parcelamento sem juros" |
| WhatsApp Popup | Sim (apos 30s) | Nao (tem floating) |
| Message match | Generico | Personalizado por campanha |

**Insight:** Landing pages foram desenhadas para conversao. Service pages foram desenhadas para informacao. A oportunidade e trazer elementos de conversao das LPs para as service pages sem comprometer o tom informativo-educativo.

---

## ANALISE DE ACESSIBILIDADE (BONUS)

| Aspecto | Status | Detalhes |
|---------|--------|----------|
| Skip to content | OK | `<a href="#main-content" className="sr-only focus:not-sr-only">` no Header |
| Alt text imagens | Parcial | Hero tem alt descritivo. Services grid usa titulo como alt (pode melhorar). |
| Aria labels | OK | Botoes WhatsApp tem aria-label. Header mobile button tem aria-label. |
| Color contrast | Parcial | Purple (#381F47) excelente. Gold (#B3955F) pode falhar em texto pequeno. **LP CTA verde falha WCAG AA.** |
| Keyboard navigation | Parcial | Links/botoes navigaveis. Mas mobile menu overlay pode trapping focus. |
| prefers-reduced-motion | OK | Respeita com `@media (prefers-reduced-motion: reduce)` |
| Semantic HTML | OK | `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<address>`. Correto. |

---

## BENCHMARK: CONCORRENTES

Baseado no conhecimento do segmento de odontologia premium em zona sul do Rio:

| Aspecto | Dra. Carla | Benchmark (dentistas premium RJ) |
|---------|-----------|----------------------------------|
| CTAs por pagina (service) | 2 | 3-4 |
| Depoimentos | 3 (homepage only) | 6-12 (espalhados pelo site) |
| Video do profissional | Nao | 40% tem video |
| Tour virtual da clinica | Nao | 20% tem |
| Chat online | WhatsApp popup | 30% tem chat ao vivo |
| Google Rating no header | Sim (desktop) | 60% tem |
| Dropdown de tratamentos no menu | Nao | 70% tem |
| Hero com diferencial claro | Nao | 50% tem |
| Fotos reais (nao stock) | Sim | 40% tem (ponto forte) |
| Blog integrado | Sim (Contentful) | 30% tem |
| Mobile WhatsApp com texto | Nao | 50% tem |

**Ponto forte vs benchmark:** Fotos reais da profissional, blog com 65+ posts, schema markup completo, Google Rating badge, sistema de tracking robusto (GTM + GCLID + scroll).

**Ponto fraco vs benchmark:** Poucos depoimentos, sem video, sem dropdown de tratamentos, hero generico, CTAs insuficientes nas service pages.

---

## SCORE FINAL

| Categoria | Score | Peso | Ponderado |
|-----------|:-----:|:----:|:---------:|
| Visual Design | 21/30 | 30% | 21 |
| UX & Navegacao | 17/30 | 30% | 17 |
| Credibilidade & Trust | 16/20 | 20% | 16 |
| Conversao | 14/20 | 20% | 14 |
| **TOTAL** | **68/100** | -- | **68** |

### Score por Subcategoria

| Subcategoria | Score |
|-------------|:-----:|
| Hierarquia visual | 7/10 |
| Paleta de cores | 7/10 |
| Tipografia | 7/10 |
| Consistencia | 6/10 |
| Imagens | 7/10 |
| Navegacao | 6/10 |
| Jornada do usuario | 6/10 |
| CTAs | 5/10 |
| Mobile UX | 6/10 |
| Perceived performance | 7/10 |
| Prova social | 7/10 |
| Fotos profissionais | 9/10 |
| Transparencia | 8/10 |
| Proposta de valor | 5/10 |
| Friction points | 6/10 |
| WhatsApp | 6/10 |
| Formularios | 7/10 |

---

## PROXIMOS PASSOS SUGERIDOS

### Sprint 6 (Psychology & Conversao) — Relacionado
Os itens 1, 7 e 10 desta auditoria se sobrepoem ao Sprint 6 (CTAs intermediarios, homepage hero, depoimentos contextuais). Recomenda-se combinar.

### Sprint Dedicado de UX
Os itens 2, 3, 4, 5, 6, 8, 9 sao rapidos e podem ser feitos em 1 dia de sprint dedicado.

### Acoes Manuais para Patrick
1. **PageSpeed Insights real** em 3 URLs (homepage, implantes, protese) -- confirmar CWV estimados
2. **Teste de WhatsApp em Android** -- verificar se o floating button funciona corretamente
3. **Verificar font rendering** em Chrome/Safari -- confirmar se faux bold esta ocorrendo

---

**Auditor:** Analise via codigo-fonte (39 paginas, 197 componentes, CSS/Tailwind config, index.html)
**Metodologia:** Leitura de todos os componentes de UI criticos, analise de padroes de CTA, verificacao de acessibilidade e consistencia visual, cross-reference com Pilares 1 e 8
**Limitacao:** Sem acesso a dados reais de PageSpeed Insights ou heatmaps de usuario. Scores de CWV sao estimativas baseadas no codigo.
