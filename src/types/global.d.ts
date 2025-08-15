
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    gtmLoaded: boolean;
  }
}

export {};
