
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";
import ServicesSection from "@/components/ServicesSection";

const ServicesPage = () => {
  return (
    <PageLayout>
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-lg mb-4">Nossos Tratamentos</h1>
            <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
            <p className="text-dental-gray mb-6">
              Conheça todos os tratamentos odontológicos oferecidos pela Dra. Carla Christoph
            </p>
          </div>
        </div>
      </section>

      {/* Reusing the services section component */}
      <ServicesSection />
    </PageLayout>
  );
};

export default ServicesPage;
