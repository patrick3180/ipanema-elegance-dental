import { LandingPageConfig } from "@/types/LandingPageConfig";

export const emergenciaOdontologicaConfig: LandingPageConfig = {
  campaign: 'emergencia-odontologica-ipanema',
  
  messageMatch: {
    adGroup: 'emergencia-generica-ipanema',
    keyword: 'emergencia odontologica ipanema'
  },
  
  whatsapp: {
    number: '5521993304045',
    message: 'Olá! Tive uma emergência odontológica e preciso de atendimento prioritário. Podem me ajudar?'
  },
  
  hero: {
    headline: 'Emergência Odontológica em Ipanema — Encaixe Prioritário',
    subheadline: 'Dente quebrado, dor aguda, prótese solta ou inchaço. Entre em contato pelo WhatsApp e resolveremos o mais rápido possível.',
    ctaText: 'Pedir Atendimento Agora',
    backgroundImage: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp'
  },
  
  benefits: [
    'WhatsApp 24h — resposta imediata',
    'Encaixe prioritário na agenda',
    'Diagnóstico e resolução no mesmo dia, sempre que possível',
    '20+ anos de experiência'
  ],
  
  problem: {
    title: 'Imprevistos Dentais Não Esperam',
    description: 'Uma emergência odontológica é estressante. Você precisa de um profissional que atenda rápido, resolva o problema e explique os próximos passos com clareza.',
    problems: [
      'Dente que quebrou ou lascou — precisa de restauração urgente.',
      'Dor de dente intensa que não passa com analgésico.',
      'Lente, faceta ou coroa que soltou — precisa cimentar.',
      'Inchaço ou abscesso na gengiva.',
      'Prótese que soltou ou quebrou.',
      'Não sabe se é urgência — quer orientação rápida.'
    ]
  },
  
  guide: {
    title: 'Como Funciona o Atendimento de Emergência',
    subtitle: 'Do contato à resolução — rápido e organizado.',
    steps: [
      { number: '1', title: 'WhatsApp Imediato', description: 'Descreva o que aconteceu. Nossa equipe responde 24h e orienta os primeiros cuidados enquanto agenda o encaixe.' },
      { number: '2', title: 'Encaixe Prioritário', description: 'Urgências têm preferência na agenda. Na maioria dos casos, conseguimos atender no mesmo dia.' },
      { number: '3', title: 'Diagnóstico e Tratamento', description: 'Exame clínico detalhado, radiografia se necessário, e resolução imediata — restauração, cimentação, alívio da dor.' },
      { number: '4', title: 'Orientação de Continuidade', description: 'Você sai com o problema resolvido e um plano claro para tratamento definitivo, se necessário.' }
    ]
  },

  socialProof: {
    title: 'Quem Precisou, Conta',
    testimonials: [
        { name: 'Renata S. — Ipanema', text: 'Soltou minha lente num sábado. Mandei mensagem no WhatsApp e na segunda cedo já estava no consultório. Resolveu na hora.' },
        { name: 'Marcos T. — Leblon', text: 'Acordei com dor forte num dente. Consegui encaixe no mesmo dia. A Dra. Carla diagnosticou, resolveu a urgência e planejou o tratamento definitivo.' },
        { name: 'Ana Clara R. — Copacabana', text: 'Quebrei o dente da frente num acidente. O atendimento foi rápido e a restauração ficou natural. Ninguém percebe.' }
    ],
    stats: [
        { number: '24h', label: 'WhatsApp Disponível' },
        { number: '20+', label: 'Anos de Experiência' },
        { number: '4.000+', label: 'Pacientes Atendidos' },
        { number: 'Mesmo dia', label: 'Encaixe Prioritário' }
    ]
  },
  
  faq: {
    title: 'Dúvidas sobre Emergências',
    questions: [
        { question: 'Vocês atendem no mesmo dia?', answer: 'Nos esforçamos para isso. Entre em contato pelo WhatsApp descrevendo a situação e faremos o possível para encaixar no primeiro horário disponível.' },
        { question: 'Como saber se é emergência?', answer: 'Se há dor intensa, sangramento que não para, dente quebrado visível, inchaço ou prótese solta — é emergência. Na dúvida, mande mensagem no WhatsApp e orientamos.' },
        { question: 'O atendimento de emergência resolve de vez?', answer: 'Depende do caso. Muitas vezes sim (restauração, cimentação). Em casos mais complexos, resolvemos a urgência e planejamos o tratamento definitivo para uma consulta seguinte.' },
        { question: 'Vocês atendem convênios?', answer: 'Nosso atendimento é particular. Na consulta de emergência, resolvemos o problema imediato e apresentamos as opções para continuidade.' }
    ]
  },
  
  cta: {
    title: 'Precisa de Atendimento Agora?',
    subtitle: 'Mande mensagem pelo WhatsApp. Respondemos 24h e encaixamos o mais rápido possível.',
    buttonText: 'Falar no WhatsApp Agora',
    urgency: 'Quanto antes o atendimento, mais simples a solução.'
  },
  
  contact: {
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Tive uma emergência odontológica e preciso de atendimento prioritário. Podem me ajudar?',
    doctorName: 'Dra. Carla Christoph',
    clinicName: 'Consultório Odontológico'
  },
  
  seo: {
    title: 'Emergência Odontológica Ipanema | Dentista Urgente | Dra. Carla',
    description: 'Teve uma emergência odontológica em Ipanema? Atendimento prioritário para dente quebrado, dor, prótese solta e mais. WhatsApp 24h. Dra. Carla Christoph.',
    keywords: [
      'emergência odontológica ipanema',
      'urgência dentista ipanema',
      'dentista urgente ipanema',
      'dentista 24h ipanema',
      'atendimento odontológico emergencial',
      'clínica de urgência odontológica',
      'dentista encaixe ipanema',
      'sos dentista rio de janeiro'
    ]
  },
  
  tracking: {
    gtagId: 'AW-16894364517',
    gtmId: 'GTM-WZRDNBKQ'
  }
};