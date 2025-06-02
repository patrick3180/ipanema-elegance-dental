
import React, { useEffect } from 'react';
import { useBlogOptimization } from '@/hooks/useBlogOptimization';

interface BlogContentProps {
  content: string;
  className?: string;
}

const BlogContent = ({ content, className = '' }: BlogContentProps) => {
  const { imageQuality, maxImageWidth, shouldPreloadImages } = useBlogOptimization();

  useEffect(() => {
    console.log('BlogContent: Processing blog content with optimization settings:', {
      imageQuality,
      maxImageWidth, 
      shouldPreloadImages,
      contentLength: content.length
    });

    // Find all images in the blog content after it's rendered
    const images = document.querySelectorAll('.blog-content img');
    console.log(`BlogContent: Found ${images.length} images to optimize`);
    
    images.forEach((img, index) => {
      const imageElement = img as HTMLImageElement;
      const originalSrc = imageElement.src;
      
      console.log(`BlogContent: Processing image ${index + 1}:`, {
        src: originalSrc,
        alt: imageElement.alt || 'No alt text',
        naturalWidth: imageElement.naturalWidth,
        naturalHeight: imageElement.naturalHeight
      });
      
      // Add error handling
      imageElement.onerror = () => {
        console.error(`BlogContent: Failed to load image: ${imageElement.src}`);
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
        console.log(`BlogContent: Image loaded successfully:`, {
          alt: imageElement.alt || 'Unnamed image',
          finalSrc: imageElement.src,
          naturalWidth: imageElement.naturalWidth,
          naturalHeight: imageElement.naturalHeight
        });
        imageElement.style.opacity = '1';
      };
      
      // Set initial loading state
      imageElement.style.opacity = '0';
      imageElement.style.transition = 'opacity 0.3s ease';
      
      // Optimize image URL if it's a Contentful image
      if (imageElement.src.includes('ctfassets.net')) {
        const url = new URL(imageElement.src);
        
        // Clear existing optimization params to avoid conflicts
        url.searchParams.delete('q');
        url.searchParams.delete('w');
        url.searchParams.delete('fm');
        url.searchParams.delete('dpr');
        
        // Apply new optimization settings
        url.searchParams.set('q', imageQuality.toString());
        url.searchParams.set('w', maxImageWidth.toString());
        url.searchParams.set('fm', 'webp');
        
        // Add retina support
        if (window.devicePixelRatio > 1) {
          url.searchParams.set('dpr', Math.min(window.devicePixelRatio, 2).toString());
        }
        
        const optimizedSrc = url.toString();
        console.log(`BlogContent: Optimizing Contentful image from ${originalSrc} to ${optimizedSrc}`);
        imageElement.src = optimizedSrc;
      }
      
      // Set preload attribute based on optimization settings
      if (!shouldPreloadImages) {
        imageElement.loading = 'lazy';
      } else {
        imageElement.loading = 'eager';
      }

      // Ensure responsive behavior
      imageElement.style.maxWidth = '100%';
      imageElement.style.height = 'auto';
      
      // Add better styling for embedded images
      if (imageElement.classList.contains('blog-embedded-image')) {
        imageElement.style.display = 'block';
        imageElement.style.margin = '0 auto';
        imageElement.style.borderRadius = '0.5rem';
        imageElement.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      }
    });
  }, [content, imageQuality, maxImageWidth, shouldPreloadImages]);

  return (
    <div 
      className={`blog-content prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
      style={{
        // Enhanced prose styling for blog content
        '--tw-prose-body': 'rgb(139 92 246 / 0.9)', // dental-purple/90
        '--tw-prose-headings': 'rgb(139 92 246)', // dental-purple
        '--tw-prose-links': 'rgb(139 92 246)', // dental-purple
        '--tw-prose-bold': 'rgb(139 92 246)', // dental-purple
        '--tw-prose-counters': 'rgb(139 92 246)', // dental-purple
        '--tw-prose-bullets': 'rgb(139 92 246)', // dental-purple
        '--tw-prose-hr': 'rgb(156 163 175 / 0.3)', // dental-gray/30
        '--tw-prose-quotes': 'rgb(139 92 246 / 0.8)', // dental-purple/80
        '--tw-prose-quote-borders': 'rgb(245 158 11)', // dental-gold
        '--tw-prose-captions': 'rgb(107 114 128)', // gray-500
        '--tw-prose-code': 'rgb(139 92 246)', // dental-purple
        '--tw-prose-pre-code': 'rgb(139 92 246)', // dental-purple
        '--tw-prose-pre-bg': 'rgb(249 250 251)', // gray-50
        '--tw-prose-th-borders': 'rgb(209 213 219)', // gray-300
        '--tw-prose-td-borders': 'rgb(229 231 235)', // gray-200
      } as React.CSSProperties}
    />
  );
};

export default BlogContent;
