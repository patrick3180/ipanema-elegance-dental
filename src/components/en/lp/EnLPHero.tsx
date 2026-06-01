import React from "react";
import { MessageCircle, ArrowRight, Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import UltraOptimizedPicture from "@/components/performance/UltraOptimizedPicture";

interface EnLPHeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  benefits: string[];
  backgroundImage: string;
  whatsappNumber: string;
  whatsappMessage: string;
}

const EnLPHero: React.FC<EnLPHeroProps> = ({
  headline,
  subheadline,
  ctaText,
  benefits,
  backgroundImage,
  whatsappNumber,
  whatsappMessage,
}) => {
  const deriveAvifPaths = (webpSrc: string) => {
    const base = webpSrc.replace(/\.webp$/, '');
    return {
      mobile: `${base}-480.avif`,
      desktop: `${base}-1024.avif`,
    };
  };
  const avifPaths = backgroundImage ? deriveAvifPaths(backgroundImage) : null;

  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "whatsapp_click",
        event_category: "Contact",
        event_action: "Click",
        event_label: "WhatsApp EN LP Hero",
      });
    }

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16894364517/OQZvCMXV0foZEOqP7vY9",
        event_callback: function () {
          console.log("Google Ads conversion tracked - EN LP Hero");
        },
      });
    }

    await sendGCLIDToWebhook("en_lp_hero_cta");

    const encodedMsg = encodeURIComponent(whatsappMessage);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMsg}`,
      "_blank"
    );
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center bg-dental-beige pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden">
      {/* Subtle decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dental-beige via-white/50 to-dental-beige pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="order-2 lg:order-1 space-y-6 animate-fade-in-up">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-dental-gold/20 rounded-full px-4 py-1.5 text-xs text-dental-purple font-medium">
              <Globe size={14} className="text-dental-gold" />
              We reply in your language
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-display font-bold text-dental-purple leading-[1.15] tracking-tight">
              {headline}
            </h1>

            <p className="text-base sm:text-lg text-dental-gray leading-relaxed max-w-xl">
              {subheadline}
            </p>

            {/* Benefits */}
            <ul className="space-y-2.5">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-dental-gray">
                  <Check size={16} className="text-dental-gold mt-0.5 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="pt-2">
              <Button
                onClick={handleWhatsAppClick}
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-8 py-7 text-base sm:text-lg shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl w-full sm:w-auto"
              >
                <MessageCircle size={20} className="mr-3" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="font-semibold">{ctaText}</span>
                </div>
                <ArrowRight size={16} className="ml-3" />
              </Button>
            </div>

            {/* Micro trust line */}
            <p className="text-xs text-dental-gray/60">
              CRO-RJ 27.509 • Rua Visconde de Pirajá, 550 — Ipanema
            </p>
          </div>

          {/* Right: Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-dental-gold/20 to-dental-purple/10 rounded-2xl -rotate-3 scale-[1.03] blur-sm" />
              <UltraOptimizedPicture
                src={backgroundImage || "/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"}
                alt="Dr. Carla Christoph — Cosmetic Dentist in Ipanema, Rio de Janeiro"
                priority={true}
                width={600}
                height={750}
                mobileSrc={avifPaths?.mobile}
                desktopSrc={avifPaths?.desktop}
                className="relative rounded-2xl shadow-elegant w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnLPHero;
