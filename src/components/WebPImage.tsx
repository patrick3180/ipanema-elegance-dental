import React from 'react';

interface WebPImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const WebPImage: React.FC<WebPImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false
}) => {
  // Para imagens locais em /lovable-uploads/, manter como está
  // (futuramente você pode converter para WebP e adicionar aqui)
  if (src.includes('/lovable-uploads/')) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
      />
    );
  }

  // Para imagens do Contentful, otimizar automaticamente
  if (src.includes('ctfassets.net')) {
    const getOptimizedUrl = (format: string) => {
      const baseUrl = src.split('?')[0];
      const params = new URLSearchParams();
      params.set('fm', format);
      params.set('q', '85');
      if (width) params.set('w', width.toString());
      return `${baseUrl}?${params.toString()}`;
    };

    return (
      <picture>
        {/* WebP version para navegadores modernos */}
        <source
          type="image/webp"
          srcSet={getOptimizedUrl('webp')}
        />
        
        {/* JPEG fallback para navegadores antigos */}
        <source
          type="image/jpeg"
          srcSet={getOptimizedUrl('jpg')}
        />
        
        {/* Imagem original como fallback final */}
        <img
          src={src}
          alt={alt}
          className={className}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
        />
      </picture>
    );
  }

  // Para outras imagens, retornar img normal otimizada
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
    />
  );
};

export default WebPImage;
