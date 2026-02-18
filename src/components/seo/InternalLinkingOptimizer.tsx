import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface RelatedLink {
  title: string;
  url: string;
  description: string;
}

interface InternalLinkingOptimizerProps {
  currentPage: string;
}

export const InternalLinkingOptimizer: React.FC<InternalLinkingOptimizerProps> = ({
  currentPage,
}) => {
  const allLinks: Record<string, RelatedLink[]> = {
    'implantes-dentarios': [
      { title: 'Prótese Dentária', url: '/protese-dentaria', description: 'Coroas e próteses fixas sobre implante' },
      { title: 'Saúde da Gengiva', url: '/saude-da-gengiva', description: 'Base essencial para o sucesso do implante' },
      { title: 'Clínica Geral e Prevenção', url: '/clinica-geral-e-prevencao', description: 'Avaliação e cuidados preventivos' },
    ],
    'clareamento-dental': [
      { title: 'Lentes de Contato Dental e Facetas', url: '/lentes-de-contato-dental-e-facetas', description: 'Estética completa com lentes de porcelana' },
      { title: 'Restaurações Estéticas', url: '/restauracoes-esteticas', description: 'Restaurações que acompanham o novo tom' },
      { title: 'Saúde da Gengiva', url: '/saude-da-gengiva', description: 'Gengiva saudável antes do clareamento' },
    ],
    'lentes-de-contato-dental-e-facetas': [
      { title: 'Clareamento Dental', url: '/clareamento-dental', description: 'Combine clareamento com as lentes' },
      { title: 'Ortodontia', url: '/ortodontia', description: 'Alinhamento prévio quando necessário' },
      { title: 'Restaurações Estéticas', url: '/restauracoes-esteticas', description: 'Outros tratamentos estéticos integrados' },
    ],
    'ortodontia': [
      { title: 'Lentes de Contato Dental e Facetas', url: '/lentes-de-contato-dental-e-facetas', description: 'Acabamento estético pós-alinhamento' },
      { title: 'Clareamento Dental', url: '/clareamento-dental', description: 'Clareamento integrado ao tratamento' },
      { title: 'Clínica Geral e Prevenção', url: '/clinica-geral-e-prevencao', description: 'Higiene e prevenção durante o uso do aparelho' },
    ],
    'tratamento-de-canal': [
      { title: 'Restaurações Estéticas', url: '/restauracoes-esteticas', description: 'Reconstrução do dente após o canal' },
      { title: 'Prótese Dentária', url: '/protese-dentaria', description: 'Coroa para proteção pós-tratamento' },
      { title: 'Implantes Dentários', url: '/implantes-dentarios', description: 'Alternativa se a extração for necessária' },
    ],
    'saude-da-gengiva': [
      { title: 'Implantes Dentários', url: '/implantes-dentarios', description: 'Implantes exigem gengiva saudável' },
      { title: 'Clínica Geral e Prevenção', url: '/clinica-geral-e-prevencao', description: 'Prevenção e manutenção periodontal' },
      { title: 'Lentes de Contato Dental e Facetas', url: '/lentes-de-contato-dental-e-facetas', description: 'Estética com base periodontal saudável' },
    ],
    'protese-dentaria': [
      { title: 'Implantes Dentários', url: '/implantes-dentarios', description: 'Implantes como suporte para próteses fixas' },
      { title: 'Tratamento de Canal', url: '/tratamento-de-canal', description: 'Preservação do dente antes da prótese' },
      { title: 'Clínica Geral e Prevenção', url: '/clinica-geral-e-prevencao', description: 'Cuidados preventivos após reabilitação' },
    ],
    'restauracoes-esteticas': [
      { title: 'Tratamento de Canal', url: '/tratamento-de-canal', description: 'Reconstrução após tratamento endodôntico' },
      { title: 'Clareamento Dental', url: '/clareamento-dental', description: 'Harmonize a cor das restaurações' },
      { title: 'Lentes de Contato Dental e Facetas', url: '/lentes-de-contato-dental-e-facetas', description: 'Estética avançada com porcelana' },
    ],
    'clinica-geral-e-prevencao': [
      { title: 'Saúde da Gengiva', url: '/saude-da-gengiva', description: 'Prevenção e tratamento periodontal' },
      { title: 'Clareamento Dental', url: '/clareamento-dental', description: 'Estética após os cuidados preventivos' },
      { title: 'Ortodontia', url: '/ortodontia', description: 'Alinhamento dental integrado à prevenção' },
    ],
  };

  const relatedLinks = allLinks[currentPage] || [];
  if (relatedLinks.length === 0) return null;

  return (
    <section className="py-12 bg-dental-beige/20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-xl font-display font-semibold text-dental-purple mb-6">
          Tratamentos Relacionados
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {relatedLinks.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              className="group flex flex-col gap-2 bg-white p-5 rounded-xl border border-dental-beige-light hover:border-dental-purple/30 hover:shadow-md transition-all duration-200"
            >
              <span className="font-semibold text-dental-purple text-sm leading-snug group-hover:text-dental-purple-light transition-colors">
                {link.title}
              </span>
              <span className="text-dental-gray text-xs leading-relaxed flex-1">
                {link.description}
              </span>
              <span className="flex items-center gap-1 text-dental-gold text-xs font-medium mt-1">
                Saiba mais <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Breadcrumb component for better navigation
export const EnhancedBreadcrumb: React.FC<{
  items: Array<{ label: string; href?: string }>
}> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-muted-foreground/50">/</span>
            )}
            {item.href ? (
              <Link
                to={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.label,
              ...(item.href && { "item": `https://dracarlachristoph.com${item.href}` })
            }))
          })
        }}
      />
    </nav>
  );
};

// Content clustering component for topical authority
export const ContentCluster: React.FC<{
  topic: string;
  relatedContent: Array<{ title: string; url: string; type: 'service' | 'blog' | 'page' }>;
}> = ({ topic, relatedContent }) => {
  return (
    <div className="border rounded-lg p-6 bg-card">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        {topic} - Conteúdo Relacionado
      </h3>
      <div className="space-y-3">
        {relatedContent.map((content, index) => (
          <Link
            key={index}
            to={content.url}
            className="block p-3 rounded border hover:bg-accent transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{content.title}</span>
              <span className="text-xs text-muted-foreground">
                {content.type === 'service' ? 'Serviço' :
                  content.type === 'blog' ? 'Artigo' : 'Página'}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
