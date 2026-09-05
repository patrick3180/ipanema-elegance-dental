import { LandingPageConfig } from "@/types/LandingPageConfig";

/**
 * Config da V2 "revolucionária" da LP de Prótese (rota principal).
 * A V1 original segue congelada em /lp/especialista-protese-ipanema-v1.
 *
 * Estende LandingPageConfig com os blocos novos (seletor de prótese,
 * reenquadre de valor) sem alterar o type compartilhado nem a V1.
 *
 * Regras de copy aplicadas (BRAND.md + decisões do Patrick em 24/06/2026):
 *  - SEM preço, SEM antes/depois, SEM "premium/excelência/perfeito".
 *  - Prótese fixa: NÃO prometer "15 a 20 anos" de durabilidade.
 *  - Prótese removível: usar apenas "encaixe preciso" (não "sem grampos aparentes").
 *  - "Especialista em Prótese" é permitido (especialidade formal da Dra. Carla).
 *  - Materiais nomeados (porcelana de alta translucidez). CRO-RJ 27.509 visível.
 *  - CTA usa "consulta", nunca "avaliação".
 */

export interface ProteseSeletorOption {
  id: string;
  label: string;
  tag: string;          // "para quem é" — curto, em destaque
  description: string;  // como funciona
  highlight: string;    // diferencial qualitativo (sem promessa de anos)
  ctaLabel: string;
  assunto: string;      // passado p/ WhatsApp + tracking (pipeline Sofia/N8N)
  webhookSource: string;
}

export interface ProteseValueProp {
  title: string;
  description: string;
  icon: string; // chave de ícone resolvida no componente
}

export interface ProteseV2Config extends LandingPageConfig {
  proof: {
    rating: string;
    ratingCount: string;
    ratingHref: string;
    badges: string[]; // micro-prova above-the-fold
  };
  seletor: {
    title: string;
    subtitle: string;
    options: ProteseSeletorOption[];
    footnote: string;
  };
  valueProps: {
    title: string;
    subtitle: string;
    items: ProteseValueProp[];
  };
}

