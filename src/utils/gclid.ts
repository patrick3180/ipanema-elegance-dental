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

/**
 * Sends GCLID data to the webhook
 */
export const sendGCLIDToWebhook = async (source: string): Promise<void> => {
  const gclid = getStoredGCLID();
  const debugInfo = getGCLIDDebugInfo();
  
  if (!gclid) {
    console.warn('⚠️ No GCLID available to send to webhook. Debug info:', debugInfo);
    return;
  }

  const webhookData = {
    gclid,
    timestamp: Date.now(),
    source,
    page_url: window.location.href,
    user_agent: navigator.userAgent,
    original_page: localStorage.getItem('gclid_page'),
    gclid_age_hours: debugInfo.timestamp ? 
      Math.round((Date.now() - debugInfo.timestamp.getTime()) / (1000 * 60 * 60)) : null
  };

  try {
    console.log('📤 Sending GCLID to webhook:', webhookData);
    
    const response = await fetch('https://n8n.srv876901.hstgr.cloud/webhook/webhook/gclid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });

    if (response.ok) {
      console.log('✅ GCLID sent to webhook successfully:', webhookData);
    } else {
      console.error('❌ Failed to send GCLID to webhook:', response.status, await response.text());
    }
  } catch (error) {
    console.error('❌ Error sending GCLID to webhook:', error);
  }
};