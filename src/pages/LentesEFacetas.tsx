import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import SectionDivider from "@/components/treatment/SectionDivider";

import ComparisonTable from "@/components/blog/ComparisonTable";
import OptimizedImage from "@/components/OptimizedImage";
import { ComparisonTableItem } from "@/types/BlogPost";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Star, ArrowRight, Play, Sparkles, Shield, Heart, Award } from "lucide-react";

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

  // FAQs otimizadas para IA
  const faqs = [
    {
      question: "Qual a diferença entre lente de contato dental e faceta de resina?",
      answer: "Lentes de contato dental são lâminas ultrafinas de porcelana (0,2-0,5mm) que exigem desgaste mínimo ou zero do dente, ideais para correções sutis com máxima durabilidade. Facetas de resina são restaurações mais espessas (0,7-1,5mm) feitas diretamente no consultório, com custo mais acessível. Lentes duram 15-20 anos e não mancham, enquanto facetas de resina duram 5-8 anos e podem necessitar polimento periódico."
    },
    {
      question: "As lentes de contato dental realmente não desgastam os dentes?",
      answer: "Na maioria dos casos, o desgaste é mínimo (0,1-0,3mm) ou inexistente. O preparo, quando necessário, é limitado ao esmalte superficial, preservando até 95% da estrutura dental original. Isso contrasta com tratamentos mais antigos que exigiam desgastes significativos. A Dra. Carla utiliza técnicas minimamente invasivas para máxima preservação dental."
    },
    {
      question: "Qual o investimento para lentes de contato dental e facetas em Ipanema?",
      answer: "O investimento varia conforme o número de dentes tratados, complexidade do caso e tipo de material escolhido. Lentes de contato dental requerem maior investimento devido ao material cerâmico premium e durabilidade superior. Facetas de resina oferecem excelente custo-benefício. A Dra. Carla oferece planos de pagamento facilitados e condições especiais. O valor reflete toda a experiência, tecnologia avançada e acompanhamento personalizado de uma especialista com 20+ anos de experiência. Consulte valores detalhados na avaliação."
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
      answer: "É uma técnica valiosa onde a Dra. Carla cria seu novo sorriso com resina provisória não adesiva diretamente na sua boca, sem desgastar os dentes. Você pode se olhar no espelho, tirar fotos, vídeos, falar, sorrir. É uma experiência transformadora! Ajustamos juntos até ficar perfeito. Só depois de você aprovar 100% é que partimos para o tratamento definitivo."
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

        {/* Seção da Especialista - Dra. Carla */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center text-dental-purple">Sua Especialista em Estética Dental</h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="relative">
                <img
                  src="/lovable-uploads/doutora-em-pe-jaleco.webp"
                  alt="Dra. Carla Christoph - Especialista em Prótese Dental"
                  className="rounded-2xl aspect-[4/5] object-cover object-top shadow-lg w-full h-auto"
                  loading="eager"
                />
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
                    "Minha filosofia é criar sorrisos naturais que parecem ter nascido assim. Uma das técnicas 
                    mais valiosas que utilizo é o 'Test Drive do Sorriso' - uso resina provisória não adesiva para criar 
                    seu novo sorriso diretamente na sua boca. Você se vê no espelho, tira fotos, fala, sorri... 
                    é uma experiência transformadora ver o resultado real antes de começar."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Test Drive do Sorriso: Experimente Antes de Decidir */}
        <section className="py-12 bg-dental-beige/20">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Test Drive do Sorriso: Experimente Antes de Decidir
            </h2>
            
            <div className="bg-gradient-to-r from-dental-gold/10 to-dental-purple/10 p-8 rounded-2xl max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-dental-purple">
                    Mock-up: Veja Seu Novo Sorriso Antes
                  </h3>
                  
                  <p className="text-dental-gray font-medium">
                    Uma das técnicas mais valiosas da odontologia estética moderna. 
                    Você experimenta seu novo sorriso antes de qualquer procedimento definitivo!
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
                        "É impressionante! Ver exatamente como vai ficar seu novo sorriso 
                        antes de fazer qualquer coisa. Não é uma simulação no 
                        computador - é REAL, na sua boca!"
                      </p>
                      <p className="text-xs text-dental-gray/70 mt-1">- Relato comum dos pacientes</p>
                    </div>
                    
                    <div className="bg-dental-beige/40 p-4 rounded-lg">
                      <h5 className="font-semibold text-sm mb-2">Por que o Mock-up é Tão Importante?</h5>
                      <ul className="text-sm space-y-1 text-dental-gray">
                        <li>• <strong>Decisão segura:</strong> Você prova antes de fazer o trabalho definitivo</li>
                        <li>• <strong>Sem surpresas:</strong> O resultado final será igual ao mock-up aprovado</li>
                        <li>• <strong>Personalização total:</strong> Ajustamos até você amar o resultado</li>
                        <li>• <strong>Experiência real:</strong> Ver na própria boca é incomparável</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-lg text-dental-gray font-medium">
                  "É emocionante ver a transformação instantânea! 
                  Os pacientes ficam impressionados ao ver como ficará 
                  o sorriso definitivo."
                </p>
                <p className="text-sm text-dental-gray/70 mt-2">- Dra. Carla Christoph</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tecnologia Digital: Scanner iTero Element 5D */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Tecnologia Digital: Scanner iTero Element 5D
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-dental-gray mb-4">
                  Utilizamos o scanner iTero Element 5D para planejamento técnico preciso:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
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
                  <div className="space-y-2">
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
              </div>
            </div>
          </div>
        </section>

    {/* Além da Estética: Saúde Como Prioridade */}
    <section className="py-12 bg-gradient-to-b from-white to-dental-beige/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
            Além da Estética: Saúde Como Prioridade
          </h2>
          <p className="text-lg text-dental-gray max-w-3xl mx-auto">
            Um sorriso verdadeiramente bonito começa com dentes e gengivas saudáveis. Na nossa abordagem, estética e saúde caminham juntas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-10">
          {/* COLUNA ESQUERDA - Alerta de Problemas */}
          <div className="bg-red-50 p-8 rounded-xl shadow-md">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-7 h-7 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-red-900 mb-2">
                  Problemas Comuns em Tratamentos Mal Executados
                </h3>
                <p className="text-dental-gray text-sm">
                  Muitos pacientes chegam com complicações decorrentes de tratamentos realizados sem os devidos cuidados:
                </p>
              </div>
            </div>
            
            <ul className="space-y-3 text-dental-gray text-sm">
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg mt-0.5 flex-shrink-0">•</span>
                <span><strong>Adaptação inadequada:</strong> Dificulta higienização e causa inflamação gengival</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg mt-0.5 flex-shrink-0">•</span>
                <span><strong>Preparo excessivo:</strong> Enfraquece o dente e causa sensibilidade permanente</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg mt-0.5 flex-shrink-0">•</span>
                <span><strong>Sobrecontorno:</strong> Acúmulo de placa bacteriana e gengivite</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg mt-0.5 flex-shrink-0">•</span>
                <span><strong>Aspecto artificial:</strong> "Dentes de chiclete" que denunciam o procedimento</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg mt-0.5 flex-shrink-0">•</span>
                <span><strong>Oclusão comprometida:</strong> Dores na ATM e desgaste precoce</span>
              </li>
            </ul>
          </div>

          {/* COLUNA DIREITA - Nossa Abordagem (4 cards com ícones diferentes) */}
          <div className="space-y-6">
            <h3 className="font-semibold text-xl text-dental-purple mb-6 text-center md:text-left">
              Nossa Abordagem Integrada
            </h3>

            {/* Card 1 - Avaliação Periodontal */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">
                    Avaliação Periodontal Completa
                  </h4>
                  <ul className="space-y-1.5 text-dental-gray text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">▸</span>
                      <span>Saúde gengival verificada antes de iniciar estética</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">▸</span>
                      <span>Tratamento de gengivite/periodontite quando necessário</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 2 - Análise Oclusal */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Análise Oclusal (Mordida)
                  </h4>
                  <ul className="space-y-1.5 text-dental-gray text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">▸</span>
                      <span>Verificação do encaixe e distribuição equilibrada das forças</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">▸</span>
                      <span>Prevenção de desgastes e dores na ATM</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 3 - Planejamento Conservador */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-dental-purple" />
                </div>
                <div>
                  <h4 className="font-semibold text-dental-purple mb-2">
                    Planejamento Conservador
                  </h4>
                  <ul className="space-y-1.5 text-dental-gray text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-dental-purple mt-1">▸</span>
                      <span>Preparo mínimo respeitando biologia dental</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-dental-purple mt-1">▸</span>
                      <span>Margens adaptadas para facilitar higienização</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 4 - Materiais Biocompatíveis */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">
                    Materiais Biocompatíveis
                  </h4>
                  <ul className="space-y-1.5 text-dental-gray text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">▸</span>
                      <span>Cerâmicas que não causam inflamação gengival</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">▸</span>
                      <span>Sem metais - livre de alergias</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote centralizada abaixo com ícone */}
        <div className="bg-dental-beige/30 p-8 rounded-xl text-center max-w-4xl mx-auto shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-dental-gold/20 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-dental-gold" />
            </div>
          </div>
          <p className="text-xl text-dental-purple italic font-medium font-display leading-relaxed">
            "Antes de pensar em estética, sempre avalio a saúde. Um sorriso bonito precisa de uma base saudável para durar."
          </p>
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
                    description: "Fotografias profissionais e análise facial computadorizada. Estudo das proporções ideais para seu rosto. Planejamento digital do novo sorriso."
                  },
                  {
                    number: "2", 
                    title: "Mock-up: Test Drive do Seu Novo Sorriso",
                    description: "O GRANDE DIFERENCIAL! Criação do seu novo sorriso com resina provisória não adesiva diretamente na sua boca. Você se vê no espelho, tira fotos, fala, sorri. Ajustamos juntos até ficar perfeito. É emocionante ver o resultado real!"
                  },
                  {
                    number: "3",
                    title: "Preparo Minimamente Invasivo", 
                    description: "Com o mock-up aprovado, fazemos o preparo conservador. Para lentes: desgaste mínimo ou zero. Para facetas: preparo preciso. Utilizamos o scanner iTero para moldagem digital sem massa."
                  },
                  {
                    number: "4",
                    title: "Confecção Artesanal",
                    description: "Lentes: laboratório especializado em cerâmica. Facetas de resina: esculpidas diretamente pela Dra. Carla. Personalização total de cor e forma."
                  },
                  {
                    number: "5",
                    title: "Cimentação e Finalização",
                    description: "Prova final e ajustes necessários. Cimentação adesiva de alta precisão. Polimento e acabamento impecável."
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