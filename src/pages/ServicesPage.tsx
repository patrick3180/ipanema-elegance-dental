
import React from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
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

      <section className="section-spacing pt-8">
        <div className="container-custom">
          {/* Breadcrumb navigation */}
          <ServiceBreadcrumb serviceName="Tratamentos Odontológicos" />
          
          {/* Using the services section component */}
          <ServicesSection />
        </div>
      </section>
    </PageLayout>
  );
};

export default ServicesPage;
