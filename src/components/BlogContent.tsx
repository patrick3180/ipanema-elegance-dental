
import React, { useEffect } from 'react';
import { useBlogOptimization } from '@/hooks/useBlogOptimization';

interface BlogContentProps {
  content: string;
  className?: string;
}

const BlogContent = ({ content, className = '' }: BlogContentProps) => {
  const { imageQuality, maxImageWidth, shouldPreloadImages } = useBlogOptimization();

  useEffect(() => {
    if (!content || content.length === 0) {
      console.log('BlogContent: No content to process');
      return;
    }

    console.log('BlogContent: Processing content with optimization settings:', {
      imageQuality,
      maxImageWidth, 
      shouldPreloadImages,
      contentLength: content.length,
      hasImages: content.includes('<img')
    });

    // Use a timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      const images = document.querySelectorAll('.blog-content img');
      console.log(`BlogContent: Found ${images.length} images to process`);
      
      images.forEach((img, index) => {
        const imageElement = img as HTMLImageElement;
        const originalSrc = imageElement.src;
        
        console.log(`BlogContent: Processing image ${index + 1}:`, {
          src: originalSrc,
          alt: imageElement.alt || 'No alt text',
          className: imageElement.className,
          hasParent: !!imageElement.parentElement
        });
        
        // Enhanced error handling with better fallback
        imageElement.onerror = (event) => {
          console.error(`BlogContent: Image load failed:`, {
            src: imageElement.src,
            alt: imageElement.alt,
            error: event
          });
          
          // Hide the image
          imageElement.style.display = 'none';
          
          // Create enhanced fallback
          const fallback = document.createElement('div');
          fallback.className = 'bg-dental-beige/30 rounded-xl p-6 text-center my-8 border border-dental-gray/20';
          fallback.innerHTML = `
            <div class="text-dental-gray/70">
              <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <p class="text-sm">Imagem não pôde ser carregada</p>
              ${imageElement.alt ? `<p class="text-xs mt-1 opacity-75">${imageElement.alt}</p>` : ''}
            </div>
          `;
          
          // Insert fallback before the image
          if (imageElement.parentNode) {
            imageElement.parentNode.insertBefore(fallback, imageElement);
          }
        };
        
        // Enhanced load success handling
        imageElement.onload = () => {
          console.log(`BlogContent: Image loaded successfully:`, {
            alt: imageElement.alt || 'Unnamed image',
            src: imageElement.src,
            naturalWidth: imageElement.naturalWidth,
            naturalHeight: imageElement.naturalHeight
          });
          
          // Smooth fade-in effect
          imageElement.style.opacity = '1';
          imageElement.style.transform = 'scale(1)';
          
          // Add loaded class for additional styling
          imageElement.classList.add('image-loaded');
        };
        
        // Set initial loading state with better transitions
        imageElement.style.opacity = '0';
        imageElement.style.transform = 'scale(0.95)';
        imageElement.style.transition = 'opacity 0.5s ease, transform 0.3s ease';
        
        // Optimize Contentful images
        if (originalSrc.includes('ctfassets.net')) {
          try {
            const url = new URL(originalSrc);
            
            // Clear existing optimization params
            url.searchParams.delete('q');
            url.searchParams.delete('w');
            url.searchParams.delete('fm');
            url.searchParams.delete('dpr');
            url.searchParams.delete('fit');
            
            // Apply new optimization settings
            url.searchParams.set('q', imageQuality.toString());
            url.searchParams.set('w', maxImageWidth.toString());
            url.searchParams.set('fm', 'webp');
            url.searchParams.set('fit', 'fill');
            
            // Add retina support
            if (window.devicePixelRatio > 1) {
              url.searchParams.set('dpr', Math.min(window.devicePixelRatio, 2).toString());
            }
            
            const optimizedSrc = url.toString();
            console.log(`BlogContent: Optimizing Contentful image:`, {
              original: originalSrc,
              optimized: optimizedSrc
            });
            
            imageElement.src = optimizedSrc;
          } catch (error) {
            console.error('BlogContent: Error optimizing image URL:', error);
          }
        }
        
        // Set loading behavior
        imageElement.loading = shouldPreloadImages ? 'eager' : 'lazy';
        imageElement.decoding = 'async';

        // Ensure responsive behavior
        imageElement.style.maxWidth = '100%';
        imageElement.style.height = 'auto';
        
        // Enhanced styling for embedded images
        if (imageElement.classList.contains('blog-embedded-image')) {
          imageElement.style.display = 'block';
          imageElement.style.margin = '0 auto';
          imageElement.style.borderRadius = '0.75rem';
          imageElement.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        }
        
        // Add hover effects for better interactivity
        imageElement.addEventListener('mouseenter', () => {
          if (imageElement.classList.contains('image-loaded')) {
            imageElement.style.transform = 'scale(1.02)';
          }
        });
        
        imageElement.addEventListener('mouseleave', () => {
          if (imageElement.classList.contains('image-loaded')) {
            imageElement.style.transform = 'scale(1)';
          }
        });
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [content, imageQuality, maxImageWidth, shouldPreloadImages]);

  // Early return for empty content
  if (!content || content.trim().length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-dental-beige/30 rounded-xl p-8 border border-dental-gray/20">
          <p className="text-dental-gray/70">Nenhum conteúdo disponível</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`blog-content prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
      style={{
        // Enhanced prose styling specifically for dental blog content
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
