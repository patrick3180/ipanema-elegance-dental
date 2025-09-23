import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import ComparisonTable from "@/components/blog/ComparisonTable";
import { ComparisonTableItem } from "@/types/BlogPost";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Star, ArrowRight, Play, Sparkles, Shield, Heart, Award } from "lucide-react";

const LentesEFacetas = () => {
  // Dados para tabela de comparação
  const comparisonData: ComparisonTableItem[] = [
    {
      "Criterio": "Critério",
      "Critério": "Critério", 
      "Rótulo coluna A": "Lentes de Contato Dental",
      "Rótulo coluna B": "Facetas de Resina"
    },
    {
      "Criterio": "Espessura",
      "Rótulo coluna A": "0,2 a 0,5mm",
      "Rótulo coluna B": "0,7 a 1,5mm"
    },
    {
      "Criterio": "Desgaste Dental",
      "Rótulo coluna A": "Mínimo ou Zero",
      "Rótulo coluna B": "Moderado"
    },
    {
      "Criterio": "Material",
      "Rótulo coluna A": "Porcelana/Cerâmica",
      "Rótulo coluna B": "Resina Composta"
    },
    {
      "Criterio": "Durabilidade",
      "Rótulo coluna A": "15-20 anos",
      "Rótulo coluna B": "5-8 anos"
    },
    {
      "Criterio": "Resistência a Manchas",
      "Rótulo coluna A": "Total",
      "Rótulo coluna B": "Moderada"
    },
    {
      "Criterio": "Tempo de Tratamento",
      "Rótulo coluna A": "2-3 consultas",
      "Rótulo coluna B": "1-2 consultas"
    },
    {
      "Criterio": "Investimento",
      "Rótulo coluna A": "R$ 2.500-3.500/dente",
      "Rótulo coluna B": "R$ 800-1.200/dente"
    },
    {
      "Criterio": "Indicação Principal",
      "Rótulo coluna A": "Transformação completa e duradoura",
      "Rótulo coluna B": "Correções estéticas acessíveis"
    }
  ];

  // FAQs otimizadas para IA
  const faqs = [
    {
      question: "Qual a diferença entre lente de contato dental e faceta de resina?",
      answer: "Lentes de contato dental são lâminas ultrafinas de porcelana (0,2-0,5mm) que preservam a estrutura dental, criando sorrisos naturais sem aspecto artificial. Facetas de resina são restaurações estéticas diretas que corrigem forma e cor. A Dra. Carla Christoph, especialista em Prótese Dental, oferece o exclusivo 'Test Drive do Sorriso' - você experimenta seu novo sorriso na própria boca antes de aprovar o tratamento definitivo."
    },
    {
      question: "As lentes de contato dental realmente não desgastam os dentes?",
      answer: "Na maioria dos casos, o desgaste é mínimo (0,1-0,3mm) ou inexistente. O preparo, quando necessário, é limitado ao esmalte superficial, preservando até 95% da estrutura dental original. Isso contrasta com tratamentos mais antigos que exigiam desgastes significativos. A Dra. Carla utiliza técnicas minimamente invasivas para máxima preservação dental."
    },
    {
      question: "Quanto custa colocar lentes de contato dental em Ipanema?",
      answer: "O investimento varia conforme o número de dentes e complexidade do caso. Lentes de contato dental custam entre R$ 2.500 a 3.500 por dente. Facetas de resina são mais acessíveis, entre R$ 800 a 1.200 por dente. A Dra. Carla oferece planos de pagamento flexíveis. O valor reflete não apenas o procedimento, mas toda a experiência, tecnologia e acompanhamento de uma especialista com 20+ anos de experiência."
    },
    {
      question: "Quanto tempo dura o tratamento completo?",
      answer: "Para lentes de contato dental: 2-3 consultas em 15-20 dias. Primeira consulta para planejamento e moldagem, segunda para aprovação do mock-up, terceira para cimentação. Facetas de resina podem ser feitas em 1-2 consultas, pois são confeccionadas diretamente no consultório. A Dra. Carla trabalha com agenda espaçada para garantir tempo adequado em cada sessão."
    },
    {
      question: "Lentes de contato dental doem para colocar?",
      answer: "O procedimento é indolor. Quando necessário algum preparo mínimo, é feito com anestesia local. A cimentação das lentes é um processo delicado que não causa dor. Pode haver sensibilidade leve nos primeiros dias, facilmente controlada com analgésicos simples se necessário."
    },
    {
      question: "O que é o 'Test Drive do Sorriso' (mock-up)?",
      answer: "É o grande diferencial da Dra. Carla! Ela cria seu novo sorriso com resina provisória não adesiva diretamente na sua boca, sem desgastar os dentes. Em 30 minutos você está vendo o resultado real - pode se olhar no espelho, tirar fotos, vídeos, falar, sorrir. É uma experiência emocionante e transformadora! Ajustamos juntos até ficar perfeito. Só depois de você aprovar 100% é que partimos para o tratamento definitivo."
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
    
    window.open(`https://wa.me/5521999999999?text=${encodeURIComponent(message)}`);
  };

  return (
    <>
      <Helmet>
        <title>Lentes de Contato Dental e Facetas de Resina em Ipanema | Dra. Carla</title>
        <meta 
          name="description" 
          content="Lentes de contato dental ultrafinas (0,2mm) e facetas de resina em Ipanema com Dra. Carla Christoph. 20+ anos de experiência. Test Drive do Sorriso exclusivo." 
        />
        <meta name="keywords" content="lentes de contato dental, facetas de resina, ipanema, dra carla christoph, test drive sorriso, porcelana, especialista protese" />
        <link rel="canonical" href="https://dracarlachristoph.com.br/lentes-de-contato-dental-e-facetas-de-resina" />
        
        {/* Schema.org estruturado */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "Lentes de Contato Dental e Facetas de Resina em Ipanema",
          "description": "Lentes de contato dental ultrafinas e facetas de resina com Dra. Carla Christoph, especialista em Prótese. 20+ anos de experiência em Ipanema.",
          "url": "https://dracarlachristoph.com.br/lentes-de-contato-dental-e-facetas-de-resina",
          "medicalSpecialty": "Cosmetic Dentistry",
          "author": {
            "@type": "Dentist",
            "name": "Dra. Carla Christoph",
            "qualification": "Especialista em Prótese Dental",
            "experienceYears": 20,
            "areaServed": {
              "@type": "City",
              "name": "Ipanema, Rio de Janeiro"
            }
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "BRL",
            "lowPrice": "800",
            "highPrice": "3500",
            "offerCount": "2"
          }
        })}
        </script>
      </Helmet>
      
      <PageLayout>
        <ServiceBreadcrumb 
          serviceName="Lentes de Contato Dental e Facetas de Resina"
        />
        
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-6 text-dental-purple">
                Lentes de Contato Dental e Facetas de Resina em Ipanema
              </h1>
              <p className="text-xl text-dental-gray mb-8 leading-relaxed">
                Transforme seu sorriso com lâminas ultrafinas de 0,2mm. Especialista em Prótese com 20+ anos de experiência. Resultado natural e duradouro.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button 
                  onClick={() => handleWhatsAppClick("Olá! Gostaria de agendar uma avaliação para lentes de contato dental com a Dra. Carla.")}
                  className="btn btn-primary px-8 py-4 text-lg inline-flex items-center gap-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  Agende sua Avaliação Estética
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer Box - ESSENCIAL PARA IA */}
        <section className="py-12 bg-dental-beige/30">
          <div className="container-custom">
            <QuickAnswerBox 
              answer="Lentes de contato dental são lâminas ultrafinas de porcelana (0,2-0,5mm) que preservam a estrutura dental, criando sorrisos naturais sem aspecto artificial. Facetas de resina são restaurações estéticas diretas que corrigem forma e cor. A Dra. Carla Christoph, especialista em Prótese Dental, oferece o exclusivo 'Test Drive do Sorriso' - você experimenta seu novo sorriso na própria boca antes de aprovar o tratamento definitivo."
            />
          </div>
        </section>

        {/* Seção da Especialista - Dra. Carla */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center text-dental-purple">Sua Especialista em Estética Dental</h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Placeholder para foto */}
              <div className="relative">
                <div className="bg-gradient-to-br from-dental-gold/20 to-dental-purple/10 rounded-2xl aspect-[4/5] flex items-center justify-center">
                  <div className="text-center text-dental-gray">
                    <span className="text-6xl mb-4 block">👩‍⚕️</span>
                    <p>Foto da Dra. Carla Christoph</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-dental-purple mb-2">Dra. Carla Christoph</h3>
                  <p className="text-dental-gold font-medium mb-4">CRO-RJ: XXXXX | Especialista em Prótese Dental</p>
                </div>
                
                <div className="space-y-3">
                  {[
                    "Mais de 20 anos de experiência em odontologia estética",
                    "Especialista em Prótese Dental e Implantodontia", 
                    "Centenas de casos de lentes e facetas realizados",
                    "Formação contínua em estética dental avançada"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-dental-gold mt-1 flex-shrink-0" />
                      <span className="text-dental-gray">{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-dental-beige/30 p-6 rounded-xl">
                  <p className="text-dental-gray leading-relaxed italic">
                    "Minha filosofia é criar sorrisos naturais que parecem ter nascido assim. O grande diferencial 
                    do meu trabalho é o 'Test Drive do Sorriso' - uso resina provisória não adesiva para criar 
                    seu novo sorriso diretamente na sua boca. Você se vê no espelho, tira fotos, fala, sorri... 
                    é uma experiência transformadora ver o resultado real antes de começar. Nenhuma simulação 
                    computacional se compara a experimentar o novo sorriso de verdade."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparação: Lentes vs Facetas de Resina */}
        <section className="py-12 bg-dental-beige/20">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Lentes de Contato Dental ou Facetas de Resina: Qual Escolher?
            </h2>
            
            <div className="max-w-5xl mx-auto">
              <ComparisonTable data={comparisonData} />
              
              <p className="text-center mt-6 text-dental-gray">
                A escolha ideal depende do seu caso específico. A Dra. Carla fará uma avaliação 
                completa para recomendar a melhor opção para você.
              </p>
            </div>
          </div>
        </section>

        {/* "Test Drive do Sorriso": Experimente Antes de Decidir */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              O Diferencial Exclusivo: Veja Seu Novo Sorriso Antes de Começar
            </h2>
            
            <div className="bg-gradient-to-r from-dental-gold/10 to-dental-purple/10 p-8 rounded-2xl max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-dental-gold" />
                    <h3 className="text-2xl font-semibold text-dental-purple">
                      Mock-up: Seu Novo Sorriso em Minutos
                    </h3>
                  </div>
                  
                  <p className="text-dental-gray font-medium">
                    Imagine poder "experimentar" seu novo sorriso antes de fazer qualquer procedimento definitivo. 
                    Com a técnica exclusiva da Dra. Carla, isso é possível!
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      {
                        icon: "✨",
                        title: "Resina Provisória Não Adesiva",
                        description: "Aplicada diretamente sobre seus dentes, sem desgaste algum"
                      },
                      {
                        icon: "👀",
                        title: "Veja-se no Espelho", 
                        description: "Observe de todos os ângulos, em luz natural e artificial"
                      },
                      {
                        icon: "📸",
                        title: "Tire Fotos e Vídeos",
                        description: "Registre, fale, sorria - veja como fica em movimento"
                      },
                      {
                        icon: "🎨",
                        title: "Ajustes em Tempo Real",
                        description: "Modificamos juntos até ficar perfeito para você"
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <strong className="block text-dental-purple">{item.title}</strong>
                          <span className="text-dental-gray text-sm">{item.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h4 className="font-bold text-lg mb-4 text-center text-dental-purple">
                    A Experiência do Test Drive
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-dental-gold pl-4">
                      <p className="text-sm text-dental-gray italic">
                        "É impressionante! Você senta na cadeira e em 30 minutos está vendo 
                        exatamente como vai ficar seu novo sorriso. Não é uma simulação no 
                        computador - é REAL, na sua boca!"
                      </p>
                      <p className="text-xs text-dental-gray/70 mt-1">- Relato comum dos pacientes</p>
                    </div>
                    
                    <div className="bg-dental-beige/40 p-4 rounded-lg">
                      <h5 className="font-semibold text-sm mb-2">Por que é revolucionário?</h5>
                      <ul className="text-sm space-y-1 text-dental-gray">
                        <li>• <strong>Decisão segura:</strong> Você aprova antes de começar</li>
                        <li>• <strong>Sem surpresas:</strong> O resultado final será igual ao mock-up</li>
                        <li>• <strong>Personalização total:</strong> Ajustamos até ficar perfeito</li>
                        <li>• <strong>Experiência real:</strong> Melhor que qualquer simulação digital</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-lg text-dental-gray font-medium">
                  "Nenhuma tecnologia digital substitui a emoção de ver seu novo sorriso 
                  pela primeira vez. É um momento transformador que compartilho com cada paciente."
                </p>
                <p className="text-sm text-dental-gray/70 mt-2">- Dra. Carla Christoph</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tecnologia Digital Complementar: Scanner iTero */}
        <section className="py-12 bg-dental-beige/20">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Tecnologia Digital Complementar
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-dental-gold/20 p-3 rounded-full">
                    <span className="text-3xl">🖥️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-dental-purple">Scanner iTero Element 5D</h3>
                </div>
                
                <p className="text-dental-gray mb-6">
                  Além do mock-up físico, utilizamos o scanner iTero Element 5D como ferramenta 
                  complementar para precisão técnica no planejamento:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {[
                      "Escaneamento digital sem moldagens com massa",
                      "Modelo 3D preciso para o laboratório"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" />
                        <span className="text-dental-gray text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {[
                      "Comunicação digital com técnicos",
                      "Arquivo digital do seu tratamento"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" />
                        <span className="text-dental-gray text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-dental-gray/70 mt-6 text-center italic">
                  O iTero é uma excelente ferramenta técnica, mas nada substitui a experiência 
                  do mock-up real na sua boca.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Estética e Saúde: Nossa Abordagem Integrada */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Além da Estética: Saúde Como Prioridade
            </h2>
            
            <div className="max-w-6xl mx-auto">
              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg mb-8">
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="w-6 h-6 text-red-500 mt-1" />
                  <h3 className="font-semibold text-lg text-red-900">
                    Problemas Comuns em Tratamentos Mal Executados
                  </h3>
                </div>
                <p className="text-dental-gray mb-4">
                  A Dra. Carla frequentemente recebe pacientes com problemas decorrentes de 
                  tratamentos realizados sem os devidos cuidados:
                </p>
                <ul className="space-y-2 text-dental-gray">
                  {[
                    "Facetas sem adaptação adequada: Dificultam a higienização, causando inflamação gengival e mau hálito",
                    "Preparo excessivo ou inadequado: Enfraquece o dente e pode causar sensibilidade permanente",
                    "Sobrecontorno: Acúmulo de placa bacteriana e desenvolvimento de gengivite",
                    "Aspecto artificial: 'Dentes de chiclete' que denunciam o procedimento",
                    "Oclusão inadequada: Dores na ATM e desgaste prematuro"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-start gap-3 mb-4">
                    <Heart className="w-6 h-6 text-green-600 mt-1" />
                    <h3 className="font-semibold text-lg text-green-900">
                      Nossa Abordagem: Saúde em Primeiro Lugar
                    </h3>
                  </div>
                  <ul className="space-y-3 text-dental-gray">
                    {[
                      "Avaliação periodontal completa antes de qualquer procedimento estético",
                      "Mock-up físico obrigatório para você aprovar o resultado antes de começar",
                      "Perfil de emergência natural que facilita a higienização diária",
                      "Ajuste oclusal minucioso para prevenir fraturas e problemas na ATM",
                      "Acompanhamento periódico para manutenção da saúde bucal"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 text-sm mt-1">▸</span>
                        <span className="text-sm"><strong>{item.split(' ')[0]} {item.split(' ')[1]}</strong> {item.split(' ').slice(2).join(' ')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-start gap-3 mb-4">
                    <Star className="w-6 h-6 text-blue-600 mt-1" />
                    <h3 className="font-semibold text-lg text-blue-900">
                      Busca Pela Naturalidade Absoluta
                    </h3>
                  </div>
                  <ul className="space-y-3 text-dental-gray">
                    {[
                      "Análise facial detalhada para harmonia com suas características",
                      "Estratificação de cor que imita a translucidez natural do esmalte", 
                      "Textura superficial que reflete a luz como dentes naturais",
                      "Proporções individualizadas respeitando sua idade e personalidade",
                      "Evitamos o 'efeito Hollywood' artificial e padronizado"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 text-sm mt-1">▸</span>
                        <span className="text-sm"><strong>{item.split(' ')[0]} {item.split(' ')[1]}</strong> {item.split(' ').slice(2).join(' ')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 bg-dental-beige/30 p-6 rounded-lg text-center">
                <p className="text-lg text-dental-gray italic">
                  "Um sorriso verdadeiramente bonito é aquele que ninguém percebe que foi tratado. 
                  Nosso objetivo é que as pessoas admirem seu sorriso, não questionem o que você fez."
                </p>
                <p className="text-sm text-dental-gray/70 mt-2">- Dra. Carla Christoph</p>
              </div>
            </div>
          </div>
        </section>

        {/* Indicações e Casos Tratados */}
        <section className="py-12 bg-dental-beige/20">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Quando as Lentes e Facetas São Indicadas?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: "🦷",
                  title: "Dentes Manchados",
                  description: "Manchas resistentes ao clareamento, por tetraciclina ou fluorose"
                },
                {
                  icon: "🔄",
                  title: "Espaços entre Dentes",
                  description: "Diastemas que comprometem a harmonia do sorriso"
                },
                {
                  icon: "📐",
                  title: "Formato Irregular",
                  description: "Dentes pequenos, desgastados ou com forma inadequada"
                },
                {
                  icon: "🎨",
                  title: "Cor Inadequada",
                  description: "Dentes escurecidos ou com tonalidade desigual"
                },
                {
                  icon: "💔",
                  title: "Fraturas e Lascas",
                  description: "Pequenos defeitos que afetam a estética"
                },
                {
                  icon: "😊",
                  title: "Renovação do Sorriso",
                  description: "Desejo de um sorriso mais harmônico e jovem"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4 text-center">{item.icon}</div>
                  <h3 className="font-semibold mb-3 text-dental-purple text-center">{item.title}</h3>
                  <p className="text-dental-gray text-sm text-center">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Processo de Tratamento Digital */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Seu Tratamento com Tecnologia Digital
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {[
                  {
                    number: "1",
                    title: "Análise Digital do Sorriso",
                    description: "Fotografias profissionais e análise facial computadorizada. Estudo das proporções ideais para seu rosto. Planejamento digital do novo sorriso.",
                    duration: "60 min",
                    icon: "📸"
                  },
                  {
                    number: "2", 
                    title: "Mock-up: Test Drive do Seu Novo Sorriso",
                    description: "O GRANDE DIFERENCIAL! Criação do seu novo sorriso com resina provisória não adesiva diretamente na sua boca. Você se vê no espelho, tira fotos, fala, sorri. Ajustamos juntos até ficar perfeito. É emocionante ver o resultado real!",
                    duration: "90 min",
                    icon: "✨"
                  },
                  {
                    number: "3",
                    title: "Preparo Minimamente Invasivo", 
                    description: "Com o mock-up aprovado, fazemos o preparo conservador. Para lentes: desgaste mínimo ou zero. Para facetas: preparo preciso. Utilizamos o scanner iTero para moldagem digital sem massa.",
                    duration: "120 min",
                    icon: "🔬"
                  },
                  {
                    number: "4",
                    title: "Confecção Artesanal",
                    description: "Lentes: laboratório especializado em cerâmica. Facetas de resina: esculpidas diretamente pela Dra. Carla. Personalização total de cor e forma.",
                    duration: "7-10 dias (lentes)",
                    icon: "🎨"
                  },
                  {
                    number: "5",
                    title: "Cimentação e Finalização",
                    description: "Prova final e ajustes necessários. Cimentação adesiva de alta precisão. Polimento e acabamento impecável.",
                    duration: "90-120 min", 
                    icon: "✅"
                  }
                ].map((step, index) => (
                  <div key={index} className="flex gap-6 bg-dental-beige/30 p-6 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-dental-gold text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{step.icon}</span>
                        <h3 className="font-semibold text-lg text-dental-purple">{step.title}</h3>
                      </div>
                      <p className="text-dental-gray mb-3">{step.description}</p>
                      <span className="text-sm text-dental-gold font-medium">⏱ {step.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cuidados e Durabilidade */}
        <section className="py-12 bg-dental-beige/20">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Cuidados para Manter seu Novo Sorriso
            </h2>
            
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-4 text-dental-purple flex items-center gap-2">
                  <span className="text-2xl">🪥</span>
                  Higiene Diária
                </h3>
                <ul className="space-y-2 text-dental-gray">
                  {[
                    "Escovação com cerdas macias 3x ao dia",
                    "Uso obrigatório de fio dental",
                    "Enxaguante bucal sem álcool", 
                    "Pasta dental não abrasiva",
                    "Escova interdental para áreas específicas"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-dental-gold mt-1">•</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-4 text-dental-purple flex items-center gap-2">
                  <span className="text-2xl">🛡️</span>
                  Proteção e Prevenção
                </h3>
                <ul className="space-y-2 text-dental-gray">
                  {[
                    "Evitar morder objetos duros",
                    "Não usar dentes como ferramentas",
                    "Placa de bruxismo se necessário",
                    "Evitar alimentos muito pigmentados (resina)",
                    "Protetor bucal para esportes"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-dental-gold mt-1">•</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-4 text-dental-purple flex items-center gap-2">
                  <span className="text-2xl">📅</span>
                  Manutenção Profissional
                </h3>
                <ul className="space-y-2 text-dental-gray">
                  {[
                    "Check-up a cada 6 meses",
                    "Profilaxia profissional regular",
                    "Polimento das restaurações",
                    "Avaliação da integridade",
                    "Ajustes quando necessário"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-dental-gold mt-1">•</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-4 text-dental-purple flex items-center gap-2">
                  <span className="text-2xl">⏰</span>
                  Durabilidade Esperada
                </h3>
                <div className="space-y-4 text-dental-gray">
                  <div>
                    <strong className="text-dental-purple">Lentes de Contato:</strong>
                    <p className="text-sm">15-20 anos com cuidados adequados</p>
                  </div>
                  <div>
                    <strong className="text-dental-purple">Facetas de Resina:</strong>
                    <p className="text-sm">5-8 anos, com possibilidade de reparos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Casos Antes e Depois (Placeholders) */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Transformações Reais de Nossos Pacientes
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="relative group">
                  <div className="bg-gradient-to-br from-dental-gold/10 to-dental-purple/10 rounded-lg aspect-video flex items-center justify-center hover:shadow-lg transition-shadow">
                    <div className="text-center text-dental-gray">
                      <Play className="w-12 h-12 mx-auto mb-2 opacity-70" />
                      <span className="text-sm">Caso {num} - Antes e Depois</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-center mt-6 text-dental-gray">
              Deslize sobre as imagens para ver o antes e depois. 
              Todos os casos foram tratados pela Dra. Carla Christoph.
            </p>
          </div>
        </section>

        {/* FAQs Otimizadas para IA e Voice Search */}
        <section className="py-12 bg-dental-beige/20">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Perguntas Frequentes sobre Lentes e Facetas
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    value={`item-${index + 1}`} 
                    key={index}
                    className="bg-white rounded-lg border border-dental-purple/20 px-6"
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
              <Award className="w-8 h-8 text-dental-gold" />
              <h2 className="heading-lg">
                Transforme Seu Sorriso com a Dra. Carla Christoph
              </h2>
            </div>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Especialista em Prótese Dental com mais de 20 anos criando sorrisos 
              naturais e duradouros em Ipanema
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => handleWhatsAppClick('Olá! Gostaria de agendar uma avaliação para lentes de contato dental com a Dra. Carla.')}
                className="bg-dental-gold text-dental-purple px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all inline-flex items-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                Agendar Avaliação pelo WhatsApp
              </button>
            </div>
            
            <p className="mt-6 text-sm opacity-75">
              Atendimento sem pressa • Consultas com hora marcada • Ipanema, Rio de Janeiro
            </p>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default LentesEFacetas;