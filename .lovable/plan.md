

## Corrigir Tracking: GTM, Conversoes e Limpeza

### Resumo
O GTM esta sendo carregado de multiplos lugares (index.html, GTMManager, AsyncScriptManager, useEffect em landing pages), causando duplicacao e potencial perda de conversoes. O delay de 8s no index.html e excessivo. O formulario de contato nao rastreia conversoes do Google Ads. E uma landing page usa sessionStorage para GCLID em vez de localStorage.

---

### PARTE 1 -- Reduzir delay do GTM (index.html)

Substituir o bloco com `setTimeout(..., 8000)` por carregamento com delay de 2s OU primeira interacao (mousedown/touchstart/scroll/keydown).

---

### PARTE 2 -- Remover carregamento duplicado do GTM

#### a) GTMManager.tsx -- retornar null
O componente e usado em 7 landing pages: Ortodontia, ConsultaInicial, Clareamento, Implantes, Limpeza, DorDeDente, DenteQuebrado, Emergencia. Fazer o componente retornar `null` sem remover os imports (seguro).

#### b) LazyScriptLoader.tsx -- pass-through
Nao e usado em nenhum lugar (so definido). Fazer retornar `<>{children}</>`.

#### c) AsyncScriptManager.tsx -- retornar null
Usado em 3 landing pages: Profilaxia (sem props de GTM, ja retorna null), Clareamento (com enableTracking=true), Implantes (com enableTracking=true). Fazer retornar `null`.

#### d) Remover carregamento de scripts GTM via useEffect em 10 landing pages

Manter os pushes de `window.dataLayer` (page_view events). Remover APENAS o codigo que cria `<script>` tags e listeners de interacao para GTM/gtag.

| Landing Page | Linhas do useEffect com script GTM |
|---|---|
| DorDeDenteLandingPage.tsx | L59-91 (loadGTM + listeners) |
| DenteQuebradoLandingPage.tsx | L59-91 (loadGTM + listeners) |
| EmergenciaOdontologicaLandingPage.tsx | L59-91 (loadGTM + listeners) |
| LimpezaDentalLandingPage.tsx | L73-105 (loadGTM + listeners) |
| EspecialistaProteseLandingPage.tsx | L58-84 (deferGTM + listeners) |
| EsteticaSorrisoLandingPage.tsx | L52-83 (loadGTM + listeners) |
| LentesDeContatoPorcelanaLandingPage.tsx | L57-92 (loadGTM + listeners) |
| LentesDeContatoEmPorcelanaProfissionalLandingPage.tsx | L61-100 (loadGTM + listeners) |
| SaudeGengivalLandingPage.tsx | L60-93 (gtmScript + listeners) |
| ProfilaxiaLandingPage.tsx | L64-97 (useEffect script) + L164-173 (Helmet inline script) + L210 (noscript iframe) |
| OrtodontiaLandingPage.tsx | L40-80 (gtag config + listeners -- NAO cria script tag, apenas configura gtag; remover listeners e gtag config, manter dataLayer push) |
| ConsultaInicialLandingPage.tsx | L40-80 (mesmo padrao que Ortodontia -- remover gtag config + listeners, manter dataLayer push) |

---

### PARTE 3 -- Conversao Ads no formulario de contato (ContactSection.tsx)

Adicionar tracking de conversao Google Ads dentro do bloco `if (response.ok)`, apos o push do dataLayer e antes do toast de sucesso:

```text
if (window.gtag) {
  window.gtag('event', 'conversion', {
    'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
    'event_callback': function() {
      console.log('Google Ads conversion tracked - Contact Form Submit');
    }
  });
}
```

---

### PARTE 4 -- GCLID: sessionStorage para localStorage

No arquivo `LentesDeContatoEmPorcelanaProfissionalLandingPage.tsx` (unico que usa sessionStorage), substituir:
```text
sessionStorage.setItem('gclid', gclid);
```
Por:
```text
localStorage.setItem('gclid', gclid);
localStorage.setItem('gclid_timestamp', Date.now().toString());
localStorage.setItem('gclid_page', window.location.pathname);
```

---

### Resumo de arquivos alterados

| Arquivo | Mudanca |
|---|---|
| index.html | GTM delay 8s para 2s + interacao |
| GTMManager.tsx | return null |
| LazyScriptLoader.tsx | pass-through |
| AsyncScriptManager.tsx | return null |
| ContactSection.tsx | Ads conversion tracking |
| LentesDeContatoEmPorcelanaProfissionalLandingPage.tsx | sessionStorage para localStorage + remover GTM script |
| DorDeDenteLandingPage.tsx | Remover GTM script creation |
| DenteQuebradoLandingPage.tsx | Remover GTM script creation |
| EmergenciaOdontologicaLandingPage.tsx | Remover GTM script creation |
| LimpezaDentalLandingPage.tsx | Remover GTM script creation |
| EspecialistaProteseLandingPage.tsx | Remover GTM script creation |
| EsteticaSorrisoLandingPage.tsx | Remover GTM script creation |
| LentesDeContatoPorcelanaLandingPage.tsx | Remover GTM script creation |
| SaudeGengivalLandingPage.tsx | Remover GTM script creation |
| ProfilaxiaLandingPage.tsx | Remover GTM script creation + Helmet inline script + noscript |
| OrtodontiaLandingPage.tsx | Remover gtag config + listeners |
| ConsultaInicialLandingPage.tsx | Remover gtag config + listeners |

### O que NAO muda
- Container ID GTM-WZRDNBKQ
- Conversion action AW-16894364517/OQZvCMXV0foZEOqP7vY9
- Logica de GCLID em src/utils/gclid.ts
- Webhook de GCLID
- window.dataLayer pushes (page_view events preservados)
- vercel.json
- Nenhum componente visual ou de layout

### Risco
Baixo-medio. Altera carregamento de scripts mas nao muda logica de negocio. O GTM passara a ser carregado exclusivamente pelo index.html.

