# TRACKING.md — Conversões, Analytics e Atribuição

**Site:** https://dracarlachristoph.com  
**Última atualização:** Fevereiro 2026  
**Uso:** Documentação completa do pipeline de rastreamento. Este é o coração da operação de marketing — qualquer alteração deve preservar a integridade do tracking.

---

## 1. IDs de Referência

| Serviço | ID | Uso |
|---------|-----|-----|
| Google Tag Manager | `GTM-WZRDNBKQ` | Container principal de tags |
| Google Ads Account | `AW-16894364517` | Conta de Google Ads |
| Google Ads Conversion | `AW-16894364517/OQZvCMXV0foZEOqP7vY9` | Evento de conversão (WhatsApp click / form submit) |
| GA4 | Configurado dentro do GTM | Analytics geral |
| WhatsApp Business | `5521993304045` | Número do consultório |

---

## 2. Google Tag Manager (GTM)

### Carregamento

GTM é carregado **exclusivamente** via `index.html`, com strategy de delay para performance:

```javascript
// Em index.html — carrega após 2s OU na primeira interação do usuário
var timer = setTimeout(loadGTM, 2000);
['mousedown','touchstart','scroll','keydown'].forEach(function(evt){
  d.addEventListener(evt, function handler(){
    clearTimeout(timer);
    loadGTM();
    // remove listeners após primeiro trigger
  }, {passive:true, once:true});
});
```

**Histórico:** GTM era carregado em múltiplos lugares (GTMManager.tsx, LazyScriptLoader.tsx, AsyncScriptManager.tsx, e 13 landing pages). Foi unificado para `index.html` apenas na Fase 1 da auditoria. O delay foi reduzido de 8s para 2s.

### Container GTM — Tags Ativas

| Tag | Tipo | Trigger |
|-----|------|---------|
| GA4 Configuration | GA4 | All Pages |
| Agendar Tratamento | GA4 Event | Custom Event `agendar_tratamento` |
| Chat Online | GA4 Event | Custom Event `chat_online` |
| WhatsApp Click | GA4 Event | Custom Event `whatsapp_click` |

---

## 3. Google Ads Conversion Tracking

### Evento de Conversão

Toda ação de conversão dispara o mesmo evento:

```javascript
window.gtag('event', 'conversion', {
  'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
  'event_callback': function() {
    console.log('Google Ads conversion tracked');
  }
});
```

### Pontos de Conversão Existentes

| Ponto | Tipo | Localização | dataLayer Event |
|-------|------|-------------|----------------|
| WhatsApp CTA (hero) | Click | Service pages, LPs | `whatsapp_click` |
| WhatsApp CTA (final) | Click | Service pages, LPs | `whatsapp_click` |
| Floating WhatsApp | Click | LPs (mobile) | `whatsapp_click` |
| WhatsApp Widget | Click | Homepage, service pages | `whatsapp_click` |

Cada ponto de conversão também:
1. Dispara `window.dataLayer.push(...)` com metadados da campanha
2. Dispara `window.gtag('event', 'conversion', ...)` para Google Ads
3. Chama `sendGCLIDToWebhook(label)` para enviar o GCLID ao backend

---

## 4. GCLID — Pipeline de Atribuição Offline

Este é o sistema mais crítico do tracking. Permite atribuir faturamento real (offline) aos cliques de Google Ads.

### Fluxo Completo

```
1. Usuário clica no anúncio Google Ads
   → URL contém ?gclid=XXXXX

2. Captura no frontend (src/utils/gclid.ts)
   → captureGCLID() salva em localStorage

3. Usuário clica no WhatsApp (qualquer CTA)
   → sendGCLIDToWebhook(label) é chamado

4. Frontend envia para webhook N8N
   → POST com { gclid, source, timestamp, url }

5. N8N processa e salva no Supabase
   → Tabela de conversões com GCLID + metadados

6. A cada 15 dias, Patrick faz upload manual
   → Exporta do Supabase o faturamento por GCLID
   → Faz upload como Offline Conversion no Google Ads

7. Google Ads usa o GCLID para atribuir a conversão
   → Otimiza campanhas com base no valor real
```

### Implementação Frontend

**Arquivo:** `src/utils/gclid.ts`

**`captureGCLID()`:**
- Executada no `useEffect` de cada LP e service page
- Extrai `gclid` da query string da URL
- Salva em `localStorage` (padronizado — antes uma LP usava `sessionStorage`)

