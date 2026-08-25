import { LandingPageConfig } from "@/types/LandingPageConfig";

export const implantesDentariosConfig: LandingPageConfig = {
  campaign: 'Pesquisa - Implantes Dentários - Zona Sul',
  urgency: 'A perda óssea é progressiva — quanto antes o implante, mais simples tende a ser o procedimento',
  
  messageMatch: {
    adGroup: 'Implantes',
    keyword: 'implantes dentarios'
  },
  
  whatsapp: {
    number: '5521993304045',
    message: 'Olá! Vi sobre implantes dentários e gostaria de agendar uma consulta para entender o tratamento no meu caso.'
  },

  hero: {
    headline: 'Volte a Comer e Sorrir com Dentes Fixos',
    subheadline: 'Implantes com planejamento digital individualizado. Especialista em Implantodontia com mais de 20 anos de experiência.',
    ctaText: 'Agendar Minha Consulta',
    backgroundImage: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp'
  },
  
  benefits: [
    'Especialista em Implantodontia',
    'Planejamento com tomografia digital',
    'WhatsApp 24h',
    '20+ anos de experiência'
  ],
  
  problem: {
    title: 'Você se identifica com alguma dessas situações?',
    description: 'Perder um dente afeta a mastigação, a confiança e até a saúde óssea. Quanto mais tempo sem reposição, mais complexo pode se tornar o tratamento.',
    problems: [
      'Dificuldade para mastigar — evitar alimentos mais firmes, cortar tudo em pedaços pequenos ou mastigar só de um lado.',
      'Insegurança com o espaço do dente perdido — evitar sorrir abertamente, cobrir a boca ao falar ou sentir desconforto em fotos.',
      'Prótese removível que incomoda — solta, machuca a gengiva, acumula alimento ou limita o que você pode comer.',
      'Perda óssea avançando — cada mês sem o dente, o osso da região continua sendo reabsorvido, o que pode dificultar o implante no futuro.'
    ]
  },
  
  guide: {
    title: 'Como a Dra. Carla Christoph Planeja Seu Tratamento com Implantes',
    subtitle: 'Especialista em Implantodontia — CRO-RJ 27.509. Do diagnóstico à prótese final, todo o tratamento com a mesma profissional.',
    steps: [
      { number: '1', title: 'Consulta e Tomografia', description: 'Análise clínica detalhada e tomografia computadorizada para mapear a estrutura óssea com precisão.' },
      { number: '2', title: 'Planejamento Digital do Caso', description: 'Definição da posição, angulação e tipo de implante mais adequado — tudo planejado antes da cirurgia.' },
      { number: '3', title: 'Cirurgia de Instalação', description: 'Procedimento com anestesia local, de forma tranquila. Na maioria dos casos, o pós é mais simples do que se imagina.' },
      { number: '4', title: 'Cicatrização e Integração', description: 'O implante se integra ao osso ao longo de alguns meses. Durante esse período, você pode usar uma prótese provisória.' },
      { number: '5', title: 'Prótese Definitiva pela Dra. Carla', description: 'Moldagem digital e confecção da coroa ou prótese final — com materiais de primeira linha selecionados individualmente para cada caso.' }
    ]
  },

  socialProof: {
    title: 'O Que Nossos Pacientes Contam Sobre o Tratamento',
    testimonials: [
      { name: 'Roberto S. — Copacabana', text: 'Passei anos com prótese removível e já tinha me conformado. Depois do implante, voltei a comer de tudo — parece que recuperei algo que achei que tinha perdido.' },
      { name: 'Márcia L. — Ipanema', text: 'Tinha muito medo da cirurgia, mas foi mais tranquilo do que arrancar um dente. O que mais me surpreendeu foi o acompanhamento — a Dra. Carla estava presente em cada etapa.' },
      { name: 'Paulo H. — Leblon', text: 'Fiz a reabilitação completa, arcada superior inteira. Demorou alguns meses, mas hoje tenho dentes fixos e como qualquer coisa sem pensar duas vezes.' }
    ],
    stats: [
      { number: '20+', label: 'Anos de Experiência' },
      { number: '4.000+', label: 'Pacientes Atendidos' },
      { number: 'Implantodontia', label: 'Especialidade Formal' },
      { number: '24h', label: 'WhatsApp Disponível' }
    ]
  },
  
  faq: {
    title: 'Dúvidas Sobre Implantes Dentários',
    questions: [
      { question: 'Implante dentário dói muito?', answer: 'A cirurgia é feita com anestesia local e a maioria dos pacientes relata menos desconforto do que em uma extração. O pós-operatório costuma ser controlado com medicação simples por poucos dias.' },
      { question: 'Implante dentário pode ser rejeitado pelo corpo?', answer: 'Implantes de titânio têm taxa de sucesso superior a 95%. O titânio é biocompatível — o osso se integra a ele naturalmente. Rejeição verdadeira é extremamente rara.' },
      { question: 'Quanto tempo leva do início ao dente definitivo?', answer: 'O tempo total varia de 3 a 8 meses, dependendo da necessidade de enxerto ósseo e da região. Durante esse período, você não fica sem dente — usamos provisórios enquanto o implante se integra ao osso.' },
      { question: 'Existe idade máxima para colocar implante?', answer: 'Não existe limite de idade. O que avaliamos é a saúde geral e a qualidade óssea do paciente. Pessoas com 70, 80 anos fazem implantes com sucesso rotineiramente.' },
      { question: 'Implante ou prótese removível — qual é melhor?', answer: 'O implante é fixo, preserva o osso, não machuca a gengiva e permite mastigar normalmente. A prótese removível é uma alternativa quando o implante não é possível, mas tem limitações funcionais e de conforto.' },
      { question: 'Preciso fazer enxerto ósseo antes do implante?', answer: 'Depende do volume de osso disponível. A análise com tomografia e planejamento digital mostra exatamente se há necessidade. Quando necessário, o enxerto é feito antes ou junto com o implante.' },
      // #187 item 4 (aprovado por Patrick em 24/08): FAQ de localizacao — leva
      // Zona Sul/Leblon/Copacabana e a nocao de proximidade para a pagina como
      // INFORMACAO DE SERVICO, sem tocar hero/H1. Entra tambem no schema FAQPage.
      { question: 'Onde fica o consultório?', answer: 'Na Rua Visconde de Pirajá, 550, sala 1107 — no coração de Ipanema. Para quem vem do Leblon ou de Copacabana, são poucos minutos; recebemos pacientes de toda a Zona Sul. Atendemos de segunda a sexta, das 9h às 19h.' }
    ]
  },
  
  cta: {
    title: 'A Perda Óssea é Progressiva',
    subtitle: 'Quanto mais cedo o diagnóstico, menos complexo tende a ser o procedimento.',
    buttonText: 'Agendar Consulta de Planejamento',
    urgency: 'A perda óssea é progressiva — cada mês conta'
  },
  
  contact: {
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi sobre implantes dentários e gostaria de agendar uma consulta para entender o tratamento no meu caso.',
    doctorName: 'Dra. Carla Christoph',
    clinicName: 'Consultório Odontológico'
  },
  
  seo: {
    title: 'Implantes Dentários Ipanema | Recupere seu Sorriso com Segurança',
    description: 'Reabilitação com implantes para devolver função mastigatória e estética. Planejamento digital e acompanhamento completo em Ipanema com a Dra. Carla Christoph.',
    keywords: [
      'implantes dentarios ipanema',
      'implante dental zona sul',
      'clínica de implante rio de janeiro',
      'preço implante dentário',
      'quem perdeu um dente',
      'prótese sobre implante',
      'dentista especialista em implante',
      'dente fixo'
    ]
  },
  
  tracking: {
    gtagId: 'AW-16894364517',
    gtmId: 'GTM-WZRDNBKQ'
  }
};
