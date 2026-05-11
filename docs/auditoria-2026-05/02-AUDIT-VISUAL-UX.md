# Auditoria Visual / UX / Frontend

**Nota geral: 7,6 / 10**

| Subdimensão | Nota | Comentário curto |
|---|:-:|---|
| Design system (tokens, cores, tipografia) | 8 | Bem definido em `tailwind.config.ts` + `index.css` |
| Hierarquia visual da Homepage | 9 | Hero exemplar — eyebrow, H1, body, trust badges, 2 CTAs |
| Header (desktop + mobile) | 8 | Dropdown, Google badge, EN switch, skip-link |
| Footer | 5 | Dados de contato com erros (CEP, possível telefone fixo desativado) |
| Service Pages PT | 8 | TreatmentPageTemplate consistente |
| Landing Pages PT | 6 | Fonte fora do design system; arquitetura própria |
| Mobile | 7 | Funciona, mas Hero mask gradient pesado em mobile baixo |
| Acessibilidade | 7 | Skip-link, aria-labels, alt-text, mas falta checklist sistemático |
| Animações / Microinterações | 8 | ScrollReveal + count-up bem feitos |
| Identidade premium | 8 | Cores nobres (purple+gold+beige), tipografia (Playfair) consistente |

---

## Findings

### UX-1 · Hero da Homepage é exemplar · Nota 9/10
- **Evidência:** [src/components/Hero.tsx:38-156](src/components/Hero.tsx)
- **Pontos fortes:**
  - Eyebrow ("Especialista em Prótese e Implantodontia") — message match com posicionamento
  - H1 com palavra-chave + acento dourado em "Estética Natural"
  - Subheadline factual ("para quem busca tratamento sem pressa, com mínimo desconforto")
  - Trust badges minimalistas (20+ anos, CRO-RJ, 1h+ por consulta)
  - 2 CTAs claros (Primary WhatsApp, Secondary "Conheça tratamentos")
  - Imagem com mask gradient (composição premium)
- **Recomendação:** manter como referência para outras heroes.

### UX-2 · Footer com dados conflitantes · Nota 5/10
- **Severidade:** Alta · **Esforço:** S · **Quick win:** ✅
- **Evidência:** [src/components/Footer.tsx:67-86](src/components/Footer.tsx)
- **Problemas:**
  1. CEP `22410-901` (deveria ser `22410-901` — CLAUDE.md §14)
  2. Telefone fixo `(21) 3738-7909` — não consta em CLAUDE.md §14, validar se ativo
  3. Visual pobre em comparação ao resto do site (fundo dental-purple sólido sem gradiente, apenas links de texto)
- **Recomendação:** corrigir dados; considerar redesign para coerência com identidade premium (gradiente sutil, tipografia Playfair em headings).

### UX-3 · Depoimentos com estrelas violam BRAND · Nota 5/10
- **Severidade:** Alta · **Esforço:** S · **Quick win:** ✅
- **Evidência:** [src/components/TestimonialsCarousel.tsx:113-121](src/components/TestimonialsCarousel.tsx)
- **Problema:** Renderiza 5 estrelas douradas por depoimento (`<Star fill-dental-gold>`). BRAND.md §3 e CLAUDE.md §2 explicitam: "Sem estrelas, sem profissão, sem 'recomendo'/'incrível'/'perfeita'".
- **Bonus:** texto do depoimento Fernando A. ("Recomendo de olhos fechados") usa palavra banida.
- **Recomendação:** remover estrelas + ícone `Star`; reescrever Fernando A. para algo conversacional e factual (ex: "Cheguei com medo da cirurgia. Saí impressionado com o cuidado da explicação.").

### UX-4 · LP usa Inter (Google Fonts) em vez de Montserrat self-hosted · Nota 5/10
- **Severidade:** Média · **Esforço:** M · **Quick win:** —
- **Evidência:** [src/pages/ImplantesDentariosLandingPage.tsx:97-102](src/pages/ImplantesDentariosLandingPage.tsx) + critical CSS embutido com `font-family: serif` genérico (linha 40)
- **Impacto:** Quando usuário do Google Ads clica num anúncio e cai numa LP, vê uma identidade tipográfica diferente do site principal. Quebra a coerência premium.
- **Recomendação:** unificar com Playfair Display + Montserrat self-hosted. Custo: rever 16 LPs.

