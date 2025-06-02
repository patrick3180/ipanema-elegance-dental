
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowLeft } from "lucide-react";

const BlogPostLoading = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default BlogPostLoading;
