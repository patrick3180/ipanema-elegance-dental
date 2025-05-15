
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300 px-6 lg:px-12",
        isScrolled
          ? "py-3 bg-dental-beige/90 backdrop-blur-md shadow-sm"
          : "py-6 bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="text-dental-purple font-display text-2xl">
          Dra. Carla Christoph
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {["Início", "Sobre", "Tratamentos", "Blog", "Depoimentos", "Contato"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-dental-purple/80 hover:text-dental-gold transition-colors"
              >
                {item}
              </a>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-dental-purple p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-dental-beige pt-24 px-6 z-40 transition-transform duration-300",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="flex flex-col items-center gap-6">
          {["Início", "Sobre", "Tratamentos", "Blog", "Depoimentos", "Contato"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xl font-medium text-dental-purple hover:text-dental-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
