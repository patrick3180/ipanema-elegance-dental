const fs = require('fs');
const path = require('path');

const metaTagsMap = {
  '/': {
    title: 'Dentista em Ipanema | Clínica Odontológica Dra. Carla Christoph',
    description: 'Procurando dentista em Ipanema? A Dra. Carla Christoph oferece odontologia estética e reabilitação oral com atendimento personalizado. Agende sua consulta!',
    ogImage: 'https://dracarlachristoph.com/lovable-uploads/doutora-em-pe-jaleco.webp',
    canonical: 'https://dracarlachristoph.com/'
  },
  '/sobre': {
    title: 'Sobre Dra. Carla Christoph | Dentista Especialista em Ipanema',
    description: 'Conheça a Dra. Carla Christoph, dentista especialista em Ipanema com mais de 20 anos de experiência em prótese dental, implantes e reabilitação oral estética.',
    ogImage: 'https://dracarlachristoph.com/lovable-uploads/b1c1cbdb-bde0-4d9e-912e-74cf74cf716d.png',
    canonical: 'https://dracarlachristoph.com/sobre'
  },
  '/servicos': {
    title: 'Tratamentos Odontológicos em Ipanema | Dra. Carla Christoph',
    description: 'Conheça todos os tratamentos odontológicos oferecidos pela Dra. Carla Christoph em Ipanema: implantes, clareamento, lentes de contato dental, próteses e mais.',
    ogImage: 'https://dracarlachristoph.com/lovable-uploads/doutora-em-pe-jaleco.webp',
    canonical: 'https://dracarlachristoph.com/servicos'
  },
  '/clareamento-dental': {
    title: 'Clareamento Dental em Ipanema | Dra. Carla Christoph',
    description: 'Clareamento dental profissional em Ipanema com a Dra. Carla Christoph. Técnicas seguras para um sorriso mais branco. CRO-RJ 27.509. Agende sua avaliação!',
    ogImage: 'https://dracarlachristoph.com/lovable-uploads/doutora-em-pe-jaleco.webp',
    canonical: 'https://dracarlachristoph.com/clareamento-dental'
  },
  '/implantes-dentarios': {
    title: 'Implantes Dentários em Ipanema | Dra. Carla Christoph',
    description: 'Implantes dentários em Ipanema com planejamento digital 3D e técnicas minimamente invasivas. Mais de 20 anos de experiência em reabilitação oral. CRO-RJ 27.509.',
    ogImage: 'https://dracarlachristoph.com/lovable-uploads/Implante unitario.webp',
    canonical: 'https://dracarlachristoph.com/implantes-dentarios'
  },
  '/lentes-de-contato-dental-e-facetas-de-resina': {
    title: 'Lentes de Contato Dental e Facetas em Ipanema | Dra. Carla Christoph',
    description: 'Lentes de contato dental e facetas de resina em Ipanema. Transforme seu sorriso com a Dra. Carla Christoph. Resultados naturais e duradouros. Agende!',
    ogImage: 'https://dracarlachristoph.com/lovable-uploads/doutora-em-pe-jaleco.webp',
    canonical: 'https://dracarlachristoph.com/lentes-de-contato-dental-e-facetas-de-resina'
  },
  '/protese-dentaria': {
    title: 'Prótese Dentária em Ipanema | Dra. Carla Christoph',
    description: 'Prótese dentária fixa e removível em Ipanema. Especialista em reabilitação oral com mais de 20 anos de experiência. Dra. Carla Christoph. CRO-RJ 27.509.',
    ogImage: 'https://dracarlachristoph.com/lovable-uploads/doutora-em-pe-jaleco.webp',
    canonical: 'https://dracarlachristoph.com/protese-dentaria'
  },
  '/restauracoes-esteticas': {
    title: 'Restaurações Estéticas em Ipanema | Dra. Carla Christoph',
    description: 'Restaurações estéticas em resina e porcelana em Ipanema. Resultados naturais que devolvem a beleza do seu sorriso. Dra. Carla Christoph. Agende!',
    ogImage: 'https://dracarlachristoph.com/lovable-uploads/doutora-em-pe-jaleco.webp',
    canonical: 'https://dracarlachristoph.com/restauracoes-esteticas'
  },
  '/tratamento-de-canal': {
    title: 'Tratamento de Canal em Ipanema | Dra. Carla Christoph',
    description: 'Tratamento de canal (endodontia) em Ipanema sem dor. Técnicas modernas e atendimento humanizado. Dra. Carla Christoph. CRO-RJ 27.509.',
    ogImage: 'https://dracarlachristoph.com/lovable-uploads/doutora-em-pe-jaleco.webp',
    canonical: 'https://dracarlachristoph.com/tratamento-de-canal'
  },
  '/clinica-geral-e-prevencao': {
    title: 'Clínica Geral e Prevenção em Ipanema | Dra. Carla Christoph',
    description: 'Clínica geral odontológica e prevenção em Ipanema. Check-up dental, limpeza profissional e cuidados preventivos. Dra. Carla Christoph. Agende!',
    ogImage: 'https://dracarlachristoph.com/lovable-uploads/doutora-em-pe-jaleco.webp',
    canonical: 'https://dracarlachristoph.com/clinica-geral-e-prevencao'
  },
  '/saude-da-gengiva': {
    title: 'Tratamento de Gengiva em Ipanema | Dra. Carla Christoph',
    description: 'Tratamento periodontal e saúde da gengiva em Ipanema. Prevenção e tratamento de gengivite e periodontite. Dra. Carla Christoph. CRO-RJ 27.509.',
    ogImage: 'https://dracarlachristoph.com/lovable-uploads/doutora-em-pe-jaleco.webp',
    canonical: 'https://dracarlachristoph.com/saude-da-gengiva'
  },
  '/ortodontia': {
    title: 'Ortodontia em Ipanema | Dr. Bruno Neves & Dra. Carla Christoph',
    description: 'Ortodontia especializada em Ipanema com Dr. Bruno Neves (Doutor em Ortodontia - UERJ) e Dra. Carla Christoph. Aparelhos fixos, estéticos e alinhadores.',
    ogImage: 'https://dracarlachristoph.com/lovable-uploads/doutora-em-pe-jaleco.webp',
    canonical: 'https://dracarlachristoph.com/ortodontia'
  },
  '/blog': {
    title: 'Blog Dra. Carla Christoph | Dicas de Saúde Bucal em Ipanema',
    description: 'Acesse o blog de odontologia da Dra. Carla Christoph. Encontre dicas de saúde bucal, artigos informativos e novidades para o seu sorriso.',
    ogImage: 'https://dracarlachristoph.com/lovable-uploads/doutora-em-pe-jaleco.webp',
    canonical: 'https://dracarlachristoph.com/blog'
  },
  '/contato': {
    title: 'Contato | Dra. Carla Christoph - Dentista em Ipanema',
    description: 'Entre em contato com a Dra. Carla Christoph. Consultório em Ipanema, Rio de Janeiro. Agende sua consulta pelo WhatsApp. Atendimento personalizado.',
    ogImage: 'https://dracarlachristoph.com/lovable-uploads/doutora-em-pe-jaleco.webp',
    canonical: 'https://dracarlachristoph.com/contato'
  }
};

