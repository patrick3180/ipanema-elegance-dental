
import React from 'react';

interface BlogContentRendererProps {
  content: string;
  imageQuality: number;
  maxImageWidth: number;
  shouldPreloadImages: boolean;
}

const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({ 
  content, 
  imageQuality, 
  maxImageWidth, 
  shouldPreloadImages 
}) => {
  // This component is currently not used, but kept for future implementation
  return null;
};

export default BlogContentRenderer;
