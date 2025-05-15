
import React from "react";
import PageLayout from "@/components/PageLayout";
import ServicesSection from "@/components/ServicesSection";

const ServicesPage = () => {
  return (
    <PageLayout>
      {/* Using only the services section component which already has the correct title */}
      <ServicesSection />
    </PageLayout>
  );
};

export default ServicesPage;
