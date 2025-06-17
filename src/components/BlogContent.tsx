import React from 'react';
import { useBlogOptimization } from '@/hooks/useBlogOptimization';
import { useContentProcessor } from '@/hooks/useContentProcessor';

interface BlogContentProps {
  content: string;
  className?: string;
}

const BlogContent = ({ content, className = '' }: BlogContentProps) => {
  const { imageQuality, maxImageWidth, shouldPreloadImages } = useBlogOptimization();

  // Use the content processor hook directly
  useContentProcessor({
    content,
    imageQuality,
    maxImageWidth,
    shouldPreloadImages
  });

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
        '--tw-prose-body': 'rgb(139 92 246 / 0.9)',
        '--tw-prose-headings': 'rgb(139 92 246)',
        '--tw-prose-links': 'rgb(139 92 246)',
        '--tw-prose-bold': 'rgb(139 92 246)',
        '--tw-prose-counters': 'rgb(139 92 246)',
        '--tw-prose-bullets': 'rgb(139 92 246)',
        '--tw-prose-hr': 'rgb(156 163 175 / 0.3)',
        '--tw-prose-quotes': 'rgb(139 92 246 / 0.8)',
        '--tw-prose-quote-borders': 'rgb(245 158 11)',
        '--tw-prose-captions': 'rgb(107 114 128)',
        '--tw-prose-code': 'rgb(139 92 246)',
        '--tw-prose-pre-code': 'rgb(139 92 246)',
        '--tw-prose-pre-bg': 'rgb(249 250 251)',
        '--tw-prose-th-borders': 'rgb(209 213 219)',
        '--tw-prose-td-borders': 'rgb(229 231 235)',
      } as React.CSSProperties}
    />
  );
};

export default BlogContent;
