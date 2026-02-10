import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import SectionDivider from "@/components/treatment/SectionDivider";
import ProcessTimeline from "@/components/treatment/ProcessTimeline";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Shield, AlertCircle, Activity, ArrowRight, Heart, Search, 
  HelpCircle, CheckCircle
} from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import FastServerResponseOptimizer from '@/components/performance/FastServerResponseOptimizer';
import CriticalCSSOptimizer from '@/components/performance/CriticalCSSOptimizer';

const SaudeDaGengiva = () => {
  useCriticalImagePreload({
    images: [
      { src: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp', width: 1024 }
    ],
    enabled: true
  });

  useScrollTracking({ 
    pagePath: '/saude-da-gengiva',
    enabled: process.env.NODE_ENV === 'production'
  });

  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'CTA Saúde da Gengiva',
        page_type: 'service_page'
      });
    }
    
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function() {
          console.log('Google Ads conversion tracked - Gengiva Service Page');
        }
      });
    }

    await sendGCLIDToWebhook('gengiva_service_page_cta');
    
    const phone = "5521993304045";
    const message = "Olá! Vi a página sobre saúde da gengiva e gostaria de agendar uma avaliação periodontal com a Dra. Carla Christoph.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const faqs = [
    {
      question: "Gengiva que sangra ao escovar é normal?",
      answer: "Não. Sangramento gengival é sinal de inflamação, mesmo que não doa. Pode ser gengivite (reversível) ou periodontite (mais avançada). Vale procurar avaliação para identificar a causa e tratar antes que progrida."
    },
    {
      question: "Periodontite tem cura?",
      answer: "Periodontite é controlável, mas não é 'curável' no sentido de desaparecer sozinha. Com tratamento adequado e manutenção periódica, é possível estabilizar a doença e evitar que progrida. A disciplina nas consultas de manutenção é fundamental."
    },
    {
      question: "Posso fazer lentes ou implantes se tenho problema gengival?",
      answer: "Primeiro é necessário tratar a gengiva. Lentes, facetas e implantes exigem uma base gengival saudável para funcionar bem e durar. A Dra. Carla integra o tratamento periodontal ao planejamento do caso — um passo de cada vez."
    },
    {
      question: "Retração gengival tem tratamento?",
      answer: "Depende da causa e da extensão. Em alguns casos, procedimentos de enxerto gengival podem cobrir a raiz exposta. Em outros, o objetivo é estabilizar a situação e evitar que progrida. A avaliação clínica define a melhor abordagem."
    },
    {
      question: "Com que frequência devo fazer limpeza no dentista?",
      answer: "Para a maioria das pessoas, a cada 6 meses. Pacientes com histórico de doença periodontal podem precisar de intervalos menores — a cada 3 ou 4 meses. A frequência ideal é definida individualmente."
    },
    {
      question: "Mau hálito pode ser problema gengival?",
      answer: "Sim. Mau hálito persistente (halitose) é frequentemente associado a doença periodontal — bactérias acumuladas em bolsas gengivais produzem compostos com odor. Se o mau hálito não melhora com higiene oral cuidadosa, vale investigar."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Saúde da Gengiva em Ipanema | Dra. Carla Christoph</title>
        <meta name="description" content="Tratamento periodontal em Ipanema com acompanhamento integrado. Gengivite, periodontite e retração gengival. Dra. Carla Christoph, CRO-RJ 27.509." />
        <meta name="keywords" content="saúde da gengiva ipanema, periodontia rio de janeiro, gengivite tratamento, periodontite zona sul, gengiva sangrando dentista ipanema" />
        <link rel="canonical" href="https://www.dracarlachristoph.com/saude-da-gengiva" />
        
        <meta property="og:title" content="Saúde da Gengiva em Ipanema | Periodontia com Acompanhamento" />
        <meta property="og:description" content="Tratamento periodontal com acompanhamento integrado da Dra. Carla Christoph em Ipanema." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dracarlachristoph.com/saude-da-gengiva" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Tratamento Periodontal (Saúde da Gengiva)",
            "description": "Diagnóstico e tratamento de doenças gengivais com acompanhamento integrado ao plano de tratamento completo",
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

      <FastServerResponseOptimizer />
      <CriticalCSSOptimizer
        inlineStyles={`
          .treatment-hero { min-height: 60vh; }
          .container-custom { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        `}
      />

      <PageLayout>
        {/* 1. Hero */}
        <TreatmentHero
          title="Saúde da Gengiva em Ipanema"
          subtitle="Periodontia com Acompanhamento da Dra. Carla Christoph"
          description="Gengiva saudável é a base de qualquer tratamento odontológico. Sangramentos, retração e mau hálito persistente merecem atenção antes que se tornem problemas maiores."
          badges={["Saúde Periodontal", "Acompanhamento Integrado", "CRO-RJ 27.509"]}
          doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
          breadcrumbs={[
            { label: "Início", href: "/" },
            { label: "Tratamentos", href: "/servicos" },
            { label: "Saúde da Gengiva" }
          ]}
        />

        {/* 2. SectionDivider */}
        <SectionDivider variant="with-icon" icon={<AlertCircle size={20} />} />

        {/* 3. Seção empática */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Sinais que Muita Gente Ignora
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6 text-dental-gray leading-relaxed">
              <p>
                Gengiva que sangra ao escovar ou passar o fio dental não é normal. Muita gente convive com isso por anos achando que é "assim mesmo", mas sangramento gengival é sinal de inflamação — e quando não tratada, pode evoluir para perda óssea e até perda de dentes.
              </p>
              <p>
                A periodontite é silenciosa. Não costuma doer nos estágios iniciais, o que faz com que muitos pacientes só procurem ajuda quando o problema já está avançado. A boa notícia: quando identificada cedo, é tratável e controlável.
              </p>
              <p>
                Se você percebe sangramento, mau hálito persistente, gengiva retraída ou dentes que parecem "mais longos" do que antes, vale agendar uma avaliação.
              </p>
            </div>
          </div>
        </section>

        {/* 4. SectionDivider */}
        <SectionDivider variant="with-icon" icon={<Shield size={20} />} />

        {/* 5. 3 cards */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-4 text-center text-dental-purple">
              Problemas Gengivais Mais Comuns
            </h2>
            <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">
              Entenda o que cada sinal pode significar
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-dental-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-dental-purple" />
                </div>
                <h3 className="text-xl font-semibold text-dental-purple mb-3">
                  Gengivite
                </h3>
                <p className="text-dental-gray">
                  Inflamação inicial da gengiva. Sangramento ao escovar, vermelhidão e inchaço. Reversível com tratamento adequado e boa higiene. Não causa perda óssea.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-dental-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-dental-gold" />
                </div>
                <h3 className="text-xl font-semibold text-dental-purple mb-3">
                  Periodontite
                </h3>
                <p className="text-dental-gray">
                  Evolução da gengivite quando não tratada. Afeta o osso de suporte dos dentes. Pode causar mobilidade dentária e, em casos avançados, perda de dentes. Controlável, mas exige acompanhamento.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-dental-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-8 h-8 text-dental-purple" />
                </div>
                <h3 className="text-xl font-semibold text-dental-purple mb-3">
                  Retração Gengival
                </h3>
                <p className="text-dental-gray">
                  A gengiva se retrai, expondo parte da raiz do dente. Causa sensibilidade e altera a estética do sorriso. Pode estar associada a escovação agressiva, bruxismo ou doença periodontal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Seção diferencial — Especialista */}
        <section className="py-16 bg-gradient-purple-soft">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center text-dental-purple">
              Gengiva Saudável é Pré-Requisito
            </h2>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-[300px,1fr] gap-8 items-start">
                <div className="mx-auto md:mx-0">
                  <div className="relative">
                    <img
                      src="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
                      alt="Dra. Carla Christoph - Acompanhamento Integrado em Saúde Gengival"
                      className="w-full rounded-2xl shadow-elegant"
                    />
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-dental-gold text-white px-6 py-2 rounded-full shadow-gold font-semibold text-sm whitespace-nowrap">
                      Cuidado Integrado
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-soft">
                  <div className="mb-6">
                    <h3 className="text-3xl font-display font-semibold text-dental-purple mb-2">
                      Dra. Carla Christoph
                    </h3>
                    <p className="text-dental-gold-dark font-medium text-lg">
                      CRO-RJ 27.509 | Especialista em Prótese Dentária e Implantodontia
                    </p>
                  </div>
                  
                  <div className="space-y-4 text-dental-gray leading-relaxed">
                    <p>
                      Com mais de duas décadas em Ipanema, a Dra. Carla construiu sua reputação tratando cada paciente de forma individual, com tempo e atenção. Sua formação inclui 8 anos como dentista militar na Odontoclínica Central da Marinha, experiência que trouxe disciplina e precisão para sua prática clínica.
                    </p>
                    <p>
                      A Dra. Carla trata a saúde periodontal como base para qualquer procedimento. Não faz sentido investir em lentes, implantes ou prótese sobre uma gengiva comprometida. O tratamento periodontal é feito em parceria com periodontista especializado, e a Dra. Carla acompanha toda a evolução para integrar o cuidado gengival ao plano de tratamento completo do paciente.
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-dental-gray/20">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-dental-gold mt-1" size={20} />
                        <div>
                          <p className="font-semibold text-dental-purple">Visão integrada</p>
                          <p className="text-sm text-dental-gray">Saúde gengival como base para qualquer tratamento estético</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-dental-gold mt-1" size={20} />
                        <div>
                          <p className="font-semibold text-dental-purple">Parceria especializada</p>
                          <p className="text-sm text-dental-gray">Tratamento com periodontista e acompanhamento da Dra. Carla</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-dental-gold mt-1" size={20} />
                        <div>
                          <p className="font-semibold text-dental-purple">Experiência</p>
                          <p className="text-sm text-dental-gray">20+ anos, incluindo 8 na Marinha</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-dental-gold mt-1" size={20} />
                        <div>
                          <p className="font-semibold text-dental-purple">Abordagem</p>
                          <p className="text-sm text-dental-gray">Consultas individualizadas, mínimo de 1 hora</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. SectionDivider + ProcessTimeline */}
        <SectionDivider variant="with-icon" icon={<Search size={20} />} />

        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-4 text-center text-dental-purple">
              Como Cuidamos da Saúde da Sua Gengiva
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <ProcessTimeline
                steps={[
                  {
                    number: 1,
                    title: "Avaliação com a Dra. Carla",
                    description: "Exame clínico detalhado da gengiva, sondagem periodontal e radiografias quando necessário. Identificação do estágio do problema.",
                    icon: <Search size={24} />,
                    duration: "1ª Consulta"
                  },
                  {
                    number: 2,
                    title: "Tratamento Periodontal",
                    description: "Limpeza profunda (raspagem), tratamento com periodontista especializado quando indicado. Controle da infecção e inflamação.",
                    icon: <Shield size={24} />,
                    duration: "1-4 sessões"
                  },
                  {
                    number: 3,
                    title: "Reavaliação",
                    description: "Após o tratamento, a Dra. Carla reavalia a resposta da gengiva e define os próximos passos — manutenção, tratamentos complementares ou encaminhamento para procedimentos estéticos.",
                    icon: <CheckCircle size={24} />,
                    duration: "30-45 dias"
                  },
                  {
                    number: 4,
                    title: "Manutenção Periódica",
                    description: "A doença periodontal é controlável, mas exige acompanhamento. Consultas regulares de manutenção previnem recidivas e mantêm a saúde gengival.",
                    icon: <Heart size={24} />,
                    duration: "A cada 3-6 meses"
                  }
                ]}
              />
            </div>
          </div>
        </section>

        {/* 8. Seção informativa */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              A Relação entre Gengiva e Saúde Geral
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6 text-dental-gray leading-relaxed">
              <p>
                A saúde da gengiva está conectada à saúde do corpo como um todo. Estudos mostram associação entre doença periodontal e condições como diabetes, doenças cardiovasculares e complicações na gestação. Tratar a gengiva não é apenas uma questão estética — é um cuidado com a saúde sistêmica.
              </p>
              <p>
                Na prática, o que mais vemos no consultório são pacientes que conviviam com sangramento gengival há anos sem perceber a gravidade. Após o tratamento, relatam não apenas a melhora na boca, mas a sensação geral de cuidado com a saúde que estavam adiando.
              </p>
            </div>
          </div>
        </section>

        {/* 9. SectionDivider + FAQ */}
        <SectionDivider variant="with-icon" icon={<HelpCircle size={20} />} />

        <section className="py-16 bg-dental-beige/20">
          <div className="container-custom">
            <h2 className="heading-lg mb-8 text-center text-dental-purple">
              Dúvidas sobre Saúde da Gengiva
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

        {/* 10. CTA Final */}
        <section className="py-20 bg-gradient-purple-gold text-white">
          <div className="container-custom text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-dental-gold" />
              <h2 className="heading-lg">
                Cuide da Base do Seu Sorriso
              </h2>
            </div>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Agende sua avaliação periodontal. Tratamento precoce faz toda a diferença.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={handleWhatsAppClick}
                className="bg-dental-gold text-dental-purple px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all inline-flex items-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                Agendar Avaliação
              </button>
            </div>
            
            <p className="mt-6 text-sm opacity-75">
              WhatsApp: (21) 99330-4045 | Atendimento 24h
            </p>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default SaudeDaGengiva;
