import React from "react";
import TreatmentPageTemplate from "@/components/TreatmentPageTemplate";
import ComparisonTable from "@/components/blog/ComparisonTable";
import { CheckCircle, Star, Sparkles, Shield, Heart, Award } from "lucide-react";
import { ComparisonTableItem } from "@/types/BlogPost";

// Dados para tabela de comparação
const comparisonData: ComparisonTableItem[] = [
  {
    "Criterio": "Critério",
    "Rótulo coluna A": "Coroa/Ponte",
    "Rótulo coluna B": "Removível",
    "Rótulo coluna C": "Sobre Implante"
  },
  {
    "Criterio": "Indicação",
    "Rótulo coluna A": "1-3 dentes",
    "Rótulo coluna B": "Múltiplos/todos",
    "Rótulo coluna C": "Qualquer quantidade"
  },
  {
    "Criterio": "Fixação",
    "Rótulo coluna A": "Dente preparado",
    "Rótulo coluna B": "Grampos/mucosa",
    "Rótulo coluna C": "Implante ósseo"
  },
  {
    "Criterio": "Durabilidade",
    "Rótulo coluna A": "10-15 anos",
    "Rótulo coluna B": "5-7 anos",
    "Rótulo coluna C": "20+ anos"
  },
  {
    "Criterio": "Preserva osso",
    "Rótulo coluna A": "Parcial",
    "Rótulo coluna B": "Não",
    "Rótulo coluna C": "Total"
  },
  {
    "Criterio": "Sensação",
    "Rótulo coluna A": "Natural",
    "Rótulo coluna B": "Adaptação",
    "Rótulo coluna C": "Como dente próprio"
  },
  {
    "Criterio": "Manutenção",
    "Rótulo coluna A": "Como dente",
    "Rótulo coluna B": "Remove p/ limpar",
    "Rótulo coluna C": "Como dente"
  }
];

// Componente para tabela de comparação
const ComparisonSection = () => (
  <div className="my-12">
    <h2 className="heading-md mb-6">Comparação entre Tipos de Prótese</h2>
    <ComparisonTable data={comparisonData} />
    <p className="text-center mt-6 text-dental-gray">
      A escolha ideal depende do seu caso específico. Uma avaliação completa determinará a melhor solução para você.
    </p>
  </div>
);

