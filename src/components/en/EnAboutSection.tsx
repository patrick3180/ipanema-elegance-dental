import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const EnAboutSection = () => {
  const handleWhatsAppClick = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "whatsapp_click",
        event_category: "Contact",
        event_action: "Click",
        event_label: "WhatsApp EN About Section",
      });
    }

    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16894364517/OQZvCMXV0foZEOqP7vY9",
        event_callback: function () {
          console.log("Google Ads conversion tracked - EN About section");
        },
      });
    }

    await sendGCLIDToWebhook("en_home_about_section");

    window.open(
      "https://wa.me/5521993304045?text=Hello!%20I'd%20like%20to%20book%20an%20appointment.",
      "_blank"
    );
  };

  return (
    <section id="about" className="section-spacing bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-lg mb-4">
            Meet Dr. Carla Christoph, Your Dentist in Ipanema
          </h2>
          <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
          <p className="text-dental-gray mb-6">
            Over 20 years of clinical experience in cosmetic and restorative
            dentistry in Ipanema, Rio de Janeiro
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-square rounded-2xl overflow-hidden">
            <OptimizedImage
              src="/lovable-uploads/fef24f70-4659-453e-8fee-79dee34b6220.png"
              alt="Dr. Carla Christoph, dental specialist in Ipanema, Rio de Janeiro"
              className="w-full h-full object-cover"
              width={600}
              height={600}
              priority={false}
              responsive={true}
            />
          </div>

          <div className="flex flex-col justify-between h-full">
            <div className="space-y-6">
              <p className="body-md">
                With over two decades in Ipanema, Dr. Carla has built her
                reputation by treating each patient individually, with time and
                attention. Her background includes 8 years as a dental officer
                in the Brazilian Navy — an experience that shaped her precision,
                discipline, and commitment to patient care.
              </p>
              <p className="body-md">
                Specialist in Prosthodontics and Implant Dentistry (CRO-RJ
                27.509, Brazilian Dental Board), she uses the iTero Element 5D
                scanner and digital smile planning to bring predictability and
                confidence to every treatment. Each case is treated as unique,
                with the time needed to listen, plan, and deliver.
              </p>
            </div>

            <div className="pt-6 mt-auto">
              <Button
                onClick={handleWhatsAppClick}
                className="bg-dental-purple hover:bg-dental-purple/90 text-white rounded-md px-6 py-5 mt-4"
              >
                <MessageCircle size={18} className="mr-2" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="font-medium">Book Your Appointment</span>
                  <span className="text-xs text-white/80">WhatsApp — We reply in your language</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnAboutSection;
