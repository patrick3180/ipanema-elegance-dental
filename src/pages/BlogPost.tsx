
import React from "react";
import { useParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { postSlug } = useParams<{ postSlug: string }>();
  
  // This is a placeholder. In a real implementation, we would fetch post data based on the slug
  const postTitle = postSlug?.split("-").map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");

  return (
    <PageLayout>
      <section className="section-spacing">
        <div className="container-custom">
          <Button
            variant="outline"
            asChild
            className="mb-8 border-dental-gray text-dental-purple hover:bg-dental-beige/50"
          >
            <a href="/blog">
              <ArrowLeft size={16} className="mr-2" />
              Voltar para o blog
            </a>
          </Button>
          
          <div className="max-w-3xl mx-auto mb-8">
            <h1 className="heading-lg mb-4">{postTitle || "Artigo"}</h1>
            <Separator className="w-24 h-1 bg-dental-gold mb-6" />
            <div className="flex items-center text-dental-gray text-sm mb-8">
              <span>Por Dra. Carla Christoph</span>
              <span className="mx-2">•</span>
              <span>12 de Maio de 2023</span>
            </div>
          </div>

          {/* Content will be added in future implementation */}
          <div className="prose prose-lg max-w-3xl mx-auto">
            <p className="body-md">
              Conteúdo completo do artigo será implementado em breve.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default BlogPost;
