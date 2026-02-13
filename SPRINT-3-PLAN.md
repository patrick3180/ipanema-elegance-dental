# Sprint 3 - Plano de Implementação

**Data de Início:** 13 de Fevereiro de 2026
**Status Geral:** 🔜 PLANEJAMENTO
**Última Atualização:** 13 de Fevereiro de 2026 - 14:30

---

## 📊 Contexto

Sprint 2 foi concluído com **16/20 itens completos (80%)** do Top 20 Opportunities, gerando **R$ 168-281k/mês** em revenue adicional estimado.

Sprint 3 foca nos **itens #14-20** restantes, com prioridades ajustadas:

- **Itens #12 e #13** (Patient Testimonials, "1-Hour Minimum" Headlines) → **BAIXA PRIORIDADE** (deixar para o final)
- **Itens #14-20** → **FOCO PRINCIPAL** do Sprint 3

---

## 🎯 Objetivos do Sprint 3

### Objetivo Primário
Implementar os **7 itens restantes** (#14-20) para completar 100% do Top 20 Opportunities.

### Objetivos Secundários
1. Consolidar SEO técnico (schemas, pre-rendering)
2. Estabelecer base para content marketing de longo prazo
3. Ampliar canais de conversão (WhatsApp widget)
4. Melhorar performance mobile (responsive images)

### Revenue Impact Esperado
**R$ 81,000 - 151,000/mês** adicional (total acumulado: R$ 249-432k/mês)

---

## 📋 Itens do Sprint 3 (Prioridade Decrescente)

### 🔥 Priority 1: Quick Wins Técnicos (Semana 1)

---

#### **#14 - FAQPage Schema no ClareamentoDental** ⏳

**Categoria:** SEO
**Esforço:** ⚡ BAIXO (15 minutos)
**Time to Value:** 2-4 semanas
**Revenue:** R$ 3,000-5,000/mês

**Problema:**
- ClareamentoDental.tsx tem FAQ UI mas falta FAQPage schema
- Google não reconhece estrutura Q&A → sem rich snippets
- Perda de visibilidade em featured snippets

**Solução:**
1. Adicionar FAQPage schema ao ClareamentoDental.tsx
2. Estrutura JSON-LD com todas as perguntas/respostas
3. Seguir formato schema.org/FAQPage

**Implementação:**
```tsx
// ClareamentoDental.tsx - Adicionar após <Helmet>
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quanto tempo dura o clareamento dental?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O clareamento dental dura de 1 a 3 anos..."
        }
      }
      // ... demais perguntas
    ]
  })}
</script>
```

**Arquivos:**
- `src/pages/ClareamentoDental.tsx`

**Critérios de Aceite:**
- [ ] FAQPage schema implementado
- [ ] Testado em Google Rich Results Test
- [ ] Commit com mensagem descritiva

---

#### **#15 - CRO-RJ Number em Schema Identifiers** ⏳

**Categoria:** SEO / Trust
**Esforço:** ⚡ BAIXO (30 minutos)
**Time to Value:** 2-4 semanas
**Revenue:** R$ 2,000-4,000/mês

**Problema:**
- CRO-RJ 27.509 visível no texto mas não em schema markup
- Credenciais profissionais devem ser machine-readable
- Knowledge Graph não reconhece registro profissional

**Solução:**
1. Adicionar CRO-RJ ao schema Organization/LocalBusiness
2. Usar PropertyValue format para identifiers

**Implementação:**
```tsx
// GlobalSchemas.tsx - Adicionar ao LocalBusiness schema
{
  "@type": "LocalBusiness",
  "identifier": {
    "@type": "PropertyValue",
    "propertyID": "CRO-RJ",
    "value": "27509"
  },
  // ... resto do schema
}
```

**Arquivos:**
- `src/components/seo/GlobalSchemas.tsx`

**Critérios de Aceite:**
- [ ] Identifier adicionado ao schema
- [ ] Testado em Google Structured Data Testing Tool
- [ ] Commit com mensagem descritiva

---

#### **#18 - WhatsApp Chat Widget com 1-Click** ⏳

**Categoria:** Conversion
**Esforço:** ⚡ BAIXO (4-6 horas)
**Time to Value:** Imediato
**Revenue:** R$ 8,000-12,000/mês

**Problema:**
- WhatsApp CTA existe mas fricção varia por página
- Floating button aumenta conversão (benchmark: Karina Glatthardt tem 7 CTAs)
- Mensagens não são pré-preenchidas com contexto da página

**Solução:**
1. Criar floating WhatsApp button para todas as páginas (mobile + desktop)
2. Mensagens pré-preenchidas por contexto:
   - Homepage: "Olá! Gostaria de agendar uma consulta."
   - Implantes: "Olá! Tenho interesse em saber mais sobre implantes dentários."
   - Clareamento: "Olá! Gostaria de informações sobre clareamento dental."
   - Lentes: "Olá! Quero conhecer o Test Drive do Sorriso."
3. Configurar auto-responder para horário fora de atendimento

**Implementação:**
- Componente `FloatingWhatsApp.tsx` já existe
- Expandir para todas as páginas que ainda não têm
- Adicionar lógica de mensagem contextual por página

**Arquivos:**
- Verificar páginas sem floating button
- Adicionar `<FloatingWhatsApp />` onde falta
- Atualizar mensagens para contexto específico

**Critérios de Aceite:**
- [ ] Floating button em TODAS as páginas
- [ ] Mensagens contextualizadas por página
- [ ] Funciona em mobile e desktop
- [ ] Design consistente com BRAND.md

---

#### **#20 - Responsive Image Sizes (srcset)** ⏳

**Categoria:** Performance
**Esforço:** ⚡⚡ MODERADO (2-3 horas)
**Time to Value:** Imediato
**Revenue:** R$ 5,000-8,000/mês

**Problema:**
- Hero images são single-size (1920px)
- Mobile baixa imagem desktop completa (desperdício de banda)
- Mobile LCP poderia ser 300ms mais rápido

**Solução:**
1. Gerar tamanhos responsivos para hero images:
   - 640px (mobile portrait)
   - 1024px (tablet/mobile landscape)
   - 1920px (desktop)
2. Atualizar componentes de imagem com srcset
3. Implementar `sizes` attribute para browser hints

**Implementação:**
```bash
# Script de geração (executar uma vez)
cd public/lovable-uploads
for img in *.webp; do
  sharp -i "$img" -o "${img%.webp}-640.webp" resize 640 --webp-quality 85
  sharp -i "$img" -o "${img%.webp}-1024.webp" resize 1024 --webp-quality 85
done
```

```tsx
// UltraOptimizedPicture.tsx - Atualizar com srcset
<picture>
  <source
    type="image/webp"
    srcset="
      /lovable-uploads/hero-640.webp 640w,
      /lovable-uploads/hero-1024.webp 1024w,
      /lovable-uploads/hero-1920.webp 1920w
    "
    sizes="(max-width: 768px) 100vw, 50vw"
  />
  <img src="/lovable-uploads/hero-1024.webp" alt="..." />
</picture>
```

**Arquivos:**
- Gerar novas imagens: `public/lovable-uploads/*.webp`
- Atualizar componente: `src/components/image/UltraOptimizedPicture.tsx`
- Atualizar páginas que usam hero images

**Critérios de Aceite:**
- [ ] Imagens responsivas geradas (640, 1024, 1920)
- [ ] srcset implementado nos hero images
- [ ] Mobile LCP melhora em 300ms+
- [ ] Testado em PageSpeed Insights

---

### 🔥 Priority 2: SEO Técnico Avançado (Semana 2)

---

#### **#19 - Pre-Render Blog Posts (Static HTML)** ⏳

**Categoria:** SEO
**Esforço:** ⚡⚡ MODERADO (4-6 horas)
**Time to Value:** 2-4 semanas
**Revenue:** R$ 8,000-15,000/mês

**Problema:**
- Blog posts (`/blog/:slug`) não têm HTML estático
- Meta tags dependem de React Helmet (client-side)
- Crawlers que não executam JS veem conteúdo vazio
- Social sharing (WhatsApp, Facebook) não mostra preview

**Solução:**
1. Atualizar `scripts/generate-blog-html.js` para:
   - Fetch slugs do Contentful
   - Gerar HTML estático com meta tags
   - Incluir Article schema markup
2. Integrar no build: `npm run build:full`

**Implementação:**
```javascript
// scripts/generate-blog-html.js - Expandir
async function generateBlogPages() {
  // 1. Fetch posts do Contentful
  const posts = await fetchContentfulPosts();

  // 2. Para cada post, gerar HTML estático
  for (const post of posts) {
    const html = generateHTML({
      title: post.titulo,
      description: post.resumo,
      image: post.imagemDestaque,
      slug: post.slug,
      content: post.conteudo,
      publishedDate: post.dataPublicacao
    });

    // 3. Salvar em dist/blog/{slug}/index.html
    fs.writeFileSync(`dist/blog/${post.slug}/index.html`, html);
  }
}
```

**Arquivos:**
- `scripts/generate-blog-html.js` (expandir)
- `package.json` (já tem `build:blog` script)

**Critérios de Aceite:**
- [ ] HTML estático gerado para todos os posts
- [ ] Meta tags OG corretas (testar no Facebook Debugger)
- [ ] Article schema implementado
- [ ] Build completo inclui pre-rendering (`npm run build:full`)
- [ ] WhatsApp preview funciona ao compartilhar

---

### 🔥 Priority 3: Content Marketing Long-Term (Semanas 3-8)

---

#### **#16 - Educational Blog Strategy (8 Cornerstone Posts)** ⏳

**Categoria:** SEO + Content Marketing
**Esforço:** ⚡⚡⚡ ALTO (8-12 semanas)
**Time to Value:** 8-12 semanas (SEO lag)
**Revenue:** R$ 40,000-80,000/mês (long-term)

**Problema:**
- Content marketing subdesenvolvido em toda Zona Sul
- Competidores têm blog genérico/minimalista
- Oportunidade de dominar thought leadership

**Solução:**
**Fase 1 (Mês 1):** Criar 8 cornerstone posts (2,000+ palavras cada):

1. "Implante dentário: guia completo (tipos, processo, recuperação, custo)"
2. "Lentes de contato dental vs. facetas: qual escolher?"
3. "Clareamento dental: consultório, caseiro ou combinado?"
4. "Prótese dentária: tipos, indicações e cuidados"
5. "Ortodontia adulta: nunca é tarde para alinhar o sorriso"
6. "Tratamento de canal: mitos, verdades e quando é necessário"
7. "Saúde da gengiva: a base de todo tratamento estético"
8. "Restaurações estéticas: quando trocar amálgama por resina"

**Fase 2 (Meses 2-6):** Publicar 2-3 posts/mês em long-tail keywords:
- "Implante dentário dói? O que esperar do pós-operatório"
- "Quanto custa lente de contato dental em Ipanema?"
- "Clareamento caseiro funciona? Dentista explica"
- "Facetas de porcelana duram quanto tempo?"

**Princípios de Content:**
- Voz da Dra. Carla (direto, técnico quando necessário, sem fluff)
- Responder perguntas reais de pacientes (não promocional)
- FAQ schema markup em todos os posts
- Links para service pages relevantes
- Menções ao Test Drive do Sorriso onde apropriado

**Workflow:**
1. **Pesquisa de keywords** (1 semana)
   - Usar Google Search Console data
   - Analisar "People Also Ask"
   - Mapear long-tail opportunities
2. **Outline + aprovação** (1 semana)
   - Criar estruturas detalhadas
   - Validar com cliente
3. **Redação** (4-6 semanas)
   - 1-2 posts/semana
   - 2,000+ palavras cada
   - Imagens/diagramas onde relevante
4. **Publicação + promoção** (ongoing)
   - Contentful CMS
   - Social media snippets
   - Newsletter menções

**Arquivos:**
- Todos os posts via Contentful CMS
- Nenhuma alteração de código necessária (já existe infraestrutura de blog)

**Critérios de Aceite:**
- [ ] 8 cornerstone posts publicados (Mês 1)
- [ ] FAQ schema em todos os posts
- [ ] Internal links para service pages
- [ ] Imagens otimizadas (WebP)
- [ ] Tracking em Google Search Console
- [ ] Social media promotion plan

**Notas:**
- Este item requer **esforço contínuo** (8-12 semanas)
- Não é blocker para outros itens do Sprint 3
- Pode ser executado em paralelo com itens técnicos
- Requer validação do cliente para temas e approach

---

#### **#17 - Procedure Explanation Videos (4 Videos)** ⏳

**Categoria:** Content Marketing / Conversion
**Esforço:** ⚡⚡⚡ MODERADO-ALTO (4-8 semanas)
**Time to Value:** Imediato após publicação
**Revenue:** R$ 15,000-25,000/mês

**Problema:**
- Apenas 1 de 5 competidores tem vídeos
- Vídeo constrói trust e aumenta engagement
- Vídeo explica procedimentos melhor que texto

**Solução:**
Criar **4 vídeos explicativos** (3-5 minutos cada):

**Vídeo 1: "O que é o Test Drive do Sorriso?"**
- Mostrar processo de escaneamento iTero
- Demo visualização 3D do sorriso
- Depoimento de paciente (opcional)

**Vídeo 2: "Escaneamento iTero Element 5D: Como Planejamos Seu Implante"**
- Mostrar tecnologia do scanner
- Explicar vantagens do planejamento digital
- Comparar com moldagens tradicionais

**Vídeo 3: "Clareamento Combinado: Consultório + Caseiro Supervisionado"**
- Explicar processo de 3 etapas
- Mostrar timeline típica de resultados
- Abordar preocupações de segurança

**Vídeo 4: "Lentes de Contato Dental: Passo a Passo do Processo"**
- Mostrar preparação (desgaste mínimo/zero)
- Explicar fase Test Drive
- Mostrar processo de colagem final

**Workflow:**
1. **Pré-produção** (1-2 semanas)
   - Escrever roteiros
   - Storyboard
   - Validar com cliente
2. **Gravação** (1-2 semanas)
   - Gravar no consultório
   - B-roll de equipamentos
   - Áudio profissional
3. **Pós-produção** (1-2 semanas)
   - Edição
   - Motion graphics (títulos, legendas)
   - Color grading
4. **Publicação** (1 semana)
   - Upload no YouTube
   - Embed em service pages
   - Clipes para Instagram/TikTok

**Distribuição:**
- YouTube channel (SEO)
- Embed em service pages relevantes
- Instagram Reels (clips de 30-60s)
- Google Ads video campaigns

**Arquivos:**
- Vídeos hospedados no YouTube
- Embed codes adicionados às páginas relevantes:
  - Homepage: Vídeo #1 (Test Drive)
  - ImplantesDentarios.tsx: Vídeo #2 (iTero)
  - ClareamentoDental.tsx: Vídeo #3 (Clareamento)
  - LentesEFacetas.tsx: Vídeo #4 (Lentes)

**Critérios de Aceite:**
- [ ] 4 vídeos produzidos (roteiro → gravação → edição)
- [ ] Uploaded no YouTube com SEO (título, descrição, tags)
- [ ] Embedded em páginas relevantes
- [ ] Clipes para social media criados
- [ ] Tracking de visualizações configurado

**Notas:**
- Requer **produção externa** (filmagem, edição)
- Orçamento estimado: R$ 3,000-8,000 (produção profissional)
- Alternativa low-budget: gravação in-house com smartphone + tripé
- ROI justifica investimento (R$ 15-25k/mês revenue vs. custo one-time)

---

## 📅 Timeline Sugerido

### Semana 1: Quick Wins Técnicos
**Dias 1-2:**
- [ ] #14: FAQPage Schema (15 min)
- [ ] #15: CRO-RJ Schema (30 min)

**Dias 3-5:**
- [ ] #18: WhatsApp Chat Widget (4-6h)
- [ ] #20: Responsive Images (2-3h)

**Deliverable:** 4 itens técnicos completos, +R$ 18-29k/mês

---

### Semana 2: SEO Técnico Avançado
**Dias 1-3:**
- [ ] #19: Pre-Render Blog Posts (4-6h)

**Dias 4-5:**
- [ ] Testar pre-rendering
- [ ] Validar social sharing
- [ ] Push para produção

**Deliverable:** Blog SEO completo, +R$ 8-15k/mês

---

### Semanas 3-8: Content Marketing
**Semana 3:**
- [ ] #16: Pesquisa de keywords + outlines (Fase 1)
- [ ] #17: Pré-produção vídeos (roteiros)

**Semanas 4-7:**
- [ ] #16: Redação dos 8 cornerstone posts (2 posts/semana)
- [ ] #17: Gravação + edição vídeos

**Semana 8:**
- [ ] #16: Publicação final dos posts
- [ ] #17: Upload + embed vídeos

**Deliverable:** Blog strategy completo, vídeos publicados, +R$ 55-105k/mês

---

## 🎯 Métricas de Sucesso

### Itens Técnicos (#14, #15, #18, #19, #20)
- [ ] Todos implementados e em produção
- [ ] Google Rich Results Test: passing
- [ ] WhatsApp CTR: medido via GTM
- [ ] Mobile LCP: <1.8s (verificado via PageSpeed Insights)
- [ ] Blog social sharing: OG tags funcionando (Facebook Debugger)

### Content Marketing (#16, #17)
- [ ] 8 cornerstone posts publicados
- [ ] 4 vídeos uploaded no YouTube
- [ ] Tracking configurado:
  - Google Search Console: impressões/clicks
  - YouTube Analytics: views/engagement
  - GTM: video play events
- [ ] Organic traffic ao blog: +40-60% (baseline vs. 12 semanas depois)

### Revenue Impact
**Target:** R$ 81,000 - 151,000/mês adicional

**Medição:**
- Conversões via WhatsApp (tracking existente)
- Organic traffic growth (GSC)
- Video engagement → lead conversions

---

## 🚨 Riscos e Mitigações

### Risco 1: Content Marketing Timeline
**Risco:** 8 posts + 4 vídeos em 8 semanas é agressivo
**Mitigação:**
- Priorizar cornerstone posts primeiro (maior SEO impact)
- Vídeos podem atrasar para Sprint 4 se necessário
- Contratar freelancer de conteúdo se timeline crítica

### Risco 2: Vídeo Production Quality
**Risco:** Produção in-house pode não ter qualidade suficiente
**Mitigação:**
- Orçar produção profissional (R$ 3-8k)
- Alternativa: começar com 1 vídeo teste, avaliar ROI, então escalar

### Risco 3: Blog SEO Lag
**Risco:** SEO leva 8-12 semanas para mostrar resultados
**Mitigação:**
- Começar ASAP para ter resultados no final do Sprint 3
- Promover via social media para traffic imediato
- Itens técnicos (#14, #15, #19) têm impacto mais rápido (2-4 semanas)

---

## 📦 Deliverables Finais

### Code Changes
- [ ] FAQPage schema em ClareamentoDental.tsx
- [ ] CRO-RJ identifier em GlobalSchemas.tsx
- [ ] WhatsApp floating button em todas as páginas
- [ ] Responsive images (srcset) nos hero images
- [ ] Pre-rendering de blog posts (scripts/generate-blog-html.js)

### Content Deliverables
- [ ] 8 cornerstone blog posts (2,000+ palavras cada)
- [ ] 4 procedure explanation videos (3-5 min cada)
- [ ] YouTube channel setup + SEO
- [ ] Social media clips (Instagram Reels)

### Documentation
- [ ] Sprint 3 status tracking (atualizar este documento semanalmente)
- [ ] Content calendar para blog (Semanas 3-8)
- [ ] Video production schedule
- [ ] Revenue impact tracking spreadsheet

---

## 🔄 Próximos Passos (Pós Sprint 3)

Após completar Sprint 3 (100% do Top 20), focar em:

1. **Itens de baixa prioridade:**
   - #12: Collect 10-15 Patient Testimonials
   - #13: "1-Hour Minimum" Headlines

2. **Sustentação:**
   - Blog: 2-3 posts/mês ongoing
   - Vídeos: 1 novo vídeo/trimestre
   - A/B testing de CTAs e headlines

3. **Novos projetos:**
   - Google Ads optimization (ROAS improvement)
   - Email marketing automation
   - Retargeting campaigns

---

**Próxima Ação:** Definir prioridade de execução com o cliente e iniciar Semana 1 (Quick Wins Técnicos).
