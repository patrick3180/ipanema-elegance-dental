
import React from "react";
import { useNavigate } from "react-router-dom";
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
            <article 
              key={relatedPost.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col"
              onClick={() => navigate(`/blog/${relatedPost.slug}`)}
              role="article"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`/blog/${relatedPost.slug}`);
                }
              }}
            >
              {/* Image Section */}
              <div className="relative w-full h-48 overflow-hidden">
                <OptimizedImage 
                  src={relatedPost.imageUrl || '/placeholder.svg'} 
                  alt={relatedPost.title}
                  className="w-full h-full object-cover"
                  objectFit="cover"
                  width={600}
                />
              </div>
              
              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-display font-medium mb-3 text-dental-purple leading-tight">
                  {relatedPost.title || `Post ${index + 1}`}
                </h3>
                
                <p className="text-dental-gray/80 mb-4 leading-relaxed flex-grow">
                  {relatedPost.excerpt || "Leia mais sobre este importante tópico odontológico."}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-dental-gold font-medium text-sm hover:text-dental-purple transition-colors">
                    Ler mais →
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPostRelated;
