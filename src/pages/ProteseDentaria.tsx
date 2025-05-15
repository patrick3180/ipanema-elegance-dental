
import React from "react";
import TreatmentPageTemplate from "@/components/TreatmentPageTemplate";

const ProteseDentaria = () => {
  const treatmentData = {
    slug: "protese-dentaria",
    title: "Prótese Dentária em Ipanema: Recupere seu Sorriso com Confiança",
    metaDescription: "Soluções em prótese dentária em Ipanema com a Dra. Carla Christoph. Devolva função e estética ao seu sorriso com tratamentos de reabilitação oral.",
    introduction: "Perdeu um ou mais dentes ou está com sua prótese atual desconfortável? A Dra. Carla Christoph, especialista em Prótese Dentária em Ipanema, oferece soluções personalizadas para devolver a função mastigatória, a estética do seu sorriso e sua qualidade de vida.",
    
    sections: [
      {
        id: "o-que-e-protese",
        title: "O Que é Prótese Dentária? Entenda a Solução",
        content: "A Prótese Dentária é a especialidade da odontologia dedicada a restaurar e substituir dentes ausentes ou danificados, visando a reabilitação oral completa do paciente. Seja através de coroas unitárias, pontes fixas, próteses removíveis ou próteses sobre implantes, o objetivo é devolver a capacidade de mastigação, a fala correta e, fundamentalmente, a estética natural do sorriso. Em nossa clínica em Ipanema, a Dra. Carla Christoph planeja cada caso individualmente, utilizando materiais de alta qualidade para resultados duradouros.",
        type: "default" as const
      },
      {
        id: "tipos-de-protese",
        title: "Tipos de Prótese Dentária Oferecidos em Ipanema",
        content: [
          "**Coroas Dentárias:** Capas protetoras que reconstroem a forma, função e estética de um dente danificado ou após um tratamento de canal.",
          "**Pontes Fixas:** Substituem um ou mais dentes ausentes, apoiando-se nos dentes vizinhos ou em implantes.",
          "**Próteses Parciais Removíveis (PPR):** Substituem alguns dentes ausentes e podem ser removidas pelo paciente para higienização.",
          "**Próteses Totais (Dentaduras):** Substituem todos os dentes de uma arcada, devolvendo o sorriso completo.",
          "**Prótese Sobre Implante:** Próteses fixas ou removíveis que se conectam a implantes dentários, oferecendo excelente estabilidade e retenção. Esta é uma área de grande expertise da Dra. Carla Christoph para reabilitação oral em Ipanema."
        ],
        type: "benefits" as const
      },
      {
        id: "beneficios-protese",
        title: "Benefícios da Reabilitação Oral com Prótese Dentária",
        content: [
          "**Restauração da Função Mastigatória:** Volte a comer seus alimentos preferidos com conforto e segurança.",
          "**Melhoria na Dicção:** A ausência de dentes pode afetar a fala, e as próteses ajudam a corrigi-la.",
          "**Recuperação da Estética do Sorriso:** Próteses modernas são confeccionadas para parecerem naturais, devolvendo a beleza do seu sorriso.",
          "**Aumento da Autoestima e Confiança:** Um sorriso completo e funcional impacta positivamente sua vida social e profissional.",
          "**Prevenção de Problemas Futuros:** A substituição de dentes ausentes evita a movimentação dos dentes remanescentes e problemas na articulação."
        ],
        type: "benefits" as const
      },
      {
        id: "como-e-feito-protese",
        title: "Seu Tratamento com Prótese Dentária em Ipanema: O Processo",
        content: [
          {
            title: "Consulta de Avaliação Detalhada",
            description: "Compreensão das suas necessidades, exame clínico, radiografias e, se necessário, escaneamento intraoral para um diagnóstico preciso."
          },
          {
            title: "Planejamento Individualizado",
            description: "Definição do tipo de prótese mais adequado, discussão sobre materiais e etapas do tratamento. O planejamento pode envolver o Design Digital do Sorriso (DSD) para visualização prévia dos resultados estéticos."
          },
          {
            title: "Preparo dos Dentes (se aplicável)",
            description: "Para coroas ou pontes fixas, pode ser necessário um preparo dos dentes de suporte."
          },
          {
            title: "Moldagem/Escaneamento",
            description: "Obtenção de um modelo preciso da sua boca para a confecção da prótese."
          },
          {
            title: "Provas e Ajustes",
            description: "Antes da finalização, são realizadas provas para garantir o encaixe perfeito, conforto e estética da prótese."
          },
          {
            title: "Instalação/Cimentação",
            description: "A prótese é finalmente instalada, e você recebe todas as orientações sobre cuidados e manutenção."
          }
        ],
        type: "steps" as const
      },
      {
        id: "cuidados-com-protese",
        title: "Cuidados Essenciais com sua Prótese Dentária",
        content: "Para garantir a longevidade e o bom funcionamento da sua prótese dentária, alguns cuidados são fundamentais: Higienize sua prótese e seus dentes naturais rigorosamente conforme as orientações da Dra. Carla Christoph. Visite regularmente seu dentista em Ipanema para avaliações e manutenção profissional da prótese. Evite morder alimentos excessivamente duros com próteses, especialmente as removíveis. Se sua prótese for removível, manuseie-a com cuidado para evitar quedas e fraturas. Siga todas as recomendações específicas para o seu tipo de prótese.",
        type: "default" as const
      }
    ],
    
    faqs: [
      {
        question: "Quais são os tipos de prótese dentária disponíveis na clínica em Ipanema?",
        answer: "Oferecemos uma variedade de soluções, incluindo coroas, pontes fixas, próteses parciais removíveis, próteses totais (dentaduras) e próteses sobre implantes, todas personalizadas pela Dra. Carla Christoph."
      },
      {
        question: "Como saber se preciso de uma prótese dentária?",
        answer: "Se você tem dentes ausentes, dentes muito danificados, dificuldade para mastigar ou está insatisfeito com próteses antigas, uma avaliação com nossa especialista em Prótese Dentária em Ipanema é o primeiro passo."
      },
      {
        question: "Prótese dentária sobre implante é necessária? (E quando ela é a melhor indicação?)",
        answer: "A necessidade é avaliada caso a caso. Próteses sobre implantes são uma excelente indicação para quem busca máxima estabilidade, conforto e preservação óssea, especialmente em casos de múltiplas perdas dentárias ou dentaduras que não se adaptam bem."
      },
      {
        question: "Quanto tempo dura uma prótese dentária?",
        answer: "A durabilidade varia conforme o tipo de prótese, os materiais utilizados e os cuidados do paciente, mas próteses bem confeccionadas e cuidadas podem durar muitos anos."
      },
      {
        question: "Como devo cuidar da minha prótese dentária?",
        answer: "A higienização correta e as visitas regulares ao dentista são cruciais. A Dra. Carla fornecerá instruções detalhadas para o seu tipo de prótese."
      },
      {
        question: "A colocação de uma prótese dentária dói?",
        answer: "Os procedimentos são realizados com anestesia e técnicas que visam o máximo conforto do paciente. Um leve desconforto pode ocorrer após alguns procedimentos, mas é gerenciável."
      },
      {
        question: "O que influencia o valor de um tratamento com prótese dentária?",
        answer: "O tipo de prótese, os materiais escolhidos (como porcelana pura ou zircônia), a complexidade do caso e o número de dentes envolvidos são fatores que influenciam o investimento. Discutiremos todas as opções e valores na sua consulta em Ipanema."
      },
      {
        question: "Minha prótese antiga pode ser substituída ou ajustada?",
        answer: "Sim, muitas vezes próteses antigas podem ser substituídas por soluções mais modernas e confortáveis, ou ajustadas para melhorar sua adaptação. Uma avaliação é necessária."
      }
    ],
    
    whatsappMessage: "Olá, gostaria de agendar uma avaliação para prótese dentária"
  };

  return <TreatmentPageTemplate {...treatmentData} />;
};

export default ProteseDentaria;
