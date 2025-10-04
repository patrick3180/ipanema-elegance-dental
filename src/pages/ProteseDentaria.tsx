import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import SectionDivider from "@/components/treatment/SectionDivider";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import ComparisonTable from "@/components/blog/ComparisonTable";
import { ComparisonTableItem } from "@/types/BlogPost";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Cpu, Scan, Star, ArrowRight, Sparkles, Shield, Heart, Award, AlertCircle, Calendar, CheckCircle } from "lucide-react";
import ProcessTimeline from '@/components/treatment/ProcessTimeline';
import { Card, CardContent } from "@/components/ui/card";

const ProteseDentaria = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleWhatsAppClick = (message?: string) => {
    const phone = "5521993304045";
    const defaultMessage = "Olá! Gostaria de agendar uma consulta de avaliação para prótese dentária com a Dra. Carla Christoph.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message || defaultMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Dados das FAQs
  const faqs = [
    {
      question: "Qual tipo de prótese é melhor para meu caso?",
      answer: "Cada caso é único e requer avaliação individualizada. A escolha depende de fatores como quantidade de dentes perdidos, condição óssea, saúde gengival, expectativas estéticas e estilo de vida. Durante a consulta de planejamento, analisamos todos esses aspectos para indicar a solução ideal para você."
    },
    {
      question: "Quanto tempo dura uma prótese bem feita?",
      answer: "Com materiais de qualidade e cuidados adequados, uma coroa ou ponte pode durar de 15 a 20 anos. Próteses sobre implante tendem a durar ainda mais, podendo ultrapassar 20 anos. A longevidade depende da higiene oral, visitas regulares ao dentista e cuidados diários."
    },
    {
      question: "Prótese sobre implante vale o investimento?",
      answer: "Para muitos pacientes, sim. A prótese sobre implante oferece vantagens únicas: preservação óssea total, não desgasta dentes vizinhos, maior durabilidade e sensação natural. Considerando a longevidade e qualidade de vida proporcionada, representa excelente custo-benefício a longo prazo."
    },
    {
      question: "Como é a manutenção das próteses?",
      answer: "Próteses fixas (coroas, pontes, sobre implante) são higienizadas como dentes naturais, com escovação e fio dental. Próteses removíveis devem ser retiradas para limpeza com produtos específicos. Visitas semestrais ao dentista são essenciais para manutenção profissional e ajustes quando necessário."
    },
    {
      question: "Vou ficar sem dentes durante o tratamento?",
      answer: "Nunca! Sempre providenciamos uma prótese provisória para que você mantenha estética e função durante todo o tratamento. Nosso compromisso é com seu conforto e vida social. Você não passará nenhum momento sem dentes."
    },
    {
      question: "Prótese pode parecer natural?",
      answer: "Absolutamente! Utilizamos técnicas como estratificação de cerâmica, caracterização individualizada e ajuste de cor personalizado. O resultado são dentes que imitam perfeitamente a natureza, com translucidez, textura e aparência indistinguíveis dos dentes naturais."
    },
    {
      question: "Qual a diferença entre porcelana e resina?",
      answer: "A porcelana (cerâmica) oferece superior estética, durabilidade e resistência a manchas. É nossa escolha para casos definitivos. A resina pode ser usada em provisórios ou situações específicas. Utilizamos apenas materiais premium importados para garantir o melhor resultado."
    },
    {
      question: "É possível fazer prótese com pouco osso?",
      answer: "Sim! Para próteses convencionais (não sobre implante), a quantidade óssea não é limitante. Para próteses sobre implante, técnicas como enxerto ósseo ou implantes zigomáticos podem viabilizar o tratamento mesmo com pouco osso. Uma avaliação tomográfica determina as possibilidades."
    },
    {
      question: "Quando trocar uma prótese antiga?",
      answer: "Sinais de que é hora de trocar: desgaste visível, mudança de cor, infiltrações, desadaptação, desconforto ao mastigar ou problemas gengivais ao redor da prótese. Uma avaliação profissional pode determinar o momento ideal para substituição."
    },
    {
      question: "O procedimento é doloroso?",
      answer: "Os procedimentos são realizados com anestesia local eficaz e técnicas que priorizam o conforto. A maioria dos pacientes relata menos desconforto do que esperavam. Providenciamos medicação adequada e acompanhamento próximo quando necessário."
    },
    {
      question: "Qual a vantagem de um especialista?",
      answer: "O especialista tem formação específica de 2-3 anos em prótese, domina técnicas avançadas, trabalha com os melhores laboratórios e tem experiência em casos complexos. Isso se traduz em próteses com melhor adaptação, estética superior e maior durabilidade."
    },
    {
      question: "Prótese fixa ou removível: como escolher?",
      answer: "A prótese fixa oferece maior conforto, segurança e sensação natural, mas requer condições específicas (dentes pilares saudáveis ou possibilidade de implantes). A removível é uma opção quando não há suporte para fixa. Avaliamos todos os fatores para indicar a melhor solução."
    }
  ];

  // Dados da tabela comparativa
  const comparisonData: ComparisonTableItem[] = [
    {
      "Criterio": "",
      "Rótulo coluna A": "Coroa/Ponte", 
      "Rótulo coluna B": "Removível",
      "Sobre Implante": "Sobre Implante"
    },
    {
      "Criterio": "Indicação",
      "Rótulo coluna A": "1-3 dentes",
      "Rótulo coluna B": "Múltiplos/todos",
      "Sobre Implante": "Qualquer quantidade"
    },
    {
      "Criterio": "Fixação", 
      "Rótulo coluna A": "Dente preparado",
      "Rótulo coluna B": "Grampos/mucosa",
      "Sobre Implante": "Implante ósseo"
    },
    {
      "Criterio": "Durabilidade",
      "Rótulo coluna A": "10-15 anos", 
      "Rótulo coluna B": "5-7 anos",
      "Sobre Implante": "20+ anos"
    },
    {
      "Criterio": "Preserva osso",
      "Rótulo coluna A": "Parcial",
      "Rótulo coluna B": "Não", 
      "Sobre Implante": "Total"
    },
    {
      "Criterio": "Sensação",
      "Rótulo coluna A": "Natural",
      "Rótulo coluna B": "Adaptação",
      "Sobre Implante": "Como dente próprio"
    },
    {
      "Criterio": "Manutenção", 
      "Rótulo coluna A": "Como dente",
      "Rótulo coluna B": "Remove p/ limpar",
      "Sobre Implante": "Como dente"
    },
    {
      "Criterio": "Investimento",
      "Rótulo coluna A": "Moderado",
      "Rótulo coluna B": "Inicial menor", 
      "Sobre Implante": "Maior (melhor custo-benefício)"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Prótese Dentária em Ipanema: Recupere Função e Estética do Sorriso</title>
        <meta name="description" content="Prótese dentária em Ipanema com especialista. Coroas, pontes e próteses sobre implante. Reabilitação oral completa com 20+ anos de experiência." />
        <link rel="canonical" href="https://www.dracarlachristoph.com/protese-dentaria" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Prótese Dentária em Ipanema | Reabilitação Oral" />
        <meta property="og:description" content="Recupere função e estética do sorriso com prótese dentária de alta qualidade em Ipanema." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dracarlachristoph.com/protese-dentaria" />
        <meta property="og:image" content="https://www.dracarlachristoph.com/dra-carla-protese.jpg" />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Prótese Dentária",
            "description": "Reabilitação oral com próteses dentárias fixas e removíveis",
            "procedureType": "Dental",
            "provider": {
              "@type": "Dentist",
              "name": "Dra. Carla Christoph",
              "telephone": "+55-21-99330-4045",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ipanema",
                "addressRegion": "RJ",
                "addressCountry": "BR"
              }
            }
          })}
        </script>
      </Helmet>

      <PageLayout>
        {/* Hero Section */}
        <TreatmentHero
          title="Prótese Dentária e Reabilitação Oral"
          subtitle="Especialidade da Dra. Carla Christoph"
          description="Reconstrução completa do sorriso com planejamento personalizado e materiais de excelência. Especialista com mais de 20 anos de experiência em casos de alta complexidade."
          badges={["20+ anos de experiência", "CRO-RJ 27.509", "Casos Complexos"]}
          doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
          breadcrumbs={[
            { label: "Início", href: "/" },
            { label: "Tratamentos", href: "/servicos" },
            { label: "Prótese Dentária" }
          ]}
        />

        {/* Section Divider */}
        <SectionDivider variant="with-icon" icon={<Award size={20} />} />

        {/* Quick Answer Box */}
        <section className="py-8 bg-white">
          <div className="container-custom">
            <QuickAnswerBox
              answer="Prótese dentária é a especialidade odontológica que restaura e substitui dentes ausentes ou danificados através de coroas, pontes, próteses removíveis ou sobre implantes. O tratamento devolve função mastigatória, estética natural e qualidade de vida, com planejamento individualizado e materiais de alta qualidade."
            />
          </div>
        </section>

        {/* Introdução Empática */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg leading-relaxed text-dental-gray mb-6">
                Sabemos como a perda dentária impacta profundamente sua vida. Não é apenas sobre 
                estética - é sobre o constrangimento em reuniões sociais, a dificuldade para 
                saborear seus pratos favoritos, as mudanças na fala que afetam sua comunicação. 
                Compreendemos essas dificuldades e, mais importante, temos as soluções para 
                transformar essa realidade.
              </p>
              <p className="text-lg leading-relaxed text-dental-gray">
                Com mais de 20 anos dedicados à reabilitação oral, desenvolvemos em nossa clínica 
                em Ipanema um protocolo que une tecnologia de ponta - como scanner intraoral iTero 
                e planejamento digital - com um cuidado verdadeiramente personalizado. Cada prótese 
                é planejada considerando não apenas a função, mas a harmonia com seu rosto e seu 
                estilo de vida.
              </p>
            </div>
          </div>
        </section>

        {/* Cards de Modalidades */}
        <section className="py-12 bg-dental-beige/20">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Modalidades de Prótese Dentária Disponíveis
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Coroas Dentárias */}
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="text-dental-gold mb-4">
                    <Sparkles size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-dental-purple">
                    Coroas Dentárias
                  </h3>
                  <p className="text-dental-gray mb-4">
                    Capas protetoras em cerâmica pura ou zircônia que recobrem e protegem 
                    dentes danificados, devolvendo forma, função e estética impecável.
                  </p>
                  <ul className="space-y-2 text-sm text-dental-gray">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-dental-gold mt-0.5" size={16} />
                      <span>Proteção completa do dente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-dental-gold mt-0.5" size={16} />
                      <span>Estética indistinguível do natural</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-dental-gold mt-0.5" size={16} />
                      <span>Durabilidade superior a 15 anos</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Pontes Fixas */}
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="text-dental-purple mb-4">
                    <Shield size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-dental-purple">
                    Pontes Fixas
                  </h3>
                  <p className="text-dental-gray mb-4">
                    Substituem um ou mais dentes ausentes através de uma estrutura fixa 
                    apoiada em dentes vizinhos ou implantes.
                  </p>
                  <ul className="space-y-2 text-sm text-dental-gray">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-dental-gold mt-0.5" size={16} />
                      <span>Solução fixa e confortável</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-dental-gold mt-0.5" size={16} />
                      <span>Mastigação segura</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-dental-gold mt-0.5" size={16} />
                      <span>Sem metal aparente</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Prótese Sobre Implante */}
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="text-dental-gold mb-4">
                    <Award size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-dental-purple">
                    Prótese Sobre Implante
                  </h3>
                  <p className="text-dental-gray mb-4">
                    A solução mais avançada: próteses fixas ou removíveis ancoradas em 
                    implantes, oferecendo máxima estabilidade.
                  </p>
                  <ul className="space-y-2 text-sm text-dental-gray">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-dental-gold mt-0.5" size={16} />
                      <span>Preservação óssea total</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-dental-gold mt-0.5" size={16} />
                      <span>Sensação natural</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-dental-gold mt-0.5" size={16} />
                      <span>Maior longevidade</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Próteses Removíveis */}
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="text-dental-purple mb-4">
                    <Heart size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-dental-purple">
                    Próteses Removíveis
                  </h3>
                  <p className="text-dental-gray mb-4">
                    Parciais (PPR) ou totais (dentaduras) modernas, com melhor adaptação 
                    e estética superior.
                  </p>
                  <ul className="space-y-2 text-sm text-dental-gray">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-dental-gold mt-0.5" size={16} />
                      <span>Solução acessível</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-dental-gold mt-0.5" size={16} />
                      <span>Fácil manutenção</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-dental-gold mt-0.5" size={16} />
                      <span>Rápida adaptação</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Protocolo All-on-4/6 */}
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="text-dental-gold mb-4">
                    <Star size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-dental-purple">
                    Protocolo All-on-4/6
                  </h3>
                  <p className="text-dental-gray mb-4">
                    Reabilitação total da arcada sobre 4 ou 6 implantes, com prótese fixa 
                    para transformação completa do sorriso.
                  </p>
                  <ul className="space-y-2 text-sm text-dental-gray">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-dental-gold mt-0.5" size={16} />
                      <span>Dentes fixos definitivos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-dental-gold mt-0.5" size={16} />
                      <span>Sem enxerto ósseo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-dental-gold mt-0.5" size={16} />
                      <span>Transformação completa</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tabela Comparativa */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <ComparisonTable
              data={comparisonData}
            />
          </div>
        </section>

        {/* Section Divider */}
        <SectionDivider variant="simple" />

        {/* Processo Detalhado com ProcessTimeline */}
        <section className="py-12 bg-dental-beige/20">
          <div className="container-custom">
            <h2 className="heading-lg mb-4 text-center text-dental-purple">
              Sua Jornada para um Novo Sorriso
            </h2>
            <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">
              Cada etapa é cuidadosamente planejada para garantir conforto, precisão e resultados excepcionais
            </p>
            
            <ProcessTimeline
              steps={[
                {
                  number: 1,
                  title: "Consulta de Diagnóstico Completo",
                  description: "Análise facial, exame clínico, radiografias digitais e escaneamento intraoral para diagnóstico preciso e planejamento personalizado.",
                  icon: <Search size={24} />,
                  duration: "1a Consulta"
                },
                {
                  number: 2,
                  title: "Preparo Minimamente Invasivo",
                  description: "Quando necessário, preparamos os dentes com máxima preservação de estrutura saudável, sempre priorizando técnicas conservadoras.",
                  icon: <Shield size={24} />,
                  duration: "1a Consulta"
                },
                {
                  number: 3,
                  title: "Moldagem Digital de Precisão",
                  description: "Scanner intraoral elimina desconforto de moldeiras, garantindo precisão milimétrica. O arquivo 3D é enviado diretamente ao laboratório parceiro.",
                  icon: <Scan size={24} />,
                  duration: "1a Consulta"
                },
                {
                  number: 4,
                  title: "Confecção e aplicação de dente provisório",
                  description: "Confecção e colocação do dente provisório para garantir a estética e função até a colocação da prótese definitiva.",
                  icon: <Scan size={24} />,
                  duration: "1a Consulta"
                },
                {
                  number: 5,
                  title: "Confecção Artesanal",
                  description: "Nosso laboratório parceiro cria sua prótese com cerâmicas premium, estratificando cores e texturas para um resultado indistinguível de dentes naturais.",
                  icon: <Sparkles size={24} />,
                  duration: "1-2 semanas"
                },
                {
                  number: 6,
                  title: "Instalação e Ajuste Final",
                  description: "Cimentação ou fixação da prótese com ajustes minuciosos de oclusão. Você sai com seu novo sorriro e todas as orientações de cuidados.",
                  icon: <Star size={24} />,
                  duration: "1a Consulta"
                },
                {
                  number: 7,
                  title: "Acompanhamento Continuado",
                  description: "Consultas de manutenção para preservar seu investimento e garantir a saúde do seu sorriso por muitos anos.",
                  icon: <Heart size={24} />,
                  duration: "Periódico"
                }
              ]}
            />
          </div>
        </section>

        {/* Casos Especiais */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Soluções para Casos Complexos
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-dental-purple">
                    Reabilitação Oral Completa
                  </h3>
                  <p className="text-dental-gray mb-4">
                    Para casos de múltiplas perdas, desgaste severo ou problemas de mordida, 
                    desenvolvemos um protocolo completo que restabelece função, estética e 
                    dimensão vertical, com rejuvenescimento facial natural.
                  </p>
                  <ul className="space-y-2 text-sm text-dental-gray">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-dental-gold mt-0.5" size={16} />
                      <span>Análise oclusal completa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-dental-gold mt-0.5" size={16} />
                      <span>Restabelecimento da mordida</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-dental-gold mt-0.5" size={16} />
                      <span>Rejuvenescimento facial</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-dental-purple">
                    Próteses Estéticas de Alta Performance
                  </h3>
                  <p className="text-dental-gray mb-4">
                    Utilizamos cerâmicas de última geração (E-max, Zircônia) com estratificação 
                    artesanal, reproduzindo translucidez, textura e caracterização individual 
                    dos dentes naturais.
                  </p>
                  <ul className="space-y-2 text-sm text-dental-gray">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-dental-gold mt-0.5" size={16} />
                      <span>Cerâmicas premium importadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-dental-gold mt-0.5" size={16} />
                      <span>Estratificação artesanal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="text-dental-gold mt-0.5" size={16} />
                      <span>Resultado indistinguível</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Seção da Especialista */}
        <section className="py-12 bg-gradient-to-br from-dental-purple/5 to-dental-gold/5">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Expertise e Experiência em Reabilitação Oral
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-[200px,1fr] gap-8 items-center">
                    <div className="mx-auto md:mx-0">
                      <img
                        src="/lovable-uploads/dra-carla-avatar.jpg"
                        alt="Dra. Carla Christoph - Especialista em Prótese Dentária"
                        className="w-48 h-48 rounded-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-semibold mb-2 text-dental-purple">
                        Dra. Carla Christoph
                      </h3>
                      <p className="text-dental-gold font-medium mb-4">
                        Especialista em Prótese Dentária e Implantes | CRO-RJ 27.509
                      </p>
                      
                      <div className="space-y-3 text-dental-gray">
                        <p className="flex items-start gap-2">
                          <CheckCircle className="text-dental-gold mt-0.5 flex-shrink-0" size={16} />
                          <span>Mais de 20 anos dedicados à reabilitação oral</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <CheckCircle className="text-dental-gold mt-0.5 flex-shrink-0" size={16} />
                          <span>8 anos como dentista militar na Marinha do Brasil nas clínicas de prótese e odontogeriatria</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <CheckCircle className="text-dental-gold mt-0.5 flex-shrink-0" size={16} />
                          <span>Atualização contínua em técnicas e materiais</span>
                        </p>
                      </div>
                      
                      <p className="mt-4 text-dental-gray italic">
                        "Cada sorriso conta uma história única. Nossa missão é reconstruir 
                        não apenas dentes, mas devolver a confiança para viver plenamente, 
                        sem limitações."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8 text-center text-dental-gray">
                <p>
                  Trabalhamos em conjunto com especialistas em Periodontia quando o caso 
                  requer abordagem multidisciplinar, sempre coordenados pela Dra. Carla 
                  para garantir o melhor resultado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 bg-dental-beige/20">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Perguntas Frequentes sobre Prótese Dentária
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
                Pronto para Reconstruir seu Sorriso?
              </h2>
            </div>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Agende sua consulta de planejamento e descubra como a prótese dentária 
              pode transformar sua qualidade de vida. Tecnologia, experiência e 
              cuidado personalizado aguardam você em Ipanema.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => handleWhatsAppClick('Olá! Vi a página sobre prótese dentária e gostaria de agendar uma avaliação com a Dra. Carla Christoph')}
                className="bg-dental-gold text-dental-purple px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all inline-flex items-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                Agendar Avaliação pelo WhatsApp
              </button>
            </div>
            
            <p className="mt-6 text-sm opacity-75">
              Atendimento de segunda a sexta, das 9h às 18h
            </p>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default ProteseDentaria;