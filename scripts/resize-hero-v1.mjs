import sharp from 'sharp';

// Fonte: variação V1 (Nível B) — fundo bege contínuo na paleta da marca
const src = 'drafts/hero-nivelB/v1-beige-seamless.png';
const out = 'public/lovable-uploads';

const sizes = [
  { w: 560, h: 840 },
  { w: 800, h: 1200 },
  { w: 840, h: 1260 },
];

for (const s of sizes) {
  await sharp(src).resize(s.w, s.h, { fit: 'cover' }).avif({ quality: 60 }).toFile(`${out}/hero-v1-${s.w}w.avif`);
  console.log(`✓ hero-v1-${s.w}w.avif`);
  await sharp(src).resize(s.w, s.h, { fit: 'cover' }).webp({ quality: 75 }).toFile(`${out}/hero-v1-${s.w}w.webp`);
  console.log(`✓ hero-v1-${s.w}w.webp`);
}

// PNG fallback (full)
await sharp(src).png({ quality: 90 }).toFile(`${out}/hero-v1.png`);
console.log('✓ hero-v1.png');
console.log('Done!');
