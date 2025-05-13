
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";

const TermsOfUse = () => {
  return (
    <PageLayout>
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto mb-16">
            <h1 className="heading-lg mb-4">Termos de Uso</h1>
            <Separator className="w-24 h-1 bg-dental-gold mb-6" />
          </div>

          {/* Content will be added in future implementation */}
          <div className="prose prose-lg max-w-3xl mx-auto">
            <p className="body-md">
              Conteúdo dos termos de uso será implementado em breve.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TermsOfUse;
