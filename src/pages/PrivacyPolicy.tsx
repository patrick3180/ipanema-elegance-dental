
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <PageLayout>
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto mb-16">
            <h1 className="heading-lg mb-4">Política de Privacidade</h1>
            <Separator className="w-24 h-1 bg-dental-gold mb-6" />
          </div>

          {/* Content will be added in future implementation */}
          <div className="prose prose-lg max-w-3xl mx-auto">
            <p className="body-md">
              Conteúdo da política de privacidade será implementado em breve.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrivacyPolicy;
