import React from "react";
import OptimizedImage from "@/components/OptimizedImage";

const EnLPDoctorBio: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-dental-beige/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-center">
          {/* Photo */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-dental-gold/20 to-dental-purple/10 rounded-2xl rotate-2 scale-[1.03]" />
              <OptimizedImage
                src="/lovable-uploads/RIT08058-vertical-doutora-site.webp"
                alt="Dr. Carla Christoph — Cosmetic Dentist in Ipanema"
                className="relative rounded-2xl shadow-elegant w-60 md:w-full object-cover"
                width={280}
                height={350}
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-dental-gold font-medium">
              Your Dentist
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-dental-purple">
              Dr. Carla Christoph
            </h2>
            <p className="text-xs text-dental-gray uppercase tracking-wide">
              CRO-RJ 27.509 • Specialist in Prosthodontics & Implant Dentistry
            </p>

            <div className="space-y-3 text-sm text-dental-gray leading-relaxed">
              <p>
                With over <strong>20 years of clinical experience</strong> in Ipanema, Dr. Carla holds specializations in both <strong>prosthodontics and implant dentistry</strong> — the two disciplines at the heart of cosmetic smile rehabilitation.
              </p>
              <p>
                She also served <strong>8 years as a dental officer in the Brazilian Navy</strong> while maintaining her private practice — an experience that shaped her precision, discipline, and commitment to patient safety.
              </p>
              <p>
                Her practice runs on a philosophy of <strong>continuity</strong>: Dr. Carla is your dentist from first consultation to final follow-up. When specialized treatment is needed — endodontics, periodontics, orthodontics — she brings in trusted specialists who work under her direct supervision, right in her office. You always have the same doctor by your side.
              </p>
            </div>

            {/* Credentials */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                "Prosthodontics Specialist",
                "Private Practice Only",
                "20+ Years",
                "Brazilian Navy",
                "iTero 5D",
              ].map((credential) => (
                <span
                  key={credential}
                  className="text-[11px] font-medium text-dental-purple bg-white border border-dental-purple/10 rounded-full px-3 py-1"
                >
                  {credential}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnLPDoctorBio;
