import React from "react";
import { Helmet } from "react-helmet-async";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import OptimizedImage from "@/components/OptimizedImage";

export interface BreadcrumbItemType {
  label: string;
  href?: string;
}

export interface TreatmentHeroProps {
  title: string;
  subtitle: string;
  description: string;
  doctorImage?: string;
  badges?: string[];
  breadcrumbs?: BreadcrumbItemType[];
  locale?: "pt" | "en";
}

const TreatmentHero = ({
  title,
  subtitle,
  description,
  doctorImage,
  badges,
  breadcrumbs,
  locale = "pt",
}: TreatmentHeroProps) => {
  const isEn = locale === "en";

  const handleWhatsAppClick = () => {
    const phone = "5521993304045";
    const message = isEn
      ? `Hello! I would like to schedule a consultation about ${title}.`
      : `Olá! Gostaria de agendar uma consulta de avaliação sobre ${title}.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Generate BreadcrumbList schema if breadcrumbs exist
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://dracarlachristoph.com${item.href}` : undefined
    }))
  } : null;

  return (
    <>
      {/* BreadcrumbList Schema for Google Search */}
      {breadcrumbSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema)}
          </script>
        </Helmet>
      )}

      <section
      className="bg-gradient-purple-soft animate-fade-in"
      aria-label={isEn ? "Treatment hero" : "Hero do tratamento"}
    >
      <div className="section-spacing content-container">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Content Column - 60% */}
          <div className="lg:col-span-3 space-y-6">
            {/* Breadcrumb */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <Breadcrumb className="text-sm opacity-70">
                <BreadcrumbList>
                  {breadcrumbs.map((item, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        {item.href ? (
                          <BreadcrumbLink
                            href={item.href}
                            className="text-dental-purple-soft hover:text-dental-purple transition-colors"
                          >
                            {item.label}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage className="text-dental-purple font-medium">
                            {item.label}
                          </BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-dental-purple leading-tight">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-dental-purple-soft font-medium">
              {subtitle}
            </p>

            {/* Description */}
            <p className="text-lg text-dental-gray leading-relaxed max-w-2xl">
              {description}
            </p>

            {/* Badges */}
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {badges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-dental-gold/10 text-dental-gold-dark border-dental-gold/20 px-4 py-1.5 text-sm font-medium hover:bg-dental-gold/15 transition-colors"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

            {/* CTA - Discrete and elegant */}
            <div className="pt-4">
              <Button
                onClick={handleWhatsAppClick}
                className="bg-dental-purple hover:bg-dental-purple-dark text-white shadow-soft hover:shadow-hover transition-all duration-300 px-6 py-6 text-base"
                size="lg"
                aria-label={isEn ? "Schedule evaluation appointment via WhatsApp" : "Agendar consulta de avaliação pelo WhatsApp"}
              >
                <Calendar className="mr-2 h-5 w-5" />
                {isEn ? "Book Your Evaluation" : "Agendar Consulta de Avaliação"}
              </Button>
            </div>
          </div>

          {/* Image Column - 40% */}
          {doctorImage && (
            <div className="lg:col-span-2 order-first lg:order-last">
              <div className="group rounded-2xl overflow-hidden shadow-elegant">
                <OptimizedImage
                  src={doctorImage}
                  alt={isEn ? `Dr. Carla Christoph - ${title} Specialist` : `Dra. Carla Christoph - Especialista em ${title}`}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                  width={600}
                  height={800}
                  priority={true}
                  responsive={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
    </>
  );
};

export default TreatmentHero;
