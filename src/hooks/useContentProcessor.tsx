
import React from 'react';
import { processImageUrl, applyImageStyles } from '@/components/blog/content/ImageProcessor';
import { createImageErrorHandler, createImageLoadHandler, setupImageInteractions } from '@/components/blog/content/ImageErrorHandler';

interface UseContentProcessorProps {
  content: string;
  imageQuality: number;
  maxImageWidth: number;
  shouldPreloadImages: boolean;
}

export const useContentProcessor = ({ 
  content, 
  imageQuality, 
  maxImageWidth, 
  shouldPreloadImages 
}: UseContentProcessorProps) => {
  React.useEffect(() => {
    if (!content || content.length === 0) {
      if (import.meta.env.DEV && Math.random() < 0.1) {
        console.log('BlogContent: No content to process');
      }
      return;
    }

    if (import.meta.env.DEV && Math.random() < 0.1) {
      console.log('BlogContent: Processing content with optimization settings:', {
        imageQuality,
        maxImageWidth, 
        shouldPreloadImages,
        contentLength: content.length,
        hasImages: content.includes('<img')
      });
    }

    // Use a timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      const images = document.querySelectorAll('.blog-content img');
      if (import.meta.env.DEV && Math.random() < 0.1) {
        console.log(`BlogContent: Found ${images.length} images to process`);
      }
      
      images.forEach((img, index) => {
        const imageElement = img as HTMLImageElement;
        const originalSrc = imageElement.src;
        
        if (import.meta.env.DEV && Math.random() < 0.05) {
          console.log(`BlogContent: Processing image ${index + 1}:`, {
            src: originalSrc,
            alt: imageElement.alt || 'No alt text',
            className: imageElement.className,
            hasParent: !!imageElement.parentElement
          });
        }
        
        // Setup error and load handlers
        imageElement.onerror = createImageErrorHandler({ imageElement, index });
        imageElement.onload = createImageLoadHandler(imageElement);
        
        // Process the image URL
        const processedSrc = processImageUrl({
          originalSrc,
          imageQuality,
          maxImageWidth
        });
        
        // Update the image source if changed
        if (processedSrc !== originalSrc) {
          imageElement.src = processedSrc;
        }
        
        // Apply styles and interactions
        applyImageStyles(imageElement, shouldPreloadImages);
        setupImageInteractions(imageElement);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [content, imageQuality, maxImageWidth, shouldPreloadImages]);
};
