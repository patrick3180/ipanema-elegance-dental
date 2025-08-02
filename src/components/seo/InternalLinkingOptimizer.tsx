import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface RelatedLink {
  title: string;
  url: string;
  description: string;
  category: 'service' | 'blog' | 'info';
}

interface InternalLinkingOptimizerProps {
  currentPage: string;
  category?: string;
}

export const InternalLinkingOptimizer: React.FC<InternalLinkingOptimizerProps> = ({ 
  currentPage, 
  category 
}) => {
  // Define internal linking structure
  const getRelatedLinks = (page: string, cat?: string): RelatedLink[] => {
    const allLinks: Record<string, RelatedLink[]> = {
      'home': [
        { title: 'Nossos Serviços', url: '/servicos', description: 'Conheça todos os tratamentos disponíveis', category: 'service' },
        { title: 'Sobre a Dra. Carla', url: '/sobre', description: 'Saiba mais sobre nossa especialista', category: 'info' },
        { title: 'Blog Odontológico', url: '/blog', description: 'Dicas e informações sobre saúde bucal', category: 'blog' }
      ],
      'servicos': [
        { title: 'Lentes de Contato Dental', url: '/lentes-de-contato-dental-e-facetas-de-porcelana', description: 'Transformação do sorriso com lentes', category: 'service' },
        { title: 'Clareamento Dental', url: '/clareamento-dental', description: 'Deixe seu sorriso mais branco', category: 'service' },
        { title: 'Implantes Dentários', url: '/implantes-dentarios', description: 'Reposição de dentes perdidos', category: 'service' },
        { title: 'Nossos Diferenciais', url: '/diferenciais', description: 'O que nos torna únicos', category: 'info' }
      ],
      'sobre': [
        { title: 'Nossos Serviços', url: '/servicos', description: 'Tratamentos especializados', category: 'service' },
        { title: 'Entre em Contato', url: '/contato', description: 'Agende sua consulta', category: 'info' },
        { title: 'Blog', url: '/blog', description: 'Artigos sobre odontologia', category: 'blog' }
      ],
      'blog': [
        { title: 'Clareamento Dental', url: '/clareamento-dental', description: 'Tratamento para um sorriso mais branco', category: 'service' },
        { title: 'Estética Dental', url: '/lentes-de-contato-dental-e-facetas-de-porcelana', description: 'Lentes e facetas de porcelana', category: 'service' },
        { title: 'Implantodontia', url: '/implantes-dentarios', description: 'Especialidade em implantes', category: 'service' }
      ],
      'clareamento-dental': [
        { title: 'Lentes de Contato Dental', url: '/lentes-de-contato-dental-e-facetas-de-porcelana', description: 'Combine com lentes para resultado perfeito', category: 'service' },
        { title: 'Restaurações Estéticas', url: '/restauracoes-esteticas', description: 'Tratamentos complementares', category: 'service' },
        { title: 'Blog sobre Estética', url: '/blog', description: 'Dicas de cuidados pós-clareamento', category: 'blog' }
      ],
      'lentes-de-contato-dental-e-facetas-de-porcelana': [
        { title: 'Clareamento Dental', url: '/clareamento-dental', description: 'Prepare-se antes das lentes', category: 'service' },
        { title: 'Restaurações Estéticas', url: '/restauracoes-esteticas', description: 'Outros tratamentos estéticos', category: 'service' },
        { title: 'Nossos Diferenciais', url: '/diferenciais', description: 'Tecnologia de ponta', category: 'info' }
      ],
      'implantes-dentarios': [
        { title: 'Prótese Dentária', url: '/protese-dentaria', description: 'Complemento aos implantes', category: 'service' },
        { title: 'Clínica Geral', url: '/clinica-geral-e-prevencao', description: 'Cuidados preventivos', category: 'service' },
        { title: 'Blog', url: '/blog', description: 'Tudo sobre implantes', category: 'blog' }
      ]
    };

    return allLinks[page] || [];
  };

  const relatedLinks = getRelatedLinks(currentPage, category);

  if (relatedLinks.length === 0) return null;

  return (
    <div className="my-8">
      <h3 className="text-xl font-semibold mb-4 text-foreground">
        Páginas Relacionadas
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {relatedLinks.map((link, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <Link 
                to={link.url}
                className="block hover:text-primary transition-colors"
              >
                <h4 className="font-medium mb-2">{link.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {link.description}
                </p>
                <span className="inline-block mt-2 text-xs text-primary font-medium">
                  {link.category === 'service' ? '🦷 Serviço' : 
                   link.category === 'blog' ? '📝 Artigo' : 'ℹ️ Informação'}
                </span>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
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
      
      {/* Structured data for breadcrumbs */}
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