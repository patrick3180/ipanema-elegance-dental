import React from 'react';
import { MessageCircle } from 'lucide-react';
import { sendGCLIDToWebhook } from "@/utils/gclid";

interface ClareamentoCTAProps {
  title: string;
  subtitle: string;
  buttonText: string;
  urgency?: string;
  whatsappNumber: string;
  whatsappMessage: string;
}

const ClareamentoCTA: React.FC<ClareamentoCTAProps> = ({
  title,
  subtitle,
  buttonText,
  urgency,
  whatsappNumber,
  whatsappMessage
}) => {
  const handleWhatsAppClick = async () => {
    // Track event with Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: 'Final CTA Button'
      });
    }
    
    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function() {
          console.log('Google Ads conversion tracked - Final CTA');
        }
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook('final_cta_button');
    
    // Open WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section className="bg-gradient-to-r from-[#381F47] to-[#4a2759] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Headlines */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* CTA Button */}
          <div className="space-y-6">
            <button
              onClick={handleWhatsAppClick}
              className="bg-white text-[#381F47] hover:bg-gray-100 rounded-lg px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 mx-auto"
            >
              <MessageCircle size={20} />
              {buttonText}
            </button>

            {/* Urgency Text */}
            {urgency && (
              <p className="text-white/80 italic text-lg max-w-2xl mx-auto leading-relaxed">
                {urgency}
              </p>
            )}
          </div>

          {/* Trust Elements */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">20+</div>
              <div className="text-white/80 text-sm">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.000+</div>
              <div className="text-white/80 text-sm">Pacientes Satisfeitos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">8</div>
              <div className="text-white/80 text-sm">Anos dentista militar</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClareamentoCTA;