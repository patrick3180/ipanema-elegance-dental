import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Star, MessageCircle, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { sendGCLIDToWebhook } from "@/utils/gclid";
import { getEquivalentPath } from "@/utils/languageMap";

const EnHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(false);
    const location = useLocation();
    const isMobile = useIsMobile();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const treatmentItems = [
        { title: "Dental Implants", path: "/en/dental-implants" },
        { title: "Veneers & Lenses", path: "/en/veneers-and-lenses" },
        { title: "Teeth Whitening", path: "/en/teeth-whitening" },
        { title: "Dental Prosthetics", path: "/en/dental-prosthetics" },
        { title: "Aesthetic Restorations", path: "/en/aesthetic-restorations" },
        { title: "Orthodontics", path: "/en/orthodontics" },
        { title: "Root Canal", path: "/en/root-canal" },
        { title: "Gum Health", path: "/en/gum-health" },
        { title: "General Dentistry", path: "/en/general-dentistry" },
    ];

    const navigationItems = [
        { title: "Home", path: "/en" },
        { title: "About", path: "/en/about" },
        { title: "Emergency", path: "/en/dental-emergency" },
        { title: "Contact", path: "/en/contact" },
    ];

    const isActivePath = (path: string) => {
        if (path === "/en") return location.pathname === "/en";
        return location.pathname.startsWith(path);
    };

    return (
        <header
            className={cn(
                "fixed w-full top-0 z-[60] transition-all duration-300 px-6 lg:px-12",
                isMenuOpen
                    ? "py-3 bg-dental-beige shadow-sm"
                    : isScrolled || isMobile
                        ? "py-3 bg-dental-beige/95 backdrop-blur-md shadow-sm"
                        : "py-6 bg-transparent"
            )}
        >
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-dental-purple focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:outline-none"
            >
                Skip to content
            </a>
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/en" className="flex items-center gap-2 text-dental-purple font-display text-2xl">
                    Dr. Carla Christoph
                </Link>

                {/* Google Rating Badge */}
                <a
                    href="https://g.page/r/CYsX3fOl2dljEAI/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2 py-1 lg:px-3 lg:py-1.5 bg-white/50 backdrop-blur-sm rounded-full border border-dental-gold/20 hover:border-dental-gold/40 transition-all hover:shadow-sm group"
                    aria-label="See our Google reviews - 4.9 stars with 23 reviews"
                >
                    <div className="flex items-center gap-1">
                        <Star size={14} className="fill-dental-gold text-dental-gold lg:w-4 lg:h-4" />
                        <span className="text-xs lg:text-sm font-semibold text-dental-purple">4.9</span>
                    </div>
                    <span className="hidden md:inline text-xs text-dental-purple/70 group-hover:text-dental-purple transition-colors">
                        (23 reviews)
                    </span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        to="/en"
                        className={cn(
                            "text-sm font-medium transition-colors",
                            location.pathname === "/en"
                                ? "text-dental-gold border-b-2 border-dental-gold pb-0.5"
                                : "text-dental-purple/80 hover:text-dental-gold"
                        )}
                    >
                        Home
                    </Link>
                    <Link
                        to="/en/about"
                        className={cn(
                            "text-sm font-medium transition-colors",
                            location.pathname.startsWith("/en/about")
                                ? "text-dental-gold border-b-2 border-dental-gold pb-0.5"
                                : "text-dental-purple/80 hover:text-dental-gold"
                        )}
                    >
                        About
                    </Link>

                    {/* Treatments Dropdown */}
                    <div className="relative group">
                        <button
                            className={cn(
                                "text-sm font-medium transition-colors flex items-center gap-1",
                                treatmentItems.some(t => location.pathname.startsWith(t.path))
                                    ? "text-dental-gold"
                                    : "text-dental-purple/80 hover:text-dental-gold"
                            )}
                        >
                            Treatments
                            <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                        </button>
                        <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="bg-white rounded-lg shadow-elegant border border-dental-beige/50 py-2 min-w-[200px]">
                                {treatmentItems.map((item) => (
                                    <Link
                                        key={item.title}
                                        to={item.path}
                                        className={cn(
                                            "block px-4 py-2 text-sm transition-colors",
                                            location.pathname.startsWith(item.path)
                                                ? "text-dental-gold bg-dental-beige/30"
                                                : "text-dental-purple/80 hover:text-dental-gold hover:bg-dental-beige/20"
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link
                        to="/en/dental-emergency"
                        className={cn(
                            "text-sm font-medium transition-colors",
                            location.pathname.startsWith("/en/dental-emergency")
                                ? "text-dental-gold border-b-2 border-dental-gold pb-0.5"
                                : "text-dental-purple/80 hover:text-dental-gold"
                        )}
                    >
                        Emergency
                    </Link>
                    <Link
                        to="/en/contact"
                        className={cn(
                            "text-sm font-medium transition-colors",
                            location.pathname.startsWith("/en/contact")
                                ? "text-dental-gold border-b-2 border-dental-gold pb-0.5"
                                : "text-dental-purple/80 hover:text-dental-gold"
                        )}
                    >
                        Contact
                    </Link>

                    {/* Language switch */}
                    <Link
                        to={getEquivalentPath(location.pathname, 'pt')}
                        className="text-xs font-medium text-dental-purple/60 hover:text-dental-purple transition-colors flex items-center gap-1"
                    >
                        🇧🇷 Português
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-dental-purple p-2 z-[70]"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-dental-beige z-50 pt-24 px-6 transition-opacity duration-300 opacity-100"
                    style={{ top: "0", left: "0", right: "0", bottom: "0" }}
                >
                    <nav className="flex flex-col items-center gap-6">
                        <Link
                            to="/en"
                            className={cn(
                                "text-xl font-medium transition-colors",
                                location.pathname === "/en" ? "text-dental-gold" : "text-dental-purple hover:text-dental-gold"
                            )}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/en/about"
                            className={cn(
                                "text-xl font-medium transition-colors",
                                location.pathname.startsWith("/en/about") ? "text-dental-gold" : "text-dental-purple hover:text-dental-gold"
                            )}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>

                        {/* Treatments expandable */}
                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => setIsTreatmentsOpen(!isTreatmentsOpen)}
                                className={cn(
                                    "text-xl font-medium transition-colors flex items-center gap-1",
                                    treatmentItems.some(t => location.pathname.startsWith(t.path))
                                        ? "text-dental-gold"
                                        : "text-dental-purple hover:text-dental-gold"
                                )}
                            >
                                Treatments
                                <ChevronDown size={18} className={cn("transition-transform", isTreatmentsOpen && "rotate-180")} />
                            </button>
                            {isTreatmentsOpen && (
                                <div className="flex flex-col items-center gap-3 mt-3">
                                    {treatmentItems.map((item) => (
                                        <Link
                                            key={item.title}
                                            to={item.path}
                                            className={cn(
                                                "text-base transition-colors",
                                                location.pathname.startsWith(item.path)
                                                    ? "text-dental-gold"
                                                    : "text-dental-purple/70 hover:text-dental-gold"
                                            )}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link
                            to="/en/dental-emergency"
                            className={cn(
                                "text-xl font-medium transition-colors",
                                location.pathname.startsWith("/en/dental-emergency") ? "text-dental-gold" : "text-dental-purple hover:text-dental-gold"
                            )}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Emergency
                        </Link>
                        <Link
                            to="/en/contact"
                            className={cn(
                                "text-xl font-medium transition-colors",
                                location.pathname.startsWith("/en/contact") ? "text-dental-gold" : "text-dental-purple hover:text-dental-gold"
                            )}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </Link>

                        {/* Language switch mobile */}
                        <Link
                            to="/"
                            className="text-base font-medium text-dental-purple/60 hover:text-dental-purple transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            🇧🇷 Português
                        </Link>

                        {/* WhatsApp CTA - Mobile Menu */}
                        <button
                            className="mt-4 flex items-center gap-2 bg-[#128C4A] hover:bg-[#0F7540] text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 font-medium"
                            onClick={async () => {
                                setIsMenuOpen(false);
                                if (window.dataLayer) {
                                    window.dataLayer.push({
                                        event: 'whatsapp_click',
                                        event_category: 'Contact',
                                        event_action: 'Click',
                                        event_label: 'WhatsApp EN Mobile Menu'
                                    });
                                }

                                if (window.gtag) {
                                    window.gtag('event', 'conversion', {
                                        'send_to': 'AW-16894364517/OQZvCMXV0foZEOqP7vY9',
                                        'event_callback': function () {
                                            console.log('Google Ads conversion tracked - EN Mobile Menu');
                                        }
                                    });
                                }

                                await sendGCLIDToWebhook('en_header_mobile_menu');

                                window.open(
                                    "https://wa.me/5521993304045?text=Hello!%20I'd%20like%20to%20book%20an%20appointment.",
                                    "_blank"
                                );
                            }}
                        >
                            <MessageCircle size={20} />
                            Book on WhatsApp
                        </button>

                        {/* Language Switch - Mobile */}
                        <Link
                            to={getEquivalentPath(location.pathname, 'pt')}
                            className="mt-2 text-base font-medium text-dental-purple/60 hover:text-dental-gold transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            🇧🇷 Versão em Português
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default EnHeader;
