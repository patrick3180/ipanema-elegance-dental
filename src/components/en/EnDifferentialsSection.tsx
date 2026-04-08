import React from "react";
import { Separator } from "@/components/ui/separator";
import { Clock, Heart, Fingerprint, Shield } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const differentials = [
  {
    icon: <Clock className="w-7 h-7" />,
    title: "Minimum 1-Hour Appointments",
    description:
      "No rushed visits. Every appointment is scheduled with enough time to listen, examine, and care without pressure.",
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: "Same Dentist, Start to Finish",
    description:
      "Dr. Carla personally oversees your entire treatment — from the first consultation to the final result. No hand-offs.",
  },
  {
    icon: <Fingerprint className="w-7 h-7" />,
    title: "3D Digital Planning",
    description:
      "iTero Element 5D scanner for precise 3D imaging — no messy impressions, just digital comfort and predictability.",
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "20+ Years of Experience",
    description:
      "Specialist in Prosthodontics and Implant Dentistry, with 8 years as a dental officer in the Brazilian Navy. Precision and discipline.",
  },
];

const EnDifferentialsSection = () => {
  return (
    <section className="section-spacing bg-dental-beige">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-dental-gold font-medium mb-4">
            Why Choose Us
          </p>
          <h2 className="heading-lg mb-4">
            Why Patients Choose Dr. Carla Christoph
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray">
            In a city with many options, the right dentist makes all the
            difference. Here's what sets our Ipanema practice apart.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentials.map((item, index) => (
            <ScrollReveal
              key={index}
              animation="fade-up"
              delay={index * 100}
              threshold={0.1}
            >
              <div className="group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-hover transition-all duration-500 hover:-translate-y-1 h-full">
                {/* Accent line top */}
                <div className="absolute top-0 left-8 right-8 h-0.5 bg-dental-gold/0 group-hover:bg-dental-gold/60 transition-all duration-500 rounded-full" />

                <div className="w-14 h-14 rounded-xl bg-dental-gold/10 flex items-center justify-center text-dental-gold mb-6 group-hover:bg-dental-gold/20 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-display font-semibold text-dental-purple mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-dental-gray leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnDifferentialsSection;
