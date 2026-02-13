# CONTENT.md — Guia de Conteúdo e Estrutura de Páginas

**Site:** https://dracarlachristoph.com  
**Última atualização:** Fevereiro 2026  
**Uso:** Como criar, editar e manter qualquer página ou landing page do site. Para regras de tom de voz e palavras banidas, consultar `BRAND.md`.

---

## 1. Inventário de Páginas

### Páginas Orgânicas (indexáveis)

| Rota | Tipo | Função no Funil |
|------|------|-----------------|
| `/` | Homepage | Porta de entrada — visão geral + prova social + CTA |
| `/sobre` | Institucional | Meio de funil — construir confiança e autoridade |
| `/contato` | Institucional | Fundo de funil — informações de localização e contato |
| `/servicos` | Hub de serviços | Meio de funil — visão geral com links para cada tratamento |
| `/clareamento-dental` | Service page rica | Meio/fundo — educação + conversão |
| `/implantes-dentarios` | Service page rica | Meio/fundo — educação + conversão |
| `/lentes-de-contato-dental-e-facetas-de-resina` | Service page rica | Meio/fundo — educação + conversão |
| `/protese-dentaria` | Service page rica | Meio/fundo — educação + conversão |
| `/ortodontia` | Service page rica | Meio/fundo — educação + conversão |
| `/restauracoes-esteticas` | Service page | Meio/fundo — educação + conversão |
| `/tratamento-de-canal` | Service page | Meio/fundo — educação + conversão |
| `/clinica-geral-e-prevencao` | Service page | Topo/meio — educação preventiva |
| `/saude-da-gengiva` | Service page | Meio — educação + encaminhamento |
| `/blog` | Blog index | Topo de funil — atração orgânica |
| `/blog/:slug` | Blog post | Topo de funil — conteúdo informacional |

### Landing Pages (noindex — tráfego pago)

| Rota | Campanha | Público |
|------|----------|---------|
| `/lp/consulta-inicial` | Consulta geral | Quem busca "dentista Ipanema" |
| `/lp/implantes-dentarios-ipanema` | Implantes | Quem busca implante na Zona Sul |
| `/lp/lentes-porcelana-ipanema` | Lentes | Quem busca estética dental |
| `/lp/clareamento-dental` | Clareamento | Quem busca clareamento |
| `/lp/especialista-protese-ipanema` | Prótese | Quem busca prótese |
| `/lp/ortodontia-ipanema` | Ortodontia | Quem busca ortodontia/Invisalign |
| `/lp/limpeza-dental-ipanema` | Limpeza | Quem busca limpeza/profilaxia |
| `/lp/profilaxia-dental-ipanema` | Profilaxia | Variação de limpeza |
| `/lp/estetica-dental-ipanema` | Estética geral | Quem não sabe qual tratamento |
| `/lp/saude-gengival-ipanema` | Gengiva | Quem busca tratamento gengival |
| `/lp/dor-de-dente-urgencia-ipanema` | Urgência dor | Captura de demanda urgente |
| `/lp/dente-quebrado-urgencia-ipanema` | Urgência quebrado | Captura de demanda urgente |
| `/lp/emergencia-odontologica-ipanema` | Emergência | Captura de demanda urgente |

---

## 2. Mapa do Funil de Conversão

```
TOPO DO FUNIL (Descoberta / Atração)
├── Blog posts → Tráfego orgânico informacional
├── Service pages → Tráfego orgânico transacional
└── Landing pages → Tráfego pago Google Ads

MEIO DO FUNIL (Consideração / Confiança)
├── Página "Sobre" → Credenciais e história
├── Seções de bio/especialista nas service pages
├── Depoimentos / prova social
└── FAQ educativas

FUNDO DO FUNIL (Conversão / Ação)
├── CTAs de WhatsApp (em todas as páginas)
├── Floating WhatsApp (mobile, LPs)
├── Página de contato (endereço, mapa, horários)
└── WhatsApp 24h (fluxo N8N humanizado)
```

---

## 3. Atribuição de Tratamentos — Quem Faz o Quê

