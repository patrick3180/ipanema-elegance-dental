import { LandingPageConfig } from "@/types/LandingPageConfig";

export const limpezaDentalConfig: LandingPageConfig = {
  campaign: "limpeza-dental-premium",
  urgency: "Cada dia de adiamento aumenta o acúmulo de bactérias nocivas",

  messageMatch: {
    adGroup: "limpeza-dental-ipanema",
    keyword: "limpeza dental ipanema"
  },

  whatsapp: {
    number: "5521993304045",
    message: "Olá! Vi o site e gostaria de agendar uma limpeza dental. Podem me informar valores e disponibilidade?"
  },

  hero: {
    headline: "Limpeza Dental Sem Desconforto em Ipanema - Tecnologia Avançada Para Sua Saúde Bucal",
    subheadline: "Profilaxia profissional com tecnologia de vibração ultrassônica que remove 30% mais biofilme que métodos tradicionais. Experiência confortável com Dra. Carla Christoph, especialista com mais de 20 anos.",
    ctaText: "Agendar Minha Limpeza Profissional",
    backgroundImage: "/lovable-uploads/vertical-de-jaleco.webp"
  },

  benefits: [
    "Tecnologia ultrassônica confortável - sensação suave, sem pressão dolorosa",
    "Remove até 95% do biofilme causador de cáries e mau hálito",
    "Previne problemas que custariam 8-50x mais para tratar",
    "Consulta sem pressa em ambiente acolhedor de Ipanema"
  ],

  problem: {
    title: "90% dos Problemas Bucais Podem Ser Prevenidos com Limpeza Regular",
    description: "Estudos científicos comprovam que a profilaxia profissional semestral reduz em até 60% o risco de doenças periodontais e em 40% a incidência de cáries. Na clínica da Dra. Carla Christoph, transformamos este cuidado essencial em uma experiência confortável e eficaz.",
    problems: [
      "Economize Tempo e Dinheiro em Tratamentos Futuros - Cada real investido em prevenção economiza até R$ 50 em tratamentos curativos",
      "Proteja Mais que Seus Dentes - A saúde bucal impacta diretamente sua saúde geral. Previna complicações cardíacas e diabetes",
      "Sorria Sem Constrangimentos - Elimine 90% das causas do mau hálito e mantenha dentes naturalmente mais brancos"
    ]
  },

  guide: {
    title: "Como Funciona Sua Limpeza Profissional",
    subtitle: "Processo completo em 5 etapas com tecnologia ultrassônica avançada",
    steps: [
      {
        number: "1",
        title: "Avaliação Inicial Completa",
        description: "Exame clínico detalhado com câmera intraoral de alta definição. Identificamos áreas de acúmulo de placa, início de cáries e condições gengivais."
      },
      {
        number: "2",
        title: "Remoção Ultrassônica do Biofilme",
        description: "Aplicação da tecnologia ultrassônica com irrigação simultânea. Remove tártaro, placa bacteriana e manchas superficiais com máximo conforto."
      },
      {
        number: "3",
        title: "Polimento Profissional",
        description: "Polimento seletivo com pastas especializadas que deixam seus dentes lisos e brilhantes, dificultando novo acúmulo de placa."
      },
      {
        number: "4",
        title: "Aplicação de Flúor (Quando Indicado)",
        description: "Fortalecimento do esmalte com flúor de alta concentração para proteção adicional contra cáries."
      },
      {
        number: "5",
        title: "Orientação Personalizada",
        description: "Técnicas específicas de higiene para seu caso, recomendação de produtos adequados e agendamento do retorno."
      }
    ]
  },

  socialProof: {
    title: "O Que Nossos Pacientes Dizem Sobre a Limpeza Dental",
    testimonials: [
      {
        name: "Marina S.",
        text: "Sempre adiei a limpeza por medo de dor. Com a Dra. Carla, descobri que pode ser totalmente confortável. A tecnologia que ela usa é incrível - não senti nada além de uma vibração suave. Agora faço religiosamente a cada 6 meses.",
        rating: 5
      },
      {
        name: "Roberto M.",
        text: "Sofria com mau hálito há anos, mesmo escovando 3x ao dia. Após a primeira limpeza profissional, o problema desapareceu. A Dra. Carla identificou acúmulo de bactérias em áreas que eu não conseguia alcançar.",
        rating: 5
      },
      {
        name: "Ana Paula F.",
        text: "Sempre adiava as minhas limpezas, por falta de tempo e prioridade. Achava que limpeza dental era supérfluo até o dia que quase perdi um dente por conta de uma cárie. Não deixo mais de fazer. Podem continuar 'me pertubando' a cada 6 meses, por favor!!!",
        rating: 5
      }
    ],
    stats: [
      {
        number: "95%",
        label: "Biofilme Removido"
      },
      {
        number: "30%",
        label: "Mais Eficaz que Métodos Tradicionais"
      },
      {
        number: "60%",
        label: "Redução de Doenças Gengivais"
      },
      {
        number: "4.000+",
        label: "Pacientes Atendidos"
      }
    ]
  },

  faq: {
    title: "Perguntas Frequentes Sobre Limpeza Dental",
    questions: [
      {
        question: "A limpeza com ultrassom dói?",
        answer: "Não. A tecnologia ultrassônica é significativamente mais confortável que a raspagem manual. Pacientes descrevem a sensação como 'cócegas suaves' ou uma 'vibração agradável'. Mesmo pessoas com sensibilidade dental relatam conforto durante todo o procedimento."
      },
      {
        question: "Com que frequência devo fazer a limpeza profissional?",
        answer: "Para a maioria dos pacientes, o intervalo ideal é de 6 meses. Esse período baseia-se no ciclo de formação do biofilme bacteriano e desenvolvimento de lesões iniciais. Pacientes com maior risco (diabetes, doenças gengivais) podem necessitar intervalos de 3-4 meses."
      },
      {
        question: "Por que não posso fazer apenas a limpeza em casa?",
        answer: "A escovação e fio dental removem apenas 60% da placa bacteriana. O tártaro (placa calcificada) não sai com escovação - apenas com instrumentos profissionais. Além disso, existem áreas de difícil acesso que acumulam bactérias causadoras de cáries e mau hálito."
      },
      {
        question: "A limpeza clareia os dentes?",
        answer: "A limpeza remove manchas superficiais causadas por café, chá, vinho e cigarro, revelando a cor natural dos seus dentes - que fica visivelmente mais clara. Para clareamento além da cor natural, oferecemos tratamentos específicos."
      },
      {
        question: "Quanto tempo dura a consulta?",
        answer: "O procedimento de limpeza em si, entre 30-45 minutos, dependendo da quantidade de tártaro acumulado. Diferente do atendimento 'em linha de produção', dedicamos o tempo que for necessário para um tratamento completo e confortável."
      },
      {
        question: "Posso comer normalmente após a limpeza?",
        answer: "Sim, você pode se alimentar normalmente logo após o procedimento. Se houver aplicação de flúor, recomendamos aguardar 30 minutos antes de comer ou beber."
      },
      {
        question: "A limpeza profissional substitui o tratamento de gengiva?",
        answer: "A limpeza é preventiva e trata gengivites leves. Casos de periodontite (doença gengival avançada) requerem tratamento específico. Durante a avaliação, identificamos se há necessidade de cuidados adicionais."
      }
    ]
  },

  cta: {
    title: "Invista na Sua Saúde Bucal Hoje",
    subtitle: "Agende sua limpeza profissional e experimente o padrão de excelência em odontologia preventiva de Ipanema",
    buttonText: "Quero Agendar Minha Limpeza",
    urgency: "Cada dia de adiamento aumenta o acúmulo de bactérias nocivas"
  },

  contact: {
    whatsappNumber: "5521993304045",
    whatsappMessage: "Olá! Vi o site e gostaria de agendar uma limpeza dental. Podem me informar valores e disponibilidade?",
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