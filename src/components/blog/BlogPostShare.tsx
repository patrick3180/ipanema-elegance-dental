
import React from "react";
import { Button } from "@/components/ui/button";
import { Share2, Mail, Copy } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { BlogPost } from "@/types/BlogPost";

interface BlogPostShareProps {
  post: BlogPost;
}

const BlogPostShare = ({ post }: BlogPostShareProps) => {
  const handleShare = (method: 'whatsapp' | 'email' | 'copy') => {
    const currentUrl = window.location.href;
    const title = post.title;
    
    switch (method) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' - ' + currentUrl)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(title + '\n\n' + currentUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(currentUrl).then(() => {
          toast({
            title: "Link copiado",
            description: "O link foi copiado para a área de transferência.",
            duration: 2000,
          });
        }).catch(err => {
          console.error('Erro ao copiar o link:', err);
          toast({
            title: "Erro ao copiar",
            description: "Não foi possível copiar o link.",
            variant: "destructive",
            duration: 2000,
          });
        });
        break;
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-16">
      <div className="flex items-center justify-center gap-4">
        <span className="text-dental-gray font-medium">Compartilhar:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full w-10 h-10 p-0"
            >
              <Share2 size={16} />
              <span className="sr-only">Compartilhar</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem 
              className="cursor-pointer flex items-center gap-2"
              onClick={() => handleShare('whatsapp')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>
              </svg>
              WhatsApp
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer flex items-center gap-2"
              onClick={() => handleShare('email')}
            >
              <Mail size={16} className="text-blue-600" />
              Email
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer flex items-center gap-2"
              onClick={() => handleShare('copy')}
            >
              <Copy size={16} className="text-dental-purple" />
              Copiar link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default BlogPostShare;
