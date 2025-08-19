import { LandingPageConfig } from "@/types/LandingPageConfig";

export const esteticaSorrisoGenericaConfig: LandingPageConfig = {
  campaign: 'Pesquisa - Lentes de Contato - Zona Sul',
  
  messageMatch: {
    adGroup: 'Lentes de Contato',
    keyword: 'estetica dental'
  },
  
  whatsapp: {
    number: '5521993304045',
    message: 'Olá! Vi o site e gostaria de agendar uma consulta para avaliar e melhorar meu sorriso.'
  },
  
  hero: {
    headline: 'A Conquista do Sorriso que Você Sempre Sonhou',
    subheadline: 'Seja através da arte da resina ou da excelência da porcelana, a Dra. Carla desenha a solução ideal para você. Descubra o caminho para um sorriso mais harmônico, confiante e natural.',
    ctaText: 'Quero agendar uma consulta',
    backgroundImage: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp'
  },
  
  benefits: [
    'Planejamento 100% personalizado para você',
    'Opções para diferentes necessidades e objetivos',
    'Foco total na harmonia e naturalidade do resultado',
    'Tecnologia para previsibilidade do resultado'
  ],
  
  problem: {
    title: 'Você sonha com um sorriso mais bonito, mas não sabe por onde começar?',
    description: 'É comum sentir-se insatisfeito com algum detalhe do sorriso. A boa notícia é que a odontologia estética moderna oferece caminhos seguros e eficazes para corrigir praticamente qualquer imperfeição.',
    problems: [
      'A cor dos seus dentes te incomoda e clareamentos não resolvem.',
      'Você possui pequenos espaços, lascas ou desgastes.',
      'O formato ou tamanho de alguns dentes quebra a harmonia do seu sorriso.',
      'Você deseja um resultado estético, mas tem medo que pareça artificial.',
      'Não sabe se o ideal para você seria resina ou porcelana.',
      'Procura uma especialista que possa avaliar seu caso e indicar a melhor solução.'
    ]
  },
  
  guide: {
    title: 'Qual o Melhor Caminho para o Seu Sorriso?',
    subtitle: 'Apresentamos as duas principais soluções da odontologia estética. Na sua consulta de planejamento, avaliaremos qual delas é a ideal para alcançar seus objetivos.',
    steps: [
      { number: '1', title: 'Opção A: A Arte da Resina Direta', description: 'Uma transformação rápida e artística, feita em uma única sessão. Ideal para correções de cor, forma e pequenos espaços, com excelente custo-benefício e sem desgaste dental.' },
      { number: '2', title: 'Opção B: A Excelência da Porcelana', description: 'A solução definitiva para uma transformação de alto impacto. Oferece máxima durabilidade (15+ anos), resistência total a manchas e uma estética que mimetiza o dente natural com perfeição.' },
      { number: '3', title: 'A Decisão: Planejamento Personalizado', description: 'A escolha entre resina e porcelana depende dos seus objetivos, estilo de vida e investimento. Em sua consulta, a Dra. Carla fará uma análise completa para recomendar a opção que trará o melhor resultado para você.' },
      { number: '4', title: 'Previsibilidade: O "Test Drive" do Sorriso', description: 'Independente do caminho escolhido, você pode ver uma simulação do resultado na sua própria boca antes de começar. Isso garante total segurança e alinhamento de expectativas.' }
    ]
  },

  socialProof: {
    title: 'Pacientes que Encontraram o Caminho Certo para Seus Sorrisos',
    testimonials: [
        { name: 'Juliana R.', text: 'Eu não sabia qual tratamento fazer. A Dra. Carla me explicou tudo sobre resina e porcelana e me ajudou a escolher. O resultado ficou perfeito para mim, estou muito mais confiante!', rating: 5 },
        { name: 'Marcos T.', text: 'O mais importante foi o planejamento. Senti muita segurança na Dra. Carla para indicar a melhor solução para o meu caso. O resultado ficou extremamente natural, superou minhas expectativas.', rating: 5 },
        { name: 'Beatriz L.', text: 'Eu tinha muitas dúvidas e a consulta de avaliação foi esclarecedora. Optei pela resina por ser mais rápido e amei o resultado. Profissionalismo e cuidado em cada detalhe.', rating: 5 }
    ],
    stats: [
        { number: '20+', label: 'Anos de Experiência' },
        { number: '4.000+', label: 'Pacientes Satisfeitos' },
        { number: '100%', label: 'Foco no Planejamento' },
        { number: '24h', label: 'Atendimento WhatsApp' }
    ]
  },
  
  faq: {
    title: 'Principais Dúvidas sobre Tratamentos Estéticos',
    questions: [
        { question: 'Afinal, qual é melhor: resina ou porcelana?', answer: 'Não existe "o melhor", existe "o melhor para você". A resina é ideal para rapidez e custo-benefício. A porcelana é a escolha para máxima durabilidade e estética. A avaliação profissional é fundamental para definir a indicação correta para seu caso.' },
        { question: 'O tratamento para melhorar a estética do sorriso dói?', answer: 'Não. Todos os procedimentos estéticos são realizados com o máximo de conforto, utilizando anestesia local sempre que necessário. Nossa prioridade é uma experiência tranquila e indolor.' },
        { question: 'Preciso desgastar meus dentes?', answer: 'Depende da técnica. As facetas de resina geralmente não exigem desgaste. As de porcelana podem exigir um preparo mínimo e conservador na superfície do dente para garantir uma adaptação perfeita. A filosofia é sempre preservar ao máximo a estrutura dental.' },
        { question: 'Como funciona a consulta de planejamento?', answer: 'É uma conversa aprofundada para entendermos seus desejos. Realizamos fotografias e uma análise completa do seu sorriso e face para, juntos, definirmos o melhor plano de tratamento, explicando os prós e contras de cada opção.' }
    ]
  },
  
  cta: {
    title: 'Pronto para Descobrir o Potencial do Seu Sorriso?',
    subtitle: 'Agende uma consulta de planejamento e dê o primeiro passo. Vamos encontrar juntos a solução ideal para transformar sua autoestima.',
    buttonText: 'Quero Agendar meu Planejamento'
  },
  
  contact: {
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi o site e gostaria de agendar uma consulta para avaliar e melhorar meu sorriso.',
    doctorName: 'Dra. Carla Christoph',
    clinicName: 'Consultório Odontológico'
  },
  
  seo: {
    title: 'Estética Dental Ipanema | Transforme seu Sorriso com Especialista',
    description: 'Especialista em estética do sorriso em Ipanema. Avaliamos seu caso e indicamos a melhor solução: facetas de resina ou lentes de porcelana. Agende!',
    keywords: [
      'estetica dental ipanema',
      'melhorar sorriso rio de janeiro',
      'transformação do sorriso',
      'dentista estético ipanema',
      'lentes de contato dental',
      'facetas de resina',
      'harmonização do sorriso',
      'sorriso bonito'
    ]
  },
  
  tracking: {
    gtagId: 'AW-16894364517',
    gtmId: 'GTM-WZRDNBKQ'
  }
};
