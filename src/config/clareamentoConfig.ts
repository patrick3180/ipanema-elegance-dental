import { LandingPageConfig } from "@/types/LandingPageConfig";

export const clareamentoConfig: LandingPageConfig = {
  campaign: "clareamento_dental_ipanema",

  messageMatch: {
    adGroup: "clareamento_dental",
    keyword: "clareamento dental ipanema"
  },

  whatsapp: {
    number: "5521993304045",
    message: "Olá! Vi sobre clareamento dental e gostaria de agendar uma consulta para saber qual protocolo é indicado para mim."
  },

  hero: {
    headline: 'Dentes Amarelados? Clareamento com Resultado Natural em Ipanema',
    subheadline: 'Protocolos personalizados para uma cor natural, sem aparência artificial. Mais de 20 anos de experiência em estética dental.',
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
    title: 'Você se identifica com alguma dessas situações?',
    description: 'O amarelamento é gradual — você nem percebe até ver uma foto antiga ou comparar. Se isso incomoda, saiba que clareamento profissional é seguro e os resultados são reais.',
    problems: [
      'Dentes amarelados por café, vinho ou chá — o escurecimento é gradual e você só percebe quando compara com uma foto antiga.',
      'Clareamento caseiro que não funciona — fitas, géis de farmácia ou receitas da internet com resultados fracos, irregulares ou que desaparecem em semanas.',
      'Medo de sensibilidade — já ouviu que clareamento dá muita dor, mas com protocolo individualizado e acompanhamento profissional, isso é controlável.',
      'Medo de ficar artificial — não querer dentes "branco azulejo". O objetivo é recuperar a cor natural, não exagerar.'
    ]
  },

  guide: {
    title: 'Como a Dra. Carla Christoph Conduz o Clareamento',
    subtitle: 'Protocolo individualizado — CRO-RJ 27.509. Cada caso tem sua indicação específica.',
    steps: [
      { number: '1', title: 'Consulta e Diagnóstico', description: 'Análise da causa do escurecimento, condição dos dentes e gengiva. Definição do protocolo mais adequado para o seu caso.' },
      { number: '2', title: 'Preparação Cuidadosa', description: 'Proteção dos tecidos gengivais e análise da sensibilidade para garantir segurança e conforto durante o procedimento.' },
      { number: '3', title: 'Aplicação Profissional', description: 'Clareamento de consultório (sessão de 45-60 min) ou moldeiras para clareamento caseiro supervisionado — depende do caso. Utilizamos somente géis clareadores de primeira linha.' },
      { number: '4', title: 'Acompanhamento dos Resultados', description: 'Monitoramento do progresso e orientações para manutenção. A cor estabiliza ao longo de 2 semanas após o término.' }
    ]
  },

  socialProof: {
    title: 'O Que Nossos Pacientes Contam',
    testimonials: [
      { name: 'Juliana M. — Leblon', text: 'Fiz o clareamento antes do meu casamento. Estava com medo de ficar artificial, mas ficou tão natural que ninguém percebeu que era clareamento — só elogiaram o sorriso.' },
      { name: 'Ricardo T. — Ipanema', text: 'Tomei café a vida inteira e meus dentes foram amarelando sem eu perceber. Depois do clareamento, minha filha disse que eu parecia 10 anos mais novo.' },
      { name: 'Beatriz A. — Copacabana', text: 'Já tinha tentado clareamento de farmácia duas vezes sem resultado. Na clínica foi completamente diferente — resultado uniforme e sem a sensibilidade que eu esperava.' }
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
      { question: 'Clareamento dental estraga o esmalte?', answer: 'Não. O clareamento profissional supervisionado não causa danos ao esmalte. O gel clareador age nos pigmentos internos do dente sem comprometer a estrutura.' },
      { question: 'Clareamento caseiro de farmácia funciona?', answer: 'Produtos de farmácia têm concentração muito baixa de agente clareador. O resultado é limitado, irregular e temporário. O clareamento profissional usa concentração adequada com supervisão, o que dá resultado uniforme e duradouro.' },
      { question: 'Quanto tempo dura o resultado do clareamento?', answer: 'Em média 2 a 3 anos, dependendo dos hábitos alimentares. Café, vinho e chá escurecem os dentes gradualmente. Manutenções periódicas são simples e mantêm o resultado.' },
      { question: 'Clareamento dá muita sensibilidade?', answer: 'Pode haver sensibilidade leve e temporária durante o tratamento, que dura de 24 a 48 horas. Com protocolo personalizado e dessensibilizante, a maioria dos pacientes relata desconforto mínimo.' },
      { question: 'Posso fazer clareamento se tenho restaurações?', answer: 'As restaurações existentes não clareiam — mantêm a cor original. Após o clareamento, avaliamos se alguma restauração precisa ser trocada para ficar na mesma cor dos dentes clareados.' },
      { question: 'Clareamento funciona em todas as manchas?', answer: 'Manchas por café, chá, vinho e tabaco respondem muito bem. Manchas internas por medicamento (tetraciclina) ou flúor têm resposta variável — nesses casos, avaliamos alternativas como lentes de porcelana.' },
      { question: 'Já tenho dentes sensíveis. Posso fazer clareamento?', answer: 'Sim, com adaptações no protocolo. Em pacientes com sensibilidade prévia, usamos géis em concentrações menores ao longo de mais sessões, aplicamos dessensibilizante antes e após cada aplicação, e indicamos pasta dental específica para sensibilidade durante o tratamento. Em alguns casos, fazemos uma fase preparatória só com dessensibilizante por uma semana antes de iniciar.' },
      { question: 'Como aliviar a sensibilidade durante e após o clareamento?', answer: 'Algumas medidas funcionam bem: usar pasta dental para sensibilidade nos dias do tratamento, evitar alimentos muito frios ou ácidos nas primeiras 48 horas, aplicar gel dessensibilizante (que fornecemos quando indicado) e tomar analgésico simples se houver desconforto. Avise sempre que sentir incômodo — ajustamos o protocolo na hora.' },
      { question: 'A sensibilidade do clareamento pode ser permanente?', answer: 'Não. A sensibilidade causada pelo clareamento é sempre transitória — passa em até 48 horas após cada aplicação e desaparece completamente quando o tratamento termina. O efeito é reversível porque o gel não causa lesão ao esmalte ou à dentina, apenas abre temporariamente os canais que conectam o exterior do dente à polpa.' }
    ]
  },

  cta: {
    title: 'Quer Saber Qual Clareamento é Indicado para Você?',
    subtitle: 'O clareamento é um dos tratamentos mais simples da odontologia estética. Uma consulta inicial mostra qual protocolo é indicado para a cor e o tipo dos seus dentes.',
    buttonText: 'Agendar Minha Consulta',
    urgency: 'O escurecimento dental tende a avançar com o tempo — quanto antes o tratamento, mais natural o resultado.'
  },

  contact: {
    whatsappNumber: "5521993304045",
    whatsappMessage: "Olá! Vi sobre clareamento dental e gostaria de agendar uma consulta para saber qual protocolo é indicado para mim.",
    doctorName: "Dra. Carla Christoph",
    clinicName: "Clínica Dra. Carla Christoph"
  },

  seo: {
    title: "Clareamento Dental em Ipanema | Resultado Natural - Dra. Carla Christoph",
    description: "Clareamento dental seguro e eficaz em Ipanema. Técnicas de consultório e caseiro supervisionado com a Dra. Carla Christoph. Agende sua consulta.",
    keywords: ["clareamento dental", "clareamento dental ipanema", "dentista ipanema", "clareamento dental rio de janeiro", "clareamento dental particular"]
  },

  tracking: {
    gtmId: "GTM-WZRDNBKQ",
    gtagId: "AW-16894364517"
  }
};
