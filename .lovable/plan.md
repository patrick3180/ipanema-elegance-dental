

## Prompt 16 — Criar Pagina 404 e Corrigir Catch-All

### Resumo
3 alteracoes: criar `NotFoundPage.tsx` com design consistente e tracking, adicionar rota `/gone` para GonePage, e substituir o catch-all no App.tsx.

---

### Alteracao 1: Criar `src/pages/NotFoundPage.tsx`

Pagina 404 nova, seguindo o design system do site (inspirada no GonePage.tsx).

**Estrutura:**
- SEOHead com `noIndex={true}`
- `useEffect` que chama `seoMonitor.logNotFound(window.location.pathname)` ao montar
- `handleWhatsAppClick` async com tracking completo (GTM dataLayer + Google Ads conversion `AW-16894364517/OQZvCMXV0foZEOqP7vY9` + `sendGCLIDToWebhook('404_page_button')`)
- Icone `Search` (lucide) grande, cor `dental-gold`
- H1: "Pagina Nao Encontrada" (heading-lg, dental-purple)
- Paragrafo 1: "O endereco que voce digitou nao existe ou foi movido."
- Paragrafo 2: "Mas estamos aqui para ajudar. Veja algumas opcoes:"
- 3 botoes em `flex flex-col sm:flex-row gap-4`:
  1. "Pagina Inicial" — link para `/`, `bg-dental-gold text-white`, icone `ArrowLeft`
  2. "Ver Tratamentos" — link para `/servicos`, `outline border-dental-purple text-dental-purple`
  3. "Falar no WhatsApp" — `onClick={handleWhatsAppClick}`, `bg-green-600 text-white`, icone `MessageCircle`

**O arquivo antigo `src/pages/NotFound.tsx` sera removido** (nunca e importado em nenhum lugar).

---

### Alteracao 2: Adicionar rota `/gone` no App.tsx

Atualmente o middleware (`redirectMiddleware.ts`) faz `window.history.replaceState(null, '', '/gone')` para URLs 410, mas NAO existe uma rota `/gone` no App.tsx — o que significa que URLs marcadas como "gone" caem no catch-all e sao redirecionadas para home (comportamento incorreto).

**Adicionar:**
- Lazy import: `const GonePage = lazy(() => import("./pages/GonePage"));`
- Rota ANTES do catch-all: `<Route path="/gone" element={<GonePage />} />`

---

### Alteracao 3: Substituir catch-all no App.tsx

**De:**
```
<Route path="*" element={<Navigate to="/" replace />} />
```

**Para:**
```
<Route path="*" element={<NotFoundPage />} />
```

**Adicionar lazy import:**
```
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
```

NAO alterar nenhuma outra rota.

---

### Arquivos modificados (total: 3)
1. `src/pages/NotFoundPage.tsx` — novo arquivo (pagina 404 com tracking)
2. `src/App.tsx` — 2 lazy imports novos (NotFoundPage, GonePage), rota `/gone`, catch-all atualizado
3. `src/pages/NotFound.tsx` — removido (arquivo legado, nunca usado)

### O que NAO muda
- Landing pages, configs, componentes ConsultaInicial*
- Service pages
- `urlRedirects.ts`, `redirectMiddleware.ts`, `seoMonitoring.ts`, `404ErrorHandler.ts`
- `GonePage.tsx` (conteudo intacto, apenas ganha rota)
- Tracking existente (GTM, Google Ads, GCLID)
- Nenhuma rota existente alterada (apenas catch-all)
