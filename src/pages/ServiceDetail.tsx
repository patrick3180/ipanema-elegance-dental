
import React from "react";
import { useParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ServiceDetail = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  
  // This is a placeholder. In a real implementation, we would fetch service data based on the slug
  const serviceName = serviceSlug?.split("-").map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");

  return (
    <PageLayout>
      <section className="section-spacing">
        <div className="container-custom">
          <Button
            variant="outline"
            asChild
            className="mb-8 border-dental-gray text-dental-purple hover:bg-dental-beige/50"
          >
            <a href="/servicos">
              <ArrowLeft size={16} className="mr-2" />
              Voltar para tratamentos
            </a>
          </Button>
          
          <div className="max-w-3xl mx-auto mb-16">
            <h1 className="heading-lg mb-4">{serviceName || "Tratamento"}</h1>
            <Separator className="w-24 h-1 bg-dental-gold mb-6" />
          </div>

          {/* Content will be added in future implementation */}
          <div className="prose prose-lg max-w-3xl mx-auto">
            <p className="body-md">
              Detalhes completos sobre este tratamento serão implementados em breve.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServiceDetail;
