import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import StatsBar from "@/components/treatment/StatsBar";
import SectionDivider from "@/components/treatment/SectionDivider";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import ComparisonTable from "@/components/blog/ComparisonTable";
import DoctorBioSection from "@/components/treatment/DoctorBioSection";
import EmpatheticPainPoints from "@/components/treatment/EmpatheticPainPoints";
import ServiceFAQ from "@/components/treatment/ServiceFAQ";
import FinalServiceCTA from "@/components/treatment/FinalServiceCTA";
import ScrollReveal from "@/components/ScrollReveal";
import { ComparisonTableItem } from "@/types/BlogPost";
import { CheckCircle, Star, ArrowRight, Clock, Sparkles, Shield, Heart, Award, Zap, Calendar, AlertCircle } from "lucide-react";
import { InternalLinkingOptimizer } from '@/components/seo/InternalLinkingOptimizer';
import { sendGCLIDToWebhook } from "@/utils/gclid";
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import FastServerResponseOptimizer from '@/components/performance/FastServerResponseOptimizer';
import CriticalCSSOptimizer from '@/components/performance/CriticalCSSOptimizer';

const Ortodontia = () => {
  // Preload Hero Image
  useCriticalImagePreload({ images: [{ src: '/lovable-uploads/DrBruno_site.webp', width: 1024 }], enabled: true });
  
  // Track scroll depth
  useScrollTracking({ pagePath: '/ortodontia', enabled: process.env.NODE_ENV === 'production' });

  const handleWhatsAppClick = async () => {
    if (window.dataLayer) { 
      window.dataLayer.push({ 
        event: 'whatsapp_click', 
        event_category: 'Contact', 
        event_action: 'Click', 
        event_label: 'CTA Ortodontia', 
        page_type: 'service_page' 
      }); 
    }
    if (window.gtag) { 
      window.gtag('event', 'conversion', { 
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9', 
        'event_callback': function () { console.log('Google Ads conversion tracked - Ortodontia Page'); } 
      }); 
    }
    await sendGCLIDToWebhook('ortodontia_service_page_cta');
    const phone = "5521993304045";
    const message = "Olá! Gostaria de agendar uma avaliação ortodôntica com o Dr. Bruno.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const caseImages = null;
  
  const comparisonData: ComparisonTableItem[] = [
    {
      "Criterio": "Critério",
      "Critério": "Critério",
      "Rótulo coluna A": "Invisalign®",
      "Rótulo coluna B": "Aparelho Estético",
      "Rótulo coluna C": "Aparelho Tradicional"
    },
    {
      "Criterio": "Visibilidade",
      "Rótulo coluna A": "Praticamente invisível",
      "Rótulo coluna B": "Discreto (brackets transparentes)",
      "Rótulo coluna C": "Visível (brackets metálicos)"
    },
    {
      "Criterio": "Removível",
      "Rótulo coluna A": "Sim - para comer e higiene",
      "Rótulo coluna B": "Não - fixo nos dentes",
      "Rótulo coluna C": "Não - fixo nos dentes"
    },
    {
      "Criterio": "Conforto",
      "Rótulo coluna A": "Máximo - sem fios ou brackets",
      "Rótulo coluna B": "Moderado - brackets suaves",
      "Rótulo coluna C": "Básico - pode causar aftas"
    },
    {
      "Criterio": "Higienização",
      "Rótulo coluna A": "Fácil - remove para escovar",
      "Rótulo coluna B": "Requer cuidado extra",
      "Rótulo coluna C": "Requer cuidado extra"
    },
    {
      "Criterio": "Tempo de Tratamento",
      "Rótulo coluna A": "6-18 meses (casos simples)",
      "Rótulo coluna B": "12-24 meses",
      "Rótulo coluna C": "12-24 meses"
    },
    {
      "Criterio": "Consultas",
      "Rótulo coluna A": "A cada 6-8 semanas",
      "Rótulo coluna B": "Mensal",
      "Rótulo coluna C": "Mensal"
    },
    {
      "Criterio": "Indicação Principal",
      "Rótulo coluna A": "Adultos, casos estéticos",
      "Rótulo coluna B": "Jovens e adultos",
      "Rótulo coluna C": "Todos os casos"
    }
  ];

  const faqs = [
    {
      question: "Como funciona o tratamento ortodôntico no consultório da Dra. Carla?",
      answer: "O consultório da Dra. Carla Christoph oferece tratamento ortodôntico especializado através do Dr. Bruno Moreira das Neves, ortodontista com doutorado pela UERJ. A Dra. Carla acompanha toda a jornada do paciente, garantindo atendimento integrado e personalizado."
    },
    {
      question: "Quanto tempo dura o tratamento com Invisalign®?",
      answer: "O tratamento com Invisalign® geralmente dura entre 6 a 18 meses para casos simples a moderados, podendo estender-se até 24 meses em casos complexos. Com o iTero Element 5D, conseguimos simular digitalmente o resultado e estimar com precisão o tempo necessário."
    },
    {
      question: "Qual a idade ideal para começar o tratamento ortodôntico?",
      answer: "A primeira avaliação ortodôntica é recomendada aos 7 anos para identificar problemas precocemente. Para aparelho fixo, a idade ideal é entre 11-14 anos. Adultos de qualquer idade podem fazer ortodontia - temos pacientes acima de 60 anos."
    },
    {
      question: "O tratamento ortodôntico dói?",
      answer: "É normal sentir pressão leve nos primeiros 2-3 dias após colocar um novo alinhador Invisalign® ou após ajustes do aparelho fixo. O desconforto é temporário e facilmente controlado com analgésicos simples se necessário."
    },
    {
      question: "Posso comer de tudo com aparelho ortodôntico?",
      answer: "Com Invisalign®, você remove os alinhadores para comer, podendo desfrutar de qualquer alimento sem restrições. Com aparelho fixo (estético ou tradicional), deve-se evitar alimentos duros e pegajosos."
    },
    {
      question: "Como funciona o iTero Element 5D?",
      answer: "O iTero Element 5D elimina a necessidade das moldagens com massa. Em poucos minutos, criamos um modelo 3D ultra-preciso dos seus dentes, e você visualiza imediatamente uma simulação do resultado esperado."
    },
    {
      question: "Qual a diferença entre aparelho estético e tradicional?",
      answer: "O aparelho estético usa brackets transparentes, sendo muito mais discreto. Ambos têm a mesma eficácia, mas o estético oferece melhor aparência. O tradicional é mais resistente e tem custo menor."
    },
    {
      question: "O que é contenção e por que é importante?",
      answer: "A contenção é fundamental para manter os resultados após o tratamento. Oferecemos contenção fixa e/ou removível, garantindo que seus dentes permaneçam alinhados permanentemente."
    },
    {
      question: "O Invisalign® funciona para casos complexos?",
      answer: "Sim! O Invisalign® evoluiu muito e hoje trata desde casos simples até complexos, incluindo mordidas cruzadas e apinhamento severo. Com a experiência do Dr. Bruno, conseguimos resolver a maioria dos casos."
    },
    {
      question: "Como é o acompanhamento durante o tratamento?",
      answer: "Realizamos consultas regulares para monitorar progresso e fazer ajustes necessários. A Dra. Carla e o Dr. Bruno trabalham em conjunto, garantindo atendimento sem pressa e atenção aos detalhes."
    },
    {
      question: "Qual o investimento para o tratamento ortodôntico?",
      answer: "O investimento varia conforme o tipo de aparelho e complexidade do caso. Oferecemos planos de pagamento facilitados e condições especiais. Fazemos o orçamento personalizado na avaliação."
    },
    {
      question: "Posso trocar de aparelho fixo para Invisalign® durante o tratamento?",
      answer: "Sim, é possível fazer a transição se você não está satisfeito com o aparelho fixo. O Dr. Bruno avaliará seu caso e determinará o melhor momento para a mudança visando mais conforto e estética."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Ortodontia e Invisalign® em Ipanema | Dra. Carla Christoph</title>
        <meta 
          name="description" 
          content="Ortodontia moderna em Ipanema com Dr. Bruno Moreira (Doutor UERJ) no consultório da Dra. Carla Christoph. Invisalign®, aparelho estético e iTero Element 5D."
        />
        <meta 
          name="keywords" 
          content="ortodontia ipanema, invisalign ipanema, aparelho transparente, aparelho estético, ortodontista ipanema, dr bruno moreira, dra carla christoph"
        />
        <link rel="canonical" href="https://dracarlachristoph.com/ortodontia" />
        
        <meta property="og:title" content="Ortodontia e Invisalign® em Ipanema | Dra. Carla Christoph" />
        <meta property="og:description" content="Ortodontia moderna em Ipanema com Dr. Bruno Moreira, especialista com doutorado UERJ. Invisalign® e tecnologia iTero." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/ortodontia" />
        <meta property="og:image" content="https://dracarlachristoph.com/og-ortodontia.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Tratamento Ortodôntico",
            "description": "Correção do posicionamento dos dentes e maxilares usando aparelhos ortodônticos ou alinhadores invisíveis",
            "procedureType": "Orthodontic",
            "bodyLocation": "Teeth and Jaw",
            "followup": "Consultas mensais e contenção pós-tratamento",
            "howPerformed": "Aparelhos fixos, estéticos ou alinhadores removíveis Invisalign com planejamento digital",
            "preparation": "Avaliação clínica, radiografias e escaneamento com iTero Element 5D",
            "provider": [
              {
                "@type": "Dentist",
                "name": "Dra. Carla Christoph",
                "identifier": "CRO-RJ 27.509"
              },
              {
                "@type": "Dentist", 
                "name": "Dr. Bruno Moreira das Neves",
                "identifier": "CRO-RJ 41.684",
                "description": "Ortodontista especialista, Doutor pela UERJ"
              }
            ],
            "typicalAgeRange": "7-99"
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
        {/* Treatment Hero substituting simple Hero */}
        <TreatmentHero
          title="Ortodontia Moderna em Ipanema"
          subtitle="Alinhe seu Sorriso com Tecnologia e Expertise"
          description="Tratamento ortodôntico especializado utilizando tecnologia avançada como iTero Element 5D e Invisalign® para conforto e precisão no seu tratamento."
          badges={["Invisalign®", "Doutor UERJ", "iTero Element 5D"]}
          doctorImage="/lovable-uploads/DrBruno_site.webp"
          breadcrumbs={[
            { label: "Início", href: "/" },
            { label: "Tratamentos", href: "/servicos" },
            { label: "Ortodontia" }
          ]}
        />

        <ScrollReveal animation="fade-up">
          <section className="py-8 bg-white">
            <div className="container-custom">
              <QuickAnswerBox
                answer="Ortodontia é a especialidade que corrige a posição dos dentes. No consultório da Dra. Carla, o tratamento é realizado pelo Dr. Bruno Moreira, ortodontista com doutorado (UERJ). A Dra. Carla acompanha a jornada do paciente, garantindo integração. Usamos iTero Element 5D para planejamento e oferecemos Invisalign® ou aparelhos estéticos com durabilidade entre 6 a 24 meses."
              />
            </div>
          </section>
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<AlertCircle size={20} />} />

        {/* Empathetic Section */}
        <ScrollReveal animation="fade-up">
          <EmpatheticPainPoints
            title='Você acha que "já passou da idade" para alinhar os dentes?'
            painPoints={[
              {
                icon: <Star className="w-6 h-6 text-dental-purple" />,
                strong: "Profissionais que precisam de discrição",
                description: "O Invisalign® não atrapalha reuniões, apresentações ou situações sociais — é quase invisível.",
                borderColor: "border-dental-purple"
              },
              {
                icon: <Heart className="w-6 h-6 text-dental-gold" />,
                strong: "Adultos que evitam aparelho metálico",
                description: "Mas sentem desconforto com dentes tortos em situações profissionais e sociais.",
                borderColor: "border-dental-gold"
              },
              {
                icon: <CheckCircle className="w-6 h-6 text-dental-purple-soft" />,
                strong: "Não há idade limite para ortodontia",
                description: "Tratamos pacientes acima de 60 anos com resultados funcionais e estéticos consistentes.",
                borderColor: "border-dental-purple-soft"
              }
            ]}
            conclusion={<>Ortodontia adulta é uma das especialidades que mais cresce.<br className="hidden md:block" /> Alinhar seus dentes melhora a estética, a mastigação e sua saúde bucal.</>}
          />
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<Sparkles size={20} />} />

        {/* Tipos de Aparelho */}
        <ScrollReveal animation="fade-up">
          <section className="py-16 bg-white">
            <div className="container-custom">
              <h2 className="heading-lg mb-12 text-center text-dental-purple">
                Opções de Tratamento Ortodôntico
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-gradient-to-br from-dental-purple/5 to-transparent p-6 rounded-lg border-2 border-dental-gold">
                  <div className="w-12 h-12 bg-dental-purple/10 rounded-full flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-dental-purple" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-dental-purple">Invisalign®</h3>
                  <p className="text-dental-gray mb-4">Alinhadores transparentes removíveis, praticamente invisíveis. Máximo conforto.</p>
                  <ul className="space-y-2 text-sm text-dental-gray">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Praticamente invisível</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Remove para comer</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Higiene facilitada</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-dental-gold/10 to-transparent p-6 rounded-lg">
                  <div className="w-12 h-12 bg-dental-gold/20 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-dental-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-dental-purple">Aparelho Estético</h3>
                  <p className="text-dental-gray mb-4">Brackets de safira ou porcelana transparentes. Discreto e eficiente.</p>
                  <ul className="space-y-2 text-sm text-dental-gray">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Discreto e elegante</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Não mancha</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Ótimo custo-benefício</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-gray-100 to-transparent p-6 rounded-lg">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-dental-purple">Aparelho Tradicional</h3>
                  <p className="text-dental-gray mb-4">Brackets metálicos convencionais. Solução eficaz para todos os tipos de correção.</p>
                  <ul className="space-y-2 text-sm text-dental-gray">
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Mais acessível</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Muito resistente</li>
                    <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" /> Eficácia comprovada</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Tabela Comparativa */}
        <ScrollReveal animation="fade-up">
          <section className="py-8 bg-gray-50">
            <div className="container-custom">
              <h2 className="heading-lg mb-8 text-center text-dental-purple">
                Comparação Detalhada das Opções
              </h2>
              <div className="max-w-6xl mx-auto">
                <ComparisonTable data={comparisonData} />
                <p className="text-center mt-6 text-dental-gray">
                  A escolha do aparelho ideal depende do seu caso, estilo de vida e prioridades.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<Award size={20} />} />

        {/* Doctor Bio Section for Dr. Bruno and Dra. Carla */}
        <ScrollReveal animation="fade-up">
          <DoctorBioSection
            sectionTitle="Integração e Expertise Exclusiva"
            doctorName="Dr. Bruno Moreira das Neves"
            doctorSubtitle="Ortodontista Especialista | CRO-RJ 41.684"
            doctorImage="/lovable-uploads/DrBruno_site.webp"
            doctorAlt="Dr. Bruno Moreira"
            badgeText="Doutor UERJ"
            paragraphs={[
              "Com sólida formação acadêmica e vasta experiência clínica, o Dr. Bruno é responsável pelo planejamento e execução de todos os tratamentos ortodônticos avançados do nosso consultório em Ipanema.",
              "A Dra. Carla Christoph (CRO-RJ 27.509), especialista em Prótese, supervisiona e integra toda a jornada ortodôntica ao planejamento abrangente da saúde e estética do paciente. Com essa parceria técnica, o resultado visual final é ainda mais deslumbrante e com base funcional resistente."
            ]}
            credentials={[
              { title: "Doutorado", description: "Doutor em Ortodontia pela UERJ" },
              { title: "Invisalign Doctor", description: "Proficiência no sistema Invisalign" },
              { title: "Docência", description: "Professor de Ortodontia (IOPUC-Rio)" },
              { title: "Mestrado", description: "Mestre em Clínica Odontológica (UFF)" }
            ]}
          />
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<Zap size={20} />} />

        {/* Tecnologia iTero */}
        <ScrollReveal animation="fade-up">
          <section className="py-12 bg-white">
            <div className="container-custom">
              <h2 className="heading-lg mb-12 text-center text-dental-purple">
                Tecnologia iTero Element 5D: Precisão Digital
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-dental-purple">
                    Adeus às Moldagens com Massa!
                  </h3>
                  <p className="text-dental-gray mb-6">
                    Com o iTero Element 5D, criamos um modelo 3D ultra-preciso 
                    dos seus dentes em minutos, sem desconforto. A tecnologia permite:
                  </p>
                  <ul className="space-y-3 text-dental-gray">
                    <li className="flex items-start"><Zap className="w-5 h-5 text-dental-gold mr-2 mt-1" /> <span>Visualização imediata do resultado</span></li>
                    <li className="flex items-start"><Zap className="w-5 h-5 text-dental-gold mr-2 mt-1" /> <span>Planejamento digital preciso e alinhadores Invisalign</span></li>
                    <li className="flex items-start"><Zap className="w-5 h-5 text-dental-gold mr-2 mt-1" /> <span>Acompanhamento milimétrico e foco na excelência</span></li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-dental-purple/10 to-dental-gold/10 p-8 rounded-lg">
                  <div className="text-center">
                    <div className="w-32 h-32 flex items-center justify-center mx-auto mb-4 overflow-hidden mask-image-gradient shadow-elegant">
                      <img src="/lovable-uploads/itero_screen.webp" alt="Scanner intraoral iTero Element 5D para planejamento ortodôntico digital" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-dental-purple">
                      Simulação em Tempo Real
                    </h4>
                    <p className="text-sm text-dental-gray">
                      Veja como ficará seu sorriso antes de começar. A tecnologia iTero permite ajustes exatos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal animation="fade-up">
          <ServiceFAQ title="Perguntas Frequentes sobre Ortodontia" faqs={faqs} />
        </ScrollReveal>

        {/* Final CTA */}
        <FinalServiceCTA 
          title="Pronto para Conquistar o Sorriso dos Seus Sonhos?"
          description="Agende sua avaliação com o Dr. Bruno e descubra como a ortodontia moderna pode alinhar seus dentes. iTero Element 5D, Invisalign e atenção exclusiva lhe aguardam."
          ctaText="Agendar Avaliação pelo WhatsApp"
          whatsappMessage="Olá! Gostaria de agendar uma avaliação ortodôntica com o Dr. Bruno."
          onClickOverride={handleWhatsAppClick}
          icon={<Calendar className="w-8 h-8" />}
          variant="urgency"
        />

        <InternalLinkingOptimizer currentPage="ortodontia" />
        <StatsBar />
      </PageLayout>
    </>
  );
};

export default Ortodontia;