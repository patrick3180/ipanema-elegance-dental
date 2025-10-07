import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import SectionDivider from "@/components/treatment/SectionDivider";
import ProcessTimeline from "@/components/treatment/ProcessTimeline";

import ComparisonTable from "@/components/blog/ComparisonTable";
import OptimizedImage from "@/components/OptimizedImage";
import { ComparisonTableItem } from "@/types/BlogPost";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Star, ArrowRight, Play, Sparkles, Shield, Heart, Award, Search, HelpCircle } from "lucide-react";

const LentesEFacetas = () => {
  // Placeholder para controlar exibição de casos
  const caseImages = null; // Substituir por array de imagens reais quando disponível
  
  // Dados para tabela de comparação
  const comparisonData: ComparisonTableItem[] = [
    {
      "Criterio": "Critério",
      "Critério": "Critério",
      "Rótulo coluna A": "Lentes de Cerâmica",
      "Rótulo coluna B": "Facetas de Resina"
    },
    {
      "Criterio": "Espessura",
      "Rótulo coluna A": "0,2-0,5mm",
      "Rótulo coluna B": "0,7-1,5mm"
    },
    {
      "Criterio": "Preparo dental",
      "Rótulo coluna A": "Mínimo",
      "Rótulo coluna B": "Mínimo a moderado"
    },
    {
      "Criterio": "Durabilidade",
      "Rótulo coluna A": "15-20 anos",
      "Rótulo coluna B": "5-8 anos"
    },
    {
      "Criterio": "Manchamento",
      "Rótulo coluna A": "Não mancha",
      "Rótulo coluna B": "Pode manchar"
    },
    {
      "Criterio": "Consultas necessárias",
      "Rótulo coluna A": "2-3 (15-20 dias)",
      "Rótulo coluna B": "1-2 (imediato)"
    },
    {
      "Criterio": "Possibilidade de reparo",
      "Rótulo coluna A": "Não",
      "Rótulo coluna B": "Sim"
    },
    {
      "Criterio": "Estética",
      "Rótulo coluna A": "Translucidez superior",
      "Rótulo coluna B": "Muito boa"
    },
    {
      "Criterio": "Investimento",
      "Rótulo coluna A": "Premium",
      "Rótulo coluna B": "Acessível"
    },
    {
      "Criterio": "Resistência",
      "Rótulo coluna A": "Alta",
      "Rótulo coluna B": "Moderada"
    }
  ];

  // FAQs otimizadas - 12 perguntas completas
  const faqs = [
    {
      question: "Qual a diferença entre lente de contato dental e faceta de resina?",
      answer: "Lentes de contato dental são lâminas ultrafinas de porcelana (0,2-0,5mm) que exigem preparo mínimo do dente, ideais para transformações duradouras com máxima naturalidade. Facetas de resina são restaurações mais espessas (0,7-1,5mm) feitas diretamente no consultório, com custo mais acessível. Lentes duram 15-20 anos e não mancham, enquanto facetas de resina duram 5-8 anos e podem necessitar polimento periódico."
    },
    {
      question: "É necessário desgastar muito os meus dentes?",
      answer: "Não. A filosofia do consultório é a máxima preservação da estrutura dentária. Para lentes, o preparo é mínimo (0,1-0,3mm quando necessário), limitado ao esmalte superficial. Para facetas de resina, o preparo também é conservador. O importante é garantir adaptação perfeita e resultado estético duradouro preservando ao máximo seus dentes naturais."
    },
    {
      question: "Quanto tempo dura o tratamento completo?",
      answer: "Lentes de contato dental: 2-3 consultas em 15-20 dias. Primeira consulta para planejamento e moldagem digital, segunda para aprovação do Test Drive do Sorriso, terceira para cimentação. Facetas de resina: 1-2 consultas, pois são confeccionadas diretamente no consultório. Trabalhamos com agenda espaçada para garantir tempo adequado em cada sessão."
    },
    {
      question: "O tratamento para melhorar a estética do sorriso dói?",
      answer: "Não. Todos os procedimentos estéticos são realizados com o máximo de conforto, utilizando anestesia local sempre que necessário. A cimentação das lentes é um processo delicado que não causa dor. Pode haver sensibilidade leve nos primeiros dias, facilmente controlada com analgésicos simples se necessário. A prioridade é uma experiência tranquila e indolor."
    },
    {
      question: "O que é o Test Drive do Sorriso (mock-up)?",
      answer: "É uma técnica onde criamos seu novo sorriso com resina provisória não adesiva diretamente na sua boca, sem desgastar os dentes. Você pode se olhar no espelho, tirar fotos, vídeos, falar, sorrir. É uma experiência transformadora! Ajustamos juntos até ficar perfeito. Só depois de você aprovar 100% é que partimos para o tratamento definitivo. Este é um dos nossos maiores diferenciais."
    },
    {
      question: "As lentes podem parecer artificiais?",
      answer: "Este é um dos maiores medos, e a nossa maior preocupação é evitá-lo. Quando bem executadas por uma especialista, absolutamente não. Usamos cerâmicas de última geração que mimetizam perfeitamente a beleza do dente natural. O segredo está na análise facial completa, estratificação de cor personalizada e proporções individualizadas. O resultado é um sorriso elogiado pela naturalidade."
    },
    {
      question: "Posso fazer lentes mesmo tendo os dentes tortos?",
      answer: "Sim, desde que o desalinhamento seja leve. Lentes podem corrigir pequenos desalinhamentos, giros e espaços. Porém, em casos de apinhamento severo ou problemas de mordida significativos, pode ser necessário ortodontia prévia para um resultado duradouro e saudável. Na consulta, avalio seu caso específico e recomendo a melhor abordagem."
    },
    {
      question: "Preciso fazer em todos os dentes?",
      answer: "Não necessariamente. Muitos casos envolvem apenas os dentes anteriores superiores (4 a 10 dentes). Na avaliação, analiso seu sorriso para determinar quantos dentes precisam ser incluídos para um resultado harmonioso. O planejamento é individualizado para cada pessoa."
    },
    {
      question: "Qual o investimento para lentes de contato dental e facetas em Ipanema?",
      answer: "O investimento varia conforme o número de dentes tratados, complexidade do caso e tipo de material escolhido. Lentes de contato dental requerem maior investimento devido ao material cerâmico premium e durabilidade superior (15-20 anos). Facetas de resina oferecem excelente custo-benefício para quem busca resultado imediato com investimento mais acessível. Oferecemos planos de pagamento facilitados. O valor reflete toda a experiência, tecnologia avançada e acompanhamento personalizado. Consulte valores detalhados na avaliação."
    },
    {
      question: "Lentes podem manchar com café, vinho ou cigarro?",
      answer: "A cerâmica utilizada nas lentes não mancha. Diferente das facetas de resina, o material cerâmico é impermeável e mantém o brilho e cor originais permanentemente. Você pode continuar consumindo café, vinho tinto, chá e outros alimentos sem preocupação. Apenas os dentes naturais adjacentes requerem atenção com clareamento prévio para não criarem contraste."
    },
    {
      question: "Como é a manutenção das lentes e facetas?",
      answer: "Lentes de cerâmica: Higiene oral normal (escova, fio dental, enxaguante), evitar morder objetos duros (canetas, unhas, gelo), uso de placa miorrelaxante se você range os dentes à noite. Retornos semestrais para avaliação e polimento profissional. Facetas de resina: Mesmos cuidados, porém requerem polimento profissional a cada 6 meses para manter o brilho. Ambas podem durar muitos anos com os cuidados adequados."
    },
    {
      question: "Como funciona a consulta de planejamento?",
      answer: "É uma conversa aprofundada para entendermos seus desejos e expectativas. Realizamos fotografias profissionais, escaneamento digital com iTero 3D e uma análise completa do seu sorriso e face. Juntos, definimos o melhor plano de tratamento, explicando os prós e contras de cada opção (lentes vs facetas). Você sairá da consulta com todas as informações necessárias para tomar uma decisão informada."
    }
  ];

  const handleWhatsAppClick = (message?: string) => {
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
    
    const defaultMessage = "Olá! Gostaria de conhecer o processo de lentes de contato dental e facetas de porcelana.";
    window.open(`https://wa.me/5521993304045?text=${encodeURIComponent(message || defaultMessage)}`);
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
        <link rel="canonical" href="https://dracarlachristoph.com/lentes-de-contato-dental-e-facetas-de-resina" />
        
        {/* Schema.org estruturado */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "Lentes de Contato Dental e Facetas de Resina em Ipanema",
          "description": "Lentes de contato dental ultrafinas e facetas de resina com Dra. Carla Christoph, especialista em Prótese. 20+ anos de experiência em Ipanema.",
          "url": "https://dracarlachristoph.com/lentes-de-contato-dental-e-facetas-de-resina",
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
            "@type": "Offer",
            "priceCurrency": "BRL",
            "availability": "https://schema.org/InStock",
            "description": "Consulte valores personalizados na avaliação"
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
        {/* Hero Section */}
        <TreatmentHero
          title="Lentes de Contato Dental e Facetas de Porcelana"
          subtitle="Estética Dental com a Dra. Carla Christoph"
          description="Transforme seu sorriso com técnicas minimamente invasivas e resultados naturais. Scanner iTero 3D, Test Drive do Sorriso e planejamento personalizado. Mais de 20 anos de experiência em estética dental."
          badges={["20+ anos de experiência", "Test Drive do Sorriso", "CRO-RJ 27.509"]}
          doctorImage="/lovable-uploads/doutora-em-pe-jaleco.webp"
          breadcrumbs={[
            {label: "Início", href: "/"},
            {label: "Tratamentos", href: "/servicos"},
            {label: "Lentes e Facetas"}
          ]}
        />

        {/* Section Divider */}
        <SectionDivider variant="with-icon" icon={<Sparkles size={20} />} />

        {/* Três Cards de Benefícios Genéricos */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Por Que Escolher Lentes ou Facetas?
              </h2>
              <p className="text-lg text-dental-gray">
                Transformação que vai além da estética
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 - Autoestima e Confiança */}
              <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="font-semibold text-lg text-dental-purple">
                    Autoestima e Confiança
                  </h3>
                </div>
                <ul className="space-y-2 text-dental-gray text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" />
                    <span>Transforme a forma como você se vê e é visto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" />
                    <span>Sorria sem medo em fotos e eventos sociais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" />
                    <span>Recupere a confiança para se expressar plenamente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" />
                    <span>Impacto positivo nas relações pessoais e profissionais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" />
                    <span>Sensação de bem-estar e satisfação com a própria imagem</span>
                  </li>
                </ul>
              </div>

              {/* Card 2 - Naturalidade e Harmonia */}
              <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-dental-purple" />
                  </div>
                  <h3 className="font-semibold text-lg text-dental-purple">
                    Naturalidade e Harmonia Facial
                  </h3>
                </div>
                <ul className="space-y-2 text-dental-gray text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" />
                    <span>Análise facial completa para harmonia com suas características únicas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" />
                    <span>Proporções individualizadas respeitando sua idade e personalidade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" />
                    <span>Resultado natural que recebe elogios pela beleza, não pela aparência de 'dentes feitos'</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" />
                    <span>Textura e cor que imitam perfeitamente dentes naturais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" />
                    <span>Harmonização que realça sua beleza natural</span>
                  </li>
                </ul>
              </div>

              {/* Card 3 - Tecnologia e Cuidado */}
              <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-dental-purple">
                    Tecnologia e Cuidado Integrado
                  </h3>
                </div>
                <ul className="space-y-2 text-dental-gray text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" />
                    <span>Scanner iTero 3D: moldagem digital sem desconforto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" />
                    <span>Test Drive do Sorriso: aprove ANTES do tratamento definitivo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" />
                    <span>Saúde sempre antes da estética (avaliação periodontal completa)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" />
                    <span>Técnicas conservadoras que preservam seus dentes naturais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-dental-gold mt-1 flex-shrink-0" />
                    <span>Acompanhamento de longo prazo para longevidade do tratamento</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Modalidades - Lentes vs Facetas */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Lentes ou Facetas: Entenda as Diferenças
              </h2>
              <p className="text-lg text-dental-gray">
                Cada sorriso é único. Conheça as opções para uma escolha informada.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Card 1 - Lentes de Contato Dental */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300">
                {/* Imagem de fundo */}
                <div className="aspect-[4/3] relative">
          <img 
            src="/Lentes.webp"
            alt="Lentes de contato dental em cerâmica ultra-finas"
            className="w-full h-full object-cover"
          />
                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                  
                  {/* Conteúdo sobre a imagem */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-display font-bold mb-2">
                      Lentes de Contato Dental em Cerâmica
                    </h3>
                    <p className="text-sm text-white/90 mb-4">
                      As lentes de contato dental são lâminas ultra-finas de cerâmica (0,2-0,5mm) que se aderem à superfície frontal dos dentes. Indicadas para quem busca transformação significativa com máxima conservação da estrutura dental original.
                    </p>
                  </div>
                </div>

                {/* Conteúdo expansível abaixo da imagem */}
                <div className="bg-white p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {/* Aba 1 - Características */}
                    <AccordionItem value="caracteristicas">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Características Principais</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-dental-gray text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Espessura:</strong> 0,2 a 0,5mm (ultra-fina)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Material:</strong> Cerâmica de dissilicato de lítio ou feldspática</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Preparo:</strong> Mínimo (0,1-0,3mm) quando necessário</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Durabilidade:</strong> 15 a 20 anos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Estética:</strong> Translucidez superior, aspecto natural</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Resistência:</strong> Não mancha com alimentos ou bebidas</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Aba 2 - Vantagens e Considerações */}
                    <AccordionItem value="vantagens">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Vantagens e Considerações</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" /> Vantagens
                            </h4>
                            <ul className="space-y-2 text-dental-gray text-sm">
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Máxima preservação dental (até 95%)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Resultado extremamente natural</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Não altera sensibilidade na maioria dos casos</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Resistente a manchas permanentemente</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Biocompatível e sem alergias</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Durabilidade comprovada de longo prazo</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-dental-gray mb-2">Considerações</h4>
                            <ul className="space-y-2 text-dental-gray text-sm">
                              <li className="flex items-start gap-2">
                                <span className="text-dental-gray mt-1">•</span>
                                <span>Investimento mais elevado</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-dental-gray mt-1">•</span>
                                <span>Requer 2-3 consultas (15-20 dias de processo)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-dental-gray mt-1">•</span>
                                <span>Laboratório especializado (tempo de confecção)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-dental-gray mt-1">•</span>
                                <span>Não permite reparos parciais</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Aba 3 - Ideal Para */}
                    <AccordionItem value="ideal">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Ideal Para</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-dental-gray text-sm">
                            Quem busca o máximo em estética e durabilidade, deseja preservar ao máximo os dentes naturais e está disposto a investir em um tratamento premium de longa duração.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* Card 2 - Facetas de Resina */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300">
                {/* Imagem de fundo */}
                <div className="aspect-[4/3] relative">
          <img 
            src="/lovable-uploads/Faceta de Resina.webp"
            alt="Facetas de resina composta sendo aplicadas"
            className="w-full h-full object-cover"
          />
                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                  
                  {/* Conteúdo sobre a imagem */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-display font-bold mb-2">
                      Facetas de Resina Composta
                    </h3>
                    <p className="text-sm text-white/90 mb-4">
                      Restaurações diretas confeccionadas artesanalmente no próprio consultório. Excelente opção para quem busca melhoria estética imediata com investimento mais acessível.
                    </p>
                  </div>
                </div>

                {/* Conteúdo expansível abaixo da imagem */}
                <div className="bg-white p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {/* Aba 1 - Características */}
                    <AccordionItem value="caracteristicas">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Características Principais</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-dental-gray text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Espessura:</strong> 0,7 a 1,5mm</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Material:</strong> Resina composta nanoparticulada</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Preparo:</strong> Mínimo a moderado</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Durabilidade:</strong> 5 a 8 anos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Estética:</strong> Muito boa, resultado imediato</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Aplicação:</strong> Direto na boca em 1-2 consultas</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Aba 2 - Vantagens e Considerações */}
                    <AccordionItem value="vantagens">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Vantagens e Considerações</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" /> Vantagens
                            </h4>
                            <ul className="space-y-2 text-dental-gray text-sm">
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Investimento mais acessível</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Resultado em 1-2 consultas (processo rápido)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Confecção direta sem laboratório</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Reparos possíveis se necessário</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Ótima relação custo-benefício</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Resultado em menos tempo</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-dental-gray mb-2">Considerações</h4>
                            <ul className="space-y-2 text-dental-gray text-sm">
                              <li className="flex items-start gap-2">
                                <span className="text-dental-gray mt-1">•</span>
                                <span>Durabilidade menor que cerâmica</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-dental-gray mt-1">•</span>
                                <span>Pode manchar com o tempo (requer polimento periódico)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-dental-gray mt-1">•</span>
                                <span>Menos resistente a fraturas</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-dental-gray mt-1">•</span>
                                <span>Necessita substituição mais frequente</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Aba 3 - Ideal Para */}
                    <AccordionItem value="ideal">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Ideal Para</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-dental-gray text-sm">
                            Quem deseja melhorar o sorriso com investimento menor, casos menos complexos, resultado imediato, ou como opção temporária enquanto planeja um tratamento definitivo.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<Sparkles className="w-5 h-5" />} />

        {/* Tabela Comparativa */}
        <section className="py-12 bg-dental-beige/20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Comparação Detalhada: Lentes vs Facetas
              </h2>
              <p className="text-lg text-dental-gray">
                Entenda lado a lado as características de cada tratamento
              </p>
            </div>

            <div className="overflow-x-auto">
              <ComparisonTable data={comparisonData} />
            </div>

            <div className="mt-8 text-center">
              <p className="text-dental-gray italic">
                A escolha ideal depende do seu caso específico. Na consulta, avalio detalhadamente e recomendo a melhor opção para você.
              </p>
            </div>
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<Star className="w-5 h-5" />} />

        <SectionDivider variant="with-icon" icon={<Heart className="w-5 h-5" />} />

      {/* Seção da Especialista - Premium com Fade */}
      <section className="py-20 bg-gradient-to-b from-dental-beige/10 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
              Sua Dentista para Estética Dental
            </h2>
          </div>

          <div className="grid md:grid-cols-[380px,1fr] gap-12 items-start max-w-6xl mx-auto">
            {/* Foto com Fade Effect e Badge */}
            <div className="relative">
              {/* Container da imagem com gradiente fade */}
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
                  alt="Dra. Carla Christoph"
                  className="w-full"
                />
                {/* Gradiente fade lateral direito */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-dental-beige/80 pointer-events-none"></div>
              </div>
              
              {/* Badge decorativo sobreposto */}
              <div className="absolute bottom-6 left-6 bg-dental-gold text-white px-6 py-3 rounded-full shadow-lg">
                <p className="font-semibold text-sm">20+ Anos de Experiência</p>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="space-y-8">
              {/* Cabeçalho */}
              <div>
                <h3 className="text-3xl font-display font-bold text-dental-purple mb-2">
                  Dra. Carla Christoph
                </h3>
                <p className="text-dental-gold font-semibold text-lg mb-4">
                  CRO-RJ 27.509 | Especialista em Prótese Dentária
                </p>
                <p className="text-dental-gray text-lg leading-relaxed">
                  Com mais de duas décadas dedicadas à estética dental em Ipanema, desenvolvi expertise reconhecida em casos de alta complexidade. Minha abordagem combina precisão técnica com sensibilidade artística, sempre respeitando a individualidade de cada pessoa.
                </p>
                <p className="text-dental-gray text-lg leading-relaxed mt-4">
                  Cada caso é tratado de forma absolutamente individual. Não existem sorrisos padronizados - cada tratamento é único, planejado para harmonizar com suas características faciais e estilo de vida.
                </p>
              </div>

              {/* Grid 2x2 de informações */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Formação */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-dental-gold/10 flex items-center justify-center">
                      <Award className="w-5 h-5 text-dental-gold" />
                    </div>
                    <h4 className="font-semibold text-dental-purple">Formação</h4>
                  </div>
                  <p className="text-dental-gray text-sm">
                    Especialista em Prótese Dentária e Implantodontia
                  </p>
                </div>

                {/* Experiência */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-dental-gold/10 flex items-center justify-center">
                      <Star className="w-5 h-5 text-dental-gold" />
                    </div>
                    <h4 className="font-semibold text-dental-purple">Experiência</h4>
                  </div>
                  <p className="text-dental-gray text-sm">
                    Centenas de casos de lentes e facetas realizados
                  </p>
                </div>

                {/* Atualização */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-dental-gold/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-dental-gold" />
                    </div>
                    <h4 className="font-semibold text-dental-purple">Atualização</h4>
                  </div>
                  <p className="text-dental-gray text-sm">
                    Formação contínua em Design de Sorrisos e técnicas avançadas
                  </p>
                </div>

                {/* Tecnologia */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-dental-gold/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-dental-gold" />
                    </div>
                    <h4 className="font-semibold text-dental-purple">Tecnologia</h4>
                  </div>
                  <p className="text-dental-gray text-sm">
                    Scanner iTero 3D e planejamento digital avançado
                  </p>
                </div>
              </div>

              {/* Quote destacada SEM assinatura */}
              <div className="relative bg-gradient-to-br from-dental-purple/5 to-dental-gold/5 p-8 rounded-2xl mt-8 overflow-hidden border border-dental-gold/10">
                <div className="absolute top-4 left-4 text-5xl text-dental-gold/20 font-serif">"</div>
                <div className="absolute bottom-4 right-4 text-5xl text-dental-gold/20 font-serif">"</div>
                
                <p className="text-xl text-dental-purple italic font-display leading-relaxed text-center relative z-10 px-4">
                  Meu objetivo não é criar sorrisos perfeitos, mas sorrisos verdadeiros. Cada pessoa tem uma beleza única que merece ser realçada, nunca padronizada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Test Drive do Sorriso - Destaque Especial */}
        <section className="py-16 bg-gradient-to-br from-dental-purple/5 to-dental-gold/5">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-dental-gold/10 px-4 py-2 rounded-full mb-4">
                <Star className="w-5 h-5 text-dental-gold" />
                <span className="text-dental-gold font-semibold text-sm">GRANDE DIFERENCIAL</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Test Drive do Sorriso (Mock-up)
              </h2>
              <p className="text-xl text-dental-gray">
                Veja e aprove seu novo sorriso ANTES de qualquer procedimento definitivo
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Coluna Esquerda - Destaque */}
                <div className="bg-gradient-to-br from-dental-purple to-dental-purple/90 text-white p-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold mb-2">
                        A Experiência Transformadora
                      </h3>
                      <p className="text-white/90">
                        Você experimenta seu novo sorriso antes de qualquer procedimento definitivo!
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-dental-gold flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-white">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Resina Provisória Não Adesiva</h4>
                        <p className="text-sm text-white/80">Aplicada diretamente sobre seus dentes, sem desgaste algum</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-dental-gold flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-white">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Veja-se no Espelho</h4>
                        <p className="text-sm text-white/80">Observe de todos os ângulos, em luz natural e artificial</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-dental-gold flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-white">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Tire Fotos e Vídeos</h4>
                        <p className="text-sm text-white/80">Registre, fale, sorria - veja como fica em movimento</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-dental-gold flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-white">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Ajustes em Tempo Real</h4>
                        <p className="text-sm text-white/80">Modificamos juntos até ficar perfeito para você</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coluna Direita - Benefícios */}
                <div className="p-10 bg-dental-beige/20">
                  <h3 className="font-semibold text-xl text-dental-purple mb-6">
                    Por Que o Test Drive É Revolucionário?
                  </h3>

                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-dental-gold mt-1 flex-shrink-0" />
                      <div>
                        <strong className="block text-dental-purple">Zero Ansiedade</strong>
                        <p className="text-dental-gray text-sm">Você sabe exatamente como vai ficar antes de começar</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-dental-gold mt-1 flex-shrink-0" />
                      <div>
                        <strong className="block text-dental-purple">Participação Ativa</strong>
                        <p className="text-dental-gray text-sm">Você decide junto comigo, ajustamos até sua aprovação 100%</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-dental-gold mt-1 flex-shrink-0" />
                      <div>
                        <strong className="block text-dental-purple">Resultado Real</strong>
                        <p className="text-dental-gray text-sm">Não é simulação digital - é real na sua boca, você sente e vive</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-dental-gold mt-1 flex-shrink-0" />
                      <div>
                        <strong className="block text-dental-purple">Confiança Total</strong>
                        <p className="text-dental-gray text-sm">Só partimos para o definitivo quando você estiver 100% feliz</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-gradient-to-br from-dental-gold/10 to-dental-purple/5 p-6 rounded-xl border border-dental-gold/20">
                    <p className="text-dental-gray text-sm italic leading-relaxed">
                      "É impressionante! Ver exatamente como vai ficar seu novo sorriso antes de fazer qualquer coisa. Não é uma simulação no computador - é REAL, na sua boca!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tecnologia Digital - Scanner iTero */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Tecnologia Digital: Scanner iTero Element 5D
              </h2>
              <p className="text-lg text-dental-gray">
                Precisão milimétrica sem desconforto
              </p>
            </div>

            <div className="bg-gradient-to-br from-dental-beige/30 to-white p-10 rounded-3xl shadow-lg">
              <div className="space-y-6">
                <p className="text-dental-gray leading-relaxed text-center text-lg">
                  Utilizamos o scanner iTero Element 5D para planejamento técnico preciso: escaneamento digital sem moldagens com massa, modelo 3D preciso para o laboratório, comunicação digital com técnicos e arquivo digital do seu tratamento.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-dental-purple/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-dental-purple" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dental-purple mb-1">Escaneamento Digital</h4>
                      <p className="text-dental-gray text-sm">Sem moldagens com massa, sem desconforto</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-dental-purple/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-dental-purple" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dental-purple mb-1">Modelo 3D Preciso</h4>
                      <p className="text-dental-gray text-sm">Para o laboratório trabalhar com exatidão</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-dental-purple/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-dental-purple" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dental-purple mb-1">Comunicação Digital</h4>
                      <p className="text-dental-gray text-sm">Com técnicos especializados em cerâmica</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-dental-purple/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-dental-purple" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dental-purple mb-1">Arquivo Digital</h4>
                      <p className="text-dental-gray text-sm">Do seu tratamento para acompanhamento futuro</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* O Que Poucos Explicam - Versão Visual Rica */}
        <section className="py-20 bg-gradient-to-b from-white via-dental-beige/10 to-white relative overflow-hidden">
          {/* Pattern decorativo de fundo */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #381F47 2%, transparent 0%), radial-gradient(circle at 75px 75px, #381F47 2%, transparent 0%)`,
            backgroundSize: '100px 100px'
          }}></div>

          <div className="max-w-6xl mx-auto px-4 relative z-10">
            {/* Título com decoração */}
            <div className="text-center mb-20">
              <div className="inline-block mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-dental-gold to-transparent"></div>
                  <Sparkles className="w-6 h-6 text-dental-gold" />
                  <div className="w-12 h-px bg-gradient-to-r from-dental-gold via-transparent to-transparent"></div>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-dental-purple mb-6">
                O Que Poucos Explicam Sobre Lentes e Facetas
              </h2>
              <p className="text-lg md:text-xl text-dental-gray max-w-3xl mx-auto leading-relaxed">
                A estética dental envolve mais do que aparência. Entenda os aspectos técnicos que determinam o sucesso do seu tratamento.
              </p>
            </div>

            {/* Seção 1: Desafios Técnicos - Com números grandes */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-semibold text-dental-purple mb-3">
                  Desafios Técnicos Reais
                </h3>
                <p className="text-dental-gray">Aspectos que exigem expertise e atenção</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Card 1 */}
                <div className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-dental-beige/30 hover:border-dental-gold/30 overflow-hidden">
                  {/* Número watermark */}
                  <div className="absolute top-4 right-6 text-8xl font-display font-bold text-dental-purple/5 select-none">01</div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-5 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-7 h-7 text-dental-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" strokeWidth="2"/>
                          <path d="M12 7v6l3 3" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-xl text-dental-purple mb-2 group-hover:text-dental-gold transition-colors">
                          Adaptação Marginal
                        </h4>
                        <div className="w-12 h-1 bg-gradient-to-r from-dental-gold to-transparent rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-dental-gray text-sm leading-relaxed">
                      Quando a interface entre a restauração e o dente não é perfeita, forma-se um espaço microscópico que pode acumular bactérias. Com o tempo, isso pode levar à inflamação gengival e sensibilidade.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-dental-beige/30 hover:border-dental-gold/30 overflow-hidden">
                  <div className="absolute top-4 right-6 text-8xl font-display font-bold text-dental-purple/5 select-none">02</div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-5 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2"/>
                          <path d="M9 9h6M9 12h6M9 15h4" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-xl text-dental-purple mb-2 group-hover:text-dental-gold transition-colors">
                          Perfil de Emergência
                        </h4>
                        <div className="w-12 h-1 bg-gradient-to-r from-dental-gold to-transparent rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-dental-gray text-sm leading-relaxed">
                      O contorno na região da gengiva deve respeitar a anatomia natural. Um perfil inadequado dificulta a higienização e pode causar inchaço e sangramento gengival crônico.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-dental-beige/30 hover:border-dental-gold/30 overflow-hidden">
                  <div className="absolute top-4 right-6 text-8xl font-display font-bold text-dental-purple/5 select-none">03</div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-5 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="2" strokeLinejoin="round"/>
                          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-xl text-dental-purple mb-2 group-hover:text-dental-gold transition-colors">
                          Equilíbrio Oclusal
                        </h4>
                        <div className="w-12 h-1 bg-gradient-to-r from-dental-gold to-transparent rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-dental-gray text-sm leading-relaxed">
                      A forma como os dentes superiores e inferiores se encontram é crucial. Facetas mal planejadas podem gerar sobrecarga em pontos específicos, causando desconforto e até fraturas.
                    </p>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-dental-beige/30 hover:border-dental-gold/30 overflow-hidden">
                  <div className="absolute top-4 right-6 text-8xl font-display font-bold text-dental-purple/5 select-none">04</div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-5 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                          <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-xl text-dental-purple mb-2 group-hover:text-dental-gold transition-colors">
                          Biocompatibilidade
                        </h4>
                        <div className="w-12 h-1 bg-gradient-to-r from-dental-gold to-transparent rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-dental-gray text-sm leading-relaxed">
                      A escolha dos materiais e técnicas adesivas impacta diretamente a resposta dos tecidos. Alguns protocolos podem causar sensibilidade prolongada ou irritação gengival.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divisor elegante com animação */}
            <div className="flex items-center justify-center my-16">
              <div className="flex items-center gap-4">
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-dental-gold to-dental-gold"></div>
                <div className="relative">
                  <div className="absolute inset-0 bg-dental-gold/20 blur-xl rounded-full animate-pulse"></div>
                  <Heart className="w-8 h-8 text-dental-gold relative z-10" />
                </div>
                <div className="w-32 h-px bg-gradient-to-l from-transparent via-dental-gold to-dental-gold"></div>
              </div>
            </div>

            {/* Seção 2: Nossa Abordagem - Cards horizontais premium */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-semibold text-dental-purple mb-3">
                  Nossa Abordagem Diferenciada
                </h3>
                <p className="text-dental-gray">Quatro pilares da excelência técnica</p>
              </div>
              
              <div className="space-y-5 max-w-4xl mx-auto">
                {/* Item 1 */}
                <div className="group flex items-start gap-6 bg-white p-7 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-dental-beige/30 hover:border-dental-purple/30 hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-dental-purple/10 to-dental-purple/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all">
                    <Shield className="w-8 h-8 text-dental-purple" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-dental-purple mb-2 group-hover:text-dental-gold transition-colors">
                      Avaliação Periodontal Prévia
                    </h4>
                    <p className="text-dental-gray text-sm leading-relaxed">
                      Saúde gengival é pré-requisito. Tratamos qualquer inflamação antes de iniciar o trabalho estético.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="group flex items-start gap-6 bg-white p-7 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-dental-beige/30 hover:border-dental-purple/30 hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-dental-purple/10 to-dental-purple/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all">
                    <Award className="w-8 h-8 text-dental-purple" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-dental-purple mb-2 group-hover:text-dental-gold transition-colors">
                      Planejamento Oclusal Criterioso
                    </h4>
                    <p className="text-dental-gray text-sm leading-relaxed">
                      Analisamos a mordida em detalhes para garantir distribuição equilibrada das forças mastigatórias.
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="group flex items-start gap-6 bg-white p-7 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-dental-beige/30 hover:border-dental-purple/30 hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-dental-purple/10 to-dental-purple/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all">
                    <Sparkles className="w-8 h-8 text-dental-purple" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-dental-purple mb-2 group-hover:text-dental-gold transition-colors">
                      Protocolo Conservador
                    </h4>
                    <p className="text-dental-gray text-sm leading-relaxed">
                      Preparos mínimos que preservam estrutura dental sadia e mantêm vitalidade pulpar.
                    </p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="group flex items-start gap-6 bg-white p-7 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-dental-beige/30 hover:border-dental-purple/30 hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-dental-purple/10 to-dental-purple/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all">
                    <Heart className="w-8 h-8 text-dental-purple" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-dental-purple mb-2 group-hover:text-dental-gold transition-colors">
                      Acompanhamento Longitudinal
                    </h4>
                    <p className="text-dental-gray text-sm leading-relaxed">
                      Consultas periódicas para monitorar saúde gengival, integridade das restaurações e conforto oclusal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Final - Premium */}
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-br from-dental-beige/40 via-dental-beige/20 to-white p-12 rounded-3xl shadow-lg overflow-hidden">
                {/* Decoração de fundo */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-dental-gold/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-dental-purple/5 rounded-full blur-3xl"></div>
                
                {/* Aspas decorativas */}
                <div className="absolute top-8 left-8 text-7xl text-dental-gold/20 font-serif leading-none">"</div>
                <div className="absolute bottom-8 right-8 text-7xl text-dental-gold/20 font-serif leading-none">"</div>
                
                {/* Conteúdo */}
                <div className="relative z-10 text-center px-8">
                  <p className="text-2xl md:text-3xl text-dental-purple italic font-display leading-relaxed font-medium">
                    A verdadeira beleza de um sorriso está na harmonia entre estética e função. Quando respeitamos a biologia, o resultado é duradouro e saudável.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<CheckCircle className="w-5 h-5" />} />

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

        <SectionDivider variant="with-icon" icon={<Star className="w-5 h-5" />} />

        {/* Timeline do Processo */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Sua Jornada Para o Sorriso dos Sonhos
              </h2>
              <p className="text-lg text-dental-gray">
                Processo transparente e planejado em cada etapa
              </p>
            </div>

            <ProcessTimeline steps={[
              {
                number: "1",
                title: "Avaliação Completa e Planejamento Digital",
                description: "Consulta inicial com análise facial completa e fotográfica. Scanner iTero 3D: moldagem digital sem massa, sem desconforto. Avaliação da saúde bucal e periodontal. Estudo das proporções ideais para harmonização facial. Apresentação do plano de tratamento personalizado.",
                icon: <Search className="w-6 h-6" />
              },
              {
                number: "2",
                title: "Test Drive do Sorriso (Mock-up)",
                description: "O GRANDE DIFERENCIAL! Criação do seu novo sorriso com resina provisória não adesiva. Você vê, sente e aprova o resultado ANTES do tratamento definitivo. Tire fotos, vídeos, sorria, fale naturalmente. Ajustamos juntos até alcançar a perfeição. Momento emocionante de visualizar sua transformação real.",
                icon: <Star className="w-6 h-6" />
              },
              {
                number: "3",
                title: "Preparo Conservador",
                description: "Com o mock-up 100% aprovado, iniciamos o preparo. Lentes: preparo mínimo preservando ao máximo a estrutura dental. Facetas de resina: escultura direta no consultório (1-2 consultas). Nova escaneamento digital para laboratório (apenas lentes). Provisórios estéticos enquanto aguarda (se necessário).",
                icon: <Shield className="w-6 h-6" />
              },
              {
                number: "4",
                title: "Confecção Artesanal",
                description: "Lentes: laboratório especializado em cerâmica de alta translucidez (7-10 dias). Facetas de resina: confeccionadas diretamente pela Dra. Carla. Personalização total de cor, forma e textura. Controle de qualidade rigoroso antes da entrega.",
                icon: <Sparkles className="w-6 h-6" />
              },
              {
                number: "5",
                title: "Cimentação e Finalização",
                description: "Prova final e ajustes necessários. Cimentação adesiva de alta precisão (lentes) ou finalização (facetas). Polimento e acabamento impecável. Orientações de cuidados e higienização. Agendamento do retorno para avaliação.",
                icon: <CheckCircle className="w-6 h-6" />
              }
            ]} />
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
                {caseImages.map((caseImg, index) => (
                  <div key={index} className="relative group">
                    <div className="bg-gradient-to-br from-dental-gold/10 to-dental-purple/10 rounded-lg aspect-video flex items-center justify-center hover:shadow-lg transition-shadow">
                      <div className="text-center text-dental-gray">
                        <Play className="w-12 h-12 mx-auto mb-2 opacity-70" />
                        <span className="text-sm">Caso {index + 1} - Antes e Depois</span>
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
        )}

        <SectionDivider variant="with-icon" icon={<HelpCircle className="w-5 h-5" />} />

        {/* FAQs */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-lg text-dental-gray">
                Tire todas as suas dúvidas sobre lentes e facetas
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  value={`faq-${index + 1}`} 
                  key={index}
                  className="bg-dental-beige/10 rounded-xl px-6 border-0"
                >
                  <AccordionTrigger className="text-left hover:text-dental-purple py-5">
                    <span className="font-semibold text-dental-purple">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-dental-gray pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<Star className="w-5 h-5" />} />

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-br from-dental-purple via-dental-purple/95 to-dental-purple/90 relative overflow-hidden">
          {/* Padrão decorativo de fundo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-dental-gold rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-dental-gold rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            {/* Ícone decorativo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-dental-gold/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-8 h-8 text-dental-gold" />
              </div>
            </div>

            {/* Título */}
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Pronto(a) Para Transformar Seu Sorriso?
            </h2>

            {/* Texto */}
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              Agende uma avaliação completa e conheça seu potencial de transformação. Na consulta, vamos analisar seu caso, realizar um checkup da sua saúde bucal, tirar fotografias profissionais e apresentar todas as possibilidades para o seu sorriso.
            </p>

            {/* Botão WhatsApp */}
            <a
              href="https://wa.me/5521993304045?text=Olá!%20Vi%20a%20página%20sobre%20Lentes%20e%20Facetas%20e%20gostaria%20de%20agendar%20uma%20avaliação%20para%20transformar%20meu%20sorriso."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-dental-gold hover:bg-dental-gold/90 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Agendar Avaliação no WhatsApp</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Informações adicionais */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-dental-gold" />
                <span>Resposta em até 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-dental-gold" />
                <span>Localização privilegiada em Ipanema</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-dental-gold" />
                <span>Atendimento personalizado</span>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default LentesEFacetas;