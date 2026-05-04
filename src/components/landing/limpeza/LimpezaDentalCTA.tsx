import React from 'react';
import { Button } from '@/components/ui/button';
import { sendGCLIDToWebhook } from '@/utils/gclid';

interface LimpezaDentalCTAProps {
  title: string;
  subtitle: string;
  buttonText: string;
  urgency?: string;
  whatsappNumber: string;
  whatsappMessage: string;
  campaign: string;
  messageMatch: {
    adGroup: string;
    keyword: string;
  };
}

const LimpezaDentalCTA: React.FC<LimpezaDentalCTAProps> = ({
  title,
  subtitle,
  buttonText,
  urgency,
  whatsappNumber,
  whatsappMessage,
  campaign,
  messageMatch
}) => {
  const handleWhatsAppClick = async () => {
    // Track conversion
    if (typeof window !== 'undefined') {
      // Push to dataLayer for GTM
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'LP_limpeza_cta_final',
        campaign: campaign,
        action: 'whatsapp_click',
        location: 'cta_final'
      });

      // Google Ads conversion
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
          value: 1,
          currency: 'BRL'
        });
      }

      // Send GCLID data
      await sendGCLIDToWebhook(campaign);
    }

    // Open WhatsApp
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#381F47] via-[#4A2B5A] to-[#381F47] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-white opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div className="space-y-8 text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-serif">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              {subtitle}
            </p>

            {/* Benefits Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
                <div className="text-white/80">Biofilme Removido</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">30%</div>
                <div className="text-white/80">Mais Rápido</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">0</div>
                <div className="text-white/80">Desconforto</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-4">
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-12 py-6 text-xl rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0"
              >
                {buttonText}
              </Button>
              
              {urgency && (
                <p className="text-orange-300 text-sm font-medium">
                  ⚠️ {urgency}
                </p>
              )}
            </div>

            {/* Trust Elements */}
            <div className="pt-8 border-t border-white/20">
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-white/80">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>CRO-RJ 27509</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  <span>20+ anos de experiência</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  <span>4.000+ pacientes atendidos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>WhatsApp 24h</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-white/60 text-sm">
                  Localizado em Ipanema • Atendimento particular com tempo dedicado
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimpezaDentalCTA;