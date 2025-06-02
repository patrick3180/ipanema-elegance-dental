
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import OptimizedImage from "@/components/OptimizedImage";

interface BlogPostImageProps {
  imageUrl?: string;
  title: string;
}

const BlogPostImage = ({ imageUrl, title }: BlogPostImageProps) => {
  return (
    <div className="max-w-3xl mx-auto mb-8">
      <AspectRatio ratio={16 / 9} className="bg-dental-beige/30 rounded-lg overflow-hidden mb-8">
        <OptimizedImage 
          src={imageUrl || '/placeholder.svg'} 
          alt={title}
          className="w-full h-full"
          objectFit="cover"
          priority={true}
          width={1200}
        />
      </AspectRatio>
    </div>
  );
};

export default BlogPostImage;
