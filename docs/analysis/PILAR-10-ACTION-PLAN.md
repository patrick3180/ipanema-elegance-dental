# PILAR 10 — BLOG OPTIMIZATION ACTION PLAN

**Data:** 16 de Fevereiro de 2026
**Baseado em:** PILAR-10-BLOG-CONTENT-STRATEGY-V2.md (análise real Contentful)
**Objetivo:** Guia passo-a-passo para implementar Quick Wins e recomendações de alto impacto

---

## FASE 1: Quick Wins (1-2 horas, alto impacto)

### ✅ AÇÃO 1.1: Adicionar Link em "Periodontite" (5 minutos)

**Post:** `saude-bucal-periodontite`
**URL:** `/blog/periodontite`
**Problema:** Post sobre periodontite não linka para /saude-da-gengiva
**Impacto:** 28 views/90d × 28.57% conv. hipotética = +8 conversões/trimestre

**Edição no Contentful:**

1. Abrir post `saude-bucal-periodontite` no Contentful
2. Localizar parágrafo sobre tratamento (buscar por "tratamento" ou "infecção")
3. Adicionar link contextual:

**Antes:**
> "A periodontite é uma infecção bacteriana que afeta as gengivas e o osso que sustenta os dentes. Sem tratamento adequado, pode levar à perda dentária."

**Depois:**
> "A periodontite é uma infecção bacteriana que afeta as gengivas e o osso que sustenta os dentes. [Nossa abordagem de tratamento periodontal](/saude-da-gengiva) combina limpeza profunda, acompanhamento contínuo e prevenção de recidivas."

4. Publish

---

### ✅ AÇÃO 1.2: Adicionar Links em "Dente Quebrou" (10 minutos)

**Post:** `emergencia-dente-quebrou`
**URL:** `/blog/emergencia-dente-quebrou`
**Problema:** Post de urgência (22 views) não oferece caminho para solução
**Impacto:** +3-6 conversões/trimestre

**Edição no Contentful:**

1. Abrir post `emergencia-dente-quebrou`
2. Localizar seção sobre "tratamento" ou "opções"
3. Adicionar 2 links:

**Link 1 (após falar de fratura):**

**Antes:**
> "Dependendo da extensão da fratura, o tratamento pode variar de uma restauração simples até uma coroa ou faceta."

**Depois:**
> "Dependendo da extensão da fratura, o tratamento pode variar de uma restauração simples até [facetas de porcelana ou lentes de contato dental](/lentes-de-contato-dental-e-facetas) para casos que exigem reconstrução estética completa."

**Link 2 (final do post):**

Adicionar novo parágrafo antes do final:

```markdown
## Quebrei um dente. E agora?

Se você quebrou um dente, entre em contato pelo WhatsApp. Atendemos emergências em Ipanema e respondemos inclusive nos fins de semana.

[Agendar avaliação de urgência →](https://wa.me/5521999999999?text=Quebrei%20um%20dente%20e%20preciso%20de%20atendimento%20urgente)
```

4. Publish

---

### ✅ AÇÃO 1.3: Unpublish 8 Posts Históricos (30 minutos)

**Problema:** Posts históricos sem alinhamento com serviços diluem SEO
**Impacto:** Foco em conteúdo de conversão

**Posts para Unpublish (Draft):**

1. `odontologia-egito-antigo` — "Os faraós e seus dentistas"
2. `odontologia-roma-antiga` — "Higiene bucal na Roma Antiga"
3. `saude-bucal-carie-dentista` — "A era dos barbeiros-dentistas"
4. `historia-dentadura` — "A invenção da dentadura"
5. `remedios-medievais-dor-de-dente` — "Remédios medievais para dor de dente"
6. `descoberta-anestesia` — "A descoberta da anestesia"
7. `evolucao-materiais-odontologicos` — "A evolução dos materiais odontológicos"
8. `vikings-saude-bucal` — "Condições orais dos vikings"

**Ação no Contentful:**
1. Abrir cada post
2. Status: Published → Draft
3. Adicionar nota: "Unpublished 2026-02-16: Conteúdo histórico sem alinhamento comercial"
4. Save

