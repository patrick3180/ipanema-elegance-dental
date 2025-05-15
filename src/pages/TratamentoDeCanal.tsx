
import React from "react";
import TreatmentPageTemplate from "@/components/TreatmentPageTemplate";
import { FAQ } from "@/components/treatment/types";

const TratamentoDeCanal = () => {
  // Define the FAQs
  const faqs: FAQ[] = [
    {
      question: "O que é o tratamento de canal (endodontia)?",
      answer: "É um procedimento para remover a polpa inflamada ou infectada de um dente, limpando e selando os canais internos para salvar o dente."
    },
    {
      question: "Quais são os sinais de que posso precisar de um tratamento de canal em Ipanema?",
      answer: "Dor de dente forte e persistente, sensibilidade prolongada a temperaturas, inchaço na gengiva ou escurecimento do dente podem ser sinais. Uma avaliação com a Dra. Carla Christoph é crucial."
    },
    {
      question: "Tratamento de canal dói?",
      answer: "Com as técnicas modernas de anestesia utilizadas no consultório da Dra. Carla Christoph em Ipanema, o tratamento de canal é realizado de forma confortável e sem dor. Na verdade, ele alivia a dor existente."
    },
    {
      question: "Quantas sessões são necessárias para um tratamento de canal em Ipanema?",
      answer: "Dependendo da complexidade do caso, o tratamento pode ser realizado em uma ou mais sessões. Nossa equipe em Ipanema informará a estimativa para você."
    },
    {
      question: "O que acontece se eu não fizer o tratamento de canal quando indicado?",
      answer: "A infecção pode se agravar, causar mais dor, levar à formação de abscessos e, em último caso, à perda do dente."
    },
    {
      question: "Quais os cuidados após um tratamento de canal?",
      answer: "É fundamental seguir as orientações, tomar a medicação se prescrita, evitar mastigar sobre o dente até a restauração final e manter a higiene."
    },
    {
      question: "O dente fica mais fraco após o tratamento de canal?",
      answer: "Um dente que necessitou de tratamento de canal geralmente já estava comprometido. Por isso, uma restauração adequada (muitas vezes uma coroa) é essencial para protegê-lo e garantir sua longevidade."
    },
    {
      question: "O que considerar ao avaliar o investimento em um tratamento de canal?",
      answer: "Pense no alívio da dor, na preservação do seu dente natural (evitando custos futuros com implantes ou próteses) e na eliminação de uma fonte de infecção."
    }
  ];

  return (
    <TreatmentPageTemplate
      slug="tratamento-de-canal"
      title="Tratamento de Canal em Ipanema: Alívio da Dor e Preservação do seu Dente"
      metaDescription="Precisa de tratamento de canal em Ipanema? No consultório da Dra. Carla Christoph, oferecemos endodontia para salvar seu dente e aliviar a dor com conforto."
      introduction="A dor de dente intensa pode ser um sinal da necessidade de um tratamento de canal. No consultório da Dra. Carla Christoph em Ipanema, realizamos o tratamento endodôntico com técnicas modernas e foco no seu conforto, visando eliminar a dor e salvar seu dente natural."
      sections={[
        {
          id: "o-que-e-endodontia",
          title: "Entendendo o Tratamento de Canal (Endodontia)",
          content: "O tratamento de canal, tecnicamente conhecido como endodontia, é um procedimento odontológico que consiste na remoção da polpa dental (tecido interno do dente, contendo nervos e vasos sanguíneos) quando esta se encontra inflamada, infectada ou necrosada. Após a remoção da polpa, o interior do canal radicular é limpo, desinfetado e preenchido com um material obturador para selar o dente. Este tratamento é fundamental para eliminar a dor, tratar infecções e, o mais importante, preservar um dente que, de outra forma, poderia ser perdido.",
          type: "default"
        },
        {
          id: "quando-necessario-canal",
          title: "Sinais de Alerta: Quando o Tratamento de Canal em Ipanema é Indicado?",
          content: "Alguns sintomas podem indicar a necessidade de um tratamento de canal. Fique atento se você apresentar em Ipanema: <br/><br/>* **Dor de dente espontânea, latejante e persistente**, que pode piorar com o calor ou ao mastigar. <br/>* **Sensibilidade prolongada ao frio e ao calor**, mesmo após o estímulo ter sido removido. <br/>* **Inchaço na gengiva** próximo ao dente afetado, com ou sem a presença de pus (abscesso). <br/>* **Escurecimento do dente** após um trauma ou cárie profunda. <br/>* **Dor referida** para outras regiões da face, cabeça ou ouvido. <br/><br/>Apenas um diagnóstico preciso realizado pela Dra. Carla Christoph ou um especialista em endodontia em nossa clínica em Ipanema pode confirmar a necessidade do tratamento.",
          type: "default"
        },
        {
          id: "beneficios-canal",
          title: "Principais Benefícios do Tratamento Endodôntico",
          content: [
            "**Alívio Imediato da Dor:** Elimina a fonte da dor causada pela inflamação ou infecção da polpa.",
            "**Preservação do Dente Natural:** Permite que você mantenha seu dente original, evitando extrações e a necessidade de substituições mais complexas.",
            "**Restauração da Função Mastigatória:** Com o dente tratado e restaurado, você pode voltar a mastigar normalmente.",
            "**Prevenção da Disseminação da Infecção:** Controla a infecção, impedindo que ela se espalhe para outras áreas.",
            "**Custo-Benefício:** Salvar um dente natural é, muitas vezes, mais vantajoso a longo prazo do que extraí-lo e substituí-lo."
          ],
          type: "benefits"
        },
        {
          id: "como-e-feito-canal",
          title: "Como é Realizado o Tratamento de Canal em Ipanema?",
          content: [
            { 
              title: "Diagnóstico e Radiografia", 
              description: "Exame clínico e radiográfico para confirmar a necessidade e avaliar a anatomia do dente."
            },
            { 
              title: "Anestesia Local", 
              description: "Para garantir que o procedimento seja completamente indolor."
            },
            { 
              title: "Isolamento do Dente", 
              description: "Um lençol de borracha (isolamento absoluto) é utilizado para manter a área limpa e livre de saliva."
            },
            { 
              title: "Acesso à Polpa", 
              description: "Uma pequena abertura é feita na coroa do dente para acessar os canais radiculares."
            },
            { 
              title: "Remoção da Polpa e Limpeza dos Canais", 
              description: "A polpa comprometida é removida, e os canais são limpos, modelados e desinfetados com instrumentos e soluções específicas."
            },
            { 
              title: "Obturação dos Canais", 
              description: "Os canais limpos são preenchidos e selados com um material biocompatível."
            },
            { 
              title: "Restauração Provisória ou Definitiva", 
              description: "Após o tratamento de canal, o dente precisará de uma restauração (como uma coroa) para proteger sua estrutura e devolver sua função. Uma restauração provisória pode ser colocada até a definitiva."
            }
          ],
          type: "steps"
        },
        {
          id: "cuidados-pos-canal",
          title: "Cuidados Importantes Após o Tratamento de Canal",
          content: "Após o tratamento de canal realizado em nossa clínica em Ipanema, alguns cuidados são essenciais para uma boa recuperação e sucesso a longo prazo: <br/><br/>• Siga a medicação prescrita pela Dra. Carla Christoph, se houver. <br/>• Evite mastigar com o dente tratado até que ele seja devidamente restaurado. <br/>• Mantenha uma excelente higiene bucal. <br/>• Retorne para a consulta de acompanhamento e para a realização da restauração definitiva do dente. <br/><br/>Um leve desconforto pode ser normal nos primeiros dias, mas se a dor persistir ou for intensa, entre em contato conosco.",
          type: "default"
        }
      ]}
      faqs={faqs}
      whatsappMessage="Olá, gostaria de agendar uma avaliação para tratamento de canal"
      ctaHeading="Precisa de Tratamento de Canal em Ipanema? Agende sua Avaliação!"
    />
  );
};

export default TratamentoDeCanal;
