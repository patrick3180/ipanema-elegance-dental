const fs = require('fs');
const path = require('path');

// Mapa de meta tags por rota
const routes = {
  '/sobre': {
    title: 'Sobre Dra. Carla Christoph | Dentista Especialista em Ipanema',
    description: 'Conheça a Dra. Carla Christoph, dentista especialista em Ipanema com mais de 20 anos de experiência em prótese dental, implantes e reabilitação oral estética.',
  },
  '/servicos': {
    title: 'Tratamentos Odontológicos em Ipanema | Dra. Carla Christoph',
    description: 'Conheça todos os tratamentos odontológicos oferecidos pela Dra. Carla Christoph em Ipanema: implantes, clareamento, lentes de contato dental, próteses e mais.',
  },
  '/clareamento-dental': {
    title: 'Clareamento Dental em Ipanema | Dra. Carla Christoph',
    description: 'Clareamento dental profissional em Ipanema com a Dra. Carla Christoph. Técnicas seguras para um sorriso mais branco. CRO-RJ 27.509. Agende sua avaliação!',
  },
  '/implantes-dentarios': {
    title: 'Implantes Dentários em Ipanema | Dra. Carla Christoph',
    description: 'Implantes dentários em Ipanema com planejamento digital 3D e técnicas minimamente invasivas. Mais de 20 anos de experiência. CRO-RJ 27.509.',
  },
  '/lentes-de-contato-dental-e-facetas-de-resina': {
    title: 'Lentes de Contato Dental e Facetas em Ipanema | Dra. Carla Christoph',
    description: 'Lentes de contato dental e facetas de resina em Ipanema. Transforme seu sorriso com a Dra. Carla Christoph. Resultados naturais e duradouros.',
  },
  '/lentes-de-contato-dental-e-facetas-de-porcelana': {
    title: 'Lentes de Contato Dental e Facetas em Ipanema | Dra. Carla Christoph',
    description: 'Lentes de contato dental e facetas em Ipanema. Transforme seu sorriso com a Dra. Carla Christoph. Resultados naturais e duradouros.',
  },
  '/protese-dentaria': {
    title: 'Prótese Dentária em Ipanema | Dra. Carla Christoph',
    description: 'Prótese dentária fixa e removível em Ipanema. Especialista em reabilitação oral com mais de 20 anos de experiência. Dra. Carla Christoph. CRO-RJ 27.509.',
  },
  '/restauracoes-esteticas': {
    title: 'Restaurações Estéticas em Ipanema | Dra. Carla Christoph',
    description: 'Restaurações estéticas em resina e porcelana em Ipanema. Resultados naturais que devolvem a beleza do seu sorriso. Dra. Carla Christoph.',
  },
  '/tratamento-de-canal': {
    title: 'Tratamento de Canal em Ipanema | Dra. Carla Christoph',
    description: 'Tratamento de canal (endodontia) em Ipanema sem dor. Técnicas modernas e atendimento humanizado. Dra. Carla Christoph. CRO-RJ 27.509.',
  },
  '/clinica-geral-e-prevencao': {
    title: 'Clínica Geral e Prevenção em Ipanema | Dra. Carla Christoph',
    description: 'Clínica geral odontológica e prevenção em Ipanema. Check-up dental, limpeza profissional e cuidados preventivos. Dra. Carla Christoph.',
  },
  '/saude-da-gengiva': {
    title: 'Tratamento de Gengiva em Ipanema | Dra. Carla Christoph',
    description: 'Tratamento periodontal e saúde da gengiva em Ipanema. Prevenção e tratamento de gengivite e periodontite. Dra. Carla Christoph. CRO-RJ 27.509.',
  },
  '/ortodontia': {
    title: 'Ortodontia em Ipanema | Dr. Bruno Neves & Dra. Carla Christoph',
    description: 'Ortodontia especializada em Ipanema com Dr. Bruno Neves e Dra. Carla Christoph. Aparelhos fixos, estéticos e alinhadores invisíveis.',
  },
  '/blog': {
    title: 'Blog Dra. Carla Christoph | Dicas de Saúde Bucal em Ipanema',
    description: 'Blog de odontologia da Dra. Carla Christoph. Dicas de saúde bucal, artigos informativos e novidades sobre tratamentos dentários.',
  },
  '/contato': {
    title: 'Contato | Dra. Carla Christoph - Dentista em Ipanema',
    description: 'Entre em contato com a Dra. Carla Christoph. Consultório em Ipanema, Rio de Janeiro. Agende sua consulta pelo WhatsApp.',
  },
  '/diferenciais': {
    title: 'Diferenciais | Dra. Carla Christoph - Dentista em Ipanema',
    description: 'Conheça os diferenciais da Dra. Carla Christoph: mais de 20 anos de experiência, atendimento personalizado e tecnologia de ponta em Ipanema.',
  },
};

