import React, { ReactNode } from "react";
import { CheckCircle } from "lucide-react";

export interface DoctorCredential {
  icon?: ReactNode;
  title: string;
  description: string;
}

export interface DoctorBioSectionProps {
  sectionTitle: string;
  paragraphs: ReactNode[];
  credentials: DoctorCredential[];
  badgeText?: string;
  quote?: string;
  doctorImage?: string;
  doctorAlt?: string;
  variant?: "default" | "editorial";
  doctorName?: string;
  doctorSubtitle?: ReactNode;
}

const DoctorBioSection = ({
  sectionTitle,
  paragraphs,
  credentials,
  badgeText = "20+ Anos de Experiência",
  quote,
  doctorImage = "/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp",
  doctorAlt = "Dra. Carla Christoph - Especialista em Odontologia",
  variant = "default",
  doctorName = "Dra. Carla Christoph",
  doctorSubtitle = "CRO-RJ 27.509 | Especialista em Prótese Dentária e Implantodontia",
}: DoctorBioSectionProps) => {
  return (
    <section className="py-16 bg-gradient-purple-soft">
      <div className="container-custom">
        <h2 className="heading-lg mb-12 text-center text-dental-purple">
          {sectionTitle}
        </h2>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[300px,1fr] gap-8 items-start">
            {/* Photo Column */}
            <div className="mx-auto md:mx-0">
              <div className="relative">
                {variant === "editorial" ? (
                  <div className="relative overflow-hidden rounded-3xl">
                    <img
                      src={doctorImage}
                      alt={doctorAlt}
                      className="w-full"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-dental-beige/80 pointer-events-none" />
                  </div>
                ) : (
                  <img
                    src={doctorImage}
                    alt={doctorAlt}
                    className="w-full rounded-2xl shadow-elegant"
                    loading="lazy"
                  />
                )}
                {badgeText && (
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-dental-gold text-white px-6 py-2 rounded-full shadow-gold font-semibold text-sm whitespace-nowrap">
                    {badgeText}
                  </div>
                )}
              </div>
            </div>

            {/* Content Column */}
            <div className="bg-white p-8 rounded-2xl shadow-soft">
              <div className="mb-6">
                <h3 className="text-3xl font-display font-semibold text-dental-purple mb-2">
                  {doctorName}
                </h3>
                <p className="text-dental-gold-dark font-medium text-lg">
                  {doctorSubtitle}
                </p>
              </div>

              <div className="space-y-4 text-dental-gray leading-relaxed">
                {paragraphs.map((paragraph, index) => (
                  <React.Fragment key={index}>
                    {typeof paragraph === "string" ? <p>{paragraph}</p> : paragraph}
                  </React.Fragment>
                ))}
              </div>

              {/* Credentials Grid */}
              <div className="mt-6 pt-6 border-t border-dental-gray/20">
                <div className="grid md:grid-cols-2 gap-4">
                  {credentials.map((cred, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {cred.icon || <CheckCircle className="text-dental-gold mt-1" size={20} />}
                      <div>
                        <p className="font-semibold text-dental-purple">{cred.title}</p>
                        <p className="text-sm text-dental-gray">{cred.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Quote */}
              {quote && (
                <div className="relative bg-gradient-to-br from-dental-purple/5 to-dental-gold/5 p-8 rounded-2xl mt-8 overflow-hidden border border-dental-gold/10">
                  <div className="absolute top-4 left-4 text-5xl text-dental-gold/20 font-serif">"</div>
                  <div className="absolute bottom-4 right-4 text-5xl text-dental-gold/20 font-serif">"</div>
                  <p className="text-xl text-dental-purple italic font-display leading-relaxed text-center relative z-10 px-4">
                    {quote}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorBioSection;
