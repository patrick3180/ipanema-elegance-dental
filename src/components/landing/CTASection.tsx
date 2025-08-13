import React from "react";
import { MessageCircle, Calendar } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

interface CTASectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  urgency?: string;
  campaign: string;
  phoneNumber: string;
  whatsappMessage: string;
}

const CTASection = ({ 
  title, 
  subtitle, 
  buttonText, 
  urgency,
  campaign,
  phoneNumber,
  whatsappMessage 
}: CTASectionProps) => {
  const handleCTAClick = async () => {
    // Track event
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'cta_click',
        event_category: 'CTA',
        event_action: 'Click',
        event_label: `Final CTA - ${campaign}`,
        campaign: campaign
      });
    }

    await sendGCLIDToWebhook(`landing_page_final_cta_${campaign}`);
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-dental-purple to-dental-purple/90 text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Urgency Badge */}
          {urgency && (
            <div className="inline-block bg-dental-gold px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
              {urgency}
            </div>
          )}
          
          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
            {title}
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto">
            {subtitle}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary CTA */}
            <button
              onClick={handleCTAClick}
              className="bg-dental-gold hover:bg-dental-gold/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 w-full sm:w-auto"
              data-gtm-category="CTA"
              data-gtm-action="Click"
              data-gtm-label={`final-cta-${campaign}`}
            >
              <MessageCircle size={20} />
              {buttonText}
            </button>
            
            {/* Secondary CTA */}
            <button
              onClick={handleCTAClick}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-3 w-full sm:w-auto"
              data-gtm-category="CTA"
              data-gtm-action="Click"
              data-gtm-label={`schedule-consultation-${campaign}`}
            >
              <Calendar size={20} />
              Agendar Consulta
            </button>
          </div>
          
          {/* Trust Signals */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/70">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-sm">Atendimento 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-sm">Primeira consulta gratuita</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-sm">Parcelamento sem juros</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;