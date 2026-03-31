import React from 'react';
import { MessageCircle } from 'lucide-react';
import { sendGCLIDToWebhook } from '@/utils/gclid';

interface ConsultaInicialMidCTAProps {
  whatsappNumber: string;
  whatsappMessage: string;
  /** Custom CTA button label (default: "Agendar pelo WhatsApp") */
  ctaLabel?: string;
  /** Custom event label for GTM tracking (default: "Mid CTA Button - Consulta Inicial") */
  eventLabel?: string;
  /** Custom webhook source identifier (default: "mid_cta_button_consulta") */
  webhookSource?: string;
}

const ConsultaInicialMidCTA: React.FC<ConsultaInicialMidCTAProps> = ({
  whatsappNumber,
  whatsappMessage,
  ctaLabel = 'Agendar pelo WhatsApp',
  eventLabel = 'Mid CTA Button - Consulta Inicial',
  webhookSource = 'mid_cta_button_consulta',
}) => {
  const handleWhatsAppClick = async () => {
    // Track event with Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: eventLabel,
      });
    }

    // Google Ads conversion tracking
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        event_callback: function () {
          if (process.env.NODE_ENV === 'development') {
            console.log(`Google Ads conversion tracked - ${eventLabel}`);
          }
        },
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook(webhookSource);

    // Open WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section className="py-12 bg-[#381F47]/[0.03]" aria-label="Agendar consulta">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center space-y-5">
          <p className="text-lg text-[#381F47]/80 font-serif italic">
            Quer conversar sobre o seu caso?
          </p>
          <button
            onClick={handleWhatsAppClick}
            className="w-full md:w-auto text-white rounded-[10px] px-8 py-4 flex items-center justify-center gap-3 text-[15px] font-bold transition-all duration-300 shadow-[0_4px_14px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] transform hover:scale-105 mx-auto"
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #20BD5A 100%)',
            }}
          >
            <MessageCircle size={20} />
            {ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConsultaInicialMidCTA;
