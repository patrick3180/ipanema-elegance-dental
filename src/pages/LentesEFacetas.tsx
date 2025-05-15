
import React from "react";
import TreatmentPageTemplate from "@/components/TreatmentPageTemplate";

const LentesEFacetas = () => {
  const treatmentData = {
    slug: "lentes-e-facetas",
    title: "Lentes de Contato Dental e Facetas de Porcelana em Ipanema",
    metaDescription: "Conquiste o sorriso dos sonhos com lentes de contato dental em Ipanema. Dra. Carla Christoph oferece facetas de porcelana.",
    introduction: "Descubra a arte de um sorriso naturalmente deslumbrante com as lentes de contato dental e facetas de porcelana oferecidas pela Dra. Carla Christoph em nossa clínica em Ipanema. Essas finas lâminas de porcelana são a chave para uma transformação do sorriso completo, corrigindo imperfeições de cor, forma e alinhamento com resultados estéticos excepcionais e duradouros.",
    
    sections: [
      {
        id: "o-que-sao",
        title: "O Que São Lentes de Contato Dental e Facetas de Porcelana?",
        content: "As lentes de contato dental e as facetas de porcelana são peças ultrafinas de cerâmica pura, moldadas individualmente para cada paciente e cimentadas sobre a superfície dos dentes. Embora ambas visem aprimorar a estética do sorriso, as lentes de contato são tipicamente mais finas e requerem mínimo ou nenhum desgaste dental, sendo ideais para correções mais sutis. Já as facetas de porcelana, um pouco mais espessas, permitem correções mais significativas. Ambas as técnicas, realizadas com maestria pela Dra. Carla Christoph em Ipanema, proporcionam um resultado incrivelmente natural, mimetizando a translucidez e o brilho dos dentes naturais, para uma verdadeira transformação do sorriso com lentes dentais.",
        type: "default" as const
      },
      {
        id: "indicacoes",
        title: "Indicações: Quando Optar por Lentes de Contato Dental ou Facetas?",
        content: "Se você busca um sorriso mais harmônico e esteticamente agradável em Ipanema, as lentes de contato dental ou facetas de porcelana podem ser a solução ideal. Estes tratamentos são indicados para: Corrigir dentes manchados, escurecidos ou com alteração de cor que não respondem bem ao clareamento dental; Fechar espaços entre os dentes (diastemas); Restaurar dentes lascados, fraturados ou desgastados; Melhorar a forma e o tamanho de dentes desproporcionais ou dentes pequenos; Promover um alinhamento estético para dentes levemente desalinhados; Proporcionar um rejuvenescimento geral do sorriso. Uma avaliação cuidadosa com a Dra. Carla Christoph, sua dentista especialista em lentes de contato dental em Ipanema, definirá qual a melhor abordagem para o seu caso.",
        type: "default" as const
      },
      {
        id: "beneficios",
        title: "Benefícios que Vão Além da Estética: Lentes e Facetas",
        content: [
          "<strong>Resultados Altamente Estéticos:</strong> A porcelana possui características ópticas semelhantes ao esmalte dental, conferindo naturalidade incomparável.",
          "<strong>Durabilidade e Resistência:</strong> São peças resistentes a manchas e ao desgaste, mantendo a beleza do sorriso por muitos anos com os devidos cuidados.",
          "<strong>Preservação da Estrutura Dental:</strong> Especialmente com as lentes de contato, o desgaste do dente é mínimo ou inexistente.",
          "<strong>Melhora da Autoestima:</strong> Um sorriso renovado impacta positivamente a confiança e a forma como você se apresenta ao mundo.",
          "<strong>Planejamento Personalizado:</strong> Com o auxílio do Design Digital do Sorriso (DSD), você participa ativamente da criação do seu novo sorriso."
        ],
        type: "benefits" as const
      },
      {
        id: "como-e-feito",
        title: "Seu Tratamento com Lentes ou Facetas em Ipanema: Passo a Passo",
        content: [
          {
            title: "Avaliação e Planejamento:",
            description: "Uma consulta inicial detalhada para entender seus desejos e avaliar a saúde bucal. Fotografias, radiografias e, quando indicado, o escaneamento intraoral são realizados."
          },
          {
            title: "Design Digital do Sorriso (DSD):",
            description: "Em muitos casos, utilizamos o Design Digital do Sorriso. Essa tecnologia permite que você visualize uma simulação do resultado final e aprove o planejamento antes de qualquer intervenção."
          },
          {
            title: "Preparo Dental (se necessário):",
            description: "Um mínimo desgaste pode ser realizado para garantir o encaixe perfeito das peças. Para lentes de contato, muitas vezes não há necessidade de desgaste."
          },
          {
            title: "Moldagem/Escaneamento:",
            description: "Realizamos a moldagem ou escaneamento preciso dos seus dentes."
          },
          {
            title: "Confecção das Lâminas:",
            description: "As lentes ou facetas são confeccionadas artisticamente em laboratório especializado, seguindo o planejamento digital."
          },
          {
            title: "Cimentação:",
            description: "As peças são provadas e, após sua aprovação, cimentadas aos dentes com adesivos de alta performance, garantindo uma união forte e duradoura."
          }
        ],
        type: "steps" as const
      },
      {
        id: "cuidados",
        title: "Cuidados Essenciais para a Durabilidade das suas Lentes e Facetas",
        content: "Para garantir a longevidade e a beleza das suas lentes de contato dental ou facetas de porcelana, alguns cuidados são importantes: Mantenha uma excelente higiene bucal, com escovação e uso de fio dental regulares. Realize visitas periódicas à Dra. Carla Christoph em Ipanema para acompanhamento e profilaxia. Evite hábitos como roer unhas ou morder objetos duros. Se você tem bruxismo, o uso de uma placa miorrelaxante pode ser recomendado. Com os cuidados com facetas de porcelana e lentes adequados, seu novo sorriso permanecerá impecável por muitos anos.",
        type: "default" as const
      }
    ],
    
    faqs: [
      {
        question: "Lentes de contato dental e facetas de porcelana são a mesma coisa?",
        answer: "Embora similares, as lentes são mais finas e geralmente requerem menos preparo dental que as facetas. A Dra. Carla Christoph avaliará qual a melhor opção para seu caso em nossa clínica em Ipanema."
      },
      {
        question: "Qual a durabilidade das lentes de contato dental e das facetas?",
        answer: "Com os devidos cuidados e acompanhamento profissional, podem durar de 10 a 15 anos, ou até mais. A durabilidade das lentes de contato dental e facetas é excelente."
      },
      {
        question: "O tratamento com lentes de contato dental desgasta os dentes?",
        answer: "As lentes de contato dental são conhecidas por exigirem mínimo ou nenhum desgaste do esmalte dental. Casos com facetas podem requerer um preparo um pouco maior, sempre realizado de forma conservadora pela Dra. Carla Christoph."
      },
      {
        question: "Como é feito o planejamento com o Design Digital do Sorriso (DSD) em Ipanema?",
        answer: "O DSD utiliza fotos e vídeos para criar um projeto digital do seu novo sorriso, permitindo ajustes e sua aprovação antes do tratamento. É uma ferramenta poderosa para a transformação do sorriso com previsibilidade."
      },
      {
        question: "Quais os cuidados necessários após colocar lentes ou facetas?",
        answer: "Higienização rigorosa, visitas regulares ao dentista e evitar hábitos parafuncionais são essenciais. Detalharemos todos os cuidados com facetas de porcelana e lentes."
      },
      {
        question: "Lentes de resina são uma alternativa às de porcelana? Quais as diferenças em termos de estética e investimento?",
        answer: "Sim, facetas em resina são uma alternativa. Elas podem ser feitas em uma única sessão e geralmente têm um investimento inicial menor. No entanto, a porcelana oferece maior resistência a manchas, maior durabilidade e uma estética superior em termos de translucidez e brilho. A Dra. Carla poderá discutir a melhor opção para suas expectativas e orçamento em Ipanema."
      },
      {
        question: "É possível colocar lentes de contato dental em apenas um dente?",
        answer: "Sim, é possível aplicar em apenas um dente ou em vários, dependendo da necessidade estética e do planejamento individualizado feito pela nossa dentista especialista em lentes de contato dental em Ipanema."
      }
    ],
    
    whatsappMessage: "Olá, gostaria de agendar uma avaliação para lentes de contato dental ou facetas"
  };

  return <TreatmentPageTemplate {...treatmentData} />;
};

export default LentesEFacetas;
