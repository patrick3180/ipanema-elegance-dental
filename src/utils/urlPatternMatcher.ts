// Advanced URL pattern matching for complex redirect scenarios

interface RedirectPattern {
  pattern: RegExp;
  destination: (match: RegExpMatchArray) => string;
  type: 'redirect' | 'gone';
  priority: number;
}

// Dynamic redirect patterns for complex URL structures
export const redirectPatterns: RedirectPattern[] = [
  // Date-based blog post patterns: /YYYY/MM/DD/slug/ -> /blog/slug
  {
    pattern: /^\/(\d{4})\/(\d{2})\/(\d{2})\/([a-z0-9-]+)\/?$/,
    destination: (match) => `/blog/${match[4]}`,
    type: 'redirect',
    priority: 1
  },
  
  // WordPress tag pages: /tag/anything/ -> /blog
  {
    pattern: /^\/tags?\/[^\/]+\/?$/,
    destination: () => '/blog',
    type: 'redirect',
    priority: 2
  },
  
  // WordPress category pages: /category/anything/ -> /blog
  {
    pattern: /^\/categor(y|ias?)\/[^\/]+\/?$/,
    destination: () => '/blog',
    type: 'redirect',
    priority: 2
  },
  
  // WordPress author pages: /author/anything/ -> /blog
  {
    pattern: /^\/author?\/[^\/]+\/?$/,
    destination: () => '/blog',
    type: 'redirect',
    priority: 2
  },
  
  // Year/month archives: /YYYY/MM/ -> /blog
  {
    pattern: /^\/(\d{4})\/(\d{2})\/?$/,
    destination: () => '/blog',
    type: 'redirect',
    priority: 3
  },
  
  // Year archives: /YYYY/ -> /blog
  {
    pattern: /^\/(\d{4})\/?$/,
    destination: () => '/blog',
    type: 'redirect',
    priority: 3
  },
  
  // WordPress system files: /wp-anything -> 410 Gone
  {
    pattern: /^\/wp-.+/,
    destination: () => '/gone',
    type: 'gone',
    priority: 1
  },
  
  // Development files: /.env, /config, etc. -> 410 Gone
  {
    pattern: /^\/(\.env|config|logs?|tmp|temp|test|demo|admin|administrator)/,
    destination: () => '/gone',
    type: 'gone',
    priority: 1
  },
  
  // File extensions that shouldn't exist: .php, .asp, etc.
  {
    pattern: /\.(php|asp|aspx|jsp|cfm)(\?.*)?$/,
    destination: () => '/gone',
    type: 'gone',
    priority: 1
  },
  
  // Old service structure: /servicos/anything/ -> check specific mapping
  {
    pattern: /^\/servicos\/([a-z0-9-]+)\/?$/,
    destination: (match) => {
      const serviceMap: Record<string, string> = {
        'lentes-de-contato-dental': '/lentes-de-contato-dental-e-facetas-de-porcelana',
        'facetas-de-porcelana': '/lentes-de-contato-dental-e-facetas-de-porcelana',
        'clareamento-dental': '/clareamento-dental',
        'protese-dentaria': '/protese-dentaria',
        'implantes-dentarios': '/implantes-dentarios',
        'clinica-geral': '/clinica-geral-e-prevencao',
        'prevencao': '/clinica-geral-e-prevencao',
        'restauracoes': '/restauracoes-esteticas',
        'tratamento-de-canal': '/tratamento-de-canal',
        'gengiva': '/saude-da-gengiva',
        'periodontia': '/saude-da-gengiva'
      };
      
      return serviceMap[match[1]] || '/servicos';
    },
    type: 'redirect',
    priority: 2
  }
];

// Function to find matching pattern for a URL
export const findRedirectPattern = (path: string): { destination: string; type: 'redirect' | 'gone' } | null => {
  // Sort patterns by priority (higher priority first)
  const sortedPatterns = [...redirectPatterns].sort((a, b) => a.priority - b.priority);
  
  for (const pattern of sortedPatterns) {
    const match = path.match(pattern.pattern);
    if (match) {
      const destination = pattern.destination(match);
      return {
        destination,
        type: pattern.type
      };
    }
  }
  
  return null;
};

// Function to test if a URL should be ignored (common crawlers, bots)
export const shouldIgnoreUrl = (path: string, userAgent?: string): boolean => {
  // Ignore common bot/crawler specific URLs
  const ignoredPaths = [
    '/robots.txt',
    '/sitemap.xml',
    '/sitemap-index.xml',
    '/favicon.ico',
    '/.well-known/',
    '/security.txt',
    '/ads.txt',
    '/app-ads.txt'
  ];
  
  if (ignoredPaths.some(ignored => path.startsWith(ignored))) {
    return true;
  }
  
  // Ignore if user agent indicates it's a bot scanning for vulnerabilities
  if (userAgent) {
    const maliciousBots = [
      'sqlmap',
      'nikto',
      'nmap',
      'masscan',
      'zgrab',
      'python-requests',
      'curl/',
      'wget/',
      'scrapy'
    ];
    
    const lowerUA = userAgent.toLowerCase();
    if (maliciousBots.some(bot => lowerUA.includes(bot))) {
      return true;
    }
  }
  
  return false;
};

// Function to get comprehensive redirect info
export const getRedirectInfo = (path: string): {
  action: 'redirect' | 'gone' | 'not_found' | 'ignore';
  destination?: string;
  reason: string;
} => {
  // Check if URL should be ignored
  if (shouldIgnoreUrl(path)) {
    return {
      action: 'ignore',
      reason: 'Common bot/crawler URL'
    };
  }
  
  // Check pattern-based redirects
  const patternMatch = findRedirectPattern(path);
  if (patternMatch) {
    return {
      action: patternMatch.type,
      destination: patternMatch.destination,
      reason: `Pattern-based ${patternMatch.type}`
    };
  }
  
  return {
    action: 'not_found',
    reason: 'No matching redirect pattern'
  };
};