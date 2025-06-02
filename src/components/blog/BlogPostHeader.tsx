
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { BlogPost } from "@/types/BlogPost";

interface BlogPostHeaderProps {
  post: BlogPost;
}

const BlogPostHeader = ({ post }: BlogPostHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="outline"
        className="mb-8 border-dental-gray text-dental-purple hover:bg-dental-beige/50"
        onClick={() => navigate("/blog")}
      >
        <ArrowLeft size={16} className="mr-2" />
        Voltar para o blog
      </Button>
      
      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-dental-purple/10 text-dental-purple text-sm px-4 py-1 rounded-full inline-block mb-4">
          {post.category || "Blog"}
        </div>
        <h1 className="heading-lg mb-4">{post.title}</h1>
        <Separator className="w-24 h-1 bg-dental-gold mb-6" />
        <div className="flex flex-wrap items-center text-dental-gray text-sm mb-8 gap-4">
          <div className="flex items-center">
            <User size={16} className="mr-2" />
            <span>{post.author || "Dra. Carla Christoph"}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="mr-2" />
            <span>{post.date}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostHeader;
