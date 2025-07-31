// Debouncing utility for SEO monitoring to prevent duplicate events
export class SEODebouncer {
  private timeouts: Map<string, NodeJS.Timeout> = new Map();
  private recentEvents: Set<string> = new Set();
  private readonly debounceTime: number = 1000; // 1 second debounce
  private readonly cacheTime: number = 5000; // 5 seconds cache

  debounce(key: string, fn: () => void): void {
    // Clear existing timeout for this key
    const existingTimeout = this.timeouts.get(key);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Check if this event was recently processed
    if (this.recentEvents.has(key)) {
      return;
    }

    // Set timeout for execution
    const timeout = setTimeout(() => {
      fn();
      this.timeouts.delete(key);
      
      // Add to recent events cache
      this.recentEvents.add(key);
      setTimeout(() => {
        this.recentEvents.delete(key);
      }, this.cacheTime);
    }, this.debounceTime);

    this.timeouts.set(key, timeout);
  }

  clearAll(): void {
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.clear();
    this.recentEvents.clear();
  }
}

export const seoDebouncer = new SEODebouncer();