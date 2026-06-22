// hero-nivelB.cjs — Teste "Nível B": retrabalha o FUNDO e a COR da foto real da Dra.
// para integrá-la à paleta da marca, mantendo a PESSOA idêntica.
// Image-to-image via Gemini 2.5 Flash Image (Nano Banana).
//
// Uso: node scripts/hero-nivelB.cjs
// Saída: drafts/hero-nivelB/variant-*.png

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'public', 'lovable-uploads', '729cc6a8-3563-45af-9e82-3581b91c7d7e.png');
const OUT_DIR = path.join(ROOT, 'drafts', 'hero-nivelB');
const GEMINI_MODEL = 'gemini-2.5-flash-image';

// --- carrega GEMINI_API_KEY do Blog/.env ---
function loadKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const envPath = path.join(ROOT, 'Blog', '.env');
  const txt = fs.readFileSync(envPath, 'utf8');
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^\s*GEMINI_API_KEY\s*=\s*(.+?)\s*$/);
    if (m) return m[1].replace(/^["']|["']$/g, '');
  }
  throw new Error('GEMINI_API_KEY não encontrada');
}

function postJson(host, urlPath, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request({
      hostname: host, path: urlPath, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) },
    }, (res) => {
      let buf = '';
      res.on('data', c => buf += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(buf)); } catch { resolve(buf); }
        } else reject(new Error(`${res.statusCode}: ${buf.slice(0, 600)}`));
      });
    });
    req.on('error', reject);
    req.write(data); req.end();
  });
}

async function editImage(key, base64In, mimeIn, prompt) {
  const body = {
    contents: [{
      role: 'user',
      parts: [
        { inlineData: { mimeType: mimeIn, data: base64In } },
        { text: prompt },
      ],
    }],
    generationConfig: { responseModalities: ['IMAGE'] },
  };
  const resp = await postJson(
    'generativelanguage.googleapis.com',
    `/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(key)}`,
    body
  );
  const parts = resp?.candidates?.[0]?.content?.parts || [];
  const imgPart = parts.find(p => p.inlineData || p.inline_data);
  if (!imgPart) {
    const reason = resp?.promptFeedback?.blockReason || resp?.candidates?.[0]?.finishReason || 'NO_IMAGE';
    throw new Error(`sem imagem: ${reason} :: ${JSON.stringify(resp).slice(0, 400)}`);
  }
  const inline = imgPart.inlineData || imgPart.inline_data;
  return { mimeType: inline.mimeType || inline.mime_type || 'image/png', buffer: Buffer.from(inline.data, 'base64') };
}

// Trava de identidade — repetida em todas as variações
const KEEP = `CRITICAL — DO NOT CHANGE THE WOMAN. Keep her face, facial features, skin, expression, exact smile, teeth, hair and white lab coat EXACTLY as in the source photo — same identity, same pose (arms crossed), same proportions. Do not beautify, slim, retouch the skin, whiten the teeth, or alter age. This is a real dentist; her appearance must stay authentic and unmodified. No text, no logos, no graphic overlays, no watermark. Vertical portrait, photorealistic, professional studio quality.`;

const VARIANTS = [
  {
    name: 'v1-beige-seamless',
    prompt: `Replace ONLY the plain cream wall background of this portrait with a soft, seamless warm-beige studio backdrop in the tone #CFCBB4 to #FAF7F2, with a very gentle top-to-bottom gradient and a soft natural shadow behind her. The new background must feel continuous and elegant — like a high-end editorial studio — so the portrait blends naturally into a warm beige website. Subtly harmonize the overall color grade toward warm beige and soft natural light; keep skin tones natural and realistic. ${KEEP}`,
  },
  {
    name: 'v2-plum-ambience',
    prompt: `Replace ONLY the plain cream wall background of this portrait with a refined, understated studio backdrop that transitions from a warm beige (#CFCBB4) on one side into a soft, deep muted plum/aubergine shadow (#381F47) on the opposite side, with cinematic but gentle directional lighting and a subtle warm golden rim of light. Luxury, quiet, editorial mood — not flashy. Harmonize the color grade so the image feels cohesive and premium. Keep skin tones natural. ${KEEP}`,
  },
  {
    name: 'v3-clinic-bokeh',
    prompt: `Replace ONLY the plain cream wall background of this portrait with a tastefully blurred, out-of-focus interior of an upscale, minimalist dental consultory in Ipanema — warm neutral tones, soft natural window light, hints of refined architecture and warm wood, strong bokeh so nothing is distracting. The subject stays in sharp focus, clearly separated from the soft background, like a real environmental editorial portrait. Natural, cohesive color grade in warm neutral tones. Keep skin tones natural. ${KEEP}`,
  },
];

(async () => {
  const key = loadKey();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let srcBuf = fs.readFileSync(SRC);
  let mimeIn = 'image/png';
  // tenta reduzir p/ ~1024 de largura via sharp (mais rápido); fallback p/ original
  try {
    const sharp = require('sharp');
    const meta = await sharp(srcBuf).metadata();
    console.log(`origem: ${meta.width}x${meta.height} (${(srcBuf.length/1024).toFixed(0)} KB)`);
    srcBuf = await sharp(srcBuf).resize({ width: 1024, withoutEnlargement: true }).png().toBuffer();
    console.log(`enviando: redimensionada p/ 1024w (${(srcBuf.length/1024).toFixed(0)} KB)`);
  } catch (e) {
    console.log('sharp indisponível, usando original:', e.message);
  }
  const base64In = srcBuf.toString('base64');

  for (const v of VARIANTS) {
    process.stdout.write(`→ ${v.name} ... `);
    try {
      const r = await editImage(key, base64In, mimeIn, v.prompt);
      const fp = path.join(OUT_DIR, `${v.name}.png`);
      fs.writeFileSync(fp, r.buffer);
      console.log(`OK (${(r.buffer.length/1024).toFixed(0)} KB) → ${path.relative(ROOT, fp)}`);
    } catch (e) {
      console.log(`FALHOU: ${e.message}`);
    }
  }
  console.log('\nConcluído. Arquivos em', path.relative(ROOT, OUT_DIR));
})();
