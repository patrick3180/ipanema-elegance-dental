# 🔧 Plano de Manutenção — Site Dra. Carla Christoph

**Data:** 19/Mar/2026
**Projeto:** `ipanema-elegance-dental`
**Baseado em:** Auditoria GA4 + GSC + verificação de URLs

---

## Resumo dos Problemas

| # | Problema | Severidade | Arquivos |
|---|----------|:----------:|----------|
| 1 | 7 URLs retornando 404 no GSC | 🔴 | [vercel.json](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/vercel.json) |
| 2 | `/about` no sitemap (URL inexistente) | 🔴 | [sitemapGeneratorOptimized.ts](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/src/utils/sitemapGeneratorOptimized.ts) |
| 3 | FAQPage duplicado (10 entidades) | 🟡 | GSC → Iniciar validação |
| 4 | LPs com baixa conversão WA | 🟡 | Auditoria de CTA |

---

## ✅ TAREFA 1 — Corrigir 404s com Redirects no [vercel.json](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/vercel.json)

> [!IMPORTANT]
> O [vercel.json](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/vercel.json) precisa de redirects **server-side** (301) porque o SPA retorna status 200 para qualquer URL (soft 404). O Google não reconhece o React `<NotFoundPage>` como um 404 real.

### Arquivo: [vercel.json](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/vercel.json)

Adicionar ao array `"redirects"` (linhas 9-15):

```diff
  "redirects": [
    {
      "source": "/lp/profilaxia-dental-ipanema",
      "destination": "/lp/limpeza-dental-ipanema",
      "statusCode": 301
-   }
+   },
+   {
+     "source": "/about",
+     "destination": "/sobre",
+     "statusCode": 301
+   },
+   {
+     "source": "/lentes-de-contato-dental-e-facetas",
+     "destination": "/lentes-de-contato-dental-e-facetas-de-resina",
+     "statusCode": 301
+   },
+   {
+     "source": "/2025/:path*",
+     "destination": "/blog",
+     "statusCode": 301
+   },
+   {
+     "source": "/blog/protese-dentaria-historia",
+     "destination": "/protese-dentaria",
+     "statusCode": 301
+   },
+   {
+     "source": "/blog/saude-bucal-carie-dentista",
+     "destination": "/clinica-geral-e-prevencao",
+     "statusCode": 301
+   },
+   {
+     "source": "/blog/saude-bucal-higiene-antiga-romana",
+     "destination": "/blog",
+     "statusCode": 301
+   },
+   {
+     "source": "/blog/odontologia-egito-antigo",
+     "destination": "/blog",
+     "statusCode": 301
+   }
  ],
```

### Por que cada redirect:

| URL com 404 | Redirect para | Motivo |
|-------------|--------------|--------|
| `/about` | `/sobre` | Slug antigo em inglês, a página existe como `/sobre` |
| `/lentes-de-contato-dental-e-facetas` | `/lentes-de-contato-dental-e-facetas-de-resina` | URL incompleta, falta o sufixo `-de-resina` |
| `/2025/05/05/dente-tubarao-sem-carie/` | `/blog` | URL estilo WordPress antigo, post deletado |
| `/blog/protese-dentaria-historia` | `/protese-dentaria` | Blog post deletado → redirecionar para a service page relevante |
| `/blog/saude-bucal-carie-dentista` | `/clinica-geral-e-prevencao` | Blog post deletado → redirecionar para service page |
| `/blog/saude-bucal-higiene-antiga-romana` | `/blog` | Blog post deletado, sem page equivalente |
| `/blog/odontologia-egito-antigo` | `/blog` | Blog post deletado, sem page equivalente |

---

## ✅ TAREFA 2 — Remover `/about` do Sitemap

O sitemap gera `<loc>https://dracarlachristoph.com/about</loc>` que é uma URL inexistente.

### Arquivo: [sitemapGeneratorOptimized.ts](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/src/utils/sitemapGeneratorOptimized.ts#L143)

**Linha 143** — trocar `/about` por `/sobre`:

```diff
-   <loc>https://dracarlachristoph.com/about</loc>
+   <loc>https://dracarlachristoph.com/sobre</loc>
```

