import React from "react";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Porcelain Veneers",
    description:
      "Ultra-thin porcelain laminates that correct color, shape, and minor imperfections. Natural, long-lasting results planned digitally with iTero Element 5D.",
    image: "/Lentes.webp",
    link: "/en/porcelain-veneers",
  },
  {
    title: "Dental Implants",
    description:
      "Titanium implant placement with 3D digital planning for single teeth or full-mouth rehabilitation. Over 20 years of implant experience.",
    image: "/Implante.webp",
    link: "/en/dental-implants",
  },
  {
    title: "Teeth Whitening",
    description:
      "Professional teeth whitening with controlled sensitivity. In-office or supervised at-home protocols with natural-looking results.",
    image: "/Clareamento.webp",
    link: "/en/general-dentistry",
  },
  {
    title: "General Dentistry",
    description:
      "Comprehensive dental checkups with digital scanning, professional cleanings, and personalized preventive care plans.",
    image: "/Profilaxia.webp",
    link: "/en/general-dentistry",
  },
  {
    title: "Cosmetic Dentistry",
    description:
      "Composite bonding, smile design, and aesthetic restorations that look and feel natural — planned with digital precision.",
    image: "/lovable-uploads/textura natural restauração.webp",
    link: "/en/porcelain-veneers",
  },
  {
    title: "Dental Emergency",
    description:
      "Toothache, broken tooth, or lost filling? Same-day appointments available for urgent dental care in Ipanema.",
    image: "/Endodontia.webp",
    link: "/en/dental-emergency",
  },
];

const EnServicesSection = () => {
  return (
    <section id="treatments" className="bg-dental-beige">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="heading-lg mb-4">
            Our Dental Treatments
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray mb-6">
            From routine checkups to full smile rehabilitation — every treatment
            with the same dedication, attention to detail, and the time needed
            to get it right.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <ScrollReveal
              key={index}
              animation="fade-up"
              delay={(index % 3) * 120}
              threshold={0.08}
            >
              <Link
                to={service.link}
                className="relative rounded-xl overflow-hidden shadow-lg group h-80 transition-all duration-500 ease-in-out transform hover:scale-105 block"
                aria-label={service.title}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/60 transition-all duration-300" />
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold font-display mb-2 tracking-wide">
                    {service.title}
                  </h3>
                  <p className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 ease-in-out text-sm mb-4 overflow-hidden">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-dental-gold hover:text-white font-medium text-sm transition-colors duration-300">
                    Learn more <ArrowRight size={16} className="ml-1" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnServicesSection;
