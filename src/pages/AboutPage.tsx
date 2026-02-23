import React from "react";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MessageCircle, Award, Anchor, ScanLine, Stethoscope } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const AboutPage = () => {
  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'WhatsApp About Page Button'
      });
    }

    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function () {
          console.log('Google Ads conversion tracked - About page button');
        }
      });
    }

    await sendGCLIDToWebhook('about_page_button');

    console.log("WhatsApp button clicked from About page - tracking event");

    const phoneNumber = "5521993304045";
    const message = "Olá! Gostaria de agendar uma consulta.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Carla Christoph",
    "jobTitle": "Cirurgiã-Dentista Especialista",
    "description": "Dentista especialista em Ipanema com mais de 20 anos de experiência em prótese dental, implantes e reabilitação oral estética.",
    "url": "https://dracarlachristoph.com/sobre",
    "image": "/lovable-uploads/b1c1cbdb-bde0-4d9e-912e-74cf74cf716d.png",
    "sameAs": [
      "https://instagram.com/dracarlachristoph",
      "https://wa.me/5521993304045"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Clínica Dra. Carla Christoph",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107",
        "addressLocality": "Ipanema",
        "addressRegion": "RJ",
        "postalCode": "22410-002",
        "addressCountry": "BR"
      }
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Especialista em Prótese Dental",
        "credentialCategory": "Especialização Odontológica"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Especialista em Implantodontia",
        "credentialCategory": "Especialização Odontológica"
      }
    ],
    "knowsAbout": [
      "Prótese Dental",
      "Implantodontia",
      "Odontologia Estética",
      "Lentes de Contato Dental",
      "Facetas de Porcelana",
      "Reabilitação Oral",
      "Clareamento Dental"
    ],
    "memberOf": {
      "@type": "Organization",
      "name": "Conselho Regional de Odontologia"
    }
  };

  const credentials = [
    {
      icon: Stethoscope,
      title: "Prótese Dentária",
      description: "Especialização em Prótese — a base para reabilitações orais complexas, de coroas unitárias a próteses totais."
    },
    {
      icon: Award,
      title: "Implantodontia",
      description: "Especialização em Implantes — planejamento e execução de casos unitários a reabilitações completas."
    },
    {
      icon: Anchor,
      title: "8 Anos na Marinha",
      description: "Odontoclínica Central da Marinha do Brasil — experiência em casos de alta complexidade com disciplina militar."
    },
    {
      icon: ScanLine,
      title: "Tecnologia Digital",
      description: "Scanner intraoral iTero, planejamento digital do sorriso e Test Drive do Sorriso para visualização prévia do resultado."
    }
  ];

  return (
    <>
      <SEOHead
        title="Sobre Dra. Carla Christoph | Dentista Especialista em Ipanema"
        description="Conheça a Dra. Carla Christoph, dentista especialista em Ipanema com mais de 20 anos de experiência em prótese dental, implantes e reabilitação oral estética."
        keywords="Dra. Carla Christoph, dentista especialista em prótese Ipanema, especialista em reabilitação oral Ipanema, implantodontia Ipanema, experiência dentista Ipanema, formação dentista Rio de Janeiro"
        canonicalUrl="https://dracarlachristoph.com/sobre"
        hreflangAlternates={[
          { lang: "pt-BR", href: "https://dracarlachristoph.com/sobre" },
          { lang: "en", href: "https://dracarlachristoph.com/en/about" },
          { lang: "x-default", href: "https://dracarlachristoph.com/sobre" },
        ]}
        structuredData={structuredData}
      />
      <PageLayout>
        <section className="section-spacing">
          <div className="container-custom">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="heading-lg mb-4">Dra. Carla Christoph: Sua Dentista Especialista em Ipanema</h1>
              <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
              <p className="text-dental-gray mb-6">Mais de 20 anos dedicados à reabilitação oral e odontologia estética em Ipanema</p>
            </div>

            {/* Bio + Photo */}
            <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <OptimizedImage
                  src="/lovable-uploads/b1c1cbdb-bde0-4d9e-912e-74cf74cf716d.png"
                  alt="Dra. Carla Christoph, dentista em Ipanema, sentada em seu consultório odontológico, especialista em odontologia estética e com ampla formação acadêmica."
                  className="w-full h-full object-cover"
                  width={600}
                  height={600}
                  priority={true}
                  responsive={true}
                />
              </div>

              <div className="prose max-w-none">
                <p>
                  Com mais de duas décadas em Ipanema, a Dra. Carla Christoph construiu sua reputação tratando cada paciente de forma individual, com tempo e atenção. Especialista em Prótese Dentária e Implantodontia (CRO-RJ 27.509), sua formação inclui 8 anos como dentista militar na Odontoclínica Central da Marinha — experiência que trouxe disciplina e precisão para sua prática clínica.
                </p>
                <p>
                  A Dra. Carla utiliza escaneamento digital intraoral (iTero) e ferramentas de planejamento do sorriso para oferecer previsibilidade e segurança em cada tratamento. Cada caso é tratado como único, com o tempo necessário para ouvir, planejar e executar.
                </p>
              </div>
            </div>

            {/* Como Funciona o Atendimento */}
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="heading-md mb-6 text-center">Como Funciona o Atendimento</h2>
              <div className="prose mx-auto">
                <p>
                  Cada consulta tem no mínimo 1 hora de duração. Nesse tempo, a Dra. Carla faz uma avaliação completa, explica cada opção de tratamento com calma e monta um plano personalizado. Somente materiais de primeira linha são utilizados — cerâmicas, resinas e componentes de implante com comprovação científica e rastreabilidade.
                </p>
              </div>
            </div>

            {/* Formação e Experiência - Grid 2x2 */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="heading-md mb-8 text-center">Formação e Experiência</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {credentials.map((cred) => (
                  <div key={cred.title} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <cred.icon className="text-dental-gold" size={24} />
                      <h3 className="font-display font-medium text-lg">{cred.title}</h3>
                    </div>
                    <p className="text-dental-gray text-sm">{cred.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* O Que Esperar da Primeira Consulta */}
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="heading-md mb-6 text-center">O Que Esperar da Primeira Consulta</h2>
              <div className="bg-dental-beige/50 p-8 rounded-lg">
                <p className="text-dental-gray">
                  Na primeira consulta, a Dra. Carla faz uma avaliação completa com exame clínico, fotografias e, quando indicado, escaneamento digital. Você sai entendendo exatamente o que precisa ser feito, em que ordem, e quanto tempo leva. Sem surpresas.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="heading-md mb-4">Agende Sua Primeira Consulta</h2>
              <p className="text-lg text-dental-gray mb-8">
                Agende sua primeira consulta com a Dra. Carla em Ipanema.
              </p>
              <Button onClick={handleWhatsAppClick} className="bg-dental-gold hover:bg-dental-gold/90 text-white rounded-md px-8 py-6" size="lg">
                <MessageCircle size={20} className="mr-2" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="font-medium">Agendar Consulta</span>
                  <span className="text-xs text-white/80">WhatsApp 24h</span>
                </div>
              </Button>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default AboutPage;
