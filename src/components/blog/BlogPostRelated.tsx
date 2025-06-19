
import React from "react";
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import OptimizedImage from "@/components/OptimizedImage";
import { BlogPost } from "@/types/BlogPost";

interface BlogPostRelatedProps {
  relatedPosts: BlogPost[];
}

const BlogPostRelated = ({ relatedPosts }: BlogPostRelatedProps) => {
  const navigate = useNavigate();

  // Debug logging
  React.useEffect(() => {
    console.log('BlogPostRelated: Component rendered with posts:', relatedPosts.length);
    relatedPosts.forEach((post, index) => {
      console.log(`Related post ${index}:`, {
        title: post.title,
        excerpt: post.excerpt,
        hasTitle: !!post.title,
        titleLength: post.title?.length || 0
      });
    });
  }, [relatedPosts]);

  if (relatedPosts.length === 0) {
    console.log('BlogPostRelated: No related posts to show');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="heading-md mb-6 text-center">Artigos relacionados</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {relatedPosts.map((relatedPost, index) => {
          console.log(`Rendering related post ${index}:`, relatedPost.title);
          
          return (
            <Card key={relatedPost.id} className="border-none shadow-sm">
              <div 
                className="cursor-pointer hover:shadow-md transition-shadow" 
                onClick={() => navigate(`/blog/${relatedPost.slug}`)}
              >
                <AspectRatio ratio={16 / 9}>
                  <OptimizedImage 
                    src={relatedPost.imageUrl || '/placeholder.svg'} 
                    alt={relatedPost.title}
                    className="w-full h-full rounded-t-md"
                    objectFit="cover"
                    width={600}
                  />
                </AspectRatio>
                
                <CardContent className="p-6">
                  {/* Title with inline styles for debugging */}
                  <h3 
                    className="text-xl font-display font-medium mb-2 text-dental-purple leading-tight"
                    style={{ 
                      display: 'block', 
                      visibility: 'visible', 
                      minHeight: '2rem',
                      backgroundColor: 'rgba(255, 0, 0, 0.1)' // Temporary red background for debugging
                    }}
                  >
                    {relatedPost.title || `Post ${index + 1}`}
                  </h3>
                  
                  {/* Excerpt with validation */}
                  <p 
                    className="text-dental-gray/80 mb-4 leading-relaxed"
                    style={{ 
                      display: 'block', 
                      visibility: 'visible',
                      backgroundColor: 'rgba(0, 255, 0, 0.1)' // Temporary green background for debugging
                    }}
                  >
                    {relatedPost.excerpt || "Leia mais sobre este importante tópico odontológico."}
                  </p>
                  
                  <span className="text-dental-gold font-medium text-sm hover:text-dental-purple transition-colors">
                    Ler mais →
                  </span>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPostRelated;
