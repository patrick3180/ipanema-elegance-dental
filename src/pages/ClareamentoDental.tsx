
import React from "react";
import TreatmentPageTemplate from "@/components/TreatmentPageTemplate";

const ClareamentoDental = () => {
  const treatmentData = {
    slug: "clareamento-dental",
    title: "Clareamento Dental Profissional em Ipanema",
    metaDescription: "Clareamento dental profissional em Ipanema com a Dra. Carla Christoph. Técnicas seguras para um sorriso mais branco e radiante.",
    introduction: "O clareamento dental profissional é um dos tratamentos estéticos mais procurados e eficazes para transformar seu sorriso. Na clínica da Dra. Carla Christoph em Ipanema, oferecemos técnicas avançadas e seguras de clareamento que respeitam a estrutura do seu dente enquanto removem manchas e devolvem o brilho natural ao seu sorriso.",
    
    sections: [
      {
        id: "o-que-e",
        title: "O Que é o Clareamento Dental Profissional?",
        content: "O clareamento dental profissional é um procedimento estético que utiliza agentes clareadores específicos para remover manchas e clarear o tom natural dos dentes. Diferente dos produtos de uso doméstico disponíveis no mercado, o tratamento profissional realizado pela Dra. Carla Christoph em Ipanema emprega produtos de alta qualidade em concentrações adequadas, garantindo resultados superiores e seguros. O processo age nos pigmentos depositados no esmalte e na dentina, quebrando as moléculas responsáveis pelas manchas sem afetar a estrutura dental.",
        type: "default"
      },
      {
        id: "tecnicas",
        title: "Técnicas de Clareamento Disponíveis",
        content: "Em nossa clínica odontológica em Ipanema, oferecemos diferentes modalidades de clareamento dental para atender às necessidades individuais de cada paciente:",
        type: "benefits",
        content: [
          "<strong>Clareamento em Consultório:</strong> Procedimento realizado em sessões de aproximadamente uma hora, com aplicação de gel clareador de alta concentração ativado por luz especial. Ideal para quem busca resultados rápidos.",
          "<strong>Clareamento Caseiro Supervisionado:</strong> Utilizamos moldeiras personalizadas e gel clareador de concentração adequada para uso doméstico, sob orientação profissional. O tratamento é realizado pelo próprio paciente, com duração de 1-2 semanas.",
          "<strong>Técnica Combinada:</strong> Associação do clareamento em consultório com o caseiro, potencializando os resultados e garantindo maior durabilidade do tratamento.",
          "<strong>Clareamento Interno:</strong> Técnica específica para dentes desvitalizados (tratados endodonticamente) que apresentam escurecimento."
        ]
      },
      {
        id: "indicacoes",
        title: "Indicações para o Clareamento Dental",
        content: "O clareamento dental profissional realizado pela Dra. Carla Christoph em nossa clínica em Ipanema é indicado para pacientes que apresentam: Amarelamento natural dos dentes devido à idade; Manchas causadas pelo consumo frequente de café, chá, vinho tinto ou cigarro; Alterações de cor decorrentes de medicamentos (em alguns casos); Escurecimento leve a moderado do esmalte dental; Desejo de melhorar a aparência do sorriso de forma conservadora e não invasiva. Uma avaliação prévia é fundamental para determinar se o clareamento é o tratamento mais adequado para o seu caso.",
        type: "default"
      },
      {
        id: "processo",
        title: "Como é Realizado o Procedimento?",
        content: "O processo de clareamento dental profissional em nossa clínica em Ipanema segue um protocolo cuidadoso:",
        type: "steps",
        content: [
          {
            title: "Avaliação Inicial:",
            description: "Consulta para exame clínico, registro da cor atual dos dentes e identificação da causa do escurecimento dental."
          },
          {
            title: "Profilaxia:",
            description: "Limpeza profissional para remover placa bacteriana e tártaro antes do procedimento."
          },
          {
            title: "Proteção dos Tecidos Moles:",
            description: "Aplicação de barreira gengival para proteger gengivas e mucosas durante o procedimento em consultório."
          },
          {
            title: "Aplicação do Agente Clareador:",
            description: "O gel clareador é aplicado sobre a superfície dental e, quando indicado, ativado por luz específica."
          },
          {
            title: "Orientações Pós-Tratamento:",
            description: "Instruções detalhadas sobre cuidados e restrições alimentares para garantir o sucesso do tratamento."
          },
          {
            title: "Sessões de Acompanhamento:",
            description: "Visitas de controle para avaliar os resultados e realizar eventuais ajustes no tratamento."
          }
        ]
      },
      {
        id: "resultados",
        title: "Resultados e Durabilidade",
        content: "Os resultados do clareamento dental variam de acordo com o caso clínico, a técnica utilizada e os hábitos do paciente. Em geral, é possível observar um clareamento significativo já nas primeiras sessões, com os dentes ficando de 2 a 8 tons mais claros. A durabilidade do tratamento pode variar de 1 a 3 anos, sendo influenciada por fatores como alimentação, tabagismo e manutenção da higiene oral. Para prolongar os efeitos do clareamento, a Dra. Carla Christoph recomenda consultas regulares de manutenção e, quando necessário, sessões de reforço.",
        type: "default"
      },
      {
        id: "cuidados",
        title: "Cuidados Durante e Após o Tratamento",
        content: "Para garantir o sucesso do clareamento dental e minimizar a sensibilidade, alguns cuidados são essenciais: Durante o período de tratamento, evite o consumo de alimentos e bebidas com corantes (café, vinho tinto, molho de tomate, açaí, etc). Mantenha uma excelente higiene bucal, com escovação e uso de fio dental após as refeições. Utilize cremes dentais dessensibilizantes, caso recomendado pela Dra. Carla Christoph. Evite o tabagismo, que além de manchar os dentes, prejudica a saúde bucal como um todo. Compareça às consultas de acompanhamento agendadas para avaliar os resultados e receber orientações personalizadas.",
        type: "default"
      }
    ],
    
    faqs: [
      {
        question: "O clareamento dental causa sensibilidade?",
        answer: "Alguns pacientes podem experimentar sensibilidade temporária durante ou após o tratamento. A Dra. Carla Christoph utiliza produtos de última geração que minimizam esse efeito e pode recomendar o uso de dessensibilizantes quando necessário."
      },
      {
        question: "Qualquer pessoa pode fazer clareamento dental?",
        answer: "Não. O tratamento não é recomendado para gestantes, lactantes, crianças e adolescentes com dentes em formação. Também requer avaliação prévia em pacientes com restaurações estéticas extensas, lesões de cárie ativas ou problemas gengivais."
      },
      {
        question: "O clareamento dental danifica o esmalte dos dentes?",
        answer: "Quando realizado por profissional qualificado como a Dra. Carla Christoph, o clareamento não causa danos à estrutura dental. Os produtos utilizados são seguros e específicos para uso odontológico."
      },
      {
        question: "Quanto tempo dura uma sessão de clareamento em consultório?",
        answer: "Geralmente, uma sessão de clareamento em consultório dura entre 45 minutos e 1 hora. O número de sessões necessárias varia de acordo com o grau de escurecimento e os resultados desejados."
      },
      {
        question: "Posso fazer clareamento se tenho restaurações ou facetas?",
        answer: "O clareamento afeta apenas dentes naturais, não alterando a cor de restaurações, facetas ou coroas. Em alguns casos, pode ser necessário substituir trabalhos estéticos anteriores após o clareamento para harmonizar a cor."
      },
      {
        question: "O clareamento dental funciona em todos os tipos de manchas?",
        answer: "Não. O clareamento é mais eficaz em manchas superficiais e amareladas. Manchas acinzentadas (causadas por tetraciclina) ou fluorose podem responder de forma limitada. A Dra. Carla Christoph poderá avaliar seu caso específico e recomendar o melhor tratamento."
      }
    ],
    
    whatsappMessage: "Olá, gostaria de agendar uma avaliação para clareamento dental"
  };

  return <TreatmentPageTemplate {...treatmentData} />;
};

export default ClareamentoDental;
