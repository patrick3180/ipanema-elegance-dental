import { LandingPageConfig } from "@/types/LandingPageConfig";

export const implantesDentariosConfig: LandingPageConfig = {
  campaign: 'Pesquisa - Implantes Dentários - Zona Sul',
  
  messageMatch: {
    adGroup: 'Implantes',
    keyword: 'implantes dentarios'
  },
  
  whatsapp: {
    number: '5521993304045',
    message: 'Olá! Vi o site e gostaria de agendar uma consulta de planejamento para implantes dentários.'
  },
  
  hero: {
    headline: 'Recupere a Confiança de Sorrir e o Prazer de Comer sem Preocupações',
    subheadline: 'Com os implantes dentários, oferecemos uma solução segura e definitiva para a perda de dentes. Volte a viver com a segurança de um sorriso fixo, funcional e de aparência natural.',
    ctaText: 'Agendar Minha Consulta de Planejamento',
    backgroundImage: '/lovable-uploads/vertical-de-jaleco.webp'
  },
  
  benefits: [
    'Solução fixa e definitiva para a perda dentária',
    'Segurança total para mastigar e falar',
    'Resultado estético natural e harmonioso',
    'Tecnologia que garante um tratamento preciso'
  ],
  
  problem: {
    title: 'A ausência de um ou mais dentes afeta a sua qualidade de vida?',
    description: 'A perda dentária vai muito além da estética. Ela impacta a mastigação, a fala e, principalmente, a autoconfiança. Entendemos o seu desconforto e temos a solução para devolver a sua segurança.',
    problems: [
      'Vergonha ou constrangimento ao sorrir em público.',
      'Dificuldade e insegurança para mastigar os alimentos que você mais gosta.',
      'Uso de próteses removíveis que são desconfortáveis, instáveis ou machucam.',
      'Medo de que a situação piore ou afete outros dentes.',
      'O sonho de ter dentes fixos novamente, como se fossem seus.',
      'Busca por um tratamento seguro, previsível e com alta taxa de sucesso.'
    ]
  },
  
  guide: {
    title: 'Sua Jornada para um Novo Sorriso: Segura e Planejada em Detalhes',
    subtitle: 'Utilizamos a mais moderna tecnologia de planejamento para garantir um procedimento preciso, seguro e com o mínimo de desconforto.',
    steps: [
      { number: '1', title: 'Consulta de Planejamento com Tomografia', description: 'O primeiro passo é a segurança. Solicitamos uma tomografia computadorizada para avaliar a estrutura óssea com precisão milimétrica e planejar a posição ideal do implante.' },
      { number: '2', title: 'Cirurgia Guiada: Precisão e Conforto', description: 'Realizamos o procedimento de forma minimamente invasiva, muitas vezes sem a necessidade de cortes extensos. A tecnologia guia o processo, tornando-o mais rápido e a recuperação mais tranquila.' },
      { number: '3', title: 'Período de Osseointegração', description: 'Aguardamos o período em que o implante se integra de forma segura ao osso. Durante essa fase, você pode utilizar uma prótese provisória para manter a estética.' },
      { number: '4', title: 'A Coroa Definitiva: Seu Novo Dente', description: 'Com o implante totalmente integrado, confeccionamos e instalamos a coroa de porcelana, o seu novo dente. Ela é desenhada para ter a aparência, cor e formato idênticos aos seus dentes naturais.' }
    ]
  },

  socialProof: {
    title: 'Pacientes que Voltaram a Sorrir com Total Confiança',
    testimonials: [
        { name: 'José C.', text: 'Eu não aguentava mais usar prótese removível. O implante mudou minha vida. Voltar a comer de tudo e sorrir sem medo não tem preço. A Dra. Carla me passou uma segurança enorme.', rating: 5 },
        { name: 'Maria L.', text: 'Perdi um dente da frente e tinha muita vergonha. O processo foi muito mais tranquilo do que eu imaginava. O resultado ficou tão perfeito e natural que ninguém percebe que é um implante.', rating: 5 },
        { name: 'Antônio S.', text: 'O planejamento com a tomografia fez toda a diferença. Senti que estava no lugar certo, com uma profissional que domina o assunto. Hoje tenho meu sorriso completo de novo. Recomendo!', rating: 5 }
    ],
    stats: [
        { number: '20+', label: 'Anos de Experiência' },
        { number: '4000+', label: 'Pacientes Atendidos' },
        { number: '100%', label: 'Foco no Planejamento e Segurança' },
        { number: '24h', label: 'Atendimento WhatsApp' }
    ]
  },
  
  faq: {
    title: 'Dúvidas Comuns sobre Implantes Dentários',
    questions: [
        { question: 'O tratamento com implantes dentários dói?', answer: 'Não. A cirurgia é realizada com anestesia local potente, e o paciente não sente dor durante o procedimento. O pós-operatório é controlado com medicação, sendo geralmente muito mais tranquilo do que se imagina.' },
        { question: 'Qualquer pessoa pode fazer um implante?', answer: 'A maioria das pessoas com boa saúde geral pode receber implantes. A tomografia inicial é fundamental para avaliar a quantidade e qualidade do osso. Em casos de osso insuficiente, existem técnicas de enxerto para viabilizar o tratamento.' },
        { question: 'Quanto tempo dura todo o processo?', answer: 'O tempo varia a depender do caso, principalmente do período de osseointegração (a união do implante ao osso), que leva de 3 a 6 meses. O planejamento detalhado na primeira consulta te dará uma previsão precisa de todas as etapas.' },
        { question: 'O implante parece um dente natural?', answer: 'Sim. A coroa de porcelana que é colocada sobre o implante é feita sob medida para ter a mesma cor, formato e translucidez dos seus dentes vizinhos, garantindo um resultado estético imperceptível e totalmente natural.' }
    ]
  },
  
  cta: {
    title: 'Pronto(a) para Voltar a Viver sem Limitações?',
    subtitle: 'Agende sua consulta de planejamento e dê o primeiro passo para recuperar a função, a estética e, acima de tudo, a sua qualidade de vida.',
    buttonText: 'Quero Agendar meu Planejamento'
  },
  
  contact: {
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi o site e gostaria de agendar uma consulta de planejamento para implantes dentários.',
    doctorName: 'Dra. Carla Christoph',
    clinicName: 'Consultório Odontológico'
  },
  
  seo: {
    title: 'Implantes Dentários Ipanema | Recupere seu Sorriso com Segurança',
    description: 'Especialista em implantes dentários em Ipanema. Solução definitiva para a perda de dentes com segurança e tecnologia. Volte a comer e sorrir com confiança.',
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