**NÃO deletar permanentemente** — manter como draft para possível reutilização futura.

---

### ✅ AÇÃO 1.4: Corrigir Slug Mismatch GA4 × Contentful (2 horas)

**Problema:** GA4 reporta `/blog/carie-oculta` mas Contentful tem `saude-bucal-carie-oculta`
**Impacto:** Tracking incorreto, dados de tráfego não mapeiam para posts reais

**Posts com possível mismatch (verificar):**

| GA4 URL | Contentful Slug (provável) | Ação |
|---------|---------------------------|------|
| /blog/carie-oculta | saude-bucal-carie-oculta | Verificar redirect ou canonical |
| /blog/periodontite | saude-bucal-periodontite | Verificar |
| /blog/mau-halito | saude-bucal-mau-halito | Verificar |
| /blog/jejum-intermitente-e-saude-bucal | jejum-intermitente-e-saude-bucal | Verificar |
| /blog/emergencia-dente-quebrou | emergencia-dente-quebrou | ✅ Match |
| /blog/probioticos | saude-bucal-probioticos | Verificar |

**Ação:**
1. Verificar código de geração de rotas no blog
2. Confirmar se slugs Contentful são usados diretamente ou transformados
3. Mapear todos os 65 posts: Contentful slug → URL real do site
4. Atualizar análise GA4 com slugs corretos

---

## FASE 2: Replicar Sucesso "Probióticos" (2-3 horas)

### ✅ AÇÃO 2.1: Adicionar Tom Pessoal em Top 5 Posts

**Modelo baseado em:** `/blog/saude-bucal-probioticos` (28.57% conversão)

**Elementos do tom pessoal:**
1. Primeira pessoa ("meu consultório", "tenho observado")
2. Localização (Ipanema)
3. Experiência (20 anos + 8 anos Marinha)
4. Ponte pessoal → conteúdo técnico

---

#### Post 1: Cárie Oculta (45 views/90d)

**Slug:** `saude-bucal-carie-oculta`
**Problema:** Começo genérico e impessoal

**Parágrafo atual (provavelmente):**
> "A cárie oculta é um problema odontológico que afeta muitas pessoas sem que elas percebam..."

**Reescrever para:**

> **Como dentista especialista em Prótese Dentária em Ipanema**, uma das situações que mais ouço no consultório é: "Doutora, mas eu escovo os dentes três vezes por dia! Como apareceu cárie?"
>
> A resposta está nas **cáries ocultas** — aquelas que começam entre os dentes ou sob restaurações antigas, completamente invisíveis ao espelho. Nos meus 20 anos de experiência, incluindo os 8 anos como dentista militar na Odontoclínica Central da Marinha, aprendi que a prevenção mais eficaz vem da detecção precoce.

**+ Adicionar link:**

No parágrafo sobre tratamento:
> "Quando detectamos uma cárie oculta, [o tratamento com restaurações estéticas](/restauracoes-esteticas) permite recuperar a função e estética do dente preservando o máximo de estrutura natural."

---

#### Post 2: Dente Trincado (29 views/90d)

**Slug:** `dente-trincado`

**Adicionar parágrafo inicial:**

> **Em 20 anos de consultório em Ipanema**, vi centenas de casos de dentes trincados — e a maioria dos pacientes não percebe quando acontece. A trinca pode ser microscópica, causada por morder algo duro, bruxismo noturno ou até mudanças bruscas de temperatura.
>
> O desafio é que dentes trincados são progressivos. O que começa como uma linha fina pode evoluir para uma fratura completa se não tratado a tempo.

**+ Adicionar link:**

> "Dependendo da profundidade da trinca, o tratamento pode variar de um [ajuste oclusal até facetas de porcelana](/lentes-de-contato-dental-e-facetas) que protegem o dente e previnem a progressão da fratura."

---

#### Post 3: Mau Hálito (26 views, 154s engagement)

**Slug:** `saude-bucal-mau-halito`

