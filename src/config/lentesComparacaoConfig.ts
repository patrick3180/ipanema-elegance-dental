import { LandingPageConfig } from "@/types/LandingPageConfig";

// LP de DECISÃO (paciente indeciso): resina × porcelana.
// Ad group "Lentes de Contato" (geral) — keyword âncora "lente de contato dental".
// Termo-âncora obrigatório no headline/subheadline/seo para Quality Score.
export const lentesComparacaoConfig: LandingPageConfig = {
  campaign: 'Pesquisa - Lentes de Contato - Zona Sul',

  messageMatch: {
    adGroup: 'Lentes de Contato',
    keyword: 'lente de contato dental'
  },

  whatsapp: {
    number: '5521993304045',
    message: 'Olá! Vi a página sobre lentes de contato dental e quero entender qual indicação para meu caso — resina ou porcelana.'
  },

  hero: {
    headline: 'Lente de Contato Dental em Ipanema: Resina ou Porcelana?',
    subheadline: 'Lente de contato dental pode ser feita em porcelana ou em resina — e cada material tem a sua indicação. Com o Test Drive do Sorriso e o scanner iTero Element 5D, a Dra. Carla Christoph ajuda você a descobrir qual combina com o seu sorriso, na consulta.',
    ctaText: 'Agendar Minha Consulta pelo WhatsApp',
    backgroundImage: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp'
  },

  benefits: [
    'Resina ou porcelana? Descubra na consulta',
    'Test Drive do Sorriso antes de decidir',
    'Scanner iTero Element 5D quando indicado',
    'Fecha diastema e ajusta o formato do dente'
  ],

  problem: {
    title: 'Você quer fechar um diastema ou mudar o formato do dente — mas não sabe qual material?',
    description: 'Tanto a resina quanto a porcelana resolvem esses casos. A diferença está na durabilidade, no número de sessões e no investimento. Veja se você se identifica:',
    problems: [
      'Tem um espaço entre os dentes da frente (diastema) e quer fechá-lo, mas não sabe se faz com resina ou porcelana.',
      'Quer mudar o formato, o tamanho ou a cor dos dentes e ficou na dúvida entre lente de contato dental e faceta de resina.',
      'Pesquisou os dois materiais, viu durabilidades e custos diferentes, e ficou ainda mais confuso sobre qual escolher.',
      'Quer um resultado natural, sem aspecto artificial — e teme escolher o material errado para o seu caso.'
    ]
  },

  guide: {
    title: 'Como a Dra. Carla decide com você: resina ou porcelana',
    subtitle: 'A escolha do material é individual e definida na consulta, com você participando de cada etapa — com a experiência de quem atua há mais de duas décadas em estética dental.',
    steps: [
      { number: '1', title: 'Conversa e Análise do seu Caso', description: 'Você conta o que te incomoda — diastema, formato, cor. A Dra. Carla examina seus dentes e explica o que é possível com resina e com porcelana no seu caso específico.' },
      { number: '2', title: 'Test Drive do Sorriso', description: 'Antes de qualquer decisão definitiva, a Dra. Carla pode aplicar uma resina provisória não adesiva sobre os seus dentes. Você vê, sente e aprova o novo formato antes de decidir.' },
      { number: '3', title: 'Escaneamento iTero, quando indicado', description: 'Em casos de porcelana, o scanner iTero Element 5D faz o planejamento digital sem moldagem com massa — preciso e confortável.' },
      { number: '4', title: 'Você Escolhe com Clareza', description: 'Com tudo explicado — durabilidade, manutenção, número de sessões e investimento de cada opção — você decide o material com tranquilidade, no seu tempo.' }
    ]
  },

  socialProof: {
    title: 'Pacientes que vieram indecisos — e saíram com o sorriso resolvido',
    testimonials: [
      { name: 'Marina V. — Ipanema', text: 'Cheguei sem saber se queria resina ou porcelana. A Dra. Carla me explicou os dois com calma e fizemos o Test Drive. Fechei o espaço entre os dentes e ficou super natural.' },
      { name: 'Rafael S. — Botafogo', text: 'Pesquisei muito na internet e só me confundia. Na consulta entendi que, no meu caso, a resina resolvia o formato do dente sem precisar de porcelana. Foi direto e honesto.' },
      { name: 'Letícia A. — Leblon', text: 'Eu queria algo duradouro e que não manchasse. Optamos pela porcelana depois de ver tudo no planejamento digital. Ninguém percebe que são lentes.' }
    ],
    stats: [
      { number: '20+', label: 'Anos em Estética Dental' },
      { number: '4.000+', label: 'Pacientes Atendidos' },
      { number: 'iTero', label: 'Scanner Element 5D' },
      { number: '24h', label: 'WhatsApp Disponível' }
    ]
  },

  faq: {
    title: 'Resina ou Porcelana: Dúvidas Frequentes',
    questions: [
      { question: 'Qual a diferença entre lente de porcelana e faceta de resina?', answer: 'A lente de contato dental em porcelana é uma lâmina ultrafina de cerâmica (0,2 a 0,5mm), feita em laboratório, com durabilidade média de 15 a 20 anos (dependendo dos cuidados) e que não mancha. A faceta de resina é esculpida diretamente no dente, em 1 a 2 sessões, com durabilidade de 5 a 8 anos e investimento mais acessível. Na consulta, a Dra. Carla avalia qual indicação faz sentido para o seu caso.' },
      { question: 'Lente de resina mancha?', answer: 'A resina composta pode absorver pigmentos de café, vinho e cigarro ao longo dos anos, por isso pede polimento periódico para manter o brilho. Já a porcelana é impermeável e mantém a cor estável. Esse é um dos pontos que pesam na escolha do material.' },
      { question: 'Dá para fechar diastema (espaço entre os dentes) com lente de contato dental?', answer: 'Sim. Tanto a resina quanto a porcelana fecham diastemas. Em espaços pequenos, a resina costuma resolver de forma rápida; em casos que pedem mais durabilidade e estabilidade de cor, a porcelana pode ser a melhor indicação. A Dra. Carla define isso com você na consulta.' },
      { question: 'Consigo mudar o formato do dente?', answer: 'Sim. Lentes e facetas permitem ajustar formato, tamanho, bordas e proporção dos dentes. Com o Test Drive do Sorriso você visualiza o novo formato na própria boca antes de decidir.' },
      { question: 'Quanto custa? Resina é mais barata que porcelana?', answer: 'Sim, a resina costuma ter investimento mais acessível. A porcelana é mais durável e resistente a manchas, por isso o investimento é maior e pensado para o longo prazo. Os valores dependem do número de dentes e do planejamento do seu caso, e são apresentados com clareza na consulta — você decide no seu tempo.' },
      { question: 'O atendimento é particular?', answer: 'Sim. O atendimento da Dra. Carla é particular, o que permite dedicar tempo real ao seu caso e usar materiais de primeira linha. Emitimos recibo para solicitação de reembolso ao seu convênio, caso o seu plano permita.' }
    ]
  },

  cta: {
    title: 'A melhor escolha aparece na consulta',
    subtitle: 'Mande uma mensagem no WhatsApp e converse com a equipe da Dra. Carla. Na consulta, você entende qual material — resina ou porcelana — combina com o seu sorriso, com tempo dedicado ao seu caso e valores apresentados com clareza.',
    buttonText: 'Agendar Minha Consulta',
    urgency: 'Fechar um diastema ou ajustar o formato do dente fica mais simples quando planejado com antecedência.'
  },

  contact: {
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi a página sobre lentes de contato dental e quero entender qual indicação para meu caso — resina ou porcelana.',
    doctorName: 'Dra. Carla Christoph',
    clinicName: 'Consultório Odontológico'
  },

  seo: {
    title: 'Lente de Contato Dental em Ipanema: Resina ou Porcelana? | Dra. Carla',
    description: 'Lente de contato dental em Ipanema: resina ou porcelana? Entenda durabilidade, manchas e investimento e descubra a melhor opção para o seu sorriso com a Dra. Carla Christoph.',
    keywords: [
      'lente de contato dental',
      'lente de contato dental ipanema',
      'resina ou porcelana',
      'faceta de resina ou porcelana',
      'fechar diastema',
      'mudar formato do dente',
      'lentes dentais ipanema',
      'faceta dentária'
    ]
  },

  tracking: {
    gtagId: 'AW-16894364517',
    gtmId: 'GTM-WZRDNBKQ'
  }
};
