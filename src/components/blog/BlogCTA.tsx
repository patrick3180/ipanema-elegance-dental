import React from 'react';
import { MessageCircle } from 'lucide-react';
import { sendGCLIDToWebhook } from '@/utils/gclid';

interface BlogCTAProps {
  /** Custom message for WhatsApp (uses default if not provided) */
  message?: string;
  /** Category/topic for analytics tracking */
  category?: string;
}

const BlogCTA: React.FC<BlogCTAProps> = ({
  message,
  category = 'blog'
}) => {
  const handleWhatsAppClick = async () => {
    // GTM tracking
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_click',
        event_category: 'Contact',
        event_action: 'Click',
        event_label: `CTA Blog - ${category}`,
        page_type: 'blog_post'
      });
    }

    // Google Ads conversion
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
        'event_callback': function() {
          console.log('Google Ads conversion tracked - Blog CTA');
        }
      });
    }

    // Send GCLID to webhook
    await sendGCLIDToWebhook(`blog_cta_${category}`);

    const phone = '5521993304045';
    const whatsappMessage = message || 'Olá! Li um artigo no blog e gostaria de agendar uma consulta com a Dra. Carla Christoph.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  return (
    <div className="my-10 rounded-2xl bg-gradient-to-r from-dental-purple/5 via-dental-beige/30 to-dental-purple/5 border border-dental-purple/10 p-6 md:p-8 text-center">
      <p className="text-lg md:text-xl font-display font-semibold text-dental-purple mb-3">
        Tem dúvidas sobre o que leu?
      </p>
      <p className="text-dental-gray mb-6 max-w-lg mx-auto">
        Agende uma consulta de avaliação e tire suas dúvidas diretamente com a Dra. Carla Christoph.
      </p>
      <button
        onClick={handleWhatsAppClick}
        className="inline-flex items-center gap-2 bg-dental-purple hover:bg-dental-purple/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
      >
        <MessageCircle className="w-5 h-5" />
        Agendar Consulta pelo WhatsApp
      </button>
      <p className="text-xs text-dental-gray/60 mt-4">
        Atendimento em Ipanema, Rio de Janeiro | CRO-RJ 27.509
      </p>
    </div>
  );
};

export default BlogCTA;