**Adicionar parágrafo inicial:**

> **Como especialista em Prótese Dentária e Implantodontia**, muitos pacientes chegam ao consultório em Ipanema preocupados com estética — lentes, clareamento — mas durante a avaliação descubro que o problema real é mau hálito.
>
> É um assunto delicado. Ninguém quer falar sobre isso, mas afeta diretamente a confiança e a vida social. Nos meus anos como dentista militar, aprendi que o mau hálito crônico tem causas específicas — e todas tratáveis.

**+ Adicionar link:**

> "Em casos de halitose causada por doença periodontal, [o tratamento da saúde gengival](/saude-da-gengiva) elimina a origem bacteriana do problema de forma definitiva."

---

#### Post 4: Jejum Intermitente (19 views, 542s engagement!)

**Slug:** `jejum-intermitente-e-saude-bucal`

**Problema:** Alto engagement (9 minutos!) mas 0% conversão
**Causa:** Tópico de saúde geral sem ponte para odontologia

**Adicionar parágrafo inicial:**

> **Nos últimos anos**, tenho recebido cada vez mais perguntas no consultório sobre jejum intermitente e saúde bucal. Meus pacientes de Ipanema — muitos adeptos de práticas de wellness — querem saber: jejuar prejudica os dentes?
>
> A resposta é mais complexa do que um simples sim ou não. Como dentista com 20 anos de experiência, acompanho como mudanças na rotina alimentar afetam a saúde oral dos meus pacientes.

**+ Adicionar link (CRÍTICO para conversão):**

Final do post:

> ## Jejum intermitente no seu contexto de saúde oral
>
> Se você pratica jejum intermitente, é importante incluir a saúde bucal na sua rotina de check-ups. [Agende uma avaliação preventiva](/clinica-geral-e-prevencao) para garantir que sua prática de wellness não está comprometendo seus dentes e gengivas.

---

#### Post 5: Alimentos com Amido (26 views)

**Slug:** `saude-bucal-alimentos-com-amido`

**Adicionar parágrafo inicial:**

> **Uma dúvida recorrente no consultório** é sobre carboidratos e cáries. Muitos pacientes acreditam que apenas açúcar refinado causa cárie, mas alimentos ricos em amido — pão francês, tapioca, batata — também alimentam as bactérias que desmineralizam o esmalte.
>
> Como dentista especialista em Ipanema, atendo um público cada vez mais consciente sobre nutrição. E a conexão entre dieta e saúde bucal é real.

**+ Adicionar link:**

> "Se sua dieta é rica em carboidratos, [consultas preventivas regulares](/clinica-geral-e-prevencao) com limpeza profissional e aplicação de flúor protegem contra o risco aumentado de cáries."

---

## FASE 3: Script de Validação BRAND.md (4 horas dev)

### ✅ AÇÃO 3.1: Criar Script de Validação Pré-Publish

**Problema:** 95% dos posts violam BRAND.md
**Causa:** Pipeline Perplexity → Contentful não valida
**Solução:** Webhook validation no Contentful

**Script: `scripts/validate-brand-compliance.cjs`**

```javascript
const bannedWords = [
  'sorriso perfeito',
  'transforme seu sorriso',
  'transformar seu sorriso',
  'premium',
  'excelência',
  'humanizado',
  'tecnologia de ponta',
  'profissionais altamente qualificados',
  'solução definitiva',
  'resultados excepcionais',
  '100% natural',
  'atendimento personalizado',
  'materiais de alta qualidade',
  'agende agora',
  'não perca',
  'recomendo',
  'incrível',
  'perfeita',
  'perfeito'
];

function validateBrandCompliance(text) {
  const violations = [];
  const lowerText = text.toLowerCase();

  bannedWords.forEach(word => {
    if (lowerText.includes(word.toLowerCase())) {
      violations.push({
        word,
        count: (lowerText.match(new RegExp(word.toLowerCase(), 'g')) || []).length
      });
    }
  });

  return {
    isCompliant: violations.length === 0,
    violations,
    violationCount: violations.reduce((sum, v) => sum + v.count, 0)
  };
}

// Contentful webhook handler
async function validatePost(postData) {
  const { title, excerpt, content } = postData.fields;

  // Extract text from Rich Text content
  let contentText = extractTextFromRichText(content);
  let fullText = [title, excerpt, contentText].join(' ');

  const validation = validateBrandCompliance(fullText);

  if (!validation.isCompliant) {
    console.error('❌ BRAND COMPLIANCE VIOLATION');
    console.error('Violations found:', validation.violations);
    return {
      valid: false,
      errors: validation.violations
    };
  }

  console.log('✅ Brand compliance: OK');
  return { valid: true };
}

module.exports = { validateBrandCompliance, validatePost };
```

**Integração:**
1. Contentful webhook: Entry.publish → call validation API
2. Se validação falha: block publish + notificar editor
3. Editor revisa e corrige

---

### ✅ AÇÃO 3.2: Fix "recomendo" em Massa (1 hora)

**Problema:** 58 posts usam "recomendo" (89% dos posts)
**Solução:** Bulk find-replace via Contentful API

**Script: `scripts/fix-recomendo.cjs`**

```javascript
const contentful = require('contentful-management');

const replacements = {
  'recomendo que': 'é importante',
  'recomendo fortemente': 'é essencial',
  'recomendo': '',  // remove
  'dentistas recomendam': 'dentistas indicam',
  'especialistas recomendam': 'especialistas indicam'
};

async function fixRecomendo() {
  const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
  });

  const space = await client.getSpace(process.env.VITE_CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment('master');

  const entries = await environment.getEntries({
    content_type: 'blogCarla',
    limit: 100
  });

  let fixed = 0;

  for (const entry of entries.items) {
    let modified = false;
    const fields = entry.fields;

    // Fix title
    if (fields.title && fields.title['pt-BR']) {
      const original = fields.title['pt-BR'];
      let updated = original;

      Object.entries(replacements).forEach(([from, to]) => {
        if (updated.toLowerCase().includes(from.toLowerCase())) {
          updated = updated.replace(new RegExp(from, 'gi'), to);
          modified = true;
        }
      });

      fields.title['pt-BR'] = updated;
    }

    // Fix excerpt
    if (fields.excerpt && fields.excerpt['pt-BR']) {
      const original = fields.excerpt['pt-BR'];
      let updated = original;

      Object.entries(replacements).forEach(([from, to]) => {
        if (updated.toLowerCase().includes(from.toLowerCase())) {
          updated = updated.replace(new RegExp(from, 'gi'), to);
          modified = true;
        }
      });

      fields.excerpt['pt-BR'] = updated;
    }

    // Fix content (Rich Text is more complex, requires traversal)
    // ... implement Rich Text traversal and fix

    if (modified) {
      await entry.update();
      console.log(`✅ Fixed: ${fields.title['pt-BR']}`);
      fixed++;
    }
  }

  console.log(`\nTotal posts fixed: ${fixed}`);
}

fixRecomendo();
```

**ATENÇÃO:** Executar em STAGING primeiro, validar 5-10 posts manualmente, depois production.

---

## FASE 4: Cross-Linking Strategy (6 horas)

### ✅ AÇÃO 4.1: Mapa de Cross-Linking

**Objetivo:** Cada post deve linkar para:
1. 1-2 service pages relacionadas
2. 2-3 outros posts relacionados
3. Homepage ou /blog (breadcrumb)

**Matriz de Links Recomendados:**

| Categoria do Post | Service Page Principal | Service Page Secundária |
|------------------|----------------------|------------------------|
| Estética/Lentes | /lentes-de-contato-dental-e-facetas | /clareamento-dental |
| Clareamento | /clareamento-dental | /lentes-de-contato-dental-e-facetas |
| Saúde Gengival | /saude-da-gengiva | /clinica-geral-e-prevencao |
| Implantes | /implantes-dentarios | /protese-dentaria |
| Prótese | /protese-dentaria | /implantes-dentarios |
| Restaurações | /restauracoes-esteticas | /clinica-geral-e-prevencao |
| Canal | /tratamento-de-canal | /restauracoes-esteticas |
| Ortodontia | /ortodontia | /clinica-geral-e-prevencao |
| Prevenção | /clinica-geral-e-prevencao | (context-dependent) |

