import React, { useEffect } from 'react';
import { BlogPost } from '@/types/BlogPost';

interface BlogSEOOptimizerProps {
  posts: BlogPost[];
}

/**
 * Component that optimizes SEO for the blog section by adding
 * internal linking suggestions and structured data for blog posts
 */
const BlogSEOOptimizer: React.FC<BlogSEOOptimizerProps> = ({ posts }) => {
  useEffect(() => {
    // Add blog list structured data
    const addBlogListStructuredData = () => {
      const existingScript = document.getElementById('blog-list-structured-data');
      if (existingScript) {
        existingScript.remove();
      }

      const blogListData = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Blog Dental Dra. Carla Christoph",
        "description": "Artigos e dicas sobre saúde bucal, tratamentos odontológicos e cuidados dentários por especialista em Ipanema",
        "url": "https://dracarlachristoph.com/blog",
        "author": {
          "@type": "Person",
          "name": "Dra. Carla Christoph",
          "@id": "https://dracarlachristoph.com/sobre#person"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Clínica Dra. Carla Christoph",
          "@id": "https://dracarlachristoph.com#organization"
        },
        "blogPost": posts.map(post => ({
          "@type": "BlogPosting",
          "@id": `https://dracarlachristoph.com/blog/${post.slug}#article`,
          "headline": post.title,
          "description": post.excerpt,
          "image": post.imageUrl,
          "url": `https://dracarlachristoph.com/blog/${post.slug}`,
          "datePublished": post.date,
          "dateModified": post.date,
          "author": {
            "@type": "Person",
            "name": post.author,
            "@id": "https://dracarlachristoph.com/sobre#person"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Clínica Dra. Carla Christoph",
            "@id": "https://dracarlachristoph.com#organization"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://dracarlachristoph.com/blog/${post.slug}`
          },
          "articleSection": post.category,
          "keywords": post.tags?.join(", ") || `${post.category}, odontologia`,
          "inLanguage": "pt-BR",
          "isAccessibleForFree": "True"
        }))
      };

      const script = document.createElement('script');
      script.id = 'blog-list-structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(blogListData);
      document.head.appendChild(script);
    };

    // Add FAQ structured data for common questions
    const addFAQStructuredData = () => {
      const existingScript = document.getElementById('blog-faq-structured-data');
      if (existingScript) {
        existingScript.remove();
      }

      const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Quais tipos de tratamentos odontológicos vocês oferecem?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oferecemos uma ampla gama de tratamentos incluindo lentes de contato dental, facetas de porcelana, clareamento dental, implantes dentários, próteses dentárias, tratamento de canal, restaurações estéticas e cuidados preventivos."
            }
          },
          {
            "@type": "Question",
            "name": "Como posso agendar uma consulta?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Você pode agendar uma consulta através do nosso WhatsApp, telefone ou pelo formulário de contato em nosso site. Nossa equipe responderá rapidamente para confirmar sua consulta."
            }
          },
          {
            "@type": "Question",
            "name": "Vocês atendem convênios?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Entre em contato conosco para verificar se atendemos seu convênio específico. Trabalhamos com diversos planos de saúde e oferecemos opções de pagamento flexíveis."
            }
          },
          {
            "@type": "Question",
            "name": "Onde fica localizada a clínica?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nossa clínica está localizada em Ipanema, Rio de Janeiro, um dos bairros mais prestigiados da cidade, oferecendo fácil acesso e estacionamento para nossos pacientes."
            }
          }
        ]
      };

      const script = document.createElement('script');
      script.id = 'blog-faq-structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(faqData);
      document.head.appendChild(script);
    };

    // Only add structured data if we have posts
    if (posts && posts.length > 0) {
      addBlogListStructuredData();
      addFAQStructuredData();
    }

    // Add internal linking suggestions to console for SEO audit
    if (import.meta.env.DEV) {
      console.log('🔗 SEO Internal Linking Suggestions:');
      console.log('- Link blog posts to related service pages');
      console.log('- Add "Leia mais" links between related blog posts');
      console.log('- Include calls-to-action linking to contact page');
      console.log('- Cross-reference treatment pages with related blog content');
      
      // Log blog post categories for better organization
      const categories = [...new Set(posts.map(post => post.category))];
      console.log('📝 Blog Categories:', categories);
      console.log('💡 Consider creating category pages for:', categories.join(', '));
    }

    return () => {
      // Cleanup structured data when component unmounts
      const blogListScript = document.getElementById('blog-list-structured-data');
      const faqScript = document.getElementById('blog-faq-structured-data');
      if (blogListScript) blogListScript.remove();
      if (faqScript) faqScript.remove();
    };
  }, [posts]);

  // Add meta tags for better social sharing
  useEffect(() => {
    const addSocialMetaTags = () => {
      // Add Twitter card meta tags if not present
      const addMetaTag = (property: string, content: string) => {
        const existing = document.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
        if (!existing) {
          const meta = document.createElement('meta');
          if (property.startsWith('og:') || property.startsWith('article:')) {
            meta.setAttribute('property', property);
          } else {
            meta.setAttribute('name', property);
          }
          meta.setAttribute('content', content);
          document.head.appendChild(meta);
        }
      };

      // Twitter Card meta tags
      addMetaTag('twitter:card', 'summary_large_image');
      addMetaTag('twitter:site', '@dracarlachristoph');
      addMetaTag('twitter:creator', '@dracarlachristoph');
      
      // Open Graph meta tags for blog section
      addMetaTag('og:site_name', 'Clínica Dra. Carla Christoph');
      addMetaTag('og:locale', 'pt_BR');
      addMetaTag('article:author', 'Dra. Carla Christoph');
      addMetaTag('article:publisher', 'https://dracarlachristoph.com');
    };

    addSocialMetaTags();
  }, []);

  return null; // This component doesn't render anything visible
};

export default BlogSEOOptimizer;