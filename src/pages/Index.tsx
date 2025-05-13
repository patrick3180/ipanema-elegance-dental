
import React from "react";
import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <PageLayout className="pt-0">
      <Hero />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
    </PageLayout>
  );
};

export default Index;
