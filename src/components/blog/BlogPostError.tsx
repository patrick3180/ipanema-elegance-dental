
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BlogPostError = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default BlogPostError;
