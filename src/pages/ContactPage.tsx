
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";

const ContactPage = () => {
  return (
    <PageLayout>
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-lg mb-4">Contato</h1>
            <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
            <p className="text-dental-gray mb-6">
              Entre em contato conosco para agendar sua consulta
            </p>
          </div>

          {/* Content will be added in future implementation */}
          <div className="prose prose-lg max-w-3xl mx-auto">
            <p className="body-md">
              Formulário de contato e informações adicionais serão implementados em breve.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;