**Regra crítica para conteúdo:** Nunca afirmar que a Dra. Carla realiza um tratamento que é feito por parceiros.

### Tratamentos Realizados pela Dra. Carla

| Tratamento | Especialidade Formal |
|-----------|---------------------|
| Implantes dentários | ✅ Implantodontia |
| Prótese dentária | ✅ Prótese Dentária |
| Lentes de contato dental / facetas | Estética (Prótese) |
| Clareamento dental | Estética |
| Restaurações estéticas | Dentística |
| Clínica geral e prevenção | Odontologia geral |

### Tratamentos Coordenados (parceiros fazem, Dra. Carla acompanha)

| Tratamento | Quem executa | Papel da Dra. Carla |
|-----------|-------------|---------------------|
| Tratamento de canal | Endodontista parceiro | Diagnóstico, acompanhamento, finalização (restauração/coroa) |
| Saúde da gengiva / periodontia | Periodontista parceiro | Diagnóstico, encaminhamento, manutenção |
| Ortodontia | Dr. Bruno (CRO-RJ 41.684) | Acompanhamento da jornada, integração com outros tratamentos |

---

## 4. Template de Service Page Rica

Estrutura padrão para service pages completas (Lentes, Prótese, Clareamento, Implantes, Ortodontia):

### Seções em Ordem

1. **Breadcrumb** — `ServiceBreadcrumb` com nome do tratamento
2. **TreatmentHero** — Título H1, subtítulo, badges (especialidade, tecnologia, CRO), foto da doutora, CTA WhatsApp
3. **QuickAnswerBox** — Resposta direta para AI Search / featured snippets
4. **Seção empática** — Conectar com a dor/necessidade do paciente (sem drama)
5. **Cards de tipos/situações** — Variações do tratamento ou situações em que é indicado
6. **Seção da especialista** — Bio canônica + frase contextual + credenciais em grid 2x2
7. **Processo/Timeline** — `ProcessTimeline` com passos do tratamento
8. **O que poucos explicam** — Diferenciação técnica honesta
9. **FAQ com Schema** — Perguntas reais, linguagem natural, Schema.org `FAQPage`
10. **Páginas relacionadas** — `InternalLinkingOptimizer`
11. **CTA final** — Título, subtítulo, botão WhatsApp

### Regras para Service Pages

- **H1 único** por página, descritivo e com keyword principal
- **FAQ nunca inclui pergunta sobre preço** (proibido pelo CRO)
- **Schema JSON-LD obrigatório:** `MedicalProcedure` + `FAQPage`
- **Bio da Dra. Carla** segue formato canônico (ver `BRAND.md`)
- **Canonical URL** sempre presente
- **Open Graph tags** com título, descrição e imagem

---

## 5. Template de Landing Page

### Estrutura (StoryBrand)

1. **Header** — `ConsultaInicialHeader` (sem navegação do site — LP é isolada)
2. **Hero** — Headline (message match com keyword), subheadline, CTA, foto, benefits
3. **Problema** — Título, descrição, lista de pain points específicos ao tratamento
4. **Guia** — "Como funciona" em 4 passos (numerados)
5. **Prova Social** — Depoimentos (formato `BRAND.md`) + stats
6. **FAQ** — 4-6 perguntas relevantes ao tratamento
7. **CTA Final** — Background `dental-purple`, botão WhatsApp verde
8. **Footer** — `ClareamentoFooter`
9. **Floating WhatsApp** — Apenas mobile, canto inferior direito

### Regras para Landing Pages

- **Sem menu de navegação do site** — LP é independente
- **noindex, nofollow** obrigatório
- **Headline deve fazer message match** com a keyword do Google Ads
- **Seção "Problema" deve ser específica** ao tratamento — não genérica
- **Cada LP tem seu config file** em `src/config/`
- **WhatsApp message pré-formatada** identifica a LP de origem
- **GCLID é capturado** no `useEffect` da page (`captureGCLID()`)
- **Tracking completo** em cada CTA (ver `TRACKING.md`)

