import { LandingPageConfig } from "@/types/LandingPageConfig";

export const ortodontiaConfig: LandingPageConfig = {
  campaign: 'Pesquisa - Ortodontia',
  
  messageMatch: {
    adGroup: 'Ortodontia - Aparelhos',
    keyword: 'ortodontista em ipanema'
  },
  
  whatsapp: {
    number: '5521993304045',
    message: 'Olá! Vi o site e gostaria de agendar uma consulta de planejamento para tratamento ortodôntico.'
  },
  
  hero: {
    headline: 'Ortodontia Conduzida por Doutor em Ortodontia pela UERJ',
    subheadline: 'Dr. Bruno, Doutor em Ortodontia pela UERJ e Professor no IOPUC-Rio, planeja cada caso com escaneamento digital 3D. Opções de alinhadores Invisalign, aparelho estético e convencional.',
    ctaText: 'Agendar Minha Avaliação Ortodôntica',
    backgroundImage: '/lovable-uploads/DrBruno_site.webp' 
  },
  
  benefits: [
    'Doutor em Ortodontia (UERJ)',
    'Escaneamento digital com Scanner 3D',
    'Invisalign, estético e convencional',
    'WhatsApp 24h'
  ],
  
  problem: {
    title: 'Dentes Desalinhados Afetam Mais do que a Estética',
    description: 'Dentes tortos ou mal posicionados dificultam a higiene, sobrecarregam a mordida e podem causar desgaste precoce. A ortodontia corrige a posição dos dentes para melhorar função e estética — em qualquer idade.',
    problems: [
      'Dentes "encavalados" que dificultam a escovação e acumulam tártaro.',
      'Mordida desalinhada que causa desconforto ou dor na articulação (ATM).',
      'Espaços entre os dentes que incomodam esteticamente.',
      'Evitar sorrir abertamente por causa da posição dos dentes.',
      'Ser adulto e achar que "passou da idade" para usar aparelho.',
      'Querer um tratamento discreto que não interfira na rotina profissional.'
    ]
  },
  
  guide: {
    title: 'Como Funciona o Tratamento Ortodôntico com o Dr. Bruno',
    subtitle: 'Doutor em Ortodontia (UERJ), Mestre em Clínica Odontológica (UFF) e Professor de Ortodontia no IOPUC-Rio.',
    steps: [
      { number: '1', title: 'Diagnóstico com Scanner 3D', description: 'Escaneamento digital da boca — sem massinha de moldagem. O modelo 3D permite diagnóstico preciso e planejamento computadorizado do tratamento.' },
      { number: '2', title: 'Planejamento e Simulação', description: 'Dr. Bruno planeja cada movimento dos dentes digitalmente. Você visualiza uma simulação do resultado antes de começar.' },
      { number: '3', title: 'Escolha do Aparelho', description: 'Definição da melhor opção para o seu caso: alinhadores Invisalign, aparelho fixo estético (transparente) ou convencional. A indicação é clínica, não comercial.' },
      { number: '4', title: 'Acompanhamento até a Contenção', description: 'Consultas regulares para ajustes e monitoramento da evolução. Ao final, instalação da contenção para manter o resultado.' }
    ]
  },

  socialProof: {
    title: 'O Que Nossos Pacientes Contam Sobre o Tratamento',
    testimonials: [
      { name: 'Fernanda L. — Ipanema', text: 'Fiz com Invisalign e no trabalho ninguém notava que eu estava em tratamento. O planejamento digital me mostrou como ficaria antes de começar — isso me deu segurança.' },
      { name: 'Lucas G. — Leblon', text: 'Tinha um caso complexo de mordida e o Dr. Bruno explicou cada etapa com calma. O scanner 3D substituiu a moldagem — muito mais confortável. O resultado ficou como o planejado.' },
      { name: 'Mariana P. — Copacabana', text: 'Comecei o tratamento aos 35 anos. O aparelho estético foi discreto e o acompanhamento do Dr. Bruno foi atencioso do início à contenção.' }
    ],
    stats: [
      { number: '20+', label: 'Anos de Experiência da Clínica' },
      { number: 'Doutorado', label: 'Ortodontia pela UERJ' },
      { number: 'Professor', label: 'Ortodontia no IOPUC-Rio' },
      { number: '24h', label: 'WhatsApp Disponível' }
    ]
  },
  
  faq: {
    title: 'Dúvidas Sobre Tratamento Ortodôntico',
    questions: [
      { question: 'Quem é o ortodontista responsável?', answer: 'Dr. Bruno, Doutor em Ortodontia pela UERJ, Mestre em Clínica Odontológica pela UFF e Professor de Pós-Graduação em Ortodontia no IOPUC-Rio. Todo o tratamento é conduzido por ele, dentro do consultório da Dra. Carla Christoph.' },
      { question: 'Adulto pode usar aparelho ortodôntico?', answer: 'Sim. Não há limite de idade para ortodontia. O que importa é a condição dos dentes e do osso. Muitos dos nossos pacientes iniciam o tratamento após os 30 ou 40 anos.' },
      { question: 'Invisalign funciona para casos complexos?', answer: 'Em muitos casos, sim. O Invisalign evoluiu e hoje trata desde casos simples até os mais complexos. A avaliação com scanner 3D define se é a melhor opção para o seu caso específico.' },
      { question: 'O tratamento ortodôntico dói?', answer: 'É normal sentir pressão nos dentes nos primeiros dias após a instalação ou ajustes. A sensação é temporária e controlável com analgésicos simples. A maioria dos pacientes se adapta rapidamente.' },
      { question: 'Quanto tempo dura o tratamento?', answer: 'Varia conforme a complexidade. Casos simples podem levar de 6 a 12 meses; casos mais complexos, de 18 a 30 meses. O planejamento digital permite estimar a duração com mais precisão.' },
      { question: 'Preciso usar contenção depois?', answer: 'Sim. A contenção é parte essencial do tratamento — é o que mantém os dentes na posição corrigida. Pode ser fixa (colada atrás dos dentes) ou removível, dependendo do caso.' }
    ]
  },
  
  cta: {
    title: 'Quer Saber Qual Tratamento Ortodôntico é Indicado para Você?',
    subtitle: 'Na avaliação, o Dr. Bruno analisa seu caso com escaneamento 3D e apresenta as opções mais adequadas.',
    buttonText: 'Agendar Minha Avaliação'
  },
  
  contact: {
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi o site e gostaria de agendar uma consulta de planejamento para tratamento ortodôntico.',
    doctorName: 'Dra. Carla Christoph & Dr. Bruno Neves',
    clinicName: 'Consultório Odontológico'
  },
  
  seo: {
    title: 'Ortodontista Ipanema | Aparelho Invisalign e Estético',
    description: 'Especialista em Ortodontia em Ipanema. Tratamento com Invisalign, aparelho estético e convencional. Planejamento digital com scanner 3D. Agende!',
    keywords: [
      'ortodontista ipanema',
      'aparelho ortodôntico ipanema',
      'invisalign ipanema',
      'aparelho invisível',
      'aparelho estético',
      'clínica de ortodontia zona sul',
      'melhor ortodontista rio de janeiro',
      'scanner 3d ortodontia'
    ]
  },
  
  tracking: {
    gtagId: 'AW-16894364517',
    gtmId: 'GTM-WZRDNBKQ'
  }
};
