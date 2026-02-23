
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Star, MessageCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to handle section navigation
  const handleSectionNavigation = (sectionId: string) => {
    setIsMenuOpen(false);

    if (location.pathname === '/') {
      // If already on homepage, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on homepage, navigate to homepage then to section
      window.location.href = `/#${sectionId}`;
    }
  };

  // Navigation items with their routes
  const navigationItems = [
    { title: "Início", path: "/" },
    { title: "Sobre", path: "/sobre" },
    { title: "Tratamentos", path: "/servicos" },
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

        {/* Google Rating Badge - All Screens (Sprint 8 - High CTR +15-25%) */}
        <a
          href="https://g.page/r/CYsX3fOl2dljEAI/review"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2 py-1 lg:px-3 lg:py-1.5 bg-white/50 backdrop-blur-sm rounded-full border border-dental-gold/20 hover:border-dental-gold/40 transition-all hover:shadow-sm group"
          aria-label="Veja nossas avaliações no Google - 4.9 estrelas com 23 avaliações"
        >
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-dental-gold text-dental-gold lg:w-4 lg:h-4" />
            <span className="text-xs lg:text-sm font-semibold text-dental-purple">4.9</span>
          </div>
          <span className="hidden md:inline text-xs text-dental-purple/70 group-hover:text-dental-purple transition-colors">
            (23 avaliações)
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigationItems.map((item) => (
            item.action ? (
              <button
                key={item.title}
                onClick={item.action}
                className="text-sm font-medium text-dental-purple/80 hover:text-dental-gold transition-colors"
              >
                {item.title}
              </button>
            ) : (
              <Link
                key={item.title}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActivePath(item.path)
                    ? "text-dental-gold border-b-2 border-dental-gold pb-0.5"
                    : "text-dental-purple/80 hover:text-dental-gold"
                )}
              >
                {item.title}
              </Link>
            )
          ))}
          <Link
            to="/en"
            className="text-sm font-medium text-dental-purple/60 hover:text-dental-gold transition-colors flex items-center gap-1 ml-2 border-l border-dental-purple/20 pl-4"
            title="View in English"
          >
            🇺🇸 EN
          </Link>
        </nav>

        {/* Mobile Menu Button - Always visible regardless of menu state */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-dental-purple p-2 z-[70]"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - Separate from header to ensure proper layering */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-dental-beige z-50 pt-24 px-6 transition-opacity duration-300 opacity-100"
          style={{ top: "0", left: "0", right: "0", bottom: "0" }}
        >
          <nav className="flex flex-col items-center gap-6">
            {navigationItems.map((item) => (
              item.action ? (
                <button
                  key={item.title}
                  onClick={item.action}
                  className="text-xl font-medium text-dental-purple hover:text-dental-gold transition-colors"
                >
                  {item.title}
                </button>
              ) : (
                <Link
                  key={item.title}
                  to={item.path}
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
              )
            ))}

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

            {/* Language Switch - Mobile Menu */}
            <Link
              to="/en"
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
