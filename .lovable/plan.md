

## Prompt 9 — Remover Estrelas dos Depoimentos e Elevar Hero Section das LPs

### PARTE A — Remover Estrelas e "Paciente Verificado"

Existem 3 componentes de social proof usados pelas LPs. Todos precisam ser atualizados:

**1. `src/components/landing/SocialProofSection.tsx`**
(Usado por: SaudeGengival, FacetasResina, LandingPageTemplate)
- Remover import de `Star` do lucide-react (continua usando `Users`, `Award`, `Clock`)
- Remover funcao `renderStars` inteira
- Remover o bloco de estrelas do testimonial card (linhas 81-84)
- Remover o texto "Paciente verificado" (linhas 110-112)
- Remover `rating` da interface `Testimonial`
- Nota: `Star` ainda e usado como icone de stat (linha 55), mas pode ser substituido por outro icone (ex: `ThumbsUp` ou `Heart`) para evitar confusao visual com rating

**2. `src/components/landing/consulta/ConsultaInicialSocialProof.tsx`**
(Usado pela maioria das LPs: Consulta, Implantes, Lentes x2, DenteQuebrado, DorDeDente, Profilaxia, Emergencia, Ortodontia, Limpeza, Estetica, Protese)
- Remover import de `Star` do lucide-react
- Remover funcao `renderStars` inteira
- Remover o bloco de estrelas do testimonial card (linhas 79-82)
- Remover o texto "Paciente Verificado" (linhas 108-110)
- Remover `rating` da interface `Testimonial`

**3. `src/components/landing/clareamento/ClareamentoSocialProof.tsx`**
(Usado por: Clareamento)
- Remover import de `Star` do lucide-react
- Remover funcao `renderStars` inteira
- Remover o bloco de estrelas do testimonial card (linhas 67-70)
- Remover `rating` da interface `Testimonial`
- Remover o bloco "Trust Badge" fixo com texto cliche "Resultados que Falam por Si" (linhas 85-94) — esse texto nao vem do config e e hardcoded

---

### PARTE B — Elevar Hero Section das LPs

Dois componentes de hero sao usados pelas LPs:

**1. `src/components/landing/consulta/ConsultaInicialHero.tsx`** (PRINCIPAL — usado por 12+ LPs)

Mudancas visuais:
- **Background**: Trocar `bg-[#CFCBB4]` por gradiente suave (beige-light para beige com toque sutil de purple). Adicionar radial-gradient decorativo no canto superior direito (gold com 3% opacidade)
- **Badges de credibilidade**: Adicionar barra no topo do conteudo com 2 pills: "CRO-RJ 27.509" (bg purple/10, text purple) e "Atendimento Particular - Ipanema" (bg gold/15, text gold)
- **Tipografia**: Headline para ~34px (text-[34px] md:text-4xl lg:text-5xl), manter font-serif. Subheadline ja esta em sans-serif, ajustar cor para gray-600
- **Benefits**: Trocar grid 2x2 com cards retangulares por pills arredondadas inline. Cada pill: bg branco, border gold/40, rounded-full (24px), padding 7px 14px. Dentro: ponto dourado + texto. Flex-wrap para multiplas linhas
- **CTA**: Trocar bg purple por gradiente verde WhatsApp (#25D366 para #20BD5A). Icone de chat (MessageCircle ou emoji). Box-shadow verde. Abaixo do botao: micro-texto "WhatsApp 24h" com ponto verde, fontSize 11px, cor gray-600
- **Foto**: Adicionar rounded-[20px], box-shadow sutil (0 8px 30px rgba(74,45,94,0.08)). Adicionar badge flutuante no canto inferior esquerdo: bg branco, rounded-xl, shadow, texto "20+ Anos de Experiencia" com ponto dourado
- **Responsividade mobile**: Badge flutuante some em telas < 768px. CTA ocupa largura total. Benefits 2 por linha

**2. `src/components/landing/HeroSection.tsx`** (usado apenas pelo LandingPageTemplate generico)

Aplicar as mesmas mudancas visuais adaptadas ao layout centralizado:
- Background com gradiente (em vez de cor solida)
- Badges de credibilidade no topo
- Benefits como pills arredondadas (ja estao em flex-wrap, so mudar o estilo)
- CTA com gradiente verde WhatsApp + micro-texto abaixo
- Sem foto neste componente (layout centralizado), entao sem badge flutuante

---

### O que NAO muda
- Nenhum arquivo de config
- Funcao handleWhatsAppClick / handleCTAClick (tracking intacto)
- GTM, GCLID, Google Ads conversion
- Props e interface dos componentes (exceto remocao de `rating`)
- Estrutura de rotas
- Header das LPs (ConsultaInicialHeader)
- Campos campaign, messageMatch, whatsapp, seo, tracking

### Arquivos modificados (total: 5)
1. `src/components/landing/SocialProofSection.tsx`
2. `src/components/landing/consulta/ConsultaInicialSocialProof.tsx`
3. `src/components/landing/clareamento/ClareamentoSocialProof.tsx`
4. `src/components/landing/consulta/ConsultaInicialHero.tsx`
5. `src/components/landing/HeroSection.tsx`

