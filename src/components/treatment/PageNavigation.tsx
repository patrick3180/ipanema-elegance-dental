
import React from "react";

interface NavigationItem {
  id: string;
  title: string;
}

interface PageNavigationProps {
  navigationItems: NavigationItem[];
}

const PageNavigation = ({ navigationItems }: PageNavigationProps) => {
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
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default PageNavigation;
