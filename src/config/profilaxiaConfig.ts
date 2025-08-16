import { LandingPageConfig } from "@/types/LandingPageConfig";

export const profilaxiaConfig: LandingPageConfig = {
  campaign: "profilaxia-dental",
  urgency: "Cada dia de adiamento aumenta o acúmulo de bactérias nocivas",

  messageMatch: {
    adGroup: "profilaxia-ipanema-exato",
    keyword: "profilaxia dental ipanema"
  },

  whatsapp: {
    number: "5521993304045",
    message: "Olá! Vi o site e gostaria de agendar uma profilaxia dental. Podem me informar valores e disponibilidade?"
  },

  hero: {
    headline: "Profilaxia Dental Sem Desconforto em Ipanema - Tecnologia Avançada Para Sua Saúde Bucal",
    subheadline: "Profilaxia profissional com tecnologia de vibração ultrassônica que remove 30% mais biofilme que métodos tradicionais. Experiência confortável com Dra. Carla Christoph, especialista com mais de 20 anos.",
    ctaText: "Agendar Minha Profilaxia Profissional",
    backgroundImage: "/lovable-uploads/vertical-de-jaleco.webp"
  },

  benefits: [
    "✓ Tecnologia ultrassônica confortável - sensação suave, sem pressão dolorosa",
    "✓ Remove até 95% do biofilme causador de cáries e mau hálito",
    "✓ Previne problemas que custariam 8-50x mais para tratar",
    "✓ WhatsApp 24h para agendamentos e dúvidas"
  ],

  problem: {
    title: "90% dos Problemas Bucais Podem Ser Prevenidos com Profilaxia Regular",
    description: "Estudos científicos comprovam que a profilaxia profissional semestral reduz em até 60% o risco de doenças periodontais e em 40% a incidência de cáries. Na clínica da Dra. Carla Christoph, transformamos este cuidado essencial em uma experiência confortável e eficaz.",
    problems: [
      "Tártaro acumulado que não sai com escovação",
      "Mau hálito persistente mesmo com boa higiene",
      "Manchas nos dentes causadas por café e vinho",
      "Sangramento gengival durante a escovação",
      "Sensibilidade dental crescente",
      "Medo de procedimentos dolorosos"
    ]
  },

  guide: {
    title: "Como Funciona Sua Profilaxia Profissional",
    subtitle: "Processo completo em 5 etapas para sua saúde bucal",
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
    title: "O Que Nossos Pacientes Dizem Sobre a Profilaxia",
    testimonials: [
      {
        name: "Juliana Costa",
        text: "Fazia anos que não fazia profilaxia por trauma de experiências anteriores. Na Dra. Carla foi completamente diferente - zero dor, ambiente calmo e ela explica tudo o que está fazendo. Virei paciente fiel!",
        rating: 5
      },
      {
        name: "André Oliveira",
        text: "Como executivo, valorizo profissionais que respeitam meu tempo. A profilaxia foi rápida, eficiente e sem aquela sensação horrível de raspagem. O WhatsApp 24h facilita muito o agendamento na minha agenda corrida.",
        rating: 5
      },
      {
        name: "Beatriz Mendes",
        text: "Minha filha de 12 anos tinha pavor de dentista. A Dra. Carla foi tão gentil e a tecnologia é tão suave que ela saiu pedindo quando seria a próxima! Recomendo para toda família.",
        rating: 5
      }
    ],
    stats: [
      { number: "95%", label: "Biofilme Removido" },
      { number: "30%", label: "Mais Eficaz que Métodos Tradicionais" },
      { number: "60%", label: "Redução de Doenças Gengivais" },
      { number: "4.000+", label: "Pacientes Atendidos" }
    ]
  },

  faq: {
    title: "Perguntas Frequentes sobre Profilaxia",
    questions: [
      {
        question: "A profilaxia com ultrassom dói?",
        answer: "Não. A tecnologia ultrassônica é significativamente mais confortável que a raspagem manual. Pacientes descrevem a sensação como 'cócegas suaves' ou uma 'vibração agradável'. Mesmo pessoas com sensibilidade dental relatam conforto durante todo o procedimento."
      },
      {
        question: "Com que frequência devo fazer a profilaxia profissional?",
        answer: "Para a maioria dos pacientes, o intervalo ideal é de 6 meses. Esse período baseia-se no ciclo de formação do biofilme bacteriano e desenvolvimento de lesões iniciais. Pacientes com maior risco (diabetes, doenças gengivais) podem necessitar intervalos de 3-4 meses."
      },
      {
        question: "Por que não posso fazer apenas a higiene em casa?",
        answer: "A escovação e fio dental removem apenas 60% da placa bacteriana. O tártaro (placa calcificada) não sai com escovação - apenas com instrumentos profissionais. Além disso, existem áreas de difícil acesso que acumulam bactérias causadoras de cáries e mau hálito."
      },
      {
        question: "A profilaxia clareia os dentes?",
        answer: "A profilaxia remove manchas superficiais causadas por café, chá, vinho e cigarro, revelando a cor natural dos seus dentes - que fica visivelmente mais clara. Para clareamento além da cor natural, oferecemos tratamentos específicos."
      },
      {
        question: "Quanto tempo dura a consulta?",
        answer: "O procedimento de profilaxia em si, entre 30-45 minutos, dependendo da quantidade de tártaro acumulado. Diferente do atendimento 'em linha de produção', dedicamos o tempo que for necessário para um tratamento completo e confortável."
      },
      {
        question: "Posso comer normalmente após a profilaxia?",
        answer: "Sim, você pode se alimentar normalmente logo após o procedimento. Se houver aplicação de flúor, recomendamos aguardar 30 minutos antes de comer ou beber."
      },
      {
        question: "A profilaxia profissional substitui o tratamento de gengiva?",
        answer: "A profilaxia é preventiva e trata gengivites leves. Casos de periodontite (doença gengival avançada) requerem tratamento específico. Durante a avaliação, identificamos se há necessidade de cuidados adicionais."
      }
    ]
  },

  cta: {
    title: "Invista na Sua Saúde Bucal Hoje",
    subtitle: "Agende sua profilaxia profissional e experimente o padrão de excelência em odontologia preventiva de Ipanema",
    buttonText: "Quero Agendar Minha Profilaxia"
  },

  contact: {
    whatsappNumber: "5521993304045",
    whatsappMessage: "Olá! Vi o site e gostaria de agendar uma profilaxia dental.",
    doctorName: "Dra. Carla Christoph",
    clinicName: "Clínica Odontológica Premium Ipanema"
  },

  seo: {
    title: "Profilaxia Dental em Ipanema - Sem Dor | Dra. Carla Christoph",
    description: "Profilaxia dental com tecnologia ultrassônica em Ipanema. Remoção de tártaro sem desconforto, prevenção de cáries e mau hálito. Dra. Carla - 20+ anos. Agende!",
    keywords: [
      "profilaxia dental ipanema",
      "profilaxia dental",
      "profilaxia odontológica",
      "remoção de tártaro",
      "profilaxia sem dor",
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