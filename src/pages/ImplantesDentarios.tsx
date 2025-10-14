import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import SectionDivider from "@/components/treatment/SectionDivider";
import ProcessTimeline from "@/components/treatment/ProcessTimeline";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Cpu, Scan, Shield, Heart, Activity, Clock, CheckCircle, 
  Award, HelpCircle, Smile, Sparkles
} from "lucide-react";

const ImplantesDentarios = () => {
  const handleWhatsAppClick = () => {
    // GTM tracking
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'CTA Implantes'
      });
    }
    
    // Google Ads conversion
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9'
      });
    }

    // GCLID tracking
    const gclid = new URLSearchParams(window.location.search).get('gclid');
    if (gclid) {
      localStorage.setItem('gclid', gclid);
    }
    
    // Open WhatsApp
    const phone = "5521993304045";
    const message = "Olá! Vi a página sobre implantes dentários e gostaria de agendar uma avaliação com a Dra. Carla Christoph.";
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
        <meta property="og:image" content="/lovable-uploads/Implante unitario.webp" />
        <meta property="og:url" content="https://dracarlachristoph.com/implantes-dentarios" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Implantes Dentários em Ipanema | Dra. Carla Christoph" />
        <meta name="twitter:description" content="Implantes dentários em Ipanema com planejamento digital 3D e técnicas minimamente invasivas." />
        
        <link rel="canonical" href="https://dracarlachristoph.com/implantes-dentarios" />
        
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
                "addressLocality": "Ipanema",
                "addressRegion": "Rio de Janeiro",
                "addressCountry": "BR"
              }
            }
          })}
        </script>
      </Helmet>

      <PageLayout>
        <TreatmentHero
          title="Implantes Dentários e Reabilitação Oral"
          subtitle="Especialidade da Dra. Carla Christoph"
          description="Recupere a função mastigatória, estética natural e autoconfiança com implantes de titânio biocompatível. Planejamento digital 3D e técnicas minimamente invasivas para resultados previsíveis e duradouros."
          badges={["20+ anos de experiência", "CRO-RJ 27.509", "Scanner digital 3D"]}
          doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
          breadcrumbs={[
            { label: "Início", href: "/" },
            { label: "Tratamentos", href: "/servicos" },
            { label: "Implantes Dentários" }
          ]}
        />

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
                <div className="aspect-[4/3] relative">
                  <img 
                    src="/lovable-uploads/Implante unitario.webp"
                    alt="Implante Unitário"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-display font-bold mb-2">Implante Unitário</h3>
                    <p className="text-sm text-white/90">
                      Substitui um único dente perdido sem comprometer os dentes adjacentes. Pino de titânio + coroa em cerâmica pura para resultado natural e durável.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-4">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="detalhes" className="border-none">
                      <AccordionTrigger className="text-dental-purple font-semibold hover:no-underline">
                        Ver Detalhes Completos
                      </AccordionTrigger>
                      <AccordionContent className="text-dental-gray space-y-3 pt-2">
                        <div>
                          <p className="font-semibold text-dental-purple mb-1">O que é:</p>
                          <p className="text-sm">Solução definitiva para substituir um único dente perdido sem necessidade de desgastar os dentes vizinhos. O pino de titânio biocompatível é instalado no osso, substituindo a raiz do dente ausente.</p>
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
                          <p className="text-sm">Preserva dentes adjacentes saudáveis, estética impecável com aspecto de dente natural, durabilidade superior a pontes convencionais e conforto total.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* Card 2: Ponte sobre Implantes */}
              <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
                <div className="aspect-[4/3] relative">
                  <img 
                    src="/lovable-uploads/Ponte Implante.webp"
                    alt="Ponte sobre Implantes"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-display font-bold mb-2">Ponte sobre Implantes</h3>
                    <p className="text-sm text-white/90">
                      Reabilita múltiplos dentes ausentes adjacentes com dois ou mais implantes. Estabilidade superior às pontes convencionais sem desgaste de dentes saudáveis.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-4">
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
                <div className="aspect-[4/3] relative">
                  <img 
                    src="/lovable-uploads/all in 4.webp"
                    alt="Protocolo All-on-4/6"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-display font-bold mb-2">Protocolo All-on-4/6</h3>
                    <p className="text-sm text-white/90">
                      Reabilitação total de arcada com apenas 4 a 6 implantes estrategicamente posicionados. Prótese fixa completa com excelente custo-benefício.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-4">
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
                <div className="aspect-[4/3] relative">
                  <img 
                    src="/lovable-uploads/Overdenture com clips de retenção.webp"
                    alt="Overdenture"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-display font-bold mb-2">Overdenture</h3>
                    <p className="text-sm text-white/90">
                      Prótese removível com encaixe de precisão sobre 2 a 4 implantes. Estabilidade e retenção superiores às dentaduras convencionais com investimento acessível.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-4">
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

        <SectionDivider variant="with-icon" icon={<Sparkles className="w-5 h-5" />} />

        {/* Seção Diferencial Premium */}
        <section className="py-12 bg-dental-beige/20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple mb-4">
                Diferenciais do Nosso Tratamento
              </h2>
              <p className="text-lg text-dental-gray">
                Tecnologia de ponta e cuidado personalizado para resultados excepcionais
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
                    Implantes Premium
                  </h3>
                  <p className="text-dental-gray">
                    Utilizamos apenas implantes de marcas líderes mundiais com superfície tratada que favorece a osseointegração e garante longevidade.
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
        <ProcessTimeline 
          title="Jornada do Tratamento: Do Planejamento ao Sorriso Completo"
          subtitle="Cada etapa é cuidadosamente executada para resultados previsíveis"
          steps={[
            {
              number: "1",
              title: "Avaliação e Solicitação de Exames",
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
              description: "Moldagem com scanner intraoral ou convencional. Confecção da prótese definitiva em cerâmica pura com cor, forma e translucidez naturais. Instalação e ajustes finais para conforto e estética impecáveis.",
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

        <SectionDivider variant="with-icon" icon={<Award className="w-5 h-5" />} />

        {/* Seção da Especialista */}
        <section className="py-16 bg-gradient-to-br from-dental-purple/5 via-dental-beige/20 to-dental-purple/5">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-[300px,1fr] gap-8 items-start">
              {/* Coluna Imagem */}
              <div className="relative mx-auto md:mx-0">
                <img 
                  src="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
                  alt="Dra. Carla Christoph"
                  className="w-full rounded-2xl shadow-elegant"
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-dental-gold text-white px-6 py-2 rounded-full shadow-lg font-semibold text-sm whitespace-nowrap">
                  4000+ pacientes atendidos
                </div>
              </div>

              {/* Coluna Conteúdo */}
              <div className="bg-white p-8 rounded-2xl shadow-soft">
                <h2 className="text-3xl font-display font-bold text-dental-purple mb-2">
                  Dra. Carla Christoph
                </h2>
                <p className="text-xl text-dental-gold font-semibold mb-4">
                  Especialista em Reabilitação Oral e Implantodontia
                </p>
                
                <p className="text-dental-gray mb-4">
                  Com mais de 20 anos de experiência, a Dra. Carla é especialista em implantodontia e próteses no Rio de Janeiro. Atualização constante em congressos nacionais e internacionais, domínio de técnicas modernas de cirurgia e planejamento digital 3D.
                </p>
                
                <p className="text-dental-gray mb-6">
                  Cada tratamento é meticulosamente planejado considerando anatomia individual, expectativas estéticas e qualidade de vida. O objetivo é sempre devolver não apenas dentes, mas confiança e bem-estar.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-dental-gold flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-dental-purple">CRO-RJ 27.509</p>
                      <p className="text-sm text-dental-gray">Mais de 20 anos de atuação</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-dental-gold flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-dental-purple">Especialização</p>
                      <p className="text-sm text-dental-gray">Prótese, Implantodontia e Estética</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-dental-gold flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-dental-purple">Tecnologia</p>
                      <p className="text-sm text-dental-gray">Scanner digital 3D, planejamento avançado</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-dental-gold flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-dental-purple">Experiência</p>
                      <p className="text-sm text-dental-gray">Centenas de casos complexos resolvidos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider variant="with-icon" icon={<HelpCircle className="w-5 h-5" />} />

        {/* FAQ Section */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple text-center mb-12">
              Perguntas Frequentes Sobre Implantes Dentários
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="faq-1" className="border border-dental-beige rounded-lg px-6">
                <AccordionTrigger className="text-left text-dental-purple font-semibold hover:no-underline">
                  O que são implantes dentários?
                </AccordionTrigger>
                <AccordionContent className="text-dental-gray">
                  São pinos de titânio biocompatível instalados cirurgicamente no osso da mandíbula ou maxila, substituindo a raiz do dente perdido. Sobre estes pinos, fixamos coroas, pontes ou próteses completas, restaurando função mastigatória, estética e fonética.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2" className="border border-dental-beige rounded-lg px-6">
                <AccordionTrigger className="text-left text-dental-purple font-semibold hover:no-underline">
                  O procedimento é doloroso?
                </AccordionTrigger>
                <AccordionContent className="text-dental-gray">
                  A cirurgia é realizada sob anestesia local, sem dor durante o procedimento. O pós-operatório é geralmente tranquilo, com desconforto leve controlado por medicação. A maioria dos pacientes retorna às atividades normais em 2 a 3 dias.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3" className="border border-dental-beige rounded-lg px-6">
                <AccordionTrigger className="text-left text-dental-purple font-semibold hover:no-underline">
                  Quanto tempo dura o tratamento completo?
                </AccordionTrigger>
                <AccordionContent className="text-dental-gray">
                  O tempo varia conforme o caso. Em média, de 4 a 6 meses desde a instalação do implante até a prótese definitiva, incluindo o período de osseointegração (3 a 6 meses). Em casos com carga imediata selecionados, a prótese provisória é instalada conforme planejamento.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-4" className="border border-dental-beige rounded-lg px-6">
                <AccordionTrigger className="text-left text-dental-purple font-semibold hover:no-underline">
                  Qualquer pessoa pode colocar implantes?
                </AccordionTrigger>
                <AccordionContent className="text-dental-gray">
                  A maioria dos adultos saudáveis é candidata. Avaliamos saúde geral, quantidade e qualidade óssea, hábitos (tabagismo) e condições sistêmicas (diabetes controlado). Em casos de osso insuficiente, enxertos ósseos podem viabilizar o tratamento.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-5" className="border border-dental-beige rounded-lg px-6">
                <AccordionTrigger className="text-left text-dental-purple font-semibold hover:no-underline">
                  Quanto tempo duram os implantes?
                </AccordionTrigger>
                <AccordionContent className="text-dental-gray">
                  Com higiene adequada e manutenções regulares, implantes podem durar décadas ou a vida toda. Estudos mostram taxa de sucesso acima de 95% em 10 anos. A coroa protética pode precisar ser substituída após 10 a 15 anos dependendo do desgaste.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-6" className="border border-dental-beige rounded-lg px-6">
                <AccordionTrigger className="text-left text-dental-purple font-semibold hover:no-underline">
                  Como é a manutenção dos implantes?
                </AccordionTrigger>
                <AccordionContent className="text-dental-gray">
                  Higienização rigorosa com escova, fio dental e escovas interdentais específicas. Retornos semestrais para controle profissional, radiografias periódicas e avaliação da saúde peri-implantar. Evitar sobrecarga excessiva e trauma.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-7" className="border border-dental-beige rounded-lg px-6">
                <AccordionTrigger className="text-left text-dental-purple font-semibold hover:no-underline">
                  Existe rejeição de implantes?
                </AccordionTrigger>
                <AccordionContent className="text-dental-gray">
                  O titânio é biocompatível e não causa rejeição imunológica. Falhas ocorrem por infecção, sobrecarga precoce, tabagismo ou higiene inadequada, não por rejeição. Taxa de sucesso é superior a 95% quando protocolos são seguidos.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-8" className="border border-dental-beige rounded-lg px-6">
                <AccordionTrigger className="text-left text-dental-purple font-semibold hover:no-underline">
                  Posso fazer se tiver pouco osso?
                </AccordionTrigger>
                <AccordionContent className="text-dental-gray">
                  Sim. Técnicas de enxerto ósseo (autógeno, biomaterial) ou levantamento de seio maxilar podem aumentar volume ósseo. Implantes curtos ou angulados também são alternativas. Os exames de imagem permitem planejar a melhor solução para cada caso.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-9" className="border border-dental-beige rounded-lg px-6">
                <AccordionTrigger className="text-left text-dental-purple font-semibold hover:no-underline">
                  Qual a diferença entre implante e prótese?
                </AccordionTrigger>
                <AccordionContent className="text-dental-gray">
                  O implante é o pino de titânio fixado no osso (substitui a raiz). A prótese é a parte visível (coroa, ponte ou dentadura) que se conecta ao implante. O conjunto completo restaura função e estética.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-10" className="border border-dental-beige rounded-lg px-6">
                <AccordionTrigger className="text-left text-dental-purple font-semibold hover:no-underline">
                  Fumantes podem fazer implantes?
                </AccordionTrigger>
                <AccordionContent className="text-dental-gray">
                  Sim, mas o tabagismo reduz a taxa de sucesso (de 95% para aproximadamente 85%) por prejudicar cicatrização e osseointegração. Recomendamos parar de fumar pelo menos 2 semanas antes da cirurgia e durante a cicatrização. Avaliação individual é essencial.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-11" className="border border-dental-beige rounded-lg px-6">
                <AccordionTrigger className="text-left text-dental-purple font-semibold hover:no-underline">
                  Diabéticos podem colocar implantes?
                </AccordionTrigger>
                <AccordionContent className="text-dental-gray">
                  Sim, desde que o diabetes esteja controlado (hemoglobina glicada abaixo de 7%). Avaliação médica prévia é importante. O controle glicêmico adequado garante cicatrização normal e taxa de sucesso equivalente a não-diabéticos.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-12" className="border border-dental-beige rounded-lg px-6">
                <AccordionTrigger className="text-left text-dental-purple font-semibold hover:no-underline">
                  Vocês atendem convênios odontológicos?
                </AccordionTrigger>
                <AccordionContent className="text-dental-gray">
                  Nosso atendimento é exclusivamente particular, o que nos permite dedicar tempo adequado a cada paciente e utilizar materiais premium. Oferecemos orçamento detalhado e transparente na primeira consulta.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-r from-dental-purple to-dental-gold">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Smile className="w-12 h-12 text-white mx-auto mb-4" />
            
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Pronto para Recuperar seu Sorriso?
            </h2>
            
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Agende sua consulta de avaliação e planejamento digital. Vamos avaliar seu caso de forma personalizada e apresentar as melhores soluções para sua necessidade.
            </p>

            <button
              onClick={handleWhatsAppClick}
              className="bg-white hover:bg-dental-beige text-dental-purple px-8 py-4 text-lg rounded-lg font-semibold inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-xl mb-4"
            >
              Agendar Avaliação
            </button>

            <div className="mt-4">
              <a href="/contato" className="text-white underline inline-block">
                Outras Formas de Contato
              </a>
            </div>

            <p className="text-white/80 text-sm mt-6">
              WhatsApp: (21) 99330-4045 | Atendimento de segunda a sexta, 9h às 19h
            </p>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default ImplantesDentarios;