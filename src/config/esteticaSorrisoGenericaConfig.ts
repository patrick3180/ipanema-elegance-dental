import { LandingPageConfig } from "@/types/LandingPageConfig";

export const esteticaSorrisoGenericaConfig: LandingPageConfig = {
  campaign: 'Pesquisa - Lentes de Contato - Zona Sul',

  messageMatch: {
    adGroup: 'Lentes de Contato',
    keyword: 'estetica dental'
  },

  whatsapp: {
    number: '5521993304045',
    message: 'Olá! Vi o site e gostaria de agendar uma consulta para avaliar e melhorar meu sorriso.'
  },

  hero: {
    headline: 'Não Sabe se Precisa de Lentes, Clareamento ou Facetas? Descubra na Consulta',
    subheadline: 'Clareamento, lentes, restaurações, facetas. A Dra. Carla Christoph avalia o caso completo e indica o caminho mais adequado para o resultado que você busca.',
    ctaText: 'Agendar Consulta Estética',
    backgroundImage: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp'
  },

  benefits: [
    'Visão integrada de estética dental',
    'Test Drive do Sorriso disponível',
    'WhatsApp 24h',
    '20+ anos em estética dental'
  ],

  problem: {
    title: 'Quer Melhorar Seu Sorriso mas Não Sabe por Onde Começar?',
    description: 'Lentes, clareamento, restauração, faceta — com tantas opções, é normal ficar em dúvida. A consulta estética serve justamente para isso: entender o que faz sentido para o seu caso.',
    problems: [
      'Insatisfação com a cor dos dentes — amarelados ou manchados.',
      'Dentes com formato irregular, lascados ou desalinhados.',
      'Restaurações antigas escurecidas que destoam do sorriso.',
      'Vontade de melhorar mas receio de ficar artificial.',
      'Já pesquisou sobre vários tratamentos e não sabe qual é indicado.',
      'Quer uma opinião profissional antes de tomar qualquer decisão.'
    ]
  },

  guide: {
    title: 'Como a Dra. Carla Christoph Avalia Seu Caso',
    subtitle: 'Especialista em Prótese Dentária com mais de 20 anos em estética dental.',
    steps: [
      { number: '1', title: 'Conversa e Análise', description: 'Entendemos o que te incomoda e o que você espera. Analisamos dentes, gengiva e harmonia facial.' },
      { number: '2', title: 'Diagnóstico das Opções', description: 'Apresentamos as possibilidades — clareamento, lentes, restaurações, facetas — com prós e contras de cada uma para o seu caso.' },
      { number: '3', title: 'Simulação quando indicado', description: 'Em casos de lentes e facetas, o Test Drive do Sorriso permite que você visualize o resultado antes de começar.' },
      { number: '4', title: 'Você Decide o Caminho', description: 'Sem pressão. Você sai da consulta com informação clara para tomar a decisão no seu tempo.' }
    ]
  },

  socialProof: {
    title: 'O Que Nossos Pacientes Contam',
    testimonials: [
      { name: 'Marina P. — Ipanema', text: 'Queria mudar meu sorriso mas não sabia se era caso de lentes ou clareamento. A Dra. Carla avaliou e indicou clareamento + 4 restaurações. Ficou natural e bonito.' },
      { name: 'Fernanda G. — Leblon', text: 'Achava que precisava de lentes em todos os dentes. Na consulta, ela mostrou que só 4 dentes precisavam. Economizei e o resultado ficou harmonioso.' },
      { name: 'Thiago R. — Copacabana', text: 'O Test Drive do Sorriso me convenceu. Pude ver como ficaria antes de decidir. Sem surpresas.' }
    ],
    stats: [
      { number: '20+', label: 'Anos em Estética Dental' },
      { number: '4.000+', label: 'Pacientes Atendidos' },
      { number: 'iTero', label: 'Scanner iTero Element 5D' },
      { number: '24h', label: 'WhatsApp Disponível' }
    ]
  },

  faq: {
    title: 'Dúvidas sobre Estética Dental',
    questions: [
      { question: 'Qual tratamento estético é indicado para mim?', answer: 'Depende do caso. Dentes amarelados podem precisar de clareamento. Dentes com forma irregular podem precisar de lentes ou facetas. Restaurações antigas podem ser trocadas. A consulta define o melhor caminho.' },
      { question: 'Lentes de porcelana ficam artificiais?', answer: 'Com planejamento adequado, não. A porcelana moderna reproduz a translucidez natural do dente. O objetivo é que ninguém perceba — só notem que o sorriso está bonito.' },
      { question: 'Posso combinar tratamentos?', answer: 'Sim, é comum. Muitos pacientes combinam clareamento + restaurações, ou lentes nos dentes da frente + coroa em um dente posterior. A visão integrada é justamente o diferencial da consulta.' },
      { question: 'O resultado é permanente?', answer: 'Lentes e facetas de porcelana duram 15-20 anos. Clareamento é duradouro mas pode precisar de manutenção. Restaurações em resina duram em média 7-10 anos. Depende do tratamento.' },
      { question: 'Vocês atendem convênios?', answer: 'Nosso atendimento é particular, o que nos permite dedicar tempo ao planejamento e trabalhar com materiais selecionados.' }
    ]
  },

  cta: {
    title: 'Quer Saber o que Faz Sentido para Seu Sorriso?',
    subtitle: 'Na consulta, analisamos seu caso e mostramos as opções — sem compromisso de iniciar.',
    buttonText: 'Agendar Consulta Estética',
    urgency: 'O primeiro passo é entender o que faz sentido para o seu caso — e isso começa com uma consulta.'
  },

  contact: {
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi o site e gostaria de agendar uma consulta para avaliar e melhorar meu sorriso.',
    doctorName: 'Dra. Carla Christoph',
    clinicName: 'Consultório Odontológico'
  },

  seo: {
    title: 'Estética Dental Ipanema | Renove seu Sorriso com Especialista',
    description: 'Especialista em estética do sorriso em Ipanema. Avaliamos seu caso e indicamos a melhor solução: facetas de resina ou lentes de porcelana. Agende!',
    keywords: [
      'estetica dental ipanema',
      'melhorar sorriso rio de janeiro',
      'estética do sorriso',
      'dentista estético ipanema',
      'lentes de contato dental',
      'facetas de resina',
      'harmonização do sorriso',
      'sorriso bonito'
    ]
  },

  tracking: {
    gtagId: 'AW-16894364517',
    gtmId: 'GTM-WZRDNBKQ'
  }
};
