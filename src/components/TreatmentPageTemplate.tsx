
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, CheckCircle } from "lucide-react";

export interface TreatmentSection {
  id: string;
  title: string;
  content: string | React.ReactNode;
  type?: "default" | "benefits" | "steps" | "faq";
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface TreatmentPageProps {
  slug: string;
  title: string;
  metaDescription: string;
  introduction: string;
  sections: TreatmentSection[];
  faqs?: FAQ[];
  whatsappMessage?: string;
}

const TreatmentPageTemplate = ({
  slug,
  title,
  metaDescription,
  introduction,
  sections,
  faqs = [],
  whatsappMessage = "Olá, gostaria de agendar uma avaliação",
}: TreatmentPageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Generate navigation items from sections
  const navigationItems = sections.map((section) => ({
    id: section.id,
    title: section.title.split(" ")[0], // Use the first word of each section title
  }));

  // Add FAQ if available
  if (faqs.length > 0) {
    navigationItems.push({
      id: "faq",
      title: "FAQ",
    });
  }

  return (
    <PageLayout className="pt-16">
      <Helmet>
        <title>{title} | Dra. Carla Christoph</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <section className="section-spacing pt-8">
        <div className="container-custom">
          <Button variant="outline" asChild className="mb-6 border-dental-gray text-dental-purple hover:bg-dental-beige/50">
            <Link to="/servicos">
              <ArrowLeft size={16} className="mr-2" />
              Voltar para tratamentos
            </Link>
          </Button>
          
          <div className="max-w-3xl mx-auto mb-8">
            <h1 className="heading-lg mb-4">{title}</h1>
            <Separator className="w-24 h-1 bg-dental-gold mb-6" />
            <p className="body-md">{introduction}</p>
          </div>

          {/* Internal page navigation */}
          <div className="max-w-3xl mx-auto mb-12 bg-dental-beige/70 p-5 rounded-lg border border-dental-gold/20">
            <nav aria-label="Navegação interna da página">
              <ul className="flex flex-wrap justify-center gap-3 md:gap-6">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`} 
                      className="text-dental-purple font-medium px-3 py-2 rounded-md hover:bg-dental-beige hover:text-dental-gold transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="prose prose-lg max-w-3xl mx-auto">
            {/* Render sections based on their type */}
            {sections.map((section) => (
              <div className="my-12" id={section.id} key={section.id}>
                <h2 className="heading-md mb-4">{section.title}</h2>
                
                {section.type === "benefits" ? (
                  <>
                    <p className="body-md mb-4">{section.content}</p>
                    <ul className="space-y-3">
                      {Array.isArray(section.content) && section.content.map((benefit, index) => (
                        <li className="flex items-start" key={index}>
                          <CheckCircle className="text-dental-gold h-6 w-6 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="body-md">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : section.type === "steps" ? (
                  <>
                    <p className="body-md mb-4">{typeof section.content === 'string' ? section.content : null}</p>
                    <ol className="space-y-4">
                      {Array.isArray(section.content) && section.content.map((step, index) => (
                        <li className="body-md" key={index}>
                          <strong>{index + 1}. {step.title}</strong> {step.description}
                        </li>
                      ))}
                    </ol>
                  </>
                ) : section.type === "faq" ? (
                  null // FAQs are rendered separately
                ) : (
                  <p className="body-md">{section.content}</p>
                )}
              </div>
            ))}

            {/* FAQ Section */}
            {faqs.length > 0 && (
              <div className="my-12" id="faq">
                <h2 className="heading-md mb-6">Perguntas Frequentes</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index + 1}`} key={index}>
                      <AccordionTrigger className="text-base font-medium text-dental-purple">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="body-md">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* CTA Final */}
            <div className="my-12 bg-dental-beige/50 p-8 rounded-lg border border-dental-gold/20">
              <h2 className="heading-md mb-4 text-center">Pronto para Conquistar o Sorriso dos Seus Sonhos?</h2>
              <p className="body-md text-center mb-8">
                Se você deseja saber mais sobre {title.toLowerCase()}, agende uma avaliação com a Dra. Carla Christoph. Em nossa clínica em Ipanema, estamos prontos para atendê-lo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-dental-gold hover:bg-dental-gold/90 text-white rounded-md px-6 py-5" 
                  onClick={() => window.open(`https://wa.me/5521999999999?text=${encodeURIComponent(whatsappMessage)}`, "_blank")}
                >
                  Agendar Avaliação
                </Button>
                <Button variant="outline" className="border-dental-gold text-dental-gold hover:bg-dental-gold/10" asChild>
                  <Link to="/servicos">
                    Ver Outros Tratamentos
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TreatmentPageTemplate;
