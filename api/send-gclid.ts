import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { gclid, gbraid, wbraid, page, timestamp, source } = req.body || {};

  // iPhone: o clique de anúncio pode chegar só com gbraid/wbraid (sem gclid).
  if (!gclid && !gbraid && !wbraid) {
    return res.status(400).json({ error: 'gclid, gbraid or wbraid is required' });
  }

  // Rede de segurança contra tráfego de desenvolvimento (ata #78, 27/07/2026).
  // A guarda no Base.astro é a defesa principal, mas bundle em cache no
  // navegador de alguém pode continuar postando daqui a semanas — e esta rota
  // escreve em gc_gclid_clicks, que é a atribuição de campanha de produção.
  // Falha ABERTA de propósito: só recusa quando a origem é comprovadamente
  // dev/preview. Sem cabeçalho, deixa passar — perder atribuição real é pior
  // do que aceitar um evento duvidoso.
  const origem = String(req.headers.origin || req.headers.referer || '');
  const ehDevOuPreview = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0|192\.168\.|10\.)/i.test(origem)
    || /\.vercel\.app/i.test(origem);
  if (ehDevOuPreview) {
    console.warn('[send-gclid] recusado: origem de dev/preview', origem);
    return res.status(202).json({ success: true, ignored: 'non_production_origin' });
  }

  // Obfuscated webhook endpoint retrieved securely from server-side environment variables
  // Fallback to the current Supabase function URL to maintain continuity if env vars aren't set
  const destinationWebhook = 
    process.env.N8N_GCLID_WEBHOOK || 
    process.env.SUPABASE_GCLID_WEBHOOK || 
    'https://oqszkriirsodegxpfazz.supabase.co/functions/v1/gc-gclid-track';

  const webhookData = {
    gclid: gclid || null,
    gbraid: gbraid || null,
    wbraid: wbraid || null,
    page: page || '',
    timestamp: timestamp || new Date().toISOString(),
    source: source || 'direct'
  };

  try {
    const response = await fetch(destinationWebhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const errorText = await response.text();
      console.error('❌ Proxy target returned error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `Proxy target error: ${response.status}`,
        details: errorText 
      });
    }
  } catch (error: any) {
    console.error('❌ Server-side proxy error:', error);
    return res.status(500).json({ 
      error: 'Internal server error in GCLID proxy function', 
      details: error.message 
    });
  }
}
