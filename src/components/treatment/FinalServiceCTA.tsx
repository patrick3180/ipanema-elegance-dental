import React, { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export interface FinalServiceCTAProps {
  icon: ReactNode;
  title: string;
  description: string;
  ctaText?: string;
  whatsappMessage: string;
  variant?: "default" | "urgency";
  footnote?: string;
  onClickOverride?: () => void;
  locale?: "pt" | "en";
}

const FinalServiceCTA = ({
  icon,
  title,
  description,
  ctaText,
  whatsappMessage,
  variant = "default",
  footnote,
  onClickOverride,
  locale = "pt",
}: FinalServiceCTAProps) => {
  const resolvedCtaText = ctaText ?? (locale === "en" ? "Book Your Evaluation" : "Agendar Avaliação");
  const resolvedFootnote = footnote ?? (locale === "en" ? "WhatsApp: (21) 99330-4045 | 24h Service" : "WhatsApp: (21) 99330-4045 | Atendimento 24h");
  const handleClick = () => {
    if (onClickOverride) {
      onClickOverride();
      return;
    }
    const phone = "5521993304045";
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank"
    );
  };

  const buttonClasses =
    variant === "urgency"
      ? "bg-red-600 hover:bg-red-700 text-white"
      : "bg-dental-gold text-dental-purple hover:bg-opacity-90";

  return (
    <section className="py-20 bg-gradient-purple-gold text-white">
      <div className="container-custom text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-8 h-8 text-dental-gold flex items-center justify-center">
            {icon}
          </span>
          <h2 className="heading-lg">{title}</h2>
        </div>

        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleClick}
            className={`${buttonClasses} px-8 py-4 rounded-lg font-semibold text-lg transition-all inline-flex items-center gap-2`}
          >
            <ArrowRight className="w-5 h-5" />
            {resolvedCtaText}
          </button>
        </div>

        {resolvedFootnote && (
          <p className="mt-6 text-sm opacity-75">{resolvedFootnote}</p>
        )}
      </div>
    </section>
  );
};

export default FinalServiceCTA;
