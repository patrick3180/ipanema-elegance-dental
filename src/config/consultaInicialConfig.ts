import { LandingPageConfig } from "@/types/LandingPageConfig";

export const consultaInicialConfig: LandingPageConfig = {
  campaign: "consulta-inicial-premium",
  urgency: "Quanto mais você adia, mais complexo pode se tornar",

  messageMatch: {
    adGroup: "consulta-premium-ipanema",
    keyword: "dentista ipanema"
  },

  whatsapp: {
    number: "5521993304045",
    message: "Olá! Vi sobre a consulta odontológica personalizada e gostaria de agendar minha avaliação com a Dra. Carla Christoph."
  },

  hero: {
    headline: "A Consulta Odontológica Como Deveria Ser: Sem Pressa, Com Excelência",
    subheadline: "Diagnóstico completo e personalizado em Ipanema. Cada caso tratado individualmente, com tempo adequado para suas necessidades específicas.",
    ctaText: "Agendar Minha Consulta",
    backgroundImage: "/lovable-uploads/RIT08058-vertical-doutora-site.webp"
  },

  benefits: [
    "WhatsApp 24 horas",
    "Consultas sem pressa", 
    "20+ anos de experiência",
    "Atendimento particular"
  ],

  problem: {
    title: "Sabemos Como é Frustrante uma Consulta Odontológica Apressada",
    description: "Se você já saiu de um consultório sentindo que não foi ouvido ou que suas dúvidas não foram esclarecidas, você não está sozinho. Entendemos essa frustração.",
    problems: [
      "Consultas de 15 minutos onde mal dá tempo de explicar o problema",
      "Sensação de estar numa 'linha de produção' sem atenção individual",
      "Dentista que não explica claramente o que está acontecendo",
      "Pressa para liberar a cadeira para o próximo paciente",
      "Diagnósticos superficiais que não identificam problemas reais",
      "Falta de transparência sobre custos e opções de tratamento"
    ]
  },

  guide: {
    title: "Sua Especialista em Cuidado Personalizado",
    subtitle: "Dra. Carla Christoph entende que cada sorriso é único e merece atenção individualizada em Ipanema.",
    steps: [
      {
        number: "✓",
        title: "Especialista em Prótese Dental",
        description: "Formação especializada para casos complexos"
      },
      {
        number: "✓", 
        title: "Especialista em Implantodontia",
        description: "Expertise em reabilitação oral completa"
      },
      {
        number: "✓",
        title: "CRO-RJ 27509",
        description: "Registro profissional ativo e regularizado"
      },
      {
        number: "✓",
        title: "20+ anos de experiência",
        description: "Duas décadas cuidando de sorrisos"
      },
      {
        number: "✓",
        title: "4.000+ pacientes atendidos",
        description: "Experiência comprovada e resultados consistentes"
      },
      {
        number: "✓",
        title: "Consultas sem pressa",
        description: "Tempo adequado para cada caso específico"
      }
    ]
  },

  socialProof: {
    title: "O Que Nossos Pacientes Dizem Sobre o Atendimento Personalizado",
    testimonials: [
      {
        name: "Maria S.",
        text: "Finalmente encontrei uma dentista que me ouve. A consulta durou mais de uma hora, ela explicou tudo detalhadamente e não senti pressa nenhuma. Atendimento como deveria ser.",
        rating: 5
      },
      {
        name: "Roberto M.",
        text: "Depois de anos evitando dentista por experiências ruins, a Dra. Carla mudou minha perspectiva. Consulta completa, sem pressa, com explicações claras sobre cada procedimento.",
        rating: 5
      },
      {
        name: "Ana L.",
        text: "O que mais me impressionou foi a atenção individual. Não me senti apenas mais um número. Ela dedicou tempo para entender meu histórico e explicar todas as opções.",
        rating: 5
      }
    ],
    stats: [
      {
        number: "20+",
        label: "Anos de Experiência"
      },
      {
        number: "4.000+",
        label: "Pacientes Atendidos"
      },
      {
        number: "1 hora",
        label: "Mínimo por Agendamento"
      },
      {
        number: "24h",
        label: "Atendimento WhatsApp"
      }
    ]
  },

  faq: {
    title: "Perguntas Frequentes Sobre Nossa Consulta Personalizada",
    questions: [
      {
        question: "Como funciona uma consulta \"sem pressa\"?",
        answer: "Reservamos no mínimo 1 hora para cada consulta inicial, permitindo tempo adequado para ouvir seu histórico, realizar exame detalhado, explicar achados e discutir opções de tratamento. Sem pressa para liberar a cadeira."
      },
      {
        question: "Qual a diferença para outros consultórios?",
        answer: "Nosso foco é qualidade individual versus quantidade. Atendemos menos pacientes por dia para dedicar atenção personalizada a cada caso. Cada pessoa é única e merece cuidado individualizado."
      },
      {
        question: "Por que vocês são atendimento particular?",
        answer: "O atendimento particular nos permite usar materiais de excelência, dedicar tempo adequado e personalizar completamente seu tratamento sem limitações de convênios."
      },
      {
        question: "Como funciona o agendamento?",
        answer: "Nosso WhatsApp funciona 24 horas. Você pode enviar mensagem a qualquer hora para agendar sua consulta ou tirar dúvidas. Respondemos rapidamente, inclusive fins de semana."
      },
      {
        question: "Que tipo de avaliação é feita na consulta inicial?",
        answer: "Realizamos anamnese completa, exame clínico detalhado, avaliação periodontal, análise oclusal e radiografias quando necessário. Em toda consulta de avaliação também é incluída a profilaxia (limpeza dental profissional). Tudo explicado passo a passo."
      },
      {
        question: "Vocês atendem emergências?",
        answer: "Embora nosso atendimento seja durante horário normal do consultório, sempre nos empenhamos em acomodar situações de emergência odontológica. Entre em contato pelo WhatsApp 24h e buscaremos uma solução que atenda sua necessidade sem comprometer a qualidade do atendimento aos pacientes já agendados."
      },
      {
        question: "Como são definidos os custos dos tratamentos?",
        answer: "Após avaliação completa, apresentamos plano de tratamento detalhado com valores transparentes e opções de parcelamento. Sem surpresas ou custos ocultos."
      }
    ]
  },

  cta: {
    title: "Pronto para uma Experiência Odontológica Diferenciada?",
    subtitle: "Agende sua consulta personalizada e descubra o cuidado odontológico como deveria ser: individualizado, transparente e sem pressa.",
    buttonText: "Agendar Minha Consulta",
    urgency: "Quanto mais você adia, mais complexo pode se tornar"
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