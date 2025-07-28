// URL redirect mappings for old blog post URLs to new format
export const blogRedirects: Record<string, string> = {
  // Old format: /YYYY/MM/DD/slug/ -> New format: /blog/slug
  '/2023/05/15/cuidados-apos-clareamento-dental/': '/blog/cuidados-apos-clareamento-dental',
  '/2023/04/28/beneficios-da-odontologia-digital/': '/blog/beneficios-da-odontologia-digital',
  '/2023/03/10/mitos-e-verdades-sobre-implantes-dentais/': '/blog/mitos-e-verdades-sobre-implantes-dentais',
  
  // Additional old URL patterns that might exist
  '/cuidados-apos-clareamento-dental/': '/blog/cuidados-apos-clareamento-dental',
  '/beneficios-da-odontologia-digital/': '/blog/beneficios-da-odontologia-digital',
  '/mitos-e-verdades-sobre-implantes-dentais/': '/blog/mitos-e-verdades-sobre-implantes-dentais',
};

// Function to check and handle redirects
export const handleBlogRedirects = (): boolean => {
  const currentPath = window.location.pathname;
  
  // Check if current path needs redirect
  if (blogRedirects[currentPath]) {
    const newPath = blogRedirects[currentPath];
    console.log(`🔄 Redirecting from ${currentPath} to ${newPath}`);
    
    // Use replace to avoid adding to browser history
    window.history.replaceState(null, '', newPath);
    
    // Return true to indicate a redirect happened
    return true;
  }
  
  return false;
};

// Auto-execute redirect check on module load
if (typeof window !== 'undefined') {
  handleBlogRedirects();
}