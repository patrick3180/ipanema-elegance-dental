import { LandingPageConfig } from "@/types/LandingPageConfig";

export const consultaInicialConfig: LandingPageConfig = {
  campaign: "consulta-inicial-premium",

  messageMatch: {
    adGroup: "consulta-premium-ipanema",
    keyword: "dentista ipanema"
  },

  whatsapp: {
    number: "5521993304045",
    message: "Olá! Vi sobre a consulta odontológica personalizada e gostaria de agendar minha avaliação com a Dra. Carla Christoph."
  },

  hero: {
    headline: "Uma Consulta Odontológica com Tempo para Ouvir, Examinar e Explicar",
    subheadline: "Mínimo de 1 hora dedicada ao seu caso. Diagnóstico detalhado, explicação clara e plano de tratamento individualizado — sem pressa e sem surpresas.",
    ctaText: "Agendar Minha Consulta",
    backgroundImage: "/lovable-uploads/RIT08058-vertical-doutora-site.webp"
  },

  benefits: [
    "Mínimo de 1h por consulta",
    "Somente materiais de primeira linha",
    "WhatsApp 24h",
    "20+ anos de experiência"
  ],

  problem: {
    title: "Quando Você Precisa de uma Consulta de Verdade",
    description: "Nem toda consulta odontológica é igual. Se você valoriza tempo, atenção e clareza antes de iniciar qualquer tratamento, a consulta com a Dra. Carla foi pensada para isso.",
    problems: [
      "Preciso de tempo para explicar meu histórico e ser ouvido com calma.",
      "Quero sair da consulta entendendo exatamente o que tenho e o que precisa ser feito.",
      "Valorizo atenção individual — cada caso é diferente.",
      "Quero um plano de tratamento com valores claros, sem surpresas.",
      "Prefiro um diagnóstico detalhado, mesmo que demore mais.",
      "Quero me sentir à vontade para fazer todas as perguntas que precisar."
    ]
  },

  guide: {
    title: "Como Funciona a Consulta com a Dra. Carla Christoph",
    subtitle: "Especialista em Prótese e Implantodontia, com mais de 20 anos de experiência clínica em Ipanema.",
    steps: [
      { number: "1", title: "Conversa Inicial", description: "Ouvimos seu histórico, suas queixas e o que você espera. Sem formulário apressado — uma conversa de verdade." },
      { number: "2", title: "Exame Clínico Completo", description: "Avaliação detalhada dos dentes, gengiva, mordida e articulação. Radiografias quando necessário. Inclui profilaxia (limpeza profissional)." },
      { number: "3", title: "Explicação do Diagnóstico", description: "Mostramos o que foi encontrado, explicamos cada ponto e respondemos todas as suas dúvidas — com calma." },
      { number: "4", title: "Plano de Tratamento Individualizado", description: "Se houver necessidade de tratamento, apresentamos as opções com valores transparentes. Você decide no seu tempo." }
    ]
  },

  socialProof: {
    title: "O Que Nossos Pacientes Contam Sobre a Consulta",
    testimonials: [
      { name: "Ricardo M. — Ipanema", text: "A consulta durou mais de uma hora. Ela explicou cada detalhe do exame, mostrou as radiografias e só depois falou sobre tratamento. Nunca tinha sido atendido assim." },
      { name: "Claudia F. — Leblon", text: "Tinha mudado de dentista várias vezes. Aqui, pela primeira vez, senti que alguém realmente ouviu o que eu tinha para dizer antes de começar a examinar." },
      { name: "André S. — Copacabana", text: "O que me impressionou foi a transparência. Ela explicou o que precisava ser feito, o que podia esperar e o que era prioridade. Sem pressão nenhuma." }
    ],
    stats: [
      { number: "20+", label: "Anos de Experiência" },
      { number: "4.000+", label: "Pacientes Atendidos" },
      { number: "1h+", label: "Mínimo por Consulta" },
      { number: "24h", label: "WhatsApp Disponível" }
    ]
  },

  faq: {
    title: "Dúvidas Sobre a Consulta Inicial",
    questions: [
      { question: "Por que a consulta dura no mínimo 1 hora?", answer: "Porque um diagnóstico bem feito exige tempo. Precisamos ouvir seu histórico, examinar com atenção, explicar os achados e discutir opções — tudo isso sem pressa. É assim que evitamos diagnósticos superficiais." },
      { question: "O que está incluído na consulta?", answer: "Anamnese completa, exame clínico detalhado, avaliação periodontal, análise da mordida, radiografias quando necessário e profilaxia (limpeza profissional). Tudo explicado passo a passo." },
      { question: "Por que o atendimento é particular?", answer: "O formato particular nos permite dedicar o tempo que cada caso exige, usar materiais selecionados e manter um número reduzido de pacientes por dia. É o que garante a qualidade do atendimento." },
      { question: "Como funciona o agendamento?", answer: "Pelo WhatsApp, que funciona 24 horas. Você envia mensagem, escolhemos juntos o melhor horário e confirmamos. Respondemos inclusive nos fins de semana." },
      { question: "Vocês atendem emergências?", answer: "Nosso atendimento é em horário de consultório, mas nos empenhamos em acomodar urgências. Entre em contato pelo WhatsApp e buscamos uma solução." }
    ]
  },

  cta: {
    title: "Pronto para uma Consulta Diferente?",
    subtitle: "Agende sua avaliação e descubra como é ser atendido com tempo, atenção e transparência.",
    buttonText: "Agendar Minha Consulta",
    urgency: 'Pequenos problemas detectados cedo evitam tratamentos complexos.'
  },

  contact: {
    whatsappNumber: "5521993304045",
    whatsappMessage: "Olá! Vi sobre a consulta odontológica personalizada e gostaria de agendar minha avaliação com a Dra. Carla Christoph.",
    doctorName: "Dra. Carla Christoph",
    clinicName: "Clínica Dra. Carla Christoph"
  },

  seo: {
    title: "Consulta Odontológica Personalizada em Ipanema | Dra. Carla Christoph",
    description: "Consulta odontológica sem pressa em Ipanema. Atendimento personalizado com a Dra. Carla Christoph, especialista com 20+ anos de experiência. Agende pelo WhatsApp 24h.",
    keywords: ["consulta odontológica ipanema", "dentista particular ipanema", "dentista sem pressa", "consulta personalizada zona sul", "melhor dentista ipanema", "check-up dental ipanema"]
  },

  tracking: {
    gtmId: "GTM-WZRDNBKQ",
    gtagId: "AW-16894364517"
  }
};
