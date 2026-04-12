import { LandingPageConfig } from "@/types/LandingPageConfig";

export const limpezaDentalConfig: LandingPageConfig = {
  campaign: "Pesquisa - Limpeza Dental - Zona Sul",

  messageMatch: {
    adGroup: "limpeza-dental-ipanema",
    keyword: "limpeza dental ipanema"
  },

  whatsapp: {
    number: "5521993304045",
    message: "Olá! Vi o site e gostaria de agendar uma limpeza dental profissional."
  },

  hero: {
    headline: "Tártaro e Sensibilidade? Limpeza com Ultrassom em Ipanema",
    subheadline: "Profilaxia com ultrassom em consulta sem pressa. Remoção de tártaro, placa bacteriana e manchas. Dra. Carla Christoph, 20+ anos de experiência.",
    ctaText: "Agendar Minha Limpeza",
    backgroundImage: "/lovable-uploads/vertical-de-jaleco.webp"
  },

  benefits: [
    "Limpeza com ultrassom — confortável",
    "Consulta sem pressa",
    "WhatsApp 24h",
    "20+ anos de experiência"
  ],

  problem: {
    title: "Há Quanto Tempo Você Não Faz uma Limpeza Profissional?",
    description: "Escovação e fio dental cuidam do dia a dia, mas não alcançam tudo. Tártaro, placa em áreas difíceis e manchas acumuladas precisam de limpeza profissional.",
    problems: [
      "Tártaro acumulado que a escovação não remove.",
      "Gengiva que sangra ao escovar ou ao passar o fio dental.",
      "Manchas de café, chá ou cigarro nos dentes.",
      "Mau hálito persistente mesmo com boa higiene.",
      "Sensação de dentes ásperos ou sujos mesmo após escovar.",
      "Faz mais de 6 meses que não faz uma limpeza profissional."
    ]
  },

  guide: {
    title: "Como é a Limpeza no Consultório",
    subtitle: "Dra. Carla Christoph — CRO-RJ 27.509. Cada limpeza com tempo dedicado e orientação individual.",
    steps: [
      {
        number: "1",
        title: "Análise",
        description: "Exame da condição dos dentes e gengiva. Identificação de áreas de acúmulo e verificação geral."
      },
      {
        number: "2",
        title: "Remoção de Tártaro com Ultrassom",
        description: "O ultrassom remove tártaro e placa endurecida com vibração — mais confortável que a raspagem manual tradicional."
      },
      {
        number: "3",
        title: "Polimento",
        description: "Polimento dos dentes para remover manchas superficiais e deixar a superfície lisa, dificultando novo acúmulo."
      },
      {
        number: "4",
        title: "Orientação Personalizada",
        description: "Dicas de escovação e uso do fio dental para o seu caso específico. Definição do intervalo ideal para a próxima limpeza."
      }
    ]
  },

  socialProof: {
    title: "O Que Nossos Pacientes Contam",
    testimonials: [
      {
        name: "Patricia M. — Ipanema",
        text: "A limpeza foi mais tranquila do que eu esperava. O ultrassom é confortável e saí com sensação de dentes novos."
      },
      {
        name: "Gustavo R. — Leblon",
        text: "Fazia 2 anos sem ir ao dentista. Além da limpeza, a Dra. Carla identificou uma cárie inicial que nem doía ainda. Valeu pela prevenção."
      },
      {
        name: "Carla F. — Copacabana",
        text: "Faço limpeza a cada 6 meses no consultório. O que me fez ficar é o tempo que dedicam — nunca sinto que foi corrido."
      }
    ],
    stats: [
      { number: "20+", label: "Anos de Experiência" },
      { number: "4.000+", label: "Pacientes Atendidos" },
      { number: "1h+", label: "Mínimo por Consulta" },
      { number: "24h", label: "WhatsApp Disponível" }
    ]
  },

  faq: {
    title: "Dúvidas sobre Limpeza Dental",
    questions: [
      {
        question: "Limpeza dental dói?",
        answer: "Com ultrassom, o desconforto é mínimo. Pode haver sensibilidade em áreas com muito tártaro acumulado, mas é passageiro."
      },
      {
        question: "De quanto em quanto tempo devo fazer limpeza?",
        answer: "Para a maioria das pessoas, a cada 6 meses. Quem tem histórico de gengivite ou acúmulo rápido de tártaro pode precisar a cada 3-4 meses."
      },
      {
        question: "Limpeza clareia os dentes?",
        answer: "Remove manchas superficiais (café, chá), o que pode dar a impressão de dentes mais claros. Mas limpeza não substitui clareamento — são procedimentos diferentes."
      },
      {
        question: "Quanto tempo leva?",
        answer: "Em torno de 40-60 minutos, dependendo da quantidade de tártaro e da condição da gengiva."
      },
      {
        question: "Vocês atendem convênios?",
        answer: "Nosso atendimento é particular, o que nos permite dedicar tempo adequado a cada consulta."
      }
    ]
  },

  cta: {
    title: "Sua Boca Merece esse Cuidado",
    subtitle: "Agende sua limpeza profissional pelo WhatsApp.",
    buttonText: "Agendar Minha Limpeza",
    urgency: 'Tártaro acumulado evolui para problemas gengivais — a remoção profissional periódica evita complicações.'
  },

  contact: {
    whatsappNumber: "5521993304045",
    whatsappMessage: "Olá! Vi o site e gostaria de agendar uma limpeza dental profissional.",
    doctorName: "Dra. Carla Christoph",
    clinicName: "Clínica Dra. Carla Christoph"
  },

  seo: {
    title: "Limpeza Dental em Ipanema - Profilaxia Sem Dor | Dra. Carla Christoph",
    description: "Limpeza dental com tecnologia ultrassônica em Ipanema. Remoção de tártaro sem desconforto, prevenção de cáries e mau hálito. Dra. Carla Christoph - 20+ anos de experiência. Agende!",
    keywords: ["limpeza dental ipanema", "limpeza no dente", "profilaxia dental", "remoção de tártaro", "limpeza sem dor", "dentista ipanema", "limpeza dental rj", "profilaxia ipanema"]
  },

  tracking: {
    gtmId: "GTM-WZRDNBKQ",
    gtagId: "AW-16894364517"
  }
};