---

## ✅ TAREFA 3 — FAQPage: Solicitar Revalidação no GSC

> [!NOTE]
> O fix no [generate-static-meta.cjs](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/scripts/generate-static-meta.cjs) **já foi aplicado** (linhas 588-591 têm o comentário). As 10 entidades inválidas no GSC são de 5 páginas (cada uma conta 2x). O erro é "cached" do Google — precisa apenas solicitar revalidação.

**As 5 páginas afetadas** (do screenshot):
1. `/clareamento-dental`
2. `/protese-dentaria`
3. `/ortodontia`
4. `/clinica-geral-e-prevencao`
5. `/implantes-dentarios`

**Ação manual no GSC:**
1. Ir em **Melhorias → Perguntas frequentes → "O campo FAQPage está duplicado"**
2. Clicar em **"Validar correção"**
3. O Google levará ~14-28 dias para revalidar

> [!WARNING]
> **Possível duplicação residual nas LPs com FAQ:** Os componentes [ClareamentoFAQ.tsx](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/src/components/landing/clareamento/ClareamentoFAQ.tsx), [ConsultaInicialFAQ.tsx](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/src/components/landing/consulta/ConsultaInicialFAQ.tsx), [LimpezaDentalFAQ.tsx](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/src/components/landing/limpeza/LimpezaDentalFAQ.tsx) e [FAQSection.tsx](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/src/components/landing/FAQSection.tsx) também geram [FAQPage](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/scripts/generate-static-meta.cjs#69-81) schemas. Se alguma delas estiver em uma página institucional E na LP ao mesmo tempo, pode gerar duplicação. No entanto, como as LPs têm `noindex`, o Google não deveria rastrear — então isso provavelmente não é o problema atual.

---

## ✅ TAREFA 4 — Verificação Pós-Deploy

Após fazer deploy das tarefas 1 e 2:

### Testar redirects (no terminal)
```bash
curl -I https://dracarlachristoph.com/about
# Esperado: 301 → /sobre

curl -I https://dracarlachristoph.com/lentes-de-contato-dental-e-facetas
# Esperado: 301 → /lentes-de-contato-dental-e-facetas-de-resina

curl -I https://dracarlachristoph.com/blog/protese-dentaria-historia
# Esperado: 301 → /protese-dentaria

curl -I https://dracarlachristoph.com/2025/05/05/dente-tubarao-sem-carie/
# Esperado: 301 → /blog
```

### No Google Search Console
1. Solicitar inspeção das 7 URLs corrigidas (uma por uma)
2. Iniciar validação do FAQPage (Tarefa 3)
3. Agendar revisão em 14 dias para confirmar que erros foram resolvidos

---

## 📊 Status dos Issues Anteriores

| Issue | Status | Nota |
|-------|:------:|------|
| Core Web Vitals mobile | ✅ **RESOLVIDO** | 37 URLs adequadas (verde) após reanálise |
| FAQPage no [generate-static-meta.cjs](file:///c:/Users/patri/Meu%20Drive/02-Patrick/IA/VS/Teste%20site%20Carla/ipanema-elegance-dental/scripts/generate-static-meta.cjs) | ✅ **CORRIGIDO** | Já removido no Sprint anterior |
| CPC desktop | ✅ **MELHOROU** | Conv. desktop 10,8% → 15,9% |
| Migração Home → LPs | ✅ **FUNCIONANDO** | LP Consulta Inicial 29,4% conv. |
| LP Emergência | ✅ **EXCELENTE** | 47,1% conv. WA 🔥 |
| Tráfego orgânico -74% | 🟡 **MONITORAR** | Provavelmente causado pelo CWV ruim (fev-mar). Agora que CWV está verde, deve recuperar em 2-3 semanas |
| LP Clareamento (6% conv.) | ⚠️ **PENDENTE** | Auditar CTA — scroll rate é 62% mas ninguém clica WA |
| LP Implantes (2,4% conv.) | ⚠️ **PENDENTE** | Auditar CTA e botão WA sticky |
| LP Prótese (caiu 20,8% → 7,4%) | ⚠️ **MONITORAR** | Diluição por volume — mais tráfego com menos qualificação |
