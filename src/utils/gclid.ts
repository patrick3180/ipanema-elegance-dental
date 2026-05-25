// Utility functions for GCLID capture and webhook sending

/**
 * Captures GCLID from URL parameters and stores it in localStorage
 */
export const captureGCLID = (): void => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const gclid = urlParams.get('gclid');
    
    if (gclid) {
      localStorage.setItem('gclid', gclid);
      localStorage.setItem('gclid_timestamp', Date.now().toString());
      localStorage.setItem('gclid_page', window.location.pathname);
      console.log('✅ GCLID captured:', gclid, 'from page:', window.location.pathname);
    } else {
      // Log current page visit even without GCLID for debugging
      console.log('📍 Page visited without GCLID:', window.location.pathname);
    }
  } catch (error) {
    console.error('❌ Error capturing GCLID:', error);
  }
};

/**
 * Gets stored GCLID from localStorage
 */
export const getStoredGCLID = (): string | null => {
  return localStorage.getItem('gclid');
};

/**
 * Gets GCLID debug information
 */
export const getGCLIDDebugInfo = () => {
  const gclid = localStorage.getItem('gclid');
  const timestamp = localStorage.getItem('gclid_timestamp');
  const page = localStorage.getItem('gclid_page');
  
  return {
    gclid,
    timestamp: timestamp ? new Date(parseInt(timestamp)) : null,
    page,
    isExpired: timestamp ? (Date.now() - parseInt(timestamp)) > (30 * 24 * 60 * 60 * 1000) : false // 30 days
  };
};

// Debounce mechanism to prevent multiple webhook calls
let lastWebhookCall = 0;
const WEBHOOK_DEBOUNCE_MS = 2000; // 2 seconds debounce

/**
 * Sends GCLID data to the webhook
 */
export const sendGCLIDToWebhook = async (source: string): Promise<void> => {
  const now = Date.now();
  if (now - lastWebhookCall < WEBHOOK_DEBOUNCE_MS) {
    console.log('🚫 Webhook call debounced - too soon after last call');
    return;
  }
  lastWebhookCall = now;
  const gclid = getStoredGCLID();
  const debugInfo = getGCLIDDebugInfo();
  
  if (!gclid) {
    console.warn('⚠️ No GCLID available to send to webhook. Debug info:', debugInfo);
    return;
  }

  const webhookData = {
    gclid,
    page: window.location.href,
    timestamp: new Date().toISOString(),
    source
  };

  try {
    console.log('📤 Sending GCLID through secure serverless proxy:', webhookData);
    
    const response = await fetch('/api/send-gclid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });

    if (response.ok) {
      console.log('✅ GCLID sent through proxy successfully:', webhookData);
    } else {
      console.error('❌ Failed to send GCLID through proxy:', response.status, await response.text());
    }
  } catch (error) {
    console.error('❌ Error sending GCLID through proxy:', error);
  }
};