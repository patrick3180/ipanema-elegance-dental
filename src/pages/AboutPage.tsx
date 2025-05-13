
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";

const AboutPage = () => {
  return (
    <PageLayout>
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-lg mb-4">Sobre Dra. Carla Christoph</h1>
            <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
            <p className="text-dental-gray mb-6">
              Conheça nossa história e compromisso com a excelência em odontologia
            </p>
          </div>

          {/* Content will be added in future implementation */}
          <div className="prose prose-lg max-w-3xl mx-auto">
            <p className="body-md">
              Conteúdo completo da página será implementado em breve.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
