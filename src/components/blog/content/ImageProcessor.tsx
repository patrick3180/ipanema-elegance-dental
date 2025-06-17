import React from 'react';

interface ImageProcessorProps {
  originalSrc: string;
  imageQuality: number;
  maxImageWidth: number;
}

export const processImageUrl = ({ originalSrc, imageQuality, maxImageWidth }: ImageProcessorProps): string => {
  let processedSrc = originalSrc;
  
  // Handle different image sources
  if (originalSrc.includes('ctfassets.net')) {
    // Contentful images
    try {
      const url = new URL(originalSrc.startsWith('//') ? `https:${originalSrc}` : originalSrc);
      
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
      
      processedSrc = url.toString();
      console.log(`BlogContent: Optimizing Contentful image:`, {
        original: originalSrc,
        optimized: processedSrc
      });
    } catch (error) {
      console.error('BlogContent: Error optimizing Contentful image URL:', error);
      processedSrc = originalSrc;
    }
  } else if (originalSrc.includes('/lovable-uploads/')) {
    // Local Lovable uploads - use as is but ensure full URL
    if (originalSrc.startsWith('/')) {
      processedSrc = window.location.origin + originalSrc;
    }
    console.log(`BlogContent: Processing local image:`, {
      original: originalSrc,
      processed: processedSrc
    });
  } else if (originalSrc.startsWith('/')) {
    // Other local paths
    processedSrc = window.location.origin + originalSrc;
    console.log(`BlogContent: Converting relative path:`, {
      original: originalSrc,
      processed: processedSrc
    });
  }
  
  return processedSrc;
};

export const applyImageStyles = (imageElement: HTMLImageElement, shouldPreloadImages: boolean) => {
  // Set initial loading state with better transitions
  imageElement.style.opacity = '0';
  imageElement.style.transform = 'scale(0.95)';
  imageElement.style.transition = 'opacity 0.5s ease, transform 0.3s ease';
  
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
};
