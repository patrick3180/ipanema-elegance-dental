import React from "react";
import EnPageLayout from "@/components/en/EnPageLayout";
import SEOHead from "@/components/SEOHead";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MessageCircle, Award, Anchor, ScanLine, Stethoscope } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { sendGCLIDToWebhook } from "@/utils/gclid";

const EnAboutPage = () => {
    const handleWhatsAppClick = async () => {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'whatsapp_click',
                event_category: 'Contact',
                event_action: 'Click',
                event_label: 'WhatsApp EN About Page'
            });
        }

        if (window.gtag) {
            window.gtag('event', 'conversion', {
                'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
                'event_callback': function () {
                    console.log('Google Ads conversion tracked - EN About page');
                }
            });
        }

        await sendGCLIDToWebhook('en_about_page_button');

        window.open(
            "https://wa.me/5521993304045?text=Hello!%20I'd%20like%20to%20book%20an%20appointment.",
            "_blank"
        );
    };

    return (
        <>
            <SEOHead
                title="About Dra. Carla Christoph | Dentist in Ipanema, Rio de Janeiro"
                description="Meet Dra. Carla Christoph — dental specialist in Ipanema with 20+ years of experience in prosthodontics and implant dentistry. CRO-RJ 27.509."
                canonicalUrl="https://dracarlachristoph.com/en/about"
                locale="en_US"
                language="en"
                hreflangAlternates={[
                    { lang: "pt-BR", href: "https://dracarlachristoph.com/sobre" },
                    { lang: "en", href: "https://dracarlachristoph.com/en/about" },
                    { lang: "x-default", href: "https://dracarlachristoph.com/sobre" },
                ]}
            />
            <EnPageLayout>
                <section className="section-spacing">
                    <div className="container-custom">
                        {/* Header */}
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h1 className="heading-lg mb-4">About Dra. Carla Christoph</h1>
                            <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
                            <p className="text-dental-gray">
                                Over 20 years dedicated to cosmetic and restorative dentistry.
                            </p>
                        </div>

                        {/* Bio Section */}
                        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto mb-16">
                            <div>
                                <OptimizedImage
                                    src="/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp"
                                    alt="Dra. Carla Christoph - Dentist in Ipanema"
                                    className="rounded-2xl shadow-elegant w-full"
                                    width={500}
                                    height={625}
                                />
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-display text-dental-purple mb-3">Background & Training</h2>
                                    <p className="text-dental-gray leading-relaxed">
                                        Dra. Carla Christoph is a board-certified dental specialist in <strong>prosthodontics</strong> and <strong>implant dentistry</strong>, registered with the Regional Dental Council of Rio de Janeiro (CRO-RJ 27.509). She graduated from the Federal University of Rio de Janeiro (UFRJ) and has over two decades of clinical experience.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-display text-dental-purple mb-2">8 Years in the Brazilian Navy</h3>
                                    <p className="text-dental-gray leading-relaxed">
                                        Before establishing her private practice in Ipanema, Dra. Carla served as a dental officer in the Brazilian Navy for 8 years — an experience that shaped her precision, discipline, and commitment to patient care.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-display text-dental-purple mb-2">Philosophy of Care</h3>
                                    <p className="text-dental-gray leading-relaxed">
                                        Every appointment is a minimum of 1 hour. This isn't a marketing promise — it's a philosophy. Patients deserve time for their dentist to listen, examine thoroughly, explain options clearly, and plan without pressure. No assembly lines, no conveyor belt dentistry.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Credentials */}
                        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                            {[
                                { icon: Award, label: "20+ Years", sublabel: "Clinical Experience" },
                                { icon: Anchor, label: "8 Years", sublabel: "Brazilian Navy" },
                                { icon: Stethoscope, label: "CRO-RJ", sublabel: "27.509" },
                                { icon: ScanLine, label: "iTero 5D", sublabel: "Digital Scanner" },
                            ].map((item) => (
                                <div key={item.label} className="text-center bg-white rounded-xl p-6 shadow-soft">
                                    <item.icon size={28} className="text-dental-gold mx-auto mb-3" />
                                    <p className="font-display text-dental-purple text-lg">{item.label}</p>
                                    <p className="text-dental-gray text-sm">{item.sublabel}</p>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-2xl font-display mb-4">Book Your Appointment</h2>
                            <p className="text-dental-gray mb-6">
                                Located in Ipanema, Rua Visconde de Pirajá, 550 – Suite 1107.
                            </p>
                            <Button
                                onClick={handleWhatsAppClick}
                                className="bg-dental-gold hover:bg-dental-gold/90 text-white px-8 py-6"
                                size="lg"
                            >
                                <MessageCircle size={20} className="mr-2" />
                                Book on WhatsApp
                            </Button>
                        </div>
                    </div>
                </section>
            </EnPageLayout>
        </>
    );
};

export default EnAboutPage;