const DEFAULT_OG_IMAGE = 'https://dracarlachristoph.com/lovable-uploads/doutora-em-pe-jaleco.webp';

module.exports = async function handler(req, res) {
  try {
    const url = new URL(req.url, `https://${req.headers.host}`);
    let pathname = url.pathname;

    // Remove trailing slash (except for /)
    if (pathname !== '/' && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }

    const meta = metaTagsMap[pathname] || metaTagsMap['/'];
    const ogImage = meta.ogImage || DEFAULT_OG_IMAGE;
    const isLandingPage = pathname.startsWith('/lp/') || pathname === '/lp';

    // Read the built index.html
    const indexPath = path.join(process.cwd(), 'dist', 'index.html');
    let html = fs.readFileSync(indexPath, 'utf-8');

    // Replace <title>
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);

    // Replace meta description
    html = html.replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${meta.description}" />`
    );

    // Remove existing OG, Twitter, and canonical tags to avoid duplicates
    html = html.replace(/<meta property="og:[^"]*" content="[^"]*"\s*\/?>\s*/g, '');
    html = html.replace(/<meta name="twitter:[^"]*" content="[^"]*"\s*\/?>\s*/g, '');
    html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>\s*/g, '');

    // Build new meta tags block
    let metaBlock = `
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:url" content="${meta.canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:site_name" content="Dra. Carla Christoph - Dentista em Ipanema" />
    <meta property="og:locale" content="pt_BR" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${ogImage}" />
    <link rel="canonical" href="${meta.canonical}" />`;

    // Add noindex for landing pages
    if (isLandingPage) {
      metaBlock += `\n    <meta name="robots" content="noindex, nofollow" />`;
    }

    // Inject before </head>
    html = html.replace('</head>', `${metaBlock}\n  </head>`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(html);
  } catch (error) {
    // Fallback: serve original index.html
    try {
      const indexPath = path.join(process.cwd(), 'dist', 'index.html');
      const html = fs.readFileSync(indexPath, 'utf-8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.status(200).send(html);
    } catch (fallbackError) {
      res.status(500).send('Internal Server Error');
    }
  }
};
