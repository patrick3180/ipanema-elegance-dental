import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PreloadRule {
  fromPath: string | RegExp;
  preloadAssets: string[];
  priority?: 'high' | 'low';
}

interface IntelligentPreloaderProps {
  preloadRules?: PreloadRule[];
  enableHoverPreload?: boolean;
  enableViewportPreload?: boolean;
}

const defaultPreloadRules: PreloadRule[] = [
  {
    fromPath: '/',
    preloadAssets: ['/services', '/about', '/contact'],
    priority: 'high'
  },
  {
    fromPath: '/services',
    preloadAssets: ['/clareamento-dental', '/implantes-dentarios', '/lentes-e-facetas'],
    priority: 'high'
  },
  {
    fromPath: /^\/clareamento-dental/,
    preloadAssets: ['/implantes-dentarios', '/lentes-e-facetas', '/services'],
    priority: 'low'
  },
  {
    fromPath: /^\/implantes-dentarios/,
    preloadAssets: ['/clareamento-dental', '/lentes-e-facetas', '/protese-dentaria'],
    priority: 'low'
  },
  {
    fromPath: '/blog',
    preloadAssets: ['/blog/'],
    priority: 'low'
  }
];

const IntelligentPreloader = ({
  preloadRules = defaultPreloadRules,
  enableHoverPreload = true,
  enableViewportPreload = true
}: IntelligentPreloaderProps) => {
  const location = useLocation();

  // Preload assets based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    
    const matchingRules = preloadRules.filter(rule => {
      if (typeof rule.fromPath === 'string') {
        return currentPath === rule.fromPath;
      }
      return rule.fromPath.test(currentPath);
    });

    matchingRules.forEach(rule => {
      rule.preloadAssets.forEach(asset => {
        preloadRoute(asset, rule.priority);
      });
    });
  }, [location.pathname, preloadRules]);

  // Hover-based preloading
  useEffect(() => {
    if (!enableHoverPreload) return;

    const handleLinkHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && link.href && link.href.startsWith(window.location.origin)) {
        const path = new URL(link.href).pathname;
        preloadRoute(path, 'high');
      }
    };

    document.addEventListener('mouseenter', handleLinkHover, true);
    
    return () => {
      document.removeEventListener('mouseenter', handleLinkHover, true);
    };
  }, [enableHoverPreload]);

  // Viewport-based preloading
  useEffect(() => {
    if (!enableViewportPreload) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            if (link.href && link.href.startsWith(window.location.origin)) {
              const path = new URL(link.href).pathname;
              preloadRoute(path, 'low');
            }
          }
        });
      },
      { rootMargin: '100px' }
    );

    // Observe all internal links
    const links = document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]');
    links.forEach(link => observer.observe(link));

    return () => {
      observer.disconnect();
    };
  }, [enableViewportPreload]);

  return null;
};

const preloadRoute = (path: string, priority: 'high' | 'low' = 'low') => {
  // Avoid duplicate preloads
  if (document.querySelector(`link[rel="prefetch"][href="${path}"]`)) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = path;
  
  if (priority === 'high') {
    link.rel = 'preload';
    link.as = 'document';
  }

  document.head.appendChild(link);

  // Also preload the associated JavaScript chunk
  const chunkPath = getChunkPath(path);
  if (chunkPath) {
    const scriptLink = document.createElement('link');
    scriptLink.rel = 'prefetch';
    scriptLink.href = chunkPath;
    scriptLink.as = 'script';
    document.head.appendChild(scriptLink);
  }
};

const getChunkPath = (path: string): string | null => {
  const chunkMap: Record<string, string> = {
    '/services': '/assets/ServicesPage',
    '/about': '/assets/AboutPage',
    '/contact': '/assets/ContactPage',
    '/blog': '/assets/BlogPage',
    '/clareamento-dental': '/assets/ClareamentoDental',
    '/implantes-dentarios': '/assets/ImplantesDentarios',
    '/lentes-e-facetas': '/assets/LentesEFacetas',
    '/protese-dentaria': '/assets/ProteseDentaria',
    '/restauracoes-esteticas': '/assets/RestaureacoesEsteticas',
    '/tratamento-de-canal': '/assets/TratamentoDeCanal',
    '/saude-da-gengiva': '/assets/SaudeDaGengiva',
    '/clinica-geral-prevencao': '/assets/ClinicaGeralPrevencao'
  };

  return chunkMap[path] || null;
};

export default IntelligentPreloader;