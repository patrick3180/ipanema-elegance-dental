import type { NextRequest } from 'next/server';

const BASE_URL = 'https://dracarlachristoph.com';

const metaTagsMap: Record<string, { title: string; description: string; ogImage?: string; canonical: string }> = {
  '/': {
    title: 'Dentista em Ipanema | Clínica Odontológica Dra. Carla Christoph',
    description: 'Procurando dentista em Ipanema? A Dra. Carla Christoph oferece odontologia estética e reabilitação oral com atendimento personalizado. Agende sua consulta!',
    ogImage: '/lovable-uploads/doutora-em-pe-jaleco.webp',
    canonical: 'https://dracarlachristoph.com/'
  },
  '/sobre': {
    title: 'Sobre Dra. Carla Christoph | Dentista Especialista em Ipanema',
    description: 'Conheça a Dra. Carla Christoph, dentista especialista em Ipanema com mais de 20 anos de experiência em prótese dental, implantes e reabilitação oral estética.',
    ogImage: '/lovable-uploads/b1c1cbdb-bde0-4d9e-912e-74cf74cf716d.png',
    canonical: 'https://dracarlachristoph.com/sobre'
  },
  '/servicos': {
    title: 'Tratamentos Odontológicos em Ipanema | Dra. Carla Christoph',
    description: 'Conheça todos os tratamentos odontológicos oferecidos pela Dra. Carla Christoph em Ipanema: implantes, clareamento, lentes de contato dental, próteses e mais.',
    canonical: 'https://dracarlachristoph.com/servicos'
  },
  '/clareamento-dental': {
    title: 'Clareamento Dental em Ipanema | Dra. Carla Christoph',
    description: 'Clareamento dental profissional em Ipanema com a Dra. Carla Christoph. Técnicas seguras para um sorriso mais branco. CRO-RJ 27.509. Agende sua avaliação!',
    canonical: 'https://dracarlachristoph.com/clareamento-dental'
  },
  '/implantes-dentarios': {
    title: 'Implantes Dentários em Ipanema | Dra. Carla Christoph',
    description: 'Implantes dentários em Ipanema com planejamento digital 3D e técnicas minimamente invasivas. Mais de 20 anos de experiência em reabilitação oral. CRO-RJ 27.509.',
    ogImage: '/lovable-uploads/Implante unitario.webp',
    canonical: 'https://dracarlachristoph.com/implantes-dentarios'
  },
  '/lentes-de-contato-dental-e-facetas-de-resina': {
    title: 'Lentes de Contato Dental e Facetas em Ipanema | Dra. Carla Christoph',
    description: 'Lentes de contato dental e facetas de resina em Ipanema. Transforme seu sorriso com a Dra. Carla Christoph. Resultados naturais e duradouros. Agende!',
    canonical: 'https://dracarlachristoph.com/lentes-de-contato-dental-e-facetas-de-resina'
  },
  '/protese-dentaria': {
    title: 'Prótese Dentária em Ipanema | Dra. Carla Christoph',
    description: 'Prótese dentária fixa e removível em Ipanema. Especialista em reabilitação oral com mais de 20 anos de experiência. Dra. Carla Christoph. CRO-RJ 27.509.',
    canonical: 'https://dracarlachristoph.com/protese-dentaria'
  },
  '/restauracoes-esteticas': {
    title: 'Restaurações Estéticas em Ipanema | Dra. Carla Christoph',
    description: 'Restaurações estéticas em resina e porcelana em Ipanema. Resultados naturais que devolvem a beleza do seu sorriso. Dra. Carla Christoph. Agende!',
    canonical: 'https://dracarlachristoph.com/restauracoes-esteticas'
  },
  '/tratamento-de-canal': {
    title: 'Tratamento de Canal em Ipanema | Dra. Carla Christoph',
    description: 'Tratamento de canal (endodontia) em Ipanema sem dor. Técnicas modernas e atendimento humanizado. Dra. Carla Christoph. CRO-RJ 27.509.',
    canonical: 'https://dracarlachristoph.com/tratamento-de-canal'
  },
  '/clinica-geral-e-prevencao': {
    title: 'Clínica Geral e Prevenção em Ipanema | Dra. Carla Christoph',
    description: 'Clínica geral odontológica e prevenção em Ipanema. Check-up dental, limpeza profissional e cuidados preventivos. Dra. Carla Christoph. Agende!',
    canonical: 'https://dracarlachristoph.com/clinica-geral-e-prevencao'
  },
  '/saude-da-gengiva': {
    title: 'Tratamento de Gengiva em Ipanema | Dra. Carla Christoph',
    description: 'Tratamento periodontal e saúde da gengiva em Ipanema. Prevenção e tratamento de gengivite e periodontite. Dra. Carla Christoph. CRO-RJ 27.509.',
    canonical: 'https://dracarlachristoph.com/saude-da-gengiva'
  },
  '/ortodontia': {
    title: 'Ortodontia em Ipanema | Dr. Bruno Neves & Dra. Carla Christoph',
    description: 'Ortodontia especializada em Ipanema com Dr. Bruno Neves (Doutor em Ortodontia - UERJ) e Dra. Carla Christoph. Aparelhos fixos, estéticos e alinhadores.',
    canonical: 'https://dracarlachristoph.com/ortodontia'
  },
  '/blog': {
    title: 'Blog Dra. Carla Christoph | Dicas de Saúde Bucal em Ipanema',
    description: 'Acesse o blog de odontologia da Dra. Carla Christoph. Encontre dicas de saúde bucal, artigos informativos e novidades para o seu sorriso.',
    canonical: 'https://dracarlachristoph.com/blog'
  },
  '/contato': {
    title: 'Contato | Dra. Carla Christoph - Dentista em Ipanema',
    description: 'Entre em contato com a Dra. Carla Christoph. Consultório em Ipanema, Rio de Janeiro. Agende sua consulta pelo WhatsApp. Atendimento personalizado.',
    canonical: 'https://dracarlachristoph.com/contato'
  },
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Let the request continue to get the original response (index.html)
  const response = await fetch(request.url);
  const contentType = response.headers.get('content-type') || '';
  
  // Only process HTML responses
  if (!contentType.includes('text/html')) {
    return response;
  }

  let html = await response.text();
  
  // Determine meta tags for this route
  const meta = metaTagsMap[pathname] || metaTagsMap['/'];
  const isLandingPage = pathname.startsWith('/lp/') || pathname.startsWith('/lp');
  
  const ogImageUrl = meta.ogImage 
    ? `${BASE_URL}${meta.ogImage}` 
    : `${BASE_URL}/lovable-uploads/doutora-em-pe-jaleco.webp`;

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${meta.title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${meta.description}" />`
  );

  // Replace or add og:title
  if (html.includes('og:title')) {
    html = html.replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${meta.title}" />`
    );
  } else {
    html = html.replace('</head>', `<meta property="og:title" content="${meta.title}" />\n</head>`);
  }

  // Replace or add og:description
  if (html.includes('og:description')) {
    html = html.replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${meta.description}" />`
    );
  } else {
    html = html.replace('</head>', `<meta property="og:description" content="${meta.description}" />\n</head>`);
  }

  // Add og:url
  if (html.includes('og:url')) {
    html = html.replace(
      /<meta property="og:url" content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${meta.canonical}" />`
    );
  } else {
    html = html.replace('</head>', `<meta property="og:url" content="${meta.canonical}" />\n</head>`);
  }

  // Add og:image
  if (html.includes('og:image')) {
    html = html.replace(
      /<meta property="og:image" content="[^"]*"\s*\/?>/,
      `<meta property="og:image" content="${ogImageUrl}" />`
    );
  } else {
    html = html.replace('</head>', `<meta property="og:image" content="${ogImageUrl}" />\n</head>`);
  }

  // Add canonical link
  if (html.includes('rel="canonical"')) {
    html = html.replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${meta.canonical}" />`
    );
  } else {
    html = html.replace('</head>', `<link rel="canonical" href="${meta.canonical}" />\n</head>`);
  }

  // Add noindex for landing pages
  if (isLandingPage) {
    if (html.includes('name="robots"')) {
      html = html.replace(
        /<meta name="robots" content="[^"]*"\s*\/?>/,
        `<meta name="robots" content="noindex, nofollow" />`
      );
    } else {
      html = html.replace('</head>', `<meta name="robots" content="noindex, nofollow" />\n</head>`);
    }
  }

  return new Response(html, {
    status: response.status,
    headers: {
      ...Object.fromEntries(response.headers.entries()),
      'content-type': 'text/html; charset=utf-8',
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - Static assets (images, fonts, scripts, styles)
     * - API routes
     */
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|woff|woff2|ttf|eot|map|txt|xml)$|api/).*)',
  ],
};
