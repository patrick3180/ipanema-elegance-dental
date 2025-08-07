// Utility functions for GCLID capture and webhook sending

/**
 * Captures GCLID from URL parameters and stores it in localStorage
 */
export const captureGCLID = (): void => {
  const urlParams = new URLSearchParams(window.location.search);
  const gclid = urlParams.get('gclid');
  
  if (gclid) {
    localStorage.setItem('gclid', gclid);
    localStorage.setItem('gclid_timestamp', Date.now().toString());
    console.log('GCLID captured:', gclid);
  }
};

/**
 * Gets stored GCLID from localStorage
 */
export const getStoredGCLID = (): string | null => {
  return localStorage.getItem('gclid');
};

/**
 * Sends GCLID data to the webhook
 */
export const sendGCLIDToWebhook = async (source: string): Promise<void> => {
  const gclid = getStoredGCLID();
  
  if (!gclid) {
    console.warn('No GCLID available to send to webhook');
    return;
  }

  const webhookData = {
    gclid,
    timestamp: Date.now(),
    source,
    page_url: window.location.href,
    user_agent: navigator.userAgent
  };

  try {
    const response = await fetch('https://n8n.srv876901.hstgr.cloud/webhook/webhook/gclid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });

    if (response.ok) {
      console.log('GCLID sent to webhook successfully:', webhookData);
    } else {
      console.error('Failed to send GCLID to webhook:', response.status);
    }
  } catch (error) {
    console.error('Error sending GCLID to webhook:', error);
  }
};