**`sendGCLIDToWebhook(source: string)`:**
- Chamada em cada handler de click de WhatsApp
- Recupera o GCLID do localStorage
- Envia POST para webhook N8N com payload:
  ```json
  {
    "gclid": "...",
    "source": "hero_cta_button_consulta",
    "timestamp": "2026-02-12T...",
    "url": "https://dracarlachristoph.com/lp/consulta-inicial"
  }
  ```
- O `source` label identifica qual CTA específico foi clicado

### Labels de Source Existentes

| Label | Contexto |
|-------|----------|
| `hero_cta_button_consulta` | CTA do hero em LP de consulta |
| `final_cta_{campaign}` | CTA final de qualquer LP |
| `landing_page_floating_whatsapp_{campaign}` | Floating WhatsApp em LP |
| `lp_lentes_porcelana_cta` | CTA hero em LP de lentes |
| (outros padrões similares) | Cada LP/CTA tem label único |

### Armazenamento

- **N8N Webhook** → processa o payload
- **Supabase** → armazena em tabela de conversões
- **Upload manual** → Patrick exporta e faz upload ao Google Ads a cada 15 dias

---

## 5. dataLayer Events

Todos os eventos são enviados via `window.dataLayer.push()` para o GTM processar:

### Evento: `whatsapp_click`

```javascript
window.dataLayer.push({
  event: 'whatsapp_click',
  event_category: 'Contact',
  event_action: 'Click',
  event_label: 'Hero CTA - Consulta Inicial',  // varia por contexto
  campaign: config.campaign,                     // só em LPs
  ad_group: messageMatch.adGroup,                // só em LPs
  keyword: messageMatch.keyword,                 // só em LPs
  message_match: 'hero_cta'                      // tipo do CTA
});
```

### Evento: `page_view` (LPs)

```javascript
window.dataLayer.push({
  event: 'page_view',
  page_title: 'LP Lentes Porcelana Ipanema',
  page_location: window.location.href,
  campaign: config.campaign
});
```

### Data Attributes GTM

Botões de WhatsApp também incluem `data-gtm-*` attributes para tracking via GTM click triggers:

```html
data-gtm-category="Contact"
data-gtm-action="Click"
data-gtm-label="floating-whatsapp-{campaign}"
data-gtm-ad-group="{messageMatch.adGroup}"
data-gtm-keyword="{messageMatch.keyword}"
data-gtm-message-match="floating_whatsapp"
```

---

## 6. Message Match — Google Ads → Landing Page

Cada landing page tem configuração de `messageMatch` que conecta a LP à campanha/grupo de anúncios:

| Landing Page | `campaign` | `adGroup` | `keyword` |
|-------------|-----------|-----------|-----------|
| Consulta Inicial | `consulta-inicial-premium` | `consulta-premium-ipanema` | `dentista ipanema` |
| Limpeza Dental | `limpeza-dental-premium` | `limpeza-dental-ipanema` | `limpeza dental ipanema` |
| Lentes Porcelana (acolhedor) | `Pesquisa - Lentes de Contato - Zona Sul` | `Lentes de contato em porcelana` | `lentes de contato dental` |
| Lentes Porcelana (profissional) | `lentes-porcelana-profissional-ipanema` | `Lentes de contato em porcelana` | `lentes de contato dental porcelana` |
| Estética Dental | `Pesquisa - Lentes de Contato - Zona Sul` | `Lentes de Contato` | `estetica dental` |
| Clareamento | `clareamento-dental-premium` | (ver config) | (ver config) |

---

## 7. Formulário de Contato (Estado Atual)

| Aspecto | Detalhe |
|---------|---------|
| Status | ❌ **Removido** — WhatsApp é o canal único |
| Implementação anterior | `api/contact.js` → Web3Forms → `contato@dracarlachristoph.com` |
| Tracking anterior | Disparava conversão Google Ads no submit |

**Decisão:** Formulário de contato foi removido. WhatsApp é suficiente como canal de conversão.

---

## 8. Regras de Segurança para Tracking

1. **GTM só carrega via `index.html`** — nunca adicionar carregamento de GTM em componentes React
2. **GCLID usa localStorage** — nunca sessionStorage (uma LP usava e foi corrigido)
3. **Toda ação de WhatsApp deve:**
   - Disparar `dataLayer.push` com evento `whatsapp_click`
   - Disparar `gtag('event', 'conversion', ...)` com o conversion ID correto
   - Chamar `sendGCLIDToWebhook()` com label descritivo
4. **Conversion ID nunca muda** sem atualizar em todos os pontos de conversão
5. **Novos CTAs** devem seguir o padrão existente — copiar um handler existente e ajustar o label
6. **Delay do GTM é de 2 segundos** — não aumentar sem justificativa (reduzido de 8s por perda de conversões)
