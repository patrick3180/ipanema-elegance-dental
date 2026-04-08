import React from "react";
import { Separator } from "@/components/ui/separator";
import { Globe, Clock, MapPin, MessageCircle } from "lucide-react";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const EnInternationalPatients = () => {
  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "whatsapp_click",
        event_category: "Contact",
        event_action: "Click",
        event_label: "WhatsApp EN International Section",
      });
    }

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16894364517/OQZvCMXV0foZEOqP7vY9",
        event_callback: function () {
          console.log("Google Ads conversion tracked - EN International section");
        },
      });
    }

    await sendGCLIDToWebhook("en_home_international_section");

    window.open(
      "https://wa.me/5521993304045?text=Hello!%20I'd%20like%20to%20book%20an%20appointment.",
      "_blank"
    );
  };

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "We Reply in Your Language",
      description:
        "Our AI-powered concierge, Sofia, replies in your language via WhatsApp — 24/7. Schedule your appointment in English, Spanish, French, or any language you prefer.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Office Hours",
      description:
        "Monday–Friday: 9 AM – 7 PM (GMT-3, Brasília time). We also respond to WhatsApp messages outside office hours.",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Ipanema Location",
      description:
        "Rua Visconde de Pirajá, 550 — Suite 1107, Ipanema. Steps from the beach, in one of Rio's safest neighborhoods. Easily accessible by taxi, metro, or rideshare.",
    },
  ];

  return (
    <section className="section-spacing bg-dental-beige">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-dental-gold font-medium mb-4">
            International Patients
          </p>
          <h2 className="heading-lg mb-4">
            Visiting Rio? We're Ready for You.
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray">
            Whether you're an expat living in Rio or visiting for a few weeks,
            our practice in Ipanema is ready to welcome you with the same
            unhurried, personalized care we offer all our patients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-soft text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-dental-gold/10 flex items-center justify-center text-dental-gold mb-6">
                {item.icon}
              </div>
              <h3 className="text-lg font-display font-semibold text-dental-purple mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-dental-gray leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-2 bg-dental-gold hover:bg-dental-gold/90 text-white px-8 py-4 rounded-lg shadow-lg transition-all duration-300 font-medium text-lg hover:-translate-y-0.5"
          >
            <MessageCircle size={22} />
            Message Us on WhatsApp
          </button>
          <p className="text-sm text-dental-gray mt-4">
            Private practice only — no insurance plans accepted.
            This allows us to dedicate proper time and materials to each patient.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnInternationalPatients;
