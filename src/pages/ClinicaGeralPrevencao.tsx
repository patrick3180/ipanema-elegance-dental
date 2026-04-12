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
import { Shield, Scan, Heart, Sparkles, Search, Calendar, ClipboardCheck, HelpCircle, ArrowRight, AlertCircle, Clock } from "lucide-react";
import { InternalLinkingOptimizer } from '@/components/seo/InternalLinkingOptimizer';

const faqs = [
  { question: "O que está incluído no check-up preventivo?", answer: "O check-up completo inclui exame clínico detalhado, limpeza profissional (profilaxia), análise de risco de cáries e doenças gengivais, orientação personalizada de higiene e, quando necessário, solicitação de radiografias. É uma análise completa para identificar qualquer problema antes que cause sintomas." },
  { question: "Com que frequência devo fazer consultas preventivas?", answer: "A frequência varia conforme seu perfil de risco. Pacientes de baixo risco podem vir a cada 6-8 meses, enquanto quem tem maior predisposição a cáries ou problemas gengivais deve retornar a cada 3-4 meses. Na primeira consulta, criamos um cronograma personalizado para você." },
  { question: "A limpeza profissional dói?", answer: "A limpeza com ultrassom é muito confortável. A maioria dos pacientes relata apenas uma leve sensação de vibração. Em casos de muita sensibilidade, podemos usar anestesia tópica para garantir seu conforto total durante o procedimento." },
  { question: "Por que prevenir é mais econômico que tratar?", answer: "Uma consulta preventiva custa uma fração do valor de tratamentos como canal, implantes ou enxertos gengivais. Além disso, você evita dor, desconforto e tempo longe do trabalho. Investir em prevenção é proteger sua saúde e seu bolso." },
  { question: "O iTero Element 5D substitui as moldagens tradicionais?", answer: "Sim! O iTero Element 5D captura imagens digitais precisas da sua boca em poucos minutos, sem aquele desconforto das moldeiras com massa. É mais rápido, mais preciso e muito mais confortável, especialmente para quem tem reflexo de vômito." },
  { question: "Como vocês identificam cáries no estágio inicial?", answer: "Além do exame clínico, usamos câmeras de alta definição com magnificação e, quando necessário, radiografias digitais. Conseguimos identificar lesões de cárie ainda reversíveis, que podem ser tratadas apenas com aplicação de flúor, sem necessidade de restauração." },
  { question: "O que fazer para prevenir mau hálito?", answer: "Primeiro identificamos a causa - que em 90% dos casos está na boca (língua, gengiva ou dentes). Depois criamos um protocolo específico que pode incluir limpeza profissional, tratamento gengival, orientação sobre limpeza da língua e indicação de produtos adequados." },
  { question: "Aplicação de flúor é só para crianças?", answer: "Não! Adultos com alto risco de cáries, sensibilidade dental, boca seca ou exposição de raízes também se beneficiam muito da aplicação profissional de flúor. É um procedimento preventivo simples que fortalece o esmalte e reduz a sensibilidade." },
  { question: "Qual a diferença entre limpeza em casa e profissional?", answer: "A escovação e fio dental diários removem a placa bacteriana fresca. Mas o tártaro (placa mineralizada) só pode ser removido com instrumentos profissionais. Além disso, conseguimos limpar áreas que você não alcança em casa, como abaixo da linha da gengiva." },
  { question: "Quando devo procurar prevenção e não tratamento?", answer: "Sempre que não houver dor ou problema ativo! A prevenção deve ser sua primeira escolha. Se faz mais de 6 meses desde sua última consulta, se percebe sangramento gengival, mau hálito ou sensibilidade, é hora de uma consulta preventiva - antes que vire tratamento complexo." }
];

const handleWhatsAppClick = (message: string) => {
  const phoneNumber = "5521993304045";
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
};

