// about-fullbleed-v2.cjs — 3 opcoes melhores p/ o hero Sobre (sem texto no rosto)
const fs=require('fs');const path=require('path');const sharp=require('sharp');
const ROOT=path.resolve(__dirname,'..');
const SRC=path.join(ROOT,'drafts','fotos-ensaio','RIT08572.jpg');
const OUT=path.join(ROOT,'drafts','hero-reals','_about-v2.png');
const PURPLE='#381F47',GOLD='#B3955F',GOLD2='#C9A95f',BEIGE='#E4DBCA',SUB='#5C5647',EY='#8A7444';

async function region(left,top,width,height,W,H){
  const m=await sharp(SRC).rotate().metadata();
  const buf=await sharp(SRC).rotate().extract({left:Math.round(m.width*left),top:Math.round(m.height*top),width:Math.round(m.width*width),height:Math.round(m.height*height)}).toBuffer();
  return (await sharp(buf).resize(W,H,{fit:'cover',position:'top'}).modulate({brightness:1.02,saturation:1.04}).jpeg({quality:84}).toBuffer()).toString('base64');
}
async function coverFull(W,H,pos){
  return (await sharp(SRC).rotate().resize(W,H,{fit:'cover',position:pos||'top'}).modulate({brightness:1.02,saturation:1.04}).jpeg({quality:84}).toBuffer()).toString('base64');
}
function txt(x,y,o={}){
  const a=o.align||'start';
  return `<text x="${x}" y="${y}" text-anchor="${a}" font-family="'Segoe UI',Arial,sans-serif" font-size="12.5" letter-spacing="2.4" font-weight="600" fill="${EY}">ESPECIALISTA EM PRÓTESE E IMPLANTODONTIA · CRO-RJ 27.509</text>
  <text x="${x}" y="${y+50}" text-anchor="${a}" font-family="Georgia,serif" font-size="40" font-weight="600" fill="${PURPLE}">Dra. Carla Christoph</text>
  <text x="${x}" y="${y+92}" text-anchor="${a}" font-family="Georgia,serif" font-size="40" font-weight="600" fill="${GOLD2}">dentista especialista em Ipanema</text>
  <text x="${x}" y="${y+130}" text-anchor="${a}" font-family="'Segoe UI',Arial,sans-serif" font-size="15" fill="${SUB}">Mais de 20 anos dedicados à reabilitação oral e estética dental.</text>`;
}
function cta(x,y,a){const w=210;const cx=a==='middle'?x-w/2:x;return `<rect x="${cx}" y="${y}" width="${w}" height="52" rx="9" fill="${GOLD}"/><text x="${cx+w/2}" y="${y+32}" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="600" fill="#fff">Agendar consulta</text>`;}

(async()=>{
  const W=1440;
  // ---- A: MAGAZINE (titulo no bege em cima + foto full-width embaixo, sem overlay) ----
  const Aimg=await region(0,0.05,1,0.62,W,560);
  const Ah=200,A=`<rect x="0" y="0" width="${W}" height="${Ah+560}" fill="#FAF8F3"/>
    ${txt(W/2,70,{align:'middle'})}
    ${cta(W/2,150,'middle')}
    <image href="data:image/jpeg;base64,${Aimg}" x="0" y="${Ah}" width="${W}" height="560"/>`;
  const Aheight=Ah+560;

  // ---- B: HALF-BLEED (foto da Dra. a esquerda full-height + texto a direita no bege) ----
  const Bh=620, pw=Math.round(W*0.5);
  const Bimg=await region(0.03,0.05,0.46,0.93,pw,Bh);
  const B=`<rect x="0" y="0" width="${W}" height="${Bh}" fill="${BEIGE}"/>
    <image href="data:image/jpeg;base64,${Bimg}" x="0" y="0" width="${pw}" height="${Bh}"/>
    ${txt(pw+56,Bh/2-90)}
    ${cta(pw+56,Bh/2+70,'start')}`;

  // ---- C: FULL-BLEED com titulo CENTRADO no topo (sobre parede lisa) + scrim suave ----
  const Ch=680, Cimg=await coverFull(W,Ch,'top');
  const C=`<defs><linearGradient id="scC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E4DBCA" stop-opacity="0.96"/><stop offset="0.28" stop-color="#E4DBCA" stop-opacity="0.55"/><stop offset="0.46" stop-color="#E4DBCA" stop-opacity="0"/></linearGradient></defs>
    <image href="data:image/jpeg;base64,${Cimg}" x="0" y="0" width="${W}" height="${Ch}"/>
    <rect x="0" y="0" width="${W}" height="${Ch}" fill="url(#scC)"/>
    ${txt(W/2,86,{align:'middle'})}`;

  const gap=58,top=92;
  const TH=top+Aheight+gap+Bh+gap+Ch+30;
  const lbl=(y,t)=>`<text x="20" y="${y}" font-family="'Segoe UI',Arial,sans-serif" font-size="14" font-weight="700" fill="#1c6b3a">${t}</text>`;
  let y=top;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${TH}" viewBox="0 0 ${W} ${TH}">
    <rect width="${W}" height="${TH}" fill="#FAF8F3"/>
    <text x="${W/2}" y="40" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="21" font-weight="700" fill="#381F47">Sobre — 3 opções melhores (texto nunca sobre o rosto)</text>
    ${lbl(y-12,'A · Revista — título em cima, foto full-width embaixo')}
    <g transform="translate(0,${y})"><clipPath id="ca"><rect x="0" y="0" width="${W}" height="${Aheight}" rx="14"/></clipPath><g clip-path="url(#ca)">${A}</g></g>
    ${(y+=Aheight+gap,lbl(y-12,'B · Half-bleed — foto da Dra. à esquerda, texto à direita'))}
    <g transform="translate(0,${y})"><clipPath id="cb"><rect x="0" y="0" width="${W}" height="${Bh}" rx="14"/></clipPath><g clip-path="url(#cb)">${B}</g></g>
    ${(y+=Bh+gap,lbl(y-12,'C · Full-bleed — título centrado no topo (parede lisa) + véu suave'))}
    <g transform="translate(0,${y})"><clipPath id="cc"><rect x="0" y="0" width="${W}" height="${Ch}" rx="14"/></clipPath><g clip-path="url(#cc)">${C}</g></g>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(OUT);
  console.log('OK →',path.relative(ROOT,OUT));
})();
