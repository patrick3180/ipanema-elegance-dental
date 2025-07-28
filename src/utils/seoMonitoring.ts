// SEO monitoring utilities for tracking redirects and 404/410 errors

interface SEOEvent {
  type: 'redirect' | 'not_found' | 'gone' | 'error';
  path: string;
  destination?: string;
  timestamp: number;
  userAgent?: string;
  referrer?: string;
}

class SEOMonitor {
  private events: SEOEvent[] = [];
  private maxEvents = 1000; // Keep last 1000 events

  logRedirect(originalPath: string, destination: string) {
    this.addEvent({
      type: 'redirect',
      path: originalPath,
      destination,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    });
    
    console.log(`🔄 SEO: Redirect ${originalPath} → ${destination}`);
  }

  logNotFound(path: string) {
    this.addEvent({
      type: 'not_found',
      path,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    });
    
    console.log(`❌ SEO: 404 Not Found - ${path}`);
  }

  logGone(path: string) {
    this.addEvent({
      type: 'gone',
      path,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    });
    
    console.log(`🚫 SEO: 410 Gone - ${path}`);
  }

  logError(path: string, error: string) {
    this.addEvent({
      type: 'error',
      path,
      destination: error,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    });
    
    console.error(`💥 SEO: Error on ${path} - ${error}`);
  }

  private addEvent(event: SEOEvent) {
    this.events.push(event);
    
    // Keep only the last maxEvents events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }
    
    // Store in localStorage for persistence (development only)
    if (import.meta.env.DEV) {
      try {
        localStorage.setItem('seo_events', JSON.stringify(this.events.slice(-100)));
      } catch (e) {
        // Ignore localStorage errors
      }
    }
  }

  getEvents(type?: SEOEvent['type']): SEOEvent[] {
    if (type) {
      return this.events.filter(event => event.type === type);
    }
    return [...this.events];
  }

  getStats() {
    const stats = {
      redirects: this.events.filter(e => e.type === 'redirect').length,
      notFound: this.events.filter(e => e.type === 'not_found').length,
      gone: this.events.filter(e => e.type === 'gone').length,
      errors: this.events.filter(e => e.type === 'error').length,
      total: this.events.length
    };
    
    console.table(stats);
    return stats;
  }

  // Export events for analysis (development only)
  exportEvents(): string {
    return JSON.stringify(this.events, null, 2);
  }

  // Load events from localStorage (development only)
  loadEvents() {
    if (import.meta.env.DEV) {
      try {
        const stored = localStorage.getItem('seo_events');
        if (stored) {
          this.events = JSON.parse(stored);
        }
      } catch (e) {
        console.warn('Could not load SEO events from localStorage');
      }
    }
  }
}

// Create global instance
export const seoMonitor = new SEOMonitor();

// Load existing events on initialization
seoMonitor.loadEvents();

// Expose to window for debugging (development only)
if (import.meta.env.DEV) {
  (window as any).seoMonitor = seoMonitor;
}
