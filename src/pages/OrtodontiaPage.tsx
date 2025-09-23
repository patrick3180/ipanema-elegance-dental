import React from "react";
import TreatmentPageTemplate from "@/components/TreatmentPageTemplate";
import OptimizedImage from "@/components/OptimizedImage";
import { FAQ, TreatmentSection } from "@/components/treatment/types";

const OrtodontiaPage = () => {
  const sections: TreatmentSection[] = [
    {
      id: "quick-answer",
      title: "Resposta Rápida",
      type: "default",
      content: (
        <div className="bg-gradient-to-r from-dental-purple/10 to-dental-gold/10 border border-dental-gold/30 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 text-dental-gold mt-1 flex items-center justify-center">📋</div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-dental-purple mb-2">Resposta Rápida</h2>
              <p className="text-dental-gray leading-relaxed">
                <strong>Ortodontia</strong> é a especialidade que corrige a posição dos dentes e maxilares usando aparelhos ortodônticos ou alinhadores invisíveis como Invisalign®. 
                Em nossa clínica, o Dr. Bruno Moreira, ortodontista com doutorado pela UERJ, utiliza o scanner iTero Element 5D para criar seu plano de tratamento digital personalizado.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "especialista",
      title: "Seu Ortodontista em Ipanema",
      type: "default",
      content: (
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <OptimizedImage
              src="/lovable-uploads/DrBruno_site.webp"
              alt="Dr. Bruno Moreira das Neves - Ortodontista especialista em Invisalign e doutor pela UERJ"
              width={400}
              height={500}
              priority={true}
              className="rounded-lg shadow-lg w-full aspect-[4/5] object-cover"
            />
            
            {/* Structured Data for Doctor */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Person",
                  "name": "Dr. Bruno Moreira das Neves",
                  "jobTitle": "Ortodontista",
                  "description": "Ortodontista especialista em Invisalign com doutorado pela UERJ",
                  "image": "/lovable-uploads/DrBruno_site.webp",
                  "worksFor": {
                    "@type": "DentalClinic",
                    "name": "Consultório da Dra. Carla Christoph",
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "Ipanema",
                      "addressRegion": "RJ"
                    }
                  },
                  "hasCredential": [
                    "Graduação em Odontologia - UFF",
                    "Mestrado em Clínica Odontológica - UFF", 
                    "Especialista e Doutor em Ortodontia - UERJ",
                    "Professor de Ortodontia - IOPUC-Rio"
                  ],
                  "knowsAbout": ["Invisalign", "Ortodontia", "Alinhadores Invisíveis", "Scanner iTero Element 5D"]
                })
              }}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Dr. Bruno Moreira das Neves</h3>
            <p className="text-gray-600">CRO-RJ: 41684</p>
            
            <div className="space-y-2 text-gray-700">
              <p>✓ Graduação em Odontologia - UFF</p>
              <p>✓ Mestrado em Clínica Odontológica - UFF</p>
              <p>✓ Especialista e Doutor em Ortodontia - UERJ</p>
              <p>✓ Professor de Ortodontia - IOPUC-Rio</p>
            </div>
            
            <p className="text-gray-700 mt-4">
              Com sólida formação acadêmica e experiência clínica, o Dr. Bruno trabalha em conjunto com a Dra. Carla Christoph 
              para oferecer tratamentos ortodônticos modernos e personalizados, sempre priorizando o conforto e os resultados naturais.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "invisalign-scanner",
      title: "Invisalign® com Tecnologia iTero Element 5D",
      type: "default",
      content: (
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Alinhadores Invisíveis Invisalign®</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-dental-gold mr-2">✓</span>
                <span>Praticamente invisíveis - ninguém percebe que você está usando</span>
              </li>
              <li className="flex items-start">
                <span className="text-dental-gold mr-2">✓</span>
                <span>Removíveis para comer e higienizar</span>
              </li>
              <li className="flex items-start">
                <span className="text-dental-gold mr-2">✓</span>
                <span>Confortáveis - sem fios ou bráquetes</span>
              </li>
              <li className="flex items-start">
                <span className="text-dental-gold mr-2">✓</span>
                <span>Resultado previsível com planejamento 3D</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Scanner iTero Element 5D</h3>
            <p className="text-gray-700 mb-4">
              Nossa clínica conta com o scanner intraoral mais avançado do mercado:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-dental-gold mr-2">▸</span>
                <span>Scan digital em minutos - sem massas ou moldagens desconfortáveis</span>
              </li>
              <li className="flex items-start">
                <span className="text-dental-gold mr-2">▸</span>
                <span>Visualização imediata do resultado esperado</span>
              </li>
              <li className="flex items-start">
                <span className="text-dental-gold mr-2">▸</span>
                <span>Acompanhamento preciso da evolução do tratamento</span>
              </li>
              <li className="flex items-start">
                <span className="text-dental-gold mr-2">▸</span>
                <span>Planejamento completo e personalizado</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "tipos-tratamento",
      title: "Opções de Tratamento Ortodôntico",
      type: "default",
      content: (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border-2 border-dental-gold rounded-lg p-6 relative">
            <div className="absolute -top-3 left-4 bg-white px-2">
              <span className="text-dental-gold font-semibold">MAIS ESCOLHIDO</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Invisalign®</h3>
            <p className="text-gray-700 mb-4">
              Alinhadores transparentes removíveis, ideais para quem busca discrição e conforto no tratamento.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Invisível no dia a dia</li>
              <li>• Remove para comer</li>
              <li>• Resultado em 6-18 meses</li>
              <li>• Planejamento digital 3D</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Aparelho Estético</h3>
            <p className="text-gray-700 mb-4">
              Bráquetes de safira ou porcelana que se camuflam com a cor dos dentes.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Discreto e elegante</li>
              <li>• Não mancha</li>
              <li>• Eficiente</li>
              <li>• Ótimo custo-benefício</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Aparelho Tradicional</h3>
            <p className="text-gray-700 mb-4">
              Opção clássica e eficiente para todos os tipos de correção ortodôntica.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Mais acessível</li>
              <li>• Muito resistente</li>
              <li>• Resultado eficaz</li>
              <li>• Manutenção mensal</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "processo",
      title: "Como Funciona seu Tratamento",
      type: "steps",
      content: [
        {
          title: "Consulta de Avaliação",
          description: "Exame clínico com o Dr. Bruno, análise da sua mordida e discussão dos seus objetivos. Scan digital com iTero para visualização imediata. ⏱ 60 min"
        },
        {
          title: "Planejamento Digital",
          description: "Criação do seu plano de tratamento personalizado com visualização 3D do resultado esperado. Apresentação detalhada pela Dra. Carla e Dr. Bruno. ⏱ 30 min"
        },
        {
          title: "Início do Tratamento",
          description: "Entrega dos primeiros alinhadores Invisalign ou instalação do aparelho escolhido. Orientações completas de uso e cuidados. ⏱ 45 min"
        },
        {
          title: "Acompanhamento",
          description: "Consultas regulares para monitorar progresso. Trocas de alinhadores ou ajustes do aparelho. Sempre com tempo adequado, sem pressa. ⏱ 30 min/mês"
        },
        {
          title: "Finalização e Contenção",
          description: "Remoção do aparelho ou último alinhador. Instalação da contenção para manter os resultados. Acompanhamento pós-tratamento. ⏱ 60 min"
        }
      ]
    },
    {
      id: "contencao",
      title: "Contenção: Mantendo seu Novo Sorriso",
      type: "default",
      content: (
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 mb-6">
            Após finalizar o tratamento com Invisalign® ou aparelho tradicional, a fase de contenção é fundamental 
            para manter os resultados alcançados. Oferecemos diferentes opções de contenção:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Contenção Fixa</h3>
              <p className="text-gray-700 text-sm">
                Fio discreto colado na parte interna dos dentes. Permanente e imperceptível, 
                ideal para manter o alinhamento dos dentes anteriores.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Contenção Removível Vivera®</h3>
              <p className="text-gray-700 text-sm">
                Para pacientes Invisalign®, oferecemos as contenções Vivera®, 
                30% mais resistentes que outros materiais, para uso noturno.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "Quanto tempo dura o tratamento com Invisalign?",
      answer: "O tratamento com Invisalign geralmente dura entre 6 a 18 meses, dependendo da complexidade do caso. Casos simples de alinhamento podem ser resolvidos em 6 meses, enquanto correções mais complexas podem levar até 24 meses. O Dr. Bruno fará uma avaliação precisa com o scanner iTero para determinar o tempo exato do seu tratamento."
    },
    {
      question: "Invisalign é realmente invisível?",
      answer: "Os alinhadores Invisalign são feitos de um material transparente especial que os torna praticamente imperceptíveis quando usados. A maioria das pessoas não percebe que você está em tratamento ortodôntico. Alguns casos podem necessitar de attachments (pequenos pontos da cor do dente) que são discretos e removidos ao final do tratamento."
    },
    {
      question: "Qual a idade ideal para começar o tratamento ortodôntico?",
      answer: "A primeira avaliação ortodôntica é recomendada aos 7 anos para identificar problemas precocemente. Para tratamento com aparelho fixo, a idade ideal é entre 11-14 anos. Adultos de qualquer idade podem fazer ortodontia - temos pacientes de 60+ anos. O importante é ter gengivas e ossos saudáveis."
    },
    {
      question: "Posso comer de tudo com Invisalign?",
      answer: "Sim! Uma das grandes vantagens do Invisalign é que você remove os alinhadores para comer, podendo desfrutar de qualquer alimento sem restrições. Após as refeições, basta escovar os dentes e recolocar os alinhadores. Com aparelho fixo há restrições para alimentos duros e pegajosos."
    },
    {
      question: "O tratamento ortodôntico dói?",
      answer: "É normal sentir uma pressão leve nos primeiros dias após colocar um novo alinhador ou após ajustes do aparelho fixo. Essa sensação indica que os dentes estão se movendo e geralmente passa em 2-3 dias. O desconforto é facilmente controlado com analgésicos simples se necessário."
    },
    {
      question: "Como funciona o scanner iTero Element 5D?",
      answer: "O scanner iTero elimina a necessidade de moldagens com massa. Em poucos minutos, criamos um modelo 3D preciso dos seus dentes. Você pode ver imediatamente uma simulação do resultado esperado. Durante o tratamento, usamos o scanner para acompanhar o progresso com precisão milimétrica."
    },
    {
      question: "Qual a diferença entre o Dr. Bruno fazer o tratamento na clínica da Dra. Carla?",
      answer: "Você tem o melhor dos dois mundos: a expertise especializada do Dr. Bruno em ortodontia, com doutorado pela UERJ, trabalhando em conjunto com a Dra. Carla que acompanha toda sua jornada de tratamento. Isso garante uma visão integrada da sua saúde bucal, com consultas sem pressa e atendimento verdadeiramente personalizado."
    }
  ];

  const treatmentData = {
    slug: "ortodontia",
    title: "Ortodontia e Invisalign® em Ipanema | Dra. Carla Christoph",
    metaDescription: "Transforme seu sorriso com ortodontia moderna. Invisalign® certificado, scanner iTero Element 5D e acompanhamento personalizado com Dr. Bruno Moreira, ortodontista com doutorado UERJ.",
    introduction: "Transforme seu sorriso com ortodontia moderna. **Invisalign® certificado**, **scanner iTero Element 5D** e **acompanhamento personalizado** com **Dr. Bruno Moreira**, ortodontista com doutorado pela UERJ trabalhando em conjunto com a **Dra. Carla Christoph**.",
    sections,
    faqs,
    whatsappMessage: "Olá! Gostaria de agendar uma avaliação ortodôntica com o Dr. Bruno.",
    ctaHeading: "Comece sua Jornada para um Sorriso Alinhado"
  };

  return <TreatmentPageTemplate {...treatmentData} />;
};

export default OrtodontiaPage;