// Landing pages - mesmo tratamento mas com noindex
const landingPages = {
  '/lp/limpeza-dental-ipanema': {
    title: 'Limpeza Dental em Ipanema | Dra. Carla Christoph',
    description: 'Agende sua limpeza dental em Ipanema com a Dra. Carla Christoph. Atendimento personalizado e tecnologia de ponta.',
  },
  '/lp/profilaxia-dental-ipanema': {
    title: 'Profilaxia Dental em Ipanema | Dra. Carla Christoph',
    description: 'Profilaxia dental profissional em Ipanema. Prevenção e cuidado com sua saúde bucal. Dra. Carla Christoph.',
  },
  '/lp/estetica-dental-ipanema': {
    title: 'Estética Dental em Ipanema | Dra. Carla Christoph',
    description: 'Tratamentos de estética dental em Ipanema. Transforme seu sorriso com a Dra. Carla Christoph.',
  },
  '/lp/saude-gengival-ipanema': {
    title: 'Saúde Gengival em Ipanema | Dra. Carla Christoph',
    description: 'Tratamento gengival especializado em Ipanema. Cuide da saúde da sua gengiva. Dra. Carla Christoph.',
  },
  '/lp/clareamento-dental': {
    title: 'Clareamento Dental em Ipanema | Dra. Carla Christoph',
    description: 'Clareamento dental profissional em Ipanema. Sorriso mais branco com segurança. Dra. Carla Christoph.',
  },
  '/lp/consulta-inicial': {
    title: 'Consulta Inicial | Dra. Carla Christoph - Dentista em Ipanema',
    description: 'Agende sua primeira consulta com a Dra. Carla Christoph em Ipanema. Avaliação completa e plano de tratamento personalizado.',
  },
  '/lp/ortodontia-ipanema': {
    title: 'Ortodontia em Ipanema | Dr. Bruno Neves & Dra. Carla Christoph',
    description: 'Ortodontia especializada em Ipanema. Aparelhos fixos, estéticos e alinhadores. Dr. Bruno Neves e Dra. Carla Christoph.',
  },
  '/lp/dor-de-dente-urgencia-ipanema': {
    title: 'Dor de Dente Urgência em Ipanema | Dra. Carla Christoph',
    description: 'Atendimento de urgência para dor de dente em Ipanema. Alívio rápido com a Dra. Carla Christoph.',
  },
  '/lp/dente-quebrado-urgencia-ipanema': {
    title: 'Dente Quebrado Urgência em Ipanema | Dra. Carla Christoph',
    description: 'Quebrou um dente? Atendimento de urgência em Ipanema com a Dra. Carla Christoph.',
  },
  '/lp/emergencia-odontologica-ipanema': {
    title: 'Emergência Odontológica em Ipanema | Dra. Carla Christoph',
    description: 'Emergência odontológica em Ipanema. Atendimento rápido e humanizado. Dra. Carla Christoph.',
  },
  '/lp/especialista-protese-ipanema': {
    title: 'Especialista em Prótese Dentária em Ipanema | Dra. Carla Christoph',
    description: 'Especialista em prótese dentária em Ipanema. Mais de 20 anos de experiência em reabilitação oral. Dra. Carla Christoph.',
  },
  '/lp/implantes-dentarios-ipanema': {
    title: 'Implantes Dentários em Ipanema | Dra. Carla Christoph',
    description: 'Implantes dentários em Ipanema com tecnologia de ponta. Reabilitação oral especializada. Dra. Carla Christoph.',
  },
  '/lp/lentes-porcelana-ipanema': {
    title: 'Lentes de Porcelana em Ipanema | Dra. Carla Christoph',
    description: 'Lentes de porcelana e facetas em Ipanema. Sorriso perfeito e natural. Dra. Carla Christoph.',
  },
};

const distDir = path.join(__dirname, '..', 'dist');
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

function generatePage(routePath, meta, noindex = false) {
  let html = indexHtml;
  
  const baseUrl = 'https://dracarlachristoph.com';
  const fullUrl = baseUrl + routePath;
  const ogImage = baseUrl + '/lovable-uploads/doutora-em-pe-jaleco.webp';
  
  // Replace title
  html = html.replace(
    /<title>.*?<\/title>/,
    '<title>' + meta.title + '</title>'
  );
  
  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    '<meta name="description" content="' + meta.description + '"'
  );
  
  // Replace existing OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    '<meta property="og:title" content="' + meta.title + '" />'
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    '<meta property="og:description" content="' + meta.description + '" />'
  );
  
  // Add additional meta tags before </head>
  const extraTags = [
    '<meta property="og:url" content="' + fullUrl + '" />',
    '<meta property="og:image" content="' + ogImage + '" />',
    '<meta property="og:site_name" content="Dra. Carla Christoph" />',
    '<meta property="og:locale" content="pt_BR" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:title" content="' + meta.title + '" />',
    '<meta name="twitter:description" content="' + meta.description + '" />',
    '<meta name="twitter:image" content="' + ogImage + '" />',
    '<link rel="canonical" href="' + fullUrl + '" />',
  ];
  
  if (noindex) {
    extraTags.push('<meta name="robots" content="noindex, nofollow" />');
  }
  
  html = html.replace('</head>', '    ' + extraTags.join('\n    ') + '\n  </head>');
  
  return html;
}

// Generate static HTML for each route
let count = 0;

// Regular pages
for (const [routePath, meta] of Object.entries(routes)) {
  const filePath = path.join(distDir, routePath + '.html');
  const fileDir = path.dirname(filePath);
  fs.mkdirSync(fileDir, { recursive: true });
  fs.writeFileSync(filePath, generatePage(routePath, meta));
  count++;
  console.log('Generated: ' + routePath + '.html');
}

// Landing pages (with noindex)
for (const [routePath, meta] of Object.entries(landingPages)) {
  const filePath = path.join(distDir, routePath + '.html');
  const fileDir = path.dirname(filePath);
  fs.mkdirSync(fileDir, { recursive: true });
  fs.writeFileSync(filePath, generatePage(routePath, meta, true));
  count++;
  console.log('Generated (noindex): ' + routePath + '.html');
}

console.log('\nDone! Generated ' + count + ' static HTML files with correct meta tags.');
