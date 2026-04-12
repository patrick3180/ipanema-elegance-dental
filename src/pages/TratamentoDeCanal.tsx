import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import StatsBar from "@/components/treatment/StatsBar";
import SectionDivider from "@/components/treatment/SectionDivider";
import ProcessTimeline from "@/components/treatment/ProcessTimeline";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import DoctorBioSection from "@/components/treatment/DoctorBioSection";
import EmpatheticPainPoints from "@/components/treatment/EmpatheticPainPoints";
import ServiceFAQ from "@/components/treatment/ServiceFAQ";
import FinalServiceCTA from "@/components/treatment/FinalServiceCTA";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Shield, AlertCircle, Zap, Sparkles, Heart, Search,
  HelpCircle, CheckCircle, ArrowRight
} from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import FastServerResponseOptimizer from '@/components/performance/FastServerResponseOptimizer';
import CriticalCSSOptimizer from '@/components/performance/CriticalCSSOptimizer';
import { InternalLinkingOptimizer } from '@/components/seo/InternalLinkingOptimizer';

const TratamentoDeCanal = () => {
  // Critical image preload
  useCriticalImagePreload({
    images: [
      { src: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp', width: 1024 }
    ],
    enabled: true
  });

  // Scroll tracking
  useScrollTracking({
    pagePath: '/tratamento-de-canal',
    enabled: process.env.NODE_ENV === 'production'
  });

  const handleWhatsAppClick = async () => {
    // GTM tracking
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'CTA Tratamento de Canal',
        page_type: 'service_page'
      });
    }

    // Google Ads conversion
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function () {
          console.log('Google Ads conversion tracked - Canal Service Page');
        }
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook('canal_service_page_cta');

    // Open WhatsApp
    const phone = "5521993304045";
    const message = "Olá! Vi a página sobre tratamento de canal e gostaria de agendar uma consulta com a Dra. Carla Christoph.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // FAQ data
  const faqs = [
    {
      question: "Tratamento de canal dói?",
      answer: "Com a anestesia atual, o procedimento é confortável e bem tolerado. O que costuma causar dor é a infecção que levou à necessidade do canal. O tratamento justamente alivia essa dor. No pós-operatório, pode haver sensibilidade leve por alguns dias, controlada com medicação simples."
    },
    {
      question: "Quantas sessões são necessárias?",
      answer: "Na maioria dos casos, 1 a 2 sessões. Depende da complexidade do caso — dentes com mais canais ou infecções mais extensas podem precisar de sessões adicionais. O endodontista avalia e informa antes de iniciar."
    },
    {
      question: "O dente fica frágil depois do canal?",
      answer: "O dente perde a nutrição interna, o que pode torná-lo mais suscetível a fraturas ao longo do tempo. Por isso a restauração adequada é fundamental. Dependendo do caso, a Dra. Carla pode indicar uma coroa para proteger o dente de forma duradoura."
    },
    {
      question: "O dente escurece depois do canal?",
      answer: "Pode acontecer com o tempo, mas não é regra. Quando ocorre, existem opções para resolver — desde clareamento interno até faceta ou coroa. A Dra. Carla avalia a melhor solução durante o acompanhamento."
    },
    {
      question: "Qual a alternativa ao tratamento de canal?",
      answer: "A alternativa seria a extração do dente. Mas sempre que possível, preservar o dente natural é a melhor escolha — evita a necessidade de implante ou prótese e mantém a estrutura original da boca."
    },
    {
      question: "Vocês atendem convênios?",
      answer: "Nosso atendimento é particular, o que nos permite dedicar o tempo necessário a cada caso e trabalhar com profissionais parceiros selecionados. Na consulta, apresentamos o planejamento completo."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Tratamento de Canal em Ipanema | Dra. Carla Christoph</title>
        <meta name="description" content="Tratamento de canal em Ipanema com acompanhamento completo. Endodontista especializado e finalização pela Dra. Carla Christoph. CRO-RJ 27.509." />
        <meta name="keywords" content="tratamento de canal ipanema, endodontia rio de janeiro, canal dentário zona sul, dor de dente ipanema, dentista canal ipanema" />
        <link rel="canonical" href="https://dracarlachristoph.com/tratamento-de-canal" />

        {/* Open Graph */}
        <meta property="og:title" content="Tratamento de Canal em Ipanema | Acompanhamento Completo" />
        <meta property="og:description" content="Tratamento de canal com acompanhamento individualizado e finalização pela Dra. Carla Christoph em Ipanema." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/tratamento-de-canal" />

        {/* Schema MedicalProcedure */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Tratamento de Canal (Endodontia)",
            "description": "Tratamento endodôntico com acompanhamento completo e finalização restauradora",
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

        {/* Schema FAQPage */}
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
        {/* 1. Hero Section */}
        <TreatmentHero
          title="Tratamento de Canal em Ipanema"
          subtitle="Acompanhamento Completo com a Dra. Carla Christoph"
          description="Um procedimento com fama injusta. Com profissionais experientes e acompanhamento individualizado, tratamento de canal é mais tranquilo do que se imagina."
          badges={["Acompanhamento Completo", "Endodontista Especializado", "CRO-RJ 27.509"]}
          doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
          breadcrumbs={[
            { label: "Início", href: "/" },
            { label: "Tratamentos", href: "/servicos" },
            { label: "Tratamento de Canal" }
          ]}
        />

        {/* Quick Answer Box */}
        <ScrollReveal animation="fade-up">
          <section className="py-8 bg-white">
            <div className="container-custom">
              <QuickAnswerBox
                answer="Tratamento de canal (endodontia) remove a polpa infectada do dente, aliviando a dor e salvando o dente da extração. No consultório da Dra. Carla Christoph em Ipanema (CRO-RJ 27.509), o tratamento é realizado com endodontista especializado e finalizado pela Dra. Carla. O procedimento é confortável com anestesia moderna, geralmente completado em 1-2 sessões. Após o canal, recomenda-se restauração adequada ou coroa para proteger o dente, que pode durar muitos anos com os cuidados corretos."
              />
            </div>
          </section>
        </ScrollReveal>

        {/* 2. SectionDivider */}
        <SectionDivider variant="with-icon" icon={<Shield size={20} />} />

        {/* 3. Seção empática - EmpatheticPainPoints */}
        <ScrollReveal animation="fade-up">
          <EmpatheticPainPoints
            title="Tratamento de canal não precisa ser assustador"
            painPoints={[
              {
                icon: <Shield className="w-6 h-6 text-dental-purple" />,
                strong: "Medo de sentir dor durante o procedimento",
                description: "Com anestesia moderna e técnicas atualizadas, o procedimento é tranquilo. O que dói é a infecção — o canal justamente alivia essa dor.",
                borderColor: "border-dental-purple"
              },
              {
                icon: <AlertCircle className="w-6 h-6 text-dental-gold" />,
                strong: "Adiando há meses por insegurança",
                description: "Adiar pode transformar um tratamento simples em algo mais complexo. Quanto antes diagnosticado, maior a chance de preservar o dente.",
                borderColor: "border-dental-gold"
              },
              {
                icon: <Heart className="w-6 h-6 text-dental-purple-soft" />,
                strong: "Precisa de acompanhamento completo",
                description: "Do diagnóstico à restauração final, a Dra. Carla coordena toda a jornada com endodontista especializado.",
                borderColor: "border-dental-purple-soft"
              }
            ]}
            conclusion={<>O tratamento de canal moderno é muito mais confortável do que se imagina.<br className="hidden md:block" /> Dê o primeiro passo: agende sua consulta.</>}
          />
        </ScrollReveal>

        {/* 4. SectionDivider */}
        <SectionDivider variant="with-icon" icon={<AlertCircle size={20} />} />

        {/* 5. Seção de situações — 3 cards */}
        <ScrollReveal animation="fade-up">
          <section className="py-16 bg-white">
            <div className="container-custom">
              <h2 className="heading-lg mb-4 text-center text-dental-purple">
                Quando o Tratamento de Canal é Necessário
              </h2>
              <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">
                Sinais que merecem atenção
              </p>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    icon: <Zap className="w-8 h-8 text-dental-purple" />,
                    iconBg: "bg-dental-purple/10",
                    title: "Dor Persistente",
                    text: "Dor de dente espontânea, latejante ou que piora com calor. Sensibilidade prolongada que não passa. São sinais de que a polpa do dente pode estar comprometida."
                  },
                  {
                    icon: <AlertCircle className="w-8 h-8 text-dental-gold" />,
                    iconBg: "bg-dental-gold/10",
                    title: "Inchaço ou Abscesso",
                    text: "Gengiva inchada perto de um dente, presença de pus ou fístula. Indica infecção que precisa de tratamento para não se espalhar."
                  },
                  {
                    icon: <Sparkles className="w-8 h-8 text-dental-purple" />,
                    iconBg: "bg-dental-purple/10",
                    title: "Dente Escurecido",
                    text: "Um dente que escureceu após trauma ou cárie profunda pode ter a polpa comprometida. O canal trata a causa e permite restaurar a aparência do dente."
                  }
                ].map((card, i) => (
                  <ScrollReveal key={i} animation="fade-up" delay={i * 150}>
                    <div className="text-center">
                      <div className={`w-16 h-16 ${card.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        {card.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-dental-purple mb-3">
                        {card.title}
                      </h3>
                      <p className="text-dental-gray">{card.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* CTA Intermediário */}
        <ScrollReveal animation="scale-in">
          <section className="py-8 bg-dental-beige/30">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <p className="text-xl text-dental-gray mb-6">
                Está com um desses sintomas?
              </p>
              <a
                href="https://wa.me/5521993304045?text=Olá!%20Estou%20com%20sintomas%20que%20podem%20indicar%20necessidade%20de%20tratamento%20de%20canal.%20Gostaria%20de%20agendar%20uma%20consulta%20de%20urgência."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Agendar Consulta de Urgência
                <ArrowRight size={20} className="ml-2" />
              </a>
            </div>
          </section>
        </ScrollReveal>

        {/* 6. Doctor Bio — now using shared component */}
        <ScrollReveal animation="fade-up">
          <DoctorBioSection
            sectionTitle="Por Que Tratar com a Dra. Carla Christoph"
            badgeText="Jornada Completa"
            paragraphs={[
              "Com mais de duas décadas em Ipanema, a Dra. Carla construiu sua reputação tratando cada paciente de forma individual, com tempo e atenção. Sua formação inclui 8 anos como dentista militar na Odontoclínica Central da Marinha, experiência que trouxe disciplina e precisão para sua prática clínica.",
              "No tratamento de canal, a Dra. Carla acompanha pessoalmente cada etapa e é responsável pela finalização: restauração direta, coroa ou prótese. Você tem uma profissional cuidando de toda a sua jornada — do diagnóstico ao resultado final."
            ]}
            credentials={[
              { title: "Coordenação", description: "Acompanhamento pessoal de toda a jornada do tratamento" },
              { title: "Finalização", description: "Restauração, coroa ou prótese feitas pela Dra. Carla" },
              { title: "Experiência", description: "20+ anos, incluindo 8 na Marinha" },
              { title: "Abordagem", description: "Consultas individualizadas, mínimo de 1 hora" }
            ]}
          />
        </ScrollReveal>

        {/* 7. SectionDivider + ProcessTimeline */}
        <SectionDivider variant="with-icon" icon={<Search size={20} />} />

        <ScrollReveal animation="fade-up">
          <section className="py-16 bg-white">
            <div className="container-custom">
              <h2 className="heading-lg mb-4 text-center text-dental-purple">
                Como Funciona o Tratamento de Canal no Consultório
              </h2>

              <div className="max-w-4xl mx-auto">
                <ProcessTimeline
                  steps={[
                    {
                      number: 1,
                      title: "Diagnóstico com a Dra. Carla",
                      description: "Exame clínico, radiografia e análise do caso. A Dra. Carla identifica o problema e explica o que precisa ser feito.",
                      icon: <Search size={24} />,
                      duration: "1ª Consulta"
                    },
                    {
                      number: 2,
                      title: "Tratamento com Endodontista",
                      description: "O procedimento é realizado por endodontista especializado, com anestesia local. A Dra. Carla acompanha pessoalmente.",
                      icon: <Shield size={24} />,
                      duration: "1-2 sessões"
                    },
                    {
                      number: 3,
                      title: "Restauração pela Dra. Carla",
                      description: "Após o canal, a Dra. Carla finaliza o dente — com restauração direta em resina, coroa ou a solução mais indicada para o seu caso.",
                      icon: <Sparkles size={24} />,
                      duration: "Finalização"
                    },
                    {
                      number: 4,
                      title: "Acompanhamento",
                      description: "Consultas de controle para garantir que o dente tratado está saudável e a restauração está íntegra.",
                      icon: <Heart size={24} />,
                      duration: "Periódico"
                    }
                  ]}
                />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 8. Seção informativa */}
        <ScrollReveal animation="fade-up">
          <section className="py-16 bg-white">
            <div className="container-custom">
              <h2 className="heading-lg mb-8 text-center text-dental-purple">
                O Que Acontece Durante o Procedimento
              </h2>

              <div className="max-w-3xl mx-auto space-y-6 text-dental-gray leading-relaxed">
                <p>
                  O tratamento de canal consiste em remover a polpa do dente — o tecido interno que contém nervos e vasos — quando ela está inflamada ou infectada. Com o dente anestesiado, o endodontista acessa o interior, limpa e desinfeta os canais, e os preenche com material biocompatível. O procedimento geralmente leva de 1 a 2 sessões, e o dente é então restaurado pela Dra. Carla para recuperar forma, função e aparência.
                </p>
                <p>
                  Na prática clínica, o que mais vemos é pacientes que chegam tensos e saem aliviados — tanto pela dor que passa quanto por descobrirem que o procedimento foi muito mais tranquilo do que imaginavam.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 9. SectionDivider + FAQ — now using shared component */}
        <SectionDivider variant="with-icon" icon={<HelpCircle size={20} />} />

        <ScrollReveal animation="fade-up">
          <ServiceFAQ
            title="Dúvidas Sobre Tratamento de Canal"
            faqs={faqs}
          />
        </ScrollReveal>

        {/* 10. CTA Final — now using shared component */}
        <FinalServiceCTA
          icon={<Shield className="w-8 h-8" />}
          title="Dor de Dente Precisa de Atenção"
          description="Agende sua consulta. Quanto antes o diagnóstico, mais simples tende a ser o tratamento."
          ctaText="Agendar Consulta"
          whatsappMessage="Olá! Vi a página sobre tratamento de canal e gostaria de agendar uma consulta com a Dra. Carla Christoph."
          onClickOverride={handleWhatsAppClick}
        />
        <InternalLinkingOptimizer currentPage="tratamento-de-canal" />
        <StatsBar />
      </PageLayout>
    </>
  );
};

export default TratamentoDeCanal;
