import { LandingPageConfig } from "@/types/LandingPageConfig";

export const saudeGengivalConfig: LandingPageConfig = {
  campaign: 'Pesquisa - Clinica Geral - Zona Sul',

  messageMatch: {
    adGroup: 'Saúde da Gengiva',
    keyword: 'cuidado com a gengiva'
  },

  whatsapp: {
    number: '5521993304045',
    message: 'Olá! Vi o site e gostaria de agendar uma consulta para cuidar da saúde da minha gengiva.'
  },

  hero: {
    // Onda 2 (jul/2026, aprovado Patrick): H1 mais suave; os sinais clínicos descem p/ a subheadline (message match preservado)
    headline: 'Saúde da Gengiva em Ipanema — cuidado completo, no tempo certo',
    subheadline: 'Gengiva sangrando ou retraindo? Tratamento periodontal com acompanhamento individualizado — a Dra. Carla Christoph coordena a jornada completa.',
    ctaText: 'Agendar Consulta Gengival',
    backgroundImage: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp'
  },

  benefits: [
    'Tratamento integrado com periodontista',
    'Acompanhamento contínuo pela Dra. Carla',
    'WhatsApp 24h',
    '20+ anos de experiência'
  ],

  problem: {
    title: 'Sinais na Gengiva que Você Não Deveria Ignorar',
    description: 'Sangramento, inchaço e retração gengival parecem "normais" — mas não são. Quando a gengiva está inflamada, é o corpo pedindo ajuda. Ignorar pode levar a problemas sérios, incluindo perda de dentes.',
    problems: [
      'Gengiva que sangra ao escovar ou ao usar fio dental.',
      'Gengivas vermelhas, inchadas ou sensíveis ao toque.',
      'Mau hálito persistente mesmo com boa higiene.',
      'Gengiva retraída — dentes parecem "mais longos" do que antes.',
      'Receio de que o problema evolua e afete os dentes.',
      'Quer tratar a gengiva para depois investir em estética ou implantes.'
    ]
  },

  guide: {
    title: 'Como Cuidamos da Sua Gengiva',
    subtitle: 'A Dra. Carla coordena o tratamento com periodontista especializado e acompanha cada etapa.',
    steps: [
      { number: '1', title: 'Consulta Detalhada', description: 'Exame clínico da gengiva, sondagem periodontal e radiografias quando necessário para identificar o estágio do problema.' },
      { number: '2', title: 'Tratamento Periodontal', description: 'Limpeza profunda e tratamento com periodontista especializado quando indicado. Controle da inflamação e infecção.' },
      { number: '3', title: 'Reavaliação', description: 'Após o tratamento, avaliamos a resposta da gengiva e definimos os próximos passos — manutenção ou tratamentos complementares.' },
      { number: '4', title: 'Manutenção Periódica', description: 'Consultas regulares para manter o controle e prevenir recidivas. A frequência é definida individualmente.' }
    ]
  },

  socialProof: {
    title: 'O Que Nossos Pacientes Contam',
    testimonials: [
      { name: 'Sandra M. — Ipanema', text: 'Minha gengiva sangrava há anos e eu achava que era normal. Depois do tratamento, parou completamente. Deveria ter procurado antes.' },
      { name: 'Roberto F. — Leblon', text: 'Queria fazer implante mas a gengiva não estava saudável. A Dra. Carla tratou primeiro a gengiva e depois fez o implante. Resultado seguro.' },
      { name: 'Claudia V. — Copacabana', text: 'O acompanhamento é o diferencial. A Dra. Carla não faz só a limpeza — ela monitora a evolução a cada consulta.' }
    ],
    stats: [
      { number: '20+', label: 'Anos de Experiência' },
      { number: '4.000+', label: 'Pacientes Atendidos' },
      { number: 'Integrado', label: 'Cuidado com Periodontista' },
      { number: '24h', label: 'WhatsApp Disponível' }
    ]
  },

  faq: {
    title: 'Dúvidas sobre Saúde Gengival',
    questions: [
      { question: 'Gengiva que sangra ao escovar é normal?', answer: 'Não. Sangramento é sinal de inflamação. Pode ser gengivite (reversível) ou periodontite (mais avançada).' },
      { question: 'Periodontite tem cura?', answer: 'É controlável com tratamento e manutenção periódica. Uma vez controlada, o objetivo é manter a estabilidade e evitar que progrida.' },
      { question: 'Posso fazer lentes ou implantes se tenho problema gengival?', answer: 'Primeiro tratamos a gengiva. Lentes e implantes precisam de base gengival saudável para funcionar e durar. A Dra. Carla integra o tratamento periodontal ao plano geral do caso.' },
      { question: 'Mau hálito pode ser problema gengival?', answer: 'Sim. Halitose persistente é frequentemente ligada a doença periodontal. Bactérias acumuladas em bolsas gengivais produzem compostos com odor. Tratar a gengiva costuma resolver.' },
      { question: 'Vocês atendem convênios?', answer: 'Nosso atendimento é particular, o que nos permite acompanhar cada caso com o tempo e a atenção necessários.' }
    ]
  },

  cta: {
    title: 'Gengiva Saudável é a Base de Tudo',
    subtitle: 'Agende uma consulta gengival. Tratamento precoce faz toda a diferença.',
    buttonText: 'Agendar Consulta Gengival',
    urgency: 'Sangramento gengival ignorado pode evoluir para problemas que afetam outros tratamentos.'
  },

  contact: {
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi o site e gostaria de agendar uma consulta para cuidar da saúde da minha gengiva.',
    doctorName: 'Dra. Carla Christoph',
    clinicName: 'Consultório Odontológico'
  },

  seo: {
    title: 'Cuidado Gengival Ipanema | Tratamento para Saúde da Gengiva',
    description: 'Especialista em saúde gengival em Ipanema. Tratamento para sangramento, sensibilidade e prevenção. Agende sua consulta e recupere seu bem-estar.',
    keywords: [
      'saúde da gengiva ipanema',
      'cuidado com a gengiva',
      'limpeza dental profissional ipanema',
      'profilaxia dental',
      'gengiva sensível tratamento',
      'prevenção periodontal',
      'dentista ipanema',
      'higiene bucal'
    ]
  },

  tracking: {
    gtagId: 'AW-16894364517',
    gtmId: 'GTM-WZRDNBKQ'
  }
};
