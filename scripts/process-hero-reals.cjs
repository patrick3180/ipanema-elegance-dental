// process-hero-reals.cjs — crop 2:3 (foco automatico na figura) + retoque leve
// nas fotos reais candidatas a hero. Gera previa para escolha.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const IN = path.join(ROOT, 'drafts', 'fotos-ensaio');
const OUT = path.join(ROOT, 'drafts', 'hero-reals');
fs.mkdirSync(OUT, { recursive: true });

const CANDS = [
  { file: 'RIT08461.jpg', label: 'NATURAL A · RIT08461' },
  { file: 'RIT08406.jpg', label: 'NATURAL B · RIT08406' },
  { file: 'RIT08644.jpg', label: 'RECEPCAO A · RIT08644' },
  { file: 'RIT08572.jpg', label: 'RECEPCAO B · RIT08572' },
];

async function crop(file) {
  return sharp(path.join(IN, file))
    .rotate()
    .resize(800, 1200, { fit: 'cover', position: sharp.strategy.attention })
    .modulate({ brightness: 1.03, saturation: 1.05 })   // retoque leve
    .sharpen({ sigma: 0.6 })
    .toBuffer();
}

(async () => {
  const thumbs = [];
  for (const c of CANDS) {
    const buf = await crop(c.file);
    const fp = path.join(OUT, c.file.replace('.jpg', '-crop.jpg'));
    await sharp(buf).jpeg({ quality: 88 }).toFile(fp);
    thumbs.push({ buf, label: c.label });
    console.log('✓', path.relative(ROOT, fp));
  }

  // montagem 4 col p/ revisao
  const cw = 360, ch = 540, pad = 12, labelH = 26;
  const W = CANDS.length * cw + (CANDS.length + 1) * pad;
  const H = ch + labelH + 2 * pad;
  const comps = [];
  const labels = [];
  for (let i = 0; i < thumbs.length; i++) {
    const left = pad + i * (cw + pad);
    const t = await sharp(thumbs[i].buf).resize(cw, ch, { fit: 'cover' }).toBuffer();
    comps.push({ input: t, left, top: pad });
    labels.push(`<rect x="${left}" y="${pad + ch}" width="${cw}" height="${labelH}" fill="#381F47"/>
      <text x="${left + cw / 2}" y="${pad + ch + 18}" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="13" fill="#fff">${thumbs[i].label}</text>`);
  }
  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${labels.join('')}</svg>`);
  await sharp({ create: { width: W, height: H, channels: 3, background: { r: 250, g: 248, b: 243 } } })
    .composite([...comps, { input: overlay, left: 0, top: 0 }]).png()
    .toFile(path.join(OUT, '_preview-crops.png'));
  console.log('OK → drafts/hero-reals/_preview-crops.png');
})();
