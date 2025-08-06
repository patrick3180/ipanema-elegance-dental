
import React from "react";
import OptimizedImage from "@/components/OptimizedImage";

interface BlogPostImageProps {
  imageUrl?: string;
  title: string;
}

const BlogPostImage = ({ imageUrl, title }: BlogPostImageProps) => {
  return (
    <div className="max-w-3xl mx-auto mb-8">
      <div className="bg-dental-beige/30 rounded-lg overflow-hidden mb-8">
        <OptimizedImage 
          src={imageUrl || '/placeholder.svg'} 
          alt={title}
          className="w-full h-auto max-h-96"
          objectFit="contain"
          priority={true}
          width={1200}
          height={400}
          responsive={true}
        />
      </div>
    </div>
  );
};

export default BlogPostImage;
