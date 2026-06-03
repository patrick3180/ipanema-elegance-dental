import React, { useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getAllBlogPosts } from "@/services/contentful/queries";
import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@/types/BlogPost";
import { Loader } from "lucide-react";

// Sprint 7: Lazy-load non-critical components
const BlogSEOOptimizer = lazy(() => import("@/components/BlogSEOOptimizer"));
const Pagination = lazy(() => import("@/components/ui/pagination").then(m => ({ default: m.Pagination })));
const PaginationContent = lazy(() => import("@/components/ui/pagination").then(m => ({ default: m.PaginationContent })));
const PaginationItem = lazy(() => import("@/components/ui/pagination").then(m => ({ default: m.PaginationItem })));
const PaginationLink = lazy(() => import("@/components/ui/pagination").then(m => ({ default: m.PaginationLink })));
const PaginationNext = lazy(() => import("@/components/ui/pagination").then(m => ({ default: m.PaginationNext })));
const PaginationPrevious = lazy(() => import("@/components/ui/pagination").then(m => ({ default: m.PaginationPrevious })));

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
    "url": "https://dracarlachristoph.com/blog",
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

  // BreadcrumbList schema for Google Search
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://dracarlachristoph.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog"
      }
    ]
  };

  return (
    <>
      {/* BreadcrumbList Schema for Google Search */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <SEOHead
        title="Blog Dra. Carla Christoph | Dicas de Saúde Bucal em Ipanema"
        description="Acesse o blog de odontologia da Dra. Carla Christoph. Encontre dicas de saúde bucal em Ipanema, artigos informativos e novidades para o seu sorriso."
        keywords="blog odontologia, dicas saúde bucal, odontologia estética blog, implantes dentários blog, clareamento dental dicas, lentes de contato dental, Dra. Carla Christoph blog, dentista Ipanema blog"
        canonicalUrl="https://dracarlachristoph.com/blog"
        structuredData={structuredData}
      />
      {/* Sprint 7: BlogSEOOptimizer is invisible — lazy-load it */}
      <Suspense fallback={null}>
        <BlogSEOOptimizer posts={posts} />
      </Suspense>
      <PageLayout>
        <section className="section-spacing">
          <div className="container-custom">
            {/* Visual Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-dental-gray">
                <li>
                  <a href="/" className="hover:text-dental-purple transition-colors">
                    Início
                  </a>
                </li>
                <li className="text-dental-gray/50">/</li>
                <li>
                  <span className="text-dental-purple font-medium">Blog</span>
                </li>
              </ol>
            </nav>

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
                {filteredPosts.map((post: BlogPost, index: number) => (
                  <Card key={post.id} className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                    <div className="cursor-pointer" onClick={() => navigate(`/blog/${post.slug}`)}>
                      <div className="relative">
                        <AspectRatio ratio={16 / 9}>
                          {/* Sprint 7: Only first 3 images eager, rest lazy to reduce LCP */}
                          <img 
                            src={post.imageUrl || '/placeholder.svg'} 
                            alt={post.title} 
                            className="object-cover w-full h-full rounded-t-md"
                            loading={index < 3 ? "eager" : "lazy"}
                            decoding={index < 3 ? "auto" : "async"}
                            width="400"
                            height="225"
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

            {/* Pagination - Sprint 7: lazy-loaded (below fold) */}
            <Suspense fallback={null}>
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
            </Suspense>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default BlogPage;
