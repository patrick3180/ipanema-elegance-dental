
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
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
    { title: "Contato", action: () => handleSectionNavigation("contato") }
  ];

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
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-dental-purple font-display text-2xl">
          Dra. Carla Christoph
        </Link>

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
                className="text-sm font-medium text-dental-purple/80 hover:text-dental-gold transition-colors"
              >
                {item.title}
              </Link>
            )
          ))}
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
                  className="text-xl font-medium text-dental-purple hover:text-dental-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              )
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
