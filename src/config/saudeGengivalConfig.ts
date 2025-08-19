import { LandingPageConfig } from "@/types/LandingPageConfig";

export const saudeGengivalConfig: LandingPageConfig = {
  campaign: 'Pesquisa - Clinica Geral - Zona Sul',
  
  messageMatch: {
    adGroup: 'Saúde da Gengiva',
    keyword: 'cuidado com a gengiva'
  },
  
  whatsapp: {
    number: '5521993304045',
    message: 'Olá! Vi o site e gostaria de agendar uma consulta para cuidar da saúde da minha gengiva.'
  },
  
  hero: {
    headline: 'O Caminho para uma Gengiva Saudável e um Sorriso Confiante',
    subheadline: 'Sangramento, sensibilidade ou mau hálito são sinais de alerta. Descubra como cuidados profissionais podem restaurar a saúde da sua gengiva de forma eficaz e devolver o seu bem-estar.',
    ctaText: 'Agende sua Avaliação de Saúde Gengival',
    backgroundImage: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp' 
  },
  
  benefits: [
    'Recuperação da saúde da gengiva',
    'Fim do sangramento e do desconforto',
    'Prevenção de problemas futuros',
    'Atendimento cuidadoso e acolhedor'
  ],
  
  problem: {
    title: 'Você se identifica com algum destes sinais?',
    description: 'Milhões de brasileiros convivem com desconfortos na gengiva, muitas vezes em silêncio. Saiba que a grande maioria dos casos pode ser resolvida com um tratamento simples e eficaz quando diagnosticado no início.',
    problems: [
      'Percebe sangramento na gengiva ao escovar os dentes ou usar o fio dental.',
      'Sente suas gengivas sensíveis, inchadas ou com uma coloração avermelhada.',
      'Sofre com mau hálito persistente, mesmo com uma boa higiene.',
      'Nota um leve afastamento da gengiva em alguns dentes (retração).',
      'Tem receio de que um problema simples possa evoluir para algo mais sério.',
      'Busca uma solução para ter mais segurança e conforto ao sorrir, comer e falar.'
    ]
  },
  
  guide: {
    title: 'Recuperando a Saúde da Sua Gengiva: O Passo a Passo do Cuidado',
    subtitle: 'Nossa abordagem foca na causa do problema. O primeiro passo é remover a placa bacteriana de forma profissional e te orientar para manter a saúde em casa.',
    steps: [
      { number: '1', title: 'Diagnóstico Preciso e Acolhedor', description: 'Realizamos uma avaliação detalhada para entender a saúde da sua gengiva. É uma consulta sem julgamentos, focada em encontrar a melhor solução para você.' },
      { number: '2', title: 'Profilaxia Profissional Completa', description: 'Através de uma limpeza minuciosa com ultrassom e outros instrumentos, removemos a placa bacteriana e o tártaro que a escova não alcança, inclusive abaixo da linha da gengiva.' },
      { number: '3', title: 'Orientações Personalizadas', description: 'Ensinamos a técnica correta de escovação e uso do fio dental para o seu caso específico. O cuidado em casa é o maior segredo para um resultado duradouro.' },
      { number: '4', title: 'Plano de Acompanhamento', description: 'Definimos um plano de prevenção com limpezas periódicas (geralmente a cada 6 meses) para manter sua gengiva sempre saudável e evitar que o problema retorne.' }
    ]
  },

  socialProof: {
    title: 'Pacientes que Recuperaram o Conforto e a Confiança',
    testimonials: [
        { name: 'Cláudia M.', text: 'Eu achava que o sangramento era normal, até fazer a limpeza com a Dra. Carla. Na primeira semana já parou de sangrar. Foi um alívio imenso, me sinto muito mais segura agora.', rating: 5 },
        { name: 'Roberto F.', text: 'O mau hálito me incomodava muito. Depois da profilaxia e das orientações, o problema desapareceu. O cuidado e a atenção da equipe fizeram toda a diferença.', rating: 5 },
        { name: 'Patrícia A.', text: 'Tinha medo de ser algo grave. A Dra. Carla me tranquilizou e explicou que com a limpeza e cuidados em casa, resolveríamos. E resolvemos! Sou muito grata pelo atendimento.', rating: 5 }
    ],
    stats: [
        { number: '97%', label: 'Das crianças e adolescentes no Brasil apresentam gengivite' },
        { number: '51%', label: 'Dos adultos brasileiros convivem com sangramento gengival' },
        { number: '100%', label: 'Reversível quando tratado no início' },
        { number: '24h', label: 'Atendimento WhatsApp' }
    ]
  },
  
  faq: {
    title: 'Dúvidas Comuns sobre Saúde Gengival',
    questions: [
        { question: 'Sangrar a gengiva um pouco é normal?', answer: 'Não, uma gengiva saudável não sangra. O sangramento é o primeiro sinal de inflamação (gengivite) e indica que a área precisa de mais atenção e, possivelmente, de uma limpeza profissional.' },
        { question: 'O tratamento para a gengiva dói?', answer: 'A profilaxia (limpeza) profissional é geralmente indolor. Em casos de maior sensibilidade, podemos utilizar anestésicos tópicos para garantir seu total conforto durante o procedimento.' },
        { question: 'Com que frequência devo fazer a limpeza profissional?', answer: 'Para a maioria das pessoas, o ideal é a cada 6 meses. Essa frequência garante a remoção do tártaro que se forma naturalmente e previne o surgimento de inflamações gengivais.' },
        { question: 'Preciso de um especialista (periodontista)?', answer: 'A grande maioria dos casos de gengivite é resolvida com a profilaxia profissional e a melhora dos hábitos de higiene. Caso seja identificado um problema mais avançado (periodontite), nossa clínica conta com uma especialista para dar continuidade ao tratamento.' }
    ]
  },
  
  cta: {
    title: 'Pronto(a) para Dar o Primeiro Passo Rumo a uma Gengiva Saudável?',
    subtitle: 'Agende sua avaliação. Cuidar da sua gengiva é cuidar da sua saúde geral e do seu bem-estar.',
    buttonText: 'Quero Agendar Minha Avaliação'
  },
  
  contact: {
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi o site e gostaria de agendar uma consulta para cuidar da saúde da minha gengiva.',
    doctorName: 'Dra. Carla Christoph',
    clinicName: 'Consultório Odontológico'
  },
  
  seo: {
    title: 'Cuidado Gengival Ipanema | Tratamento para Saúde da Gengiva',
    description: 'Especialista em saúde gengival em Ipanema. Tratamento para sangramento, sensibilidade e prevenção. Agende sua avaliação e recupere seu bem-estar.',
    keywords: [
      'saúde da gengiva ipanema',
      'cuidado com a gengiva',
      'limpeza dental profissional ipanema',
      'profilaxia dental',
      'gengiva sensível tratamento',
      'prevenção periodontal',
      'dentista ipanema',
      'higiene bucal'
    ]
  },
  
  tracking: {
    gtagId: 'AW-16894364517',
    gtmId: 'GTM-WZRDNBKQ'
  }
};