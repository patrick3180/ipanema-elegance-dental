import React from "react";
import { Link } from "react-router-dom";
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
import { Shield, AlertCircle, Activity, ArrowRight, Heart, Search, HelpCircle, CheckCircle } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import { useCriticalImagePreload } from '@/hooks/useCriticalImagePreload';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import FastServerResponseOptimizer from '@/components/performance/FastServerResponseOptimizer';
import CriticalCSSOptimizer from '@/components/performance/CriticalCSSOptimizer';
import { InternalLinkingOptimizer } from '@/components/seo/InternalLinkingOptimizer';

const faqs = [
  { question: "Gengiva que sangra ao escovar é normal?", answer: "Não. Sangramento gengival é sinal de inflamação, mesmo que não doa. Pode ser gengivite (reversível) ou periodontite (mais avançada). Vale procurar um profissional para identificar a causa e tratar antes que progrida." },
  { question: "Periodontite tem cura?", answer: "Periodontite é controlável, mas não é 'curável' no sentido de desaparecer sozinha. Com tratamento adequado e manutenção periódica, é possível estabilizar a doença e evitar que progrida. A disciplina nas consultas de manutenção é fundamental." },
  { question: "Posso fazer lentes ou implantes se tenho problema gengival?", answer: "Primeiro é necessário tratar a gengiva. Lentes, facetas e implantes exigem uma base gengival saudável para funcionar bem e durar. A Dra. Carla integra o tratamento periodontal ao planejamento do caso — um passo de cada vez." },
  { question: "Retração gengival tem tratamento?", answer: "Depende da causa e da extensão. Em alguns casos, procedimentos de enxerto gengival podem cobrir a raiz exposta. Em outros, o objetivo é estabilizar a situação e evitar que progrida. A avaliação clínica define a melhor abordagem." },
  { question: "Com que frequência devo fazer limpeza no dentista?", answer: "Para a maioria das pessoas, a cada 6 meses. Pacientes com histórico de doença periodontal podem precisar de intervalos menores — a cada 3 ou 4 meses. A frequência ideal é definida individualmente." },
  { question: "Mau hálito pode ser problema gengival?", answer: "Sim. Mau hálito persistente (halitose) é frequentemente associado a doença periodontal — bactérias acumuladas em bolsas gengivais produzem compostos com odor. Se o mau hálito não melhora com higiene oral cuidadosa, vale investigar." }
];