const ClinicaGeralPrevencao = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Clínica Geral e Prevenção Odontológica em Ipanema | Dra. Carla Christoph</title>
        <meta name="description" content="Check-up digital e prevenção odontológica em Ipanema. iTero Element 5D, ultrassom, protocolo personalizado. Dra. Carla Christoph CRO-RJ 27.509 - 20+ anos de experiência." />
        <meta name="keywords" content="dentista ipanema, check-up dental, prevenção odontológica, limpeza dental, profilaxia, clínica geral odontologia, dra carla christoph" />
        <link rel="canonical" href="https://dracarlachristoph.com/clinica-geral-e-prevencao" />
        <link rel="alternate" hrefLang="pt-BR" href="https://dracarlachristoph.com/clinica-geral-e-prevencao" />
        <link rel="alternate" hrefLang="en" href="https://dracarlachristoph.com/en/general-dentistry" />
        <link rel="alternate" hrefLang="x-default" href="https://dracarlachristoph.com/clinica-geral-e-prevencao" />
        <meta property="og:title" content="Clínica Geral e Prevenção Odontológica em Ipanema | Dra. Carla Christoph" />
        <meta property="og:description" content="Check-up digital e prevenção odontológica em Ipanema. iTero Element 5D, ultrassom, protocolo personalizado." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/clinica-geral-e-prevencao" />
        <meta property="og:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "MedicalProcedure", "name": "Check-up Digital e Prevenção Odontológica", "description": "Check-up dental completo com iTero Element 5D, limpeza profissional e protocolo preventivo personalizado", "procedureType": "Dental", "provider": { "@type": "Dentist", "name": "Dra. Carla Christoph", "telephone": "+5521993304045", "address": { "@type": "PostalAddress", "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107", "addressLocality": "Ipanema", "addressRegion": "RJ", "postalCode": "22410-002", "addressCountry": "BR" } } })}</script>
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })) })}</script>
      </Helmet>

      <TreatmentHero title="Cuide da Saúde do Seu Sorriso com Prevenção e Tecnologia" subtitle="Dra. Carla Christoph - Especialista em Saúde Bucal Integral" description="Check-up digital completo e protocolos preventivos para identificar problemas antes que se tornem complexos. Porque prevenir é sempre melhor - e mais econômico - do que remediar." badges={["20+ anos de experiência", "CRO-RJ 27.509", "iTero Element 5D"]} doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" breadcrumbs={[{ label: "Início", href: "/" }, { label: "Tratamentos", href: "/servicos" }, { label: "Clínica Geral e Prevenção" }]} />

      <ScrollReveal animation="fade-up">
        <section className="py-8 bg-white"><div className="container-custom"><QuickAnswerBox answer="Clínica geral e prevenção odontológica oferece check-up completo para manter a saúde bucal e evitar problemas futuros. Na clínica da Dra. Carla Christoph em Ipanema (CRO-RJ 27.509), o check-up inclui exame clínico detalhado, limpeza profissional com ultrassom, iTero Element 5D e avaliação de risco personalizada. Com 20+ anos de experiência, criamos protocolos preventivos individualizados. Recomenda-se consultas a cada 6-8 meses para baixo risco e 3-4 meses para alto risco. Prevenir é sempre mais econômico e confortável do que tratar problemas avançados." /></div></section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <EmpatheticPainPoints
          painPoints={[
            { icon: <Calendar className="w-6 h-6 text-dental-purple" />, strong: "Faz mais de 1 ano sem ir ao dentista", description: "e sente que pode ter algum problema acumulando sem saber?", borderColor: "border-dental-purple" },
            { icon: <AlertCircle className="w-6 h-6 text-dental-gold" />, strong: "Sente sensibilidade ao comer ou beber gelado", description: "que vem piorando e você não sabe o que pode ser?", borderColor: "border-dental-gold" },
            { icon: <Heart className="w-6 h-6 text-dental-purple-soft" />, strong: "Quer cuidar da saúde bucal mas não sabe por onde começar", description: "e prefere um acompanhamento preventivo personalizado?", borderColor: "border-dental-purple-soft" }
          ]}
          conclusion={<>Prevenir é sempre mais simples, mais confortável e mais econômico do que tratar.<br className="hidden md:block" /> Um check-up cuidadoso pode evitar tratamentos complexos no futuro.</>}
          callout={{ icon: <Clock className="w-5 h-5 text-dental-gold" />, title: "Importante", text: "Pequenos problemas como cáries iniciais e gengivite são reversíveis quando detectados cedo. Sem acompanhamento, podem evoluir para canal, perda óssea ou extração." }}
        />
      </ScrollReveal>

      <ScrollReveal animation="scale-in">
        <section className="py-8 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-xl text-dental-gray mb-6">Quer cuidar antes que precise tratar?</p>
            <button onClick={() => handleWhatsAppClick('Olá! Gostaria de agendar um check-up preventivo com a Dra. Carla Christoph.')} className="inline-flex items-center justify-center px-8 py-4 bg-dental-gold hover:bg-dental-gold/90 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
              Agendar Check-up <ArrowRight size={20} className="ml-2" />
            </button>
          </div>
        </section>
      </ScrollReveal>

      <SectionDivider variant="with-icon" icon={<Shield size={20} />} />

      <ScrollReveal animation="fade-up">
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-4 text-center text-dental-purple">Prevenção que Faz a Diferença</h2>
            <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">Tecnologia avançada e cuidado personalizado para manter seu sorriso saudável</p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: <Shield className="w-8 h-8 text-dental-purple" />, bg: "bg-dental-purple/10", title: "Prevenção que Funciona", text: "Protocolos personalizados que evitam a maioria dos problemas bucais, mantendo seu sorriso saudável por muito mais tempo" },
                { icon: <Scan className="w-8 h-8 text-dental-gold" />, bg: "bg-dental-gold/10", title: "Tecnologia a Seu Favor", text: "Check-up com iTero Element 5D e câmera HD que identifica problemas invisíveis a olho nu, antes que causem dor ou desconforto" },
                { icon: <Heart className="w-8 h-8 text-dental-purple" />, bg: "bg-dental-purple/10", title: "Acompanhamento Individual", text: "Cada paciente é único. Criamos um plano preventivo sob medida para suas necessidades, estilo de vida e histórico" }
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

      <SectionDivider variant="with-icon" icon={<Sparkles size={20} />} />

      <ScrollReveal animation="fade-up">
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">Seu Check-up Preventivo Completo</h2>
              <p className="text-lg text-dental-gray">Cada consulta é planejada para identificar e prevenir problemas antes que apareçam</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { img: "/lovable-uploads/scanner + intraoral.webp", alt: "Check-up Digital Completo com iTero Element 5D", title: "Check-up Digital Completo", desc: "Avaliação detalhada com iTero Element 5D e câmera de alta definição. Conseguimos ver o que os olhos não veem, identificando pequenos problemas antes que virem grandes preocupações." },
                { img: "/lovable-uploads/ulrassom.webp", alt: "Limpeza Profissional com Ultrassom", title: "Limpeza Profissional", desc: "Profilaxia com tecnologia ultrassônica que remove tártaro e manchas de forma confortável. Seus dentes mais limpos, sua gengiva mais saudável, seu hálito mais fresco." },
                { img: "/lovable-uploads/Fluor.webp", alt: "Prevenção de Cáries com Flúor", title: "Prevenção de Cáries", desc: "Aplicação de flúor, selantes e acompanhamento próximo das áreas de risco para manter seus dentes protegidos e saudáveis." },
                { img: "/lovable-uploads/Periodontal.webp", alt: "Saúde Gengival e Prevenção Periodontal", title: "Cuidado com a Gengiva", desc: "Prevenção e controle de inflamações gengivais. Gengiva saudável é a base para dentes que duram a vida toda - e para evitar problemas que vão além da boca." },
                { img: "/lovable-uploads/mau halito.webp", alt: "Controle de Mau Hálito", title: "Controle de Mau Hálito", desc: "Investigamos a causa real do mau hálito e criamos um protocolo específico para você. Porque confiança ao conversar e sorrir não tem preço." },
                { img: "/lovable-uploads/planejamento.webp", alt: "Plano Preventivo Personalizado", title: "Seu Plano Preventivo", desc: "Com base no seu risco individual, criamos um cronograma de cuidados sob medida. Orientação sobre produtos adequados, técnicas corretas e frequência ideal de consultas." }
              ].map((item, i) => (
                <ScrollReveal key={i} animation="scale-in" delay={i * 100}>
                  <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer">
                    <div className="aspect-[4/3] relative">
                      <img src={item.img} alt={item.alt} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-dental-gold transition-colors">{item.title}</h3>
                      <p className="text-sm leading-relaxed opacity-95">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <DoctorBioSection
          sectionTitle="Sua Parceira na Saúde Bucal"
          badgeText="20+ Anos de Experiência"
          paragraphs={[
            "Com mais de 20 anos de experiência, aprendi que cada sorriso conta uma história única. Não existe protocolo padrão - existe o cuidado que você precisa, no momento que você precisa.",
            "Minha abordagem combina iTero Element 5D e planejamento individualizado com tempo dedicado para entender suas necessidades reais. Porque prevenir não é só limpar os dentes - é criar uma relação de confiança onde você se sente cuidado."
          ]}
          credentials={[
            { title: "Tecnologia", description: "iTero Element 5D e câmera HD" },
            { title: "Prevenção", description: "Protocolos individualizados" },
            { title: "Experiência", description: "20+ anos em Ipanema" },
            { title: "Especialização", description: "Prótese Dental e Implantodontia" }
          ]}
          quote="Porque prevenir não é só limpar os dentes - é criar uma relação de confiança onde você se sente cuidado."
        />
      </ScrollReveal>

      <SectionDivider variant="with-icon" icon={<Calendar size={20} />} />

      <ScrollReveal animation="fade-up">
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-4 text-center text-dental-purple">Sua Consulta Preventiva, Passo a Passo</h2>
            <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">Um protocolo completo pensado para sua saúde bucal integral</p>
            <ProcessTimeline steps={[
              { number: 1, title: "Análise Inicial", description: "Conversamos sobre seu histórico, hábitos e preocupações + exame visual detalhado", icon: <Search size={24} />, duration: "1ª Consulta" },
              { number: 2, title: "Diagnóstico Digital", description: "iTero Element 5D + Solicitação de exames complementares quando necessário", icon: <Scan size={24} />, duration: "1ª Consulta" },
              { number: 3, title: "Profilaxia Avançada", description: "Limpeza profissional com ultrassom 30.000 Hz - confortável e eficaz", icon: <Sparkles size={24} />, duration: "1ª Consulta" },
              { number: 4, title: "Protocolo Personalizado", description: "Seu plano preventivo individual com orientações específicas e cronograma", icon: <ClipboardCheck size={24} />, duration: "1ª Consulta" },
              { number: 5, title: "Acompanhamento", description: "Retornos programados para manter sua saúde bucal sempre em dia", icon: <Calendar size={24} />, duration: "Periódico" }
            ]} />
          </div>
        </section>
      </ScrollReveal>

      <SectionDivider variant="with-icon" icon={<HelpCircle size={20} />} />
      <ScrollReveal animation="fade-up"><ServiceFAQ title="Perguntas Frequentes sobre Prevenção" faqs={faqs} /></ScrollReveal>

      <FinalServiceCTA icon={<Shield className="w-8 h-8" />} title="Pronto para Investir na Saúde do Seu Sorriso?" description="Agende seu check-up preventivo e descubra como pequenos cuidados fazem toda a diferença. iTero Element 5D, protocolos personalizados e tempo para cuidar da sua saúde bucal aguardam você em Ipanema." ctaText="Agendar Minha Consulta Preventiva" whatsappMessage="Olá! Gostaria de agendar uma consulta preventiva e check-up digital com a Dra. Carla Christoph." footnote="Atendimento de segunda a sexta, das 9h às 19h" />
      <StatsBar />
      <InternalLinkingOptimizer currentPage="clinica-geral-e-prevencao" />
    </PageLayout>
  );
};

export default ClinicaGeralPrevencao;