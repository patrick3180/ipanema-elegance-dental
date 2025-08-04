import React from "react";
import TreatmentPageTemplate from "@/components/TreatmentPageTemplate";

const ClareamentoDental = () => {
  const treatmentData = {
    slug: "clareamento-dental",
    title: "Clareamento Dental Profissional em Ipanema",
    metaDescription: "Clareamento dental profissional em Ipanema com a Dra. Carla Christoph. Obtenha dentes mais brancos com técnicas seguras de consultório ou caseiras supervisionadas.",
    introduction: "Sonha com dentes mais brancos e um sorriso impactante? O clareamento dental profissional oferecido pela Dra. Carla Christoph em Ipanema é a maneira segura e eficaz de alcançar o tom desejado, realçando a beleza natural do seu sorriso com resultados que iluminam sua expressão.",
    
    sections: [
      {
        id: "o-que-e-clareamento",
        title: "O Que é o Clareamento Dental Profissional?",
        content: "O clareamento dental profissional é um procedimento odontológico estético que visa clarear a pigmentação dos dentes, removendo manchas e devolvendo uma tonalidade mais clara e uniforme ao esmalte e dentina. Realizado ou supervisionado por um dentista, como a Dra. Carla Christoph em Ipanema, este tratamento utiliza agentes clareadores em concentrações seguras e eficazes, muito superiores aos produtos de venda livre, garantindo resultados visíveis e com responsabilidade pela sua saúde bucal. Muitos pacientes têm dúvidas sobre as <a href=\"/blog/saude-bucal-dentes-amarelos\"><strong>principais causas dos dentes amarelos</strong></a> e como o clareamento pode ajudar a resolver essas questões de forma definitiva.",
        type: "default" as const
      },
      {
        id: "tipos-de-clareamento",
        title: "Tipos de Clareamento Dental Oferecidos em Nossa Clínica em Ipanema",
        content: [
          "<strong>Clareamento Dental em Consultório:</strong> Realizado integralmente na clínica, esta técnica utiliza um gel clareador de maior concentração, ativado ou não por fontes de luz (como LED ou laser, dependendo da técnica específica), proporcionando dentes mais brancos em menos sessões. É ideal para quem busca resultados rápidos.",
          "<strong>Clareamento Dental Caseiro Supervisionado:</strong> O paciente utiliza moldeiras personalizadas com um gel clareador de menor concentração em casa, seguindo rigorosamente as orientações e o acompanhamento da Dra. Carla Christoph. É uma opção gradual e confortável. Para entender todos os detalhes sobre <a href=\"/blog/odontologia-estetica-clareamento-dental-caseiro\"><strong>clareamento dental caseiro supervisionado</strong></a>, confira nosso guia completo com informações técnicas e científicas.",
          "<strong>Clareamento Dental Combinado:</strong> Uma associação das duas técnicas anteriores para potencializar e prolongar os resultados, unindo a rapidez do consultório com a continuidade do tratamento caseiro. A melhor opção de clareamento dental em Ipanema para você será definida após uma avaliação detalhada."
        ],
        type: "benefits" as const
      },
      {
        id: "beneficios-clareamento",
        title: "Benefícios de um Sorriso Mais Branco e Confiante em Ipanema",
        content: [
          "<strong>Resultados Notáveis:</strong> Conquista de dentes mais brancos e um sorriso visivelmente rejuvenescido.",
          "<strong>Segurança:</strong> O procedimento é realizado ou supervisionado por um profissional qualificado, garantindo um clareamento dental seguro e minimizando riscos de sensibilidade.",
          "<strong>Melhora da Autoestima:</strong> Um sorriso mais claro e bonito aumenta a confiança e o bem-estar.",
          "<strong>Personalização:</strong> O tratamento é adaptado às suas necessidades e características dentais.",
          "<strong>Rapidez e Conveniência:</strong> Especialmente com o clareamento em consultório, os resultados podem ser vistos rapidamente."
        ],
        type: "benefits" as const
      },
      {
        id: "como-e-feito-clareamento",
        title: "Seu Tratamento de Clareamento Dental em Ipanema: O Processo",
        content: [
          {
            title: "Avaliação Inicial",
            description: "A Dra. Carla Christoph realiza um exame clínico completo para verificar a saúde bucal e se não há contraindicações para o clareamento dental. A tonalidade atual dos dentes é registrada."
          },
          {
            title: "Planejamento",
            description: "A técnica de clareamento mais adequada (consultório, caseiro ou combinado) é definida em conjunto com você."
          },
          {
            title: "Preparo (para clareamento em consultório)",
            description: "As gengivas e mucosas são protegidas, e o gel clareador é aplicado sobre os dentes. Pode-se usar uma fonte de luz para acelerar o processo."
          },
          {
            title: "Sessões (para clareamento em consultório)",
            description: "Podem ser necessárias algumas sessões, dependendo do resultado desejado."
          },
          {
            title: "Orientações (para clareamento caseiro)",
            description: "São confeccionadas moldeiras personalizadas e você recebe o gel clareador com todas as instruções de uso e tempo."
          },
          {
            title: "Acompanhamento",
            description: "Visitas de controle são agendadas para monitorar o progresso e a saúde bucal."
          }
        ],
        type: "steps" as const
      },
      {
        id: "cuidados-pos-clareamento",
        title: "Mantendo seu Sorriso Branco e Radiante: Cuidados Pós-Clareamento",
        content: "Para prolongar os resultados do clareamento dental e manter seus dentes mais brancos por mais tempo: Evite alimentos e bebidas com alta pigmentação (café, chá, vinho tinto, açaí) nos primeiros dias após o tratamento. Mantenha uma higiene bucal rigorosa. Não fume. Realize consultas de manutenção do clareamento dental com a Dra. Carla Christoph em Ipanema conforme recomendado. Um clareamento dental duradouro depende também dos seus hábitos e cuidados. Leia meu artigo sobre <a href=\"/blog/saude-bucal-bebidas-que-mancham-os-dentes\"><strong>bebidas que mancham os dentes</strong></a> para saber quais substâncias podem comprometer seus resultados.",
        type: "default" as const
      },
      {
        id: "casos-especiais-facetas",
        title: "Casos Especiais: Clareamento com Facetas e Coroas Dentárias",
        content: "Uma situação muito comum em minha clínica é receber pacientes que já possuem facetas, coroas ou outras restaurações estéticas e desejam realizar clareamento dental. Este é um cenário que requer planejamento criterioso e expertise técnica, pois os materiais restauradores não respondem aos agentes clareadores da mesma forma que os dentes naturais. O resultado pode ser uma diferença cromática entre dentes naturais clareados e restaurações que permaneceram com a cor original. Por isso, é fundamental uma avaliação detalhada para determinar a melhor estratégia de tratamento, que pode incluir o clareamento dos dentes naturais seguido da substituição das restaurações na nova tonalidade. Para uma compreensão completa deste tema complexo, confira meu artigo detalhado sobre <a href=\"/blog/estetica-dental-clareamento-facetas\"><strong>clareamento dental e facetas existentes</strong></a>, onde explico todas as nuances técnicas e opções de tratamento disponíveis.",
        type: "default" as const
      }
    ],
    
    faqs: [
      {
        question: "Qual a diferença entre clareamento dental caseiro e de consultório? Qual o melhor?",
        answer: "O clareamento em consultório utiliza géis mais concentrados para resultados rápidos. O caseiro supervisionado é gradual, com géis menos concentrados. Muitas vezes, o melhor clareamento dental em Ipanema é uma combinação de ambos, personalizada pela Dra. Carla."
      },
      {
        question: "Clareamento dental dói ou causa sensibilidade?",
        answer: "Alguma sensibilidade pode ocorrer, mas é temporária e pode ser minimizada com técnicas e produtos específicos utilizados pela Dra. Carla Christoph. Um clareamento dental seguro é nossa prioridade."
      },
      {
        question: "O clareamento dental em consultório é seguro?",
        answer: "Sim, quando realizado por um profissional qualificado, seguindo todos os protocolos de proteção, é um procedimento seguro e eficaz."
      },
      {
        question: "Quanto tempo dura o resultado do clareamento dental profissional?",
        answer: "Os resultados podem durar de 1 a 3 anos, dependendo dos hábitos do paciente e dos cuidados de manutenção."
      },
      {
        question: "Quais cuidados são necessários após realizar um clareamento dental?",
        answer: "Evitar alimentos pigmentados, manter boa higiene e seguir as orientações da Dra. Carla são cruciais para a manutenção do clareamento dental."
      },
      {
        question: "O clareamento dental funciona para todos os tipos de dentes/manchas?",
        answer: "O clareamento é eficaz para a maioria das manchas extrínsecas. Manchas intrínsecas (como por tetraciclina) ou dentes com restaurações podem não clarear. Uma avaliação na nossa clínica em Ipanema é essencial."
      },
      {
        question: "O que considerar ao avaliar o investimento em um clareamento dental profissional?",
        answer: "Considere a segurança do procedimento supervisionado, a qualidade dos materiais, a personalização do tratamento e a durabilidade dos resultados ao escolher seu clareamento dental profissional em Ipanema."
      }
    ],
    
    whatsappMessage: "Olá, gostaria de agendar uma avaliação para clareamento dental"
  };

  return <TreatmentPageTemplate {...treatmentData} />;
};

export default ClareamentoDental;