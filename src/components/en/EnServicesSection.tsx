import React from "react";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Porcelain Veneers & Lenses",
    description:
      "Ultra-thin porcelain laminates that correct color, shape, and minor imperfections. Natural, long-lasting results planned digitally with iTero Element 5D.",
    image: "/Lentes.webp",
    link: "/en/veneers-and-lenses",
  },
  {
    title: "Professional Teeth Whitening",
    description:
      "Whiter teeth with safety. In-office or supervised at-home protocols with controlled sensitivity and natural results.",
    image: "/Clareamento.webp",
    link: "/en/teeth-whitening",
  },
  {
    title: "Dental Prosthetics",
    description:
      "Restore chewing function and the aesthetics of your smile with personalized dental prosthetics, developed by specialist Dr. Carla Christoph.",
    image: "/Protese.webp",
    link: "/en/dental-prosthetics",
  },
  {
    title: "Dental Implants",
    description:
      "Rehabilitation of missing teeth with implants that restore chewing function and aesthetics. Digital planning for single-tooth and full-mouth cases.",
    image: "/Implante.webp",
    link: "/en/dental-implants",
  },
  {
    title: "Orthodontics",
    description:
      "Dental alignment and bite correction with fixed braces, aesthetic braces, or Invisalign® aligners. In partnership with Dr. Bruno, PhD in Orthodontics from UERJ.",
    image: "/Ortodontia.webp",
    link: "/en/orthodontics",
  },
  {
    title: "General Dentistry & Prevention",
    description:
      "Take care of your oral health with digital checkups, professional cleaning (prophylaxis), and personalized prevention plans.",
    image: "/Profilaxia.webp",
    link: "/en/general-dentistry",
  },
  {
    title: "Aesthetic Restorations",
    description:
      "Treatment for cavities and reconstruction of fractured teeth with resins and ceramics that replicate the natural color and translucency of the tooth.",
    image: "/Restarações.webp",
    link: "/en/aesthetic-restorations",
  },
  {
    title: "Root Canal (Endodontics)",
    description:
      "Root canal treatment to eliminate pain and preserve the natural tooth. Performed by a specialized endodontist, with Dr. Carla's follow-up from start to finish.",
    image: "/Endodontia.webp",
    link: "/en/root-canal",
  },
  {
    title: "Gum Health (Periodontics)",
    description:
      "Specialized treatment for gingivitis and periodontitis, caring for the foundation of your smile and preventing future problems.",
    image: "/Periodontia.webp",
    link: "/en/gum-health",
  },
];

const EnServicesSection = () => {
  return (
    <section id="treatments" className="bg-dental-beige">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="heading-lg mb-4">
            Our Dental Treatments for Your Smile in Ipanema
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray mb-6">
            At our dental office in Ipanema, Dr. Carla Christoph offers a full range of dental treatments, from prevention and essential care to the most advanced aesthetic dentistry and oral rehabilitation. Explore our solutions and discover how we can care for your smile.
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
