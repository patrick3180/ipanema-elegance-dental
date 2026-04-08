import React from "react";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  text: string;
}

interface Stat {
  number: string;
  label: string;
}

interface EnLPSocialProofProps {
  title: string;
  testimonials: Testimonial[];
  stats?: Stat[];
}

const EnLPSocialProof: React.FC<EnLPSocialProofProps> = ({
  title,
  testimonials,
  stats,
}) => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats bar */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center bg-dental-beige/60 border border-dental-purple/5 rounded-xl py-5 px-3"
              >
                <p className="text-2xl sm:text-3xl font-display font-bold text-dental-purple">
                  {stat.number}
                </p>
                <p className="text-xs text-dental-gray mt-1 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Testimonials */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-dental-gold font-medium mb-3">
            Patient Stories
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-dental-purple">
            {title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-dental-beige/40 border border-dental-purple/5 rounded-2xl p-6 space-y-4 hover:shadow-elegant transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className="text-dental-gold fill-dental-gold"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-dental-gray leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Name */}
              <p className="text-xs text-dental-purple font-medium">
                — {testimonial.name}
              </p>
            </div>
          ))}
        </div>

        {/* Google Reviews link */}
        <div className="text-center mt-8">
          <a
            href="https://www.google.com/maps/place/Dra.+Carla+Christoph/@-22.9837862,-43.2055289,17z/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-dental-gray/60 underline hover:text-dental-gold transition-colors"
          >
            See all reviews on Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
};

export default EnLPSocialProof;
