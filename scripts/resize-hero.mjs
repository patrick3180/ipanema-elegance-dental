import sharp from 'sharp';

const src = 'public/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.png';
const out = 'public/lovable-uploads';

const sizes = [
    { w: 560, h: 840 },
    { w: 800, h: 1200 },
    { w: 840, h: 1260 },
];

for (const s of sizes) {
    await sharp(src)
        .resize(s.w, s.h)
        .avif({ quality: 60 })
        .toFile(`${out}/hero-${s.w}w.avif`);
    console.log(`✓ hero-${s.w}w.avif`);

    await sharp(src)
        .resize(s.w, s.h)
        .webp({ quality: 75 })
        .toFile(`${out}/hero-${s.w}w.webp`);
    console.log(`✓ hero-${s.w}w.webp`);
}

console.log('Done!');
