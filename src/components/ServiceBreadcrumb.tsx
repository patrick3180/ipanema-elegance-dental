
import React from "react";
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
  items?: Array<{
    label: string;
    href?: string;
  }>;
  serviceName?: string;
  serviceSlug?: string;
}

const ServiceBreadcrumb = ({ items, serviceName, serviceSlug }: ServiceBreadcrumbProps) => {
  // Support both old and new interfaces
  const breadcrumbItems = items || [
    { label: "Início", href: "/" },
    { label: "Tratamentos", href: "/servicos" },
    { label: serviceName || "" }
  ];

  return (
    <div className="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink asChild>
                    <Link to={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default ServiceBreadcrumb;