const SaudeDaGengiva = () => {
  useCriticalImagePreload({ images: [{ src: '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp', width: 1024 }], enabled: true });
  useScrollTracking({ pagePath: '/saude-da-gengiva', enabled: process.env.NODE_ENV === 'production' });

  const handleWhatsAppClick = async () => {
    if (window.dataLayer) { window.dataLayer.push({ event: 'whatsapp_click', event_category: 'Contact', event_action: 'Click', event_label: 'CTA Saúde da Gengiva', page_type: 'service_page' }); }
    if (window.gtag) { window.gtag('event', 'conversion', { 'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9', 'event_callback': function () { console.log('Google Ads conversion tracked - Gengiva Service Page'); } }); }
    await sendGCLIDToWebhook('gengiva_service_page_cta');
    const phone = "5521993304045";
    const message = "Olá! Vi a página sobre saúde da gengiva e gostaria de agendar uma consulta periodontal com a Dra. Carla Christoph.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Saúde da Gengiva em Ipanema | Dra. Carla Christoph</title>
        <meta name="description" content="Tratamento periodontal em Ipanema com acompanhamento integrado. Gengivite, periodontite e retração gengival. Dra. Carla Christoph, CRO-RJ 27.509." />
        <meta name="keywords" content="saúde da gengiva ipanema, periodontia rio de janeiro, gengivite tratamento, periodontite zona sul, gengiva sangrando dentista ipanema" />
        <link rel="canonical" href="https://dracarlachristoph.com/saude-da-gengiva" />
        <meta property="og:title" content="Saúde da Gengiva em Ipanema | Periodontia com Acompanhamento" />
        <meta property="og:description" content="Tratamento periodontal com acompanhamento integrado da Dra. Carla Christoph em Ipanema." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/saude-da-gengiva" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "MedicalProcedure", "name": "Tratamento Periodontal (Saúde da Gengiva)", "description": "Diagnóstico e tratamento de doenças gengivais com acompanhamento integrado ao plano de tratamento completo", "procedureType": "Dental", "provider": { "@type": "Dentist", "name": "Dra. Carla Christoph", "telephone": "+5521993304045", "address": { "@type": "PostalAddress", "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107", "addressLocality": "Ipanema", "addressRegion": "RJ", "postalCode": "22410-901", "addressCountry": "BR" } } })}</script>
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) })}</script>
      </Helmet>

      <FastServerResponseOptimizer />
      <CriticalCSSOptimizer inlineStyles={`.treatment-hero { min-height: 60vh; } .container-custom { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }`} />

      <PageLayout>
        <TreatmentHero title="Saúde da Gengiva em Ipanema" subtitle="Periodontia com Acompanhamento da Dra. Carla Christoph" description="Gengiva saudável é a base de qualquer tratamento odontológico. Sangramentos, retração e mau hálito persistente merecem atenção antes que se tornem problemas maiores." badges={["Saúde Periodontal", "Acompanhamento Integrado", "CRO-RJ 27.509"]} doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" breadcrumbs={[{ label: "Início", href: "/" }, { label: "Tratamentos", href: "/servicos" }, { label: "Saúde da Gengiva" }]} />

        <ScrollReveal animation="fade-up">
          <section className="py-8 bg-white"><div className="container-custom"><QuickAnswerBox answer="Saúde da gengiva (periodontia) trata doenças gengivais como gengivite e periodontite, que causam sangramento, retração e mau hálito. No consultório da Dra. Carla Christoph em Ipanema (CRO-RJ 27.509), realizamos avaliação periodontal, limpeza profissional e tratamento das bolsas gengivais. Gengivite é reversível; periodontite é controlável com tratamento e manutenções periódicas. Para pacientes de baixo risco, recomenda-se limpeza a cada 6 meses; em casos de doença periodontal, a cada 3-4 meses para manter estabilidade." /></div></section>
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<AlertCircle size={20} />} />

        <ScrollReveal animation="fade-up">
          <EmpatheticPainPoints
            painPoints={[
              { icon: <Activity className="w-6 h-6 text-dental-purple" />, strong: "Gengiva que sangra ao escovar ou passar o fio dental", description: "e você convive com isso há anos achando que é \"assim mesmo\"?", borderColor: "border-dental-purple" },
              { icon: <AlertCircle className="w-6 h-6 text-dental-gold" />, strong: "Mau hálito persistente mesmo com boa escovação", description: "que causa desconforto nas relações sociais e profissionais?", borderColor: "border-dental-gold" },
              { icon: <Heart className="w-6 h-6 text-dental-purple-soft" />, strong: "Gengiva retraída ou dentes que parecem \"mais longos\"", description: "com sensibilidade ao gelado que vem piorando com o tempo?", borderColor: "border-dental-purple-soft" }
            ]}
            conclusion={<>A doença periodontal é silenciosa — não costuma doer nos estágios iniciais.<br className="hidden md:block" /> Quando identificada cedo, é tratável e controlável.</>}
            callout={{ icon: <AlertCircle className="w-5 h-5 text-dental-gold" />, title: "Importante", text: "A periodontite leva de 2 a 5 anos para evoluir de gengivite, mas uma vez instalada, a perda óssea é irreversível. O tratamento interrompe a progressão — por isso a detecção precoce é fundamental." }}
          />
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<Shield size={20} />} />

        <ScrollReveal animation="fade-up">
          <section className="py-16 bg-white">
            <div className="container-custom">
              <h2 className="heading-lg mb-4 text-center text-dental-purple">Problemas Gengivais Mais Comuns</h2>
              <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">Entenda o que cada sinal pode significar</p>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  { icon: <Activity className="w-8 h-8 text-dental-purple" />, bg: "bg-dental-purple/10", title: "Gengivite", text: "Inflamação inicial da gengiva. Sangramento ao escovar, vermelhidão e inchaço. Reversível com tratamento adequado e boa higiene. Não causa perda óssea." },
                  { icon: <AlertCircle className="w-8 h-8 text-dental-gold" />, bg: "bg-dental-gold/10", title: "Periodontite", text: "Evolução da gengivite quando não tratada. Afeta o osso de suporte dos dentes. Pode causar mobilidade dentária e, em casos avançados, perda de dentes. Controlável, mas exige acompanhamento." },
                  { icon: <ArrowRight className="w-8 h-8 text-dental-purple" />, bg: "bg-dental-purple/10", title: "Retração Gengival", text: "A gengiva se retrai, expondo parte da raiz do dente. Causa sensibilidade e altera a estética do sorriso. Pode estar associada a escovação agressiva, bruxismo ou doença periodontal." }
                ].map((card, i) => (
                  <ScrollReveal key={i} animation="fade-up" delay={i * 150}>
                    <div className="text-center">
                      <div className={`w-16 h-16 ${card.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>{card.icon}</div>
                      <h3 className="text-xl font-semibold text-dental-purple mb-3">{card.title}</h3>
                      <p className="text-dental-gray">{card.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal animation="fade-up">
          <DoctorBioSection
            sectionTitle="Gengiva Saudável é Pré-Requisito"
            badgeText="Cuidado Integrado"
            paragraphs={[
              "Com mais de duas décadas em Ipanema, a Dra. Carla construiu sua reputação tratando cada paciente de forma individual, com tempo e atenção. Sua formação inclui 8 anos como dentista militar na Odontoclínica Central da Marinha, experiência que trouxe disciplina e precisão para sua prática clínica.",
              <React.Fragment key="bio-links">A Dra. Carla trata a saúde periodontal como base para qualquer procedimento. Não faz sentido investir em{" "}<Link to="/lentes-de-contato-dental-e-facetas" className="text-dental-gold hover:text-dental-purple transition-colors font-medium">lentes</Link>,{" "}<Link to="/implantes-dentarios" className="text-dental-gold hover:text-dental-purple transition-colors font-medium">implantes</Link> ou{" "}<Link to="/protese-dentaria" className="text-dental-gold hover:text-dental-purple transition-colors font-medium">prótese</Link>{" "}sobre uma gengiva comprometida. O tratamento periodontal é feito em parceria com periodontista especializado, e a Dra. Carla acompanha toda a evolução para integrar o cuidado gengival ao plano de tratamento completo do paciente.</React.Fragment>
            ]}
            credentials={[
              { title: "Visão integrada", description: "Saúde gengival como base para qualquer tratamento estético" },
              { title: "Parceria especializada", description: "Tratamento com periodontista e acompanhamento da Dra. Carla" },
              { title: "Experiência", description: "20+ anos, incluindo 8 na Marinha" },
              { title: "Abordagem", description: "Consultas individualizadas, mínimo de 1 hora" }
            ]}
          />
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<Search size={20} />} />

        <ScrollReveal animation="fade-up">
          <section className="py-16 bg-white">
            <div className="container-custom">
              <h2 className="heading-lg mb-4 text-center text-dental-purple">Como Cuidamos da Saúde da Sua Gengiva</h2>
              <div className="max-w-4xl mx-auto">
                <ProcessTimeline steps={[
                  { number: 1, title: "Consulta com a Dra. Carla", description: "Exame clínico detalhado da gengiva, sondagem periodontal e radiografias quando necessário. Identificação do estágio do problema.", icon: <Search size={24} />, duration: "1ª Consulta" },
                  { number: 2, title: "Tratamento Periodontal", description: "Limpeza profunda (raspagem), tratamento com periodontista especializado quando indicado. Controle da infecção e inflamação.", icon: <Shield size={24} />, duration: "1-4 sessões" },
                  { number: 3, title: "Reavaliação", description: "Após o tratamento, a Dra. Carla reavalia a resposta da gengiva e define os próximos passos — manutenção, tratamentos complementares ou encaminhamento para procedimentos estéticos.", icon: <CheckCircle size={24} />, duration: "30-45 dias" },
                  { number: 4, title: "Manutenção Periódica", description: "A doença periodontal é controlável, mas exige acompanhamento. Consultas regulares de manutenção previnem recidivas e mantêm a saúde gengival.", icon: <Heart size={24} />, duration: "A cada 3-6 meses" }
                ]} />
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal animation="fade-up">
          <section className="py-16 bg-white">
            <div className="container-custom">
              <h2 className="heading-lg mb-8 text-center text-dental-purple">A Relação entre Gengiva e Saúde Geral</h2>
              <div className="max-w-3xl mx-auto space-y-6 text-dental-gray leading-relaxed">
                <p>A saúde da gengiva está conectada à saúde do corpo como um todo. Estudos mostram associação entre doença periodontal e condições como diabetes, doenças cardiovasculares e complicações na gestação. Tratar a gengiva não é apenas uma questão estética — é um cuidado com a saúde sistêmica.</p>
                <p>Na prática, o que mais vemos no consultório são pacientes que conviviam com sangramento gengival há anos sem perceber a gravidade. Após o tratamento, relatam não apenas a melhora na boca, mas a sensação geral de cuidado com a saúde que estavam adiando.</p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <SectionDivider variant="with-icon" icon={<HelpCircle size={20} />} />
        <ScrollReveal animation="fade-up"><ServiceFAQ title="Dúvidas sobre Saúde da Gengiva" faqs={faqs} /></ScrollReveal>

        <FinalServiceCTA icon={<Heart className="w-8 h-8" />} title="Cuide da Base do Seu Sorriso" description="Agende sua consulta periodontal. Tratamento precoce faz toda a diferença." ctaText="Agendar Consulta" whatsappMessage="Olá! Vi a página sobre saúde da gengiva e gostaria de agendar uma consulta periodontal com a Dra. Carla Christoph." onClickOverride={handleWhatsAppClick} />
        <InternalLinkingOptimizer currentPage="saude-da-gengiva" />
        <StatsBar />
      </PageLayout>
    </>
  );
};

export default SaudeDaGengiva;
