
import React, { useEffect } from 'react';
import { useBlogOptimization } from '@/hooks/useBlogOptimization';

interface BlogContentProps {
  content: string;
  className?: string;
}

const BlogContent = ({ content, className = '' }: BlogContentProps) => {
  const { imageQuality, maxImageWidth, shouldPreloadImages } = useBlogOptimization();

  useEffect(() => {
    // Find all images in the blog content after it's rendered
    const images = document.querySelectorAll('.blog-content img');
    
    images.forEach((img) => {
      const imageElement = img as HTMLImageElement;
      
      // Add error handling
      imageElement.onerror = () => {
        console.error(`Failed to load image: ${imageElement.src}`);
        imageElement.style.display = 'none';
        
        // Create and show fallback
        const fallback = document.createElement('div');
        fallback.className = 'bg-dental-beige/30 rounded-lg p-4 text-center my-4';
        fallback.innerHTML = '<p class="text-dental-gray/70 text-sm">📷 Imagem não disponível</p>';
        
        if (imageElement.parentNode) {
          imageElement.parentNode.insertBefore(fallback, imageElement);
        }
      };
      
      // Add loading states
      imageElement.onload = () => {
        console.log(`Image loaded successfully: ${imageElement.alt || 'Unnamed image'}`);
        imageElement.style.opacity = '1';
      };
      
      // Set initial loading state
      imageElement.style.opacity = '0';
      imageElement.style.transition = 'opacity 0.3s ease';
      
      // Optimize image URL if it's a Contentful image
      if (imageElement.src.includes('ctfassets.net')) {
        const url = new URL(imageElement.src);
        url.searchParams.set('q', imageQuality.toString());
        url.searchParams.set('w', maxImageWidth.toString());
        url.searchParams.set('fm', 'webp');
        imageElement.src = url.toString();
      }
      
      // Set preload attribute based on optimization settings
      if (!shouldPreloadImages) {
        imageElement.loading = 'lazy';
      }
    });
  }, [content, imageQuality, maxImageWidth, shouldPreloadImages]);

  return (
    <div 
      className={`blog-content prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default BlogContent;
