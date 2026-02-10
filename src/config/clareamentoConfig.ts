import { LandingPageConfig } from "@/types/LandingPageConfig";

export const clareamentoConfig: LandingPageConfig = {
  campaign: "clareamento_dental_ipanema",

  messageMatch: {
    adGroup: "clareamento_dental",
    keyword: "clareamento dental ipanema"
  },

  whatsapp: {
    number: "5521993304045",
    message: "Olá! Tenho interesse em fazer clareamento dental PARTICULAR com a Dra. Carla Christoph. Pode me auxiliar?"
  },

  hero: {
    headline: 'Clareamento Dental que Respeita a Naturalidade do Seu Sorriso',
    subheadline: 'Protocolos seguros e personalizados para um sorriso mais claro — sem o risco de ficar artificial. Mais de 20 anos de experiência em estética dental.',
    ctaText: 'Quero Clarear Meu Sorriso',
    backgroundImage: "/lovable-uploads/doutora-em-pe-jaleco.webp"
  },

  benefits: [
    'Protocolo personalizado por caso',
    'Resultado natural, sem "dente de chiclete"',
    'WhatsApp 24h',
    '20+ anos de experiência'
  ],

  problem: {
    title: 'Dentes Amarelados Incomodam Mais do que Parece',
    description: 'Café, vinho, chá, cigarro — o amarelamento vai acontecendo aos poucos até que um dia você percebe na foto. Se você se identifica, saiba que clareamento profissional é seguro e os resultados são reais.',
    problems: [
      'Evitar sorrir em fotos ou cobrir a boca ao rir.',
      'Manchas de café, vinho ou cigarro que não saem com pasta clareadora.',
      'Já tentou clareamento caseiro por conta própria e não funcionou.',
      'Receio de que o clareamento deixe os dentes com aspecto artificial.',
      'Medo de sensibilidade extrema durante o tratamento.',
      'Dúvida se o resultado vai durar ou se é temporário.'
    ]
  },

  guide: {
    title: 'Como a Dra. Carla Christoph Conduz o Clareamento',
    subtitle: 'Protocolos individualizados — cada caso tem sua indicação específica.',
    steps: [
      { number: '1', title: 'Avaliação e Diagnóstico', description: 'Análise da causa do escurecimento, condição dos dentes e gengiva. Definição do protocolo mais adequado para o seu caso.' },
      { number: '2', title: 'Preparação Cuidadosa', description: 'Proteção dos tecidos gengivais e avaliação da sensibilidade para garantir segurança e conforto durante o procedimento.' },
      { number: '3', title: 'Aplicação Profissional', description: 'Clareamento de consultório (sessão de 45-60 min) ou moldeiras para clareamento caseiro supervisionado — depende do caso.' },
      { number: '4', title: 'Acompanhamento dos Resultados', description: 'Monitoramento do progresso e orientações para manutenção. A cor estabiliza ao longo de 2 semanas após o término.' }
    ]
  },

  socialProof: {
    title: 'O Que Nossos Pacientes Contam',
    testimonials: [
      { name: 'Juliana M. — Leblon', text: 'Fiz o clareamento antes do meu casamento. Tinha medo de ficar artificial, mas ficou tão natural que ninguém percebeu que clareou — só elogiaram o sorriso.' },
      { name: 'André P. — Ipanema', text: 'Anos tomando café pesado. Achei que não tinha solução. Três sessões depois, a diferença é visível e ficou natural.' },
      { name: 'Beatriz C. — Gávea', text: 'O que me surpreendeu foi o pouco desconforto. A Dra. Carla monitorou a sensibilidade em cada etapa. Valeu cada consulta.' }
    ],
    stats: [
      { number: '20+', label: 'Anos de Experiência' },
      { number: '4.000+', label: 'Pacientes Atendidos' },
      { number: '3', label: 'Modalidades de Clareamento' },
      { number: '24h', label: 'WhatsApp Disponível' }
    ]
  },

  faq: {
    title: 'Dúvidas Sobre Clareamento Dental',
    questions: [
      { question: 'Clareamento dental estraga o esmalte?', answer: 'Não. O clareamento profissional com concentração e tempo controlados não danifica o esmalte. O gel age na estrutura interna do dente (dentina), clareando sem desgastar.' },
      { question: 'A sensibilidade é muito forte?', answer: 'Pode haver sensibilidade transitória, especialmente nos primeiros dias. A Dra. Carla ajusta o protocolo (concentração, tempo de aplicação) para minimizar esse efeito. Dessensibilizantes são usados quando necessário.' },
      { question: 'Qual a diferença entre clareamento de consultório e caseiro?', answer: 'O de consultório usa gel mais concentrado e dá resultado mais rápido (1-3 sessões). O caseiro usa moldeiras com gel de menor concentração por algumas semanas. Em muitos casos, a combinação dos dois é a abordagem mais eficaz.' },
      { question: 'O resultado é permanente?', answer: 'O clareamento é duradouro, mas não permanente. O dente pode escurecer novamente ao longo dos anos, especialmente com café, vinho e cigarro. Sessões de manutenção (a cada 1-2 anos) preservam o resultado.' },
      { question: 'Posso fazer clareamento se tenho restaurações?', answer: 'O clareamento age nos dentes naturais e não altera a cor de restaurações existentes. Se necessário, as restaurações podem ser trocadas após o clareamento para harmonizar com a nova cor.' },
      { question: 'Vocês atendem convênios?', answer: 'Nosso atendimento é particular, o que nos permite dedicar o tempo necessário e usar protocolos individualizados. Na consulta de avaliação, apresentamos as opções para o seu caso.' }
    ]
  },

  cta: {
    title: 'Quer Saber Qual Clareamento é Indicado para Você?',
    subtitle: 'Na avaliação, analisamos a causa do escurecimento e definimos o protocolo mais adequado.',
    buttonText: 'Agendar Minha Avaliação'
  },

  contact: {
    whatsappNumber: "5521993304045",
    whatsappMessage: "Olá! Tenho interesse em fazer clareamento dental PARTICULAR com a Dra. Carla Christoph. Pode me auxiliar?",
    doctorName: "Dra. Carla Christoph",
    clinicName: "Clínica Dra. Carla Christoph"
  },

  seo: {
    title: "Clareamento Dental em Ipanema | Resultado Natural - Dra. Carla Christoph",
    description: "Clareamento dental seguro e eficaz em Ipanema. Técnicas de consultório e caseiro supervisionado com a Dra. Carla Christoph. Agende sua avaliação.",
    keywords: ["clareamento dental", "clareamento dental ipanema", "dentista ipanema", "clareamento dental rio de janeiro", "clareamento dental particular"]
  },

  tracking: {
    gtmId: "GTM-WZRDNBKQ",
    gtagId: "AW-16894364517"
  }
};
