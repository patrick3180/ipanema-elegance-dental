// Path validation cache to prevent unnecessary processing
class PathValidator {
  private validPaths: Set<string> = new Set();
  private invalidPaths: Set<string> = new Set();
  private cacheTimeout: number = 30000; // 30 seconds cache

  constructor() {
    // Pre-populate with known valid paths
    this.validPaths.add('/');
    this.validPaths.add('/index.html');
    this.validPaths.add('');
    this.validPaths.add('/about');
    this.validPaths.add('/services');
    this.validPaths.add('/contact');
    this.validPaths.add('/blog');
    this.validPaths.add('/privacy-policy');
    this.validPaths.add('/terms-of-use');
  }

  isValidPath(path: string): boolean | null {
    // Return cached result if available
    if (this.validPaths.has(path)) return true;
    if (this.invalidPaths.has(path)) return false;
    
    // Unknown path - needs validation
    return null;
  }

  markAsValid(path: string): void {
    this.validPaths.add(path);
    this.invalidPaths.delete(path);
    
    // Set timeout to clear cache
    setTimeout(() => {
      this.validPaths.delete(path);
    }, this.cacheTimeout);
  }

  markAsInvalid(path: string): void {
    this.invalidPaths.add(path);
    this.validPaths.delete(path);
    
    // Set timeout to clear cache
    setTimeout(() => {
      this.invalidPaths.delete(path);
    }, this.cacheTimeout);
  }

  clearCache(): void {
    // Keep only pre-populated valid paths
    const prePop = ['/', '/index.html', '', '/about', '/services', '/contact', '/blog', '/privacy-policy', '/terms-of-use'];
    this.validPaths = new Set(prePop);
    this.invalidPaths.clear();
  }
}

export const pathValidator = new PathValidator();
