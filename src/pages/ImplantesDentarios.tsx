
import React from "react";
import TreatmentPageTemplate from "@/components/TreatmentPageTemplate";

const ImplantesDentarios = () => {
  const treatmentData = {
    slug: "implantes-dentarios",
    title: "Implantes Dentários em Ipanema: A Solução Moderna para Repor Dentes",
    metaDescription: "Dra. Carla Christoph oferece implantes dentários em Ipanema para restaurar seu sorriso. Conheça os benefícios dos implantes e recupere sua qualidade de vida.",
    introduction: "Perdeu um ou mais dentes? Os implantes dentários são a forma mais avançada e segura de recuperar a função, estética e confiança do seu sorriso. Na clínica da Dra. Carla Christoph em Ipanema, oferecemos tratamentos com implantes para uma reabilitação oral completa e duradoura.",
    
    sections: [
      {
        id: "o-que-sao-implantes",
        title: "O Que São Implantes Dentários? Entenda a Tecnologia",
        content: "Os implantes dentários são pinos de titânio, um material biocompatível, que funcionam como raízes artificiais fixadas cirurgicamente no osso maxilar ou mandibular. Sobre esses implantes, são então conectadas as próteses dentárias (coroas unitárias, pontes ou dentaduras), que substituem os dentes ausentes de forma muito similar aos dentes naturais. Este tratamento, realizado pela Dra. Carla Christoph em Ipanema, é considerado o padrão ouro na odontologia para a reposição dentária.",
        type: "default" as const
      },
      {
        id: "indicacoes-implantes",
        title: "Quem Pode se Beneficiar dos Implantes Dentários em Ipanema?",
        content: "Os implantes dentários são uma excelente solução para a maioria dos pacientes em Ipanema que perderam um, vários ou todos os dentes. As principais indicações incluem: * Substituição de um único dente perdido. * Reposição de múltiplos dentes ausentes, servindo de suporte para pontes fixas. * Suporte para próteses totais (dentaduras), proporcionando muito mais estabilidade e conforto (prótese protocolo ou overdenture). * Pacientes que buscam uma alternativa mais fixa e confortável às próteses removíveis tradicionais. Uma avaliação detalhada com a Dra. Carla Christoph, especialista em implantes dentários em Ipanema, é essencial para confirmar a indicação e planejar seu caso.",
        type: "default" as const
      },
      {
        id: "beneficios-implantes",
        title: "Principais Benefícios dos Implantes Dentários",
        content: [
          "<strong>Estética Natural:</strong> As próteses sobre implantes são confeccionadas para se assemelharem perfeitamente aos seus dentes naturais.",
          "<strong>Conforto e Segurança:</strong> Eliminam o desconforto e a instabilidade das próteses removíveis.",
          "<strong>Melhora na Mastigação e Fala:</strong> Permitem mastigar todos os tipos de alimentos e falar com clareza.",
          "<strong>Durabilidade:</strong> Com os devidos cuidados, os implantes podem durar a vida toda.",
          "<strong>Preservação Óssea:</strong> Os implantes estimulam o osso alveolar, prevenindo sua reabsorção após a perda dental.",
          "<strong>Não Desgasta Dentes Vizinhos:</strong> Diferente de algumas pontes fixas tradicionais, os implantes não requerem desgaste dos dentes adjacentes saudáveis.",
          "<strong>Aumento da Confiança:</strong> Devolvem a segurança para sorrir, comer e interagir socialmente."
        ],
        type: "benefits" as const
      },
      {
        id: "como-e-feito-implantes",
        title: "Seu Tratamento com Implantes Dentários em Ipanema: Passo a Passo",
        content: [
          {
            title: "Avaliação e Planejamento Detalhado",
            description: "Exames clínicos, radiográficos e, frequentemente, tomografia computadorizada são utilizados para avaliar a quantidade e qualidade óssea e planejar a posição ideal dos implantes."
          },
          {
            title: "Cirurgia de Instalação do Implante",
            description: "Procedimento realizado com anestesia local, onde o pino de titânio é inserido no osso. É uma cirurgia precisa e, na maioria dos casos, tranquila."
          },
          {
            title: "Período de Osseointegração",
            description: "Após a cirurgia, aguarda-se um período (geralmente de 3 a 6 meses) para que o implante se integre firmemente ao osso."
          },
          {
            title: "Fase Protética",
            description: "Após a osseointegração, é confeccionada e instalada a prótese definitiva sobre o implante (coroa, ponte ou dentadura). Em alguns casos selecionados, pode ser possível realizar a técnica de implante dentário com carga imediata em Ipanema, onde uma prótese provisória é instalada logo após a cirurgia."
          }
        ],
        type: "steps" as const
      },
      {
        id: "cuidados-pos-implantes",
        title: "Cuidados Essenciais Após a Instalação dos Implantes Dentários",
        content: "Para o sucesso a longo prazo dos seus implantes dentários, siga as orientações da Dra. Carla Christoph em Ipanema:\n\nMantenha uma higiene bucal impecável, com escovação cuidadosa e uso de fio dental ou escovas interdentais.\n\nRealize visitas regulares ao dentista para controle e manutenção profissional.\n\nEvite sobrecarregar os implantes nos primeiros meses após a cirurgia.\n\nNão fume, pois o tabagismo prejudica a cicatrização e a longevidade dos implantes.\n\nCom os cuidados adequados, seus implantes podem oferecer uma solução duradoura e satisfatória.",
        type: "default" as const
      }
    ],
    
    faqs: [
      {
        question: "O que são implantes dentários e como funcionam?",
        answer: "São pinos de titânio que substituem as raízes dos dentes perdidos, servindo de base para a colocação de próteses. A Dra. Carla Christoph, especialista em implantes dentários em Ipanema, pode explicar todos os detalhes."
      },
      {
        question: "Quem é um bom candidato para implantes dentários em Ipanema?",
        answer: "Pacientes com boa saúde geral e quantidade óssea adequada na região da perda dental são geralmente bons candidatos. Uma avaliação completa é necessária."
      },
      {
        question: "O procedimento de implante dentário dói?",
        answer: "A cirurgia é realizada com anestesia local, tornando o procedimento indolor. Um leve desconforto pós-operatório pode ocorrer, mas é controlado com medicação."
      },
      {
        question: "Quanto tempo dura o tratamento com implantes dentários?",
        answer: "O tempo total varia, incluindo o período de osseointegração (3-6 meses) e a confecção da prótese. Casos de carga imediata podem ser mais rápidos."
      },
      {
        question: "Quais os cuidados necessários após a cirurgia de implante?",
        answer: "Repouso, medicação prescrita, higiene cuidadosa e alimentação leve nos primeiros dias são importantes. Todas as orientações serão fornecidas."
      },
      {
        question: "Implantes dentários são melhores que outras opções de prótese?",
        answer: "Para muitos casos, os implantes oferecem vantagens superiores em termos de estabilidade, conforto, preservação óssea e estética, sendo uma excelente forma de reabilitação oral em Ipanema."
      },
      {
        question: "O que considerar ao avaliar o investimento em um tratamento com implantes dentários?",
        answer: "Considere a durabilidade, os benefícios para a qualidade de vida, a preservação da saúde bucal e a expertise do profissional ao avaliar o investimento em implantes dentários."
      },
      {
        question: "Qual a taxa de sucesso dos implantes dentários?",
        answer: "Quando bem planejados e executados por um especialista, e com os devidos cuidados do paciente, as taxas de sucesso dos implantes são muito altas, superiores a 95%."
      }
    ],
    
    whatsappMessage: "Olá, gostaria de agendar uma avaliação para implantes dentários",
    ctaHeading: "Dê o Primeiro Passo para um Sorriso Completo e Funcional em Ipanema!"
  };

  return <TreatmentPageTemplate {...treatmentData} />;
};

export default ImplantesDentarios;
