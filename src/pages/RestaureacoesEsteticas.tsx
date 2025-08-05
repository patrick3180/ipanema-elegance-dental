import React from "react";
import TreatmentPageTemplate from "@/components/TreatmentPageTemplate";

const RestaureacoesEsteticas = () => {
  const treatmentData = {
    slug: "restauracoes-esteticas",
    title: "Restaurações Dentárias Estéticas em Ipanema: Beleza e Função para seu Sorriso",
    metaDescription: "Restauração dental estética em Ipanema com Dra. Carla Christoph. Materiais de excelência para cáries, dentes trincados e fraturas. Resinas de alta qualidade com resultados naturais e duradouros.",
    introduction: "Cáries, dentes quebrados ou trincados podem comprometer não apenas a estética do seu sorriso, mas também sua saúde bucal. Na clínica da Dra. Carla Christoph em Ipanema, realizamos restaurações dentárias estéticas que devolvem a forma, função e beleza natural aos seus dentes, utilizando materiais de excelência e técnicas precisas desenvolvidas ao longo de mais de 20 anos de experiência clínica.",
    
    sections: [
      {
        id: "o-que-sao-restauracoes",
        title: "O Que São Restaurações Dentárias Estéticas?",
        content: "Restaurações dentárias estéticas, também conhecidas como obturações da cor do dente, são procedimentos utilizados para reparar dentes danificados por cáries, fraturas ou trincas. Diferentemente das antigas restaurações metálicas (amálgama), as restaurações estéticas modernas, como as de resina composta, são confeccionadas para mimetizar a cor e a translucidez natural dos seus dentes, proporcionando um resultado imperceptível e harmonioso. A <a href=\"/blog/odontologia-estetica-sorriso-natural\"><strong>odontologia estética moderna</strong></a> da Dra. Carla Christoph em Ipanema utiliza materiais de excelência e técnicas avançadas para devolver não apenas a função, mas também a beleza natural do seu sorriso.",
        type: "default" as const
      },
      {
        id: "indicacoes-restauracoes",
        title: "Quando uma Restauração Dental Estética é Indicada em Ipanema?",
        content: "O tratamento com restaurações estéticas na nossa clínica em Ipanema é recomendado para diversas situações: <br/><br/> * <strong>Tratamento de Cáries:</strong> Remoção do tecido cariado e preenchimento da cavidade com material estético. <br/><br/> * <strong>Reparo de Dentes Quebrados ou Fraturados:</strong> Reconstrução da porção perdida do dente. <br/><br/> * <strong>Tratamento de Dentes Trincados:</strong> Para selar trincas e evitar que evoluam para problemas maiores - uma condição silenciosa que pode comprometer significativamente a <a href=\"/blog/saude-bucal-dente-trincado\"><strong>integridade estrutural dos dentes</strong></a>. <br/><br/> * <strong>Substituição de Restaurações Antigas:</strong> Troca de restaurações de amálgama (escuras) ou resinas antigas e manchadas por novas restaurações estéticas. <br/><br/> * <strong>Correção de Pequenos Defeitos Estéticos:</strong> Fechamento de pequenos espaços ou correção de imperfeições na forma do dente. <br/><br/> Uma avaliação com a Dra. Carla Christoph é fundamental para um diagnóstico preciso e a indicação do melhor tratamento de restauração dental em Ipanema.",
        type: "default" as const
      },
      {
        id: "beneficios-restauracoes",
        title: "Vantagens das Restaurações Estéticas",
        content: [
          "<strong>Estética Superior:</strong> Resultado natural, com a cor e o brilho dos seus dentes originais.",
          "<strong>Preservação da Estrutura Dental:</strong> Geralmente requerem menor desgaste do dente saudável em comparação com algumas restaurações metálicas.",
          "<strong>Adesão ao Dente:</strong> As resinas compostas se unem quimicamente ao dente, proporcionando um selamento eficaz e maior resistência.",
          "<strong>Ausência de Metais:</strong> Ideal para pacientes com alergia a metais ou que preferem materiais livres de mercúrio.",
          "<strong>Versatilidade:</strong> Podem ser usadas tanto em dentes anteriores quanto posteriores, incluindo casos complexos como dentes danificados pelo bruxismo.",
          "<strong>Reparo Facilitado:</strong> Pequenos reparos podem ser feitos na própria restauração de resina, se necessário.",
          "<strong>Biocompatibilidade:</strong> Materiais de excelência que não causam reações adversas e se integram naturalmente aos tecidos bucais."
        ],
        type: "benefits" as const
      },
      {
        id: "como-e-feito-restauracoes",
        title: "Seu Tratamento de Restauração Estética em Ipanema: Passo a Passo",
        content: [
          { 
            title: "Diagnóstico e Planejamento",
            description: "Avaliação completa incluindo exame clínico detalhado, radiografias quando necessárias e análise das condições que levaram ao problema, como hábitos parafuncionais ou características individuais."
          },
          { 
            title: "Anestesia Local (se necessário)",
            description: "Para garantir que o procedimento seja totalmente indolor, utilizando técnicas modernas de aplicação."
          },
          { 
            title: "Remoção do Tecido Cariado ou Preparo do Dente",
            description: "O tecido comprometido é removido de forma conservadora e o dente é preparado para receber o material restaurador, preservando o máximo de estrutura sadia."
          },
          { 
            title: "Aplicação do Material Restaurador",
            description: "A resina composta de alta qualidade é aplicada em camadas, sendo cada camada endurecida com uma luz especial (fotopolimerizador) para garantir propriedades ótimas."
          },
          { 
            title: "Escultura e Modelagem",
            description: "A Dra. Carla Christoph esculpe a resina para devolver a forma e a anatomia natural do dente, respeitando as características individuais."
          },
          { 
            title: "Ajuste da Mordida e Polimento",
            description: "A restauração é checada para garantir o encaixe correto na mordida e, em seguida, polida para um acabamento liso e brilhante que imita o esmalte natural."
          }
        ],
        type: "steps" as const
      },
      {
        id: "casos-especiais",
        title: "Casos Especiais: Restaurações em Situações Complexas",
        content: "Algumas situações requerem abordagem especializada e técnica diferenciada. Pacientes com <a href=\"/blog/saude-bucal-bruxismo-e-estresse\"><strong>bruxismo ou hábitos parafuncionais</strong></a> necessitam de materiais específicos e planejamento cuidadoso para garantir longevidade das restaurações. Em casos de dentes severamente comprometidos, pode ser necessário combinar restaurações com outros tratamentos, como <a href=\"/tratamentos/lentes-e-facetas\"><strong>lentes de contato dental</strong></a> para harmonização completa do sorriso. Dentes com extensas restaurações antigas podem necessitar de preparo diferenciado e, em alguns casos, a indicação pode evoluir para coroas protéticas. Pacientes que buscam excelência estética podem se beneficiar da combinação de restaurações com <a href=\"/tratamentos/clareamento-dental\"><strong>clareamento dental supervisionado</strong></a> para otimização da cor de base. A experiência de mais de 20 anos da Dra. Carla Christoph permite identificar essas necessidades específicas e oferecer soluções personalizadas que garantem resultados duradouros e naturais.",
        type: "default" as const
      },
      {
        id: "cuidados-restauracoes",
        title: "Cuidados Após sua Restauração Dental Estética",
        content: "Para manter sua restauração estética bonita e funcional por muitos anos, siga estas recomendações: Mantenha uma excelente higiene bucal, incluindo escovação após as refeições e uso diário de fio dental. Evite hábitos como morder objetos duros ou roer unhas, que podem danificar a restauração. Para pacientes com tendência ao bruxismo, o uso de placa miorrelaxante noturna é fundamental para proteger tanto as restaurações quanto os dentes naturais. Visite regularmente a Dra. Carla Christoph em Ipanema para check-ups e limpezas profissionais, permitindo o diagnóstico precoce de qualquer alteração. Se sentir alguma sensibilidade persistente ou notar alguma alteração na restauração, entre em contato conosco. Com os cuidados adequados, suas restaurações podem durar muitos anos mantendo a funcionalidade e estética ideais.",
        type: "default" as const
      }
    ],
    
    faqs: [
      {
        question: "O que é uma restauração dental estética?",
        answer: "É um procedimento para reparar dentes danificados por cáries, fraturas ou trincas utilizando materiais da cor do dente, como a resina composta de alta qualidade, para um resultado natural e imperceptível. A Dra. Carla Christoph utiliza materiais de excelência e técnicas avançadas para garantir longevidade e estética superior."
      },
      {
        question: "Quando uma restauração dental é necessária?",
        answer: "É indicada para tratar cáries, reparar dentes quebrados ou trincados, substituir restaurações antigas, corrigir pequenos defeitos estéticos, selar trincas que podem evoluir para problemas maiores, e em casos onde o dente foi danificado por bruxismo ou outros hábitos parafuncionais."
      },
      {
        question: "Qual material é usado para restaurações estéticas na clínica em Ipanema?",
        answer: "Priorizamos o uso de resinas compostas de última geração e alta qualidade, que oferecem excelente estética, durabilidade superior, adesão química ao dente e biocompatibilidade. Utilizamos apenas materiais de excelência que garantem resultados naturais e duradouros."
      },
      {
        question: "Restauração dental dói?",
        answer: "O procedimento é geralmente realizado com anestesia local moderna para garantir seu conforto total. É comum não sentir dor durante o tratamento. Utilizamos técnicas avançadas de aplicação anestésica para tornar o processo o mais confortável possível."
      },
      {
        question: "Quanto tempo dura uma restauração em resina?",
        answer: "Com bons cuidados, higiene adequada e acompanhamento regular, as restaurações em resina de alta qualidade podem durar muitos anos. A durabilidade varia conforme localização, tamanho da restauração, hábitos alimentares e presença de bruxismo. A Dra. Carla poderá dar uma estimativa personalizada para seu caso."
      },
      {
        question: "É possível trocar minhas restaurações antigas (escuras) por estéticas?",
        answer: "Sim, é um procedimento muito comum e procurado para melhorar significativamente a estética do sorriso. As restaurações antigas de amálgama podem ser substituídas por restaurações estéticas modernas que se harmonizam naturalmente com seus dentes. Agende uma avaliação em nossa clínica em Ipanema."
      },
      {
        question: "Como saber se meu dente está apenas trincado ou quebrado?",
        answer: "Apenas um exame clínico detalhado e, às vezes, radiográfico realizado pelo dentista pode diagnosticar corretamente. Trincas podem ser muito sutis e difíceis de detectar, apresentando sintomas como dor ao mastigar ou sensibilidade ao frio. Se suspeitar de um dente trincado ou quebrado, procure a Dra. Carla Christoph imediatamente."
      },
      {
        question: "O que influencia o custo de uma restauração dental estética?",
        answer: "O tamanho e complexidade da restauração, o dente envolvido, o tipo de material utilizado, a necessidade de procedimentos auxiliares, e o número de superfícies dentárias afetadas são fatores que influenciam o investimento. Oferecemos um planejamento transparente e detalhado em Ipanema, sempre priorizando materiais de excelência."
      }
    ]
  };

  return (
    <TreatmentPageTemplate
      {...treatmentData}
      whatsappMessage="Olá, gostaria de agendar uma avaliação para restaurações dentárias estéticas"
      ctaHeading="Restaure a Saúde e a Beleza do seu Sorriso em Ipanema!"
    />
  );
};

export default RestaureacoesEsteticas;