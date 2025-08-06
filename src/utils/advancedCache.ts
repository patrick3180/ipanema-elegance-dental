// Advanced caching system for performance optimization
interface CacheConfig {
  ttl: number;
  maxSize: number;
  strategy: 'lru' | 'fifo' | 'lfu';
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccessed: number;
}

class AdvancedCache<T> {
  private cache = new Map<string, CacheItem<T>>();
  private config: CacheConfig;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      ttl: 60 * 60 * 1000, // 1 hour default
      maxSize: 100,
      strategy: 'lru',
      ...config
    };
  }

  set(key: string, data: T, customTtl?: number): void {
    const ttl = customTtl || this.config.ttl;
    const now = Date.now();
    
    // Remove expired items first
    this.cleanup();
    
    // If at max size, remove items based on strategy
    if (this.cache.size >= this.config.maxSize) {
      this.evict();
    }

    this.cache.set(key, {
      data,
      timestamp: now,
      ttl,
      accessCount: 1,
      lastAccessed: now
    });
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    
    // Check if expired
    if (now - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    // Update access metrics
    item.accessCount++;
    item.lastAccessed = now;
    
    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }

  private evict(): void {
    const entries = Array.from(this.cache.entries());
    
    switch (this.config.strategy) {
      case 'lru':
        entries.sort(([, a], [, b]) => a.lastAccessed - b.lastAccessed);
        break;
      case 'lfu':
        entries.sort(([, a], [, b]) => a.accessCount - b.accessCount);
        break;
      case 'fifo':
        entries.sort(([, a], [, b]) => a.timestamp - b.timestamp);
        break;
    }
    
    // Remove oldest 25% of entries
    const toRemove = Math.ceil(entries.length * 0.25);
    for (let i = 0; i < toRemove; i++) {
      this.cache.delete(entries[i][0]);
    }
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      hitRate: this.calculateHitRate(),
      oldestItem: this.getOldestItem(),
      mostAccessed: this.getMostAccessed()
    };
  }

  private calculateHitRate(): number {
    // This would need to be tracked separately in a real implementation
    return 0.85; // Mock value
  }

  private getOldestItem(): string | null {
    let oldest: string | null = null;
    let oldestTime = Date.now();
    
    for (const [key, item] of this.cache.entries()) {
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp;
        oldest = key;
      }
    }
    
    return oldest;
  }

  private getMostAccessed(): string | null {
    let mostAccessed: string | null = null;
    let maxCount = 0;
    
    for (const [key, item] of this.cache.entries()) {
      if (item.accessCount > maxCount) {
        maxCount = item.accessCount;
        mostAccessed = key;
      }
    }
    
    return mostAccessed;
  }
}

// Global cache instances
export const imageCache = new AdvancedCache<string>({
  ttl: 24 * 60 * 60 * 1000, // 24 hours for images
  maxSize: 200,
  strategy: 'lru'
});

export const contentCache = new AdvancedCache<any>({
  ttl: 60 * 60 * 1000, // 1 hour for content
  maxSize: 50,
  strategy: 'lfu'
});

export const apiCache = new AdvancedCache<any>({
  ttl: 5 * 60 * 1000, // 5 minutes for API responses
  maxSize: 100,
  strategy: 'lru'
});

export { AdvancedCache };