**Implementação:**

Para cada post:
1. Identificar categoria
2. Adicionar 1 link para SP principal (parágrafo 3-5)
3. Adicionar 1 link para SP secundária (parágrafo final ou "Próximos Passos")
4. Validar que links são contextuais, não forçados

---

## FASE 5: Monitoramento e Iteração

### ✅ AÇÃO 5.1: Setup de KPIs no GA4

**Eventos a monitorar:**
1. `blog_link_click` — click em link de blog → service page
2. `blog_whatsapp_click` — click WhatsApp a partir de blog
3. `blog_scroll_depth` — 25%, 50%, 75%, 100%
4. `blog_time_on_page` — bucketed (0-30s, 30-60s, 60-120s, 120s+)

**Configurar no GTM:**

```javascript
// Track blog internal links
document.querySelectorAll('article a[href^="/"]').forEach(link => {
  link.addEventListener('click', () => {
    gtag('event', 'blog_link_click', {
      'link_url': link.href,
      'link_text': link.textContent,
      'source_post': window.location.pathname
    });
  });
});
```

---

### ✅ AÇÃO 5.2: A/B Test CTA Positioning

**Hipótese:** CTAs no meio do post (após 50% do conteúdo) convertem melhor que no final

**Test Setup:**
1. Escolher 5 posts de alto tráfego
2. Versão A: CTA no final (atual)
3. Versão B: CTA após 50% + CTA no final
4. Medir: click-through rate de cada posição
5. Duração: 30 dias

**Posts para A/B test:**
- Cárie Oculta (45 views)
- Dente Trincado (29 views)
- Periodontite (28 views)
- Mau Hálito (26 views)
- Alimentos com Amido (26 views)

---

## Checklist de Implementação

### Semana 1
- [ ] Ação 1.1: Link em Periodontite (5 min)
- [ ] Ação 1.2: Links em Dente Quebrou (10 min)
- [ ] Ação 1.3: Unpublish 8 posts históricos (30 min)
- [ ] Ação 1.4: Audit slugs GA4 × Contentful (2h)
- [ ] Ação 2.1: Tom pessoal em Cárie Oculta (30 min)
- [ ] Ação 2.1: Tom pessoal em Dente Trincado (30 min)

### Semana 2
- [ ] Ação 2.1: Tom pessoal em Mau Hálito (30 min)
- [ ] Ação 2.1: Tom pessoal em Jejum Intermitente (30 min)
- [ ] Ação 2.1: Tom pessoal em Alimentos com Amido (30 min)
- [ ] Ação 3.1: Script validação BRAND.md (4h dev)
- [ ] Ação 3.2: Fix "recomendo" em 10 posts prioritários (1h)

### Semana 3-4
- [ ] Ação 3.2: Fix "recomendo" em restante dos posts (4h)
- [ ] Ação 4.1: Cross-linking top 20 posts (6h)
- [ ] Ação 5.1: Setup KPIs GA4 (2h)
- [ ] Ação 5.2: A/B test CTA (setup 1h)

---

## Métricas de Sucesso

**Baseline (atual):**
- Blog conversion rate: 0.3%
- Posts com 0 links para SPs: 25 (38%)
- Posts com brand violations: 62 (95%)

**Metas 30 dias:**
- Blog conversion rate: 5%
- Posts com 0 links: 10 (15%)
- Brand violations: 30 (46%)

**Metas 90 dias:**
- Blog conversion rate: 8%
- Posts com 0 links: 0 (0%)
- Brand violations: 10 (15%)

---

**Documento criado por:** Claude Code (Sonnet 4.5)
**Data:** 16 de Fevereiro de 2026
**Baseado em:** Análise real de 65 posts do Contentful
**Próximo review:** 16 de Março de 2026 (30 dias)
