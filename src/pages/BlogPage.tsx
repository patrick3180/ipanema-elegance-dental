
import React, { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { getAllBlogPosts, getAllCategories, getBlogPostsByCategory } from "@/services/contentful";
import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@/types/BlogPost";
import { Loader } from "lucide-react";

const BlogPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Fetch all blog posts
  const { 
    data: posts = [], 
    isLoading: isLoadingPosts,
    error: postsError
  } = useQuery({
    queryKey: ['blogPosts', activeCategory],
    queryFn: async () => {
      if (activeCategory) {
        return await getBlogPostsByCategory(activeCategory);
      } else {
        return await getAllBlogPosts();
      }
    }
  });

  // Fetch all categories
  const { 
    data: categories = [],
    isLoading: isLoadingCategories
  } = useQuery({
    queryKey: ['blogCategories'],
    queryFn: getAllCategories
  });

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <PageLayout>
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-lg mb-4">Blog</h1>
            <Separator className="w-24 h-1 bg-dental-gold mx-auto mb-6" />
            <p className="text-dental-gray mb-6">
              Artigos e dicas sobre saúde bucal e estética
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {isLoadingCategories ? (
              <div className="flex items-center justify-center w-full py-4">
                <Loader className="h-6 w-6 animate-spin text-dental-purple" />
              </div>
            ) : (
              categories.map((category) => (
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
              ))
            )}
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
          ) : posts.length === 0 ? (
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
              {posts.map((post: BlogPost) => (
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
  );
};

export default BlogPage;
