import { LandingPageConfig } from "@/types/LandingPageConfig";

export const denteQuebradoConfig: LandingPageConfig = {
  campaign: 'dente-quebrado-urgencia',
  
  messageMatch: {
    adGroup: 'dente-quebrado-ipanema',
    keyword: 'dente quebrado ipanema'
  },
  
  whatsapp: {
    number: '5521993304045',
    message: 'Olá! Quebrei meu dente e preciso de atendimento urgente. Podem me encaixar o quanto antes?'
  },
  
  hero: {
    headline: 'Dente Quebrado? Atendimento Prioritário para Urgências em Ipanema',
    subheadline: 'Faremos o possível para encaixá-lo no primeiro horário disponível. Recupere seu sorriso imediatamente com resultado natural. Dra. Carla Christoph, especialista há mais de 20 anos.',
    ctaText: 'Quero Meu Atendimento Prioritário',
    backgroundImage: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp'
  },
  
  benefits: [
    '✓ Atendimento prioritário - nos esforçamos para resolver no mesmo dia',
    '✓ Recupere seu sorriso imediatamente com resultado natural',
    '✓ Solução estética e funcional para você voltar a sorrir',
    '✓ WhatsApp 24h para agendamentos e orientações urgentes'
  ],
  
  problem: {
    title: 'Sabemos Como É Constrangedor e Urgente',
    description: 'Um dente quebrado não é apenas um problema estético - afeta sua confiança, seu trabalho e sua vida social. Na clínica da Dra. Carla Christoph, tratamos urgências com a prioridade que merecem, sempre buscando encaixar você o mais rápido possível.',
    problems: [
      'Dente frontal quebrado afetando sua aparência',
      'Constrangimento em reuniões e eventos sociais',
      'Dificuldade para comer e falar normalmente',
      'Medo de que o problema piore',
      'Preocupação com a estética do sorriso',
      'Urgência em resolver antes de compromissos importantes'
    ]
  },
  
  guide: {
    title: 'O Que Esperar do Seu Atendimento de Urgência',
    subtitle: 'Processo rápido e eficiente para recuperar seu sorriso',
    steps: [
      {
        number: '1',
        title: 'Contato Imediato via WhatsApp',
        description: 'Entre em contato e descreva sua situação. Nossa equipe responde 24h e já orienta os primeiros cuidados.'
      },
      {
        number: '2',
        title: 'Agendamento Prioritário',
        description: 'Faremos o máximo para encaixá-lo no primeiro horário disponível, muitas vezes no mesmo dia.'
      },
      {
        number: '3',
        title: 'Avaliação Completa',
        description: 'Análise detalhada do dano, radiografia se necessário, e plano de tratamento imediato.'
      },
      {
        number: '4',
        title: 'Restauração Definitiva ou Provisória',
        description: 'Dependendo do problema, você já sai com sua restauração definitiva em resina composta de alta qualidade, ou com uma solução provisória (com estética e função) e com os próximos passos definidos para a solução definitiva.'
      },
      {
        number: '5',
        title: 'Ajustes Finais',
        description: 'Polimento, ajuste de mordida e verificação estética para resultado perfeito.'
      }
    ]
  },
  
  socialProof: {
    title: 'O Que Nossos Pacientes Dizem Sobre o Atendimento Personalizado',
    testimonials: [
      {
        name: 'Rafael T., Executivo de Marketing',
        text: 'Quebrei o dente da frente num domingo à noite. Entrei em contato pelo WhatsApp e consegui atendimento para segunda de manhã. Saí com o dente perfeito, ninguém percebe que foi restaurado. Salvou minha reunião da tarde!',
        rating: 5
      },
      {
        name: 'Daniela M., Mãe de Paciente',
        text: 'Minha filha caiu e lascou o dente na escola. A Dra. Carla nos encaixou no mesmo dia. Foi tão cuidadosa e o resultado ficou perfeito. O mais impressionante foi a calma que transmitiu num momento de tanto estresse.',
        rating: 5
      },
      {
        name: 'Carlos Eduardo S., Advogado',
        text: 'Mordi algo duro e quebrei um pedaço do dente. A doutora fez um trabalho incrível para salvar o meu dente. Parece que nunca quebrou!',
        rating: 5
      }
    ],
    stats: [
      { number: '20+', label: 'Anos de Experiência' },
      { number: '4.000+', label: 'Pacientes Atendidos' },
      { number: '1 hora', label: 'Mínimo por Agendamento' },
      { number: '24h', label: 'Atendimento WhatsApp' }
    ]
  },
  
  faq: {
    title: 'Perguntas Sobre Urgências',
    questions: [
      {
        question: 'Consigo atendimento no mesmo dia?',
        answer: 'Faremos todo o possível para encaixá-lo no mesmo dia ou no primeiro horário disponível. Casos de urgência estética são sempre priorizados em nossa agenda. O WhatsApp 24h permite que você agende mesmo fora do horário comercial.'
      },
      {
        question: 'A restauração de emergência é definitiva ou provisória?',
        answer: 'Sempre que possível, realizamos o tratamento definitivo na primeira consulta. Utilizamos materiais de alta qualidade para um resultado estético e duradouro. Dependendo do caso pode ser necessária a confecção de coroas em laboratório, mas você sairá com um dente provisório com estética e função garantidos até a solução definitiva.'
      },
      {
        question: 'O resultado fica natural mesmo sendo urgência?',
        answer: 'Absolutamente. Urgência não significa trabalho mal feito. Utilizamos técnicas de estratificação e materiais estéticos de última geração para garantir que a restauração fique imperceptível, mesmo em dentes frontais.'
      },
      {
        question: 'Quanto tempo demora o atendimento?',
        answer: 'Entre 30 a 90 minutos, dependendo da complexidade. Reservamos tempo adequado mesmo em encaixes para garantir excelência no resultado.'
      },
      {
        question: 'Posso enviar foto para avaliação antes?',
        answer: 'Sim! Nosso WhatsApp funciona 24h. Envie fotos do dente quebrado que nossa equipe fará uma pré-avaliação e já orientará sobre os primeiros cuidados e urgência do caso.'
      },
      {
        question: 'E se eu quebrar o dente no fim de semana?',
        answer: 'Nosso WhatsApp 24h permite que você entre em contato imediatamente e agende para o primeiro horário útil disponível. Você receberá orientações de cuidados imediatos enquanto aguarda o atendimento.'
      },
      {
        question: 'Vocês atendem emergências de outros tratamentos?',
        answer: 'Sim. Lente ou faceta que soltou, prótese com problema, coroa que caiu - todas as urgências estéticas são priorizadas. Entre em contato que avaliaremos seu caso.'
      }
    ]
  },
  
  cta: {
    title: 'Não Fique Constrangido - Resolva Agora',
    subtitle: 'Entre em contato imediatamente pelo WhatsApp 24h. Faremos o possível para atendê-lo hoje mesmo',
    buttonText: 'Quero Atendimento Urgente'
  },
  
  contact: {
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Quebrei meu dente e preciso de atendimento urgente.',
    doctorName: 'Dra. Carla Christoph',
    clinicName: 'Clínica Odontológica Premium Ipanema'
  },
  
  seo: {
    title: 'Dente Quebrado Urgência Ipanema | Restauração Imediata | Dra. Carla',
    description: 'Dente quebrado? Atendimento prioritário em Ipanema. Restauração estética no mesmo dia. WhatsApp 24h. Dra. Carla Christoph CRO-RJ 27509. Resultado natural!',
    keywords: [
      'dente quebrado ipanema',
      'urgência dental ipanema',
      'dente quebrado urgente',
      'restauração urgente',
      'dente lascado',
      'conserto dente quebrado',
      'dentista urgência ipanema',
      'dente frontal quebrado'
    ]
  },
  
  tracking: {
    gtagId: 'AW-16894364517',
    gtmId: 'GTM-WZRDNBKQ'
  }
};