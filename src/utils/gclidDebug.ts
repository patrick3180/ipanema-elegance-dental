// GCLID Debug System
import { getGCLIDDebugInfo, captureGCLID, sendGCLIDToWebhook } from './gclid';

/**
 * Debug system for GCLID monitoring and testing
 */
export const gclidDebug = {
  /**
   * Get current GCLID status and debug information
   */
  getStatus() {
    const debugInfo = getGCLIDDebugInfo();
    console.log('🔍 GCLID Debug Status:', {
      hasGCLID: !!debugInfo.gclid,
      gclid: debugInfo.gclid,
      capturedAt: debugInfo.timestamp,
      capturedFromPage: debugInfo.page,
      isExpired: debugInfo.isExpired,
      currentPage: window.location.pathname,
      currentURL: window.location.href,
      localStorage: {
        gclid: localStorage.getItem('gclid'),
        timestamp: localStorage.getItem('gclid_timestamp'),
        page: localStorage.getItem('gclid_page')
      }
    });
    return debugInfo;
  },

  /**
   * Force capture GCLID from current URL
   */
  forceCapture() {
    console.log('🔄 Forcing GCLID capture from current URL...');
    captureGCLID();
    return this.getStatus();
  },

  /**
   * Test webhook sending with current GCLID
   */
  async testWebhook(source = 'debug_test') {
    console.log('📤 Testing webhook sending...');
    try {
      await sendGCLIDToWebhook(source);
      console.log('✅ Webhook test completed');
    } catch (error) {
      console.error('❌ Webhook test failed:', error);
    }
  },

  /**
   * Clear stored GCLID data
   */
  clearGCLID() {
    localStorage.removeItem('gclid');
    localStorage.removeItem('gclid_timestamp');
    localStorage.removeItem('gclid_page');
    console.log('🗑️ GCLID data cleared from localStorage');
    return this.getStatus();
  },

  /**
   * Simulate GCLID for testing
   */
  simulateGCLID(testGclid = 'test_gclid_' + Date.now()) {
    localStorage.setItem('gclid', testGclid);
    localStorage.setItem('gclid_timestamp', Date.now().toString());
    localStorage.setItem('gclid_page', window.location.pathname);
    console.log('🧪 Simulated GCLID:', testGclid);
    return this.getStatus();
  },

  /**
   * Show help information
   */
  help() {
    console.log(`
🔍 GCLID Debug System Help:

Available commands:
- gclidDebug.getStatus()        - Show current GCLID status
- gclidDebug.forceCapture()     - Force capture from current URL
- gclidDebug.testWebhook()      - Test webhook sending
- gclidDebug.clearGCLID()       - Clear stored GCLID data
- gclidDebug.simulateGCLID()    - Simulate GCLID for testing
- gclidDebug.help()             - Show this help

Example usage:
gclidDebug.getStatus()
gclidDebug.testWebhook('manual_test')
gclidDebug.simulateGCLID('my_test_gclid')
    `);
  }
};

// Make debug system globally available
declare global {
  interface Window {
    gclidDebug: typeof gclidDebug;
  }
}

window.gclidDebug = gclidDebug;

export default gclidDebug;