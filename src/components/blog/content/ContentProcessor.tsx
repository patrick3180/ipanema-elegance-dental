
import React from 'react';
import { useContentProcessor } from '@/hooks/useContentProcessor';

interface ContentProcessorProps {
  content: string;
  imageQuality: number;
  maxImageWidth: number;
  shouldPreloadImages: boolean;
}

const ContentProcessor: React.FC<ContentProcessorProps> = ({ 
  content, 
  imageQuality, 
  maxImageWidth, 
  shouldPreloadImages 
}) => {
  useContentProcessor({ 
    content, 
    imageQuality, 
    maxImageWidth, 
    shouldPreloadImages 
  });

  // This component doesn't render anything, it just processes the content
  return null;
};

export default ContentProcessor;
