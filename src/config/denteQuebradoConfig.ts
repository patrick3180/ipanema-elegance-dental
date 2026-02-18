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
    headline: 'Dente Quebrado? Restauração com Resultado Natural em Ipanema',
    subheadline: 'Encaixe prioritário para resolver rápido. A Dra. Carla Christoph restaura dentes fraturados com materiais que reproduzem a aparência natural do dente original.',
    ctaText: 'Pedir Atendimento Agora',
    backgroundImage: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp'
  },

  benefits: [
    'WhatsApp 24h — resposta imediata',
    'Encaixe prioritário na agenda',
    'Restauração com resultado natural',
    '20+ anos de experiência em estética'
  ],

  problem: {
    title: 'Dente Quebrou — E Agora?',
    description: 'Uma fratura dental pode acontecer a qualquer momento: mordendo algo duro, num acidente ou num dente que já estava fragilizado. O mais importante é agir rápido e saber que tem solução.',
    problems: [
      'Dente quebrou e preciso resolver o mais rápido possível.',
      'Bordas cortantes que machucam a língua ou a bochecha.',
      'Sensibilidade ao frio, calor ou ao morder.',
      'Não sei se preciso de restauração simples ou tratamento mais complexo.',
      'Preciso resolver antes de um compromisso próximo.',
      'Tenho medo de que o problema piore se não tratar logo.'
    ]
  },

  guide: {
    title: 'Do Contato à Restauração — Rápido e com Resultado',
    subtitle: 'Na maioria dos casos, você sai do consultório com o dente restaurado.',
    steps: [
      { number: '1', title: 'WhatsApp Imediato', description: 'Mande uma foto do dente e descreva o que aconteceu. Orientamos sobre cuidados imediatos (guardar o fragmento, evitar morder do lado afetado).' },
      { number: '2', title: 'Encaixe Prioritário', description: 'Fraturas dentais têm prioridade na agenda. Faremos o possível para atender no mesmo dia.' },
      { number: '3', title: 'Avaliação e Radiografia', description: 'Exame da extensão da fratura — se atingiu só o esmalte, se chegou à dentina ou se comprometeu o nervo. Define o tipo de tratamento.' },
      { number: '4', title: 'Restauração', description: 'Restauração direta em resina (casos simples) ou planejamento de coroa/faceta (casos mais extensos). O objetivo é resultado natural e funcional.' }
    ]
  },

  socialProof: {
    title: 'Quem Já Passou por Isso',
    testimonials: [
      { name: 'Ana Clara R. — Ipanema', text: 'Quebrei o dente da frente mordendo uma azeitona. Consegui atendimento no dia seguinte. A restauração ficou tão natural que eu mesma esqueço qual dente foi.' },
      { name: 'Pedro H. — Leblon', text: 'Meu filho quebrou o dente num treino. A Dra. Carla encaixou no mesmo dia e restaurou com calma. Ele saiu sorrindo.' },
      { name: 'Carla M. — Copacabana', text: 'Tinha um evento em 2 dias e lascou meu dente. Mandei foto no WhatsApp e resolveram rápido. Fui ao evento tranquila.' }
    ],
    stats: [
      { number: '24h', label: 'WhatsApp Disponível' },
      { number: '20+', label: 'Anos em Estética Dental' },
      { number: '4.000+', label: 'Pacientes Atendidos' },
      { number: 'Mesmo dia', label: 'Encaixe Prioritário' }
    ]
  },

  faq: {
    title: 'Dúvidas sobre Dente Quebrado',
    questions: [
      { question: 'Quebrei o dente — o que faço agora?', answer: 'Se encontrou o fragmento, guarde em leite ou soro. Evite morder do lado afetado. Entre em contato pelo WhatsApp com uma foto e orientaremos os próximos passos.' },
      { question: 'Dá para colar o pedaço que quebrou?', answer: 'Em alguns casos, sim — especialmente se o fragmento estiver íntegro e for guardado corretamente. A avaliação clínica define se a colagem é viável ou se a restauração direta é a melhor opção.' },
      { question: 'A restauração fica visível?', answer: 'Com resinas e cerâmicas atuais, a restauração reproduz a cor, translucidez e textura do dente natural. O objetivo é que seja imperceptível.' },
      { question: 'E se a fratura for grande?', answer: 'Fraturas mais extensas podem precisar de coroa ou, em casos raros, tratamento de canal antes da restauração. A radiografia na consulta define a extensão e o melhor caminho.' },
      { question: 'Vocês atendem convênios?', answer: 'Nosso atendimento é particular. Na consulta de urgência, resolvemos o problema e apresentamos as opções.' }
    ]
  },

  cta: {
    title: 'Não Espere — Quanto Antes, Mais Simples',
    subtitle: 'Mande foto do dente pelo WhatsApp. Respondemos 24h e encaixamos o mais rápido possível.',
    buttonText: 'Falar no WhatsApp Agora',
    urgency: 'Fratura não tratada pode complicar — o tempo conta.'
  },

  contact: {
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Quebrei meu dente e preciso de atendimento urgente.',
    doctorName: 'Dra. Carla Christoph',
    clinicName: 'Consultório Odontológico'
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