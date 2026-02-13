
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface ServiceBreadcrumbProps {
  serviceName: string;
  serviceSlug?: string;
}

const ServiceBreadcrumb = ({ serviceName, serviceSlug }: ServiceBreadcrumbProps) => {
  // Generate BreadcrumbList schema for Google Search enhanced breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://dracarlachristoph.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tratamentos",
        "item": "https://dracarlachristoph.com/servicos"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": serviceName,
        "item": serviceSlug ? `https://dracarlachristoph.com${serviceSlug}` : undefined
      }
    ]
  };

  return (
    <>
      {/* BreadcrumbList Schema for Google Search */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Início</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/servicos">Tratamentos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{serviceName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    </>
  );
};

export default ServiceBreadcrumb;