### UX-5 · HomepageStatsBar — número CRO sem formatação natural · Nota 7/10
- **Severidade:** Baixa · **Esforço:** S · **Quick win:** ✅
- **Evidência:** [src/components/HomepageStatsBar.tsx:97-99](src/components/HomepageStatsBar.tsx) — `27509.toLocaleString("pt-BR")` exibe "27.509"
- **Análise:** "27.509" pode ser lido como número grande (vinte e sete mil) em vez de número de registro. Outros stats usam "20+", "4.000+", "4.9★".
- **Recomendação:** mudar formato para "CRO-RJ 27.509" inline em texto único, ou usar prefixo visual.

### UX-6 · Animações ScrollReveal e count-up bem implementadas · Nota 8/10
- **Evidência:** [src/components/HomepageStatsBar.tsx:42-68](src/components/HomepageStatsBar.tsx) (count-up com easeOutCubic), [src/components/Hero.tsx](src/components/Hero.tsx) (`hero-animate-1..5`), [src/pages/Index.tsx](src/pages/Index.tsx) (ScrollReveal por seção).
- **Pontos fortes:** uso de IntersectionObserver, animações sutis, `prefers-reduced-motion` deveria ser respeitado (verificar).
- **Recomendação:** confirmar handling de `prefers-reduced-motion`.

### UX-7 · Header em mobile · Nota 7/10
- **Pontos fortes:**
  - Skip-link `#main-content` para a11y
  - Menu mobile expansível com submenu Tratamentos
  - CTA WhatsApp dedicado no menu mobile
  - Switch EN visível
- **Pontos a revisar:**
  - Google badge ("4.9 (23 avaliações)") fica espremido em mobile pequeno (320px) — confirmar visual
  - `pt-24` no overlay mobile pode cortar conteúdo em telas baixas

### UX-8 · Acessibilidade · Nota 7/10
- **Pontos fortes:**
  - Skip-link (Header)
  - `aria-label` em botões e badges (Header, TestimonialsCarousel)
  - Alt-text descritivo em imagens (Hero, About)
  - Focus styles em skip-link
- **Pontos a revisar:**
  - Cores: `dental-gray #6B6B6B` sobre `dental-beige` foi recentemente ajustado (commit `03b230d`) para passar WCAG AA — confirmar
  - Sem `lang` switch automático ao mudar para EN (Header tem link, mas `<html lang>` permanece pt-BR)
  - Carousel de depoimentos sem `role="region"` ou `aria-roledescription="carousel"`
  - LP Implantes: container sem `<main>` tag explícita (tem mas o `min-h-screen bg-white` está no `<main>` — OK)

### UX-9 · Service pages com TreatmentPageTemplate consistente · Nota 8/10
- **Evidência:** [src/components/treatment/](src/components/treatment/) reusa: TreatmentHero, FinalServiceCTA, StatsBar, DoctorBioSection, etc.
- **Análise:** boa modularização; reduz inconsistência visual entre as 9 service pages.
- **Pontos a revisar:** LentesEFacetas é a mais "rica" (1300+ linhas) — outras (ClinicaGeralPrevencao) são mais simples — pode ser intencional (CLAUDE.md §11 diz "Clínica Geral = template simples").

### UX-10 · LandingFooter (das LPs) usa visual diferente do Footer principal · Nota 6/10
- **Análise:** LP tem footer próprio (`LandingFooter.tsx`), reduzido. Pode ser intencional (LP isolada), mas perde oportunidade de exibir CRO-RJ + endereço completo.
- **Recomendação:** verificar se LandingFooter inclui CRO-RJ visível (regra CLAUDE.md §1.1).

---

## Pontos Fortes Globais

- **Identidade visual coesa**: paleta dental-purple (#381F47) + dental-gold (#B3955F) + dental-beige consistente
- **Tipografia premium**: Playfair Display (headings) + Montserrat (body) — choice acertada
- **Performance-first**: lazy loading, AVIF/WebP, preload crítico, terser 3-pass
- **Animações com propósito**: scroll-reveal não distrai, count-up cria autoridade

## Pontos Frágeis Globais

- **Dados de contato com 3 valores diferentes** (CEP) — sintoma de "verdade" não centralizada em código
- **LPs usam stack diferente** do site principal (fonte, critical CSS, header) — fragmenta a identidade
- **Depoimentos** quebram a regra mais visível do BRAND.md (estrelas)
