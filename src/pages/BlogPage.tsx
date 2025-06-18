import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { getAllBlogPosts } from "@/services/contentful/queries";
import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@/types/BlogPost";
import { Loader } from "lucide-react";

const BlogPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Static list of categories for now
  const categories = ["Saúde Bucal", "Odontologia Estética", "Prevenção", "Tratamentos"];
  
  // Fetch all blog posts
  const { 
    data: posts = [], 
    isLoading: isLoadingPosts,
    error: postsError
  } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: getAllBlogPosts
  });

  // Filter posts by category if a category is selected
  const filteredPosts = activeCategory 
    ? posts.filter((post: BlogPost) => post.category === activeCategory)
    : posts;

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Dra. Carla Christoph",
    "description": "Blog de odontologia da Dra. Carla Christoph em Ipanema. Dicas de saúde bucal, tratamentos odontológicos e novidades em odontologia estética.",
    "url": "https://dracarlachristoph.com.br/blog",
    "author": {
      "@type": "Person",
      "name": "Dra. Carla Christoph",
      "jobTitle": "Cirurgiã-Dentista Especialista"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Clínica Dra. Carla Christoph",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lovable.dev/opengraph-image-p98pqg.png"
      }
    },
    "inLanguage": "pt-BR",
    "about": [
      "Saúde Bucal",
      "Odontologia Estética", 
      "Implantes Dentários",
      "Lentes de Contato Dental",
      "Clareamento Dental",
      "Prevenção Odontológica"
    ]
  };

  return (
    <>
      <SEOHead
        title="Blog Dra. Carla Christoph | Dicas de Saúde Bucal em Ipanema"
        description="Acesse o blog de odontologia da Dra. Carla Christoph. Encontre dicas de saúde bucal em Ipanema, artigos informativos e novidades para o seu sorriso."
        keywords="blog odontologia, dicas saúde bucal, odontologia estética blog, implantes dentários blog, clareamento dental dicas, lentes de contato dental, Dra. Carla Christoph blog, dentista Ipanema blog"
        canonicalUrl="https://dracarlachristoph.com.br/blog"
        structuredData={structuredData}
      />
      <PageLayout>
        <section className="section-spacing">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="heading-lg mb-4">Blog Odontológico da Dra. Carla Christoph: Informação e Cuidado para seu Sorriso</h1>
              <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
              <p className="text-dental-gray mb-6">
                Bem-vindo ao nosso espaço de informação e dicas sobre saúde bucal! No blog da Dra. Carla Christoph, você encontrará artigos atualizados sobre tratamentos odontológicos, prevenção, novidades da odontologia estética e cuidados essenciais para manter seu sorriso sempre saudável e bonito em Ipanema.
              </p>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={activeCategory === category 
                    ? "bg-dental-gold hover:bg-dental-gold/90 text-white"
                    : "border-dental-gray/30 text-dental-purple hover:bg-dental-beige/50"}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Blog posts grid */}
            {isLoadingPosts ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader className="h-12 w-12 animate-spin text-dental-purple mb-4" />
                <p className="text-dental-gray">Carregando artigos...</p>
              </div>
            ) : postsError ? (
              <div className="text-center py-16">
                <p className="text-red-500 mb-4">Erro ao carregar os artigos do blog</p>
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-dental-gray text-dental-purple hover:bg-dental-beige/50"
                >
                  Tentar novamente
                </Button>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-dental-gray mb-4">Nenhum artigo encontrado{activeCategory ? ` na categoria ${activeCategory}` : ''}.</p>
                {activeCategory && (
                  <Button 
                    onClick={() => setActiveCategory(null)}
                    variant="outline"
                    className="border-dental-gray text-dental-purple hover:bg-dental-beige/50"
                  >
                    Ver todos os artigos
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {filteredPosts.map((post: BlogPost) => (
                  <Card key={post.id} className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                    <div className="cursor-pointer" onClick={() => navigate(`/blog/${post.slug}`)}>
                      <div className="relative">
                        <AspectRatio ratio={16 / 9}>
                          <img 
                            src={post.imageUrl || '/placeholder.svg'} 
                            alt={post.title} 
                            className="object-cover w-full h-full rounded-t-md"
                          />
                        </AspectRatio>
                        <div className="absolute top-3 right-3 bg-dental-purple/90 text-white text-xs px-3 py-1 rounded-full">
                          {post.category}
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="text-sm text-dental-gray mb-2">{post.date}</div>
                        <h3 className="text-xl font-display font-medium mb-2 line-clamp-2">{post.title}</h3>
                        <p className="text-dental-gray/80 mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-dental-purple/80">{post.author}</span>
                          <span className="text-dental-gold font-medium text-sm">Ler mais</span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination - we'll leave this for future implementation */}
            <Pagination className="my-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" className="text-dental-purple" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive className="bg-dental-gold text-white hover:bg-dental-gold/90 border-dental-gold">
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="text-dental-purple">
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" className="text-dental-purple" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default BlogPage;
