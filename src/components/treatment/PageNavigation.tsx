
import React from "react";

interface NavigationItem {
  id: string;
  title: string;
}

interface PageNavigationProps {
  navigationItems: NavigationItem[];
}

const PageNavigation = ({ navigationItems }: PageNavigationProps) => {
  // Map navigation items to shorter display names based on content type
  const getDisplayName = (title: string, id: string) => {
    if (id === "o-que-e" || id === "o-que-sao") return "O";
    if (id.includes("indicac")) return "Indicações";
    if (id.includes("benefic")) return "Benefícios";
    if (id.includes("como") || id.includes("process") || id.includes("tecnica") || id.includes("seu")) return "Seu";
    if (id.includes("cuidad")) return "Cuidados";
    if (id === "faq") return "FAQ";
    
    // Default: return first word of the title
    return title.split(" ")[0];
  };

  return (
    <div className="max-w-3xl mx-auto mb-12 bg-dental-beige/70 p-5 rounded-lg border border-dental-gold/20">
      <nav aria-label="Navegação interna da página">
        <ul className="flex flex-wrap justify-center gap-3 md:gap-6">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <a 
                href={`#${item.id}`} 
                className="text-dental-purple font-medium px-3 py-2 rounded-md hover:bg-dental-beige hover:text-dental-gold transition-colors"
              >
                {getDisplayName(item.title, item.id)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default PageNavigation;
