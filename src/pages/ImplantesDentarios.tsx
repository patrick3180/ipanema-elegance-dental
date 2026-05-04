import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import StatsBar from "@/components/treatment/StatsBar";
import SectionDivider from "@/components/treatment/SectionDivider";
import ProcessTimeline from "@/components/treatment/ProcessTimeline";
import DoctorBioSection from "@/components/treatment/DoctorBioSection";
import EmpatheticPainPoints from "@/components/treatment/EmpatheticPainPoints";
import ServiceFAQ from "@/components/treatment/ServiceFAQ";
import FinalServiceCTA from "@/components/treatment/FinalServiceCTA";
import ScrollReveal from "@/components/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Cpu, Scan, Shield, Heart, Activity, Clock, CheckCircle,
  Award, HelpCircle, Smile, Sparkles, ArrowRight, AlertCircle
} from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import FastServerResponseOptimizer from '@/components/performance/FastServerResponseOptimizer';
import CriticalCSSOptimizer from '@/components/performance/CriticalCSSOptimizer';
import QuickAnswerBox from '@/components/blog/QuickAnswerBox';
import { InternalLinkingOptimizer } from '@/components/seo/InternalLinkingOptimizer';

const ImplantesDentarios = () => {
  // Critical image preload
  useCriticalImagePreload({
    images: [
      { src: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp', width: 1024 },
      { src: '/lovable-uploads/Implante unitario.webp', width: 800 }
    ],
    enabled: true
  });

  // Scroll tracking
  useScrollTracking({
    pagePath: '/implantes-dentarios',
    enabled: process.env.NODE_ENV === 'production'
  });

  const handleWhatsAppClick = async () => {
    // GTM tracking
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'CTA Implantes',
        page_type: 'service_page'
      });
    }

    // Google Ads conversion
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function () {
          console.log('Google Ads conversion tracked - Implantes Service Page');
        }
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook('implantes_service_page_cta');

    // Open WhatsApp
    const phone = "5521993304045";
    const message = "Olá! Vi a página sobre implantes dentários e gostaria de agendar uma consulta com a Dra. Carla Christoph.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Implantes Dentários em Ipanema | Dra. Carla Christoph</title>
        <meta name="description" content="Implantes dentários em Ipanema com planejamento digital 3D e técnicas minimamente invasivas. Mais de 20 anos de experiência em reabilitação oral. CRO-RJ 27.509." />
        <meta name="keywords" content="implantes dentários ipanema, implante dental rio de janeiro, all on 4, protocolo dentário, dentista implantodontia zona sul, cro-rj 27509" />

        <meta property="og:title" content="Implantes Dentários em Ipanema | Dra. Carla Christoph" />
        <meta property="og:description" content="Implantes dentários em Ipanema com planejamento digital 3D e técnicas minimamente invasivas. Mais de 20 anos de experiência em reabilitação oral." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://dracarlachristoph.com/lovable-uploads/Implante unitario.webp" />
        <meta property="og:url" content="https://dracarlachristoph.com/implantes-dentarios" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Implantes Dentários em Ipanema | Dra. Carla Christoph" />
        <meta name="twitter:description" content="Implantes dentários em Ipanema com planejamento digital 3D e técnicas minimamente invasivas." />

        <link rel="canonical" href="https://dracarlachristoph.com/implantes-dentarios" />
        <link rel="alternate" hrefLang="pt-BR" href="https://dracarlachristoph.com/implantes-dentarios" />
        <link rel="alternate" hrefLang="en" href="https://dracarlachristoph.com/en/dental-implants" />
        <link rel="alternate" hrefLang="x-default" href="https://dracarlachristoph.com/implantes-dentarios" />

        {/* Critical CSS para LCP */}
        <style>{`
          .dental-purple{color:#381F47}
          .bg-dental-purple{background-color:#381F47}
          .font-display{font-family:'Playfair Display',Georgia,serif}
          .aspect-\\[5\\/4\\]{aspect-ratio:5/4}
          @media(min-width:1024px){.lg\\:aspect-square{aspect-ratio:1}}
        `}</style>

        {/* Font preload */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//api.whatsapp.com" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Implantes Dentários",
            "description": "Reabilitação oral com implantes de titânio biocompatível e próteses sobre implantes",
            "procedureType": "Dental",
            "performer": {
              "@type": "Dentist",
              "name": "Dra. Carla Christoph",
              "identifier": "CRO-RJ 27.509",
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
              { "@type": "Question", "name": "O que são implantes dentários?", "acceptedAnswer": { "@type": "Answer", "text": "São pinos de titânio biocompatível instalados cirurgicamente no osso da mandíbula ou maxila, substituindo a raiz do dente perdido. Sobre estes pinos, fixamos coroas, pontes ou próteses completas, restaurando função mastigatória, estética e fonética." } },
              { "@type": "Question", "name": "O procedimento é doloroso?", "acceptedAnswer": { "@type": "Answer", "text": "A cirurgia é realizada sob anestesia local, com mínimo desconforto durante o procedimento. O pós-operatório é geralmente tranquilo, com desconforto leve controlado por medicação. A maioria dos pacientes retorna às atividades normais em 2 a 3 dias." } },
              { "@type": "Question", "name": "Quanto tempo dura o tratamento completo?", "acceptedAnswer": { "@type": "Answer", "text": "O tempo varia conforme o caso. Em média, de 4 a 6 meses desde a instalação do implante até a prótese definitiva, incluindo o período de osseointegração (3 a 6 meses). Em casos com carga imediata selecionados, a prótese provisória é instalada conforme planejamento." } },
              { "@type": "Question", "name": "Qualquer pessoa pode colocar implantes?", "acceptedAnswer": { "@type": "Answer", "text": "A maioria dos adultos saudáveis é candidata. Avaliamos saúde geral, quantidade e qualidade óssea, hábitos (tabagismo) e condições sistêmicas (diabetes controlado). Em casos de osso insuficiente, enxertos ósseos podem viabilizar o tratamento." } },
              { "@type": "Question", "name": "Quanto tempo duram os implantes?", "acceptedAnswer": { "@type": "Answer", "text": "Com higiene adequada e manutenções regulares, implantes podem durar décadas ou a vida toda. Estudos mostram taxa de sucesso acima de 95% em 10 anos. A coroa protética pode precisar ser substituída após 10 a 15 anos dependendo do desgaste." } },
              { "@type": "Question", "name": "Como é a manutenção dos implantes?", "acceptedAnswer": { "@type": "Answer", "text": "Higienização rigorosa com escova, fio dental e escovas interdentais específicas. Retornos semestrais para controle profissional, radiografias periódicas e avaliação da saúde peri-implantar. Evitar sobrecarga excessiva e trauma." } },
              { "@type": "Question", "name": "Existe rejeição de implantes?", "acceptedAnswer": { "@type": "Answer", "text": "O titânio é biocompatível e não causa rejeição imunológica. Falhas ocorrem por infecção, sobrecarga precoce, tabagismo ou higiene inadequada, não por rejeição. Taxa de sucesso é superior a 95% quando protocolos são seguidos." } },
              { "@type": "Question", "name": "Posso fazer se tiver pouco osso?", "acceptedAnswer": { "@type": "Answer", "text": "Sim. Técnicas de enxerto ósseo (autógeno, biomaterial) ou levantamento de seio maxilar podem aumentar volume ósseo. Implantes curtos ou angulados também são alternativas. Os exames de imagem permitem planejar a melhor solução para cada caso." } },
              { "@type": "Question", "name": "Qual a diferença entre implante e prótese?", "acceptedAnswer": { "@type": "Answer", "text": "O implante é o pino de titânio fixado no osso (substitui a raiz). A prótese é a parte visível (coroa, ponte ou dentadura) que se conecta ao implante. O conjunto completo restaura função e estética." } },
              { "@type": "Question", "name": "Fumantes podem fazer implantes?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, mas o tabagismo reduz a taxa de sucesso (de 95% para aproximadamente 85%) por prejudicar cicatrização e osseointegração. Recomendamos parar de fumar pelo menos 2 semanas antes da cirurgia e durante a cicatrização. Análise individual é essencial." } },
              { "@type": "Question", "name": "Diabéticos podem colocar implantes?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, desde que o diabetes esteja controlado (hemoglobina glicada abaixo de 7%). Análise médica prévia é importante. O controle glicêmico adequado garante cicatrização normal e taxa de sucesso equivalente a não-diabéticos." } },
              { "@type": "Question", "name": "Vocês atendem convênios odontológicos?", "acceptedAnswer": { "@type": "Answer", "text": "Nosso atendimento é particular, o que nos permite dedicar o tempo necessário a cada paciente e utilizar somente materiais de primeira linha. Na primeira consulta, apresentamos um orçamento detalhado e transparente." } }
            ]
          })}
        </script>
      </Helmet>

      <FastServerResponseOptimizer />
      <CriticalCSSOptimizer inlineStyles="" />

      <PageLayout>
        <TreatmentHero
          title="Implantes Dentários e Reabilitação Oral"
          subtitle="Especialidade da Dra. Carla Christoph"
          description="Recupere a função mastigatória, estética natural e autoconfiança com implantes de titânio biocompatível. Planejamento digital 3D e técnicas minimamente invasivas para resultados previsíveis e duradouros."
          badges={["20+ anos de experiência", "CRO-RJ 27.509", "iTero Element 5D"]}
          doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
          breadcrumbs={[
            { label: "Início", href: "/" },
            { label: "Tratamentos", href: "/servicos" },
            { label: "Implantes Dentários" }
          ]}
        />

        {/* Quick Answer Box */}
        <section className="py-8 bg-white">
          <div className="container-custom">
            <QuickAnswerBox
              answer="Implantes dentários são raízes artificiais de titânio biocompatível instaladas no osso para substituir dentes perdidos. Na clínica da Dra. Carla Christoph em Ipanema, realizamos planejamento digital 3D com iTero Element 5D, técnicas minimamente invasivas e próteses personalizadas. Com mais de 20 anos de experiência (CRO-RJ 27.509), oferecemos desde implantes unitários até reabilitações completas como All-on-4 e protocolo fixo, com tratamentos que duram de 3 a 6 meses conforme o caso."
            />
          </div>
        </section>

        {/* Seção Empática - EmpatheticPainPoints */}
        <ScrollReveal animation="fade-up">
          <EmpatheticPainPoints
            title="Você se identifica com alguma dessas situações?"
            painPoints={[
              {
                icon: <Shield className="w-6 h-6 text-dental-purple" />,
                strong: "Você evita certos alimentos duros",
                description: "por medo de machucar a gengiva ou de que a prótese móvel saia do lugar?",
                borderColor: "border-dental-purple"
              },
              {
                icon: <AlertCircle className="w-6 h-6 text-dental-gold" />,
                strong: "Sente insegurança com prótese móvel que solta ao falar",
                description: "ou que precisa de adesivo diariamente?",
                borderColor: "border-dental-gold"
              },
              {
                icon: <Activity className="w-6 h-6 text-dental-purple-soft" />,
                strong: "Percebe perda óssea progressiva",
                description: "e teme que a situação piore com o tempo, dificultando o tratamento no futuro?",
                borderColor: "border-dental-purple-soft"
              }
            ]}
            conclusion={<>Implantes dentários devolvem segurança para comer, falar e sorrir sem preocupação.<br className="hidden md:block" /> Vamos avaliar a melhor solução para o seu caso.</>}
            callout={{
              icon: <Clock className="w-5 h-5 text-dental-gold" />,
              title: "Importante",
              text: "A perda óssea acelera após extração — quanto mais tempo sem dente, mais osso é perdido, podendo exigir enxerto. Tratar cedo preserva sua estrutura óssea natural."
            }}
          />
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<Cpu className="w-5 h-5" />} />

        {/* 4 Cards de Modalidades */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Modalidades de Implantes Dentários Disponíveis
              </h2>
              <p className="text-lg text-dental-gray">
                Cada técnica é indicada conforme características individuais. Conheça as opções.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Implante Unitário */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
                <div className="aspect-[5/4] lg:aspect-square relative">
                  <img
                    src="/lovable-uploads/implante-unitario.webp"
                    alt="Implante dentário unitário repondo um dente perdido"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/95 via-dental-purple/70 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white min-h-28 sm:min-h-32 md:min-h-36">
                    <h3 className="text-xl font-display font-bold mb-2">Implante Unitário</h3>
                    <p className="text-sm text-white/90 leading-relaxed line-clamp-4 md:line-clamp-5 lg:line-clamp-6">
                      Substitui um único dente perdido sem comprometer os dentes adjacentes. Pino de titânio + coroa em cerâmica pura para resultado natural e durável.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 relative z-10">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="detalhes" className="border-none">
                      <AccordionTrigger className="text-dental-purple font-semibold hover:no-underline">
                        Ver Detalhes Completos
                      </AccordionTrigger>
                      <AccordionContent className="text-dental-gray space-y-3 pt-2">
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">O que é:</p>
                          <p className="text-sm">Reposição permanente de um único dente perdido sem necessidade de desgastar os dentes vizinhos. O pino de titânio biocompatível é instalado no osso, substituindo a raiz do dente ausente.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">Quando indicado:</p>
                          <p className="text-sm">Perda de um dente por trauma, fratura não restaurável, dente com extração indicada ou ausência congênita de dente.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">Material:</p>
                          <p className="text-sm">Pino de titânio grau médico + coroa em cerâmica e.max ou zircônia, proporcionando resistência e estética natural.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">Tempo:</p>
                          <p className="text-sm">4 a 6 meses, incluindo período de osseointegração.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">Vantagens:</p>
                          <p className="text-sm">Preserva dentes adjacentes saudáveis, estética natural com aspecto de dente real, durabilidade superior a pontes convencionais e conforto total.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* Card 2: Ponte sobre Implantes */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
                <div className="aspect-[5/4] lg:aspect-square relative">
                  <img
                    src="/lovable-uploads/ponte-implante.webp"
                    alt="Ponte fixa sobre implantes dentários substituindo vários dentes"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/95 via-dental-purple/70 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white min-h-28 sm:min-h-32 md:min-h-36">
                    <h3 className="text-xl font-display font-bold mb-2">Ponte sobre Implantes</h3>
                    <p className="text-sm text-white/90 leading-relaxed line-clamp-4 md:line-clamp-5 lg:line-clamp-6">
                      Reabilita múltiplos dentes ausentes adjacentes com dois ou mais implantes. Estabilidade superior às pontes convencionais sem desgaste de dentes saudáveis.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 relative z-10">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="detalhes" className="border-none">
                      <AccordionTrigger className="text-dental-purple font-semibold hover:no-underline">
                        Ver Detalhes Completos
                      </AccordionTrigger>
                      <AccordionContent className="text-dental-gray space-y-3 pt-2">
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">O que é:</p>
                          <p className="text-sm">Dois ou mais implantes sustentam uma ponte fixa de múltiplos dentes consecutivos. Solução ideal quando há perda de 3 ou mais dentes adjacentes.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">Quando indicado:</p>
                          <p className="text-sm">Perda de 3 a 4 dentes consecutivos onde não é necessário um implante para cada dente ausente.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">Material:</p>
                          <p className="text-sm">Implantes de titânio + ponte em zircônia monolítica ou metalocerâmica.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">Tempo:</p>
                          <p className="text-sm">5 a 7 meses.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">Vantagens:</p>
                          <p className="text-sm">Não desgasta dentes naturais, máxima estabilidade mastigatória, conforto total sem próteses removíveis e aspecto extremamente natural.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* Card 3: Protocolo All-on-4/6 */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
                <div className="aspect-[5/4] lg:aspect-square relative">
                  <img
                    src="/lovable-uploads/all-in-4.webp"
                    alt="Protocolo All-on-4 para reabilitação de arcada completa sobre implantes"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/95 via-dental-purple/70 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white min-h-28 sm:min-h-32 md:min-h-36">
                    <h3 className="text-xl font-display font-bold mb-2">Protocolo All-on-4/6</h3>
                    <p className="text-sm text-white/90 leading-relaxed line-clamp-4 md:line-clamp-5 lg:line-clamp-6">
                      Reabilitação total de arcada com apenas 4 a 6 implantes estrategicamente posicionados. Prótese fixa completa com excelente custo-benefício.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 relative z-10">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="detalhes" className="border-none">
                      <AccordionTrigger className="text-dental-purple font-semibold hover:no-underline">
                        Ver Detalhes Completos
                      </AccordionTrigger>
                      <AccordionContent className="text-dental-gray space-y-3 pt-2">
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">O que é:</p>
                          <p className="text-sm">Prótese fixa total de uma arcada completa (superior ou inferior) suportada por 4 a 6 implantes estrategicamente posicionados. Os implantes posteriores são angulados para aproveitar melhor o osso disponível.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">Quando indicado:</p>
                          <p className="text-sm">Perda total ou quase total dos dentes de uma arcada, insatisfação com próteses removíveis (dentaduras) ou casos onde não é viável fazer um implante para cada dente.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">Material:</p>
                          <p className="text-sm">Implantes especiais (alguns angulados) + prótese em acrílico de alta resistência ou zircônia, com barra metálica interna.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">Tempo:</p>
                          <p className="text-sm">Prótese provisória instalada conforme planejamento, prótese definitiva após 4 a 6 meses.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">Vantagens:</p>
                          <p className="text-sm">Excelente custo-benefício por requerer menos implantes. Prótese totalmente fixa, conforto superior às dentaduras, permite mastigar com segurança e devolve a autoconfiança.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* Card 4: Overdenture */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
                <div className="aspect-[5/4] lg:aspect-square relative">
                  <img
                    src="/lovable-uploads/overdenture-clips-retencao.webp"
                    alt="Prótese overdenture removível estabilizada por implantes dentários"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/95 via-dental-purple/70 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white min-h-28 sm:min-h-32 md:min-h-36">
                    <h3 className="text-xl font-display font-bold mb-2">Overdenture</h3>
                    <p className="text-sm text-white/90 leading-relaxed line-clamp-4 md:line-clamp-5 lg:line-clamp-6">
                      Prótese removível com encaixe de precisão sobre 2 a 4 implantes. Estabilidade e retenção superiores às dentaduras convencionais com investimento acessível.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 relative z-10">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="detalhes" className="border-none">
                      <AccordionTrigger className="text-dental-purple font-semibold hover:no-underline">
                        Ver Detalhes Completos
                      </AccordionTrigger>
                      <AccordionContent className="text-dental-gray space-y-3 pt-2">
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">O que é:</p>
                          <p className="text-sm">Prótese total removível que se encaixa com precisão sobre 2 a 4 implantes através de sistemas de clipes (barra ou o'ring). Combina estabilidade dos implantes com a facilidade de remoção para higienização.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">Quando indicado:</p>
                          <p className="text-sm">Quando o paciente busca mais estabilidade que uma dentadura convencional mas prefere uma prótese removível para facilitar a higienização, ou quando o protocolo fixo não é viável.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">Material:</p>
                          <p className="text-sm">2 a 4 implantes de titânio + prótese em acrílico com sistema de encaixe tipo barra ou o'ring (locator).</p>
                        </div>
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">Tempo:</p>
                          <p className="text-sm">4 a 6 meses.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">Vantagens:</p>
                          <p className="text-sm">Muito mais estável que dentadura convencional, não solta ao falar ou mastigar. Removível para higiene facilitada. Investimento menor comparado ao protocolo fixo. Devolve confiança e conforto.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Intermediário - Sprint 6 #5 */}
        <section className="py-8 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-xl text-dental-gray mb-6">
              Quer saber qual modalidade se encaixa no seu caso?
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-dental-gold hover:bg-dental-gold/90 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Agendar Consulta
              <ArrowRight size={20} className="ml-2" />
            </button>
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<Sparkles className="w-5 h-5" />} />

        {/* Seção Diferenciais */}
        <section className="py-12 bg-dental-beige/20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Diferenciais do Nosso Tratamento
              </h2>
              <p className="text-lg text-dental-gray">
                Como trabalhamos para oferecer segurança e previsibilidade
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <Scan className="w-12 h-12 text-dental-purple" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-3">
                    Planejamento Digital 3D
                  </h3>
                  <p className="text-dental-gray">
                    Uso de tecnologias como scanner oral 3D para auxiliar no posicionamento do implante e confecção da prótese.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <Shield className="w-12 h-12 text-dental-purple" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-3">
                    Implantes de Referência
                  </h3>
                  <p className="text-dental-gray">
                    Trabalhamos com marcas de referência mundial, com superfície tratada que favorece a osseointegração e comprovação científica de longo prazo.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <Heart className="w-12 h-12 text-dental-purple" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-3">
                    Acompanhamento Continuado
                  </h3>
                  <p className="text-dental-gray">
                    Protocolo de manutenção personalizado com reavaliações periódicas para garantir saúde peri-implantar e durabilidade máxima.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<Activity className="w-5 h-5" />} />

        {/* Process Timeline */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Jornada do Tratamento: Do Planejamento ao Sorriso Completo
              </h2>
              <p className="text-lg text-dental-gray">
                Cada etapa é cuidadosamente executada para resultados previsíveis
              </p>
            </div>

            <ProcessTimeline
              steps={[
                {
                  number: "1",
                  title: "Consulta Inicial e Solicitação de Exames",
                  description: "Exame clínico completo, digitalização das arcadas com scanner oral 3D, estudo de caso detalhado e solicitação de exames de imagem para planejamento preciso do seu tratamento.",
                  icon: <Scan className="w-6 h-6" />,
                  duration: "1 consulta"
                },
                {
                  number: "2",
                  title: "Instalação dos Implantes com Precisão Milimétrica",
                  description: "Técnica minimamente invasiva quando indicado, reduzindo desconforto e acelerando recuperação. Prótese provisória em casos selecionados, de acordo com o planejamento definido.",
                  icon: <Activity className="w-6 h-6" />,
                  duration: "1-2 horas"
                },
                {
                  number: "3",
                  title: "Período de Osseointegração",
                  description: "Aguardamos a união biológica entre titânio e osso (3 a 6 meses). Durante este período, você utiliza prótese provisória quando necessário. Acompanhamento periódico para monitorar cicatrização e integração.",
                  icon: <Clock className="w-6 h-6" />,
                  duration: "3-6 meses"
                },
                {
                  number: "4",
                  title: "Moldagem Digital e Prótese Definitiva",
                  description: "Moldagem com iTero Element 5D ou convencional. Confecção da prótese definitiva em cerâmica pura com cor, forma e translucidez naturais. Instalação e ajustes finais para conforto e estética natural.",
                  icon: <CheckCircle className="w-6 h-6" />,
                  duration: "2-3 consultas"
                },
                {
                  number: "5",
                  title: "Manutenção e Controle",
                  description: "Protocolo de higienização personalizado e retornos periódicos (6 meses inicialmente). Acompanhamento da saúde peri-implantar, ajustes necessários e orientações para longevidade do tratamento.",
                  icon: <Heart className="w-6 h-6" />,
                  duration: "A cada 6 meses"
                }
              ]}
            />
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<Award className="w-5 h-5" />} />

        <ScrollReveal animation="fade-up">
          <DoctorBioSection 
            sectionTitle="Dra. Carla Christoph"
            doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
            doctorAlt="Dra. Carla Christoph - Especialista em Implantes Dentários em Ipanema"
            doctorName="Dra. Carla Christoph"
            doctorSubtitle="CRO-RJ 27.509 | Especialista em Prótese Dentária e Implantodontia"
            paragraphs={[
              "Com mais de duas décadas em Ipanema, a Dra. Carla construiu sua reputação tratando cada paciente de forma individual, com tempo e atenção. Sua formação inclui 8 anos como dentista militar na Odontoclínica Central da Marinha, experiência que trouxe disciplina e precisão para sua prática clínica.",
              "Sua formação em Implantodontia permite planejar desde casos unitários até reabilitações completas com segurança e previsibilidade. Cada implante é posicionado com base em planejamento digital, considerando estética e função a longo prazo."
            ]}
            credentials={[
              { title: "Formação", description: "Especialista em Prótese Dentária e Implantodontia" },
              { title: "Experiência", description: "20+ anos, incluindo 8 na Marinha" },
              { title: "Tecnologia", description: "iTero Element 5D, planejamento digital do sorriso" },
              { title: "Abordagem", description: "Consultas individualizadas, mínimo de 1 hora" }
            ]}
          />
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<HelpCircle className="w-5 h-5" />} />

        <ScrollReveal animation="fade-up">
          <ServiceFAQ 
            title="Perguntas Frequentes Sobre Implantes Dentários"
            faqs={[
              { question: "O que são implantes dentários?", answer: "São pinos de titânio biocompatível instalados cirurgicamente no osso da mandíbula ou maxila, substituindo a raiz do dente perdido. Sobre estes pinos, fixamos coroas, pontes ou próteses completas, restaurando função mastigatória, estética e fonética." },
              { question: "O procedimento é doloroso?", answer: "A cirurgia é realizada sob anestesia local, com mínimo desconforto durante o procedimento. O pós-operatório é geralmente tranquilo, com desconforto leve controlado por medicação. A maioria dos pacientes retorna às atividades normais em 2 a 3 dias." },
              { question: "Quanto tempo dura o tratamento completo?", answer: "O tempo varia conforme o caso. Em média, de 4 a 6 meses desde a instalação do implante até a prótese definitiva, incluindo o período de osseointegração (3 a 6 meses). Em casos com carga imediata selecionados, a prótese provisória é instalada conforme planejamento." },
              { question: "Qualquer pessoa pode colocar implantes?", answer: "A maioria dos adultos saudáveis é candidata. Avaliamos saúde geral, quantidade e qualidade óssea, hábitos (tabagismo) e condições sistêmicas (diabetes controlado). Em casos de osso insuficiente, enxertos ósseos podem viabilizar o tratamento." },
              { question: "Quanto tempo duram os implantes?", answer: "Com higiene adequada e manutenções regulares, implantes podem durar décadas ou a vida toda. Estudos mostram taxa de sucesso acima de 95% em 10 anos. A coroa protética pode precisar ser substituída após 10 a 15 anos dependendo do desgaste." },
              { question: "Como é a manutenção dos implantes?", answer: "Higienização rigorosa com escova, fio dental e escovas interdentais específicas. Retornos semestrais para controle profissional, radiografias periódicas e avaliação da saúde peri-implantar. Evitar sobrecarga excessiva e trauma." },
              { question: "Existe rejeição de implantes?", answer: "O titânio é biocompatível e não causa rejeição imunológica. Falhas ocorrem por infecção, sobrecarga precoce, tabagismo ou higiene inadequada, não por rejeição. Taxa de sucesso é superior a 95% quando protocolos são seguidos." },
              { question: "Posso fazer se tiver pouco osso?", answer: "Sim. Técnicas de enxerto ósseo (autógeno, biomaterial) ou levantamento de seio maxilar podem aumentar volume ósseo. Implantes curtos ou angulados também são alternativas. Os exames de imagem permitem planejar a melhor solução para cada caso." },
              { question: "Qual a diferença entre implante e prótese?", answer: "O implante é o pino de titânio fixado no osso (substitui a raiz). A prótese é a parte visível (coroa, ponte ou dentadura) que se conecta ao implante. O conjunto completo restaura função e estética." },
              { question: "Fumantes podem fazer implantes?", answer: "Sim, mas o tabagismo reduz a taxa de sucesso (de 95% para aproximadamente 85%) por prejudicar cicatrização e osseointegração. Recomendamos parar de fumar pelo menos 2 semanas antes da cirurgia e durante a cicatrização. Análise individual é essencial." },
              { question: "Diabéticos podem colocar implantes?", answer: "Sim, desde que o diabetes esteja controlado (hemoglobina glicada abaixo de 7%). Análise médica prévia é importante. O controle glicêmico adequado garante cicatrização normal e taxa de sucesso equivalente a não-diabéticos." },
              { question: "Vocês atendem convênios odontológicos?", answer: "Nosso atendimento é particular, o que nos permite dedicar o tempo necessário a cada paciente e utilizar somente materiais de primeira linha. Na primeira consulta, apresentamos um orçamento detalhado e transparente." }
            ]}
          />
        </ScrollReveal>

        <FinalServiceCTA 
          title="Pronto para Recuperar seu Sorriso?"
          description="Agende sua consulta e planejamento digital. Vamos avaliar seu caso de forma personalizada e apresentar as melhores soluções para sua necessidade."
          ctaText="Agendar Consulta"
          whatsappMessage="Olá! Vi a página sobre implantes dentários e gostaria de agendar uma consulta com a Dra. Carla Christoph."
          onClickOverride={handleWhatsAppClick}
          icon={<Smile className="w-8 h-8" />}
          variant="primary"
          phoneNumber="(21) 99330-4045"
          businessHours="segunda a sexta, 9h às 19h"
        />
        <InternalLinkingOptimizer currentPage="implantes-dentarios" />
        <StatsBar />
      </PageLayout>
    </>
  );
};

export default ImplantesDentarios;