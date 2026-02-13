import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import SectionDivider from "@/components/treatment/SectionDivider";
import ProcessTimeline from "@/components/treatment/ProcessTimeline";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import { Sparkles, Shield, Heart, Award, Search, Scan, CheckCircle, HelpCircle, ArrowRight, Clock, Link, Ban, Target, Wrench, Stethoscope, Syringe, Scissors, HeartPulse, Layers, Focus, Gem } from "lucide-react";

const RestaureacoesEsteticas = () => {
  const handleWhatsAppClick = async (message: string) => {
    await sendGCLIDToWebhook('restauracoes_esteticas_cta');
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'whatsapp_click', event_category: 'Contact', event_action: 'Click', event_label: 'Restaurações Estéticas CTA' });
    }
    if (window.gtag) {
      window.gtag('event', 'conversion', { 'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9' });
    }
    const phoneNumber = "5521993304045";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Restaurações Estéticas em Ipanema | Dra. Carla Christoph</title>
        <meta name="description" content="Restauração dental estética em Ipanema com resina de alta qualidade. Tratamento de cáries, dentes quebrados e trincados. Resultado natural e duradouro. Dra. Carla Christoph CRO-RJ 27.509." />
        <link rel="canonical" href="https://dracarlachristoph.com/restauracoes-esteticas" />
      </Helmet>

      <TreatmentHero
        title="Restaurações Estéticas em Ipanema"
        subtitle="Beleza e Função para seu Sorriso"
        description="Recupere dentes comprometidos por cáries, fraturas ou trincas com materiais de excelência que imitam perfeitamente a cor e textura natural."
        badges={["Resinas de Alta Performance", "Resultado Natural", "Técnica Conservadora"]}
        doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
        breadcrumbs={[{label: "Início", href: "/"}, {label: "Tratamentos", href: "/servicos"}, {label: "Restaurações Estéticas"}]}
      />

      {/* Quick Answer Box */}
      <section className="py-8 bg-white">
        <div className="container-custom">
          <QuickAnswerBox
            answer="Restaurações estéticas são tratamentos que recuperam dentes comprometidos por cáries, fraturas ou trincas usando resinas ou cerâmicas de alta qualidade. Na clínica da Dra. Carla Christoph em Ipanema (CRO-RJ 27.509), utilizamos materiais de última geração com estratificação de cor que reproduzem perfeitamente a translucidez natural dos dentes. O tratamento é conservador, preservando ao máximo a estrutura dentária, e o resultado é indistinguível dos dentes naturais. Com 20+ anos de experiência, realizamos desde pequenas restaurações até reconstruções complexas em uma ou poucas sessões."
          />
        </div>
      </section>

      {/* SEÇÃO 2: INTRODUÇÃO EMPÁTICA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg text-dental-gray leading-relaxed mb-6">
            Você já passou pela frustração de esconder o sorriso ao notar um dente quebrado, manchado ou com aquela restauração escura que denuncia o tratamento?
          </p>
          <p className="text-lg text-dental-gray leading-relaxed mb-6">
            Cáries, fraturas e trincas são mais comuns do que imagina — e o impacto vai além da estética. Dentes comprometidos afetam a mastigação, podem causar sensibilidade e, se não tratados, evoluem para problemas mais sérios.
          </p>
          <p className="text-lg text-dental-gray leading-relaxed mb-6">
            A boa notícia: a odontologia estética moderna oferece restaurações que devolvem forma, função e beleza de forma praticamente invisível.
          </p>
          <p className="text-lg text-dental-gray leading-relaxed">
            Na clínica da <span className="font-semibold text-dental-purple">Dra. Carla Christoph em Ipanema</span>, cada restauração é executada com precisão técnica e sensibilidade artística, utilizando materiais de última geração que mimetizam perfeitamente seus dentes naturais. Não são "obturações" — são <span className="font-semibold text-dental-purple">reconstruções que respeitam a anatomia e individualidade do seu sorriso</span>.
          </p>
        </div>
      </section>

      {/* SEÇÃO 3: DIVIDER */}
      <SectionDivider variant="with-icon" icon={<Award size={20} />} />

      {/* SEÇÃO 4: ESPECIALISTA - DRA. CARLA */}
      <section className="py-16 bg-gradient-to-b from-dental-beige/10 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-[380px,1fr] gap-12 items-center">
            {/* Foto com badge sobreposto */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elegant">
                <img 
                  src="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" 
                  alt="Dra. Carla Christoph - Especialista em Restaurações Estéticas"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-dental-beige/80"></div>
                
                {/* Badge sobreposto */}
                <div className="absolute bottom-6 left-6 bg-dental-gold text-white px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-sm font-semibold">20+ Anos de Experiência</p>
                </div>
              </div>
            </div>

            {/* Conteúdo */}
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-6">
                Restaurações com Precisão Técnica e Arte
              </h2>
              
              <p className="text-lg text-dental-gray leading-relaxed mb-4">
                Com mais de duas décadas em Ipanema, a Dra. Carla construiu sua reputação tratando cada paciente de forma individual, com tempo e atenção. Sua formação inclui 8 anos como dentista militar na Odontoclínica Central da Marinha, experiência que trouxe disciplina e precisão para sua prática clínica.
              </p>
              
              <p className="text-lg text-dental-gray leading-relaxed mb-8">
                Nas restaurações, utiliza resinas e cerâmicas que reproduzem a translucidez natural do dente. O objetivo é que a restauração passe despercebida — que o dente tratado seja indistinguível dos demais.
              </p>

              {/* Grid 2x2 de informações */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Card 1: Formação */}
                <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                      <Award className="w-6 h-6 text-dental-purple" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-dental-purple">Formação</h3>
                  </div>
                  <p className="text-dental-gray">Especialista em Prótese Dentária e Implantodontia</p>
                  <p className="text-sm text-dental-gold font-semibold mt-2">CRO-RJ 27.509</p>
                </div>

                {/* Card 2: Experiência */}
                <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-dental-gold" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-dental-purple">Experiência</h3>
                  </div>
                  <p className="text-dental-gray">20+ anos tratando casos de todas as complexidades</p>
                  <p className="text-sm text-dental-gold font-semibold mt-2">Milhares de restaurações realizadas</p>
                </div>

                {/* Card 3: Atualização */}
                <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-dental-purple" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-dental-purple">Atualização</h3>
                  </div>
                  <p className="text-dental-gray">Formação contínua em técnicas avançadas</p>
                  <p className="text-sm text-dental-gold font-semibold mt-2">Estratificação e polimento premium</p>
                </div>

                {/* Card 4: Tecnologia */}
                <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                      <Scan className="w-6 h-6 text-dental-purple" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-dental-purple">Tecnologia</h3>
                  </div>
                  <p className="text-dental-gray">Scanner intraoral iTero Element 5D</p>
                  <p className="text-sm text-dental-gold font-semibold mt-2">Materiais com certificação internacional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: DIVIDER */}
      <SectionDivider variant="with-icon" icon={<Shield size={20} />} />

      {/* SEÇÃO 6: CARDS MODALIDADES - DIRETA VS INDIRETA */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
              Restauração Direta ou Indireta: Qual é a Ideal para Você?
            </h2>
            <p className="text-lg text-dental-gray max-w-3xl mx-auto">
              Cada técnica tem suas indicações específicas. A escolha depende da extensão do dano, localização do dente e objetivos do tratamento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* CARD 1 - RESTAURAÇÃO DIRETA */}
            <div className="group bg-white rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 overflow-hidden">
              {/* Imagem com overlay */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src="/lovable-uploads/Restauracao direta.webp" 
                  alt="Restauração Direta em Resina Composta"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-display font-bold mb-2">Restauração Direta em Resina</h3>
                  <p className="text-white/90">Realizada em uma única sessão no consultório</p>
                </div>
              </div>

              {/* Conteúdo do card */}
              <div className="p-6">
                <p className="text-dental-gray leading-relaxed mb-6">
                  Realizada em uma única sessão, onde a resina de alta qualidade é aplicada e esculpida diretamente no dente comprometido.
                </p>

                {/* Indicações */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-dental-purple mb-3">Indicações:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Cáries pequenas a médias</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Fraturas de pequena extensão</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Trincas superficiais</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Fechamento de pequenos espaços (diastemas)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Correção de formato</span>
                    </li>
                  </ul>
                </div>

                {/* Características em Accordion */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-dental-purple/20">
                    <AccordionTrigger className="text-dental-purple font-semibold hover:text-dental-gold transition-colors">
                      Ver Características Detalhadas
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Confecção:</span>
                          <span className="text-dental-purple">Consultório (1 sessão)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Tempo:</span>
                          <span className="text-dental-purple">40-90 minutos por dente</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Durabilidade:</span>
                          <span className="text-dental-purple">5-8 anos</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Investimento:</span>
                          <span className="text-dental-purple">Mais acessível</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Preparo:</span>
                          <span className="text-dental-purple">Mínimo conservador</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* CARD 2 - RESTAURAÇÃO INDIRETA */}
            <div className="group bg-white rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 overflow-hidden">
              {/* Imagem com overlay */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src="/lovable-uploads/inlay de porcelana.webp" 
                  alt="Restauração Indireta - Inlay e Onlay de Porcelana"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-display font-bold mb-2">Restauração Indireta (Inlay/Onlay)</h3>
                  <p className="text-white/90">Confeccionada em laboratório especializado</p>
                </div>
              </div>

              {/* Conteúdo do card */}
              <div className="p-6">
                <p className="text-dental-gray leading-relaxed mb-6">
                  Confeccionada em laboratório e cimentada em segunda sessão, oferecendo maior resistência e longevidade.
                </p>

                {/* Indicações */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-dental-purple mb-3">Indicações:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Cáries extensas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Grande perda estrutural</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Fraturas amplas em dentes posteriores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Substituição de grandes restaurações antigas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0 mt-0.5" />
                      <span className="text-dental-gray">Necessidade de máxima durabilidade</span>
                    </li>
                  </ul>
                </div>

                {/* Características em Accordion */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-dental-purple/20">
                    <AccordionTrigger className="text-dental-purple font-semibold hover:text-dental-gold transition-colors">
                      Ver Características Detalhadas
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Confecção:</span>
                          <span className="text-dental-purple">Laboratório (2 sessões)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Material:</span>
                          <span className="text-dental-purple">Porcelana ou resina laboratorial</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Durabilidade:</span>
                          <span className="text-dental-purple">12-15 anos</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Investimento:</span>
                          <span className="text-dental-purple">Mais significativo</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-dental-gray font-semibold">Precisão:</span>
                          <span className="text-dental-purple">Adaptação milimétrica</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          {/* Box informativo */}
          <div className="mt-12 bg-dental-beige/20 border-2 border-dental-gold/30 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-dental-gold/20 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-6 h-6 text-dental-gold" />
              </div>
              <div>
                <h4 className="text-xl font-display font-bold text-dental-purple mb-3">Como Escolher?</h4>
                <p className="text-dental-gray leading-relaxed mb-4">
                  A escolha não é "melhor ou pior", mas <span className="font-semibold text-dental-purple">indicação técnica</span>. Analisamos:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0" />
                    <span className="text-dental-gray">Extensão do dano</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0" />
                    <span className="text-dental-gray">Localização (anterior/posterior)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0" />
                    <span className="text-dental-gray">Forças mastigatórias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0" />
                    <span className="text-dental-gray">Estrutura dental remanescente</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0" />
                    <span className="text-dental-gray">Objetivos estéticos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-dental-gold flex-shrink-0" />
                    <span className="text-dental-gray">Investimento disponível</span>
                  </div>
                </div>
                <p className="text-dental-purple font-semibold mt-4">
                  Prioridade: preservar o máximo de estrutura dental sadia e oferecer a solução mais duradoura para seu caso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: DIVIDER */}
      <SectionDivider variant="with-icon" icon={<Heart size={20} />} />

      {/* SEÇÃO 8: BENEFÍCIOS */}
      <section className="py-16 bg-dental-beige/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
              Vantagens das Restaurações Estéticas
            </h2>
            <p className="text-lg text-dental-gray max-w-3xl mx-auto">
              Tecnologia e materiais de última geração para resultados naturais e duradouros
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Benefício 1 */}
            <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7 text-dental-purple" />
              </div>
              <h3 className="text-xl font-display font-bold text-dental-purple mb-3">Estética Superior</h3>
              <p className="text-dental-gray leading-relaxed">
                Cor e brilho idênticos aos dentes naturais. Resultado praticamente invisível.
              </p>
            </div>

            {/* Benefício 2 */}
            <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-dental-purple mb-3">Preservação Dental</h3>
              <p className="text-dental-gray leading-relaxed">
                Técnica conservadora que mantém o máximo de estrutura sadia do dente.
              </p>
            </div>

            {/* Benefício 3 */}
            <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <Link className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-dental-purple mb-3">Adesão Química</h3>
              <p className="text-dental-gray leading-relaxed">
                União química ao dente proporcionando selamento eficaz contra infiltrações.
              </p>
            </div>

            {/* Benefício 4 */}
            <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <Ban className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-dental-purple mb-3">Ausência de Metais</h3>
              <p className="text-dental-gray leading-relaxed">
                Zero mercúrio ou metais. Material biocompatível e seguro para sua saúde.
              </p>
            </div>

            {/* Benefício 5 */}
            <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-yellow-50 flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-dental-gold" />
              </div>
              <h3 className="text-xl font-display font-bold text-dental-purple mb-3">Versatilidade</h3>
              <p className="text-dental-gray leading-relaxed">
                Aplicável em dentes anteriores e posteriores, adaptando-se a cada situação.
              </p>
            </div>

            {/* Benefício 6 */}
            <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                <Wrench className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-dental-purple mb-3">Reparo Facilitado</h3>
              <p className="text-dental-gray leading-relaxed">
                Possibilidade de ajustes e reparos sem necessidade de trocar toda a restauração.
              </p>
            </div>

            {/* Benefício 7 - centralizado */}
            <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300 md:col-start-2">
              <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-dental-purple mb-3">Durabilidade Comprovada</h3>
              <p className="text-dental-gray leading-relaxed">
                Materiais de alta resistência que garantem longevidade ao tratamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 9: DIVIDER */}
      <SectionDivider variant="with-icon" icon={<Search size={20} />} />

      {/* SEÇÃO 10: PROCESSO - TIMELINE */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
              Seu Tratamento: Passo a Passo
            </h2>
            <p className="text-lg text-dental-gray max-w-3xl mx-auto">
              Processo estruturado para garantir o melhor resultado com máximo conforto
            </p>
          </div>

          <ProcessTimeline
            steps={[
              {
                number: 1,
                title: "Diagnóstico Preciso",
                description: "Exame clínico completo • Radiografias digitais • Análise oclusal detalhada • Scanner iTero para casos complexos • Avaliação de bruxismo e hábitos parafuncionais",
                icon: <Stethoscope size={24} />,
                duration: "1ª Consulta"
              },
              {
                number: 2,
                title: "Anestesia e Conforto",
                description: "Técnica de anestesia indolor • Isolamento absoluto do campo operatório • Ambiente tranquilo e acolhedor • Acompanhamento contínuo durante todo o procedimento",
                icon: <Syringe size={24} />,
                duration: "Início do procedimento"
              },
              {
                number: 3,
                title: "Preparo Conservador",
                description: "Remoção apenas do tecido comprometido • Preservação máxima da estrutura sadia • Preparo com instrumentos de precisão • Condicionamento ácido e sistema adesivo de última geração",
                icon: <Scissors size={24} />,
                duration: "20-30 minutos"
              },
              {
                number: 4,
                title: "Aplicação e Escultura",
                description: "Seleção criteriosa da cor • Técnica de estratificação em camadas incrementais • Fotopolimerização controlada • Escultura anatômica respeitando forma e função naturais",
                icon: <Sparkles size={24} />,
                duration: "30-60 minutos"
              },
              {
                number: 5,
                title: "Ajuste e Polimento",
                description: "Verificação minuciosa da mordida • Ajuste oclusal com carbono • Polimento sequencial com discos e pastas diamantadas • Acabamento com brilho vítreo",
                icon: <CheckCircle size={24} />,
                duration: "15-20 minutos"
              }
            ]}
          />
        </div>
      </section>

      {/* SEÇÃO 11: DIVIDER */}
      <SectionDivider variant="with-icon" icon={<Award size={20} />} />

      {/* SEÇÃO 12: DIFERENCIAIS */}
      <section className="py-16 bg-dental-beige/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
              Diferenciais do Tratamento
            </h2>
            <p className="text-lg text-dental-gray max-w-3xl mx-auto">
              Protocolos avançados que fazem a diferença no resultado final
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Diferencial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <HeartPulse className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-2">Protocolo Saúde Primeiro</h3>
                  <p className="text-dental-gray leading-relaxed">
                    Tratamento de inflamações gengivais e controle de cáries ativas antes de qualquer restauração estética.
                  </p>
                </div>
              </div>
            </div>

            {/* Diferencial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-dental-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-2">Materiais Premium</h3>
                  <p className="text-dental-gray leading-relaxed">
                    Resinas compostas com certificação internacional, nanotecnologia e ampla paleta de cores para mimetização perfeita.
                  </p>
                </div>
              </div>
            </div>

            {/* Diferencial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <Layers className="w-6 h-6 text-dental-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-2">Técnica de Estratificação</h3>
                  <p className="text-dental-gray leading-relaxed">
                    Aplicação em múltiplas camadas com diferentes graus de opacidade e translucidez, imitando a estrutura natural do dente.
                  </p>
                </div>
              </div>
            </div>

            {/* Diferencial 4 */}
            <div className="bg-white p-8 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Focus className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-2">Análise Oclusal Detalhada</h3>
                  <p className="text-dental-gray leading-relaxed">
                    Verificação da distribuição correta das forças mastigatórias para evitar sobrecarga e garantir longevidade.
                  </p>
                </div>
              </div>
            </div>

            {/* Diferencial 5 */}
            <div className="bg-white p-8 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                  <Gem className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-2">Acabamento Premium</h3>
                  <p className="text-dental-gray leading-relaxed">
                    Polimento de alta performance que confere brilho vítreo e textura que imitam perfeitamente o esmalte dental natural.
                  </p>
                </div>
              </div>
            </div>

            {/* Diferencial 6 */}
            <div className="bg-white p-8 rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-dental-purple mb-2">Protocolo para Bruxismo</h3>
                  <p className="text-dental-gray leading-relaxed">
                    Confecção de placa miorrelaxante quando necessário para proteger as restaurações e prevenir desgastes precoces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 13: DIVIDER */}
      <SectionDivider variant="with-icon" icon={<Scan size={20} />} />

      {/* SEÇÃO 14: TECNOLOGIA iTERO */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Imagem com blur decorativo */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elegant">
                <img 
                  src="/lovable-uploads/scanner 3d.webp" 
                  alt="Scanner iTero Element 5D - Tecnologia de diagnóstico digital"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-dental-purple/20 rounded-full blur-3xl"></div>
            </div>

            {/* Conteúdo */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-dental-purple/10 flex items-center justify-center">
                  <Scan className="w-7 h-7 text-dental-purple" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple">
                  Diagnóstico Digital de Alta Precisão
                </h2>
              </div>

              <p className="text-lg text-dental-gray leading-relaxed mb-8">
                O <span className="font-semibold text-dental-purple">iTero Element 5D</span> é o scanner intraoral mais avançado do mercado, oferecendo diagnóstico em tempo real e precisão milimétrica.
              </p>

              {/* Funcionalidades */}
              <div className="space-y-6">
                {/* Funcionalidade 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <Search className="w-5 h-5 text-dental-purple" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dental-purple mb-1">Detecção Precoce de Cáries</h3>
                    <p className="text-dental-gray">Identificação de lesões invisíveis a olho nu, permitindo tratamento preventivo.</p>
                  </div>
                </div>

                {/* Funcionalidade 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dental-purple mb-1">Análise de Desgastes</h3>
                    <p className="text-dental-gray">Mapeamento de áreas de atrito excessivo por bruxismo ou má oclusão.</p>
                  </div>
                </div>

                {/* Funcionalidade 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dental-purple mb-1">Moldagem Digital</h3>
                    <p className="text-dental-gray">Captura 3D sem desconforto, náuseas ou materiais de moldagem tradicionais.</p>
                  </div>
                </div>

                {/* Funcionalidade 4 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-dental-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-dental-purple mb-1">Comunicação Visual</h3>
                    <p className="text-dental-gray">Visualização em tempo real na tela, facilitando compreensão do diagnóstico e plano de tratamento.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 15: DIVIDER */}
      <SectionDivider variant="with-icon" icon={<HelpCircle size={20} />} />

      {/* SEÇÃO 16: FAQS */}
      <section className="py-16 bg-dental-beige/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-dental-gray">
              Respostas para as dúvidas mais comuns sobre restaurações estéticas
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {/* FAQ 1 */}
            <AccordionItem value="item-1" className="bg-white rounded-lg border border-dental-purple/20 px-6">
              <AccordionTrigger className="text-left text-base font-semibold text-dental-purple hover:text-dental-gold transition-colors py-6">
                O que é uma restauração dental estética?
              </AccordionTrigger>
              <AccordionContent className="text-dental-gray leading-relaxed pb-6">
                É um procedimento que reconstrói dentes comprometidos por cáries, fraturas ou trincas utilizando materiais de alta qualidade (resina composta ou porcelana) que mimetizam perfeitamente a cor, brilho e textura dos dentes naturais. Diferente das antigas "obturações" escuras de amálgama, as restaurações estéticas são praticamente invisíveis.
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 2 */}
            <AccordionItem value="item-2" className="bg-white rounded-lg border border-dental-purple/20 px-6">
              <AccordionTrigger className="text-left text-base font-semibold text-dental-purple hover:text-dental-gold transition-colors py-6">
                Quando uma restauração é necessária?
              </AccordionTrigger>
              <AccordionContent className="text-dental-gray leading-relaxed pb-6">
                <p className="mb-3">Restaurações são indicadas em diversas situações:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Presença de cáries (pequenas, médias ou extensas)</li>
                  <li>Fraturas dentais por trauma ou desgaste</li>
                  <li>Trincas que causam sensibilidade</li>
                  <li>Substituição de restaurações antigas escurecidas</li>
                  <li>Correção de formato ou fechamento de pequenos espaços</li>
                  <li>Reconstrução após tratamento de canal</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 3 */}
            <AccordionItem value="item-3" className="bg-white rounded-lg border border-dental-purple/20 px-6">
              <AccordionTrigger className="text-left text-base font-semibold text-dental-purple hover:text-dental-gold transition-colors py-6">
                Qual material é usado nas restaurações estéticas?
              </AccordionTrigger>
              <AccordionContent className="text-dental-gray leading-relaxed pb-6">
                Utilizamos resinas compostas de última geração com nanotecnologia, que oferecem alta resistência, estética natural e durabilidade. Para casos que exigem máxima longevidade (grandes restaurações posteriores), indicamos porcelanas ou resinas laboratoriais (inlay/onlay), que são confeccionadas em laboratório e proporcionam ainda mais resistência.
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 4 */}
            <AccordionItem value="item-4" className="bg-white rounded-lg border border-dental-purple/20 px-6">
              <AccordionTrigger className="text-left text-base font-semibold text-dental-purple hover:text-dental-gold transition-colors py-6">
                Fazer restauração dói?
              </AccordionTrigger>
              <AccordionContent className="text-dental-gray leading-relaxed pb-6">
                Não. Utilizamos anestesia local de alta qualidade com técnica indolor. A maioria dos pacientes relata não sentir desconforto durante o procedimento. Após o término do efeito anestésico, pode haver sensibilidade leve por 24-48h, facilmente controlada com analgésicos comuns se necessário.
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 5 */}
            <AccordionItem value="item-5" className="bg-white rounded-lg border border-dental-purple/20 px-6">
              <AccordionTrigger className="text-left text-base font-semibold text-dental-purple hover:text-dental-gold transition-colors py-6">
                Quanto tempo dura uma restauração estética?
              </AccordionTrigger>
              <AccordionContent className="text-dental-gray leading-relaxed pb-6">
                A durabilidade varia conforme o tipo de restauração e cuidados do paciente:
                <ul className="list-disc pl-5 space-y-2 mt-3">
                  <li><strong>Restaurações diretas (resina):</strong> 5 a 8 anos em média</li>
                  <li><strong>Restaurações indiretas (inlay/onlay de porcelana):</strong> 12 a 15 anos ou mais</li>
                </ul>
                <p className="mt-3">Fatores que prolongam a vida útil: boa higiene oral, check-ups regulares, não roer unhas, evitar abrir embalagens com os dentes e usar placa para bruxismo quando indicado.</p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 6 */}
            <AccordionItem value="item-6" className="bg-white rounded-lg border border-dental-purple/20 px-6">
              <AccordionTrigger className="text-left text-base font-semibold text-dental-purple hover:text-dental-gold transition-colors py-6">
                Posso trocar minhas restaurações antigas escuras?
              </AccordionTrigger>
              <AccordionContent className="text-dental-gray leading-relaxed pb-6">
                Sim! A substituição de restaurações antigas de amálgama (metálicas) por restaurações estéticas em resina é um dos procedimentos mais procurados. Além do benefício estético, eliminamos o risco de microinfiltrações comuns em restaurações antigas e removemos o metal da boca. A troca é feita de forma conservadora, preservando o máximo de estrutura dental sadia.
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 7 */}
            <AccordionItem value="item-7" className="bg-white rounded-lg border border-dental-purple/20 px-6">
              <AccordionTrigger className="text-left text-base font-semibold text-dental-purple hover:text-dental-gold transition-colors py-6">
                Restauração em resina mancha com o tempo?
              </AccordionTrigger>
              <AccordionContent className="text-dental-gray leading-relaxed pb-6">
                As resinas modernas de alta qualidade apresentam excelente estabilidade de cor. Com os cuidados adequados (boa higiene, polimentos periódicos no dentista e moderação no consumo de alimentos muito pigmentados como café, vinho tinto e açaí), as restaurações mantêm sua cor original por muitos anos. Quando necessário, é possível fazer polimento profissional para renovar o brilho.
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 8 */}
            <AccordionItem value="item-8" className="bg-white rounded-lg border border-dental-purple/20 px-6">
              <AccordionTrigger className="text-left text-base font-semibold text-dental-purple hover:text-dental-gold transition-colors py-6">
                Qual a diferença entre restauração e obturação?
              </AccordionTrigger>
              <AccordionContent className="text-dental-gray leading-relaxed pb-6">
                Na prática odontológica moderna, os termos são sinônimos — ambos se referem ao preenchimento de uma cavidade dental. "Obturação" é um termo mais antigo, frequentemente associado às restaurações em amálgama (metálicas). "Restauração" é o termo técnico correto e mais abrangente, pois enfatiza o objetivo do tratamento: restaurar forma, função e estética. Hoje, priorizamos sempre restaurações estéticas em materiais tooth-colored (da cor do dente).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* SEÇÃO 17: DIVIDER */}
      <SectionDivider variant="with-icon" icon={<ArrowRight size={20} />} />

      {/* SEÇÃO 18: CTA FINAL */}
      <section className="py-20 bg-gradient-to-br from-dental-purple via-dental-purple to-dental-gold text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-10 h-10 text-dental-gold" />
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Recupere a Saúde e a Beleza do Seu Sorriso
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-white/90">
            Restaurações estéticas que unem precisão técnica, materiais de excelência e resultado natural.
          </p>

          <button
            onClick={() => handleWhatsAppClick("Olá! Vi a página sobre restaurações estéticas e gostaria de agendar uma avaliação com a Dra. Carla Christoph.")}
            className="inline-flex items-center gap-3 bg-white text-dental-purple px-8 py-4 rounded-full text-lg font-semibold shadow-elegant hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="w-6 h-6" />
            Agendar Avaliação pelo WhatsApp
            <ArrowRight className="w-6 h-6" />
          </button>

          <p className="mt-8 text-white/80 text-sm">
            Atendimento de segunda a sexta, das 9h às 19h
          </p>
        </div>
      </section>

    </PageLayout>
  );
};

export default RestaureacoesEsteticas;
