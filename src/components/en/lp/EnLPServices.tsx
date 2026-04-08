import React from "react";
import OptimizedImage from "@/components/OptimizedImage";
import { Sparkles, Smile, Sun, ScanLine } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Porcelain Veneers",
    description: "Ultra-thin porcelain laminates that enhance shape, color, and alignment. Each veneer is custom-crafted after a Smile Test Drive approval.",
    image: "/lovable-uploads/en-lp-veneers.webp",
  },
  {
    icon: Smile,
    title: "Composite Bonding",
    description: "Direct composite restorations that mimic natural tooth texture. Ideal for chips, gaps, and minor corrections in a single visit.",
    image: "/lovable-uploads/en-lp-composite-bonding.webp",
  },
  {
    icon: Sun,
    title: "Teeth Whitening",
    description: "In-office and take-home protocols with professional-grade gel. Natural results — no fake-looking 'chiclet' teeth.",
    image: "/lovable-uploads/Ante e depois clareamento.webp",
  },
  {
    icon: ScanLine,
    title: "Smile Test Drive",
    description: "Try your new smile before committing. Dr. Carla applies non-adherent resin on your teeth so you can see, feel, and approve the result in your own mouth.",
    image: "/lovable-uploads/en-lp-smile-test-drive.webp",
  },
];

const EnLPServices: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-dental-gold font-medium mb-3">
            Our Specializations
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-dental-purple mb-4">
            Cosmetic Dentistry Treatments
          </h2>
          <p className="text-dental-gray max-w-2xl mx-auto">
            Every treatment is planned digitally and performed by Dr. Carla personally — from start to finish.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group bg-dental-beige/40 border border-dental-purple/5 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-elegant hover:border-dental-gold/20"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={500}
                    height={300}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dental-purple/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Icon size={18} className="text-dental-gold" />
                    <h3 className="font-display font-semibold text-dental-purple text-lg">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm text-dental-gray leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EnLPServices;
