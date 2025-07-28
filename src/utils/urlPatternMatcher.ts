// Advanced URL pattern matching for complex redirect scenarios

interface RedirectPattern {
  pattern: RegExp;
  destination: (match: RegExpMatchArray) => string;
  type: 'redirect' | 'gone';
  priority: number;
}

// Dynamic redirect patterns for complex URL structures
export const redirectPatterns: RedirectPattern[] = [
  // WordPress date-based blog post URLs
  {
    pattern: /^\/(\d{4})\/(\d{2})\/(\d{2})\/(.+)\/?$/,
    destination: (match) => `/blog/${match[4].replace(/\/$/, '')}`,
    type: 'redirect',
    priority: 10
  },
  
  // WordPress yearly archives
  {
    pattern: /^\/(\d{4})\/?$/,
    destination: () => '/blog',
    type: 'redirect',
    priority: 8
  },
  
  // WordPress monthly archives
  {
    pattern: /^\/(\d{4})\/(\d{2})\/?$/,
    destination: () => '/blog',
    type: 'redirect',
    priority: 8
  },
  
  // WordPress category pages with pagination
  {
    pattern: /^\/category\/(.+)\/page\/(\d+)\/?$/,
    destination: () => '/blog',
    type: 'redirect',
    priority: 8
  },
  
  // WordPress category pages
  {
    pattern: /^\/category\/(.+)\/?$/,
    destination: () => '/blog',
    type: 'redirect',
    priority: 7
  },
  
  // WordPress tag pages with pagination
  {
    pattern: /^\/tag\/(.+)\/page\/(\d+)\/?$/,
    destination: () => '/blog',
    type: 'redirect',
    priority: 8
  },
  
  // WordPress tag pages
  {
    pattern: /^\/tag\/(.+)\/?$/,
    destination: () => '/blog',
    type: 'redirect',
    priority: 7
  },
  
  // WordPress author pages
  {
    pattern: /^\/author\/(.+)\/?$/,
    destination: () => '/blog',
    type: 'redirect',
    priority: 7
  },
  
  // WordPress pagination
  {
    pattern: /^\/page\/(\d+)\/?$/,
    destination: () => '/blog',
    type: 'redirect',
    priority: 6
  },
  
  // Block/widget patterns (WordPress blocks)
  {
    pattern: /^\/block\/(.+)\/?$/,
    destination: () => '/',
    type: 'redirect',
    priority: 9
  },
  
  // Promotional and marketing pages
  {
    pattern: /^\/promocoes\/(.+)\/?$/,
    destination: (match) => {
      if (match[1].includes('clareamento')) return '/clareamento-dental';
      if (match[1].includes('consulta') || match[1].includes('primeira')) return '/contato';
      return '/';
    },
    type: 'redirect',
    priority: 8
  },
  
  // Gallery and media pages
  {
    pattern: /^\/(galeria|videos)\/(.+)\/?$/,
    destination: () => '/sobre',
    type: 'redirect',
    priority: 7
  },
  
  // Service page mappings
  {
    pattern: /^\/servicos\/lentes(-de)?(-contato)?(-dental)?\/?$/,
    destination: () => '/lentes-de-contato-dental-e-facetas-de-porcelana',
    type: 'redirect',
    priority: 9
  },
  
  {
    pattern: /^\/servicos\/facetas(-de)?(-porcelana)?\/?$/,
    destination: () => '/lentes-de-contato-dental-e-facetas-de-porcelana',
    type: 'redirect',
    priority: 9
  },
  
  {
    pattern: /^\/servicos\/(ortodontia|aparelho)\/?$/,
    destination: () => '/clinica-geral-e-prevencao',
    type: 'redirect',
    priority: 9
  },
  
  {
    pattern: /^\/servicos\/(estetica|esteticos)\/?$/,
    destination: () => '/restauracoes-esteticas',
    type: 'redirect',
    priority: 9
  },
  
  {
    pattern: /^\/servicos\/cirurgia\/?$/,
    destination: () => '/implantes-dentarios',
    type: 'redirect',
    priority: 9
  },
  
  // WordPress system files - mark as gone
  {
    pattern: /^\/wp-(content|admin|includes|login|config)\b/,
    destination: () => '/410',
    type: 'gone',
    priority: 15
  },
  
  // Other system files
  {
    pattern: /^\/\.(htaccess|env|git|svn)/,
    destination: () => '/410',
    type: 'gone',
    priority: 15
  },
  
  // Development and test URLs
  {
    pattern: /^\/(test|demo|staging|dev|temp|tmp)/,
    destination: () => '/410',
    type: 'gone',
    priority: 12
  },
  
  // Legacy and outdated content patterns
  {
    pattern: /^\/(old-|legacy-|outdated-|retired-)/,
    destination: () => '/410',
    type: 'gone',
    priority: 11
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