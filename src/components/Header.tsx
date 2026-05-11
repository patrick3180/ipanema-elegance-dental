
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Star, MessageCircle, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { getEquivalentPath } from "@/utils/languageMap";

const treatmentSubItems = [
  { title: "Lentes de Contato Dental", path: "/lentes-de-contato-dental-e-facetas-de-porcelana" },
  { title: "Clareamento Dental", path: "/clareamento-dental" },
  { title: "Prótese Dentária", path: "/protese-dentaria" },
  { title: "Implantes Dentários", path: "/implantes-dentarios" },
  { title: "Ortodontia", path: "/ortodontia" },
  { title: "Clínica Geral e Prevenção", path: "/clinica-geral-e-prevencao" },
  { title: "Restaurações Estéticas", path: "/restauracoes-esteticas" },
  { title: "Tratamento de Canal", path: "/tratamento-de-canal" },
  { title: "Saúde da Gengiva", path: "/saude-da-gengiva" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(false);
  const [isMobileTreatmentsOpen, setIsMobileTreatmentsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsTreatmentsOpen(false);
    setIsMobileTreatmentsOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle dropdown hover with delay
  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsTreatmentsOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsTreatmentsOpen(false);
    }, 150);
  };

  // Function to handle section navigation with fixed header offset
  const HEADER_OFFSET = 100;
  const handleSectionNavigation = (sectionId: string) => {
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - HEADER_OFFSET,
          behavior: 'smooth',
        });
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  // Navigation items
  const navigationItems = [
    { title: "Início", path: "/" },
    { title: "Sobre", path: "/sobre" },
    { title: "Tratamentos", path: "/servicos", hasDropdown: true },
    { title: "Blog", path: "/blog" },
    { title: "Depoimentos", action: () => handleSectionNavigation("depoimentos") },
    { title: "Contato", path: "/contato" }
  ];

  const isActivePath = (path?: string) => {
    if (!path) return false;
    if (path === "/") return location.pathname === "/";
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
        Pular para o conteúdo
      </a>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-dental-purple font-display text-2xl">
          Dra. Carla Christoph
        </Link>

        {/* Google Rating Badge */}
        <a
          href="https://www.google.com/maps/place/Dra.+Carla+Christoph/@-22.9837862,-43.2055289,17z/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2 py-1 lg:px-3 lg:py-1.5 bg-white/50 backdrop-blur-sm rounded-full border border-dental-gold/20 hover:border-dental-gold/40 transition-all hover:shadow-sm group"
          aria-label="Veja nossas avaliações no Google - 5.0 estrelas com 16 avaliações"
        >
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-dental-gold text-dental-gold lg:w-4 lg:h-4" />
            <span className="text-xs lg:text-sm font-semibold text-dental-purple">5.0</span>
          </div>
          <span className="hidden md:inline text-xs text-dental-purple/70 group-hover:text-dental-purple transition-colors">
            (16 avaliações)
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigationItems.map((item) => {
            // Tratamentos with dropdown
            if (item.hasDropdown) {
              return (
                <div
                  key={item.title}
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    to={item.path!}
                    className={cn(
                      "text-sm font-medium transition-colors inline-flex items-center gap-1",
                      isActivePath(item.path)
                        ? "text-dental-gold border-b-2 border-dental-gold pb-0.5"
                        : "text-dental-purple/80 hover:text-dental-gold"
                    )}
                  >
                    {item.title}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        isTreatmentsOpen ? "rotate-180" : ""
                      )}
                    />
                  </Link>

                  {/* Dropdown Panel */}
                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200",
                      isTreatmentsOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    )}
                  >
                    <div className="bg-white rounded-xl shadow-hover border border-dental-purple/5 py-2 min-w-[280px]">
                      {treatmentSubItems.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className={cn(
                            "block px-5 py-2.5 text-sm transition-colors",
                            location.pathname === sub.path
                              ? "text-dental-gold bg-dental-gold/5 font-medium"
                              : "text-dental-purple/80 hover:text-dental-gold hover:bg-dental-beige/50"
                          )}
                        >
                          {sub.title}
                        </Link>
                      ))}
                      <div className="border-t border-dental-purple/5 mt-1 pt-1">
                        <Link
                          to="/servicos"
                          className="block px-5 py-2.5 text-sm font-medium text-dental-gold hover:bg-dental-beige/50 transition-colors"
                        >
                          Ver todos os tratamentos →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Action items (Depoimentos)
            if (item.action) {
              return (
                <button
                  key={item.title}
                  onClick={item.action}
                  className="text-sm font-medium text-dental-purple/80 hover:text-dental-gold transition-colors"
                >
                  {item.title}
                </button>
              );
            }

            // Regular links
            return (
              <Link
                key={item.title}
                to={item.path!}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActivePath(item.path)
                    ? "text-dental-gold border-b-2 border-dental-gold pb-0.5"
                    : "text-dental-purple/80 hover:text-dental-gold"
                )}
              >
                {item.title}
              </Link>
            );
          })}
          <Link
            to={getEquivalentPath(location.pathname, 'en')}
            className="text-sm font-medium text-dental-purple/60 hover:text-dental-gold transition-colors flex items-center gap-1 ml-2 border-l border-dental-purple/20 pl-4"
            title="View in English"
          >
            🇺🇸 EN
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
          className="md:hidden fixed inset-0 bg-dental-beige z-50 pt-24 px-6 overflow-y-auto"
          style={{ top: "0", left: "0", right: "0", bottom: "0" }}
        >
          <nav className="flex flex-col items-center gap-5 pb-12">
            {navigationItems.map((item) => {
              // Tratamentos with expandable submenu
              if (item.hasDropdown) {
                return (
                  <div key={item.title} className="w-full max-w-xs text-center">
                    <button
                      onClick={() => setIsMobileTreatmentsOpen(!isMobileTreatmentsOpen)}
                      className={cn(
                        "text-xl font-medium transition-colors inline-flex items-center gap-2",
                        isActivePath(item.path)
                          ? "text-dental-gold"
                          : "text-dental-purple hover:text-dental-gold"
                      )}
                    >
                      {item.title}
                      <ChevronDown
                        size={18}
                        className={cn(
                          "transition-transform duration-200",
                          isMobileTreatmentsOpen ? "rotate-180" : ""
                        )}
                      />
                    </button>

                    {/* Mobile submenu */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        isMobileTreatmentsOpen
                          ? "max-h-[500px] opacity-100 mt-3"
                          : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="flex flex-col gap-2 bg-white/50 rounded-xl p-3">
                        {treatmentSubItems.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className={cn(
                              "text-base py-2 px-3 rounded-lg transition-colors",
                              location.pathname === sub.path
                                ? "text-dental-gold bg-dental-gold/10 font-medium"
                                : "text-dental-purple/80 hover:text-dental-gold hover:bg-dental-beige"
                            )}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {sub.title}
                          </Link>
                        ))}
                        <Link
                          to="/servicos"
                          className="text-base py-2 px-3 text-dental-gold font-medium border-t border-dental-purple/10 mt-1 pt-3"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Ver todos →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              // Action items
              if (item.action) {
                return (
                  <button
                    key={item.title}
                    onClick={item.action}
                    className="text-xl font-medium text-dental-purple hover:text-dental-gold transition-colors"
                  >
                    {item.title}
                  </button>
                );
              }

              // Regular links
              return (
                <Link
                  key={item.title}
                  to={item.path!}
                  className={cn(
                    "text-xl font-medium transition-colors",
                    isActivePath(item.path)
                      ? "text-dental-gold"
                      : "text-dental-purple hover:text-dental-gold"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              );
            })}

            {/* WhatsApp CTA - Mobile Menu */}
            <a
              href="https://wa.me/5521993304045?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 bg-[#128C4A] hover:bg-[#0F7540] text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 font-medium"
              onClick={() => {
                setIsMenuOpen(false);
                if (window.dataLayer) {
                  window.dataLayer.push({
                    event: 'whatsapp_click',
                    event_category: 'Contact',
                    event_action: 'Click',
                    event_label: 'WhatsApp Mobile Menu'
                  });
                }
              }}
            >
              <MessageCircle size={20} />
              Agendar pelo WhatsApp
            </a>

            {/* Language Switch */}
            <Link
              to={getEquivalentPath(location.pathname, 'en')}
              className="mt-2 text-base font-medium text-dental-purple/60 hover:text-dental-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              🇺🇸 English Version
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
