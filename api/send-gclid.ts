import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { gclid, page, timestamp, source } = req.body || {};

  if (!gclid) {
    return res.status(400).json({ error: 'GCLID is required' });
  }

  // Obfuscated webhook endpoint retrieved securely from server-side environment variables
  // Fallback to the current Supabase function URL to maintain continuity if env vars aren't set
  const destinationWebhook = 
    process.env.N8N_GCLID_WEBHOOK || 
    process.env.SUPABASE_GCLID_WEBHOOK || 
    'https://oqszkriirsodegxpfazz.supabase.co/functions/v1/gc-gclid-track';

  const webhookData = {
    gclid,
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