// Componente para modalidades de prótese
const ModalidadesSection = () => (
  <div className="my-12">
    <h2 className="heading-md mb-8">Modalidades de Prótese Dentária Disponíveis</h2>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* COROAS DENTÁRIAS */}
      <div className="bg-white rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-all">
        <div className="text-dental-gold mb-4">
          <Sparkles size={32} />
        </div>
        <h3 className="text-xl font-medium text-dental-purple mb-3">
          Coroas Dentárias
        </h3>
        <p className="text-dental-gray mb-4">
          Capas protetoras em cerâmica pura ou zircônia que recobrem e protegem 
          dentes danificados, devolvendo forma, função e estética impecável.
        </p>
        <ul className="space-y-2 text-sm text-dental-gray">
          <li className="flex items-start">
            <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
            Proteção completa do dente
          </li>
          <li className="flex items-start">
            <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
            Estética indistinguível do natural
          </li>
          <li className="flex items-start">
            <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
            Durabilidade superior a 15 anos
          </li>
        </ul>
      </div>

      {/* PONTES FIXAS */}
      <div className="bg-white rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-all">
        <div className="text-dental-purple mb-4">
          <Shield size={32} />
        </div>
        <h3 className="text-xl font-medium text-dental-purple mb-3">
          Pontes Fixas
        </h3>
        <p className="text-dental-gray mb-4">
          Substituem um ou mais dentes ausentes através de uma estrutura fixa 
          apoiada em dentes vizinhos ou implantes.
        </p>
        <ul className="space-y-2 text-sm text-dental-gray">
          <li className="flex items-start">
            <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
            Solução fixa e confortável
          </li>
          <li className="flex items-start">
            <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
            Mastigação segura
          </li>
          <li className="flex items-start">
            <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
            Sem metal aparente
          </li>
        </ul>
      </div>

      {/* PRÓTESE SOBRE IMPLANTE */}
      <div className="bg-white rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-all">
        <div className="text-dental-gold mb-4">
          <Award size={32} />
        </div>
        <h3 className="text-xl font-medium text-dental-purple mb-3">
          Prótese Sobre Implante
        </h3>
        <p className="text-dental-gray mb-4">
          A solução mais avançada: próteses fixas ou removíveis ancoradas em 
          implantes, oferecendo máxima estabilidade.
        </p>
        <ul className="space-y-2 text-sm text-dental-gray">
          <li className="flex items-start">
            <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
            Preservação óssea total
          </li>
          <li className="flex items-start">
            <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
            Sensação natural
          </li>
          <li className="flex items-start">
            <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
            Maior longevidade
          </li>
        </ul>
      </div>

      {/* PRÓTESES REMOVÍVEIS */}
      <div className="bg-white rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-all">
        <div className="text-dental-purple mb-4">
          <Heart size={32} />
        </div>
        <h3 className="text-xl font-medium text-dental-purple mb-3">
          Próteses Removíveis
        </h3>
        <p className="text-dental-gray mb-4">
          Parciais (PPR) ou totais (dentaduras) modernas, com melhor adaptação 
          e estética superior.
        </p>
        <ul className="space-y-2 text-sm text-dental-gray">
          <li className="flex items-start">
            <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
            Solução acessível
          </li>
          <li className="flex items-start">
            <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
            Fácil manutenção
          </li>
          <li className="flex items-start">
            <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
            Rápida adaptação
          </li>
        </ul>
      </div>

      {/* PROTOCOLO ALL-ON-4/6 */}
      <div className="bg-white rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-all">
        <div className="text-dental-gold mb-4">
          <Star size={32} />
        </div>
        <h3 className="text-xl font-medium text-dental-purple mb-3">
          Protocolo All-on-4/6
        </h3>
        <p className="text-dental-gray mb-4">
          Reabilitação total da arcada sobre 4 ou 6 implantes, com prótese fixa 
          para transformação completa do sorriso.
        </p>
        <ul className="space-y-2 text-sm text-dental-gray">
          <li className="flex items-start">
            <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
            Dentes fixos definitivos
          </li>
          <li className="flex items-start">
            <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
            Sem enxerto ósseo
          </li>
          <li className="flex items-start">
            <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
            Transformação completa
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// Dados do tratamento
const treatmentData = {
  slug: "protese-dentaria",
  title: "Prótese Dentária em Ipanema: Recupere Função e Estética do Sorriso",
  metaDescription: "Prótese dentária em Ipanema com especialista. Coroas, pontes e próteses sobre implante. Reabilitação oral completa com 20+ anos de experiência.",
  introduction: `Sabemos como a perda dentária impacta profundamente sua vida. Não é apenas sobre 
    estética - é sobre o constrangimento em reuniões sociais, a dificuldade para 
    saborear seus pratos favoritos, as mudanças na fala que afetam sua comunicação. 
    Compreendemos essas dificuldades e, mais importante, temos as soluções para 
    transformar essa realidade.

    Com mais de 20 anos dedicados à reabilitação oral, desenvolvemos em nossa clínica 
    em Ipanema um protocolo que une tecnologia de ponta - como scanner intraoral iTero 
    e planejamento digital - com um cuidado verdadeiramente personalizado. Cada prótese 
    é planejada considerando não apenas a função, mas a harmonia com seu rosto e seu 
    estilo de vida.`,

  sections: [
    {
      id: "o-que-e-protese",
      title: "O que é Prótese Dentária?",
      type: "default" as const,
      content: `Prótese dentária é a especialidade odontológica que restaura e substitui dentes ausentes ou danificados através de **coroas, pontes, próteses removíveis ou sobre implantes**. O tratamento devolve função mastigatória, estética natural e qualidade de vida, com planejamento individualizado e materiais de alta qualidade.

      As próteses modernas utilizam materiais como **cerâmica pura, zircônia e porcelana**, que imitam perfeitamente a translucidez e cor dos dentes naturais. Com planejamento digital e scanner intraoral, garantimos precisão milimétrica e conforto excepcional.`
    },
    {
      id: "modalidades",
      title: "Modalidades Disponíveis",
      type: "default" as const,
      content: <ModalidadesSection />
    },
    {
      id: "comparacao",
      title: "Comparação Técnica",
      type: "default" as const,
      content: <ComparisonSection />
    },
    {
      id: "indicacoes",
      title: "Quando é Indicada a Prótese Dentária?",
      type: "benefits" as const,
      content: [
        "**Perda de um ou mais dentes** - por cárie, trauma ou doença periodontal",
        "**Dentes muito danificados** - que não podem ser restaurados com técnicas convencionais",
        "**Desgaste severo** - bruxismo ou erosão que compromete função e estética",
        "**Problemas de mordida** - que afetam mastigação e saúde das articulações",
        "**Reabilitação oral completa** - para pacientes com múltiplas necessidades",
        "**Melhoria estética** - quando dentes naturais apresentam forma ou cor inadequadas"
      ]
    },
    {
      id: "processo",
      title: "Processo de Tratamento",
      type: "steps" as const,
      content: [
        {
          title: "Consulta de Diagnóstico Completo",
          description: "Análise facial, exame clínico, radiografias digitais e escaneamento intraoral para diagnóstico preciso e planejamento personalizado."
        },
        {
          title: "Preparo Minimamente Invasivo", 
          description: "Quando necessário, preparamos os dentes com máxima preservação de estrutura saudável, sempre priorizando técnicas conservadoras."
        },
        {
          title: "Moldagem Digital de Precisão",
          description: "Scanner intraoral elimina desconforto de moldeiras, garantindo precisão milimétrica. O arquivo 3D é enviado diretamente ao laboratório parceiro."
        },
        {
          title: "Prova e Ajustes Estéticos",
          description: "Antes da finalização, realizamos provas para garantir encaixe perfeito, conforto ideal e estética natural que harmonize com seu sorriso."
        },
        {
          title: "Instalação Definitiva",
          description: "Cimentação com materiais de última geração, garantindo longevidade e naturalidade. Você sai com seu novo sorriso e todas as orientações."
        },
        {
          title: "Acompanhamento Continuado",
          description: "Consultas de manutenção para preservar seu investimento e garantir a saúde do seu sorriso por muitos anos."
        }
      ]
    },
    {
      id: "casos-especiais",
      title: "Casos Complexos e Especiais",
      type: "default" as const,
      content: `### Reabilitação Oral Completa

      Para casos de múltiplas perdas, desgaste severo ou problemas de mordida, desenvolvemos um protocolo completo que restabelece função, estética e dimensão vertical, com rejuvenescimento facial natural.

      - **Análise oclusal completa** - estudo detalhado da mordida
      - **Restabelecimento da dimensão vertical** - altura ideal dos dentes
      - **Rejuvenescimento facial** - melhora do suporte labial e facial

      ### Próteses Estéticas de Alta Performance

      Utilizamos cerâmicas de última geração (E-max, Zircônia) com estratificação artesanal, reproduzindo translucidez, textura e caracterização individual dos dentes naturais.

      - **Cerâmicas premium importadas** - materiais de primeira linha
      - **Estratificação artesanal** - técnica refinada de aplicação
      - **Resultado indistinguível** - aparência completamente natural`
    },
    {
      id: "especialista",
      title: "Sua Especialista",
      type: "default" as const,
      content: `### Dra. Carla Christoph
      **CRO-RJ 27.509 | Especialista em Prótese Dentária**

      - ✓ Mais de 20 anos dedicados à reabilitação oral
      - ✓ 8 anos como dentista militar na Marinha do Brasil
      - ✓ Especialização em Prótese Dentária e Implantodontia
      - ✓ Atualização contínua em técnicas e materiais

      *"Cada sorriso conta uma história única. Nossa missão é reconstruir não apenas dentes, mas devolver a confiança para viver plenamente, sem limitações."*

      Trabalhamos em conjunto com especialistas em Periodontia quando o caso requer abordagem multidisciplinar, sempre coordenados para garantir o melhor resultado.`
    }
  ],

  faqs: [
    {
      question: "Qual tipo de prótese é melhor para meu caso?",
      answer: "Cada caso é único e requer avaliação individualizada. A escolha depende de fatores como quantidade de dentes perdidos, condição óssea, saúde gengival, expectativas estéticas e estilo de vida. Durante a consulta de planejamento, analisamos todos esses aspectos para indicar a solução ideal para você."
    },
    {
      question: "Quanto tempo dura uma prótese bem feita?",
      answer: "Com materiais de qualidade e cuidados adequados, uma coroa ou ponte pode durar de 15 a 20 anos. Próteses sobre implante tendem a durar ainda mais, podendo ultrapassar 20 anos. A longevidade depende da higiene oral, visitas regulares ao dentista e cuidados diários."
    },
    {
      question: "Prótese sobre implante vale o investimento?",
      answer: "Para muitos pacientes, sim. A prótese sobre implante oferece vantagens únicas: preservação óssea total, não desgasta dentes vizinhos, maior durabilidade e sensação natural. Considerando a longevidade e qualidade de vida proporcionada, representa excelente custo-benefício a longo prazo."
    },
    {
      question: "Como é a manutenção das próteses?",
      answer: "Próteses fixas (coroas, pontes, sobre implante) são higienizadas como dentes naturais, com escovação e fio dental. Próteses removíveis devem ser retiradas para limpeza com produtos específicos. Visitas semestrais ao dentista são essenciais para manutenção profissional."
    },
    {
      question: "Vou ficar sem dentes durante o tratamento?",
      answer: "Nunca! Sempre providenciamos uma prótese provisória para que você mantenha estética e função durante todo o tratamento. Nosso compromisso é com seu conforto e vida social. Você não passará nenhum momento sem dentes."
    },
    {
      question: "Prótese pode parecer natural?",
      answer: "Absolutamente! Utilizamos técnicas como estratificação de cerâmica, caracterização individualizada e ajuste de cor personalizado. O resultado são dentes que imitam perfeitamente a natureza, com translucidez, textura e aparência indistinguíveis dos dentes naturais."
    },
    {
      question: "Qual a diferença entre porcelana e resina?",
      answer: "A porcelana (cerâmica) oferece superior estética, durabilidade e resistência a manchas. É nossa escolha para casos definitivos. A resina pode ser usada em provisórios ou situações específicas. Utilizamos apenas materiais premium importados para garantir o melhor resultado."
    },
    {
      question: "É possível fazer prótese com pouco osso?",
      answer: "Sim! Para próteses convencionais (não sobre implante), a quantidade óssea não é limitante. Para próteses sobre implante, técnicas como enxerto ósseo ou implantes zigomáticos podem viabilizar o tratamento. Uma avaliação tomográfica determina as possibilidades."
    },
    {
      question: "Quando trocar uma prótese antiga?",
      answer: "Sinais de que é hora de trocar: desgaste visível, mudança de cor, infiltrações, desadaptação, desconforto ao mastigar ou problemas gengivais ao redor da prótese. Uma avaliação profissional pode determinar o momento ideal para substituição."
    },
    {
      question: "O procedimento é doloroso?",
      answer: "Os procedimentos são realizados com anestesia local eficaz e técnicas que priorizam o conforto. A maioria dos pacientes relata menos desconforto do que esperavam. Providenciamos medicação adequada e acompanhamento próximo quando necessário."
    },
    {
      question: "Qual a vantagem de um especialista?",
      answer: "O especialista tem formação específica de 2-3 anos em prótese, domina técnicas avançadas, trabalha com os melhores laboratórios e tem experiência em casos complexos. Isso se traduz em próteses com melhor adaptação, estética superior e maior durabilidade."
    },
    {
      question: "Prótese fixa ou removível: como escolher?",
      answer: "A prótese fixa oferece maior conforto, segurança e sensação natural, mas requer condições específicas (dentes pilares saudáveis ou possibilidade de implantes). A removível é uma opção quando não há suporte para fixa. Avaliamos todos os fatores para indicar a melhor solução."
    }
  ],

  whatsappMessage: "Olá! Vi a página sobre prótese dentária e gostaria de agendar uma avaliação com a Dra. Carla Christoph",
  ctaHeading: "Pronto para Reconstruir seu Sorriso?"
};

const ProteseDentaria = () => {
  return (
    <TreatmentPageTemplate
      {...treatmentData}
    />
  );
};

export default ProteseDentaria;