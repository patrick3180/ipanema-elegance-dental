
import React from 'react';

interface ImageErrorHandlerProps {
  imageElement: HTMLImageElement;
  index: number;
}

export const createImageErrorHandler = ({ imageElement, index }: ImageErrorHandlerProps) => {
  return (event: Event) => {
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
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"></path>
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
};

export const createImageLoadHandler = (imageElement: HTMLImageElement) => {
  return () => {
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
};

export const setupImageInteractions = (imageElement: HTMLImageElement) => {
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
};
