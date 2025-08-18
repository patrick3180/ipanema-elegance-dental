import { LandingPageConfig } from "@/types/LandingPageConfig";

export const especialistaProteseConfig: LandingPageConfig = {
  campaign: 'especialista-protese-ipanema',
  
  messageMatch: {
    adGroup: 'especialista-protese-reabilitacao',
    keyword: 'especialista em protese dentaria'
  },
  
  whatsapp: {
    number: '5521993304045',
    message: 'Olá! Vi o site e gostaria de agendar uma consulta de planejamento com a especialista em prótese dentária.'
  },
  
  hero: {
    headline: 'Reabilitação Oral de Excelência com Especialista em Prótese Dentária em Ipanema',
    subheadline: 'Para casos complexos que exigem precisão e estética impecável. A Dra. Carla Christoph planeja e executa a reconstrução do seu sorriso, devolvendo a função e a confiança.',
    ctaText: 'Agende sua Consulta de Planejamento',
    backgroundImage: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp'
  },
  
  benefits: [
    'Planejamento detalhado e mock-up do resultado final',
    'Materiais de alta estética e longevidade',
    'Abordagem especializada para casos complexos',
    'Acompanhamento completo até o resultado perfeito'
  ],
  
  problem: {
    title: 'Você se identifica com algum destes desafios?',
    description: 'A reabilitação oral vai além de um único dente. É a reconstrução da harmonia do sorriso, especialmente para quem enfrenta situações mais complexas.',
    problems: [
      'Tratamentos anteriores que não deram certo ou já falharam.',
      'Dentes desgastados, quebrados ou com múltiplas restaurações antigas.',
      'Vergonha de sorrir devido à estética ou ausência de dentes.',
      'Dificuldade para mastigar e o sonho de comer com segurança.',
      'Busca por uma solução definitiva e de alta longevidade.',
      'Sensação de que seu caso precisa de um olhar mais detalhado e experiente.'
    ]
  },
  
  guide: {
    title: 'A Abordagem da Especialista: Do Planejamento à Execução',
    subtitle: 'Um tratamento de alto nível começa com um planejamento impecável. Cada passo é pensado para garantir o melhor resultado.',
    steps: [
      { number: '1', title: 'Consulta de Planejamento Detalhado', description: 'Análise facial, fotografias, exames digitais. Entendemos seus desejos para criar um plano personalizado.' },
      { number: '2', title: 'Mock-up e Teste do Sorriso', description: 'Você visualiza e "testa" o resultado final em sua própria boca antes mesmo de começarmos o tratamento.' },
      { number: '3', title: 'Execução Precisa e Estética', description: 'Utilizamos porcelana de alta estética e os materiais mais nobres da odontologia para um resultado perfeito.' },
      { number: '4', title: 'Acompanhamento e Longevidade', description: 'Garantimos o ajuste fino e o suporte para que seu novo sorriso dure por muitos e muitos anos.' }
    ]
  },

  socialProof: {
    title: 'Pacientes que Confiaram na Expertise da Dra. Carla',
    testimonials: [
        { name: 'Maria Helena R.', text: 'Eu já tinha passado por vários dentistas e ninguém resolvia meu caso. A Dra. Carla fez um planejamento completo e hoje tenho um sorriso que nunca imaginei ser possível. Sinto total segurança para comer e sorrir.', rating: 5 },
        { name: 'João Carlos A.', text: 'O diferencial é o cuidado com os detalhes. Desde a primeira consulta de planejamento, senti que estava no lugar certo. O resultado do meu tratamento ficou extremamente natural.', rating: 5 },
        { name: 'Beatriz L.', text: 'Depois de anos com próteses antigas, o trabalho da Dra. Carla transformou minha autoestima. A abordagem dela como especialista fez toda a diferença.', rating: 5 }
    ],
    stats: [
        { number: '20+', label: 'Anos de Experiência' },
        { number: '4.000+', label: 'Pacientes Atendidos' },
        { number: '100%', label: 'Foco no Planejamento' },
        { number: '24h', label: 'Atendimento WhatsApp' }
    ]
  },
  
  faq: {
    title: 'Dúvidas Comuns sobre Reabilitação Oral',
    questions: [
        { question: 'Qual a diferença entre um dentista comum e uma especialista em prótese?', answer: 'A especialista tem formação específica em reabilitação oral, domina técnicas avançadas e tem experiência em casos complexos. O planejamento é mais detalhado e o resultado mais previsível.' },
        { question: 'Como funciona o mock-up do sorriso?', answer: 'Criamos uma versão temporária do seu novo sorriso que você pode testar na própria boca. Assim, você vê e sente o resultado antes do tratamento definitivo.' },
        { question: 'Quanto tempo dura uma prótese bem feita?', answer: 'Com materiais de qualidade e técnica adequada, uma prótese pode durar 15-20 anos ou mais. O acompanhamento regular garante a longevidade.' },
        { question: 'Meu caso é muito complexo. Vocês atendem?', answer: 'Casos complexos são nossa especialidade. Quanto mais desafiador, mais nos dedicamos ao planejamento para encontrar a melhor solução.' }
    ]
  },
  
  cta: {
    title: 'Pronto para Recomeçar a História do seu Sorriso?',
    subtitle: 'Dê o primeiro passo com uma consulta de planejamento detalhada. Vamos construir juntos a solução ideal para o seu caso.',
    buttonText: 'Quero Agendar meu Planejamento'
  },
  
  contact: {
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi o site e gostaria de agendar uma consulta de planejamento com a especialista em prótese dentária.',
    doctorName: 'Dra. Carla Christoph',
    clinicName: 'Consultório Odontológico'
  },
  
  seo: {
    title: 'Especialista em Prótese Dentária Ipanema | Reabilitação Oral',
    description: 'Reabilitação oral para casos complexos em Ipanema. Dra. Carla Christoph, especialista em prótese dentária, planeja e executa seu novo sorriso com precisão.',
    keywords: [
      'especialista em prótese dentária ipanema',
      'reabilitação oral ipanema',
      'prótese dentária fixa ipanema',
      'coroa de porcelana ipanema',
      'prótese sobre implante ipanema',
      'clínica de reabilitação oral',
      'melhor protesista rio de janeiro',
      'planejamento de sorriso'
    ]
  },
  
  tracking: {
    gtagId: 'AW-16894364517',
    gtmId: 'GTM-WZRDNBKQ'
  }
};