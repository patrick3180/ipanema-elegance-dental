
import { useEffect } from 'react';

interface PreloadResource {
  href: string;
  as: 'image' | 'font' | 'script' | 'style' | 'document';
  type?: string;
  crossorigin?: 'anonymous' | 'use-credentials';
}

interface ResourcePreloaderProps {
  resources: PreloadResource[];
}

const ResourcePreloader = ({ resources }: ResourcePreloaderProps) => {
  useEffect(() => {
    if (!resources || resources.length === 0) return;

    const preloadedLinks: HTMLLinkElement[] = [];

    // Preload critical resources
    resources.forEach((resource) => {
      // Check if already preloaded
      const existingLink = document.querySelector(`link[href="${resource.href}"]`);
      if (existingLink) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      
      if (resource.type) {
        link.type = resource.type;
      }
      
      if (resource.crossorigin) {
        link.crossOrigin = resource.crossorigin;
      }

      // Add error handling
      link.onerror = () => {
        console.warn(`Failed to preload resource: ${resource.href}`);
      };

      link.onload = () => {
        console.log(`Successfully preloaded: ${resource.href}`);
      };

      document.head.appendChild(link);
      preloadedLinks.push(link);
    });

    // Cleanup function to remove preload links
    return () => {
      preloadedLinks.forEach((link) => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [resources]);

  return null; // This component doesn't render anything
};

export default ResourcePreloader;
