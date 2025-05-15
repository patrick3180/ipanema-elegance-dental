
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
    // Handle specific sections for Implantes Dentários
    if (id === "o-que-sao-implantes") return "O Que São?";
    if (id === "indicacoes-implantes") return "Indicações";
    if (id === "beneficios-implantes") return "Benefícios";
    if (id === "como-e-feito-implantes") return "Como é Feito?";
    if (id === "cuidados-pos-implantes") return "Cuidados";
    if (id === "faq-implantes") return "FAQ";
    
    // Handle specific sections for Clareamento Dental
    if (id === "o-que-e-clareamento") return "O Que é?";
    if (id === "tipos-de-clareamento") return "Tipos";
    if (id === "beneficios-clareamento") return "Benefícios";
    if (id === "como-e-feito-clareamento") return "Como é Feito?";
    if (id === "cuidados-pos-clareamento") return "Cuidados";
    if (id === "faq-clareamento") return "FAQ";
    
    // Handle specific sections for Prótese Dentária
    if (id === "o-que-e-protese") return "O Que é?";
    if (id === "tipos-de-protese") return "Tipos";
    if (id === "beneficios-protese") return "Benefícios";
    if (id === "como-e-feito-protese") return "Como é Feito?";
    if (id === "cuidados-com-protese") return "Cuidados";
    if (id === "faq-protese") return "FAQ";
    
    // Handle specific sections for Clínica Geral e Prevenção
    if (id === "o-que-e-clinica-geral") return "O Que é?";
    if (id === "servicos-preventivos") return "Serviços";
    if (id === "beneficios-prevencao") return "Benefícios";
    if (id === "consulta-preventiva") return "Consulta";
    if (id === "faq-prevencao") return "FAQ";
    
    // Handle specific sections for Restaurações Estéticas
    if (id === "o-que-sao-restauracoes") return "O Que São?";
    if (id === "indicacoes-restauracoes") return "Indicações";
    if (id === "beneficios-restauracoes") return "Benefícios";
    if (id === "como-e-feito-restauracoes") return "Como é Feito?";
    if (id === "cuidados-restauracoes") return "Cuidados";
    if (id === "faq-restauracoes") return "FAQ";
    
    // Handle specific sections for Tratamento de Canal (Endodontia)
    if (id === "o-que-e-endodontia") return "O Que é?";
    if (id === "quando-necessario-canal") return "Quando Necessário?";
    if (id === "beneficios-canal") return "Benefícios";
    if (id === "como-e-feito-canal") return "Como é Feito?";
    if (id === "cuidados-pos-canal") return "Cuidados";
    if (id === "faq-canal") return "FAQ";
    
    // Original patterns for other pages
    if (id === "o-que-e" || id === "o-que-sao") return "O Que é?";
    if (id.includes("indicac")) return "Indicações";
    if (id.includes("benefic")) return "Benefícios";
    if (id.includes("como") || id.includes("process") || id.includes("tecnica") || id.includes("seu")) return "Como é Feito?";
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