export const especialistaProteseV2Config: ProteseV2Config = {
  campaign: "especialista-protese-ipanema",

  messageMatch: {
    adGroup: "especialista-protese-reabilitacao",
    keyword: "especialista em protese dentaria",
  },

  whatsapp: {
    number: "5521993304045",
    message:
      "Olá! Vi a página sobre prótese e reabilitação e gostaria de agendar uma consulta para entender o que é possível no meu caso.",
  },

  hero: {
    // Headline benefício (aprovada na V1, escrita pelo Patrick) — mantida.
    headline: "Sua prótese pode funcionar como dentes de verdade",
    // Subheadline carrega o message match do anúncio: especialista, porcelana,
    // prótese fixa e sobre implante. Sem promessa de anos de durabilidade.
    subheadline:
      "Especialista em Prótese e Implantodontia, com mais de 20 anos em Ipanema. Coroas de porcelana, próteses fixas e sobre implante — cada caso planejado em detalhe para ficar natural.",
    ctaText: "Agendar minha consulta",
    backgroundImage: "/lovable-uploads/hero-fb",
  },

  proof: {
    // A LP em produção (Astro) lê nota/contagem/link de astro/src/lib/googleBusiness
    // — fonte única. Estes três campos só alimentam o ProteseHero.tsx legado;
    // mantidos em sincronia para não virarem dado podre.
    rating: "5,0",
    ratingCount: "21 avaliações",
    ratingHref:
      "https://www.google.com/maps/place/Dra.+Carla+Christoph+-+Reabilita%C3%A7%C3%A3o+oral+e+est%C3%A9tica/data=!4m7!3m6!1s0x9bd5070f90d87f:0x446370e6f29c86c4!8m2!3d-22.9836633!4d-43.2116873!9m1!1b1",
    badges: ["20+ anos em Ipanema", "CRO-RJ 27.509", "10.000+ pacientes"],
  },

  benefits: [
    "Especialista em Prótese e Implantodontia",
    "Planejamento individual de cada caso",
    "Do diagnóstico à finalização, em um só lugar",
    "WhatsApp 24h",
  ],

  // ─── Seletor de prótese (inovação principal: resolve a indecisão) ───
  seletor: {
    title: "Qual prótese para o seu caso?",
    subtitle:
      "A maioria dos pacientes chega em dúvida entre as opções. Veja a diferença e fale com a Dra. Carla sobre a que faz sentido para você — a indicação certa é definida na consulta.",
    options: [
      {
        id: "fixa",
        label: "Prótese Fixa",
        tag: "Dente fixo, sem precisar de implante",
        description:
          "Coroas e pontes fixas em porcelana, apoiadas nos seus dentes ou raízes aproveitáveis. Não sai da boca.",
        highlight: "Porcelana de alta translucidez · aspecto natural",
        ctaLabel: "Conversar sobre prótese fixa",
        assunto: "protese-fixa",
        webhookSource: "seletor_protese_fixa",
      },
      {
        id: "implante",
        label: "Prótese Sobre Implante",
        tag: "Dentes fixos quando faltam dentes de suporte",
        description:
          "O implante substitui a raiz e a prótese é fixada sobre ele. Estabilidade para mastigar com segurança.",
        highlight: "Fixa e estável · ajuda a preservar o osso",
        ctaLabel: "Conversar sobre prótese sobre implante",
        assunto: "protese-sobre-implante",
        webhookSource: "seletor_protese_implante",
      },
      {
        id: "removivel",
        label: "Prótese Removível Moderna",
        tag: "Quando a fixa ou o implante não é a melhor indicação agora",
        description:
          "Confeccionada sob medida, com encaixe preciso e estética natural, pensada para o conforto do dia a dia.",
        highlight: "Encaixe preciso · conforto e estabilidade",
        ctaLabel: "Conversar sobre prótese removível",
        assunto: "protese-removivel",
        webhookSource: "seletor_protese_removivel",
      },
    ],
    footnote:
      "A indicação ideal depende da condição dos dentes, do osso disponível e do seu objetivo — definida após o exame e o planejamento.",
  },

  // ─── Reassurance: "tem solução para o seu caso" (Problem reenquadrado) ───
  problem: {
    title: "O seu caso tem solução",
    description:
      "Casos de prótese raramente são iguais. Quando há ausências múltiplas, desgaste ou tratamentos anteriores que falharam, o resultado depende da experiência e do planejamento de quem conduz. Estes são casos que a Dra. Carla trata com frequência:",
    problems: [
      "Vários dentes ausentes e dúvida sobre a melhor solução.",
      "Prótese antiga que solta, machuca ou limita a alimentação.",
      "Um caso que você adiou por um tempo e quer finalmente resolver com segurança.",
      "Dentes muito desgastados ou com restaurações antigas comprometidas.",
      "Insegurança para sorrir ou comer em público por causa dos dentes.",
      "Sensação de que o caso é complexo demais e precisa de experiência específica.",
    ],
  },

  // ─── Reenquadre de valor vs. âncora "dentadura barata" (sem preço) ───
  valueProps: {
    title: "Por que a prótese de uma especialista é diferente",
    subtitle:
      "Não é só repor o dente. É planejar função, encaixe e estética para o resultado se manter ao longo do tempo.",
    items: [
      {
        title: "Planejamento antes de começar",
        description:
          "O projeto protético é definido antes da primeira etapa — com escaneamento iTero Element 5D quando indicado. Você entende o plano antes de qualquer procedimento.",
        icon: "scan",
      },
      {
        title: "Materiais selecionados, caso a caso",
        description:
          "Porcelana de alta translucidez e componentes com rastreabilidade — selecionados conforme a necessidade de cada paciente, não por padrão.",
        icon: "gem",
      },
      {
        title: "Do início ao fim, no mesmo lugar",
        description:
          "Do diagnóstico à entrega, com acompanhamento da Dra. Carla — sem pular de endereço a cada etapa do tratamento.",
        icon: "route",
      },
    ],
  },

  guide: {
    title: "A abordagem da especialista em prótese",
    subtitle:
      "Cada caso de reabilitação é planejado individualmente. A Dra. Carla conduz o processo do diagnóstico à entrega final.",
    steps: [
      {
        number: "1",
        title: "Consulta de planejamento",
        description:
          "Análise clínica completa, fotografias e radiografias. Quando indicado, também o escaneamento digital com iTero Element 5D. Entendemos o histórico e definimos os objetivos do tratamento.",
      },
      {
        number: "2",
        title: "Projeto protético digital",
        description:
          "Com base nos dados coletados, a Dra. Carla projeta a reabilitação — tipo de prótese, materiais e sequência de etapas. Tudo definido antes de começar.",
      },
      {
        number: "3",
        title: "Execução por etapas",
        description:
          "O tratamento segue o cronograma planejado. Cada etapa é executada com precisão, usando somente materiais de primeira linha e provas intermediárias para garantir o ajuste.",
      },
      {
        number: "4",
        title: "Acompanhamento de longo prazo",
        description:
          "Após a entrega, consultas de acompanhamento garantem que a prótese se mantenha funcional e confortável ao longo do tempo.",
      },
    ],
  },

  socialProof: {
    title: "O que nossos pacientes contam sobre o tratamento",
    testimonials: [
      {
        name: "Maria Helena R. — Ipanema",
        text: "Meu caso era mais complexo e eu estava insegura. A Dra. Carla fez um planejamento completo e hoje como de tudo com segurança. O processo foi longo, mas cada etapa fez sentido.",
      },
      {
        name: "João Carlos A. — Leblon",
        text: "O que me deu confiança foi o planejamento. Ela mostrou o projeto antes de começar e explicou cada etapa. O resultado ficou natural — ninguém percebe que é prótese.",
      },
      {
        name: "Beatriz L. — Copacabana",
        text: "Usava prótese removível há anos. Depois do tratamento com a Dra. Carla, tenho dentes fixos novamente. A diferença na qualidade de vida é enorme.",
      },
    ],
    stats: [
      { number: "20+", label: "Anos de Experiência" },
      { number: "10.000+", label: "Pacientes Atendidos" },
      { number: "Prótese", label: "Especialidade Formal" },
      { number: "24h", label: "WhatsApp Disponível" },
    ],
  },

  faq: {
    title: "Dúvidas sobre prótese e reabilitação oral",
    questions: [
      {
        question: "Dá para ter dente fixo sem implante?",
        answer:
          "Em muitos casos, sim. Quando há dentes ou raízes que sirvam de suporte, é possível instalar coroas e pontes fixas sem implante. Quando não há suporte suficiente, o implante entra como base. A indicação depende do exame clínico e dos exames de imagem.",
      },
      {
        question:
          "Qual a diferença entre um dentista generalista e uma especialista em prótese?",
        answer:
          "A especialista tem formação avançada em reabilitação oral — planejamento de casos complexos, domínio de materiais e técnicas específicas. Isso faz diferença principalmente em casos com múltiplas ausências ou desgaste severo.",
      },
      {
        question: "Prótese fixa ou removível — como saber qual é a melhor para mim?",
        answer:
          "Depende da condição dos dentes remanescentes, da quantidade de osso disponível e do caso como um todo. A análise clínica e os exames definem a indicação. A Dra. Carla apresenta as opções com prós e contras de cada uma.",
      },
      {
        question: "Prótese sobre implante é um processo demorado?",
        answer:
          "Tem etapas e respeita o tempo de cicatrização, que varia de caso a caso. No planejamento inicial, a Dra. Carla explica o cronograma do seu caso com clareza, do começo ao fim.",
      },
      {
        question: "O que faz uma prótese durar mais?",
        answer:
          "Materiais adequados, encaixe preciso e acompanhamento regular. Próteses bem planejadas e bem cuidadas se mantêm funcionais por muitos anos — a longevidade depende também dos seus cuidados e das visitas de manutenção.",
      },
      {
        question: "Vocês atendem convênios?",
        answer:
          "Nosso atendimento é particular, o que nos permite dedicar o tempo necessário ao planejamento e trabalhar com materiais selecionados. Na consulta, apresentamos o plano completo com valores transparentes.",
      },
    ],
  },

  cta: {
    title: "Seu caso merece atenção especializada",
    subtitle:
      "Agende sua consulta de planejamento. A análise detalhada é o primeiro passo para um tratamento seguro e bem conduzido.",
    buttonText: "Agendar minha consulta",
    urgency:
      "Espaços sem dentes causam movimentação dos dentes vizinhos — quanto antes a reposição, mais simples tende a ser.",
  },

  contact: {
    whatsappNumber: "5521993304045",
    whatsappMessage:
      "Olá! Vi a página sobre prótese e reabilitação e gostaria de agendar uma consulta para entender o que é possível no meu caso.",
    doctorName: "Dra. Carla Christoph",
    clinicName: "Consultório Odontológico",
  },

  seo: {
    title: "Especialista em Prótese Dentária Ipanema | Reabilitação Oral",
    description:
      "Reabilitação oral para casos complexos em Ipanema. Dra. Carla Christoph, especialista em prótese dentária, planeja e executa seu novo sorriso com precisão.",
    keywords: [
      "especialista em prótese dentária ipanema",
      "reabilitação oral ipanema",
      "prótese dentária fixa ipanema",
      "coroa de porcelana ipanema",
      "prótese sobre implante ipanema",
      "dente fixo sem implante",
      "melhor protesista rio de janeiro",
      "planejamento de sorriso",
    ],
  },

  tracking: {
    gtagId: "AW-16894364517",
    gtmId: "GTM-WZRDNBKQ",
  },
};
