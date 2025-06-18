import React from "react";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const AboutPage = () => {
  const handleWhatsAppClick = () => {
    // Track event with Google Tag Manager (if available)
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'WhatsApp About Page Button'
      });
    }

    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function() {
          console.log('Google Ads conversion tracked - About page button');
        }
      });
    }

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
    "url": "https://dracarlachristoph.com.br/sobre",
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
        "addressLocality": "Ipanema, Rio de Janeiro",
        "addressRegion": "RJ",
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

  return (
    <>
      <SEOHead
        title="Sobre Dra. Carla Christoph | Dentista Especialista em Ipanema"
        description="Conheça a Dra. Carla Christoph, dentista especialista em Ipanema com mais de 20 anos de experiência em prótese dental, implantes e reabilitação oral estética."
        keywords="Dra. Carla Christoph, dentista especialista em prótese Ipanema, especialista em reabilitação oral Ipanema, implantodontia Ipanema, experiência dentista Ipanema, formação dentista Rio de Janeiro"
        canonicalUrl="https://dracarlachristoph.com.br/sobre"
        structuredData={structuredData}
      />
      <PageLayout>
        <section className="section-spacing">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="heading-lg mb-4">Dra. Carla Christoph: Sua Dentista Especialista em Ipanema</h1>
              <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
              <p className="text-dental-gray mb-6">Uma trajetória de paixão pela odontologia e dedicação em transformar sorrisos</p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img src="/lovable-uploads/b1c1cbdb-bde0-4d9e-912e-74cf74cf716d.png" alt="Dra. Carla Christoph, dentista em Ipanema, sentada em seu consultório odontológico, especialista em odontologia estética e com ampla formação acadêmica." className="w-full h-full object-cover" />
              </div>

              <div className="prose max-w-none">
                <p>
                  Há mais de 20 anos à frente de consultórios odontológicos, a Dra. Carla Christoph dedica sua carreira a transformar sorrisos e vidas em Ipanema. Com títulos de especialista em Prótese Dental e Implantodontia, e uma busca constante por aperfeiçoamento através de diversos cursos, sua prática é focada em oferecer soluções de reabilitação oral e odontologia estética da mais alta qualidade.
                </p>
                <p>
                  A Dra. Carla combina sua vasta experiência com uma abordagem que prioriza a individualidade de cada paciente, utilizando somente materiais de excelência para garantir resultados naturais, funcionais e duradouros.
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="heading-md mb-6 text-center">Nossa Filosofia: Cuidado Personalizado e Excelência em Materiais</h2>
              <div className="prose mx-auto">
                <p>
                  Acreditamos que cada paciente é único. Por isso, nosso atendimento é totalmente individualizado, desde o diagnóstico preciso até a finalização do tratamento. A Dra. Carla Christoph faz questão de utilizar somente materiais de excelência disponíveis no mercado, assegurando não apenas a estética refinada, mas também a longevidade e a biocompatibilidade dos tratamentos realizados em nossa clínica odontológica em Ipanema.
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="heading-md mb-6 text-center">Formação e Expertise da Sua Dentista em Ipanema</h2>
              <div className="prose mx-auto">
                <p>
                  A Dra. Carla Christoph possui uma sólida formação acadêmica e profissional:
                </p>
                <ul>
                  <li>Especialista em Prótese Dental</li>
                  <li>Especialista em Implantodontia</li>
                  <li>Mais de 20 anos de experiência clínica e como proprietária de consultórios</li>
                  <li>8 anos de atuação como dentista militar na Odontoclínica Central da Marinha</li>
                  <li>Participação contínua em cursos e congressos nas áreas de odontologia estética (como lentes de contato dental e facetas), reabilitação oral e odontologia funcional, incluindo o uso de tecnologias como o Design Digital do Sorriso (DSD) e escaneamento intraoral quando indicado</li>
                </ul>
              </div>
            </div>

            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="heading-md mb-6 text-center">A Clínica em Ipanema: Conforto e Tecnologia para Você</h2>
              <div className="prose mx-auto">
                <p>
                  Nosso consultório em Ipanema foi pensado para oferecer um ambiente acolhedor, moderno e equipado com tecnologia de ponta, garantindo que sua experiência odontológica seja a mais tranquila e eficaz possível. Desde o agendamento até o acompanhamento pós-tratamento, nossa equipe se dedica ao seu bem-estar.
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="heading-md mb-6 text-center">Nosso Compromisso: Sua Satisfação e Saúde Bucal</h2>
              <div className="bg-dental-beige/50 p-8 rounded-lg">
                <div className="mb-6">
                  <h3 className="font-display font-medium text-xl mb-2">Missão</h3>
                  <p>Cuidar da saúde bucal e elevar a autoestima por meio de uma odontologia refinada, que une excelência técnica, estética natural e atenção humana em cada detalhe.</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-display font-medium text-xl mb-2">Visão</h3>
                  <p>Ser reconhecida como a clínica de referência em Ipanema para quem busca resultados sofisticados, naturais e duradouros em odontologia estética e reabilitação oral.</p>
                </div>
                
                <div>
                  <h3 className="font-display font-medium text-xl mb-2">Valores</h3>
                  <ul className="list-disc pl-5">
                    <li>Precisão estética com naturalidade</li>
                    <li>Empatia e atenção verdadeira a cada paciente</li>
                    <li>Ética, clareza e confiança em todas as etapas do cuidado</li>
                    <li>Atualização constante em técnicas e materiais</li>
                    <li>Compromisso com a excelência, sem excessos</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto text-center">
              <h2 className="heading-md mb-4">Agende uma Conversa com a Dra. Carla Christoph em Ipanema</h2>
              <p className="text-lg text-dental-gray mb-8">
                Descubra como nossa expertise em odontologia estética e reabilitação oral pode transformar seu sorriso.
              </p>
              <Button onClick={handleWhatsAppClick} className="bg-dental-gold hover:bg-dental-gold/90 text-white rounded-md px-8 py-6" size="lg">
                <MessageCircle size={20} className="mr-2" /> Agendar Consulta
              </Button>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default AboutPage;