### Como Criar uma Nova LP

1. Criar config em `src/config/novaLPConfig.ts` implementando `LandingPageConfig`
2. Criar page em `src/pages/LPNovaLP.tsx` seguindo padrão das existentes
3. Adicionar rota no `App.tsx` com `noindex`
4. Adicionar meta tags no `scripts/generate-static-meta.cjs`
5. Testar: GCLID capture, WhatsApp click tracking, GTM events, Google Ads conversion

---

## 6. Blog

### Pipeline Atual

```
Perplexity (pesquisa/draft) → Revisão Dra. Carla → Contentful (publicação) → Site
```

Existe pipeline N8N automatizado que auxilia na produção.

### Formato Preferido

- **Q&A style** quando possível — melhor para AI Search e featured snippets
- Tom educativo, acessível mas preciso
- Sem CTAs espalhafatosos no corpo
- Links internos naturais para service pages relevantes
- Cada post deve ter relação clara com um ou mais serviços

### Limitação Técnica

Blog posts individuais não têm HTML estático gerado em build time. Meta tags dependem de React Helmet (client-side), o que pode prejudicar crawlers que não executam JavaScript.

---

## 7. SEO — Regras de Conteúdo

### Meta Tags (por tipo de página)

**Service pages:**
```
<title>[Tratamento] em Ipanema | Dra. Carla Christoph</title>
<meta name="description" content="[Descrição específica do tratamento]. Dra. Carla Christoph. CRO-RJ 27.509." />
```

**Landing pages:**
```
<title>[Tratamento] em Ipanema | Dra. Carla Christoph</title>
<meta name="robots" content="noindex, nofollow" />
```

**Exceção — Ortodontia:**
```
<title>Ortodontia em Ipanema | Dr. Bruno Neves & Dra. Carla Christoph</title>
```

### FAQ — Regras de Linguagem

- Perguntas escritas como o paciente perguntaria (linguagem natural)
- Respostas diretas, sem enrolação, 2-4 frases
- **Nunca incluir perguntas sobre preço** (CRO proíbe)
- Schema `FAQPage` obrigatório para indexação
- Formatar como `Accordion` (shadcn/ui)

### Internal Linking

Componente `InternalLinkingOptimizer` em `src/components/seo/InternalLinkingOptimizer.tsx` define links relacionados por página:

| Página | Links Para |
|--------|-----------|
| `clareamento-dental` | Lentes, Restaurações, Blog |
| `lentes-de-contato-dental-e-facetas-de-porcelana` | Clareamento, Restaurações, Diferenciais |
| `implantes-dentarios` | Prótese, Clínica Geral, Blog |

---

## 8. Checklist de Qualidade por Página

Antes de publicar qualquer página nova ou atualização:

### Conteúdo
- [ ] H1 único e descritivo com keyword
- [ ] Bio canônica + frase contextual correta (ver `BRAND.md`)
- [ ] Nenhuma palavra banida (ver `BRAND.md` Seção 5)
- [ ] Atribuição correta de tratamento (Seção 3 deste doc)
- [ ] FAQ sem pergunta sobre preço
- [ ] Depoimentos no formato correto (ver `BRAND.md` Seção 6)
- [ ] CTA com WhatsApp + mensagem contextualizada

### SEO
- [ ] `<title>` e `<meta description>` definidos
- [ ] Canonical URL presente
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Schema JSON-LD apropriado (MedicalProcedure, FAQPage)
- [ ] HTML estático gerado em `generate-static-meta.cjs`
- [ ] noindex para LPs

### Tracking
- [ ] `captureGCLID()` no useEffect (LPs)
- [ ] `sendGCLIDToWebhook()` em cada handler de WhatsApp
- [ ] dataLayer.push com evento `whatsapp_click`
- [ ] gtag conversion com ID correto
- [ ] Labels de source descritivos e únicos

### Visual
- [ ] Consistência com design system (`TECH.md` Seção 2)
- [ ] Responsividade mobile testada
- [ ] Imagens em WebP com lazy loading
- [ ] CTA visível above the fold
