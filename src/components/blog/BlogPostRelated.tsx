
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

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="heading-md mb-6 text-center">Artigos relacionados</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {relatedPosts.map((relatedPost) => (
          <Card key={relatedPost.id} className="border-none shadow-sm overflow-hidden">
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
                <h3 className="text-xl font-display font-medium mb-2 text-dental-purple leading-tight">
                  {relatedPost.title}
                </h3>
                <p className="text-dental-gray/80 mb-4 leading-relaxed excerpt-text">
                  {relatedPost.excerpt || "Leia mais sobre este importante tópico odontológico."}
                </p>
                <span className="text-dental-gold font-medium text-sm hover:text-dental-purple transition-colors">
                  Ler mais →
                </span>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogPostRelated;
