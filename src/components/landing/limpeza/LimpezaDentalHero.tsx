import React from 'react';
import { Button } from '@/components/ui/button';
import UltraOptimizedPicture from '@/components/performance/UltraOptimizedPicture';
import { sendGCLIDToWebhook } from '@/utils/gclid';

interface LimpezaDentalHeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  benefits: string[];
  whatsappNumber: string;
  whatsappMessage: string;
  campaign: string;
  messageMatch: {
    adGroup: string;
    keyword: string;
  };
}

const LimpezaDentalHero: React.FC<LimpezaDentalHeroProps> = ({
  headline,
  subheadline,
  ctaText,
  benefits,
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
        event: 'LP_limpeza_cta_hero',
        campaign: campaign,
        action: 'whatsapp_click',
        location: 'hero_section'
      });

      // Google Ads conversion
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-16894364517/LP_limpeza_hero',
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
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#381F47] via-[#4A2B5A] to-[#381F47] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-white opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Content */}
          <div className="space-y-8 text-white order-2 lg:order-1">
            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-serif">
                {headline}
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                {subheadline}
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-white/90 leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                {ctaText}
              </Button>
              <p className="text-white/70 text-sm">ou tire suas dúvidas pelo WhatsApp</p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/20">
              <div className="flex items-center space-x-2 text-white/80">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">CRO-RJ 27509</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <span className="text-sm">20+ anos</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                <span className="text-sm">4.000+ pacientes</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative z-10">
              <UltraOptimizedPicture
                src="/lovable-uploads/vertical-de-jaleco.webp"
                alt="Dra. Carla Christoph - Limpeza Dental em Ipanema"
                className="w-full h-auto rounded-2xl shadow-2xl"
                priority={true}
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full opacity-80 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-60 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimpezaDentalHero;