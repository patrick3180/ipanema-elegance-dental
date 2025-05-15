
import React from "react";
import TreatmentPageTemplate from "@/components/TreatmentPageTemplate";
import { FAQ, TreatmentSection } from "@/components/treatment/types";

const RestaureacoesEsteticas = () => {
  // Define the page sections according to the content structure
  const sections: TreatmentSection[] = [
    {
      id: "o-que-sao-restauracoes",
      title: "O Que São Restaurações Dentárias Estéticas?",
      content: "Restaurações dentárias estéticas, também conhecidas como obturações da cor do dente, são procedimentos utilizados para reparar dentes danificados por cáries, fraturas ou trincas. Diferentemente das antigas restaurações metálicas (amálgama), as restaurações estéticas modernas, como as de resina composta, são confeccionadas para mimetizar a cor e a translucidez natural dos seus dentes, proporcionando um resultado imperceptível e harmonioso. A Dra. Carla Christoph em Ipanema prioriza essa abordagem para um sorriso impecável.",
      type: "default",
    },
    {
      id: "indicacoes-restauracoes",
      title: "Quando uma Restauração Dental Estética é Indicada em Ipanema?",
      content: "O tratamento com restaurações estéticas na nossa clínica em Ipanema é recomendado para diversas situações: <br/><br/> * <strong>Tratamento de Cáries:</strong> Remoção do tecido cariado e preenchimento da cavidade com material estético. <br/><br/> * <strong>Reparo de Dentes Quebrados ou Fraturados:</strong> Reconstrução da porção perdida do dente. <br/><br/> * <strong>Tratamento de Dentes Trincados:</strong> Para selar trincas e evitar que evoluam para problemas maiores. <br/><br/> * <strong>Substituição de Restaurações Antigas:</strong> Troca de restaurações de amálgama (escuras) ou resinas antigas e manchadas por novas restaurações estéticas. <br/><br/> * <strong>Correção de Pequenos Defeitos Estéticos:</strong> Fechamento de pequenos espaços ou correção de imperfeições na forma do dente. <br/><br/> Uma avaliação com a Dra. Carla Christoph é fundamental para um diagnóstico preciso e a indicação do melhor tratamento de restauração dental em Ipanema.",
      type: "default",
    },
    {
      id: "beneficios-restauracoes",
      title: "Vantagens das Restaurações Estéticas",
      content: [
        "<strong>Estética Superior:</strong> Resultado natural, com a cor e o brilho dos seus dentes originais.",
        "<strong>Preservação da Estrutura Dental:</strong> Geralmente requerem menor desgaste do dente saudável em comparação com algumas restaurações metálicas.",
        "<strong>Adesão ao Dente:</strong> As resinas compostas se unem quimicamente ao dente, proporcionando um selamento eficaz e maior resistência.",
        "<strong>Ausência de Metais:</strong> Ideal para pacientes com alergia a metais ou que preferem materiais livres de mercúrio.",
        "<strong>Versatilidade:</strong> Podem ser usadas tanto em dentes anteriores quanto posteriores.",
        "<strong>Reparo Facilitado:</strong> Pequenos reparos podem ser feitos na própria restauração de resina, se necessário."
      ],
      type: "benefits",
    },
    {
      id: "como-e-feito-restauracoes",
      title: "Seu Tratamento de Restauração Estética em Ipanema: Passo a Passo",
      content: [
        { 
          title: "Anestesia Local (se necessário)",
          description: "Para garantir que o procedimento seja indolor."
        },
        { 
          title: "Remoção do Tecido Cariado ou Preparo do Dente",
          description: "O tecido comprometido é removido e o dente é preparado para receber o material restaurador."
        },
        { 
          title: "Aplicação do Material Restaurador",
          description: "A resina composta é aplicada em camadas, sendo cada camada endurecida com uma luz especial (fotopolimerizador)."
        },
        { 
          title: "Escultura e Modelagem",
          description: "A Dra. Carla Christoph esculpe a resina para devolver a forma e a anatomia natural do dente."
        },
        { 
          title: "Ajuste da Mordida e Polimento",
          description: "A restauração é checada para garantir o encaixe correto na mordida e, em seguida, polida para um acabamento liso e brilhante."
        },
      ],
      type: "steps",
    },
    {
      id: "cuidados-restauracoes",
      title: "Cuidados Após sua Restauração Dental Estética",
      content: "Para manter sua restauração estética bonita e funcional por muitos anos, siga estas recomendações: Mantenha uma excelente higiene bucal, incluindo escovação após as refeições e uso diário de fio dental. Evite hábitos como morder objetos duros ou roer unhas, que podem danificar a restauração. Visite regularmente a Dra. Carla Christoph em Ipanema para check-ups e limpezas profissionais. Se sentir alguma sensibilidade persistente ou notar alguma alteração na restauração, entre em contato conosco.",
      type: "default",
    },
  ];

  // Define FAQs
  const faqs: FAQ[] = [
    {
      question: "O que é uma restauração dental estética?",
      answer: "É um procedimento para reparar dentes danificados por cáries ou fraturas utilizando materiais da cor do dente, como a resina composta, para um resultado natural. A Dra. Carla Christoph é especialista em restauração dental em Ipanema."
    },
    {
      question: "Quando uma restauração dental é necessária?",
      answer: "É indicada para tratar cáries, reparar dentes quebrados ou trincados, substituir restaurações antigas ou corrigir pequenos defeitos estéticos."
    },
    {
      question: "Qual material é usado para restaurações estéticas na clínica em Ipanema?",
      answer: "Priorizamos o uso de resinas compostas de alta qualidade, que oferecem excelente estética, durabilidade e adesão ao dente."
    },
    {
      question: "Restauração dental dói?",
      answer: "O procedimento é geralmente realizado com anestesia local para garantir seu conforto. É comum não sentir dor durante o tratamento."
    },
    {
      question: "Quanto tempo dura uma restauração em resina?",
      answer: "Com bons cuidados e acompanhamento regular, as restaurações em resina podem durar muitos anos. A Dra. Carla poderá dar uma estimativa para seu caso."
    },
    {
      question: "É possível trocar minhas restaurações antigas (escuras) por estéticas?",
      answer: "Sim, é um procedimento comum e muito procurado para melhorar a estética do sorriso. Agende uma avaliação em nossa clínica em Ipanema."
    },
    {
      question: "Como saber se meu dente está apenas trincado ou quebrado?",
      answer: "Apenas um exame clínico e, às vezes, radiográfico realizado pelo dentista pode diagnosticar corretamente. Se suspeitar de um dente trincado ou quebrado, procure a Dra. Carla Christoph."
    },
    {
      question: "O que influencia o custo de uma restauração dental estética?",
      answer: "O tamanho da restauração, o dente envolvido e a complexidade do caso são fatores que podem influenciar o investimento. Oferecemos um planejamento transparente em Ipanema."
    }
  ];

  return (
    <TreatmentPageTemplate
      slug="restauracoes-esteticas"
      title="Restaurações Dentárias Estéticas em Ipanema: Beleza e Função para seu Sorriso"
      metaDescription="Restauração dental estética em Ipanema com a Dra. Carla Christoph. Tratamento de cáries, dentes quebrados ou trincados com resultados naturais e duradouros."
      introduction="Cáries, dentes quebrados ou trincados podem comprometer não apenas a estética do seu sorriso, mas também sua saúde bucal. Na clínica da Dra. Carla Christoph em Ipanema, realizamos restaurações dentárias estéticas que devolvem a forma, função e beleza natural aos seus dentes, utilizando materiais modernos e técnicas precisas."
      sections={sections}
      faqs={faqs}
      whatsappMessage="Olá, gostaria de agendar uma avaliação para restaurações dentárias estéticas"
      ctaHeading="Restaure a Saúde e a Beleza do seu Sorriso em Ipanema!"
    />
  );
};

export default RestaureacoesEsteticas;
