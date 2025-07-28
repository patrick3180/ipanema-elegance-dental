import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const GonePage = () => {
  return (
    <>
      <SEOHead 
        title="Conteúdo Removido - Dra. Carla Christoph"
        description="Esta página foi permanentemente removida do nosso site. Encontre informações atualizadas sobre nossos serviços odontológicos."
        noIndex={true}
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-dental-beige px-6 text-center">
        <AlertCircle className="w-16 h-16 text-dental-gold mb-6" />
        <h1 className="heading-lg mb-4 text-dental-purple">Conteúdo Removido</h1>
        <p className="body-md mb-4 max-w-md text-dental-gray">
          Esta página foi permanentemente removida do nosso site e não está mais disponível.
        </p>
        <p className="body-sm mb-8 max-w-md text-dental-gray">
          Nosso site foi atualizado e reorganizado para oferecer uma melhor experiência. 
          Você pode encontrar informações sobre nossos serviços odontológicos na página inicial.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            className="bg-dental-gold hover:bg-dental-gold/90 text-white"
          >
            <a href="/">
              <ArrowLeft size={16} className="mr-2" />
              Página Inicial
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-dental-purple text-dental-purple hover:bg-dental-purple hover:text-white"
          >
            <a href="/servicos">
              Ver Nossos Serviços
            </a>
          </Button>
        </div>
      </div>
    </>
  );
};

export default GonePage;