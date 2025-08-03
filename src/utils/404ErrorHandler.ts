interface ErrorLog {
  url: string;
  timestamp: number;
  count: number;
  userAgent?: string;
  referrer?: string;
}

class Error404Handler {
  private errors: Map<string, ErrorLog> = new Map();
  private readonly maxAge = 24 * 60 * 60 * 1000; // 24 hours
  private readonly maxErrors = 100; // Max errors to track

  constructor() {
    this.loadFromStorage();
    this.setupCleanup();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('404-errors');
      if (stored) {
        const data = JSON.parse(stored);
        this.errors = new Map(data);
      }
    } catch (error) {
      console.warn('Failed to load 404 error data:', error);
    }
  }

  private saveToStorage() {
    try {
      const data = Array.from(this.errors.entries());
      localStorage.setItem('404-errors', JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save 404 error data:', error);
    }
  }

  private setupCleanup() {
    // Clean up old errors every hour
    setInterval(() => {
      this.cleanup();
    }, 60 * 60 * 1000);
  }

  private cleanup() {
    const now = Date.now();
    let cleaned = false;

    for (const [url, error] of this.errors.entries()) {
      if (now - error.timestamp > this.maxAge) {
        this.errors.delete(url);
        cleaned = true;
      }
    }

    if (cleaned) {
      this.saveToStorage();
    }
  }

  public log404Error(url: string, userAgent?: string, referrer?: string) {
    const cleanUrl = this.cleanUrl(url);
    const existing = this.errors.get(cleanUrl);
    
    if (existing) {
      existing.count++;
      existing.timestamp = Date.now(); // Update timestamp
    } else {
      // Keep only the most recent errors if we hit the limit
      if (this.errors.size >= this.maxErrors) {
        const oldest = Array.from(this.errors.entries())
          .sort((a, b) => a[1].timestamp - b[1].timestamp)[0];
        this.errors.delete(oldest[0]);
      }

      this.errors.set(cleanUrl, {
        url: cleanUrl,
        timestamp: Date.now(),
        count: 1,
        userAgent,
        referrer
      });
    }

    this.saveToStorage();
    this.checkForPatterns(cleanUrl);
  }

  private cleanUrl(url: string): string {
    try {
      const urlObj = new URL(url, window.location.origin);
      // Remove search params and fragments for pattern detection
      return urlObj.pathname;
    } catch {
      return url;
    }
  }

  private checkForPatterns(url: string) {
    const error = this.errors.get(url);
    if (error && error.count >= 5) {
      console.warn(`🚨 Frequent 404 detected: ${url} (${error.count} times)`);
      this.suggestRedirect(url);
    }
  }

  private suggestRedirect(url: string) {
    // Suggest potential redirects based on common patterns
    const suggestions: string[] = [];

    // Check for blog post patterns
    if (url.includes('/blog/')) {
      suggestions.push('/blog');
    }

    // Check for service patterns
    if (url.includes('/servico')) {
      suggestions.push('/servicos');
    }

    // Check for common misspellings
    const redirectMap: Record<string, string> = {
      '/contato': '/contato',
      '/sobre-nos': '/sobre',
      '/servico': '/servicos',
      '/blog-post': '/blog'
    };

    for (const [pattern, redirect] of Object.entries(redirectMap)) {
      if (url.includes(pattern)) {
        suggestions.push(redirect);
      }
    }

    if (suggestions.length > 0) {
      console.log(`💡 Suggested redirects for ${url}:`, suggestions);
    }
  }

  public getFrequentErrors(limit = 10): ErrorLog[] {
    return Array.from(this.errors.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  public getErrorSummary() {
    const total = this.errors.size;
    const totalOccurrences = Array.from(this.errors.values())
      .reduce((sum, error) => sum + error.count, 0);
    
    const frequent = this.getFrequentErrors(5);
    
    return {
      totalUniqueUrls: total,
      totalOccurrences,
      frequentErrors: frequent,
      suggestions: frequent.map(error => `⚠️ Frequent 404: ${error.url} (${error.count} times) - consider adding redirect`)
    };
  }

  public clear() {
    this.errors.clear();
    this.saveToStorage();
  }
}

export const error404Handler = new Error404Handler();

// Intercept fetch requests to detect 404s
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  const response = await originalFetch(...args);
  
  if (response.status === 404) {
    const url = typeof args[0] === 'string' ? args[0] : (args[0] as Request).url;
    error404Handler.log404Error(
      url,
      navigator.userAgent,
      document.referrer
    );
  }
  
  return response;
};

// Listen for navigation to non-existent routes
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.message?.includes('404') || 
      event.reason?.status === 404) {
    error404Handler.log404Error(
      window.location.pathname,
      navigator.userAgent,
      document.referrer
    );
  }
});
