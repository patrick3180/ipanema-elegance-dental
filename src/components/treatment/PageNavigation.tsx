import React from "react";
interface NavigationItem {
  id: string;
  title: string;
}
interface PageNavigationProps {
  navigationItems: NavigationItem[];
}
const PageNavigation = ({
  navigationItems
}: PageNavigationProps) => {
  // Map navigation items to shorter display names based on content type
  const getDisplayName = (title: string, id: string) => {
    // Safety checks to prevent errors
    if (!id || !title) return "Seção";
    
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
    if (id === "ciencia-prevencao") return "Ciência";
    if (id === "tecnologia-ultrassom") return "Ultrassom";
    if (id === "prevencao-integrada") return "Prevenção";
    if (id === "diagnostico-precoce-avancado") return "Diagnóstico";
    if (id === "protocolos-personalizados") return "Protocolos";
    if (id === "casos-especiais-complexos") return "Casos Especiais";
    if (id === "integracao-saude-sistemica") return "Saúde Sistêmica";
    if (id === "consulta-preventiva-protocolo") return "Consulta";
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
    
    // Handle specific sections for Saúde da Gengiva (Periodontia)
    if (id === "o-que-e-doenca-periodontal") return "O Que é?";
    if (id === "sinais-alerta-gengiva") return "Sinais de Alerta";
    if (id === "tratamentos-gengiva") return "Tratamentos";
    if (id === "importancia-prevencao-gengiva") return "Prevenção";
    if (id === "faq-gengiva") return "FAQ";

    // Handle specific sections for Lentes e Facetas
    if (id === "o-que-sao") return "O Que São?";
    if (id === "materiais-avancados") return "Materiais";
    if (id === "como-funciona") return "Como Funciona?";
    if (id === "indicacoes") return "Indicações";
    if (id === "beneficios") return "Benefícios";
    if (id === "como-e-feito") return "Como é Feito?";
    if (id === "seguranca-cuidados") return "Segurança";
    if (id === "casos-especiais") return "Casos Especiais";
    if (id === "fatores-individuais") return "Personalização";
    if (id === "cuidados") return "Cuidados";

    // Original patterns for other pages
    if (id === "o-que-e") return "O Que é?";
    if (id.includes("indicac")) return "Indicações";
    if (id.includes("benefic")) return "Benefícios";
    if (id.includes("como") || id.includes("process") || id.includes("tecnica") || id.includes("seu")) return "Como é Feito?";
    if (id.includes("cuidad")) return "Cuidados";
    if (id === "faq") return "FAQ";

    // Default: return first word of the title if available
    return title.split(" ")[0] || "Seção";
  };
  return <div className="max-w-3xl mx-auto mb-12 bg-dental-beige/70 p-5 rounded-lg border border-dental-gold/20">
      <nav aria-label="Navegação interna da página">
        <ul className="flex flex-wrap justify-center gap-3 md:gap-6">
          {navigationItems.filter(item => item.id && item.title).map(item => <li key={item.id}>
              <a href={`#${item.id}`} className="text-dental-purple font-medium px-3 py-2 rounded-md hover:bg-dental-beige hover:text-dental-gold transition-colors">
                {getDisplayName(item.title, item.id)}
              </a>
            </li>)}
        </ul>
      </nav>
    </div>;
};
export default PageNavigation;
