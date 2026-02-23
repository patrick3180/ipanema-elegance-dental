import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const EnFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dental-purple text-white pt-16 pb-8">
            <div className="container-custom">
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div>
                        <h3 className="text-xl font-display mb-4">Dra. Carla Christoph</h3>
                        <p className="text-white/60 text-sm mb-1">CRO-RJ 27.509</p>
                        <p className="text-white/70 mb-4">
                            Cosmetic and restorative dentistry in Ipanema, Rio de Janeiro — minimum 1-hour appointments for personalized care.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/dracarlachristoph/"
                                aria-label="Instagram"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-dental-gold/70 transition-colors"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="https://www.facebook.com/dracarlachristoph"
                                aria-label="Facebook"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-dental-gold/70 transition-colors"
                            >
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-display mb-4">Navigation</h3>
                        <ul className="space-y-2">
                            {[
                                { label: "Home", path: "/en" },
                                { label: "About", path: "/en/about" },
                                { label: "Dental Implants", path: "/en/dental-implants" },
                                { label: "Porcelain Veneers", path: "/en/porcelain-veneers" },
                                { label: "General Dentistry", path: "/en/general-dentistry" },
                                { label: "Emergency", path: "/en/dental-emergency" },
                                { label: "Contact", path: "/en/contact" },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.path}
                                        className="text-white/70 hover:text-dental-gold transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    to="/"
                                    className="text-white/50 hover:text-dental-gold transition-colors text-sm"
                                >
                                    🇧🇷 Versão em Português
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-display mb-4">Contact</h3>
                        <address className="not-italic text-white/70 space-y-2">
                            <p>Rua Visconde de Pirajá, 550 - Suite 1107</p>
                            <p>Ipanema, Rio de Janeiro - RJ</p>
                            <p>ZIP: 22410-901</p>
                            <p className="mt-3">
                                <a
                                    href="tel:+552137387909"
                                    className="hover:text-dental-gold transition-colors"
                                >
                                    +55 (21) 3738-7909
                                </a>
                            </p>
                            <p>
                                <a
                                    href="tel:+5521993304045"
                                    className="hover:text-dental-gold transition-colors"
                                >
                                    +55 (21) 99330-4045
                                </a>
                            </p>
                            <p>
                                <a
                                    href="mailto:contato@dracarlachristoph.com"
                                    className="hover:text-dental-gold transition-colors"
                                >
                                    contato@dracarlachristoph.com
                                </a>
                            </p>
                            <p className="mt-3 text-white/50 text-sm">
                                Monday – Friday: 9 AM – 7 PM<br />
                                Saturday & Sunday: Closed
                            </p>
                        </address>
                    </div>
                </div>

                <Separator className="bg-white/20 mb-8" />

                <div className="text-center text-white/70 text-sm">
                    <p>&copy; {currentYear} Dra. Carla Christoph — All rights reserved.</p>
                    <p className="mt-2">
                        <a href="/politica-de-privacidade" className="hover:text-dental-gold transition-colors">Privacy Policy</a>
                        {" • "}
                        <a href="/termos-de-uso" className="hover:text-dental-gold transition-colors">Terms of Use</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default EnFooter;
