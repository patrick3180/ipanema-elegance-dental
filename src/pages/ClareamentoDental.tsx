import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import StatsBar from "@/components/treatment/StatsBar";
import SectionDivider from "@/components/treatment/SectionDivider";
import ProcessTimeline from "@/components/treatment/ProcessTimeline";
import ComparisonTable from "@/components/blog/ComparisonTable";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sparkles, Award, HelpCircle, Search, FileText, Scan, Zap, Heart, CheckCircle, ArrowRight, Droplet, AlertCircle, Calendar } from "lucide-react";
import { InternalLinkingOptimizer } from '@/components/seo/InternalLinkingOptimizer';

import ScrollReveal from "@/components/ScrollReveal";
import EmpatheticPainPoints from "@/components/treatment/EmpatheticPainPoints";
import DoctorBioSection from "@/components/treatment/DoctorBioSection";
import ServiceFAQ from "@/components/treatment/ServiceFAQ";
import FinalServiceCTA from "@/components/treatment/FinalServiceCTA";

const ClareamentoDental = () => {
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
        <title>Clareamento Dental em Ipanema | Dra. Carla Christoph</title>
        <meta
          name="description"
          content="Clareamento dental profissional em Ipanema. Técnicas de consultório e caseiro supervisionado. Protocolos personalizados com a Dra. Carla Christoph. CRO-RJ 27.509."
        />
        <meta
          name="keywords"
          content="clareamento dental ipanema, clareamento profissional, clareamento caseiro supervisionado, dentista ipanema"
        />
        <link rel="canonical" href="https://dracarlachristoph.com/clareamento-dental" />

        {/* Open Graph */}
        <meta property="og:title" content="Clareamento Dental em Ipanema | Dra. Carla Christoph" />
        <meta property="og:description" content="Clareamento dental profissional com técnicas de consultório e caseiro supervisionado em Ipanema." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/clareamento-dental" />
        <meta property="og:image" content="https://dracarlachristoph.com/lovable-uploads/Clareamento_de_consultorio.webp" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Clareamento Dental em Ipanema | Dra. Carla Christoph" />
        <meta name="twitter:description" content="Clareamento dental profissional com técnicas de consultório e caseiro supervisionado em Ipanema." />
        <meta name="twitter:image" content="https://dracarlachristoph.com/lovable-uploads/Clareamento_de_consultorio.webp" />

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Clareamento Dental Profissional",
            "description": "Procedimento de clareamento dental com técnicas de consultório e caseiro supervisionado",
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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "Qual a diferença entre as modalidades?", "acceptedAnswer": { "@type": "Answer", "text": "O clareamento de consultório utiliza gel de maior concentração (35-37%), com resultados em 1-3 sessões. O caseiro usa concentração menor (10-20%), aplicada gradualmente em 14-21 dias com moldeiras personalizadas. O combinado inicia em consultório e mantém resultado com aplicações caseiras. A indicação depende da análise individual." } },
              { "@type": "Question", "name": "O clareamento causa sensibilidade?", "acceptedAnswer": { "@type": "Answer", "text": "Sensibilidade temporária pode ocorrer, mas protocolos modernos minimizam esse desconforto. Utilizamos dessensibilizantes, ajustamos concentrações conforme necessário e aplicamos laser terapêutico quando indicado. A maioria dos pacientes relata pouco ou nenhum desconforto." } },
              { "@type": "Question", "name": "Quanto tempo dura o resultado?", "acceptedAnswer": { "@type": "Answer", "text": "Com cuidados adequados, os resultados mantêm-se por 2-3 anos. A durabilidade varia conforme hábitos alimentares e higiene. Protocolo de manutenção com sessões anuais prolonga significativamente os resultados." } },
              { "@type": "Question", "name": "Posso fazer clareamento com restaurações?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, mas apenas dentes naturais respondem ao clareamento. Restaurações e próteses mantêm sua cor original. Analisamos seu caso para determinar a melhor estratégia, considerando se há necessidade de substituição posterior das restaurações visíveis." } },
              { "@type": "Question", "name": "O clareamento é seguro para o esmalte?", "acceptedAnswer": { "@type": "Answer", "text": "Quando realizado com protocolos adequados, não causa danos ao esmalte. Os géis modernos têm pH balanceado e não provocam desmineralização. Utilizamos produtos com agentes remineralizantes que preservam a integridade dental." } },
              { "@type": "Question", "name": "Quais cuidados após o clareamento?", "acceptedAnswer": { "@type": "Answer", "text": "Nas primeiras 48 horas, evitar alimentos e bebidas pigmentados. Manter higiene oral adequada com escovação após refeições. Uso de canudos para bebidas escuras. Consultas semestrais para manutenção profissional." } },
              { "@type": "Question", "name": "Clareamento funciona em todos os tipos de manchas?", "acceptedAnswer": { "@type": "Answer", "text": "A eficácia varia conforme o tipo de mancha. Manchas por alimentos e idade respondem muito bem. Manchas por medicamentos têm resposta variável. Na consulta, analisamos seu caso específico e estabelecemos expectativas realistas." } },
              { "@type": "Question", "name": "Clareamento e limpeza são diferentes?", "acceptedAnswer": { "@type": "Answer", "text": "Sim. A limpeza remove tártaro e manchas superficiais, devolvendo a cor natural. O clareamento altera quimicamente a cor interna do dente, clareando além da cor natural. Frequentemente realizamos limpeza antes do clareamento para otimizar resultados." } },
              { "@type": "Question", "name": "Produtos de farmácia têm o mesmo efeito?", "acceptedAnswer": { "@type": "Answer", "text": "Produtos sem prescrição contêm concentrações muito baixas devido a regulamentação, oferecendo resultados limitados. O clareamento profissional usa concentrações terapêuticas sob supervisão, garantindo eficácia superior e segurança." } },
              { "@type": "Question", "name": "Como é feita a escolha da modalidade?", "acceptedAnswer": { "@type": "Answer", "text": "Na consulta inicial, analiso suas características individuais, tipo de mancha, sensibilidade prévia, rotina e expectativas. A indicação considera todos esses fatores para definir o protocolo mais adequado ao seu caso." } }
            ]
          })}
        </script>
      </Helmet>

      <PageLayout>
        {/* Hero Section */}
        <TreatmentHero
          title="Clareamento Dental Profissional"
          subtitle="Estética Dental com a Dra. Carla Christoph"
          description="Técnicas de consultório e caseiro supervisionado com protocolos personalizados que priorizam sua segurança e conforto. Acompanhamento individualizado em cada etapa do tratamento. Mais de 20 anos de experiência em estética dental."
          badges={["20+ anos de experiência", "Protocolos personalizados", "CRO-RJ 27.509"]}
          doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
          breadcrumbs={[
            { label: "Início", href: "/" },
            { label: "Tratamentos", href: "/servicos" },
            { label: "Clareamento Dental" }
          ]}
        />

        {/* Quick Answer Box */}
        <ScrollReveal animation="fade-up">
          <section className="py-8 bg-white">
            <div className="container-custom">
              <QuickAnswerBox
                answer="Clareamento dental é um procedimento estético que clareia os dentes usando gel à base de peróxido. No consultório da Dra. Carla Christoph em Ipanema, oferecemos técnicas de consultório (1-3 sessões de 60-90 minutos) e caseiro supervisionado. Com mais de 20 anos de experiência (CRO-RJ 27.509), trabalhamos com protocolos personalizados que clareiam de 4 a 9 tons com segurança, preservando a saúde dos dentes e gengivas. O tratamento dura de 7 a 21 dias conforme a modalidade escolhida."
              />
            </div>
          </section>
        </ScrollReveal>

        {/* Seção Empática - Sprint 6 #2 */}
        <ScrollReveal animation="fade-up">
          <EmpatheticPainPoints
            title="Seu sorriso pede um clareamento?"
            painPoints={[
              {
                icon: <Sparkles className="w-6 h-6 text-dental-purple" />,
                strong: "Você evita sorrir em fotos",
                description: "porque sente que seus dentes estão amarelados ou mais escuros do que gostaria?",
                borderColor: "border-dental-purple"
              },
              {
                icon: <Droplet className="w-6 h-6 text-dental-gold" />,
                strong: "Já tentou pastas \"clareadoras\" de farmácia",
                description: "e não viu resultado ou sentiu sensibilidade sem melhora real?",
                borderColor: "border-dental-gold"
              },
              {
                icon: <AlertCircle className="w-6 h-6 text-dental-purple-soft" />,
                strong: "Quer resultado real e seguro",
                description: "com acompanhamento profissional e sem arriscar a saúde do seu esmalte?",
                borderColor: "border-dental-purple-soft"
              }
            ]}
            conclusion={<>O clareamento profissional usa concentrações terapêuticas sob supervisão.<br className="hidden md:block" /> Vamos encontrar a técnica ideal para você — com acompanhamento em cada etapa.</>}
          />
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<Sparkles className="w-5 h-5" />} />

        {/* Três Cards de Modalidades com Accordion */}
        <ScrollReveal animation="fade-up">
          <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Modalidades de Clareamento Disponíveis
              </h2>
              <p className="text-lg text-dental-gray">
                Cada técnica é indicada conforme características individuais. Conheça as opções.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">

              {/* CARD 1 - CLAREAMENTO DE CONSULTÓRIO */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="aspect-[4/3] relative">
                  <img
                    src="/lovable-uploads/Clareamento_de_consultorio.webp"
                    alt="Modelo 3D mostrando clareamento dental de consultório"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-display font-semibold text-white mb-2">
                      Clareamento de Consultório
                    </h3>
                    <p className="text-white/90 text-sm mb-4 line-clamp-3">
                      Gel clareador de alta concentração aplicado em sessões de 60-90 minutos. Resultados visíveis a partir da primeira aplicação.
                    </p>
                  </div>
                </div>

                {/* Conteúdo expansível - Accordion */}
                <div className="bg-white p-6">
                  <Accordion type="single" collapsible className="w-full">

                    <AccordionItem value="caracteristicas">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Características Principais</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-dental-gray text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Concentração:</strong> 35-37% peróxido de hidrogênio</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Sessões:</strong> 1 a 3 consultas</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Clareamento:</strong> 4-9 tons</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Duração:</strong> 2-3 anos com cuidados adequados</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="vantagens">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Vantagens e Considerações</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="font-semibold text-green-900 mb-2 text-sm">Vantagens:</p>
                            <ul className="space-y-1 text-dental-gray text-sm">
                              <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span>Resultado em poucas sessões</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span>Supervisão profissional constante</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span>Controle preciso do processo</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span>Isolamento da gengiva para evitar irritação</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="font-semibold text-blue-900 mb-2 text-sm">Considerações:</p>
                            <ul className="space-y-1 text-dental-gray text-sm">
                              <li className="flex items-start gap-2">
                                <span className="text-dental-gray">•</span>
                                <span>Sensibilidade temporária possível</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-dental-gray">•</span>
                                <span>Requer disponibilidade para consultas</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="ideal">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Ideal Para</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-dental-gray text-sm">
                            Casos que necessitam resultado em curto espaço de tempo, manchas mais resistentes ou quem prefere supervisão presencial constante.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                  </Accordion>
                </div>
              </div>

              {/* CARD 2 - CLAREAMENTO CASEIRO */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="aspect-[4/3] relative">
                  <img
                    src="/lovable-uploads/Clareamento_caseiro.webp"
                    alt="Modelo 3D mostrando moldeiras de clareamento caseiro"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-display font-semibold text-white mb-2">
                      Clareamento Caseiro Supervisionado
                    </h3>
                    <p className="text-white/90 text-sm mb-4 line-clamp-3">
                      Moldeiras personalizadas confeccionadas no consultório. Gel de menor concentração para aplicação diária em casa com acompanhamento profissional.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6">
                  <Accordion type="single" collapsible className="w-full">

                    <AccordionItem value="caracteristicas">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Características Principais</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-dental-gray text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Concentração:</strong> 10-20% peróxido de carbamida</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Moldeiras:</strong> Personalizadas e anatômicas</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Aplicação:</strong> 14 a 21 dias</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Clareamento:</strong> 2-6 tons</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Duração:</strong> 2-3 anos com cuidados adequados</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="vantagens">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Vantagens e Considerações</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="font-semibold text-green-900 mb-2 text-sm">Vantagens:</p>
                            <ul className="space-y-1 text-dental-gray text-sm">
                              <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span>Aplicação no conforto de casa</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span>Flexibilidade de horários</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span>Menor sensibilidade</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span>Gradual e controlado</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="font-semibold text-blue-900 mb-2 text-sm">Considerações:</p>
                            <ul className="space-y-1 text-dental-gray text-sm">
                              <li className="flex items-start gap-2">
                                <span className="text-dental-gray">•</span>
                                <span>Requer disciplina na aplicação</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="ideal">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Ideal Para</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-dental-gray text-sm">
                            Quem prefere tratamento gradual, possui rotina flexível e busca conforto durante o processo.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                  </Accordion>
                </div>
              </div>

              {/* CARD 3 - TRATAMENTO COMBINADO */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="aspect-[4/3] relative">
                  <img
                    src="/lovable-uploads/Clareamento_combinado.webp"
                    alt="Modelo 3D mostrando antes e depois do clareamento dental"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-display font-semibold text-white mb-2">
                      Tratamento Combinado
                    </h3>
                    <p className="text-white/90 text-sm mb-4 line-clamp-3">
                      Início em consultório seguido de manutenção caseira. Combina resultado inicial mais evidente com estabilização gradual.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6">
                  <Accordion type="single" collapsible className="w-full">

                    <AccordionItem value="caracteristicas">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Características Principais</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-dental-gray text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Protocolo:</strong> Consultório + caseiro sequencial</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Tempo total:</strong> Variável conforme caso</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Clareamento:</strong> 6-9 tons</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-dental-gold mt-1">▸</span>
                            <span><strong>Duração:</strong> 3+ anos com protocolo de manutenção</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="vantagens">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Vantagens e Considerações</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="font-semibold text-green-900 mb-2 text-sm">Vantagens:</p>
                            <ul className="space-y-1 text-dental-gray text-sm">
                              <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span>Resultado inicial mais evidente</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span>Estabilização gradual</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span>Maior durabilidade</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span>Protocolo completo</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="font-semibold text-blue-900 mb-2 text-sm">Considerações:</p>
                            <ul className="space-y-1 text-dental-gray text-sm">
                              <li className="flex items-start gap-2">
                                <span className="text-dental-gray">•</span>
                                <span>Investimento maior</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="ideal">
                      <AccordionTrigger className="text-left hover:text-dental-purple">
                        <span className="font-semibold">Ideal Para</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-dental-gray text-sm">
                            Casos de escurecimento mais acentuado, manchas persistentes ou quando se busca resultado mais duradouro.
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
        </ScrollReveal>

        {/* CTA Intermediário - Sprint 6 #7 */}
        <ScrollReveal animation="fade-up">
          <section className="py-8 bg-white">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <p className="text-xl text-dental-gray mb-6">
                Não sabe qual modalidade escolher?
              </p>
              <button
                onClick={() => handleWhatsAppClick("Olá! Gostaria de saber qual modalidade de clareamento dental é a mais adequada para o meu caso.")}
                className="inline-flex items-center justify-center px-8 py-4 bg-dental-gold hover:bg-dental-gold/90 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Vamos Avaliar Juntos
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          </section>
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<Sparkles className="w-5 h-5" />} />

        {/* Tabela Comparativa */}
        <ScrollReveal animation="fade-up">
          <section className="py-12 pb-8 bg-dental-beige/20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Comparação Entre as Modalidades
              </h2>
            </div>

            <ComparisonTable data={[
              {
                "Criterio": "Concentração",
                "Critério": "Concentração",
                "Rótulo coluna A": "35-37%",
                "Rótulo coluna B": "10-20%",
                "Rótulo coluna C": "Ambas"
              },
              {
                "Criterio": "Tempo de Tratamento",
                "Critério": "Tempo de Tratamento",
                "Rótulo coluna A": "1-3 sessões",
                "Rótulo coluna B": "14-21 dias",
                "Rótulo coluna C": "Variável"
              },
              {
                "Criterio": "Clareamento Esperado",
                "Critério": "Clareamento Esperado",
                "Rótulo coluna A": "4-9 tons",
                "Rótulo coluna B": "2-6 tons",
                "Rótulo coluna C": "6-9 tons"
              },
              {
                "Criterio": "Sensibilidade",
                "Critério": "Sensibilidade",
                "Rótulo coluna A": "Moderada",
                "Rótulo coluna B": "Baixa",
                "Rótulo coluna C": "Baixa a moderada"
              },
              {
                "Criterio": "Supervisão",
                "Critério": "Supervisão",
                "Rótulo coluna A": "Presencial",
                "Rótulo coluna B": "À distância",
                "Rótulo coluna C": "Ambas"
              },
              {
                "Criterio": "Durabilidade",
                "Critério": "Durabilidade",
                "Rótulo coluna A": "2-3 anos",
                "Rótulo coluna B": "2-3 anos",
                "Rótulo coluna C": "3+ anos"
              }
            ]} />

            <p className="text-center mt-6 text-dental-gray">
              A indicação depende da análise individual de cada caso. Na consulta, consideramos suas necessidades, rotina e características dentais específicas.
            </p>
          </div>
        </section>
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<Sparkles className="w-5 h-5" />} />

        {/* Processo Timeline */}
        <ScrollReveal animation="fade-up">
          <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-4 text-center text-dental-purple">
              Etapas do Tratamento
            </h2>
            <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">
              Do planejamento aos cuidados pós-tratamento, cada etapa é pensada para seu conforto
            </p>

            <ProcessTimeline
              steps={[
                {
                  number: 1,
                  title: "Consulta Inicial",
                  description: "Exame clínico, análise da saúde bucal e registro fotográfico da cor inicial. Identificação do tipo de mancha e viabilidade do tratamento.",
                  icon: <Search size={24} />,
                  duration: "1ª Consulta"
                },
                {
                  number: 2,
                  title: "Planejamento",
                  description: "Definição da técnica conforme suas características individuais. Explicação detalhada do processo e estabelecimento de expectativas.",
                  icon: <FileText size={24} />,
                  duration: "1ª Consulta"
                },
                {
                  number: 3,
                  title: "Preparo",
                  description: "Profilaxia para remoção de manchas superficiais. Tratamento de cáries ou problemas gengivais quando identificados.",
                  icon: <Sparkles size={24} />,
                  duration: "Se necessário"
                },
                {
                  number: 4,
                  title: "Moldagem e Confecção (Caseiro)",
                  description: "Moldagem e confecção de moldeiras personalizadas para clareamento caseiro. Todo o processo é realizado na primeira consulta, com ajuste preciso para distribuição uniforme do gel e proteção das gengivas.",
                  icon: <Scan size={24} />,
                  duration: "1ª Consulta"
                },
                {
                  number: 5,
                  title: "Aplicação",
                  description: "Consultório: Proteção das gengivas e aplicação supervisionada. Caseiro: Orientação detalhada sobre uso correto das moldeiras.",
                  icon: <Zap size={24} />,
                  duration: "Conforme protocolo"
                },
                {
                  number: 6,
                  title: "Acompanhamento",
                  description: "Acompanhamento do progresso e ajustes quando necessário. Manejo de sensibilidade com protocolos específicos.",
                  icon: <Heart size={24} />,
                  duration: "Durante tratamento"
                },
                {
                  number: 7,
                  title: "Finalização",
                  description: "Registro fotográfico final e orientações de manutenção personalizadas para preservação dos resultados.",
                  icon: <CheckCircle size={24} />,
                  duration: "Última consulta"
                }
              ]}
            />
          </div>
        </section>
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<Award className="w-5 h-5" />} />

        <ScrollReveal animation="fade-up">
          <DoctorBioSection 
            sectionTitle="Expertise e Experiência em Estética Dental"
            doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
            doctorAlt="Dra. Carla Christoph - Especialista em Estética Dental"
            doctorName="Dra. Carla Christoph"
            doctorSubtitle="CRO-RJ 27.509 | Especialista em Prótese Dentária e Implantodontia"
            paragraphs={[
              "Com mais de duas décadas em Ipanema, a Dra. Carla construiu sua reputação tratando cada paciente de forma individual, com tempo e atenção. Sua formação inclui 8 anos como dentista militar na Odontoclínica Central da Marinha, experiência que trouxe disciplina e precisão para sua prática clínica.",
              "Nos protocolos de clareamento, prioriza segurança e resultado natural — cada caso tem sua indicação específica. A escolha entre clareamento de consultório, caseiro supervisionado ou combinado é definida na consulta, considerando a condição dos dentes e a expectativa do paciente."
            ]}
            credentials={[
              { title: "Formação", description: "Especialista em Prótese Dentária e Implantodontia" },
              { title: "Experiência", description: "Centenas de clareamentos realizados" },
              { title: "Atualização", description: "Formação contínua em técnicas de clareamento" },
              { title: "Protocolos", description: "Personalizados para mínima sensibilidade" }
            ]}
          />
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<HelpCircle className="w-5 h-5" />} />

        <ScrollReveal animation="fade-up">
          <ServiceFAQ 
            title="Perguntas Frequentes Sobre Clareamento"
            faqs={[
              { question: "Qual a diferença entre as modalidades?", answer: "O clareamento de consultório utiliza gel de maior concentração (35-37%), com resultados em 1-3 sessões. O caseiro usa concentração menor (10-20%), aplicada gradualmente em 14-21 dias com moldeiras personalizadas. O combinado inicia em consultório e mantém resultado com aplicações caseiras. A indicação depende da análise individual." },
              { question: "O clareamento causa sensibilidade?", answer: "Sensibilidade temporária pode ocorrer, mas protocolos modernos minimizam esse desconforto. Utilizamos dessensibilizantes, ajustamos concentrações conforme necessário e aplicamos laser terapêutico quando indicado. A maioria dos pacientes relata pouco ou nenhum desconforto." },
              { question: "Quanto tempo dura o resultado?", answer: "Com cuidados adequados, os resultados mantêm-se por 2-3 anos. A durabilidade varia conforme hábitos alimentares e higiene. Protocolo de manutenção com sessões anuais prolonga significativamente os resultados." },
              { question: "Posso fazer clareamento com restaurações?", answer: "Sim, mas apenas dentes naturais respondem ao clareamento. Restaurações e próteses mantêm sua cor original. Analisamos seu caso para determinar a melhor estratégia, considerando se há necessidade de substituição posterior das restaurações visíveis." },
              { question: "O clareamento é seguro para o esmalte?", answer: "Quando realizado com protocolos adequados, não causa danos ao esmalte. Os géis modernos têm pH balanceado e não provocam desmineralização. Utilizamos produtos com agentes remineralizantes que preservam a integridade dental." },
              { question: "Quais cuidados após o clareamento?", answer: "Nas primeiras 48 horas, evitar alimentos e bebidas pigmentados. Manter higiene oral adequada com escovação após refeições. Uso de canudos para bebidas escuras. Consultas semestrais para manutenção profissional." },
              { question: "Clareamento funciona em todos os tipos de manchas?", answer: "A eficácia varia conforme o tipo de mancha. Manchas por alimentos e idade respondem muito bem. Manchas por medicamentos têm resposta variável. Na consulta, analisamos seu caso específico e estabelecemos expectativas realistas." },
              { question: "Clareamento e limpeza são diferentes?", answer: "Sim. A limpeza remove tártaro e manchas superficiais, devolvendo a cor natural. O clareamento altera quimicamente a cor interna do dente, clareando além da cor natural. Frequentemente realizamos limpeza antes do clareamento para otimizar resultados." },
              { question: "Produtos de farmácia têm o mesmo efeito?", answer: "Produtos sem prescrição contêm concentrações muito baixas devido a regulamentação, oferecendo resultados limitados. O clareamento profissional usa concentrações terapêuticas sob supervisão, garantindo eficácia superior e segurança." },
              { question: "Como é feita a escolha da modalidade?", answer: "Na consulta inicial, analiso suas características individuais, tipo de mancha, sensibilidade prévia, rotina e expectativas. A indicação considera todos esses fatores para definir o protocolo mais adequado ao seu caso." }
            ]}
          />
        </ScrollReveal>

        <FinalServiceCTA 
          title="Ver Qual Protocolo é Indicado para Mim"
          description="Cada caso tem sua indicação específica. Na consulta, analisamos o tipo de mancha e definimos se consultório, caseiro ou combinado é mais adequado."
          ctaText="Ver Qual Protocolo é Indicado para Mim"
          whatsappMessage="Olá! Gostaria de agendar uma consulta para clareamento dental com a Dra. Carla Christoph."
          onClickOverride={handleWhatsAppClick}
          icon={<Calendar className="w-8 h-8" />}
          variant="urgency"
        />

        <StatsBar />
        <InternalLinkingOptimizer currentPage="clareamento-dental" />
      </PageLayout>
    </>
  );
};

export default ClareamentoDental;
