import { LandingPageConfig } from "@/types/LandingPageConfig";

export const ortodontiaConfig: LandingPageConfig = {
  campaign: 'ortodontia-ipanema',
  
  messageMatch: {
    adGroup: 'Ortodontia - Aparelhos',
    keyword: 'ortodontista em ipanema'
  },
  
  whatsapp: {
    number: '5521993304045',
    message: 'Olá! Vi o site e gostaria de agendar uma consulta de planejamento para tratamento ortodôntico.'
  },
  
  hero: {
    headline: 'O Caminho para o Sorriso Alinhado que Transforma sua Confiança',
    subheadline: 'No consultório da Dra. Carla Christoph, nosso especialista Dr. Bruno Neves, Mestre e Doutor em Ortodontia, utiliza a mais alta tecnologia para planejar e executar seu tratamento. Conquiste a harmonia e a saúde do seu sorriso.',
    ctaText: 'Agendar meu Planejamento Ortodôntico Digital',
    backgroundImage: '/lovable-uploads/DrBruno_site.webp' 
  },
  
  benefits: [
    'Tratamento com Mestre e Doutor em Ortodontia',
    'Planejamento digital com Scanner 3D',
    'Opções de aparelhos: Invisalign, Estéticos e Convencionais',
    'Resultados previsíveis e mais rápidos'
  ],
  
  problem: {
    title: 'Você se sente desconfortável com a posição dos seus dentes?',
    description: 'Um sorriso desalinhado pode afetar não apenas a estética, mas também a função mastigatória e a sua autoconfiança no dia a dia. A ortodontia moderna oferece soluções para todas as idades e necessidades.',
    problems: [
      'Vergonha de sorrir em fotos ou ao conversar com pessoas.',
      'Dentes tortos ou "encavalados" que dificultam a higiene.',
      'Espaços entre os dentes (diastemas) que te incomodam.',
      'Mordida desconfortável ou que causa dores de cabeça.',
      'Desejo por um tratamento discreto, que não impacte sua vida social ou profissional.',
      'Busca por um especialista qualificado para um tratamento seguro e eficaz.'
    ]
  },
  
  guide: {
    title: 'Sua Jornada para um Sorriso Perfeito: Tecnologia e Expertise em Cada Etapa',
    subtitle: 'Nosso processo une a experiência de um especialista renomado com a precisão da tecnologia digital para garantir o melhor resultado.',
    steps: [
      { number: '1', title: 'Diagnóstico Digital com Scanner 3D', description: 'Adeus às massinhas de moldagem. Com um scanner intraoral 3D, criamos um modelo digital preciso da sua boca para um planejamento computadorizado, mais rápido e confortável.' },
      { number: '2', title: 'Planejamento e Simulação do Resultado', description: 'Com base no scan 3D, nosso especialista, Dr. Bruno Neves, planeja cada movimento dos seus dentes. Você poderá visualizar uma simulação de como seu sorriso ficará ao final do tratamento.' },
      { number: '3', title: 'Escolha do Aparelho Ideal para Você', description: 'Apresentamos as melhores opções para o seu caso: os discretos alinhadores Invisalign, os aparelhos fixos estéticos (transparentes) ou os eficientes aparelhos convencionais.' },
      { number: '4', title: 'Acompanhamento e Conquista do Sorriso', description: 'Realizamos consultas de acompanhamento para garantir que o tratamento evolua conforme o planejado, até a conquista do seu novo sorriso, perfeitamente alinhado e funcional.' }
    ]
  },

  socialProof: {
    title: 'A Confiança na Nossa Equipe de Especialistas',
    testimonials: [
        { name: 'Fernanda L.', text: 'Fiz meu tratamento com Invisalign e foi a melhor escolha! Super discreto, ninguém no trabalho percebia. O planejamento digital me deu muita segurança e a equipe foi incrível.', rating: 5 },
        { name: 'Lucas G.', text: 'Tinha um caso complexo de mordida e o Dr. Bruno resolveu com maestria. O uso do scanner 3D no início fez toda a diferença para eu entender o processo. Profissionalismo impecável.', rating: 5 },
        { name: 'Mariana P.', text: 'Optei pelo aparelho estético e amei o resultado. A Dra. Carla acompanha tudo de perto, e o Dr. Bruno é um ortodontista excepcional. Me senti muito segura e bem cuidada.', rating: 5 }
    ],
    stats: [
        { number: '20+', label: 'Anos de Experiência da Clínica' },
        { number: 'Dr.', label: 'Mestre e Doutor em Ortodontia' },
        { number: '100%', label: 'Foco no Planejamento Digital' },
        { number: '24h', label: 'Atendimento WhatsApp' }
    ]
  },
  
  faq: {
    title: 'Dúvidas Comuns sobre Tratamento Ortodôntico',
    questions: [
        { question: 'Quem é o ortodontista responsável pelo tratamento?', answer: 'Nosso especialista é o Dr. Bruno Moreira das Neves (CRO-RJ 41.684), Mestre e Doutor em Ortodontia pela UERJ e Professor de Pós-Graduação. Todo o tratamento é realizado por ele, com o acompanhamento e padrão de qualidade do consultório da Dra. Carla Christoph.' },
        { question: 'Invisalign funciona para o meu caso?', answer: 'O Invisalign é extremamente versátil e trata desde casos simples aos mais complexos. A avaliação inicial com o scanner 3D é fundamental para confirmar se esta é a melhor opção para você e para criar seu plano de tratamento digital.' },
        { question: 'O tratamento ortodôntico dói?', answer: 'É normal sentir um leve desconforto ou pressão nos dentes nos primeiros dias após a instalação do aparelho ou durante os ajustes. Essa sensação é temporária e um sinal de que o aparelho está funcionando. É totalmente controlável com analgésicos comuns.' },
        { question: 'Quanto tempo vai durar o meu tratamento?', answer: 'O tempo de tratamento varia muito de acordo com a complexidade de cada caso. Graças ao planejamento digital com o scanner 3D, conseguimos ter uma previsibilidade muito maior, otimizando o tempo e, em muitos casos, acelerando o processo.' }
    ]
  },
  
  cta: {
    title: 'Pronto(a) para Dar o Primeiro Passo Rumo ao Sorriso Alinhado?',
    subtitle: 'Agende sua consulta de planejamento digital e descubra como a tecnologia e a expertise de nossos especialistas podem transformar seu sorriso.',
    buttonText: 'Quero Agendar meu Planejamento'
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