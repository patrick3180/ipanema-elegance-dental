import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import SectionDivider from "@/components/treatment/SectionDivider";
import ProcessTimeline from "@/components/treatment/ProcessTimeline";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Shield,
  Scan,
  Heart,
  Sparkles,
  Search,
  Calendar,
  ClipboardCheck,
  HelpCircle,
  ArrowRight
} from "lucide-react";

const faqs = [
  {
    question: "O que está incluído no check-up preventivo?",
    answer: "O check-up completo inclui exame clínico detalhado, limpeza profissional (profilaxia), avaliação de risco de cáries e doenças gengivais, orientação personalizada de higiene e, quando necessário, solicitação de radiografias. É uma avaliação completa para identificar qualquer problema antes que cause sintomas."
  },
  {
    question: "Com que frequência devo fazer consultas preventivas?",
    answer: "A frequência varia conforme seu perfil de risco. Pacientes de baixo risco podem vir a cada 6-8 meses, enquanto quem tem maior predisposição a cáries ou problemas gengivais deve retornar a cada 3-4 meses. Na primeira consulta, criamos um cronograma personalizado para você."
  },
  {
    question: "A limpeza profissional dói?",
    answer: "A limpeza com ultrassom é muito confortável. A maioria dos pacientes relata apenas uma leve sensação de vibração. Em casos de muita sensibilidade, podemos usar anestesia tópica para garantir seu conforto total durante o procedimento."
  },
  {
    question: "Por que prevenir é mais econômico que tratar?",
    answer: "Uma consulta preventiva custa uma fração do valor de tratamentos como canal, implantes ou enxertos gengivais. Além disso, você evita dor, desconforto e tempo longe do trabalho. Investir em prevenção é proteger sua saúde e seu bolso."
  },
  {
    question: "Scanner digital 3D substitui as moldagens tradicionais?",
    answer: "Sim! O scanner captura imagens digitais precisas da sua boca em poucos minutos, sem aquele desconforto das moldeiras com massa. É mais rápido, mais preciso e muito mais confortável, especialmente para quem tem reflexo de vômito."
  },
  {
    question: "Como vocês identificam cáries no estágio inicial?",
    answer: "Além do exame clínico, usamos câmeras de alta definição com magnificação e, quando necessário, radiografias digitais. Conseguimos identificar lesões de cárie ainda reversíveis, que podem ser tratadas apenas com aplicação de flúor, sem necessidade de restauração."
  },
  {
    question: "O que fazer para prevenir mau hálito?",
    answer: "Primeiro identificamos a causa - que em 90% dos casos está na boca (língua, gengiva ou dentes). Depois criamos um protocolo específico que pode incluir limpeza profissional, tratamento gengival, orientação sobre limpeza da língua e indicação de produtos adequados."
  },
  {
    question: "Aplicação de flúor é só para crianças?",
    answer: "Não! Adultos com alto risco de cáries, sensibilidade dental, boca seca ou exposição de raízes também se beneficiam muito da aplicação profissional de flúor. É um procedimento preventivo simples que fortalece o esmalte e reduz a sensibilidade."
  },
  {
    question: "Qual a diferença entre limpeza em casa e profissional?",
    answer: "A escovação e fio dental diários removem a placa bacteriana fresca. Mas o tártaro (placa mineralizada) só pode ser removido com instrumentos profissionais. Além disso, conseguimos limpar áreas que você não alcança em casa, como abaixo da linha da gengiva."
  },
  {
    question: "Quando devo procurar prevenção e não tratamento?",
    answer: "Sempre que não houver dor ou problema ativo! A prevenção deve ser sua primeira escolha. Se faz mais de 6 meses desde sua última consulta, se percebe sangramento gengival, mau hálito ou sensibilidade, é hora de uma avaliação preventiva - antes que vire tratamento complexo."
  }
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
        <meta 
          name="description" 
          content="Check-up digital e prevenção odontológica em Ipanema. Scanner 3D, ultrassom, protocolo personalizado. Dra. Carla Christoph CRO-RJ 27.509 - 20+ anos de experiência." 
        />
        <meta 
          name="keywords" 
          content="dentista ipanema, check-up dental, prevenção odontológica, limpeza dental, profilaxia, clínica geral odontologia, dra carla christoph" 
        />
        <link rel="canonical" href="https://dracarlaodontologia.com.br/clinica-geral-e-prevencao" />
      </Helmet>

      <TreatmentHero
        title="Cuide da Saúde do Seu Sorriso com Prevenção e Tecnologia"
        subtitle="Dra. Carla Christoph - Especialista em Saúde Bucal Integral"
        description="Check-up digital completo e protocolos preventivos para identificar problemas antes que se tornem complexos. Porque prevenir é sempre melhor - e mais econômico - do que remediar."
        badges={["20+ anos de experiência", "CRO-RJ 27.509", "Scanner Digital 3D"]}
        doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Tratamentos", href: "/servicos" },
          { label: "Clínica Geral e Prevenção" }
        ]}
      />

      <SectionDivider variant="with-icon" icon={<Shield size={20} />} />

      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="heading-lg mb-4 text-center text-dental-purple">
            Prevenção que Faz a Diferença
          </h2>
          <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">
            Tecnologia avançada e cuidado personalizado para manter seu sorriso saudável
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-dental-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-dental-purple" />
              </div>
              <h3 className="text-xl font-semibold text-dental-purple mb-3">
                Prevenção que Funciona
              </h3>
              <p className="text-dental-gray">
                Protocolos personalizados que evitam a maioria dos problemas bucais, mantendo seu sorriso saudável por muito mais tempo
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-dental-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scan className="w-8 h-8 text-dental-gold" />
              </div>
              <h3 className="text-xl font-semibold text-dental-purple mb-3">
                Tecnologia a Seu Favor
              </h3>
              <p className="text-dental-gray">
                Check-up com scanner digital 3D e câmera HD que identifica problemas invisíveis a olho nu, antes que causem dor ou desconforto
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-dental-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-dental-purple" />
              </div>
              <h3 className="text-xl font-semibold text-dental-purple mb-3">
                Acompanhamento Individual
              </h3>
              <p className="text-dental-gray">
                Cada paciente é único. Criamos um plano preventivo sob medida para suas necessidades, estilo de vida e histórico
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="with-icon" icon={<Sparkles size={20} />} />

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
              Seu Check-up Preventivo Completo
            </h2>
            <p className="text-lg text-dental-gray">
              Cada consulta é planejada para identificar e prevenir problemas antes que apareçam
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/scanner + intraoral.webp"
                  alt="Check-up Digital Completo com Scanner 3D"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-dental-gold transition-colors">
                  Check-up Digital Completo
                </h3>
                <p className="text-sm leading-relaxed opacity-95">
                  Avaliação detalhada com scanner digital 3D e câmera de alta definição. Conseguimos ver o que os olhos não veem, identificando pequenos problemas antes que virem grandes preocupações.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/ulrassom.webp"
                  alt="Limpeza Profissional com Ultrassom"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-dental-gold transition-colors">
                  Limpeza Profissional
                </h3>
                <p className="text-sm leading-relaxed opacity-95">
                  Profilaxia com tecnologia ultrassônica que remove tártaro e manchas de forma confortável. Seus dentes mais limpos, sua gengiva mais saudável, seu hálito mais fresco.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/Fluor.webp"
                  alt="Prevenção de Cáries com Flúor"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-dental-gold transition-colors">
                  Prevenção de Cáries
                </h3>
                <p className="text-sm leading-relaxed opacity-95">
                  Aplicação de flúor, selantes e acompanhamento próximo das áreas de risco para manter seus dentes protegidos e saudáveis.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/Periodontal.webp"
                  alt="Saúde Gengival e Prevenção Periodontal"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-dental-gold transition-colors">
                  Cuidado com a Gengiva
                </h3>
                <p className="text-sm leading-relaxed opacity-95">
                  Prevenção e controle de inflamações gengivais. Gengiva saudável é a base para dentes que duram a vida toda - e para evitar problemas que vão além da boca.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/mau halito.webp"
                  alt="Controle de Mau Hálito"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-dental-gold transition-colors">
                  Controle de Mau Hálito
                </h3>
                <p className="text-sm leading-relaxed opacity-95">
                  Investigamos a causa real do mau hálito e criamos um protocolo específico para você. Porque confiança ao conversar e sorrir não tem preço.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/planejamento.webp"
                  alt="Plano Preventivo Personalizado"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-dental-gold transition-colors">
                  Seu Plano Preventivo
                </h3>
                <p className="text-sm leading-relaxed opacity-95">
                  Com base no seu risco individual, criamos um cronograma de cuidados sob medida. Orientação sobre produtos adequados, técnicas corretas e frequência ideal de consultas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-purple-soft">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-elegant">
                <img 
                  src="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
                  alt="Dra. Carla Christoph - Especialista em Saúde Bucal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-dental-gold/20 rounded-full blur-3xl" />
            </div>

            <div>
              <h2 className="heading-lg mb-6 text-dental-purple">
                Sua Parceira na Saúde Bucal
              </h2>
              
              <div className="space-y-4 text-dental-gray leading-relaxed">
                <p>
                  Com mais de 20 anos de experiência, aprendi que cada sorriso conta uma história única. 
                  Não existe protocolo padrão - existe o cuidado que você precisa, no momento que você precisa.
                </p>
                
                <p>
                  Minha abordagem combina scanner digital e planejamento individualizado com tempo dedicado para entender suas necessidades reais. 
                  Porque prevenir não é só limpar os dentes - é criar uma relação de confiança onde você se sente cuidado.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-dental-gold/20">
                <p className="font-semibold text-dental-purple text-lg">
                  Dra. Carla Christoph
                </p>
                <p className="text-dental-gray">
                  CRO-RJ 27.509
                </p>
                <p className="text-sm text-dental-gray mt-2">
                  Especialista em Prótese Dental e Implantodontia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="with-icon" icon={<Calendar size={20} />} />

      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="heading-lg mb-4 text-center text-dental-purple">
            Sua Consulta Preventiva, Passo a Passo
          </h2>
          <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">
            Um protocolo completo pensado para sua saúde bucal integral
          </p>

          <ProcessTimeline
            steps={[
              {
                number: 1,
                title: "Análise Inicial",
                description: "Conversamos sobre seu histórico, hábitos e preocupações + exame visual detalhado",
                icon: <Search size={24} />,
                duration: "1ª Consulta"
              },
              {
                number: 2,
                title: "Diagnóstico Digital",
                description: "Scanner digital 3D + Solicitação de exames complementares quando necessário",
                icon: <Scan size={24} />,
                duration: "1ª Consulta"
              },
              {
                number: 3,
                title: "Profilaxia Avançada",
                description: "Limpeza profissional com ultrassom 30.000 Hz - confortável e eficaz",
                icon: <Sparkles size={24} />,
                duration: "1ª Consulta"
              },
              {
                number: 4,
                title: "Protocolo Personalizado",
                description: "Seu plano preventivo individual com orientações específicas e cronograma",
                icon: <ClipboardCheck size={24} />,
                duration: "1ª Consulta"
              },
              {
                number: 5,
                title: "Acompanhamento",
                description: "Retornos programados para manter sua saúde bucal sempre em dia",
                icon: <Calendar size={24} />,
                duration: "Periódico"
              }
            ]}
          />
        </div>
      </section>

      <SectionDivider variant="with-icon" icon={<HelpCircle size={20} />} />

      <section className="py-16 bg-dental-beige/20">
        <div className="container-custom">
          <h2 className="heading-lg mb-8 text-center text-dental-purple">
            Perguntas Frequentes sobre Prevenção
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index + 1}`} 
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

      <section className="py-20 bg-gradient-purple-gold text-white">
        <div className="container-custom text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-dental-gold" />
            <h2 className="heading-lg">
              Pronto para Investir na Saúde do Seu Sorriso?
            </h2>
          </div>
          
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Agende seu check-up preventivo e descubra como pequenos cuidados fazem toda a diferença. 
            Scanner digital, protocolos personalizados e tempo para cuidar da sua saúde bucal aguardam você em Ipanema.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => handleWhatsAppClick('Olá! Gostaria de agendar uma consulta preventiva e check-up digital com a Dra. Carla Christoph.')}
              className="bg-dental-gold text-dental-purple px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all inline-flex items-center gap-2"
            >
              <ArrowRight className="w-5 h-5" />
              Agendar Minha Consulta Preventiva
            </button>
          </div>
          
          <p className="mt-6 text-sm opacity-75">
            Atendimento de segunda a sexta, das 9h às 19h
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

export default ClinicaGeralPrevencao;