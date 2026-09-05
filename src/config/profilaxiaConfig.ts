import { LandingPageConfig } from "@/types/LandingPageConfig";

export const profilaxiaConfig: LandingPageConfig = {
  campaign: "profilaxia-dental",

  messageMatch: {
    adGroup: "profilaxia-ipanema-exato",
    keyword: "profilaxia dental ipanema"
  },

  whatsapp: {
    number: "5521993304045",
    message: "Olá! Gostaria de agendar uma consulta de profilaxia (limpeza). Qual a disponibilidade nas próximas semanas?"
  },

  hero: {
    headline: "Profilaxia Dental em Ipanema — Prevenção que Funciona",
    subheadline: "Limpeza profissional completa com análise detalhada. Prevenir é mais simples, mais rápido e custa menos do que tratar.",
    ctaText: "Agendar Minha Profilaxia",
    backgroundImage: "/lovable-uploads/vertical-de-jaleco.webp"
  },

  benefits: [
    "Limpeza completa com ultrassom",
    "Análise preventiva incluída",
    "WhatsApp 24h",
    "20+ anos de experiência"
  ],

  problem: {
    title: "Prevenção é o Investimento Mais Inteligente em Saúde Bucal",
    description: "A maioria dos problemas dentários pode ser evitada com profilaxia regular. Quando identificados cedo, tratamentos são mais simples e menos invasivos.",
    problems: [
      "Faz tempo que não vai ao dentista para uma revisão.",
      "Gengiva que sangra — sinal de inflamação que precisa de atenção.",
      "Sensibilidade em algum dente que não sabe a causa.",
      "Acúmulo de tártaro visível, especialmente nos dentes de baixo.",
      "Quer manter a saúde bucal em dia mas não sabe a frequência ideal.",
      "Prefere prevenir do que tratar problemas mais complexos depois."
    ]
  },

  guide: {
    title: "O Que Inclui a Profilaxia",
    subtitle: "Mais do que uma limpeza — uma análise preventiva completa.",
    steps: [
      {
        number: "1",
        title: "Exame Clínico",
        description: "Análise de dentes, gengiva e mucosa. Identificação de problemas em estágio inicial — cáries, gengivite, desgaste."
      },
      {
        number: "2",
        title: "Remoção de Tártaro e Placa",
        description: "Limpeza com ultrassom e instrumentos adequados. Remoção do que a escovação diária não alcança."
      },
      {
        number: "3",
        title: "Polimento e Aplicação de Flúor",
        description: "Polimento para remover manchas. Aplicação de flúor quando indicado para fortalecer o esmalte."
      },
      {
        number: "4",
        title: "Plano Preventivo",
        description: "Orientações personalizadas de higiene e definição do intervalo ideal para o próximo retorno."
      }
    ]
  },

  socialProof: {
    title: "O Que Nossos Pacientes Contam",
    testimonials: [
      {
        name: "Fernanda L. — Ipanema",
        text: "Faço profilaxia a cada 6 meses. A Dra. Carla sempre identifica coisas que eu nem sentia. Prefiro prevenir do que remediar."
      },
      {
        name: "Lucas T. — Leblon",
        text: "Fui para a profilaxia de rotina e a Dra. Carla identificou uma cárie inicial que nem doía. Resolveu na hora com uma restauração pequena. Se esperasse, seria um canal."
      },
      {
        name: "Ana Maria B. — Copacabana",
        text: "O que valorizo é que ela não faz só a limpeza — ela examina tudo com calma. Saio sabendo exatamente como está minha boca."
      }
    ],
    stats: [
      { number: "20+", label: "Anos de Experiência" },
      { number: "10.000+", label: "Pacientes Atendidos" },
      { number: "1h+", label: "Mínimo por Consulta" },
      { number: "24h", label: "WhatsApp Disponível" }
    ]
  },

  faq: {
    title: "Dúvidas sobre Profilaxia",
    questions: [
      {
        question: "Profilaxia e limpeza são a mesma coisa?",
        answer: "Na prática, sim. Profilaxia é o termo técnico para a limpeza profissional preventiva. Inclui remoção de tártaro, polimento e, quando indicado, aplicação de flúor."
      },
      {
        question: "Com que frequência devo fazer?",
        answer: "Para a maioria das pessoas, a cada 6 meses. Quem tem propensão a gengivite ou acúmulo rápido de tártaro pode precisar a cada 3-4 meses."
      },
      {
        question: "Mesmo sem dor preciso ir ao dentista?",
        answer: "Sim. A maioria dos problemas dentários não dói no início — cáries iniciais, gengivite, desgaste. Quando começa a doer, o tratamento tende a ser mais complexo."
      },
      {
        question: "Vocês atendem convênios?",
        answer: "Nosso atendimento é particular, o que nos permite dedicar tempo à análise completa, não apenas à limpeza."
      }
    ]
  },

  cta: {
    title: "Prevenção é o Melhor Tratamento",
    subtitle: "Agende sua profilaxia e mantenha sua saúde bucal em dia.",
    buttonText: "Agendar Minha Profilaxia"
  },

  contact: {
    whatsappNumber: "5521993304045",
    whatsappMessage: "Olá! Vi o site e gostaria de agendar uma profilaxia dental.",
    doctorName: "Dra. Carla Christoph",
    clinicName: "Consultório Odontológico"
  },

  seo: {
    title: "Profilaxia Dental em Ipanema | Conforto e Tecnologia | Dra. Carla Christoph",
    description: "Profilaxia dental com tecnologia ultrassônica em Ipanema. Remoção de tártaro confortável, prevenção de cáries e mau hálito. Dra. Carla - 20+ anos. Agende!",
    keywords: [
      "profilaxia dental ipanema",
      "profilaxia dental",
      "profilaxia odontológica",
      "remoção de tártaro",
      "profilaxia confortável",
      "dentista ipanema",
      "profilaxia dental rj",
      "limpeza profissional dental"
    ]
  },

  tracking: {
    gtmId: "GTM-WZRDNBKQ",
    gtagId: "AW-16894364517"
  }
};
