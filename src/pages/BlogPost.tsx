
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Share2, Loader, Tag } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogPostBySlug, getAllBlogPosts } from "@/services/contentful/queries";
import { useQuery } from "@tanstack/react-query";
import { BlogPost as BlogPostType } from "@/types/BlogPost";
import { Helmet } from "react-helmet-async";

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
    enabled: !!postSlug
  });

  // Fetch all posts for related posts
  const { data: allPosts = [] } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: getAllBlogPosts
  });
  
  // If post not found, navigate to blog page
  useEffect(() => {
    if (!isLoading && !post && postSlug) {
      navigate("/blog");
    }
  }, [post, postSlug, navigate, isLoading]);

  // If loading or error, show appropriate UI
  if (isLoading) {
    return (
      <PageLayout>
        <div className="container-custom section-spacing flex flex-col items-center justify-center min-h-[50vh]">
          <Loader className="h-12 w-12 animate-spin text-dental-purple mb-4" />
          <p className="text-dental-gray">Carregando artigo...</p>
        </div>
      </PageLayout>
    );
  }

  if (error || !post) {
    return (
      <PageLayout>
        <div className="container-custom section-spacing text-center min-h-[50vh]">
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
          
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-dental-purple/10 text-dental-purple text-sm px-4 py-1 rounded-full inline-block mb-4">
              {post.category}
            </div>
            <h1 className="heading-lg mb-4">{post.title}</h1>
            <Separator className="w-24 h-1 bg-dental-gold mb-6" />
            <div className="flex flex-wrap items-center text-dental-gray text-sm mb-8 gap-4">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-8">
            <AspectRatio ratio={16 / 9} className="bg-dental-beige/30 rounded-lg overflow-hidden mb-8">
              <img 
                src={post.imageUrl || '/placeholder.svg'} 
                alt={post.title} 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>

          {/* Tags if available */}
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

          <div className="prose prose-lg max-w-3xl mx-auto mb-16">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Share buttons */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-4">
              <span className="text-dental-gray font-medium">Compartilhar:</span>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full w-10 h-10 p-0"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href
                    });
                  }
                }}
              >
                <Share2 size={16} />
                <span className="sr-only">Compartilhar</span>
              </Button>
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
