
import React from "react";
import TreatmentPageTemplate from "@/components/TreatmentPageTemplate";
import { FAQ } from "@/components/treatment/types";

const ClinicaGeralPrevencao = () => {
  // Define the FAQs
  const faqs: FAQ[] = [
    {
      question: "Com que frequência devo visitar o dentista para um check-up e limpeza em Ipanema?",
      answer: "Geralmente, recomenda-se uma visita a cada 6 meses. No entanto, a Dra. Carla Christoph poderá indicar uma frequência personalizada com base nas suas necessidades individuais."
    },
    {
      question: "O que é o check-up odontológico digital oferecido na clínica em Ipanema?",
      answer: "Utilizamos câmeras intraorais e outras tecnologias para um exame mais detalhado e preciso, permitindo que você também visualize as condições da sua boca e entenda melhor qualquer necessidade de tratamento."
    },
    {
      question: "Limpeza dental profissional (profilaxia) dói?",
      answer: "A profilaxia é geralmente um procedimento indolor e confortável. Se você tiver muita sensibilidade, nos avise para que possamos tomar cuidados adicionais."
    },
    {
      question: "Como a prevenção odontológica pode evitar tratamentos mais caros e complexos?",
      answer: "Ao identificar e tratar problemas como cáries iniciais ou gengivite precocemente, evitamos que evoluam para condições que exigiriam tratamentos como canal, extrações ou próteses mais extensas."
    },
    {
      question: "Crianças também precisam de acompanhamento em clínica geral e prevenção?",
      answer: "Sim, os cuidados preventivos são fundamentais desde a infância para garantir um desenvolvimento oral saudável. Adaptamos o atendimento para todas as idades."
    },
    {
      question: "Aplicação de flúor é apenas para crianças?",
      answer: "Não, adultos também podem se beneficiar da aplicação de flúor, especialmente aqueles com maior risco de cáries ou sensibilidade dental. A indicação é personalizada."
    }
  ];

  return (
    <TreatmentPageTemplate
      slug="clinica-geral-e-prevencao"
      title="Clínica Geral e Prevenção Odontológica em Ipanema"
      metaDescription="Prevenção odontológica em Ipanema com a Dra. Carla Christoph. Cuide da sua saúde bucal com limpeza dental, check-ups digitais e orientação personalizada."
      introduction="A base para um sorriso saudável e duradouro começa com a prevenção e os cuidados de rotina. Na clínica da Dra. Carla Christoph em Ipanema, oferecemos um acompanhamento completo em clínica geral, focado em manter sua saúde bucal em dia e evitar problemas futuros."
      sections={[
        {
          id: "o-que-e-clinica-geral",
          title: "Entendendo a Clínica Geral Odontológica e a Prevenção",
          content: "A Clínica Geral Odontológica é a área da odontologia que atua no diagnóstico, tratamento e prevenção da maioria dos problemas bucais. É o seu primeiro ponto de contato para um cuidado abrangente. A prevenção odontológica, por sua vez, engloba todas as medidas e tratamentos que visam evitar o surgimento de doenças como cáries e problemas gengivais. Na nossa clínica em Ipanema, a Dra. Carla Christoph integra esses dois pilares para oferecer um cuidado completo e contínuo.",
          type: "default"
        },
        {
          id: "servicos-preventivos",
          title: "Nossos Serviços de Clínica Geral e Prevenção em Ipanema",
          content: [
            "**Check-up Odontológico Digital:** Avaliações completas e detalhadas com o auxílio de tecnologia digital para um diagnóstico preciso da sua saúde bucal.",
            "**Limpeza Dental Profissional (Profilaxia):** Remoção de placa bacteriana e tártaro, polimento dos dentes e orientação para uma higiene oral eficaz. Essencial para prevenir cáries e doenças gengivais.",
            "**Aplicação de Flúor:** Fortalece o esmalte dental, ajudando a prevenir a formação de cáries, especialmente em pacientes com maior risco.",
            "**Orientação de Higiene Bucal Personalizada:** Instruções e dicas sobre as melhores técnicas de escovação, uso de fio dental e outros cuidados para manter seu sorriso saudável em casa.",
            "**Diagnóstico e Tratamento Inicial de Problemas:** Identificação precoce e tratamento de cáries em estágio inicial, problemas gengivais leves e outras condições."
          ],
          type: "benefits"
        },
        {
          id: "beneficios-prevencao",
          title: "Por Que Investir na Prevenção Odontológica em Ipanema?",
          content: [
            "**Evita Dor e Desconforto:** A prevenção ajuda a impedir que pequenos problemas se tornem grandes e dolorosos.",
            "**Economia a Longo Prazo:** Prevenir é menos custoso do que tratar doenças já instaladas.",
            "**Mantém seu Sorriso Bonito e Saudável:** Consultas regulares garantem dentes limpos, hálito fresco e um sorriso confiante.",
            "**Saúde Geral:** A saúde bucal está diretamente ligada à saúde do corpo como um todo.",
            "**Diagnóstico Precoce:** Problemas identificados no início têm tratamento mais simples e rápido."
          ],
          type: "benefits"
        },
        {
          id: "consulta-preventiva",
          title: "Como é Sua Consulta de Clínica Geral e Prevenção em Ipanema?",
          content: "Sua consulta de prevenção e clínica geral com a Dra. Carla Christoph em Ipanema é um momento dedicado integralmente à sua saúde bucal. Iniciamos com uma conversa para entender seu histórico e hábitos, seguido de um exame clínico minucioso, que pode incluir o check-up digital. Se indicada, a limpeza dental profissional (profilaxia) é realizada. Ao final, você recebe todas as orientações para manter os cuidados em casa e definimos a frequência ideal para seus retornos.",
          type: "default"
        }
      ]}
      faqs={faqs}
      whatsappMessage="Olá, gostaria de agendar um check-up dental e limpeza"
      ctaHeading="Agende sua Consulta de Prevenção e Cuide da Sua Saúde Bucal em Ipanema!"
    />
  );
};

export default ClinicaGeralPrevencao;
