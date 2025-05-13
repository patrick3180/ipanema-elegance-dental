
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";

const DifferentialsPage = () => {
  return (
    <PageLayout>
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-lg mb-4">Diferenciais da Clínica</h1>
            <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
            <p className="text-dental-gray mb-6">
              O que torna nossa abordagem única no tratamento odontológico
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

export default DifferentialsPage;
