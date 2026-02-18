import React, { Suspense, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import { CheckCircle } from "lucide-react";
import { sendGCLIDToWebhook, captureGCLID } from "@/utils/gclid";
import { lentesPorcelanaAcolhedorConfig } from '@/config/lentesPorcelanaAcolhedorConfig';
import ConsultaInicialHeader from '@/components/landing/consulta/ConsultaInicialHeader';
import LazySection from '@/components/performance/LazySection';

const ConsultaInicialProblem = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialProblem'));
const ConsultaInicialGuide = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialGuide'));
const ConsultaInicialSocialProof = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialSocialProof'));
const ConsultaInicialFAQ = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialFAQ'));
const ConsultaInicialCTA = React.lazy(() => import('@/components/landing/consulta/ConsultaInicialCTA'));
const LandingFooter = React.lazy(() => import('@/components/landing/LandingFooter'));
const FloatingWhatsApp = React.lazy(() => import('@/components/landing/FloatingWhatsApp'));

const config = lentesPorcelanaAcolhedorConfig;

const LPLentesPorcelana = () => {
  useEffect(() => {
    captureGCLID();
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_title: 'LP Lentes Porcelana Ipanema',
        page_location: window.location.href,
        campaign: config.campaign
      });
    }
  }, []);

  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'Hero CTA - Lentes Porcelana LP'
      });
    }

    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9'
      });
    }

    await sendGCLIDToWebhook('lp_lentes_porcelana_cta');

    const phoneNumber = config.whatsapp.number;
    const message = config.whatsapp.message;
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
            "description": "Estética dental com lentes ultrafinas de porcelana",
            "procedureType": "Dental Cosmetic Procedure"
          })}
        </script>
      </Helmet>

      <ConsultaInicialHeader
        whatsappNumber={config.whatsapp.number}
        whatsappMessage={config.whatsapp.message}
        campaign={config.campaign}
        messageMatch={config.messageMatch}
      />

      {/* SEÇÃO 1: HERO LANDING */}
      <section className="bg-gradient-to-b from-dental-beige/30 to-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Coluna Esquerda - Texto */}
            <div className="order-1">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-dental-purple mb-4">
                Test Drive do Sorriso — Veja o Resultado Antes de Começar
              </h1>

              <p className="text-lg md:text-xl text-dental-gray mb-6 leading-relaxed">
                Scanner iTero 3D e simulação em resina provisória na sua boca. Você aprova cada detalhe antes de qualquer desgaste. Lentes de porcelana com especialista em Ipanema — CRO-RJ 27.509.
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
                Conhecer o Test Drive do Sorriso
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

      {/* Standard LP sections from config */}
      <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.1} rootMargin="100px">
        <Suspense fallback={<div className="h-96 bg-gray-50" />}>
          <ConsultaInicialProblem
            title={config.problem.title}
            description={config.problem.description}
            problems={config.problem.problems}
          />
        </Suspense>
      </LazySection>

      <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="100px">
        <Suspense fallback={<div className="h-96 bg-white" />}>
          <ConsultaInicialGuide
            title={config.guide.title}
            subtitle={config.guide.subtitle}
            steps={config.guide.steps}
          />
        </Suspense>
      </LazySection>

      <LazySection fallback={<div className="h-96 bg-gray-50 animate-pulse" />} threshold={0.1} rootMargin="50px">
        <Suspense fallback={<div className="h-96 bg-gray-50" />}>
          <ConsultaInicialSocialProof
            title={config.socialProof.title}
            testimonials={config.socialProof.testimonials}
            stats={config.socialProof.stats}
          />
        </Suspense>
      </LazySection>

      <LazySection fallback={<div className="h-96 bg-white animate-pulse" />} threshold={0.1} rootMargin="50px">
        <Suspense fallback={<div className="h-96 bg-white" />}>
          <ConsultaInicialFAQ
            title={config.faq.title}
            questions={config.faq.questions}
          />
        </Suspense>
      </LazySection>

      <LazySection fallback={<div className="h-32 bg-[#381F47] animate-pulse" />} threshold={0.1}>
        <Suspense fallback={<div className="h-32 bg-[#381F47]" />}>
          <ConsultaInicialCTA
            title={config.cta.title}
            subtitle={config.cta.subtitle}
            buttonText={config.cta.buttonText}
            whatsappNumber={config.whatsapp.number}
            whatsappMessage={config.whatsapp.message}
            campaign={config.campaign}
            messageMatch={config.messageMatch}
          />
        </Suspense>
      </LazySection>

      <LazySection fallback={<div className="h-64 bg-[#381F47] animate-pulse" />} threshold={0.1}>
        <Suspense fallback={<div className="h-64 bg-[#381F47]" />}>
          <LandingFooter doctorName="Dra. Carla Christoph" clinicName="Ipanema Elegance Dental" phoneNumber="(21) 99330-4045" />
        </Suspense>
      </LazySection>

      <LazySection fallback={null} threshold={0} rootMargin="0px">
        <Suspense fallback={null}>
          <FloatingWhatsApp
            phoneNumber={config.whatsapp.number}
            message={config.whatsapp.message}
            campaign={config.campaign}
            messageMatch={config.messageMatch}
          />
        </Suspense>
      </LazySection>
    </>
  );
};

export default LPLentesPorcelana;
