import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import ComparisonTable from "@/components/blog/ComparisonTable";
import OptimizedImage from "@/components/OptimizedImage";
import { ComparisonTableItem } from "@/types/BlogPost";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Star, ArrowRight, Clock, Sparkles, Shield, Heart, Award } from "lucide-react";

const ProteseDentaria = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Prótese Dentária em Ipanema: Recupere Função e Estética do Sorriso</title>
        <meta name="description" content="Prótese dentária em Ipanema com especialista. Coroas, pontes e próteses sobre implante. Reabilitação oral completa com 20+ anos de experiência." />
        <link rel="canonical" href="https://www.dracarlachristoph.com/protese-dentaria" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Prótese Dentária em Ipanema | Reabilitação Oral" />
        <meta property="og:description" content="Recupere função e estética do sorriso com prótese dentária de alta qualidade em Ipanema." />
        <meta property="og:url" content="https://www.dracarlachristoph.com/protese-dentaria" />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Prótese Dentária",
            "description": "Reabilitação oral com próteses dentárias fixas e removíveis",
            "procedureType": "Dental",
            "provider": {
              "@type": "Dentist",
              "name": "Dra. Carla Christoph",
              "telephone": "+55-21-99330-4045",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ipanema",
                "addressRegion": "RJ"
              }
            }
          })}
        </script>
      </Helmet>

      {/* HERO SECTION */}
      <div className="container mx-auto px-4 py-12">
        <ServiceBreadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Tratamentos", href: "/tratamentos" },
            { label: "Prótese Dentária" }
          ]}
        />
        
        <h1 className="text-4xl md:text-5xl font-light text-dental-purple mb-4">
          Prótese Dentária em Ipanema: Recupere Função e Estética do Sorriso
        </h1>
        
        <p className="text-lg text-dental-gray mb-8">
          Recupere a confiança, função mastigatória e qualidade de vida
        </p>
      </div>

      {/* QUICK ANSWER BOX */}
      <QuickAnswerBox
        answer="Prótese dentária é a especialidade odontológica que restaura e substitui dentes ausentes ou danificados através de coroas, pontes, próteses removíveis ou sobre implantes. O tratamento devolve função mastigatória, estética natural e qualidade de vida, com planejamento individualizado e materiais de alta qualidade."
      />

      {/* INTRODUÇÃO PROFISSIONAL */}
      <div className="container mx-auto px-4 py-8">
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed text-dental-gray">
            Sabemos como a perda dentária impacta profundamente sua vida. Não é apenas sobre 
            estética - é sobre o constrangimento em reuniões sociais, a dificuldade para 
            saborear seus pratos favoritos, as mudanças na fala que afetam sua comunicação. 
            Compreendemos essas dificuldades e, mais importante, temos as soluções para 
            transformar essa realidade.
          </p>
          
          <p className="text-lg leading-relaxed text-dental-gray mt-4">
            Com mais de 20 anos dedicados à reabilitação oral, desenvolvemos em nossa clínica 
            em Ipanema um protocolo que une tecnologia de ponta - como scanner intraoral iTero 
            e planejamento digital - com um cuidado verdadeiramente personalizado. Cada prótese 
            é planejada considerando não apenas a função, mas a harmonia com seu rosto e seu 
            estilo de vida.
          </p>
        </div>
      </div>

      {/* CARDS DE MODALIDADES DE PRÓTESE */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-dental-purple mb-8">
            Modalidades de Prótese Dentária Disponíveis
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* COROAS DENTÁRIAS */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="text-dental-gold mb-4">
                <Sparkles size={32} />
              </div>
              <h3 className="text-xl font-medium text-dental-purple mb-3">
                Coroas Dentárias
              </h3>
              <p className="text-dental-gray mb-4">
                Capas protetoras em cerâmica pura ou zircônia que recobrem e protegem 
                dentes danificados, devolvendo forma, função e estética impecável.
              </p>
              <ul className="space-y-2 text-sm text-dental-gray">
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Proteção completa do dente
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Estética indistinguível do natural
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Durabilidade superior a 15 anos
                </li>
              </ul>
            </div>

            {/* PONTES FIXAS */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="text-dental-purple mb-4">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-medium text-dental-purple mb-3">
                Pontes Fixas
              </h3>
              <p className="text-dental-gray mb-4">
                Substituem um ou mais dentes ausentes através de uma estrutura fixa 
                apoiada em dentes vizinhos ou implantes.
              </p>
              <ul className="space-y-2 text-sm text-dental-gray">
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Solução fixa e confortável
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Mastigação segura
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Sem metal aparente
                </li>
              </ul>
            </div>

            {/* PRÓTESE SOBRE IMPLANTE */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="text-dental-gold mb-4">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-medium text-dental-purple mb-3">
                Prótese Sobre Implante
              </h3>
              <p className="text-dental-gray mb-4">
                A solução mais avançada: próteses fixas ou removíveis ancoradas em 
                implantes, oferecendo máxima estabilidade.
              </p>
              <ul className="space-y-2 text-sm text-dental-gray">
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Preservação óssea total
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Sensação natural
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Maior longevidade
                </li>
              </ul>
            </div>

            {/* PRÓTESES REMOVÍVEIS */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="text-dental-purple mb-4">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-medium text-dental-purple mb-3">
                Próteses Removíveis
              </h3>
              <p className="text-dental-gray mb-4">
                Parciais (PPR) ou totais (dentaduras) modernas, com melhor adaptação 
                e estética superior.
              </p>
              <ul className="space-y-2 text-sm text-dental-gray">
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Solução acessível
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Fácil manutenção
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Rápida adaptação
                </li>
              </ul>
            </div>

            {/* PROTOCOLO ALL-ON-4/6 */}
            <div className="bg-white rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="text-dental-gold mb-4">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-medium text-dental-purple mb-3">
                Protocolo All-on-4/6
              </h3>
              <p className="text-dental-gray mb-4">
                Reabilitação total da arcada sobre 4 ou 6 implantes, com prótese fixa 
                para transformação completa do sorriso.
              </p>
              <ul className="space-y-2 text-sm text-dental-gray">
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Dentes fixos definitivos
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Sem enxerto ósseo
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Transformação completa
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TABELA COMPARATIVA TÉCNICA */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-light text-dental-purple mb-8 text-center">
          Comparação entre Tipos de Prótese
        </h2>
        <ComparisonTable
          data={[
            { Criterio: "Comparação", "Coroa/Ponte": "Coroa/Ponte", "Removível": "Removível", "Sobre Implante": "Sobre Implante" },
            { Criterio: "Indicação", "Coroa/Ponte": "1-3 dentes", "Removível": "Múltiplos/todos", "Sobre Implante": "Qualquer quantidade" },
            { Criterio: "Fixação", "Coroa/Ponte": "Dente preparado", "Removível": "Grampos/mucosa", "Sobre Implante": "Implante ósseo" },
            { Criterio: "Durabilidade", "Coroa/Ponte": "10-15 anos", "Removível": "5-7 anos", "Sobre Implante": "20+ anos" },
            { Criterio: "Preserva osso", "Coroa/Ponte": "Parcial", "Removível": "Não", "Sobre Implante": "Total" },
            { Criterio: "Sensação", "Coroa/Ponte": "Natural", "Removível": "Adaptação", "Sobre Implante": "Como dente próprio" },
            { Criterio: "Manutenção", "Coroa/Ponte": "Como dente", "Removível": "Remove p/ limpar", "Sobre Implante": "Como dente" },
            { Criterio: "Investimento", "Coroa/Ponte": "Moderado", "Removível": "Inicial menor", "Sobre Implante": "Maior (melhor custo-benefício)" }
          ]}
        />
      </div>

      {/* PROCESSO DETALHADO */}
      <section className="py-16 bg-dental-beige/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-dental-purple mb-4 text-center">
            Sua Jornada para um Novo Sorriso
          </h2>
          <p className="text-center text-dental-gray mb-12 max-w-2xl mx-auto">
            Cada etapa é cuidadosamente planejada para garantir conforto, precisão e resultados excepcionais
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-dental-gold/10 flex items-center justify-center">
                  <span className="text-dental-gold font-semibold">1</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-dental-purple mb-2">
                  Consulta de Diagnóstico Completo
                </h3>
                <p className="text-dental-gray">
                  Análise facial, exame clínico, radiografias digitais e escaneamento 
                  intraoral para diagnóstico preciso e planejamento personalizado.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-dental-gold/10 flex items-center justify-center">
                  <span className="text-dental-gold font-semibold">2</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-dental-purple mb-2">
                  Preparo Minimamente Invasivo
                </h3>
                <p className="text-dental-gray">
                  Quando necessário, preparamos os dentes com máxima preservação de 
                  estrutura saudável, sempre priorizando técnicas conservadoras.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-dental-gold/10 flex items-center justify-center">
                  <span className="text-dental-gold font-semibold">3</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-dental-purple mb-2">
                  Moldagem Digital de Precisão
                </h3>
                <p className="text-dental-gray">
                  Scanner intraoral elimina desconforto de moldeiras, garantindo precisão 
                  milimétrica. O arquivo 3D é enviado diretamente ao laboratório parceiro 
                  para confecção da prótese.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-dental-gold/10 flex items-center justify-center">
                  <span className="text-dental-gold font-semibold">4</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-dental-purple mb-2">
                  Prova e Ajustes Estéticos
                </h3>
                <p className="text-dental-gray">
                  Antes da finalização, realizamos provas para garantir encaixe perfeito, 
                  conforto ideal e estética natural que harmonize com seu sorriso.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-dental-gold/10 flex items-center justify-center">
                  <span className="text-dental-gold font-semibold">5</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-dental-purple mb-2">
                  Instalação Definitiva
                </h3>
                <p className="text-dental-gray">
                  Cimentação com materiais de última geração, garantindo longevidade e 
                  naturalidade. Você sai com seu novo sorriso e todas as orientações de cuidados.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-dental-gold/10 flex items-center justify-center">
                  <span className="text-dental-gold font-semibold">6</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-dental-purple mb-2">
                  Acompanhamento Continuado
                </h3>
                <p className="text-dental-gray">
                  Consultas de manutenção para preservar seu investimento e garantir a 
                  saúde do seu sorriso por muitos anos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASOS ESPECIAIS */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-dental-purple mb-8">
            Soluções para Casos Complexos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-medium text-dental-purple mb-3">
                Reabilitação Oral Completa
              </h3>
              <p className="text-dental-gray mb-4">
                Para casos de múltiplas perdas, desgaste severo ou problemas de mordida, 
                desenvolvemos um protocolo completo que restabelece função, estética e 
                dimensão vertical, com rejuvenescimento facial natural.
              </p>
              <ul className="space-y-2 text-sm text-dental-gray">
                <li className="flex items-start">
                  <ArrowRight className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Análise oclusal completa
                </li>
                <li className="flex items-start">
                  <ArrowRight className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Restabelecimento da mordida
                </li>
                <li className="flex items-start">
                  <ArrowRight className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Rejuvenescimento facial
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-medium text-dental-purple mb-3">
                Próteses Estéticas de Alta Performance
              </h3>
              <p className="text-dental-gray mb-4">
                Utilizamos cerâmicas de última geração (E-max, Zircônia) com estratificação 
                artesanal, reproduzindo translucidez, textura e caracterização individual 
                dos dentes naturais.
              </p>
              <ul className="space-y-2 text-sm text-dental-gray">
                <li className="flex items-start">
                  <ArrowRight className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Cerâmicas premium importadas
                </li>
                <li className="flex items-start">
                  <ArrowRight className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Estratificação artesanal
                </li>
                <li className="flex items-start">
                  <ArrowRight className="text-dental-gold mr-2 mt-0.5" size={16} />
                  Resultado indistinguível
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DOS ESPECIALISTAS */}
      <section className="py-16 bg-gradient-to-br from-dental-purple/5 to-dental-gold/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-dental-purple mb-8 text-center">
            Expertise e Experiência em Reabilitação Oral
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <OptimizedImage
                    src="/lovable-uploads/dra-carla-avatar.jpg"
                    alt="Dra. Carla Christoph - Especialista em Prótese Dentária"
                    className="w-48 h-48 rounded-full object-cover"
                    width={192}
                    height={192}
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-2xl font-medium text-dental-purple mb-2">
                    Dra. Carla Christoph
                  </h3>
                  <p className="text-dental-gold font-medium mb-4">
                    Especialista em Prótese Dentária e Implantes | CRO-RJ 27.509
                  </p>
                  
                  <div className="space-y-3 text-dental-gray">
                    <p className="flex items-start">
                      <CheckCircle className="text-dental-gold mr-2 mt-0.5 flex-shrink-0" size={16} />
                      Mais de 20 anos dedicados à reabilitação oral
                    </p>
                    <p className="flex items-start">
                      <CheckCircle className="text-dental-gold mr-2 mt-0.5 flex-shrink-0" size={16} />
                      8 anos como dentista militar na Marinha do Brasil nas clínicas de prótese e odontogeriatria
                    </p>
                    <p className="flex items-start">
                      <CheckCircle className="text-dental-gold mr-2 mt-0.5 flex-shrink-0" size={16} />
                      Atualização contínua em técnicas e materiais
                    </p>
                  </div>
                  
                  <p className="mt-4 text-dental-gray italic">
                    "Cada sorriso conta uma história única. Nossa missão é reconstruir 
                    não apenas dentes, mas devolver a confiança para viver plenamente, 
                    sem limitações."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center text-dental-gray">
              <p>
                Trabalhamos em conjunto com especialistas em Periodontia quando o caso 
                requer abordagem multidisciplinar, sempre coordenados pela Dra. Carla 
                para garantir o melhor resultado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs EXPANDIDAS */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-light text-dental-purple mb-8 text-center">
            Perguntas Frequentes sobre Prótese Dentária
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Qual tipo de prótese é melhor para meu caso?",
                  answer: "Cada caso é único e requer avaliação individualizada. A escolha depende de fatores como quantidade de dentes perdidos, condição óssea, saúde gengival, expectativas estéticas e estilo de vida. Durante a consulta de planejamento, analisamos todos esses aspectos para indicar a solução ideal para você."
                },
                {
                  question: "Quanto tempo dura uma prótese bem feita?",
                  answer: "Com materiais de qualidade e cuidados adequados, uma coroa ou ponte pode durar de 15 a 20 anos. Próteses sobre implante tendem a durar ainda mais, podendo ultrapassar 20 anos. A longevidade depende da higiene oral, visitas regulares ao dentista e cuidados diários."
                },
                {
                  question: "Prótese sobre implante vale o investimento?",
                  answer: "Para muitos pacientes, sim. A prótese sobre implante oferece vantagens únicas: preservação óssea total, não desgasta dentes vizinhos, maior durabilidade e sensação natural. Considerando a longevidade e qualidade de vida proporcionada, representa excelente custo-benefício a longo prazo."
                },
                {
                  question: "Como é a manutenção das próteses?",
                  answer: "Próteses fixas (coroas, pontes, sobre implante) são higienizadas como dentes naturais, com escovação e fio dental. Próteses removíveis devem ser retiradas para limpeza com produtos específicos. Visitas semestrais ao dentista são essenciais para manutenção profissional e ajustes quando necessário."
                },
                {
                  question: "Vou ficar sem dentes durante o tratamento?",
                  answer: "Nunca! Sempre providenciamos uma prótese provisória para que você mantenha estética e função durante todo o tratamento. Nosso compromisso é com seu conforto e vida social. Você não passará nenhum momento sem dentes."
                },
                {
                  question: "Prótese pode parecer natural?",
                  answer: "Absolutamente! Utilizamos técnicas como estratificação de cerâmica, caracterização individualizada e ajuste de cor personalizado. O resultado são dentes que imitam perfeitamente a natureza, com translucidez, textura e aparência indistinguíveis dos dentes naturais."
                },
                {
                  question: "Qual a diferença entre porcelana e resina?",
                  answer: "A porcelana (cerâmica) oferece superior estética, durabilidade e resistência a manchas. É nossa escolha para casos definitivos. A resina pode ser usada em provisórios ou situações específicas. Utilizamos apenas materiais premium importados para garantir o melhor resultado."
                },
                {
                  question: "É possível fazer prótese com pouco osso?",
                  answer: "Sim! Para próteses convencionais (não sobre implante), a quantidade óssea não é limitante. Para próteses sobre implante, técnicas como enxerto ósseo ou implantes zigomáticos podem viabilizar o tratamento mesmo com pouco osso. Uma avaliação tomográfica determina as possibilidades."
                },
                {
                  question: "Quando trocar uma prótese antiga?",
                  answer: "Sinais de que é hora de trocar: desgaste visível, mudança de cor, infiltrações, desadaptação, desconforto ao mastigar ou problemas gengivais ao redor da prótese. Uma avaliação profissional pode determinar o momento ideal para substituição."
                },
                {
                  question: "O procedimento é doloroso?",
                  answer: "Os procedimentos são realizados com anestesia local eficaz e técnicas que priorizam o conforto. A maioria dos pacientes relata menos desconforto do que esperavam. Providenciamos medicação adequada e acompanhamento próximo quando necessário."
                },
                {
                  question: "Qual a vantagem de um especialista?",
                  answer: "O especialista tem formação específica de 2-3 anos em prótese, domina técnicas avançadas, trabalha com os melhores laboratórios e tem experiência em casos complexos. Isso se traduz em próteses com melhor adaptação, estética superior e maior durabilidade."
                },
                {
                  question: "Prótese fixa ou removível: como escolher?",
                  answer: "A prótese fixa oferece maior conforto, segurança e sensação natural, mas requer condições específicas (dentes pilares saudáveis ou possibilidade de implantes). A removível é uma opção quando não há suporte para fixa. Avaliamos todos os fatores para indicar a melhor solução."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-dental-purple hover:text-dental-gold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-dental-gray">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-dental-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-4">
            Pronto para Reconstruir seu Sorriso?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Agende sua consulta de planejamento e descubra como a prótese dentária 
            pode transformar sua qualidade de vida. Tecnologia, experiência e 
            cuidado personalizado aguardam você em Ipanema.
          </p>
          
          <a
            href={`https://wa.me/5521993304045?text=${encodeURIComponent(
              'Olá! Vi a página sobre prótese dentária e gostaria de agendar uma avaliação com a Dra. Carla Christoph'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-dental-purple px-8 py-4 rounded-full font-medium hover:bg-dental-beige transition-colors"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            Agendar Avaliação via WhatsApp
          </a>
          
          <p className="mt-6 text-sm opacity-75">
            Atendimento de segunda a sexta, das 9h às 18h
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProteseDentaria;