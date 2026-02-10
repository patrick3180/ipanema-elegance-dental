import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import ComparisonTable from "@/components/blog/ComparisonTable";
import OptimizedImage from "@/components/OptimizedImage";
import { ComparisonTableItem } from "@/types/BlogPost";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Star, ArrowRight, Clock, Sparkles, Shield, Heart, Award, Zap, Calendar } from "lucide-react";

const Ortodontia = () => {
  // Placeholder para casos futuros
  const caseImages = null;
  
  // Dados para tabela comparativa
  const comparisonData: ComparisonTableItem[] = [
    {
      "Criterio": "Critério",
      "Critério": "Critério",
      "Rótulo coluna A": "Invisalign®",
      "Rótulo coluna B": "Aparelho Estético",
      "Rótulo coluna C": "Aparelho Tradicional"
    },
    {
      "Criterio": "Visibilidade",
      "Rótulo coluna A": "Praticamente invisível",
      "Rótulo coluna B": "Discreto (brackets transparentes)",
      "Rótulo coluna C": "Visível (brackets metálicos)"
    },
    {
      "Criterio": "Removível",
      "Rótulo coluna A": "Sim - para comer e higiene",
      "Rótulo coluna B": "Não - fixo nos dentes",
      "Rótulo coluna C": "Não - fixo nos dentes"
    },
    {
      "Criterio": "Conforto",
      "Rótulo coluna A": "Máximo - sem fios ou brackets",
      "Rótulo coluna B": "Moderado - brackets suaves",
      "Rótulo coluna C": "Básico - pode causar aftas"
    },
    {
      "Criterio": "Higienização",
      "Rótulo coluna A": "Fácil - remove para escovar",
      "Rótulo coluna B": "Requer cuidado extra",
      "Rótulo coluna C": "Requer cuidado extra"
    },
    {
      "Criterio": "Tempo de Tratamento",
      "Rótulo coluna A": "6-18 meses (casos simples)",
      "Rótulo coluna B": "12-24 meses",
      "Rótulo coluna C": "12-24 meses"
    },
    {
      "Criterio": "Consultas",
      "Rótulo coluna A": "A cada 6-8 semanas",
      "Rótulo coluna B": "Mensal",
      "Rótulo coluna C": "Mensal"
    },
    {
      "Criterio": "Indicação Principal",
      "Rótulo coluna A": "Adultos, casos estéticos",
      "Rótulo coluna B": "Jovens e adultos",
      "Rótulo coluna C": "Todos os casos"
    }
  ];

  // FAQs expandidas (12+ perguntas)
  const faqs = [
    {
      question: "Como funciona o tratamento ortodôntico no consultório da Dra. Carla?",
      answer: "O consultório da Dra. Carla Christoph oferece tratamento ortodôntico especializado através do Dr. Bruno Moreira das Neves, ortodontista com doutorado pela UERJ. A Dra. Carla acompanha toda a jornada do paciente, garantindo atendimento integrado e personalizado. O Dr. Bruno é responsável pelo planejamento e execução técnica do tratamento ortodôntico, trabalhando em conjunto com a Dra. Carla para garantir os melhores resultados."
    },
    {
      question: "Quanto tempo dura o tratamento com Invisalign®?",
      answer: "O tratamento com Invisalign® geralmente dura entre 6 a 18 meses para casos simples a moderados, podendo estender-se até 24 meses em casos complexos. Com o scanner iTero Element 5D, conseguimos simular digitalmente o resultado e estimar com precisão o tempo necessário. Cada caso é único e o Dr. Bruno fará uma avaliação detalhada para determinar o prazo exato do seu tratamento."
    },
    {
      question: "Qual a idade ideal para começar o tratamento ortodôntico?",
      answer: "A primeira avaliação ortodôntica é recomendada aos 7 anos para identificar problemas precocemente. Para aparelho fixo, a idade ideal é entre 11-14 anos, quando a maioria dos dentes permanentes já nasceu. Adultos de qualquer idade podem fazer ortodontia - temos pacientes acima de 60 anos. O importante é ter gengivas e ossos saudáveis."
    },
    {
      question: "O tratamento ortodôntico dói?",
      answer: "É normal sentir pressão leve nos primeiros 2-3 dias após colocar um novo alinhador Invisalign® ou após ajustes do aparelho fixo. Essa sensação indica que os dentes estão se movendo conforme planejado. O desconforto é temporário e facilmente controlado com analgésicos simples se necessário. A maioria dos pacientes se adapta rapidamente."
    },
    {
      question: "Posso comer de tudo com aparelho ortodôntico?",
      answer: "Com Invisalign®, você remove os alinhadores para comer, podendo desfrutar de qualquer alimento sem restrições. Com aparelho fixo (estético ou tradicional), deve-se evitar alimentos duros (pipoca, amendoim), pegajosos (balas, chicletes) e cortar alimentos em pedaços menores. Fornecemos lista completa de cuidados alimentares."
    },
    {
      question: "Como funciona o scanner iTero Element 5D?",
      answer: "O scanner iTero elimina a necessidade das desconfortáveis moldagens com massa. Em poucos minutos, criamos um modelo 3D ultra-preciso dos seus dentes. Você visualiza imediatamente uma simulação do resultado esperado. Durante o tratamento, usamos o scanner para acompanhar o progresso com precisão milimétrica, garantindo que tudo está evoluindo conforme planejado."
    },
    {
      question: "Qual a diferença entre aparelho estético e tradicional?",
      answer: "O aparelho estético usa brackets de safira ou porcelana transparentes, sendo muito mais discreto que o tradicional metálico. Ambos têm a mesma eficácia, mas o estético oferece melhor aparência durante o tratamento. O tradicional é mais resistente e tem custo menor. A escolha depende das suas prioridades estéticas e orçamento."
    },
    {
      question: "O que é contenção e por que é importante?",
      answer: "A contenção é fundamental para manter os resultados após o tratamento. Oferecemos contenção fixa (fio colado atrás dos dentes) e/ou removível (placa transparente ou aparelho móvel). Para pacientes Invisalign®, oferecemos as contenções Vivera®, 30% mais resistentes. O uso correto da contenção garante que seus dentes permaneçam alinhados permanentemente."
    },
    {
      question: "O Invisalign® funciona para casos complexos?",
      answer: "Sim! O Invisalign® evoluiu muito e hoje trata desde casos simples até complexos, incluindo mordidas cruzadas, sobremordidas, apinhamento severo e espaçamentos. Com a experiência do Dr. Bruno e a tecnologia do iTero, conseguimos resolver a maioria dos casos. Na avaliação, determinamos se é a melhor opção para você."
    },
    {
      question: "Como é o acompanhamento durante o tratamento?",
      answer: "Realizamos consultas regulares (mensais para aparelho fixo, a cada 6-8 semanas para Invisalign®) para monitorar progresso e fazer ajustes necessários. A Dra. Carla e o Dr. Bruno trabalham em conjunto, garantindo atendimento sem pressa e atenção aos detalhes. Oferecemos suporte via WhatsApp para dúvidas urgentes."
    },
    {
      question: "Qual o investimento para o tratamento ortodôntico?",
      answer: "O investimento varia conforme o tipo de aparelho e complexidade do caso. Cada tratamento tem características únicas que influenciam o valor, como duração, tecnologia utilizada e acompanhamento necessário. Oferecemos planos de pagamento facilitados e condições especiais. Fazemos orçamento personalizado durante a consulta de avaliação."
    },
    {
      question: "Posso trocar de aparelho fixo para Invisalign® durante o tratamento?",
      answer: "Sim, é possível fazer a transição, especialmente se você não está satisfeito com o aparelho fixo. O Dr. Bruno avaliará seu caso, fará novo planejamento digital e determinará o melhor momento para a mudança. Muitos pacientes fazem essa transição buscando mais conforto e estética."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Ortodontia e Invisalign® em Ipanema | Dra. Carla Christoph</title>
        <meta 
          name="description" 
          content="Ortodontia moderna em Ipanema com Dr. Bruno Moreira (Doutor UERJ) no consultório da Dra. Carla Christoph. Invisalign®, aparelho estético e scanner iTero. Tratamento personalizado com tecnologia avançada."
        />
        <meta 
          name="keywords" 
          content="ortodontia ipanema, invisalign ipanema, aparelho transparente, aparelho estético, ortodontista ipanema, dr bruno moreira, dra carla christoph, scanner itero, aparelho invisível, alinhador dental"
        />
        <link rel="canonical" href="https://dracarlachristoph.com/ortodontia" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Ortodontia e Invisalign® em Ipanema | Dra. Carla Christoph" />
        <meta property="og:description" content="Transforme seu sorriso com ortodontia moderna. Dr. Bruno Moreira, especialista com doutorado UERJ, oferece Invisalign® e tecnologia iTero no consultório da Dra. Carla." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/ortodontia" />
        <meta property="og:image" content="https://dracarlachristoph.com/og-ortodontia.jpg" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Tratamento Ortodôntico",
            "description": "Correção do posicionamento dos dentes e maxilares usando aparelhos ortodônticos ou alinhadores invisíveis",
            "procedureType": "Orthodontic",
            "bodyLocation": "Teeth and Jaw",
            "followup": "Consultas mensais e contenção pós-tratamento",
            "howPerformed": "Aparelhos fixos, estéticos ou alinhadores removíveis Invisalign com planejamento digital",
            "preparation": "Avaliação clínica, radiografias e escaneamento digital iTero",
            "provider": [
              {
                "@type": "Dentist",
                "name": "Dra. Carla Christoph",
                "identifier": "CRO-RJ 27.509",
                "description": "Responsável pelo consultório e acompanhamento integral"
              },
              {
                "@type": "Dentist", 
                "name": "Dr. Bruno Moreira das Neves",
                "identifier": "CRO-RJ 41.684",
                "description": "Ortodontista especialista, Doutor pela UERJ",
                "knowsAbout": ["Ortodontia", "Invisalign", "Scanner iTero"]
              }
            ],
            "potentialComplication": "Sensibilidade temporária, pequenas aftas (aparelho fixo)",
            "typicalAgeRange": "7-99"
          })}
        </script>
        
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>

      <PageLayout>
        <section className="pt-20">
          <div className="container-custom">
            <ServiceBreadcrumb 
              serviceName="Ortodontia"
            />
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-dental-beige/20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-6 text-dental-purple">
                Ortodontia Moderna: Alinhe seu Sorriso com Tecnologia e Expertise
              </h1>
              <p className="text-xl text-dental-gray mb-8 leading-relaxed">
                No consultório da Dra. Carla Christoph, oferecemos tratamento 
                ortodôntico especializado com o Dr. Bruno Moreira das Neves, 
                ortodontista com doutorado pela UERJ. Utilizamos tecnologia 
                avançada como scanner iTero Element 5D e Invisalign® para 
                transformar seu sorriso com conforto e precisão.
              </p>
              
              <div className="flex justify-center">
                <a
                  href="https://wa.me/5521993304045?text=Olá!%20Gostaria%20de%20agendar%20uma%20avaliação%20ortodôntica%20com%20o%20Dr.%20Bruno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-dental-gold hover:bg-dental-gold/90 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Agendar Avaliação Ortodôntica
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer Box */}
        <section className="py-8 bg-white">
          <div className="container-custom">
            <QuickAnswerBox
              answer="Ortodontia é a especialidade que corrige a posição dos dentes e maxilares usando aparelhos fixos ou alinhadores invisíveis como Invisalign®. No consultório da Dra. Carla Christoph, o tratamento é realizado pelo Dr. Bruno Moreira das Neves, ortodontista especialista com doutorado pela UERJ. A Dra. Carla acompanha toda a jornada do paciente, garantindo atendimento integrado. Utilizamos scanner iTero Element 5D para planejamento digital preciso e oferecemos Invisalign®, aparelho estético e tradicional, com tratamentos durando de 6 a 24 meses conforme o caso."
            />
          </div>
        </section>

        {/* Introdução Profissional */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-dental-gray leading-relaxed">
                Um sorriso alinhado vai além da estética - melhora a mastigação, 
                facilita a higiene, previne problemas articulares e eleva a 
                autoestima. Nossa abordagem une a expertise acadêmica do Dr. Bruno, 
                com formação sólida e experiência clínica, ao cuidado individual 
                que é marca registrada do consultório da Dra. Carla. Cada caso é 
                planejado digitalmente, garantindo previsibilidade e precisão nos 
                resultados.
              </p>
            </div>
          </div>
        </section>

        {/* Tipos de Aparelho - Cards */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center text-dental-purple">
              Opções de Tratamento Ortodôntico
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Invisalign */}
              <div className="bg-gradient-to-br from-dental-purple/5 to-transparent p-6 rounded-lg border-2 border-dental-gold">
                <div className="w-12 h-12 bg-dental-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-dental-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-dental-purple">
                  Invisalign®
                  <span className="text-xs ml-2 text-dental-gold">PREMIUM</span>
                </h3>
                <p className="text-dental-gray mb-4">
                  Alinhadores transparentes removíveis, praticamente invisíveis. 
                  Máximo conforto e estética durante o tratamento.
                </p>
                <ul className="space-y-2 text-sm text-dental-gray">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Praticamente invisível</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Remove para comer</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Higiene facilitada</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Sem restrições alimentares</span>
                  </li>
                </ul>
              </div>

              {/* Aparelho Estético */}
              <div className="bg-gradient-to-br from-dental-gold/10 to-transparent p-6 rounded-lg">
                <div className="w-12 h-12 bg-dental-gold/20 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-dental-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-dental-purple">
                  Aparelho Estético
                </h3>
                <p className="text-dental-gray mb-4">
                  Brackets de safira ou porcelana transparentes. 
                  Discreto e eficiente para todos os casos.
                </p>
                <ul className="space-y-2 text-sm text-dental-gray">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Discreto e elegante</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Não mancha</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Ótimo custo-benefício</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Resistente e eficaz</span>
                  </li>
                </ul>
              </div>

              {/* Aparelho Tradicional */}
              <div className="bg-gradient-to-br from-gray-100 to-transparent p-6 rounded-lg">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-dental-purple">
                  Aparelho Tradicional
                </h3>
                <p className="text-dental-gray mb-4">
                  Brackets metálicos convencionais. Solução eficaz e 
                  acessível para todos os tipos de correção.
                </p>
                <ul className="space-y-2 text-sm text-dental-gray">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Mais acessível</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Muito resistente</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Eficácia comprovada</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Todos os casos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tabela Comparativa */}
        <section className="py-8 bg-gray-50">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Comparação Detalhada das Opções
            </h2>
            
            <div className="max-w-6xl mx-auto">
              <ComparisonTable data={comparisonData} />
              
              <p className="text-center mt-6 text-dental-gray">
                A escolha do aparelho ideal depende do seu caso, estilo de vida 
                e prioridades. O Dr. Bruno fará uma avaliação completa para 
                recomendar a melhor opção para você.
              </p>
            </div>
          </div>
        </section>

        {/* Tecnologia iTero */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center text-dental-purple">
              Tecnologia iTero Element 5D: Precisão Digital
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-dental-purple">
                  Adeus às Moldagens com Massa!
                </h3>
                <p className="text-dental-gray mb-6">
                  Com o scanner iTero Element 5D, criamos um modelo 3D ultra-preciso 
                  dos seus dentes em minutos, sem desconforto. A tecnologia permite:
                </p>
                <ul className="space-y-3 text-dental-gray">
                  <li className="flex items-start">
                    <Zap className="w-5 h-5 text-dental-gold mr-2 mt-1" />
                    <span>Visualização imediata do resultado esperado</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-5 h-5 text-dental-gold mr-2 mt-1" />
                    <span>Planejamento digital preciso do tratamento</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-5 h-5 text-dental-gold mr-2 mt-1" />
                    <span>Acompanhamento milimétrico do progresso</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-5 h-5 text-dental-gold mr-2 mt-1" />
                    <span>Detecção precoce de cáries (tecnologia NIRI)</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-dental-purple/10 to-dental-gold/10 p-8 rounded-lg">
                <div className="text-center">
                  <div className="w-24 h-24 bg-dental-purple/20 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    <img src="/lovable-uploads/Itero_tela.webp" alt="Scanner iTero Element 5D" className="w-16 h-16 object-contain" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-dental-purple">
                    Simulação em Tempo Real
                  </h4>
                  <p className="text-sm text-dental-gray">
                    Veja como ficará seu sorriso antes mesmo de começar o 
                    tratamento. A tecnologia iTero permite ajustes no 
                    planejamento até alcançar o resultado ideal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Processo de Tratamento */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center text-dental-purple">
              Sua Jornada para um Sorriso Perfeito
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  number: "1",
                  title: "Consulta de Avaliação",
                  description: "Exame clínico com Dr. Bruno, análise da mordida e scan digital iTero. Discussão dos objetivos e visualização do resultado esperado."
                },
                {
                  number: "2",
                  title: "Planejamento Digital",
                  description: "Criação do plano de tratamento personalizado com simulação 3D. Apresentação detalhada pela Dra. Carla e Dr. Bruno."
                },
                {
                  number: "3",
                  title: "Início do Tratamento",
                  description: "Entrega dos alinhadores Invisalign® ou instalação do aparelho escolhido. Orientações completas sobre uso e cuidados."
                },
                {
                  number: "4",
                  title: "Acompanhamento Regular",
                  description: "Consultas mensais (fixo) ou a cada 6-8 semanas (Invisalign®). Monitoramento do progresso e ajustes necessários."
                },
                {
                  number: "5",
                  title: "Refinamentos",
                  description: "Ajustes finais para perfeição do resultado. Com Invisalign®, novos alinhadores se necessário."
                },
                {
                  number: "6",
                  title: "Contenção",
                  description: "Instalação da contenção fixa ou entrega da removível. Garantia de manutenção dos resultados alcançados."
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-dental-gold/20 rounded-full flex items-center justify-center">
                      <span className="text-dental-purple font-bold">{step.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-dental-purple mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-dental-gray">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção dos Especialistas */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center text-dental-purple">
              Seus Especialistas em Ortodontia
            </h2>
            
            <div className="max-w-6xl mx-auto">
              {/* Dr. Bruno */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                <div className="relative">
                  <OptimizedImage
                    src="/lovable-uploads/DrBruno_site.webp"
                    alt="Dr. Bruno Moreira das Neves - Ortodontista Especialista em Ipanema"
                    className="rounded-lg shadow-lg aspect-[3/4] object-cover object-top"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-dental-purple p-4 rounded-lg shadow-lg">
                    <p className="text-white font-bold text-lg">Doutor UERJ</p>
                    <p className="text-white text-sm">Ortodontia</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-dental-purple">
                    Dr. Bruno Moreira das Neves
                  </h3>
                  <p className="text-dental-gray mb-4">
                    CRO-RJ 41.684 | Ortodontista Especialista
                  </p>
                  
                  <div className="space-y-4 text-dental-gray">
                    <p>
                      Com sólida formação acadêmica e vasta experiência clínica, 
                      o Dr. Bruno é responsável pelo planejamento e execução de 
                      todos os tratamentos ortodônticos do consultório.
                    </p>
                    
                    <div className="pt-4">
                      <p className="font-semibold mb-2">Formação:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• Graduação em Odontologia - UFF</li>
                        <li>• Mestrado em Clínica Odontológica - UFF</li>
                        <li>• Especialista em Ortodontia - UERJ</li>
                        <li>• Doutor em Ortodontia - UERJ</li>
                        <li>• Professor de Ortodontia - IOPUC-Rio</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dra. Carla */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold mb-4 text-dental-purple">
                    Dra. Carla Christoph
                  </h3>
                  <p className="text-dental-gray mb-4">
                    CRO-RJ 27.509 | Responsável pelo Consultório
                  </p>
                  
                  <div className="space-y-4 text-dental-gray">
                    <p>
                      Com mais de duas décadas em Ipanema, a Dra. Carla construiu sua reputação tratando cada paciente de forma individual, com tempo e atenção. Sua formação inclui 8 anos como dentista militar na Odontoclínica Central da Marinha, experiência que trouxe disciplina e precisão para sua prática clínica.
                    </p>
                    
                    <p>
                      Em parceria com o Dr. Bruno, Doutor em Ortodontia pela UERJ, acompanha cada paciente do início à contenção final. A integração entre ortodontia e os demais tratamentos do consultório garante uma visão completa do caso.
                    </p>
                    
                    <div className="pt-4">
                      <p className="font-semibold mb-2">Diferenciais:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• 20+ anos de experiência em odontologia</li>
                        <li>• Especialista em Prótese Dental</li>
                        <li>• Atendimento sem pressa</li>
                        <li>• Acompanhamento integral do paciente</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="relative order-1 md:order-2">
                  <img
                    src="/lovable-uploads/doutora-em-pe-jaleco.webp"
                    alt="Dra. Carla Christoph - Responsável pelo Consultório em Ipanema"
                    className="rounded-lg shadow-lg w-full h-96 object-cover object-top"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-dental-gold p-4 rounded-lg shadow-lg">
                    <p className="text-white font-bold text-lg">20+ Anos</p>
                    <p className="text-white text-sm">de Experiência</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center text-dental-purple">
              Perguntas Frequentes sobre Ortodontia
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-dental-gray">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Casos Antes e Depois (Condicional) */}
        {caseImages && caseImages.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container-custom">
              <h2 className="heading-lg mb-8 text-center text-dental-purple">
                Transformações Reais de Nossos Pacientes
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Placeholder para futuros casos */}
              </div>
              
              <p className="text-center mt-6 text-dental-gray">
                Todos os casos foram tratados pelo Dr. Bruno Moreira 
                no consultório da Dra. Carla Christoph.
              </p>
            </div>
          </section>
        )}

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-br from-dental-purple/5 to-dental-gold/5">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-lg mb-6 text-dental-purple">
                Pronto para Conquistar o Sorriso dos Seus Sonhos?
              </h2>
              <p className="text-lg text-dental-gray mb-8">
                Agende sua avaliação com o Dr. Bruno e descubra como a 
                ortodontia moderna pode alinhar seu sorriso. Scanner iTero 3D, 
                Invisalign e consultas sem pressa te aguardam.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/5521993304045?text=Olá!%20Gostaria%20de%20agendar%20uma%20avaliação%20ortodôntica%20com%20o%20Dr.%20Bruno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-dental-gold hover:bg-dental-gold/90 text-white font-semibold rounded-lg transition-colors"
                >
                  Agendar pelo WhatsApp
                </a>
                
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default Ortodontia;