// Comprehensive URL redirect mappings for old site URLs to new format
export const pageRedirects: Record<string, string> = {
  // Blog post redirects - old format to new format
  '/2023/05/15/cuidados-apos-clareamento-dental/': '/blog/cuidados-apos-clareamento-dental',
  '/2023/04/28/beneficios-da-odontologia-digital/': '/blog/beneficios-da-odontologia-digital',
  '/2023/03/10/mitos-e-verdades-sobre-implantes-dentais/': '/blog/mitos-e-verdades-sobre-implantes-dentais',
  
  // Additional old blog URL patterns
  '/cuidados-apos-clareamento-dental/': '/blog/cuidados-apos-clareamento-dental',
  '/beneficios-da-odontologia-digital/': '/blog/beneficios-da-odontologia-digital',
  '/mitos-e-verdades-sobre-implantes-dentais/': '/blog/mitos-e-verdades-sobre-implantes-dentais',
  
  // Old service page redirects
  '/servicos/lentes-de-contato-dental/': '/lentes-de-contato-dental-e-facetas-de-porcelana',
  '/servicos/facetas-de-porcelana/': '/lentes-de-contato-dental-e-facetas-de-porcelana',
  '/servicos/clareamento-dental/': '/clareamento-dental',
  '/servicos/protese-dentaria/': '/protese-dentaria',
  '/servicos/implantes-dentarios/': '/implantes-dentarios',
  '/servicos/clinica-geral/': '/clinica-geral-e-prevencao',
  '/servicos/prevencao/': '/clinica-geral-e-prevencao',
  '/servicos/restauracoes/': '/restauracoes-esteticas',
  '/servicos/tratamento-de-canal/': '/tratamento-de-canal',
  '/servicos/gengiva/': '/saude-da-gengiva',
  '/servicos/periodontia/': '/saude-da-gengiva',
  
  // Old main page redirects
  '/sobre-nos/': '/sobre',
  '/servicos/': '/servicos',
  '/contatos/': '/contato',
  '/blog/': '/blog',
  '/home/': '/',
  '/index.php': '/',
  '/index.html': '/',
  '/index.htm': '/',
  
  // WordPress-style redirects
  '/wp-content/': '/',
  '/wp-admin/': '/',
  '/wp-includes/': '/',
  '/xmlrpc.php': '/',
  '/wp-login.php': '/',
  
  // Old category and tag pages
  '/categoria/': '/blog',
  '/tag/': '/blog',
  '/tags/': '/blog',
  '/categorias/': '/blog',
  '/autor/': '/blog',
  '/author/': '/blog',
  '/autores/': '/blog',
  
  // Feed redirects
  '/feed/': '/blog',
  '/rss/': '/blog',
  '/atom/': '/blog',
  '/rdf/': '/blog',
  '/feed.xml': '/blog',
  '/rss.xml': '/blog',
  '/atom.xml': '/blog',
  
  // Archive pages
  '/arquivo/': '/blog',
  '/archives/': '/blog',
  '/2023/': '/blog',
  '/2022/': '/blog',
  '/2021/': '/blog',
  '/2020/': '/blog',
  '/2019/': '/blog',
  
  // Search and admin pages
  '/search/': '/blog',
  '/busca/': '/blog',
  '/admin/': '/',
  '/administrator/': '/',
  '/login/': '/',
  '/register/': '/',
  '/registro/': '/',
};

// URLs that should return 410 Gone (permanently removed)
export const goneUrls: Set<string> = new Set([
  // System files that never existed on this site
  '/robots.txt', // We handle this dynamically
  '/sitemap.xml', // We handle this dynamically
  '/favicon.ico', // We have our own
  '/apple-touch-icon.png',
  '/browserconfig.xml',
  '/manifest.json',
  
  // Old system pages that are permanently gone
  '/wp-config.php',
  '/license.txt',
  '/readme.html',
  '/install.php',
  '/upgrade.php',
  '/.htaccess',
  '/web.config',
  
  // Old API endpoints that don't exist
  '/api/',
  '/rest/',
  '/json/',
  '/ajax/',
  
  // Development files
  '/.env',
  '/config/',
  '/logs/',
  '/tmp/',
  '/temp/',
  
  // Old promotional pages that are no longer relevant
  '/promocoes/',
  '/ofertas/',
  '/desconto/',
  '/cupom/',
  
  // Test pages
  '/test/',
  '/teste/',
  '/demo/',
  '/example/',
]);

// Function to check and handle all redirects
export const handlePageRedirects = (): { redirected: boolean; type: 'redirect' | 'gone' | null } => {
  const currentPath = window.location.pathname;
  
  // Import pattern matcher dynamically to avoid circular dependencies
  import('./urlPatternMatcher').then(({ getRedirectInfo }) => {
    const info = getRedirectInfo(currentPath);
    
    if (info.action === 'ignore') {
      return { redirected: false, type: null };
    }
  });
  
  // Check if current path should return 410 Gone
  if (goneUrls.has(currentPath)) {
    console.log(`❌ URL marked as gone: ${currentPath}`);
    return { redirected: false, type: 'gone' };
  }
  
  // Check if current path needs redirect
  if (pageRedirects[currentPath]) {
    const newPath = pageRedirects[currentPath];
    console.log(`🔄 Redirecting from ${currentPath} to ${newPath}`);
    
    // Use replace to avoid adding to browser history
    window.history.replaceState(null, '', newPath);
    
    // Return true to indicate a redirect happened
    return { redirected: true, type: 'redirect' };
  }
  
  return { redirected: false, type: null };
};

// Helper function for backwards compatibility
export const handleBlogRedirects = (): boolean => {
  const result = handlePageRedirects();
  return result.redirected;
};

// Function to check if a URL should return 410 Gone
export const isGoneUrl = (path: string): boolean => {
  return goneUrls.has(path);
};

// Function to get redirect destination for a URL
export const getRedirectDestination = (path: string): string | null => {
  return pageRedirects[path] || null;
};

// Auto-execute redirect check on module load
if (typeof window !== 'undefined') {
  handlePageRedirects();
}