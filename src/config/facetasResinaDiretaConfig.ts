import { LandingPageConfig } from "@/types/LandingPageConfig";

export const facetasResinaDiretaConfig: LandingPageConfig = {
  campaign: 'Pesquisa - Lentes de Contato - Zona Sul',

  messageMatch: {
    adGroup: 'Facetas de Resina',
    keyword: 'facetas de resina'
  },

  whatsapp: {
    number: '5521993304045',
    message: 'Olá! Vi no site sobre facetas de resina e gostaria de agendar uma consulta com a Dra. Carla.'
  },

  hero: {
    // Onda 1 (jul/2026): H1 encurtado — o anterior tinha 4 linhas no mobile e empurrava o CTA p/ fora da dobra
    headline: 'Facetas de resina em Ipanema — feitas em uma única sessão',
    subheadline: 'Facetas esculpidas diretamente no dente pela Dra. Carla Christoph. Você acompanha e aprova cada etapa antes de finalizar — sem pressa e sem surpresas.',
    ctaText: 'Agendar minha consulta',
    backgroundImage: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp'
  },

  benefits: [
    'Em geral, feitas em uma única sessão',
    'Procedimento minimamente invasivo',
    'WhatsApp 24h — tire dúvidas agora',
    '20+ anos de experiência em estética dental'
  ],

  problem: {
    title: 'Você Se Identifica com Alguma Dessas Situações?',
    description: 'As facetas de resina são uma opção para mudar forma, cor ou pequenos espaços dos dentes com preparo mínimo, mantendo a aparência natural.',
    problems: [
      'Um evento importante está se aproximando e você quer um sorriso mais bonito nas fotos.',
      'Seus dentes têm manchas, lascas ou espaços que te incomodam no dia a dia.',
      'Você quer melhorar a estética do sorriso, mas sem o investimento das lentes de porcelana no momento.',
      'Prefere um tratamento minimamente invasivo, que preserve ao máximo a estrutura dos seus dentes.',
      'Quer acompanhar e aprovar o resultado durante o procedimento — sem surpresas.',
      'Busca um atendimento com profissional experiente, em clínica especializada em Ipanema.'
    ]
  },

  guide: {
    title: 'Como Funciona o Processo com a Dra. Carla Christoph',
    subtitle: 'Do primeiro contato ao sorriso pronto — cada etapa pensada para sua segurança e satisfação.',
    steps: [
      { number: '1', title: 'Conversa Inicial', description: 'Mande uma mensagem no WhatsApp. Nós iremos entender o que te incomoda, tirar suas dúvidas e agendar um horário para você.' },
      { number: '2', title: 'Consulta e Planejamento', description: 'Na consulta, a Dra. Carla examina seus dentes, ouve com atenção o que você deseja e explica o que é possível alcançar com as facetas de resina no seu caso — com total transparência.' },
      { number: '3', title: 'Test Drive do Sorriso', description: 'Caso tenha dúvidas sobre o resultado, a Dra. Carla pode aplicar uma resina removível para que você visualize e aprove o resultado final antes de colocar a resina definitiva.' },
      { number: '4', title: 'Escultura com Aprovação em Tempo Real', description: 'As facetas são esculpidas dente a dente, diretamente na sua boca. Você acompanha cada etapa e aprova o resultado antes de finalizar.' },
      { number: '5', title: 'Acabamento e Polimento', description: 'A sessão termina com acabamento de alta precisão e polimento com brilho natural. Você sai com as facetas prontas e orientações claras de cuidados.' }
    ]
  },

  socialProof: {
    title: 'O Que Nossos Pacientes Contam',
    testimonials: [
      { name: 'Camila R. — Ipanema', text: 'Tinha um casamento em duas semanas e estava infeliz com meus dentes. A Dra. Carla fez as facetas de resina em uma sessão. Me senti muito mais confiante nas fotos.' },
      { name: 'Pedro N. — Leblon', text: 'O processo de ver como ia ficar antes de fazer me deu muita segurança. O resultado ficou natural, ninguém diz que é resina.' },
      { name: 'Sofia L. — Copacabana', text: 'Eu queria fazer pequenos ajustes e o processo foi bem mais simples do que eu imaginava. O resultado ficou delicado e natural — exatamente como eu queria.' }
    ],
    stats: [
      { number: '20+', label: 'Anos de Experiência' },
      { number: '10.000+', label: 'Pacientes Atendidos' },
      { number: '1h+', label: 'Mínimo por Consulta' },
      { number: '24h', label: 'Atendimento WhatsApp' }
    ]
  },

  faq: {
    title: 'Dúvidas Comuns sobre Facetas de Resina',
    questions: [
      { question: 'Qual a durabilidade das facetas de resina?', answer: 'Com os devidos cuidados e manutenções anuais (polimento), as facetas de resina compostas nanoparticuladas podem durar em média de 5 a 7 anos, mantendo a estética e o brilho.' },
      { question: 'A resina mancha com o tempo?', answer: 'Pode manchar com o tempo, mais que a porcelana. Evitar excesso de alimentos e bebidas muito pigmentados e fazer o polimento anual ajudam a manter a cor estável por mais tempo.' },
      { question: 'Qual a principal diferença para a porcelana?', answer: 'A resina é esculpida direto no dente, em geral em uma única sessão. A porcelana é feita em laboratório, em mais sessões, dura mais (em média 15 anos ou mais) e resiste melhor a manchas. Na consulta, a Dra. Carla explica a indicação e os valores de cada uma.' },
      { question: 'Como saberei como ficará o resultado final?', answer: 'Antes de qualquer trabalho definitivo, a Dra. Carla pode aplicar uma resina removível para que você visualize e aprove o resultado. Uma vez que esteja tudo aprovado, ela faz o trabalho com a resina definitiva. Você vê na prática, na própria boca, como ficará o sorriso antes dele ser feito.' },
      { question: 'Quanto custa fazer facetas de resina?', answer: 'O valor depende do número de dentes e do planejamento estético para o seu caso. Em geral, a resina tem investimento menor que a porcelana. Na consulta inicial, apresentamos o investimento completo com valores claros — você decide no seu tempo.' },
      { question: 'Como funciona o agendamento?', answer: 'Envie uma mensagem pelo WhatsApp descrevendo o que você deseja e nós iremos encontrar o melhor horário para você. A consulta com a Dra. Carla é feita sem pressa. Ela irá escutar com bastante atenção o que você deseja e apresentar a proposta de plano de tratamento. Caso tenha dúvidas, ela pode fazer o test drive do sorriso — uma aplicação de resina removível para que você possa ver e aprovar o resultado final antes de colocar a resina definitiva.' },
      { question: 'O atendimento é particular?', answer: 'Sim. O atendimento da Dra. Carla é particular, o que permite dedicar tempo real ao seu caso e escolher o material indicado para ele. Emitimos recibo para solicitação de reembolso ao seu convênio, caso o seu plano permita.' }
    ]
  },

  cta: {
    title: 'Seu Sorriso Merece essa Atenção',
    subtitle: 'Mande uma mensagem no WhatsApp e converse com a equipe da Dra. Carla sobre as suas facetas. Consulta individual, com tempo dedicado ao seu caso e valores apresentados com clareza.',
    buttonText: 'Quero Falar Sobre Minhas Facetas',
    urgency: 'Pequenas correções de forma e cor ficam mais simples quando planejadas com antecedência.'
  },

  contact: {
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi no site sobre facetas de resina e gostaria de agendar uma consulta com a Dra. Carla.',
    doctorName: 'Dra. Carla Christoph',
    clinicName: 'Consultório Odontológico'
  },

  seo: {
    title: 'Facetas de Resina Direta em Ipanema | Dra. Carla Christoph',
    description: 'Facetas de resina esculpidas direto no dente, em geral em uma única sessão, em Ipanema. Test Drive do Sorriso quando indicado. Dra. Carla Christoph — 20+ anos de experiência.',
    keywords: [
      'facetas de resina ipanema',
      'lentes de resina preço',
      'restauração estética em resina',
      'dentista especialista em resina ipanema',
      'sorriso rápido para evento',
      'fechar diastema com resina',
      'dentes manchados solução rápida',
      'estética dental acessível'
    ]
  },

  tracking: {
    gtagId: 'AW-16894364517',
    gtmId: 'GTM-WZRDNBKQ'
  }
};