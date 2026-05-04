import { LandingPageConfig } from "@/types/LandingPageConfig";

export const dorDeDenteConfig: LandingPageConfig = {
  campaign: 'dor-de-dente-urgencia',

  messageMatch: {
    adGroup: 'dor-de-dente-ipanema',
    keyword: 'dor de dente ipanema'
  },

  whatsapp: {
    number: '5521993304045',
    message: 'Olá! Estou com uma dor de dente forte e gostaria de tentar um encaixe no consultório o quanto antes.'
  },

  hero: {
    headline: 'Dor de Dente em Ipanema? Atendimento Prioritário',
    subheadline: 'Encaixe prioritário em dias úteis para diagnosticar a causa e dar alívio o quanto antes. WhatsApp responde 24h para orientação.',
    ctaText: 'Pedir Encaixe pelo WhatsApp',
    backgroundImage: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp'
  },

  benefits: [
    'WhatsApp 24h — orientação imediata',
    'Encaixe prioritário na agenda',
    'Diagnóstico preciso da causa',
    '20+ anos de experiência'
  ],

  problem: {
    title: 'Dor de Dente Não É para Aguentar',
    description: 'Dor persistente é sinal de que algo precisa de atenção. Ignorar pode transformar um problema tratável em algo mais complexo e mais caro.',
    problems: [
      'Dor ao morder ou mastigar — pulsante, latejante.',
      'Dor que piora com bebida quente ou gelada.',
      'Dor que acorda de madrugada e não passa com analgésico.',
      'Inchaço no rosto ou na gengiva perto do dente que dói.',
      'Sensação de pressão ou pulsação dentro do dente.',
      'Não sabe a causa — só sabe que precisa resolver.'
    ]
  },

  guide: {
    title: 'Do Alívio ao Tratamento Definitivo',
    subtitle: 'Resolver a dor é prioridade. Depois, tratamos a causa.',
    steps: [
      { number: '1', title: 'Contato pelo WhatsApp', description: 'Descreva a dor. Orientamos os primeiros cuidados (o que tomar, o que evitar) enquanto agenda o encaixe.' },
      { number: '2', title: 'Diagnóstico da Causa', description: 'Exame clínico e radiografia para identificar a origem exata da dor — cárie, fratura, infecção, problema gengival.' },
      { number: '3', title: 'Alívio Imediato', description: 'Tratamento para eliminar a dor. Pode ser medicação, drenagem de abscesso, restauração ou encaminhamento para canal.' },
      { number: '4', title: 'Tratamento Definitivo', description: 'Com a dor resolvida, planejamos o tratamento da causa para evitar recorrência.' }
    ]
  },

  socialProof: {
    title: 'Quem Precisou, Conta',
    testimonials: [
      { name: 'Felipe G. — Ipanema', text: 'Estava com uma dor que não me deixava dormir. Consegui encaixe no dia seguinte. A Dra. Carla identificou a infecção, resolveu a urgência e depois planejou o restante.' },
      { name: 'Laura M. — Leblon', text: 'Tomei analgésico por 3 dias antes de ligar. Me arrependo de não ter ido antes — a solução foi simples quando diagnosticada.' },
      { name: 'Roberto C. — Copacabana', text: 'Achei que ia precisar de canal. A Dra. Carla avaliou com calma e na verdade era só uma restauração infiltrada. Resolveu na hora.' }
    ],
    stats: [
      { number: '24h', label: 'WhatsApp Disponível' },
      { number: '20+', label: 'Anos de Experiência' },
      { number: '4.000+', label: 'Pacientes Atendidos' },
      { number: 'Mesmo dia', label: 'Encaixe Prioritário' }
    ]
  },

  faq: {
    title: 'Dúvidas sobre Dor de Dente',
    questions: [
      { question: 'Posso tomar analgésico enquanto espero a consulta?', answer: 'Sim. Analgésicos comuns (dipirona, paracetamol, ibuprofeno) podem aliviar temporariamente. Evite aspirina se houver sangramento. Na dúvida, pergunte pelo WhatsApp antes de medicar.' },
      { question: 'Dor de dente sempre significa canal?', answer: 'Não. A dor pode ter várias causas — cárie, restauração infiltrada, fratura, problema gengival. Muitas vezes a solução é mais simples do que canal. O diagnóstico correto é fundamental.' },
      { question: 'E se a dor passar sozinha?', answer: 'Dor que passa sozinha não significa que o problema foi resolvido. Pode significar que o nervo do dente morreu, o que é pior. Se teve dor intensa que desapareceu repentinamente, procure um profissional.' },
      { question: 'Vocês atendem convênios?', answer: 'Nosso atendimento é particular. Na consulta de urgência, diagnosticamos a causa e apresentamos as opções de tratamento.' }
    ]
  },

  cta: {
    title: 'Não Aguente a Dor — Procure Atendimento',
    subtitle: 'Mande mensagem pelo WhatsApp. Respondemos 24h e buscamos o encaixe o quanto antes em dias úteis.',
    buttonText: 'Pedir Encaixe pelo WhatsApp',
    urgency: 'Dor ignorada hoje vira tratamento mais complexo amanhã.'
  },

  contact: {
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Estou com uma dor de dente forte e gostaria de tentar um encaixe no consultório o quanto antes.',
    doctorName: 'Dra. Carla Christoph',
    clinicName: 'Consultório Odontológico'
  },

  seo: {
    title: 'Dor de Dente Urgência Ipanema | Alívio Rápido | Dra. Carla',
    description: 'Dor de dente em Ipanema? Atendimento prioritário para alívio da dor. Diagnóstico preciso e tratamento no mesmo dia. WhatsApp 24h. Dra. Carla Christoph CRO-RJ 27509.',
    keywords: [
      'dor de dente ipanema',
      'urgência dor de dente ipanema',
      'dentista dor ipanema',
      'aliviar dor de dente',
      'dor de dente forte',
      'tratamento de canal ipanema',
      'dentista 24h ipanema dor',
      'dente doendo rio de janeiro'
    ]
  },

  tracking: {
    gtagId: 'AW-16894364517',
    gtmId: 'GTM-WZRDNBKQ'
  }
};
