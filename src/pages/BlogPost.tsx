
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getBlogPostBySlug, blogPosts } from "@/data/blogPosts";
import { Card, CardContent } from "@/components/ui/card";

const BlogPost = () => {
  const { postSlug } = useParams<{ postSlug: string }>();
  const navigate = useNavigate();
  const post = getBlogPostBySlug(postSlug || "");
  
  // If post not found, navigate to blog page
  useEffect(() => {
    if (!post && postSlug) {
      navigate("/blog");
    }
  }, [post, postSlug, navigate]);

  if (!post) {
    return null;
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  return (
    <PageLayout>
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
                src={post.imageUrl} 
                alt={post.title} 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>

          <div className="prose prose-lg max-w-3xl mx-auto mb-16">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Share buttons */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-4">
              <span className="text-dental-gray font-medium">Compartilhar:</span>
              <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
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
                          src={relatedPost.imageUrl} 
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
