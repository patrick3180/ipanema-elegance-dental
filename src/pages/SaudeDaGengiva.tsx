
import React from "react";
import TreatmentPageTemplate from "@/components/TreatmentPageTemplate";
import { FAQ } from "@/components/treatment/types";

const SaudeDaGengiva = () => {
  // Define the FAQs
  const faqs: FAQ[] = [
    {
      question: "O que é gengivite e periodontite?",
      answer: "Gengivite é a inflamação inicial da gengiva. Se não tratada, pode evoluir para periodontite, uma infecção mais grave que afeta os tecidos de suporte dos dentes e pode levar à perda dental. Oferecemos diagnóstico e tratamento para ambas as condições em Ipanema."
    },
    {
      question: "Quais são os sinais de alerta para problemas na gengiva?",
      answer: "Sangramento, vermelhidão, inchaço, mau hálito persistente e retração gengival são alguns dos principais sinais. Procure a Dra. Carla Christoph em Ipanema se notar algum deles."
    },
    {
      question: "Sangramento na gengiva é normal?",
      answer: "Não, gengivas saudáveis não sangram com facilidade. Sangramento é um sinal de inflamação (gengivite) e deve ser avaliado por um dentista."
    },
    {
      question: "Como é feito o tratamento para doenças da gengiva na clínica em Ipanema?",
      answer: "O tratamento varia desde a limpeza profissional (profilaxia) e raspagem até procedimentos mais específicos, dependendo da gravidade. A Dra. Carla e sua equipe indicarão o melhor caminho."
    },
    {
      question: "É possível prevenir a gengivite e a periodontite?",
      answer: "Sim! Com uma excelente higiene bucal diária e visitas regulares ao dentista para check-ups e limpezas, a maioria dos problemas gengivais pode ser prevenida ou controlada."
    },
    {
      question: "Problemas na gengiva podem afetar minha saúde geral?",
      answer: "Sim, estudos mostram uma ligação entre doenças periodontais e outras condições de saúde, como diabetes e doenças cardíacas. Cuidar da sua gengiva é cuidar da sua saúde integral."
    },
    {
      question: "O que considerar ao avaliar o investimento no tratamento da saúde gengival?",
      answer: "Pense na importância de manter seus dentes naturais, evitar complicações futuras, e no impacto da saúde bucal na sua saúde geral e bem-estar."
    }
  ];

  return (
    <TreatmentPageTemplate
      slug="saude-da-gengiva"
      title="Saúde da Gengiva em Ipanema: Prevenção e Tratamento Periodontal"
      metaDescription="Não ignore problemas na gengiva! Oferecemos tratamento para gengiva inflamada e sangrando em Ipanema, no consultório da Dra. Carla Christoph."
      introduction="Uma gengiva saudável é a base para um sorriso bonito e duradouro. No consultório da Dra. Carla Christoph em Ipanema, dedicamos atenção especial à saúde gengival, oferecendo diagnóstico, prevenção e tratamento para condições como gengivite e periodontite, muitas vezes em parceria com especialistas da área."
      sections={[
        {
          id: "o-que-e-doenca-periodontal",
          title: "Entendendo a Doença Periodontal: Gengivite e Periodontite",
          content: "A doença periodontal afeta as gengivas e as estruturas de suporte dos dentes. Ela geralmente começa com a **gengivite**, uma inflamação da gengiva causada pelo acúmulo de placa bacteriana, que pode causar vermelhidão, inchaço e sangramento. Se não tratada, a gengivite pode evoluir para a **periodontite**, uma forma mais grave onde há perda do osso que sustenta os dentes, podendo levar à mobilidade e até à perda dental. Cuidar da sua **saúde gengival em Ipanema** é essencial.",
          type: "default"
        },
        {
          id: "sinais-alerta-gengiva",
          title: "Sinais de Alerta: Quando Procurar Tratamento para Gengiva em Ipanema?",
          content: [
            "**Gengiva que sangra facilmente** durante a escovação ou uso do fio dental.",
            "**Gengiva vermelha, inchada ou sensível.**",
            "**Mau hálito persistente** ou gosto ruim na boca.",
            "**Retração gengival** (gengiva se afastando dos dentes, fazendo-os parecerem mais longos).",
            "**Presença de pus** entre os dentes e a gengiva.",
            "**Dentes com mobilidade** ou que parecem estar se separando."
          ],
          type: "benefits"
        },
        {
          id: "tratamentos-gengiva",
          title: "Tratamentos para a Saúde da Gengiva Oferecidos em Ipanema",
          content: [
            "**Profilaxia (Limpeza Dental Profissional):** Remoção da placa bacteriana e do tártaro para prevenir e tratar a gengivite inicial.",
            "**Raspagem e Alisamento Radicular:** Procedimento para remover tártaro e placa aderidos abaixo da linha da gengiva e na superfície das raízes, indicado para casos de periodontite.",
            "**Orientação de Higiene Bucal Específica:** Instruções personalizadas para melhorar seus cuidados em casa.",
            "**Manutenção Periodontal:** Consultas regulares de acompanhamento para pacientes que já trataram a periodontite, visando controlar a doença e evitar recidivas."
          ],
          type: "benefits"
        },
        {
          id: "importancia-prevencao-gengiva",
          title: "A Importância da Prevenção e Cuidados Contínuos com a Gengiva",
          content: "Prevenir problemas gengivais é sempre o melhor caminho. Uma boa higiene oral diária, incluindo escovação correta e uso de fio dental, e visitas regulares ao dentista para profilaxia são fundamentais. A Dra. Carla Christoph em Ipanema enfatiza a importância do acompanhamento preventivo para manter sua gengiva saudável e evitar a progressão de doenças periodontais, que podem ter impacto não apenas na sua boca, mas na sua saúde geral.",
          type: "default"
        }
      ]}
      faqs={faqs}
      whatsappMessage="Olá, gostaria de agendar uma avaliação para saúde da gengiva"
      ctaHeading="Cuide da Saúde da Sua Gengiva em Ipanema. Agende uma Avaliação!"
    />
  );
};

export default SaudeDaGengiva;
