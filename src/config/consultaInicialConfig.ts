import { LandingPageConfig } from "@/types/LandingPageConfig";

export const consultaInicialConfig: LandingPageConfig = {
  campaign: "consulta-inicial-premium",

  messageMatch: {
    adGroup: "consulta-premium-ipanema",
    keyword: "dentista ipanema"
  },

  whatsapp: {
    number: "5521993304045",
    message: "Olá! Vi sobre a consulta odontológica personalizada e gostaria de agendar minha consulta com a Dra. Carla Christoph."
  },

  hero: {
    headline: "Cada Caso É Único — Sua Consulta Também Deveria Ser",
    subheadline: "Mínimo de 1 hora dedicada ao seu caso. Histórico completo, exame minucioso, explicação clara e plano de tratamento individualizado — sem pressa e sem surpresas.",
    ctaText: "Agendar Minha Consulta",
    backgroundImage: "/lovable-uploads/RIT08058-vertical-doutora-site.webp"
  },

  benefits: [
    "Mínimo de 1h dedicada ao seu caso",
    "Exame + limpeza inclusos na consulta",
    "Plano de tratamento sem surpresas",
    "WhatsApp 24h para dúvidas"
  ],

  problem: {
    title: "Você se Identifica com Alguma Dessas Situações?",
    description: "",
    problems: [
      "Faz tempo que não vai ao dentista e sente que pode ter problemas se acumulando.",
      "Já saiu de consultas sem entender o diagnóstico porque tudo foi rápido demais.",
      "Quer um profissional que ouça primeiro e explique tudo antes de propor qualquer tratamento.",
      "Prefere prevenir do que remediar e busca acompanhamento regular com quem conhece seu histórico."
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
      { question: "Posso ir apenas para uma segunda opinião?", answer: "Sim. Muitos pacientes nos procuram para uma avaliação independente. A consulta segue o mesmo formato completo — com exame clínico, diagnóstico detalhado e nossa visão sobre o caso." },
      { question: "Por que o atendimento é particular?", answer: "O formato particular nos permite dedicar o tempo que cada caso exige, usar materiais selecionados e manter um número reduzido de pacientes por dia. É o que garante a qualidade do atendimento." },
      { question: "Como funciona o agendamento?", answer: "Pelo WhatsApp, que funciona 24 horas. Você envia mensagem, escolhemos juntos o melhor horário e confirmamos. Respondemos inclusive nos fins de semana." },
      { question: "Vocês atendem emergências?", answer: "Nosso atendimento é em horário de consultório, mas nos empenhamos em acomodar urgências. Entre em contato pelo WhatsApp e buscamos uma solução." }
    ]
  },

  cta: {
    title: "Pronto para uma Consulta Diferente?",
    subtitle: "Agende sua consulta e descubra como é ser atendido com tempo, atenção e transparência.",
    buttonText: "Agendar Minha Consulta",
    urgency: 'Pequenos problemas detectados cedo evitam tratamentos complexos.'
  },

  contact: {
    whatsappNumber: "5521993304045",
    whatsappMessage: "Olá! Vi sobre a consulta odontológica personalizada e gostaria de agendar minha consulta com a Dra. Carla Christoph.",
    doctorName: "Dra. Carla Christoph",
    clinicName: "Clínica Dra. Carla Christoph"
  },

  seo: {
    title: "Consulta Odontológica Personalizada em Ipanema | Dra. Carla Christoph",
    description: "Consulta odontológica sem pressa em Ipanema. Mínimo de 1 hora por consulta com a Dra. Carla Christoph, especialista com 20+ anos de experiência. Agende pelo WhatsApp 24h.",
    keywords: ["consulta odontológica ipanema", "dentista particular ipanema", "dentista sem pressa", "consulta personalizada zona sul", "melhor dentista ipanema", "check-up dental ipanema"]
  },

  tracking: {
    gtmId: "GTM-WZRDNBKQ",
    gtagId: "AW-16894364517"
  }
};
