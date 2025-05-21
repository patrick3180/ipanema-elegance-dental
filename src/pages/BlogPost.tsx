
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Share2, Mail, Copy } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogPostBySlug, getAllBlogPosts } from "@/services/contentful/queries";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";

const BlogPost = () => {
  const { postSlug } = useParams<{ postSlug: string }>();
  const navigate = useNavigate();
  
  // Fetch the current blog post
  const { 
    data: post, 
    isLoading, 
    error
  } = useQuery({
    queryKey: ['blogPost', postSlug],
    queryFn: () => getBlogPostBySlug(postSlug || ""),
    enabled: !!postSlug,
    staleTime: 60000, // Cache for 1 minute
    refetchOnMount: true
  });

  // Fetch all posts for related posts, but with lower priority
  const { data: allPosts = [] } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: getAllBlogPosts,
    staleTime: 300000 // Cache for 5 minutes
  });
  
  // Share functionality
  const handleShare = (method: 'whatsapp' | 'email' | 'copy') => {
    if (!post) return;
    
    const currentUrl = window.location.href;
    const title = post.title;
    
    switch (method) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' - ' + currentUrl)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(title + '\n\n' + currentUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(currentUrl).then(() => {
          toast({
            title: "Link copiado",
            description: "O link foi copiado para a área de transferência.",
            duration: 2000,
          });
        }).catch(err => {
          console.error('Erro ao copiar o link:', err);
          toast({
            title: "Erro ao copiar",
            description: "Não foi possível copiar o link.",
            variant: "destructive",
            duration: 2000,
          });
        });
        break;
    }
  };
  
  // If post not found and not loading, navigate to blog page
  React.useEffect(() => {
    if (!isLoading && !post && postSlug) {
      navigate("/blog");
    }
  }, [post, postSlug, navigate, isLoading]);

  // Loading state
  if (isLoading) {
    return (
      <PageLayout>
        <div className="container-custom section-spacing">
          <Button
            variant="outline"
            className="mb-8 border-dental-gray text-dental-purple hover:bg-dental-beige/50"
            onClick={() => navigate("/blog")}
          >
            <ArrowLeft size={16} className="mr-2" />
            Voltar para o blog
          </Button>
          
          <div className="max-w-3xl mx-auto mb-8">
            <div className="animate-pulse bg-dental-purple/10 h-6 w-24 rounded-full mb-4"></div>
            <div className="animate-pulse bg-gray-200 h-12 w-3/4 rounded mb-4"></div>
            <Separator className="w-24 h-1 bg-dental-gold mb-6" />
            <div className="flex gap-4 mb-8">
              <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
              <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-8">
            <AspectRatio ratio={16 / 9} className="bg-dental-beige/30 rounded-lg overflow-hidden animate-pulse mb-8" />
          </div>
          
          <div className="prose prose-lg max-w-3xl mx-auto mb-16">
            <div className="animate-pulse bg-gray-200 h-4 w-full rounded mb-4"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-5/6 rounded mb-4"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-4/6 rounded mb-4"></div>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <PageLayout>
        <div className="container-custom section-spacing text-center">
          <p className="text-red-500 mb-4">Erro ao carregar o artigo</p>
          <Button 
            onClick={() => navigate("/blog")}
            variant="outline"
            className="border-dental-gray text-dental-purple hover:bg-dental-beige/50"
          >
            Voltar para o blog
          </Button>
        </div>
      </PageLayout>
    );
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  // Check if content exists
  const hasContent = post.content && post.content.length > 10;

  return (
    <PageLayout>
      {/* SEO metadata */}
      <Helmet>
        <title>{post.title} | Blog Dental</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription || post.excerpt} />
        {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}
      </Helmet>

      <section className="section-spacing">
        <div className="container-custom">
          <Button
            variant="outline"
            className="mb-8 border-dental-gray text-dental-purple hover:bg-dental-beige/50"
            onClick={() => navigate("/blog")}
          >
            <ArrowLeft size={16} className="mr-2" />
            Voltar para o blog
          </Button>
          
          {/* Post header */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-dental-purple/10 text-dental-purple text-sm px-4 py-1 rounded-full inline-block mb-4">
              {post.category || "Blog"}
            </div>
            <h1 className="heading-lg mb-4">{post.title}</h1>
            <Separator className="w-24 h-1 bg-dental-gold mb-6" />
            <div className="flex flex-wrap items-center text-dental-gray text-sm mb-8 gap-4">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{post.author || "Dra. Carla Christoph"}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>

          {/* Featured image */}
          <div className="max-w-3xl mx-auto mb-8">
            <AspectRatio ratio={16 / 9} className="bg-dental-beige/30 rounded-lg overflow-hidden mb-8">
              <img 
                src={post.imageUrl || '/placeholder.svg'} 
                alt={post.title} 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="max-w-3xl mx-auto mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <div key={index} className="flex items-center bg-dental-beige/50 text-dental-purple text-xs px-3 py-1 rounded-full">
                  <Tag size={12} className="mr-1" />
                  {tag}
                </div>
              ))}
            </div>
          )}

          {/* Content - Now using prose and custom styles */}
          <div className="prose prose-lg max-w-3xl mx-auto mb-16">
            {hasContent ? (
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="blog-content"
              />
            ) : (
              <div>
                <p className="text-dental-gray mb-6">{post.excerpt}</p>
                <p>O conteúdo completo não está disponível no momento.</p>
              </div>
            )}
          </div>

          {/* Share dropdown menu */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-4">
              <span className="text-dental-gray font-medium">Compartilhar:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full w-10 h-10 p-0"
                  >
                    <Share2 size={16} />
                    <span className="sr-only">Compartilhar</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center gap-2"
                    onClick={() => handleShare('whatsapp')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
                    </svg>
                    WhatsApp
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center gap-2"
                    onClick={() => handleShare('email')}
                  >
                    <Mail size={16} className="text-blue-600" />
                    Email
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center gap-2"
                    onClick={() => handleShare('copy')}
                  >
                    <Copy size={16} className="text-dental-purple" />
                    Copiar link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <h2 className="heading-md mb-6 text-center">Artigos relacionados</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="border-none shadow-sm overflow-hidden">
                    <div 
                      className="cursor-pointer" 
                      onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                    >
                      <AspectRatio ratio={16 / 9}>
                        <img 
                          src={relatedPost.imageUrl || '/placeholder.svg'} 
                          alt={relatedPost.title} 
                          className="object-cover w-full h-full rounded-t-md"
                        />
                      </AspectRatio>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-display font-medium mb-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-dental-gray/80 mb-4 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <span className="text-dental-gold font-medium text-sm">
                          Ler mais
                        </span>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default BlogPost;
