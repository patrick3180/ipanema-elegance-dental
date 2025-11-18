import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import TreatmentHero from "@/components/treatment/TreatmentHero";
import SectionDivider from "@/components/treatment/SectionDivider";
import ProcessTimeline from "@/components/treatment/ProcessTimeline";
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
        <link rel="canonical" href="https://www.dracarlachristoph.com/restauracoes-esteticas" />
      </Helmet>

      <TreatmentHero
        title="Restaurações Estéticas em Ipanema"
        subtitle="Beleza e Função para seu Sorriso"
        description="Recupere dentes comprometidos por cáries, fraturas ou trincas com materiais de excelência que imitam perfeitamente a cor e textura natural."
        badges={["Resinas de Alta Performance", "Resultado Natural", "Técnica Conservadora"]}
        doctorImage="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
        breadcrumbs={[{label: "Início", href: "/"}, {label: "Tratamentos", href: "/servicos"}, {label: "Restaurações Estéticas"}]}
      />

      
    </PageLayout>
  );
};

export default RestaureacoesEsteticas;
