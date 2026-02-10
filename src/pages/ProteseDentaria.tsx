import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import SectionDivider from "@/components/treatment/SectionDivider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Scan, Star, ArrowRight, Sparkles, Shield, Heart, Award, AlertCircle, Calendar, CheckCircle, Package, Zap, PlayCircle, Clock, HelpCircle, Utensils, Smile } from "lucide-react";
import ProcessTimeline from '@/components/treatment/ProcessTimeline';
import InfoCard from '@/components/treatment/InfoCard';
import { Card, CardContent } from "@/components/ui/card";

const ProteseDentaria = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Controla exibição da seção de vídeo
  const hasVideo = false; // Mudar para true quando tiver o vídeo
  const videoUrl = ""; // Adicionar URL do YouTube/Vimeo quando disponível

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
              "telephone": "+5521993304045",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107",
                "addressLocality": "Ipanema",
                "addressRegion": "RJ",
                "postalCode": "22410-002",
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
          description="Reconstrução completa do sorriso com planejamento individualizado e materiais de alta qualidade. Especialista com mais de 20 anos de experiência em casos de alta complexidade."
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

        {/* Seção de 3 Cards Visuais */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-4 text-center text-dental-purple">
              Reabilitação Oral que Transforma Vidas
            </h2>
            <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">
              Mais de 20 anos devolvendo função, estética e qualidade de vida
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Card 1: Função Mastigatória */}
              <div className="text-center">
                <div className="w-16 h-16 bg-dental-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="w-8 h-8 text-dental-purple" />
                </div>
                <h3 className="text-xl font-semibold text-dental-purple mb-3">
                  Função Mastigatória
                </h3>
                <p className="text-dental-gray">
                  Recupere o prazer de saborear seus alimentos favoritos com conforto e segurança
                </p>
              </div>

              {/* Card 2: Estética Natural */}
              <div className="text-center">
                <div className="w-16 h-16 bg-dental-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smile className="w-8 h-8 text-dental-gold" />
                </div>
                <h3 className="text-xl font-semibold text-dental-purple mb-3">
                  Estética Natural
                </h3>
                <p className="text-dental-gray">
                  Próteses que imitam perfeitamente a cor, forma e translucidez dos dentes naturais
                </p>
              </div>

              {/* Card 3: Qualidade de Vida */}
              <div className="text-center">
                <div className="w-16 h-16 bg-dental-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-dental-purple" />
                </div>
                <h3 className="text-xl font-semibold text-dental-purple mb-3">
                  Qualidade de Vida
                </h3>
                <p className="text-dental-gray">
                  Resgate sua confiança e autoestima para sorrir sem constrangimento
                </p>
              </div>
            </div>
          </div>
        </section>

      <SectionDivider variant="with-icon" icon={<Sparkles size={20} />} />

      {/* Modalidades de Prótese */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-navy mb-4">Modalidades de Prótese Dentária Disponíveis</h2>
            <p className="text-lg text-dental-text-secondary">Tecnologias e materiais de última geração para cada necessidade</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Coroas Dentárias */}
            <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/Coroa e-max.webp"
                  alt="Coroa dentária em cerâmica E-max sobre dente"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
              </div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-display font-semibold text-white mb-2">
                  Coroas Dentárias
                </h3>
                <p className="text-white/90 text-sm mb-4 line-clamp-3">
                  Capas protetoras em cerâmica pura ou zircônia que recobrem e protegem dentes danificados, devolvendo forma, função e estética impecável.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    Cerâmica
                  </span>
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    Resultado Natural
                  </span>
                </div>
              </div>
            </div>

            {/* Pontes Fixas */}
            <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/Ponte fixa.webp"
                  alt="Ponte fixa em porcelana substituindo dentes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
              </div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-display font-semibold text-white mb-2">
                  Pontes Fixas
                </h3>
                <p className="text-white/90 text-sm mb-4 line-clamp-3">
                  Prótese fixa que substitui um ou mais dentes perdidos, ancorada em dentes vizinhos ou implantes, restaurando função e estética.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    Solução Fixa
                  </span>
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    Múltiplos Dentes
                  </span>
                </div>
              </div>
            </div>

            {/* Prótese sobre Implante - RECOMENDADA */}
            <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer">
              <div className="absolute top-4 right-4 bg-dental-gold text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                </div>
              <div className="aspect-[4/3] relative">
                <img 
                  src="/Implante.webp"
                  alt="Prótese sobre implante dentário"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
              </div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-display font-semibold text-white mb-2">
                  Prótese sobre Implante
                </h3>
                <p className="text-white/90 text-sm mb-4 line-clamp-3">
                  A combinação ideal de estabilidade e naturalidade. Prótese fixada em implantes dentários para máximo conforto e durabilidade.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    Aspecto 100% natural
                  </span>
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    Máxima Estabilidade
                  </span>
                </div>
              </div>
            </div>

            {/* Próteses Removíveis */}
            <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/Prótese parcial removível moderna.webp"
                  alt="Prótese parcial removível moderna"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
              </div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-display font-semibold text-white mb-2">
                  Próteses Removíveis
                </h3>
                <p className="text-white/90 text-sm mb-4 line-clamp-3">
                  Parciais (PPR) ou totais (dentaduras) modernas, com melhor adaptação e estética superior.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    Solução Acessível
                  </span>
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    Fácil Higiene
                  </span>
                </div>
              </div>
            </div>

            {/* Protocolo All-on-4/6 - PREMIUM */}
            <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer border-2 border-dental-gold/30">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/all in 4.webp"
                  alt="Protocolo All-on-4 arcada completa sobre implantes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
              </div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-display font-semibold text-white mb-2">
                  Protocolo All-on-4/6
                </h3>
                <p className="text-white/90 text-sm mb-4 line-clamp-3">
                  Reabilitação total da arcada sobre 4 ou 6 implantes, com prótese fixa para transformação completa do sorriso.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    Transformação Total
                  </span>
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    Prótese Fixa
                  </span>
                </div>
              </div>
            </div>

            {/* Prótese Overdenture */}
            <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/Overdenture com clips de retenção.webp"
                  alt="Overdenture estabilizada por implantes com clips"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
              </div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-display font-semibold text-white mb-2">
                  Prótese Overdenture
                </h3>
                <p className="text-white/90 text-sm mb-4 line-clamp-3">
                  Prótese removível estabilizada por implantes, unindo praticidade de remoção com firmeza e conforto ao mastigar.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    Estabilidade
                  </span>
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    Removível
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


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
          icon: <Package size={24} />,
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
                  description: "Cimentação ou fixação da prótese com ajustes minuciosos de oclusão. Você sai com seu novo sorriso e todas as orientações de cuidados.",
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
        <section className="py-16 bg-gradient-purple-soft">
          <div className="container-custom">
            <SectionDivider variant="with-icon" icon={<Award size={20} />} />
            
            <h2 className="heading-lg mb-12 text-center text-dental-purple">
              Expertise e Experiência em Reabilitação Oral
            </h2>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-[300px,1fr] gap-8 items-start">
                
                {/* Foto da Dra. - Maior e mais destacada */}
                <div className="mx-auto md:mx-0">
                  <div className="relative">
                    <img
                      src="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
                      alt="Dra. Carla Christoph - Especialista em Prótese Dentária"
                      className="w-full rounded-2xl shadow-elegant"
                    />
                    {/* Badge flutuante */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-dental-gold text-white px-6 py-2 rounded-full shadow-gold font-semibold text-sm whitespace-nowrap">
                      20+ Anos de Experiência
                    </div>
                  </div>
                </div>
                
                {/* Conteúdo */}
                <div className="bg-white p-8 rounded-2xl shadow-soft">
                  <div className="mb-6">
                    <h3 className="text-3xl font-display font-semibold text-dental-purple mb-2">
                      Dra. Carla Christoph
                    </h3>
                    <p className="text-dental-gold-dark font-medium text-lg">
                      CRO-RJ 27.509 | Especialista em Prótese Dentária
                    </p>
                  </div>
                  
                  <div className="space-y-4 text-dental-gray leading-relaxed">
                    <p>
                      Com mais de duas décadas em Ipanema, a Dra. Carla construiu sua reputação tratando cada paciente de forma individual, com tempo e atenção. Sua formação inclui 8 anos como dentista militar na Odontoclínica Central da Marinha, experiência que trouxe disciplina e precisão para sua prática clínica.
                    </p>
                    
                    <p>
                      Como especialista em Prótese Dentária, reabilitação oral é onde sua formação se aprofunda. Casos complexos são sua rotina — da coroa unitária à reabilitação completa, cada solução é planejada com base em diagnóstico detalhado e planejamento digital.
                    </p>
                  </div>
                  
                  {/* Credenciais */}
                  <div className="mt-6 pt-6 border-t border-dental-gray/20">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-dental-gold mt-1" size={20} />
                        <div>
                          <p className="font-semibold text-dental-purple">Formação</p>
                          <p className="text-sm text-dental-gray">Especialista em Prótese Dentária e Implantodontia</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-dental-gold mt-1" size={20} />
                        <div>
                          <p className="font-semibold text-dental-purple">Experiência</p>
                          <p className="text-sm text-dental-gray">8 anos como dentista militar na Marinha</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-dental-gold mt-1" size={20} />
                        <div>
                          <p className="font-semibold text-dental-purple">Atualização</p>
                          <p className="text-sm text-dental-gray">Cursos contínuos em DSD e scanner intraoral</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-dental-gold mt-1" size={20} />
                        <div>
                          <p className="font-semibold text-dental-purple">Tecnologia</p>
                          <p className="text-sm text-dental-gray">Scanner iTero e planejamento digital</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Vídeo - Condicional */}
        {hasVideo && (
          <section className="py-16 bg-white">
            <div className="container-custom">
              <SectionDivider variant="with-icon" icon={<PlayCircle size={20} />} />
              
              <h2 className="heading-lg mb-4 text-center text-dental-purple">
                Conheça a Dra. Carla Christoph
              </h2>
              <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">
                Assista e entenda como trabalhamos em casos de reabilitação oral complexa
              </p>
              
              <div className="max-w-4xl mx-auto">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-elegant">
                  {videoUrl ? (
                    <iframe
                      src={videoUrl}
                      title="Vídeo da Dra. Carla Christoph sobre Prótese Dentária"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-purple-soft flex items-center justify-center">
                      <div className="text-center">
                        <PlayCircle className="w-20 h-20 text-dental-gold mx-auto mb-4" />
                        <p className="text-dental-purple font-semibold">
                          Vídeo em breve
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 bg-dental-beige/20 p-6 rounded-xl">
                  <p className="text-dental-gray">
                    <strong className="text-dental-purple">Neste vídeo:</strong> A Dra. Carla 
                    explica sua abordagem em casos de reabilitação oral, mostra o consultório 
                    e os equipamentos utilizados, e compartilha sua filosofia de trabalho.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section Divider antes dos FAQs */}
        <SectionDivider variant="with-icon" icon={<HelpCircle size={20} />} />

        {/* FAQs */}
        <section className="py-16 bg-dental-beige/20">
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
        <section className="py-20 bg-gradient-purple-gold text-white">
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
              Atendimento de segunda a sexta, das 9h às 19h
            </p>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default ProteseDentaria;