import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const LPLentesPorcelana = () => {
  const handleWhatsAppClick = async () => {
    // Google Tag Manager tracking
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'Hero CTA - Lentes Porcelana LP'
      });
    }
    
    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9'
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook('lp_lentes_porcelana_cta');
    
    // Open WhatsApp
    const phoneNumber = "5521993304045";
    const message = "Olá! Gostaria de agendar minha avaliação para lentes de contato dental em porcelana.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Lentes de Contato Dental em Porcelana Ipanema | Dra. Carla Christoph</title>
        <meta name="description" content="Lentes de porcelana ultrafinas em Ipanema. Dentes naturalmente brancos que não mancham. Test Drive do Sorriso e scanner 3D. 20+ anos de experiência. CRO-RJ 27.509" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://dracarlachristoph.com/lp/lentes-porcelana-ipanema" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Lentes de Contato Dental em Porcelana Ipanema | Dra. Carla Christoph" />
        <meta property="og:description" content="Lentes de porcelana ultrafinas em Ipanema. Test Drive do Sorriso e scanner 3D iTero." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dracarlachristoph.com/lp/lentes-porcelana-ipanema" />
        <meta property="og:image" content="https://dracarlachristoph.com/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lentes de Contato Dental em Porcelana Ipanema" />
        <meta name="twitter:description" content="Dentes naturalmente brancos que não mancham. 20+ anos de experiência." />
        
        {/* Structured Data - Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            "name": "Dra. Carla Christoph",
            "description": "Especialista em lentes de contato dental em porcelana em Ipanema",
            "telephone": "+5521993304045",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107",
              "addressLocality": "Ipanema",
              "addressRegion": "RJ",
              "postalCode": "22410-002",
              "addressCountry": "BR"
            }
          })}
        </script>
        
        {/* Structured Data - Medical Procedure */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Lentes de Contato Dental em Porcelana",
            "description": "Transformação estética com lentes ultrafinas de porcelana",
            "procedureType": "Dental Cosmetic Procedure"
          })}
        </script>
      </Helmet>

      {/* SEÇÃO 1: HERO LANDING */}
      <section className="bg-gradient-to-b from-dental-beige/30 to-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Coluna Esquerda - Texto */}
            <div className="order-1">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-dental-purple mb-4">
                Lentes de Contato Dental em Porcelana
              </h1>
              
              <p className="text-lg md:text-xl text-dental-gray mb-6 leading-relaxed">
                Sorria com confiança total. Dentes naturalmente brancos, harmônicos e que nunca mancham. 
                Veja seu novo sorriso antes de começar com nosso Test Drive exclusivo.
              </p>
              
              {/* Badges Grid 2x2 */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 bg-dental-purple/10 text-dental-purple rounded-lg p-3 text-sm">
                  <CheckCircle size={16} className="shrink-0" />
                  <span>20+ anos de experiência</span>
                </div>
                <div className="flex items-center gap-2 bg-dental-purple/10 text-dental-purple rounded-lg p-3 text-sm">
                  <CheckCircle size={16} className="shrink-0" />
                  <span>Test Drive do Sorriso</span>
                </div>
                <div className="flex items-center gap-2 bg-dental-purple/10 text-dental-purple rounded-lg p-3 text-sm">
                  <CheckCircle size={16} className="shrink-0" />
                  <span>Scanner iTero 3D</span>
                </div>
                <div className="flex items-center gap-2 bg-dental-purple/10 text-dental-purple rounded-lg p-3 text-sm">
                  <CheckCircle size={16} className="shrink-0" />
                  <span>CRO-RJ 27.509</span>
                </div>
              </div>
              
              {/* CTA Principal */}
              <button
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-dental-purple to-dental-gold hover:opacity-90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 w-full md:w-auto justify-center"
              >
                Quero Agendar Minha Avaliação
              </button>
            </div>
            
            {/* Coluna Direita - Imagem */}
            <div className="order-2">
              <img 
                src="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
                alt="Dra. Carla Christoph - Especialista em Lentes de Porcelana"
                className="rounded-2xl shadow-elegant object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: INDICAÇÕES (3 CARDS) */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-purple text-center mb-12">
            Lentes de Porcelana São Indicadas Para os Seguintes Casos
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* CARD 1: Dentes Manchados */}
            <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/Dentes manchados.webp"
                  alt="Dentes manchados que não respondem ao clareamento"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-display font-bold mb-2">
                    Dentes Manchados que Não Clareiam
                  </h3>
                  <p className="text-sm text-white/90">
                    Manchas por tetraciclina, fluorose ou escurecimento interno que não respondem ao clareamento dental. 
                    As lentes cobrem completamente a coloração natural, criando um branco natural e permanente.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 2: Harmonização */}
            <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/Diastema.webp"
                  alt="Harmonização de forma e alinhamento dental"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-display font-bold mb-2">
                    Harmonização de Forma e Alinhamento
                  </h3>
                  <p className="text-sm text-white/90">
                    Dentes com formato irregular, pequenos desalinhamentos ou espaços entre eles (diastemas). 
                    As lentes criam uniformidade e proporções ideais respeitando sua anatomia facial única.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 3: Desgastes */}
            <div className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/lovable-uploads/Dentes irregulares.webp"
                  alt="Correção de desgastes e fraturas dentais"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/90 via-dental-purple/50 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-display font-bold mb-2">
                    Correção de Desgastes e Pequenas Fraturas
                  </h3>
                  <p className="text-sm text-white/90">
                    Dentes desgastados por bruxismo, fraturas nas bordas ou dentes curtos demais. 
                    As lentes restauram o formato original e protegem contra novos desgastes, mantendo seu sorriso jovem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: ACCORDIONS CENTRALIZADOS */}
      <section className="bg-dental-beige/20 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <Accordion type="single" collapsible className="space-y-4">
            {/* ACCORDION 1: Características Principais */}
            <AccordionItem value="caracteristicas" className="bg-white rounded-lg shadow-soft px-6">
              <AccordionTrigger className="text-left text-lg font-semibold text-dental-purple hover:no-underline">
                Características Principais
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-dental-gray">
                  <li className="flex items-start gap-2">
                    <span className="text-dental-gold mt-1 font-bold">•</span>
                    <span><strong>Espessura:</strong> 0,2 a 0,5mm (ultra-fina)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-dental-gold mt-1 font-bold">•</span>
                    <span><strong>Material:</strong> Cerâmica de dissilicato de lítio ou feldspática</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-dental-gold mt-1 font-bold">•</span>
                    <span><strong>Preparo:</strong> Mínimo (0,1-0,3mm) quando necessário</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-dental-gold mt-1 font-bold">•</span>
                    <span><strong>Durabilidade:</strong> 15 a 20 anos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-dental-gold mt-1 font-bold">•</span>
                    <span><strong>Estética:</strong> Translucidez superior, aspecto natural</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-dental-gold mt-1 font-bold">•</span>
                    <span><strong>Resistência:</strong> Não mancha com alimentos ou bebidas</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* ACCORDION 2: Vantagens e Considerações */}
            <AccordionItem value="vantagens" className="bg-white rounded-lg shadow-soft px-6">
              <AccordionTrigger className="text-left text-lg font-semibold text-dental-purple hover:no-underline">
                Vantagens e Considerações
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                {/* Vantagens */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-semibold text-green-900 mb-2">Vantagens:</p>
                  <ul className="space-y-1 text-dental-gray text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Máxima preservação da estrutura dental original</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Resultado estético natural e duradouro</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Não escurece ou mancha com o tempo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Resistência superior a facetas de resina</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Translucidez que imita dentes naturais</span>
                    </li>
                  </ul>
                </div>

                {/* Considerações */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-blue-900 mb-2">Considerações:</p>
                  <ul className="space-y-1 text-dental-gray text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-dental-gray">•</span>
                      <span>Investimento premium refletindo durabilidade e qualidade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-dental-gray">•</span>
                      <span>Não é reversível (torna-se parte permanente do dente)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-dental-gray">•</span>
                      <span>Requer uso de placa miorrelaxante em casos de bruxismo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-dental-gray">•</span>
                      <span>Impossível reparar se fraturar (necessita substituição)</span>
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* ACCORDION 3: Ideal Para */}
            <AccordionItem value="ideal" className="bg-white rounded-lg shadow-soft px-6">
              <AccordionTrigger className="text-left text-lg font-semibold text-dental-purple hover:no-underline">
                Ideal Para
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                {/* Indicações */}
                <div className="bg-dental-purple/5 p-4 rounded-lg">
                  <p className="font-semibold text-dental-purple mb-2">Indicações:</p>
                  <ul className="space-y-1 text-dental-gray text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-dental-gold font-bold">→</span>
                      <span>Dentes com manchas que não respondem ao clareamento</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-dental-gold font-bold">→</span>
                      <span>Correção de formato, tamanho ou proporções dentais</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-dental-gold font-bold">→</span>
                      <span>Fechamento de diastemas (espaços entre dentes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-dental-gold font-bold">→</span>
                      <span>Pequenos desalinhamentos ou rotações</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-dental-gold font-bold">→</span>
                      <span>Dentes desgastados por bruxismo ou envelhecimento</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-dental-gold font-bold">→</span>
                      <span>Fraturas nas bordas incisais</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-dental-gold font-bold">→</span>
                      <span>Quem busca transformação estética de longo prazo</span>
                    </li>
                  </ul>
                </div>

                {/* Contraindicações */}
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="font-semibold text-red-900 mb-2">Contraindicações:</p>
                  <ul className="space-y-1 text-dental-gray text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Má higiene bucal ou cáries ativas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Doença periodontal não controlada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Bruxismo severo sem uso de placa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Dentes muito desgastados (pode precisar coroa)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Desalinhamento severo (ortodontia prévia necessária)</span>
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* CTA Final */}
          <div className="mt-12 text-center">
            <button
              onClick={handleWhatsAppClick}
              className="bg-gradient-to-r from-dental-purple to-dental-gold hover:opacity-90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              Agendar Minha Avaliação Agora
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LPLentesPorcelana;
