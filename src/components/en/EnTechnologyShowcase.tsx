import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowRight, ScanLine, Eye, Zap } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const features = [
  {
    icon: <ScanLine className="w-5 h-5" />,
    title: "3D Scanning in Seconds",
    description:
      "Digital impressions without the messy mold — more comfort and precision for every treatment.",
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: "Real-Time Visualization",
    description:
      "See a projection of your results before starting treatment with our Smile Test Drive.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Advanced Diagnostics",
    description:
      "NIRI technology for early detection of cavities and tooth cracks — without X-rays.",
  },
];

const EnTechnologyShowcase = () => {
  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "whatsapp_click",
        event_category: "Contact",
        event_action: "Click",
        event_label: "WhatsApp EN Technology Section",
      });
    }

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16894364517/OQZvCMXV0foZEOqP7vY9",
        event_callback: function () {
          console.log("Google Ads conversion tracked - EN Technology section");
        },
      });
    }

    await sendGCLIDToWebhook("en_home_technology_section");

    window.open(
      "https://wa.me/5521993304045?text=Hello!%20I'd%20like%20to%20book%20an%20appointment.",
      "_blank"
    );
  };

  return (
    <section className="section-spacing bg-dental-purple relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(179,149,95,0.3) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-dental-gold font-medium mb-4">
              Technology
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-4">
              iTero Element 5D:{" "}
              <span className="text-dental-gold">
                Digital Precision
              </span>
            </h2>
            <Separator className="w-24 h-1 bg-dental-gold mb-6" />
            <p className="text-white/80 text-lg mb-10 leading-relaxed">
              Dr. Carla uses the most advanced intraoral scanner available to
              plan each treatment with millimetric precision. No uncomfortable
              traditional molds — just technology working for your smile.
            </p>

            <div className="space-y-6 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-dental-gold/20 flex items-center justify-center text-dental-gold group-hover:bg-dental-gold/30 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={handleWhatsAppClick}
              className="bg-dental-gold hover:bg-dental-gold-dark text-white rounded-md px-8 py-6 text-base shadow-gold transition-all duration-300 hover:-translate-y-0.5"
            >
              Book with digital technology
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>

          {/* Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute -inset-4 bg-dental-gold/10 rounded-3xl blur-2xl" />

              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/lovable-uploads/itero_screen.webp"
                  alt="iTero Element 5D intraoral scanner used by Dr. Carla Christoph for digital dental planning in Ipanema"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="480"
                  height="360"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 md:-left-8 bg-white rounded-xl px-5 py-3 shadow-elegant">
                <p className="text-xs text-dental-gray">World's #1 Scanner</p>
                <p className="text-sm font-semibold text-dental-purple font-display">
                  iTero Element 5D
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnTechnologyShowcase;
