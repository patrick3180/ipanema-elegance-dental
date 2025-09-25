import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import ComparisonTable from "@/components/blog/ComparisonTable";

import { ComparisonTableItem } from "@/types/BlogPost";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Star, ArrowRight, Clock, Sparkles, Shield, Heart, Award, Zap, Calendar } from "lucide-react";

const ClareamentoDental = () => {
  // Placeholder para casos futuros
  const caseImages = null;
  
  // Dados para tabela comparativa de técnicas de clareamento
  const comparisonData: ComparisonTableItem[] = [
    {
      "Criterio": "Critério",
      "Critério": "Critério",
      "Rótulo coluna A": "Clareamento de Consultório",
      "Rótulo coluna B": "Clareamento Caseiro",
      "Rótulo coluna C": "Tratamento Combinado"
    },
    {
      "Criterio": "Tempo Total",
      "Rótulo coluna A": "1-3 sessões (60-90min)",
      "Rótulo coluna B": "14-21 dias",
      "Rótulo coluna C": "Consultório + 7-14 dias"
    },
    {
      "Criterio": "Concentração do Gel",
      "Rótulo coluna A": "35-37% peróxido de hidrogênio",
      "Rótulo coluna B": "10-20% peróxido de carbamida",
      "Rótulo coluna C": "Ambas as concentrações"
    },
    {
      "Criterio": "Velocidade do Resultado",
      "Rótulo coluna A": "Imediato (2-9 tons)",
      "Rótulo coluna B": "Gradual e progressivo",
      "Rótulo coluna C": "Rápido + manutenção"
    },
    {
      "Criterio": "Sensibilidade",
      "Rótulo coluna A": "Pode ser mais intensa",
      "Rótulo coluna B": "Geralmente mínima",
      "Rótulo coluna C": "Controlada"
    },
    {
      "Criterio": "Durabilidade",
      "Rótulo coluna A": "2-3 anos",
      "Rótulo coluna B": "2-3 anos ou mais",
      "Rótulo coluna C": "Máxima durabilidade"
    },
    {
      "Criterio": "Supervisão",
      "Rótulo coluna A": "100% em consultório",
      "Rótulo coluna B": "Orientação + controle",
      "Rótulo coluna C": "Acompanhamento total"
    },
    {
      "Criterio": "Indicação Principal",
      "Rótulo coluna A": "Resultados rápidos, eventos próximos",
      "Rótulo coluna B": "Conforto, controle do paciente",
      "Rótulo coluna C": "Máxima eficácia e durabilidade"
    }
  ];

  // FAQs otimizadas para SEO e IA
  const faqs = [
    {
      question: "Qual a diferença entre clareamento dental caseiro e de consultório?",
      answer: "O clareamento de consultório utiliza gel com concentração de 35-37% de peróxido de hidrogênio, proporcionando resultados imediatos em 1-3 sessões de 60-90 minutos. O caseiro supervisionado usa concentrações menores (10-20% de peróxido de carbamida) aplicadas gradualmente por 14-21 dias com moldeiras personalizadas. Ambos são eficazes, mas o caseiro tende a causar menos sensibilidade e oferece maior controle ao paciente. A Dra. Carla personaliza a escolha conforme suas necessidades, urgência e sensibilidade dental."
    },
    {
      question: "O clareamento dental causa sensibilidade nos dentes?",
      answer: "A sensibilidade pode ocorrer temporariamente em alguns pacientes, mas é controlável com protocolos modernos. Utilizamos dessensibilizantes preventivos, ajustamos concentrações e tempos de aplicação individualmente, e aplicamos laser terapêutico quando indicado. A maioria dos pacientes experimenta pouca ou nenhuma sensibilidade, especialmente no tratamento caseiro. Quando presente, é transitória e desaparece em 24-72 horas após o tratamento."
    },
    {
      question: "Quanto tempo dura o resultado do clareamento dental?",
      answer: "Com cuidados adequados, os resultados mantêm-se por 2-3 anos. A durabilidade varia conforme hábitos alimentares, higiene oral e estilo de vida. Pacientes que evitam substâncias pigmentadas (café, vinho, tabaco) e mantêm excelente higiene podem preservar o resultado por mais tempo. Oferecemos protocolo de manutenção personalizado com sessões de reforço anuais que prolongam significativamente a durabilidade."
    },
    {
      question: "Posso fazer clareamento tendo restaurações ou facetas?",
      answer: "Sim, mas é importante saber que apenas dentes naturais respondem ao clareamento - restaurações, facetas e coroas mantêm sua cor original. Realizamos análise detalhada para determinar a melhor estratégia: clarear primeiro os dentes naturais e, se necessário, substituir restaurações visíveis após estabilização da cor (7-14 dias). Em alguns casos, podemos focar o clareamento em áreas específicas para manter harmonia estética."
    },
    {
      question: "O clareamento dental é seguro para o esmalte?",
      answer: "Completamente seguro quando realizado por profissional qualificado. Os géis modernos têm pH balanceado e não causam desmineralização do esmalte nem enfraquecem a estrutura dental. Utilizamos produtos com agentes remineralizantes e a Dra. Carla, com mais de 20 anos de experiência, segue protocolos científicos rigorosos que garantem a integridade dos seus dentes durante todo o processo."
    },
    {
      question: "Quais cuidados são necessários após o clareamento?",
      answer: "Nas primeiras 48 horas, seguir dieta branca evitando alimentos e bebidas pigmentados (café, vinho, molho de tomate, açaí). Manter higiene oral impecável com escovação após refeições e uso de fio dental. Usar canudos para bebidas escuras quando retomar consumo normal. Não fumar. Realizar manutenções periódicas conforme orientação. Fornecemos guia completo personalizado com todos os cuidados para maximizar a durabilidade do seu resultado."
    },
    {
      question: "O clareamento funciona em todos os tipos de manchas?",
      answer: "O clareamento é altamente eficaz para manchas extrínsecas causadas por alimentação, bebidas e idade. Manchas intrínsecas como as causadas por antibióticos (tetraciclina) ou excesso de flúor podem ter resposta limitada, requerendo protocolos especiais ou tratamentos alternativos como microabrasão ou laminados cerâmicos. Durante a avaliação, identificamos o tipo de mancha e estabelecemos expectativas realistas sobre os resultados possíveis."
    },
    {
      question: "É melhor fazer clareamento antes ou depois de colocar facetas?",
      answer: "Sempre antes. O clareamento deve preceder qualquer tratamento estético restaurador para estabelecer a cor base ideal. Após o clareamento, aguardamos 7-14 dias para estabilização completa da cor antes de selecionar a tonalidade das facetas ou restaurações. Isso garante harmonia perfeita entre dentes naturais clareados e as novas peças estéticas."
    },
    {
      question: "Gestantes podem fazer clareamento dental?",
      answer: "Por precaução, recomendamos aguardar o período pós-gestacional e amamentação. Embora não existam estudos conclusivos sobre riscos, priorizamos a segurança máxima. Durante a gestação, focamos em limpezas profissionais e orientações preventivas. O clareamento pode ser realizado com segurança após o período de amamentação, com excelentes resultados."
    },
    {
      question: "Vale a pena investir no tratamento combinado?",
      answer: "Para pacientes que buscam máxima eficácia e durabilidade, o tratamento combinado é ideal. Oferece resultado imediato do consultório com a manutenção e estabilidade do caseiro. É especialmente indicado para escurecimento severo, manchas resistentes ou quando se deseja o resultado mais duradouro possível. O investimento adicional se justifica pela superior qualidade e longevidade dos resultados."
    }
  ];

  const handleWhatsAppClick = (message: string) => {
    // GCLID tracking preservado
    const gclid = new URLSearchParams(window.location.search).get('gclid');
    if (gclid) {
      localStorage.setItem('gclid', gclid);
    }
    
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
        'value': 1.0,
        'currency': 'BRL'
      });
    }
    
    window.open(`https://wa.me/5521993304045?text=${encodeURIComponent(message)}`);
  };

  return (
    <>
      <Helmet>
        <title>Clareamento Dental em Ipanema | Dra. Carla Christoph - Resultados Seguros</title>
        <meta 
          name="description" 
          content="Clareamento dental profissional em Ipanema com a Dra. Carla Christoph. Técnicas modernas de consultório e caseiro supervisionado. Resultados de 2-9 tons mais brancos. +20 anos de experiência em estética dental."
        />
        <meta 
          name="keywords" 
          content="clareamento dental ipanema, clareamento dental profissional, branqueamento dental, clareamento consultório, clareamento caseiro supervisionado, dentes brancos ipanema, clareamento dental preço, quanto custa clareamento dental, clareamento dental seguro, dra carla christoph"
        />
        <link rel="canonical" href="https://dracarlachristoph.com/clareamento-dental" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Clareamento Dental Profissional em Ipanema | Dra. Carla Christoph" />
        <meta property="og:description" content="Conquiste dentes mais brancos com segurança. Clareamento dental profissional com resultados de 2-9 tons. Técnicas modernas e +20 anos de experiência." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/clareamento-dental" />
        <meta property="og:image" content="https://dracarlachristoph.com/og-clareamento.jpg" />
        
        {/* Schema.org estruturado */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Clareamento Dental Profissional",
            "description": "Procedimento odontológico estético para clarear os dentes utilizando peróxido de hidrogênio ou carbamida sob supervisão profissional",
            "procedureType": "Cosmetic",
            "bodyLocation": "Teeth",
            "followup": "Consultas de controle e manutenção periódica",
            "howPerformed": "Aplicação de gel clareador em consultório ou com moldeiras personalizadas para uso domiciliar supervisionado",
            "preparation": "Avaliação bucal completa e limpeza profissional prévia",
            "provider": {
              "@type": "Dentist",
              "name": "Dra. Carla Christoph",
              "telephone": "+55-21-993304045",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ipanema",
                "addressRegion": "RJ",
                "addressCountry": "BR"
              }
            }
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
              serviceName="Clareamento Dental Profissional"
            />
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-dental-beige/20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-6 text-dental-purple">
                Clareamento Dental Profissional: Ilumine seu Sorriso com Segurança
              </h1>
              <p className="text-xl text-dental-gray mb-8 leading-relaxed">
                Conquiste dentes visivelmente mais brancos através de protocolos 
                científicos personalizados. Com mais de 20 anos de experiência em 
                estética dental, a Dra. Carla Christoph oferece as técnicas mais 
                modernas de clareamento, garantindo resultados naturais e duradouros 
                que respeitam a saúde dos seus dentes.
              </p>
              
              <div className="flex justify-center">
                <button 
                  onClick={() => handleWhatsAppClick("Olá! Gostaria de agendar uma avaliação para clareamento dental com a Dra. Carla.")}
                  className="bg-dental-purple hover:bg-dental-purple/90 text-white px-8 py-4 text-lg rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                  Agendar Avaliação
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer Box - ESSENCIAL PARA IA */}
        <section className="py-4 bg-white">
          <div className="container-custom">
            <QuickAnswerBox 
              answer="Clareamento dental profissional é um procedimento odontológico estético que utiliza agentes clareadores (peróxido de hidrogênio ou carbamida) em concentrações seguras e eficazes para remover manchas e clarear a cor natural dos dentes. Realizado ou supervisionado por dentista qualificado, pode clarear de 2 a 9 tons na escala Vita, com resultados que duram 2-3 anos. A Dra. Carla Christoph oferece três modalidades: consultório (resultado imediato), caseiro supervisionado (gradual e confortável) e combinado (máxima eficácia)."
            />
          </div>
        </section>

        {/* Tipos de Clareamento - Cards */}
        <section className="py-12 bg-dental-beige/20">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center text-dental-purple">
              Modalidades de Clareamento Dental Oferecidas
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Clareamento de Consultório */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-dental-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-dental-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-dental-purple">
                  Clareamento de Consultório
                </h3>
                <p className="text-dental-gray mb-4">
                  Resultado imediato com gel de alta concentração (35-37% peróxido 
                  de hidrogênio). Ideal para quem busca transformação rápida.
                </p>
                <ul className="space-y-2 text-sm text-dental-gray">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>1-3 sessões de 60-90 minutos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Clareamento de 2-9 tons</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Supervisão profissional total</span>
                  </li>
                </ul>
              </div>

              {/* Clareamento Caseiro */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-dental-gold/20 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-dental-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-dental-purple">
                  Clareamento Caseiro Supervisionado
                </h3>
                <p className="text-dental-gray mb-4">
                  Tratamento gradual com moldeiras personalizadas e gel de menor 
                  concentração. Máximo conforto e controle.
                </p>
                <ul className="space-y-2 text-sm text-dental-gray">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>14-21 dias de tratamento</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Menor sensibilidade</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <span>Flexibilidade de horários</span>
                  </li>
                </ul>
              </div>

              {/* Tratamento Combinado */}
              <div className="bg-gradient-to-br from-dental-purple/5 to-dental-gold/5 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-dental-gold">
                <div className="w-12 h-12 bg-gradient-to-br from-dental-purple/20 to-dental-gold/20 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-dental-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-dental-purple">
                  Tratamento Combinado
                  <span className="text-xs ml-2 text-dental-gold">MÁXIMA EFICÁCIA</span>
                </h3>
                <p className="text-dental-gray mb-4">
                  União do resultado imediato com manutenção prolongada. 
                  Nossa recomendação para resultados superiores.
                </p>
                <ul className="space-y-2 text-sm text-dental-gray">
                  <li className="flex items-start">
                    <Star className="w-4 h-4 text-dental-gold mr-2 mt-0.5" />
                    <span>Início rápido + manutenção</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="w-4 h-4 text-dental-gold mr-2 mt-0.5" />
                    <span>Maior durabilidade</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="w-4 h-4 text-dental-gold mr-2 mt-0.5" />
                    <span>Resultados otimizados</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Comparação: Técnicas de Clareamento */}
        <section className="py-8 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Qual a Técnica Ideal para Você?
            </h2>
            
            <div className="max-w-6xl mx-auto">
              <ComparisonTable data={comparisonData} />
              
              <p className="text-center mt-6 text-dental-gray">
                A escolha da técnica ideal depende das suas necessidades específicas, 
                urgência e sensibilidade dental. Durante a consulta, a Dra. Carla 
                realizará uma avaliação completa para recomendar a melhor opção.
              </p>
            </div>
          </div>
        </section>

        {/* Seção da Especialista - Dra. Carla */}
        <section className="py-12 bg-dental-beige/20">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center text-dental-purple">Sua Especialista em Clareamento Dental</h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="relative">
                <img
                  src="/lovable-uploads/dra-carla-christoph-dentista-ipanema-consultorio%20webp.webp"
                  alt="Dra. Carla Christoph - Especialista em Clareamento Dental"
                  className="rounded-2xl aspect-[4/5] object-cover object-top shadow-lg w-full h-auto"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/lovable-uploads/doutora-em-pe-jaleco.webp';
                  }}
                />
                <div className="absolute -bottom-6 -right-6 bg-dental-gold p-4 rounded-lg shadow-lg">
                  <p className="text-white font-bold text-lg">20+ Anos</p>
                  <p className="text-white text-sm">de Experiência</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-dental-purple mb-2">Dra. Carla Christoph</h3>
                  <p className="text-dental-gold font-medium mb-4">CRO-RJ 27.509 | Especialista em Prótese Dental</p>
                </div>
                
                <div className="space-y-3">
                  {[
                    "Mais de 20 anos de experiência em odontologia estética",
                    "Especialista em Prótese Dental e Implantodontia", 
                    "Centenas de casos de clareamento realizados com sucesso",
                    "Formação contínua em técnicas modernas de clareamento"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-dental-gold mt-1 flex-shrink-0" />
                      <span className="text-dental-gray">{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-dental-beige/30 p-6 rounded-xl">
                  <p className="text-dental-gray leading-relaxed italic">
                    "Minha filosofia é proporcionar resultados naturais que respeitam a individualidade 
                    de cada sorriso. Utilizo protocolos personalizados que minimizam a sensibilidade 
                    e maximizam a durabilidade. Cada paciente recebe atenção especial para garantir 
                    que o clareamento seja não apenas eficaz, mas também confortável e seguro."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Processo Passo a Passo */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Sua Jornada para um Sorriso Mais Branco
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {[
                  {
                    number: "1",
                    title: "Avaliação e Registro Inicial",
                    description: "Exame clínico completo, análise da saúde bucal e registro preciso da cor inicial dos dentes usando a escala Vita. Documentação fotográfica profissional para comparação posterior dos resultados alcançados."
                  },
                  {
                    number: "2",
                    title: "Planejamento Personalizado",
                    description: "Definição da técnica ideal baseada em suas expectativas, sensibilidade dental, tempo disponível e características específicas dos seus dentes. Explicação detalhada do processo e estabelecimento de metas realistas."
                  },
                  {
                    number: "3",
                    title: "Preparação e Proteção",
                    description: "Limpeza profissional prévia quando necessária. No consultório: proteção completa de gengivas e mucosas com isolamento absoluto. No caseiro: confecção de moldeiras personalizadas para aplicação segura."
                  },
                  {
                    number: "4",
                    title: "Aplicação do Tratamento",
                    description: "Aplicação supervisionada do gel clareador com monitoramento constante da resposta dos dentes. No caseiro: orientação detalhada sobre uso correto, tempo de aplicação e cuidados com as moldeiras."
                  },
                  {
                    number: "5",
                    title: "Acompanhamento e Ajustes",
                    description: "Consultas de controle para avaliar progresso, gerenciar qualquer sensibilidade e otimizar resultados. Ajustes no protocolo conforme necessário para maximizar eficácia e conforto."
                  },
                  {
                    number: "6",
                    title: "Resultado Final e Manutenção",
                    description: "Registro da cor final alcançada e comparação com inicial. Orientações personalizadas de manutenção e agenda de sessões de reforço para preservar resultados por anos."
                  }
                ].map((step, index) => (
                  <div key={index} className="flex gap-6 bg-dental-beige/30 p-6 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-dental-gold text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg text-dental-purple mb-3">{step.title}</h3>
                      <p className="text-dental-gray">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-12 bg-dental-beige/20">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center text-dental-purple">
              Benefícios do Clareamento Profissional
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: <Sparkles className="w-6 h-6" />,
                  title: "Resultados Comprovados",
                  description: "Clareamento de 2-9 tons com durabilidade de 2-3 anos"
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "Segurança Garantida",
                  description: "Supervisão profissional e produtos de qualidade certificada"
                },
                {
                  icon: <Heart className="w-6 h-6" />,
                  title: "Autoestima Elevada",
                  description: "Confiança renovada para sorrir sem restrições"
                },
                {
                  icon: <Award className="w-6 h-6" />,
                  title: "Personalização Total",
                  description: "Protocolo adaptado às suas necessidades específicas"
                }
              ].map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                  <div className="w-12 h-12 bg-dental-purple/10 rounded-full flex items-center justify-center mx-auto mb-4 text-dental-purple">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-dental-purple mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-dental-gray">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Segurança e Manejo da Sensibilidade */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center text-dental-purple">
              Segurança e Manejo da Sensibilidade
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Protocolos de Conforto */}
              <div className="bg-green-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-dental-purple flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                  Protocolos de Conforto
                </h3>
                <ul className="space-y-3 text-dental-gray">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Aplicação prévia de dessensibilizantes
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Ajuste personalizado de concentração e tempo
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Laser terapêutico para casos sensíveis
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Uso de agentes remineralizantes
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Monitoramento contínuo durante tratamento
                  </li>
                </ul>
              </div>
              
              {/* Contraindicações */}
              <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-dental-purple flex items-center">
                  <Shield className="w-6 h-6 text-blue-600 mr-2" />
                  Avaliação de Contraindicações
                </h3>
                <ul className="space-y-3 text-dental-gray">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Gestantes e lactantes (aguardar período)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Menores de 16 anos (avaliação individual)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Cáries ativas (tratar previamente)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Doença periodontal não controlada
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Hipersensibilidade dental severa
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Manutenção e Cuidados */}
        <section className="py-12 bg-dental-beige/20">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center text-dental-purple">
              Preservando seu Novo Sorriso
            </h2>
            
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
              {/* Primeiras 48 horas */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-dental-purple mb-3">
                  Primeiras 48 Horas
                </h3>
                <p className="text-sm text-dental-gray">
                  Dieta branca rigorosa. Evitar café, vinho, chá, molhos escuros, 
                  frutas vermelhas e qualquer alimento pigmentado.
                </p>
              </div>

              {/* Cuidados Contínuos */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-dental-purple mb-3">
                  Cuidados Diários
                </h3>
                <p className="text-sm text-dental-gray">
                  Higiene oral impecável, uso de canudos para bebidas escuras, 
                  não fumar e evitar excesso de alimentos ácidos.
                </p>
              </div>

              {/* Manutenção Profissional */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-dental-purple mb-3">
                  Manutenção Periódica
                </h3>
                <p className="text-sm text-dental-gray">
                  Limpezas profissionais semestrais e sessões de reforço anuais 
                  para preservar o resultado por anos.
                </p>
              </div>
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
                Todos os casos foram tratados pela Dra. Carla Christoph com 
                protocolos personalizados de clareamento.
              </p>
            </div>
          </section>
        )}

        {/* FAQs Otimizadas para IA e Voice Search */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Perguntas Frequentes sobre Clareamento Dental
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    value={`item-${index + 1}`} 
                    key={index}
                    className="bg-dental-beige/30 rounded-lg border border-dental-purple/20 px-6"
                  >
                    <AccordionTrigger className="text-left text-base font-semibold text-dental-purple hover:text-dental-gold transition-colors py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-dental-gray leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-dental-purple text-white">
          <div className="container-custom text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-dental-gold" />
              <h2 className="heading-lg">
                Conquiste um Sorriso Mais Branco e Radiante
              </h2>
            </div>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Especialista em Prótese Dental com mais de 20 anos oferecendo 
              clareamento dental seguro e eficaz em Ipanema
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => handleWhatsAppClick('Olá! Gostaria de agendar uma avaliação para clareamento dental com a Dra. Carla.')}
                className="bg-dental-gold text-dental-purple px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all inline-flex items-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                Agendar Avaliação pelo WhatsApp
              </button>
            </div>
            
            <p className="mt-6 text-sm opacity-75">
              Atendimento personalizado • Consultas com hora marcada • Ipanema, Rio de Janeiro
            </p>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default ClareamentoDental;