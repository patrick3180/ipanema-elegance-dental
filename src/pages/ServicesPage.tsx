
import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import ServicesSection from "@/components/ServicesSection";

const ServicesPage = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>Tratamentos Odontológicos | Dra. Carla Christoph</title>
        <meta 
          name="description" 
          content="Conheça todos os tratamentos odontológicos oferecidos pela Dra. Carla Christoph em Ipanema, Rio de Janeiro." 
        />
      </Helmet>

      <section className="section-spacing">
        <div className="container-custom text-center mb-16">
          <h1 className="heading-lg mb-4">Nossos Tratamentos Odontológicos para seu Sorriso em Ipanema</h1>
        </div>
      </section>
      
      {/* Using the services section component */}
      <ServicesSection />
    </PageLayout>
  );
};

export default ServicesPage;
