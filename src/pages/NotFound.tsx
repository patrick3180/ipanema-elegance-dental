
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dental-beige px-6 text-center">
      <h1 className="heading-lg mb-4 text-dental-purple">Página não encontrada</h1>
      <p className="body-md mb-8 max-w-md">
        A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.
      </p>
      <Button
        asChild
        className="bg-dental-gold hover:bg-dental-gold/90 text-white"
      >
        <a href="/">
          <ArrowLeft size={16} className="mr-2" />
          Voltar para a página inicial
        </a>
      </Button>
    </div>
  );
};

export default NotFound;
