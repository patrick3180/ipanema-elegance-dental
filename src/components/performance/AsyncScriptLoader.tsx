import { useEffect } from 'react';

interface AsyncScriptLoaderProps {
  scripts: Array<{
    src: string;
    defer?: boolean;
    async?: boolean;
    onLoad?: () => void;
  }>;
}

const AsyncScriptLoader = ({ scripts }: AsyncScriptLoaderProps) => {
  useEffect(() => {
    const loadedScripts: HTMLScriptElement[] = [];

    scripts.forEach(({ src, defer = true, async = true, onLoad }) => {
      // Check if script is already loaded
      if (document.querySelector(`script[src="${src}"]`)) {
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.defer = defer;
      script.async = async;
      
      if (onLoad) {
        script.onload = onLoad;
      }

      script.onerror = () => {
        console.warn(`Failed to load script: ${src}`);
      };

      document.head.appendChild(script);
      loadedScripts.push(script);
    });

    return () => {
      loadedScripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [scripts]);

  return null;
};

export default AsyncScriptLoader;