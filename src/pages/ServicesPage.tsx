
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

      {/* Using the services section component */}
      <ServicesSection />
    </PageLayout>
  );
};

export default ServicesPage;
