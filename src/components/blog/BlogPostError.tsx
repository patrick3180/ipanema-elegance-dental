
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BlogPostError = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  React.useEffect(() => {
    console.log('BlogPostError component rendered for slug:', slug);
  }, [slug]);

  return (
    <div className="container-custom section-spacing text-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6 max-w-md mx-auto">
        <h2 className="text-lg font-semibold text-red-700 mb-2">Artigo não encontrado</h2>
        <p className="text-red-600 mb-4">
          {slug 
            ? `Não foi possível encontrar o artigo "${slug}"`
            : "Parâmetro de artigo não fornecido"
          }
        </p>
        <div className="text-sm text-red-500 mb-4">
          Verifique se o link está correto ou se o artigo ainda está disponível.
        </div>
      </div>
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
