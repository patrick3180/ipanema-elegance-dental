
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  introduction: string;
}

const PageHeader = ({ title, introduction }: PageHeaderProps) => {
  return (
    <>
      <Button variant="outline" asChild className="mb-6 border-dental-gray text-dental-purple hover:bg-dental-beige/50">
        <Link to="/servicos">
          <ArrowLeft size={16} className="mr-2" />
          Voltar para tratamentos
        </Link>
      </Button>
      
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="heading-lg mb-4">{title}</h1>
        <Separator className="w-24 h-1 bg-dental-gold mb-6" />
        <p className="body-md">{introduction}</p>
      </div>
    </>
  );
};

export default PageHeader;
