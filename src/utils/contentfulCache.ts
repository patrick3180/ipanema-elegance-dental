// Enhanced caching system for Contentful data and sitemap optimization
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class ContentfulCacheManager {
  private cache = new Map<string, CacheItem<any>>();
  private defaultTTL = 30 * 60 * 1000; // 30 minutes default

  set<T>(key: string, data: T, ttl?: number): void {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    };
    
    this.cache.set(key, cacheItem);
    
    if (import.meta.env.DEV) {
      console.log(`📦 Cache SET: ${key} (TTL: ${cacheItem.ttl}ms)`);
    }
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      if (import.meta.env.DEV) {
        console.log(`📦 Cache MISS: ${key}`);
      }
      return null;
    }

    const now = Date.now();
    const isExpired = (now - item.timestamp) > item.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      if (import.meta.env.DEV) {
        console.log(`📦 Cache EXPIRED: ${key}`);
      }
      return null;
    }

    if (import.meta.env.DEV) {
      console.log(`📦 Cache HIT: ${key}`);
    }
    
    return item.data as T;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;
    
    const now = Date.now();
    const isExpired = (now - item.timestamp) > item.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  clear(): void {
    this.cache.clear();
    console.log('📦 Cache CLEARED');
  }

  clearExpired(): number {
    const now = Date.now();
    let removedCount = 0;
    
    for (const [key, item] of this.cache.entries()) {
      if ((now - item.timestamp) > item.ttl) {
        this.cache.delete(key);
        removedCount++;
      }
    }
    
    if (removedCount > 0 && import.meta.env.DEV) {
      console.log(`📦 Cache: Removed ${removedCount} expired items`);
    }
    
    return removedCount;
  }

  getStats(): { size: number; entries: Array<{ key: string; age: number; ttl: number }> } {
    const now = Date.now();
    const entries = Array.from(this.cache.entries()).map(([key, item]) => ({
      key,
      age: now - item.timestamp,
      ttl: item.ttl
    }));
    
    return {
      size: this.cache.size,
      entries
    };
  }
}

// Create singleton instance
export const contentfulCache = new ContentfulCacheManager();

// Auto-cleanup expired items every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    contentfulCache.clearExpired();
  }, 5 * 60 * 1000);
}

// Cache keys for different data types
export const CACHE_KEYS = {
  ALL_BLOG_POSTS: 'contentful:all-blog-posts',
  BLOG_POST: (slug: string) => `contentful:blog-post:${slug}`,
  SITEMAP: 'sitemap:generated',
  BLOG_CATEGORIES: 'contentful:blog-categories',
  FEATURED_POSTS: 'contentful:featured-posts'
} as const;

// Utility function to cache blog posts with proper invalidation
export const cacheBlogPost = (slug: string, post: any, ttl = 60 * 60 * 1000) => {
  contentfulCache.set(CACHE_KEYS.BLOG_POST(slug), post, ttl);
};

export const getCachedBlogPost = (slug: string) => {
  return contentfulCache.get(CACHE_KEYS.BLOG_POST(slug));
};

// Global cache utilities
if (typeof window !== 'undefined') {
  // Add cache utilities to window for debugging
  (window as any).contentfulCache = {
    stats: () => contentfulCache.getStats(),
    clear: () => contentfulCache.clear(),
    clearExpired: () => contentfulCache.clearExpired(),
    has: (key: string) => contentfulCache.has(key),
    get: (key: string) => contentfulCache.get(key)
  };
}