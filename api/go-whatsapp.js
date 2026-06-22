import crypto from 'node:crypto';

// ════════════════════════════════════════════════════════════════════════════
// /go/whatsapp — redirect INVISÍVEL com captura de atribuição (Instagram → Sofia)
// Spec: "Agencia de MKT/relatorios/spec-rotas-site-atribuicao-2026-06-22.md"
//
// Fluxo:
//   1. Gera click_id (uuid v4)
//   2. Coleta utm_*, ref, assunto, referrer, user_agent, ip_hash (LGPD: SHA-256)
//   3. Grava em Supabase (attribution_clicks) — primária via PostgREST,
//      fallback via Edge Function attribution-capture
//   4. Seta cookie cc_click_id (costura sessões no próprio site)
//   5. Monta wa.me com mensagem pré-preenchida (SEM "Ref:" — limpo p/ paciente)
//   6. HTTP 302 → WhatsApp/Sofia
//
// A gravação NUNCA bloqueia o redirect: há orçamento de tempo máximo; passou disso,
// redireciona mesmo assim.
// ════════════════════════════════════════════════════════════════════════════

const WHATSAPP_NUMBER = '5521993304045';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 dias
const WRITE_BUDGET_MS = 1500;             // tempo máx. de espera por caminho de escrita

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://oqszkriirsodegxpfazz.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const IP_SALT = process.env.ATTRIBUTION_IP_SALT || 'cc-attr-v1';

function firstParam(value) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function clean(value, maxLen) {
  const v = firstParam(value);
  if (typeof v !== 'string') return null;
  const trimmed = v.replace(/[\r\n]+/g, ' ').trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLen);
}

// "assunto" entra na mensagem visível ao paciente → sanitização mais rígida.
function cleanAssunto(value) {
  const v = clean(value, 40);
  if (!v) return null;
  // Apenas letras (com acento), números, espaços e hífen — evita qualquer ruído na copy.
  const safe = v.replace(/[^\p{L}\p{N}\s-]/gu, '').trim();
  return safe || null;
}

function hashIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  const raw = (Array.isArray(fwd) ? fwd[0] : fwd || '').split(',')[0].trim();
  if (!raw) return null;
  return crypto.createHash('sha256').update(IP_SALT + raw).digest('hex');
}

function buildMessage(assunto) {
  if (assunto) {
    return `Olá! Vi o conteúdo sobre ${assunto} no Instagram e gostaria de solicitar uma consulta com a Dra. Carla.`;
  }
  return 'Olá! Vi a página no Instagram e gostaria de solicitar uma consulta com a Dra. Carla.';
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((resolve) => setTimeout(() => resolve({ ok: false, timeout: true }), ms)),
  ]);
}

// Caminho PRIMÁRIO: insert direto via PostgREST usando service_role da Vercel.
async function insertPrimary(row) {
  if (!SERVICE_ROLE_KEY) return { ok: false, reason: 'no-service-key' };
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/attribution_clicks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        Prefer: 'return=minimal,resolution=ignore-duplicates',
      },
      body: JSON.stringify(row),
    });
    if (res.ok) return { ok: true };
    return { ok: false, reason: `status-${res.status}` };
  } catch (err) {
    return { ok: false, reason: err?.message || 'fetch-error' };
  }
}

// Caminho FALLBACK: Edge Function (usa service_role interna do projeto p/ gravar,
// independente das envs da Vercel). Autentica com a service role key — a function
// exige role === 'service_role' (verify_jwt=true), então anon key é rejeitada.
async function insertFallback(row) {
  if (!SERVICE_ROLE_KEY) return { ok: false, reason: 'no-service-key' };
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/attribution-capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify(row),
    });
    if (res.ok) return { ok: true };
    return { ok: false, reason: `status-${res.status}` };
  } catch (err) {
    return { ok: false, reason: err?.message || 'fetch-error' };
  }
}

export default async function handler(req, res) {
  const q = req.query || {};

  const clickId = crypto.randomUUID();
  const assunto = cleanAssunto(q.assunto ?? q.topic);

  const row = {
    click_id: clickId,
    ref: clean(q.ref, 120),
    utm_source: clean(q.utm_source, 120),
    utm_medium: clean(q.utm_medium, 120),
    utm_campaign: clean(q.utm_campaign, 200),
    utm_content: clean(q.utm_content, 200),
    assunto: assunto,
    referrer: clean(req.headers['referer'] || req.headers['referrer'], 500),
    user_agent: clean(req.headers['user-agent'], 500),
    ip_hash: hashIp(req),
  };

  // ── Gravação com orçamento de tempo (nunca bloqueia o redirect) ──
  const started = Date.now();
  try {
    let result = await withTimeout(insertPrimary(row), WRITE_BUDGET_MS);
    if (!result.ok) {
      const remaining = WRITE_BUDGET_MS - (Date.now() - started);
      if (remaining > 200) {
        result = await withTimeout(insertFallback(row), remaining);
      }
      if (!result.ok) {
        console.error('[go-whatsapp] captura falhou em ambos os caminhos:', {
          click_id: clickId,
          reason: result.reason,
        });
      }
    }
  } catch (err) {
    console.error('[go-whatsapp] erro inesperado na captura:', err?.message);
  }

  // ── Cookie para costurar a sessão caso a pessoa navegue no site ──
  res.setHeader(
    'Set-Cookie',
    `cc_click_id=${clickId}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`
  );

  // ── Monta destino WhatsApp e redireciona ──
  const message = buildMessage(assunto);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.statusCode = 302;
  res.setHeader('Location', waUrl);
  res.end();
}
